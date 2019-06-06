/**
 * Controller for /api/users
 */

/** Package imports */
import converter from 'json-2-csv';
import { Request, Response } from 'express';
import { IUserModel, user } from '../../models/user.model';
import * as jwt from "jsonwebtoken";
import { sendMailRegister } from '../../_helpers/email-helper/send-email';
import config from "config";

// use to hash the password
let bcrypt = require('bcryptjs');


// secret key use to create token
const myJWTSecretKey = config.get<string>("jwt.secret-key");

/**
 * check Token from user each request
 * @param token 
 * @returns return the User or null
 */
export const checkJwt = (token: string) => {
   
    try {
        if(myJWTSecretKey){
            let jwtPayload = <any>jwt.verify(token, myJWTSecretKey);
            return jwtPayload;
        }
        return null;
      } catch (error) {
        //If token is not valid
        return null;
      }
}

/**
 * Get all users.
 * @param req
 * @param res
 */
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        let user = checkJwt(req.params.token);
        if (user && user.isAdmin){
            //  this user is admin, so he can get data
            const users: IUserModel[] = await user.find();
            res.status(200).send({
                data: {
                    status: 'success',
                    items: users.length,
                    docs: users,
                },
            });
        } else {
            // this user is not admin
            res.status(200).send({
                data: {
                    status: 'fail',
                },
            });
        }
        
    } catch (error) {
        res.status(400).send({
            data: {
                status: 'error',
                message: error.message,
            },
        });
    }
};

/**
 * Create new user
 * @param req
 * @param res
 */
export const registerUser = async (req: Request, res: Response) => {
    try {

        const singleUser: IUserModel | null = await user.findOne({email: req.body.email});
        if (!singleUser){
              // create hash with salt 10
            let hash = bcrypt.hashSync(req.body.password, 10);
            if (hash){

                req.body.passwordHash = hash;
                const newUser: IUserModel = await user.create(req.body);
                sendMailRegister(newUser);
                res.status(201).send({
                    data: {
                        status: 'success',
                        docs: newUser,
                    },
                });
            } 
        } else {
            res.status(500).send({
                data: {
                    status: 'fail',
                    message: 'this email is already registered'
                }
            });
        }

      
    } catch (error) {
        res.status(400).send({
            data: {
                status: 'error',
                message: error.message,
            },
        });
    }
};

/**
 * Download all activities as a csv file
 * @param req
 * @param res
 */
export const exportUsersAsCsv = async (req: Request, res: Response) => {
    try {
        const users: IUserModel[] = await user.find({});
        let documents: object[] = [];
        users.forEach((item) => {
            let data = {
                id: item.id,
                username: item.email,
                created: item.created_at,
            };
            documents.push(data);
        });

        /** Convert to CSV data */
        converter.json2csv(documents, (err, csv) => {
            res.setHeader('Content-disposition', 'attachment; filename="all_users.csv"');
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csv);
        });
    } catch (error) {
        res.status(400).send({
            data: {
                status: 'error',
                message: error.message,
            },
        });
    }
};

/**
 * Delete all users
 * @param req
 * @param res
 */
export const deleteAllUsers = async (req: Request, res: Response) => {
    try {
        await user.deleteMany({});
        res.send({
            data: {
                status: 'success',
                message: 'all users are deleted',
            },
        });
    } catch (error) {
        res.status(400).send({
            data: {
                status: 'error',
                message: error.message,
            },
        });
    }
};

/**
 * Get a single user by id
 * get email and password from request query
 * @param req
 * @param res
 */
export const login = async (req: Request, res: Response) => {
    try {

        const singleUser: IUserModel | null = await user.findOne({email: req.query.email});
        
        // compare password with hashpassword
        if (myJWTSecretKey && singleUser && bcrypt.compareSync(req.query.password, singleUser.passwordHash)){

            if (singleUser.isConfirm){
                // create a token. With this token, client can communite with server of the user
                // sign with default (HMAC SHA256) 
                const token = jwt.sign(singleUser.toJSON(), myJWTSecretKey);
                res.status(200).send({
                    data: {
                        status: 'success',
                        docs: singleUser,
                        token: token,
                    },
                });
            } else {
                res.status(500).send({
                    data: {
                        status: 'fail',
                        message: 'please confirm the email'
                    },
                });
            }

       } else {
       
        // user does not exist
        res.status(500).send({
            data: {
                status: 'fail',
                message: 'user does not exist'
            },
        });
       }

    } catch (error) {
        res.status(400).send({
            data: {
                status: 'error',
                message: error.message,
            },
        });
    }
};

/**
 * Update a single user by id
 * @param req
 * @param res
 */
export const updateSingleUserWithToken = async (req: Request, res: Response) => {
    try {
        let checkedUser = checkJwt(req.params.token);
        if(checkedUser){
            const updateUser: IUserModel | null = await user.findByIdAndUpdate(checkedUser._id, req.body, {
                new: true,
            });
            res.status(200).send({
                data: {
                    status: 'success',
                    docs: updateUser,
                },
            });
        }
        
    } catch (error) {
        res.status(400).send({
            data: {
                status: 'error',
                message: error.message,
            },
        });
    }
};

/**
 * Delete a single user by id
 * @param req
 * @param res
 */
export const deleteSingleUserWithToken = async (req: Request, res: Response) => {
    try {
        let user = checkJwt(req.params.token);
        if (user){
            const deleteUser: IUserModel | null = await user.findByIdAndDelete(user._id);
            res.status(200).send({
                data: {
                    status: 'success',
                    docs: deleteUser,
                },
            });
        }
     
    } catch (error) {
        res.status(400).send({
            data: {
                status: 'error',
                message: error.message,
            },
        });
    }
};

/**
 * ======================================================================================
 * Functions
 * ======================================================================================
 */

/**
 * @description Process the queries for showing activities
 * @param {*} queries
 * @returns {object}
 */
const processQueries = (queries: any): object => {
    /** regex the params search for not dates */
    for (let key of Object.keys(queries)) {
        if (key != 'start_at' && key != 'end_at' && key != 'from' && key != 'until') {
            queries[key] = new RegExp(queries[key], 'i');
        }
    }
    /** handle from and until params */
    let fromQuery = queries.from;
    let untilQuery = queries.until;
    if (fromQuery || untilQuery) {
        let newQuery: object = {};
        if (fromQuery) {
            Object.assign(newQuery, { $gte: fromQuery });
            delete queries.from;
        }
        if (untilQuery) {
            Object.assign(newQuery, { $lte: untilQuery });
            delete queries.until;
        }
        queries.start_at = newQuery;
    }
    return queries;
};

/**
 * =========================
 * FOR TESTING
 * =========================
 */

 /**
 * Get all users.
 * @param req
 * @param res
 */
export const getUsers = async (req: Request, res: Response) => {
    try {
        /** Process queries to check for dates*/
        req.query = processQueries(req.query);

        const users: IUserModel[] = await user.find(req.query);
        res.status(200).send({
            data: {
                status: 'success',
                items: users.length,
                docs: users,
            },
        });
    } catch (error) {
        res.status(400).send({
            data: {
                status: 'error',
                message: error.message,
            },
        });
    }
};


/**
 * Create new user
 * @param req
 * @param res
 */
export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser: IUserModel = await user.create(req.body);
        res.status(201).send({
            data: {
                status: 'success',
                docs: newUser,
            },
        });
    } catch (error) {
        res.status(400).send({
            data: {
                status: 'error',
                message: error.message,
            },
        });
    }
};

/**
 * Get a single user by id
 * @param req
 * @param res
 */
export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const singleUser: IUserModel | null = await user.findById(req.params.userid);
        if (singleUser)
             sendMailRegister(singleUser);
        res.status(200).send({
            data: {
                status: 'success',
                docs: singleUser,
            },
        });
    } catch (error) {
        res.status(400).send({
            data: {
                status: 'error',
                message: error.message,
            },
        });
    }
};

/**
 * Update a single user by id
 * @param req
 * @param res
 */
export const updateSingleUser = async (req: Request, res: Response) => {
    try {
        const updateUser: IUserModel | null = await user.findByIdAndUpdate(req.params.userid, req.body, {
            new: true,
        });
        res.status(200).send({
            data: {
                status: 'success',
                docs: updateUser,
            },
        });
    } catch (error) {
        res.status(400).send({
            data: {
                status: 'error',
                message: error.message,
            },
        });
    }
};

/**
 * Delete a single user by id
 * @param req
 * @param res
 */
export const deleteSingleUser = async (req: Request, res: Response) => {
    try {
        const deleteUser: IUserModel | null = await user.findByIdAndDelete(req.params.userid);
        res.status(200).send({
            data: {
                status: 'success',
                docs: deleteUser,
            },
        });
    } catch (error) {
        res.status(400).send({
            data: {
                status: 'error',
                message: error.message,
            },
        });
    }
};

/**
 * change user infor after user confirm email
 * @param req 
 * @param res 
 */
export const confirmEmail = async (req: Request, res: Response) => {
    let checkedUser: any = checkJwt(req.params.token);
    req.body.isConfirm = true;
    try {
        if(checkedUser){
            const updateUser: IUserModel | null = await user.findByIdAndUpdate(checkedUser._id, req.body, {
                new: true,
            });
            res.status(200).send({
                data: {
                    status: 'success',
                },
            });
        }
    } catch (error) {
        res.status(400).send({
            data: {
                status: 'error',
                message: error.message,
            },
        });
    }
    
}



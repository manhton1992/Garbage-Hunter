/**
 * Landing file for NodeJS
 */

/** Package imports */
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from 'config';

/** Module imports */
import { globalRouter } from './controllers/router';
import { globalErrorHandler } from './middlewares/errorhandler.middleware';

/** Variables */
export const app: express.Application = express();
const db_host: string = config.get('database.host');
const port: string = config.get('server.port');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

/** Setup Database */
mongoose.connect(db_host, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

app.use('/api', globalRouter);
app.use(globalErrorHandler);

/** Start server */
app.listen(port, () => {
	console.log('Server is now running on port', port);
});

# Garbage Hunter (Backend)

This document is the backend part for the project `Garbage Hunter` that is made during the course "Advanced Web Development" in Hochschule Darmstadt in SS19.

## API Reference
Backend server run on the port 3000

### api/messages


| API                         | Request | Authorization | Usage                      |
| --------------------------- | ------- | ------------- | -------------------------- |
| `api/messages`              | GET     | -             | Get all messages or get some messages by URL query |
| `api/messages`              | POST    | Bearer Token  | Create a new message           |
| `api/messages`              | PUT     | Bearer Token  | Update message's information          |
| `api/messages`              | DELETE  | Bearer Token  | Delete a message           |
| `api/messages/:messageid`   | GET     | -             | Get a single message by message id       |
| `api/messages/delete_all`   | DELETE  | Bearer Token  | Delete all messages        |
| `api/messages/download`     | GET     | -             | Export all messages as CSV |
| `api/messages/image_upload` | POST    | Bearer Token  | Upload image to AWS S3     |
| `api/messages/delete_image` | POST    | Bearer Token  | Delete image from AWS S3   |

The Body of PUT and POST request look like: 
```
{       
    "lon": 8.651647567749025,        
    "lat": 50.859277014261586,     
    "available": true,     
    "archive": false,    
    "title": "trash an main station darmstadt",   
    "description": "fheoihfio",   
    "creatorId": "12345",   
    "address": "B 62 , 35094 ",   
    "imageUrl": "https://garbage-hunter.s3.eu-central-1.amazonaws.com/1560339294439",     
    "phone": 1     
}      
```
### api/users

| API                              | Request | Authorization | Usage                   |
| -------------------------------- | ------- | ------------- | ----------------------- |
| `api/users`                      | GET     | -             | Get all users or get some users by URL query          |
| `api/users`                      | POST    | -             | Create a new user           |
| `api/users/:token`               | PUT     | -             | Update a user by user token           |
| `api/users`                      | DELETE  | -             | Delete a user by user id          |
| `api/users/:userid`              | GET     | -             | Get a single user by user id       |
| `api/users/get_all/:token`       | GET     | -             | Get a all user by user token. But just admin account can do that   |
| `api/users/login`                | POST    | -             | Get a user by email and password ( the first time login)    |
| `api/users/login/:token`         | GET     | -             | Get a user by user token (auto login after the first time)      |
| `api/users/register`             | POST    | -             | Create a new user (register)       |
| `api/users/update/:token`        | PUT     | -             | Update a user by user token     |
| `api/users/delete/:token`        | GET     | -             | Delete a user by user token    |
| `api/users/confirm_email/:token` | GET     | -             | Confirm email after login by user token       |
| `api/users/delete_all`           | DELETE  | -             | Delete all users        |
| `api/users/download`             | GET     | -             | Export all users as CSV |


The Body of PUT and POST request look like: 
```
{       
    "email": "linh9a0910@gmail.com",
    "password": "sdfhshjf",
    "isAdmin": "false",
    "isConfirm": "true"
}      
```

### api/comments

| API                                        | Request | Authorization | Usage                         |
| ------------------------------------------ | ------- | ------------- | ----------------------------- |
| `api/comments`                             | GET     | -             | Get all comments or get some comments by URL query      |
| `api/comments`                             | POST    | -             | Create a new comment              |
| `api/comments/:commentid`                  | PUT     | -             | Update a comment by comment id         |
| `api/comments/:commentid`                  | DELETE  | -             | Delete a comment by comment id         |
| `api/comments/:commentid`                  | GET     | -             | Get a comment by comment id       |
| `api/comments/get_by_messageid/:messageid` | GET     | -             | Get a comment by message id |
| `api/comments/delete_all`                  | DELETE  | -             | Delete all comments           |

The Body of PUT and POST request look like: 
```
{       
    "text": "cool",
    "creatorId": "shfiewfwoifiwhefow",
    "parentId": "iwoiwofjiwejfiwoefjw",
    "messageId": "wiehfwihfiowehfiwfw",
    "archive": false
}      
```

### api/categories

| API                          | Request | Authorization | Usage                 |
| ---------------------------- | ------- | ------------- | --------------------- |
| `api/categories`             | GET     | -             | Get all categories or get some categories by URL query    |
| `api/categories`             | POST    | -             | Create a new category     |
| `api/categories/:categoryid` | PUT     | -             | Update a category by category id     |
| `api/categories/:categoryid` | DELETE  | -             | Delete a category by category id   |
| `api/categories/:categoryid` | GET     | -             | Get a category by category id |
| `api/categories/delete_all`  | DELETE  | -             | Delete all categories |


The Body of PUT and POST request look like: 
```
{       
      "name": "table"
}      
```

### api/message_category

| API                                       | Request | Authorization | Usage                         |
| ----------------------------------------- | ------- | ------------- | ----------------------------- |
| `api/message_category`                    | GET     | -             | Get all message_category or get some message_categories by URL query      |
| `api/message_category`                    | POST    | -             | Create a message_category    |
| `api/message_category/:messagecategoryid` | PUT     | -             | Update a message_category by message_category id    |
| `api/message_category/:messagecategoryid` | DELETE  | -             | Delete a message_category by message_category id     |
| `api/message_category/:messagecategoryid` | GET     | -             | Get a message_category by message_category id|
| `api/message_category/delete_all`         | DELETE  | -             | Delete all message_category |

The Body of PUT and POST request look like: 
```
{       
    "messageId": "uifuiewfwiuwhfuiwefuwehf";
    "categoryId": "jishfuihfiuewfhwiufhuiw;     
}      
```

### api/user_category

| API                                 | Request | Authorization | Usage                      |
| ----------------------------------- | ------- | ------------- | -------------------------- |
| `api/user_category`                 | GET     | -             | Get all user_category or get some user_categories by URL query    |
| `api/user_category`                 | POST    | -             | Create a user_category     |
| `api/user_category/:usercategoryid` | PUT     | -             | Update a user_category by user_category id     |
| `api/user_category/:usercategoryid` | DELETE  | -             | Delete a user_category by user_category id     |
| `api/user_category/:usercategoryid` | GET     | -             | Get a user_category by user_category id |
| `api/user_category/delete_all`      | DELETE  | -             | Delete all user_category   |

The Body of PUT and POST request look like: 
```
{       
    "userId": "jowhefoeiwhfoiwehfowfh";
    "categoryId": "iuuwfuiwfuqwhfuiqfhw";
}      
```

### api/email

| API         | Request | Authorization | Usage       |
| ----------- | ------- | ------------- | ----------- |
| `api/email` | GET     | -             | Send email to a subcriber by URL query : userId ( subcriber) and messageId |


## Database schemas

\* = attribute is created automatically by mongoose

### Message schema

| Attributes      | Type    | Required | Default |
| --------------- | ------- | -------- | ------- |
| `title`         | String  | Yes      | -       |
| `description`   | String  | Yes      | -       |
| `creatorId`     | String  | Yes      | -       |
| `lon`           | Number  | Yes      | false   |
| `lat`           | Number  | Yes      | false   |
| `address`       | String  | Yes      | -       |
| `available`     | Boolean | Yes      | true    |
| `archive`       | Boolean | Yes      | false   |
| `imageUrl`      | String  | No       | -       |
| `phone`         | Number  | No       | -       |
| `created_at` \* | Date    | -        | auto    |
| `updated_at` \* | Date    | -        | auto    |

### User schema

| Attributes        | Type    | Required | Default |
| ----------------- | ------- | -------- | ------- |
| `email`           | String  | Yes      | -       |
| `firstName`       | String  | No       | -       |
| `lastName`        | String  | No       | -       |
| `phoneNumber`     | String  | No       | -       |
| `passwordHash`    | Number  | Yes      | -       |
| `isAdmin`         | Boolean | Yes      | false   |
| `isConfirm`       | Boolean | Yes      | false   |
| `profileImageUrl` | String  | No       | -       |
| `created_at` \*   | Date    | -        | auto    |
| `updated_at` \*   | Date    | -        | auto    |

### Comment schema

| Attributes      | Type    | Required | Default |
| --------------- | ------- | -------- | ------- |
| `text`          | String  | Yes      | -       |
| `creatorId`     | String  | Ytes     | -       |
| `parentId`      | String  | No       | -       |
| `messageId`     | String  | Yes      | -       |
| `archive`       | Boolean | Yes      | false   |
| `imageUrl`      | String  | No       | ""      |
| `created_at` \* | Date    | -        | auto    |

### Category schema

| Attributes | Type   | Required | Default |
| ---------- | ------ | -------- | ------- |
| `name`     | String | Yes      | -       |

### MessageCategory schema

| Attributes   | Type   | Required | Default |
| ------------ | ------ | -------- | ------- |
| `messageId`  | String | Yes      | -       |
| `categoryId` | String | Yes      | -       |


### UserCategory schema

| Attributes   | Type   | Required | Default |
| ------------ | ------ | -------- | ------- |
| `userId`  | String | Yes      | -       |
| `categoryId` | String | Yes      | -       |

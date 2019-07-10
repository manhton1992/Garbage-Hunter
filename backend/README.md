# Garbage Hunter (Backend)

This document is the backend part for the project `Garbage Hunter` that is made during the course "Advanced Web Development" in Hochschule Darmstadt in SS19.

## Table of contents

1. [API Reference](#api-reference)
    - [api/messages](#api/messages)
    - [api/users](#api/users)
    - [api/comments](#api/comments)
    - [api/categories](#api/categories)
    - [api/message_category](#api/message_category)
    - [api/user_category](#api/user_category)
    - [api/email](#api/email)
2. [Database schemas](#database-schemas)
    - [Message](#message-schema)
    - [User](#user-schema)
    - [Comment](#comment-schema)
    - [Category](#category-schema)
    - [MessageCategory](#messagecategory-schema)
    - [UserCategory](#usercategory-schema)

## API Reference

### General response error

```json
{
    "data": {
        "status": "error",
        "message": "error message"
    }
}
```

### api/messages

| API                         | Request | Authorization | Usage                                              |
| --------------------------- | ------- | ------------- | -------------------------------------------------- |
| `api/messages`              | GET     | -             | Get all messages or get some messages by URL query |
| `api/messages`              | POST    | Bearer Token  | Create a new message                               |
| `api/messages`              | PUT     | Bearer Token  | Update message's information                       |
| `api/messages`              | DELETE  | Bearer Token  | Delete a message                                   |
| `api/messages/:messageid`   | GET     | -             | Get a single message by message id                 |
| `api/messages/delete_all`   | DELETE  | Bearer Token  | Delete all messages                                |
| `api/messages/download`     | GET     | -             | Export all messages as CSV                         |
| `api/messages/image_upload` | POST    | Bearer Token  | Upload image to AWS S3                             |
| `api/messages/delete_image` | POST    | Bearer Token  | Delete image from AWS S3                           |

#### Request body (api/messages)

```json
{
    "lon": 8.651647567749025,
    "lat": 50.859277014261586,
    "available": true,
    "archive": false,
    "title": "trash an main station darmstadt",
    "description": "look at this trash",
    "creatorId": "12345",
    "address": "B 62 , 35094 ",
    "imageUrl": "https://garbage-hunter.s3.eu-central-1.amazonaws.com/1560339294439",
    "phone": 1
}
```

#### Success response (api/messages)

```json
{
    "data": {
        "status": "success",
        "docs": [
            {
                "lon": 8.645753308665007,
                "lat": 49.86202341892158,
                "available": true,
                "archive": false,
                "_id": "5d11365bffa1a7033b2e75fb",
                "title": "Tables zum Verschenken!",
                "description": "TABLESSS!!!",
                "creatorId": "5d112b031a3f68c108da4ad7",
                "address": "Brandisstraße 6, 64285 Darmstadt",
                "imageUrl": "https://garbage-hunter.s3.eu-central-1.amazonaws.com/1561409113251",
                "phone": null,
                "created_at": "2019-06-24T20:45:15.071Z",
                "updated_at": "2019-06-24T20:45:15.071Z",
                "__v": 0
            },
            {
                "lon": 8.641024867538365,
                "lat": 49.8556919850596,
                "available": true,
                "archive": true,
                "_id": "5d1136cbffa1a7033b2e75fd",
                "title": "different furnitures!",
                "description": "many furnitures here! might wanna have a look and pick some of them!",
                "creatorId": "5d112b031a3f68c108da4ad7",
                "address": " 44, 64295 Darmstadt",
                "imageUrl": "https://garbage-hunter.s3.eu-central-1.amazonaws.com/1561409218654",
                "phone": null,
                "created_at": "2019-06-24T20:47:07.095Z",
                "updated_at": "2019-06-24T20:47:07.095Z",
                "__v": 0
            }
        ]
    }
}
```

### api/users

| API                              | Request | Authorization | Usage                                                                       |
| -------------------------------- | ------- | ------------- | --------------------------------------------------------------------------- |
| `api/users`                      | GET     | Bearer Token  | Get all users or get some users by URL query                                |
| `api/users`                      | POST    | Bearer Token  | Create a new user                                                           |
| `api/users`                      | PUT     | Bearer Token  | Update a user by user token                                                 |
| `api/users`                      | DELETE  | Bearer Token  | Delete a user by user id                                                    |
| `api/users/:userid`              | GET     | Bearer Token  | Get a single user by user id                                                |
| `api/users/get_all/:token`       | GET     | -             | DEPRECATED Get a all user by user token. But just admin account can do that |
| `api/users/login`                | POST    | -             | Get a user by email and password ( the first time login)                    |
| `api/users/login/:token`         | GET     | -             | Get a user by user token (auto login after the first time)                  |
| `api/users/register`             | POST    | -             | Create a new user (register)                                                |
| `api/users/update/:token`        | PUT     | -             | DEPRECATED Update a user by user token                                      |
| `api/users/delete/:token`        | GET     | -             | DEPRECATED Delete a user by user token                                      |
| `api/users/confirm_email/:token` | GET     | -             | Confirm email after login by user token                                     |
| `api/users/delete_all`           | DELETE  | Bearer Token  | Delete all users                                                            |
| `api/users/download`             | GET     | -             | Export all users as CSV                                                     |

#### Request body (api/users)

```json
{
    "email": "linh9a0910@gmail.com",
    "password": "testpassword",
    "isAdmin": "false",
    "isConfirm": "true"
}
```

#### Success response (api/users)

```json
{
    "data": {
        "status": "success",
        "docs": [
            {
                "isAdmin": true,
                "isConfirm": true,
                "_id": "5d112b031a3f68c108da4ad7",
                "email": "andy.john@stud.h-da.de",
                "passwordHash": "$2a$10$htZZRSKOB7TmloOF6w4BbuconOCqjk5azpA3kWTOSJGNsCgQMVntS",
                "created_at": "2019-06-24T19:56:51.574Z",
                "updated_at": "2019-06-24T20:08:48.532Z",
                "__v": 0
            },
            {
                "isAdmin": true,
                "isConfirm": true,
                "_id": "5d112c971a3f68c108da4ad8",
                "email": "michael.dann@stud.h-da.de",
                "passwordHash": "$2a$10$y9/rN6NXxWecaiSXnWFJ6uprWZCij.V83GMKbxgTZOY9whtfF5Hsm",
                "created_at": "2019-06-24T20:03:35.829Z",
                "updated_at": "2019-06-24T20:09:01.484Z",
                "__v": 0
            }
        ]
    }
}
```

### api/comments

| API                                        | Request | Authorization | Usage                                              |
| ------------------------------------------ | ------- | ------------- | -------------------------------------------------- |
| `api/comments`                             | GET     | -             | Get all comments or get some comments by URL query |
| `api/comments`                             | POST    | Bearer Token  | Create a new comment                               |
| `api/comments/:commentid`                  | PUT     | Bearer Token  | Update a comment by comment id                     |
| `api/comments/:commentid`                  | DELETE  | Bearer Token  | Delete a comment by comment id                     |
| `api/comments/:commentid`                  | GET     | -             | Get a comment by comment id                        |
| `api/comments/get_by_messageid/:messageid` | GET     | -             | Get a comment by message id                        |
| `api/comments/delete_all`                  | DELETE  | Bearer Token  | Delete all comments                                |

#### Request body (api/comments)

```json
{
    "text": "cool post you got there",
    "creatorId": "5d112b031a3f68c108da4ad7",
    "parentId": "5d112cca1a3f68c108da4ad9",
    "messageId": "5d129841433614297d987b24",
    "archive": false
}
```

#### Success response (api/comments)

```json
{
    "data": {
        "status": "success",
        "docs": [
            {
                "archive": false,
                "imageUrl": "",
                "_id": "5d113aa9ffa1a7033b2e7609",
                "text": "may be not useful for me...",
                "creatorId": "5d112d021a3f68c108da4ada",
                "parentId": "",
                "messageId": "5d113954ffa1a7033b2e7605",
                "created_at": "2019-06-24T21:03:37.576Z",
                "updatedAt": "2019-06-24T21:03:37.576Z",
                "__v": 0
            },
            {
                "archive": false,
                "imageUrl": "",
                "_id": "5d113abaffa1a7033b2e760a",
                "text": "the wood might be reusable",
                "creatorId": "5d112d021a3f68c108da4ada",
                "parentId": "",
                "messageId": "5d1138e8ffa1a7033b2e7603",
                "created_at": "2019-06-24T21:03:54.153Z",
                "updatedAt": "2019-06-24T21:03:54.153Z",
                "__v": 0
            }
        ]
    }
}
```

### api/categories

| API                          | Request | Authorization | Usage                                                  |
| ---------------------------- | ------- | ------------- | ------------------------------------------------------ |
| `api/categories`             | GET     | -             | Get all categories or get some categories by URL query |
| `api/categories`             | POST    | Bearer Token  | Create a new category                                  |
| `api/categories/:categoryid` | PUT     | Bearer Token  | Update a category by category id                       |
| `api/categories/:categoryid` | DELETE  | Bearer Token  | Delete a category by category id                       |
| `api/categories/:categoryid` | GET     | -             | Get a category by category id                          |
| `api/categories/delete_all`  | DELETE  | Bearer Token  | Delete all categories                                  |

#### Request body (api/categories)

```json
{
      "name": "table"
}
```

#### Success response (api/categories)

```json
{
    "data": {
        "status": "success",
        "docs": [
            {
                "_id": "5d0629f7ce6496d02033fa38",
                "name": "chair",
                "createdAt": "2019-06-16T11:37:27.317Z",
                "updatedAt": "2019-06-16T11:37:27.317Z",
                "__v": 0
            },
            {
                "_id": "5d0629face6496d02033fa39",
                "name": "furniture",
                "createdAt": "2019-06-16T11:37:30.694Z",
                "updatedAt": "2019-06-16T11:37:30.694Z",
                "__v": 0
            },
            {
                "_id": "5d0629fdce6496d02033fa3a",
                "name": "electronic",
                "createdAt": "2019-06-16T11:37:33.267Z",
                "updatedAt": "2019-06-16T11:37:33.267Z",
                "__v": 0
            }
        ]
    }
}
```

### api/message_category

| API                                       | Request | Authorization | Usage                                                                |
| ----------------------------------------- | ------- | ------------- | -------------------------------------------------------------------- |
| `api/message_category`                    | GET     | -             | Get all message_category or get some message_categories by URL query |
| `api/message_category`                    | POST    | Bearer Token  | Create a message_category                                            |
| `api/message_category/:messagecategoryid` | PUT     | Bearer Token  | Update a message_category by message_category id                     |
| `api/message_category/:messagecategoryid` | DELETE  | Bearer Token  | Delete a message_category by message_category id                     |
| `api/message_category/:messagecategoryid` | GET     | -             | Get a message_category by message_category id                        |
| `api/message_category/delete_all`         | DELETE  | Bearer Token  | Delete all message_category                                          |

#### Request body (api/message_category)

```json
{
    "messageId": "5d129841433614297d987b24",
    "categoryId": "5d112d021a3f68c108da4ada"
}
```

#### Success response (api/message_category)

```json
{
    "data": {
        "status": "success",
        "docs": [
            {
                "_id": "5d1132391a3f68c108da4add",
                "messageId": "5d1132391a3f68c108da4adb",
                "categoryId": "5d062a04ce6496d02033fa3c",
                "createdAt": "2019-06-24T20:27:37.617Z",
                "updatedAt": "2019-06-24T20:27:37.617Z",
                "__v": 0
            },
            {
                "_id": "5d1132391a3f68c108da4adc",
                "messageId": "5d1132391a3f68c108da4adb",
                "categoryId": "5d0629face6496d02033fa39",
                "createdAt": "2019-06-24T20:27:37.611Z",
                "updatedAt": "2019-06-24T20:27:37.611Z",
                "__v": 0
            },
            {
                "_id": "5d113414ffa1a7033b2e75f4",
                "messageId": "5d113414ffa1a7033b2e75f3",
                "categoryId": "5d0629face6496d02033fa39",
                "createdAt": "2019-06-24T20:35:32.434Z",
                "updatedAt": "2019-06-24T20:35:32.434Z",
                "__v": 0
            }
        ]
    }
}
```

### api/user_category

| API                                 | Request | Authorization | Usage                                                          |
| ----------------------------------- | ------- | ------------- | -------------------------------------------------------------- |
| `api/user_category`                 | GET     | -             | Get all user_category or get some user_categories by URL query |
| `api/user_category`                 | POST    | Bearer Token  | Create a user_category                                         |
| `api/user_category/:usercategoryid` | PUT     | Bearer Token  | Update a user_category by user_category id                     |
| `api/user_category/:usercategoryid` | DELETE  | Bearer Token  | Delete a user_category by user_category id                     |
| `api/user_category/:usercategoryid` | GET     | -             | Get a user_category by user_category id                        |
| `api/user_category/delete_all`      | DELETE  | Bearer Token  | Delete all user_category                                       |

#### Request body (api/user_category)

```json
{
    "userId": "5d112cca1a3f68c108da4ad9",
    "categoryId": "5d112d021a3f68c108da4ada"
}
```

#### Success response (api/user_category)

```json
{
    "data": {
        "status": "success",
        "docs": [
            {
                "_id": "5d120c3a5edbdf158835072f",
                "userId": "5d112b031a3f68c108da4ad7",
                "categoryId": "5d0629fdce6496d02033fa3a",
                "createdAt": "2019-06-25T11:57:46.857Z",
                "updatedAt": "2019-06-25T11:57:46.857Z",
                "__v": 0
            },
            {
                "_id": "5d13853aaca9434882212329",
                "userId": "5d129841433614297d987b24",
                "categoryId": "5d0629f7ce6496d02033fa38",
                "createdAt": "2019-06-26T14:46:18.314Z",
                "updatedAt": "2019-06-26T14:46:18.314Z",
                "__v": 0
            },
            {
                "_id": "5d13853aaca943488221232b",
                "userId": "5d129841433614297d987b24",
                "categoryId": "5d0629fdce6496d02033fa3a",
                "createdAt": "2019-06-26T14:46:18.322Z",
                "updatedAt": "2019-06-26T14:46:18.322Z",
                "__v": 0
            }
        ]
    }
}
```

### api/email

| API         | Request | Authorization | Usage                                                                      |
| ----------- | ------- | ------------- | -------------------------------------------------------------------------- |
| `api/email` | GET     | -             | Send email to a subscriber by URL query : userId ( subscriber) and messageId |

---

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
| `userId`     | String | Yes      | -       |
| `categoryId` | String | Yes      | -       |

# Garbage Hunter (Backend)

This repository is the backend part for the project `Garbage Hunter` that is made during the course "Advanced Web Development" in Hochschule Darmstadt in SS19.

## API Reference

### api/messages

| API                         | Request | Authorization | Usage                      |
| --------------------------- | ------- | ------------- | -------------------------- |
| `api/messages`              | GET     | -             | Get all messages or           |
| `api/messages`              | POST    | Bearer Token  | Create a message           |
| `api/messages`              | PUT     | Bearer Token  | Update a message           |
| `api/messages`              | DELETE  | Bearer Token  | Delete a message           |
| `api/messages/:messageid`   | GET     | -             | Get a single message       |
| `api/messages/delete_all`   | DELETE  | Bearer Token  | Delete all messages        |
| `api/messages/download`     | GET     | -             | Export all messages as CSV |
| `api/messages/image_upload` | POST    | Bearer Token  | Upload image to AWS S3     |
| `api/messages/delete_image` | POST    | Bearer Token  | Delete image from AWS S3   |

### api/users

| API                              | Request | Authorization | Usage                   |
| -------------------------------- | ------- | ------------- | ----------------------- |
| `api/users`                      | GET     | -             | Get all users           |
| `api/users`                      | POST    | -             | Create a user           |
| `api/users`                      | PUT     | -             | Update a user           |
| `api/users`                      | DELETE  | -             | Delete a user           |
| `api/users/:userid`              | GET     | -             | Get a single user       |
| `api/users/get_all/:token`       | GET     | -             | Get a single user       |
| `api/users/login`                | GET     | -             | Get a single user       |
| `api/users/login/:token`         | GET     | -             | Get a single user       |
| `api/users/register`             | GET     | -             | Get a single user       |
| `api/users/update/:token`        | GET     | -             | Get a single user       |
| `api/users/delete/:token`        | GET     | -             | Get a single user       |
| `api/users/confirm_email/:token` | GET     | -             | Get a single user       |
| `api/users/delete_all`           | DELETE  | -             | Delete all users        |
| `api/users/download`             | GET     | -             | Export all users as CSV |

### api/comments

| API                                        | Request | Authorization | Usage                         |
| ------------------------------------------ | ------- | ------------- | ----------------------------- |
| `api/comments`                             | GET     | -             | Get all comments              |
| `api/comments`                             | POST    | -             | Create a comment              |
| `api/comments`                             | PUT     | -             | Update a comment              |
| `api/comments`                             | DELETE  | -             | Delete a comment              |
| `api/comments/:commentid`                  | GET     | -             | Get a single comment          |
| `api/comments/get_by_messageid/:messageid` | GET     | -             | Get all comments in a message |
| `api/comments/delete_all`                  | DELETE  | -             | Delete all comments           |

### api/categories

| API                          | Request | Authorization | Usage                 |
| ---------------------------- | ------- | ------------- | --------------------- |
| `api/categories`             | GET     | -             | Get all categories    |
| `api/categories`             | POST    | -             | Create a category     |
| `api/categories`             | PUT     | -             | Update a category     |
| `api/categories`             | DELETE  | -             | Delete a category     |
| `api/categories/:categoryid` | GET     | -             | Get a single category |
| `api/categories/delete_all`  | DELETE  | -             | Delete all categories |

### api/message_category

| API                                       | Request | Authorization | Usage                         |
| ----------------------------------------- | ------- | ------------- | ----------------------------- |
| `api/message_category`                    | GET     | -             | Get all message_category      |
| `api/message_category`                    | POST    | -             | Create a message_category     |
| `api/message_category`                    | PUT     | -             | Update a message_category     |
| `api/message_category`                    | DELETE  | -             | Delete a message_category     |
| `api/message_category/:messagecategoryid` | GET     | -             | Get a single message_category |
| `api/message_category/delete_all`         | DELETE  | -             | Delete all message_category   |

### api/user_category

| API                                 | Request | Authorization | Usage                      |
| ----------------------------------- | ------- | ------------- | -------------------------- |
| `api/user_category`                 | GET     | -             | Get all user_category      |
| `api/user_category`                 | POST    | -             | Create a user_category     |
| `api/user_category`                 | PUT     | -             | Update a user_category     |
| `api/user_category`                 | DELETE  | -             | Delete a user_category     |
| `api/user_category/:usercategoryid` | GET     | -             | Get a single user_category |
| `api/user_category/delete_all`      | DELETE  | -             | Delete all user_category   |

### api/email

| API         | Request | Authorization | Usage       |
| ----------- | ------- | ------------- | ----------- |
| `api/email` | GET     | -             | Send email? |

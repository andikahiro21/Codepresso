# Basic Express

Authentication Project:

- Express
- Joi
- Fs
- Sequelize
- dotenv
- multer
- nodemailer
- Midtrans

---

## URL

_Server_

```
http://localhost:3000/api
```

---

## Global Response

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (403 - Not an Admin)_

```
{
  "message": "Access Denied: Not an Admin"
}
```

---

## RESTful endpoints

### POST /register

> Create user

_Request Header_

```
not needed
```

_Request Body_

```
{
        "fullName":"<name>",
        "phoneNumber": "<phoneNumber>",
        "email": "<email>",
        "password": "<password>"
}
```

_Response (201)_

```
{
    "data": {
        <data_spesific>
    },
    "message": "User Created..."
}
```

_Response (400 - Validation Failed)_

```
{
    "message": "\"fullName\" is not allowed to be empty"
}
```

_Response (400 - Email already exist)_

```
{
    "message": "User with email <email> already exist..."
}
```

---

### POST /login

> Login API

_Request Header_

```
not needed
```

_Request Body_

```
{
        "email": "<email>",
        "password": "<password>"
}
```

_Response (200)_

```
{
    "data": <token>,
    "message": "Success"
}
```

_Response (400 - Validation Failed)_

```
{
    "message": "\"email\" is not allowed to be empty"
}
```

_Response (400 - Incorrect Password)_

```
{
    "message": "Incorrect Password"
}
```

_Response (404 - User Not Found)_

```
{
    "message": "User Not Found"
}
```

---

### POST /forgot-password

> Forgot Password API

_Request Header_

```
not needed
```

_Request Body_

```
{
        "email": "<email>",
}
```

_Response (200)_

```
{
    "data": <token>,
    "message": "Success"
}
```

_Response (400 - Validation Failed)_

```
{
    "message": "\"email\" is not allowed to be empty"
}
```

_Response (404 - User Not Found)_

```
{
    "message": "User Not Found"
}
```

---

### POST /reset-password/:token

> Reset Password API

_Request Params_

```
<token>
```

_Request Header_

```
not needed
```

_Request Body_

```
{
        "newPassword": "<newPassword>",
        "confirmPassword": "<confirmPassword>",
}
```

_Response (200)_

```
{
    "message": "Success"
}
```

_Response (400 - Validation Failed)_

```
{
    "message": "\"newPassword\" is not allowed to be empty"
}
```

---

### GET /category

> Get all category

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{

    "data": [<data_spesific>],

    "status": "Success"

}
```

---

### GET /category/menu

> Get all category include menu

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{

    "data": [<data_spesific>],

    "status": "Success"

}
```

---

### GET /category/menu/:id

> Get all category include menu by id

_Request Params_

```
<id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{

    "data": [<data_spesific>],

    "status": "Success"

}
```

_Response (404 - Data Not Found)_

```
{
    "message": "Category Not Found..."
}
```

---

### POST /category/create

> Create category

_Request Authorization_

```
<bearer_token_admin>
```

_Request Header_

```
not needed
```

_Request Body_

```
{
        "name": "<name>"
}
```

_Response (201)_

```
{
    "data": {<data_specific>},
    "message": "Category Created..."
}
```

_Response (400 - Validation Failed)_

```
{
    "message": "\"name\" is not allowed to be empty"
}
```

_Response (400 - Name Already Exist)_

```
{
    "message": "Category with name <name> already exist..."
}
```

---

### PUT /category/:id

> Edit Category

_Request Params_

```
/<id>
```

_Request Authorization_

```
<bearer_token_admin>
```

_Request Header_

```
not needed
```

_Request Body_

```
{
    "name": "<name>",
}
```

_Response (200)_

```
{
    "message": "Category Updated..."
}
```

_Response (400 - Validation Failed)_

```
{
    "message": "\"name\" is not allowed to be empty"
}
```

_Response (404 - Error Not Found)_

```
{
    "message": "Category Not Found"
}
```

---

### DELETE /category/:id

> Delete category by id

_Request Params_

```
/<id>
```

_Request Authorization_

```
<bearer_token_admin>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Category have been deleted"
}
```

_Response (404 - Error Not Found)_

```
{
    "message": "Category Not Found"
}
```

_Response (400 - Unable to delete category)_

```
{
    "message": "Unable to delete the category due to its association with existing menu data."
}
```

---

### GET /menu

> Get all menu

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{

    "data": [<data_spesific>],

    "status": "Success"

}
```

---

### GET /menu/purchase/order

> Get all purchase group include purchase by id user

_Request Authorization_

```
<bearer_token>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{

    "data": [<data_spesific>],

    "status": "Success"

}
```

---

### GET /menu/:id

> Get all menu by id

_Request Params_

```
<id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{

    "data": [<data_spesific>],

    "status": "Success"

}
```

_Response (404 - Data Not Found)_

```
{
    "message": "Menu Not Found..."
}
```

---

### POST /menu/create

> Create Menu

_Request Authorization_

```
<bearer_token_admin>
```

_Request Header_

```
not needed
```

_Request Body_

```
{
        "name": "<name>",
        "categoryID": <categoryID>,
        "description": "<description>",
        "type": <type>,
        "price": <price>,
        "image": <upload_image>,
}
```

_Response (201)_

```
{
    "data": {<data_specific>},
    "message": "Menui Created..."
}
```

_Response (400 - Validation Failed)_

```
{
    "message": "\"name\" is not allowed to be empty"
}
```

_Response (400 - Name Already Exist)_

```
{
    "message": "Menu with name <name> already exist..."
}
```

---

### PUT /menu/:id

> Edit Menu

_Request Params_

```
/<id>
```

_Request Authorization_

```
<bearer_token_admin>
```

_Request Header_

```
not needed
```

_Request Body_

```
{
        "name": "<name>",
        "categoryID": <categoryID>,
        "description": "<description>",
        "type": <type>,
        "price": <price>,
        "image": <upload_image>,
}
```

_Response (200)_

```
{
    "message": "Menu updated successfully."
}
```

_Response (400 - Validation Failed)_

```
{
    "message": "\"name\" is not allowed to be empty"
}
```

_Response (404 - Error Not Found)_

```
{
    "message": "Menu with ID <id> not found."
}
```

---

### DELETE /menu/:id

> Delete menu by id

_Request Params_

```
/<id>
```

_Request Authorization_

```
<bearer_token_admin>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Menu have been deleted"
}
```

_Response (404 - Error Not Found)_

```
{
    "message": "Menu Not Found"
}
```

_Response (400 - Unable to delete category)_

```
{
    "message": "Unable to delete the menu due to its association with existing purchase data."
}
```

---

### POST /payment

> Create payment data

_Request Authorization_

```
<bearer_token>
```

_Request Header_

```
not needed
```

_Request Body_

```
{
    "items":[
        "menuIDs": [<menuIDs>]
        "qtys": [<qtys>]
        "note": "<note>"
    ]
}
```

_Response (201)_

```
{
    "message": "Request for Payment"
    "paymentUrl": <paymentUrl>,
    "token": <dataToken>,
}
```

_Response (400 - Validation Failed)_

```
{
    "message": "\"menuIDs\" is not allowed to be empty"
}
```

_Response (400 - Menu IDs and Quantitie doesn't have the same length)_

```
{
    "message": "Menu IDs and quantities must have the same number of elements."
}
```

_Response (404 - Error not found)_

```
{
    "message": "Menu not found..."
}
```

_Response (400 - Menu disable)_

```
{
    "message": "<menu_name> not available..."
}
```

---

### POST /payment/midtrans-notification

> Payment handler

_Request Authorization_

```
<bearer_token>
```

_Request Header_

```
<token>
```

_Request Body_

```
not needed
```

_Response (201)_

```
{
    "message": "Payment Success"
}
```

_Response (400 - Payment Failed)_

```
{
    "message": "Payment Unsuccessfully"
}
```

---

### POST /admin/enable-menu/:id

> Activated menu

_Request Params_

```
/<id>
```

_Request Authorization_

```
<bearer_token_admin>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (201)_

```
{
    "message": "Menu successfully enabled."
}
```

_Response (404 - Data not found)_

```
{
    "message": "Menu with ID <menu_id> not found."
}
```

_Response (400 - Data not found)_

```
{
    "message": "Menu with name <menu_name> already active"
}
```

---

### POST /admin/disable-menu/1

> Disabled menu

_Request Params_

```
/<id>
```

_Request Authorization_

```
<bearer_token_admin>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (201)_

```
{
    "message": "Menu successfully disabled."
}
```

_Response (404 - Data not found)_

```
{
    "message": "Menu with ID <menu_id> not found."
}
```

_Response (400 - Data not found)_

```
{
    "message": "Menu with name <menu_name> already disabled"
}
```

---

### GET /menu/purchase/all-order

> Get all menu by id

_Request Authorization_

```
<bearer_token_admin>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{

    "data": [<data_spesific>],

    "status": "Success"

}
```

---

### POST /admin/serve

> Server menu, change status to pick up

_Request Authorization_

```
<bearer_token_admin>
```

_Request Header_

```
not needed
```

_Request Body_

```
"id": <id>
```

_Response (201)_

```
{
    "message": "Menu successfully serve."
}
```

_Response (404 - Data not found)_

```
{
    "message": "Purchase Group with ID <PurchaseGroup_id> not found."
}
```

---

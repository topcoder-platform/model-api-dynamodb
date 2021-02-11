# Steps to add new endpoint

## Add route

You can add new routes in routes folder.
Like the CatsRoutes.js file, you can define routes path
and define which method in which controller can handle
the request from the routes.

## Add controller

Controller contains methods which can handle user's request.
The input parameters are request and response.
You can call services to process user's request and format
response before send it to user in controller's method.

## Add service

Service contains business logic, you can write your business
code in services and access database from service. 

## Add database model

Database models can persist data. You can define new model in models
folder and add the file in index.js. You may need update database table
name definition in config/default.js file or config/test.js file.


# Overall process

User's requeset

<==>

Routes

<==>

Controller

<==>

Serivce

<==>

Database

##
After split the codes into routes/controllers/services/models, 
the overall project will be easy to maintain.

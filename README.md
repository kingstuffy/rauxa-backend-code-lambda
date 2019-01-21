# Contact Manager Adder

* [Summary](#summary)
* [Project Structure](#project-structure)
* [Starting The App](#starting-the-app)
* [Deploying the Project](#build-the-sharp-module)
* [Deploying Project](#build-project)

## Summary

Lambda service for adding new contacts to the application. 
It accepts a user's name, phone number and avatar (which is resized to 180*180);


## Project Structure
* The application is with AWS Lambda.
* Serveless module is used to bootstrap the application to provide a structure and also enable local testing.
* The database used is AWS Aurora serveless.
* Sequelize is the used as the ORM.
* The avatar of the image is received in a base64 format. The image is resized using Shartp before being uploaded to Amazon s3.
* The docker imaage `lambci/lambda` is used to build the sharp module for the linux lambda environment.


## Setup
```shell
npm install
```


## Starting The App Locally
```shell
sls offline start --skipCacheInvalidation
```

## Build the sharp module
```shell
npm run dockerbuild
```


## Deploying the Project
```shell
sls deploy
```

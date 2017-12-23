# toggles.io

## Structure of this repository

This repository is being split into 2 major directories - `client` and `api`.
The `client` part contains all code necessary to build and deploy single page
web application for toggles.io. The `api` part contains all code necessary to
build and deploy server providing the HTTP API to be consumed by the client.

These two are logically separate projects in terms that we aim to make them
disconnected. However, as `api` and `client` form a single usable application
it makes sense to keep them in a single repository, use single versioning, and
release tagging. At the point of the project we are in now it's highly likely that
each release might contain breaking changes in the API and client will need to
accomodate for it. This is why it just makes thing simpler to store both
in a single repository which can ease the pain of synchronizing versions and
releases.

Please keep in mind, that we aim to have `client` and `api` part entirely
logically separate anyways, so that at any point in time they can be extracted
to separate repositories. This is why each of these directories has it's
own `README` file, uses it's own build system and dependency manager. Please
consult `README` in these directories for further details on testing, building
and deploying `client` and `api` part.

## Before you install

Before you proceed any further please makes sure that you have an Amazon AWS
account and that you know your **AWS_ACCESS_KEY_ID** and **AWS_SECRET_ACCESS_KEY**.
Make sure that these variables are exported in your teminal. You can do this
by issuing:

    export AWS_ACCESS_KEY_ID=<your access key id>
    export AWS_SECRET_ACCESS_KEY=<your secret access key>

Making sure of this can save you a lot of hair-pulling later.

## Shared resources

This is a summary of shared resources that are used by both `client` and
`api` part of the project. Please make sure to create them before you proceed
any further by running:

    $ STAGE=dev \
    	REGION=<aws region> \
    	APP_ID=<unique app id> \
    	ADMIN_USERNAME=<username of first admin user> \
        ADMIN_EMAIL=<email of first admin user> \
        ADMIN_NAME=<full name of first admin user> \
    	serverless deploy --verbose

This command will create all required resources to be shared between the client
and the api part of the project. Please note the output of this command (**Stack Outputs**).
You will need it in further steps.

## Shared resources explained

### Amazon Cognito User Pool

The cognito user pool is a AWS Service that is used by both client and api for
managing users.

## Going further

If you have successfuly createdall shared resources you can go to `api`
and `client` directories (in that order)  and see their "README.md" files
on info how to deploy them.

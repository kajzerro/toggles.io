# toggles.io Single Page Web Application

## Installing

After you check out this repository you can just `cd` into this directory (**client**)
and run:

    $ yarn install

This will fetch all dependencies required to run this project

## Testing

You can lint the project using:

    $ yarn lint

During development (when running standalone builds and/or development server) linting
is turned on by default, but you can still run it as a separate CLI command.

To run the tests do:

    $ yarn test

This will run the most rudimentary test suite. The test runner is **jest** so you can use
a watch mode in separate terminal when doing development:

    $ yarn test --watch

Also, you can generate coverage report with:

    $ yarn test --coverage

In general any option supported by **jest** will be supported when running `yarn test`.

## Development

You can run development server using:

    $ CLIENT_APP_ID=<client app id> USER_POOL_ID=<user pool id> API_ROOT=<api url> yarn develop

The development server will start on **http://localhost:8080**. The app is configured
to hot-reload JS code, and styles (styles are done with **radium**, to they're effectively
JS too).

**CLIENT_APP_ID** should be set to whatever was given to you as *TogglesUserPoolClientOutput* after
successfuly creating the shared resources (please see README.md in the root directory for details) 

**USER_POOL_ID** should be set to whatever was given to you as *TogglesUserPoolOutput* after
successfuly creating the shared resources (please see README.md in the root directory for details)

**API_ROOT** environment variable is required and must point to the url
where API for the application is hosted (i.e. **https://api.toggles.io**)

**NODE_ENV** environment variable is always set to **development** when running the dev
server.

## Building

You can build the client application using:

    $ CLIENT_APP_ID=<client app id> USER_POOL_ID=<user pool id> API_ROOT=<api url> NODE_ENV=<nodeenv> yarn build

**CLIENT_APP_ID**, **USER_POOL_ID** and **API_ROOT** environment variables work exactly
like for the development server. Please note that you must set **NODE_ENV** and it
should be one of **production** or **development**.

Setting **NODE_ENV** to production will output a production ready build, while **NODE_ENV**
set to **development** will output unminified production build with sourcemaps.

## Deploying (and tearing town) the client application

Deploying the application depends on the [aws-cli](https://github.com/aws/aws-cli) tool.
Please just follow the provided install instructions to get it.

You can deploy the client to AWS cloud using our serverless scripts up to the point where
it is accessible through https and cloudfront url. Please proceed with these steps after
you have successfuly built the project.

First you need to create the required bucket, policy and cloudfront distribution.
This is handled for you by the [serverless](http://serverless.com) framework:

    $ APP_ID=<unique app id> STAGE=<stage> REGION=<region> yarn deploy

This will create all the required resouces for you. Please make sure you make **APP_ID**
as unique as possible, as this is a globally unique identifier of the application, so a name
like **myuniquecompany.appname** would do. **<stage>** is the stage of your deployment
(prod/test/dev etc.) and **<region>** is one of
[amazon regions](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions)
where you wish your bucket to be located.

If this command succeeds you can synchronize the contents of **build** directory with the
newly created bucket. It is important that before you do this your **build** directory
contains a correctly build cilent application

    $ APP_ID=<unique app id> STAGE=<stage> REGION=<region> yarn deploy

Make sure that the environment variable you provided and parameters match the ones from previous step.
After completing succeeds, it will print out the url where your application is accessible.
Please keep in mind that this sets up a cloudfront distributon for you which can be really slow
and take over 20 minutes. Just be patient! As long as you only see yellow & green in the terminal
everything is fine. You can call this command after each rebuild - subsequent calls should be much
faster as they don't require re-deploying of cloudfront distribution.

## Summing up

The usual workflow for the **client** part of this repository would be like this:

    $ # clone the repo and go to client directory
    $ git clone https://github.com/pioneerlabs/toggles.io.git
    $ cd client
    $
    $ # run lint and tests to see how it works
    $ yarn lint
    $ yarn test
    $
    $ # develop the app...
    $ API_ROOT=https://dev.api.toggles.mycompany.com yarn develop
    $ # ...and in second terminal
    $ yarn test --watch
    $
    $ # build the production version
    $ CLIENT_APP_ID=<client app id> USER_POOL_ID=<user pool id> API_ROOT=https://prod.api.toggles.mycompany.com NODE_ENV=production yarn build
    $
    $ # deploy and sync the app to aws
    $ APP_ID=toggles.mycompany.com STAGE=prod REGION=eu-west-2 yarn deploy

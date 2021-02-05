[![Experimental Project header](https://github.com/newrelic/opensource-website/raw/master/src/images/categories/Experimental.png)](https://opensource.newrelic.com/oss-category/#experimental)

# A/B Tester
A/B Tester is a demo application that conducts an A/B test on newsletter sign ups. Currently it just serves two versions of a sign up page, more coming soon!

## Contents
* [Getting started](#getting-started)
  * [Development](#development)
  * [Docker](#docker)
  * [Demo-deployer](#demo-deployer)
* [Modifying the configuration](#modifying-the-configuration)
* [API](#api)  
* [Contributing](#contributing)
* [License](#license)

### Getting started
#### Development
* Node.js ^14.15.4
* NPM     ^6.14.10
Move to the `engine` directory
```
cd engine/
```
Install dependencies
```
npm i
```
Run the application
```
node server.js config/default/app_config.json
```
  
#### Docker
This application can also be run through Docker.
```
docker build -t ab-tester .
```
Run the container
```
docker run -d -p 3001:3001 ab-tester
```
**note**: It can also be deployed with New Relic instrumentation:
```
docker run -d -p 3001:3001 -e NEW_RELIC_LICENSE_KEY=<your NR license key> NEW_RELIC_APP_NAME=<the display name> ab-tester
```

#### Demo-deployer
A/B Tester can also be deployer using the [demo-deployer](https://github.com/newrelic/demo-deployer). This deployment includes the New Relic host integration and simulated web traffic.    
After setting up your demo-deployer environment, deploy with this command:
```
docker run -it\
    -v $HOME/demo-deployer/configs/:/mnt/deployer/configs/\
    --entrypoint ruby ghcr.io/newrelic/deployer main.rb -d <ABTESTER CONFIG URL>
```
   
To add the A/B Tester to your demo-deployer configuration use this structure:
```
{
    "id": "abtester",
    "display_name": "Newsletter",
    "source_repository": "https://github.com/newrelic/demo-nodetron.git",
    "deploy_script_path": "deploy/linux/roles",
    "port": 5001,
    "destinations": [
        "host1"
    ],
    "params": {
      "a_unsub_rate": 30,
      "b_unsub_rate": 70,
      "auth_string": "Bearer ABC123",
      "rollover_threshold": 1000
    }
}
```
**Note**: The `params` field is optional and just allows you to change the default configuration values of the A/B Tester. These values are then propagated to their equivalent field in the application config. More on these values below.


### Modifying the configuration
The A/B test is driven through a configuration file. The default file is located here `config/app_config.js`.
```
{
  "port": 3001,
  "unsubRates": {
    "a": 30,
    "b": 70
  },
  "authString": "Bearer ABC123",
  "rolloverThreshold": 1000
}
```

##### port
The port that the server should listen on.
* Default: 3001

#### unsubRates
An object containing the rate of unsubscriptions for version `a` and `b`. If `a` is 30 and `b` is 70, then 30% of unsubscriptions will come from `a` and the 70% from `b`. They must be non-negative integers that add up to 100. 
* Default: 
```
{
  "a": 30,
  "b": 70
}
```

#### authString
This is used to check for authentication on the `/unsubscriptions` and `/end-test` endpoints. The value must be a string.
* Default: "Bearer ABC123"

#### rolloverThreshold
This is used to ensure that the list of subscriptions doesn't grow indefinitely. Subscriptions at the end of the list will be removed when it goes over this threshold. The value must be a positive integer.
* Default: 1000

### API
#### POST /subscribe
Adds an entry to the list of subscriptions.
Expects form data with a `page_version` field, the value can be `a` or `b`.

#### POST /unsubscribe
Removes an entry from the list of unsubscriptions.

#### GET /unsubscriptions
Returns all unsubscriptions as a JSON array.
Expects a `Authorization` header that matches the `authString` set in the application configuration file.

#### POST /end-test
Ends the test, causing the application to only serve the specified version of the page.
Expects a `Authorization` header that matches the `authString` set in the application configuration file.
Expects a `page_version` query parameter with a value of `a` or `b`.

## Contributing

We encourage your contributions to improve ab-tester! Keep in mind when you submit your pull request, you'll need to sign the CLA via the click-through using CLA-Assistant. You only have to sign the CLA one time per project.
If you have any questions, or to execute our corporate CLA, required if your contribution is on behalf of a company,  please drop us an email at opensource@newrelic.com.

## License

ab-tester is licensed under the [Apache 2.0](http://apache.org/licenses/LICENSE-2.0.txt) License. demo-nodetron also uses source code from third-party libraries. You can find full details on which libraries are used and the terms under which they are licensed in the [third-party notices document](./engine/THIRD_PARTY_NOTICES.md).

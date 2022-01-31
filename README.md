## The Tag Checker project
Hi! This is my attempt to solve your technical test. I hope you guys like it.
I wanted to do something extra, so this repository also contains a very simple implementation of a release pipeline for this project.

### Project structure
The implementation itself lives in the `modules` directory - and exports one function, named **checkTags**.

To run it locally, there's a `main.js` file in the root directory of the repo - it includes test lines from the task description and doesn't need any parameters - you can simply run it with `node main.js`

Project tests are using [Jest](https://jestjs.io/) and live in `tests` subdirectory - you can run them with `npm test`

There is also a very simple lambda function, named `handler.js` (such an original name...) - that accepts your text as input - to try it out please use this example:
```
curl -X POST https://dqoysalr5m.execute-api.ap-southeast-2.amazonaws.com/stg -d '{"paragraph":"your test string"}'
```
You should receive a JSON formatted response:
```
{
  "message": "Correctly formatted line"
}
```

You can deploy it manually to AWS Lambda with `sls deploy`

### Pipeline setup
To try something extra - I've added a codebuild build that tests and deploys this project, which runs in codepipeline pipeline which in turn is triggered by commits to `main` branch of this repository.

To set them up, I've included a cloudformation template in the `infra` directory - `pipeline.yaml` - It can be imported into cloudformation in your AWS Console or using AWS CLI - I've used the console, so I had no chance to try the CLI command, but it should work with something like this:
```
aws cloudformation create-stack  --stack-name spokephone  \
  --template-body file://infra/pipeline.yaml --parameters \
  ParameterKey=Environment,ParameterValue=dev \
  ParameterKey=GitHubRepository,ParameterValue='<owner/repository/branch>' \
  ParameterKey=GitHubOAuthToken,ParameterValue='<GitHub OAuthToken Here>'
```

Once set up, the pipeline will react on commits to `main` branch, and first run the BuildTest build - which runs tests using npm, and then packages the project into an artifact file.

If the test build succeeds, a BuildDeploy build runs and deploys the code using `sls deploy`  - script for deployment is `deploy.sh`

Builds are configured using `buildspec-stg.yml` files - where stg is the name of the deploy stage.

### Things to improve
Here's a list of my thoughts, how this project can be further improved (time permitting...)

 - Use a framework, not an ad-hoc script - something light like [Lambda API](https://github.com/jeremydaly/lambda-api) would work
 - Instrument the application (white box monitoring) - potential ideas are - function execution time, error rates, memory consumption and input text length - would help see problems with potential integration partners or clients - increase in error rates or text length may indicate problems on their side. Some of these metrics are provided by CloudWatch
 - Run tests using jest plugin for serverless, not as `npm test` commands
 - Separate pipelines for different stages - for example, **dev** branch can go to dev, commits to **main** goes to stage, and tagged releases go to production

### Ending
Thank you for your consideration. Here's an obligatory 'parse HTML with RegEx' joke:

![**t_he_ ich​**or permeat_es al_l MY FAC_E_](https://i.redd.it/k6sded6b9mkz.png)

[Taken from here :)](https://stackoverflow.com/a/1732454)

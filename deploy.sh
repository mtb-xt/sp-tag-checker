#! /bin/bash

echo "Installing serverless"
echo "_______________________________"

npm install -g serverless
npm install serverless-dynamodb-local serverless-offline serverless-stack-output

echo "Deploying to $env"
echo "_______________________________"
serverless deploy --stage $env --region ap-southeast-2 --package $CODEBUILD_SRC_DIR/artifacts/$env

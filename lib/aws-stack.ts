import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as appsync from "@aws-cdk/aws-appsync-alpha";
export class AwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //this is our app-syn service constructor

    const appSynApi = new appsync.GraphqlApi(this, "appsyncid", {
      name: "appsync-api",
      schema: appsync.Schema.fromAsset("schema/schema.graphql"),
    });
    // The code that defines your stack goes here
    //this is our lambda function
    const lambdaFunctionApi = new cdk.aws_lambda.Function(
      this,
      "restapilambdaid",
      {
        functionName: "lambdaFunctionApi",
        runtime: cdk.aws_lambda.Runtime.NODEJS_14_X,
        code: cdk.aws_lambda.Code.fromAsset("lambda"),
        handler: "index.handler",
      }
    );
    //resolver
    const DataSource = appSynApi.addLambdaDataSource("ds", lambdaFunctionApi);
    DataSource.createResolver({
      typeName: "Mutation",
      fieldName: "addTodo",
    });
    DataSource.createResolver({
      typeName: "Mutation",
      fieldName: "updateTodo",
    });
    DataSource.createResolver({
      typeName: "Query",
      fieldName: "getTodo",
    });
  }
}

//when we write follow these steps app-syn-instance => query =>  data-source => resolver
//when we understand logic app-syn => query =>  resolver => data-source

//this is our api gateway

// const api = new cdk.aws_apigateway.LambdaRestApi(this, "gatewayapiid", {
//   handler: lambdaFunctionApi,
//   proxy: false, //this is true by default
// });

//our selected api routes it means our api will only be available at these endpoints

//localhost:9000/items
// const items = api.root.addResource("items");
// items.addMethod("GET");
// items.addMethod("POST");
//localhost:9000/items/item
// const item = items.addResource("{item}");
// item.addMethod("GET");

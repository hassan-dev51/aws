import { AppSyncResolverEvent } from "aws-lambda";
import addTodo from "./addTodo";
import getTodo from "./getTodo";
import updateTodo from "./updateTodo";

export type Todo = {
  id: string;
  title: string;
  done: boolean;
};

export type User = {
  id: string;
  title: string;
  done: boolean;
};

export async function handler(event: AppSyncResolverEvent<any>) {
  switch (event.info.fieldName) {
    case "addTodo":
      return addTodo(event.arguments.todo);
    case "updateTodo":
      return updateTodo(event.arguments);
    case "getTodo":
      return getTodo();
    default:
      return event;
  }
}

// import {
//   Context,
//   APIGatewayProxyEvent,
//   APIGatewayProxyResult,
// } from "aws-lambda";

// export async function handler(
//   event: APIGatewayProxyEvent,
//   context: Context
// ): Promise<APIGatewayProxyResult> {
//   console.log("context", context);
//   return {
//     statusCode: 200,
//     headers: { "content-type": "text/plain" },
//     body: `Hello cdk you hit at this point${event.path}\n`,
//   };
// }

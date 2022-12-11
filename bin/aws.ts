#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AwsStack } from "../lib/aws-stack";

const app = new cdk.App();
new AwsStack(app, "AwsStack");

//this file is the most important file.it defines the whole app

Gives an external source (like an EventBridge Rule, SNS, or S3) permission to access the Lambda function.

{{% examples %}}
## Example Usage
{{% example %}}
###  Basic Example

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const iamForLambda = new aws.iam.Role("iamForLambda", {assumeRolePolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [{
        Action: "sts:AssumeRole",
        Effect: "Allow",
        Sid: "",
        Principal: {
            Service: "lambda.amazonaws.com",
        },
    }],
})});
const testLambda = new aws.lambda.Function("testLambda", {
    code: new pulumi.asset.FileArchive("lambdatest.zip"),
    role: iamForLambda.arn,
    handler: "exports.handler",
    runtime: "nodejs12.x",
});
const testAlias = new aws.lambda.Alias("testAlias", {
    description: "a sample description",
    functionName: testLambda.name,
    functionVersion: `$LATEST`,
});
const allowCloudwatch = new aws.lambda.Permission("allowCloudwatch", {
    action: "lambda:InvokeFunction",
    "function": testLambda.name,
    principal: "events.amazonaws.com",
    sourceArn: "arn:aws:events:eu-west-1:111122223333:rule/RunDaily",
    qualifier: testAlias.name,
});
```
```python
import pulumi
import json
import pulumi_aws as aws

iam_for_lambda = aws.iam.Role("iamForLambda", assume_role_policy=json.dumps({
    "Version": "2012-10-17",
    "Statement": [{
        "Action": "sts:AssumeRole",
        "Effect": "Allow",
        "Sid": "",
        "Principal": {
            "Service": "lambda.amazonaws.com",
        },
    }],
}))
test_lambda = aws.lambda_.Function("testLambda",
    code=pulumi.FileArchive("lambdatest.zip"),
    role=iam_for_lambda.arn,
    handler="exports.handler",
    runtime="nodejs12.x")
test_alias = aws.lambda_.Alias("testAlias",
    description="a sample description",
    function_name=test_lambda.name,
    function_version="$LATEST")
allow_cloudwatch = aws.lambda_.Permission("allowCloudwatch",
    action="lambda:InvokeFunction",
    function=test_lambda.name,
    principal="events.amazonaws.com",
    source_arn="arn:aws:events:eu-west-1:111122223333:rule/RunDaily",
    qualifier=test_alias.name)
```
```csharp
using System.Collections.Generic;
using System.Text.Json;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var iamForLambda = new Aws.Iam.Role("iamForLambda", new()
    {
        AssumeRolePolicy = JsonSerializer.Serialize(new Dictionary<string, object?>
        {
            ["Version"] = "2012-10-17",
            ["Statement"] = new[]
            {
                new Dictionary<string, object?>
                {
                    ["Action"] = "sts:AssumeRole",
                    ["Effect"] = "Allow",
                    ["Sid"] = "",
                    ["Principal"] = new Dictionary<string, object?>
                    {
                        ["Service"] = "lambda.amazonaws.com",
                    },
                },
            },
        }),
    });

    var testLambda = new Aws.Lambda.Function("testLambda", new()
    {
        Code = new FileArchive("lambdatest.zip"),
        Role = iamForLambda.Arn,
        Handler = "exports.handler",
        Runtime = "nodejs12.x",
    });

    var testAlias = new Aws.Lambda.Alias("testAlias", new()
    {
        Description = "a sample description",
        FunctionName = testLambda.Name,
        FunctionVersion = "$LATEST",
    });

    var allowCloudwatch = new Aws.Lambda.Permission("allowCloudwatch", new()
    {
        Action = "lambda:InvokeFunction",
        Function = testLambda.Name,
        Principal = "events.amazonaws.com",
        SourceArn = "arn:aws:events:eu-west-1:111122223333:rule/RunDaily",
        Qualifier = testAlias.Name,
    });

});
```
```go
package main

import (
	"encoding/json"
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lambda"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		tmpJSON0, err := json.Marshal(map[string]interface{}{
			"Version": "2012-10-17",
			"Statement": []map[string]interface{}{
				map[string]interface{}{
					"Action": "sts:AssumeRole",
					"Effect": "Allow",
					"Sid":    "",
					"Principal": map[string]interface{}{
						"Service": "lambda.amazonaws.com",
					},
				},
			},
		})
		if err != nil {
			return err
		}
		json0 := string(tmpJSON0)
		iamForLambda, err := iam.NewRole(ctx, "iamForLambda", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.String(json0),
		})
		if err != nil {
			return err
		}
		testLambda, err := lambda.NewFunction(ctx, "testLambda", &lambda.FunctionArgs{
			Code:    pulumi.NewFileArchive("lambdatest.zip"),
			Role:    iamForLambda.Arn,
			Handler: pulumi.String("exports.handler"),
			Runtime: pulumi.String("nodejs12.x"),
		})
		if err != nil {
			return err
		}
		testAlias, err := lambda.NewAlias(ctx, "testAlias", &lambda.AliasArgs{
			Description:     pulumi.String("a sample description"),
			FunctionName:    testLambda.Name,
			FunctionVersion: pulumi.String(fmt.Sprintf("$LATEST")),
		})
		if err != nil {
			return err
		}
		_, err = lambda.NewPermission(ctx, "allowCloudwatch", &lambda.PermissionArgs{
			Action:    pulumi.String("lambda:InvokeFunction"),
			Function:  testLambda.Name,
			Principal: pulumi.String("events.amazonaws.com"),
			SourceArn: pulumi.String("arn:aws:events:eu-west-1:111122223333:rule/RunDaily"),
			Qualifier: testAlias.Name,
		})
		if err != nil {
			return err
		}
		return nil
	})
}
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.lambda.Function;
import com.pulumi.aws.lambda.FunctionArgs;
import com.pulumi.aws.lambda.Alias;
import com.pulumi.aws.lambda.AliasArgs;
import com.pulumi.aws.lambda.Permission;
import com.pulumi.aws.lambda.PermissionArgs;
import static com.pulumi.codegen.internal.Serialization.*;
import com.pulumi.asset.FileArchive;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

public class App {
    public static void main(String[] args) {
        Pulumi.run(App::stack);
    }

    public static void stack(Context ctx) {
        var iamForLambda = new Role("iamForLambda", RoleArgs.builder()        
            .assumeRolePolicy(serializeJson(
                jsonObject(
                    jsonProperty("Version", "2012-10-17"),
                    jsonProperty("Statement", jsonArray(jsonObject(
                        jsonProperty("Action", "sts:AssumeRole"),
                        jsonProperty("Effect", "Allow"),
                        jsonProperty("Sid", ""),
                        jsonProperty("Principal", jsonObject(
                            jsonProperty("Service", "lambda.amazonaws.com")
                        ))
                    )))
                )))
            .build());

        var testLambda = new Function("testLambda", FunctionArgs.builder()        
            .code(new FileArchive("lambdatest.zip"))
            .role(iamForLambda.arn())
            .handler("exports.handler")
            .runtime("nodejs12.x")
            .build());

        var testAlias = new Alias("testAlias", AliasArgs.builder()        
            .description("a sample description")
            .functionName(testLambda.name())
            .functionVersion("$LATEST")
            .build());

        var allowCloudwatch = new Permission("allowCloudwatch", PermissionArgs.builder()        
            .action("lambda:InvokeFunction")
            .function(testLambda.name())
            .principal("events.amazonaws.com")
            .sourceArn("arn:aws:events:eu-west-1:111122223333:rule/RunDaily")
            .qualifier(testAlias.name())
            .build());

    }
}
```
```yaml
resources:
  allowCloudwatch:
    type: aws:lambda:Permission
    properties:
      action: lambda:InvokeFunction
      function: ${testLambda.name}
      principal: events.amazonaws.com
      sourceArn: arn:aws:events:eu-west-1:111122223333:rule/RunDaily
      qualifier: ${testAlias.name}
  testAlias:
    type: aws:lambda:Alias
    properties:
      description: a sample description
      functionName: ${testLambda.name}
      functionVersion: $LATEST
  testLambda:
    type: aws:lambda:Function
    properties:
      code:
        Fn::FileArchive: lambdatest.zip
      role: ${iamForLambda.arn}
      handler: exports.handler
      runtime: nodejs12.x
  iamForLambda:
    type: aws:iam:Role
    properties:
      assumeRolePolicy:
        Fn::ToJSON:
          Version: 2012-10-17
          Statement:
            - Action: sts:AssumeRole
              Effect: Allow
              Sid:
              Principal:
                Service: lambda.amazonaws.com
```
{{% /example %}}
{{% example %}}
### Usage with SNS

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const defaultTopic = new aws.sns.Topic("defaultTopic", {});
const defaultRole = new aws.iam.Role("defaultRole", {assumeRolePolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [{
        Action: "sts:AssumeRole",
        Effect: "Allow",
        Sid: "",
        Principal: {
            Service: "lambda.amazonaws.com",
        },
    }],
})});
const func = new aws.lambda.Function("func", {
    code: new pulumi.asset.FileArchive("lambdatest.zip"),
    role: defaultRole.arn,
    handler: "exports.handler",
    runtime: "python3.7",
});
const withSns = new aws.lambda.Permission("withSns", {
    action: "lambda:InvokeFunction",
    "function": func.name,
    principal: "sns.amazonaws.com",
    sourceArn: defaultTopic.arn,
});
const lambda = new aws.sns.TopicSubscription("lambda", {
    topic: defaultTopic.arn,
    protocol: "lambda",
    endpoint: func.arn,
});
```
```python
import pulumi
import json
import pulumi_aws as aws

default_topic = aws.sns.Topic("defaultTopic")
default_role = aws.iam.Role("defaultRole", assume_role_policy=json.dumps({
    "Version": "2012-10-17",
    "Statement": [{
        "Action": "sts:AssumeRole",
        "Effect": "Allow",
        "Sid": "",
        "Principal": {
            "Service": "lambda.amazonaws.com",
        },
    }],
}))
func = aws.lambda_.Function("func",
    code=pulumi.FileArchive("lambdatest.zip"),
    role=default_role.arn,
    handler="exports.handler",
    runtime="python3.7")
with_sns = aws.lambda_.Permission("withSns",
    action="lambda:InvokeFunction",
    function=func.name,
    principal="sns.amazonaws.com",
    source_arn=default_topic.arn)
lambda_ = aws.sns.TopicSubscription("lambda",
    topic=default_topic.arn,
    protocol="lambda",
    endpoint=func.arn)
```
```csharp
using System.Collections.Generic;
using System.Text.Json;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var defaultTopic = new Aws.Sns.Topic("defaultTopic");

    var defaultRole = new Aws.Iam.Role("defaultRole", new()
    {
        AssumeRolePolicy = JsonSerializer.Serialize(new Dictionary<string, object?>
        {
            ["Version"] = "2012-10-17",
            ["Statement"] = new[]
            {
                new Dictionary<string, object?>
                {
                    ["Action"] = "sts:AssumeRole",
                    ["Effect"] = "Allow",
                    ["Sid"] = "",
                    ["Principal"] = new Dictionary<string, object?>
                    {
                        ["Service"] = "lambda.amazonaws.com",
                    },
                },
            },
        }),
    });

    var func = new Aws.Lambda.Function("func", new()
    {
        Code = new FileArchive("lambdatest.zip"),
        Role = defaultRole.Arn,
        Handler = "exports.handler",
        Runtime = "python3.7",
    });

    var withSns = new Aws.Lambda.Permission("withSns", new()
    {
        Action = "lambda:InvokeFunction",
        Function = func.Name,
        Principal = "sns.amazonaws.com",
        SourceArn = defaultTopic.Arn,
    });

    var lambda = new Aws.Sns.TopicSubscription("lambda", new()
    {
        Topic = defaultTopic.Arn,
        Protocol = "lambda",
        Endpoint = func.Arn,
    });

});
```
```go
package main

import (
	"encoding/json"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lambda"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sns"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		defaultTopic, err := sns.NewTopic(ctx, "defaultTopic", nil)
		if err != nil {
			return err
		}
		tmpJSON0, err := json.Marshal(map[string]interface{}{
			"Version": "2012-10-17",
			"Statement": []map[string]interface{}{
				map[string]interface{}{
					"Action": "sts:AssumeRole",
					"Effect": "Allow",
					"Sid":    "",
					"Principal": map[string]interface{}{
						"Service": "lambda.amazonaws.com",
					},
				},
			},
		})
		if err != nil {
			return err
		}
		json0 := string(tmpJSON0)
		defaultRole, err := iam.NewRole(ctx, "defaultRole", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.String(json0),
		})
		if err != nil {
			return err
		}
		_, err = lambda.NewFunction(ctx, "func", &lambda.FunctionArgs{
			Code:    pulumi.NewFileArchive("lambdatest.zip"),
			Role:    defaultRole.Arn,
			Handler: pulumi.String("exports.handler"),
			Runtime: pulumi.String("python3.7"),
		})
		if err != nil {
			return err
		}
		_, err = lambda.NewPermission(ctx, "withSns", &lambda.PermissionArgs{
			Action:    pulumi.String("lambda:InvokeFunction"),
			Function:  _func.Name,
			Principal: pulumi.String("sns.amazonaws.com"),
			SourceArn: defaultTopic.Arn,
		})
		if err != nil {
			return err
		}
		_, err = sns.NewTopicSubscription(ctx, "lambda", &sns.TopicSubscriptionArgs{
			Topic:    defaultTopic.Arn,
			Protocol: pulumi.String("lambda"),
			Endpoint: _func.Arn,
		})
		if err != nil {
			return err
		}
		return nil
	})
}
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.sns.Topic;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.lambda.Function;
import com.pulumi.aws.lambda.FunctionArgs;
import com.pulumi.aws.lambda.Permission;
import com.pulumi.aws.lambda.PermissionArgs;
import com.pulumi.aws.sns.TopicSubscription;
import com.pulumi.aws.sns.TopicSubscriptionArgs;
import static com.pulumi.codegen.internal.Serialization.*;
import com.pulumi.asset.FileArchive;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

public class App {
    public static void main(String[] args) {
        Pulumi.run(App::stack);
    }

    public static void stack(Context ctx) {
        var defaultTopic = new Topic("defaultTopic");

        var defaultRole = new Role("defaultRole", RoleArgs.builder()        
            .assumeRolePolicy(serializeJson(
                jsonObject(
                    jsonProperty("Version", "2012-10-17"),
                    jsonProperty("Statement", jsonArray(jsonObject(
                        jsonProperty("Action", "sts:AssumeRole"),
                        jsonProperty("Effect", "Allow"),
                        jsonProperty("Sid", ""),
                        jsonProperty("Principal", jsonObject(
                            jsonProperty("Service", "lambda.amazonaws.com")
                        ))
                    )))
                )))
            .build());

        var func = new Function("func", FunctionArgs.builder()        
            .code(new FileArchive("lambdatest.zip"))
            .role(defaultRole.arn())
            .handler("exports.handler")
            .runtime("python3.7")
            .build());

        var withSns = new Permission("withSns", PermissionArgs.builder()        
            .action("lambda:InvokeFunction")
            .function(func.name())
            .principal("sns.amazonaws.com")
            .sourceArn(defaultTopic.arn())
            .build());

        var lambda = new TopicSubscription("lambda", TopicSubscriptionArgs.builder()        
            .topic(defaultTopic.arn())
            .protocol("lambda")
            .endpoint(func.arn())
            .build());

    }
}
```
```yaml
resources:
  withSns:
    type: aws:lambda:Permission
    properties:
      action: lambda:InvokeFunction
      function: ${func.name}
      principal: sns.amazonaws.com
      sourceArn: ${defaultTopic.arn}
  defaultTopic:
    type: aws:sns:Topic
  lambda:
    type: aws:sns:TopicSubscription
    properties:
      topic: ${defaultTopic.arn}
      protocol: lambda
      endpoint: ${func.arn}
  func:
    type: aws:lambda:Function
    properties:
      code:
        Fn::FileArchive: lambdatest.zip
      role: ${defaultRole.arn}
      handler: exports.handler
      runtime: python3.7
  defaultRole:
    type: aws:iam:Role
    properties:
      assumeRolePolicy:
        Fn::ToJSON:
          Version: 2012-10-17
          Statement:
            - Action: sts:AssumeRole
              Effect: Allow
              Sid:
              Principal:
                Service: lambda.amazonaws.com
```
{{% /example %}}
{{% example %}}
### Specify Lambda permissions for API Gateway REST API

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const myDemoAPI = new aws.apigateway.RestApi("MyDemoAPI", {
    description: "This is my API for demonstration purposes",
});
const lambdaPermission = new aws.lambda.Permission("lambda_permission", {
    action: "lambda:InvokeFunction",
    function: "MyDemoFunction",
    principal: "apigateway.amazonaws.com",
    sourceArn: pulumi.interpolate`${myDemoAPI.executionArn}/*/*/*`,
});
```
```python
import pulumi
import pulumi_aws as aws

my_demo_api = aws.apigateway.RestApi("myDemoAPI", description="This is my API for demonstration purposes")
lambda_permission = aws.lambda_.Permission("lambdaPermission",
    action="lambda:InvokeFunction",
    function="MyDemoFunction",
    principal="apigateway.amazonaws.com",
    source_arn=my_demo_api.execution_arn.apply(lambda execution_arn: f"{execution_arn}/*/*/*"))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var myDemoAPI = new Aws.ApiGateway.RestApi("myDemoAPI", new()
    {
        Description = "This is my API for demonstration purposes",
    });

    var lambdaPermission = new Aws.Lambda.Permission("lambdaPermission", new()
    {
        Action = "lambda:InvokeFunction",
        Function = "MyDemoFunction",
        Principal = "apigateway.amazonaws.com",
        SourceArn = myDemoAPI.ExecutionArn.Apply(executionArn => $"{executionArn}/*/*/*"),
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/apigateway"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lambda"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		myDemoAPI, err := apigateway.NewRestApi(ctx, "myDemoAPI", &apigateway.RestApiArgs{
			Description: pulumi.String("This is my API for demonstration purposes"),
		})
		if err != nil {
			return err
		}
		_, err = lambda.NewPermission(ctx, "lambdaPermission", &lambda.PermissionArgs{
			Action:    pulumi.String("lambda:InvokeFunction"),
			Function:  pulumi.Any("MyDemoFunction"),
			Principal: pulumi.String("apigateway.amazonaws.com"),
			SourceArn: myDemoAPI.ExecutionArn.ApplyT(func(executionArn string) (string, error) {
				return fmt.Sprintf("%v/*/*/*", executionArn), nil
			}).(pulumi.StringOutput),
		})
		if err != nil {
			return err
		}
		return nil
	})
}
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.apigateway.RestApi;
import com.pulumi.aws.apigateway.RestApiArgs;
import com.pulumi.aws.lambda.Permission;
import com.pulumi.aws.lambda.PermissionArgs;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

public class App {
    public static void main(String[] args) {
        Pulumi.run(App::stack);
    }

    public static void stack(Context ctx) {
        var myDemoAPI = new RestApi("myDemoAPI", RestApiArgs.builder()        
            .description("This is my API for demonstration purposes")
            .build());

        var lambdaPermission = new Permission("lambdaPermission", PermissionArgs.builder()        
            .action("lambda:InvokeFunction")
            .function("MyDemoFunction")
            .principal("apigateway.amazonaws.com")
            .sourceArn(myDemoAPI.executionArn().applyValue(executionArn -> String.format("%s/*/*/*", executionArn)))
            .build());

    }
}
```
```yaml
resources:
  myDemoAPI:
    type: aws:apigateway:RestApi
    properties:
      description: This is my API for demonstration purposes
  lambdaPermission:
    type: aws:lambda:Permission
    properties:
      action: lambda:InvokeFunction
      function: MyDemoFunction
      principal: apigateway.amazonaws.com
      # The /*/*/* part allows invocation from any stage, method and resource path
      #     // within API Gateway REST API.
      sourceArn: ${myDemoAPI.executionArn}/*/*/*
```
{{% /example %}}
{{% /examples %}}
## Usage with CloudWatch log group

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const defaultLogGroup = new aws.cloudwatch.LogGroup("defaultLogGroup", {});
const defaultRole = new aws.iam.Role("defaultRole", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
`});
const loggingFunction = new aws.lambda.Function("loggingFunction", {
    code: new pulumi.asset.FileArchive("lamba_logging.zip"),
    handler: "exports.handler",
    role: defaultRole.arn,
    runtime: "python3.7",
});
const loggingPermission = new aws.lambda.Permission("loggingPermission", {
    action: "lambda:InvokeFunction",
    "function": loggingFunction.name,
    principal: "logs.eu-west-1.amazonaws.com",
    sourceArn: pulumi.interpolate`${defaultLogGroup.arn}:*`,
});
const loggingLogSubscriptionFilter = new aws.cloudwatch.LogSubscriptionFilter("loggingLogSubscriptionFilter", {
    destinationArn: loggingFunction.arn,
    filterPattern: "",
    logGroup: defaultLogGroup.name,
}, {
    dependsOn: [loggingPermission],
});
```
```python
import pulumi
import pulumi_aws as aws

default_log_group = aws.cloudwatch.LogGroup("defaultLogGroup")
default_role = aws.iam.Role("defaultRole", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
""")
logging_function = aws.lambda_.Function("loggingFunction",
    code=pulumi.FileArchive("lamba_logging.zip"),
    handler="exports.handler",
    role=default_role.arn,
    runtime="python3.7")
logging_permission = aws.lambda_.Permission("loggingPermission",
    action="lambda:InvokeFunction",
    function=logging_function.name,
    principal="logs.eu-west-1.amazonaws.com",
    source_arn=default_log_group.arn.apply(lambda arn: f"{arn}:*"))
logging_log_subscription_filter = aws.cloudwatch.LogSubscriptionFilter("loggingLogSubscriptionFilter",
    destination_arn=logging_function.arn,
    filter_pattern="",
    log_group=default_log_group.name,
    opts=pulumi.ResourceOptions(depends_on=[logging_permission]))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var defaultLogGroup = new Aws.CloudWatch.LogGroup("defaultLogGroup");

    var defaultRole = new Aws.Iam.Role("defaultRole", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Action"": ""sts:AssumeRole"",
      ""Principal"": {
        ""Service"": ""lambda.amazonaws.com""
      },
      ""Effect"": ""Allow"",
      ""Sid"": """"
    }
  ]
}
",
    });

    var loggingFunction = new Aws.Lambda.Function("loggingFunction", new()
    {
        Code = new FileArchive("lamba_logging.zip"),
        Handler = "exports.handler",
        Role = defaultRole.Arn,
        Runtime = "python3.7",
    });

    var loggingPermission = new Aws.Lambda.Permission("loggingPermission", new()
    {
        Action = "lambda:InvokeFunction",
        Function = loggingFunction.Name,
        Principal = "logs.eu-west-1.amazonaws.com",
        SourceArn = defaultLogGroup.Arn.Apply(arn => $"{arn}:*"),
    });

    var loggingLogSubscriptionFilter = new Aws.CloudWatch.LogSubscriptionFilter("loggingLogSubscriptionFilter", new()
    {
        DestinationArn = loggingFunction.Arn,
        FilterPattern = "",
        LogGroup = defaultLogGroup.Name,
    }, new CustomResourceOptions
    {
        DependsOn = new[]
        {
            loggingPermission,
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudwatch"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lambda"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		defaultLogGroup, err := cloudwatch.NewLogGroup(ctx, "defaultLogGroup", nil)
		if err != nil {
			return err
		}
		defaultRole, err := iam.NewRole(ctx, "defaultRole", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
`)),
		})
		if err != nil {
			return err
		}
		loggingFunction, err := lambda.NewFunction(ctx, "loggingFunction", &lambda.FunctionArgs{
			Code:    pulumi.NewFileArchive("lamba_logging.zip"),
			Handler: pulumi.String("exports.handler"),
			Role:    defaultRole.Arn,
			Runtime: pulumi.String("python3.7"),
		})
		if err != nil {
			return err
		}
		loggingPermission, err := lambda.NewPermission(ctx, "loggingPermission", &lambda.PermissionArgs{
			Action:    pulumi.String("lambda:InvokeFunction"),
			Function:  loggingFunction.Name,
			Principal: pulumi.String("logs.eu-west-1.amazonaws.com"),
			SourceArn: defaultLogGroup.Arn.ApplyT(func(arn string) (string, error) {
				return fmt.Sprintf("%v:*", arn), nil
			}).(pulumi.StringOutput),
		})
		if err != nil {
			return err
		}
		_, err = cloudwatch.NewLogSubscriptionFilter(ctx, "loggingLogSubscriptionFilter", &cloudwatch.LogSubscriptionFilterArgs{
			DestinationArn: loggingFunction.Arn,
			FilterPattern:  pulumi.String(""),
			LogGroup:       defaultLogGroup.Name,
		}, pulumi.DependsOn([]pulumi.Resource{
			loggingPermission,
		}))
		if err != nil {
			return err
		}
		return nil
	})
}
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.cloudwatch.LogGroup;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.lambda.Function;
import com.pulumi.aws.lambda.FunctionArgs;
import com.pulumi.aws.lambda.Permission;
import com.pulumi.aws.lambda.PermissionArgs;
import com.pulumi.aws.cloudwatch.LogSubscriptionFilter;
import com.pulumi.aws.cloudwatch.LogSubscriptionFilterArgs;
import com.pulumi.resources.CustomResourceOptions;
import com.pulumi.asset.FileArchive;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

public class App {
    public static void main(String[] args) {
        Pulumi.run(App::stack);
    }

    public static void stack(Context ctx) {
        var defaultLogGroup = new LogGroup("defaultLogGroup");

        var defaultRole = new Role("defaultRole", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
            """)
            .build());

        var loggingFunction = new Function("loggingFunction", FunctionArgs.builder()        
            .code(new FileArchive("lamba_logging.zip"))
            .handler("exports.handler")
            .role(defaultRole.arn())
            .runtime("python3.7")
            .build());

        var loggingPermission = new Permission("loggingPermission", PermissionArgs.builder()        
            .action("lambda:InvokeFunction")
            .function(loggingFunction.name())
            .principal("logs.eu-west-1.amazonaws.com")
            .sourceArn(defaultLogGroup.arn().applyValue(arn -> String.format("%s:*", arn)))
            .build());

        var loggingLogSubscriptionFilter = new LogSubscriptionFilter("loggingLogSubscriptionFilter", LogSubscriptionFilterArgs.builder()        
            .destinationArn(loggingFunction.arn())
            .filterPattern("")
            .logGroup(defaultLogGroup.name())
            .build(), CustomResourceOptions.builder()
                .dependsOn(loggingPermission)
                .build());

    }
}
```
```yaml
resources:
  loggingPermission:
    type: aws:lambda:Permission
    properties:
      action: lambda:InvokeFunction
      function: ${loggingFunction.name}
      principal: logs.eu-west-1.amazonaws.com
      sourceArn: ${defaultLogGroup.arn}:*
  defaultLogGroup:
    type: aws:cloudwatch:LogGroup
  loggingLogSubscriptionFilter:
    type: aws:cloudwatch:LogSubscriptionFilter
    properties:
      destinationArn: ${loggingFunction.arn}
      filterPattern:
      logGroup: ${defaultLogGroup.name}
    options:
      dependson:
        - ${loggingPermission}
  loggingFunction:
    type: aws:lambda:Function
    properties:
      code:
        Fn::FileArchive: lamba_logging.zip
      handler: exports.handler
      role: ${defaultRole.arn}
      runtime: python3.7
  defaultRole:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              },
              "Effect": "Allow",
              "Sid": ""
            }
          ]
        }
```


## Import

Lambda permission statements can be imported using function_name/statement_id, with an optional qualifier, e.g.,

```sh
 $ pulumi import aws:lambda/permission:Permission test_lambda_permission my_test_lambda_function/AllowExecutionFromCloudWatch
```



```sh
 $ pulumi import aws:lambda/permission:Permission test_lambda_permission my_test_lambda_function:qualifier_name/AllowExecutionFromCloudWatch
```

 
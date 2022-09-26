Provides an API Gateway Authorizer.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const demoRestApi = new aws.apigateway.RestApi("demoRestApi", {});
const invocationRole = new aws.iam.Role("invocationRole", {
    path: "/",
    assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
`,
});
const lambda = new aws.iam.Role("lambda", {assumeRolePolicy: `{
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
const authorizer = new aws.lambda.Function("authorizer", {
    code: new pulumi.asset.FileArchive("lambda-function.zip"),
    role: lambda.arn,
    handler: "exports.example",
});
const demoAuthorizer = new aws.apigateway.Authorizer("demoAuthorizer", {
    restApi: demoRestApi.id,
    authorizerUri: authorizer.invokeArn,
    authorizerCredentials: invocationRole.arn,
});
const invocationPolicy = new aws.iam.RolePolicy("invocationPolicy", {
    role: invocationRole.id,
    policy: pulumi.interpolate`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "lambda:InvokeFunction",
      "Effect": "Allow",
      "Resource": "${authorizer.arn}"
    }
  ]
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

demo_rest_api = aws.apigateway.RestApi("demoRestApi")
invocation_role = aws.iam.Role("invocationRole",
    path="/",
    assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
""")
lambda_ = aws.iam.Role("lambda", assume_role_policy="""{
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
authorizer = aws.lambda_.Function("authorizer",
    code=pulumi.FileArchive("lambda-function.zip"),
    role=lambda_.arn,
    handler="exports.example")
demo_authorizer = aws.apigateway.Authorizer("demoAuthorizer",
    rest_api=demo_rest_api.id,
    authorizer_uri=authorizer.invoke_arn,
    authorizer_credentials=invocation_role.arn)
invocation_policy = aws.iam.RolePolicy("invocationPolicy",
    role=invocation_role.id,
    policy=authorizer.arn.apply(lambda arn: f"""{{
  "Version": "2012-10-17",
  "Statement": [
    {{
      "Action": "lambda:InvokeFunction",
      "Effect": "Allow",
      "Resource": "{arn}"
    }}
  ]
}}
"""))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var demoRestApi = new Aws.ApiGateway.RestApi("demoRestApi");

    var invocationRole = new Aws.Iam.Role("invocationRole", new()
    {
        Path = "/",
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Action"": ""sts:AssumeRole"",
      ""Principal"": {
        ""Service"": ""apigateway.amazonaws.com""
      },
      ""Effect"": ""Allow"",
      ""Sid"": """"
    }
  ]
}
",
    });

    var lambda = new Aws.Iam.Role("lambda", new()
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

    var authorizer = new Aws.Lambda.Function("authorizer", new()
    {
        Code = new FileArchive("lambda-function.zip"),
        Role = lambda.Arn,
        Handler = "exports.example",
    });

    var demoAuthorizer = new Aws.ApiGateway.Authorizer("demoAuthorizer", new()
    {
        RestApi = demoRestApi.Id,
        AuthorizerUri = authorizer.InvokeArn,
        AuthorizerCredentials = invocationRole.Arn,
    });

    var invocationPolicy = new Aws.Iam.RolePolicy("invocationPolicy", new()
    {
        Role = invocationRole.Id,
        Policy = authorizer.Arn.Apply(arn => @$"{{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {{
      ""Action"": ""lambda:InvokeFunction"",
      ""Effect"": ""Allow"",
      ""Resource"": ""{arn}""
    }}
  ]
}}
"),
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/apigateway"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lambda"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		demoRestApi, err := apigateway.NewRestApi(ctx, "demoRestApi", nil)
		if err != nil {
			return err
		}
		invocationRole, err := iam.NewRole(ctx, "invocationRole", &iam.RoleArgs{
			Path: pulumi.String("/"),
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
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
		lambda, err := iam.NewRole(ctx, "lambda", &iam.RoleArgs{
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
		authorizer, err := lambda.NewFunction(ctx, "authorizer", &lambda.FunctionArgs{
			Code:    pulumi.NewFileArchive("lambda-function.zip"),
			Role:    lambda.Arn,
			Handler: pulumi.String("exports.example"),
		})
		if err != nil {
			return err
		}
		_, err = apigateway.NewAuthorizer(ctx, "demoAuthorizer", &apigateway.AuthorizerArgs{
			RestApi:               demoRestApi.ID(),
			AuthorizerUri:         authorizer.InvokeArn,
			AuthorizerCredentials: invocationRole.Arn,
		})
		if err != nil {
			return err
		}
		_, err = iam.NewRolePolicy(ctx, "invocationPolicy", &iam.RolePolicyArgs{
			Role: invocationRole.ID(),
			Policy: authorizer.Arn.ApplyT(func(arn string) (string, error) {
				return fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "lambda:InvokeFunction",
      "Effect": "Allow",
      "Resource": "%v"
    }
  ]
}
`, arn), nil
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
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.lambda.Function;
import com.pulumi.aws.lambda.FunctionArgs;
import com.pulumi.aws.apigateway.Authorizer;
import com.pulumi.aws.apigateway.AuthorizerArgs;
import com.pulumi.aws.iam.RolePolicy;
import com.pulumi.aws.iam.RolePolicyArgs;
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
        var demoRestApi = new RestApi("demoRestApi");

        var invocationRole = new Role("invocationRole", RoleArgs.builder()        
            .path("/")
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
            """)
            .build());

        var lambda = new Role("lambda", RoleArgs.builder()        
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

        var authorizer = new Function("authorizer", FunctionArgs.builder()        
            .code(new FileArchive("lambda-function.zip"))
            .role(lambda.arn())
            .handler("exports.example")
            .build());

        var demoAuthorizer = new Authorizer("demoAuthorizer", AuthorizerArgs.builder()        
            .restApi(demoRestApi.id())
            .authorizerUri(authorizer.invokeArn())
            .authorizerCredentials(invocationRole.arn())
            .build());

        var invocationPolicy = new RolePolicy("invocationPolicy", RolePolicyArgs.builder()        
            .role(invocationRole.id())
            .policy(authorizer.arn().applyValue(arn -> """
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "lambda:InvokeFunction",
      "Effect": "Allow",
      "Resource": "%s"
    }
  ]
}
", arn)))
            .build());

    }
}
```
```yaml
resources:
  demoAuthorizer:
    type: aws:apigateway:Authorizer
    properties:
      restApi: ${demoRestApi.id}
      authorizerUri: ${authorizer.invokeArn}
      authorizerCredentials: ${invocationRole.arn}
  demoRestApi:
    type: aws:apigateway:RestApi
  invocationRole:
    type: aws:iam:Role
    properties:
      path: /
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Principal": {
                "Service": "apigateway.amazonaws.com"
              },
              "Effect": "Allow",
              "Sid": ""
            }
          ]
        }
  invocationPolicy:
    type: aws:iam:RolePolicy
    properties:
      role: ${invocationRole.id}
      policy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": "lambda:InvokeFunction",
              "Effect": "Allow",
              "Resource": "${authorizer.arn}"
            }
          ]
        }
  lambda:
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
  authorizer:
    type: aws:lambda:Function
    properties:
      code:
        Fn::FileArchive: lambda-function.zip
      role: ${lambda.arn}
      handler: exports.example
```
{{% /example %}}
{{% /examples %}}

## Import

AWS API Gateway Authorizer can be imported using the `REST-API-ID/AUTHORIZER-ID`, e.g.,

```sh
 $ pulumi import aws:apigateway/authorizer:Authorizer authorizer 12345abcde/example
```

 
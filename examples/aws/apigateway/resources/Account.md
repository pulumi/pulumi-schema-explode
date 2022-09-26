Provides a settings of an API Gateway Account. Settings is applied region-wide per `provider` block.

> **Note:** As there is no API method for deleting account settings or resetting it to defaults, destroying this resource will keep your account settings intact

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const cloudwatchRole = new aws.iam.Role("cloudwatchRole", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
`});
const demo = new aws.apigateway.Account("demo", {cloudwatchRoleArn: cloudwatchRole.arn});
const cloudwatchRolePolicy = new aws.iam.RolePolicy("cloudwatchRolePolicy", {
    role: cloudwatchRole.id,
    policy: `{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:DescribeLogGroups",
                "logs:DescribeLogStreams",
                "logs:PutLogEvents",
                "logs:GetLogEvents",
                "logs:FilterLogEvents"
            ],
            "Resource": "*"
        }
    ]
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

cloudwatch_role = aws.iam.Role("cloudwatchRole", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
""")
demo = aws.apigateway.Account("demo", cloudwatch_role_arn=cloudwatch_role.arn)
cloudwatch_role_policy = aws.iam.RolePolicy("cloudwatchRolePolicy",
    role=cloudwatch_role.id,
    policy="""{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:DescribeLogGroups",
                "logs:DescribeLogStreams",
                "logs:PutLogEvents",
                "logs:GetLogEvents",
                "logs:FilterLogEvents"
            ],
            "Resource": "*"
        }
    ]
}
""")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var cloudwatchRole = new Aws.Iam.Role("cloudwatchRole", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Sid"": """",
      ""Effect"": ""Allow"",
      ""Principal"": {
        ""Service"": ""apigateway.amazonaws.com""
      },
      ""Action"": ""sts:AssumeRole""
    }
  ]
}
",
    });

    var demo = new Aws.ApiGateway.Account("demo", new()
    {
        CloudwatchRoleArn = cloudwatchRole.Arn,
    });

    var cloudwatchRolePolicy = new Aws.Iam.RolePolicy("cloudwatchRolePolicy", new()
    {
        Role = cloudwatchRole.Id,
        Policy = @"{
    ""Version"": ""2012-10-17"",
    ""Statement"": [
        {
            ""Effect"": ""Allow"",
            ""Action"": [
                ""logs:CreateLogGroup"",
                ""logs:CreateLogStream"",
                ""logs:DescribeLogGroups"",
                ""logs:DescribeLogStreams"",
                ""logs:PutLogEvents"",
                ""logs:GetLogEvents"",
                ""logs:FilterLogEvents""
            ],
            ""Resource"": ""*""
        }
    ]
}
",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/apigateway"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		cloudwatchRole, err := iam.NewRole(ctx, "cloudwatchRole", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
`)),
		})
		if err != nil {
			return err
		}
		_, err = apigateway.NewAccount(ctx, "demo", &apigateway.AccountArgs{
			CloudwatchRoleArn: cloudwatchRole.Arn,
		})
		if err != nil {
			return err
		}
		_, err = iam.NewRolePolicy(ctx, "cloudwatchRolePolicy", &iam.RolePolicyArgs{
			Role: cloudwatchRole.ID(),
			Policy: pulumi.Any(fmt.Sprintf(`{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:DescribeLogGroups",
                "logs:DescribeLogStreams",
                "logs:PutLogEvents",
                "logs:GetLogEvents",
                "logs:FilterLogEvents"
            ],
            "Resource": "*"
        }
    ]
}
`)),
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
import com.pulumi.aws.apigateway.Account;
import com.pulumi.aws.apigateway.AccountArgs;
import com.pulumi.aws.iam.RolePolicy;
import com.pulumi.aws.iam.RolePolicyArgs;
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
        var cloudwatchRole = new Role("cloudwatchRole", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
            """)
            .build());

        var demo = new Account("demo", AccountArgs.builder()        
            .cloudwatchRoleArn(cloudwatchRole.arn())
            .build());

        var cloudwatchRolePolicy = new RolePolicy("cloudwatchRolePolicy", RolePolicyArgs.builder()        
            .role(cloudwatchRole.id())
            .policy("""
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:DescribeLogGroups",
                "logs:DescribeLogStreams",
                "logs:PutLogEvents",
                "logs:GetLogEvents",
                "logs:FilterLogEvents"
            ],
            "Resource": "*"
        }
    ]
}
            """)
            .build());

    }
}
```
```yaml
resources:
  demo:
    type: aws:apigateway:Account
    properties:
      cloudwatchRoleArn: ${cloudwatchRole.arn}
  cloudwatchRole:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Sid": "",
              "Effect": "Allow",
              "Principal": {
                "Service": "apigateway.amazonaws.com"
              },
              "Action": "sts:AssumeRole"
            }
          ]
        }
  cloudwatchRolePolicy:
    type: aws:iam:RolePolicy
    properties:
      role: ${cloudwatchRole.id}
      policy: |
        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": [
                        "logs:CreateLogGroup",
                        "logs:CreateLogStream",
                        "logs:DescribeLogGroups",
                        "logs:DescribeLogStreams",
                        "logs:PutLogEvents",
                        "logs:GetLogEvents",
                        "logs:FilterLogEvents"
                    ],
                    "Resource": "*"
                }
            ]
        }
```
{{% /example %}}
{{% /examples %}}

## Import

API Gateway Accounts can be imported using the word `api-gateway-account`, e.g.,

```sh
 $ pulumi import aws:apigateway/account:Account demo api-gateway-account
```

 
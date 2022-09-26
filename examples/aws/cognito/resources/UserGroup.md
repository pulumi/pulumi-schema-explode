Provides a Cognito User Group resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const mainUserPool = new aws.cognito.UserPool("mainUserPool", {});
const groupRole = new aws.iam.Role("groupRole", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Federated": "cognito-identity.amazonaws.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": "us-east-1:12345678-dead-beef-cafe-123456790ab"
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "authenticated"
        }
      }
    }
  ]
}
`});
const mainUserGroup = new aws.cognito.UserGroup("mainUserGroup", {
    userPoolId: mainUserPool.id,
    description: "Managed by Pulumi",
    precedence: 42,
    roleArn: groupRole.arn,
});
```
```python
import pulumi
import pulumi_aws as aws

main_user_pool = aws.cognito.UserPool("mainUserPool")
group_role = aws.iam.Role("groupRole", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Federated": "cognito-identity.amazonaws.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": "us-east-1:12345678-dead-beef-cafe-123456790ab"
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "authenticated"
        }
      }
    }
  ]
}
""")
main_user_group = aws.cognito.UserGroup("mainUserGroup",
    user_pool_id=main_user_pool.id,
    description="Managed by Pulumi",
    precedence=42,
    role_arn=group_role.arn)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var mainUserPool = new Aws.Cognito.UserPool("mainUserPool");

    var groupRole = new Aws.Iam.Role("groupRole", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Sid"": """",
      ""Effect"": ""Allow"",
      ""Principal"": {
        ""Federated"": ""cognito-identity.amazonaws.com""
      },
      ""Action"": ""sts:AssumeRoleWithWebIdentity"",
      ""Condition"": {
        ""StringEquals"": {
          ""cognito-identity.amazonaws.com:aud"": ""us-east-1:12345678-dead-beef-cafe-123456790ab""
        },
        ""ForAnyValue:StringLike"": {
          ""cognito-identity.amazonaws.com:amr"": ""authenticated""
        }
      }
    }
  ]
}
",
    });

    var mainUserGroup = new Aws.Cognito.UserGroup("mainUserGroup", new()
    {
        UserPoolId = mainUserPool.Id,
        Description = "Managed by Pulumi",
        Precedence = 42,
        RoleArn = groupRole.Arn,
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cognito"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		mainUserPool, err := cognito.NewUserPool(ctx, "mainUserPool", nil)
		if err != nil {
			return err
		}
		groupRole, err := iam.NewRole(ctx, "groupRole", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Federated": "cognito-identity.amazonaws.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": "us-east-1:12345678-dead-beef-cafe-123456790ab"
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "authenticated"
        }
      }
    }
  ]
}
`)),
		})
		if err != nil {
			return err
		}
		_, err = cognito.NewUserGroup(ctx, "mainUserGroup", &cognito.UserGroupArgs{
			UserPoolId:  mainUserPool.ID(),
			Description: pulumi.String("Managed by Pulumi"),
			Precedence:  pulumi.Int(42),
			RoleArn:     groupRole.Arn,
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
import com.pulumi.aws.cognito.UserPool;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.cognito.UserGroup;
import com.pulumi.aws.cognito.UserGroupArgs;
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
        var mainUserPool = new UserPool("mainUserPool");

        var groupRole = new Role("groupRole", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Federated": "cognito-identity.amazonaws.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": "us-east-1:12345678-dead-beef-cafe-123456790ab"
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "authenticated"
        }
      }
    }
  ]
}
            """)
            .build());

        var mainUserGroup = new UserGroup("mainUserGroup", UserGroupArgs.builder()        
            .userPoolId(mainUserPool.id())
            .description("Managed by Pulumi")
            .precedence(42)
            .roleArn(groupRole.arn())
            .build());

    }
}
```
```yaml
resources:
  mainUserPool:
    type: aws:cognito:UserPool
  groupRole:
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
                "Federated": "cognito-identity.amazonaws.com"
              },
              "Action": "sts:AssumeRoleWithWebIdentity",
              "Condition": {
                "StringEquals": {
                  "cognito-identity.amazonaws.com:aud": "us-east-1:12345678-dead-beef-cafe-123456790ab"
                },
                "ForAnyValue:StringLike": {
                  "cognito-identity.amazonaws.com:amr": "authenticated"
                }
              }
            }
          ]
        }
  mainUserGroup:
    type: aws:cognito:UserGroup
    properties:
      userPoolId: ${mainUserPool.id}
      description: Managed by Pulumi
      precedence: 42
      roleArn: ${groupRole.arn}
```
{{% /example %}}
{{% /examples %}}

## Import

Cognito User Groups can be imported using the `user_pool_id`/`name` attributes concatenated, e.g.,

```sh
 $ pulumi import aws:cognito/userGroup:UserGroup group us-east-1_vG78M4goG/user-group
```

 
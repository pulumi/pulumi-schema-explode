Provides an IAM user.

> *NOTE:* If policies are attached to the user via the `aws.iam.PolicyAttachment` resource and you are modifying the user `name` or `path`, the `force_destroy` argument must be set to `true` and applied before attempting the operation otherwise you will encounter a `DeleteConflict` error. The `aws.iam.UserPolicyAttachment` resource (recommended) does not have this requirement.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const lbUser = new aws.iam.User("lbUser", {
    path: "/system/",
    tags: {
        "tag-key": "tag-value",
    },
});
const lbAccessKey = new aws.iam.AccessKey("lbAccessKey", {user: lbUser.name});
const lbRo = new aws.iam.UserPolicy("lbRo", {
    user: lbUser.name,
    policy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "ec2:Describe*"
      ],
      "Effect": "Allow",
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

lb_user = aws.iam.User("lbUser",
    path="/system/",
    tags={
        "tag-key": "tag-value",
    })
lb_access_key = aws.iam.AccessKey("lbAccessKey", user=lb_user.name)
lb_ro = aws.iam.UserPolicy("lbRo",
    user=lb_user.name,
    policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "ec2:Describe*"
      ],
      "Effect": "Allow",
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
    var lbUser = new Aws.Iam.User("lbUser", new()
    {
        Path = "/system/",
        Tags = 
        {
            { "tag-key", "tag-value" },
        },
    });

    var lbAccessKey = new Aws.Iam.AccessKey("lbAccessKey", new()
    {
        User = lbUser.Name,
    });

    var lbRo = new Aws.Iam.UserPolicy("lbRo", new()
    {
        User = lbUser.Name,
        Policy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Action"": [
        ""ec2:Describe*""
      ],
      ""Effect"": ""Allow"",
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

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		lbUser, err := iam.NewUser(ctx, "lbUser", &iam.UserArgs{
			Path: pulumi.String("/system/"),
			Tags: pulumi.StringMap{
				"tag-key": pulumi.String("tag-value"),
			},
		})
		if err != nil {
			return err
		}
		_, err = iam.NewAccessKey(ctx, "lbAccessKey", &iam.AccessKeyArgs{
			User: lbUser.Name,
		})
		if err != nil {
			return err
		}
		_, err = iam.NewUserPolicy(ctx, "lbRo", &iam.UserPolicyArgs{
			User: lbUser.Name,
			Policy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "ec2:Describe*"
      ],
      "Effect": "Allow",
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
import com.pulumi.aws.iam.User;
import com.pulumi.aws.iam.UserArgs;
import com.pulumi.aws.iam.AccessKey;
import com.pulumi.aws.iam.AccessKeyArgs;
import com.pulumi.aws.iam.UserPolicy;
import com.pulumi.aws.iam.UserPolicyArgs;
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
        var lbUser = new User("lbUser", UserArgs.builder()        
            .path("/system/")
            .tags(Map.of("tag-key", "tag-value"))
            .build());

        var lbAccessKey = new AccessKey("lbAccessKey", AccessKeyArgs.builder()        
            .user(lbUser.name())
            .build());

        var lbRo = new UserPolicy("lbRo", UserPolicyArgs.builder()        
            .user(lbUser.name())
            .policy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "ec2:Describe*"
      ],
      "Effect": "Allow",
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
  lbUser:
    type: aws:iam:User
    properties:
      path: /system/
      tags:
        tag-key: tag-value
  lbAccessKey:
    type: aws:iam:AccessKey
    properties:
      user: ${lbUser.name}
  lbRo:
    type: aws:iam:UserPolicy
    properties:
      user: ${lbUser.name}
      policy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": [
                "ec2:Describe*"
              ],
              "Effect": "Allow",
              "Resource": "*"
            }
          ]
        }
```
{{% /example %}}
{{% /examples %}}

## Import

IAM Users can be imported using the `name`, e.g.,

```sh
 $ pulumi import aws:iam/user:User lb loadbalancer
```

 
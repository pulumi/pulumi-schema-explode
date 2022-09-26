Provides an IAM instance profile.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const role = new aws.iam.Role("role", {
    path: "/",
    assumeRolePolicy: `{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "sts:AssumeRole",
            "Principal": {
               "Service": "ec2.amazonaws.com"
            },
            "Effect": "Allow",
            "Sid": ""
        }
    ]
}
`,
});
const testProfile = new aws.iam.InstanceProfile("testProfile", {role: role.name});
```
```python
import pulumi
import pulumi_aws as aws

role = aws.iam.Role("role",
    path="/",
    assume_role_policy="""{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "sts:AssumeRole",
            "Principal": {
               "Service": "ec2.amazonaws.com"
            },
            "Effect": "Allow",
            "Sid": ""
        }
    ]
}
""")
test_profile = aws.iam.InstanceProfile("testProfile", role=role.name)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var role = new Aws.Iam.Role("role", new()
    {
        Path = "/",
        AssumeRolePolicy = @"{
    ""Version"": ""2012-10-17"",
    ""Statement"": [
        {
            ""Action"": ""sts:AssumeRole"",
            ""Principal"": {
               ""Service"": ""ec2.amazonaws.com""
            },
            ""Effect"": ""Allow"",
            ""Sid"": """"
        }
    ]
}
",
    });

    var testProfile = new Aws.Iam.InstanceProfile("testProfile", new()
    {
        Role = role.Name,
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
		role, err := iam.NewRole(ctx, "role", &iam.RoleArgs{
			Path: pulumi.String("/"),
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "sts:AssumeRole",
            "Principal": {
               "Service": "ec2.amazonaws.com"
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
		_, err = iam.NewInstanceProfile(ctx, "testProfile", &iam.InstanceProfileArgs{
			Role: role.Name,
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
import com.pulumi.aws.iam.InstanceProfile;
import com.pulumi.aws.iam.InstanceProfileArgs;
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
        var role = new Role("role", RoleArgs.builder()        
            .path("/")
            .assumeRolePolicy("""
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "sts:AssumeRole",
            "Principal": {
               "Service": "ec2.amazonaws.com"
            },
            "Effect": "Allow",
            "Sid": ""
        }
    ]
}
            """)
            .build());

        var testProfile = new InstanceProfile("testProfile", InstanceProfileArgs.builder()        
            .role(role.name())
            .build());

    }
}
```
```yaml
resources:
  testProfile:
    type: aws:iam:InstanceProfile
    properties:
      role: ${role.name}
  role:
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
                       "Service": "ec2.amazonaws.com"
                    },
                    "Effect": "Allow",
                    "Sid": ""
                }
            ]
        }
```
{{% /example %}}
{{% /examples %}}

## Import

Instance Profiles can be imported using the `name`, e.g.,

```sh
 $ pulumi import aws:iam/instanceProfile:InstanceProfile test_profile app-instance-profile-1
```

 
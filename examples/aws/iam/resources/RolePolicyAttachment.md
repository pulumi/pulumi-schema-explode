Attaches a Managed IAM Policy to an IAM role

> **NOTE:** The usage of this resource conflicts with the `aws.iam.PolicyAttachment` resource and will permanently show a difference if both are defined.

> **NOTE:** For a given role, this resource is incompatible with using the `aws.iam.Role` resource `managed_policy_arns` argument. When using that argument and this resource, both will attempt to manage the role's managed policy attachments and the provider will show a permanent difference.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const role = new aws.iam.Role("role", {assumeRolePolicy: `{
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
`});
const policy = new aws.iam.Policy("policy", {
    description: "A test policy",
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
const test_attach = new aws.iam.RolePolicyAttachment("test-attach", {
    role: role.name,
    policyArn: policy.arn,
});
```
```python
import pulumi
import pulumi_aws as aws

role = aws.iam.Role("role", assume_role_policy="""{
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
policy = aws.iam.Policy("policy",
    description="A test policy",
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
test_attach = aws.iam.RolePolicyAttachment("test-attach",
    role=role.name,
    policy_arn=policy.arn)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var role = new Aws.Iam.Role("role", new()
    {
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

    var policy = new Aws.Iam.Policy("policy", new()
    {
        Description = "A test policy",
        PolicyDocument = @"{
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

    var test_attach = new Aws.Iam.RolePolicyAttachment("test-attach", new()
    {
        Role = role.Name,
        PolicyArn = policy.Arn,
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		role, err := iam.NewRole(ctx, "role", &iam.RoleArgs{
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
		policy, err := iam.NewPolicy(ctx, "policy", &iam.PolicyArgs{
			Description: pulumi.String("A test policy"),
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
		_, err = iam.NewRolePolicyAttachment(ctx, "test-attach", &iam.RolePolicyAttachmentArgs{
			Role:      role.Name,
			PolicyArn: policy.Arn,
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
import com.pulumi.aws.iam.Policy;
import com.pulumi.aws.iam.PolicyArgs;
import com.pulumi.aws.iam.RolePolicyAttachment;
import com.pulumi.aws.iam.RolePolicyAttachmentArgs;
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

        var policy = new Policy("policy", PolicyArgs.builder()        
            .description("A test policy")
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

        var test_attach = new RolePolicyAttachment("test-attach", RolePolicyAttachmentArgs.builder()        
            .role(role.name())
            .policyArn(policy.arn())
            .build());

    }
}
```
```yaml
resources:
  role:
    type: aws:iam:Role
    properties:
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
  policy:
    type: aws:iam:Policy
    properties:
      description: A test policy
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
  test-attach:
    type: aws:iam:RolePolicyAttachment
    properties:
      role: ${role.name}
      policyArn: ${policy.arn}
```
{{% /example %}}
{{% /examples %}}

## Import

IAM role policy attachments can be imported using the role name and policy arn separated by `/`.

```sh
 $ pulumi import aws:iam/rolePolicyAttachment:RolePolicyAttachment test-attach test-role/arn:aws:iam::xxxxxxxxxxxx:policy/test-policy
```

 
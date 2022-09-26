Attaches a Managed IAM Policy to user(s), role(s), and/or group(s)

!> **WARNING:** The aws.iam.PolicyAttachment resource creates **exclusive** attachments of IAM policies. Across the entire AWS account, all of the users/roles/groups to which a single policy is attached must be declared by a single aws.iam.PolicyAttachment resource. This means that even any users/roles/groups that have the attached policy via any other mechanism (including other resources managed by this provider) will have that attached policy revoked by this resource. Consider `aws.iam.RolePolicyAttachment`, `aws.iam.UserPolicyAttachment`, or `aws.iam.GroupPolicyAttachment` instead. These resources do not enforce exclusive attachment of an IAM policy.

> **NOTE:** The usage of this resource conflicts with the `aws.iam.GroupPolicyAttachment`, `aws.iam.RolePolicyAttachment`, and `aws.iam.UserPolicyAttachment` resources and will permanently show a difference if both are defined.

> **NOTE:** For a given role, this resource is incompatible with using the `aws.iam.Role` resource `managed_policy_arns` argument. When using that argument and this resource, both will attempt to manage the role's managed policy attachments and the provider will show a permanent difference.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const user = new aws.iam.User("user", {});
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
const group = new aws.iam.Group("group", {});
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
const test_attach = new aws.iam.PolicyAttachment("test-attach", {
    users: [user.name],
    roles: [role.name],
    groups: [group.name],
    policyArn: policy.arn,
});
```
```python
import pulumi
import pulumi_aws as aws

user = aws.iam.User("user")
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
group = aws.iam.Group("group")
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
test_attach = aws.iam.PolicyAttachment("test-attach",
    users=[user.name],
    roles=[role.name],
    groups=[group.name],
    policy_arn=policy.arn)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var user = new Aws.Iam.User("user");

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

    var @group = new Aws.Iam.Group("group");

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

    var test_attach = new Aws.Iam.PolicyAttachment("test-attach", new()
    {
        Users = new[]
        {
            user.Name,
        },
        Roles = new[]
        {
            role.Name,
        },
        Groups = new[]
        {
            @group.Name,
        },
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
		user, err := iam.NewUser(ctx, "user", nil)
		if err != nil {
			return err
		}
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
		group, err := iam.NewGroup(ctx, "group", nil)
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
		_, err = iam.NewPolicyAttachment(ctx, "test-attach", &iam.PolicyAttachmentArgs{
			Users: pulumi.AnyArray{
				user.Name,
			},
			Roles: pulumi.AnyArray{
				role.Name,
			},
			Groups: pulumi.AnyArray{
				group.Name,
			},
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
import com.pulumi.aws.iam.User;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.iam.Group;
import com.pulumi.aws.iam.Policy;
import com.pulumi.aws.iam.PolicyArgs;
import com.pulumi.aws.iam.PolicyAttachment;
import com.pulumi.aws.iam.PolicyAttachmentArgs;
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
        var user = new User("user");

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

        var group = new Group("group");

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

        var test_attach = new PolicyAttachment("test-attach", PolicyAttachmentArgs.builder()        
            .users(user.name())
            .roles(role.name())
            .groups(group.name())
            .policyArn(policy.arn())
            .build());

    }
}
```
```yaml
resources:
  user:
    type: aws:iam:User
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
  group:
    type: aws:iam:Group
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
    type: aws:iam:PolicyAttachment
    properties:
      users:
        - ${user.name}
      roles:
        - ${role.name}
      groups:
        - ${group.name}
      policyArn: ${policy.arn}
```
{{% /example %}}
{{% /examples %}}
Registers an on-premises server or virtual machine with Amazon EC2 so that it can be managed using Run Command.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const testRole = new aws.iam.Role("testRole", {assumeRolePolicy: `  {
    "Version": "2012-10-17",
    "Statement": {
      "Effect": "Allow",
      "Principal": {"Service": "ssm.amazonaws.com"},
      "Action": "sts:AssumeRole"
    }
  }
`});
const testAttach = new aws.iam.RolePolicyAttachment("testAttach", {
    role: testRole.name,
    policyArn: "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore",
});
const foo = new aws.ssm.Activation("foo", {
    description: "Test",
    iamRole: testRole.id,
    registrationLimit: 5,
}, {
    dependsOn: [testAttach],
});
```
```python
import pulumi
import pulumi_aws as aws

test_role = aws.iam.Role("testRole", assume_role_policy="""  {
    "Version": "2012-10-17",
    "Statement": {
      "Effect": "Allow",
      "Principal": {"Service": "ssm.amazonaws.com"},
      "Action": "sts:AssumeRole"
    }
  }
""")
test_attach = aws.iam.RolePolicyAttachment("testAttach",
    role=test_role.name,
    policy_arn="arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore")
foo = aws.ssm.Activation("foo",
    description="Test",
    iam_role=test_role.id,
    registration_limit=5,
    opts=pulumi.ResourceOptions(depends_on=[test_attach]))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var testRole = new Aws.Iam.Role("testRole", new()
    {
        AssumeRolePolicy = @"  {
    ""Version"": ""2012-10-17"",
    ""Statement"": {
      ""Effect"": ""Allow"",
      ""Principal"": {""Service"": ""ssm.amazonaws.com""},
      ""Action"": ""sts:AssumeRole""
    }
  }
",
    });

    var testAttach = new Aws.Iam.RolePolicyAttachment("testAttach", new()
    {
        Role = testRole.Name,
        PolicyArn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore",
    });

    var foo = new Aws.Ssm.Activation("foo", new()
    {
        Description = "Test",
        IamRole = testRole.Id,
        RegistrationLimit = 5,
    }, new CustomResourceOptions
    {
        DependsOn = new[]
        {
            testAttach,
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ssm"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		testRole, err := iam.NewRole(ctx, "testRole", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`  {
    "Version": "2012-10-17",
    "Statement": {
      "Effect": "Allow",
      "Principal": {"Service": "ssm.amazonaws.com"},
      "Action": "sts:AssumeRole"
    }
  }
`)),
		})
		if err != nil {
			return err
		}
		testAttach, err := iam.NewRolePolicyAttachment(ctx, "testAttach", &iam.RolePolicyAttachmentArgs{
			Role:      testRole.Name,
			PolicyArn: pulumi.String("arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"),
		})
		if err != nil {
			return err
		}
		_, err = ssm.NewActivation(ctx, "foo", &ssm.ActivationArgs{
			Description:       pulumi.String("Test"),
			IamRole:           testRole.ID(),
			RegistrationLimit: pulumi.Int(5),
		}, pulumi.DependsOn([]pulumi.Resource{
			testAttach,
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
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.iam.RolePolicyAttachment;
import com.pulumi.aws.iam.RolePolicyAttachmentArgs;
import com.pulumi.aws.ssm.Activation;
import com.pulumi.aws.ssm.ActivationArgs;
import com.pulumi.resources.CustomResourceOptions;
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
        var testRole = new Role("testRole", RoleArgs.builder()        
            .assumeRolePolicy("""
  {
    "Version": "2012-10-17",
    "Statement": {
      "Effect": "Allow",
      "Principal": {"Service": "ssm.amazonaws.com"},
      "Action": "sts:AssumeRole"
    }
  }
            """)
            .build());

        var testAttach = new RolePolicyAttachment("testAttach", RolePolicyAttachmentArgs.builder()        
            .role(testRole.name())
            .policyArn("arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore")
            .build());

        var foo = new Activation("foo", ActivationArgs.builder()        
            .description("Test")
            .iamRole(testRole.id())
            .registrationLimit("5")
            .build(), CustomResourceOptions.builder()
                .dependsOn(testAttach)
                .build());

    }
}
```
```yaml
resources:
  testRole:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |2
          {
            "Version": "2012-10-17",
            "Statement": {
              "Effect": "Allow",
              "Principal": {"Service": "ssm.amazonaws.com"},
              "Action": "sts:AssumeRole"
            }
          }
  testAttach:
    type: aws:iam:RolePolicyAttachment
    properties:
      role: ${testRole.name}
      policyArn: arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore
  foo:
    type: aws:ssm:Activation
    properties:
      description: Test
      iamRole: ${testRole.id}
      registrationLimit: 5
    options:
      dependson:
        - ${testAttach}
```
{{% /example %}}
{{% /examples %}}

## Import

AWS SSM Activation can be imported using the `id`, e.g.,

```sh
 $ pulumi import aws:ssm/activation:Activation example e488f2f6-e686-4afb-8a04-ef6dfEXAMPLE
```

 
Provides a AWS Transfer User resource. Managing SSH keys can be accomplished with the `aws.transfer.SshKey` resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const fooServer = new aws.transfer.Server("fooServer", {
    identityProviderType: "SERVICE_MANAGED",
    tags: {
        NAME: "tf-acc-test-transfer-server",
    },
});
const fooRole = new aws.iam.Role("fooRole", {assumeRolePolicy: `{
	"Version": "2012-10-17",
	"Statement": [
		{
		"Effect": "Allow",
		"Principal": {
			"Service": "transfer.amazonaws.com"
		},
		"Action": "sts:AssumeRole"
		}
	]
}
`});
const fooRolePolicy = new aws.iam.RolePolicy("fooRolePolicy", {
    role: fooRole.id,
    policy: `{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "AllowFullAccesstoS3",
			"Effect": "Allow",
			"Action": [
				"s3:*"
			],
			"Resource": "*"
		}
	]
}
`,
});
const fooUser = new aws.transfer.User("fooUser", {
    serverId: fooServer.id,
    userName: "tftestuser",
    role: fooRole.arn,
    homeDirectoryType: "LOGICAL",
    homeDirectoryMappings: [{
        entry: "/test.pdf",
        target: "/bucket3/test-path/tftestuser.pdf",
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

foo_server = aws.transfer.Server("fooServer",
    identity_provider_type="SERVICE_MANAGED",
    tags={
        "NAME": "tf-acc-test-transfer-server",
    })
foo_role = aws.iam.Role("fooRole", assume_role_policy="""{
	"Version": "2012-10-17",
	"Statement": [
		{
		"Effect": "Allow",
		"Principal": {
			"Service": "transfer.amazonaws.com"
		},
		"Action": "sts:AssumeRole"
		}
	]
}
""")
foo_role_policy = aws.iam.RolePolicy("fooRolePolicy",
    role=foo_role.id,
    policy="""{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "AllowFullAccesstoS3",
			"Effect": "Allow",
			"Action": [
				"s3:*"
			],
			"Resource": "*"
		}
	]
}
""")
foo_user = aws.transfer.User("fooUser",
    server_id=foo_server.id,
    user_name="tftestuser",
    role=foo_role.arn,
    home_directory_type="LOGICAL",
    home_directory_mappings=[aws.transfer.UserHomeDirectoryMappingArgs(
        entry="/test.pdf",
        target="/bucket3/test-path/tftestuser.pdf",
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var fooServer = new Aws.Transfer.Server("fooServer", new()
    {
        IdentityProviderType = "SERVICE_MANAGED",
        Tags = 
        {
            { "NAME", "tf-acc-test-transfer-server" },
        },
    });

    var fooRole = new Aws.Iam.Role("fooRole", new()
    {
        AssumeRolePolicy = @"{
	""Version"": ""2012-10-17"",
	""Statement"": [
		{
		""Effect"": ""Allow"",
		""Principal"": {
			""Service"": ""transfer.amazonaws.com""
		},
		""Action"": ""sts:AssumeRole""
		}
	]
}
",
    });

    var fooRolePolicy = new Aws.Iam.RolePolicy("fooRolePolicy", new()
    {
        Role = fooRole.Id,
        Policy = @"{
	""Version"": ""2012-10-17"",
	""Statement"": [
		{
			""Sid"": ""AllowFullAccesstoS3"",
			""Effect"": ""Allow"",
			""Action"": [
				""s3:*""
			],
			""Resource"": ""*""
		}
	]
}
",
    });

    var fooUser = new Aws.Transfer.User("fooUser", new()
    {
        ServerId = fooServer.Id,
        UserName = "tftestuser",
        Role = fooRole.Arn,
        HomeDirectoryType = "LOGICAL",
        HomeDirectoryMappings = new[]
        {
            new Aws.Transfer.Inputs.UserHomeDirectoryMappingArgs
            {
                Entry = "/test.pdf",
                Target = "/bucket3/test-path/tftestuser.pdf",
            },
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/transfer"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		fooServer, err := transfer.NewServer(ctx, "fooServer", &transfer.ServerArgs{
			IdentityProviderType: pulumi.String("SERVICE_MANAGED"),
			Tags: pulumi.StringMap{
				"NAME": pulumi.String("tf-acc-test-transfer-server"),
			},
		})
		if err != nil {
			return err
		}
		fooRole, err := iam.NewRole(ctx, "fooRole", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
	"Version": "2012-10-17",
	"Statement": [
		{
		"Effect": "Allow",
		"Principal": {
			"Service": "transfer.amazonaws.com"
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
		_, err = iam.NewRolePolicy(ctx, "fooRolePolicy", &iam.RolePolicyArgs{
			Role: fooRole.ID(),
			Policy: pulumi.Any(fmt.Sprintf(`{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "AllowFullAccesstoS3",
			"Effect": "Allow",
			"Action": [
				"s3:*"
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
		_, err = transfer.NewUser(ctx, "fooUser", &transfer.UserArgs{
			ServerId:          fooServer.ID(),
			UserName:          pulumi.String("tftestuser"),
			Role:              fooRole.Arn,
			HomeDirectoryType: pulumi.String("LOGICAL"),
			HomeDirectoryMappings: transfer.UserHomeDirectoryMappingArray{
				&transfer.UserHomeDirectoryMappingArgs{
					Entry:  pulumi.String("/test.pdf"),
					Target: pulumi.String("/bucket3/test-path/tftestuser.pdf"),
				},
			},
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
import com.pulumi.aws.transfer.Server;
import com.pulumi.aws.transfer.ServerArgs;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.iam.RolePolicy;
import com.pulumi.aws.iam.RolePolicyArgs;
import com.pulumi.aws.transfer.User;
import com.pulumi.aws.transfer.UserArgs;
import com.pulumi.aws.transfer.inputs.UserHomeDirectoryMappingArgs;
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
        var fooServer = new Server("fooServer", ServerArgs.builder()        
            .identityProviderType("SERVICE_MANAGED")
            .tags(Map.of("NAME", "tf-acc-test-transfer-server"))
            .build());

        var fooRole = new Role("fooRole", RoleArgs.builder()        
            .assumeRolePolicy("""
{
	"Version": "2012-10-17",
	"Statement": [
		{
		"Effect": "Allow",
		"Principal": {
			"Service": "transfer.amazonaws.com"
		},
		"Action": "sts:AssumeRole"
		}
	]
}
            """)
            .build());

        var fooRolePolicy = new RolePolicy("fooRolePolicy", RolePolicyArgs.builder()        
            .role(fooRole.id())
            .policy("""
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "AllowFullAccesstoS3",
			"Effect": "Allow",
			"Action": [
				"s3:*"
			],
			"Resource": "*"
		}
	]
}
            """)
            .build());

        var fooUser = new User("fooUser", UserArgs.builder()        
            .serverId(fooServer.id())
            .userName("tftestuser")
            .role(fooRole.arn())
            .homeDirectoryType("LOGICAL")
            .homeDirectoryMappings(UserHomeDirectoryMappingArgs.builder()
                .entry("/test.pdf")
                .target("/bucket3/test-path/tftestuser.pdf")
                .build())
            .build());

    }
}
```
```yaml
resources:
  fooServer:
    type: aws:transfer:Server
    properties:
      identityProviderType: SERVICE_MANAGED
      tags:
        NAME: tf-acc-test-transfer-server
  fooRole:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
        	"Version": "2012-10-17",
        	"Statement": [
        		{
        		"Effect": "Allow",
        		"Principal": {
        			"Service": "transfer.amazonaws.com"
        		},
        		"Action": "sts:AssumeRole"
        		}
        	]
        }
  fooRolePolicy:
    type: aws:iam:RolePolicy
    properties:
      role: ${fooRole.id}
      policy: |
        {
        	"Version": "2012-10-17",
        	"Statement": [
        		{
        			"Sid": "AllowFullAccesstoS3",
        			"Effect": "Allow",
        			"Action": [
        				"s3:*"
        			],
        			"Resource": "*"
        		}
        	]
        }
  fooUser:
    type: aws:transfer:User
    properties:
      serverId: ${fooServer.id}
      userName: tftestuser
      role: ${fooRole.arn}
      homeDirectoryType: LOGICAL
      homeDirectoryMappings:
        - entry: /test.pdf
          target: /bucket3/test-path/tftestuser.pdf
```
{{% /example %}}
{{% /examples %}}

## Import

Transfer Users can be imported using the `server_id` and `user_name` separated by `/`.

```sh
 $ pulumi import aws:transfer/user:User bar s-12345678/test-username
```

 
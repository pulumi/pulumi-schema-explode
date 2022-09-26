Provides a AWS Transfer User SSH Key resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleServer = new aws.transfer.Server("exampleServer", {
    identityProviderType: "SERVICE_MANAGED",
    tags: {
        NAME: "tf-acc-test-transfer-server",
    },
});
const exampleRole = new aws.iam.Role("exampleRole", {assumeRolePolicy: `{
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
const exampleUser = new aws.transfer.User("exampleUser", {
    serverId: exampleServer.id,
    userName: "tftestuser",
    role: exampleRole.arn,
    tags: {
        NAME: "tftestuser",
    },
});
const exampleSshKey = new aws.transfer.SshKey("exampleSshKey", {
    serverId: exampleServer.id,
    userName: exampleUser.userName,
    body: "... SSH key ...",
});
const exampleRolePolicy = new aws.iam.RolePolicy("exampleRolePolicy", {
    role: exampleRole.id,
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
```
```python
import pulumi
import pulumi_aws as aws

example_server = aws.transfer.Server("exampleServer",
    identity_provider_type="SERVICE_MANAGED",
    tags={
        "NAME": "tf-acc-test-transfer-server",
    })
example_role = aws.iam.Role("exampleRole", assume_role_policy="""{
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
example_user = aws.transfer.User("exampleUser",
    server_id=example_server.id,
    user_name="tftestuser",
    role=example_role.arn,
    tags={
        "NAME": "tftestuser",
    })
example_ssh_key = aws.transfer.SshKey("exampleSshKey",
    server_id=example_server.id,
    user_name=example_user.user_name,
    body="... SSH key ...")
example_role_policy = aws.iam.RolePolicy("exampleRolePolicy",
    role=example_role.id,
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
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleServer = new Aws.Transfer.Server("exampleServer", new()
    {
        IdentityProviderType = "SERVICE_MANAGED",
        Tags = 
        {
            { "NAME", "tf-acc-test-transfer-server" },
        },
    });

    var exampleRole = new Aws.Iam.Role("exampleRole", new()
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

    var exampleUser = new Aws.Transfer.User("exampleUser", new()
    {
        ServerId = exampleServer.Id,
        UserName = "tftestuser",
        Role = exampleRole.Arn,
        Tags = 
        {
            { "NAME", "tftestuser" },
        },
    });

    var exampleSshKey = new Aws.Transfer.SshKey("exampleSshKey", new()
    {
        ServerId = exampleServer.Id,
        UserName = exampleUser.UserName,
        Body = "... SSH key ...",
    });

    var exampleRolePolicy = new Aws.Iam.RolePolicy("exampleRolePolicy", new()
    {
        Role = exampleRole.Id,
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
		exampleServer, err := transfer.NewServer(ctx, "exampleServer", &transfer.ServerArgs{
			IdentityProviderType: pulumi.String("SERVICE_MANAGED"),
			Tags: pulumi.StringMap{
				"NAME": pulumi.String("tf-acc-test-transfer-server"),
			},
		})
		if err != nil {
			return err
		}
		exampleRole, err := iam.NewRole(ctx, "exampleRole", &iam.RoleArgs{
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
		exampleUser, err := transfer.NewUser(ctx, "exampleUser", &transfer.UserArgs{
			ServerId: exampleServer.ID(),
			UserName: pulumi.String("tftestuser"),
			Role:     exampleRole.Arn,
			Tags: pulumi.StringMap{
				"NAME": pulumi.String("tftestuser"),
			},
		})
		if err != nil {
			return err
		}
		_, err = transfer.NewSshKey(ctx, "exampleSshKey", &transfer.SshKeyArgs{
			ServerId: exampleServer.ID(),
			UserName: exampleUser.UserName,
			Body:     pulumi.String("... SSH key ..."),
		})
		if err != nil {
			return err
		}
		_, err = iam.NewRolePolicy(ctx, "exampleRolePolicy", &iam.RolePolicyArgs{
			Role: exampleRole.ID(),
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
import com.pulumi.aws.transfer.User;
import com.pulumi.aws.transfer.UserArgs;
import com.pulumi.aws.transfer.SshKey;
import com.pulumi.aws.transfer.SshKeyArgs;
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
        var exampleServer = new Server("exampleServer", ServerArgs.builder()        
            .identityProviderType("SERVICE_MANAGED")
            .tags(Map.of("NAME", "tf-acc-test-transfer-server"))
            .build());

        var exampleRole = new Role("exampleRole", RoleArgs.builder()        
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

        var exampleUser = new User("exampleUser", UserArgs.builder()        
            .serverId(exampleServer.id())
            .userName("tftestuser")
            .role(exampleRole.arn())
            .tags(Map.of("NAME", "tftestuser"))
            .build());

        var exampleSshKey = new SshKey("exampleSshKey", SshKeyArgs.builder()        
            .serverId(exampleServer.id())
            .userName(exampleUser.userName())
            .body("... SSH key ...")
            .build());

        var exampleRolePolicy = new RolePolicy("exampleRolePolicy", RolePolicyArgs.builder()        
            .role(exampleRole.id())
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

    }
}
```
```yaml
resources:
  exampleSshKey:
    type: aws:transfer:SshKey
    properties:
      serverId: ${exampleServer.id}
      userName: ${exampleUser.userName}
      body: '... SSH key ...'
  exampleServer:
    type: aws:transfer:Server
    properties:
      identityProviderType: SERVICE_MANAGED
      tags:
        NAME: tf-acc-test-transfer-server
  exampleUser:
    type: aws:transfer:User
    properties:
      serverId: ${exampleServer.id}
      userName: tftestuser
      role: ${exampleRole.arn}
      tags:
        NAME: tftestuser
  exampleRole:
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
  exampleRolePolicy:
    type: aws:iam:RolePolicy
    properties:
      role: ${exampleRole.id}
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
```
{{% /example %}}
{{% /examples %}}

## Import

Transfer SSH Public Key can be imported using the `server_id` and `user_name` and `ssh_public_key_id` separated by `/`.

```sh
 $ pulumi import aws:transfer/sshKey:SshKey bar s-12345678/test-username/key-12345
```

 
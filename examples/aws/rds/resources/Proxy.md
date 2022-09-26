Provides an RDS DB proxy resource. For additional information, see the [RDS User Guide](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html).

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.rds.Proxy("example", {
    debugLogging: false,
    engineFamily: "MYSQL",
    idleClientTimeout: 1800,
    requireTls: true,
    roleArn: aws_iam_role.example.arn,
    vpcSecurityGroupIds: [aws_security_group.example.id],
    vpcSubnetIds: [aws_subnet.example.id],
    auths: [{
        authScheme: "SECRETS",
        description: "example",
        iamAuth: "DISABLED",
        secretArn: aws_secretsmanager_secret.example.arn,
    }],
    tags: {
        Name: "example",
        Key: "value",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.rds.Proxy("example",
    debug_logging=False,
    engine_family="MYSQL",
    idle_client_timeout=1800,
    require_tls=True,
    role_arn=aws_iam_role["example"]["arn"],
    vpc_security_group_ids=[aws_security_group["example"]["id"]],
    vpc_subnet_ids=[aws_subnet["example"]["id"]],
    auths=[aws.rds.ProxyAuthArgs(
        auth_scheme="SECRETS",
        description="example",
        iam_auth="DISABLED",
        secret_arn=aws_secretsmanager_secret["example"]["arn"],
    )],
    tags={
        "Name": "example",
        "Key": "value",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Rds.Proxy("example", new()
    {
        DebugLogging = false,
        EngineFamily = "MYSQL",
        IdleClientTimeout = 1800,
        RequireTls = true,
        RoleArn = aws_iam_role.Example.Arn,
        VpcSecurityGroupIds = new[]
        {
            aws_security_group.Example.Id,
        },
        VpcSubnetIds = new[]
        {
            aws_subnet.Example.Id,
        },
        Auths = new[]
        {
            new Aws.Rds.Inputs.ProxyAuthArgs
            {
                AuthScheme = "SECRETS",
                Description = "example",
                IamAuth = "DISABLED",
                SecretArn = aws_secretsmanager_secret.Example.Arn,
            },
        },
        Tags = 
        {
            { "Name", "example" },
            { "Key", "value" },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/rds"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := rds.NewProxy(ctx, "example", &rds.ProxyArgs{
			DebugLogging:      pulumi.Bool(false),
			EngineFamily:      pulumi.String("MYSQL"),
			IdleClientTimeout: pulumi.Int(1800),
			RequireTls:        pulumi.Bool(true),
			RoleArn:           pulumi.Any(aws_iam_role.Example.Arn),
			VpcSecurityGroupIds: pulumi.StringArray{
				pulumi.Any(aws_security_group.Example.Id),
			},
			VpcSubnetIds: pulumi.StringArray{
				pulumi.Any(aws_subnet.Example.Id),
			},
			Auths: rds.ProxyAuthArray{
				&rds.ProxyAuthArgs{
					AuthScheme:  pulumi.String("SECRETS"),
					Description: pulumi.String("example"),
					IamAuth:     pulumi.String("DISABLED"),
					SecretArn:   pulumi.Any(aws_secretsmanager_secret.Example.Arn),
				},
			},
			Tags: pulumi.StringMap{
				"Name": pulumi.String("example"),
				"Key":  pulumi.String("value"),
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
import com.pulumi.aws.rds.Proxy;
import com.pulumi.aws.rds.ProxyArgs;
import com.pulumi.aws.rds.inputs.ProxyAuthArgs;
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
        var example = new Proxy("example", ProxyArgs.builder()        
            .debugLogging(false)
            .engineFamily("MYSQL")
            .idleClientTimeout(1800)
            .requireTls(true)
            .roleArn(aws_iam_role.example().arn())
            .vpcSecurityGroupIds(aws_security_group.example().id())
            .vpcSubnetIds(aws_subnet.example().id())
            .auths(ProxyAuthArgs.builder()
                .authScheme("SECRETS")
                .description("example")
                .iamAuth("DISABLED")
                .secretArn(aws_secretsmanager_secret.example().arn())
                .build())
            .tags(Map.ofEntries(
                Map.entry("Name", "example"),
                Map.entry("Key", "value")
            ))
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:rds:Proxy
    properties:
      debugLogging: false
      engineFamily: MYSQL
      idleClientTimeout: 1800
      requireTls: true
      roleArn: ${aws_iam_role.example.arn}
      vpcSecurityGroupIds:
        - ${aws_security_group.example.id}
      vpcSubnetIds:
        - ${aws_subnet.example.id}
      auths:
        - authScheme: SECRETS
          description: example
          iamAuth: DISABLED
          secretArn: ${aws_secretsmanager_secret.example.arn}
      tags:
        Name: example
        Key: value
```
{{% /example %}}
{{% /examples %}}

## Import

DB proxies can be imported using the `name`, e.g.,

```sh
 $ pulumi import aws:rds/proxy:Proxy example example
```

 
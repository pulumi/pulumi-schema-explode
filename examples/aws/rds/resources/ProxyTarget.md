Provides an RDS DB proxy target resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleProxy = new aws.rds.Proxy("exampleProxy", {
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
const exampleProxyDefaultTargetGroup = new aws.rds.ProxyDefaultTargetGroup("exampleProxyDefaultTargetGroup", {
    dbProxyName: exampleProxy.name,
    connectionPoolConfig: {
        connectionBorrowTimeout: 120,
        initQuery: "SET x=1, y=2",
        maxConnectionsPercent: 100,
        maxIdleConnectionsPercent: 50,
        sessionPinningFilters: ["EXCLUDE_VARIABLE_SETS"],
    },
});
const exampleProxyTarget = new aws.rds.ProxyTarget("exampleProxyTarget", {
    dbInstanceIdentifier: aws_db_instance.example.id,
    dbProxyName: exampleProxy.name,
    targetGroupName: exampleProxyDefaultTargetGroup.name,
});
```
```python
import pulumi
import pulumi_aws as aws

example_proxy = aws.rds.Proxy("exampleProxy",
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
example_proxy_default_target_group = aws.rds.ProxyDefaultTargetGroup("exampleProxyDefaultTargetGroup",
    db_proxy_name=example_proxy.name,
    connection_pool_config=aws.rds.ProxyDefaultTargetGroupConnectionPoolConfigArgs(
        connection_borrow_timeout=120,
        init_query="SET x=1, y=2",
        max_connections_percent=100,
        max_idle_connections_percent=50,
        session_pinning_filters=["EXCLUDE_VARIABLE_SETS"],
    ))
example_proxy_target = aws.rds.ProxyTarget("exampleProxyTarget",
    db_instance_identifier=aws_db_instance["example"]["id"],
    db_proxy_name=example_proxy.name,
    target_group_name=example_proxy_default_target_group.name)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleProxy = new Aws.Rds.Proxy("exampleProxy", new()
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

    var exampleProxyDefaultTargetGroup = new Aws.Rds.ProxyDefaultTargetGroup("exampleProxyDefaultTargetGroup", new()
    {
        DbProxyName = exampleProxy.Name,
        ConnectionPoolConfig = new Aws.Rds.Inputs.ProxyDefaultTargetGroupConnectionPoolConfigArgs
        {
            ConnectionBorrowTimeout = 120,
            InitQuery = "SET x=1, y=2",
            MaxConnectionsPercent = 100,
            MaxIdleConnectionsPercent = 50,
            SessionPinningFilters = new[]
            {
                "EXCLUDE_VARIABLE_SETS",
            },
        },
    });

    var exampleProxyTarget = new Aws.Rds.ProxyTarget("exampleProxyTarget", new()
    {
        DbInstanceIdentifier = aws_db_instance.Example.Id,
        DbProxyName = exampleProxy.Name,
        TargetGroupName = exampleProxyDefaultTargetGroup.Name,
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
		exampleProxy, err := rds.NewProxy(ctx, "exampleProxy", &rds.ProxyArgs{
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
		exampleProxyDefaultTargetGroup, err := rds.NewProxyDefaultTargetGroup(ctx, "exampleProxyDefaultTargetGroup", &rds.ProxyDefaultTargetGroupArgs{
			DbProxyName: exampleProxy.Name,
			ConnectionPoolConfig: &rds.ProxyDefaultTargetGroupConnectionPoolConfigArgs{
				ConnectionBorrowTimeout:   pulumi.Int(120),
				InitQuery:                 pulumi.String("SET x=1, y=2"),
				MaxConnectionsPercent:     pulumi.Int(100),
				MaxIdleConnectionsPercent: pulumi.Int(50),
				SessionPinningFilters: pulumi.StringArray{
					pulumi.String("EXCLUDE_VARIABLE_SETS"),
				},
			},
		})
		if err != nil {
			return err
		}
		_, err = rds.NewProxyTarget(ctx, "exampleProxyTarget", &rds.ProxyTargetArgs{
			DbInstanceIdentifier: pulumi.Any(aws_db_instance.Example.Id),
			DbProxyName:          exampleProxy.Name,
			TargetGroupName:      exampleProxyDefaultTargetGroup.Name,
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
import com.pulumi.aws.rds.ProxyDefaultTargetGroup;
import com.pulumi.aws.rds.ProxyDefaultTargetGroupArgs;
import com.pulumi.aws.rds.inputs.ProxyDefaultTargetGroupConnectionPoolConfigArgs;
import com.pulumi.aws.rds.ProxyTarget;
import com.pulumi.aws.rds.ProxyTargetArgs;
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
        var exampleProxy = new Proxy("exampleProxy", ProxyArgs.builder()        
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

        var exampleProxyDefaultTargetGroup = new ProxyDefaultTargetGroup("exampleProxyDefaultTargetGroup", ProxyDefaultTargetGroupArgs.builder()        
            .dbProxyName(exampleProxy.name())
            .connectionPoolConfig(ProxyDefaultTargetGroupConnectionPoolConfigArgs.builder()
                .connectionBorrowTimeout(120)
                .initQuery("SET x=1, y=2")
                .maxConnectionsPercent(100)
                .maxIdleConnectionsPercent(50)
                .sessionPinningFilters("EXCLUDE_VARIABLE_SETS")
                .build())
            .build());

        var exampleProxyTarget = new ProxyTarget("exampleProxyTarget", ProxyTargetArgs.builder()        
            .dbInstanceIdentifier(aws_db_instance.example().id())
            .dbProxyName(exampleProxy.name())
            .targetGroupName(exampleProxyDefaultTargetGroup.name())
            .build());

    }
}
```
```yaml
resources:
  exampleProxy:
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
  exampleProxyDefaultTargetGroup:
    type: aws:rds:ProxyDefaultTargetGroup
    properties:
      dbProxyName: ${exampleProxy.name}
      connectionPoolConfig:
        connectionBorrowTimeout: 120
        initQuery: SET x=1, y=2
        maxConnectionsPercent: 100
        maxIdleConnectionsPercent: 50
        sessionPinningFilters:
          - EXCLUDE_VARIABLE_SETS
  exampleProxyTarget:
    type: aws:rds:ProxyTarget
    properties:
      dbInstanceIdentifier: ${aws_db_instance.example.id}
      dbProxyName: ${exampleProxy.name}
      targetGroupName: ${exampleProxyDefaultTargetGroup.name}
```
{{% /example %}}
{{% /examples %}}

## Import

RDS DB Proxy Targets can be imported using the `db_proxy_name`, `target_group_name`, target type (e.g., `RDS_INSTANCE` or `TRACKED_CLUSTER`), and resource identifier separated by forward slashes (`/`), e.g., Instances

```sh
 $ pulumi import aws:rds/proxyTarget:ProxyTarget example example-proxy/default/RDS_INSTANCE/example-instance
```

 Provisioned Clusters

```sh
 $ pulumi import aws:rds/proxyTarget:ProxyTarget example example-proxy/default/TRACKED_CLUSTER/example-cluster
```

 
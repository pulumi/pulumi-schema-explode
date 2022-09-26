Provides an ECS cluster.

> **NOTE on Clusters and Cluster Capacity Providers:** this provider provides both a standalone `aws.ecs.ClusterCapacityProviders` resource, as well as allowing the capacity providers and default strategies to be managed in-line by the `aws.ecs.Cluster` resource. You cannot use a Cluster with in-line capacity providers in conjunction with the Capacity Providers resource, nor use more than one Capacity Providers resource with a single Cluster, as doing so will cause a conflict and will lead to mutual overwrites.

{{% examples %}}
## Example Usage
{{% example %}}
### Basic Example

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const foo = new aws.ecs.Cluster("foo", {
    settings: [{
        name: "containerInsights",
        value: "enabled",
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

foo = aws.ecs.Cluster("foo", settings=[aws.ecs.ClusterSettingArgs(
    name="containerInsights",
    value="enabled",
)])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var foo = new Aws.Ecs.Cluster("foo", new()
    {
        Settings = new[]
        {
            new Aws.Ecs.Inputs.ClusterSettingArgs
            {
                Name = "containerInsights",
                Value = "enabled",
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ecs"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := ecs.NewCluster(ctx, "foo", &ecs.ClusterArgs{
			Settings: ecs.ClusterSettingArray{
				&ecs.ClusterSettingArgs{
					Name:  pulumi.String("containerInsights"),
					Value: pulumi.String("enabled"),
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
import com.pulumi.aws.ecs.Cluster;
import com.pulumi.aws.ecs.ClusterArgs;
import com.pulumi.aws.ecs.inputs.ClusterSettingArgs;
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
        var foo = new Cluster("foo", ClusterArgs.builder()        
            .settings(ClusterSettingArgs.builder()
                .name("containerInsights")
                .value("enabled")
                .build())
            .build());

    }
}
```
```yaml
resources:
  foo:
    type: aws:ecs:Cluster
    properties:
      settings:
        - name: containerInsights
          value: enabled
```
{{% /example %}}
{{% example %}}
### Example with Log Configuration

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleKey = new aws.kms.Key("exampleKey", {
    description: "example",
    deletionWindowInDays: 7,
});
const exampleLogGroup = new aws.cloudwatch.LogGroup("exampleLogGroup", {});
const test = new aws.ecs.Cluster("test", {configuration: {
    executeCommandConfiguration: {
        kmsKeyId: exampleKey.arn,
        logging: "OVERRIDE",
        logConfiguration: {
            cloudWatchEncryptionEnabled: true,
            cloudWatchLogGroupName: exampleLogGroup.name,
        },
    },
}});
```
```python
import pulumi
import pulumi_aws as aws

example_key = aws.kms.Key("exampleKey",
    description="example",
    deletion_window_in_days=7)
example_log_group = aws.cloudwatch.LogGroup("exampleLogGroup")
test = aws.ecs.Cluster("test", configuration=aws.ecs.ClusterConfigurationArgs(
    execute_command_configuration=aws.ecs.ClusterConfigurationExecuteCommandConfigurationArgs(
        kms_key_id=example_key.arn,
        logging="OVERRIDE",
        log_configuration=aws.ecs.ClusterConfigurationExecuteCommandConfigurationLogConfigurationArgs(
            cloud_watch_encryption_enabled=True,
            cloud_watch_log_group_name=example_log_group.name,
        ),
    ),
))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleKey = new Aws.Kms.Key("exampleKey", new()
    {
        Description = "example",
        DeletionWindowInDays = 7,
    });

    var exampleLogGroup = new Aws.CloudWatch.LogGroup("exampleLogGroup");

    var test = new Aws.Ecs.Cluster("test", new()
    {
        Configuration = new Aws.Ecs.Inputs.ClusterConfigurationArgs
        {
            ExecuteCommandConfiguration = new Aws.Ecs.Inputs.ClusterConfigurationExecuteCommandConfigurationArgs
            {
                KmsKeyId = exampleKey.Arn,
                Logging = "OVERRIDE",
                LogConfiguration = new Aws.Ecs.Inputs.ClusterConfigurationExecuteCommandConfigurationLogConfigurationArgs
                {
                    CloudWatchEncryptionEnabled = true,
                    CloudWatchLogGroupName = exampleLogGroup.Name,
                },
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudwatch"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ecs"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/kms"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleKey, err := kms.NewKey(ctx, "exampleKey", &kms.KeyArgs{
			Description:          pulumi.String("example"),
			DeletionWindowInDays: pulumi.Int(7),
		})
		if err != nil {
			return err
		}
		exampleLogGroup, err := cloudwatch.NewLogGroup(ctx, "exampleLogGroup", nil)
		if err != nil {
			return err
		}
		_, err = ecs.NewCluster(ctx, "test", &ecs.ClusterArgs{
			Configuration: &ecs.ClusterConfigurationArgs{
				ExecuteCommandConfiguration: &ecs.ClusterConfigurationExecuteCommandConfigurationArgs{
					KmsKeyId: exampleKey.Arn,
					Logging:  pulumi.String("OVERRIDE"),
					LogConfiguration: &ecs.ClusterConfigurationExecuteCommandConfigurationLogConfigurationArgs{
						CloudWatchEncryptionEnabled: pulumi.Bool(true),
						CloudWatchLogGroupName:      exampleLogGroup.Name,
					},
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
import com.pulumi.aws.kms.Key;
import com.pulumi.aws.kms.KeyArgs;
import com.pulumi.aws.cloudwatch.LogGroup;
import com.pulumi.aws.ecs.Cluster;
import com.pulumi.aws.ecs.ClusterArgs;
import com.pulumi.aws.ecs.inputs.ClusterConfigurationArgs;
import com.pulumi.aws.ecs.inputs.ClusterConfigurationExecuteCommandConfigurationArgs;
import com.pulumi.aws.ecs.inputs.ClusterConfigurationExecuteCommandConfigurationLogConfigurationArgs;
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
        var exampleKey = new Key("exampleKey", KeyArgs.builder()        
            .description("example")
            .deletionWindowInDays(7)
            .build());

        var exampleLogGroup = new LogGroup("exampleLogGroup");

        var test = new Cluster("test", ClusterArgs.builder()        
            .configuration(ClusterConfigurationArgs.builder()
                .executeCommandConfiguration(ClusterConfigurationExecuteCommandConfigurationArgs.builder()
                    .kmsKeyId(exampleKey.arn())
                    .logging("OVERRIDE")
                    .logConfiguration(ClusterConfigurationExecuteCommandConfigurationLogConfigurationArgs.builder()
                        .cloudWatchEncryptionEnabled(true)
                        .cloudWatchLogGroupName(exampleLogGroup.name())
                        .build())
                    .build())
                .build())
            .build());

    }
}
```
```yaml
resources:
  exampleKey:
    type: aws:kms:Key
    properties:
      description: example
      deletionWindowInDays: 7
  exampleLogGroup:
    type: aws:cloudwatch:LogGroup
  test:
    type: aws:ecs:Cluster
    properties:
      configuration:
        executeCommandConfiguration:
          kmsKeyId: ${exampleKey.arn}
          logging: OVERRIDE
          logConfiguration:
            cloudWatchEncryptionEnabled: true
            cloudWatchLogGroupName: ${exampleLogGroup.name}
```
{{% /example %}}
{{% example %}}
### Example with Capacity Providers

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleCluster = new aws.ecs.Cluster("exampleCluster", {});
const exampleCapacityProvider = new aws.ecs.CapacityProvider("exampleCapacityProvider", {autoScalingGroupProvider: {
    autoScalingGroupArn: aws_autoscaling_group.example.arn,
}});
const exampleClusterCapacityProviders = new aws.ecs.ClusterCapacityProviders("exampleClusterCapacityProviders", {
    clusterName: exampleCluster.name,
    capacityProviders: [exampleCapacityProvider.name],
    defaultCapacityProviderStrategies: [{
        base: 1,
        weight: 100,
        capacityProvider: exampleCapacityProvider.name,
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

example_cluster = aws.ecs.Cluster("exampleCluster")
example_capacity_provider = aws.ecs.CapacityProvider("exampleCapacityProvider", auto_scaling_group_provider=aws.ecs.CapacityProviderAutoScalingGroupProviderArgs(
    auto_scaling_group_arn=aws_autoscaling_group["example"]["arn"],
))
example_cluster_capacity_providers = aws.ecs.ClusterCapacityProviders("exampleClusterCapacityProviders",
    cluster_name=example_cluster.name,
    capacity_providers=[example_capacity_provider.name],
    default_capacity_provider_strategies=[aws.ecs.ClusterCapacityProvidersDefaultCapacityProviderStrategyArgs(
        base=1,
        weight=100,
        capacity_provider=example_capacity_provider.name,
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleCluster = new Aws.Ecs.Cluster("exampleCluster");

    var exampleCapacityProvider = new Aws.Ecs.CapacityProvider("exampleCapacityProvider", new()
    {
        AutoScalingGroupProvider = new Aws.Ecs.Inputs.CapacityProviderAutoScalingGroupProviderArgs
        {
            AutoScalingGroupArn = aws_autoscaling_group.Example.Arn,
        },
    });

    var exampleClusterCapacityProviders = new Aws.Ecs.ClusterCapacityProviders("exampleClusterCapacityProviders", new()
    {
        ClusterName = exampleCluster.Name,
        CapacityProviders = new[]
        {
            exampleCapacityProvider.Name,
        },
        DefaultCapacityProviderStrategies = new[]
        {
            new Aws.Ecs.Inputs.ClusterCapacityProvidersDefaultCapacityProviderStrategyArgs
            {
                Base = 1,
                Weight = 100,
                CapacityProvider = exampleCapacityProvider.Name,
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ecs"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleCluster, err := ecs.NewCluster(ctx, "exampleCluster", nil)
		if err != nil {
			return err
		}
		exampleCapacityProvider, err := ecs.NewCapacityProvider(ctx, "exampleCapacityProvider", &ecs.CapacityProviderArgs{
			AutoScalingGroupProvider: &ecs.CapacityProviderAutoScalingGroupProviderArgs{
				AutoScalingGroupArn: pulumi.Any(aws_autoscaling_group.Example.Arn),
			},
		})
		if err != nil {
			return err
		}
		_, err = ecs.NewClusterCapacityProviders(ctx, "exampleClusterCapacityProviders", &ecs.ClusterCapacityProvidersArgs{
			ClusterName: exampleCluster.Name,
			CapacityProviders: pulumi.StringArray{
				exampleCapacityProvider.Name,
			},
			DefaultCapacityProviderStrategies: ecs.ClusterCapacityProvidersDefaultCapacityProviderStrategyArray{
				&ecs.ClusterCapacityProvidersDefaultCapacityProviderStrategyArgs{
					Base:             pulumi.Int(1),
					Weight:           pulumi.Int(100),
					CapacityProvider: exampleCapacityProvider.Name,
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
import com.pulumi.aws.ecs.Cluster;
import com.pulumi.aws.ecs.CapacityProvider;
import com.pulumi.aws.ecs.CapacityProviderArgs;
import com.pulumi.aws.ecs.inputs.CapacityProviderAutoScalingGroupProviderArgs;
import com.pulumi.aws.ecs.ClusterCapacityProviders;
import com.pulumi.aws.ecs.ClusterCapacityProvidersArgs;
import com.pulumi.aws.ecs.inputs.ClusterCapacityProvidersDefaultCapacityProviderStrategyArgs;
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
        var exampleCluster = new Cluster("exampleCluster");

        var exampleCapacityProvider = new CapacityProvider("exampleCapacityProvider", CapacityProviderArgs.builder()        
            .autoScalingGroupProvider(CapacityProviderAutoScalingGroupProviderArgs.builder()
                .autoScalingGroupArn(aws_autoscaling_group.example().arn())
                .build())
            .build());

        var exampleClusterCapacityProviders = new ClusterCapacityProviders("exampleClusterCapacityProviders", ClusterCapacityProvidersArgs.builder()        
            .clusterName(exampleCluster.name())
            .capacityProviders(exampleCapacityProvider.name())
            .defaultCapacityProviderStrategies(ClusterCapacityProvidersDefaultCapacityProviderStrategyArgs.builder()
                .base(1)
                .weight(100)
                .capacityProvider(exampleCapacityProvider.name())
                .build())
            .build());

    }
}
```
```yaml
resources:
  exampleCluster:
    type: aws:ecs:Cluster
  exampleClusterCapacityProviders:
    type: aws:ecs:ClusterCapacityProviders
    properties:
      clusterName: ${exampleCluster.name}
      capacityProviders:
        - ${exampleCapacityProvider.name}
      defaultCapacityProviderStrategies:
        - base: 1
          weight: 100
          capacityProvider: ${exampleCapacityProvider.name}
  exampleCapacityProvider:
    type: aws:ecs:CapacityProvider
    properties:
      autoScalingGroupProvider:
        autoScalingGroupArn: ${aws_autoscaling_group.example.arn}
```
{{% /example %}}
{{% /examples %}}

## Import

ECS clusters can be imported using the `name`, e.g.,

```sh
 $ pulumi import aws:ecs/cluster:Cluster stateless stateless-app
```

 
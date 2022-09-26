Provides an GameLift Game Server Group resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.gamelift.GameServerGroup("example", {
    gameServerGroupName: "example",
    instanceDefinitions: [
        {
            instanceType: "c5.large",
        },
        {
            instanceType: "c5a.large",
        },
    ],
    launchTemplate: {
        id: aws_launch_template.example.id,
    },
    maxSize: 1,
    minSize: 1,
    roleArn: aws_iam_role.example.arn,
}, {
    dependsOn: [aws_iam_role_policy_attachment.example],
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.gamelift.GameServerGroup("example",
    game_server_group_name="example",
    instance_definitions=[
        aws.gamelift.GameServerGroupInstanceDefinitionArgs(
            instance_type="c5.large",
        ),
        aws.gamelift.GameServerGroupInstanceDefinitionArgs(
            instance_type="c5a.large",
        ),
    ],
    launch_template=aws.gamelift.GameServerGroupLaunchTemplateArgs(
        id=aws_launch_template["example"]["id"],
    ),
    max_size=1,
    min_size=1,
    role_arn=aws_iam_role["example"]["arn"],
    opts=pulumi.ResourceOptions(depends_on=[aws_iam_role_policy_attachment["example"]]))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.GameLift.GameServerGroup("example", new()
    {
        GameServerGroupName = "example",
        InstanceDefinitions = new[]
        {
            new Aws.GameLift.Inputs.GameServerGroupInstanceDefinitionArgs
            {
                InstanceType = "c5.large",
            },
            new Aws.GameLift.Inputs.GameServerGroupInstanceDefinitionArgs
            {
                InstanceType = "c5a.large",
            },
        },
        LaunchTemplate = new Aws.GameLift.Inputs.GameServerGroupLaunchTemplateArgs
        {
            Id = aws_launch_template.Example.Id,
        },
        MaxSize = 1,
        MinSize = 1,
        RoleArn = aws_iam_role.Example.Arn,
    }, new CustomResourceOptions
    {
        DependsOn = new[]
        {
            aws_iam_role_policy_attachment.Example,
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/gamelift"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := gamelift.NewGameServerGroup(ctx, "example", &gamelift.GameServerGroupArgs{
			GameServerGroupName: pulumi.String("example"),
			InstanceDefinitions: gamelift.GameServerGroupInstanceDefinitionArray{
				&gamelift.GameServerGroupInstanceDefinitionArgs{
					InstanceType: pulumi.String("c5.large"),
				},
				&gamelift.GameServerGroupInstanceDefinitionArgs{
					InstanceType: pulumi.String("c5a.large"),
				},
			},
			LaunchTemplate: &gamelift.GameServerGroupLaunchTemplateArgs{
				Id: pulumi.Any(aws_launch_template.Example.Id),
			},
			MaxSize: pulumi.Int(1),
			MinSize: pulumi.Int(1),
			RoleArn: pulumi.Any(aws_iam_role.Example.Arn),
		}, pulumi.DependsOn([]pulumi.Resource{
			aws_iam_role_policy_attachment.Example,
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
import com.pulumi.aws.gamelift.GameServerGroup;
import com.pulumi.aws.gamelift.GameServerGroupArgs;
import com.pulumi.aws.gamelift.inputs.GameServerGroupInstanceDefinitionArgs;
import com.pulumi.aws.gamelift.inputs.GameServerGroupLaunchTemplateArgs;
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
        var example = new GameServerGroup("example", GameServerGroupArgs.builder()        
            .gameServerGroupName("example")
            .instanceDefinitions(            
                GameServerGroupInstanceDefinitionArgs.builder()
                    .instanceType("c5.large")
                    .build(),
                GameServerGroupInstanceDefinitionArgs.builder()
                    .instanceType("c5a.large")
                    .build())
            .launchTemplate(GameServerGroupLaunchTemplateArgs.builder()
                .id(aws_launch_template.example().id())
                .build())
            .maxSize(1)
            .minSize(1)
            .roleArn(aws_iam_role.example().arn())
            .build(), CustomResourceOptions.builder()
                .dependsOn(aws_iam_role_policy_attachment.example())
                .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:gamelift:GameServerGroup
    properties:
      gameServerGroupName: example
      instanceDefinitions:
        - instanceType: c5.large
        - instanceType: c5a.large
      launchTemplate:
        id: ${aws_launch_template.example.id}
      maxSize: 1
      minSize: 1
      roleArn: ${aws_iam_role.example.arn}
    options:
      dependson:
        - ${aws_iam_role_policy_attachment.example}
```

Full usage:

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.gamelift.GameServerGroup("example", {
    autoScalingPolicy: {
        estimatedInstanceWarmup: 60,
        targetTrackingConfiguration: {
            targetValue: 75,
        },
    },
    balancingStrategy: "SPOT_ONLY",
    gameServerGroupName: "example",
    gameServerProtectionPolicy: "FULL_PROTECTION",
    instanceDefinitions: [
        {
            instanceType: "c5.large",
            weightedCapacity: "1",
        },
        {
            instanceType: "c5.2xlarge",
            weightedCapacity: "2",
        },
    ],
    launchTemplate: {
        id: aws_launch_template.example.id,
        version: "1",
    },
    maxSize: 1,
    minSize: 1,
    roleArn: aws_iam_role.example.arn,
    tags: {
        Name: "example",
    },
    vpcSubnets: [
        "subnet-12345678",
        "subnet-23456789",
    ],
}, {
    dependsOn: [aws_iam_role_policy_attachment.example],
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.gamelift.GameServerGroup("example",
    auto_scaling_policy=aws.gamelift.GameServerGroupAutoScalingPolicyArgs(
        estimated_instance_warmup=60,
        target_tracking_configuration=aws.gamelift.GameServerGroupAutoScalingPolicyTargetTrackingConfigurationArgs(
            target_value=75,
        ),
    ),
    balancing_strategy="SPOT_ONLY",
    game_server_group_name="example",
    game_server_protection_policy="FULL_PROTECTION",
    instance_definitions=[
        aws.gamelift.GameServerGroupInstanceDefinitionArgs(
            instance_type="c5.large",
            weighted_capacity="1",
        ),
        aws.gamelift.GameServerGroupInstanceDefinitionArgs(
            instance_type="c5.2xlarge",
            weighted_capacity="2",
        ),
    ],
    launch_template=aws.gamelift.GameServerGroupLaunchTemplateArgs(
        id=aws_launch_template["example"]["id"],
        version="1",
    ),
    max_size=1,
    min_size=1,
    role_arn=aws_iam_role["example"]["arn"],
    tags={
        "Name": "example",
    },
    vpc_subnets=[
        "subnet-12345678",
        "subnet-23456789",
    ],
    opts=pulumi.ResourceOptions(depends_on=[aws_iam_role_policy_attachment["example"]]))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.GameLift.GameServerGroup("example", new()
    {
        AutoScalingPolicy = new Aws.GameLift.Inputs.GameServerGroupAutoScalingPolicyArgs
        {
            EstimatedInstanceWarmup = 60,
            TargetTrackingConfiguration = new Aws.GameLift.Inputs.GameServerGroupAutoScalingPolicyTargetTrackingConfigurationArgs
            {
                TargetValue = 75,
            },
        },
        BalancingStrategy = "SPOT_ONLY",
        GameServerGroupName = "example",
        GameServerProtectionPolicy = "FULL_PROTECTION",
        InstanceDefinitions = new[]
        {
            new Aws.GameLift.Inputs.GameServerGroupInstanceDefinitionArgs
            {
                InstanceType = "c5.large",
                WeightedCapacity = "1",
            },
            new Aws.GameLift.Inputs.GameServerGroupInstanceDefinitionArgs
            {
                InstanceType = "c5.2xlarge",
                WeightedCapacity = "2",
            },
        },
        LaunchTemplate = new Aws.GameLift.Inputs.GameServerGroupLaunchTemplateArgs
        {
            Id = aws_launch_template.Example.Id,
            Version = "1",
        },
        MaxSize = 1,
        MinSize = 1,
        RoleArn = aws_iam_role.Example.Arn,
        Tags = 
        {
            { "Name", "example" },
        },
        VpcSubnets = new[]
        {
            "subnet-12345678",
            "subnet-23456789",
        },
    }, new CustomResourceOptions
    {
        DependsOn = new[]
        {
            aws_iam_role_policy_attachment.Example,
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/gamelift"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := gamelift.NewGameServerGroup(ctx, "example", &gamelift.GameServerGroupArgs{
			AutoScalingPolicy: &gamelift.GameServerGroupAutoScalingPolicyArgs{
				EstimatedInstanceWarmup: pulumi.Int(60),
				TargetTrackingConfiguration: &gamelift.GameServerGroupAutoScalingPolicyTargetTrackingConfigurationArgs{
					TargetValue: pulumi.Float64(75),
				},
			},
			BalancingStrategy:          pulumi.String("SPOT_ONLY"),
			GameServerGroupName:        pulumi.String("example"),
			GameServerProtectionPolicy: pulumi.String("FULL_PROTECTION"),
			InstanceDefinitions: gamelift.GameServerGroupInstanceDefinitionArray{
				&gamelift.GameServerGroupInstanceDefinitionArgs{
					InstanceType:     pulumi.String("c5.large"),
					WeightedCapacity: pulumi.String("1"),
				},
				&gamelift.GameServerGroupInstanceDefinitionArgs{
					InstanceType:     pulumi.String("c5.2xlarge"),
					WeightedCapacity: pulumi.String("2"),
				},
			},
			LaunchTemplate: &gamelift.GameServerGroupLaunchTemplateArgs{
				Id:      pulumi.Any(aws_launch_template.Example.Id),
				Version: pulumi.String("1"),
			},
			MaxSize: pulumi.Int(1),
			MinSize: pulumi.Int(1),
			RoleArn: pulumi.Any(aws_iam_role.Example.Arn),
			Tags: pulumi.StringMap{
				"Name": pulumi.String("example"),
			},
			VpcSubnets: pulumi.StringArray{
				pulumi.String("subnet-12345678"),
				pulumi.String("subnet-23456789"),
			},
		}, pulumi.DependsOn([]pulumi.Resource{
			aws_iam_role_policy_attachment.Example,
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
import com.pulumi.aws.gamelift.GameServerGroup;
import com.pulumi.aws.gamelift.GameServerGroupArgs;
import com.pulumi.aws.gamelift.inputs.GameServerGroupAutoScalingPolicyArgs;
import com.pulumi.aws.gamelift.inputs.GameServerGroupAutoScalingPolicyTargetTrackingConfigurationArgs;
import com.pulumi.aws.gamelift.inputs.GameServerGroupInstanceDefinitionArgs;
import com.pulumi.aws.gamelift.inputs.GameServerGroupLaunchTemplateArgs;
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
        var example = new GameServerGroup("example", GameServerGroupArgs.builder()        
            .autoScalingPolicy(GameServerGroupAutoScalingPolicyArgs.builder()
                .estimatedInstanceWarmup(60)
                .targetTrackingConfiguration(GameServerGroupAutoScalingPolicyTargetTrackingConfigurationArgs.builder()
                    .targetValue(75)
                    .build())
                .build())
            .balancingStrategy("SPOT_ONLY")
            .gameServerGroupName("example")
            .gameServerProtectionPolicy("FULL_PROTECTION")
            .instanceDefinitions(            
                GameServerGroupInstanceDefinitionArgs.builder()
                    .instanceType("c5.large")
                    .weightedCapacity("1")
                    .build(),
                GameServerGroupInstanceDefinitionArgs.builder()
                    .instanceType("c5.2xlarge")
                    .weightedCapacity("2")
                    .build())
            .launchTemplate(GameServerGroupLaunchTemplateArgs.builder()
                .id(aws_launch_template.example().id())
                .version("1")
                .build())
            .maxSize(1)
            .minSize(1)
            .roleArn(aws_iam_role.example().arn())
            .tags(Map.of("Name", "example"))
            .vpcSubnets(            
                "subnet-12345678",
                "subnet-23456789")
            .build(), CustomResourceOptions.builder()
                .dependsOn(aws_iam_role_policy_attachment.example())
                .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:gamelift:GameServerGroup
    properties:
      autoScalingPolicy:
        estimatedInstanceWarmup: 60
        targetTrackingConfiguration:
          targetValue: 75
      balancingStrategy: SPOT_ONLY
      gameServerGroupName: example
      gameServerProtectionPolicy: FULL_PROTECTION
      instanceDefinitions:
        - instanceType: c5.large
          weightedCapacity: 1
        - instanceType: c5.2xlarge
          weightedCapacity: 2
      launchTemplate:
        id: ${aws_launch_template.example.id}
        version: 1
      maxSize: 1
      minSize: 1
      roleArn: ${aws_iam_role.example.arn}
      tags:
        Name: example
      vpcSubnets:
        - subnet-12345678
        - subnet-23456789
    options:
      dependson:
        - ${aws_iam_role_policy_attachment.example}
```
{{% /example %}}
{{% example %}}
### Example IAM Role for GameLift Game Server Group

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const current = aws.getPartition({});
const exampleRole = new aws.iam.Role("exampleRole", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "autoscaling.amazonaws.com",
          "gamelift.amazonaws.com"
        ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
`});
const exampleRolePolicyAttachment = new aws.iam.RolePolicyAttachment("exampleRolePolicyAttachment", {
    policyArn: current.then(current => `arn:${current.partition}:iam::aws:policy/GameLiftGameServerGroupPolicy`),
    role: exampleRole.name,
});
```
```python
import pulumi
import pulumi_aws as aws

current = aws.get_partition()
example_role = aws.iam.Role("exampleRole", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "autoscaling.amazonaws.com",
          "gamelift.amazonaws.com"
        ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
""")
example_role_policy_attachment = aws.iam.RolePolicyAttachment("exampleRolePolicyAttachment",
    policy_arn=f"arn:{current.partition}:iam::aws:policy/GameLiftGameServerGroupPolicy",
    role=example_role.name)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var current = Aws.GetPartition.Invoke();

    var exampleRole = new Aws.Iam.Role("exampleRole", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Effect"": ""Allow"",
      ""Principal"": {
        ""Service"": [
          ""autoscaling.amazonaws.com"",
          ""gamelift.amazonaws.com""
        ]
      },
      ""Action"": ""sts:AssumeRole""
    }
  ]
}
",
    });

    var exampleRolePolicyAttachment = new Aws.Iam.RolePolicyAttachment("exampleRolePolicyAttachment", new()
    {
        PolicyArn = $"arn:{current.Apply(getPartitionResult => getPartitionResult.Partition)}:iam::aws:policy/GameLiftGameServerGroupPolicy",
        Role = exampleRole.Name,
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
		current, err := aws.GetPartition(ctx, nil, nil)
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
        "Service": [
          "autoscaling.amazonaws.com",
          "gamelift.amazonaws.com"
        ]
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
		_, err = iam.NewRolePolicyAttachment(ctx, "exampleRolePolicyAttachment", &iam.RolePolicyAttachmentArgs{
			PolicyArn: pulumi.String(fmt.Sprintf("arn:%v:iam::aws:policy/GameLiftGameServerGroupPolicy", current.Partition)),
			Role:      exampleRole.Name,
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
import com.pulumi.aws.AwsFunctions;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
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
        final var current = AwsFunctions.getPartition();

        var exampleRole = new Role("exampleRole", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "autoscaling.amazonaws.com",
          "gamelift.amazonaws.com"
        ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
            """)
            .build());

        var exampleRolePolicyAttachment = new RolePolicyAttachment("exampleRolePolicyAttachment", RolePolicyAttachmentArgs.builder()        
            .policyArn(String.format("arn:%s:iam::aws:policy/GameLiftGameServerGroupPolicy", current.applyValue(getPartitionResult -> getPartitionResult.partition())))
            .role(exampleRole.name())
            .build());

    }
}
```
```yaml
resources:
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
                "Service": [
                  "autoscaling.amazonaws.com",
                  "gamelift.amazonaws.com"
                ]
              },
              "Action": "sts:AssumeRole"
            }
          ]
        }
  exampleRolePolicyAttachment:
    type: aws:iam:RolePolicyAttachment
    properties:
      policyArn: arn:${current.partition}:iam::aws:policy/GameLiftGameServerGroupPolicy
      role: ${exampleRole.name}
variables:
  current:
    Fn::Invoke:
      Function: aws:getPartition
      Arguments: {}
```
{{% /example %}}
{{% /examples %}}

## Import

GameLift Game Server Group can be imported using the `name`, e.g.

```sh
 $ pulumi import aws:gamelift/gameServerGroup:GameServerGroup example example
```

 
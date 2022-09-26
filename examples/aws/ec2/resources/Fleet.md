Provides a resource to manage EC2 Fleets.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.ec2.Fleet("example", {
    launchTemplateConfig: {
        launchTemplateSpecification: {
            launchTemplateId: aws_launch_template.example.id,
            version: aws_launch_template.example.latest_version,
        },
    },
    targetCapacitySpecification: {
        defaultTargetCapacityType: "spot",
        totalTargetCapacity: 5,
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.ec2.Fleet("example",
    launch_template_config=aws.ec2.FleetLaunchTemplateConfigArgs(
        launch_template_specification=aws.ec2.FleetLaunchTemplateConfigLaunchTemplateSpecificationArgs(
            launch_template_id=aws_launch_template["example"]["id"],
            version=aws_launch_template["example"]["latest_version"],
        ),
    ),
    target_capacity_specification=aws.ec2.FleetTargetCapacitySpecificationArgs(
        default_target_capacity_type="spot",
        total_target_capacity=5,
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Ec2.Fleet("example", new()
    {
        LaunchTemplateConfig = new Aws.Ec2.Inputs.FleetLaunchTemplateConfigArgs
        {
            LaunchTemplateSpecification = new Aws.Ec2.Inputs.FleetLaunchTemplateConfigLaunchTemplateSpecificationArgs
            {
                LaunchTemplateId = aws_launch_template.Example.Id,
                Version = aws_launch_template.Example.Latest_version,
            },
        },
        TargetCapacitySpecification = new Aws.Ec2.Inputs.FleetTargetCapacitySpecificationArgs
        {
            DefaultTargetCapacityType = "spot",
            TotalTargetCapacity = 5,
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ec2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := ec2.NewFleet(ctx, "example", &ec2.FleetArgs{
			LaunchTemplateConfig: &ec2.FleetLaunchTemplateConfigArgs{
				LaunchTemplateSpecification: &ec2.FleetLaunchTemplateConfigLaunchTemplateSpecificationArgs{
					LaunchTemplateId: pulumi.Any(aws_launch_template.Example.Id),
					Version:          pulumi.Any(aws_launch_template.Example.Latest_version),
				},
			},
			TargetCapacitySpecification: &ec2.FleetTargetCapacitySpecificationArgs{
				DefaultTargetCapacityType: pulumi.String("spot"),
				TotalTargetCapacity:       pulumi.Int(5),
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
import com.pulumi.aws.ec2.Fleet;
import com.pulumi.aws.ec2.FleetArgs;
import com.pulumi.aws.ec2.inputs.FleetLaunchTemplateConfigArgs;
import com.pulumi.aws.ec2.inputs.FleetLaunchTemplateConfigLaunchTemplateSpecificationArgs;
import com.pulumi.aws.ec2.inputs.FleetTargetCapacitySpecificationArgs;
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
        var example = new Fleet("example", FleetArgs.builder()        
            .launchTemplateConfig(FleetLaunchTemplateConfigArgs.builder()
                .launchTemplateSpecification(FleetLaunchTemplateConfigLaunchTemplateSpecificationArgs.builder()
                    .launchTemplateId(aws_launch_template.example().id())
                    .version(aws_launch_template.example().latest_version())
                    .build())
                .build())
            .targetCapacitySpecification(FleetTargetCapacitySpecificationArgs.builder()
                .defaultTargetCapacityType("spot")
                .totalTargetCapacity(5)
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:ec2:Fleet
    properties:
      launchTemplateConfig:
        launchTemplateSpecification:
          launchTemplateId: ${aws_launch_template.example.id}
          version: ${aws_launch_template.example.latest_version}
      targetCapacitySpecification:
        defaultTargetCapacityType: spot
        totalTargetCapacity: 5
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_ec2_fleet` can be imported by using the Fleet identifier, e.g.,

```sh
 $ pulumi import aws:ec2/fleet:Fleet example fleet-b9b55d27-c5fc-41ac-a6f3-48fcc91f080c
```

 
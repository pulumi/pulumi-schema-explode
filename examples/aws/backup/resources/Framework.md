Provides an AWS Backup Framework resource.

> **Note:** For the Deployment Status of the Framework to be successful, please turn on resource tracking to enable AWS Config recording to track configuration changes of your backup resources. This can be done from the AWS Console.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.backup.Framework("Example", {
    controls: [
        {
            inputParameters: [{
                name: "requiredRetentionDays",
                value: "35",
            }],
            name: "BACKUP_RECOVERY_POINT_MINIMUM_RETENTION_CHECK",
        },
        {
            inputParameters: [
                {
                    name: "requiredFrequencyUnit",
                    value: "hours",
                },
                {
                    name: "requiredRetentionDays",
                    value: "35",
                },
                {
                    name: "requiredFrequencyValue",
                    value: "1",
                },
            ],
            name: "BACKUP_PLAN_MIN_FREQUENCY_AND_MIN_RETENTION_CHECK",
        },
        {
            name: "BACKUP_RECOVERY_POINT_ENCRYPTED",
        },
        {
            name: "BACKUP_RESOURCES_PROTECTED_BY_BACKUP_PLAN",
            scope: {
                complianceResourceTypes: ["EBS"],
            },
        },
        {
            name: "BACKUP_RECOVERY_POINT_MANUAL_DELETION_DISABLED",
        },
    ],
    description: "this is an example framework",
    tags: {
        Name: "Example Framework",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.backup.Framework("example",
    controls=[
        aws.backup.FrameworkControlArgs(
            input_parameters=[aws.backup.FrameworkControlInputParameterArgs(
                name="requiredRetentionDays",
                value="35",
            )],
            name="BACKUP_RECOVERY_POINT_MINIMUM_RETENTION_CHECK",
        ),
        aws.backup.FrameworkControlArgs(
            input_parameters=[
                aws.backup.FrameworkControlInputParameterArgs(
                    name="requiredFrequencyUnit",
                    value="hours",
                ),
                aws.backup.FrameworkControlInputParameterArgs(
                    name="requiredRetentionDays",
                    value="35",
                ),
                aws.backup.FrameworkControlInputParameterArgs(
                    name="requiredFrequencyValue",
                    value="1",
                ),
            ],
            name="BACKUP_PLAN_MIN_FREQUENCY_AND_MIN_RETENTION_CHECK",
        ),
        aws.backup.FrameworkControlArgs(
            name="BACKUP_RECOVERY_POINT_ENCRYPTED",
        ),
        aws.backup.FrameworkControlArgs(
            name="BACKUP_RESOURCES_PROTECTED_BY_BACKUP_PLAN",
            scope=aws.backup.FrameworkControlScopeArgs(
                compliance_resource_types=["EBS"],
            ),
        ),
        aws.backup.FrameworkControlArgs(
            name="BACKUP_RECOVERY_POINT_MANUAL_DELETION_DISABLED",
        ),
    ],
    description="this is an example framework",
    tags={
        "Name": "Example Framework",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Backup.Framework("example", new()
    {
        Controls = new[]
        {
            new Aws.Backup.Inputs.FrameworkControlArgs
            {
                InputParameters = new[]
                {
                    new Aws.Backup.Inputs.FrameworkControlInputParameterArgs
                    {
                        Name = "requiredRetentionDays",
                        Value = "35",
                    },
                },
                Name = "BACKUP_RECOVERY_POINT_MINIMUM_RETENTION_CHECK",
            },
            new Aws.Backup.Inputs.FrameworkControlArgs
            {
                InputParameters = new[]
                {
                    new Aws.Backup.Inputs.FrameworkControlInputParameterArgs
                    {
                        Name = "requiredFrequencyUnit",
                        Value = "hours",
                    },
                    new Aws.Backup.Inputs.FrameworkControlInputParameterArgs
                    {
                        Name = "requiredRetentionDays",
                        Value = "35",
                    },
                    new Aws.Backup.Inputs.FrameworkControlInputParameterArgs
                    {
                        Name = "requiredFrequencyValue",
                        Value = "1",
                    },
                },
                Name = "BACKUP_PLAN_MIN_FREQUENCY_AND_MIN_RETENTION_CHECK",
            },
            new Aws.Backup.Inputs.FrameworkControlArgs
            {
                Name = "BACKUP_RECOVERY_POINT_ENCRYPTED",
            },
            new Aws.Backup.Inputs.FrameworkControlArgs
            {
                Name = "BACKUP_RESOURCES_PROTECTED_BY_BACKUP_PLAN",
                Scope = new Aws.Backup.Inputs.FrameworkControlScopeArgs
                {
                    ComplianceResourceTypes = new[]
                    {
                        "EBS",
                    },
                },
            },
            new Aws.Backup.Inputs.FrameworkControlArgs
            {
                Name = "BACKUP_RECOVERY_POINT_MANUAL_DELETION_DISABLED",
            },
        },
        Description = "this is an example framework",
        Tags = 
        {
            { "Name", "Example Framework" },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/backup"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := backup.NewFramework(ctx, "example", &backup.FrameworkArgs{
			Controls: backup.FrameworkControlArray{
				&backup.FrameworkControlArgs{
					InputParameters: backup.FrameworkControlInputParameterArray{
						&backup.FrameworkControlInputParameterArgs{
							Name:  pulumi.String("requiredRetentionDays"),
							Value: pulumi.String("35"),
						},
					},
					Name: pulumi.String("BACKUP_RECOVERY_POINT_MINIMUM_RETENTION_CHECK"),
				},
				&backup.FrameworkControlArgs{
					InputParameters: backup.FrameworkControlInputParameterArray{
						&backup.FrameworkControlInputParameterArgs{
							Name:  pulumi.String("requiredFrequencyUnit"),
							Value: pulumi.String("hours"),
						},
						&backup.FrameworkControlInputParameterArgs{
							Name:  pulumi.String("requiredRetentionDays"),
							Value: pulumi.String("35"),
						},
						&backup.FrameworkControlInputParameterArgs{
							Name:  pulumi.String("requiredFrequencyValue"),
							Value: pulumi.String("1"),
						},
					},
					Name: pulumi.String("BACKUP_PLAN_MIN_FREQUENCY_AND_MIN_RETENTION_CHECK"),
				},
				&backup.FrameworkControlArgs{
					Name: pulumi.String("BACKUP_RECOVERY_POINT_ENCRYPTED"),
				},
				&backup.FrameworkControlArgs{
					Name: pulumi.String("BACKUP_RESOURCES_PROTECTED_BY_BACKUP_PLAN"),
					Scope: &backup.FrameworkControlScopeArgs{
						ComplianceResourceTypes: pulumi.StringArray{
							pulumi.String("EBS"),
						},
					},
				},
				&backup.FrameworkControlArgs{
					Name: pulumi.String("BACKUP_RECOVERY_POINT_MANUAL_DELETION_DISABLED"),
				},
			},
			Description: pulumi.String("this is an example framework"),
			Tags: pulumi.StringMap{
				"Name": pulumi.String("Example Framework"),
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
import com.pulumi.aws.backup.Framework;
import com.pulumi.aws.backup.FrameworkArgs;
import com.pulumi.aws.backup.inputs.FrameworkControlArgs;
import com.pulumi.aws.backup.inputs.FrameworkControlScopeArgs;
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
        var example = new Framework("example", FrameworkArgs.builder()        
            .controls(            
                FrameworkControlArgs.builder()
                    .inputParameters(FrameworkControlInputParameterArgs.builder()
                        .name("requiredRetentionDays")
                        .value("35")
                        .build())
                    .name("BACKUP_RECOVERY_POINT_MINIMUM_RETENTION_CHECK")
                    .build(),
                FrameworkControlArgs.builder()
                    .inputParameters(                    
                        FrameworkControlInputParameterArgs.builder()
                            .name("requiredFrequencyUnit")
                            .value("hours")
                            .build(),
                        FrameworkControlInputParameterArgs.builder()
                            .name("requiredRetentionDays")
                            .value("35")
                            .build(),
                        FrameworkControlInputParameterArgs.builder()
                            .name("requiredFrequencyValue")
                            .value("1")
                            .build())
                    .name("BACKUP_PLAN_MIN_FREQUENCY_AND_MIN_RETENTION_CHECK")
                    .build(),
                FrameworkControlArgs.builder()
                    .name("BACKUP_RECOVERY_POINT_ENCRYPTED")
                    .build(),
                FrameworkControlArgs.builder()
                    .name("BACKUP_RESOURCES_PROTECTED_BY_BACKUP_PLAN")
                    .scope(FrameworkControlScopeArgs.builder()
                        .complianceResourceTypes("EBS")
                        .build())
                    .build(),
                FrameworkControlArgs.builder()
                    .name("BACKUP_RECOVERY_POINT_MANUAL_DELETION_DISABLED")
                    .build())
            .description("this is an example framework")
            .tags(Map.of("Name", "Example Framework"))
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:backup:Framework
    properties:
      controls:
        - inputParameters:
            - name: requiredRetentionDays
              value: 35
          name: BACKUP_RECOVERY_POINT_MINIMUM_RETENTION_CHECK
        - inputParameters:
            - name: requiredFrequencyUnit
              value: hours
            - name: requiredRetentionDays
              value: 35
            - name: requiredFrequencyValue
              value: 1
          name: BACKUP_PLAN_MIN_FREQUENCY_AND_MIN_RETENTION_CHECK
        - name: BACKUP_RECOVERY_POINT_ENCRYPTED
        - name: BACKUP_RESOURCES_PROTECTED_BY_BACKUP_PLAN
          scope:
            complianceResourceTypes:
              - EBS
        - name: BACKUP_RECOVERY_POINT_MANUAL_DELETION_DISABLED
      description: this is an example framework
      tags:
        Name: Example Framework
```
{{% /example %}}
{{% /examples %}}

## Import

Backup Framework can be imported using the `id` which corresponds to the name of the Backup Framework, e.g.,

```sh
 $ pulumi import aws:backup/framework:Framework test <id>
```

 
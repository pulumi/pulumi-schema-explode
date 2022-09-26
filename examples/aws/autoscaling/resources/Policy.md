{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bar = new aws.autoscaling.Group("bar", {
    availabilityZones: ["us-east-1a"],
    maxSize: 5,
    minSize: 2,
    healthCheckGracePeriod: 300,
    healthCheckType: "ELB",
    forceDelete: true,
    launchConfiguration: aws_launch_configuration.foo.name,
});
const bat = new aws.autoscaling.Policy("bat", {
    scalingAdjustment: 4,
    adjustmentType: "ChangeInCapacity",
    cooldown: 300,
    autoscalingGroupName: bar.name,
});
```
```python
import pulumi
import pulumi_aws as aws

bar = aws.autoscaling.Group("bar",
    availability_zones=["us-east-1a"],
    max_size=5,
    min_size=2,
    health_check_grace_period=300,
    health_check_type="ELB",
    force_delete=True,
    launch_configuration=aws_launch_configuration["foo"]["name"])
bat = aws.autoscaling.Policy("bat",
    scaling_adjustment=4,
    adjustment_type="ChangeInCapacity",
    cooldown=300,
    autoscaling_group_name=bar.name)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var bar = new Aws.AutoScaling.Group("bar", new()
    {
        AvailabilityZones = new[]
        {
            "us-east-1a",
        },
        MaxSize = 5,
        MinSize = 2,
        HealthCheckGracePeriod = 300,
        HealthCheckType = "ELB",
        ForceDelete = true,
        LaunchConfiguration = aws_launch_configuration.Foo.Name,
    });

    var bat = new Aws.AutoScaling.Policy("bat", new()
    {
        ScalingAdjustment = 4,
        AdjustmentType = "ChangeInCapacity",
        Cooldown = 300,
        AutoscalingGroupName = bar.Name,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/autoscaling"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ec2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		bar, err := autoscaling.NewGroup(ctx, "bar", &autoscaling.GroupArgs{
			AvailabilityZones: pulumi.StringArray{
				pulumi.String("us-east-1a"),
			},
			MaxSize:                pulumi.Int(5),
			MinSize:                pulumi.Int(2),
			HealthCheckGracePeriod: pulumi.Int(300),
			HealthCheckType:        pulumi.String("ELB"),
			ForceDelete:            pulumi.Bool(true),
			LaunchConfiguration:    pulumi.Any(aws_launch_configuration.Foo.Name),
		})
		if err != nil {
			return err
		}
		_, err = autoscaling.NewPolicy(ctx, "bat", &autoscaling.PolicyArgs{
			ScalingAdjustment:    pulumi.Int(4),
			AdjustmentType:       pulumi.String("ChangeInCapacity"),
			Cooldown:             pulumi.Int(300),
			AutoscalingGroupName: bar.Name,
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
import com.pulumi.aws.autoscaling.Group;
import com.pulumi.aws.autoscaling.GroupArgs;
import com.pulumi.aws.autoscaling.Policy;
import com.pulumi.aws.autoscaling.PolicyArgs;
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
        var bar = new Group("bar", GroupArgs.builder()        
            .availabilityZones("us-east-1a")
            .maxSize(5)
            .minSize(2)
            .healthCheckGracePeriod(300)
            .healthCheckType("ELB")
            .forceDelete(true)
            .launchConfiguration(aws_launch_configuration.foo().name())
            .build());

        var bat = new Policy("bat", PolicyArgs.builder()        
            .scalingAdjustment(4)
            .adjustmentType("ChangeInCapacity")
            .cooldown(300)
            .autoscalingGroupName(bar.name())
            .build());

    }
}
```
```yaml
resources:
  bat:
    type: aws:autoscaling:Policy
    properties:
      scalingAdjustment: 4
      adjustmentType: ChangeInCapacity
      cooldown: 300
      autoscalingGroupName: ${bar.name}
  bar:
    type: aws:autoscaling:Group
    properties:
      availabilityZones:
        - us-east-1a
      maxSize: 5
      minSize: 2
      healthCheckGracePeriod: 300
      healthCheckType: ELB
      forceDelete: true
      launchConfiguration: ${aws_launch_configuration.foo.name}
```
{{% /example %}}
{{% example %}}
### Create predictive scaling policy using customized metrics

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.autoscaling.Policy("example", {
    autoscalingGroupName: "my-test-asg",
    policyType: "PredictiveScaling",
    predictiveScalingConfiguration: {
        metricSpecification: {
            customizedCapacityMetricSpecification: {
                metricDataQueries: [
                    {
                        expression: "SUM(SEARCH('{AWS/AutoScaling,AutoScalingGroupName} MetricName=\"GroupInServiceIntances\" my-test-asg', 'Average', 300))",
                        id: "capacity_sum",
                        returnData: false,
                    },
                    {
                        expression: "SUM(SEARCH('{AWS/EC2,AutoScalingGroupName} MetricName=\"CPUUtilization\" my-test-asg', 'Sum', 300))",
                        id: "load_sum",
                        returnData: false,
                    },
                    {
                        expression: "load_sum / capacity_sum",
                        id: "weighted_average",
                    },
                ],
            },
            customizedLoadMetricSpecification: {
                metricDataQueries: [{
                    expression: "SUM(SEARCH('{AWS/EC2,AutoScalingGroupName} MetricName=\"CPUUtilization\" my-test-asg', 'Sum', 3600))",
                    id: "load_sum",
                }],
            },
            customizedScalingMetricSpecification: {
                metricDataQueries: [{
                    id: "scaling",
                    metricStat: {
                        metric: {
                            dimensions: [{
                                name: "AutoScalingGroupName",
                                value: "my-test-asg",
                            }],
                            metricName: "CPUUtilization",
                            namespace: "AWS/EC2",
                        },
                        stat: "Average",
                    },
                }],
            },
            targetValue: 10,
        },
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.autoscaling.Policy("example",
    autoscaling_group_name="my-test-asg",
    policy_type="PredictiveScaling",
    predictive_scaling_configuration=aws.autoscaling.PolicyPredictiveScalingConfigurationArgs(
        metric_specification=aws.autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationArgs(
            customized_capacity_metric_specification=aws.autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedCapacityMetricSpecificationArgs(
                metric_data_queries=[
                    aws.autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedCapacityMetricSpecificationMetricDataQueryArgs(
                        expression="SUM(SEARCH('{AWS/AutoScaling,AutoScalingGroupName} MetricName=\"GroupInServiceIntances\" my-test-asg', 'Average', 300))",
                        id="capacity_sum",
                        return_data=False,
                    ),
                    aws.autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedCapacityMetricSpecificationMetricDataQueryArgs(
                        expression="SUM(SEARCH('{AWS/EC2,AutoScalingGroupName} MetricName=\"CPUUtilization\" my-test-asg', 'Sum', 300))",
                        id="load_sum",
                        return_data=False,
                    ),
                    aws.autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedCapacityMetricSpecificationMetricDataQueryArgs(
                        expression="load_sum / capacity_sum",
                        id="weighted_average",
                    ),
                ],
            ),
            customized_load_metric_specification=aws.autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedLoadMetricSpecificationArgs(
                metric_data_queries=[aws.autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedLoadMetricSpecificationMetricDataQueryArgs(
                    expression="SUM(SEARCH('{AWS/EC2,AutoScalingGroupName} MetricName=\"CPUUtilization\" my-test-asg', 'Sum', 3600))",
                    id="load_sum",
                )],
            ),
            customized_scaling_metric_specification=aws.autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationArgs(
                metric_data_queries=[aws.autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryArgs(
                    id="scaling",
                    metric_stat=aws.autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatArgs(
                        metric=aws.autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatMetricArgs(
                            dimensions=[aws.autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatMetricDimensionArgs(
                                name="AutoScalingGroupName",
                                value="my-test-asg",
                            )],
                            metric_name="CPUUtilization",
                            namespace="AWS/EC2",
                        ),
                        stat="Average",
                    ),
                )],
            ),
            target_value=10,
        ),
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.AutoScaling.Policy("example", new()
    {
        AutoscalingGroupName = "my-test-asg",
        PolicyType = "PredictiveScaling",
        PredictiveScalingConfiguration = new Aws.AutoScaling.Inputs.PolicyPredictiveScalingConfigurationArgs
        {
            MetricSpecification = new Aws.AutoScaling.Inputs.PolicyPredictiveScalingConfigurationMetricSpecificationArgs
            {
                CustomizedCapacityMetricSpecification = new Aws.AutoScaling.Inputs.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedCapacityMetricSpecificationArgs
                {
                    MetricDataQueries = new[]
                    {
                        new Aws.AutoScaling.Inputs.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedCapacityMetricSpecificationMetricDataQueryArgs
                        {
                            Expression = "SUM(SEARCH('{AWS/AutoScaling,AutoScalingGroupName} MetricName=\"GroupInServiceIntances\" my-test-asg', 'Average', 300))",
                            Id = "capacity_sum",
                            ReturnData = false,
                        },
                        new Aws.AutoScaling.Inputs.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedCapacityMetricSpecificationMetricDataQueryArgs
                        {
                            Expression = "SUM(SEARCH('{AWS/EC2,AutoScalingGroupName} MetricName=\"CPUUtilization\" my-test-asg', 'Sum', 300))",
                            Id = "load_sum",
                            ReturnData = false,
                        },
                        new Aws.AutoScaling.Inputs.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedCapacityMetricSpecificationMetricDataQueryArgs
                        {
                            Expression = "load_sum / capacity_sum",
                            Id = "weighted_average",
                        },
                    },
                },
                CustomizedLoadMetricSpecification = new Aws.AutoScaling.Inputs.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedLoadMetricSpecificationArgs
                {
                    MetricDataQueries = new[]
                    {
                        new Aws.AutoScaling.Inputs.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedLoadMetricSpecificationMetricDataQueryArgs
                        {
                            Expression = "SUM(SEARCH('{AWS/EC2,AutoScalingGroupName} MetricName=\"CPUUtilization\" my-test-asg', 'Sum', 3600))",
                            Id = "load_sum",
                        },
                    },
                },
                CustomizedScalingMetricSpecification = new Aws.AutoScaling.Inputs.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationArgs
                {
                    MetricDataQueries = new[]
                    {
                        new Aws.AutoScaling.Inputs.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryArgs
                        {
                            Id = "scaling",
                            MetricStat = new Aws.AutoScaling.Inputs.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatArgs
                            {
                                Metric = new Aws.AutoScaling.Inputs.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatMetricArgs
                                {
                                    Dimensions = new[]
                                    {
                                        new Aws.AutoScaling.Inputs.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatMetricDimensionArgs
                                        {
                                            Name = "AutoScalingGroupName",
                                            Value = "my-test-asg",
                                        },
                                    },
                                    MetricName = "CPUUtilization",
                                    Namespace = "AWS/EC2",
                                },
                                Stat = "Average",
                            },
                        },
                    },
                },
                TargetValue = 10,
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/autoscaling"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := autoscaling.NewPolicy(ctx, "example", &autoscaling.PolicyArgs{
			AutoscalingGroupName: pulumi.String("my-test-asg"),
			PolicyType:           pulumi.String("PredictiveScaling"),
			PredictiveScalingConfiguration: &autoscaling.PolicyPredictiveScalingConfigurationArgs{
				MetricSpecification: &autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationArgs{
					CustomizedCapacityMetricSpecification: &autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedCapacityMetricSpecificationArgs{
						MetricDataQueries: autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedCapacityMetricSpecificationMetricDataQueryArray{
							&autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedCapacityMetricSpecificationMetricDataQueryArgs{
								Expression: pulumi.String("SUM(SEARCH('{AWS/AutoScaling,AutoScalingGroupName} MetricName=\"GroupInServiceIntances\" my-test-asg', 'Average', 300))"),
								Id:         pulumi.String("capacity_sum"),
								ReturnData: pulumi.Bool(false),
							},
							&autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedCapacityMetricSpecificationMetricDataQueryArgs{
								Expression: pulumi.String("SUM(SEARCH('{AWS/EC2,AutoScalingGroupName} MetricName=\"CPUUtilization\" my-test-asg', 'Sum', 300))"),
								Id:         pulumi.String("load_sum"),
								ReturnData: pulumi.Bool(false),
							},
							&autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedCapacityMetricSpecificationMetricDataQueryArgs{
								Expression: pulumi.String("load_sum / capacity_sum"),
								Id:         pulumi.String("weighted_average"),
							},
						},
					},
					CustomizedLoadMetricSpecification: &autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedLoadMetricSpecificationArgs{
						MetricDataQueries: autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedLoadMetricSpecificationMetricDataQueryArray{
							&autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedLoadMetricSpecificationMetricDataQueryArgs{
								Expression: pulumi.String("SUM(SEARCH('{AWS/EC2,AutoScalingGroupName} MetricName=\"CPUUtilization\" my-test-asg', 'Sum', 3600))"),
								Id:         pulumi.String("load_sum"),
							},
						},
					},
					CustomizedScalingMetricSpecification: &autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationArgs{
						MetricDataQueries: autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryArray{
							&autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryArgs{
								Id: pulumi.String("scaling"),
								MetricStat: &autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatArgs{
									Metric: &autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatMetricArgs{
										Dimensions: autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatMetricDimensionArray{
											&autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatMetricDimensionArgs{
												Name:  pulumi.String("AutoScalingGroupName"),
												Value: pulumi.String("my-test-asg"),
											},
										},
										MetricName: pulumi.String("CPUUtilization"),
										Namespace:  pulumi.String("AWS/EC2"),
									},
									Stat: pulumi.String("Average"),
								},
							},
						},
					},
					TargetValue: pulumi.Int(10),
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
import com.pulumi.aws.autoscaling.Policy;
import com.pulumi.aws.autoscaling.PolicyArgs;
import com.pulumi.aws.autoscaling.inputs.PolicyPredictiveScalingConfigurationArgs;
import com.pulumi.aws.autoscaling.inputs.PolicyPredictiveScalingConfigurationMetricSpecificationArgs;
import com.pulumi.aws.autoscaling.inputs.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedCapacityMetricSpecificationArgs;
import com.pulumi.aws.autoscaling.inputs.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedLoadMetricSpecificationArgs;
import com.pulumi.aws.autoscaling.inputs.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationArgs;
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
        var example = new Policy("example", PolicyArgs.builder()        
            .autoscalingGroupName("my-test-asg")
            .policyType("PredictiveScaling")
            .predictiveScalingConfiguration(PolicyPredictiveScalingConfigurationArgs.builder()
                .metricSpecification(PolicyPredictiveScalingConfigurationMetricSpecificationArgs.builder()
                    .customizedCapacityMetricSpecification(PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedCapacityMetricSpecificationArgs.builder()
                        .metricDataQueries(                        
                            PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedCapacityMetricSpecificationMetricDataQueryArgs.builder()
                                .expression("SUM(SEARCH('{AWS/AutoScaling,AutoScalingGroupName} MetricName=\"GroupInServiceIntances\" my-test-asg', 'Average', 300))")
                                .id("capacity_sum")
                                .returnData(false)
                                .build(),
                            PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedCapacityMetricSpecificationMetricDataQueryArgs.builder()
                                .expression("SUM(SEARCH('{AWS/EC2,AutoScalingGroupName} MetricName=\"CPUUtilization\" my-test-asg', 'Sum', 300))")
                                .id("load_sum")
                                .returnData(false)
                                .build(),
                            PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedCapacityMetricSpecificationMetricDataQueryArgs.builder()
                                .expression("load_sum / capacity_sum")
                                .id("weighted_average")
                                .build())
                        .build())
                    .customizedLoadMetricSpecification(PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedLoadMetricSpecificationArgs.builder()
                        .metricDataQueries(PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedLoadMetricSpecificationMetricDataQueryArgs.builder()
                            .expression("SUM(SEARCH('{AWS/EC2,AutoScalingGroupName} MetricName=\"CPUUtilization\" my-test-asg', 'Sum', 3600))")
                            .id("load_sum")
                            .build())
                        .build())
                    .customizedScalingMetricSpecification(PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationArgs.builder()
                        .metricDataQueries(PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryArgs.builder()
                            .id("scaling")
                            .metricStat(PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatArgs.builder()
                                .metric(PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatMetricArgs.builder()
                                    .dimensions(PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatMetricDimensionArgs.builder()
                                        .name("AutoScalingGroupName")
                                        .value("my-test-asg")
                                        .build())
                                    .metricName("CPUUtilization")
                                    .namespace("AWS/EC2")
                                    .build())
                                .stat("Average")
                                .build())
                            .build())
                        .build())
                    .targetValue(10)
                    .build())
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:autoscaling:Policy
    properties:
      autoscalingGroupName: my-test-asg
      policyType: PredictiveScaling
      predictiveScalingConfiguration:
        metricSpecification:
          customizedCapacityMetricSpecification:
            metricDataQueries:
              - expression: SUM(SEARCH('{AWS/AutoScaling,AutoScalingGroupName} MetricName="GroupInServiceIntances" my-test-asg', 'Average', 300))
                id: capacity_sum
                returnData: false
              - expression: SUM(SEARCH('{AWS/EC2,AutoScalingGroupName} MetricName="CPUUtilization" my-test-asg', 'Sum', 300))
                id: load_sum
                returnData: false
              - expression: load_sum / capacity_sum
                id: weighted_average
          customizedLoadMetricSpecification:
            metricDataQueries:
              - expression: SUM(SEARCH('{AWS/EC2,AutoScalingGroupName} MetricName="CPUUtilization" my-test-asg', 'Sum', 3600))
                id: load_sum
          customizedScalingMetricSpecification:
            metricDataQueries:
              - id: scaling
                metricStat:
                  metric:
                    dimensions:
                      - name: AutoScalingGroupName
                        value: my-test-asg
                    metricName: CPUUtilization
                    namespace: AWS/EC2
                  stat: Average
          targetValue: 10
```
{{% /example %}}
{{% example %}}
### Create predictive scaling policy using customized scaling and predefined load metric

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.autoscaling.Policy("example", {
    autoscalingGroupName: "my-test-asg",
    policyType: "PredictiveScaling",
    predictiveScalingConfiguration: {
        metricSpecification: {
            customizedScalingMetricSpecification: {
                metricDataQueries: [{
                    id: "scaling",
                    metricStat: {
                        metric: {
                            dimensions: [{
                                name: "AutoScalingGroupName",
                                value: "my-test-asg",
                            }],
                            metricName: "CPUUtilization",
                            namespace: "AWS/EC2",
                        },
                        stat: "Average",
                    },
                }],
            },
            predefinedLoadMetricSpecification: {
                predefinedMetricType: "ASGTotalCPUUtilization",
                resourceLabel: "testLabel",
            },
            targetValue: 10,
        },
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.autoscaling.Policy("example",
    autoscaling_group_name="my-test-asg",
    policy_type="PredictiveScaling",
    predictive_scaling_configuration=aws.autoscaling.PolicyPredictiveScalingConfigurationArgs(
        metric_specification=aws.autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationArgs(
            customized_scaling_metric_specification=aws.autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationArgs(
                metric_data_queries=[aws.autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryArgs(
                    id="scaling",
                    metric_stat=aws.autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatArgs(
                        metric=aws.autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatMetricArgs(
                            dimensions=[aws.autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatMetricDimensionArgs(
                                name="AutoScalingGroupName",
                                value="my-test-asg",
                            )],
                            metric_name="CPUUtilization",
                            namespace="AWS/EC2",
                        ),
                        stat="Average",
                    ),
                )],
            ),
            predefined_load_metric_specification=aws.autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationPredefinedLoadMetricSpecificationArgs(
                predefined_metric_type="ASGTotalCPUUtilization",
                resource_label="testLabel",
            ),
            target_value=10,
        ),
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.AutoScaling.Policy("example", new()
    {
        AutoscalingGroupName = "my-test-asg",
        PolicyType = "PredictiveScaling",
        PredictiveScalingConfiguration = new Aws.AutoScaling.Inputs.PolicyPredictiveScalingConfigurationArgs
        {
            MetricSpecification = new Aws.AutoScaling.Inputs.PolicyPredictiveScalingConfigurationMetricSpecificationArgs
            {
                CustomizedScalingMetricSpecification = new Aws.AutoScaling.Inputs.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationArgs
                {
                    MetricDataQueries = new[]
                    {
                        new Aws.AutoScaling.Inputs.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryArgs
                        {
                            Id = "scaling",
                            MetricStat = new Aws.AutoScaling.Inputs.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatArgs
                            {
                                Metric = new Aws.AutoScaling.Inputs.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatMetricArgs
                                {
                                    Dimensions = new[]
                                    {
                                        new Aws.AutoScaling.Inputs.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatMetricDimensionArgs
                                        {
                                            Name = "AutoScalingGroupName",
                                            Value = "my-test-asg",
                                        },
                                    },
                                    MetricName = "CPUUtilization",
                                    Namespace = "AWS/EC2",
                                },
                                Stat = "Average",
                            },
                        },
                    },
                },
                PredefinedLoadMetricSpecification = new Aws.AutoScaling.Inputs.PolicyPredictiveScalingConfigurationMetricSpecificationPredefinedLoadMetricSpecificationArgs
                {
                    PredefinedMetricType = "ASGTotalCPUUtilization",
                    ResourceLabel = "testLabel",
                },
                TargetValue = 10,
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/autoscaling"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := autoscaling.NewPolicy(ctx, "example", &autoscaling.PolicyArgs{
			AutoscalingGroupName: pulumi.String("my-test-asg"),
			PolicyType:           pulumi.String("PredictiveScaling"),
			PredictiveScalingConfiguration: &autoscaling.PolicyPredictiveScalingConfigurationArgs{
				MetricSpecification: &autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationArgs{
					CustomizedScalingMetricSpecification: &autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationArgs{
						MetricDataQueries: autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryArray{
							&autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryArgs{
								Id: pulumi.String("scaling"),
								MetricStat: &autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatArgs{
									Metric: &autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatMetricArgs{
										Dimensions: autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatMetricDimensionArray{
											&autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatMetricDimensionArgs{
												Name:  pulumi.String("AutoScalingGroupName"),
												Value: pulumi.String("my-test-asg"),
											},
										},
										MetricName: pulumi.String("CPUUtilization"),
										Namespace:  pulumi.String("AWS/EC2"),
									},
									Stat: pulumi.String("Average"),
								},
							},
						},
					},
					PredefinedLoadMetricSpecification: &autoscaling.PolicyPredictiveScalingConfigurationMetricSpecificationPredefinedLoadMetricSpecificationArgs{
						PredefinedMetricType: pulumi.String("ASGTotalCPUUtilization"),
						ResourceLabel:        pulumi.String("testLabel"),
					},
					TargetValue: pulumi.Int(10),
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
import com.pulumi.aws.autoscaling.Policy;
import com.pulumi.aws.autoscaling.PolicyArgs;
import com.pulumi.aws.autoscaling.inputs.PolicyPredictiveScalingConfigurationArgs;
import com.pulumi.aws.autoscaling.inputs.PolicyPredictiveScalingConfigurationMetricSpecificationArgs;
import com.pulumi.aws.autoscaling.inputs.PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationArgs;
import com.pulumi.aws.autoscaling.inputs.PolicyPredictiveScalingConfigurationMetricSpecificationPredefinedLoadMetricSpecificationArgs;
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
        var example = new Policy("example", PolicyArgs.builder()        
            .autoscalingGroupName("my-test-asg")
            .policyType("PredictiveScaling")
            .predictiveScalingConfiguration(PolicyPredictiveScalingConfigurationArgs.builder()
                .metricSpecification(PolicyPredictiveScalingConfigurationMetricSpecificationArgs.builder()
                    .customizedScalingMetricSpecification(PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationArgs.builder()
                        .metricDataQueries(PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryArgs.builder()
                            .id("scaling")
                            .metricStat(PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatArgs.builder()
                                .metric(PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatMetricArgs.builder()
                                    .dimensions(PolicyPredictiveScalingConfigurationMetricSpecificationCustomizedScalingMetricSpecificationMetricDataQueryMetricStatMetricDimensionArgs.builder()
                                        .name("AutoScalingGroupName")
                                        .value("my-test-asg")
                                        .build())
                                    .metricName("CPUUtilization")
                                    .namespace("AWS/EC2")
                                    .build())
                                .stat("Average")
                                .build())
                            .build())
                        .build())
                    .predefinedLoadMetricSpecification(PolicyPredictiveScalingConfigurationMetricSpecificationPredefinedLoadMetricSpecificationArgs.builder()
                        .predefinedMetricType("ASGTotalCPUUtilization")
                        .resourceLabel("testLabel")
                        .build())
                    .targetValue(10)
                    .build())
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:autoscaling:Policy
    properties:
      autoscalingGroupName: my-test-asg
      policyType: PredictiveScaling
      predictiveScalingConfiguration:
        metricSpecification:
          customizedScalingMetricSpecification:
            metricDataQueries:
              - id: scaling
                metricStat:
                  metric:
                    dimensions:
                      - name: AutoScalingGroupName
                        value: my-test-asg
                    metricName: CPUUtilization
                    namespace: AWS/EC2
                  stat: Average
          predefinedLoadMetricSpecification:
            predefinedMetricType: ASGTotalCPUUtilization
            resourceLabel: testLabel
          targetValue: 10
```
{{% /example %}}
{{% /examples %}}

## Import

AutoScaling scaling policy can be imported using the role autoscaling_group_name and name separated by `/`.

```sh
 $ pulumi import aws:autoscaling/policy:Policy test-policy asg-name/policy-name
```

 
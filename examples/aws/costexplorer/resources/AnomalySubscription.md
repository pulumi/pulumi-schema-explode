Provides a CE Anomaly Subscription.

{{% examples %}}
## Example Usage
{{% example %}}
### Basic Example

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const testAnomalyMonitor = new aws.costexplorer.AnomalyMonitor("testAnomalyMonitor", {
    monitorType: "DIMENSIONAL",
    monitorDimension: "SERVICE",
});
const testAnomalySubscription = new aws.costexplorer.AnomalySubscription("testAnomalySubscription", {
    threshold: 100,
    frequency: "DAILY",
    monitorArnLists: [testAnomalyMonitor.arn],
    subscribers: [{
        type: "EMAIL",
        address: "abc@example.com",
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

test_anomaly_monitor = aws.costexplorer.AnomalyMonitor("testAnomalyMonitor",
    monitor_type="DIMENSIONAL",
    monitor_dimension="SERVICE")
test_anomaly_subscription = aws.costexplorer.AnomalySubscription("testAnomalySubscription",
    threshold=100,
    frequency="DAILY",
    monitor_arn_lists=[test_anomaly_monitor.arn],
    subscribers=[aws.costexplorer.AnomalySubscriptionSubscriberArgs(
        type="EMAIL",
        address="abc@example.com",
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var testAnomalyMonitor = new Aws.CostExplorer.AnomalyMonitor("testAnomalyMonitor", new()
    {
        MonitorType = "DIMENSIONAL",
        MonitorDimension = "SERVICE",
    });

    var testAnomalySubscription = new Aws.CostExplorer.AnomalySubscription("testAnomalySubscription", new()
    {
        Threshold = 100,
        Frequency = "DAILY",
        MonitorArnLists = new[]
        {
            testAnomalyMonitor.Arn,
        },
        Subscribers = new[]
        {
            new Aws.CostExplorer.Inputs.AnomalySubscriptionSubscriberArgs
            {
                Type = "EMAIL",
                Address = "abc@example.com",
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/costexplorer"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		testAnomalyMonitor, err := costexplorer.NewAnomalyMonitor(ctx, "testAnomalyMonitor", &costexplorer.AnomalyMonitorArgs{
			MonitorType:      pulumi.String("DIMENSIONAL"),
			MonitorDimension: pulumi.String("SERVICE"),
		})
		if err != nil {
			return err
		}
		_, err = costexplorer.NewAnomalySubscription(ctx, "testAnomalySubscription", &costexplorer.AnomalySubscriptionArgs{
			Threshold: pulumi.Float64(100),
			Frequency: pulumi.String("DAILY"),
			MonitorArnLists: pulumi.StringArray{
				testAnomalyMonitor.Arn,
			},
			Subscribers: costexplorer.AnomalySubscriptionSubscriberArray{
				&costexplorer.AnomalySubscriptionSubscriberArgs{
					Type:    pulumi.String("EMAIL"),
					Address: pulumi.String("abc@example.com"),
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
import com.pulumi.aws.costexplorer.AnomalyMonitor;
import com.pulumi.aws.costexplorer.AnomalyMonitorArgs;
import com.pulumi.aws.costexplorer.AnomalySubscription;
import com.pulumi.aws.costexplorer.AnomalySubscriptionArgs;
import com.pulumi.aws.costexplorer.inputs.AnomalySubscriptionSubscriberArgs;
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
        var testAnomalyMonitor = new AnomalyMonitor("testAnomalyMonitor", AnomalyMonitorArgs.builder()        
            .monitorType("DIMENSIONAL")
            .monitorDimension("SERVICE")
            .build());

        var testAnomalySubscription = new AnomalySubscription("testAnomalySubscription", AnomalySubscriptionArgs.builder()        
            .threshold(100)
            .frequency("DAILY")
            .monitorArnLists(testAnomalyMonitor.arn())
            .subscribers(AnomalySubscriptionSubscriberArgs.builder()
                .type("EMAIL")
                .address("abc@example.com")
                .build())
            .build());

    }
}
```
```yaml
resources:
  testAnomalyMonitor:
    type: aws:costexplorer:AnomalyMonitor
    properties:
      monitorType: DIMENSIONAL
      monitorDimension: SERVICE
  testAnomalySubscription:
    type: aws:costexplorer:AnomalySubscription
    properties:
      threshold: 100
      frequency: DAILY
      monitorArnLists:
        - ${testAnomalyMonitor.arn}
      subscribers:
        - type: EMAIL
          address: abc@example.com
```
{{% /example %}}
{{% example %}}
### SNS Example

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const costAnomalyUpdates = new aws.sns.Topic("costAnomalyUpdates", {});
const snsTopicPolicy = pulumi.all([costAnomalyUpdates.arn, costAnomalyUpdates.arn]).apply(([costAnomalyUpdatesArn, costAnomalyUpdatesArn1]) => aws.iam.getPolicyDocumentOutput({
    policyId: "__default_policy_ID",
    statements: [
        {
            sid: "AWSAnomalyDetectionSNSPublishingPermissions",
            actions: ["SNS:Publish"],
            effect: "Allow",
            principals: [{
                type: "Service",
                identifiers: ["costalerts.amazonaws.com"],
            }],
            resources: [costAnomalyUpdatesArn],
        },
        {
            sid: "__default_statement_ID",
            actions: [
                "SNS:Subscribe",
                "SNS:SetTopicAttributes",
                "SNS:RemovePermission",
                "SNS:Receive",
                "SNS:Publish",
                "SNS:ListSubscriptionsByTopic",
                "SNS:GetTopicAttributes",
                "SNS:DeleteTopic",
                "SNS:AddPermission",
            ],
            conditions: [{
                test: "StringEquals",
                variable: "AWS:SourceOwner",
                values: [_var["account-id"]],
            }],
            effect: "Allow",
            principals: [{
                type: "AWS",
                identifiers: ["*"],
            }],
            resources: [costAnomalyUpdatesArn1],
        },
    ],
}));
const _default = new aws.sns.TopicPolicy("default", {
    arn: costAnomalyUpdates.arn,
    policy: snsTopicPolicy.apply(snsTopicPolicy => snsTopicPolicy.json),
});
const anomalyMonitor = new aws.costexplorer.AnomalyMonitor("anomalyMonitor", {
    monitorType: "DIMENSIONAL",
    monitorDimension: "SERVICE",
});
const realtimeSubscription = new aws.costexplorer.AnomalySubscription("realtimeSubscription", {
    threshold: 0,
    frequency: "IMMEDIATE",
    monitorArnLists: [anomalyMonitor.arn],
    subscribers: [{
        type: "SNS",
        address: costAnomalyUpdates.arn,
    }],
}, {
    dependsOn: [_default],
});
```
```python
import pulumi
import pulumi_aws as aws

cost_anomaly_updates = aws.sns.Topic("costAnomalyUpdates")
sns_topic_policy = pulumi.Output.all(cost_anomaly_updates.arn, cost_anomaly_updates.arn).apply(lambda costAnomalyUpdatesArn, costAnomalyUpdatesArn1: aws.iam.get_policy_document_output(policy_id="__default_policy_ID",
    statements=[
        aws.iam.GetPolicyDocumentStatementArgs(
            sid="AWSAnomalyDetectionSNSPublishingPermissions",
            actions=["SNS:Publish"],
            effect="Allow",
            principals=[aws.iam.GetPolicyDocumentStatementPrincipalArgs(
                type="Service",
                identifiers=["costalerts.amazonaws.com"],
            )],
            resources=[cost_anomaly_updates_arn],
        ),
        aws.iam.GetPolicyDocumentStatementArgs(
            sid="__default_statement_ID",
            actions=[
                "SNS:Subscribe",
                "SNS:SetTopicAttributes",
                "SNS:RemovePermission",
                "SNS:Receive",
                "SNS:Publish",
                "SNS:ListSubscriptionsByTopic",
                "SNS:GetTopicAttributes",
                "SNS:DeleteTopic",
                "SNS:AddPermission",
            ],
            conditions=[aws.iam.GetPolicyDocumentStatementConditionArgs(
                test="StringEquals",
                variable="AWS:SourceOwner",
                values=[var["account-id"]],
            )],
            effect="Allow",
            principals=[aws.iam.GetPolicyDocumentStatementPrincipalArgs(
                type="AWS",
                identifiers=["*"],
            )],
            resources=[cost_anomaly_updates_arn1],
        ),
    ]))
default = aws.sns.TopicPolicy("default",
    arn=cost_anomaly_updates.arn,
    policy=sns_topic_policy.json)
anomaly_monitor = aws.costexplorer.AnomalyMonitor("anomalyMonitor",
    monitor_type="DIMENSIONAL",
    monitor_dimension="SERVICE")
realtime_subscription = aws.costexplorer.AnomalySubscription("realtimeSubscription",
    threshold=0,
    frequency="IMMEDIATE",
    monitor_arn_lists=[anomaly_monitor.arn],
    subscribers=[aws.costexplorer.AnomalySubscriptionSubscriberArgs(
        type="SNS",
        address=cost_anomaly_updates.arn,
    )],
    opts=pulumi.ResourceOptions(depends_on=[default]))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var costAnomalyUpdates = new Aws.Sns.Topic("costAnomalyUpdates");

    var snsTopicPolicy = Aws.Iam.GetPolicyDocument.Invoke(new()
    {
        PolicyId = "__default_policy_ID",
        Statements = new[]
        {
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Sid = "AWSAnomalyDetectionSNSPublishingPermissions",
                Actions = new[]
                {
                    "SNS:Publish",
                },
                Effect = "Allow",
                Principals = new[]
                {
                    new Aws.Iam.Inputs.GetPolicyDocumentStatementPrincipalInputArgs
                    {
                        Type = "Service",
                        Identifiers = new[]
                        {
                            "costalerts.amazonaws.com",
                        },
                    },
                },
                Resources = new[]
                {
                    costAnomalyUpdates.Arn,
                },
            },
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Sid = "__default_statement_ID",
                Actions = new[]
                {
                    "SNS:Subscribe",
                    "SNS:SetTopicAttributes",
                    "SNS:RemovePermission",
                    "SNS:Receive",
                    "SNS:Publish",
                    "SNS:ListSubscriptionsByTopic",
                    "SNS:GetTopicAttributes",
                    "SNS:DeleteTopic",
                    "SNS:AddPermission",
                },
                Conditions = new[]
                {
                    new Aws.Iam.Inputs.GetPolicyDocumentStatementConditionInputArgs
                    {
                        Test = "StringEquals",
                        Variable = "AWS:SourceOwner",
                        Values = new[]
                        {
                            @var.Account_id,
                        },
                    },
                },
                Effect = "Allow",
                Principals = new[]
                {
                    new Aws.Iam.Inputs.GetPolicyDocumentStatementPrincipalInputArgs
                    {
                        Type = "AWS",
                        Identifiers = new[]
                        {
                            "*",
                        },
                    },
                },
                Resources = new[]
                {
                    costAnomalyUpdates.Arn,
                },
            },
        },
    });

    var @default = new Aws.Sns.TopicPolicy("default", new()
    {
        Arn = costAnomalyUpdates.Arn,
        Policy = snsTopicPolicy.Apply(getPolicyDocumentResult => getPolicyDocumentResult.Json),
    });

    var anomalyMonitor = new Aws.CostExplorer.AnomalyMonitor("anomalyMonitor", new()
    {
        MonitorType = "DIMENSIONAL",
        MonitorDimension = "SERVICE",
    });

    var realtimeSubscription = new Aws.CostExplorer.AnomalySubscription("realtimeSubscription", new()
    {
        Threshold = 0,
        Frequency = "IMMEDIATE",
        MonitorArnLists = new[]
        {
            anomalyMonitor.Arn,
        },
        Subscribers = new[]
        {
            new Aws.CostExplorer.Inputs.AnomalySubscriptionSubscriberArgs
            {
                Type = "SNS",
                Address = costAnomalyUpdates.Arn,
            },
        },
    }, new CustomResourceOptions
    {
        DependsOn = new[]
        {
            @default,
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/costexplorer"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sns"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		costAnomalyUpdates, err := sns.NewTopic(ctx, "costAnomalyUpdates", nil)
		if err != nil {
			return err
		}
		_, err = sns.NewTopicPolicy(ctx, "default", &sns.TopicPolicyArgs{
			Arn: costAnomalyUpdates.Arn,
			Policy: snsTopicPolicy.ApplyT(func(snsTopicPolicy iam.GetPolicyDocumentResult) (string, error) {
				return snsTopicPolicy.Json, nil
			}).(pulumi.StringOutput),
		})
		if err != nil {
			return err
		}
		anomalyMonitor, err := costexplorer.NewAnomalyMonitor(ctx, "anomalyMonitor", &costexplorer.AnomalyMonitorArgs{
			MonitorType:      pulumi.String("DIMENSIONAL"),
			MonitorDimension: pulumi.String("SERVICE"),
		})
		if err != nil {
			return err
		}
		_, err = costexplorer.NewAnomalySubscription(ctx, "realtimeSubscription", &costexplorer.AnomalySubscriptionArgs{
			Threshold: pulumi.Float64(0),
			Frequency: pulumi.String("IMMEDIATE"),
			MonitorArnLists: pulumi.StringArray{
				anomalyMonitor.Arn,
			},
			Subscribers: costexplorer.AnomalySubscriptionSubscriberArray{
				&costexplorer.AnomalySubscriptionSubscriberArgs{
					Type:    pulumi.String("SNS"),
					Address: costAnomalyUpdates.Arn,
				},
			},
		}, pulumi.DependsOn([]pulumi.Resource{
			_default,
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
import com.pulumi.aws.sns.Topic;
import com.pulumi.aws.iam.IamFunctions;
import com.pulumi.aws.iam.inputs.GetPolicyDocumentArgs;
import com.pulumi.aws.sns.TopicPolicy;
import com.pulumi.aws.sns.TopicPolicyArgs;
import com.pulumi.aws.costexplorer.AnomalyMonitor;
import com.pulumi.aws.costexplorer.AnomalyMonitorArgs;
import com.pulumi.aws.costexplorer.AnomalySubscription;
import com.pulumi.aws.costexplorer.AnomalySubscriptionArgs;
import com.pulumi.aws.costexplorer.inputs.AnomalySubscriptionSubscriberArgs;
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
        var costAnomalyUpdates = new Topic("costAnomalyUpdates");

        final var snsTopicPolicy = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .policyId("__default_policy_ID")
            .statements(            
                GetPolicyDocumentStatementArgs.builder()
                    .sid("AWSAnomalyDetectionSNSPublishingPermissions")
                    .actions("SNS:Publish")
                    .effect("Allow")
                    .principals(GetPolicyDocumentStatementPrincipalArgs.builder()
                        .type("Service")
                        .identifiers("costalerts.amazonaws.com")
                        .build())
                    .resources(costAnomalyUpdates.arn())
                    .build(),
                GetPolicyDocumentStatementArgs.builder()
                    .sid("__default_statement_ID")
                    .actions(                    
                        "SNS:Subscribe",
                        "SNS:SetTopicAttributes",
                        "SNS:RemovePermission",
                        "SNS:Receive",
                        "SNS:Publish",
                        "SNS:ListSubscriptionsByTopic",
                        "SNS:GetTopicAttributes",
                        "SNS:DeleteTopic",
                        "SNS:AddPermission")
                    .conditions(GetPolicyDocumentStatementConditionArgs.builder()
                        .test("StringEquals")
                        .variable("AWS:SourceOwner")
                        .values(var_.account-id())
                        .build())
                    .effect("Allow")
                    .principals(GetPolicyDocumentStatementPrincipalArgs.builder()
                        .type("AWS")
                        .identifiers("*")
                        .build())
                    .resources(costAnomalyUpdates.arn())
                    .build())
            .build());

        var default_ = new TopicPolicy("default", TopicPolicyArgs.builder()        
            .arn(costAnomalyUpdates.arn())
            .policy(snsTopicPolicy.applyValue(getPolicyDocumentResult -> getPolicyDocumentResult).applyValue(snsTopicPolicy -> snsTopicPolicy.applyValue(getPolicyDocumentResult -> getPolicyDocumentResult.json())))
            .build());

        var anomalyMonitor = new AnomalyMonitor("anomalyMonitor", AnomalyMonitorArgs.builder()        
            .monitorType("DIMENSIONAL")
            .monitorDimension("SERVICE")
            .build());

        var realtimeSubscription = new AnomalySubscription("realtimeSubscription", AnomalySubscriptionArgs.builder()        
            .threshold(0)
            .frequency("IMMEDIATE")
            .monitorArnLists(anomalyMonitor.arn())
            .subscribers(AnomalySubscriptionSubscriberArgs.builder()
                .type("SNS")
                .address(costAnomalyUpdates.arn())
                .build())
            .build(), CustomResourceOptions.builder()
                .dependsOn(default_)
                .build());

    }
}
```
```yaml
resources:
  costAnomalyUpdates:
    type: aws:sns:Topic
  default:
    type: aws:sns:TopicPolicy
    properties:
      arn: ${costAnomalyUpdates.arn}
      policy: ${snsTopicPolicy.json}
  anomalyMonitor:
    type: aws:costexplorer:AnomalyMonitor
    properties:
      monitorType: DIMENSIONAL
      monitorDimension: SERVICE
  realtimeSubscription:
    type: aws:costexplorer:AnomalySubscription
    properties:
      threshold: 0
      frequency: IMMEDIATE
      monitorArnLists:
        - ${anomalyMonitor.arn}
      subscribers:
        - type: SNS
          address: ${costAnomalyUpdates.arn}
    options:
      dependson:
        - ${default}
variables:
  snsTopicPolicy:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        policyId: __default_policy_ID
        statements:
          - sid: AWSAnomalyDetectionSNSPublishingPermissions
            actions:
              - SNS:Publish
            effect: Allow
            principals:
              - type: Service
                identifiers:
                  - costalerts.amazonaws.com
            resources:
              - ${costAnomalyUpdates.arn}
          - sid: __default_statement_ID
            actions:
              - SNS:Subscribe
              - SNS:SetTopicAttributes
              - SNS:RemovePermission
              - SNS:Receive
              - SNS:Publish
              - SNS:ListSubscriptionsByTopic
              - SNS:GetTopicAttributes
              - SNS:DeleteTopic
              - SNS:AddPermission
            conditions:
              - test: StringEquals
                variable: AWS:SourceOwner
                values:
                  - ${var"account-id"[%!s(MISSING)]}
            effect: Allow
            principals:
              - type: AWS
                identifiers:
                  - '*'
            resources:
              - ${costAnomalyUpdates.arn}
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_ce_anomaly_subscription` can be imported using the `id`, e.g.

```sh
 $ pulumi import aws:costexplorer/anomalySubscription:AnomalySubscription example AnomalySubscriptionARN
```

 
Provides a resource for subscribing to SNS topics. Requires that an SNS topic exist for the subscription to attach to. This resource allows you to automatically place messages sent to SNS topics in SQS queues, send them as HTTP(S) POST requests to a given endpoint, send SMS messages, or notify devices / applications. The most likely use case for provider users will probably be SQS queues.

> **NOTE:** If the SNS topic and SQS queue are in different AWS regions, the `aws.sns.TopicSubscription` must use an AWS provider that is in the same region as the SNS topic. If the `aws.sns.TopicSubscription` uses a provider with a different region than the SNS topic, this provider will fail to create the subscription.

> **NOTE:** Setup of cross-account subscriptions from SNS topics to SQS queues requires the provider to have access to BOTH accounts.

> **NOTE:** If an SNS topic and SQS queue are in different AWS accounts but the same region, the `aws.sns.TopicSubscription` must use the AWS provider for the account with the SQS queue. If `aws.sns.TopicSubscription` uses a Provider with a different account than the SQS queue, this provider creates the subscription but does not keep state and tries to re-create the subscription at every `apply`.

> **NOTE:** If an SNS topic and SQS queue are in different AWS accounts and different AWS regions, the subscription needs to be initiated from the account with the SQS queue but in the region of the SNS topic.

> **NOTE:** You cannot unsubscribe to a subscription that is pending confirmation. If you use `email`, `email-json`, or `http`/`https` (without auto-confirmation enabled), until the subscription is confirmed (e.g., outside of this provider), AWS does not allow this provider to delete / unsubscribe the subscription. If you `destroy` an unconfirmed subscription, this provider will remove the subscription from its state but the subscription will still exist in AWS. However, if you delete an SNS topic, SNS [deletes all the subscriptions](https://docs.aws.amazon.com/sns/latest/dg/sns-delete-subscription-topic.html) associated with the topic. Also, you can import a subscription after confirmation and then have the capability to delete it.

{{% examples %}}
## Example Usage
{{% example %}}

You can directly supply a topic and ARN by hand in the `topic_arn` property along with the queue ARN:

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const userUpdatesSqsTarget = new aws.sns.TopicSubscription("user_updates_sqs_target", {
    endpoint: "arn:aws:sqs:us-west-2:432981146916:queue-too",
    protocol: "sqs",
    topic: "arn:aws:sns:us-west-2:432981146916:user-updates-topic",
});
```
```python
import pulumi
import pulumi_aws as aws

user_updates_sqs_target = aws.sns.TopicSubscription("userUpdatesSqsTarget",
    endpoint="arn:aws:sqs:us-west-2:432981146916:queue-too",
    protocol="sqs",
    topic="arn:aws:sns:us-west-2:432981146916:user-updates-topic")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var userUpdatesSqsTarget = new Aws.Sns.TopicSubscription("userUpdatesSqsTarget", new()
    {
        Endpoint = "arn:aws:sqs:us-west-2:432981146916:queue-too",
        Protocol = "sqs",
        Topic = "arn:aws:sns:us-west-2:432981146916:user-updates-topic",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sns"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := sns.NewTopicSubscription(ctx, "userUpdatesSqsTarget", &sns.TopicSubscriptionArgs{
			Endpoint: pulumi.String("arn:aws:sqs:us-west-2:432981146916:queue-too"),
			Protocol: pulumi.String("sqs"),
			Topic:    pulumi.Any("arn:aws:sns:us-west-2:432981146916:user-updates-topic"),
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
import com.pulumi.aws.sns.TopicSubscription;
import com.pulumi.aws.sns.TopicSubscriptionArgs;
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
        var userUpdatesSqsTarget = new TopicSubscription("userUpdatesSqsTarget", TopicSubscriptionArgs.builder()        
            .endpoint("arn:aws:sqs:us-west-2:432981146916:queue-too")
            .protocol("sqs")
            .topic("arn:aws:sns:us-west-2:432981146916:user-updates-topic")
            .build());

    }
}
```
```yaml
resources:
  userUpdatesSqsTarget:
    type: aws:sns:TopicSubscription
    properties:
      endpoint: arn:aws:sqs:us-west-2:432981146916:queue-too
      protocol: sqs
      topic: arn:aws:sns:us-west-2:432981146916:user-updates-topic
```

Alternatively you can use the ARN properties of a managed SNS topic and SQS queue:

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const userUpdates = new aws.sns.Topic("userUpdates", {});
const userUpdatesQueue = new aws.sqs.Queue("userUpdatesQueue", {});
const userUpdatesSqsTarget = new aws.sns.TopicSubscription("userUpdatesSqsTarget", {
    topic: userUpdates.arn,
    protocol: "sqs",
    endpoint: userUpdatesQueue.arn,
});
```
```python
import pulumi
import pulumi_aws as aws

user_updates = aws.sns.Topic("userUpdates")
user_updates_queue = aws.sqs.Queue("userUpdatesQueue")
user_updates_sqs_target = aws.sns.TopicSubscription("userUpdatesSqsTarget",
    topic=user_updates.arn,
    protocol="sqs",
    endpoint=user_updates_queue.arn)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var userUpdates = new Aws.Sns.Topic("userUpdates");

    var userUpdatesQueue = new Aws.Sqs.Queue("userUpdatesQueue");

    var userUpdatesSqsTarget = new Aws.Sns.TopicSubscription("userUpdatesSqsTarget", new()
    {
        Topic = userUpdates.Arn,
        Protocol = "sqs",
        Endpoint = userUpdatesQueue.Arn,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sns"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sqs"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		userUpdates, err := sns.NewTopic(ctx, "userUpdates", nil)
		if err != nil {
			return err
		}
		userUpdatesQueue, err := sqs.NewQueue(ctx, "userUpdatesQueue", nil)
		if err != nil {
			return err
		}
		_, err = sns.NewTopicSubscription(ctx, "userUpdatesSqsTarget", &sns.TopicSubscriptionArgs{
			Topic:    userUpdates.Arn,
			Protocol: pulumi.String("sqs"),
			Endpoint: userUpdatesQueue.Arn,
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
import com.pulumi.aws.sns.Topic;
import com.pulumi.aws.sqs.Queue;
import com.pulumi.aws.sns.TopicSubscription;
import com.pulumi.aws.sns.TopicSubscriptionArgs;
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
        var userUpdates = new Topic("userUpdates");

        var userUpdatesQueue = new Queue("userUpdatesQueue");

        var userUpdatesSqsTarget = new TopicSubscription("userUpdatesSqsTarget", TopicSubscriptionArgs.builder()        
            .topic(userUpdates.arn())
            .protocol("sqs")
            .endpoint(userUpdatesQueue.arn())
            .build());

    }
}
```
```yaml
resources:
  userUpdates:
    type: aws:sns:Topic
  userUpdatesQueue:
    type: aws:sqs:Queue
  userUpdatesSqsTarget:
    type: aws:sns:TopicSubscription
    properties:
      topic: ${userUpdates.arn}
      protocol: sqs
      endpoint: ${userUpdatesQueue.arn}
```

You can subscribe SNS topics to SQS queues in different Amazon accounts and regions:

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const config = new pulumi.Config();
const sns = config.getObject("sns") || {
    "account-id": "111111111111",
    "role-name": "service/service",
    name: "example-sns-topic",
    display_name: "example",
    region: "us-west-1",
};
const sqs = config.getObject("sqs") || {
    "account-id": "222222222222",
    "role-name": "service/service",
    name: "example-sqs-queue",
    region: "us-east-1",
};
const sns-topic-policy = aws.iam.getPolicyDocument({
    policyId: "__default_policy_ID",
    statements: [
        {
            actions: [
                "SNS:Subscribe",
                "SNS:SetTopicAttributes",
                "SNS:RemovePermission",
                "SNS:Publish",
                "SNS:ListSubscriptionsByTopic",
                "SNS:GetTopicAttributes",
                "SNS:DeleteTopic",
                "SNS:AddPermission",
            ],
            conditions: [{
                test: "StringEquals",
                variable: "AWS:SourceOwner",
                values: [sns["account-id"]],
            }],
            effect: "Allow",
            principals: [{
                type: "AWS",
                identifiers: ["*"],
            }],
            resources: [`arn:aws:sns:${sns.region}:${sns["account-id"]}:${sns.name}`],
            sid: "__default_statement_ID",
        },
        {
            actions: [
                "SNS:Subscribe",
                "SNS:Receive",
            ],
            conditions: [{
                test: "StringLike",
                variable: "SNS:Endpoint",
                values: [`arn:aws:sqs:${sqs.region}:${sqs["account-id"]}:${sqs.name}`],
            }],
            effect: "Allow",
            principals: [{
                type: "AWS",
                identifiers: ["*"],
            }],
            resources: [`arn:aws:sns:${sns.region}:${sns["account-id"]}:${sns.name}`],
            sid: "__console_sub_0",
        },
    ],
});
const sqs-queue-policy = aws.iam.getPolicyDocument({
    policyId: `arn:aws:sqs:${sqs.region}:${sqs["account-id"]}:${sqs.name}/SQSDefaultPolicy`,
    statements: [{
        sid: "example-sns-topic",
        effect: "Allow",
        principals: [{
            type: "AWS",
            identifiers: ["*"],
        }],
        actions: ["SQS:SendMessage"],
        resources: [`arn:aws:sqs:${sqs.region}:${sqs["account-id"]}:${sqs.name}`],
        conditions: [{
            test: "ArnEquals",
            variable: "aws:SourceArn",
            values: [`arn:aws:sns:${sns.region}:${sns["account-id"]}:${sns.name}`],
        }],
    }],
});
// provider to manage SNS topics
const awsSns = new aws.Provider("awsSns", {
    region: sns.region,
    assumeRole: {
        roleArn: `arn:aws:iam::${sns["account-id"]}:role/${sns["role-name"]}`,
        sessionName: `sns-${sns.region}`,
    },
});
// provider to manage SQS queues
const awsSqs = new aws.Provider("awsSqs", {
    region: sqs.region,
    assumeRole: {
        roleArn: `arn:aws:iam::${sqs["account-id"]}:role/${sqs["role-name"]}`,
        sessionName: `sqs-${sqs.region}`,
    },
});
// provider to subscribe SQS to SNS (using the SQS account but the SNS region)
const sns2sqs = new aws.Provider("sns2sqs", {
    region: sns.region,
    assumeRole: {
        roleArn: `arn:aws:iam::${sqs["account-id"]}:role/${sqs["role-name"]}`,
        sessionName: `sns2sqs-${sns.region}`,
    },
});
const sns_topicTopic = new aws.sns.Topic("sns-topicTopic", {
    displayName: sns.display_name,
    policy: sns_topic_policy.then(sns_topic_policy => sns_topic_policy.json),
}, {
    provider: "aws.sns",
});
const sqs_queue = new aws.sqs.Queue("sqs-queue", {policy: sqs_queue_policy.then(sqs_queue_policy => sqs_queue_policy.json)}, {
    provider: "aws.sqs",
});
const sns_topicTopicSubscription = new aws.sns.TopicSubscription("sns-topicTopicSubscription", {
    topic: sns_topicTopic.arn,
    protocol: "sqs",
    endpoint: sqs_queue.arn,
}, {
    provider: "aws.sns2sqs",
});
```
```python
import pulumi
import pulumi_aws as aws

config = pulumi.Config()
sns = config.get_object("sns")
if sns is None:
    sns = {
        "account-id": "111111111111",
        "role-name": "service/service",
        "name": "example-sns-topic",
        "display_name": "example",
        "region": "us-west-1",
    }
sqs = config.get_object("sqs")
if sqs is None:
    sqs = {
        "account-id": "222222222222",
        "role-name": "service/service",
        "name": "example-sqs-queue",
        "region": "us-east-1",
    }
sns_topic_policy = aws.iam.get_policy_document(policy_id="__default_policy_ID",
    statements=[
        aws.iam.GetPolicyDocumentStatementArgs(
            actions=[
                "SNS:Subscribe",
                "SNS:SetTopicAttributes",
                "SNS:RemovePermission",
                "SNS:Publish",
                "SNS:ListSubscriptionsByTopic",
                "SNS:GetTopicAttributes",
                "SNS:DeleteTopic",
                "SNS:AddPermission",
            ],
            conditions=[aws.iam.GetPolicyDocumentStatementConditionArgs(
                test="StringEquals",
                variable="AWS:SourceOwner",
                values=[sns["account-id"]],
            )],
            effect="Allow",
            principals=[aws.iam.GetPolicyDocumentStatementPrincipalArgs(
                type="AWS",
                identifiers=["*"],
            )],
            resources=[f"arn:aws:sns:{sns['region']}:{sns['account-id']}:{sns['name']}"],
            sid="__default_statement_ID",
        ),
        aws.iam.GetPolicyDocumentStatementArgs(
            actions=[
                "SNS:Subscribe",
                "SNS:Receive",
            ],
            conditions=[aws.iam.GetPolicyDocumentStatementConditionArgs(
                test="StringLike",
                variable="SNS:Endpoint",
                values=[f"arn:aws:sqs:{sqs['region']}:{sqs['account-id']}:{sqs['name']}"],
            )],
            effect="Allow",
            principals=[aws.iam.GetPolicyDocumentStatementPrincipalArgs(
                type="AWS",
                identifiers=["*"],
            )],
            resources=[f"arn:aws:sns:{sns['region']}:{sns['account-id']}:{sns['name']}"],
            sid="__console_sub_0",
        ),
    ])
sqs_queue_policy = aws.iam.get_policy_document(policy_id=f"arn:aws:sqs:{sqs['region']}:{sqs['account-id']}:{sqs['name']}/SQSDefaultPolicy",
    statements=[aws.iam.GetPolicyDocumentStatementArgs(
        sid="example-sns-topic",
        effect="Allow",
        principals=[aws.iam.GetPolicyDocumentStatementPrincipalArgs(
            type="AWS",
            identifiers=["*"],
        )],
        actions=["SQS:SendMessage"],
        resources=[f"arn:aws:sqs:{sqs['region']}:{sqs['account-id']}:{sqs['name']}"],
        conditions=[aws.iam.GetPolicyDocumentStatementConditionArgs(
            test="ArnEquals",
            variable="aws:SourceArn",
            values=[f"arn:aws:sns:{sns['region']}:{sns['account-id']}:{sns['name']}"],
        )],
    )])
# provider to manage SNS topics
aws_sns = aws.Provider("awsSns",
    region=sns["region"],
    assume_role=aws.ProviderAssumeRoleArgs(
        role_arn=f"arn:aws:iam::{sns['account-id']}:role/{sns['role-name']}",
        session_name=f"sns-{sns['region']}",
    ))
# provider to manage SQS queues
aws_sqs = aws.Provider("awsSqs",
    region=sqs["region"],
    assume_role=aws.ProviderAssumeRoleArgs(
        role_arn=f"arn:aws:iam::{sqs['account-id']}:role/{sqs['role-name']}",
        session_name=f"sqs-{sqs['region']}",
    ))
# provider to subscribe SQS to SNS (using the SQS account but the SNS region)
sns2sqs = aws.Provider("sns2sqs",
    region=sns["region"],
    assume_role=aws.ProviderAssumeRoleArgs(
        role_arn=f"arn:aws:iam::{sqs['account-id']}:role/{sqs['role-name']}",
        session_name=f"sns2sqs-{sns['region']}",
    ))
sns_topic_topic = aws.sns.Topic("sns-topicTopic",
    display_name=sns["display_name"],
    policy=sns_topic_policy.json,
    opts=pulumi.ResourceOptions(provider="aws.sns"))
sqs_queue = aws.sqs.Queue("sqs-queue", policy=sqs_queue_policy.json,
opts=pulumi.ResourceOptions(provider="aws.sqs"))
sns_topic_topic_subscription = aws.sns.TopicSubscription("sns-topicTopicSubscription",
    topic=sns_topic_topic.arn,
    protocol="sqs",
    endpoint=sqs_queue.arn,
    opts=pulumi.ResourceOptions(provider="aws.sns2sqs"))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var config = new Config();
    var sns = config.GetObject<dynamic>("sns") ?? 
    {
        { "account-id", "111111111111" },
        { "role-name", "service/service" },
        { "name", "example-sns-topic" },
        { "display_name", "example" },
        { "region", "us-west-1" },
    };
    var sqs = config.GetObject<dynamic>("sqs") ?? 
    {
        { "account-id", "222222222222" },
        { "role-name", "service/service" },
        { "name", "example-sqs-queue" },
        { "region", "us-east-1" },
    };
    var sns_topic_policy = Aws.Iam.GetPolicyDocument.Invoke(new()
    {
        PolicyId = "__default_policy_ID",
        Statements = new[]
        {
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Actions = new[]
                {
                    "SNS:Subscribe",
                    "SNS:SetTopicAttributes",
                    "SNS:RemovePermission",
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
                            sns.Account_id,
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
                    $"arn:aws:sns:{sns.Region}:{sns.Account_id}:{sns.Name}",
                },
                Sid = "__default_statement_ID",
            },
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Actions = new[]
                {
                    "SNS:Subscribe",
                    "SNS:Receive",
                },
                Conditions = new[]
                {
                    new Aws.Iam.Inputs.GetPolicyDocumentStatementConditionInputArgs
                    {
                        Test = "StringLike",
                        Variable = "SNS:Endpoint",
                        Values = new[]
                        {
                            $"arn:aws:sqs:{sqs.Region}:{sqs.Account_id}:{sqs.Name}",
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
                    $"arn:aws:sns:{sns.Region}:{sns.Account_id}:{sns.Name}",
                },
                Sid = "__console_sub_0",
            },
        },
    });

    var sqs_queue_policy = Aws.Iam.GetPolicyDocument.Invoke(new()
    {
        PolicyId = $"arn:aws:sqs:{sqs.Region}:{sqs.Account_id}:{sqs.Name}/SQSDefaultPolicy",
        Statements = new[]
        {
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Sid = "example-sns-topic",
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
                Actions = new[]
                {
                    "SQS:SendMessage",
                },
                Resources = new[]
                {
                    $"arn:aws:sqs:{sqs.Region}:{sqs.Account_id}:{sqs.Name}",
                },
                Conditions = new[]
                {
                    new Aws.Iam.Inputs.GetPolicyDocumentStatementConditionInputArgs
                    {
                        Test = "ArnEquals",
                        Variable = "aws:SourceArn",
                        Values = new[]
                        {
                            $"arn:aws:sns:{sns.Region}:{sns.Account_id}:{sns.Name}",
                        },
                    },
                },
            },
        },
    });

    // provider to manage SNS topics
    var awsSns = new Aws.Provider("awsSns", new()
    {
        Region = sns.Region,
        AssumeRole = new Aws.Inputs.ProviderAssumeRoleArgs
        {
            RoleArn = $"arn:aws:iam::{sns.Account_id}:role/{sns.Role_name}",
            SessionName = $"sns-{sns.Region}",
        },
    });

    // provider to manage SQS queues
    var awsSqs = new Aws.Provider("awsSqs", new()
    {
        Region = sqs.Region,
        AssumeRole = new Aws.Inputs.ProviderAssumeRoleArgs
        {
            RoleArn = $"arn:aws:iam::{sqs.Account_id}:role/{sqs.Role_name}",
            SessionName = $"sqs-{sqs.Region}",
        },
    });

    // provider to subscribe SQS to SNS (using the SQS account but the SNS region)
    var sns2sqs = new Aws.Provider("sns2sqs", new()
    {
        Region = sns.Region,
        AssumeRole = new Aws.Inputs.ProviderAssumeRoleArgs
        {
            RoleArn = $"arn:aws:iam::{sqs.Account_id}:role/{sqs.Role_name}",
            SessionName = $"sns2sqs-{sns.Region}",
        },
    });

    var sns_topicTopic = new Aws.Sns.Topic("sns-topicTopic", new()
    {
        DisplayName = sns.Display_name,
        Policy = sns_topic_policy.Apply(getPolicyDocumentResult => getPolicyDocumentResult).Apply(sns_topic_policy => sns_topic_policy.Apply(getPolicyDocumentResult => getPolicyDocumentResult.Json)),
    }, new CustomResourceOptions
    {
        Provider = "aws.sns",
    });

    var sqs_queue = new Aws.Sqs.Queue("sqs-queue", new()
    {
        Policy = sqs_queue_policy.Apply(getPolicyDocumentResult => getPolicyDocumentResult).Apply(sqs_queue_policy => sqs_queue_policy.Apply(getPolicyDocumentResult => getPolicyDocumentResult.Json)),
    }, new CustomResourceOptions
    {
        Provider = "aws.sqs",
    });

    var sns_topicTopicSubscription = new Aws.Sns.TopicSubscription("sns-topicTopicSubscription", new()
    {
        Topic = sns_topicTopic.Arn,
        Protocol = "sqs",
        Endpoint = sqs_queue.Arn,
    }, new CustomResourceOptions
    {
        Provider = "aws.sns2sqs",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sns"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sqs"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi/config"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		cfg := config.New(ctx, "")
		sns := map[string]interface{}{
			"account-id":   "111111111111",
			"role-name":    "service/service",
			"name":         "example-sns-topic",
			"display_name": "example",
			"region":       "us-west-1",
		}
		if param := cfg.GetBool("sns"); param != nil {
			sns = param
		}
		sqs := map[string]interface{}{
			"account-id": "222222222222",
			"role-name":  "service/service",
			"name":       "example-sqs-queue",
			"region":     "us-east-1",
		}
		if param := cfg.GetBool("sqs"); param != nil {
			sqs = param
		}
		sns_topic_policy, err := iam.GetPolicyDocument(ctx, &iam.GetPolicyDocumentArgs{
			PolicyId: pulumi.StringRef("__default_policy_ID"),
			Statements: []iam.GetPolicyDocumentStatement{
				iam.GetPolicyDocumentStatement{
					Actions: []string{
						"SNS:Subscribe",
						"SNS:SetTopicAttributes",
						"SNS:RemovePermission",
						"SNS:Publish",
						"SNS:ListSubscriptionsByTopic",
						"SNS:GetTopicAttributes",
						"SNS:DeleteTopic",
						"SNS:AddPermission",
					},
					Conditions: []iam.GetPolicyDocumentStatementCondition{
						iam.GetPolicyDocumentStatementCondition{
							Test:     "StringEquals",
							Variable: "AWS:SourceOwner",
							Values: []string{
								sns.Account - id,
							},
						},
					},
					Effect: pulumi.StringRef("Allow"),
					Principals: []iam.GetPolicyDocumentStatementPrincipal{
						iam.GetPolicyDocumentStatementPrincipal{
							Type: "AWS",
							Identifiers: []string{
								"*",
							},
						},
					},
					Resources: []string{
						fmt.Sprintf("arn:aws:sns:%v:%v:%v", sns.Region, sns.Account-id, sns.Name),
					},
					Sid: pulumi.StringRef("__default_statement_ID"),
				},
				iam.GetPolicyDocumentStatement{
					Actions: []string{
						"SNS:Subscribe",
						"SNS:Receive",
					},
					Conditions: []iam.GetPolicyDocumentStatementCondition{
						iam.GetPolicyDocumentStatementCondition{
							Test:     "StringLike",
							Variable: "SNS:Endpoint",
							Values: []string{
								fmt.Sprintf("arn:aws:sqs:%v:%v:%v", sqs.Region, sqs.Account-id, sqs.Name),
							},
						},
					},
					Effect: pulumi.StringRef("Allow"),
					Principals: []iam.GetPolicyDocumentStatementPrincipal{
						iam.GetPolicyDocumentStatementPrincipal{
							Type: "AWS",
							Identifiers: []string{
								"*",
							},
						},
					},
					Resources: []string{
						fmt.Sprintf("arn:aws:sns:%v:%v:%v", sns.Region, sns.Account-id, sns.Name),
					},
					Sid: pulumi.StringRef("__console_sub_0"),
				},
			},
		}, nil)
		if err != nil {
			return err
		}
		sqs_queue_policy, err := iam.GetPolicyDocument(ctx, &iam.GetPolicyDocumentArgs{
			PolicyId: pulumi.StringRef(fmt.Sprintf("arn:aws:sqs:%v:%v:%v/SQSDefaultPolicy", sqs.Region, sqs.Account-id, sqs.Name)),
			Statements: []iam.GetPolicyDocumentStatement{
				iam.GetPolicyDocumentStatement{
					Sid:    pulumi.StringRef("example-sns-topic"),
					Effect: pulumi.StringRef("Allow"),
					Principals: []iam.GetPolicyDocumentStatementPrincipal{
						iam.GetPolicyDocumentStatementPrincipal{
							Type: "AWS",
							Identifiers: []string{
								"*",
							},
						},
					},
					Actions: []string{
						"SQS:SendMessage",
					},
					Resources: []string{
						fmt.Sprintf("arn:aws:sqs:%v:%v:%v", sqs.Region, sqs.Account-id, sqs.Name),
					},
					Conditions: []iam.GetPolicyDocumentStatementCondition{
						iam.GetPolicyDocumentStatementCondition{
							Test:     "ArnEquals",
							Variable: "aws:SourceArn",
							Values: []string{
								fmt.Sprintf("arn:aws:sns:%v:%v:%v", sns.Region, sns.Account-id, sns.Name),
							},
						},
					},
				},
			},
		}, nil)
		if err != nil {
			return err
		}
		_, err = aws.NewProvider(ctx, "awsSns", &aws.ProviderArgs{
			Region: pulumi.String(sns.Region),
			AssumeRole: &ProviderAssumeRoleArgs{
				RoleArn:     pulumi.String(fmt.Sprintf("arn:aws:iam::%v:role/%v", sns.Account-id, sns.Role-name)),
				SessionName: pulumi.String(fmt.Sprintf("sns-%v", sns.Region)),
			},
		})
		if err != nil {
			return err
		}
		_, err = aws.NewProvider(ctx, "awsSqs", &aws.ProviderArgs{
			Region: pulumi.String(sqs.Region),
			AssumeRole: &ProviderAssumeRoleArgs{
				RoleArn:     pulumi.String(fmt.Sprintf("arn:aws:iam::%v:role/%v", sqs.Account-id, sqs.Role-name)),
				SessionName: pulumi.String(fmt.Sprintf("sqs-%v", sqs.Region)),
			},
		})
		if err != nil {
			return err
		}
		_, err = aws.NewProvider(ctx, "sns2sqs", &aws.ProviderArgs{
			Region: pulumi.String(sns.Region),
			AssumeRole: &ProviderAssumeRoleArgs{
				RoleArn:     pulumi.String(fmt.Sprintf("arn:aws:iam::%v:role/%v", sqs.Account-id, sqs.Role-name)),
				SessionName: pulumi.String(fmt.Sprintf("sns2sqs-%v", sns.Region)),
			},
		})
		if err != nil {
			return err
		}
		_, err = sns.NewTopic(ctx, "sns-topicTopic", &sns.TopicArgs{
			DisplayName: pulumi.String(sns.Display_name),
			Policy:      pulumi.String(sns_topic_policy.Json),
		}, pulumi.Provider("aws.sns"))
		if err != nil {
			return err
		}
		_, err = sqs.NewQueue(ctx, "sqs-queue", &sqs.QueueArgs{
			Policy: pulumi.String(sqs_queue_policy.Json),
		}, pulumi.Provider("aws.sqs"))
		if err != nil {
			return err
		}
		_, err = sns.NewTopicSubscription(ctx, "sns-topicTopicSubscription", &sns.TopicSubscriptionArgs{
			Topic:    sns_topicTopic.Arn,
			Protocol: pulumi.String("sqs"),
			Endpoint: sqs_queue.Arn,
		}, pulumi.Provider("aws.sns2sqs"))
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
import com.pulumi.aws.iam.IamFunctions;
import com.pulumi.aws.iam.inputs.GetPolicyDocumentArgs;
import com.pulumi.aws.Provider;
import com.pulumi.aws.ProviderArgs;
import com.pulumi.aws.inputs.ProviderAssumeRoleArgs;
import com.pulumi.aws.sns.Topic;
import com.pulumi.aws.sns.TopicArgs;
import com.pulumi.aws.sqs.Queue;
import com.pulumi.aws.sqs.QueueArgs;
import com.pulumi.aws.sns.TopicSubscription;
import com.pulumi.aws.sns.TopicSubscriptionArgs;
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
        final var config = ctx.config();
        final var sns = config.get("sns").orElse(%!v(PANIC=Format method: runtime error: invalid memory address or nil pointer dereference));
        final var sqs = config.get("sqs").orElse(%!v(PANIC=Format method: runtime error: invalid memory address or nil pointer dereference));
        final var sns-topic-policy = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .policyId("__default_policy_ID")
            .statements(            
                GetPolicyDocumentStatementArgs.builder()
                    .actions(                    
                        "SNS:Subscribe",
                        "SNS:SetTopicAttributes",
                        "SNS:RemovePermission",
                        "SNS:Publish",
                        "SNS:ListSubscriptionsByTopic",
                        "SNS:GetTopicAttributes",
                        "SNS:DeleteTopic",
                        "SNS:AddPermission")
                    .conditions(GetPolicyDocumentStatementConditionArgs.builder()
                        .test("StringEquals")
                        .variable("AWS:SourceOwner")
                        .values(sns.account-id())
                        .build())
                    .effect("Allow")
                    .principals(GetPolicyDocumentStatementPrincipalArgs.builder()
                        .type("AWS")
                        .identifiers("*")
                        .build())
                    .resources(String.format("arn:aws:sns:%s:%s:%s", sns.region(),sns.account-id(),sns.name()))
                    .sid("__default_statement_ID")
                    .build(),
                GetPolicyDocumentStatementArgs.builder()
                    .actions(                    
                        "SNS:Subscribe",
                        "SNS:Receive")
                    .conditions(GetPolicyDocumentStatementConditionArgs.builder()
                        .test("StringLike")
                        .variable("SNS:Endpoint")
                        .values(String.format("arn:aws:sqs:%s:%s:%s", sqs.region(),sqs.account-id(),sqs.name()))
                        .build())
                    .effect("Allow")
                    .principals(GetPolicyDocumentStatementPrincipalArgs.builder()
                        .type("AWS")
                        .identifiers("*")
                        .build())
                    .resources(String.format("arn:aws:sns:%s:%s:%s", sns.region(),sns.account-id(),sns.name()))
                    .sid("__console_sub_0")
                    .build())
            .build());

        final var sqs-queue-policy = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .policyId(String.format("arn:aws:sqs:%s:%s:%s/SQSDefaultPolicy", sqs.region(),sqs.account-id(),sqs.name()))
            .statements(GetPolicyDocumentStatementArgs.builder()
                .sid("example-sns-topic")
                .effect("Allow")
                .principals(GetPolicyDocumentStatementPrincipalArgs.builder()
                    .type("AWS")
                    .identifiers("*")
                    .build())
                .actions("SQS:SendMessage")
                .resources(String.format("arn:aws:sqs:%s:%s:%s", sqs.region(),sqs.account-id(),sqs.name()))
                .conditions(GetPolicyDocumentStatementConditionArgs.builder()
                    .test("ArnEquals")
                    .variable("aws:SourceArn")
                    .values(String.format("arn:aws:sns:%s:%s:%s", sns.region(),sns.account-id(),sns.name()))
                    .build())
                .build())
            .build());

        var awsSns = new Provider("awsSns", ProviderArgs.builder()        
            .region(sns.region())
            .assumeRole(ProviderAssumeRoleArgs.builder()
                .roleArn(String.format("arn:aws:iam::%s:role/%s", sns.account-id(),sns.role-name()))
                .sessionName(String.format("sns-%s", sns.region()))
                .build())
            .build());

        var awsSqs = new Provider("awsSqs", ProviderArgs.builder()        
            .region(sqs.region())
            .assumeRole(ProviderAssumeRoleArgs.builder()
                .roleArn(String.format("arn:aws:iam::%s:role/%s", sqs.account-id(),sqs.role-name()))
                .sessionName(String.format("sqs-%s", sqs.region()))
                .build())
            .build());

        var sns2sqs = new Provider("sns2sqs", ProviderArgs.builder()        
            .region(sns.region())
            .assumeRole(ProviderAssumeRoleArgs.builder()
                .roleArn(String.format("arn:aws:iam::%s:role/%s", sqs.account-id(),sqs.role-name()))
                .sessionName(String.format("sns2sqs-%s", sns.region()))
                .build())
            .build());

        var sns_topicTopic = new Topic("sns-topicTopic", TopicArgs.builder()        
            .displayName(sns.display_name())
            .policy(sns_topic_policy.json())
            .build(), CustomResourceOptions.builder()
                .provider("aws.sns")
                .build());

        var sqs_queue = new Queue("sqs-queue", QueueArgs.builder()        
            .policy(sqs_queue_policy.json())
            .build(), CustomResourceOptions.builder()
                .provider("aws.sqs")
                .build());

        var sns_topicTopicSubscription = new TopicSubscription("sns-topicTopicSubscription", TopicSubscriptionArgs.builder()        
            .topic(sns_topicTopic.arn())
            .protocol("sqs")
            .endpoint(sqs_queue.arn())
            .build(), CustomResourceOptions.builder()
                .provider("aws.sns2sqs")
                .build());

    }
}
```
```yaml
configuration:
  sns:
    type: object({account-id = string, display_name = string, name = string, region = string, role-name = string})
    default:
      account-id: 111111111111
      role-name: service/service
      name: example-sns-topic
      display_name: example
      region: us-west-1
  sqs:
    type: object({account-id = string, name = string, region = string, role-name = string})
    default:
      account-id: 222222222222
      role-name: service/service
      name: example-sqs-queue
      region: us-east-1
resources:
  # provider to manage SNS topics
  awsSns:
    type: pulumi:providers:aws
    properties:
      region: ${sns.region}
      assumeRole:
        roleArn: arn:aws:iam::${sns"account-id"[%!s(MISSING)]}:role/${sns"role-name"[%!s(MISSING)]}
        sessionName: sns-${sns.region}
  # provider to manage SQS queues
  awsSqs:
    type: pulumi:providers:aws
    properties:
      region: ${sqs.region}
      assumeRole:
        roleArn: arn:aws:iam::${sqs"account-id"[%!s(MISSING)]}:role/${sqs"role-name"[%!s(MISSING)]}
        sessionName: sqs-${sqs.region}
  # provider to subscribe SQS to SNS (using the SQS account but the SNS region)
  sns2sqs:
    type: pulumi:providers:aws
    properties:
      region: ${sns.region}
      assumeRole:
        roleArn: arn:aws:iam::${sqs"account-id"[%!s(MISSING)]}:role/${sqs"role-name"[%!s(MISSING)]}
        sessionName: sns2sqs-${sns.region}
  sns-topicTopic:
    type: aws:sns:Topic
    properties:
      displayName: ${sns.display_name}
      policy: ${["sns-topic-policy"].json}
    options:
      provider: aws.sns
  sqs-queue:
    type: aws:sqs:Queue
    properties:
      policy: ${["sqs-queue-policy"].json}
    options:
      provider: aws.sqs
  sns-topicTopicSubscription:
    type: aws:sns:TopicSubscription
    properties:
      topic: ${["sns-topicTopic"].arn}
      protocol: sqs
      endpoint: ${["sqs-queue"].arn}
    options:
      provider: aws.sns2sqs
variables:
  sns-topic-policy:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        policyId: __default_policy_ID
        statements:
          - actions:
              - SNS:Subscribe
              - SNS:SetTopicAttributes
              - SNS:RemovePermission
              - SNS:Publish
              - SNS:ListSubscriptionsByTopic
              - SNS:GetTopicAttributes
              - SNS:DeleteTopic
              - SNS:AddPermission
            conditions:
              - test: StringEquals
                variable: AWS:SourceOwner
                values:
                  - ${sns"account-id"[%!s(MISSING)]}
            effect: Allow
            principals:
              - type: AWS
                identifiers:
                  - '*'
            resources:
              - arn:aws:sns:${sns.region}:${sns"account-id"[%!s(MISSING)]}:${sns.name}
            sid: __default_statement_ID
          - actions:
              - SNS:Subscribe
              - SNS:Receive
            conditions:
              - test: StringLike
                variable: SNS:Endpoint
                values:
                  - arn:aws:sqs:${sqs.region}:${sqs"account-id"[%!s(MISSING)]}:${sqs.name}
            effect: Allow
            principals:
              - type: AWS
                identifiers:
                  - '*'
            resources:
              - arn:aws:sns:${sns.region}:${sns"account-id"[%!s(MISSING)]}:${sns.name}
            sid: __console_sub_0
  sqs-queue-policy:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        policyId: arn:aws:sqs:${sqs.region}:${sqs"account-id"[%!s(MISSING)]}:${sqs.name}/SQSDefaultPolicy
        statements:
          - sid: example-sns-topic
            effect: Allow
            principals:
              - type: AWS
                identifiers:
                  - '*'
            actions:
              - SQS:SendMessage
            resources:
              - arn:aws:sqs:${sqs.region}:${sqs"account-id"[%!s(MISSING)]}:${sqs.name}
            conditions:
              - test: ArnEquals
                variable: aws:SourceArn
                values:
                  - arn:aws:sns:${sns.region}:${sns"account-id"[%!s(MISSING)]}:${sns.name}
```
{{% /example %}}
{{% /examples %}}

## Import

SNS Topic Subscriptions can be imported using the `subscription arn`, e.g.,

```sh
 $ pulumi import aws:sns/topicSubscription:TopicSubscription user_updates_sqs_target arn:aws:sns:us-west-2:0123456789012:my-topic:8a21d249-4329-4871-acc6-7be709c6ea7f
```

 
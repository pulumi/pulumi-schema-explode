Provides an Amplify Branch resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.amplify.App("example", {});
const master = new aws.amplify.Branch("master", {
    appId: example.id,
    branchName: "master",
    framework: "React",
    stage: "PRODUCTION",
    environmentVariables: {
        REACT_APP_API_SERVER: "https://api.example.com",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.amplify.App("example")
master = aws.amplify.Branch("master",
    app_id=example.id,
    branch_name="master",
    framework="React",
    stage="PRODUCTION",
    environment_variables={
        "REACT_APP_API_SERVER": "https://api.example.com",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Amplify.App("example");

    var master = new Aws.Amplify.Branch("master", new()
    {
        AppId = example.Id,
        BranchName = "master",
        Framework = "React",
        Stage = "PRODUCTION",
        EnvironmentVariables = 
        {
            { "REACT_APP_API_SERVER", "https://api.example.com" },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/amplify"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		example, err := amplify.NewApp(ctx, "example", nil)
		if err != nil {
			return err
		}
		_, err = amplify.NewBranch(ctx, "master", &amplify.BranchArgs{
			AppId:      example.ID(),
			BranchName: pulumi.String("master"),
			Framework:  pulumi.String("React"),
			Stage:      pulumi.String("PRODUCTION"),
			EnvironmentVariables: pulumi.StringMap{
				"REACT_APP_API_SERVER": pulumi.String("https://api.example.com"),
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
import com.pulumi.aws.amplify.App;
import com.pulumi.aws.amplify.Branch;
import com.pulumi.aws.amplify.BranchArgs;
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
        var example = new App("example");

        var master = new Branch("master", BranchArgs.builder()        
            .appId(example.id())
            .branchName("master")
            .framework("React")
            .stage("PRODUCTION")
            .environmentVariables(Map.of("REACT_APP_API_SERVER", "https://api.example.com"))
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:amplify:App
  master:
    type: aws:amplify:Branch
    properties:
      appId: ${example.id}
      branchName: master
      framework: React
      stage: PRODUCTION
      environmentVariables:
        REACT_APP_API_SERVER: https://api.example.com
```
{{% /example %}}
{{% example %}}
### Notifications

Amplify Console uses EventBridge (formerly known as CloudWatch Events) and SNS for email notifications.  To implement the same functionality, you need to set `enable_notification` in a `aws.amplify.Branch` resource, as well as creating an EventBridge Rule, an SNS topic, and SNS subscriptions.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.amplify.App("example", {});
const master = new aws.amplify.Branch("master", {
    appId: example.id,
    branchName: "master",
    enableNotification: true,
});
// EventBridge Rule for Amplify notifications
const amplifyAppMasterEventRule = new aws.cloudwatch.EventRule("amplifyAppMasterEventRule", {
    description: pulumi.interpolate`AWS Amplify build notifications for :  App: ${aws_amplify_app.app.id} Branch: ${master.branchName}`,
    eventPattern: pulumi.all([example.id, master.branchName]).apply(([id, branchName]) => JSON.stringify({
        detail: {
            appId: [id],
            branchName: [branchName],
            jobStatus: [
                "SUCCEED",
                "FAILED",
                "STARTED",
            ],
        },
        "detail-type": ["Amplify Deployment Status Change"],
        source: ["aws.amplify"],
    })),
});
const amplifyAppMasterTopic = new aws.sns.Topic("amplifyAppMasterTopic", {});
const amplifyAppMasterEventTarget = new aws.cloudwatch.EventTarget("amplifyAppMasterEventTarget", {
    rule: amplifyAppMasterEventRule.name,
    arn: amplifyAppMasterTopic.arn,
    inputTransformer: {
        inputPaths: {
            jobId: `$.detail.jobId`,
            appId: `$.detail.appId`,
            region: `$.region`,
            branch: `$.detail.branchName`,
            status: `$.detail.jobStatus`,
        },
        inputTemplate: "\"Build notification from the AWS Amplify Console for app: https://<branch>.<appId>.amplifyapp.com/. Your build status is <status>. Go to https://console.aws.amazon.com/amplify/home?region=<region>#<appId>/<branch>/<jobId> to view details on your build. \"",
    },
});
// SNS Topic for Amplify notifications
const amplifyAppMasterPolicyDocument = pulumi.all([master.arn, amplifyAppMasterTopic.arn]).apply(([masterArn, amplifyAppMasterTopicArn]) => aws.iam.getPolicyDocumentOutput({
    statements: [{
        sid: `Allow_Publish_Events ${masterArn}`,
        effect: "Allow",
        actions: ["SNS:Publish"],
        principals: [{
            type: "Service",
            identifiers: ["events.amazonaws.com"],
        }],
        resources: [amplifyAppMasterTopicArn],
    }],
}));
const amplifyAppMasterTopicPolicy = new aws.sns.TopicPolicy("amplifyAppMasterTopicPolicy", {
    arn: amplifyAppMasterTopic.arn,
    policy: amplifyAppMasterPolicyDocument.apply(amplifyAppMasterPolicyDocument => amplifyAppMasterPolicyDocument.json),
});
```
```python
import pulumi
import json
import pulumi_aws as aws

example = aws.amplify.App("example")
master = aws.amplify.Branch("master",
    app_id=example.id,
    branch_name="master",
    enable_notification=True)
# EventBridge Rule for Amplify notifications
amplify_app_master_event_rule = aws.cloudwatch.EventRule("amplifyAppMasterEventRule",
    description=master.branch_name.apply(lambda branch_name: f"AWS Amplify build notifications for :  App: {aws_amplify_app['app']['id']} Branch: {branch_name}"),
    event_pattern=pulumi.Output.all(example.id, master.branch_name).apply(lambda id, branch_name: json.dumps({
        "detail": {
            "appId": [id],
            "branchName": [branch_name],
            "jobStatus": [
                "SUCCEED",
                "FAILED",
                "STARTED",
            ],
        },
        "detail-type": ["Amplify Deployment Status Change"],
        "source": ["aws.amplify"],
    })))
amplify_app_master_topic = aws.sns.Topic("amplifyAppMasterTopic")
amplify_app_master_event_target = aws.cloudwatch.EventTarget("amplifyAppMasterEventTarget",
    rule=amplify_app_master_event_rule.name,
    arn=amplify_app_master_topic.arn,
    input_transformer=aws.cloudwatch.EventTargetInputTransformerArgs(
        input_paths={
            "jobId": "$.detail.jobId",
            "appId": "$.detail.appId",
            "region": "$.region",
            "branch": "$.detail.branchName",
            "status": "$.detail.jobStatus",
        },
        input_template="\"Build notification from the AWS Amplify Console for app: https://<branch>.<appId>.amplifyapp.com/. Your build status is <status>. Go to https://console.aws.amazon.com/amplify/home?region=<region>#<appId>/<branch>/<jobId> to view details on your build. \"",
    ))
# SNS Topic for Amplify notifications
amplify_app_master_policy_document = pulumi.Output.all(master.arn, amplify_app_master_topic.arn).apply(lambda masterArn, amplifyAppMasterTopicArn: aws.iam.get_policy_document_output(statements=[aws.iam.GetPolicyDocumentStatementArgs(
    sid=f"Allow_Publish_Events {master_arn}",
    effect="Allow",
    actions=["SNS:Publish"],
    principals=[aws.iam.GetPolicyDocumentStatementPrincipalArgs(
        type="Service",
        identifiers=["events.amazonaws.com"],
    )],
    resources=[amplify_app_master_topic_arn],
)]))
amplify_app_master_topic_policy = aws.sns.TopicPolicy("amplifyAppMasterTopicPolicy",
    arn=amplify_app_master_topic.arn,
    policy=amplify_app_master_policy_document.json)
```
```csharp
using System.Collections.Generic;
using System.Text.Json;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Amplify.App("example");

    var master = new Aws.Amplify.Branch("master", new()
    {
        AppId = example.Id,
        BranchName = "master",
        EnableNotification = true,
    });

    // EventBridge Rule for Amplify notifications
    var amplifyAppMasterEventRule = new Aws.CloudWatch.EventRule("amplifyAppMasterEventRule", new()
    {
        Description = master.BranchName.Apply(branchName => $"AWS Amplify build notifications for :  App: {aws_amplify_app.App.Id} Branch: {branchName}"),
        EventPattern = Output.Tuple(example.Id, master.BranchName).Apply(values =>
        {
            var id = values.Item1;
            var branchName = values.Item2;
            return JsonSerializer.Serialize(new Dictionary<string, object?>
            {
                ["detail"] = new Dictionary<string, object?>
                {
                    ["appId"] = new[]
                    {
                        id,
                    },
                    ["branchName"] = new[]
                    {
                        branchName,
                    },
                    ["jobStatus"] = new[]
                    {
                        "SUCCEED",
                        "FAILED",
                        "STARTED",
                    },
                },
                ["detail-type"] = new[]
                {
                    "Amplify Deployment Status Change",
                },
                ["source"] = new[]
                {
                    "aws.amplify",
                },
            });
        }),
    });

    var amplifyAppMasterTopic = new Aws.Sns.Topic("amplifyAppMasterTopic");

    var amplifyAppMasterEventTarget = new Aws.CloudWatch.EventTarget("amplifyAppMasterEventTarget", new()
    {
        Rule = amplifyAppMasterEventRule.Name,
        Arn = amplifyAppMasterTopic.Arn,
        InputTransformer = new Aws.CloudWatch.Inputs.EventTargetInputTransformerArgs
        {
            InputPaths = 
            {
                { "jobId", "$.detail.jobId" },
                { "appId", "$.detail.appId" },
                { "region", "$.region" },
                { "branch", "$.detail.branchName" },
                { "status", "$.detail.jobStatus" },
            },
            InputTemplate = "\"Build notification from the AWS Amplify Console for app: https://<branch>.<appId>.amplifyapp.com/. Your build status is <status>. Go to https://console.aws.amazon.com/amplify/home?region=<region>#<appId>/<branch>/<jobId> to view details on your build. \"",
        },
    });

    // SNS Topic for Amplify notifications
    var amplifyAppMasterPolicyDocument = Aws.Iam.GetPolicyDocument.Invoke(new()
    {
        Statements = new[]
        {
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Sid = $"Allow_Publish_Events {master.Arn}",
                Effect = "Allow",
                Actions = new[]
                {
                    "SNS:Publish",
                },
                Principals = new[]
                {
                    new Aws.Iam.Inputs.GetPolicyDocumentStatementPrincipalInputArgs
                    {
                        Type = "Service",
                        Identifiers = new[]
                        {
                            "events.amazonaws.com",
                        },
                    },
                },
                Resources = new[]
                {
                    amplifyAppMasterTopic.Arn,
                },
            },
        },
    });

    var amplifyAppMasterTopicPolicy = new Aws.Sns.TopicPolicy("amplifyAppMasterTopicPolicy", new()
    {
        Arn = amplifyAppMasterTopic.Arn,
        Policy = amplifyAppMasterPolicyDocument.Apply(getPolicyDocumentResult => getPolicyDocumentResult.Json),
    });

});
```
```go
package main

import (
	"encoding/json"
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/amplify"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudwatch"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sns"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		example, err := amplify.NewApp(ctx, "example", nil)
		if err != nil {
			return err
		}
		master, err := amplify.NewBranch(ctx, "master", &amplify.BranchArgs{
			AppId:              example.ID(),
			BranchName:         pulumi.String("master"),
			EnableNotification: pulumi.Bool(true),
		})
		if err != nil {
			return err
		}
		amplifyAppMasterEventRule, err := cloudwatch.NewEventRule(ctx, "amplifyAppMasterEventRule", &cloudwatch.EventRuleArgs{
			Description: master.BranchName.ApplyT(func(branchName string) (string, error) {
				return fmt.Sprintf("AWS Amplify build notifications for :  App: %v Branch: %v", aws_amplify_app.App.Id, branchName), nil
			}).(pulumi.StringOutput),
			EventPattern: pulumi.All(example.ID(), master.BranchName).ApplyT(func(_args []interface{}) (string, error) {
				id := _args[0].(string)
				branchName := _args[1].(string)
				var _zero string
				tmpJSON0, err := json.Marshal(map[string]interface{}{
					"detail": map[string]interface{}{
						"appId": []string{
							id,
						},
						"branchName": []string{
							branchName,
						},
						"jobStatus": []string{
							"SUCCEED",
							"FAILED",
							"STARTED",
						},
					},
					"detail-type": []string{
						"Amplify Deployment Status Change",
					},
					"source": []string{
						"aws.amplify",
					},
				})
				if err != nil {
					return _zero, err
				}
				json0 := string(tmpJSON0)
				return json0, nil
			}).(pulumi.StringOutput),
		})
		if err != nil {
			return err
		}
		amplifyAppMasterTopic, err := sns.NewTopic(ctx, "amplifyAppMasterTopic", nil)
		if err != nil {
			return err
		}
		_, err = cloudwatch.NewEventTarget(ctx, "amplifyAppMasterEventTarget", &cloudwatch.EventTargetArgs{
			Rule: amplifyAppMasterEventRule.Name,
			Arn:  amplifyAppMasterTopic.Arn,
			InputTransformer: &cloudwatch.EventTargetInputTransformerArgs{
				InputPaths: pulumi.StringMap{
					"jobId":  pulumi.String(fmt.Sprintf("$.detail.jobId")),
					"appId":  pulumi.String(fmt.Sprintf("$.detail.appId")),
					"region": pulumi.String(fmt.Sprintf("$.region")),
					"branch": pulumi.String(fmt.Sprintf("$.detail.branchName")),
					"status": pulumi.String(fmt.Sprintf("$.detail.jobStatus")),
				},
				InputTemplate: pulumi.String("\"Build notification from the AWS Amplify Console for app: https://<branch>.<appId>.amplifyapp.com/. Your build status is <status>. Go to https://console.aws.amazon.com/amplify/home?region=<region>#<appId>/<branch>/<jobId> to view details on your build. \""),
			},
		})
		if err != nil {
			return err
		}
		_, err = sns.NewTopicPolicy(ctx, "amplifyAppMasterTopicPolicy", &sns.TopicPolicyArgs{
			Arn: amplifyAppMasterTopic.Arn,
			Policy: amplifyAppMasterPolicyDocument.ApplyT(func(amplifyAppMasterPolicyDocument iam.GetPolicyDocumentResult) (string, error) {
				return amplifyAppMasterPolicyDocument.Json, nil
			}).(pulumi.StringOutput),
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
import com.pulumi.aws.amplify.App;
import com.pulumi.aws.amplify.Branch;
import com.pulumi.aws.amplify.BranchArgs;
import com.pulumi.aws.cloudwatch.EventRule;
import com.pulumi.aws.cloudwatch.EventRuleArgs;
import com.pulumi.aws.sns.Topic;
import com.pulumi.aws.cloudwatch.EventTarget;
import com.pulumi.aws.cloudwatch.EventTargetArgs;
import com.pulumi.aws.cloudwatch.inputs.EventTargetInputTransformerArgs;
import com.pulumi.aws.iam.IamFunctions;
import com.pulumi.aws.iam.inputs.GetPolicyDocumentArgs;
import com.pulumi.aws.sns.TopicPolicy;
import com.pulumi.aws.sns.TopicPolicyArgs;
import static com.pulumi.codegen.internal.Serialization.*;
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
        var example = new App("example");

        var master = new Branch("master", BranchArgs.builder()        
            .appId(example.id())
            .branchName("master")
            .enableNotification(true)
            .build());

        var amplifyAppMasterEventRule = new EventRule("amplifyAppMasterEventRule", EventRuleArgs.builder()        
            .description(master.branchName().applyValue(branchName -> String.format("AWS Amplify build notifications for :  App: %s Branch: %s", aws_amplify_app.app().id(),branchName)))
            .eventPattern(Output.tuple(example.id(), master.branchName()).applyValue(values -> {
                var id = values.t1;
                var branchName = values.t2;
                return serializeJson(
                    jsonObject(
                        jsonProperty("detail", jsonObject(
                            jsonProperty("appId", jsonArray(id)),
                            jsonProperty("branchName", jsonArray(branchName)),
                            jsonProperty("jobStatus", jsonArray(
                                "SUCCEED", 
                                "FAILED", 
                                "STARTED"
                            ))
                        )),
                        jsonProperty("detail-type", jsonArray("Amplify Deployment Status Change")),
                        jsonProperty("source", jsonArray("aws.amplify"))
                    ));
            }))
            .build());

        var amplifyAppMasterTopic = new Topic("amplifyAppMasterTopic");

        var amplifyAppMasterEventTarget = new EventTarget("amplifyAppMasterEventTarget", EventTargetArgs.builder()        
            .rule(amplifyAppMasterEventRule.name())
            .arn(amplifyAppMasterTopic.arn())
            .inputTransformer(EventTargetInputTransformerArgs.builder()
                .inputPaths(Map.ofEntries(
                    Map.entry("jobId", "$.detail.jobId"),
                    Map.entry("appId", "$.detail.appId"),
                    Map.entry("region", "$.region"),
                    Map.entry("branch", "$.detail.branchName"),
                    Map.entry("status", "$.detail.jobStatus")
                ))
                .inputTemplate("\"Build notification from the AWS Amplify Console for app: https://<branch>.<appId>.amplifyapp.com/. Your build status is <status>. Go to https://console.aws.amazon.com/amplify/home?region=<region>#<appId>/<branch>/<jobId> to view details on your build. \"")
                .build())
            .build());

        final var amplifyAppMasterPolicyDocument = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .statements(GetPolicyDocumentStatementArgs.builder()
                .sid(master.arn().applyValue(arn -> String.format("Allow_Publish_Events %s", arn)))
                .effect("Allow")
                .actions("SNS:Publish")
                .principals(GetPolicyDocumentStatementPrincipalArgs.builder()
                    .type("Service")
                    .identifiers("events.amazonaws.com")
                    .build())
                .resources(amplifyAppMasterTopic.arn())
                .build())
            .build());

        var amplifyAppMasterTopicPolicy = new TopicPolicy("amplifyAppMasterTopicPolicy", TopicPolicyArgs.builder()        
            .arn(amplifyAppMasterTopic.arn())
            .policy(amplifyAppMasterPolicyDocument.applyValue(getPolicyDocumentResult -> getPolicyDocumentResult).applyValue(amplifyAppMasterPolicyDocument -> amplifyAppMasterPolicyDocument.applyValue(getPolicyDocumentResult -> getPolicyDocumentResult.json())))
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:amplify:App
  master: # EventBridge Rule for Amplify notifications
    type: aws:amplify:Branch
    properties:
      appId: ${example.id}
      branchName: master
      # Enable SNS notifications.
      enableNotification: true
  amplifyAppMasterEventRule:
    type: aws:cloudwatch:EventRule
    properties:
      description: 'AWS Amplify build notifications for :  App: ${aws_amplify_app.app.id} Branch: ${master.branchName}'
      eventPattern:
        Fn::ToJSON:
          detail:
            appId:
              - ${example.id}
            branchName:
              - ${master.branchName}
            jobStatus:
              - SUCCEED
              - FAILED
              - STARTED
          detail-type:
            - Amplify Deployment Status Change
          source:
            - aws.amplify
  amplifyAppMasterEventTarget: # SNS Topic for Amplify notifications
    type: aws:cloudwatch:EventTarget
    properties:
      rule: ${amplifyAppMasterEventRule.name}
      arn: ${amplifyAppMasterTopic.arn}
      inputTransformer:
        inputPaths:
          jobId: $.detail.jobId
          appId: $.detail.appId
          region: $.region
          branch: $.detail.branchName
          status: $.detail.jobStatus
        inputTemplate: '"Build notification from the AWS Amplify Console for app: https://<branch>.<appId>.amplifyapp.com/. Your build status is <status>. Go to https://console.aws.amazon.com/amplify/home?region=<region>#<appId>/<branch>/<jobId> to view details on your build. "'
  amplifyAppMasterTopic:
    type: aws:sns:Topic
  amplifyAppMasterTopicPolicy:
    type: aws:sns:TopicPolicy
    properties:
      arn: ${amplifyAppMasterTopic.arn}
      policy: ${amplifyAppMasterPolicyDocument.json}
variables:
  amplifyAppMasterPolicyDocument:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        statements:
          - sid: Allow_Publish_Events ${master.arn}
            effect: Allow
            actions:
              - SNS:Publish
            principals:
              - type: Service
                identifiers:
                  - events.amazonaws.com
            resources:
              - ${amplifyAppMasterTopic.arn}
```
{{% /example %}}
{{% /examples %}}

## Import

Amplify branch can be imported using `app_id` and `branch_name`, e.g.,

```sh
 $ pulumi import aws:amplify/branch:Branch master d2ypk4k47z8u6/master
```

 
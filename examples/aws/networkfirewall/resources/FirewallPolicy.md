Provides an AWS Network Firewall Firewall Policy Resource

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.networkfirewall.FirewallPolicy("example", {
    firewallPolicy: {
        statelessDefaultActions: ["aws:pass"],
        statelessFragmentDefaultActions: ["aws:drop"],
        statelessRuleGroupReferences: [{
            priority: 1,
            resourceArn: aws_networkfirewall_rule_group.example.arn,
        }],
    },
    tags: {
        Tag1: "Value1",
        Tag2: "Value2",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.networkfirewall.FirewallPolicy("example",
    firewall_policy=aws.networkfirewall.FirewallPolicyFirewallPolicyArgs(
        stateless_default_actions=["aws:pass"],
        stateless_fragment_default_actions=["aws:drop"],
        stateless_rule_group_references=[aws.networkfirewall.FirewallPolicyFirewallPolicyStatelessRuleGroupReferenceArgs(
            priority=1,
            resource_arn=aws_networkfirewall_rule_group["example"]["arn"],
        )],
    ),
    tags={
        "Tag1": "Value1",
        "Tag2": "Value2",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.NetworkFirewall.FirewallPolicy("example", new()
    {
        FirewallPolicyConfiguration = new Aws.NetworkFirewall.Inputs.FirewallPolicyFirewallPolicyArgs
        {
            StatelessDefaultActions = new[]
            {
                "aws:pass",
            },
            StatelessFragmentDefaultActions = new[]
            {
                "aws:drop",
            },
            StatelessRuleGroupReferences = new[]
            {
                new Aws.NetworkFirewall.Inputs.FirewallPolicyFirewallPolicyStatelessRuleGroupReferenceArgs
                {
                    Priority = 1,
                    ResourceArn = aws_networkfirewall_rule_group.Example.Arn,
                },
            },
        },
        Tags = 
        {
            { "Tag1", "Value1" },
            { "Tag2", "Value2" },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/networkfirewall"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := networkfirewall.NewFirewallPolicy(ctx, "example", &networkfirewall.FirewallPolicyArgs{
			FirewallPolicy: &networkfirewall.FirewallPolicyFirewallPolicyArgs{
				StatelessDefaultActions: pulumi.StringArray{
					pulumi.String("aws:pass"),
				},
				StatelessFragmentDefaultActions: pulumi.StringArray{
					pulumi.String("aws:drop"),
				},
				StatelessRuleGroupReferences: networkfirewall.FirewallPolicyFirewallPolicyStatelessRuleGroupReferenceArray{
					&networkfirewall.FirewallPolicyFirewallPolicyStatelessRuleGroupReferenceArgs{
						Priority:    pulumi.Int(1),
						ResourceArn: pulumi.Any(aws_networkfirewall_rule_group.Example.Arn),
					},
				},
			},
			Tags: pulumi.StringMap{
				"Tag1": pulumi.String("Value1"),
				"Tag2": pulumi.String("Value2"),
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
import com.pulumi.aws.networkfirewall.FirewallPolicy;
import com.pulumi.aws.networkfirewall.FirewallPolicyArgs;
import com.pulumi.aws.networkfirewall.inputs.FirewallPolicyFirewallPolicyArgs;
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
        var example = new FirewallPolicy("example", FirewallPolicyArgs.builder()        
            .firewallPolicy(FirewallPolicyFirewallPolicyArgs.builder()
                .statelessDefaultActions("aws:pass")
                .statelessFragmentDefaultActions("aws:drop")
                .statelessRuleGroupReferences(FirewallPolicyFirewallPolicyStatelessRuleGroupReferenceArgs.builder()
                    .priority(1)
                    .resourceArn(aws_networkfirewall_rule_group.example().arn())
                    .build())
                .build())
            .tags(Map.ofEntries(
                Map.entry("Tag1", "Value1"),
                Map.entry("Tag2", "Value2")
            ))
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:networkfirewall:FirewallPolicy
    properties:
      firewallPolicy:
        statelessDefaultActions:
          - aws:pass
        statelessFragmentDefaultActions:
          - aws:drop
        statelessRuleGroupReferences:
          - priority: 1
            resourceArn: ${aws_networkfirewall_rule_group.example.arn}
      tags:
        Tag1: Value1
        Tag2: Value2
```
{{% /example %}}
{{% /examples %}}
## Policy with a Custom Action for Stateless Inspection

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const test = new aws.networkfirewall.FirewallPolicy("test", {
    firewallPolicy: {
        statelessCustomActions: [{
            actionDefinition: {
                publishMetricAction: {
                    dimensions: [{
                        value: "1",
                    }],
                },
            },
            actionName: "ExampleCustomAction",
        }],
        statelessDefaultActions: [
            "aws:pass",
            "ExampleCustomAction",
        ],
        statelessFragmentDefaultActions: ["aws:drop"],
    },
});
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.networkfirewall.FirewallPolicy;
import com.pulumi.aws.networkfirewall.FirewallPolicyArgs;
import com.pulumi.aws.networkfirewall.inputs.FirewallPolicyFirewallPolicyArgs;
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
        var test = new FirewallPolicy("test", FirewallPolicyArgs.builder()        
            .firewallPolicy(FirewallPolicyFirewallPolicyArgs.builder()
                .statelessCustomActions(FirewallPolicyFirewallPolicyStatelessCustomActionArgs.builder()
                    .actionDefinition(FirewallPolicyFirewallPolicyStatelessCustomActionActionDefinitionArgs.builder()
                        .publishMetricAction(FirewallPolicyFirewallPolicyStatelessCustomActionActionDefinitionPublishMetricActionArgs.builder()
                            .dimension(%!v(PANIC=Format method: runtime error: invalid memory address or nil pointer dereference))
                            .build())
                        .build())
                    .actionName("ExampleCustomAction")
                    .build())
                .statelessDefaultActions(                
                    "aws:pass",
                    "ExampleCustomAction")
                .statelessFragmentDefaultActions("aws:drop")
                .build())
            .build());

    }
}
```
```yaml
resources:
  test:
    type: aws:networkfirewall:FirewallPolicy
    properties:
      firewallPolicy:
        statelessCustomActions:
          - actionDefinition:
              publishMetricAction:
                dimension:
                  - value: 1
            actionName: ExampleCustomAction
        statelessDefaultActions:
          - aws:pass
          - ExampleCustomAction
        statelessFragmentDefaultActions:
          - aws:drop
```


## Import

Network Firewall Policies can be imported using their `ARN`.

```sh
 $ pulumi import aws:networkfirewall/firewallPolicy:FirewallPolicy example arn:aws:network-firewall:us-west-1:123456789012:firewall-policy/example
```

 
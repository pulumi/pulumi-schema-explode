Creates a WAFv2 Web ACL resource.

{{% examples %}}
## Example Usage

This resource is based on `aws.wafv2.RuleGroup`, check the documentation of the `aws.wafv2.RuleGroup` resource to see examples of the various available statements.

{{% example %}}
### Managed Rule

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.wafv2.WebAcl("example", {
    defaultAction: {
        allow: {},
    },
    description: "Example of a managed rule.",
    rules: [{
        name: "rule-1",
        overrideAction: {
            count: {},
        },
        priority: 1,
        statement: {
            managedRuleGroupStatement: {
                excludedRules: [
                    {
                        name: "SizeRestrictions_QUERYSTRING",
                    },
                    {
                        name: "NoUserAgent_HEADER",
                    },
                ],
                name: "AWSManagedRulesCommonRuleSet",
                scopeDownStatement: {
                    geoMatchStatement: {
                        countryCodes: [
                            "US",
                            "NL",
                        ],
                    },
                },
                vendorName: "AWS",
            },
        },
        visibilityConfig: {
            cloudwatchMetricsEnabled: false,
            metricName: "friendly-rule-metric-name",
            sampledRequestsEnabled: false,
        },
    }],
    scope: "REGIONAL",
    tags: {
        Tag1: "Value1",
        Tag2: "Value2",
    },
    visibilityConfig: {
        cloudwatchMetricsEnabled: false,
        metricName: "friendly-metric-name",
        sampledRequestsEnabled: false,
    },
});
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.wafv2.WebAcl;
import com.pulumi.aws.wafv2.WebAclArgs;
import com.pulumi.aws.wafv2.inputs.WebAclDefaultActionArgs;
import com.pulumi.aws.wafv2.inputs.WebAclDefaultActionAllowArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleOverrideActionArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleOverrideActionCountArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleStatementArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleStatementManagedRuleGroupStatementArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleStatementManagedRuleGroupStatementScopeDownStatementArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleStatementManagedRuleGroupStatementScopeDownStatementGeoMatchStatementArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleVisibilityConfigArgs;
import com.pulumi.aws.wafv2.inputs.WebAclVisibilityConfigArgs;
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
        var example = new WebAcl("example", WebAclArgs.builder()        
            .defaultAction(WebAclDefaultActionArgs.builder()
                .allow()
                .build())
            .description("Example of a managed rule.")
            .rules(WebAclRuleArgs.builder()
                .name("rule-1")
                .overrideAction(WebAclRuleOverrideActionArgs.builder()
                    .count()
                    .build())
                .priority(1)
                .statement(WebAclRuleStatementArgs.builder()
                    .managedRuleGroupStatement(WebAclRuleStatementManagedRuleGroupStatementArgs.builder()
                        .excludedRule(                        
                            %!v(PANIC=Format method: runtime error: invalid memory address or nil pointer dereference),
                            %!v(PANIC=Format method: runtime error: invalid memory address or nil pointer dereference))
                        .name("AWSManagedRulesCommonRuleSet")
                        .scopeDownStatement(WebAclRuleStatementManagedRuleGroupStatementScopeDownStatementArgs.builder()
                            .geoMatchStatement(WebAclRuleStatementManagedRuleGroupStatementScopeDownStatementGeoMatchStatementArgs.builder()
                                .countryCodes(                                
                                    "US",
                                    "NL")
                                .build())
                            .build())
                        .vendorName("AWS")
                        .build())
                    .build())
                .visibilityConfig(WebAclRuleVisibilityConfigArgs.builder()
                    .cloudwatchMetricsEnabled(false)
                    .metricName("friendly-rule-metric-name")
                    .sampledRequestsEnabled(false)
                    .build())
                .build())
            .scope("REGIONAL")
            .tags(Map.ofEntries(
                Map.entry("Tag1", "Value1"),
                Map.entry("Tag2", "Value2")
            ))
            .visibilityConfig(WebAclVisibilityConfigArgs.builder()
                .cloudwatchMetricsEnabled(false)
                .metricName("friendly-metric-name")
                .sampledRequestsEnabled(false)
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:wafv2:WebAcl
    properties:
      defaultAction:
        allow: {}
      description: Example of a managed rule.
      rules:
        - name: rule-1
          overrideAction:
            count: {}
          priority: 1
          statement:
            managedRuleGroupStatement:
              excludedRule:
                - name: SizeRestrictions_QUERYSTRING
                - name: NoUserAgent_HEADER
              name: AWSManagedRulesCommonRuleSet
              scopeDownStatement:
                geoMatchStatement:
                  countryCodes:
                    - US
                    - NL
              vendorName: AWS
          visibilityConfig:
            cloudwatchMetricsEnabled: false
            metricName: friendly-rule-metric-name
            sampledRequestsEnabled: false
      scope: REGIONAL
      tags:
        Tag1: Value1
        Tag2: Value2
      visibilityConfig:
        cloudwatchMetricsEnabled: false
        metricName: friendly-metric-name
        sampledRequestsEnabled: false
```
{{% /example %}}
{{% example %}}
### Rate Based
Rate-limit US and NL-based clients to 10,000 requests for every 5 minutes.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.wafv2.WebAcl("example", {
    defaultAction: {
        allow: {},
    },
    description: "Example of a Cloudfront rate based statement.",
    rules: [{
        action: {
            block: {},
        },
        name: "rule-1",
        priority: 1,
        statement: {
            rateBasedStatement: {
                aggregateKeyType: "IP",
                limit: 10000,
                scopeDownStatement: {
                    geoMatchStatement: {
                        countryCodes: [
                            "US",
                            "NL",
                        ],
                    },
                },
            },
        },
        visibilityConfig: {
            cloudwatchMetricsEnabled: false,
            metricName: "friendly-rule-metric-name",
            sampledRequestsEnabled: false,
        },
    }],
    scope: "CLOUDFRONT",
    tags: {
        Tag1: "Value1",
        Tag2: "Value2",
    },
    visibilityConfig: {
        cloudwatchMetricsEnabled: false,
        metricName: "friendly-metric-name",
        sampledRequestsEnabled: false,
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.wafv2.WebAcl("example",
    default_action=aws.wafv2.WebAclDefaultActionArgs(
        allow=aws.wafv2.WebAclDefaultActionAllowArgs(),
    ),
    description="Example of a Cloudfront rate based statement.",
    rules=[aws.wafv2.WebAclRuleArgs(
        action=aws.wafv2.WebAclRuleActionArgs(
            block=aws.wafv2.WebAclRuleActionBlockArgs(),
        ),
        name="rule-1",
        priority=1,
        statement=aws.wafv2.WebAclRuleStatementArgs(
            rate_based_statement=aws.wafv2.WebAclRuleStatementRateBasedStatementArgs(
                aggregate_key_type="IP",
                limit=10000,
                scope_down_statement=aws.wafv2.WebAclRuleStatementRateBasedStatementScopeDownStatementArgs(
                    geo_match_statement=aws.wafv2.WebAclRuleStatementRateBasedStatementScopeDownStatementGeoMatchStatementArgs(
                        country_codes=[
                            "US",
                            "NL",
                        ],
                    ),
                ),
            ),
        ),
        visibility_config=aws.wafv2.WebAclRuleVisibilityConfigArgs(
            cloudwatch_metrics_enabled=False,
            metric_name="friendly-rule-metric-name",
            sampled_requests_enabled=False,
        ),
    )],
    scope="CLOUDFRONT",
    tags={
        "Tag1": "Value1",
        "Tag2": "Value2",
    },
    visibility_config=aws.wafv2.WebAclVisibilityConfigArgs(
        cloudwatch_metrics_enabled=False,
        metric_name="friendly-metric-name",
        sampled_requests_enabled=False,
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.WafV2.WebAcl("example", new()
    {
        DefaultAction = new Aws.WafV2.Inputs.WebAclDefaultActionArgs
        {
            Allow = ,
        },
        Description = "Example of a Cloudfront rate based statement.",
        Rules = new[]
        {
            new Aws.WafV2.Inputs.WebAclRuleArgs
            {
                Action = new Aws.WafV2.Inputs.WebAclRuleActionArgs
                {
                    Block = ,
                },
                Name = "rule-1",
                Priority = 1,
                Statement = new Aws.WafV2.Inputs.WebAclRuleStatementArgs
                {
                    RateBasedStatement = new Aws.WafV2.Inputs.WebAclRuleStatementRateBasedStatementArgs
                    {
                        AggregateKeyType = "IP",
                        Limit = 10000,
                        ScopeDownStatement = new Aws.WafV2.Inputs.WebAclRuleStatementRateBasedStatementScopeDownStatementArgs
                        {
                            GeoMatchStatement = new Aws.WafV2.Inputs.WebAclRuleStatementRateBasedStatementScopeDownStatementGeoMatchStatementArgs
                            {
                                CountryCodes = new[]
                                {
                                    "US",
                                    "NL",
                                },
                            },
                        },
                    },
                },
                VisibilityConfig = new Aws.WafV2.Inputs.WebAclRuleVisibilityConfigArgs
                {
                    CloudwatchMetricsEnabled = false,
                    MetricName = "friendly-rule-metric-name",
                    SampledRequestsEnabled = false,
                },
            },
        },
        Scope = "CLOUDFRONT",
        Tags = 
        {
            { "Tag1", "Value1" },
            { "Tag2", "Value2" },
        },
        VisibilityConfig = new Aws.WafV2.Inputs.WebAclVisibilityConfigArgs
        {
            CloudwatchMetricsEnabled = false,
            MetricName = "friendly-metric-name",
            SampledRequestsEnabled = false,
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/wafv2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := wafv2.NewWebAcl(ctx, "example", &wafv2.WebAclArgs{
			DefaultAction: &wafv2.WebAclDefaultActionArgs{
				Allow: nil,
			},
			Description: pulumi.String("Example of a Cloudfront rate based statement."),
			Rules: wafv2.WebAclRuleArray{
				&wafv2.WebAclRuleArgs{
					Action: &wafv2.WebAclRuleActionArgs{
						Block: nil,
					},
					Name:     pulumi.String("rule-1"),
					Priority: pulumi.Int(1),
					Statement: &wafv2.WebAclRuleStatementArgs{
						RateBasedStatement: &wafv2.WebAclRuleStatementRateBasedStatementArgs{
							AggregateKeyType: pulumi.String("IP"),
							Limit:            pulumi.Int(10000),
							ScopeDownStatement: &wafv2.WebAclRuleStatementRateBasedStatementScopeDownStatementArgs{
								GeoMatchStatement: &wafv2.WebAclRuleStatementRateBasedStatementScopeDownStatementGeoMatchStatementArgs{
									CountryCodes: pulumi.StringArray{
										pulumi.String("US"),
										pulumi.String("NL"),
									},
								},
							},
						},
					},
					VisibilityConfig: &wafv2.WebAclRuleVisibilityConfigArgs{
						CloudwatchMetricsEnabled: pulumi.Bool(false),
						MetricName:               pulumi.String("friendly-rule-metric-name"),
						SampledRequestsEnabled:   pulumi.Bool(false),
					},
				},
			},
			Scope: pulumi.String("CLOUDFRONT"),
			Tags: pulumi.StringMap{
				"Tag1": pulumi.String("Value1"),
				"Tag2": pulumi.String("Value2"),
			},
			VisibilityConfig: &wafv2.WebAclVisibilityConfigArgs{
				CloudwatchMetricsEnabled: pulumi.Bool(false),
				MetricName:               pulumi.String("friendly-metric-name"),
				SampledRequestsEnabled:   pulumi.Bool(false),
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
import com.pulumi.aws.wafv2.WebAcl;
import com.pulumi.aws.wafv2.WebAclArgs;
import com.pulumi.aws.wafv2.inputs.WebAclDefaultActionArgs;
import com.pulumi.aws.wafv2.inputs.WebAclDefaultActionAllowArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleActionArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleActionBlockArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleStatementArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleStatementRateBasedStatementArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleStatementRateBasedStatementScopeDownStatementArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleStatementRateBasedStatementScopeDownStatementGeoMatchStatementArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleVisibilityConfigArgs;
import com.pulumi.aws.wafv2.inputs.WebAclVisibilityConfigArgs;
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
        var example = new WebAcl("example", WebAclArgs.builder()        
            .defaultAction(WebAclDefaultActionArgs.builder()
                .allow()
                .build())
            .description("Example of a Cloudfront rate based statement.")
            .rules(WebAclRuleArgs.builder()
                .action(WebAclRuleActionArgs.builder()
                    .block()
                    .build())
                .name("rule-1")
                .priority(1)
                .statement(WebAclRuleStatementArgs.builder()
                    .rateBasedStatement(WebAclRuleStatementRateBasedStatementArgs.builder()
                        .aggregateKeyType("IP")
                        .limit(10000)
                        .scopeDownStatement(WebAclRuleStatementRateBasedStatementScopeDownStatementArgs.builder()
                            .geoMatchStatement(WebAclRuleStatementRateBasedStatementScopeDownStatementGeoMatchStatementArgs.builder()
                                .countryCodes(                                
                                    "US",
                                    "NL")
                                .build())
                            .build())
                        .build())
                    .build())
                .visibilityConfig(WebAclRuleVisibilityConfigArgs.builder()
                    .cloudwatchMetricsEnabled(false)
                    .metricName("friendly-rule-metric-name")
                    .sampledRequestsEnabled(false)
                    .build())
                .build())
            .scope("CLOUDFRONT")
            .tags(Map.ofEntries(
                Map.entry("Tag1", "Value1"),
                Map.entry("Tag2", "Value2")
            ))
            .visibilityConfig(WebAclVisibilityConfigArgs.builder()
                .cloudwatchMetricsEnabled(false)
                .metricName("friendly-metric-name")
                .sampledRequestsEnabled(false)
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:wafv2:WebAcl
    properties:
      defaultAction:
        allow: {}
      description: Example of a Cloudfront rate based statement.
      rules:
        - action:
            block: {}
          name: rule-1
          priority: 1
          statement:
            rateBasedStatement:
              aggregateKeyType: IP
              limit: 10000
              scopeDownStatement:
                geoMatchStatement:
                  countryCodes:
                    - US
                    - NL
          visibilityConfig:
            cloudwatchMetricsEnabled: false
            metricName: friendly-rule-metric-name
            sampledRequestsEnabled: false
      scope: CLOUDFRONT
      tags:
        Tag1: Value1
        Tag2: Value2
      visibilityConfig:
        cloudwatchMetricsEnabled: false
        metricName: friendly-metric-name
        sampledRequestsEnabled: false
```
{{% /example %}}
{{% example %}}
### Rule Group Reference

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.wafv2.RuleGroup("example", {
    capacity: 10,
    scope: "REGIONAL",
    rules: [
        {
            name: "rule-1",
            priority: 1,
            action: {
                count: {},
            },
            statement: {
                geoMatchStatement: {
                    countryCodes: ["NL"],
                },
            },
            visibilityConfig: {
                cloudwatchMetricsEnabled: false,
                metricName: "friendly-rule-metric-name",
                sampledRequestsEnabled: false,
            },
        },
        {
            name: "rule-to-exclude-a",
            priority: 10,
            action: {
                allow: {},
            },
            statement: {
                geoMatchStatement: {
                    countryCodes: ["US"],
                },
            },
            visibilityConfig: {
                cloudwatchMetricsEnabled: false,
                metricName: "friendly-rule-metric-name",
                sampledRequestsEnabled: false,
            },
        },
        {
            name: "rule-to-exclude-b",
            priority: 15,
            action: {
                allow: {},
            },
            statement: {
                geoMatchStatement: {
                    countryCodes: ["GB"],
                },
            },
            visibilityConfig: {
                cloudwatchMetricsEnabled: false,
                metricName: "friendly-rule-metric-name",
                sampledRequestsEnabled: false,
            },
        },
    ],
    visibilityConfig: {
        cloudwatchMetricsEnabled: false,
        metricName: "friendly-metric-name",
        sampledRequestsEnabled: false,
    },
});
const test = new aws.wafv2.WebAcl("test", {
    scope: "REGIONAL",
    defaultAction: {
        block: {},
    },
    rules: [{
        name: "rule-1",
        priority: 1,
        overrideAction: {
            count: {},
        },
        statement: {
            ruleGroupReferenceStatement: {
                arn: example.arn,
                excludedRules: [
                    {
                        name: "rule-to-exclude-b",
                    },
                    {
                        name: "rule-to-exclude-a",
                    },
                ],
            },
        },
        visibilityConfig: {
            cloudwatchMetricsEnabled: false,
            metricName: "friendly-rule-metric-name",
            sampledRequestsEnabled: false,
        },
    }],
    tags: {
        Tag1: "Value1",
        Tag2: "Value2",
    },
    visibilityConfig: {
        cloudwatchMetricsEnabled: false,
        metricName: "friendly-metric-name",
        sampledRequestsEnabled: false,
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.wafv2.RuleGroup("example",
    capacity=10,
    scope="REGIONAL",
    rules=[
        aws.wafv2.RuleGroupRuleArgs(
            name="rule-1",
            priority=1,
            action=aws.wafv2.RuleGroupRuleActionArgs(
                count=aws.wafv2.RuleGroupRuleActionCountArgs(),
            ),
            statement=aws.wafv2.RuleGroupRuleStatementArgs(
                geo_match_statement=aws.wafv2.RuleGroupRuleStatementGeoMatchStatementArgs(
                    country_codes=["NL"],
                ),
            ),
            visibility_config=aws.wafv2.RuleGroupRuleVisibilityConfigArgs(
                cloudwatch_metrics_enabled=False,
                metric_name="friendly-rule-metric-name",
                sampled_requests_enabled=False,
            ),
        ),
        aws.wafv2.RuleGroupRuleArgs(
            name="rule-to-exclude-a",
            priority=10,
            action=aws.wafv2.RuleGroupRuleActionArgs(
                allow=aws.wafv2.RuleGroupRuleActionAllowArgs(),
            ),
            statement=aws.wafv2.RuleGroupRuleStatementArgs(
                geo_match_statement=aws.wafv2.RuleGroupRuleStatementGeoMatchStatementArgs(
                    country_codes=["US"],
                ),
            ),
            visibility_config=aws.wafv2.RuleGroupRuleVisibilityConfigArgs(
                cloudwatch_metrics_enabled=False,
                metric_name="friendly-rule-metric-name",
                sampled_requests_enabled=False,
            ),
        ),
        aws.wafv2.RuleGroupRuleArgs(
            name="rule-to-exclude-b",
            priority=15,
            action=aws.wafv2.RuleGroupRuleActionArgs(
                allow=aws.wafv2.RuleGroupRuleActionAllowArgs(),
            ),
            statement=aws.wafv2.RuleGroupRuleStatementArgs(
                geo_match_statement=aws.wafv2.RuleGroupRuleStatementGeoMatchStatementArgs(
                    country_codes=["GB"],
                ),
            ),
            visibility_config=aws.wafv2.RuleGroupRuleVisibilityConfigArgs(
                cloudwatch_metrics_enabled=False,
                metric_name="friendly-rule-metric-name",
                sampled_requests_enabled=False,
            ),
        ),
    ],
    visibility_config=aws.wafv2.RuleGroupVisibilityConfigArgs(
        cloudwatch_metrics_enabled=False,
        metric_name="friendly-metric-name",
        sampled_requests_enabled=False,
    ))
test = aws.wafv2.WebAcl("test",
    scope="REGIONAL",
    default_action=aws.wafv2.WebAclDefaultActionArgs(
        block=aws.wafv2.WebAclDefaultActionBlockArgs(),
    ),
    rules=[aws.wafv2.WebAclRuleArgs(
        name="rule-1",
        priority=1,
        override_action=aws.wafv2.WebAclRuleOverrideActionArgs(
            count=aws.wafv2.WebAclRuleOverrideActionCountArgs(),
        ),
        statement=aws.wafv2.WebAclRuleStatementArgs(
            rule_group_reference_statement=aws.wafv2.WebAclRuleStatementRuleGroupReferenceStatementArgs(
                arn=example.arn,
                excluded_rules=[
                    aws.wafv2.WebAclRuleStatementRuleGroupReferenceStatementExcludedRuleArgs(
                        name="rule-to-exclude-b",
                    ),
                    aws.wafv2.WebAclRuleStatementRuleGroupReferenceStatementExcludedRuleArgs(
                        name="rule-to-exclude-a",
                    ),
                ],
            ),
        ),
        visibility_config=aws.wafv2.WebAclRuleVisibilityConfigArgs(
            cloudwatch_metrics_enabled=False,
            metric_name="friendly-rule-metric-name",
            sampled_requests_enabled=False,
        ),
    )],
    tags={
        "Tag1": "Value1",
        "Tag2": "Value2",
    },
    visibility_config=aws.wafv2.WebAclVisibilityConfigArgs(
        cloudwatch_metrics_enabled=False,
        metric_name="friendly-metric-name",
        sampled_requests_enabled=False,
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.WafV2.RuleGroup("example", new()
    {
        Capacity = 10,
        Scope = "REGIONAL",
        Rules = new[]
        {
            new Aws.WafV2.Inputs.RuleGroupRuleArgs
            {
                Name = "rule-1",
                Priority = 1,
                Action = new Aws.WafV2.Inputs.RuleGroupRuleActionArgs
                {
                    Count = ,
                },
                Statement = new Aws.WafV2.Inputs.RuleGroupRuleStatementArgs
                {
                    GeoMatchStatement = new Aws.WafV2.Inputs.RuleGroupRuleStatementGeoMatchStatementArgs
                    {
                        CountryCodes = new[]
                        {
                            "NL",
                        },
                    },
                },
                VisibilityConfig = new Aws.WafV2.Inputs.RuleGroupRuleVisibilityConfigArgs
                {
                    CloudwatchMetricsEnabled = false,
                    MetricName = "friendly-rule-metric-name",
                    SampledRequestsEnabled = false,
                },
            },
            new Aws.WafV2.Inputs.RuleGroupRuleArgs
            {
                Name = "rule-to-exclude-a",
                Priority = 10,
                Action = new Aws.WafV2.Inputs.RuleGroupRuleActionArgs
                {
                    Allow = ,
                },
                Statement = new Aws.WafV2.Inputs.RuleGroupRuleStatementArgs
                {
                    GeoMatchStatement = new Aws.WafV2.Inputs.RuleGroupRuleStatementGeoMatchStatementArgs
                    {
                        CountryCodes = new[]
                        {
                            "US",
                        },
                    },
                },
                VisibilityConfig = new Aws.WafV2.Inputs.RuleGroupRuleVisibilityConfigArgs
                {
                    CloudwatchMetricsEnabled = false,
                    MetricName = "friendly-rule-metric-name",
                    SampledRequestsEnabled = false,
                },
            },
            new Aws.WafV2.Inputs.RuleGroupRuleArgs
            {
                Name = "rule-to-exclude-b",
                Priority = 15,
                Action = new Aws.WafV2.Inputs.RuleGroupRuleActionArgs
                {
                    Allow = ,
                },
                Statement = new Aws.WafV2.Inputs.RuleGroupRuleStatementArgs
                {
                    GeoMatchStatement = new Aws.WafV2.Inputs.RuleGroupRuleStatementGeoMatchStatementArgs
                    {
                        CountryCodes = new[]
                        {
                            "GB",
                        },
                    },
                },
                VisibilityConfig = new Aws.WafV2.Inputs.RuleGroupRuleVisibilityConfigArgs
                {
                    CloudwatchMetricsEnabled = false,
                    MetricName = "friendly-rule-metric-name",
                    SampledRequestsEnabled = false,
                },
            },
        },
        VisibilityConfig = new Aws.WafV2.Inputs.RuleGroupVisibilityConfigArgs
        {
            CloudwatchMetricsEnabled = false,
            MetricName = "friendly-metric-name",
            SampledRequestsEnabled = false,
        },
    });

    var test = new Aws.WafV2.WebAcl("test", new()
    {
        Scope = "REGIONAL",
        DefaultAction = new Aws.WafV2.Inputs.WebAclDefaultActionArgs
        {
            Block = ,
        },
        Rules = new[]
        {
            new Aws.WafV2.Inputs.WebAclRuleArgs
            {
                Name = "rule-1",
                Priority = 1,
                OverrideAction = new Aws.WafV2.Inputs.WebAclRuleOverrideActionArgs
                {
                    Count = ,
                },
                Statement = new Aws.WafV2.Inputs.WebAclRuleStatementArgs
                {
                    RuleGroupReferenceStatement = new Aws.WafV2.Inputs.WebAclRuleStatementRuleGroupReferenceStatementArgs
                    {
                        Arn = example.Arn,
                        ExcludedRules = new[]
                        {
                            new Aws.WafV2.Inputs.WebAclRuleStatementRuleGroupReferenceStatementExcludedRuleArgs
                            {
                                Name = "rule-to-exclude-b",
                            },
                            new Aws.WafV2.Inputs.WebAclRuleStatementRuleGroupReferenceStatementExcludedRuleArgs
                            {
                                Name = "rule-to-exclude-a",
                            },
                        },
                    },
                },
                VisibilityConfig = new Aws.WafV2.Inputs.WebAclRuleVisibilityConfigArgs
                {
                    CloudwatchMetricsEnabled = false,
                    MetricName = "friendly-rule-metric-name",
                    SampledRequestsEnabled = false,
                },
            },
        },
        Tags = 
        {
            { "Tag1", "Value1" },
            { "Tag2", "Value2" },
        },
        VisibilityConfig = new Aws.WafV2.Inputs.WebAclVisibilityConfigArgs
        {
            CloudwatchMetricsEnabled = false,
            MetricName = "friendly-metric-name",
            SampledRequestsEnabled = false,
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/wafv2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		example, err := wafv2.NewRuleGroup(ctx, "example", &wafv2.RuleGroupArgs{
			Capacity: pulumi.Int(10),
			Scope:    pulumi.String("REGIONAL"),
			Rules: wafv2.RuleGroupRuleArray{
				&wafv2.RuleGroupRuleArgs{
					Name:     pulumi.String("rule-1"),
					Priority: pulumi.Int(1),
					Action: &wafv2.RuleGroupRuleActionArgs{
						Count: nil,
					},
					Statement: &wafv2.RuleGroupRuleStatementArgs{
						GeoMatchStatement: &wafv2.RuleGroupRuleStatementGeoMatchStatementArgs{
							CountryCodes: pulumi.StringArray{
								pulumi.String("NL"),
							},
						},
					},
					VisibilityConfig: &wafv2.RuleGroupRuleVisibilityConfigArgs{
						CloudwatchMetricsEnabled: pulumi.Bool(false),
						MetricName:               pulumi.String("friendly-rule-metric-name"),
						SampledRequestsEnabled:   pulumi.Bool(false),
					},
				},
				&wafv2.RuleGroupRuleArgs{
					Name:     pulumi.String("rule-to-exclude-a"),
					Priority: pulumi.Int(10),
					Action: &wafv2.RuleGroupRuleActionArgs{
						Allow: nil,
					},
					Statement: &wafv2.RuleGroupRuleStatementArgs{
						GeoMatchStatement: &wafv2.RuleGroupRuleStatementGeoMatchStatementArgs{
							CountryCodes: pulumi.StringArray{
								pulumi.String("US"),
							},
						},
					},
					VisibilityConfig: &wafv2.RuleGroupRuleVisibilityConfigArgs{
						CloudwatchMetricsEnabled: pulumi.Bool(false),
						MetricName:               pulumi.String("friendly-rule-metric-name"),
						SampledRequestsEnabled:   pulumi.Bool(false),
					},
				},
				&wafv2.RuleGroupRuleArgs{
					Name:     pulumi.String("rule-to-exclude-b"),
					Priority: pulumi.Int(15),
					Action: &wafv2.RuleGroupRuleActionArgs{
						Allow: nil,
					},
					Statement: &wafv2.RuleGroupRuleStatementArgs{
						GeoMatchStatement: &wafv2.RuleGroupRuleStatementGeoMatchStatementArgs{
							CountryCodes: pulumi.StringArray{
								pulumi.String("GB"),
							},
						},
					},
					VisibilityConfig: &wafv2.RuleGroupRuleVisibilityConfigArgs{
						CloudwatchMetricsEnabled: pulumi.Bool(false),
						MetricName:               pulumi.String("friendly-rule-metric-name"),
						SampledRequestsEnabled:   pulumi.Bool(false),
					},
				},
			},
			VisibilityConfig: &wafv2.RuleGroupVisibilityConfigArgs{
				CloudwatchMetricsEnabled: pulumi.Bool(false),
				MetricName:               pulumi.String("friendly-metric-name"),
				SampledRequestsEnabled:   pulumi.Bool(false),
			},
		})
		if err != nil {
			return err
		}
		_, err = wafv2.NewWebAcl(ctx, "test", &wafv2.WebAclArgs{
			Scope: pulumi.String("REGIONAL"),
			DefaultAction: &wafv2.WebAclDefaultActionArgs{
				Block: nil,
			},
			Rules: wafv2.WebAclRuleArray{
				&wafv2.WebAclRuleArgs{
					Name:     pulumi.String("rule-1"),
					Priority: pulumi.Int(1),
					OverrideAction: &wafv2.WebAclRuleOverrideActionArgs{
						Count: nil,
					},
					Statement: &wafv2.WebAclRuleStatementArgs{
						RuleGroupReferenceStatement: &wafv2.WebAclRuleStatementRuleGroupReferenceStatementArgs{
							Arn: example.Arn,
							ExcludedRules: wafv2.WebAclRuleStatementRuleGroupReferenceStatementExcludedRuleArray{
								&wafv2.WebAclRuleStatementRuleGroupReferenceStatementExcludedRuleArgs{
									Name: pulumi.String("rule-to-exclude-b"),
								},
								&wafv2.WebAclRuleStatementRuleGroupReferenceStatementExcludedRuleArgs{
									Name: pulumi.String("rule-to-exclude-a"),
								},
							},
						},
					},
					VisibilityConfig: &wafv2.WebAclRuleVisibilityConfigArgs{
						CloudwatchMetricsEnabled: pulumi.Bool(false),
						MetricName:               pulumi.String("friendly-rule-metric-name"),
						SampledRequestsEnabled:   pulumi.Bool(false),
					},
				},
			},
			Tags: pulumi.StringMap{
				"Tag1": pulumi.String("Value1"),
				"Tag2": pulumi.String("Value2"),
			},
			VisibilityConfig: &wafv2.WebAclVisibilityConfigArgs{
				CloudwatchMetricsEnabled: pulumi.Bool(false),
				MetricName:               pulumi.String("friendly-metric-name"),
				SampledRequestsEnabled:   pulumi.Bool(false),
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
import com.pulumi.aws.wafv2.RuleGroup;
import com.pulumi.aws.wafv2.RuleGroupArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupRuleArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupRuleActionArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupRuleActionCountArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupRuleStatementArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupRuleStatementGeoMatchStatementArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupRuleVisibilityConfigArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupRuleActionAllowArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupVisibilityConfigArgs;
import com.pulumi.aws.wafv2.WebAcl;
import com.pulumi.aws.wafv2.WebAclArgs;
import com.pulumi.aws.wafv2.inputs.WebAclDefaultActionArgs;
import com.pulumi.aws.wafv2.inputs.WebAclDefaultActionBlockArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleOverrideActionArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleOverrideActionCountArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleStatementArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleStatementRuleGroupReferenceStatementArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleVisibilityConfigArgs;
import com.pulumi.aws.wafv2.inputs.WebAclVisibilityConfigArgs;
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
        var example = new RuleGroup("example", RuleGroupArgs.builder()        
            .capacity(10)
            .scope("REGIONAL")
            .rules(            
                RuleGroupRuleArgs.builder()
                    .name("rule-1")
                    .priority(1)
                    .action(RuleGroupRuleActionArgs.builder()
                        .count()
                        .build())
                    .statement(RuleGroupRuleStatementArgs.builder()
                        .geoMatchStatement(RuleGroupRuleStatementGeoMatchStatementArgs.builder()
                            .countryCodes("NL")
                            .build())
                        .build())
                    .visibilityConfig(RuleGroupRuleVisibilityConfigArgs.builder()
                        .cloudwatchMetricsEnabled(false)
                        .metricName("friendly-rule-metric-name")
                        .sampledRequestsEnabled(false)
                        .build())
                    .build(),
                RuleGroupRuleArgs.builder()
                    .name("rule-to-exclude-a")
                    .priority(10)
                    .action(RuleGroupRuleActionArgs.builder()
                        .allow()
                        .build())
                    .statement(RuleGroupRuleStatementArgs.builder()
                        .geoMatchStatement(RuleGroupRuleStatementGeoMatchStatementArgs.builder()
                            .countryCodes("US")
                            .build())
                        .build())
                    .visibilityConfig(RuleGroupRuleVisibilityConfigArgs.builder()
                        .cloudwatchMetricsEnabled(false)
                        .metricName("friendly-rule-metric-name")
                        .sampledRequestsEnabled(false)
                        .build())
                    .build(),
                RuleGroupRuleArgs.builder()
                    .name("rule-to-exclude-b")
                    .priority(15)
                    .action(RuleGroupRuleActionArgs.builder()
                        .allow()
                        .build())
                    .statement(RuleGroupRuleStatementArgs.builder()
                        .geoMatchStatement(RuleGroupRuleStatementGeoMatchStatementArgs.builder()
                            .countryCodes("GB")
                            .build())
                        .build())
                    .visibilityConfig(RuleGroupRuleVisibilityConfigArgs.builder()
                        .cloudwatchMetricsEnabled(false)
                        .metricName("friendly-rule-metric-name")
                        .sampledRequestsEnabled(false)
                        .build())
                    .build())
            .visibilityConfig(RuleGroupVisibilityConfigArgs.builder()
                .cloudwatchMetricsEnabled(false)
                .metricName("friendly-metric-name")
                .sampledRequestsEnabled(false)
                .build())
            .build());

        var test = new WebAcl("test", WebAclArgs.builder()        
            .scope("REGIONAL")
            .defaultAction(WebAclDefaultActionArgs.builder()
                .block()
                .build())
            .rules(WebAclRuleArgs.builder()
                .name("rule-1")
                .priority(1)
                .overrideAction(WebAclRuleOverrideActionArgs.builder()
                    .count()
                    .build())
                .statement(WebAclRuleStatementArgs.builder()
                    .ruleGroupReferenceStatement(WebAclRuleStatementRuleGroupReferenceStatementArgs.builder()
                        .arn(example.arn())
                        .excludedRules(                        
                            WebAclRuleStatementRuleGroupReferenceStatementExcludedRuleArgs.builder()
                                .name("rule-to-exclude-b")
                                .build(),
                            WebAclRuleStatementRuleGroupReferenceStatementExcludedRuleArgs.builder()
                                .name("rule-to-exclude-a")
                                .build())
                        .build())
                    .build())
                .visibilityConfig(WebAclRuleVisibilityConfigArgs.builder()
                    .cloudwatchMetricsEnabled(false)
                    .metricName("friendly-rule-metric-name")
                    .sampledRequestsEnabled(false)
                    .build())
                .build())
            .tags(Map.ofEntries(
                Map.entry("Tag1", "Value1"),
                Map.entry("Tag2", "Value2")
            ))
            .visibilityConfig(WebAclVisibilityConfigArgs.builder()
                .cloudwatchMetricsEnabled(false)
                .metricName("friendly-metric-name")
                .sampledRequestsEnabled(false)
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:wafv2:RuleGroup
    properties:
      capacity: 10
      scope: REGIONAL
      rules:
        - name: rule-1
          priority: 1
          action:
            count: {}
          statement:
            geoMatchStatement:
              countryCodes:
                - NL
          visibilityConfig:
            cloudwatchMetricsEnabled: false
            metricName: friendly-rule-metric-name
            sampledRequestsEnabled: false
        - name: rule-to-exclude-a
          priority: 10
          action:
            allow: {}
          statement:
            geoMatchStatement:
              countryCodes:
                - US
          visibilityConfig:
            cloudwatchMetricsEnabled: false
            metricName: friendly-rule-metric-name
            sampledRequestsEnabled: false
        - name: rule-to-exclude-b
          priority: 15
          action:
            allow: {}
          statement:
            geoMatchStatement:
              countryCodes:
                - GB
          visibilityConfig:
            cloudwatchMetricsEnabled: false
            metricName: friendly-rule-metric-name
            sampledRequestsEnabled: false
      visibilityConfig:
        cloudwatchMetricsEnabled: false
        metricName: friendly-metric-name
        sampledRequestsEnabled: false
  test:
    type: aws:wafv2:WebAcl
    properties:
      scope: REGIONAL
      defaultAction:
        block: {}
      rules:
        - name: rule-1
          priority: 1
          overrideAction:
            count: {}
          statement:
            ruleGroupReferenceStatement:
              arn: ${example.arn}
              excludedRules:
                - name: rule-to-exclude-b
                - name: rule-to-exclude-a
          visibilityConfig:
            cloudwatchMetricsEnabled: false
            metricName: friendly-rule-metric-name
            sampledRequestsEnabled: false
      tags:
        Tag1: Value1
        Tag2: Value2
      visibilityConfig:
        cloudwatchMetricsEnabled: false
        metricName: friendly-metric-name
        sampledRequestsEnabled: false
```
{{% /example %}}
{{% /examples %}}

## Import

WAFv2 Web ACLs can be imported using `ID/Name/Scope` e.g.,

```sh
 $ pulumi import aws:wafv2/webAcl:WebAcl example a1b2c3d4-d5f6-7777-8888-9999aaaabbbbcccc/example/REGIONAL
```

 
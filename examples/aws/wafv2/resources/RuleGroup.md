Creates a WAFv2 Rule Group resource.

{{% examples %}}
## Example Usage
{{% example %}}
### Simple

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.wafv2.RuleGroup("example", {
    capacity: 2,
    rules: [{
        action: {
            allow: {},
        },
        name: "rule-1",
        priority: 1,
        statement: {
            geoMatchStatement: {
                countryCodes: [
                    "US",
                    "NL",
                ],
            },
        },
        visibilityConfig: {
            cloudwatchMetricsEnabled: false,
            metricName: "friendly-rule-metric-name",
            sampledRequestsEnabled: false,
        },
    }],
    scope: "REGIONAL",
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
    capacity=2,
    rules=[aws.wafv2.RuleGroupRuleArgs(
        action=aws.wafv2.RuleGroupRuleActionArgs(
            allow=aws.wafv2.RuleGroupRuleActionAllowArgs(),
        ),
        name="rule-1",
        priority=1,
        statement=aws.wafv2.RuleGroupRuleStatementArgs(
            geo_match_statement=aws.wafv2.RuleGroupRuleStatementGeoMatchStatementArgs(
                country_codes=[
                    "US",
                    "NL",
                ],
            ),
        ),
        visibility_config=aws.wafv2.RuleGroupRuleVisibilityConfigArgs(
            cloudwatch_metrics_enabled=False,
            metric_name="friendly-rule-metric-name",
            sampled_requests_enabled=False,
        ),
    )],
    scope="REGIONAL",
    visibility_config=aws.wafv2.RuleGroupVisibilityConfigArgs(
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
        Capacity = 2,
        Rules = new[]
        {
            new Aws.WafV2.Inputs.RuleGroupRuleArgs
            {
                Action = new Aws.WafV2.Inputs.RuleGroupRuleActionArgs
                {
                    Allow = ,
                },
                Name = "rule-1",
                Priority = 1,
                Statement = new Aws.WafV2.Inputs.RuleGroupRuleStatementArgs
                {
                    GeoMatchStatement = new Aws.WafV2.Inputs.RuleGroupRuleStatementGeoMatchStatementArgs
                    {
                        CountryCodes = new[]
                        {
                            "US",
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
        },
        Scope = "REGIONAL",
        VisibilityConfig = new Aws.WafV2.Inputs.RuleGroupVisibilityConfigArgs
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
		_, err := wafv2.NewRuleGroup(ctx, "example", &wafv2.RuleGroupArgs{
			Capacity: pulumi.Int(2),
			Rules: wafv2.RuleGroupRuleArray{
				&wafv2.RuleGroupRuleArgs{
					Action: &wafv2.RuleGroupRuleActionArgs{
						Allow: nil,
					},
					Name:     pulumi.String("rule-1"),
					Priority: pulumi.Int(1),
					Statement: &wafv2.RuleGroupRuleStatementArgs{
						GeoMatchStatement: &wafv2.RuleGroupRuleStatementGeoMatchStatementArgs{
							CountryCodes: pulumi.StringArray{
								pulumi.String("US"),
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
			},
			Scope: pulumi.String("REGIONAL"),
			VisibilityConfig: &wafv2.RuleGroupVisibilityConfigArgs{
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
import com.pulumi.aws.wafv2.inputs.RuleGroupRuleActionAllowArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupRuleStatementArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupRuleStatementGeoMatchStatementArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupRuleVisibilityConfigArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupVisibilityConfigArgs;
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
            .capacity(2)
            .rules(RuleGroupRuleArgs.builder()
                .action(RuleGroupRuleActionArgs.builder()
                    .allow()
                    .build())
                .name("rule-1")
                .priority(1)
                .statement(RuleGroupRuleStatementArgs.builder()
                    .geoMatchStatement(RuleGroupRuleStatementGeoMatchStatementArgs.builder()
                        .countryCodes(                        
                            "US",
                            "NL")
                        .build())
                    .build())
                .visibilityConfig(RuleGroupRuleVisibilityConfigArgs.builder()
                    .cloudwatchMetricsEnabled(false)
                    .metricName("friendly-rule-metric-name")
                    .sampledRequestsEnabled(false)
                    .build())
                .build())
            .scope("REGIONAL")
            .visibilityConfig(RuleGroupVisibilityConfigArgs.builder()
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
      capacity: 2
      rules:
        - action:
            allow: {}
          name: rule-1
          priority: 1
          statement:
            geoMatchStatement:
              countryCodes:
                - US
                - NL
          visibilityConfig:
            cloudwatchMetricsEnabled: false
            metricName: friendly-rule-metric-name
            sampledRequestsEnabled: false
      scope: REGIONAL
      visibilityConfig:
        cloudwatchMetricsEnabled: false
        metricName: friendly-metric-name
        sampledRequestsEnabled: false
```
{{% /example %}}
{{% example %}}
### Complex

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const testIpSet = new aws.wafv2.IpSet("testIpSet", {
    scope: "REGIONAL",
    ipAddressVersion: "IPV4",
    addresses: [
        "1.1.1.1/32",
        "2.2.2.2/32",
    ],
});
const testRegexPatternSet = new aws.wafv2.RegexPatternSet("testRegexPatternSet", {
    scope: "REGIONAL",
    regularExpressions: [{
        regexString: "one",
    }],
});
const example = new aws.wafv2.RuleGroup("example", {
    description: "An rule group containing all statements",
    scope: "REGIONAL",
    capacity: 500,
    rules: [
        {
            name: "rule-1",
            priority: 1,
            action: {
                block: {},
            },
            statement: {
                notStatement: {
                    statements: [{
                        andStatement: {
                            statements: [
                                {
                                    geoMatchStatement: {
                                        countryCodes: ["US"],
                                    },
                                },
                                {
                                    byteMatchStatement: {
                                        positionalConstraint: "CONTAINS",
                                        searchString: "word",
                                        fieldToMatch: {
                                            allQueryArguments: {},
                                        },
                                        textTransformations: [
                                            {
                                                priority: 5,
                                                type: "CMD_LINE",
                                            },
                                            {
                                                priority: 2,
                                                type: "LOWERCASE",
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    }],
                },
            },
            visibilityConfig: {
                cloudwatchMetricsEnabled: false,
                metricName: "rule-1",
                sampledRequestsEnabled: false,
            },
        },
        {
            name: "rule-2",
            priority: 2,
            action: {
                count: {},
            },
            statement: {
                orStatement: {
                    statements: [
                        {
                            sqliMatchStatement: {
                                fieldToMatch: {
                                    body: {},
                                },
                                textTransformations: [
                                    {
                                        priority: 5,
                                        type: "URL_DECODE",
                                    },
                                    {
                                        priority: 4,
                                        type: "HTML_ENTITY_DECODE",
                                    },
                                    {
                                        priority: 3,
                                        type: "COMPRESS_WHITE_SPACE",
                                    },
                                ],
                            },
                        },
                        {
                            xssMatchStatement: {
                                fieldToMatch: {
                                    method: {},
                                },
                                textTransformations: [{
                                    priority: 2,
                                    type: "NONE",
                                }],
                            },
                        },
                    ],
                },
            },
            visibilityConfig: {
                cloudwatchMetricsEnabled: false,
                metricName: "rule-2",
                sampledRequestsEnabled: false,
            },
        },
        {
            name: "rule-3",
            priority: 3,
            action: {
                block: {},
            },
            statement: {
                sizeConstraintStatement: {
                    comparisonOperator: "GT",
                    size: 100,
                    fieldToMatch: {
                        singleQueryArgument: {
                            name: "username",
                        },
                    },
                    textTransformations: [{
                        priority: 5,
                        type: "NONE",
                    }],
                },
            },
            visibilityConfig: {
                cloudwatchMetricsEnabled: false,
                metricName: "rule-3",
                sampledRequestsEnabled: false,
            },
        },
        {
            name: "rule-4",
            priority: 4,
            action: {
                block: {},
            },
            statement: {
                orStatement: {
                    statements: [
                        {
                            ipSetReferenceStatement: {
                                arn: testIpSet.arn,
                            },
                        },
                        {
                            regexPatternSetReferenceStatement: {
                                arn: testRegexPatternSet.arn,
                                fieldToMatch: {
                                    singleHeader: {
                                        name: "referer",
                                    },
                                },
                                textTransformations: [{
                                    priority: 2,
                                    type: "NONE",
                                }],
                            },
                        },
                    ],
                },
            },
            visibilityConfig: {
                cloudwatchMetricsEnabled: false,
                metricName: "rule-4",
                sampledRequestsEnabled: false,
            },
        },
    ],
    visibilityConfig: {
        cloudwatchMetricsEnabled: false,
        metricName: "friendly-metric-name",
        sampledRequestsEnabled: false,
    },
    tags: {
        Name: "example-and-statement",
        Code: "123456",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

test_ip_set = aws.wafv2.IpSet("testIpSet",
    scope="REGIONAL",
    ip_address_version="IPV4",
    addresses=[
        "1.1.1.1/32",
        "2.2.2.2/32",
    ])
test_regex_pattern_set = aws.wafv2.RegexPatternSet("testRegexPatternSet",
    scope="REGIONAL",
    regular_expressions=[aws.wafv2.RegexPatternSetRegularExpressionArgs(
        regex_string="one",
    )])
example = aws.wafv2.RuleGroup("example",
    description="An rule group containing all statements",
    scope="REGIONAL",
    capacity=500,
    rules=[
        aws.wafv2.RuleGroupRuleArgs(
            name="rule-1",
            priority=1,
            action=aws.wafv2.RuleGroupRuleActionArgs(
                block=aws.wafv2.RuleGroupRuleActionBlockArgs(),
            ),
            statement=aws.wafv2.RuleGroupRuleStatementArgs(
                not_statement=aws.wafv2.RuleGroupRuleStatementNotStatementArgs(
                    statements=[aws.wafv2.RuleGroupRuleStatementNotStatementStatementArgs(
                        and_statement=aws.wafv2.RuleGroupRuleStatementNotStatementStatementAndStatementArgs(
                            statements=[
                                aws.wafv2.RuleGroupRuleStatementNotStatementStatementAndStatementStatementArgs(
                                    geo_match_statement=aws.wafv2.RuleGroupRuleStatementNotStatementStatementAndStatementStatementGeoMatchStatementArgs(
                                        country_codes=["US"],
                                    ),
                                ),
                                aws.wafv2.RuleGroupRuleStatementNotStatementStatementAndStatementStatementArgs(
                                    byte_match_statement=aws.wafv2.RuleGroupRuleStatementNotStatementStatementAndStatementStatementByteMatchStatementArgs(
                                        positional_constraint="CONTAINS",
                                        search_string="word",
                                        field_to_match=aws.wafv2.RuleGroupRuleStatementNotStatementStatementAndStatementStatementByteMatchStatementFieldToMatchArgs(
                                            all_query_arguments=aws.wafv2.RuleGroupRuleStatementNotStatementStatementAndStatementStatementByteMatchStatementFieldToMatchAllQueryArgumentsArgs(),
                                        ),
                                        text_transformations=[
                                            aws.wafv2.RuleGroupRuleStatementNotStatementStatementAndStatementStatementByteMatchStatementTextTransformationArgs(
                                                priority=5,
                                                type="CMD_LINE",
                                            ),
                                            aws.wafv2.RuleGroupRuleStatementNotStatementStatementAndStatementStatementByteMatchStatementTextTransformationArgs(
                                                priority=2,
                                                type="LOWERCASE",
                                            ),
                                        ],
                                    ),
                                ),
                            ],
                        ),
                    )],
                ),
            ),
            visibility_config=aws.wafv2.RuleGroupRuleVisibilityConfigArgs(
                cloudwatch_metrics_enabled=False,
                metric_name="rule-1",
                sampled_requests_enabled=False,
            ),
        ),
        aws.wafv2.RuleGroupRuleArgs(
            name="rule-2",
            priority=2,
            action=aws.wafv2.RuleGroupRuleActionArgs(
                count=aws.wafv2.RuleGroupRuleActionCountArgs(),
            ),
            statement=aws.wafv2.RuleGroupRuleStatementArgs(
                or_statement=aws.wafv2.RuleGroupRuleStatementOrStatementArgs(
                    statements=[
                        aws.wafv2.RuleGroupRuleStatementOrStatementStatementArgs(
                            sqli_match_statement=aws.wafv2.RuleGroupRuleStatementOrStatementStatementSqliMatchStatementArgs(
                                field_to_match=aws.wafv2.RuleGroupRuleStatementOrStatementStatementSqliMatchStatementFieldToMatchArgs(
                                    body=aws.wafv2.RuleGroupRuleStatementOrStatementStatementSqliMatchStatementFieldToMatchBodyArgs(),
                                ),
                                text_transformations=[
                                    aws.wafv2.RuleGroupRuleStatementOrStatementStatementSqliMatchStatementTextTransformationArgs(
                                        priority=5,
                                        type="URL_DECODE",
                                    ),
                                    aws.wafv2.RuleGroupRuleStatementOrStatementStatementSqliMatchStatementTextTransformationArgs(
                                        priority=4,
                                        type="HTML_ENTITY_DECODE",
                                    ),
                                    aws.wafv2.RuleGroupRuleStatementOrStatementStatementSqliMatchStatementTextTransformationArgs(
                                        priority=3,
                                        type="COMPRESS_WHITE_SPACE",
                                    ),
                                ],
                            ),
                        ),
                        aws.wafv2.RuleGroupRuleStatementOrStatementStatementArgs(
                            xss_match_statement=aws.wafv2.RuleGroupRuleStatementOrStatementStatementXssMatchStatementArgs(
                                field_to_match=aws.wafv2.RuleGroupRuleStatementOrStatementStatementXssMatchStatementFieldToMatchArgs(
                                    method=aws.wafv2.RuleGroupRuleStatementOrStatementStatementXssMatchStatementFieldToMatchMethodArgs(),
                                ),
                                text_transformations=[aws.wafv2.RuleGroupRuleStatementOrStatementStatementXssMatchStatementTextTransformationArgs(
                                    priority=2,
                                    type="NONE",
                                )],
                            ),
                        ),
                    ],
                ),
            ),
            visibility_config=aws.wafv2.RuleGroupRuleVisibilityConfigArgs(
                cloudwatch_metrics_enabled=False,
                metric_name="rule-2",
                sampled_requests_enabled=False,
            ),
        ),
        aws.wafv2.RuleGroupRuleArgs(
            name="rule-3",
            priority=3,
            action=aws.wafv2.RuleGroupRuleActionArgs(
                block=aws.wafv2.RuleGroupRuleActionBlockArgs(),
            ),
            statement=aws.wafv2.RuleGroupRuleStatementArgs(
                size_constraint_statement=aws.wafv2.RuleGroupRuleStatementSizeConstraintStatementArgs(
                    comparison_operator="GT",
                    size=100,
                    field_to_match=aws.wafv2.RuleGroupRuleStatementSizeConstraintStatementFieldToMatchArgs(
                        single_query_argument=aws.wafv2.RuleGroupRuleStatementSizeConstraintStatementFieldToMatchSingleQueryArgumentArgs(
                            name="username",
                        ),
                    ),
                    text_transformations=[aws.wafv2.RuleGroupRuleStatementSizeConstraintStatementTextTransformationArgs(
                        priority=5,
                        type="NONE",
                    )],
                ),
            ),
            visibility_config=aws.wafv2.RuleGroupRuleVisibilityConfigArgs(
                cloudwatch_metrics_enabled=False,
                metric_name="rule-3",
                sampled_requests_enabled=False,
            ),
        ),
        aws.wafv2.RuleGroupRuleArgs(
            name="rule-4",
            priority=4,
            action=aws.wafv2.RuleGroupRuleActionArgs(
                block=aws.wafv2.RuleGroupRuleActionBlockArgs(),
            ),
            statement=aws.wafv2.RuleGroupRuleStatementArgs(
                or_statement=aws.wafv2.RuleGroupRuleStatementOrStatementArgs(
                    statements=[
                        aws.wafv2.RuleGroupRuleStatementOrStatementStatementArgs(
                            ip_set_reference_statement=aws.wafv2.RuleGroupRuleStatementOrStatementStatementIpSetReferenceStatementArgs(
                                arn=test_ip_set.arn,
                            ),
                        ),
                        aws.wafv2.RuleGroupRuleStatementOrStatementStatementArgs(
                            regex_pattern_set_reference_statement=aws.wafv2.RuleGroupRuleStatementOrStatementStatementRegexPatternSetReferenceStatementArgs(
                                arn=test_regex_pattern_set.arn,
                                field_to_match=aws.wafv2.RuleGroupRuleStatementOrStatementStatementRegexPatternSetReferenceStatementFieldToMatchArgs(
                                    single_header=aws.wafv2.RuleGroupRuleStatementOrStatementStatementRegexPatternSetReferenceStatementFieldToMatchSingleHeaderArgs(
                                        name="referer",
                                    ),
                                ),
                                text_transformations=[aws.wafv2.RuleGroupRuleStatementOrStatementStatementRegexPatternSetReferenceStatementTextTransformationArgs(
                                    priority=2,
                                    type="NONE",
                                )],
                            ),
                        ),
                    ],
                ),
            ),
            visibility_config=aws.wafv2.RuleGroupRuleVisibilityConfigArgs(
                cloudwatch_metrics_enabled=False,
                metric_name="rule-4",
                sampled_requests_enabled=False,
            ),
        ),
    ],
    visibility_config=aws.wafv2.RuleGroupVisibilityConfigArgs(
        cloudwatch_metrics_enabled=False,
        metric_name="friendly-metric-name",
        sampled_requests_enabled=False,
    ),
    tags={
        "Name": "example-and-statement",
        "Code": "123456",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var testIpSet = new Aws.WafV2.IpSet("testIpSet", new()
    {
        Scope = "REGIONAL",
        IpAddressVersion = "IPV4",
        Addresses = new[]
        {
            "1.1.1.1/32",
            "2.2.2.2/32",
        },
    });

    var testRegexPatternSet = new Aws.WafV2.RegexPatternSet("testRegexPatternSet", new()
    {
        Scope = "REGIONAL",
        RegularExpressions = new[]
        {
            new Aws.WafV2.Inputs.RegexPatternSetRegularExpressionArgs
            {
                RegexString = "one",
            },
        },
    });

    var example = new Aws.WafV2.RuleGroup("example", new()
    {
        Description = "An rule group containing all statements",
        Scope = "REGIONAL",
        Capacity = 500,
        Rules = new[]
        {
            new Aws.WafV2.Inputs.RuleGroupRuleArgs
            {
                Name = "rule-1",
                Priority = 1,
                Action = new Aws.WafV2.Inputs.RuleGroupRuleActionArgs
                {
                    Block = ,
                },
                Statement = new Aws.WafV2.Inputs.RuleGroupRuleStatementArgs
                {
                    NotStatement = new Aws.WafV2.Inputs.RuleGroupRuleStatementNotStatementArgs
                    {
                        Statements = new[]
                        {
                            new Aws.WafV2.Inputs.RuleGroupRuleStatementNotStatementStatementArgs
                            {
                                AndStatement = new Aws.WafV2.Inputs.RuleGroupRuleStatementNotStatementStatementAndStatementArgs
                                {
                                    Statements = new[]
                                    {
                                        new Aws.WafV2.Inputs.RuleGroupRuleStatementNotStatementStatementAndStatementStatementArgs
                                        {
                                            GeoMatchStatement = new Aws.WafV2.Inputs.RuleGroupRuleStatementNotStatementStatementAndStatementStatementGeoMatchStatementArgs
                                            {
                                                CountryCodes = new[]
                                                {
                                                    "US",
                                                },
                                            },
                                        },
                                        new Aws.WafV2.Inputs.RuleGroupRuleStatementNotStatementStatementAndStatementStatementArgs
                                        {
                                            ByteMatchStatement = new Aws.WafV2.Inputs.RuleGroupRuleStatementNotStatementStatementAndStatementStatementByteMatchStatementArgs
                                            {
                                                PositionalConstraint = "CONTAINS",
                                                SearchString = "word",
                                                FieldToMatch = new Aws.WafV2.Inputs.RuleGroupRuleStatementNotStatementStatementAndStatementStatementByteMatchStatementFieldToMatchArgs
                                                {
                                                    AllQueryArguments = ,
                                                },
                                                TextTransformations = new[]
                                                {
                                                    new Aws.WafV2.Inputs.RuleGroupRuleStatementNotStatementStatementAndStatementStatementByteMatchStatementTextTransformationArgs
                                                    {
                                                        Priority = 5,
                                                        Type = "CMD_LINE",
                                                    },
                                                    new Aws.WafV2.Inputs.RuleGroupRuleStatementNotStatementStatementAndStatementStatementByteMatchStatementTextTransformationArgs
                                                    {
                                                        Priority = 2,
                                                        Type = "LOWERCASE",
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                VisibilityConfig = new Aws.WafV2.Inputs.RuleGroupRuleVisibilityConfigArgs
                {
                    CloudwatchMetricsEnabled = false,
                    MetricName = "rule-1",
                    SampledRequestsEnabled = false,
                },
            },
            new Aws.WafV2.Inputs.RuleGroupRuleArgs
            {
                Name = "rule-2",
                Priority = 2,
                Action = new Aws.WafV2.Inputs.RuleGroupRuleActionArgs
                {
                    Count = ,
                },
                Statement = new Aws.WafV2.Inputs.RuleGroupRuleStatementArgs
                {
                    OrStatement = new Aws.WafV2.Inputs.RuleGroupRuleStatementOrStatementArgs
                    {
                        Statements = new[]
                        {
                            new Aws.WafV2.Inputs.RuleGroupRuleStatementOrStatementStatementArgs
                            {
                                SqliMatchStatement = new Aws.WafV2.Inputs.RuleGroupRuleStatementOrStatementStatementSqliMatchStatementArgs
                                {
                                    FieldToMatch = new Aws.WafV2.Inputs.RuleGroupRuleStatementOrStatementStatementSqliMatchStatementFieldToMatchArgs
                                    {
                                        Body = ,
                                    },
                                    TextTransformations = new[]
                                    {
                                        new Aws.WafV2.Inputs.RuleGroupRuleStatementOrStatementStatementSqliMatchStatementTextTransformationArgs
                                        {
                                            Priority = 5,
                                            Type = "URL_DECODE",
                                        },
                                        new Aws.WafV2.Inputs.RuleGroupRuleStatementOrStatementStatementSqliMatchStatementTextTransformationArgs
                                        {
                                            Priority = 4,
                                            Type = "HTML_ENTITY_DECODE",
                                        },
                                        new Aws.WafV2.Inputs.RuleGroupRuleStatementOrStatementStatementSqliMatchStatementTextTransformationArgs
                                        {
                                            Priority = 3,
                                            Type = "COMPRESS_WHITE_SPACE",
                                        },
                                    },
                                },
                            },
                            new Aws.WafV2.Inputs.RuleGroupRuleStatementOrStatementStatementArgs
                            {
                                XssMatchStatement = new Aws.WafV2.Inputs.RuleGroupRuleStatementOrStatementStatementXssMatchStatementArgs
                                {
                                    FieldToMatch = new Aws.WafV2.Inputs.RuleGroupRuleStatementOrStatementStatementXssMatchStatementFieldToMatchArgs
                                    {
                                        Method = ,
                                    },
                                    TextTransformations = new[]
                                    {
                                        new Aws.WafV2.Inputs.RuleGroupRuleStatementOrStatementStatementXssMatchStatementTextTransformationArgs
                                        {
                                            Priority = 2,
                                            Type = "NONE",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                VisibilityConfig = new Aws.WafV2.Inputs.RuleGroupRuleVisibilityConfigArgs
                {
                    CloudwatchMetricsEnabled = false,
                    MetricName = "rule-2",
                    SampledRequestsEnabled = false,
                },
            },
            new Aws.WafV2.Inputs.RuleGroupRuleArgs
            {
                Name = "rule-3",
                Priority = 3,
                Action = new Aws.WafV2.Inputs.RuleGroupRuleActionArgs
                {
                    Block = ,
                },
                Statement = new Aws.WafV2.Inputs.RuleGroupRuleStatementArgs
                {
                    SizeConstraintStatement = new Aws.WafV2.Inputs.RuleGroupRuleStatementSizeConstraintStatementArgs
                    {
                        ComparisonOperator = "GT",
                        Size = 100,
                        FieldToMatch = new Aws.WafV2.Inputs.RuleGroupRuleStatementSizeConstraintStatementFieldToMatchArgs
                        {
                            SingleQueryArgument = new Aws.WafV2.Inputs.RuleGroupRuleStatementSizeConstraintStatementFieldToMatchSingleQueryArgumentArgs
                            {
                                Name = "username",
                            },
                        },
                        TextTransformations = new[]
                        {
                            new Aws.WafV2.Inputs.RuleGroupRuleStatementSizeConstraintStatementTextTransformationArgs
                            {
                                Priority = 5,
                                Type = "NONE",
                            },
                        },
                    },
                },
                VisibilityConfig = new Aws.WafV2.Inputs.RuleGroupRuleVisibilityConfigArgs
                {
                    CloudwatchMetricsEnabled = false,
                    MetricName = "rule-3",
                    SampledRequestsEnabled = false,
                },
            },
            new Aws.WafV2.Inputs.RuleGroupRuleArgs
            {
                Name = "rule-4",
                Priority = 4,
                Action = new Aws.WafV2.Inputs.RuleGroupRuleActionArgs
                {
                    Block = ,
                },
                Statement = new Aws.WafV2.Inputs.RuleGroupRuleStatementArgs
                {
                    OrStatement = new Aws.WafV2.Inputs.RuleGroupRuleStatementOrStatementArgs
                    {
                        Statements = new[]
                        {
                            new Aws.WafV2.Inputs.RuleGroupRuleStatementOrStatementStatementArgs
                            {
                                IpSetReferenceStatement = new Aws.WafV2.Inputs.RuleGroupRuleStatementOrStatementStatementIpSetReferenceStatementArgs
                                {
                                    Arn = testIpSet.Arn,
                                },
                            },
                            new Aws.WafV2.Inputs.RuleGroupRuleStatementOrStatementStatementArgs
                            {
                                RegexPatternSetReferenceStatement = new Aws.WafV2.Inputs.RuleGroupRuleStatementOrStatementStatementRegexPatternSetReferenceStatementArgs
                                {
                                    Arn = testRegexPatternSet.Arn,
                                    FieldToMatch = new Aws.WafV2.Inputs.RuleGroupRuleStatementOrStatementStatementRegexPatternSetReferenceStatementFieldToMatchArgs
                                    {
                                        SingleHeader = new Aws.WafV2.Inputs.RuleGroupRuleStatementOrStatementStatementRegexPatternSetReferenceStatementFieldToMatchSingleHeaderArgs
                                        {
                                            Name = "referer",
                                        },
                                    },
                                    TextTransformations = new[]
                                    {
                                        new Aws.WafV2.Inputs.RuleGroupRuleStatementOrStatementStatementRegexPatternSetReferenceStatementTextTransformationArgs
                                        {
                                            Priority = 2,
                                            Type = "NONE",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                VisibilityConfig = new Aws.WafV2.Inputs.RuleGroupRuleVisibilityConfigArgs
                {
                    CloudwatchMetricsEnabled = false,
                    MetricName = "rule-4",
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
        Tags = 
        {
            { "Name", "example-and-statement" },
            { "Code", "123456" },
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
		testIpSet, err := wafv2.NewIpSet(ctx, "testIpSet", &wafv2.IpSetArgs{
			Scope:            pulumi.String("REGIONAL"),
			IpAddressVersion: pulumi.String("IPV4"),
			Addresses: pulumi.StringArray{
				pulumi.String("1.1.1.1/32"),
				pulumi.String("2.2.2.2/32"),
			},
		})
		if err != nil {
			return err
		}
		testRegexPatternSet, err := wafv2.NewRegexPatternSet(ctx, "testRegexPatternSet", &wafv2.RegexPatternSetArgs{
			Scope: pulumi.String("REGIONAL"),
			RegularExpressions: wafv2.RegexPatternSetRegularExpressionArray{
				&wafv2.RegexPatternSetRegularExpressionArgs{
					RegexString: pulumi.String("one"),
				},
			},
		})
		if err != nil {
			return err
		}
		_, err = wafv2.NewRuleGroup(ctx, "example", &wafv2.RuleGroupArgs{
			Description: pulumi.String("An rule group containing all statements"),
			Scope:       pulumi.String("REGIONAL"),
			Capacity:    pulumi.Int(500),
			Rules: wafv2.RuleGroupRuleArray{
				&wafv2.RuleGroupRuleArgs{
					Name:     pulumi.String("rule-1"),
					Priority: pulumi.Int(1),
					Action: &wafv2.RuleGroupRuleActionArgs{
						Block: nil,
					},
					Statement: &wafv2.RuleGroupRuleStatementArgs{
						NotStatement: &wafv2.RuleGroupRuleStatementNotStatementArgs{
							Statements: wafv2.RuleGroupRuleStatementNotStatementStatementArray{
								&wafv2.RuleGroupRuleStatementNotStatementStatementArgs{
									AndStatement: &wafv2.RuleGroupRuleStatementNotStatementStatementAndStatementArgs{
										Statements: wafv2.RuleGroupRuleStatementNotStatementStatementAndStatementStatementArray{
											&wafv2.RuleGroupRuleStatementNotStatementStatementAndStatementStatementArgs{
												GeoMatchStatement: &wafv2.RuleGroupRuleStatementNotStatementStatementAndStatementStatementGeoMatchStatementArgs{
													CountryCodes: pulumi.StringArray{
														pulumi.String("US"),
													},
												},
											},
											&wafv2.RuleGroupRuleStatementNotStatementStatementAndStatementStatementArgs{
												ByteMatchStatement: &wafv2.RuleGroupRuleStatementNotStatementStatementAndStatementStatementByteMatchStatementArgs{
													PositionalConstraint: pulumi.String("CONTAINS"),
													SearchString:         pulumi.String("word"),
													FieldToMatch: &wafv2.RuleGroupRuleStatementNotStatementStatementAndStatementStatementByteMatchStatementFieldToMatchArgs{
														AllQueryArguments: nil,
													},
													TextTransformations: wafv2.RuleGroupRuleStatementNotStatementStatementAndStatementStatementByteMatchStatementTextTransformationArray{
														&wafv2.RuleGroupRuleStatementNotStatementStatementAndStatementStatementByteMatchStatementTextTransformationArgs{
															Priority: pulumi.Int(5),
															Type:     pulumi.String("CMD_LINE"),
														},
														&wafv2.RuleGroupRuleStatementNotStatementStatementAndStatementStatementByteMatchStatementTextTransformationArgs{
															Priority: pulumi.Int(2),
															Type:     pulumi.String("LOWERCASE"),
														},
													},
												},
											},
										},
									},
								},
							},
						},
					},
					VisibilityConfig: &wafv2.RuleGroupRuleVisibilityConfigArgs{
						CloudwatchMetricsEnabled: pulumi.Bool(false),
						MetricName:               pulumi.String("rule-1"),
						SampledRequestsEnabled:   pulumi.Bool(false),
					},
				},
				&wafv2.RuleGroupRuleArgs{
					Name:     pulumi.String("rule-2"),
					Priority: pulumi.Int(2),
					Action: &wafv2.RuleGroupRuleActionArgs{
						Count: nil,
					},
					Statement: &wafv2.RuleGroupRuleStatementArgs{
						OrStatement: &wafv2.RuleGroupRuleStatementOrStatementArgs{
							Statements: wafv2.RuleGroupRuleStatementOrStatementStatementArray{
								&wafv2.RuleGroupRuleStatementOrStatementStatementArgs{
									SqliMatchStatement: &wafv2.RuleGroupRuleStatementOrStatementStatementSqliMatchStatementArgs{
										FieldToMatch: &wafv2.RuleGroupRuleStatementOrStatementStatementSqliMatchStatementFieldToMatchArgs{
											Body: nil,
										},
										TextTransformations: wafv2.RuleGroupRuleStatementOrStatementStatementSqliMatchStatementTextTransformationArray{
											&wafv2.RuleGroupRuleStatementOrStatementStatementSqliMatchStatementTextTransformationArgs{
												Priority: pulumi.Int(5),
												Type:     pulumi.String("URL_DECODE"),
											},
											&wafv2.RuleGroupRuleStatementOrStatementStatementSqliMatchStatementTextTransformationArgs{
												Priority: pulumi.Int(4),
												Type:     pulumi.String("HTML_ENTITY_DECODE"),
											},
											&wafv2.RuleGroupRuleStatementOrStatementStatementSqliMatchStatementTextTransformationArgs{
												Priority: pulumi.Int(3),
												Type:     pulumi.String("COMPRESS_WHITE_SPACE"),
											},
										},
									},
								},
								&wafv2.RuleGroupRuleStatementOrStatementStatementArgs{
									XssMatchStatement: &wafv2.RuleGroupRuleStatementOrStatementStatementXssMatchStatementArgs{
										FieldToMatch: &wafv2.RuleGroupRuleStatementOrStatementStatementXssMatchStatementFieldToMatchArgs{
											Method: nil,
										},
										TextTransformations: wafv2.RuleGroupRuleStatementOrStatementStatementXssMatchStatementTextTransformationArray{
											&wafv2.RuleGroupRuleStatementOrStatementStatementXssMatchStatementTextTransformationArgs{
												Priority: pulumi.Int(2),
												Type:     pulumi.String("NONE"),
											},
										},
									},
								},
							},
						},
					},
					VisibilityConfig: &wafv2.RuleGroupRuleVisibilityConfigArgs{
						CloudwatchMetricsEnabled: pulumi.Bool(false),
						MetricName:               pulumi.String("rule-2"),
						SampledRequestsEnabled:   pulumi.Bool(false),
					},
				},
				&wafv2.RuleGroupRuleArgs{
					Name:     pulumi.String("rule-3"),
					Priority: pulumi.Int(3),
					Action: &wafv2.RuleGroupRuleActionArgs{
						Block: nil,
					},
					Statement: &wafv2.RuleGroupRuleStatementArgs{
						SizeConstraintStatement: &wafv2.RuleGroupRuleStatementSizeConstraintStatementArgs{
							ComparisonOperator: pulumi.String("GT"),
							Size:               pulumi.Int(100),
							FieldToMatch: &wafv2.RuleGroupRuleStatementSizeConstraintStatementFieldToMatchArgs{
								SingleQueryArgument: &wafv2.RuleGroupRuleStatementSizeConstraintStatementFieldToMatchSingleQueryArgumentArgs{
									Name: pulumi.String("username"),
								},
							},
							TextTransformations: wafv2.RuleGroupRuleStatementSizeConstraintStatementTextTransformationArray{
								&wafv2.RuleGroupRuleStatementSizeConstraintStatementTextTransformationArgs{
									Priority: pulumi.Int(5),
									Type:     pulumi.String("NONE"),
								},
							},
						},
					},
					VisibilityConfig: &wafv2.RuleGroupRuleVisibilityConfigArgs{
						CloudwatchMetricsEnabled: pulumi.Bool(false),
						MetricName:               pulumi.String("rule-3"),
						SampledRequestsEnabled:   pulumi.Bool(false),
					},
				},
				&wafv2.RuleGroupRuleArgs{
					Name:     pulumi.String("rule-4"),
					Priority: pulumi.Int(4),
					Action: &wafv2.RuleGroupRuleActionArgs{
						Block: nil,
					},
					Statement: &wafv2.RuleGroupRuleStatementArgs{
						OrStatement: &wafv2.RuleGroupRuleStatementOrStatementArgs{
							Statements: wafv2.RuleGroupRuleStatementOrStatementStatementArray{
								&wafv2.RuleGroupRuleStatementOrStatementStatementArgs{
									IpSetReferenceStatement: &wafv2.RuleGroupRuleStatementOrStatementStatementIpSetReferenceStatementArgs{
										Arn: testIpSet.Arn,
									},
								},
								&wafv2.RuleGroupRuleStatementOrStatementStatementArgs{
									RegexPatternSetReferenceStatement: &wafv2.RuleGroupRuleStatementOrStatementStatementRegexPatternSetReferenceStatementArgs{
										Arn: testRegexPatternSet.Arn,
										FieldToMatch: &wafv2.RuleGroupRuleStatementOrStatementStatementRegexPatternSetReferenceStatementFieldToMatchArgs{
											SingleHeader: &wafv2.RuleGroupRuleStatementOrStatementStatementRegexPatternSetReferenceStatementFieldToMatchSingleHeaderArgs{
												Name: pulumi.String("referer"),
											},
										},
										TextTransformations: wafv2.RuleGroupRuleStatementOrStatementStatementRegexPatternSetReferenceStatementTextTransformationArray{
											&wafv2.RuleGroupRuleStatementOrStatementStatementRegexPatternSetReferenceStatementTextTransformationArgs{
												Priority: pulumi.Int(2),
												Type:     pulumi.String("NONE"),
											},
										},
									},
								},
							},
						},
					},
					VisibilityConfig: &wafv2.RuleGroupRuleVisibilityConfigArgs{
						CloudwatchMetricsEnabled: pulumi.Bool(false),
						MetricName:               pulumi.String("rule-4"),
						SampledRequestsEnabled:   pulumi.Bool(false),
					},
				},
			},
			VisibilityConfig: &wafv2.RuleGroupVisibilityConfigArgs{
				CloudwatchMetricsEnabled: pulumi.Bool(false),
				MetricName:               pulumi.String("friendly-metric-name"),
				SampledRequestsEnabled:   pulumi.Bool(false),
			},
			Tags: pulumi.StringMap{
				"Name": pulumi.String("example-and-statement"),
				"Code": pulumi.String("123456"),
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
import com.pulumi.aws.wafv2.IpSet;
import com.pulumi.aws.wafv2.IpSetArgs;
import com.pulumi.aws.wafv2.RegexPatternSet;
import com.pulumi.aws.wafv2.RegexPatternSetArgs;
import com.pulumi.aws.wafv2.inputs.RegexPatternSetRegularExpressionArgs;
import com.pulumi.aws.wafv2.RuleGroup;
import com.pulumi.aws.wafv2.RuleGroupArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupRuleArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupRuleActionArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupRuleActionBlockArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupRuleStatementArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupRuleStatementNotStatementArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupRuleVisibilityConfigArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupRuleActionCountArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupRuleStatementOrStatementArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupRuleStatementSizeConstraintStatementArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupRuleStatementSizeConstraintStatementFieldToMatchArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupRuleStatementSizeConstraintStatementFieldToMatchSingleQueryArgumentArgs;
import com.pulumi.aws.wafv2.inputs.RuleGroupVisibilityConfigArgs;
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
        var testIpSet = new IpSet("testIpSet", IpSetArgs.builder()        
            .scope("REGIONAL")
            .ipAddressVersion("IPV4")
            .addresses(            
                "1.1.1.1/32",
                "2.2.2.2/32")
            .build());

        var testRegexPatternSet = new RegexPatternSet("testRegexPatternSet", RegexPatternSetArgs.builder()        
            .scope("REGIONAL")
            .regularExpressions(RegexPatternSetRegularExpressionArgs.builder()
                .regexString("one")
                .build())
            .build());

        var example = new RuleGroup("example", RuleGroupArgs.builder()        
            .description("An rule group containing all statements")
            .scope("REGIONAL")
            .capacity(500)
            .rules(            
                RuleGroupRuleArgs.builder()
                    .name("rule-1")
                    .priority(1)
                    .action(RuleGroupRuleActionArgs.builder()
                        .block()
                        .build())
                    .statement(RuleGroupRuleStatementArgs.builder()
                        .notStatement(RuleGroupRuleStatementNotStatementArgs.builder()
                            .statements(RuleGroupRuleStatementNotStatementStatementArgs.builder()
                                .andStatement(RuleGroupRuleStatementNotStatementStatementAndStatementArgs.builder()
                                    .statements(                                    
                                        RuleGroupRuleStatementNotStatementStatementAndStatementStatementArgs.builder()
                                            .geoMatchStatement(RuleGroupRuleStatementNotStatementStatementAndStatementStatementGeoMatchStatementArgs.builder()
                                                .countryCodes("US")
                                                .build())
                                            .build(),
                                        RuleGroupRuleStatementNotStatementStatementAndStatementStatementArgs.builder()
                                            .byteMatchStatement(RuleGroupRuleStatementNotStatementStatementAndStatementStatementByteMatchStatementArgs.builder()
                                                .positionalConstraint("CONTAINS")
                                                .searchString("word")
                                                .fieldToMatch(RuleGroupRuleStatementNotStatementStatementAndStatementStatementByteMatchStatementFieldToMatchArgs.builder()
                                                    .allQueryArguments()
                                                    .build())
                                                .textTransformations(                                                
                                                    RuleGroupRuleStatementNotStatementStatementAndStatementStatementByteMatchStatementTextTransformationArgs.builder()
                                                        .priority(5)
                                                        .type("CMD_LINE")
                                                        .build(),
                                                    RuleGroupRuleStatementNotStatementStatementAndStatementStatementByteMatchStatementTextTransformationArgs.builder()
                                                        .priority(2)
                                                        .type("LOWERCASE")
                                                        .build())
                                                .build())
                                            .build())
                                    .build())
                                .build())
                            .build())
                        .build())
                    .visibilityConfig(RuleGroupRuleVisibilityConfigArgs.builder()
                        .cloudwatchMetricsEnabled(false)
                        .metricName("rule-1")
                        .sampledRequestsEnabled(false)
                        .build())
                    .build(),
                RuleGroupRuleArgs.builder()
                    .name("rule-2")
                    .priority(2)
                    .action(RuleGroupRuleActionArgs.builder()
                        .count()
                        .build())
                    .statement(RuleGroupRuleStatementArgs.builder()
                        .orStatement(RuleGroupRuleStatementOrStatementArgs.builder()
                            .statements(                            
                                RuleGroupRuleStatementOrStatementStatementArgs.builder()
                                    .sqliMatchStatement(RuleGroupRuleStatementOrStatementStatementSqliMatchStatementArgs.builder()
                                        .fieldToMatch(RuleGroupRuleStatementOrStatementStatementSqliMatchStatementFieldToMatchArgs.builder()
                                            .body()
                                            .build())
                                        .textTransformations(                                        
                                            RuleGroupRuleStatementOrStatementStatementSqliMatchStatementTextTransformationArgs.builder()
                                                .priority(5)
                                                .type("URL_DECODE")
                                                .build(),
                                            RuleGroupRuleStatementOrStatementStatementSqliMatchStatementTextTransformationArgs.builder()
                                                .priority(4)
                                                .type("HTML_ENTITY_DECODE")
                                                .build(),
                                            RuleGroupRuleStatementOrStatementStatementSqliMatchStatementTextTransformationArgs.builder()
                                                .priority(3)
                                                .type("COMPRESS_WHITE_SPACE")
                                                .build())
                                        .build())
                                    .build(),
                                RuleGroupRuleStatementOrStatementStatementArgs.builder()
                                    .xssMatchStatement(RuleGroupRuleStatementOrStatementStatementXssMatchStatementArgs.builder()
                                        .fieldToMatch(RuleGroupRuleStatementOrStatementStatementXssMatchStatementFieldToMatchArgs.builder()
                                            .method()
                                            .build())
                                        .textTransformations(RuleGroupRuleStatementOrStatementStatementXssMatchStatementTextTransformationArgs.builder()
                                            .priority(2)
                                            .type("NONE")
                                            .build())
                                        .build())
                                    .build())
                            .build())
                        .build())
                    .visibilityConfig(RuleGroupRuleVisibilityConfigArgs.builder()
                        .cloudwatchMetricsEnabled(false)
                        .metricName("rule-2")
                        .sampledRequestsEnabled(false)
                        .build())
                    .build(),
                RuleGroupRuleArgs.builder()
                    .name("rule-3")
                    .priority(3)
                    .action(RuleGroupRuleActionArgs.builder()
                        .block()
                        .build())
                    .statement(RuleGroupRuleStatementArgs.builder()
                        .sizeConstraintStatement(RuleGroupRuleStatementSizeConstraintStatementArgs.builder()
                            .comparisonOperator("GT")
                            .size(100)
                            .fieldToMatch(RuleGroupRuleStatementSizeConstraintStatementFieldToMatchArgs.builder()
                                .singleQueryArgument(RuleGroupRuleStatementSizeConstraintStatementFieldToMatchSingleQueryArgumentArgs.builder()
                                    .name("username")
                                    .build())
                                .build())
                            .textTransformations(RuleGroupRuleStatementSizeConstraintStatementTextTransformationArgs.builder()
                                .priority(5)
                                .type("NONE")
                                .build())
                            .build())
                        .build())
                    .visibilityConfig(RuleGroupRuleVisibilityConfigArgs.builder()
                        .cloudwatchMetricsEnabled(false)
                        .metricName("rule-3")
                        .sampledRequestsEnabled(false)
                        .build())
                    .build(),
                RuleGroupRuleArgs.builder()
                    .name("rule-4")
                    .priority(4)
                    .action(RuleGroupRuleActionArgs.builder()
                        .block()
                        .build())
                    .statement(RuleGroupRuleStatementArgs.builder()
                        .orStatement(RuleGroupRuleStatementOrStatementArgs.builder()
                            .statements(                            
                                RuleGroupRuleStatementOrStatementStatementArgs.builder()
                                    .ipSetReferenceStatement(RuleGroupRuleStatementOrStatementStatementIpSetReferenceStatementArgs.builder()
                                        .arn(testIpSet.arn())
                                        .build())
                                    .build(),
                                RuleGroupRuleStatementOrStatementStatementArgs.builder()
                                    .regexPatternSetReferenceStatement(RuleGroupRuleStatementOrStatementStatementRegexPatternSetReferenceStatementArgs.builder()
                                        .arn(testRegexPatternSet.arn())
                                        .fieldToMatch(RuleGroupRuleStatementOrStatementStatementRegexPatternSetReferenceStatementFieldToMatchArgs.builder()
                                            .singleHeader(RuleGroupRuleStatementOrStatementStatementRegexPatternSetReferenceStatementFieldToMatchSingleHeaderArgs.builder()
                                                .name("referer")
                                                .build())
                                            .build())
                                        .textTransformations(RuleGroupRuleStatementOrStatementStatementRegexPatternSetReferenceStatementTextTransformationArgs.builder()
                                            .priority(2)
                                            .type("NONE")
                                            .build())
                                        .build())
                                    .build())
                            .build())
                        .build())
                    .visibilityConfig(RuleGroupRuleVisibilityConfigArgs.builder()
                        .cloudwatchMetricsEnabled(false)
                        .metricName("rule-4")
                        .sampledRequestsEnabled(false)
                        .build())
                    .build())
            .visibilityConfig(RuleGroupVisibilityConfigArgs.builder()
                .cloudwatchMetricsEnabled(false)
                .metricName("friendly-metric-name")
                .sampledRequestsEnabled(false)
                .build())
            .tags(Map.ofEntries(
                Map.entry("Name", "example-and-statement"),
                Map.entry("Code", "123456")
            ))
            .build());

    }
}
```
```yaml
resources:
  testIpSet:
    type: aws:wafv2:IpSet
    properties:
      scope: REGIONAL
      ipAddressVersion: IPV4
      addresses:
        - 1.1.1.1/32
        - 2.2.2.2/32
  testRegexPatternSet:
    type: aws:wafv2:RegexPatternSet
    properties:
      scope: REGIONAL
      regularExpressions:
        - regexString: one
  example:
    type: aws:wafv2:RuleGroup
    properties:
      description: An rule group containing all statements
      scope: REGIONAL
      capacity: 500
      rules:
        - name: rule-1
          priority: 1
          action:
            block: {}
          statement:
            notStatement:
              statements:
                - andStatement:
                    statements:
                      - geoMatchStatement:
                          countryCodes:
                            - US
                      - byteMatchStatement:
                          positionalConstraint: CONTAINS
                          searchString: word
                          fieldToMatch:
                            allQueryArguments: {}
                          textTransformations:
                            - priority: 5
                              type: CMD_LINE
                            - priority: 2
                              type: LOWERCASE
          visibilityConfig:
            cloudwatchMetricsEnabled: false
            metricName: rule-1
            sampledRequestsEnabled: false
        - name: rule-2
          priority: 2
          action:
            count: {}
          statement:
            orStatement:
              statements:
                - sqliMatchStatement:
                    fieldToMatch:
                      body: {}
                    textTransformations:
                      - priority: 5
                        type: URL_DECODE
                      - priority: 4
                        type: HTML_ENTITY_DECODE
                      - priority: 3
                        type: COMPRESS_WHITE_SPACE
                - xssMatchStatement:
                    fieldToMatch:
                      method: {}
                    textTransformations:
                      - priority: 2
                        type: NONE
          visibilityConfig:
            cloudwatchMetricsEnabled: false
            metricName: rule-2
            sampledRequestsEnabled: false
        - name: rule-3
          priority: 3
          action:
            block: {}
          statement:
            sizeConstraintStatement:
              comparisonOperator: GT
              size: 100
              fieldToMatch:
                singleQueryArgument:
                  name: username
              textTransformations:
                - priority: 5
                  type: NONE
          visibilityConfig:
            cloudwatchMetricsEnabled: false
            metricName: rule-3
            sampledRequestsEnabled: false
        - name: rule-4
          priority: 4
          action:
            block: {}
          statement:
            orStatement:
              statements:
                - ipSetReferenceStatement:
                    arn: ${testIpSet.arn}
                - regexPatternSetReferenceStatement:
                    arn: ${testRegexPatternSet.arn}
                    fieldToMatch:
                      singleHeader:
                        name: referer
                    textTransformations:
                      - priority: 2
                        type: NONE
          visibilityConfig:
            cloudwatchMetricsEnabled: false
            metricName: rule-4
            sampledRequestsEnabled: false
      visibilityConfig:
        cloudwatchMetricsEnabled: false
        metricName: friendly-metric-name
        sampledRequestsEnabled: false
      tags:
        Name: example-and-statement
        Code: 123456
```
{{% /example %}}
{{% /examples %}}

## Import

WAFv2 Rule Group can be imported using `ID/name/scope` e.g.,

```sh
 $ pulumi import aws:wafv2/ruleGroup:RuleGroup example a1b2c3d4-d5f6-7777-8888-9999aaaabbbbcccc/example/REGIONAL
```

 
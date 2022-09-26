Manages an Amazon OpenSearch Domain.

## Elasticsearch vs. OpenSearch

Amazon OpenSearch Service is the successor to Amazon Elasticsearch Service and supports OpenSearch and legacy Elasticsearch OSS (up to 7.10, the final open source version of the software).

OpenSearch Domain configurations are similar in many ways to Elasticsearch Domain configurations. However, there are important differences including these:

* OpenSearch has `engine_version` while Elasticsearch has `elasticsearch_version`
* Versions are specified differently - _e.g._, `Elasticsearch_7.10` with OpenSearch vs. `7.10` for Elasticsearch.
* `instance_type` argument values end in `search` for OpenSearch vs. `elasticsearch` for Elasticsearch (_e.g._, `t2.micro.search` vs. `t2.micro.elasticsearch`).
* The AWS-managed service-linked role for OpenSearch is called `AWSServiceRoleForAmazonOpenSearchService` instead of `AWSServiceRoleForAmazonElasticsearchService` for Elasticsearch.

There are also some potentially unexpected similarities in configurations:

* ARNs for both are prefaced with `arn:aws:es:`.
* Both OpenSearch and Elasticsearch use assume role policies that refer to the `Principal` `Service` as `es.amazonaws.com`.
* IAM policy actions, such as those you will find in `access_policies`, are prefaced with `es:` for both.

{{% examples %}}
## Example Usage
{{% example %}}
### Basic Usage

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.opensearch.Domain("example", {
    clusterConfig: {
        instanceType: "r4.large.search",
    },
    engineVersion: "Elasticsearch_7.10",
    tags: {
        Domain: "TestDomain",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.opensearch.Domain("example",
    cluster_config=aws.opensearch.DomainClusterConfigArgs(
        instance_type="r4.large.search",
    ),
    engine_version="Elasticsearch_7.10",
    tags={
        "Domain": "TestDomain",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.OpenSearch.Domain("example", new()
    {
        ClusterConfig = new Aws.OpenSearch.Inputs.DomainClusterConfigArgs
        {
            InstanceType = "r4.large.search",
        },
        EngineVersion = "Elasticsearch_7.10",
        Tags = 
        {
            { "Domain", "TestDomain" },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/opensearch"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := opensearch.NewDomain(ctx, "example", &opensearch.DomainArgs{
			ClusterConfig: &opensearch.DomainClusterConfigArgs{
				InstanceType: pulumi.String("r4.large.search"),
			},
			EngineVersion: pulumi.String("Elasticsearch_7.10"),
			Tags: pulumi.StringMap{
				"Domain": pulumi.String("TestDomain"),
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
import com.pulumi.aws.opensearch.Domain;
import com.pulumi.aws.opensearch.DomainArgs;
import com.pulumi.aws.opensearch.inputs.DomainClusterConfigArgs;
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
        var example = new Domain("example", DomainArgs.builder()        
            .clusterConfig(DomainClusterConfigArgs.builder()
                .instanceType("r4.large.search")
                .build())
            .engineVersion("Elasticsearch_7.10")
            .tags(Map.of("Domain", "TestDomain"))
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:opensearch:Domain
    properties:
      clusterConfig:
        instanceType: r4.large.search
      engineVersion: Elasticsearch_7.10
      tags:
        Domain: TestDomain
```
{{% /example %}}
{{% example %}}
### Access Policy

> See also: [`aws.opensearch.DomainPolicy` resource](https://www.terraform.io/docs/providers/aws/r/opensearch_domain_policy.html)

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const config = new pulumi.Config();
const domain = config.get("domain") || "tf-test";
const currentRegion = aws.getRegion({});
const currentCallerIdentity = aws.getCallerIdentity({});
const example = new aws.opensearch.Domain("example", {accessPolicies: Promise.all([currentRegion, currentCallerIdentity]).then(([currentRegion, currentCallerIdentity]) => `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "es:*",
      "Principal": "*",
      "Effect": "Allow",
      "Resource": "arn:aws:es:${currentRegion.name}:${currentCallerIdentity.accountId}:domain/${domain}/*",
      "Condition": {
        "IpAddress": {"aws:SourceIp": ["66.193.100.22/32"]}
      }
    }
  ]
}
`)});
```
```python
import pulumi
import pulumi_aws as aws

config = pulumi.Config()
domain = config.get("domain")
if domain is None:
    domain = "tf-test"
current_region = aws.get_region()
current_caller_identity = aws.get_caller_identity()
example = aws.opensearch.Domain("example", access_policies=f"""{{
  "Version": "2012-10-17",
  "Statement": [
    {{
      "Action": "es:*",
      "Principal": "*",
      "Effect": "Allow",
      "Resource": "arn:aws:es:{current_region.name}:{current_caller_identity.account_id}:domain/{domain}/*",
      "Condition": {{
        "IpAddress": {{"aws:SourceIp": ["66.193.100.22/32"]}}
      }}
    }}
  ]
}}
""")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var config = new Config();
    var domain = config.Get("domain") ?? "tf-test";
    var currentRegion = Aws.GetRegion.Invoke();

    var currentCallerIdentity = Aws.GetCallerIdentity.Invoke();

    var example = new Aws.OpenSearch.Domain("example", new()
    {
        AccessPolicies = Output.Tuple(currentRegion.Apply(getRegionResult => getRegionResult), currentCallerIdentity.Apply(getCallerIdentityResult => getCallerIdentityResult)).Apply(values =>
        {
            var currentRegion = values.Item1;
            var currentCallerIdentity = values.Item2;
            return @$"{{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {{
      ""Action"": ""es:*"",
      ""Principal"": ""*"",
      ""Effect"": ""Allow"",
      ""Resource"": ""arn:aws:es:{currentRegion.Apply(getRegionResult => getRegionResult.Name)}:{currentCallerIdentity.Apply(getCallerIdentityResult => getCallerIdentityResult.AccountId)}:domain/{domain}/*"",
      ""Condition"": {{
        ""IpAddress"": {{""aws:SourceIp"": [""66.193.100.22/32""]}}
      }}
    }}
  ]
}}
";
        }),
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/opensearch"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi/config"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		cfg := config.New(ctx, "")
		domain := "tf-test"
		if param := cfg.Get("domain"); param != "" {
			domain = param
		}
		currentRegion, err := aws.GetRegion(ctx, nil, nil)
		if err != nil {
			return err
		}
		currentCallerIdentity, err := aws.GetCallerIdentity(ctx, nil, nil)
		if err != nil {
			return err
		}
		_, err = opensearch.NewDomain(ctx, "example", &opensearch.DomainArgs{
			AccessPolicies: pulumi.String(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "es:*",
      "Principal": "*",
      "Effect": "Allow",
      "Resource": "arn:aws:es:%v:%v:domain/%v/*",
      "Condition": {
        "IpAddress": {"aws:SourceIp": ["66.193.100.22/32"]}
      }
    }
  ]
}
`, currentRegion.Name, currentCallerIdentity.AccountId, domain)),
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
import com.pulumi.aws.inputs.GetRegionArgs;
import com.pulumi.aws.opensearch.Domain;
import com.pulumi.aws.opensearch.DomainArgs;
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
        final var domain = config.get("domain").orElse("tf-test");
        final var currentRegion = AwsFunctions.getRegion();

        final var currentCallerIdentity = AwsFunctions.getCallerIdentity();

        var example = new Domain("example", DomainArgs.builder()        
            .accessPolicies("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "es:*",
      "Principal": "*",
      "Effect": "Allow",
      "Resource": "arn:aws:es:%s:%s:domain/%s/*",
      "Condition": {
        "IpAddress": {"aws:SourceIp": ["66.193.100.22/32"]}
      }
    }
  ]
}
", currentRegion.applyValue(getRegionResult -> getRegionResult.name()),currentCallerIdentity.applyValue(getCallerIdentityResult -> getCallerIdentityResult.accountId()),domain))
            .build());

    }
}
```
```yaml
configuration:
  domain:
    type: string
    default: tf-test
resources:
  example:
    type: aws:opensearch:Domain
    properties:
      accessPolicies: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": "es:*",
              "Principal": "*",
              "Effect": "Allow",
              "Resource": "arn:aws:es:${currentRegion.name}:${currentCallerIdentity.accountId}:domain/${domain}/*",
              "Condition": {
                "IpAddress": {"aws:SourceIp": ["66.193.100.22/32"]}
              }
            }
          ]
        }
variables:
  currentRegion:
    Fn::Invoke:
      Function: aws:getRegion
      Arguments: {}
  currentCallerIdentity:
    Fn::Invoke:
      Function: aws:getCallerIdentity
      Arguments: {}
```
{{% /example %}}
{{% example %}}
### Log publishing to CloudWatch Logs

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleLogGroup = new aws.cloudwatch.LogGroup("exampleLogGroup", {});
const exampleLogResourcePolicy = new aws.cloudwatch.LogResourcePolicy("exampleLogResourcePolicy", {
    policyName: "example",
    policyDocument: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "es.amazonaws.com"
      },
      "Action": [
        "logs:PutLogEvents",
        "logs:PutLogEventsBatch",
        "logs:CreateLogStream"
      ],
      "Resource": "arn:aws:logs:*"
    }
  ]
}
`,
});
// .. other configuration ...
const exampleDomain = new aws.opensearch.Domain("exampleDomain", {logPublishingOptions: [{
    cloudwatchLogGroupArn: exampleLogGroup.arn,
    logType: "INDEX_SLOW_LOGS",
}]});
```
```python
import pulumi
import pulumi_aws as aws

example_log_group = aws.cloudwatch.LogGroup("exampleLogGroup")
example_log_resource_policy = aws.cloudwatch.LogResourcePolicy("exampleLogResourcePolicy",
    policy_name="example",
    policy_document="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "es.amazonaws.com"
      },
      "Action": [
        "logs:PutLogEvents",
        "logs:PutLogEventsBatch",
        "logs:CreateLogStream"
      ],
      "Resource": "arn:aws:logs:*"
    }
  ]
}
""")
# .. other configuration ...
example_domain = aws.opensearch.Domain("exampleDomain", log_publishing_options=[aws.opensearch.DomainLogPublishingOptionArgs(
    cloudwatch_log_group_arn=example_log_group.arn,
    log_type="INDEX_SLOW_LOGS",
)])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleLogGroup = new Aws.CloudWatch.LogGroup("exampleLogGroup");

    var exampleLogResourcePolicy = new Aws.CloudWatch.LogResourcePolicy("exampleLogResourcePolicy", new()
    {
        PolicyName = "example",
        PolicyDocument = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Effect"": ""Allow"",
      ""Principal"": {
        ""Service"": ""es.amazonaws.com""
      },
      ""Action"": [
        ""logs:PutLogEvents"",
        ""logs:PutLogEventsBatch"",
        ""logs:CreateLogStream""
      ],
      ""Resource"": ""arn:aws:logs:*""
    }
  ]
}
",
    });

    // .. other configuration ...
    var exampleDomain = new Aws.OpenSearch.Domain("exampleDomain", new()
    {
        LogPublishingOptions = new[]
        {
            new Aws.OpenSearch.Inputs.DomainLogPublishingOptionArgs
            {
                CloudwatchLogGroupArn = exampleLogGroup.Arn,
                LogType = "INDEX_SLOW_LOGS",
            },
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudwatch"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/opensearch"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleLogGroup, err := cloudwatch.NewLogGroup(ctx, "exampleLogGroup", nil)
		if err != nil {
			return err
		}
		_, err = cloudwatch.NewLogResourcePolicy(ctx, "exampleLogResourcePolicy", &cloudwatch.LogResourcePolicyArgs{
			PolicyName: pulumi.String("example"),
			PolicyDocument: pulumi.String(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "es.amazonaws.com"
      },
      "Action": [
        "logs:PutLogEvents",
        "logs:PutLogEventsBatch",
        "logs:CreateLogStream"
      ],
      "Resource": "arn:aws:logs:*"
    }
  ]
}
`)),
		})
		if err != nil {
			return err
		}
		_, err = opensearch.NewDomain(ctx, "exampleDomain", &opensearch.DomainArgs{
			LogPublishingOptions: opensearch.DomainLogPublishingOptionArray{
				&opensearch.DomainLogPublishingOptionArgs{
					CloudwatchLogGroupArn: exampleLogGroup.Arn,
					LogType:               pulumi.String("INDEX_SLOW_LOGS"),
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
import com.pulumi.aws.cloudwatch.LogGroup;
import com.pulumi.aws.cloudwatch.LogResourcePolicy;
import com.pulumi.aws.cloudwatch.LogResourcePolicyArgs;
import com.pulumi.aws.opensearch.Domain;
import com.pulumi.aws.opensearch.DomainArgs;
import com.pulumi.aws.opensearch.inputs.DomainLogPublishingOptionArgs;
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
        var exampleLogGroup = new LogGroup("exampleLogGroup");

        var exampleLogResourcePolicy = new LogResourcePolicy("exampleLogResourcePolicy", LogResourcePolicyArgs.builder()        
            .policyName("example")
            .policyDocument("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "es.amazonaws.com"
      },
      "Action": [
        "logs:PutLogEvents",
        "logs:PutLogEventsBatch",
        "logs:CreateLogStream"
      ],
      "Resource": "arn:aws:logs:*"
    }
  ]
}
            """)
            .build());

        var exampleDomain = new Domain("exampleDomain", DomainArgs.builder()        
            .logPublishingOptions(DomainLogPublishingOptionArgs.builder()
                .cloudwatchLogGroupArn(exampleLogGroup.arn())
                .logType("INDEX_SLOW_LOGS")
                .build())
            .build());

    }
}
```
```yaml
resources:
  exampleLogGroup:
    type: aws:cloudwatch:LogGroup
  exampleLogResourcePolicy:
    type: aws:cloudwatch:LogResourcePolicy
    properties:
      policyName: example
      policyDocument: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "Service": "es.amazonaws.com"
              },
              "Action": [
                "logs:PutLogEvents",
                "logs:PutLogEventsBatch",
                "logs:CreateLogStream"
              ],
              "Resource": "arn:aws:logs:*"
            }
          ]
        }
  exampleDomain:
    type: aws:opensearch:Domain
    properties:
      logPublishingOptions:
        - cloudwatchLogGroupArn: ${exampleLogGroup.arn}
          logType: INDEX_SLOW_LOGS
```
{{% /example %}}
{{% example %}}
### VPC based OpenSearch

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const config = new pulumi.Config();
const vpc = config.requireObject("vpc");
const domain = config.get("domain") || "tf-test";
const exampleVpc = aws.ec2.getVpc({
    tags: {
        Name: vpc,
    },
});
const exampleSubnetIds = exampleVpc.then(exampleVpc => aws.ec2.getSubnetIds({
    vpcId: exampleVpc.id,
    tags: {
        Tier: "private",
    },
}));
const currentRegion = aws.getRegion({});
const currentCallerIdentity = aws.getCallerIdentity({});
const exampleSecurityGroup = new aws.ec2.SecurityGroup("exampleSecurityGroup", {
    description: "Managed by Terraform",
    vpcId: exampleVpc.then(exampleVpc => exampleVpc.id),
    ingress: [{
        fromPort: 443,
        toPort: 443,
        protocol: "tcp",
        cidrBlocks: [exampleVpc.then(exampleVpc => exampleVpc.cidrBlock)],
    }],
});
const exampleServiceLinkedRole = new aws.iam.ServiceLinkedRole("exampleServiceLinkedRole", {awsServiceName: "opensearchservice.amazonaws.com"});
const exampleDomain = new aws.opensearch.Domain("exampleDomain", {
    engineVersion: "OpenSearch_1.0",
    clusterConfig: {
        instanceType: "m4.large.search",
        zoneAwarenessEnabled: true,
    },
    vpcOptions: {
        subnetIds: [
            exampleSubnetIds.then(exampleSubnetIds => exampleSubnetIds.ids?[0]),
            exampleSubnetIds.then(exampleSubnetIds => exampleSubnetIds.ids?[1]),
        ],
        securityGroupIds: [exampleSecurityGroup.id],
    },
    advancedOptions: {
        "rest.action.multi.allow_explicit_index": "true",
    },
    accessPolicies: Promise.all([currentRegion, currentCallerIdentity]).then(([currentRegion, currentCallerIdentity]) => `{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Action": "es:*",
			"Principal": "*",
			"Effect": "Allow",
			"Resource": "arn:aws:es:${currentRegion.name}:${currentCallerIdentity.accountId}:domain/${domain}/*"
		}
	]
}
`),
    tags: {
        Domain: "TestDomain",
    },
}, {
    dependsOn: [exampleServiceLinkedRole],
});
```
```python
import pulumi
import pulumi_aws as aws

config = pulumi.Config()
vpc = config.require_object("vpc")
domain = config.get("domain")
if domain is None:
    domain = "tf-test"
example_vpc = aws.ec2.get_vpc(tags={
    "Name": vpc,
})
example_subnet_ids = aws.ec2.get_subnet_ids(vpc_id=example_vpc.id,
    tags={
        "Tier": "private",
    })
current_region = aws.get_region()
current_caller_identity = aws.get_caller_identity()
example_security_group = aws.ec2.SecurityGroup("exampleSecurityGroup",
    description="Managed by Terraform",
    vpc_id=example_vpc.id,
    ingress=[aws.ec2.SecurityGroupIngressArgs(
        from_port=443,
        to_port=443,
        protocol="tcp",
        cidr_blocks=[example_vpc.cidr_block],
    )])
example_service_linked_role = aws.iam.ServiceLinkedRole("exampleServiceLinkedRole", aws_service_name="opensearchservice.amazonaws.com")
example_domain = aws.opensearch.Domain("exampleDomain",
    engine_version="OpenSearch_1.0",
    cluster_config=aws.opensearch.DomainClusterConfigArgs(
        instance_type="m4.large.search",
        zone_awareness_enabled=True,
    ),
    vpc_options=aws.opensearch.DomainVpcOptionsArgs(
        subnet_ids=[
            example_subnet_ids.ids[0],
            example_subnet_ids.ids[1],
        ],
        security_group_ids=[example_security_group.id],
    ),
    advanced_options={
        "rest.action.multi.allow_explicit_index": "true",
    },
    access_policies=f"""{{
	"Version": "2012-10-17",
	"Statement": [
		{{
			"Action": "es:*",
			"Principal": "*",
			"Effect": "Allow",
			"Resource": "arn:aws:es:{current_region.name}:{current_caller_identity.account_id}:domain/{domain}/*"
		}}
	]
}}
""",
    tags={
        "Domain": "TestDomain",
    },
    opts=pulumi.ResourceOptions(depends_on=[example_service_linked_role]))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var config = new Config();
    var vpc = config.RequireObject<dynamic>("vpc");
    var domain = config.Get("domain") ?? "tf-test";
    var exampleVpc = Aws.Ec2.GetVpc.Invoke(new()
    {
        Tags = 
        {
            { "Name", vpc },
        },
    });

    var exampleSubnetIds = Aws.Ec2.GetSubnetIds.Invoke(new()
    {
        VpcId = exampleVpc.Apply(getVpcResult => getVpcResult.Id),
        Tags = 
        {
            { "Tier", "private" },
        },
    });

    var currentRegion = Aws.GetRegion.Invoke();

    var currentCallerIdentity = Aws.GetCallerIdentity.Invoke();

    var exampleSecurityGroup = new Aws.Ec2.SecurityGroup("exampleSecurityGroup", new()
    {
        Description = "Managed by Terraform",
        VpcId = exampleVpc.Apply(getVpcResult => getVpcResult.Id),
        Ingress = new[]
        {
            new Aws.Ec2.Inputs.SecurityGroupIngressArgs
            {
                FromPort = 443,
                ToPort = 443,
                Protocol = "tcp",
                CidrBlocks = new[]
                {
                    exampleVpc.Apply(getVpcResult => getVpcResult.CidrBlock),
                },
            },
        },
    });

    var exampleServiceLinkedRole = new Aws.Iam.ServiceLinkedRole("exampleServiceLinkedRole", new()
    {
        AwsServiceName = "opensearchservice.amazonaws.com",
    });

    var exampleDomain = new Aws.OpenSearch.Domain("exampleDomain", new()
    {
        EngineVersion = "OpenSearch_1.0",
        ClusterConfig = new Aws.OpenSearch.Inputs.DomainClusterConfigArgs
        {
            InstanceType = "m4.large.search",
            ZoneAwarenessEnabled = true,
        },
        VpcOptions = new Aws.OpenSearch.Inputs.DomainVpcOptionsArgs
        {
            SubnetIds = new[]
            {
                exampleSubnetIds.Apply(getSubnetIdsResult => getSubnetIdsResult.Ids[0]),
                exampleSubnetIds.Apply(getSubnetIdsResult => getSubnetIdsResult.Ids[1]),
            },
            SecurityGroupIds = new[]
            {
                exampleSecurityGroup.Id,
            },
        },
        AdvancedOptions = 
        {
            { "rest.action.multi.allow_explicit_index", "true" },
        },
        AccessPolicies = Output.Tuple(currentRegion.Apply(getRegionResult => getRegionResult), currentCallerIdentity.Apply(getCallerIdentityResult => getCallerIdentityResult)).Apply(values =>
        {
            var currentRegion = values.Item1;
            var currentCallerIdentity = values.Item2;
            return @$"{{
	""Version"": ""2012-10-17"",
	""Statement"": [
		{{
			""Action"": ""es:*"",
			""Principal"": ""*"",
			""Effect"": ""Allow"",
			""Resource"": ""arn:aws:es:{currentRegion.Apply(getRegionResult => getRegionResult.Name)}:{currentCallerIdentity.Apply(getCallerIdentityResult => getCallerIdentityResult.AccountId)}:domain/{domain}/*""
		}}
	]
}}
";
        }),
        Tags = 
        {
            { "Domain", "TestDomain" },
        },
    }, new CustomResourceOptions
    {
        DependsOn = new[]
        {
            exampleServiceLinkedRole,
        },
    });

});
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.ec2.Ec2Functions;
import com.pulumi.aws.ec2.inputs.GetVpcArgs;
import com.pulumi.aws.ec2.inputs.GetSubnetIdsArgs;
import com.pulumi.aws.AwsFunctions;
import com.pulumi.aws.inputs.GetRegionArgs;
import com.pulumi.aws.ec2.SecurityGroup;
import com.pulumi.aws.ec2.SecurityGroupArgs;
import com.pulumi.aws.ec2.inputs.SecurityGroupIngressArgs;
import com.pulumi.aws.iam.ServiceLinkedRole;
import com.pulumi.aws.iam.ServiceLinkedRoleArgs;
import com.pulumi.aws.opensearch.Domain;
import com.pulumi.aws.opensearch.DomainArgs;
import com.pulumi.aws.opensearch.inputs.DomainClusterConfigArgs;
import com.pulumi.aws.opensearch.inputs.DomainVpcOptionsArgs;
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
        final var vpc = config.get("vpc");
        final var domain = config.get("domain").orElse("tf-test");
        final var exampleVpc = Ec2Functions.getVpc(GetVpcArgs.builder()
            .tags(Map.of("Name", vpc))
            .build());

        final var exampleSubnetIds = Ec2Functions.getSubnetIds(GetSubnetIdsArgs.builder()
            .vpcId(exampleVpc.applyValue(getVpcResult -> getVpcResult.id()))
            .tags(Map.of("Tier", "private"))
            .build());

        final var currentRegion = AwsFunctions.getRegion();

        final var currentCallerIdentity = AwsFunctions.getCallerIdentity();

        var exampleSecurityGroup = new SecurityGroup("exampleSecurityGroup", SecurityGroupArgs.builder()        
            .description("Managed by Terraform")
            .vpcId(exampleVpc.applyValue(getVpcResult -> getVpcResult.id()))
            .ingress(SecurityGroupIngressArgs.builder()
                .fromPort(443)
                .toPort(443)
                .protocol("tcp")
                .cidrBlocks(exampleVpc.applyValue(getVpcResult -> getVpcResult.cidrBlock()))
                .build())
            .build());

        var exampleServiceLinkedRole = new ServiceLinkedRole("exampleServiceLinkedRole", ServiceLinkedRoleArgs.builder()        
            .awsServiceName("opensearchservice.amazonaws.com")
            .build());

        var exampleDomain = new Domain("exampleDomain", DomainArgs.builder()        
            .engineVersion("OpenSearch_1.0")
            .clusterConfig(DomainClusterConfigArgs.builder()
                .instanceType("m4.large.search")
                .zoneAwarenessEnabled(true)
                .build())
            .vpcOptions(DomainVpcOptionsArgs.builder()
                .subnetIds(                
                    exampleSubnetIds.applyValue(getSubnetIdsResult -> getSubnetIdsResult.ids()[0]),
                    exampleSubnetIds.applyValue(getSubnetIdsResult -> getSubnetIdsResult.ids()[1]))
                .securityGroupIds(exampleSecurityGroup.id())
                .build())
            .advancedOptions(Map.of("rest.action.multi.allow_explicit_index", "true"))
            .accessPolicies("""
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Action": "es:*",
			"Principal": "*",
			"Effect": "Allow",
			"Resource": "arn:aws:es:%s:%s:domain/%s/*"
		}
	]
}
", currentRegion.applyValue(getRegionResult -> getRegionResult.name()),currentCallerIdentity.applyValue(getCallerIdentityResult -> getCallerIdentityResult.accountId()),domain))
            .tags(Map.of("Domain", "TestDomain"))
            .build(), CustomResourceOptions.builder()
                .dependsOn(exampleServiceLinkedRole)
                .build());

    }
}
```
```yaml
configuration:
  vpc:
    type: dynamic
  domain:
    type: string
    default: tf-test
resources:
  exampleSecurityGroup:
    type: aws:ec2:SecurityGroup
    properties:
      description: Managed by Terraform
      vpcId: ${exampleVpc.id}
      ingress:
        - fromPort: 443
          toPort: 443
          protocol: tcp
          cidrBlocks:
            - ${exampleVpc.cidrBlock}
  exampleServiceLinkedRole:
    type: aws:iam:ServiceLinkedRole
    properties:
      awsServiceName: opensearchservice.amazonaws.com
  exampleDomain:
    type: aws:opensearch:Domain
    properties:
      engineVersion: OpenSearch_1.0
      clusterConfig:
        instanceType: m4.large.search
        zoneAwarenessEnabled: true
      vpcOptions:
        subnetIds:
          - ${exampleSubnetIds.ids[0]}
          - ${exampleSubnetIds.ids[1]}
        securityGroupIds:
          - ${exampleSecurityGroup.id}
      advancedOptions:
        rest.action.multi.allow_explicit_index: true
      accessPolicies: |
        {
        	"Version": "2012-10-17",
        	"Statement": [
        		{
        			"Action": "es:*",
        			"Principal": "*",
        			"Effect": "Allow",
        			"Resource": "arn:aws:es:${currentRegion.name}:${currentCallerIdentity.accountId}:domain/${domain}/*"
        		}
        	]
        }
      tags:
        Domain: TestDomain
    options:
      dependson:
        - ${exampleServiceLinkedRole}
variables:
  exampleVpc:
    Fn::Invoke:
      Function: aws:ec2:getVpc
      Arguments:
        tags:
          Name: ${vpc}
  exampleSubnetIds:
    Fn::Invoke:
      Function: aws:ec2:getSubnetIds
      Arguments:
        vpcId: ${exampleVpc.id}
        tags:
          Tier: private
  currentRegion:
    Fn::Invoke:
      Function: aws:getRegion
      Arguments: {}
  currentCallerIdentity:
    Fn::Invoke:
      Function: aws:getCallerIdentity
      Arguments: {}
```
{{% /example %}}
### Enabling fine-grained access control on an existing domain

This example shows two configurations: one to create a domain without fine-grained access control and the second to modify the domain to enable fine-grained access control. For more information, see [Enabling fine-grained access control](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/fgac.html).
{{% example %}}
### First apply

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.opensearch.Domain("example", {
    advancedSecurityOptions: {
        anonymousAuthEnabled: true,
        enabled: false,
        internalUserDatabaseEnabled: true,
        masterUserOptions: {
            masterUserName: "example",
            masterUserPassword: "Barbarbarbar1!",
        },
    },
    clusterConfig: {
        instanceType: "r5.large.search",
    },
    domainEndpointOptions: {
        enforceHttps: true,
        tlsSecurityPolicy: "Policy-Min-TLS-1-2-2019-07",
    },
    ebsOptions: {
        ebsEnabled: true,
        volumeSize: 10,
    },
    encryptAtRest: {
        enabled: true,
    },
    engineVersion: "Elasticsearch_7.1",
    nodeToNodeEncryption: {
        enabled: true,
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.opensearch.Domain("example",
    advanced_security_options=aws.opensearch.DomainAdvancedSecurityOptionsArgs(
        anonymous_auth_enabled=True,
        enabled=False,
        internal_user_database_enabled=True,
        master_user_options=aws.opensearch.DomainAdvancedSecurityOptionsMasterUserOptionsArgs(
            master_user_name="example",
            master_user_password="Barbarbarbar1!",
        ),
    ),
    cluster_config=aws.opensearch.DomainClusterConfigArgs(
        instance_type="r5.large.search",
    ),
    domain_endpoint_options=aws.opensearch.DomainDomainEndpointOptionsArgs(
        enforce_https=True,
        tls_security_policy="Policy-Min-TLS-1-2-2019-07",
    ),
    ebs_options=aws.opensearch.DomainEbsOptionsArgs(
        ebs_enabled=True,
        volume_size=10,
    ),
    encrypt_at_rest=aws.opensearch.DomainEncryptAtRestArgs(
        enabled=True,
    ),
    engine_version="Elasticsearch_7.1",
    node_to_node_encryption=aws.opensearch.DomainNodeToNodeEncryptionArgs(
        enabled=True,
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.OpenSearch.Domain("example", new()
    {
        AdvancedSecurityOptions = new Aws.OpenSearch.Inputs.DomainAdvancedSecurityOptionsArgs
        {
            AnonymousAuthEnabled = true,
            Enabled = false,
            InternalUserDatabaseEnabled = true,
            MasterUserOptions = new Aws.OpenSearch.Inputs.DomainAdvancedSecurityOptionsMasterUserOptionsArgs
            {
                MasterUserName = "example",
                MasterUserPassword = "Barbarbarbar1!",
            },
        },
        ClusterConfig = new Aws.OpenSearch.Inputs.DomainClusterConfigArgs
        {
            InstanceType = "r5.large.search",
        },
        DomainEndpointOptions = new Aws.OpenSearch.Inputs.DomainDomainEndpointOptionsArgs
        {
            EnforceHttps = true,
            TlsSecurityPolicy = "Policy-Min-TLS-1-2-2019-07",
        },
        EbsOptions = new Aws.OpenSearch.Inputs.DomainEbsOptionsArgs
        {
            EbsEnabled = true,
            VolumeSize = 10,
        },
        EncryptAtRest = new Aws.OpenSearch.Inputs.DomainEncryptAtRestArgs
        {
            Enabled = true,
        },
        EngineVersion = "Elasticsearch_7.1",
        NodeToNodeEncryption = new Aws.OpenSearch.Inputs.DomainNodeToNodeEncryptionArgs
        {
            Enabled = true,
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/opensearch"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := opensearch.NewDomain(ctx, "example", &opensearch.DomainArgs{
			AdvancedSecurityOptions: &opensearch.DomainAdvancedSecurityOptionsArgs{
				AnonymousAuthEnabled:        pulumi.Bool(true),
				Enabled:                     pulumi.Bool(false),
				InternalUserDatabaseEnabled: pulumi.Bool(true),
				MasterUserOptions: &opensearch.DomainAdvancedSecurityOptionsMasterUserOptionsArgs{
					MasterUserName:     pulumi.String("example"),
					MasterUserPassword: pulumi.String("Barbarbarbar1!"),
				},
			},
			ClusterConfig: &opensearch.DomainClusterConfigArgs{
				InstanceType: pulumi.String("r5.large.search"),
			},
			DomainEndpointOptions: &opensearch.DomainDomainEndpointOptionsArgs{
				EnforceHttps:      pulumi.Bool(true),
				TlsSecurityPolicy: pulumi.String("Policy-Min-TLS-1-2-2019-07"),
			},
			EbsOptions: &opensearch.DomainEbsOptionsArgs{
				EbsEnabled: pulumi.Bool(true),
				VolumeSize: pulumi.Int(10),
			},
			EncryptAtRest: &opensearch.DomainEncryptAtRestArgs{
				Enabled: pulumi.Bool(true),
			},
			EngineVersion: pulumi.String("Elasticsearch_7.1"),
			NodeToNodeEncryption: &opensearch.DomainNodeToNodeEncryptionArgs{
				Enabled: pulumi.Bool(true),
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
import com.pulumi.aws.opensearch.Domain;
import com.pulumi.aws.opensearch.DomainArgs;
import com.pulumi.aws.opensearch.inputs.DomainAdvancedSecurityOptionsArgs;
import com.pulumi.aws.opensearch.inputs.DomainAdvancedSecurityOptionsMasterUserOptionsArgs;
import com.pulumi.aws.opensearch.inputs.DomainClusterConfigArgs;
import com.pulumi.aws.opensearch.inputs.DomainDomainEndpointOptionsArgs;
import com.pulumi.aws.opensearch.inputs.DomainEbsOptionsArgs;
import com.pulumi.aws.opensearch.inputs.DomainEncryptAtRestArgs;
import com.pulumi.aws.opensearch.inputs.DomainNodeToNodeEncryptionArgs;
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
        var example = new Domain("example", DomainArgs.builder()        
            .advancedSecurityOptions(DomainAdvancedSecurityOptionsArgs.builder()
                .anonymousAuthEnabled(true)
                .enabled(false)
                .internalUserDatabaseEnabled(true)
                .masterUserOptions(DomainAdvancedSecurityOptionsMasterUserOptionsArgs.builder()
                    .masterUserName("example")
                    .masterUserPassword("Barbarbarbar1!")
                    .build())
                .build())
            .clusterConfig(DomainClusterConfigArgs.builder()
                .instanceType("r5.large.search")
                .build())
            .domainEndpointOptions(DomainDomainEndpointOptionsArgs.builder()
                .enforceHttps(true)
                .tlsSecurityPolicy("Policy-Min-TLS-1-2-2019-07")
                .build())
            .ebsOptions(DomainEbsOptionsArgs.builder()
                .ebsEnabled(true)
                .volumeSize(10)
                .build())
            .encryptAtRest(DomainEncryptAtRestArgs.builder()
                .enabled(true)
                .build())
            .engineVersion("Elasticsearch_7.1")
            .nodeToNodeEncryption(DomainNodeToNodeEncryptionArgs.builder()
                .enabled(true)
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:opensearch:Domain
    properties:
      advancedSecurityOptions:
        anonymousAuthEnabled: true
        enabled: false
        internalUserDatabaseEnabled: true
        masterUserOptions:
          masterUserName: example
          masterUserPassword: Barbarbarbar1!
      clusterConfig:
        instanceType: r5.large.search
      domainEndpointOptions:
        enforceHttps: true
        tlsSecurityPolicy: Policy-Min-TLS-1-2-2019-07
      ebsOptions:
        ebsEnabled: true
        volumeSize: 10
      encryptAtRest:
        enabled: true
      engineVersion: Elasticsearch_7.1
      nodeToNodeEncryption:
        enabled: true
```
{{% /example %}}
{{% example %}}
### Second apply

Notice that the only change is `advanced_security_options.0.enabled` is now set to `true`.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.opensearch.Domain("example", {
    advancedSecurityOptions: {
        anonymousAuthEnabled: true,
        enabled: true,
        internalUserDatabaseEnabled: true,
        masterUserOptions: {
            masterUserName: "example",
            masterUserPassword: "Barbarbarbar1!",
        },
    },
    clusterConfig: {
        instanceType: "r5.large.search",
    },
    domainEndpointOptions: {
        enforceHttps: true,
        tlsSecurityPolicy: "Policy-Min-TLS-1-2-2019-07",
    },
    ebsOptions: {
        ebsEnabled: true,
        volumeSize: 10,
    },
    encryptAtRest: {
        enabled: true,
    },
    engineVersion: "Elasticsearch_7.1",
    nodeToNodeEncryption: {
        enabled: true,
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.opensearch.Domain("example",
    advanced_security_options=aws.opensearch.DomainAdvancedSecurityOptionsArgs(
        anonymous_auth_enabled=True,
        enabled=True,
        internal_user_database_enabled=True,
        master_user_options=aws.opensearch.DomainAdvancedSecurityOptionsMasterUserOptionsArgs(
            master_user_name="example",
            master_user_password="Barbarbarbar1!",
        ),
    ),
    cluster_config=aws.opensearch.DomainClusterConfigArgs(
        instance_type="r5.large.search",
    ),
    domain_endpoint_options=aws.opensearch.DomainDomainEndpointOptionsArgs(
        enforce_https=True,
        tls_security_policy="Policy-Min-TLS-1-2-2019-07",
    ),
    ebs_options=aws.opensearch.DomainEbsOptionsArgs(
        ebs_enabled=True,
        volume_size=10,
    ),
    encrypt_at_rest=aws.opensearch.DomainEncryptAtRestArgs(
        enabled=True,
    ),
    engine_version="Elasticsearch_7.1",
    node_to_node_encryption=aws.opensearch.DomainNodeToNodeEncryptionArgs(
        enabled=True,
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.OpenSearch.Domain("example", new()
    {
        AdvancedSecurityOptions = new Aws.OpenSearch.Inputs.DomainAdvancedSecurityOptionsArgs
        {
            AnonymousAuthEnabled = true,
            Enabled = true,
            InternalUserDatabaseEnabled = true,
            MasterUserOptions = new Aws.OpenSearch.Inputs.DomainAdvancedSecurityOptionsMasterUserOptionsArgs
            {
                MasterUserName = "example",
                MasterUserPassword = "Barbarbarbar1!",
            },
        },
        ClusterConfig = new Aws.OpenSearch.Inputs.DomainClusterConfigArgs
        {
            InstanceType = "r5.large.search",
        },
        DomainEndpointOptions = new Aws.OpenSearch.Inputs.DomainDomainEndpointOptionsArgs
        {
            EnforceHttps = true,
            TlsSecurityPolicy = "Policy-Min-TLS-1-2-2019-07",
        },
        EbsOptions = new Aws.OpenSearch.Inputs.DomainEbsOptionsArgs
        {
            EbsEnabled = true,
            VolumeSize = 10,
        },
        EncryptAtRest = new Aws.OpenSearch.Inputs.DomainEncryptAtRestArgs
        {
            Enabled = true,
        },
        EngineVersion = "Elasticsearch_7.1",
        NodeToNodeEncryption = new Aws.OpenSearch.Inputs.DomainNodeToNodeEncryptionArgs
        {
            Enabled = true,
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/opensearch"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := opensearch.NewDomain(ctx, "example", &opensearch.DomainArgs{
			AdvancedSecurityOptions: &opensearch.DomainAdvancedSecurityOptionsArgs{
				AnonymousAuthEnabled:        pulumi.Bool(true),
				Enabled:                     pulumi.Bool(true),
				InternalUserDatabaseEnabled: pulumi.Bool(true),
				MasterUserOptions: &opensearch.DomainAdvancedSecurityOptionsMasterUserOptionsArgs{
					MasterUserName:     pulumi.String("example"),
					MasterUserPassword: pulumi.String("Barbarbarbar1!"),
				},
			},
			ClusterConfig: &opensearch.DomainClusterConfigArgs{
				InstanceType: pulumi.String("r5.large.search"),
			},
			DomainEndpointOptions: &opensearch.DomainDomainEndpointOptionsArgs{
				EnforceHttps:      pulumi.Bool(true),
				TlsSecurityPolicy: pulumi.String("Policy-Min-TLS-1-2-2019-07"),
			},
			EbsOptions: &opensearch.DomainEbsOptionsArgs{
				EbsEnabled: pulumi.Bool(true),
				VolumeSize: pulumi.Int(10),
			},
			EncryptAtRest: &opensearch.DomainEncryptAtRestArgs{
				Enabled: pulumi.Bool(true),
			},
			EngineVersion: pulumi.String("Elasticsearch_7.1"),
			NodeToNodeEncryption: &opensearch.DomainNodeToNodeEncryptionArgs{
				Enabled: pulumi.Bool(true),
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
import com.pulumi.aws.opensearch.Domain;
import com.pulumi.aws.opensearch.DomainArgs;
import com.pulumi.aws.opensearch.inputs.DomainAdvancedSecurityOptionsArgs;
import com.pulumi.aws.opensearch.inputs.DomainAdvancedSecurityOptionsMasterUserOptionsArgs;
import com.pulumi.aws.opensearch.inputs.DomainClusterConfigArgs;
import com.pulumi.aws.opensearch.inputs.DomainDomainEndpointOptionsArgs;
import com.pulumi.aws.opensearch.inputs.DomainEbsOptionsArgs;
import com.pulumi.aws.opensearch.inputs.DomainEncryptAtRestArgs;
import com.pulumi.aws.opensearch.inputs.DomainNodeToNodeEncryptionArgs;
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
        var example = new Domain("example", DomainArgs.builder()        
            .advancedSecurityOptions(DomainAdvancedSecurityOptionsArgs.builder()
                .anonymousAuthEnabled(true)
                .enabled(true)
                .internalUserDatabaseEnabled(true)
                .masterUserOptions(DomainAdvancedSecurityOptionsMasterUserOptionsArgs.builder()
                    .masterUserName("example")
                    .masterUserPassword("Barbarbarbar1!")
                    .build())
                .build())
            .clusterConfig(DomainClusterConfigArgs.builder()
                .instanceType("r5.large.search")
                .build())
            .domainEndpointOptions(DomainDomainEndpointOptionsArgs.builder()
                .enforceHttps(true)
                .tlsSecurityPolicy("Policy-Min-TLS-1-2-2019-07")
                .build())
            .ebsOptions(DomainEbsOptionsArgs.builder()
                .ebsEnabled(true)
                .volumeSize(10)
                .build())
            .encryptAtRest(DomainEncryptAtRestArgs.builder()
                .enabled(true)
                .build())
            .engineVersion("Elasticsearch_7.1")
            .nodeToNodeEncryption(DomainNodeToNodeEncryptionArgs.builder()
                .enabled(true)
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:opensearch:Domain
    properties:
      advancedSecurityOptions:
        anonymousAuthEnabled: true
        enabled: true
        internalUserDatabaseEnabled: true
        masterUserOptions:
          masterUserName: example
          masterUserPassword: Barbarbarbar1!
      clusterConfig:
        instanceType: r5.large.search
      domainEndpointOptions:
        enforceHttps: true
        tlsSecurityPolicy: Policy-Min-TLS-1-2-2019-07
      ebsOptions:
        ebsEnabled: true
        volumeSize: 10
      encryptAtRest:
        enabled: true
      engineVersion: Elasticsearch_7.1
      nodeToNodeEncryption:
        enabled: true
```
{{% /example %}}
{{% /examples %}}

## Import

OpenSearch domains can be imported using the `domain_name`, e.g.,

```sh
 $ pulumi import aws:opensearch/domain:Domain example domain_name
```

 
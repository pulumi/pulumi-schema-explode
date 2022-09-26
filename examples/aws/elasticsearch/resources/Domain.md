Manages an AWS Elasticsearch Domain.

{{% examples %}}
## Example Usage
{{% example %}}
### Basic Usage

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.elasticsearch.Domain("example", {
    clusterConfig: {
        instanceType: "r4.large.elasticsearch",
    },
    elasticsearchVersion: "7.10",
    tags: {
        Domain: "TestDomain",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.elasticsearch.Domain("example",
    cluster_config=aws.elasticsearch.DomainClusterConfigArgs(
        instance_type="r4.large.elasticsearch",
    ),
    elasticsearch_version="7.10",
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
    var example = new Aws.ElasticSearch.Domain("example", new()
    {
        ClusterConfig = new Aws.ElasticSearch.Inputs.DomainClusterConfigArgs
        {
            InstanceType = "r4.large.elasticsearch",
        },
        ElasticsearchVersion = "7.10",
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
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/elasticsearch"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := elasticsearch.NewDomain(ctx, "example", &elasticsearch.DomainArgs{
			ClusterConfig: &elasticsearch.DomainClusterConfigArgs{
				InstanceType: pulumi.String("r4.large.elasticsearch"),
			},
			ElasticsearchVersion: pulumi.String("7.10"),
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
import com.pulumi.aws.elasticsearch.Domain;
import com.pulumi.aws.elasticsearch.DomainArgs;
import com.pulumi.aws.elasticsearch.inputs.DomainClusterConfigArgs;
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
                .instanceType("r4.large.elasticsearch")
                .build())
            .elasticsearchVersion("7.10")
            .tags(Map.of("Domain", "TestDomain"))
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:elasticsearch:Domain
    properties:
      clusterConfig:
        instanceType: r4.large.elasticsearch
      elasticsearchVersion: 7.10
      tags:
        Domain: TestDomain
```
{{% /example %}}
{{% example %}}
### Access Policy

> See also: `aws.elasticsearch.DomainPolicy` resource

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const config = new pulumi.Config();
const domain = config.get("domain") || "tf-test";
const currentRegion = aws.getRegion({});
const currentCallerIdentity = aws.getCallerIdentity({});
const example = new aws.elasticsearch.Domain("example", {accessPolicies: Promise.all([currentRegion, currentCallerIdentity]).then(([currentRegion, currentCallerIdentity]) => `{
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
example = aws.elasticsearch.Domain("example", access_policies=f"""{{
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

    var example = new Aws.ElasticSearch.Domain("example", new()
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
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/elasticsearch"
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
		_, err = elasticsearch.NewDomain(ctx, "example", &elasticsearch.DomainArgs{
			AccessPolicies: pulumi.Any(fmt.Sprintf(`{
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
import com.pulumi.aws.elasticsearch.Domain;
import com.pulumi.aws.elasticsearch.DomainArgs;
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
    type: aws:elasticsearch:Domain
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
### Log Publishing to CloudWatch Logs

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
const exampleDomain = new aws.elasticsearch.Domain("exampleDomain", {logPublishingOptions: [{
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
example_domain = aws.elasticsearch.Domain("exampleDomain", log_publishing_options=[aws.elasticsearch.DomainLogPublishingOptionArgs(
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
    var exampleDomain = new Aws.ElasticSearch.Domain("exampleDomain", new()
    {
        LogPublishingOptions = new[]
        {
            new Aws.ElasticSearch.Inputs.DomainLogPublishingOptionArgs
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
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/elasticsearch"
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
		_, err = elasticsearch.NewDomain(ctx, "exampleDomain", &elasticsearch.DomainArgs{
			LogPublishingOptions: elasticsearch.DomainLogPublishingOptionArray{
				&elasticsearch.DomainLogPublishingOptionArgs{
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
import com.pulumi.aws.elasticsearch.Domain;
import com.pulumi.aws.elasticsearch.DomainArgs;
import com.pulumi.aws.elasticsearch.inputs.DomainLogPublishingOptionArgs;
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
    type: aws:elasticsearch:Domain
    properties:
      logPublishingOptions:
        - cloudwatchLogGroupArn: ${exampleLogGroup.arn}
          logType: INDEX_SLOW_LOGS
```
{{% /example %}}
{{% example %}}
### VPC based ES

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const config = new pulumi.Config();
const vpc = config.requireObject("vpc");
const domain = config.get("domain") || "tf-test";
const selectedVpc = aws.ec2.getVpc({
    tags: {
        Name: vpc,
    },
});
const selectedSubnetIds = selectedVpc.then(selectedVpc => aws.ec2.getSubnetIds({
    vpcId: selectedVpc.id,
    tags: {
        Tier: "private",
    },
}));
const currentRegion = aws.getRegion({});
const currentCallerIdentity = aws.getCallerIdentity({});
const esSecurityGroup = new aws.ec2.SecurityGroup("esSecurityGroup", {
    description: "Managed by Pulumi",
    vpcId: selectedVpc.then(selectedVpc => selectedVpc.id),
    ingress: [{
        fromPort: 443,
        toPort: 443,
        protocol: "tcp",
        cidrBlocks: [selectedVpc.then(selectedVpc => selectedVpc.cidrBlock)],
    }],
});
const esServiceLinkedRole = new aws.iam.ServiceLinkedRole("esServiceLinkedRole", {awsServiceName: "es.amazonaws.com"});
const esDomain = new aws.elasticsearch.Domain("esDomain", {
    elasticsearchVersion: "6.3",
    clusterConfig: {
        instanceType: "m4.large.elasticsearch",
        zoneAwarenessEnabled: true,
    },
    vpcOptions: {
        subnetIds: [
            selectedSubnetIds.then(selectedSubnetIds => selectedSubnetIds.ids?[0]),
            selectedSubnetIds.then(selectedSubnetIds => selectedSubnetIds.ids?[1]),
        ],
        securityGroupIds: [esSecurityGroup.id],
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
    dependsOn: [esServiceLinkedRole],
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
selected_vpc = aws.ec2.get_vpc(tags={
    "Name": vpc,
})
selected_subnet_ids = aws.ec2.get_subnet_ids(vpc_id=selected_vpc.id,
    tags={
        "Tier": "private",
    })
current_region = aws.get_region()
current_caller_identity = aws.get_caller_identity()
es_security_group = aws.ec2.SecurityGroup("esSecurityGroup",
    description="Managed by Pulumi",
    vpc_id=selected_vpc.id,
    ingress=[aws.ec2.SecurityGroupIngressArgs(
        from_port=443,
        to_port=443,
        protocol="tcp",
        cidr_blocks=[selected_vpc.cidr_block],
    )])
es_service_linked_role = aws.iam.ServiceLinkedRole("esServiceLinkedRole", aws_service_name="es.amazonaws.com")
es_domain = aws.elasticsearch.Domain("esDomain",
    elasticsearch_version="6.3",
    cluster_config=aws.elasticsearch.DomainClusterConfigArgs(
        instance_type="m4.large.elasticsearch",
        zone_awareness_enabled=True,
    ),
    vpc_options=aws.elasticsearch.DomainVpcOptionsArgs(
        subnet_ids=[
            selected_subnet_ids.ids[0],
            selected_subnet_ids.ids[1],
        ],
        security_group_ids=[es_security_group.id],
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
    opts=pulumi.ResourceOptions(depends_on=[es_service_linked_role]))
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
    var selectedVpc = Aws.Ec2.GetVpc.Invoke(new()
    {
        Tags = 
        {
            { "Name", vpc },
        },
    });

    var selectedSubnetIds = Aws.Ec2.GetSubnetIds.Invoke(new()
    {
        VpcId = selectedVpc.Apply(getVpcResult => getVpcResult.Id),
        Tags = 
        {
            { "Tier", "private" },
        },
    });

    var currentRegion = Aws.GetRegion.Invoke();

    var currentCallerIdentity = Aws.GetCallerIdentity.Invoke();

    var esSecurityGroup = new Aws.Ec2.SecurityGroup("esSecurityGroup", new()
    {
        Description = "Managed by Pulumi",
        VpcId = selectedVpc.Apply(getVpcResult => getVpcResult.Id),
        Ingress = new[]
        {
            new Aws.Ec2.Inputs.SecurityGroupIngressArgs
            {
                FromPort = 443,
                ToPort = 443,
                Protocol = "tcp",
                CidrBlocks = new[]
                {
                    selectedVpc.Apply(getVpcResult => getVpcResult.CidrBlock),
                },
            },
        },
    });

    var esServiceLinkedRole = new Aws.Iam.ServiceLinkedRole("esServiceLinkedRole", new()
    {
        AwsServiceName = "es.amazonaws.com",
    });

    var esDomain = new Aws.ElasticSearch.Domain("esDomain", new()
    {
        ElasticsearchVersion = "6.3",
        ClusterConfig = new Aws.ElasticSearch.Inputs.DomainClusterConfigArgs
        {
            InstanceType = "m4.large.elasticsearch",
            ZoneAwarenessEnabled = true,
        },
        VpcOptions = new Aws.ElasticSearch.Inputs.DomainVpcOptionsArgs
        {
            SubnetIds = new[]
            {
                selectedSubnetIds.Apply(getSubnetIdsResult => getSubnetIdsResult.Ids[0]),
                selectedSubnetIds.Apply(getSubnetIdsResult => getSubnetIdsResult.Ids[1]),
            },
            SecurityGroupIds = new[]
            {
                esSecurityGroup.Id,
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
            esServiceLinkedRole,
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
import com.pulumi.aws.elasticsearch.Domain;
import com.pulumi.aws.elasticsearch.DomainArgs;
import com.pulumi.aws.elasticsearch.inputs.DomainClusterConfigArgs;
import com.pulumi.aws.elasticsearch.inputs.DomainVpcOptionsArgs;
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
        final var selectedVpc = Ec2Functions.getVpc(GetVpcArgs.builder()
            .tags(Map.of("Name", vpc))
            .build());

        final var selectedSubnetIds = Ec2Functions.getSubnetIds(GetSubnetIdsArgs.builder()
            .vpcId(selectedVpc.applyValue(getVpcResult -> getVpcResult.id()))
            .tags(Map.of("Tier", "private"))
            .build());

        final var currentRegion = AwsFunctions.getRegion();

        final var currentCallerIdentity = AwsFunctions.getCallerIdentity();

        var esSecurityGroup = new SecurityGroup("esSecurityGroup", SecurityGroupArgs.builder()        
            .description("Managed by Pulumi")
            .vpcId(selectedVpc.applyValue(getVpcResult -> getVpcResult.id()))
            .ingress(SecurityGroupIngressArgs.builder()
                .fromPort(443)
                .toPort(443)
                .protocol("tcp")
                .cidrBlocks(selectedVpc.applyValue(getVpcResult -> getVpcResult.cidrBlock()))
                .build())
            .build());

        var esServiceLinkedRole = new ServiceLinkedRole("esServiceLinkedRole", ServiceLinkedRoleArgs.builder()        
            .awsServiceName("es.amazonaws.com")
            .build());

        var esDomain = new Domain("esDomain", DomainArgs.builder()        
            .elasticsearchVersion("6.3")
            .clusterConfig(DomainClusterConfigArgs.builder()
                .instanceType("m4.large.elasticsearch")
                .zoneAwarenessEnabled(true)
                .build())
            .vpcOptions(DomainVpcOptionsArgs.builder()
                .subnetIds(                
                    selectedSubnetIds.applyValue(getSubnetIdsResult -> getSubnetIdsResult.ids()[0]),
                    selectedSubnetIds.applyValue(getSubnetIdsResult -> getSubnetIdsResult.ids()[1]))
                .securityGroupIds(esSecurityGroup.id())
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
                .dependsOn(esServiceLinkedRole)
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
  esSecurityGroup:
    type: aws:ec2:SecurityGroup
    properties:
      description: Managed by Pulumi
      vpcId: ${selectedVpc.id}
      ingress:
        - fromPort: 443
          toPort: 443
          protocol: tcp
          cidrBlocks:
            - ${selectedVpc.cidrBlock}
  esServiceLinkedRole:
    type: aws:iam:ServiceLinkedRole
    properties:
      awsServiceName: es.amazonaws.com
  esDomain:
    type: aws:elasticsearch:Domain
    properties:
      elasticsearchVersion: 6.3
      clusterConfig:
        instanceType: m4.large.elasticsearch
        zoneAwarenessEnabled: true
      vpcOptions:
        subnetIds:
          - ${selectedSubnetIds.ids[0]}
          - ${selectedSubnetIds.ids[1]}
        securityGroupIds:
          - ${esSecurityGroup.id}
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
        - ${esServiceLinkedRole}
variables:
  selectedVpc:
    Fn::Invoke:
      Function: aws:ec2:getVpc
      Arguments:
        tags:
          Name: ${vpc}
  selectedSubnetIds:
    Fn::Invoke:
      Function: aws:ec2:getSubnetIds
      Arguments:
        vpcId: ${selectedVpc.id}
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
{{% /examples %}}

## Import

Elasticsearch domains can be imported using the `domain_name`, e.g.,

```sh
 $ pulumi import aws:elasticsearch/domain:Domain example domain_name
```

 
Provides an independent configuration resource for S3 bucket [replication configuration](http://docs.aws.amazon.com/AmazonS3/latest/dev/crr.html).

> **NOTE:** S3 Buckets only support a single replication configuration. Declaring multiple `aws.s3.BucketReplicationConfig` resources to the same S3 Bucket will cause a perpetual difference in configuration.

{{% examples %}}
## Example Usage
{{% example %}}
### Using replication configuration

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const central = new aws.Provider("central", {region: "eu-central-1"});
const replicationRole = new aws.iam.Role("replicationRole", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
`});
const destinationBucketV2 = new aws.s3.BucketV2("destinationBucketV2", {});
const sourceBucketV2 = new aws.s3.BucketV2("sourceBucketV2", {}, {
    provider: aws.central,
});
const replicationPolicy = new aws.iam.Policy("replicationPolicy", {policy: pulumi.interpolate`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:GetReplicationConfiguration",
        "s3:ListBucket"
      ],
      "Effect": "Allow",
      "Resource": [
        "${sourceBucketV2.arn}"
      ]
    },
    {
      "Action": [
        "s3:GetObjectVersionForReplication",
        "s3:GetObjectVersionAcl",
         "s3:GetObjectVersionTagging"
      ],
      "Effect": "Allow",
      "Resource": [
        "${sourceBucketV2.arn}/*"
      ]
    },
    {
      "Action": [
        "s3:ReplicateObject",
        "s3:ReplicateDelete",
        "s3:ReplicateTags"
      ],
      "Effect": "Allow",
      "Resource": "${destinationBucketV2.arn}/*"
    }
  ]
}
`});
const replicationRolePolicyAttachment = new aws.iam.RolePolicyAttachment("replicationRolePolicyAttachment", {
    role: replicationRole.name,
    policyArn: replicationPolicy.arn,
});
const destinationBucketVersioningV2 = new aws.s3.BucketVersioningV2("destinationBucketVersioningV2", {
    bucket: destinationBucketV2.id,
    versioningConfiguration: {
        status: "Enabled",
    },
});
const sourceBucketAcl = new aws.s3.BucketAclV2("sourceBucketAcl", {
    bucket: sourceBucketV2.id,
    acl: "private",
}, {
    provider: aws.central,
});
const sourceBucketVersioningV2 = new aws.s3.BucketVersioningV2("sourceBucketVersioningV2", {
    bucket: sourceBucketV2.id,
    versioningConfiguration: {
        status: "Enabled",
    },
}, {
    provider: aws.central,
});
const replicationBucketReplicationConfig = new aws.s3.BucketReplicationConfig("replicationBucketReplicationConfig", {
    role: replicationRole.arn,
    bucket: sourceBucketV2.id,
    rules: [{
        id: "foobar",
        filter: {
            prefix: "foo",
        },
        status: "Enabled",
        destination: {
            bucket: destinationBucketV2.arn,
            storageClass: "STANDARD",
        },
    }],
}, {
    provider: aws.central,
    dependsOn: [sourceBucketVersioningV2],
});
```
```python
import pulumi
import pulumi_aws as aws

central = aws.Provider("central", region="eu-central-1")
replication_role = aws.iam.Role("replicationRole", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
""")
destination_bucket_v2 = aws.s3.BucketV2("destinationBucketV2")
source_bucket_v2 = aws.s3.BucketV2("sourceBucketV2", opts=pulumi.ResourceOptions(provider=aws["central"]))
replication_policy = aws.iam.Policy("replicationPolicy", policy=pulumi.Output.all(source_bucket_v2.arn, source_bucket_v2.arn, destination_bucket_v2.arn).apply(lambda sourceBucketV2Arn, sourceBucketV2Arn1, destinationBucketV2Arn: f"""{{
  "Version": "2012-10-17",
  "Statement": [
    {{
      "Action": [
        "s3:GetReplicationConfiguration",
        "s3:ListBucket"
      ],
      "Effect": "Allow",
      "Resource": [
        "{source_bucket_v2_arn}"
      ]
    }},
    {{
      "Action": [
        "s3:GetObjectVersionForReplication",
        "s3:GetObjectVersionAcl",
         "s3:GetObjectVersionTagging"
      ],
      "Effect": "Allow",
      "Resource": [
        "{source_bucket_v2_arn1}/*"
      ]
    }},
    {{
      "Action": [
        "s3:ReplicateObject",
        "s3:ReplicateDelete",
        "s3:ReplicateTags"
      ],
      "Effect": "Allow",
      "Resource": "{destination_bucket_v2_arn}/*"
    }}
  ]
}}
"""))
replication_role_policy_attachment = aws.iam.RolePolicyAttachment("replicationRolePolicyAttachment",
    role=replication_role.name,
    policy_arn=replication_policy.arn)
destination_bucket_versioning_v2 = aws.s3.BucketVersioningV2("destinationBucketVersioningV2",
    bucket=destination_bucket_v2.id,
    versioning_configuration=aws.s3.BucketVersioningV2VersioningConfigurationArgs(
        status="Enabled",
    ))
source_bucket_acl = aws.s3.BucketAclV2("sourceBucketAcl",
    bucket=source_bucket_v2.id,
    acl="private",
    opts=pulumi.ResourceOptions(provider=aws["central"]))
source_bucket_versioning_v2 = aws.s3.BucketVersioningV2("sourceBucketVersioningV2",
    bucket=source_bucket_v2.id,
    versioning_configuration=aws.s3.BucketVersioningV2VersioningConfigurationArgs(
        status="Enabled",
    ),
    opts=pulumi.ResourceOptions(provider=aws["central"]))
replication_bucket_replication_config = aws.s3.BucketReplicationConfig("replicationBucketReplicationConfig",
    role=replication_role.arn,
    bucket=source_bucket_v2.id,
    rules=[aws.s3.BucketReplicationConfigRuleArgs(
        id="foobar",
        filter=aws.s3.BucketReplicationConfigRuleFilterArgs(
            prefix="foo",
        ),
        status="Enabled",
        destination=aws.s3.BucketReplicationConfigRuleDestinationArgs(
            bucket=destination_bucket_v2.arn,
            storage_class="STANDARD",
        ),
    )],
    opts=pulumi.ResourceOptions(provider=aws["central"],
        depends_on=[source_bucket_versioning_v2]))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var central = new Aws.Provider("central", new()
    {
        Region = "eu-central-1",
    });

    var replicationRole = new Aws.Iam.Role("replicationRole", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Action"": ""sts:AssumeRole"",
      ""Principal"": {
        ""Service"": ""s3.amazonaws.com""
      },
      ""Effect"": ""Allow"",
      ""Sid"": """"
    }
  ]
}
",
    });

    var destinationBucketV2 = new Aws.S3.BucketV2("destinationBucketV2");

    var sourceBucketV2 = new Aws.S3.BucketV2("sourceBucketV2", new()
    {
    }, new CustomResourceOptions
    {
        Provider = aws.Central,
    });

    var replicationPolicy = new Aws.Iam.Policy("replicationPolicy", new()
    {
        PolicyDocument = Output.Tuple(sourceBucketV2.Arn, sourceBucketV2.Arn, destinationBucketV2.Arn).Apply(values =>
        {
            var sourceBucketV2Arn = values.Item1;
            var sourceBucketV2Arn1 = values.Item2;
            var destinationBucketV2Arn = values.Item3;
            return @$"{{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {{
      ""Action"": [
        ""s3:GetReplicationConfiguration"",
        ""s3:ListBucket""
      ],
      ""Effect"": ""Allow"",
      ""Resource"": [
        ""{sourceBucketV2Arn}""
      ]
    }},
    {{
      ""Action"": [
        ""s3:GetObjectVersionForReplication"",
        ""s3:GetObjectVersionAcl"",
         ""s3:GetObjectVersionTagging""
      ],
      ""Effect"": ""Allow"",
      ""Resource"": [
        ""{sourceBucketV2Arn1}/*""
      ]
    }},
    {{
      ""Action"": [
        ""s3:ReplicateObject"",
        ""s3:ReplicateDelete"",
        ""s3:ReplicateTags""
      ],
      ""Effect"": ""Allow"",
      ""Resource"": ""{destinationBucketV2Arn}/*""
    }}
  ]
}}
";
        }),
    });

    var replicationRolePolicyAttachment = new Aws.Iam.RolePolicyAttachment("replicationRolePolicyAttachment", new()
    {
        Role = replicationRole.Name,
        PolicyArn = replicationPolicy.Arn,
    });

    var destinationBucketVersioningV2 = new Aws.S3.BucketVersioningV2("destinationBucketVersioningV2", new()
    {
        Bucket = destinationBucketV2.Id,
        VersioningConfiguration = new Aws.S3.Inputs.BucketVersioningV2VersioningConfigurationArgs
        {
            Status = "Enabled",
        },
    });

    var sourceBucketAcl = new Aws.S3.BucketAclV2("sourceBucketAcl", new()
    {
        Bucket = sourceBucketV2.Id,
        Acl = "private",
    }, new CustomResourceOptions
    {
        Provider = aws.Central,
    });

    var sourceBucketVersioningV2 = new Aws.S3.BucketVersioningV2("sourceBucketVersioningV2", new()
    {
        Bucket = sourceBucketV2.Id,
        VersioningConfiguration = new Aws.S3.Inputs.BucketVersioningV2VersioningConfigurationArgs
        {
            Status = "Enabled",
        },
    }, new CustomResourceOptions
    {
        Provider = aws.Central,
    });

    var replicationBucketReplicationConfig = new Aws.S3.BucketReplicationConfig("replicationBucketReplicationConfig", new()
    {
        Role = replicationRole.Arn,
        Bucket = sourceBucketV2.Id,
        Rules = new[]
        {
            new Aws.S3.Inputs.BucketReplicationConfigRuleArgs
            {
                Id = "foobar",
                Filter = new Aws.S3.Inputs.BucketReplicationConfigRuleFilterArgs
                {
                    Prefix = "foo",
                },
                Status = "Enabled",
                Destination = new Aws.S3.Inputs.BucketReplicationConfigRuleDestinationArgs
                {
                    Bucket = destinationBucketV2.Arn,
                    StorageClass = "STANDARD",
                },
            },
        },
    }, new CustomResourceOptions
    {
        Provider = aws.Central,
        DependsOn = new[]
        {
            sourceBucketVersioningV2,
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := aws.NewProvider(ctx, "central", &aws.ProviderArgs{
			Region: pulumi.String("eu-central-1"),
		})
		if err != nil {
			return err
		}
		replicationRole, err := iam.NewRole(ctx, "replicationRole", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
`)),
		})
		if err != nil {
			return err
		}
		destinationBucketV2, err := s3.NewBucketV2(ctx, "destinationBucketV2", nil)
		if err != nil {
			return err
		}
		sourceBucketV2, err := s3.NewBucketV2(ctx, "sourceBucketV2", nil, pulumi.Provider(aws.Central))
		if err != nil {
			return err
		}
		replicationPolicy, err := iam.NewPolicy(ctx, "replicationPolicy", &iam.PolicyArgs{
			Policy: pulumi.All(sourceBucketV2.Arn, sourceBucketV2.Arn, destinationBucketV2.Arn).ApplyT(func(_args []interface{}) (string, error) {
				sourceBucketV2Arn := _args[0].(string)
				sourceBucketV2Arn1 := _args[1].(string)
				destinationBucketV2Arn := _args[2].(string)
				return fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:GetReplicationConfiguration",
        "s3:ListBucket"
      ],
      "Effect": "Allow",
      "Resource": [
        "%v"
      ]
    },
    {
      "Action": [
        "s3:GetObjectVersionForReplication",
        "s3:GetObjectVersionAcl",
         "s3:GetObjectVersionTagging"
      ],
      "Effect": "Allow",
      "Resource": [
        "%v/*"
      ]
    },
    {
      "Action": [
        "s3:ReplicateObject",
        "s3:ReplicateDelete",
        "s3:ReplicateTags"
      ],
      "Effect": "Allow",
      "Resource": "%v/*"
    }
  ]
}
`, sourceBucketV2Arn, sourceBucketV2Arn1, destinationBucketV2Arn), nil
			}).(pulumi.StringOutput),
		})
		if err != nil {
			return err
		}
		_, err = iam.NewRolePolicyAttachment(ctx, "replicationRolePolicyAttachment", &iam.RolePolicyAttachmentArgs{
			Role:      replicationRole.Name,
			PolicyArn: replicationPolicy.Arn,
		})
		if err != nil {
			return err
		}
		_, err = s3.NewBucketVersioningV2(ctx, "destinationBucketVersioningV2", &s3.BucketVersioningV2Args{
			Bucket: destinationBucketV2.ID(),
			VersioningConfiguration: &s3.BucketVersioningV2VersioningConfigurationArgs{
				Status: pulumi.String("Enabled"),
			},
		})
		if err != nil {
			return err
		}
		_, err = s3.NewBucketAclV2(ctx, "sourceBucketAcl", &s3.BucketAclV2Args{
			Bucket: sourceBucketV2.ID(),
			Acl:    pulumi.String("private"),
		}, pulumi.Provider(aws.Central))
		if err != nil {
			return err
		}
		sourceBucketVersioningV2, err := s3.NewBucketVersioningV2(ctx, "sourceBucketVersioningV2", &s3.BucketVersioningV2Args{
			Bucket: sourceBucketV2.ID(),
			VersioningConfiguration: &s3.BucketVersioningV2VersioningConfigurationArgs{
				Status: pulumi.String("Enabled"),
			},
		}, pulumi.Provider(aws.Central))
		if err != nil {
			return err
		}
		_, err = s3.NewBucketReplicationConfig(ctx, "replicationBucketReplicationConfig", &s3.BucketReplicationConfigArgs{
			Role:   replicationRole.Arn,
			Bucket: sourceBucketV2.ID(),
			Rules: s3.BucketReplicationConfigRuleArray{
				&s3.BucketReplicationConfigRuleArgs{
					Id: pulumi.String("foobar"),
					Filter: &s3.BucketReplicationConfigRuleFilterArgs{
						Prefix: pulumi.String("foo"),
					},
					Status: pulumi.String("Enabled"),
					Destination: &s3.BucketReplicationConfigRuleDestinationArgs{
						Bucket:       destinationBucketV2.Arn,
						StorageClass: pulumi.String("STANDARD"),
					},
				},
			},
		}, pulumi.Provider(aws.Central), pulumi.DependsOn([]pulumi.Resource{
			sourceBucketVersioningV2,
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
import com.pulumi.aws.Provider;
import com.pulumi.aws.ProviderArgs;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.s3.BucketV2Args;
import com.pulumi.aws.iam.Policy;
import com.pulumi.aws.iam.PolicyArgs;
import com.pulumi.aws.iam.RolePolicyAttachment;
import com.pulumi.aws.iam.RolePolicyAttachmentArgs;
import com.pulumi.aws.s3.BucketVersioningV2;
import com.pulumi.aws.s3.BucketVersioningV2Args;
import com.pulumi.aws.s3.inputs.BucketVersioningV2VersioningConfigurationArgs;
import com.pulumi.aws.s3.BucketAclV2;
import com.pulumi.aws.s3.BucketAclV2Args;
import com.pulumi.aws.s3.BucketReplicationConfig;
import com.pulumi.aws.s3.BucketReplicationConfigArgs;
import com.pulumi.aws.s3.inputs.BucketReplicationConfigRuleArgs;
import com.pulumi.aws.s3.inputs.BucketReplicationConfigRuleFilterArgs;
import com.pulumi.aws.s3.inputs.BucketReplicationConfigRuleDestinationArgs;
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
        var central = new Provider("central", ProviderArgs.builder()        
            .region("eu-central-1")
            .build());

        var replicationRole = new Role("replicationRole", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
            """)
            .build());

        var destinationBucketV2 = new BucketV2("destinationBucketV2");

        var sourceBucketV2 = new BucketV2("sourceBucketV2", BucketV2Args.Empty, CustomResourceOptions.builder()
            .provider(aws.central())
            .build());

        var replicationPolicy = new Policy("replicationPolicy", PolicyArgs.builder()        
            .policy(Output.tuple(sourceBucketV2.arn(), sourceBucketV2.arn(), destinationBucketV2.arn()).applyValue(values -> {
                var sourceBucketV2Arn = values.t1;
                var sourceBucketV2Arn1 = values.t2;
                var destinationBucketV2Arn = values.t3;
                return """
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:GetReplicationConfiguration",
        "s3:ListBucket"
      ],
      "Effect": "Allow",
      "Resource": [
        "%s"
      ]
    },
    {
      "Action": [
        "s3:GetObjectVersionForReplication",
        "s3:GetObjectVersionAcl",
         "s3:GetObjectVersionTagging"
      ],
      "Effect": "Allow",
      "Resource": [
        "%s/*"
      ]
    },
    {
      "Action": [
        "s3:ReplicateObject",
        "s3:ReplicateDelete",
        "s3:ReplicateTags"
      ],
      "Effect": "Allow",
      "Resource": "%s/*"
    }
  ]
}
", sourceBucketV2Arn,sourceBucketV2Arn1,destinationBucketV2Arn);
            }))
            .build());

        var replicationRolePolicyAttachment = new RolePolicyAttachment("replicationRolePolicyAttachment", RolePolicyAttachmentArgs.builder()        
            .role(replicationRole.name())
            .policyArn(replicationPolicy.arn())
            .build());

        var destinationBucketVersioningV2 = new BucketVersioningV2("destinationBucketVersioningV2", BucketVersioningV2Args.builder()        
            .bucket(destinationBucketV2.id())
            .versioningConfiguration(BucketVersioningV2VersioningConfigurationArgs.builder()
                .status("Enabled")
                .build())
            .build());

        var sourceBucketAcl = new BucketAclV2("sourceBucketAcl", BucketAclV2Args.builder()        
            .bucket(sourceBucketV2.id())
            .acl("private")
            .build(), CustomResourceOptions.builder()
                .provider(aws.central())
                .build());

        var sourceBucketVersioningV2 = new BucketVersioningV2("sourceBucketVersioningV2", BucketVersioningV2Args.builder()        
            .bucket(sourceBucketV2.id())
            .versioningConfiguration(BucketVersioningV2VersioningConfigurationArgs.builder()
                .status("Enabled")
                .build())
            .build(), CustomResourceOptions.builder()
                .provider(aws.central())
                .build());

        var replicationBucketReplicationConfig = new BucketReplicationConfig("replicationBucketReplicationConfig", BucketReplicationConfigArgs.builder()        
            .role(replicationRole.arn())
            .bucket(sourceBucketV2.id())
            .rules(BucketReplicationConfigRuleArgs.builder()
                .id("foobar")
                .filter(BucketReplicationConfigRuleFilterArgs.builder()
                    .prefix("foo")
                    .build())
                .status("Enabled")
                .destination(BucketReplicationConfigRuleDestinationArgs.builder()
                    .bucket(destinationBucketV2.arn())
                    .storageClass("STANDARD")
                    .build())
                .build())
            .build(), CustomResourceOptions.builder()
                .provider(aws.central())
                .dependsOn(sourceBucketVersioningV2)
                .build());

    }
}
```
```yaml
resources:
  central:
    type: pulumi:providers:aws
    properties:
      region: eu-central-1
  replicationRole:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Principal": {
                "Service": "s3.amazonaws.com"
              },
              "Effect": "Allow",
              "Sid": ""
            }
          ]
        }
  replicationPolicy:
    type: aws:iam:Policy
    properties:
      policy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": [
                "s3:GetReplicationConfiguration",
                "s3:ListBucket"
              ],
              "Effect": "Allow",
              "Resource": [
                "${sourceBucketV2.arn}"
              ]
            },
            {
              "Action": [
                "s3:GetObjectVersionForReplication",
                "s3:GetObjectVersionAcl",
                 "s3:GetObjectVersionTagging"
              ],
              "Effect": "Allow",
              "Resource": [
                "${sourceBucketV2.arn}/*"
              ]
            },
            {
              "Action": [
                "s3:ReplicateObject",
                "s3:ReplicateDelete",
                "s3:ReplicateTags"
              ],
              "Effect": "Allow",
              "Resource": "${destinationBucketV2.arn}/*"
            }
          ]
        }
  replicationRolePolicyAttachment:
    type: aws:iam:RolePolicyAttachment
    properties:
      role: ${replicationRole.name}
      policyArn: ${replicationPolicy.arn}
  destinationBucketV2:
    type: aws:s3:BucketV2
  destinationBucketVersioningV2:
    type: aws:s3:BucketVersioningV2
    properties:
      bucket: ${destinationBucketV2.id}
      versioningConfiguration:
        status: Enabled
  sourceBucketV2:
    type: aws:s3:BucketV2
    options:
      provider: ${aws.central}
  sourceBucketAcl:
    type: aws:s3:BucketAclV2
    properties:
      bucket: ${sourceBucketV2.id}
      acl: private
    options:
      provider: ${aws.central}
  sourceBucketVersioningV2:
    type: aws:s3:BucketVersioningV2
    properties:
      bucket: ${sourceBucketV2.id}
      versioningConfiguration:
        status: Enabled
    options:
      provider: ${aws.central}
  replicationBucketReplicationConfig:
    type: aws:s3:BucketReplicationConfig
    properties:
      role: ${replicationRole.arn}
      bucket: ${sourceBucketV2.id}
      rules:
        - id: foobar
          filter:
            prefix: foo
          status: Enabled
          destination:
            bucket: ${destinationBucketV2.arn}
            storageClass: STANDARD
    options:
      provider: ${aws.central}
      dependson:
        - ${sourceBucketVersioningV2}
```
{{% /example %}}
{{% example %}}
### Bi-Directional Replication

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// ... other configuration ...
const eastBucketV2 = new aws.s3.BucketV2("eastBucketV2", {});
const eastBucketVersioningV2 = new aws.s3.BucketVersioningV2("eastBucketVersioningV2", {
    bucket: eastBucketV2.id,
    versioningConfiguration: {
        status: "Enabled",
    },
});
const westBucketV2 = new aws.s3.BucketV2("westBucketV2", {}, {
    provider: aws.west,
});
const westBucketVersioningV2 = new aws.s3.BucketVersioningV2("westBucketVersioningV2", {
    bucket: westBucketV2.id,
    versioningConfiguration: {
        status: "Enabled",
    },
}, {
    provider: aws.west,
});
const eastToWest = new aws.s3.BucketReplicationConfig("eastToWest", {
    role: aws_iam_role.east_replication.arn,
    bucket: eastBucketV2.id,
    rules: [{
        id: "foobar",
        filter: {
            prefix: "foo",
        },
        status: "Enabled",
        destination: {
            bucket: westBucketV2.arn,
            storageClass: "STANDARD",
        },
    }],
}, {
    dependsOn: [eastBucketVersioningV2],
});
const westToEast = new aws.s3.BucketReplicationConfig("westToEast", {
    role: aws_iam_role.west_replication.arn,
    bucket: westBucketV2.id,
    rules: [{
        id: "foobar",
        filter: {
            prefix: "foo",
        },
        status: "Enabled",
        destination: {
            bucket: eastBucketV2.arn,
            storageClass: "STANDARD",
        },
    }],
}, {
    provider: aws.west,
    dependsOn: [westBucketVersioningV2],
});
```
```python
import pulumi
import pulumi_aws as aws

# ... other configuration ...
east_bucket_v2 = aws.s3.BucketV2("eastBucketV2")
east_bucket_versioning_v2 = aws.s3.BucketVersioningV2("eastBucketVersioningV2",
    bucket=east_bucket_v2.id,
    versioning_configuration=aws.s3.BucketVersioningV2VersioningConfigurationArgs(
        status="Enabled",
    ))
west_bucket_v2 = aws.s3.BucketV2("westBucketV2", opts=pulumi.ResourceOptions(provider=aws["west"]))
west_bucket_versioning_v2 = aws.s3.BucketVersioningV2("westBucketVersioningV2",
    bucket=west_bucket_v2.id,
    versioning_configuration=aws.s3.BucketVersioningV2VersioningConfigurationArgs(
        status="Enabled",
    ),
    opts=pulumi.ResourceOptions(provider=aws["west"]))
east_to_west = aws.s3.BucketReplicationConfig("eastToWest",
    role=aws_iam_role["east_replication"]["arn"],
    bucket=east_bucket_v2.id,
    rules=[aws.s3.BucketReplicationConfigRuleArgs(
        id="foobar",
        filter=aws.s3.BucketReplicationConfigRuleFilterArgs(
            prefix="foo",
        ),
        status="Enabled",
        destination=aws.s3.BucketReplicationConfigRuleDestinationArgs(
            bucket=west_bucket_v2.arn,
            storage_class="STANDARD",
        ),
    )],
    opts=pulumi.ResourceOptions(depends_on=[east_bucket_versioning_v2]))
west_to_east = aws.s3.BucketReplicationConfig("westToEast",
    role=aws_iam_role["west_replication"]["arn"],
    bucket=west_bucket_v2.id,
    rules=[aws.s3.BucketReplicationConfigRuleArgs(
        id="foobar",
        filter=aws.s3.BucketReplicationConfigRuleFilterArgs(
            prefix="foo",
        ),
        status="Enabled",
        destination=aws.s3.BucketReplicationConfigRuleDestinationArgs(
            bucket=east_bucket_v2.arn,
            storage_class="STANDARD",
        ),
    )],
    opts=pulumi.ResourceOptions(provider=aws["west"],
        depends_on=[west_bucket_versioning_v2]))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    // ... other configuration ...
    var eastBucketV2 = new Aws.S3.BucketV2("eastBucketV2");

    var eastBucketVersioningV2 = new Aws.S3.BucketVersioningV2("eastBucketVersioningV2", new()
    {
        Bucket = eastBucketV2.Id,
        VersioningConfiguration = new Aws.S3.Inputs.BucketVersioningV2VersioningConfigurationArgs
        {
            Status = "Enabled",
        },
    });

    var westBucketV2 = new Aws.S3.BucketV2("westBucketV2", new()
    {
    }, new CustomResourceOptions
    {
        Provider = aws.West,
    });

    var westBucketVersioningV2 = new Aws.S3.BucketVersioningV2("westBucketVersioningV2", new()
    {
        Bucket = westBucketV2.Id,
        VersioningConfiguration = new Aws.S3.Inputs.BucketVersioningV2VersioningConfigurationArgs
        {
            Status = "Enabled",
        },
    }, new CustomResourceOptions
    {
        Provider = aws.West,
    });

    var eastToWest = new Aws.S3.BucketReplicationConfig("eastToWest", new()
    {
        Role = aws_iam_role.East_replication.Arn,
        Bucket = eastBucketV2.Id,
        Rules = new[]
        {
            new Aws.S3.Inputs.BucketReplicationConfigRuleArgs
            {
                Id = "foobar",
                Filter = new Aws.S3.Inputs.BucketReplicationConfigRuleFilterArgs
                {
                    Prefix = "foo",
                },
                Status = "Enabled",
                Destination = new Aws.S3.Inputs.BucketReplicationConfigRuleDestinationArgs
                {
                    Bucket = westBucketV2.Arn,
                    StorageClass = "STANDARD",
                },
            },
        },
    }, new CustomResourceOptions
    {
        DependsOn = new[]
        {
            eastBucketVersioningV2,
        },
    });

    var westToEast = new Aws.S3.BucketReplicationConfig("westToEast", new()
    {
        Role = aws_iam_role.West_replication.Arn,
        Bucket = westBucketV2.Id,
        Rules = new[]
        {
            new Aws.S3.Inputs.BucketReplicationConfigRuleArgs
            {
                Id = "foobar",
                Filter = new Aws.S3.Inputs.BucketReplicationConfigRuleFilterArgs
                {
                    Prefix = "foo",
                },
                Status = "Enabled",
                Destination = new Aws.S3.Inputs.BucketReplicationConfigRuleDestinationArgs
                {
                    Bucket = eastBucketV2.Arn,
                    StorageClass = "STANDARD",
                },
            },
        },
    }, new CustomResourceOptions
    {
        Provider = aws.West,
        DependsOn = new[]
        {
            westBucketVersioningV2,
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		eastBucketV2, err := s3.NewBucketV2(ctx, "eastBucketV2", nil)
		if err != nil {
			return err
		}
		eastBucketVersioningV2, err := s3.NewBucketVersioningV2(ctx, "eastBucketVersioningV2", &s3.BucketVersioningV2Args{
			Bucket: eastBucketV2.ID(),
			VersioningConfiguration: &s3.BucketVersioningV2VersioningConfigurationArgs{
				Status: pulumi.String("Enabled"),
			},
		})
		if err != nil {
			return err
		}
		westBucketV2, err := s3.NewBucketV2(ctx, "westBucketV2", nil, pulumi.Provider(aws.West))
		if err != nil {
			return err
		}
		westBucketVersioningV2, err := s3.NewBucketVersioningV2(ctx, "westBucketVersioningV2", &s3.BucketVersioningV2Args{
			Bucket: westBucketV2.ID(),
			VersioningConfiguration: &s3.BucketVersioningV2VersioningConfigurationArgs{
				Status: pulumi.String("Enabled"),
			},
		}, pulumi.Provider(aws.West))
		if err != nil {
			return err
		}
		_, err = s3.NewBucketReplicationConfig(ctx, "eastToWest", &s3.BucketReplicationConfigArgs{
			Role:   pulumi.Any(aws_iam_role.East_replication.Arn),
			Bucket: eastBucketV2.ID(),
			Rules: s3.BucketReplicationConfigRuleArray{
				&s3.BucketReplicationConfigRuleArgs{
					Id: pulumi.String("foobar"),
					Filter: &s3.BucketReplicationConfigRuleFilterArgs{
						Prefix: pulumi.String("foo"),
					},
					Status: pulumi.String("Enabled"),
					Destination: &s3.BucketReplicationConfigRuleDestinationArgs{
						Bucket:       westBucketV2.Arn,
						StorageClass: pulumi.String("STANDARD"),
					},
				},
			},
		}, pulumi.DependsOn([]pulumi.Resource{
			eastBucketVersioningV2,
		}))
		if err != nil {
			return err
		}
		_, err = s3.NewBucketReplicationConfig(ctx, "westToEast", &s3.BucketReplicationConfigArgs{
			Role:   pulumi.Any(aws_iam_role.West_replication.Arn),
			Bucket: westBucketV2.ID(),
			Rules: s3.BucketReplicationConfigRuleArray{
				&s3.BucketReplicationConfigRuleArgs{
					Id: pulumi.String("foobar"),
					Filter: &s3.BucketReplicationConfigRuleFilterArgs{
						Prefix: pulumi.String("foo"),
					},
					Status: pulumi.String("Enabled"),
					Destination: &s3.BucketReplicationConfigRuleDestinationArgs{
						Bucket:       eastBucketV2.Arn,
						StorageClass: pulumi.String("STANDARD"),
					},
				},
			},
		}, pulumi.Provider(aws.West), pulumi.DependsOn([]pulumi.Resource{
			westBucketVersioningV2,
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
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.s3.BucketVersioningV2;
import com.pulumi.aws.s3.BucketVersioningV2Args;
import com.pulumi.aws.s3.inputs.BucketVersioningV2VersioningConfigurationArgs;
import com.pulumi.aws.s3.BucketV2Args;
import com.pulumi.aws.s3.BucketReplicationConfig;
import com.pulumi.aws.s3.BucketReplicationConfigArgs;
import com.pulumi.aws.s3.inputs.BucketReplicationConfigRuleArgs;
import com.pulumi.aws.s3.inputs.BucketReplicationConfigRuleFilterArgs;
import com.pulumi.aws.s3.inputs.BucketReplicationConfigRuleDestinationArgs;
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
        var eastBucketV2 = new BucketV2("eastBucketV2");

        var eastBucketVersioningV2 = new BucketVersioningV2("eastBucketVersioningV2", BucketVersioningV2Args.builder()        
            .bucket(eastBucketV2.id())
            .versioningConfiguration(BucketVersioningV2VersioningConfigurationArgs.builder()
                .status("Enabled")
                .build())
            .build());

        var westBucketV2 = new BucketV2("westBucketV2", BucketV2Args.Empty, CustomResourceOptions.builder()
            .provider(aws.west())
            .build());

        var westBucketVersioningV2 = new BucketVersioningV2("westBucketVersioningV2", BucketVersioningV2Args.builder()        
            .bucket(westBucketV2.id())
            .versioningConfiguration(BucketVersioningV2VersioningConfigurationArgs.builder()
                .status("Enabled")
                .build())
            .build(), CustomResourceOptions.builder()
                .provider(aws.west())
                .build());

        var eastToWest = new BucketReplicationConfig("eastToWest", BucketReplicationConfigArgs.builder()        
            .role(aws_iam_role.east_replication().arn())
            .bucket(eastBucketV2.id())
            .rules(BucketReplicationConfigRuleArgs.builder()
                .id("foobar")
                .filter(BucketReplicationConfigRuleFilterArgs.builder()
                    .prefix("foo")
                    .build())
                .status("Enabled")
                .destination(BucketReplicationConfigRuleDestinationArgs.builder()
                    .bucket(westBucketV2.arn())
                    .storageClass("STANDARD")
                    .build())
                .build())
            .build(), CustomResourceOptions.builder()
                .dependsOn(eastBucketVersioningV2)
                .build());

        var westToEast = new BucketReplicationConfig("westToEast", BucketReplicationConfigArgs.builder()        
            .role(aws_iam_role.west_replication().arn())
            .bucket(westBucketV2.id())
            .rules(BucketReplicationConfigRuleArgs.builder()
                .id("foobar")
                .filter(BucketReplicationConfigRuleFilterArgs.builder()
                    .prefix("foo")
                    .build())
                .status("Enabled")
                .destination(BucketReplicationConfigRuleDestinationArgs.builder()
                    .bucket(eastBucketV2.arn())
                    .storageClass("STANDARD")
                    .build())
                .build())
            .build(), CustomResourceOptions.builder()
                .provider(aws.west())
                .dependsOn(westBucketVersioningV2)
                .build());

    }
}
```
```yaml
resources:
  # ... other configuration ...
  eastBucketV2:
    type: aws:s3:BucketV2
  eastBucketVersioningV2:
    type: aws:s3:BucketVersioningV2
    properties:
      bucket: ${eastBucketV2.id}
      versioningConfiguration:
        status: Enabled
  westBucketV2:
    type: aws:s3:BucketV2
    options:
      provider: ${aws.west}
  westBucketVersioningV2:
    type: aws:s3:BucketVersioningV2
    properties:
      bucket: ${westBucketV2.id}
      versioningConfiguration:
        status: Enabled
    options:
      provider: ${aws.west}
  eastToWest:
    type: aws:s3:BucketReplicationConfig
    properties:
      role: ${aws_iam_role.east_replication.arn}
      bucket: ${eastBucketV2.id}
      rules:
        - id: foobar
          filter:
            prefix: foo
          status: Enabled
          destination:
            bucket: ${westBucketV2.arn}
            storageClass: STANDARD
    options:
      dependson:
        - ${eastBucketVersioningV2}
  westToEast:
    type: aws:s3:BucketReplicationConfig
    properties:
      role: ${aws_iam_role.west_replication.arn}
      bucket: ${westBucketV2.id}
      rules:
        - id: foobar
          filter:
            prefix: foo
          status: Enabled
          destination:
            bucket: ${eastBucketV2.arn}
            storageClass: STANDARD
    options:
      provider: ${aws.west}
      dependson:
        - ${westBucketVersioningV2}
```
{{% /example %}}
{{% /examples %}}

## Import

S3 bucket replication configuration can be imported using the `bucket`, e.g.

```sh
 $ pulumi import aws:s3/bucketReplicationConfig:BucketReplicationConfig replication bucket-name
```

 
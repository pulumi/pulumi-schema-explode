Provides a CloudWatch Metric Stream resource.

{{% examples %}}
## Example Usage
{{% example %}}
### Filters

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-trustpolicy.html
const metricStreamToFirehoseRole = new aws.iam.Role("metricStreamToFirehoseRole", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "streams.metrics.cloudwatch.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
`});
const bucket = new aws.s3.BucketV2("bucket", {});
const firehoseToS3Role = new aws.iam.Role("firehoseToS3Role", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "firehose.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
`});
const s3Stream = new aws.kinesis.FirehoseDeliveryStream("s3Stream", {
    destination: "s3",
    s3Configuration: {
        roleArn: firehoseToS3Role.arn,
        bucketArn: bucket.arn,
    },
});
const main = new aws.cloudwatch.MetricStream("main", {
    roleArn: metricStreamToFirehoseRole.arn,
    firehoseArn: s3Stream.arn,
    outputFormat: "json",
    includeFilters: [
        {
            namespace: "AWS/EC2",
        },
        {
            namespace: "AWS/EBS",
        },
    ],
});
// https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-trustpolicy.html
const metricStreamToFirehoseRolePolicy = new aws.iam.RolePolicy("metricStreamToFirehoseRolePolicy", {
    role: metricStreamToFirehoseRole.id,
    policy: pulumi.interpolate`{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "firehose:PutRecord",
                "firehose:PutRecordBatch"
            ],
            "Resource": "${s3Stream.arn}"
        }
    ]
}
`,
});
const bucketAcl = new aws.s3.BucketAclV2("bucketAcl", {
    bucket: bucket.id,
    acl: "private",
});
const firehoseToS3RolePolicy = new aws.iam.RolePolicy("firehoseToS3RolePolicy", {
    role: firehoseToS3Role.id,
    policy: pulumi.interpolate`{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:AbortMultipartUpload",
                "s3:GetBucketLocation",
                "s3:GetObject",
                "s3:ListBucket",
                "s3:ListBucketMultipartUploads",
                "s3:PutObject"
            ],
            "Resource": [
                "${bucket.arn}",
                "${bucket.arn}/*"
            ]
        }
    ]
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

# https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-trustpolicy.html
metric_stream_to_firehose_role = aws.iam.Role("metricStreamToFirehoseRole", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "streams.metrics.cloudwatch.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
""")
bucket = aws.s3.BucketV2("bucket")
firehose_to_s3_role = aws.iam.Role("firehoseToS3Role", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "firehose.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
""")
s3_stream = aws.kinesis.FirehoseDeliveryStream("s3Stream",
    destination="s3",
    s3_configuration=aws.kinesis.FirehoseDeliveryStreamS3ConfigurationArgs(
        role_arn=firehose_to_s3_role.arn,
        bucket_arn=bucket.arn,
    ))
main = aws.cloudwatch.MetricStream("main",
    role_arn=metric_stream_to_firehose_role.arn,
    firehose_arn=s3_stream.arn,
    output_format="json",
    include_filters=[
        aws.cloudwatch.MetricStreamIncludeFilterArgs(
            namespace="AWS/EC2",
        ),
        aws.cloudwatch.MetricStreamIncludeFilterArgs(
            namespace="AWS/EBS",
        ),
    ])
# https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-trustpolicy.html
metric_stream_to_firehose_role_policy = aws.iam.RolePolicy("metricStreamToFirehoseRolePolicy",
    role=metric_stream_to_firehose_role.id,
    policy=s3_stream.arn.apply(lambda arn: f"""{{
    "Version": "2012-10-17",
    "Statement": [
        {{
            "Effect": "Allow",
            "Action": [
                "firehose:PutRecord",
                "firehose:PutRecordBatch"
            ],
            "Resource": "{arn}"
        }}
    ]
}}
"""))
bucket_acl = aws.s3.BucketAclV2("bucketAcl",
    bucket=bucket.id,
    acl="private")
firehose_to_s3_role_policy = aws.iam.RolePolicy("firehoseToS3RolePolicy",
    role=firehose_to_s3_role.id,
    policy=pulumi.Output.all(bucket.arn, bucket.arn).apply(lambda bucketArn, bucketArn1: f"""{{
    "Version": "2012-10-17",
    "Statement": [
        {{
            "Effect": "Allow",
            "Action": [
                "s3:AbortMultipartUpload",
                "s3:GetBucketLocation",
                "s3:GetObject",
                "s3:ListBucket",
                "s3:ListBucketMultipartUploads",
                "s3:PutObject"
            ],
            "Resource": [
                "{bucket_arn}",
                "{bucket_arn1}/*"
            ]
        }}
    ]
}}
"""))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    // https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-trustpolicy.html
    var metricStreamToFirehoseRole = new Aws.Iam.Role("metricStreamToFirehoseRole", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Action"": ""sts:AssumeRole"",
      ""Principal"": {
        ""Service"": ""streams.metrics.cloudwatch.amazonaws.com""
      },
      ""Effect"": ""Allow"",
      ""Sid"": """"
    }
  ]
}
",
    });

    var bucket = new Aws.S3.BucketV2("bucket");

    var firehoseToS3Role = new Aws.Iam.Role("firehoseToS3Role", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Action"": ""sts:AssumeRole"",
      ""Principal"": {
        ""Service"": ""firehose.amazonaws.com""
      },
      ""Effect"": ""Allow"",
      ""Sid"": """"
    }
  ]
}
",
    });

    var s3Stream = new Aws.Kinesis.FirehoseDeliveryStream("s3Stream", new()
    {
        Destination = "s3",
        S3Configuration = new Aws.Kinesis.Inputs.FirehoseDeliveryStreamS3ConfigurationArgs
        {
            RoleArn = firehoseToS3Role.Arn,
            BucketArn = bucket.Arn,
        },
    });

    var main = new Aws.CloudWatch.MetricStream("main", new()
    {
        RoleArn = metricStreamToFirehoseRole.Arn,
        FirehoseArn = s3Stream.Arn,
        OutputFormat = "json",
        IncludeFilters = new[]
        {
            new Aws.CloudWatch.Inputs.MetricStreamIncludeFilterArgs
            {
                Namespace = "AWS/EC2",
            },
            new Aws.CloudWatch.Inputs.MetricStreamIncludeFilterArgs
            {
                Namespace = "AWS/EBS",
            },
        },
    });

    // https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-trustpolicy.html
    var metricStreamToFirehoseRolePolicy = new Aws.Iam.RolePolicy("metricStreamToFirehoseRolePolicy", new()
    {
        Role = metricStreamToFirehoseRole.Id,
        Policy = s3Stream.Arn.Apply(arn => @$"{{
    ""Version"": ""2012-10-17"",
    ""Statement"": [
        {{
            ""Effect"": ""Allow"",
            ""Action"": [
                ""firehose:PutRecord"",
                ""firehose:PutRecordBatch""
            ],
            ""Resource"": ""{arn}""
        }}
    ]
}}
"),
    });

    var bucketAcl = new Aws.S3.BucketAclV2("bucketAcl", new()
    {
        Bucket = bucket.Id,
        Acl = "private",
    });

    var firehoseToS3RolePolicy = new Aws.Iam.RolePolicy("firehoseToS3RolePolicy", new()
    {
        Role = firehoseToS3Role.Id,
        Policy = Output.Tuple(bucket.Arn, bucket.Arn).Apply(values =>
        {
            var bucketArn = values.Item1;
            var bucketArn1 = values.Item2;
            return @$"{{
    ""Version"": ""2012-10-17"",
    ""Statement"": [
        {{
            ""Effect"": ""Allow"",
            ""Action"": [
                ""s3:AbortMultipartUpload"",
                ""s3:GetBucketLocation"",
                ""s3:GetObject"",
                ""s3:ListBucket"",
                ""s3:ListBucketMultipartUploads"",
                ""s3:PutObject""
            ],
            ""Resource"": [
                ""{bucketArn}"",
                ""{bucketArn1}/*""
            ]
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

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudwatch"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/kinesis"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		metricStreamToFirehoseRole, err := iam.NewRole(ctx, "metricStreamToFirehoseRole", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "streams.metrics.cloudwatch.amazonaws.com"
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
		bucket, err := s3.NewBucketV2(ctx, "bucket", nil)
		if err != nil {
			return err
		}
		firehoseToS3Role, err := iam.NewRole(ctx, "firehoseToS3Role", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "firehose.amazonaws.com"
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
		s3Stream, err := kinesis.NewFirehoseDeliveryStream(ctx, "s3Stream", &kinesis.FirehoseDeliveryStreamArgs{
			Destination: pulumi.String("s3"),
			S3Configuration: &kinesis.FirehoseDeliveryStreamS3ConfigurationArgs{
				RoleArn:   firehoseToS3Role.Arn,
				BucketArn: bucket.Arn,
			},
		})
		if err != nil {
			return err
		}
		_, err = cloudwatch.NewMetricStream(ctx, "main", &cloudwatch.MetricStreamArgs{
			RoleArn:      metricStreamToFirehoseRole.Arn,
			FirehoseArn:  s3Stream.Arn,
			OutputFormat: pulumi.String("json"),
			IncludeFilters: cloudwatch.MetricStreamIncludeFilterArray{
				&cloudwatch.MetricStreamIncludeFilterArgs{
					Namespace: pulumi.String("AWS/EC2"),
				},
				&cloudwatch.MetricStreamIncludeFilterArgs{
					Namespace: pulumi.String("AWS/EBS"),
				},
			},
		})
		if err != nil {
			return err
		}
		_, err = iam.NewRolePolicy(ctx, "metricStreamToFirehoseRolePolicy", &iam.RolePolicyArgs{
			Role: metricStreamToFirehoseRole.ID(),
			Policy: s3Stream.Arn.ApplyT(func(arn string) (string, error) {
				return fmt.Sprintf(`{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "firehose:PutRecord",
                "firehose:PutRecordBatch"
            ],
            "Resource": "%v"
        }
    ]
}
`, arn), nil
			}).(pulumi.StringOutput),
		})
		if err != nil {
			return err
		}
		_, err = s3.NewBucketAclV2(ctx, "bucketAcl", &s3.BucketAclV2Args{
			Bucket: bucket.ID(),
			Acl:    pulumi.String("private"),
		})
		if err != nil {
			return err
		}
		_, err = iam.NewRolePolicy(ctx, "firehoseToS3RolePolicy", &iam.RolePolicyArgs{
			Role: firehoseToS3Role.ID(),
			Policy: pulumi.All(bucket.Arn, bucket.Arn).ApplyT(func(_args []interface{}) (string, error) {
				bucketArn := _args[0].(string)
				bucketArn1 := _args[1].(string)
				return fmt.Sprintf(`{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:AbortMultipartUpload",
                "s3:GetBucketLocation",
                "s3:GetObject",
                "s3:ListBucket",
                "s3:ListBucketMultipartUploads",
                "s3:PutObject"
            ],
            "Resource": [
                "%v",
                "%v/*"
            ]
        }
    ]
}
`, bucketArn, bucketArn1), nil
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
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.kinesis.FirehoseDeliveryStream;
import com.pulumi.aws.kinesis.FirehoseDeliveryStreamArgs;
import com.pulumi.aws.kinesis.inputs.FirehoseDeliveryStreamS3ConfigurationArgs;
import com.pulumi.aws.cloudwatch.MetricStream;
import com.pulumi.aws.cloudwatch.MetricStreamArgs;
import com.pulumi.aws.cloudwatch.inputs.MetricStreamIncludeFilterArgs;
import com.pulumi.aws.iam.RolePolicy;
import com.pulumi.aws.iam.RolePolicyArgs;
import com.pulumi.aws.s3.BucketAclV2;
import com.pulumi.aws.s3.BucketAclV2Args;
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
        var metricStreamToFirehoseRole = new Role("metricStreamToFirehoseRole", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "streams.metrics.cloudwatch.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
            """)
            .build());

        var bucket = new BucketV2("bucket");

        var firehoseToS3Role = new Role("firehoseToS3Role", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "firehose.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
            """)
            .build());

        var s3Stream = new FirehoseDeliveryStream("s3Stream", FirehoseDeliveryStreamArgs.builder()        
            .destination("s3")
            .s3Configuration(FirehoseDeliveryStreamS3ConfigurationArgs.builder()
                .roleArn(firehoseToS3Role.arn())
                .bucketArn(bucket.arn())
                .build())
            .build());

        var main = new MetricStream("main", MetricStreamArgs.builder()        
            .roleArn(metricStreamToFirehoseRole.arn())
            .firehoseArn(s3Stream.arn())
            .outputFormat("json")
            .includeFilters(            
                MetricStreamIncludeFilterArgs.builder()
                    .namespace("AWS/EC2")
                    .build(),
                MetricStreamIncludeFilterArgs.builder()
                    .namespace("AWS/EBS")
                    .build())
            .build());

        var metricStreamToFirehoseRolePolicy = new RolePolicy("metricStreamToFirehoseRolePolicy", RolePolicyArgs.builder()        
            .role(metricStreamToFirehoseRole.id())
            .policy(s3Stream.arn().applyValue(arn -> """
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "firehose:PutRecord",
                "firehose:PutRecordBatch"
            ],
            "Resource": "%s"
        }
    ]
}
", arn)))
            .build());

        var bucketAcl = new BucketAclV2("bucketAcl", BucketAclV2Args.builder()        
            .bucket(bucket.id())
            .acl("private")
            .build());

        var firehoseToS3RolePolicy = new RolePolicy("firehoseToS3RolePolicy", RolePolicyArgs.builder()        
            .role(firehoseToS3Role.id())
            .policy(Output.tuple(bucket.arn(), bucket.arn()).applyValue(values -> {
                var bucketArn = values.t1;
                var bucketArn1 = values.t2;
                return """
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:AbortMultipartUpload",
                "s3:GetBucketLocation",
                "s3:GetObject",
                "s3:ListBucket",
                "s3:ListBucketMultipartUploads",
                "s3:PutObject"
            ],
            "Resource": [
                "%s",
                "%s/*"
            ]
        }
    ]
}
", bucketArn,bucketArn1);
            }))
            .build());

    }
}
```
```yaml
resources:
  main:
    type: aws:cloudwatch:MetricStream
    properties:
      roleArn: ${metricStreamToFirehoseRole.arn}
      firehoseArn: ${s3Stream.arn}
      outputFormat: json
      includeFilters:
        - namespace: AWS/EC2
        - namespace: AWS/EBS
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-trustpolicy.html
  metricStreamToFirehoseRole:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Principal": {
                "Service": "streams.metrics.cloudwatch.amazonaws.com"
              },
              "Effect": "Allow",
              "Sid": ""
            }
          ]
        }
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-trustpolicy.html
  metricStreamToFirehoseRolePolicy:
    type: aws:iam:RolePolicy
    properties:
      role: ${metricStreamToFirehoseRole.id}
      policy: |
        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": [
                        "firehose:PutRecord",
                        "firehose:PutRecordBatch"
                    ],
                    "Resource": "${s3Stream.arn}"
                }
            ]
        }
  bucket:
    type: aws:s3:BucketV2
  bucketAcl:
    type: aws:s3:BucketAclV2
    properties:
      bucket: ${bucket.id}
      acl: private
  firehoseToS3Role:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Principal": {
                "Service": "firehose.amazonaws.com"
              },
              "Effect": "Allow",
              "Sid": ""
            }
          ]
        }
  firehoseToS3RolePolicy:
    type: aws:iam:RolePolicy
    properties:
      role: ${firehoseToS3Role.id}
      policy: |
        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": [
                        "s3:AbortMultipartUpload",
                        "s3:GetBucketLocation",
                        "s3:GetObject",
                        "s3:ListBucket",
                        "s3:ListBucketMultipartUploads",
                        "s3:PutObject"
                    ],
                    "Resource": [
                        "${bucket.arn}",
                        "${bucket.arn}/*"
                    ]
                }
            ]
        }
  s3Stream:
    type: aws:kinesis:FirehoseDeliveryStream
    properties:
      destination: s3
      s3Configuration:
        roleArn: ${firehoseToS3Role.arn}
        bucketArn: ${bucket.arn}
```
{{% /example %}}
{{% example %}}
### Additional Statistics

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const main = new aws.cloudwatch.MetricStream("main", {
    roleArn: aws_iam_role.metric_stream_to_firehose.arn,
    firehoseArn: aws_kinesis_firehose_delivery_stream.s3_stream.arn,
    outputFormat: "json",
    statisticsConfigurations: [
        {
            additionalStatistics: [
                "p1",
                "tm99",
            ],
            includeMetrics: [{
                metricName: "CPUUtilization",
                namespace: "AWS/EC2",
            }],
        },
        {
            additionalStatistics: ["TS(50.5:)"],
            includeMetrics: [{
                metricName: "CPUUtilization",
                namespace: "AWS/EC2",
            }],
        },
    ],
});
```
```python
import pulumi
import pulumi_aws as aws

main = aws.cloudwatch.MetricStream("main",
    role_arn=aws_iam_role["metric_stream_to_firehose"]["arn"],
    firehose_arn=aws_kinesis_firehose_delivery_stream["s3_stream"]["arn"],
    output_format="json",
    statistics_configurations=[
        aws.cloudwatch.MetricStreamStatisticsConfigurationArgs(
            additional_statistics=[
                "p1",
                "tm99",
            ],
            include_metrics=[aws.cloudwatch.MetricStreamStatisticsConfigurationIncludeMetricArgs(
                metric_name="CPUUtilization",
                namespace="AWS/EC2",
            )],
        ),
        aws.cloudwatch.MetricStreamStatisticsConfigurationArgs(
            additional_statistics=["TS(50.5:)"],
            include_metrics=[aws.cloudwatch.MetricStreamStatisticsConfigurationIncludeMetricArgs(
                metric_name="CPUUtilization",
                namespace="AWS/EC2",
            )],
        ),
    ])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var main = new Aws.CloudWatch.MetricStream("main", new()
    {
        RoleArn = aws_iam_role.Metric_stream_to_firehose.Arn,
        FirehoseArn = aws_kinesis_firehose_delivery_stream.S3_stream.Arn,
        OutputFormat = "json",
        StatisticsConfigurations = new[]
        {
            new Aws.CloudWatch.Inputs.MetricStreamStatisticsConfigurationArgs
            {
                AdditionalStatistics = new[]
                {
                    "p1",
                    "tm99",
                },
                IncludeMetrics = new[]
                {
                    new Aws.CloudWatch.Inputs.MetricStreamStatisticsConfigurationIncludeMetricArgs
                    {
                        MetricName = "CPUUtilization",
                        Namespace = "AWS/EC2",
                    },
                },
            },
            new Aws.CloudWatch.Inputs.MetricStreamStatisticsConfigurationArgs
            {
                AdditionalStatistics = new[]
                {
                    "TS(50.5:)",
                },
                IncludeMetrics = new[]
                {
                    new Aws.CloudWatch.Inputs.MetricStreamStatisticsConfigurationIncludeMetricArgs
                    {
                        MetricName = "CPUUtilization",
                        Namespace = "AWS/EC2",
                    },
                },
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudwatch"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := cloudwatch.NewMetricStream(ctx, "main", &cloudwatch.MetricStreamArgs{
			RoleArn:      pulumi.Any(aws_iam_role.Metric_stream_to_firehose.Arn),
			FirehoseArn:  pulumi.Any(aws_kinesis_firehose_delivery_stream.S3_stream.Arn),
			OutputFormat: pulumi.String("json"),
			StatisticsConfigurations: cloudwatch.MetricStreamStatisticsConfigurationArray{
				&cloudwatch.MetricStreamStatisticsConfigurationArgs{
					AdditionalStatistics: pulumi.StringArray{
						pulumi.String("p1"),
						pulumi.String("tm99"),
					},
					IncludeMetrics: cloudwatch.MetricStreamStatisticsConfigurationIncludeMetricArray{
						&cloudwatch.MetricStreamStatisticsConfigurationIncludeMetricArgs{
							MetricName: pulumi.String("CPUUtilization"),
							Namespace:  pulumi.String("AWS/EC2"),
						},
					},
				},
				&cloudwatch.MetricStreamStatisticsConfigurationArgs{
					AdditionalStatistics: pulumi.StringArray{
						pulumi.String("TS(50.5:)"),
					},
					IncludeMetrics: cloudwatch.MetricStreamStatisticsConfigurationIncludeMetricArray{
						&cloudwatch.MetricStreamStatisticsConfigurationIncludeMetricArgs{
							MetricName: pulumi.String("CPUUtilization"),
							Namespace:  pulumi.String("AWS/EC2"),
						},
					},
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
import com.pulumi.aws.cloudwatch.MetricStream;
import com.pulumi.aws.cloudwatch.MetricStreamArgs;
import com.pulumi.aws.cloudwatch.inputs.MetricStreamStatisticsConfigurationArgs;
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
        var main = new MetricStream("main", MetricStreamArgs.builder()        
            .roleArn(aws_iam_role.metric_stream_to_firehose().arn())
            .firehoseArn(aws_kinesis_firehose_delivery_stream.s3_stream().arn())
            .outputFormat("json")
            .statisticsConfigurations(            
                MetricStreamStatisticsConfigurationArgs.builder()
                    .additionalStatistics(                    
                        "p1",
                        "tm99")
                    .includeMetrics(MetricStreamStatisticsConfigurationIncludeMetricArgs.builder()
                        .metricName("CPUUtilization")
                        .namespace("AWS/EC2")
                        .build())
                    .build(),
                MetricStreamStatisticsConfigurationArgs.builder()
                    .additionalStatistics("TS(50.5:)")
                    .includeMetrics(MetricStreamStatisticsConfigurationIncludeMetricArgs.builder()
                        .metricName("CPUUtilization")
                        .namespace("AWS/EC2")
                        .build())
                    .build())
            .build());

    }
}
```
```yaml
resources:
  main:
    type: aws:cloudwatch:MetricStream
    properties:
      roleArn: ${aws_iam_role.metric_stream_to_firehose.arn}
      firehoseArn: ${aws_kinesis_firehose_delivery_stream.s3_stream.arn}
      outputFormat: json
      statisticsConfigurations:
        - additionalStatistics:
            - p1
            - tm99
          includeMetrics:
            - metricName: CPUUtilization
              namespace: AWS/EC2
        - additionalStatistics:
            - TS(50.5:)
          includeMetrics:
            - metricName: CPUUtilization
              namespace: AWS/EC2
```
{{% /example %}}
{{% /examples %}}

## Import

CloudWatch metric streams can be imported using the `name`, e.g.,

```sh
 $ pulumi import aws:cloudwatch/metricStream:MetricStream sample <name>
```

 
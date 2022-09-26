Provides a Kinesis Firehose Delivery Stream resource. Amazon Kinesis Firehose is a fully managed, elastic service to easily deliver real-time data streams to destinations such as Amazon S3 and Amazon Redshift.

For more details, see the [Amazon Kinesis Firehose Documentation](https://aws.amazon.com/documentation/firehose/).

{{% examples %}}
## Example Usage
{{% example %}}
### Extended S3 Destination

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bucket = new aws.s3.BucketV2("bucket", {});
const firehoseRole = new aws.iam.Role("firehoseRole", {assumeRolePolicy: `{
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
const lambdaIam = new aws.iam.Role("lambdaIam", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
`});
const lambdaProcessor = new aws.lambda.Function("lambdaProcessor", {
    code: new pulumi.asset.FileArchive("lambda.zip"),
    role: lambdaIam.arn,
    handler: "exports.handler",
    runtime: "nodejs12.x",
});
const extendedS3Stream = new aws.kinesis.FirehoseDeliveryStream("extendedS3Stream", {
    destination: "extended_s3",
    extendedS3Configuration: {
        roleArn: firehoseRole.arn,
        bucketArn: bucket.arn,
        processingConfiguration: {
            enabled: true,
            processors: [{
                type: "Lambda",
                parameters: [{
                    parameterName: "LambdaArn",
                    parameterValue: pulumi.interpolate`${lambdaProcessor.arn}:$LATEST`,
                }],
            }],
        },
    },
});
const bucketAcl = new aws.s3.BucketAclV2("bucketAcl", {
    bucket: bucket.id,
    acl: "private",
});
```
```python
import pulumi
import pulumi_aws as aws

bucket = aws.s3.BucketV2("bucket")
firehose_role = aws.iam.Role("firehoseRole", assume_role_policy="""{
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
lambda_iam = aws.iam.Role("lambdaIam", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
""")
lambda_processor = aws.lambda_.Function("lambdaProcessor",
    code=pulumi.FileArchive("lambda.zip"),
    role=lambda_iam.arn,
    handler="exports.handler",
    runtime="nodejs12.x")
extended_s3_stream = aws.kinesis.FirehoseDeliveryStream("extendedS3Stream",
    destination="extended_s3",
    extended_s3_configuration=aws.kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationArgs(
        role_arn=firehose_role.arn,
        bucket_arn=bucket.arn,
        processing_configuration=aws.kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationArgs(
            enabled=True,
            processors=[aws.kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorArgs(
                type="Lambda",
                parameters=[aws.kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorParameterArgs(
                    parameter_name="LambdaArn",
                    parameter_value=lambda_processor.arn.apply(lambda arn: f"{arn}:$LATEST"),
                )],
            )],
        ),
    ))
bucket_acl = aws.s3.BucketAclV2("bucketAcl",
    bucket=bucket.id,
    acl="private")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var bucket = new Aws.S3.BucketV2("bucket");

    var firehoseRole = new Aws.Iam.Role("firehoseRole", new()
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

    var lambdaIam = new Aws.Iam.Role("lambdaIam", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Action"": ""sts:AssumeRole"",
      ""Principal"": {
        ""Service"": ""lambda.amazonaws.com""
      },
      ""Effect"": ""Allow"",
      ""Sid"": """"
    }
  ]
}
",
    });

    var lambdaProcessor = new Aws.Lambda.Function("lambdaProcessor", new()
    {
        Code = new FileArchive("lambda.zip"),
        Role = lambdaIam.Arn,
        Handler = "exports.handler",
        Runtime = "nodejs12.x",
    });

    var extendedS3Stream = new Aws.Kinesis.FirehoseDeliveryStream("extendedS3Stream", new()
    {
        Destination = "extended_s3",
        ExtendedS3Configuration = new Aws.Kinesis.Inputs.FirehoseDeliveryStreamExtendedS3ConfigurationArgs
        {
            RoleArn = firehoseRole.Arn,
            BucketArn = bucket.Arn,
            ProcessingConfiguration = new Aws.Kinesis.Inputs.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationArgs
            {
                Enabled = true,
                Processors = new[]
                {
                    new Aws.Kinesis.Inputs.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorArgs
                    {
                        Type = "Lambda",
                        Parameters = new[]
                        {
                            new Aws.Kinesis.Inputs.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorParameterArgs
                            {
                                ParameterName = "LambdaArn",
                                ParameterValue = lambdaProcessor.Arn.Apply(arn => $"{arn}:$LATEST"),
                            },
                        },
                    },
                },
            },
        },
    });

    var bucketAcl = new Aws.S3.BucketAclV2("bucketAcl", new()
    {
        Bucket = bucket.Id,
        Acl = "private",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/kinesis"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lambda"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		bucket, err := s3.NewBucketV2(ctx, "bucket", nil)
		if err != nil {
			return err
		}
		firehoseRole, err := iam.NewRole(ctx, "firehoseRole", &iam.RoleArgs{
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
		lambdaIam, err := iam.NewRole(ctx, "lambdaIam", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
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
		lambdaProcessor, err := lambda.NewFunction(ctx, "lambdaProcessor", &lambda.FunctionArgs{
			Code:    pulumi.NewFileArchive("lambda.zip"),
			Role:    lambdaIam.Arn,
			Handler: pulumi.String("exports.handler"),
			Runtime: pulumi.String("nodejs12.x"),
		})
		if err != nil {
			return err
		}
		_, err = kinesis.NewFirehoseDeliveryStream(ctx, "extendedS3Stream", &kinesis.FirehoseDeliveryStreamArgs{
			Destination: pulumi.String("extended_s3"),
			ExtendedS3Configuration: &kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationArgs{
				RoleArn:   firehoseRole.Arn,
				BucketArn: bucket.Arn,
				ProcessingConfiguration: &kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationArgs{
					Enabled: pulumi.Bool(true),
					Processors: kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorArray{
						&kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorArgs{
							Type: pulumi.String("Lambda"),
							Parameters: kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorParameterArray{
								&kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorParameterArgs{
									ParameterName: pulumi.String("LambdaArn"),
									ParameterValue: lambdaProcessor.Arn.ApplyT(func(arn string) (string, error) {
										return fmt.Sprintf("%v:$LATEST", arn), nil
									}).(pulumi.StringOutput),
								},
							},
						},
					},
				},
			},
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
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.lambda.Function;
import com.pulumi.aws.lambda.FunctionArgs;
import com.pulumi.aws.kinesis.FirehoseDeliveryStream;
import com.pulumi.aws.kinesis.FirehoseDeliveryStreamArgs;
import com.pulumi.aws.kinesis.inputs.FirehoseDeliveryStreamExtendedS3ConfigurationArgs;
import com.pulumi.aws.kinesis.inputs.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationArgs;
import com.pulumi.aws.s3.BucketAclV2;
import com.pulumi.aws.s3.BucketAclV2Args;
import com.pulumi.asset.FileArchive;
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
        var bucket = new BucketV2("bucket");

        var firehoseRole = new Role("firehoseRole", RoleArgs.builder()        
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

        var lambdaIam = new Role("lambdaIam", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
            """)
            .build());

        var lambdaProcessor = new Function("lambdaProcessor", FunctionArgs.builder()        
            .code(new FileArchive("lambda.zip"))
            .role(lambdaIam.arn())
            .handler("exports.handler")
            .runtime("nodejs12.x")
            .build());

        var extendedS3Stream = new FirehoseDeliveryStream("extendedS3Stream", FirehoseDeliveryStreamArgs.builder()        
            .destination("extended_s3")
            .extendedS3Configuration(FirehoseDeliveryStreamExtendedS3ConfigurationArgs.builder()
                .roleArn(firehoseRole.arn())
                .bucketArn(bucket.arn())
                .processingConfiguration(FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationArgs.builder()
                    .enabled("true")
                    .processors(FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorArgs.builder()
                        .type("Lambda")
                        .parameters(FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorParameterArgs.builder()
                            .parameterName("LambdaArn")
                            .parameterValue(lambdaProcessor.arn().applyValue(arn -> String.format("%s:$LATEST", arn)))
                            .build())
                        .build())
                    .build())
                .build())
            .build());

        var bucketAcl = new BucketAclV2("bucketAcl", BucketAclV2Args.builder()        
            .bucket(bucket.id())
            .acl("private")
            .build());

    }
}
```
```yaml
resources:
  extendedS3Stream:
    type: aws:kinesis:FirehoseDeliveryStream
    properties:
      destination: extended_s3
      extendedS3Configuration:
        roleArn: ${firehoseRole.arn}
        bucketArn: ${bucket.arn}
        processingConfiguration:
          enabled: true
          processors:
            - type: Lambda
              parameters:
                - parameterName: LambdaArn
                  parameterValue: ${lambdaProcessor.arn}:$LATEST
  bucket:
    type: aws:s3:BucketV2
  bucketAcl:
    type: aws:s3:BucketAclV2
    properties:
      bucket: ${bucket.id}
      acl: private
  firehoseRole:
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
  lambdaIam:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              },
              "Effect": "Allow",
              "Sid": ""
            }
          ]
        }
  lambdaProcessor:
    type: aws:lambda:Function
    properties:
      code:
        Fn::FileArchive: lambda.zip
      role: ${lambdaIam.arn}
      handler: exports.handler
      runtime: nodejs12.x
```
{{% /example %}}
{{% example %}}
### Extended S3 Destination with dynamic partitioning
These examples use built-in Firehose functionality, rather than requiring a lambda.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const extendedS3Stream = new aws.kinesis.FirehoseDeliveryStream("extendedS3Stream", {
    destination: "extended_s3",
    extendedS3Configuration: {
        roleArn: aws_iam_role.firehose_role.arn,
        bucketArn: aws_s3_bucket.bucket.arn,
        prefix: "data/customer_id=!{partitionKeyFromQuery:customer_id}/year=!{timestamp:yyyy}/month=!{timestamp:MM}/day=!{timestamp:dd}/hour=!{timestamp:HH}/",
        errorOutputPrefix: "errors/year=!{timestamp:yyyy}/month=!{timestamp:MM}/day=!{timestamp:dd}/hour=!{timestamp:HH}/!{firehose:error-output-type}/",
        bufferSize: 64,
        processingConfiguration: {
            enabled: true,
            processors: [
                {
                    type: "RecordDeAggregation",
                    parameters: [{
                        parameterName: "SubRecordType",
                        parameterValue: "JSON",
                    }],
                },
                {
                    type: "AppendDelimiterToRecord",
                },
                {
                    type: "MetadataExtraction",
                    parameters: [
                        {
                            parameterName: "JsonParsingEngine",
                            parameterValue: "JQ-1.6",
                        },
                        {
                            parameterName: "MetadataExtractionQuery",
                            parameterValue: "{customer_id:.customer_id}",
                        },
                    ],
                },
            ],
        },
    },
});
```
```python
import pulumi
import pulumi_aws as aws

extended_s3_stream = aws.kinesis.FirehoseDeliveryStream("extendedS3Stream",
    destination="extended_s3",
    extended_s3_configuration=aws.kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationArgs(
        role_arn=aws_iam_role["firehose_role"]["arn"],
        bucket_arn=aws_s3_bucket["bucket"]["arn"],
        prefix="data/customer_id=!{partitionKeyFromQuery:customer_id}/year=!{timestamp:yyyy}/month=!{timestamp:MM}/day=!{timestamp:dd}/hour=!{timestamp:HH}/",
        error_output_prefix="errors/year=!{timestamp:yyyy}/month=!{timestamp:MM}/day=!{timestamp:dd}/hour=!{timestamp:HH}/!{firehose:error-output-type}/",
        buffer_size=64,
        processing_configuration=aws.kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationArgs(
            enabled=True,
            processors=[
                aws.kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorArgs(
                    type="RecordDeAggregation",
                    parameters=[aws.kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorParameterArgs(
                        parameter_name="SubRecordType",
                        parameter_value="JSON",
                    )],
                ),
                aws.kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorArgs(
                    type="AppendDelimiterToRecord",
                ),
                aws.kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorArgs(
                    type="MetadataExtraction",
                    parameters=[
                        aws.kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorParameterArgs(
                            parameter_name="JsonParsingEngine",
                            parameter_value="JQ-1.6",
                        ),
                        aws.kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorParameterArgs(
                            parameter_name="MetadataExtractionQuery",
                            parameter_value="{customer_id:.customer_id}",
                        ),
                    ],
                ),
            ],
        ),
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var extendedS3Stream = new Aws.Kinesis.FirehoseDeliveryStream("extendedS3Stream", new()
    {
        Destination = "extended_s3",
        ExtendedS3Configuration = new Aws.Kinesis.Inputs.FirehoseDeliveryStreamExtendedS3ConfigurationArgs
        {
            RoleArn = aws_iam_role.Firehose_role.Arn,
            BucketArn = aws_s3_bucket.Bucket.Arn,
            Prefix = "data/customer_id=!{partitionKeyFromQuery:customer_id}/year=!{timestamp:yyyy}/month=!{timestamp:MM}/day=!{timestamp:dd}/hour=!{timestamp:HH}/",
            ErrorOutputPrefix = "errors/year=!{timestamp:yyyy}/month=!{timestamp:MM}/day=!{timestamp:dd}/hour=!{timestamp:HH}/!{firehose:error-output-type}/",
            BufferSize = 64,
            ProcessingConfiguration = new Aws.Kinesis.Inputs.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationArgs
            {
                Enabled = true,
                Processors = new[]
                {
                    new Aws.Kinesis.Inputs.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorArgs
                    {
                        Type = "RecordDeAggregation",
                        Parameters = new[]
                        {
                            new Aws.Kinesis.Inputs.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorParameterArgs
                            {
                                ParameterName = "SubRecordType",
                                ParameterValue = "JSON",
                            },
                        },
                    },
                    new Aws.Kinesis.Inputs.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorArgs
                    {
                        Type = "AppendDelimiterToRecord",
                    },
                    new Aws.Kinesis.Inputs.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorArgs
                    {
                        Type = "MetadataExtraction",
                        Parameters = new[]
                        {
                            new Aws.Kinesis.Inputs.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorParameterArgs
                            {
                                ParameterName = "JsonParsingEngine",
                                ParameterValue = "JQ-1.6",
                            },
                            new Aws.Kinesis.Inputs.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorParameterArgs
                            {
                                ParameterName = "MetadataExtractionQuery",
                                ParameterValue = "{customer_id:.customer_id}",
                            },
                        },
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
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/kinesis"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := kinesis.NewFirehoseDeliveryStream(ctx, "extendedS3Stream", &kinesis.FirehoseDeliveryStreamArgs{
			Destination: pulumi.String("extended_s3"),
			ExtendedS3Configuration: &kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationArgs{
				RoleArn:           pulumi.Any(aws_iam_role.Firehose_role.Arn),
				BucketArn:         pulumi.Any(aws_s3_bucket.Bucket.Arn),
				Prefix:            pulumi.String("data/customer_id=!{partitionKeyFromQuery:customer_id}/year=!{timestamp:yyyy}/month=!{timestamp:MM}/day=!{timestamp:dd}/hour=!{timestamp:HH}/"),
				ErrorOutputPrefix: pulumi.String("errors/year=!{timestamp:yyyy}/month=!{timestamp:MM}/day=!{timestamp:dd}/hour=!{timestamp:HH}/!{firehose:error-output-type}/"),
				BufferSize:        pulumi.Int(64),
				ProcessingConfiguration: &kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationArgs{
					Enabled: pulumi.Bool(true),
					Processors: kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorArray{
						&kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorArgs{
							Type: pulumi.String("RecordDeAggregation"),
							Parameters: kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorParameterArray{
								&kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorParameterArgs{
									ParameterName:  pulumi.String("SubRecordType"),
									ParameterValue: pulumi.String("JSON"),
								},
							},
						},
						&kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorArgs{
							Type: pulumi.String("AppendDelimiterToRecord"),
						},
						&kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorArgs{
							Type: pulumi.String("MetadataExtraction"),
							Parameters: kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorParameterArray{
								&kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorParameterArgs{
									ParameterName:  pulumi.String("JsonParsingEngine"),
									ParameterValue: pulumi.String("JQ-1.6"),
								},
								&kinesis.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorParameterArgs{
									ParameterName:  pulumi.String("MetadataExtractionQuery"),
									ParameterValue: pulumi.String("{customer_id:.customer_id}"),
								},
							},
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
import com.pulumi.aws.kinesis.FirehoseDeliveryStream;
import com.pulumi.aws.kinesis.FirehoseDeliveryStreamArgs;
import com.pulumi.aws.kinesis.inputs.FirehoseDeliveryStreamExtendedS3ConfigurationArgs;
import com.pulumi.aws.kinesis.inputs.FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationArgs;
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
        var extendedS3Stream = new FirehoseDeliveryStream("extendedS3Stream", FirehoseDeliveryStreamArgs.builder()        
            .destination("extended_s3")
            .extendedS3Configuration(FirehoseDeliveryStreamExtendedS3ConfigurationArgs.builder()
                .roleArn(aws_iam_role.firehose_role().arn())
                .bucketArn(aws_s3_bucket.bucket().arn())
                .prefix("data/customer_id=!{partitionKeyFromQuery:customer_id}/year=!{timestamp:yyyy}/month=!{timestamp:MM}/day=!{timestamp:dd}/hour=!{timestamp:HH}/")
                .errorOutputPrefix("errors/year=!{timestamp:yyyy}/month=!{timestamp:MM}/day=!{timestamp:dd}/hour=!{timestamp:HH}/!{firehose:error-output-type}/")
                .bufferSize(64)
                .processingConfiguration(FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationArgs.builder()
                    .enabled("true")
                    .processors(                    
                        FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorArgs.builder()
                            .type("RecordDeAggregation")
                            .parameters(FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorParameterArgs.builder()
                                .parameterName("SubRecordType")
                                .parameterValue("JSON")
                                .build())
                            .build(),
                        FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorArgs.builder()
                            .type("AppendDelimiterToRecord")
                            .build(),
                        FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorArgs.builder()
                            .type("MetadataExtraction")
                            .parameters(                            
                                FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorParameterArgs.builder()
                                    .parameterName("JsonParsingEngine")
                                    .parameterValue("JQ-1.6")
                                    .build(),
                                FirehoseDeliveryStreamExtendedS3ConfigurationProcessingConfigurationProcessorParameterArgs.builder()
                                    .parameterName("MetadataExtractionQuery")
                                    .parameterValue("{customer_id:.customer_id}")
                                    .build())
                            .build())
                    .build())
                .build())
            .build());

    }
}
```
```yaml
resources:
  extendedS3Stream:
    type: aws:kinesis:FirehoseDeliveryStream
    properties:
      destination: extended_s3
      extendedS3Configuration:
        roleArn: ${aws_iam_role.firehose_role.arn}
        bucketArn: ${aws_s3_bucket.bucket.arn}
        prefix: data/customer_id=!{partitionKeyFromQuery:customer_id}/year=!{timestamp:yyyy}/month=!{timestamp:MM}/day=!{timestamp:dd}/hour=!{timestamp:HH}/
        errorOutputPrefix: errors/year=!{timestamp:yyyy}/month=!{timestamp:MM}/day=!{timestamp:dd}/hour=!{timestamp:HH}/!{firehose:error-output-type}/
        bufferSize: 64
        processingConfiguration:
          enabled: true
          processors:
            - type: RecordDeAggregation
              parameters:
                - parameterName: SubRecordType
                  parameterValue: JSON
            - type: AppendDelimiterToRecord
            - type: MetadataExtraction
              parameters:
                - parameterName: JsonParsingEngine
                  parameterValue: JQ-1.6
                - parameterName: MetadataExtractionQuery
                  parameterValue: '{customer_id:.customer_id}'
```
{{% /example %}}
{{% example %}}
### S3 Destination (deprecated)

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bucket = new aws.s3.BucketV2("bucket", {});
const bucketAcl = new aws.s3.BucketAclV2("bucketAcl", {
    bucket: bucket.id,
    acl: "private",
});
const firehoseRole = new aws.iam.Role("firehoseRole", {assumeRolePolicy: `{
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
const testStream = new aws.kinesis.FirehoseDeliveryStream("testStream", {
    destination: "s3",
    s3Configuration: {
        roleArn: firehoseRole.arn,
        bucketArn: bucket.arn,
    },
});
```
```python
import pulumi
import pulumi_aws as aws

bucket = aws.s3.BucketV2("bucket")
bucket_acl = aws.s3.BucketAclV2("bucketAcl",
    bucket=bucket.id,
    acl="private")
firehose_role = aws.iam.Role("firehoseRole", assume_role_policy="""{
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
test_stream = aws.kinesis.FirehoseDeliveryStream("testStream",
    destination="s3",
    s3_configuration=aws.kinesis.FirehoseDeliveryStreamS3ConfigurationArgs(
        role_arn=firehose_role.arn,
        bucket_arn=bucket.arn,
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var bucket = new Aws.S3.BucketV2("bucket");

    var bucketAcl = new Aws.S3.BucketAclV2("bucketAcl", new()
    {
        Bucket = bucket.Id,
        Acl = "private",
    });

    var firehoseRole = new Aws.Iam.Role("firehoseRole", new()
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

    var testStream = new Aws.Kinesis.FirehoseDeliveryStream("testStream", new()
    {
        Destination = "s3",
        S3Configuration = new Aws.Kinesis.Inputs.FirehoseDeliveryStreamS3ConfigurationArgs
        {
            RoleArn = firehoseRole.Arn,
            BucketArn = bucket.Arn,
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/kinesis"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		bucket, err := s3.NewBucketV2(ctx, "bucket", nil)
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
		firehoseRole, err := iam.NewRole(ctx, "firehoseRole", &iam.RoleArgs{
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
		_, err = kinesis.NewFirehoseDeliveryStream(ctx, "testStream", &kinesis.FirehoseDeliveryStreamArgs{
			Destination: pulumi.String("s3"),
			S3Configuration: &kinesis.FirehoseDeliveryStreamS3ConfigurationArgs{
				RoleArn:   firehoseRole.Arn,
				BucketArn: bucket.Arn,
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
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.s3.BucketAclV2;
import com.pulumi.aws.s3.BucketAclV2Args;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.kinesis.FirehoseDeliveryStream;
import com.pulumi.aws.kinesis.FirehoseDeliveryStreamArgs;
import com.pulumi.aws.kinesis.inputs.FirehoseDeliveryStreamS3ConfigurationArgs;
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
        var bucket = new BucketV2("bucket");

        var bucketAcl = new BucketAclV2("bucketAcl", BucketAclV2Args.builder()        
            .bucket(bucket.id())
            .acl("private")
            .build());

        var firehoseRole = new Role("firehoseRole", RoleArgs.builder()        
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

        var testStream = new FirehoseDeliveryStream("testStream", FirehoseDeliveryStreamArgs.builder()        
            .destination("s3")
            .s3Configuration(FirehoseDeliveryStreamS3ConfigurationArgs.builder()
                .roleArn(firehoseRole.arn())
                .bucketArn(bucket.arn())
                .build())
            .build());

    }
}
```
```yaml
resources:
  bucket:
    type: aws:s3:BucketV2
  bucketAcl:
    type: aws:s3:BucketAclV2
    properties:
      bucket: ${bucket.id}
      acl: private
  firehoseRole:
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
  testStream:
    type: aws:kinesis:FirehoseDeliveryStream
    properties:
      destination: s3
      s3Configuration:
        roleArn: ${firehoseRole.arn}
        bucketArn: ${bucket.arn}
```
{{% /example %}}
{{% example %}}
### Redshift Destination

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const testCluster = new aws.redshift.Cluster("testCluster", {
    clusterIdentifier: "tf-redshift-cluster",
    databaseName: "test",
    masterUsername: "testuser",
    masterPassword: "T3stPass",
    nodeType: "dc1.large",
    clusterType: "single-node",
});
const testStream = new aws.kinesis.FirehoseDeliveryStream("testStream", {
    destination: "redshift",
    s3Configuration: {
        roleArn: aws_iam_role.firehose_role.arn,
        bucketArn: aws_s3_bucket.bucket.arn,
        bufferSize: 10,
        bufferInterval: 400,
        compressionFormat: "GZIP",
    },
    redshiftConfiguration: {
        roleArn: aws_iam_role.firehose_role.arn,
        clusterJdbcurl: pulumi.interpolate`jdbc:redshift://${testCluster.endpoint}/${testCluster.databaseName}`,
        username: "testuser",
        password: "T3stPass",
        dataTableName: "test-table",
        copyOptions: "delimiter '|'",
        dataTableColumns: "test-col",
        s3BackupMode: "Enabled",
        s3BackupConfiguration: {
            roleArn: aws_iam_role.firehose_role.arn,
            bucketArn: aws_s3_bucket.bucket.arn,
            bufferSize: 15,
            bufferInterval: 300,
            compressionFormat: "GZIP",
        },
    },
});
```
```python
import pulumi
import pulumi_aws as aws

test_cluster = aws.redshift.Cluster("testCluster",
    cluster_identifier="tf-redshift-cluster",
    database_name="test",
    master_username="testuser",
    master_password="T3stPass",
    node_type="dc1.large",
    cluster_type="single-node")
test_stream = aws.kinesis.FirehoseDeliveryStream("testStream",
    destination="redshift",
    s3_configuration=aws.kinesis.FirehoseDeliveryStreamS3ConfigurationArgs(
        role_arn=aws_iam_role["firehose_role"]["arn"],
        bucket_arn=aws_s3_bucket["bucket"]["arn"],
        buffer_size=10,
        buffer_interval=400,
        compression_format="GZIP",
    ),
    redshift_configuration=aws.kinesis.FirehoseDeliveryStreamRedshiftConfigurationArgs(
        role_arn=aws_iam_role["firehose_role"]["arn"],
        cluster_jdbcurl=pulumi.Output.all(test_cluster.endpoint, test_cluster.database_name).apply(lambda endpoint, database_name: f"jdbc:redshift://{endpoint}/{database_name}"),
        username="testuser",
        password="T3stPass",
        data_table_name="test-table",
        copy_options="delimiter '|'",
        data_table_columns="test-col",
        s3_backup_mode="Enabled",
        s3_backup_configuration=aws.kinesis.FirehoseDeliveryStreamRedshiftConfigurationS3BackupConfigurationArgs(
            role_arn=aws_iam_role["firehose_role"]["arn"],
            bucket_arn=aws_s3_bucket["bucket"]["arn"],
            buffer_size=15,
            buffer_interval=300,
            compression_format="GZIP",
        ),
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var testCluster = new Aws.RedShift.Cluster("testCluster", new()
    {
        ClusterIdentifier = "tf-redshift-cluster",
        DatabaseName = "test",
        MasterUsername = "testuser",
        MasterPassword = "T3stPass",
        NodeType = "dc1.large",
        ClusterType = "single-node",
    });

    var testStream = new Aws.Kinesis.FirehoseDeliveryStream("testStream", new()
    {
        Destination = "redshift",
        S3Configuration = new Aws.Kinesis.Inputs.FirehoseDeliveryStreamS3ConfigurationArgs
        {
            RoleArn = aws_iam_role.Firehose_role.Arn,
            BucketArn = aws_s3_bucket.Bucket.Arn,
            BufferSize = 10,
            BufferInterval = 400,
            CompressionFormat = "GZIP",
        },
        RedshiftConfiguration = new Aws.Kinesis.Inputs.FirehoseDeliveryStreamRedshiftConfigurationArgs
        {
            RoleArn = aws_iam_role.Firehose_role.Arn,
            ClusterJdbcurl = Output.Tuple(testCluster.Endpoint, testCluster.DatabaseName).Apply(values =>
            {
                var endpoint = values.Item1;
                var databaseName = values.Item2;
                return $"jdbc:redshift://{endpoint}/{databaseName}";
            }),
            Username = "testuser",
            Password = "T3stPass",
            DataTableName = "test-table",
            CopyOptions = "delimiter '|'",
            DataTableColumns = "test-col",
            S3BackupMode = "Enabled",
            S3BackupConfiguration = new Aws.Kinesis.Inputs.FirehoseDeliveryStreamRedshiftConfigurationS3BackupConfigurationArgs
            {
                RoleArn = aws_iam_role.Firehose_role.Arn,
                BucketArn = aws_s3_bucket.Bucket.Arn,
                BufferSize = 15,
                BufferInterval = 300,
                CompressionFormat = "GZIP",
            },
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/kinesis"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/redshift"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		testCluster, err := redshift.NewCluster(ctx, "testCluster", &redshift.ClusterArgs{
			ClusterIdentifier: pulumi.String("tf-redshift-cluster"),
			DatabaseName:      pulumi.String("test"),
			MasterUsername:    pulumi.String("testuser"),
			MasterPassword:    pulumi.String("T3stPass"),
			NodeType:          pulumi.String("dc1.large"),
			ClusterType:       pulumi.String("single-node"),
		})
		if err != nil {
			return err
		}
		_, err = kinesis.NewFirehoseDeliveryStream(ctx, "testStream", &kinesis.FirehoseDeliveryStreamArgs{
			Destination: pulumi.String("redshift"),
			S3Configuration: &kinesis.FirehoseDeliveryStreamS3ConfigurationArgs{
				RoleArn:           pulumi.Any(aws_iam_role.Firehose_role.Arn),
				BucketArn:         pulumi.Any(aws_s3_bucket.Bucket.Arn),
				BufferSize:        pulumi.Int(10),
				BufferInterval:    pulumi.Int(400),
				CompressionFormat: pulumi.String("GZIP"),
			},
			RedshiftConfiguration: &kinesis.FirehoseDeliveryStreamRedshiftConfigurationArgs{
				RoleArn: pulumi.Any(aws_iam_role.Firehose_role.Arn),
				ClusterJdbcurl: pulumi.All(testCluster.Endpoint, testCluster.DatabaseName).ApplyT(func(_args []interface{}) (string, error) {
					endpoint := _args[0].(string)
					databaseName := _args[1].(string)
					return fmt.Sprintf("jdbc:redshift://%v/%v", endpoint, databaseName), nil
				}).(pulumi.StringOutput),
				Username:         pulumi.String("testuser"),
				Password:         pulumi.String("T3stPass"),
				DataTableName:    pulumi.String("test-table"),
				CopyOptions:      pulumi.String("delimiter '|'"),
				DataTableColumns: pulumi.String("test-col"),
				S3BackupMode:     pulumi.String("Enabled"),
				S3BackupConfiguration: &kinesis.FirehoseDeliveryStreamRedshiftConfigurationS3BackupConfigurationArgs{
					RoleArn:           pulumi.Any(aws_iam_role.Firehose_role.Arn),
					BucketArn:         pulumi.Any(aws_s3_bucket.Bucket.Arn),
					BufferSize:        pulumi.Int(15),
					BufferInterval:    pulumi.Int(300),
					CompressionFormat: pulumi.String("GZIP"),
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
import com.pulumi.aws.redshift.Cluster;
import com.pulumi.aws.redshift.ClusterArgs;
import com.pulumi.aws.kinesis.FirehoseDeliveryStream;
import com.pulumi.aws.kinesis.FirehoseDeliveryStreamArgs;
import com.pulumi.aws.kinesis.inputs.FirehoseDeliveryStreamS3ConfigurationArgs;
import com.pulumi.aws.kinesis.inputs.FirehoseDeliveryStreamRedshiftConfigurationArgs;
import com.pulumi.aws.kinesis.inputs.FirehoseDeliveryStreamRedshiftConfigurationS3BackupConfigurationArgs;
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
        var testCluster = new Cluster("testCluster", ClusterArgs.builder()        
            .clusterIdentifier("tf-redshift-cluster")
            .databaseName("test")
            .masterUsername("testuser")
            .masterPassword("T3stPass")
            .nodeType("dc1.large")
            .clusterType("single-node")
            .build());

        var testStream = new FirehoseDeliveryStream("testStream", FirehoseDeliveryStreamArgs.builder()        
            .destination("redshift")
            .s3Configuration(FirehoseDeliveryStreamS3ConfigurationArgs.builder()
                .roleArn(aws_iam_role.firehose_role().arn())
                .bucketArn(aws_s3_bucket.bucket().arn())
                .bufferSize(10)
                .bufferInterval(400)
                .compressionFormat("GZIP")
                .build())
            .redshiftConfiguration(FirehoseDeliveryStreamRedshiftConfigurationArgs.builder()
                .roleArn(aws_iam_role.firehose_role().arn())
                .clusterJdbcurl(Output.tuple(testCluster.endpoint(), testCluster.databaseName()).applyValue(values -> {
                    var endpoint = values.t1;
                    var databaseName = values.t2;
                    return String.format("jdbc:redshift://%s/%s", endpoint,databaseName);
                }))
                .username("testuser")
                .password("T3stPass")
                .dataTableName("test-table")
                .copyOptions("delimiter '|'")
                .dataTableColumns("test-col")
                .s3BackupMode("Enabled")
                .s3BackupConfiguration(FirehoseDeliveryStreamRedshiftConfigurationS3BackupConfigurationArgs.builder()
                    .roleArn(aws_iam_role.firehose_role().arn())
                    .bucketArn(aws_s3_bucket.bucket().arn())
                    .bufferSize(15)
                    .bufferInterval(300)
                    .compressionFormat("GZIP")
                    .build())
                .build())
            .build());

    }
}
```
```yaml
resources:
  testCluster:
    type: aws:redshift:Cluster
    properties:
      clusterIdentifier: tf-redshift-cluster
      databaseName: test
      masterUsername: testuser
      masterPassword: T3stPass
      nodeType: dc1.large
      clusterType: single-node
  testStream:
    type: aws:kinesis:FirehoseDeliveryStream
    properties:
      destination: redshift
      s3Configuration:
        roleArn: ${aws_iam_role.firehose_role.arn}
        bucketArn: ${aws_s3_bucket.bucket.arn}
        bufferSize: 10
        bufferInterval: 400
        compressionFormat: GZIP
      redshiftConfiguration:
        roleArn: ${aws_iam_role.firehose_role.arn}
        clusterJdbcurl: jdbc:redshift://${testCluster.endpoint}/${testCluster.databaseName}
        username: testuser
        password: T3stPass
        dataTableName: test-table
        copyOptions: delimiter '|'
        dataTableColumns: test-col
        s3BackupMode: Enabled
        s3BackupConfiguration:
          roleArn: ${aws_iam_role.firehose_role.arn}
          bucketArn: ${aws_s3_bucket.bucket.arn}
          bufferSize: 15
          bufferInterval: 300
          compressionFormat: GZIP
```
{{% /example %}}
{{% example %}}
### Elasticsearch Destination

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const testCluster = new aws.elasticsearch.Domain("testCluster", {});
const testStream = new aws.kinesis.FirehoseDeliveryStream("testStream", {
    destination: "elasticsearch",
    s3Configuration: {
        roleArn: aws_iam_role.firehose_role.arn,
        bucketArn: aws_s3_bucket.bucket.arn,
        bufferSize: 10,
        bufferInterval: 400,
        compressionFormat: "GZIP",
    },
    elasticsearchConfiguration: {
        domainArn: testCluster.arn,
        roleArn: aws_iam_role.firehose_role.arn,
        indexName: "test",
        typeName: "test",
        processingConfiguration: {
            enabled: true,
            processors: [{
                type: "Lambda",
                parameters: [{
                    parameterName: "LambdaArn",
                    parameterValue: `${aws_lambda_function.lambda_processor.arn}:$LATEST`,
                }],
            }],
        },
    },
});
```
```python
import pulumi
import pulumi_aws as aws

test_cluster = aws.elasticsearch.Domain("testCluster")
test_stream = aws.kinesis.FirehoseDeliveryStream("testStream",
    destination="elasticsearch",
    s3_configuration=aws.kinesis.FirehoseDeliveryStreamS3ConfigurationArgs(
        role_arn=aws_iam_role["firehose_role"]["arn"],
        bucket_arn=aws_s3_bucket["bucket"]["arn"],
        buffer_size=10,
        buffer_interval=400,
        compression_format="GZIP",
    ),
    elasticsearch_configuration=aws.kinesis.FirehoseDeliveryStreamElasticsearchConfigurationArgs(
        domain_arn=test_cluster.arn,
        role_arn=aws_iam_role["firehose_role"]["arn"],
        index_name="test",
        type_name="test",
        processing_configuration=aws.kinesis.FirehoseDeliveryStreamElasticsearchConfigurationProcessingConfigurationArgs(
            enabled=True,
            processors=[aws.kinesis.FirehoseDeliveryStreamElasticsearchConfigurationProcessingConfigurationProcessorArgs(
                type="Lambda",
                parameters=[aws.kinesis.FirehoseDeliveryStreamElasticsearchConfigurationProcessingConfigurationProcessorParameterArgs(
                    parameter_name="LambdaArn",
                    parameter_value=f"{aws_lambda_function['lambda_processor']['arn']}:$LATEST",
                )],
            )],
        ),
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var testCluster = new Aws.ElasticSearch.Domain("testCluster");

    var testStream = new Aws.Kinesis.FirehoseDeliveryStream("testStream", new()
    {
        Destination = "elasticsearch",
        S3Configuration = new Aws.Kinesis.Inputs.FirehoseDeliveryStreamS3ConfigurationArgs
        {
            RoleArn = aws_iam_role.Firehose_role.Arn,
            BucketArn = aws_s3_bucket.Bucket.Arn,
            BufferSize = 10,
            BufferInterval = 400,
            CompressionFormat = "GZIP",
        },
        ElasticsearchConfiguration = new Aws.Kinesis.Inputs.FirehoseDeliveryStreamElasticsearchConfigurationArgs
        {
            DomainArn = testCluster.Arn,
            RoleArn = aws_iam_role.Firehose_role.Arn,
            IndexName = "test",
            TypeName = "test",
            ProcessingConfiguration = new Aws.Kinesis.Inputs.FirehoseDeliveryStreamElasticsearchConfigurationProcessingConfigurationArgs
            {
                Enabled = true,
                Processors = new[]
                {
                    new Aws.Kinesis.Inputs.FirehoseDeliveryStreamElasticsearchConfigurationProcessingConfigurationProcessorArgs
                    {
                        Type = "Lambda",
                        Parameters = new[]
                        {
                            new Aws.Kinesis.Inputs.FirehoseDeliveryStreamElasticsearchConfigurationProcessingConfigurationProcessorParameterArgs
                            {
                                ParameterName = "LambdaArn",
                                ParameterValue = $"{aws_lambda_function.Lambda_processor.Arn}:$LATEST",
                            },
                        },
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
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/elasticsearch"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/kinesis"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		testCluster, err := elasticsearch.NewDomain(ctx, "testCluster", nil)
		if err != nil {
			return err
		}
		_, err = kinesis.NewFirehoseDeliveryStream(ctx, "testStream", &kinesis.FirehoseDeliveryStreamArgs{
			Destination: pulumi.String("elasticsearch"),
			S3Configuration: &kinesis.FirehoseDeliveryStreamS3ConfigurationArgs{
				RoleArn:           pulumi.Any(aws_iam_role.Firehose_role.Arn),
				BucketArn:         pulumi.Any(aws_s3_bucket.Bucket.Arn),
				BufferSize:        pulumi.Int(10),
				BufferInterval:    pulumi.Int(400),
				CompressionFormat: pulumi.String("GZIP"),
			},
			ElasticsearchConfiguration: &kinesis.FirehoseDeliveryStreamElasticsearchConfigurationArgs{
				DomainArn: testCluster.Arn,
				RoleArn:   pulumi.Any(aws_iam_role.Firehose_role.Arn),
				IndexName: pulumi.String("test"),
				TypeName:  pulumi.String("test"),
				ProcessingConfiguration: &kinesis.FirehoseDeliveryStreamElasticsearchConfigurationProcessingConfigurationArgs{
					Enabled: pulumi.Bool(true),
					Processors: kinesis.FirehoseDeliveryStreamElasticsearchConfigurationProcessingConfigurationProcessorArray{
						&kinesis.FirehoseDeliveryStreamElasticsearchConfigurationProcessingConfigurationProcessorArgs{
							Type: pulumi.String("Lambda"),
							Parameters: kinesis.FirehoseDeliveryStreamElasticsearchConfigurationProcessingConfigurationProcessorParameterArray{
								&kinesis.FirehoseDeliveryStreamElasticsearchConfigurationProcessingConfigurationProcessorParameterArgs{
									ParameterName:  pulumi.String("LambdaArn"),
									ParameterValue: pulumi.String(fmt.Sprintf("%v:$LATEST", aws_lambda_function.Lambda_processor.Arn)),
								},
							},
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
import com.pulumi.aws.elasticsearch.Domain;
import com.pulumi.aws.kinesis.FirehoseDeliveryStream;
import com.pulumi.aws.kinesis.FirehoseDeliveryStreamArgs;
import com.pulumi.aws.kinesis.inputs.FirehoseDeliveryStreamS3ConfigurationArgs;
import com.pulumi.aws.kinesis.inputs.FirehoseDeliveryStreamElasticsearchConfigurationArgs;
import com.pulumi.aws.kinesis.inputs.FirehoseDeliveryStreamElasticsearchConfigurationProcessingConfigurationArgs;
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
        var testCluster = new Domain("testCluster");

        var testStream = new FirehoseDeliveryStream("testStream", FirehoseDeliveryStreamArgs.builder()        
            .destination("elasticsearch")
            .s3Configuration(FirehoseDeliveryStreamS3ConfigurationArgs.builder()
                .roleArn(aws_iam_role.firehose_role().arn())
                .bucketArn(aws_s3_bucket.bucket().arn())
                .bufferSize(10)
                .bufferInterval(400)
                .compressionFormat("GZIP")
                .build())
            .elasticsearchConfiguration(FirehoseDeliveryStreamElasticsearchConfigurationArgs.builder()
                .domainArn(testCluster.arn())
                .roleArn(aws_iam_role.firehose_role().arn())
                .indexName("test")
                .typeName("test")
                .processingConfiguration(FirehoseDeliveryStreamElasticsearchConfigurationProcessingConfigurationArgs.builder()
                    .enabled("true")
                    .processors(FirehoseDeliveryStreamElasticsearchConfigurationProcessingConfigurationProcessorArgs.builder()
                        .type("Lambda")
                        .parameters(FirehoseDeliveryStreamElasticsearchConfigurationProcessingConfigurationProcessorParameterArgs.builder()
                            .parameterName("LambdaArn")
                            .parameterValue(String.format("%s:$LATEST", aws_lambda_function.lambda_processor().arn()))
                            .build())
                        .build())
                    .build())
                .build())
            .build());

    }
}
```
```yaml
resources:
  testCluster:
    type: aws:elasticsearch:Domain
  testStream:
    type: aws:kinesis:FirehoseDeliveryStream
    properties:
      destination: elasticsearch
      s3Configuration:
        roleArn: ${aws_iam_role.firehose_role.arn}
        bucketArn: ${aws_s3_bucket.bucket.arn}
        bufferSize: 10
        bufferInterval: 400
        compressionFormat: GZIP
      elasticsearchConfiguration:
        domainArn: ${testCluster.arn}
        roleArn: ${aws_iam_role.firehose_role.arn}
        indexName: test
        typeName: test
        processingConfiguration:
          enabled: true
          processors:
            - type: Lambda
              parameters:
                - parameterName: LambdaArn
                  parameterValue: ${aws_lambda_function.lambda_processor.arn}:$LATEST
```
{{% /example %}}
{{% example %}}
### Elasticsearch Destination With VPC

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const testCluster = new aws.elasticsearch.Domain("testCluster", {
    clusterConfig: {
        instanceCount: 2,
        zoneAwarenessEnabled: true,
        instanceType: "t2.small.elasticsearch",
    },
    ebsOptions: {
        ebsEnabled: true,
        volumeSize: 10,
    },
    vpcOptions: {
        securityGroupIds: [aws_security_group.first.id],
        subnetIds: [
            aws_subnet.first.id,
            aws_subnet.second.id,
        ],
    },
});
const firehose_elasticsearch = new aws.iam.RolePolicy("firehose-elasticsearch", {
    role: aws_iam_role.firehose.id,
    policy: pulumi.interpolate`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "es:*"
      ],
      "Resource": [
        "${testCluster.arn}",
        "${testCluster.arn}/*"
      ]
        },
        {
          "Effect": "Allow",
          "Action": [
            "ec2:DescribeVpcs",
            "ec2:DescribeVpcAttribute",
            "ec2:DescribeSubnets",
            "ec2:DescribeSecurityGroups",
            "ec2:DescribeNetworkInterfaces",
            "ec2:CreateNetworkInterface",
            "ec2:CreateNetworkInterfacePermission",
            "ec2:DeleteNetworkInterface"
          ],
          "Resource": [
            "*"
          ]
        }
  ]
}
`,
});
const test = new aws.kinesis.FirehoseDeliveryStream("test", {
    destination: "elasticsearch",
    s3Configuration: {
        roleArn: aws_iam_role.firehose.arn,
        bucketArn: aws_s3_bucket.bucket.arn,
    },
    elasticsearchConfiguration: {
        domainArn: testCluster.arn,
        roleArn: aws_iam_role.firehose.arn,
        indexName: "test",
        typeName: "test",
        vpcConfig: {
            subnetIds: [
                aws_subnet.first.id,
                aws_subnet.second.id,
            ],
            securityGroupIds: [aws_security_group.first.id],
            roleArn: aws_iam_role.firehose.arn,
        },
    },
}, {
    dependsOn: [firehose_elasticsearch],
});
```
```python
import pulumi
import pulumi_aws as aws

test_cluster = aws.elasticsearch.Domain("testCluster",
    cluster_config=aws.elasticsearch.DomainClusterConfigArgs(
        instance_count=2,
        zone_awareness_enabled=True,
        instance_type="t2.small.elasticsearch",
    ),
    ebs_options=aws.elasticsearch.DomainEbsOptionsArgs(
        ebs_enabled=True,
        volume_size=10,
    ),
    vpc_options=aws.elasticsearch.DomainVpcOptionsArgs(
        security_group_ids=[aws_security_group["first"]["id"]],
        subnet_ids=[
            aws_subnet["first"]["id"],
            aws_subnet["second"]["id"],
        ],
    ))
firehose_elasticsearch = aws.iam.RolePolicy("firehose-elasticsearch",
    role=aws_iam_role["firehose"]["id"],
    policy=pulumi.Output.all(test_cluster.arn, test_cluster.arn).apply(lambda testClusterArn, testClusterArn1: f"""{{
  "Version": "2012-10-17",
  "Statement": [
    {{
      "Effect": "Allow",
      "Action": [
        "es:*"
      ],
      "Resource": [
        "{test_cluster_arn}",
        "{test_cluster_arn1}/*"
      ]
        }},
        {{
          "Effect": "Allow",
          "Action": [
            "ec2:DescribeVpcs",
            "ec2:DescribeVpcAttribute",
            "ec2:DescribeSubnets",
            "ec2:DescribeSecurityGroups",
            "ec2:DescribeNetworkInterfaces",
            "ec2:CreateNetworkInterface",
            "ec2:CreateNetworkInterfacePermission",
            "ec2:DeleteNetworkInterface"
          ],
          "Resource": [
            "*"
          ]
        }}
  ]
}}
"""))
test = aws.kinesis.FirehoseDeliveryStream("test",
    destination="elasticsearch",
    s3_configuration=aws.kinesis.FirehoseDeliveryStreamS3ConfigurationArgs(
        role_arn=aws_iam_role["firehose"]["arn"],
        bucket_arn=aws_s3_bucket["bucket"]["arn"],
    ),
    elasticsearch_configuration=aws.kinesis.FirehoseDeliveryStreamElasticsearchConfigurationArgs(
        domain_arn=test_cluster.arn,
        role_arn=aws_iam_role["firehose"]["arn"],
        index_name="test",
        type_name="test",
        vpc_config=aws.kinesis.FirehoseDeliveryStreamElasticsearchConfigurationVpcConfigArgs(
            subnet_ids=[
                aws_subnet["first"]["id"],
                aws_subnet["second"]["id"],
            ],
            security_group_ids=[aws_security_group["first"]["id"]],
            role_arn=aws_iam_role["firehose"]["arn"],
        ),
    ),
    opts=pulumi.ResourceOptions(depends_on=[firehose_elasticsearch]))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var testCluster = new Aws.ElasticSearch.Domain("testCluster", new()
    {
        ClusterConfig = new Aws.ElasticSearch.Inputs.DomainClusterConfigArgs
        {
            InstanceCount = 2,
            ZoneAwarenessEnabled = true,
            InstanceType = "t2.small.elasticsearch",
        },
        EbsOptions = new Aws.ElasticSearch.Inputs.DomainEbsOptionsArgs
        {
            EbsEnabled = true,
            VolumeSize = 10,
        },
        VpcOptions = new Aws.ElasticSearch.Inputs.DomainVpcOptionsArgs
        {
            SecurityGroupIds = new[]
            {
                aws_security_group.First.Id,
            },
            SubnetIds = new[]
            {
                aws_subnet.First.Id,
                aws_subnet.Second.Id,
            },
        },
    });

    var firehose_elasticsearch = new Aws.Iam.RolePolicy("firehose-elasticsearch", new()
    {
        Role = aws_iam_role.Firehose.Id,
        Policy = Output.Tuple(testCluster.Arn, testCluster.Arn).Apply(values =>
        {
            var testClusterArn = values.Item1;
            var testClusterArn1 = values.Item2;
            return @$"{{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {{
      ""Effect"": ""Allow"",
      ""Action"": [
        ""es:*""
      ],
      ""Resource"": [
        ""{testClusterArn}"",
        ""{testClusterArn1}/*""
      ]
        }},
        {{
          ""Effect"": ""Allow"",
          ""Action"": [
            ""ec2:DescribeVpcs"",
            ""ec2:DescribeVpcAttribute"",
            ""ec2:DescribeSubnets"",
            ""ec2:DescribeSecurityGroups"",
            ""ec2:DescribeNetworkInterfaces"",
            ""ec2:CreateNetworkInterface"",
            ""ec2:CreateNetworkInterfacePermission"",
            ""ec2:DeleteNetworkInterface""
          ],
          ""Resource"": [
            ""*""
          ]
        }}
  ]
}}
";
        }),
    });

    var test = new Aws.Kinesis.FirehoseDeliveryStream("test", new()
    {
        Destination = "elasticsearch",
        S3Configuration = new Aws.Kinesis.Inputs.FirehoseDeliveryStreamS3ConfigurationArgs
        {
            RoleArn = aws_iam_role.Firehose.Arn,
            BucketArn = aws_s3_bucket.Bucket.Arn,
        },
        ElasticsearchConfiguration = new Aws.Kinesis.Inputs.FirehoseDeliveryStreamElasticsearchConfigurationArgs
        {
            DomainArn = testCluster.Arn,
            RoleArn = aws_iam_role.Firehose.Arn,
            IndexName = "test",
            TypeName = "test",
            VpcConfig = new Aws.Kinesis.Inputs.FirehoseDeliveryStreamElasticsearchConfigurationVpcConfigArgs
            {
                SubnetIds = new[]
                {
                    aws_subnet.First.Id,
                    aws_subnet.Second.Id,
                },
                SecurityGroupIds = new[]
                {
                    aws_security_group.First.Id,
                },
                RoleArn = aws_iam_role.Firehose.Arn,
            },
        },
    }, new CustomResourceOptions
    {
        DependsOn = new[]
        {
            firehose_elasticsearch,
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/elasticsearch"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/kinesis"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		testCluster, err := elasticsearch.NewDomain(ctx, "testCluster", &elasticsearch.DomainArgs{
			ClusterConfig: &elasticsearch.DomainClusterConfigArgs{
				InstanceCount:        pulumi.Int(2),
				ZoneAwarenessEnabled: pulumi.Bool(true),
				InstanceType:         pulumi.String("t2.small.elasticsearch"),
			},
			EbsOptions: &elasticsearch.DomainEbsOptionsArgs{
				EbsEnabled: pulumi.Bool(true),
				VolumeSize: pulumi.Int(10),
			},
			VpcOptions: &elasticsearch.DomainVpcOptionsArgs{
				SecurityGroupIds: pulumi.StringArray{
					pulumi.Any(aws_security_group.First.Id),
				},
				SubnetIds: pulumi.StringArray{
					pulumi.Any(aws_subnet.First.Id),
					pulumi.Any(aws_subnet.Second.Id),
				},
			},
		})
		if err != nil {
			return err
		}
		_, err = iam.NewRolePolicy(ctx, "firehose-elasticsearch", &iam.RolePolicyArgs{
			Role: pulumi.Any(aws_iam_role.Firehose.Id),
			Policy: pulumi.All(testCluster.Arn, testCluster.Arn).ApplyT(func(_args []interface{}) (string, error) {
				testClusterArn := _args[0].(string)
				testClusterArn1 := _args[1].(string)
				return fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "es:*"
      ],
      "Resource": [
        "%v",
        "%v/*"
      ]
        },
        {
          "Effect": "Allow",
          "Action": [
            "ec2:DescribeVpcs",
            "ec2:DescribeVpcAttribute",
            "ec2:DescribeSubnets",
            "ec2:DescribeSecurityGroups",
            "ec2:DescribeNetworkInterfaces",
            "ec2:CreateNetworkInterface",
            "ec2:CreateNetworkInterfacePermission",
            "ec2:DeleteNetworkInterface"
          ],
          "Resource": [
            "*"
          ]
        }
  ]
}
`, testClusterArn, testClusterArn1), nil
			}).(pulumi.StringOutput),
		})
		if err != nil {
			return err
		}
		_, err = kinesis.NewFirehoseDeliveryStream(ctx, "test", &kinesis.FirehoseDeliveryStreamArgs{
			Destination: pulumi.String("elasticsearch"),
			S3Configuration: &kinesis.FirehoseDeliveryStreamS3ConfigurationArgs{
				RoleArn:   pulumi.Any(aws_iam_role.Firehose.Arn),
				BucketArn: pulumi.Any(aws_s3_bucket.Bucket.Arn),
			},
			ElasticsearchConfiguration: &kinesis.FirehoseDeliveryStreamElasticsearchConfigurationArgs{
				DomainArn: testCluster.Arn,
				RoleArn:   pulumi.Any(aws_iam_role.Firehose.Arn),
				IndexName: pulumi.String("test"),
				TypeName:  pulumi.String("test"),
				VpcConfig: &kinesis.FirehoseDeliveryStreamElasticsearchConfigurationVpcConfigArgs{
					SubnetIds: pulumi.StringArray{
						pulumi.Any(aws_subnet.First.Id),
						pulumi.Any(aws_subnet.Second.Id),
					},
					SecurityGroupIds: pulumi.StringArray{
						pulumi.Any(aws_security_group.First.Id),
					},
					RoleArn: pulumi.Any(aws_iam_role.Firehose.Arn),
				},
			},
		}, pulumi.DependsOn([]pulumi.Resource{
			firehose_elasticsearch,
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
import com.pulumi.aws.elasticsearch.Domain;
import com.pulumi.aws.elasticsearch.DomainArgs;
import com.pulumi.aws.elasticsearch.inputs.DomainClusterConfigArgs;
import com.pulumi.aws.elasticsearch.inputs.DomainEbsOptionsArgs;
import com.pulumi.aws.elasticsearch.inputs.DomainVpcOptionsArgs;
import com.pulumi.aws.iam.RolePolicy;
import com.pulumi.aws.iam.RolePolicyArgs;
import com.pulumi.aws.kinesis.FirehoseDeliveryStream;
import com.pulumi.aws.kinesis.FirehoseDeliveryStreamArgs;
import com.pulumi.aws.kinesis.inputs.FirehoseDeliveryStreamS3ConfigurationArgs;
import com.pulumi.aws.kinesis.inputs.FirehoseDeliveryStreamElasticsearchConfigurationArgs;
import com.pulumi.aws.kinesis.inputs.FirehoseDeliveryStreamElasticsearchConfigurationVpcConfigArgs;
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
        var testCluster = new Domain("testCluster", DomainArgs.builder()        
            .clusterConfig(DomainClusterConfigArgs.builder()
                .instanceCount(2)
                .zoneAwarenessEnabled(true)
                .instanceType("t2.small.elasticsearch")
                .build())
            .ebsOptions(DomainEbsOptionsArgs.builder()
                .ebsEnabled(true)
                .volumeSize(10)
                .build())
            .vpcOptions(DomainVpcOptionsArgs.builder()
                .securityGroupIds(aws_security_group.first().id())
                .subnetIds(                
                    aws_subnet.first().id(),
                    aws_subnet.second().id())
                .build())
            .build());

        var firehose_elasticsearch = new RolePolicy("firehose-elasticsearch", RolePolicyArgs.builder()        
            .role(aws_iam_role.firehose().id())
            .policy(Output.tuple(testCluster.arn(), testCluster.arn()).applyValue(values -> {
                var testClusterArn = values.t1;
                var testClusterArn1 = values.t2;
                return """
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "es:*"
      ],
      "Resource": [
        "%s",
        "%s/*"
      ]
        },
        {
          "Effect": "Allow",
          "Action": [
            "ec2:DescribeVpcs",
            "ec2:DescribeVpcAttribute",
            "ec2:DescribeSubnets",
            "ec2:DescribeSecurityGroups",
            "ec2:DescribeNetworkInterfaces",
            "ec2:CreateNetworkInterface",
            "ec2:CreateNetworkInterfacePermission",
            "ec2:DeleteNetworkInterface"
          ],
          "Resource": [
            "*"
          ]
        }
  ]
}
", testClusterArn,testClusterArn1);
            }))
            .build());

        var test = new FirehoseDeliveryStream("test", FirehoseDeliveryStreamArgs.builder()        
            .destination("elasticsearch")
            .s3Configuration(FirehoseDeliveryStreamS3ConfigurationArgs.builder()
                .roleArn(aws_iam_role.firehose().arn())
                .bucketArn(aws_s3_bucket.bucket().arn())
                .build())
            .elasticsearchConfiguration(FirehoseDeliveryStreamElasticsearchConfigurationArgs.builder()
                .domainArn(testCluster.arn())
                .roleArn(aws_iam_role.firehose().arn())
                .indexName("test")
                .typeName("test")
                .vpcConfig(FirehoseDeliveryStreamElasticsearchConfigurationVpcConfigArgs.builder()
                    .subnetIds(                    
                        aws_subnet.first().id(),
                        aws_subnet.second().id())
                    .securityGroupIds(aws_security_group.first().id())
                    .roleArn(aws_iam_role.firehose().arn())
                    .build())
                .build())
            .build(), CustomResourceOptions.builder()
                .dependsOn(firehose_elasticsearch)
                .build());

    }
}
```
```yaml
resources:
  testCluster:
    type: aws:elasticsearch:Domain
    properties:
      clusterConfig:
        instanceCount: 2
        zoneAwarenessEnabled: true
        instanceType: t2.small.elasticsearch
      ebsOptions:
        ebsEnabled: true
        volumeSize: 10
      vpcOptions:
        securityGroupIds:
          - ${aws_security_group.first.id}
        subnetIds:
          - ${aws_subnet.first.id}
          - ${aws_subnet.second.id}
  firehose-elasticsearch:
    type: aws:iam:RolePolicy
    properties:
      role: ${aws_iam_role.firehose.id}
      policy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Action": [
                "es:*"
              ],
              "Resource": [
                "${testCluster.arn}",
                "${testCluster.arn}/*"
              ]
                },
                {
                  "Effect": "Allow",
                  "Action": [
                    "ec2:DescribeVpcs",
                    "ec2:DescribeVpcAttribute",
                    "ec2:DescribeSubnets",
                    "ec2:DescribeSecurityGroups",
                    "ec2:DescribeNetworkInterfaces",
                    "ec2:CreateNetworkInterface",
                    "ec2:CreateNetworkInterfacePermission",
                    "ec2:DeleteNetworkInterface"
                  ],
                  "Resource": [
                    "*"
                  ]
                }
          ]
        }
  test:
    type: aws:kinesis:FirehoseDeliveryStream
    properties:
      destination: elasticsearch
      s3Configuration:
        roleArn: ${aws_iam_role.firehose.arn}
        bucketArn: ${aws_s3_bucket.bucket.arn}
      elasticsearchConfiguration:
        domainArn: ${testCluster.arn}
        roleArn: ${aws_iam_role.firehose.arn}
        indexName: test
        typeName: test
        vpcConfig:
          subnetIds:
            - ${aws_subnet.first.id}
            - ${aws_subnet.second.id}
          securityGroupIds:
            - ${aws_security_group.first.id}
          roleArn: ${aws_iam_role.firehose.arn}
    options:
      dependson:
        - ${["firehose-elasticsearch"]}
```
{{% /example %}}
{{% example %}}
### Splunk Destination

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const testStream = new aws.kinesis.FirehoseDeliveryStream("testStream", {
    destination: "splunk",
    s3Configuration: {
        roleArn: aws_iam_role.firehose.arn,
        bucketArn: aws_s3_bucket.bucket.arn,
        bufferSize: 10,
        bufferInterval: 400,
        compressionFormat: "GZIP",
    },
    splunkConfiguration: {
        hecEndpoint: "https://http-inputs-mydomain.splunkcloud.com:443",
        hecToken: "51D4DA16-C61B-4F5F-8EC7-ED4301342A4A",
        hecAcknowledgmentTimeout: 600,
        hecEndpointType: "Event",
        s3BackupMode: "FailedEventsOnly",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

test_stream = aws.kinesis.FirehoseDeliveryStream("testStream",
    destination="splunk",
    s3_configuration=aws.kinesis.FirehoseDeliveryStreamS3ConfigurationArgs(
        role_arn=aws_iam_role["firehose"]["arn"],
        bucket_arn=aws_s3_bucket["bucket"]["arn"],
        buffer_size=10,
        buffer_interval=400,
        compression_format="GZIP",
    ),
    splunk_configuration=aws.kinesis.FirehoseDeliveryStreamSplunkConfigurationArgs(
        hec_endpoint="https://http-inputs-mydomain.splunkcloud.com:443",
        hec_token="51D4DA16-C61B-4F5F-8EC7-ED4301342A4A",
        hec_acknowledgment_timeout=600,
        hec_endpoint_type="Event",
        s3_backup_mode="FailedEventsOnly",
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var testStream = new Aws.Kinesis.FirehoseDeliveryStream("testStream", new()
    {
        Destination = "splunk",
        S3Configuration = new Aws.Kinesis.Inputs.FirehoseDeliveryStreamS3ConfigurationArgs
        {
            RoleArn = aws_iam_role.Firehose.Arn,
            BucketArn = aws_s3_bucket.Bucket.Arn,
            BufferSize = 10,
            BufferInterval = 400,
            CompressionFormat = "GZIP",
        },
        SplunkConfiguration = new Aws.Kinesis.Inputs.FirehoseDeliveryStreamSplunkConfigurationArgs
        {
            HecEndpoint = "https://http-inputs-mydomain.splunkcloud.com:443",
            HecToken = "51D4DA16-C61B-4F5F-8EC7-ED4301342A4A",
            HecAcknowledgmentTimeout = 600,
            HecEndpointType = "Event",
            S3BackupMode = "FailedEventsOnly",
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/kinesis"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := kinesis.NewFirehoseDeliveryStream(ctx, "testStream", &kinesis.FirehoseDeliveryStreamArgs{
			Destination: pulumi.String("splunk"),
			S3Configuration: &kinesis.FirehoseDeliveryStreamS3ConfigurationArgs{
				RoleArn:           pulumi.Any(aws_iam_role.Firehose.Arn),
				BucketArn:         pulumi.Any(aws_s3_bucket.Bucket.Arn),
				BufferSize:        pulumi.Int(10),
				BufferInterval:    pulumi.Int(400),
				CompressionFormat: pulumi.String("GZIP"),
			},
			SplunkConfiguration: &kinesis.FirehoseDeliveryStreamSplunkConfigurationArgs{
				HecEndpoint:              pulumi.String("https://http-inputs-mydomain.splunkcloud.com:443"),
				HecToken:                 pulumi.String("51D4DA16-C61B-4F5F-8EC7-ED4301342A4A"),
				HecAcknowledgmentTimeout: pulumi.Int(600),
				HecEndpointType:          pulumi.String("Event"),
				S3BackupMode:             pulumi.String("FailedEventsOnly"),
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
import com.pulumi.aws.kinesis.FirehoseDeliveryStream;
import com.pulumi.aws.kinesis.FirehoseDeliveryStreamArgs;
import com.pulumi.aws.kinesis.inputs.FirehoseDeliveryStreamS3ConfigurationArgs;
import com.pulumi.aws.kinesis.inputs.FirehoseDeliveryStreamSplunkConfigurationArgs;
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
        var testStream = new FirehoseDeliveryStream("testStream", FirehoseDeliveryStreamArgs.builder()        
            .destination("splunk")
            .s3Configuration(FirehoseDeliveryStreamS3ConfigurationArgs.builder()
                .roleArn(aws_iam_role.firehose().arn())
                .bucketArn(aws_s3_bucket.bucket().arn())
                .bufferSize(10)
                .bufferInterval(400)
                .compressionFormat("GZIP")
                .build())
            .splunkConfiguration(FirehoseDeliveryStreamSplunkConfigurationArgs.builder()
                .hecEndpoint("https://http-inputs-mydomain.splunkcloud.com:443")
                .hecToken("51D4DA16-C61B-4F5F-8EC7-ED4301342A4A")
                .hecAcknowledgmentTimeout(600)
                .hecEndpointType("Event")
                .s3BackupMode("FailedEventsOnly")
                .build())
            .build());

    }
}
```
```yaml
resources:
  testStream:
    type: aws:kinesis:FirehoseDeliveryStream
    properties:
      destination: splunk
      s3Configuration:
        roleArn: ${aws_iam_role.firehose.arn}
        bucketArn: ${aws_s3_bucket.bucket.arn}
        bufferSize: 10
        bufferInterval: 400
        compressionFormat: GZIP
      splunkConfiguration:
        hecEndpoint: https://http-inputs-mydomain.splunkcloud.com:443
        hecToken: 51D4DA16-C61B-4F5F-8EC7-ED4301342A4A
        hecAcknowledgmentTimeout: 600
        hecEndpointType: Event
        s3BackupMode: FailedEventsOnly
```
{{% /example %}}
{{% example %}}
### HTTP Endpoint (e.g., New Relic) Destination

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const testStream = new aws.kinesis.FirehoseDeliveryStream("testStream", {
    destination: "http_endpoint",
    s3Configuration: {
        roleArn: aws_iam_role.firehose.arn,
        bucketArn: aws_s3_bucket.bucket.arn,
        bufferSize: 10,
        bufferInterval: 400,
        compressionFormat: "GZIP",
    },
    httpEndpointConfiguration: {
        url: "https://aws-api.newrelic.com/firehose/v1",
        name: "New Relic",
        accessKey: "my-key",
        bufferingSize: 15,
        bufferingInterval: 600,
        roleArn: aws_iam_role.firehose.arn,
        s3BackupMode: "FailedDataOnly",
        requestConfiguration: {
            contentEncoding: "GZIP",
            commonAttributes: [
                {
                    name: "testname",
                    value: "testvalue",
                },
                {
                    name: "testname2",
                    value: "testvalue2",
                },
            ],
        },
    },
});
```
```python
import pulumi
import pulumi_aws as aws

test_stream = aws.kinesis.FirehoseDeliveryStream("testStream",
    destination="http_endpoint",
    s3_configuration=aws.kinesis.FirehoseDeliveryStreamS3ConfigurationArgs(
        role_arn=aws_iam_role["firehose"]["arn"],
        bucket_arn=aws_s3_bucket["bucket"]["arn"],
        buffer_size=10,
        buffer_interval=400,
        compression_format="GZIP",
    ),
    http_endpoint_configuration=aws.kinesis.FirehoseDeliveryStreamHttpEndpointConfigurationArgs(
        url="https://aws-api.newrelic.com/firehose/v1",
        name="New Relic",
        access_key="my-key",
        buffering_size=15,
        buffering_interval=600,
        role_arn=aws_iam_role["firehose"]["arn"],
        s3_backup_mode="FailedDataOnly",
        request_configuration=aws.kinesis.FirehoseDeliveryStreamHttpEndpointConfigurationRequestConfigurationArgs(
            content_encoding="GZIP",
            common_attributes=[
                aws.kinesis.FirehoseDeliveryStreamHttpEndpointConfigurationRequestConfigurationCommonAttributeArgs(
                    name="testname",
                    value="testvalue",
                ),
                aws.kinesis.FirehoseDeliveryStreamHttpEndpointConfigurationRequestConfigurationCommonAttributeArgs(
                    name="testname2",
                    value="testvalue2",
                ),
            ],
        ),
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var testStream = new Aws.Kinesis.FirehoseDeliveryStream("testStream", new()
    {
        Destination = "http_endpoint",
        S3Configuration = new Aws.Kinesis.Inputs.FirehoseDeliveryStreamS3ConfigurationArgs
        {
            RoleArn = aws_iam_role.Firehose.Arn,
            BucketArn = aws_s3_bucket.Bucket.Arn,
            BufferSize = 10,
            BufferInterval = 400,
            CompressionFormat = "GZIP",
        },
        HttpEndpointConfiguration = new Aws.Kinesis.Inputs.FirehoseDeliveryStreamHttpEndpointConfigurationArgs
        {
            Url = "https://aws-api.newrelic.com/firehose/v1",
            Name = "New Relic",
            AccessKey = "my-key",
            BufferingSize = 15,
            BufferingInterval = 600,
            RoleArn = aws_iam_role.Firehose.Arn,
            S3BackupMode = "FailedDataOnly",
            RequestConfiguration = new Aws.Kinesis.Inputs.FirehoseDeliveryStreamHttpEndpointConfigurationRequestConfigurationArgs
            {
                ContentEncoding = "GZIP",
                CommonAttributes = new[]
                {
                    new Aws.Kinesis.Inputs.FirehoseDeliveryStreamHttpEndpointConfigurationRequestConfigurationCommonAttributeArgs
                    {
                        Name = "testname",
                        Value = "testvalue",
                    },
                    new Aws.Kinesis.Inputs.FirehoseDeliveryStreamHttpEndpointConfigurationRequestConfigurationCommonAttributeArgs
                    {
                        Name = "testname2",
                        Value = "testvalue2",
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
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/kinesis"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := kinesis.NewFirehoseDeliveryStream(ctx, "testStream", &kinesis.FirehoseDeliveryStreamArgs{
			Destination: pulumi.String("http_endpoint"),
			S3Configuration: &kinesis.FirehoseDeliveryStreamS3ConfigurationArgs{
				RoleArn:           pulumi.Any(aws_iam_role.Firehose.Arn),
				BucketArn:         pulumi.Any(aws_s3_bucket.Bucket.Arn),
				BufferSize:        pulumi.Int(10),
				BufferInterval:    pulumi.Int(400),
				CompressionFormat: pulumi.String("GZIP"),
			},
			HttpEndpointConfiguration: &kinesis.FirehoseDeliveryStreamHttpEndpointConfigurationArgs{
				Url:               pulumi.String("https://aws-api.newrelic.com/firehose/v1"),
				Name:              pulumi.String("New Relic"),
				AccessKey:         pulumi.String("my-key"),
				BufferingSize:     pulumi.Int(15),
				BufferingInterval: pulumi.Int(600),
				RoleArn:           pulumi.Any(aws_iam_role.Firehose.Arn),
				S3BackupMode:      pulumi.String("FailedDataOnly"),
				RequestConfiguration: &kinesis.FirehoseDeliveryStreamHttpEndpointConfigurationRequestConfigurationArgs{
					ContentEncoding: pulumi.String("GZIP"),
					CommonAttributes: kinesis.FirehoseDeliveryStreamHttpEndpointConfigurationRequestConfigurationCommonAttributeArray{
						&kinesis.FirehoseDeliveryStreamHttpEndpointConfigurationRequestConfigurationCommonAttributeArgs{
							Name:  pulumi.String("testname"),
							Value: pulumi.String("testvalue"),
						},
						&kinesis.FirehoseDeliveryStreamHttpEndpointConfigurationRequestConfigurationCommonAttributeArgs{
							Name:  pulumi.String("testname2"),
							Value: pulumi.String("testvalue2"),
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
import com.pulumi.aws.kinesis.FirehoseDeliveryStream;
import com.pulumi.aws.kinesis.FirehoseDeliveryStreamArgs;
import com.pulumi.aws.kinesis.inputs.FirehoseDeliveryStreamS3ConfigurationArgs;
import com.pulumi.aws.kinesis.inputs.FirehoseDeliveryStreamHttpEndpointConfigurationArgs;
import com.pulumi.aws.kinesis.inputs.FirehoseDeliveryStreamHttpEndpointConfigurationRequestConfigurationArgs;
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
        var testStream = new FirehoseDeliveryStream("testStream", FirehoseDeliveryStreamArgs.builder()        
            .destination("http_endpoint")
            .s3Configuration(FirehoseDeliveryStreamS3ConfigurationArgs.builder()
                .roleArn(aws_iam_role.firehose().arn())
                .bucketArn(aws_s3_bucket.bucket().arn())
                .bufferSize(10)
                .bufferInterval(400)
                .compressionFormat("GZIP")
                .build())
            .httpEndpointConfiguration(FirehoseDeliveryStreamHttpEndpointConfigurationArgs.builder()
                .url("https://aws-api.newrelic.com/firehose/v1")
                .name("New Relic")
                .accessKey("my-key")
                .bufferingSize(15)
                .bufferingInterval(600)
                .roleArn(aws_iam_role.firehose().arn())
                .s3BackupMode("FailedDataOnly")
                .requestConfiguration(FirehoseDeliveryStreamHttpEndpointConfigurationRequestConfigurationArgs.builder()
                    .contentEncoding("GZIP")
                    .commonAttributes(                    
                        FirehoseDeliveryStreamHttpEndpointConfigurationRequestConfigurationCommonAttributeArgs.builder()
                            .name("testname")
                            .value("testvalue")
                            .build(),
                        FirehoseDeliveryStreamHttpEndpointConfigurationRequestConfigurationCommonAttributeArgs.builder()
                            .name("testname2")
                            .value("testvalue2")
                            .build())
                    .build())
                .build())
            .build());

    }
}
```
```yaml
resources:
  testStream:
    type: aws:kinesis:FirehoseDeliveryStream
    properties:
      destination: http_endpoint
      s3Configuration:
        roleArn: ${aws_iam_role.firehose.arn}
        bucketArn: ${aws_s3_bucket.bucket.arn}
        bufferSize: 10
        bufferInterval: 400
        compressionFormat: GZIP
      httpEndpointConfiguration:
        url: https://aws-api.newrelic.com/firehose/v1
        name: New Relic
        accessKey: my-key
        bufferingSize: 15
        bufferingInterval: 600
        roleArn: ${aws_iam_role.firehose.arn}
        s3BackupMode: FailedDataOnly
        requestConfiguration:
          contentEncoding: GZIP
          commonAttributes:
            - name: testname
              value: testvalue
            - name: testname2
              value: testvalue2
```
{{% /example %}}
{{% /examples %}}

## Import

Kinesis Firehose Delivery streams can be imported using the stream ARN, e.g.,

```sh
 $ pulumi import aws:kinesis/firehoseDeliveryStream:FirehoseDeliveryStream foo arn:aws:firehose:us-east-1:XXX:deliverystream/example
```

 NoteImport does not work for stream destination `s3`. Consider using `extended_s3` since `s3` destination is deprecated. 
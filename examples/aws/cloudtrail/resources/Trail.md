Provides a CloudTrail resource.

> **Tip:** For a multi-region trail, this resource must be in the home region of the trail.

> **Tip:** For an organization trail, this resource must be in the master account of the organization.

{{% examples %}}
## Example Usage
{{% example %}}
### Basic

Enable CloudTrail to capture all compatible management events in region.
For capturing events from services like IAM, `include_global_service_events` must be enabled.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const current = aws.getCallerIdentity({});
const bucketV2 = new aws.s3.BucketV2("bucketV2", {});
const fooBucketV2 = new aws.s3.BucketV2("fooBucketV2", {forceDestroy: true});
const fooBucketPolicy = new aws.s3.BucketPolicy("fooBucketPolicy", {
    bucket: fooBucketV2.id,
    policy: pulumi.all([fooBucketV2.arn, fooBucketV2.arn, current]).apply(([fooBucketV2Arn, fooBucketV2Arn1, current]) => `{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AWSCloudTrailAclCheck",
            "Effect": "Allow",
            "Principal": {
              "Service": "cloudtrail.amazonaws.com"
            },
            "Action": "s3:GetBucketAcl",
            "Resource": "${fooBucketV2Arn}"
        },
        {
            "Sid": "AWSCloudTrailWrite",
            "Effect": "Allow",
            "Principal": {
              "Service": "cloudtrail.amazonaws.com"
            },
            "Action": "s3:PutObject",
            "Resource": "${fooBucketV2Arn1}/prefix/AWSLogs/${current.accountId}/*",
            "Condition": {
                "StringEquals": {
                    "s3:x-amz-acl": "bucket-owner-full-control"
                }
            }
        }
    ]
}
}
`),
});
const foobar = new aws.cloudtrail.Trail("foobar", {
    s3BucketName: bucketV2.id,
    s3KeyPrefix: "prefix",
    includeGlobalServiceEvents: false,
});
```
```python
import pulumi
import pulumi_aws as aws

current = aws.get_caller_identity()
bucket_v2 = aws.s3.BucketV2("bucketV2")
foo_bucket_v2 = aws.s3.BucketV2("fooBucketV2", force_destroy=True)
foo_bucket_policy = aws.s3.BucketPolicy("fooBucketPolicy",
    bucket=foo_bucket_v2.id,
    policy=pulumi.Output.all(foo_bucket_v2.arn, foo_bucket_v2.arn).apply(lambda fooBucketV2Arn, fooBucketV2Arn1: f"""{{
    "Version": "2012-10-17",
    "Statement": [
        {{
            "Sid": "AWSCloudTrailAclCheck",
            "Effect": "Allow",
            "Principal": {{
              "Service": "cloudtrail.amazonaws.com"
            }},
            "Action": "s3:GetBucketAcl",
            "Resource": "{foo_bucket_v2_arn}"
        }},
        {{
            "Sid": "AWSCloudTrailWrite",
            "Effect": "Allow",
            "Principal": {{
              "Service": "cloudtrail.amazonaws.com"
            }},
            "Action": "s3:PutObject",
            "Resource": "{foo_bucket_v2_arn1}/prefix/AWSLogs/{current.account_id}/*",
            "Condition": {{
                "StringEquals": {{
                    "s3:x-amz-acl": "bucket-owner-full-control"
                }}
            }}
        }}
    ]
}}
}}
"""))
foobar = aws.cloudtrail.Trail("foobar",
    s3_bucket_name=bucket_v2.id,
    s3_key_prefix="prefix",
    include_global_service_events=False)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var current = Aws.GetCallerIdentity.Invoke();

    var bucketV2 = new Aws.S3.BucketV2("bucketV2");

    var fooBucketV2 = new Aws.S3.BucketV2("fooBucketV2", new()
    {
        ForceDestroy = true,
    });

    var fooBucketPolicy = new Aws.S3.BucketPolicy("fooBucketPolicy", new()
    {
        Bucket = fooBucketV2.Id,
        Policy = Output.Tuple(fooBucketV2.Arn, fooBucketV2.Arn, current.Apply(getCallerIdentityResult => getCallerIdentityResult)).Apply(values =>
        {
            var fooBucketV2Arn = values.Item1;
            var fooBucketV2Arn1 = values.Item2;
            var current = values.Item3;
            return @$"{{
    ""Version"": ""2012-10-17"",
    ""Statement"": [
        {{
            ""Sid"": ""AWSCloudTrailAclCheck"",
            ""Effect"": ""Allow"",
            ""Principal"": {{
              ""Service"": ""cloudtrail.amazonaws.com""
            }},
            ""Action"": ""s3:GetBucketAcl"",
            ""Resource"": ""{fooBucketV2Arn}""
        }},
        {{
            ""Sid"": ""AWSCloudTrailWrite"",
            ""Effect"": ""Allow"",
            ""Principal"": {{
              ""Service"": ""cloudtrail.amazonaws.com""
            }},
            ""Action"": ""s3:PutObject"",
            ""Resource"": ""{fooBucketV2Arn1}/prefix/AWSLogs/{current.Apply(getCallerIdentityResult => getCallerIdentityResult.AccountId)}/*"",
            ""Condition"": {{
                ""StringEquals"": {{
                    ""s3:x-amz-acl"": ""bucket-owner-full-control""
                }}
            }}
        }}
    ]
}}
}}
";
        }),
    });

    var foobar = new Aws.CloudTrail.Trail("foobar", new()
    {
        S3BucketName = bucketV2.Id,
        S3KeyPrefix = "prefix",
        IncludeGlobalServiceEvents = false,
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudtrail"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		current, err := aws.GetCallerIdentity(ctx, nil, nil)
		if err != nil {
			return err
		}
		bucketV2, err := s3.NewBucketV2(ctx, "bucketV2", nil)
		if err != nil {
			return err
		}
		fooBucketV2, err := s3.NewBucketV2(ctx, "fooBucketV2", &s3.BucketV2Args{
			ForceDestroy: pulumi.Bool(true),
		})
		if err != nil {
			return err
		}
		_, err = s3.NewBucketPolicy(ctx, "fooBucketPolicy", &s3.BucketPolicyArgs{
			Bucket: fooBucketV2.ID(),
			Policy: pulumi.All(fooBucketV2.Arn, fooBucketV2.Arn).ApplyT(func(_args []interface{}) (string, error) {
				fooBucketV2Arn := _args[0].(string)
				fooBucketV2Arn1 := _args[1].(string)
				return fmt.Sprintf(`{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AWSCloudTrailAclCheck",
            "Effect": "Allow",
            "Principal": {
              "Service": "cloudtrail.amazonaws.com"
            },
            "Action": "s3:GetBucketAcl",
            "Resource": "%v"
        },
        {
            "Sid": "AWSCloudTrailWrite",
            "Effect": "Allow",
            "Principal": {
              "Service": "cloudtrail.amazonaws.com"
            },
            "Action": "s3:PutObject",
            "Resource": "%v/prefix/AWSLogs/%v/*",
            "Condition": {
                "StringEquals": {
                    "s3:x-amz-acl": "bucket-owner-full-control"
                }
            }
        }
    ]
}
}
`, fooBucketV2Arn, fooBucketV2Arn1, current.AccountId), nil
			}).(pulumi.StringOutput),
		})
		if err != nil {
			return err
		}
		_, err = cloudtrail.NewTrail(ctx, "foobar", &cloudtrail.TrailArgs{
			S3BucketName:               bucketV2.ID(),
			S3KeyPrefix:                pulumi.String("prefix"),
			IncludeGlobalServiceEvents: pulumi.Bool(false),
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
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.s3.BucketV2Args;
import com.pulumi.aws.s3.BucketPolicy;
import com.pulumi.aws.s3.BucketPolicyArgs;
import com.pulumi.aws.cloudtrail.Trail;
import com.pulumi.aws.cloudtrail.TrailArgs;
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
        final var current = AwsFunctions.getCallerIdentity();

        var bucketV2 = new BucketV2("bucketV2");

        var fooBucketV2 = new BucketV2("fooBucketV2", BucketV2Args.builder()        
            .forceDestroy(true)
            .build());

        var fooBucketPolicy = new BucketPolicy("fooBucketPolicy", BucketPolicyArgs.builder()        
            .bucket(fooBucketV2.id())
            .policy(Output.tuple(fooBucketV2.arn(), fooBucketV2.arn()).applyValue(values -> {
                var fooBucketV2Arn = values.t1;
                var fooBucketV2Arn1 = values.t2;
                return """
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AWSCloudTrailAclCheck",
            "Effect": "Allow",
            "Principal": {
              "Service": "cloudtrail.amazonaws.com"
            },
            "Action": "s3:GetBucketAcl",
            "Resource": "%s"
        },
        {
            "Sid": "AWSCloudTrailWrite",
            "Effect": "Allow",
            "Principal": {
              "Service": "cloudtrail.amazonaws.com"
            },
            "Action": "s3:PutObject",
            "Resource": "%s/prefix/AWSLogs/%s/*",
            "Condition": {
                "StringEquals": {
                    "s3:x-amz-acl": "bucket-owner-full-control"
                }
            }
        }
    ]
}
}
", fooBucketV2Arn,fooBucketV2Arn1,current.applyValue(getCallerIdentityResult -> getCallerIdentityResult.accountId()));
            }))
            .build());

        var foobar = new Trail("foobar", TrailArgs.builder()        
            .s3BucketName(bucketV2.id())
            .s3KeyPrefix("prefix")
            .includeGlobalServiceEvents(false)
            .build());

    }
}
```
```yaml
resources:
  bucketV2:
    type: aws:s3:BucketV2
  fooBucketV2:
    type: aws:s3:BucketV2
    properties:
      forceDestroy: true
  fooBucketPolicy:
    type: aws:s3:BucketPolicy
    properties:
      bucket: ${fooBucketV2.id}
      policy: |
        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Sid": "AWSCloudTrailAclCheck",
                    "Effect": "Allow",
                    "Principal": {
                      "Service": "cloudtrail.amazonaws.com"
                    },
                    "Action": "s3:GetBucketAcl",
                    "Resource": "${fooBucketV2.arn}"
                },
                {
                    "Sid": "AWSCloudTrailWrite",
                    "Effect": "Allow",
                    "Principal": {
                      "Service": "cloudtrail.amazonaws.com"
                    },
                    "Action": "s3:PutObject",
                    "Resource": "${fooBucketV2.arn}/prefix/AWSLogs/${current.accountId}/*",
                    "Condition": {
                        "StringEquals": {
                            "s3:x-amz-acl": "bucket-owner-full-control"
                        }
                    }
                }
            ]
        }
        }
  foobar:
    type: aws:cloudtrail:Trail
    properties:
      s3BucketName: ${bucketV2.id}
      s3KeyPrefix: prefix
      includeGlobalServiceEvents: false
variables:
  current:
    Fn::Invoke:
      Function: aws:getCallerIdentity
      Arguments: {}
```
{{% /example %}}
### Data Event Logging

CloudTrail can log [Data Events](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html) for certain services such as S3 objects and Lambda function invocations. Additional information about data event configuration can be found in the following links:

* [CloudTrail API DataResource documentation](https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_DataResource.html) (for basic event selector).
* [CloudTrail API AdvancedFieldSelector documentation](https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_AdvancedFieldSelector.html) (for advanced event selector).
{{% example %}}
### Logging All Lambda Function Invocations By Using Basic Event Selectors

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bucketV2 = new aws.s3.BucketV2("bucketV2", {});
const example = new aws.cloudtrail.Trail("example", {
    s3BucketName: bucketV2.id,
    s3KeyPrefix: "prefix",
    eventSelectors: [{
        readWriteType: "All",
        includeManagementEvents: true,
        dataResources: [{
            type: "AWS::Lambda::Function",
            values: ["arn:aws:lambda"],
        }],
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

bucket_v2 = aws.s3.BucketV2("bucketV2")
example = aws.cloudtrail.Trail("example",
    s3_bucket_name=bucket_v2.id,
    s3_key_prefix="prefix",
    event_selectors=[aws.cloudtrail.TrailEventSelectorArgs(
        read_write_type="All",
        include_management_events=True,
        data_resources=[aws.cloudtrail.TrailEventSelectorDataResourceArgs(
            type="AWS::Lambda::Function",
            values=["arn:aws:lambda"],
        )],
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var bucketV2 = new Aws.S3.BucketV2("bucketV2");

    var example = new Aws.CloudTrail.Trail("example", new()
    {
        S3BucketName = bucketV2.Id,
        S3KeyPrefix = "prefix",
        EventSelectors = new[]
        {
            new Aws.CloudTrail.Inputs.TrailEventSelectorArgs
            {
                ReadWriteType = "All",
                IncludeManagementEvents = true,
                DataResources = new[]
                {
                    new Aws.CloudTrail.Inputs.TrailEventSelectorDataResourceArgs
                    {
                        Type = "AWS::Lambda::Function",
                        Values = new[]
                        {
                            "arn:aws:lambda",
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
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudtrail"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		bucketV2, err := s3.NewBucketV2(ctx, "bucketV2", nil)
		if err != nil {
			return err
		}
		_, err = cloudtrail.NewTrail(ctx, "example", &cloudtrail.TrailArgs{
			S3BucketName: bucketV2.ID(),
			S3KeyPrefix:  pulumi.String("prefix"),
			EventSelectors: cloudtrail.TrailEventSelectorArray{
				&cloudtrail.TrailEventSelectorArgs{
					ReadWriteType:           pulumi.String("All"),
					IncludeManagementEvents: pulumi.Bool(true),
					DataResources: cloudtrail.TrailEventSelectorDataResourceArray{
						&cloudtrail.TrailEventSelectorDataResourceArgs{
							Type: pulumi.String("AWS::Lambda::Function"),
							Values: pulumi.StringArray{
								pulumi.String("arn:aws:lambda"),
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
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.cloudtrail.Trail;
import com.pulumi.aws.cloudtrail.TrailArgs;
import com.pulumi.aws.cloudtrail.inputs.TrailEventSelectorArgs;
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
        var bucketV2 = new BucketV2("bucketV2");

        var example = new Trail("example", TrailArgs.builder()        
            .s3BucketName(bucketV2.id())
            .s3KeyPrefix("prefix")
            .eventSelectors(TrailEventSelectorArgs.builder()
                .readWriteType("All")
                .includeManagementEvents(true)
                .dataResources(TrailEventSelectorDataResourceArgs.builder()
                    .type("AWS::Lambda::Function")
                    .values("arn:aws:lambda")
                    .build())
                .build())
            .build());

    }
}
```
```yaml
resources:
  bucketV2:
    type: aws:s3:BucketV2
  example:
    type: aws:cloudtrail:Trail
    properties:
      s3BucketName: ${bucketV2.id}
      s3KeyPrefix: prefix # ... other configuration ...
      eventSelectors:
        - readWriteType: All
          includeManagementEvents: true
          dataResources:
            - type: AWS::Lambda::Function
              values:
                - arn:aws:lambda
```
{{% /example %}}
{{% example %}}
### Logging All S3 Object Events By Using Basic Event Selectors

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bucketV2 = new aws.s3.BucketV2("bucketV2", {});
const example = new aws.cloudtrail.Trail("example", {
    s3BucketName: bucketV2.id,
    s3KeyPrefix: "prefix",
    eventSelectors: [{
        readWriteType: "All",
        includeManagementEvents: true,
        dataResources: [{
            type: "AWS::S3::Object",
            values: ["arn:aws:s3"],
        }],
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

bucket_v2 = aws.s3.BucketV2("bucketV2")
example = aws.cloudtrail.Trail("example",
    s3_bucket_name=bucket_v2.id,
    s3_key_prefix="prefix",
    event_selectors=[aws.cloudtrail.TrailEventSelectorArgs(
        read_write_type="All",
        include_management_events=True,
        data_resources=[aws.cloudtrail.TrailEventSelectorDataResourceArgs(
            type="AWS::S3::Object",
            values=["arn:aws:s3"],
        )],
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var bucketV2 = new Aws.S3.BucketV2("bucketV2");

    var example = new Aws.CloudTrail.Trail("example", new()
    {
        S3BucketName = bucketV2.Id,
        S3KeyPrefix = "prefix",
        EventSelectors = new[]
        {
            new Aws.CloudTrail.Inputs.TrailEventSelectorArgs
            {
                ReadWriteType = "All",
                IncludeManagementEvents = true,
                DataResources = new[]
                {
                    new Aws.CloudTrail.Inputs.TrailEventSelectorDataResourceArgs
                    {
                        Type = "AWS::S3::Object",
                        Values = new[]
                        {
                            "arn:aws:s3",
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
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudtrail"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		bucketV2, err := s3.NewBucketV2(ctx, "bucketV2", nil)
		if err != nil {
			return err
		}
		_, err = cloudtrail.NewTrail(ctx, "example", &cloudtrail.TrailArgs{
			S3BucketName: bucketV2.ID(),
			S3KeyPrefix:  pulumi.String("prefix"),
			EventSelectors: cloudtrail.TrailEventSelectorArray{
				&cloudtrail.TrailEventSelectorArgs{
					ReadWriteType:           pulumi.String("All"),
					IncludeManagementEvents: pulumi.Bool(true),
					DataResources: cloudtrail.TrailEventSelectorDataResourceArray{
						&cloudtrail.TrailEventSelectorDataResourceArgs{
							Type: pulumi.String("AWS::S3::Object"),
							Values: pulumi.StringArray{
								pulumi.String("arn:aws:s3"),
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
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.cloudtrail.Trail;
import com.pulumi.aws.cloudtrail.TrailArgs;
import com.pulumi.aws.cloudtrail.inputs.TrailEventSelectorArgs;
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
        var bucketV2 = new BucketV2("bucketV2");

        var example = new Trail("example", TrailArgs.builder()        
            .s3BucketName(bucketV2.id())
            .s3KeyPrefix("prefix")
            .eventSelectors(TrailEventSelectorArgs.builder()
                .readWriteType("All")
                .includeManagementEvents(true)
                .dataResources(TrailEventSelectorDataResourceArgs.builder()
                    .type("AWS::S3::Object")
                    .values("arn:aws:s3")
                    .build())
                .build())
            .build());

    }
}
```
```yaml
resources:
  bucketV2:
    type: aws:s3:BucketV2
  example:
    type: aws:cloudtrail:Trail
    properties:
      s3BucketName: ${bucketV2.id}
      s3KeyPrefix: prefix # ... other configuration ...
      eventSelectors:
        - readWriteType: All
          includeManagementEvents: true
          dataResources:
            - type: AWS::S3::Object
              values:
                - arn:aws:s3
```
{{% /example %}}
{{% example %}}
### Logging Individual S3 Bucket Events By Using Basic Event Selectors

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const important-bucket = aws.s3.getBucket({
    bucket: "important-bucket",
});
const example = new aws.cloudtrail.Trail("example", {
    s3BucketName: important_bucket.then(important_bucket => important_bucket.id),
    s3KeyPrefix: "prefix",
    eventSelectors: [{
        readWriteType: "All",
        includeManagementEvents: true,
        dataResources: [{
            type: "AWS::S3::Object",
            values: [important_bucket.then(important_bucket => `${important_bucket.arn}/`)],
        }],
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

important_bucket = aws.s3.get_bucket(bucket="important-bucket")
example = aws.cloudtrail.Trail("example",
    s3_bucket_name=important_bucket.id,
    s3_key_prefix="prefix",
    event_selectors=[aws.cloudtrail.TrailEventSelectorArgs(
        read_write_type="All",
        include_management_events=True,
        data_resources=[aws.cloudtrail.TrailEventSelectorDataResourceArgs(
            type="AWS::S3::Object",
            values=[f"{important_bucket.arn}/"],
        )],
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var important_bucket = Aws.S3.GetBucket.Invoke(new()
    {
        Bucket = "important-bucket",
    });

    var example = new Aws.CloudTrail.Trail("example", new()
    {
        S3BucketName = important_bucket.Apply(getBucketResult => getBucketResult).Apply(important_bucket => important_bucket.Apply(getBucketResult => getBucketResult.Id)),
        S3KeyPrefix = "prefix",
        EventSelectors = new[]
        {
            new Aws.CloudTrail.Inputs.TrailEventSelectorArgs
            {
                ReadWriteType = "All",
                IncludeManagementEvents = true,
                DataResources = new[]
                {
                    new Aws.CloudTrail.Inputs.TrailEventSelectorDataResourceArgs
                    {
                        Type = "AWS::S3::Object",
                        Values = new[]
                        {
                            important_bucket.Apply(getBucketResult => getBucketResult).Apply(important_bucket => $"{important_bucket.Apply(getBucketResult => getBucketResult.Arn)}/"),
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

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudtrail"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		important_bucket, err := s3.LookupBucket(ctx, &s3.LookupBucketArgs{
			Bucket: "important-bucket",
		}, nil)
		if err != nil {
			return err
		}
		_, err = cloudtrail.NewTrail(ctx, "example", &cloudtrail.TrailArgs{
			S3BucketName: pulumi.String(important_bucket.Id),
			S3KeyPrefix:  pulumi.String("prefix"),
			EventSelectors: cloudtrail.TrailEventSelectorArray{
				&cloudtrail.TrailEventSelectorArgs{
					ReadWriteType:           pulumi.String("All"),
					IncludeManagementEvents: pulumi.Bool(true),
					DataResources: cloudtrail.TrailEventSelectorDataResourceArray{
						&cloudtrail.TrailEventSelectorDataResourceArgs{
							Type: pulumi.String("AWS::S3::Object"),
							Values: pulumi.StringArray{
								pulumi.String(fmt.Sprintf("%v/", important_bucket.Arn)),
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
import com.pulumi.aws.s3.S3Functions;
import com.pulumi.aws.s3.inputs.GetBucketArgs;
import com.pulumi.aws.cloudtrail.Trail;
import com.pulumi.aws.cloudtrail.TrailArgs;
import com.pulumi.aws.cloudtrail.inputs.TrailEventSelectorArgs;
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
        final var important-bucket = S3Functions.getBucket(GetBucketArgs.builder()
            .bucket("important-bucket")
            .build());

        var example = new Trail("example", TrailArgs.builder()        
            .s3BucketName(important_bucket.id())
            .s3KeyPrefix("prefix")
            .eventSelectors(TrailEventSelectorArgs.builder()
                .readWriteType("All")
                .includeManagementEvents(true)
                .dataResources(TrailEventSelectorDataResourceArgs.builder()
                    .type("AWS::S3::Object")
                    .values(String.format("%s/", important_bucket.arn()))
                    .build())
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:cloudtrail:Trail
    properties:
      s3BucketName: ${["important-bucket"].id}
      s3KeyPrefix: prefix # ... other configuration ...
      eventSelectors:
        - readWriteType: All
          includeManagementEvents: true
          dataResources:
            - type: AWS::S3::Object
              values:
                - ${["important-bucket"].arn}/
variables:
  important-bucket:
    Fn::Invoke:
      Function: aws:s3:getBucket
      Arguments:
        bucket: important-bucket
```
{{% /example %}}
{{% example %}}
### Logging All S3 Object Events Except For Two S3 Buckets By Using Advanced Event Selectors

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const not_important_bucket_1 = pulumi.output(aws.s3.getBucket({
    bucket: "not-important-bucket-1",
}));
const not_important_bucket_2 = pulumi.output(aws.s3.getBucket({
    bucket: "not-important-bucket-2",
}));
const example = new aws.cloudtrail.Trail("example", {
    advancedEventSelectors: [
        {
            fieldSelectors: [
                {
                    equals: ["Data"],
                    field: "eventCategory",
                },
                {
                    field: "resources.ARN",
                    notEquals: [
                        pulumi.interpolate`${not_important_bucket_1.arn}/`,
                        pulumi.interpolate`${not_important_bucket_2.arn}/`,
                    ],
                },
                {
                    equals: ["AWS::S3::Object"],
                    field: "resources.type",
                },
            ],
            name: "Log all S3 objects events except for two S3 buckets",
        },
        {
            fieldSelectors: [{
                equals: ["Management"],
                field: "eventCategory",
            }],
            name: "Log readOnly and writeOnly management events",
        },
    ],
});
```
```python
import pulumi
import pulumi_aws as aws

not_important_bucket_1 = aws.s3.get_bucket(bucket="not-important-bucket-1")
not_important_bucket_2 = aws.s3.get_bucket(bucket="not-important-bucket-2")
example = aws.cloudtrail.Trail("example", advanced_event_selectors=[
    aws.cloudtrail.TrailAdvancedEventSelectorArgs(
        field_selectors=[
            aws.cloudtrail.TrailAdvancedEventSelectorFieldSelectorArgs(
                equals=["Data"],
                field="eventCategory",
            ),
            aws.cloudtrail.TrailAdvancedEventSelectorFieldSelectorArgs(
                field="resources.ARN",
                not_equals=[
                    f"{not_important_bucket_1.arn}/",
                    f"{not_important_bucket_2.arn}/",
                ],
            ),
            aws.cloudtrail.TrailAdvancedEventSelectorFieldSelectorArgs(
                equals=["AWS::S3::Object"],
                field="resources.type",
            ),
        ],
        name="Log all S3 objects events except for two S3 buckets",
    ),
    aws.cloudtrail.TrailAdvancedEventSelectorArgs(
        field_selectors=[aws.cloudtrail.TrailAdvancedEventSelectorFieldSelectorArgs(
            equals=["Management"],
            field="eventCategory",
        )],
        name="Log readOnly and writeOnly management events",
    ),
])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var not_important_bucket_1 = Aws.S3.GetBucket.Invoke(new()
    {
        Bucket = "not-important-bucket-1",
    });

    var not_important_bucket_2 = Aws.S3.GetBucket.Invoke(new()
    {
        Bucket = "not-important-bucket-2",
    });

    var example = new Aws.CloudTrail.Trail("example", new()
    {
        AdvancedEventSelectors = new[]
        {
            new Aws.CloudTrail.Inputs.TrailAdvancedEventSelectorArgs
            {
                FieldSelectors = new[]
                {
                    new Aws.CloudTrail.Inputs.TrailAdvancedEventSelectorFieldSelectorArgs
                    {
                        Equals = new[]
                        {
                            "Data",
                        },
                        Field = "eventCategory",
                    },
                    new Aws.CloudTrail.Inputs.TrailAdvancedEventSelectorFieldSelectorArgs
                    {
                        Field = "resources.ARN",
                        NotEquals = new[]
                        {
                            not_important_bucket_1.Apply(getBucketResult => getBucketResult).Apply(not_important_bucket_1 => $"{not_important_bucket_1.Apply(getBucketResult => getBucketResult.Arn)}/"),
                            not_important_bucket_2.Apply(getBucketResult => getBucketResult).Apply(not_important_bucket_2 => $"{not_important_bucket_2.Apply(getBucketResult => getBucketResult.Arn)}/"),
                        },
                    },
                    new Aws.CloudTrail.Inputs.TrailAdvancedEventSelectorFieldSelectorArgs
                    {
                        Equals = new[]
                        {
                            "AWS::S3::Object",
                        },
                        Field = "resources.type",
                    },
                },
                Name = "Log all S3 objects events except for two S3 buckets",
            },
            new Aws.CloudTrail.Inputs.TrailAdvancedEventSelectorArgs
            {
                FieldSelectors = new[]
                {
                    new Aws.CloudTrail.Inputs.TrailAdvancedEventSelectorFieldSelectorArgs
                    {
                        Equals = new[]
                        {
                            "Management",
                        },
                        Field = "eventCategory",
                    },
                },
                Name = "Log readOnly and writeOnly management events",
            },
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudtrail"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		not_important_bucket_1, err := s3.LookupBucket(ctx, &s3.LookupBucketArgs{
			Bucket: "not-important-bucket-1",
		}, nil)
		if err != nil {
			return err
		}
		not_important_bucket_2, err := s3.LookupBucket(ctx, &s3.LookupBucketArgs{
			Bucket: "not-important-bucket-2",
		}, nil)
		if err != nil {
			return err
		}
		_, err = cloudtrail.NewTrail(ctx, "example", &cloudtrail.TrailArgs{
			AdvancedEventSelectors: cloudtrail.TrailAdvancedEventSelectorArray{
				&cloudtrail.TrailAdvancedEventSelectorArgs{
					FieldSelectors: cloudtrail.TrailAdvancedEventSelectorFieldSelectorArray{
						&cloudtrail.TrailAdvancedEventSelectorFieldSelectorArgs{
							Equals: pulumi.StringArray{
								pulumi.String("Data"),
							},
							Field: pulumi.String("eventCategory"),
						},
						&cloudtrail.TrailAdvancedEventSelectorFieldSelectorArgs{
							Field: pulumi.String("resources.ARN"),
							NotEquals: pulumi.StringArray{
								pulumi.String(fmt.Sprintf("%v/", not_important_bucket_1.Arn)),
								pulumi.String(fmt.Sprintf("%v/", not_important_bucket_2.Arn)),
							},
						},
						&cloudtrail.TrailAdvancedEventSelectorFieldSelectorArgs{
							Equals: pulumi.StringArray{
								pulumi.String("AWS::S3::Object"),
							},
							Field: pulumi.String("resources.type"),
						},
					},
					Name: pulumi.String("Log all S3 objects events except for two S3 buckets"),
				},
				&cloudtrail.TrailAdvancedEventSelectorArgs{
					FieldSelectors: cloudtrail.TrailAdvancedEventSelectorFieldSelectorArray{
						&cloudtrail.TrailAdvancedEventSelectorFieldSelectorArgs{
							Equals: pulumi.StringArray{
								pulumi.String("Management"),
							},
							Field: pulumi.String("eventCategory"),
						},
					},
					Name: pulumi.String("Log readOnly and writeOnly management events"),
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
import com.pulumi.aws.s3.S3Functions;
import com.pulumi.aws.s3.inputs.GetBucketArgs;
import com.pulumi.aws.cloudtrail.Trail;
import com.pulumi.aws.cloudtrail.TrailArgs;
import com.pulumi.aws.cloudtrail.inputs.TrailAdvancedEventSelectorArgs;
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
        final var not-important-bucket-1 = S3Functions.getBucket(GetBucketArgs.builder()
            .bucket("not-important-bucket-1")
            .build());

        final var not-important-bucket-2 = S3Functions.getBucket(GetBucketArgs.builder()
            .bucket("not-important-bucket-2")
            .build());

        var example = new Trail("example", TrailArgs.builder()        
            .advancedEventSelectors(            
                TrailAdvancedEventSelectorArgs.builder()
                    .fieldSelectors(                    
                        TrailAdvancedEventSelectorFieldSelectorArgs.builder()
                            .equals("Data")
                            .field("eventCategory")
                            .build(),
                        TrailAdvancedEventSelectorFieldSelectorArgs.builder()
                            .field("resources.ARN")
                            .notEquals(                            
                                String.format("%s/", not_important_bucket_1.arn()),
                                String.format("%s/", not_important_bucket_2.arn()))
                            .build(),
                        TrailAdvancedEventSelectorFieldSelectorArgs.builder()
                            .equals("AWS::S3::Object")
                            .field("resources.type")
                            .build())
                    .name("Log all S3 objects events except for two S3 buckets")
                    .build(),
                TrailAdvancedEventSelectorArgs.builder()
                    .fieldSelectors(TrailAdvancedEventSelectorFieldSelectorArgs.builder()
                        .equals("Management")
                        .field("eventCategory")
                        .build())
                    .name("Log readOnly and writeOnly management events")
                    .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:cloudtrail:Trail
    properties:
      advancedEventSelectors:
        - fieldSelectors:
            - equals:
                - Data
              field: eventCategory
            - field: resources.ARN
              notEquals:
                - ${["not-important-bucket-1"].arn}/
                - ${["not-important-bucket-2"].arn}/
            - equals:
                - AWS::S3::Object
              field: resources.type
          name: Log all S3 objects events except for two S3 buckets
        - fieldSelectors:
            - equals:
                - Management
              field: eventCategory
          name: Log readOnly and writeOnly management events
variables:
  not-important-bucket-1:
    Fn::Invoke:
      Function: aws:s3:getBucket
      Arguments:
        bucket: not-important-bucket-1
  not-important-bucket-2:
    Fn::Invoke:
      Function: aws:s3:getBucket
      Arguments:
        bucket: not-important-bucket-2
```
{{% /example %}}
{{% example %}}
### Logging Individual S3 Buckets And Specific Event Names By Using Advanced Event Selectors

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const important_bucket_1 = pulumi.output(aws.s3.getBucket({
    bucket: "important-bucket-1",
}));
const important_bucket_2 = pulumi.output(aws.s3.getBucket({
    bucket: "important-bucket-2",
}));
const important_bucket_3 = pulumi.output(aws.s3.getBucket({
    bucket: "important-bucket-3",
}));
const example = new aws.cloudtrail.Trail("example", {
    advancedEventSelectors: [
        {
            fieldSelectors: [
                {
                    equals: ["Data"],
                    field: "eventCategory",
                },
                {
                    equals: [
                        "PutObject",
                        "DeleteObject",
                    ],
                    field: "eventName",
                },
                {
                    //The trailing slash is intentional; do not exclude it.
                    equals: [
                        pulumi.interpolate`${important_bucket_1.arn}/`,
                        pulumi.interpolate`${important_bucket_2.arn}/`,
                    ],
                    field: "resources.ARN",
                },
                {
                    equals: ["false"],
                    field: "readOnly",
                },
                {
                    equals: ["AWS::S3::Object"],
                    field: "resources.type",
                },
            ],
            name: "Log PutObject and DeleteObject events for two S3 buckets",
        },
        {
            fieldSelectors: [
                {
                    equals: ["Data"],
                    field: "eventCategory",
                },
                {
                    field: "eventName",
                    startsWiths: ["Delete"],
                },
                {
                    //The trailing slash is intentional; do not exclude it.
                    equals: [pulumi.interpolate`${important_bucket_3.arn}/important-prefix`],
                    field: "resources.ARN",
                },
                {
                    equals: ["false"],
                    field: "readOnly",
                },
                {
                    equals: ["AWS::S3::Object"],
                    field: "resources.type",
                },
            ],
            name: "Log Delete* events for one S3 bucket",
        },
    ],
});
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.s3.S3Functions;
import com.pulumi.aws.s3.inputs.GetBucketArgs;
import com.pulumi.aws.cloudtrail.Trail;
import com.pulumi.aws.cloudtrail.TrailArgs;
import com.pulumi.aws.cloudtrail.inputs.TrailAdvancedEventSelectorArgs;
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
        final var important-bucket-1 = S3Functions.getBucket(GetBucketArgs.builder()
            .bucket("important-bucket-1")
            .build());

        final var important-bucket-2 = S3Functions.getBucket(GetBucketArgs.builder()
            .bucket("important-bucket-2")
            .build());

        final var important-bucket-3 = S3Functions.getBucket(GetBucketArgs.builder()
            .bucket("important-bucket-3")
            .build());

        var example = new Trail("example", TrailArgs.builder()        
            .advancedEventSelectors(            
                TrailAdvancedEventSelectorArgs.builder()
                    .fieldSelectors(                    
                        TrailAdvancedEventSelectorFieldSelectorArgs.builder()
                            .equals("Data")
                            .field("eventCategory")
                            .build(),
                        TrailAdvancedEventSelectorFieldSelectorArgs.builder()
                            .equals(                            
                                "PutObject",
                                "DeleteObject")
                            .field("eventName")
                            .build(),
                        TrailAdvancedEventSelectorFieldSelectorArgs.builder()
                            .equals(                            
                                String.format("%s/", important_bucket_1.arn()),
                                String.format("%s/", important_bucket_2.arn()))
                            .field("resources.ARN")
                            .build(),
                        TrailAdvancedEventSelectorFieldSelectorArgs.builder()
                            .equals("false")
                            .field("readOnly")
                            .build(),
                        TrailAdvancedEventSelectorFieldSelectorArgs.builder()
                            .equals("AWS::S3::Object")
                            .field("resources.type")
                            .build())
                    .name("Log PutObject and DeleteObject events for two S3 buckets")
                    .build(),
                TrailAdvancedEventSelectorArgs.builder()
                    .fieldSelectors(                    
                        TrailAdvancedEventSelectorFieldSelectorArgs.builder()
                            .equals("Data")
                            .field("eventCategory")
                            .build(),
                        TrailAdvancedEventSelectorFieldSelectorArgs.builder()
                            .field("eventName")
                            .startsWith("Delete")
                            .build(),
                        TrailAdvancedEventSelectorFieldSelectorArgs.builder()
                            .equals(String.format("%s/important-prefix", important_bucket_3.arn()))
                            .field("resources.ARN")
                            .build(),
                        TrailAdvancedEventSelectorFieldSelectorArgs.builder()
                            .equals("false")
                            .field("readOnly")
                            .build(),
                        TrailAdvancedEventSelectorFieldSelectorArgs.builder()
                            .equals("AWS::S3::Object")
                            .field("resources.type")
                            .build())
                    .name("Log Delete* events for one S3 bucket")
                    .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:cloudtrail:Trail
    properties:
      advancedEventSelectors:
        - fieldSelectors:
            - equals:
                - Data
              field: eventCategory
            - equals:
                - PutObject
                - DeleteObject
              field: eventName
            - equals:
                - ${["important-bucket-1"].arn}/
                - ${["important-bucket-2"].arn}/
              field: resources.ARN
            - equals:
                - false
              field: readOnly
            - equals:
                - AWS::S3::Object
              field: resources.type
          name: Log PutObject and DeleteObject events for two S3 buckets
        - fieldSelectors:
            - equals:
                - Data
              field: eventCategory
            - field: eventName
              startsWith:
                - Delete
            - equals:
                - ${["important-bucket-3"].arn}/important-prefix
              field: resources.ARN
            - equals:
                - false
              field: readOnly
            - equals:
                - AWS::S3::Object
              field: resources.type
          name: Log Delete* events for one S3 bucket
variables:
  important-bucket-1:
    Fn::Invoke:
      Function: aws:s3:getBucket
      Arguments:
        bucket: important-bucket-1
  important-bucket-2:
    Fn::Invoke:
      Function: aws:s3:getBucket
      Arguments:
        bucket: important-bucket-2
  important-bucket-3:
    Fn::Invoke:
      Function: aws:s3:getBucket
      Arguments:
        bucket: important-bucket-3
```
{{% /example %}}
{{% example %}}
### Sending Events to CloudWatch Logs

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const current = aws.getPartition({});
const exampleLogGroup = new aws.cloudwatch.LogGroup("exampleLogGroup", {});
const testRole = new aws.iam.Role("testRole", {assumeRolePolicy: current.then(current => `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudtrail.${current.dnsSuffix}"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
`)});
const testRolePolicy = new aws.iam.RolePolicy("testRolePolicy", {
    role: testRole.id,
    policy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AWSCloudTrailCreateLogStream",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "${aws_cloudwatch_log_group.test.arn}:*"
    }
  ]
}
`,
});
const bucketV2 = new aws.s3.BucketV2("bucketV2", {});
const exampleTrail = new aws.cloudtrail.Trail("exampleTrail", {
    s3BucketName: data.aws_s3_bucket["important-bucket"].id,
    s3KeyPrefix: "prefix",
    cloudWatchLogsRoleArn: testRole.arn,
    cloudWatchLogsGroupArn: pulumi.interpolate`${exampleLogGroup.arn}:*`,
});
// CloudTrail requires the Log Stream wildcard
```
```python
import pulumi
import pulumi_aws as aws

current = aws.get_partition()
example_log_group = aws.cloudwatch.LogGroup("exampleLogGroup")
test_role = aws.iam.Role("testRole", assume_role_policy=f"""{{
  "Version": "2012-10-17",
  "Statement": [
    {{
      "Sid": "",
      "Effect": "Allow",
      "Principal": {{
        "Service": "cloudtrail.{current.dns_suffix}"
      }},
      "Action": "sts:AssumeRole"
    }}
  ]
}}
""")
test_role_policy = aws.iam.RolePolicy("testRolePolicy",
    role=test_role.id,
    policy=f"""{{
  "Version": "2012-10-17",
  "Statement": [
    {{
      "Sid": "AWSCloudTrailCreateLogStream",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "{aws_cloudwatch_log_group["test"]["arn"]}:*"
    }}
  ]
}}
""")
bucket_v2 = aws.s3.BucketV2("bucketV2")
example_trail = aws.cloudtrail.Trail("exampleTrail",
    s3_bucket_name=data["aws_s3_bucket"]["important-bucket"]["id"],
    s3_key_prefix="prefix",
    cloud_watch_logs_role_arn=test_role.arn,
    cloud_watch_logs_group_arn=example_log_group.arn.apply(lambda arn: f"{arn}:*"))
# CloudTrail requires the Log Stream wildcard
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var current = Aws.GetPartition.Invoke();

    var exampleLogGroup = new Aws.CloudWatch.LogGroup("exampleLogGroup");

    var testRole = new Aws.Iam.Role("testRole", new()
    {
        AssumeRolePolicy = @$"{{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {{
      ""Sid"": """",
      ""Effect"": ""Allow"",
      ""Principal"": {{
        ""Service"": ""cloudtrail.{current.Apply(getPartitionResult => getPartitionResult.DnsSuffix)}""
      }},
      ""Action"": ""sts:AssumeRole""
    }}
  ]
}}
",
    });

    var testRolePolicy = new Aws.Iam.RolePolicy("testRolePolicy", new()
    {
        Role = testRole.Id,
        Policy = @$"{{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {{
      ""Sid"": ""AWSCloudTrailCreateLogStream"",
      ""Effect"": ""Allow"",
      ""Action"": [
        ""logs:CreateLogStream"",
        ""logs:PutLogEvents""
      ],
      ""Resource"": ""{aws_cloudwatch_log_group.Test.Arn}:*""
    }}
  ]
}}
",
    });

    var bucketV2 = new Aws.S3.BucketV2("bucketV2");

    var exampleTrail = new Aws.CloudTrail.Trail("exampleTrail", new()
    {
        S3BucketName = data.Aws_s3_bucket.Important_bucket.Id,
        S3KeyPrefix = "prefix",
        CloudWatchLogsRoleArn = testRole.Arn,
        CloudWatchLogsGroupArn = exampleLogGroup.Arn.Apply(arn => $"{arn}:*"),
    });

    // CloudTrail requires the Log Stream wildcard
});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudtrail"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudwatch"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		current, err := aws.GetPartition(ctx, nil, nil)
		if err != nil {
			return err
		}
		exampleLogGroup, err := cloudwatch.NewLogGroup(ctx, "exampleLogGroup", nil)
		if err != nil {
			return err
		}
		testRole, err := iam.NewRole(ctx, "testRole", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudtrail.%v"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
`, current.DnsSuffix)),
		})
		if err != nil {
			return err
		}
		_, err = iam.NewRolePolicy(ctx, "testRolePolicy", &iam.RolePolicyArgs{
			Role: testRole.ID(),
			Policy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AWSCloudTrailCreateLogStream",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "%v:*"
    }
  ]
}
`, aws_cloudwatch_log_group.Test.Arn)),
		})
		if err != nil {
			return err
		}
		_, err = s3.NewBucketV2(ctx, "bucketV2", nil)
		if err != nil {
			return err
		}
		_, err = cloudtrail.NewTrail(ctx, "exampleTrail", &cloudtrail.TrailArgs{
			S3BucketName:          pulumi.Any(data.Aws_s3_bucket.Important - bucket.Id),
			S3KeyPrefix:           pulumi.String("prefix"),
			CloudWatchLogsRoleArn: testRole.Arn,
			CloudWatchLogsGroupArn: exampleLogGroup.Arn.ApplyT(func(arn string) (string, error) {
				return fmt.Sprintf("%v:*", arn), nil
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
import com.pulumi.aws.AwsFunctions;
import com.pulumi.aws.cloudwatch.LogGroup;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.iam.RolePolicy;
import com.pulumi.aws.iam.RolePolicyArgs;
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.cloudtrail.Trail;
import com.pulumi.aws.cloudtrail.TrailArgs;
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
        final var current = AwsFunctions.getPartition();

        var exampleLogGroup = new LogGroup("exampleLogGroup");

        var testRole = new Role("testRole", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudtrail.%s"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
", current.applyValue(getPartitionResult -> getPartitionResult.dnsSuffix())))
            .build());

        var testRolePolicy = new RolePolicy("testRolePolicy", RolePolicyArgs.builder()        
            .role(testRole.id())
            .policy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AWSCloudTrailCreateLogStream",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "%s:*"
    }
  ]
}
", aws_cloudwatch_log_group.test().arn()))
            .build());

        var bucketV2 = new BucketV2("bucketV2");

        var exampleTrail = new Trail("exampleTrail", TrailArgs.builder()        
            .s3BucketName(data.aws_s3_bucket().important-bucket().id())
            .s3KeyPrefix("prefix")
            .cloudWatchLogsRoleArn(testRole.arn())
            .cloudWatchLogsGroupArn(exampleLogGroup.arn().applyValue(arn -> String.format("%s:*", arn)))
            .build());

    }
}
```
```yaml
resources:
  exampleLogGroup:
    type: aws:cloudwatch:LogGroup
  testRole:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Sid": "",
              "Effect": "Allow",
              "Principal": {
                "Service": "cloudtrail.${current.dnsSuffix}"
              },
              "Action": "sts:AssumeRole"
            }
          ]
        }
  testRolePolicy:
    type: aws:iam:RolePolicy
    properties:
      role: ${testRole.id}
      policy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Sid": "AWSCloudTrailCreateLogStream",
              "Effect": "Allow",
              "Action": [
                "logs:CreateLogStream",
                "logs:PutLogEvents"
              ],
              "Resource": "${aws_cloudwatch_log_group.test.arn}:*"
            }
          ]
        }
  bucketV2:
    type: aws:s3:BucketV2
  exampleTrail:
    type: aws:cloudtrail:Trail
    properties:
      s3BucketName: ${data.aws_s3_bucket"important-bucket"[%!s(MISSING)].id}
      s3KeyPrefix: prefix # ... other configuration ...
      cloudWatchLogsRoleArn: ${testRole.arn}
      cloudWatchLogsGroupArn: ${exampleLogGroup.arn}:*
variables:
  current:
    Fn::Invoke:
      Function: aws:getPartition
      Arguments: {}
```
{{% /example %}}
{{% /examples %}}

## Import

Cloudtrails can be imported using the `name`, e.g.,

```sh
 $ pulumi import aws:cloudtrail/trail:Trail sample my-sample-trail
```

 
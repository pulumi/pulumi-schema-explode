Provides a SSM resource data sync.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const hogeBucketV2 = new aws.s3.BucketV2("hogeBucketV2", {});
const hogeBucketPolicy = new aws.s3.BucketPolicy("hogeBucketPolicy", {
    bucket: hogeBucketV2.bucket,
    policy: `{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "SSMBucketPermissionsCheck",
            "Effect": "Allow",
            "Principal": {
                "Service": "ssm.amazonaws.com"
            },
            "Action": "s3:GetBucketAcl",
            "Resource": "arn:aws:s3:::tf-test-bucket-1234"
        },
        {
            "Sid": " SSMBucketDelivery",
            "Effect": "Allow",
            "Principal": {
                "Service": "ssm.amazonaws.com"
            },
            "Action": "s3:PutObject",
            "Resource": ["arn:aws:s3:::tf-test-bucket-1234/*"],
            "Condition": {
                "StringEquals": {
                    "s3:x-amz-acl": "bucket-owner-full-control"
                }
            }
        }
    ]
}
`,
});
const foo = new aws.ssm.ResourceDataSync("foo", {s3Destination: {
    bucketName: hogeBucketV2.bucket,
    region: hogeBucketV2.region,
}});
```
```python
import pulumi
import pulumi_aws as aws

hoge_bucket_v2 = aws.s3.BucketV2("hogeBucketV2")
hoge_bucket_policy = aws.s3.BucketPolicy("hogeBucketPolicy",
    bucket=hoge_bucket_v2.bucket,
    policy="""{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "SSMBucketPermissionsCheck",
            "Effect": "Allow",
            "Principal": {
                "Service": "ssm.amazonaws.com"
            },
            "Action": "s3:GetBucketAcl",
            "Resource": "arn:aws:s3:::tf-test-bucket-1234"
        },
        {
            "Sid": " SSMBucketDelivery",
            "Effect": "Allow",
            "Principal": {
                "Service": "ssm.amazonaws.com"
            },
            "Action": "s3:PutObject",
            "Resource": ["arn:aws:s3:::tf-test-bucket-1234/*"],
            "Condition": {
                "StringEquals": {
                    "s3:x-amz-acl": "bucket-owner-full-control"
                }
            }
        }
    ]
}
""")
foo = aws.ssm.ResourceDataSync("foo", s3_destination=aws.ssm.ResourceDataSyncS3DestinationArgs(
    bucket_name=hoge_bucket_v2.bucket,
    region=hoge_bucket_v2.region,
))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var hogeBucketV2 = new Aws.S3.BucketV2("hogeBucketV2");

    var hogeBucketPolicy = new Aws.S3.BucketPolicy("hogeBucketPolicy", new()
    {
        Bucket = hogeBucketV2.Bucket,
        Policy = @"{
    ""Version"": ""2012-10-17"",
    ""Statement"": [
        {
            ""Sid"": ""SSMBucketPermissionsCheck"",
            ""Effect"": ""Allow"",
            ""Principal"": {
                ""Service"": ""ssm.amazonaws.com""
            },
            ""Action"": ""s3:GetBucketAcl"",
            ""Resource"": ""arn:aws:s3:::tf-test-bucket-1234""
        },
        {
            ""Sid"": "" SSMBucketDelivery"",
            ""Effect"": ""Allow"",
            ""Principal"": {
                ""Service"": ""ssm.amazonaws.com""
            },
            ""Action"": ""s3:PutObject"",
            ""Resource"": [""arn:aws:s3:::tf-test-bucket-1234/*""],
            ""Condition"": {
                ""StringEquals"": {
                    ""s3:x-amz-acl"": ""bucket-owner-full-control""
                }
            }
        }
    ]
}
",
    });

    var foo = new Aws.Ssm.ResourceDataSync("foo", new()
    {
        S3Destination = new Aws.Ssm.Inputs.ResourceDataSyncS3DestinationArgs
        {
            BucketName = hogeBucketV2.Bucket,
            Region = hogeBucketV2.Region,
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ssm"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		hogeBucketV2, err := s3.NewBucketV2(ctx, "hogeBucketV2", nil)
		if err != nil {
			return err
		}
		_, err = s3.NewBucketPolicy(ctx, "hogeBucketPolicy", &s3.BucketPolicyArgs{
			Bucket: hogeBucketV2.Bucket,
			Policy: pulumi.Any(fmt.Sprintf(`{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "SSMBucketPermissionsCheck",
            "Effect": "Allow",
            "Principal": {
                "Service": "ssm.amazonaws.com"
            },
            "Action": "s3:GetBucketAcl",
            "Resource": "arn:aws:s3:::tf-test-bucket-1234"
        },
        {
            "Sid": " SSMBucketDelivery",
            "Effect": "Allow",
            "Principal": {
                "Service": "ssm.amazonaws.com"
            },
            "Action": "s3:PutObject",
            "Resource": ["arn:aws:s3:::tf-test-bucket-1234/*"],
            "Condition": {
                "StringEquals": {
                    "s3:x-amz-acl": "bucket-owner-full-control"
                }
            }
        }
    ]
}
`)),
		})
		if err != nil {
			return err
		}
		_, err = ssm.NewResourceDataSync(ctx, "foo", &ssm.ResourceDataSyncArgs{
			S3Destination: &ssm.ResourceDataSyncS3DestinationArgs{
				BucketName: hogeBucketV2.Bucket,
				Region:     hogeBucketV2.Region,
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
import com.pulumi.aws.s3.BucketPolicy;
import com.pulumi.aws.s3.BucketPolicyArgs;
import com.pulumi.aws.ssm.ResourceDataSync;
import com.pulumi.aws.ssm.ResourceDataSyncArgs;
import com.pulumi.aws.ssm.inputs.ResourceDataSyncS3DestinationArgs;
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
        var hogeBucketV2 = new BucketV2("hogeBucketV2");

        var hogeBucketPolicy = new BucketPolicy("hogeBucketPolicy", BucketPolicyArgs.builder()        
            .bucket(hogeBucketV2.bucket())
            .policy("""
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "SSMBucketPermissionsCheck",
            "Effect": "Allow",
            "Principal": {
                "Service": "ssm.amazonaws.com"
            },
            "Action": "s3:GetBucketAcl",
            "Resource": "arn:aws:s3:::tf-test-bucket-1234"
        },
        {
            "Sid": " SSMBucketDelivery",
            "Effect": "Allow",
            "Principal": {
                "Service": "ssm.amazonaws.com"
            },
            "Action": "s3:PutObject",
            "Resource": ["arn:aws:s3:::tf-test-bucket-1234/*"],
            "Condition": {
                "StringEquals": {
                    "s3:x-amz-acl": "bucket-owner-full-control"
                }
            }
        }
    ]
}
            """)
            .build());

        var foo = new ResourceDataSync("foo", ResourceDataSyncArgs.builder()        
            .s3Destination(ResourceDataSyncS3DestinationArgs.builder()
                .bucketName(hogeBucketV2.bucket())
                .region(hogeBucketV2.region())
                .build())
            .build());

    }
}
```
```yaml
resources:
  hogeBucketV2:
    type: aws:s3:BucketV2
  hogeBucketPolicy:
    type: aws:s3:BucketPolicy
    properties:
      bucket: ${hogeBucketV2.bucket}
      policy: |
        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Sid": "SSMBucketPermissionsCheck",
                    "Effect": "Allow",
                    "Principal": {
                        "Service": "ssm.amazonaws.com"
                    },
                    "Action": "s3:GetBucketAcl",
                    "Resource": "arn:aws:s3:::tf-test-bucket-1234"
                },
                {
                    "Sid": " SSMBucketDelivery",
                    "Effect": "Allow",
                    "Principal": {
                        "Service": "ssm.amazonaws.com"
                    },
                    "Action": "s3:PutObject",
                    "Resource": ["arn:aws:s3:::tf-test-bucket-1234/*"],
                    "Condition": {
                        "StringEquals": {
                            "s3:x-amz-acl": "bucket-owner-full-control"
                        }
                    }
                }
            ]
        }
  foo:
    type: aws:ssm:ResourceDataSync
    properties:
      s3Destination:
        bucketName: ${hogeBucketV2.bucket}
        region: ${hogeBucketV2.region}
```
{{% /example %}}
{{% /examples %}}

## Import

SSM resource data sync can be imported using the `name`, e.g.,

```sh
 $ pulumi import aws:ssm/resourceDataSync:ResourceDataSync example example-name
```

 
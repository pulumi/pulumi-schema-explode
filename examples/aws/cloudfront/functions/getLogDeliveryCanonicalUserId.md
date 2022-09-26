The CloudFront Log Delivery Canonical User ID data source allows access to the [canonical user ID](http://docs.aws.amazon.com/general/latest/gr/acct-identifiers.html) of the AWS `awslogsdelivery` account for CloudFront bucket logging.
See the [Amazon CloudFront Developer Guide](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html) for more information.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleLogDeliveryCanonicalUserId = aws.cloudfront.getLogDeliveryCanonicalUserId({});
const exampleBucketV2 = new aws.s3.BucketV2("exampleBucketV2", {});
const exampleBucketAclV2 = new aws.s3.BucketAclV2("exampleBucketAclV2", {
    bucket: exampleBucketV2.id,
    accessControlPolicy: {
        grants: [{
            grantee: {
                id: exampleLogDeliveryCanonicalUserId.then(exampleLogDeliveryCanonicalUserId => exampleLogDeliveryCanonicalUserId.id),
                type: "CanonicalUser",
            },
            permission: "FULL_CONTROL",
        }],
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example_log_delivery_canonical_user_id = aws.cloudfront.get_log_delivery_canonical_user_id()
example_bucket_v2 = aws.s3.BucketV2("exampleBucketV2")
example_bucket_acl_v2 = aws.s3.BucketAclV2("exampleBucketAclV2",
    bucket=example_bucket_v2.id,
    access_control_policy=aws.s3.BucketAclV2AccessControlPolicyArgs(
        grants=[aws.s3.BucketAclV2AccessControlPolicyGrantArgs(
            grantee=aws.s3.BucketAclV2AccessControlPolicyGrantGranteeArgs(
                id=example_log_delivery_canonical_user_id.id,
                type="CanonicalUser",
            ),
            permission="FULL_CONTROL",
        )],
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleLogDeliveryCanonicalUserId = Aws.CloudFront.GetLogDeliveryCanonicalUserId.Invoke();

    var exampleBucketV2 = new Aws.S3.BucketV2("exampleBucketV2");

    var exampleBucketAclV2 = new Aws.S3.BucketAclV2("exampleBucketAclV2", new()
    {
        Bucket = exampleBucketV2.Id,
        AccessControlPolicy = new Aws.S3.Inputs.BucketAclV2AccessControlPolicyArgs
        {
            Grants = new[]
            {
                new Aws.S3.Inputs.BucketAclV2AccessControlPolicyGrantArgs
                {
                    Grantee = new Aws.S3.Inputs.BucketAclV2AccessControlPolicyGrantGranteeArgs
                    {
                        Id = exampleLogDeliveryCanonicalUserId.Apply(getLogDeliveryCanonicalUserIdResult => getLogDeliveryCanonicalUserIdResult.Id),
                        Type = "CanonicalUser",
                    },
                    Permission = "FULL_CONTROL",
                },
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudfront"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleLogDeliveryCanonicalUserId, err := cloudfront.GetLogDeliveryCanonicalUserId(ctx, nil, nil)
		if err != nil {
			return err
		}
		exampleBucketV2, err := s3.NewBucketV2(ctx, "exampleBucketV2", nil)
		if err != nil {
			return err
		}
		_, err = s3.NewBucketAclV2(ctx, "exampleBucketAclV2", &s3.BucketAclV2Args{
			Bucket: exampleBucketV2.ID(),
			AccessControlPolicy: &s3.BucketAclV2AccessControlPolicyArgs{
				Grants: s3.BucketAclV2AccessControlPolicyGrantArray{
					&s3.BucketAclV2AccessControlPolicyGrantArgs{
						Grantee: &s3.BucketAclV2AccessControlPolicyGrantGranteeArgs{
							Id:   pulumi.String(exampleLogDeliveryCanonicalUserId.Id),
							Type: pulumi.String("CanonicalUser"),
						},
						Permission: pulumi.String("FULL_CONTROL"),
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
import com.pulumi.aws.cloudfront.CloudfrontFunctions;
import com.pulumi.aws.cloudfront.inputs.GetLogDeliveryCanonicalUserIdArgs;
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.s3.BucketAclV2;
import com.pulumi.aws.s3.BucketAclV2Args;
import com.pulumi.aws.s3.inputs.BucketAclV2AccessControlPolicyArgs;
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
        final var exampleLogDeliveryCanonicalUserId = CloudfrontFunctions.getLogDeliveryCanonicalUserId();

        var exampleBucketV2 = new BucketV2("exampleBucketV2");

        var exampleBucketAclV2 = new BucketAclV2("exampleBucketAclV2", BucketAclV2Args.builder()        
            .bucket(exampleBucketV2.id())
            .accessControlPolicy(BucketAclV2AccessControlPolicyArgs.builder()
                .grants(BucketAclV2AccessControlPolicyGrantArgs.builder()
                    .grantee(BucketAclV2AccessControlPolicyGrantGranteeArgs.builder()
                        .id(exampleLogDeliveryCanonicalUserId.applyValue(getLogDeliveryCanonicalUserIdResult -> getLogDeliveryCanonicalUserIdResult.id()))
                        .type("CanonicalUser")
                        .build())
                    .permission("FULL_CONTROL")
                    .build())
                .build())
            .build());

    }
}
```
```yaml
resources:
  exampleBucketV2:
    type: aws:s3:BucketV2
  exampleBucketAclV2:
    type: aws:s3:BucketAclV2
    properties:
      bucket: ${exampleBucketV2.id}
      accessControlPolicy:
        grants:
          - grantee:
              id: ${exampleLogDeliveryCanonicalUserId.id}
              type: CanonicalUser
            permission: FULL_CONTROL
variables:
  exampleLogDeliveryCanonicalUserId:
    Fn::Invoke:
      Function: aws:cloudfront:getLogDeliveryCanonicalUserId
      Arguments: {}
```
{{% /example %}}
{{% /examples %}}
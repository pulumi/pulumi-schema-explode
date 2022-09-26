Provides an S3 bucket request payment configuration resource. For more information, see [Requester Pays Buckets](https://docs.aws.amazon.com/AmazonS3/latest/dev/RequesterPaysBuckets.html).

> **NOTE:** Destroying an `aws.s3.BucketRequestPaymentConfigurationV2` resource resets the bucket's `payer` to the S3 default: the bucket owner.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.s3.BucketRequestPaymentConfigurationV2("example", {
    bucket: aws_s3_bucket.example.bucket,
    payer: "Requester",
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.s3.BucketRequestPaymentConfigurationV2("example",
    bucket=aws_s3_bucket["example"]["bucket"],
    payer="Requester")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.S3.BucketRequestPaymentConfigurationV2("example", new()
    {
        Bucket = aws_s3_bucket.Example.Bucket,
        Payer = "Requester",
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
		_, err := s3.NewBucketRequestPaymentConfigurationV2(ctx, "example", &s3.BucketRequestPaymentConfigurationV2Args{
			Bucket: pulumi.Any(aws_s3_bucket.Example.Bucket),
			Payer:  pulumi.String("Requester"),
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
import com.pulumi.aws.s3.BucketRequestPaymentConfigurationV2;
import com.pulumi.aws.s3.BucketRequestPaymentConfigurationV2Args;
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
        var example = new BucketRequestPaymentConfigurationV2("example", BucketRequestPaymentConfigurationV2Args.builder()        
            .bucket(aws_s3_bucket.example().bucket())
            .payer("Requester")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:s3:BucketRequestPaymentConfigurationV2
    properties:
      bucket: ${aws_s3_bucket.example.bucket}
      payer: Requester
```
{{% /example %}}
{{% /examples %}}

## Import

S3 bucket request payment configuration can be imported in one of two ways. If the owner (account ID) of the source bucket is the same account used to configure the Terraform AWS Provider, the S3 bucket request payment configuration resource should be imported using the `bucket` e.g.,

```sh
 $ pulumi import aws:s3/bucketRequestPaymentConfigurationV2:BucketRequestPaymentConfigurationV2 example bucket-name
```

 If the owner (account ID) of the source bucket differs from the account used to configure the Terraform AWS Provider, the S3 bucket request payment configuration resource should be imported using the `bucket` and `expected_bucket_owner` separated by a comma (`,`) e.g.,

```sh
 $ pulumi import aws:s3/bucketRequestPaymentConfigurationV2:BucketRequestPaymentConfigurationV2 example bucket-name,123456789012
```

 
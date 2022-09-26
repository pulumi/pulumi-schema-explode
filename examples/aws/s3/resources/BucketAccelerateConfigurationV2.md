Provides an S3 bucket accelerate configuration resource. See the [Requirements for using Transfer Acceleration](https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html#transfer-acceleration-requirements) for more details.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const mybucket = new aws.s3.BucketV2("mybucket", {});
const example = new aws.s3.BucketAccelerateConfigurationV2("example", {
    bucket: mybucket.bucket,
    status: "Enabled",
});
```
```python
import pulumi
import pulumi_aws as aws

mybucket = aws.s3.BucketV2("mybucket")
example = aws.s3.BucketAccelerateConfigurationV2("example",
    bucket=mybucket.bucket,
    status="Enabled")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var mybucket = new Aws.S3.BucketV2("mybucket");

    var example = new Aws.S3.BucketAccelerateConfigurationV2("example", new()
    {
        Bucket = mybucket.Bucket,
        Status = "Enabled",
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
		mybucket, err := s3.NewBucketV2(ctx, "mybucket", nil)
		if err != nil {
			return err
		}
		_, err = s3.NewBucketAccelerateConfigurationV2(ctx, "example", &s3.BucketAccelerateConfigurationV2Args{
			Bucket: mybucket.Bucket,
			Status: pulumi.String("Enabled"),
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
import com.pulumi.aws.s3.BucketAccelerateConfigurationV2;
import com.pulumi.aws.s3.BucketAccelerateConfigurationV2Args;
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
        var mybucket = new BucketV2("mybucket");

        var example = new BucketAccelerateConfigurationV2("example", BucketAccelerateConfigurationV2Args.builder()        
            .bucket(mybucket.bucket())
            .status("Enabled")
            .build());

    }
}
```
```yaml
resources:
  mybucket:
    type: aws:s3:BucketV2
  example:
    type: aws:s3:BucketAccelerateConfigurationV2
    properties:
      bucket: ${mybucket.bucket}
      status: Enabled
```
{{% /example %}}
{{% /examples %}}

## Import

S3 bucket accelerate configuration can be imported in one of two ways. If the owner (account ID) of the source bucket is the same account used to configure the Terraform AWS Provider, the S3 bucket accelerate configuration resource should be imported using the `bucket` e.g.,

```sh
 $ pulumi import aws:s3/bucketAccelerateConfigurationV2:BucketAccelerateConfigurationV2 example bucket-name
```

 If the owner (account ID) of the source bucket differs from the account used to configure the Terraform AWS Provider, the S3 bucket accelerate configuration resource should be imported using the `bucket` and `expected_bucket_owner` separated by a comma (`,`) e.g.,

```sh
 $ pulumi import aws:s3/bucketAccelerateConfigurationV2:BucketAccelerateConfigurationV2 example bucket-name,123456789012
```

 
Provides a resource to manage an S3 Control Bucket.

> This functionality is for managing [S3 on Outposts](https://docs.aws.amazon.com/AmazonS3/latest/dev/S3onOutposts.html). To manage S3 Buckets in an AWS Partition, see the `aws.s3.BucketV2` resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.s3control.Bucket("example", {
    bucket: "example",
    outpostId: data.aws_outposts_outpost.example.id,
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.s3control.Bucket("example",
    bucket="example",
    outpost_id=data["aws_outposts_outpost"]["example"]["id"])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.S3Control.Bucket("example", new()
    {
        BucketName = "example",
        OutpostId = data.Aws_outposts_outpost.Example.Id,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3control"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := s3control.NewBucket(ctx, "example", &s3control.BucketArgs{
			Bucket:    pulumi.String("example"),
			OutpostId: pulumi.Any(data.Aws_outposts_outpost.Example.Id),
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
import com.pulumi.aws.s3control.Bucket;
import com.pulumi.aws.s3control.BucketArgs;
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
        var example = new Bucket("example", BucketArgs.builder()        
            .bucket("example")
            .outpostId(data.aws_outposts_outpost().example().id())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:s3control:Bucket
    properties:
      bucket: example
      outpostId: ${data.aws_outposts_outpost.example.id}
```
{{% /example %}}
{{% /examples %}}

## Import

S3 Control Buckets can be imported using Amazon Resource Name (ARN), e.g.,

```sh
 $ pulumi import aws:s3control/bucket:Bucket example arn:aws:s3-outposts:us-east-1:123456789012:outpost/op-12345678/bucket/example
```

 
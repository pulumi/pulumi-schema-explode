> **NOTE:** This resource interacts with [Amazon Macie Classic](https://docs.aws.amazon.com/macie/latest/userguide/what-is-macie.html). Macie Classic cannot be activated in new accounts. See the [FAQ](https://aws.amazon.com/macie/classic-faqs/) for more details.

Associates an S3 resource with Amazon Macie for monitoring and data classification.

> **NOTE:** Before using Amazon Macie for the first time it must be enabled manually. Instructions are [here](https://docs.aws.amazon.com/macie/latest/userguide/macie-setting-up.html#macie-setting-up-enable).

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.macie.S3BucketAssociation("example", {
    bucketName: "tf-macie-example",
    classificationType: {
        oneTime: "FULL",
    },
    prefix: "data",
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.macie.S3BucketAssociation("example",
    bucket_name="tf-macie-example",
    classification_type=aws.macie.S3BucketAssociationClassificationTypeArgs(
        one_time="FULL",
    ),
    prefix="data")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Macie.S3BucketAssociation("example", new()
    {
        BucketName = "tf-macie-example",
        ClassificationType = new Aws.Macie.Inputs.S3BucketAssociationClassificationTypeArgs
        {
            OneTime = "FULL",
        },
        Prefix = "data",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/macie"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := macie.NewS3BucketAssociation(ctx, "example", &macie.S3BucketAssociationArgs{
			BucketName: pulumi.String("tf-macie-example"),
			ClassificationType: &macie.S3BucketAssociationClassificationTypeArgs{
				OneTime: pulumi.String("FULL"),
			},
			Prefix: pulumi.String("data"),
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
import com.pulumi.aws.macie.S3BucketAssociation;
import com.pulumi.aws.macie.S3BucketAssociationArgs;
import com.pulumi.aws.macie.inputs.S3BucketAssociationClassificationTypeArgs;
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
        var example = new S3BucketAssociation("example", S3BucketAssociationArgs.builder()        
            .bucketName("tf-macie-example")
            .classificationType(S3BucketAssociationClassificationTypeArgs.builder()
                .oneTime("FULL")
                .build())
            .prefix("data")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:macie:S3BucketAssociation
    properties:
      bucketName: tf-macie-example
      classificationType:
        oneTime: FULL
      prefix: data
```
{{% /example %}}
{{% /examples %}}
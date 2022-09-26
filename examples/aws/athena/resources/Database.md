Provides an Athena database.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleBucketV2 = new aws.s3.BucketV2("exampleBucketV2", {});
const exampleDatabase = new aws.athena.Database("exampleDatabase", {
    name: "database_name",
    bucket: exampleBucketV2.bucket,
});
```
```python
import pulumi
import pulumi_aws as aws

example_bucket_v2 = aws.s3.BucketV2("exampleBucketV2")
example_database = aws.athena.Database("exampleDatabase",
    name="database_name",
    bucket=example_bucket_v2.bucket)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleBucketV2 = new Aws.S3.BucketV2("exampleBucketV2");

    var exampleDatabase = new Aws.Athena.Database("exampleDatabase", new()
    {
        Name = "database_name",
        Bucket = exampleBucketV2.Bucket,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/athena"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleBucketV2, err := s3.NewBucketV2(ctx, "exampleBucketV2", nil)
		if err != nil {
			return err
		}
		_, err = athena.NewDatabase(ctx, "exampleDatabase", &athena.DatabaseArgs{
			Name:   pulumi.String("database_name"),
			Bucket: exampleBucketV2.Bucket,
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
import com.pulumi.aws.athena.Database;
import com.pulumi.aws.athena.DatabaseArgs;
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
        var exampleBucketV2 = new BucketV2("exampleBucketV2");

        var exampleDatabase = new Database("exampleDatabase", DatabaseArgs.builder()        
            .name("database_name")
            .bucket(exampleBucketV2.bucket())
            .build());

    }
}
```
```yaml
resources:
  exampleBucketV2:
    type: aws:s3:BucketV2
  exampleDatabase:
    type: aws:athena:Database
    properties:
      name: database_name
      bucket: ${exampleBucketV2.bucket}
```
{{% /example %}}
{{% /examples %}}

## Import

Athena Databases can be imported using their name, e.g.,

```sh
 $ pulumi import aws:athena/database:Database example example
```

 Certain resource arguments, like `encryption_configuration` and `bucket`, do not have an API method for reading the information after creation. If the argument is set in the Terraform configuration on an imported resource, Terraform will always show a difference. To workaround this behavior, either omit the argument from the Terraform configuration or use [`ignore_changes`](https://www.terraform.io/docs/configuration/meta-arguments/lifecycle.html#ignore_changes) to hide the difference, e.g., terraform resource "aws_athena_database" "example" {

 name

 = "database_name"

 bucket = aws_s3_bucket.example.bucket

 # There is no API for reading bucket

 lifecycle {



 ignore_changes = [bucket]

 } } 
Provides an GameLift Script resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.gamelift.Script("example", {storageLocation: {
    bucket: aws_s3_bucket.example.bucket,
    key: aws_s3_object.example.key,
    roleArn: aws_iam_role.example.arn,
}});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.gamelift.Script("example", storage_location=aws.gamelift.ScriptStorageLocationArgs(
    bucket=aws_s3_bucket["example"]["bucket"],
    key=aws_s3_object["example"]["key"],
    role_arn=aws_iam_role["example"]["arn"],
))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.GameLift.Script("example", new()
    {
        StorageLocation = new Aws.GameLift.Inputs.ScriptStorageLocationArgs
        {
            Bucket = aws_s3_bucket.Example.Bucket,
            Key = aws_s3_object.Example.Key,
            RoleArn = aws_iam_role.Example.Arn,
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/gamelift"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := gamelift.NewScript(ctx, "example", &gamelift.ScriptArgs{
			StorageLocation: &gamelift.ScriptStorageLocationArgs{
				Bucket:  pulumi.Any(aws_s3_bucket.Example.Bucket),
				Key:     pulumi.Any(aws_s3_object.Example.Key),
				RoleArn: pulumi.Any(aws_iam_role.Example.Arn),
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
import com.pulumi.aws.gamelift.Script;
import com.pulumi.aws.gamelift.ScriptArgs;
import com.pulumi.aws.gamelift.inputs.ScriptStorageLocationArgs;
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
        var example = new Script("example", ScriptArgs.builder()        
            .storageLocation(ScriptStorageLocationArgs.builder()
                .bucket(aws_s3_bucket.example().bucket())
                .key(aws_s3_object.example().key())
                .roleArn(aws_iam_role.example().arn())
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:gamelift:Script
    properties:
      storageLocation:
        bucket: ${aws_s3_bucket.example.bucket}
        key: ${aws_s3_object.example.key}
        roleArn: ${aws_iam_role.example.arn}
```
{{% /example %}}
{{% /examples %}}

## Import

GameLift Scripts can be imported using the ID, e.g.,

```sh
 $ pulumi import aws:gamelift/script:Script example <script-id>
```

 
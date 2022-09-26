Provides a CloudWatch Logs destination resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const testDestination = new aws.cloudwatch.LogDestination("testDestination", {
    roleArn: aws_iam_role.iam_for_cloudwatch.arn,
    targetArn: aws_kinesis_stream.kinesis_for_cloudwatch.arn,
});
```
```python
import pulumi
import pulumi_aws as aws

test_destination = aws.cloudwatch.LogDestination("testDestination",
    role_arn=aws_iam_role["iam_for_cloudwatch"]["arn"],
    target_arn=aws_kinesis_stream["kinesis_for_cloudwatch"]["arn"])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var testDestination = new Aws.CloudWatch.LogDestination("testDestination", new()
    {
        RoleArn = aws_iam_role.Iam_for_cloudwatch.Arn,
        TargetArn = aws_kinesis_stream.Kinesis_for_cloudwatch.Arn,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudwatch"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := cloudwatch.NewLogDestination(ctx, "testDestination", &cloudwatch.LogDestinationArgs{
			RoleArn:   pulumi.Any(aws_iam_role.Iam_for_cloudwatch.Arn),
			TargetArn: pulumi.Any(aws_kinesis_stream.Kinesis_for_cloudwatch.Arn),
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
import com.pulumi.aws.cloudwatch.LogDestination;
import com.pulumi.aws.cloudwatch.LogDestinationArgs;
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
        var testDestination = new LogDestination("testDestination", LogDestinationArgs.builder()        
            .roleArn(aws_iam_role.iam_for_cloudwatch().arn())
            .targetArn(aws_kinesis_stream.kinesis_for_cloudwatch().arn())
            .build());

    }
}
```
```yaml
resources:
  testDestination:
    type: aws:cloudwatch:LogDestination
    properties:
      roleArn: ${aws_iam_role.iam_for_cloudwatch.arn}
      targetArn: ${aws_kinesis_stream.kinesis_for_cloudwatch.arn}
```
{{% /example %}}
{{% /examples %}}

## Import

CloudWatch Logs destinations can be imported using the `name`, e.g.,

```sh
 $ pulumi import aws:cloudwatch/logDestination:LogDestination test_destination test_destination
```

 
Use this data source to get a list of AWS Cloudwatch Log Groups

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = pulumi.output(aws.cloudwatch.getLogGroups({
    logGroupNamePrefix: "/MyImportantLogs",
}));
```
```python
import pulumi
import pulumi_aws as aws

example = aws.cloudwatch.get_log_groups(log_group_name_prefix="/MyImportantLogs")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = Aws.CloudWatch.GetLogGroups.Invoke(new()
    {
        LogGroupNamePrefix = "/MyImportantLogs",
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
		_, err := cloudwatch.GetLogGroups(ctx, &cloudwatch.GetLogGroupsArgs{
			LogGroupNamePrefix: pulumi.StringRef("/MyImportantLogs"),
		}, nil)
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
import com.pulumi.aws.cloudwatch.CloudwatchFunctions;
import com.pulumi.aws.cloudwatch.inputs.GetLogGroupsArgs;
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
        final var example = CloudwatchFunctions.getLogGroups(GetLogGroupsArgs.builder()
            .logGroupNamePrefix("/MyImportantLogs")
            .build());

    }
}
```
```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:cloudwatch:getLogGroups
      Arguments:
        logGroupNamePrefix: /MyImportantLogs
```
{{% /example %}}
{{% /examples %}}
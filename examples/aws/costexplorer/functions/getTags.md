Provides details about a specific CE Tags.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const test = pulumi.output(aws.costexplorer.getTags({
    timePeriod: {
        end: "2022-12-01",
        start: "2021-01-01",
    },
}));
```
```python
import pulumi
import pulumi_aws as aws

test = aws.costexplorer.get_tags(time_period=aws.costexplorer.GetTagsTimePeriodArgs(
    end="2022-12-01",
    start="2021-01-01",
))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var test = Aws.CostExplorer.GetTags.Invoke(new()
    {
        TimePeriod = new Aws.CostExplorer.Inputs.GetTagsTimePeriodInputArgs
        {
            End = "2022-12-01",
            Start = "2021-01-01",
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/costexplorer"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := costexplorer.GetTags(ctx, &costexplorer.GetTagsArgs{
			TimePeriod: costexplorer.GetTagsTimePeriod{
				End:   "2022-12-01",
				Start: "2021-01-01",
			},
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
import com.pulumi.aws.costexplorer.CostexplorerFunctions;
import com.pulumi.aws.costexplorer.inputs.GetTagsArgs;
import com.pulumi.aws.costexplorer.inputs.GetTagsTimePeriodArgs;
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
        final var test = CostexplorerFunctions.getTags(GetTagsArgs.builder()
            .timePeriod(GetTagsTimePeriodArgs.builder()
                .end("2022-12-01")
                .start("2021-01-01")
                .build())
            .build());

    }
}
```
```yaml
variables:
  test:
    Fn::Invoke:
      Function: aws:costexplorer:getTags
      Arguments:
        timePeriod:
          end: 2022-12-01
          start: 2021-01-01
```
{{% /example %}}
{{% /examples %}}
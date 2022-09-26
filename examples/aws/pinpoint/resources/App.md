Provides a Pinpoint App resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.pinpoint.App("example", {
    limits: {
        maximumDuration: 600,
    },
    quietTime: {
        end: "06:00",
        start: "00:00",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.pinpoint.App("example",
    limits=aws.pinpoint.AppLimitsArgs(
        maximum_duration=600,
    ),
    quiet_time=aws.pinpoint.AppQuietTimeArgs(
        end="06:00",
        start="00:00",
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Pinpoint.App("example", new()
    {
        Limits = new Aws.Pinpoint.Inputs.AppLimitsArgs
        {
            MaximumDuration = 600,
        },
        QuietTime = new Aws.Pinpoint.Inputs.AppQuietTimeArgs
        {
            End = "06:00",
            Start = "00:00",
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/pinpoint"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := pinpoint.NewApp(ctx, "example", &pinpoint.AppArgs{
			Limits: &pinpoint.AppLimitsArgs{
				MaximumDuration: pulumi.Int(600),
			},
			QuietTime: &pinpoint.AppQuietTimeArgs{
				End:   pulumi.String("06:00"),
				Start: pulumi.String("00:00"),
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
import com.pulumi.aws.pinpoint.App;
import com.pulumi.aws.pinpoint.AppArgs;
import com.pulumi.aws.pinpoint.inputs.AppLimitsArgs;
import com.pulumi.aws.pinpoint.inputs.AppQuietTimeArgs;
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
        var example = new App("example", AppArgs.builder()        
            .limits(AppLimitsArgs.builder()
                .maximumDuration(600)
                .build())
            .quietTime(AppQuietTimeArgs.builder()
                .end("06:00")
                .start("00:00")
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:pinpoint:App
    properties:
      limits:
        maximumDuration: 600
      quietTime:
        end: 06:00
        start: 00:00
```
{{% /example %}}
{{% /examples %}}

## Import

Pinpoint App can be imported using the `application-id`, e.g.,

```sh
 $ pulumi import aws:pinpoint/app:App name application-id
```

 
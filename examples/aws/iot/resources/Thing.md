Creates and manages an AWS IoT Thing.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.iot.Thing("example", {
    attributes: {
        First: "examplevalue",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.iot.Thing("example", attributes={
    "First": "examplevalue",
})
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Iot.Thing("example", new()
    {
        Attributes = 
        {
            { "First", "examplevalue" },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iot"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := iot.NewThing(ctx, "example", &iot.ThingArgs{
			Attributes: pulumi.StringMap{
				"First": pulumi.String("examplevalue"),
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
import com.pulumi.aws.iot.Thing;
import com.pulumi.aws.iot.ThingArgs;
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
        var example = new Thing("example", ThingArgs.builder()        
            .attributes(Map.of("First", "examplevalue"))
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:iot:Thing
    properties:
      attributes:
        First: examplevalue
```
{{% /example %}}
{{% /examples %}}

## Import

IOT Things can be imported using the name, e.g.,

```sh
 $ pulumi import aws:iot/thing:Thing example example
```

 
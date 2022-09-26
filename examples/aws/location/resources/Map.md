Provides a Location Service Map.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.location.Map("example", {
    configuration: {
        style: "VectorHereBerlin",
    },
    mapName: "example",
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.location.Map("example",
    configuration=aws.location.MapConfigurationArgs(
        style="VectorHereBerlin",
    ),
    map_name="example")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Location.Map("example", new()
    {
        Configuration = new Aws.Location.Inputs.MapConfigurationArgs
        {
            Style = "VectorHereBerlin",
        },
        MapName = "example",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/location"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := location.NewMap(ctx, "example", &location.MapArgs{
			Configuration: &location.MapConfigurationArgs{
				Style: pulumi.String("VectorHereBerlin"),
			},
			MapName: pulumi.String("example"),
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
import com.pulumi.aws.location.Map;
import com.pulumi.aws.location.MapArgs;
import com.pulumi.aws.location.inputs.MapConfigurationArgs;
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
        var example = new Map("example", MapArgs.builder()        
            .configuration(MapConfigurationArgs.builder()
                .style("VectorHereBerlin")
                .build())
            .mapName("example")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:location:Map
    properties:
      configuration:
        style: VectorHereBerlin
      mapName: example
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_location_map` resources can be imported using the map name, e.g.

```sh
 $ pulumi import aws:location/map:Map example example
```

 
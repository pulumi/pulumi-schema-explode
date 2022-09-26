Provides an OpsWorks Ruby on Rails application layer resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const app = new aws.opsworks.RailsAppLayer("app", {stackId: aws_opsworks_stack.main.id});
```
```python
import pulumi
import pulumi_aws as aws

app = aws.opsworks.RailsAppLayer("app", stack_id=aws_opsworks_stack["main"]["id"])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var app = new Aws.OpsWorks.RailsAppLayer("app", new()
    {
        StackId = aws_opsworks_stack.Main.Id,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/opsworks"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := opsworks.NewRailsAppLayer(ctx, "app", &opsworks.RailsAppLayerArgs{
			StackId: pulumi.Any(aws_opsworks_stack.Main.Id),
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
import com.pulumi.aws.opsworks.RailsAppLayer;
import com.pulumi.aws.opsworks.RailsAppLayerArgs;
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
        var app = new RailsAppLayer("app", RailsAppLayerArgs.builder()        
            .stackId(aws_opsworks_stack.main().id())
            .build());

    }
}
```
```yaml
resources:
  app:
    type: aws:opsworks:RailsAppLayer
    properties:
      stackId: ${aws_opsworks_stack.main.id}
```
{{% /example %}}
{{% /examples %}}
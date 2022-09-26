Provides an SSM Maintenance Window resource

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const production = new aws.ssm.MaintenanceWindow("production", {
    cutoff: 1,
    duration: 3,
    schedule: "cron(0 16 ? * TUE *)",
});
```
```python
import pulumi
import pulumi_aws as aws

production = aws.ssm.MaintenanceWindow("production",
    cutoff=1,
    duration=3,
    schedule="cron(0 16 ? * TUE *)")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var production = new Aws.Ssm.MaintenanceWindow("production", new()
    {
        Cutoff = 1,
        Duration = 3,
        Schedule = "cron(0 16 ? * TUE *)",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ssm"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := ssm.NewMaintenanceWindow(ctx, "production", &ssm.MaintenanceWindowArgs{
			Cutoff:   pulumi.Int(1),
			Duration: pulumi.Int(3),
			Schedule: pulumi.String("cron(0 16 ? * TUE *)"),
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
import com.pulumi.aws.ssm.MaintenanceWindow;
import com.pulumi.aws.ssm.MaintenanceWindowArgs;
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
        var production = new MaintenanceWindow("production", MaintenanceWindowArgs.builder()        
            .cutoff(1)
            .duration(3)
            .schedule("cron(0 16 ? * TUE *)")
            .build());

    }
}
```
```yaml
resources:
  production:
    type: aws:ssm:MaintenanceWindow
    properties:
      cutoff: 1
      duration: 3
      schedule: cron(0 16 ? * TUE *)
```
{{% /example %}}
{{% /examples %}}

## Import

SSM

Maintenance Windows can be imported using the `maintenance window id`, e.g.,

```sh
 $ pulumi import aws:ssm/maintenanceWindow:MaintenanceWindow imported-window mw-0123456789
```

 
Manages an Amazon Managed Service for Prometheus (AMP) Workspace.

> **NOTE:** This AWS functionality is in Preview and may change before General Availability release. Backwards compatibility is not guaranteed between provider releases.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const demo = new aws.amp.Workspace("demo", {
    alias: "prometheus-test",
    tags: {
        Environment: "production",
        Owner: "abhi",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

demo = aws.amp.Workspace("demo",
    alias="prometheus-test",
    tags={
        "Environment": "production",
        "Owner": "abhi",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var demo = new Aws.Amp.Workspace("demo", new()
    {
        Alias = "prometheus-test",
        Tags = 
        {
            { "Environment", "production" },
            { "Owner", "abhi" },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/amp"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := amp.NewWorkspace(ctx, "demo", &amp.WorkspaceArgs{
			Alias: pulumi.String("prometheus-test"),
			Tags: pulumi.StringMap{
				"Environment": pulumi.String("production"),
				"Owner":       pulumi.String("abhi"),
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
import com.pulumi.aws.amp.Workspace;
import com.pulumi.aws.amp.WorkspaceArgs;
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
        var demo = new Workspace("demo", WorkspaceArgs.builder()        
            .alias("prometheus-test")
            .tags(Map.ofEntries(
                Map.entry("Environment", "production"),
                Map.entry("Owner", "abhi")
            ))
            .build());

    }
}
```
```yaml
resources:
  demo:
    type: aws:amp:Workspace
    properties:
      alias: prometheus-test
      tags:
        Environment: production
        Owner: abhi
```
{{% /example %}}
{{% /examples %}}

## Import

AMP Workspaces can be imported using the identifier, e.g.,

```sh
 $ pulumi import aws:amp/workspace:Workspace demo ws-C6DCB907-F2D7-4D96-957B-66691F865D8B
```

 
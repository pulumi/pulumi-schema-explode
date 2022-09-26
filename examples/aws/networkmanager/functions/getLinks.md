Retrieve information about link.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = aws.networkmanager.getLinks({
    globalNetworkId: _var.global_network_id,
    tags: {
        Env: "test",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.networkmanager.get_links(global_network_id=var["global_network_id"],
    tags={
        "Env": "test",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = Aws.NetworkManager.GetLinks.Invoke(new()
    {
        GlobalNetworkId = @var.Global_network_id,
        Tags = 
        {
            { "Env", "test" },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/networkmanager"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := networkmanager.GetLinks(ctx, &networkmanager.GetLinksArgs{
			GlobalNetworkId: _var.Global_network_id,
			Tags: map[string]interface{}{
				"Env": "test",
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
import com.pulumi.aws.networkmanager.NetworkmanagerFunctions;
import com.pulumi.aws.networkmanager.inputs.GetLinksArgs;
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
        final var example = NetworkmanagerFunctions.getLinks(GetLinksArgs.builder()
            .globalNetworkId(var_.global_network_id())
            .tags(Map.of("Env", "test"))
            .build());

    }
}
```
```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:networkmanager:getLinks
      Arguments:
        globalNetworkId: ${var.global_network_id}
        tags:
          Env: test
```
{{% /example %}}
{{% /examples %}}
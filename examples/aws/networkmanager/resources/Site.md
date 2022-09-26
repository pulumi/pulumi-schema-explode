Creates a site in a global network.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleGlobalNetwork = new aws.networkmanager.GlobalNetwork("exampleGlobalNetwork", {});
const exampleSite = new aws.networkmanager.Site("exampleSite", {globalNetworkId: exampleGlobalNetwork.id});
```
```python
import pulumi
import pulumi_aws as aws

example_global_network = aws.networkmanager.GlobalNetwork("exampleGlobalNetwork")
example_site = aws.networkmanager.Site("exampleSite", global_network_id=example_global_network.id)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleGlobalNetwork = new Aws.NetworkManager.GlobalNetwork("exampleGlobalNetwork");

    var exampleSite = new Aws.NetworkManager.Site("exampleSite", new()
    {
        GlobalNetworkId = exampleGlobalNetwork.Id,
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
		exampleGlobalNetwork, err := networkmanager.NewGlobalNetwork(ctx, "exampleGlobalNetwork", nil)
		if err != nil {
			return err
		}
		_, err = networkmanager.NewSite(ctx, "exampleSite", &networkmanager.SiteArgs{
			GlobalNetworkId: exampleGlobalNetwork.ID(),
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
import com.pulumi.aws.networkmanager.GlobalNetwork;
import com.pulumi.aws.networkmanager.Site;
import com.pulumi.aws.networkmanager.SiteArgs;
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
        var exampleGlobalNetwork = new GlobalNetwork("exampleGlobalNetwork");

        var exampleSite = new Site("exampleSite", SiteArgs.builder()        
            .globalNetworkId(exampleGlobalNetwork.id())
            .build());

    }
}
```
```yaml
resources:
  exampleGlobalNetwork:
    type: aws:networkmanager:GlobalNetwork
  exampleSite:
    type: aws:networkmanager:Site
    properties:
      globalNetworkId: ${exampleGlobalNetwork.id}
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_networkmanager_site` can be imported using the site ARN, e.g.

```sh
 $ pulumi import aws:networkmanager/site:Site example arn:aws:networkmanager::123456789012:site/global-network-0d47f6t230mz46dy4/site-444555aaabbb11223
```

 
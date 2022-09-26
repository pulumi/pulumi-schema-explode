Creates a link for a site.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.networkmanager.Link("example", {
    globalNetworkId: aws_networkmanager_global_network.example.id,
    siteId: aws_networkmanager_global_site.example.id,
    bandwidth: {
        uploadSpeed: 10,
        downloadSpeed: 50,
    },
    providerName: "MegaCorp",
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.networkmanager.Link("example",
    global_network_id=aws_networkmanager_global_network["example"]["id"],
    site_id=aws_networkmanager_global_site["example"]["id"],
    bandwidth=aws.networkmanager.LinkBandwidthArgs(
        upload_speed=10,
        download_speed=50,
    ),
    provider_name="MegaCorp")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.NetworkManager.Link("example", new()
    {
        GlobalNetworkId = aws_networkmanager_global_network.Example.Id,
        SiteId = aws_networkmanager_global_site.Example.Id,
        Bandwidth = new Aws.NetworkManager.Inputs.LinkBandwidthArgs
        {
            UploadSpeed = 10,
            DownloadSpeed = 50,
        },
        ProviderName = "MegaCorp",
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
		_, err := networkmanager.NewLink(ctx, "example", &networkmanager.LinkArgs{
			GlobalNetworkId: pulumi.Any(aws_networkmanager_global_network.Example.Id),
			SiteId:          pulumi.Any(aws_networkmanager_global_site.Example.Id),
			Bandwidth: &networkmanager.LinkBandwidthArgs{
				UploadSpeed:   pulumi.Int(10),
				DownloadSpeed: pulumi.Int(50),
			},
			ProviderName: pulumi.String("MegaCorp"),
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
import com.pulumi.aws.networkmanager.Link;
import com.pulumi.aws.networkmanager.LinkArgs;
import com.pulumi.aws.networkmanager.inputs.LinkBandwidthArgs;
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
        var example = new Link("example", LinkArgs.builder()        
            .globalNetworkId(aws_networkmanager_global_network.example().id())
            .siteId(aws_networkmanager_global_site.example().id())
            .bandwidth(LinkBandwidthArgs.builder()
                .uploadSpeed(10)
                .downloadSpeed(50)
                .build())
            .providerName("MegaCorp")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:networkmanager:Link
    properties:
      globalNetworkId: ${aws_networkmanager_global_network.example.id}
      siteId: ${aws_networkmanager_global_site.example.id}
      bandwidth:
        uploadSpeed: 10
        downloadSpeed: 50
      providerName: MegaCorp
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_networkmanager_link` can be imported using the link ARN, e.g.

```sh
 $ pulumi import aws:networkmanager/link:Link example arn:aws:networkmanager::123456789012:link/global-network-0d47f6t230mz46dy4/link-444555aaabbb11223
```

 
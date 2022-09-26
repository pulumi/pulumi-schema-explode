Provides an AWS Elemental MediaPackage Channel.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const kittens = new aws.mediapackage.Channel("kittens", {
    channelId: "kitten-channel",
    description: "A channel dedicated to amusing videos of kittens.",
});
```
```python
import pulumi
import pulumi_aws as aws

kittens = aws.mediapackage.Channel("kittens",
    channel_id="kitten-channel",
    description="A channel dedicated to amusing videos of kittens.")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var kittens = new Aws.MediaPackage.Channel("kittens", new()
    {
        ChannelId = "kitten-channel",
        Description = "A channel dedicated to amusing videos of kittens.",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/mediapackage"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := mediapackage.NewChannel(ctx, "kittens", &mediapackage.ChannelArgs{
			ChannelId:   pulumi.String("kitten-channel"),
			Description: pulumi.String("A channel dedicated to amusing videos of kittens."),
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
import com.pulumi.aws.mediapackage.Channel;
import com.pulumi.aws.mediapackage.ChannelArgs;
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
        var kittens = new Channel("kittens", ChannelArgs.builder()        
            .channelId("kitten-channel")
            .description("A channel dedicated to amusing videos of kittens.")
            .build());

    }
}
```
```yaml
resources:
  kittens:
    type: aws:mediapackage:Channel
    properties:
      channelId: kitten-channel
      description: A channel dedicated to amusing videos of kittens.
```
{{% /example %}}
{{% /examples %}}

## Import

Media Package Channels can be imported via the channel ID, e.g.,

```sh
 $ pulumi import aws:mediapackage/channel:Channel kittens kittens-channel
```

 
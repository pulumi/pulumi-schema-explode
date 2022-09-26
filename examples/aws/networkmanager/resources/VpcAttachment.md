{{% examples %}}
## Example Usage
{{% example %}}
### Basic Usage

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.networkmanager.VpcAttachment("example", {
    subnetArns: [aws_subnet.example.arn],
    coreNetworkId: awscc_networkmanager_core_network.example.id,
    vpcArn: aws_vpc.example.arn,
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.networkmanager.VpcAttachment("example",
    subnet_arns=[aws_subnet["example"]["arn"]],
    core_network_id=awscc_networkmanager_core_network["example"]["id"],
    vpc_arn=aws_vpc["example"]["arn"])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.NetworkManager.VpcAttachment("example", new()
    {
        SubnetArns = new[]
        {
            aws_subnet.Example.Arn,
        },
        CoreNetworkId = awscc_networkmanager_core_network.Example.Id,
        VpcArn = aws_vpc.Example.Arn,
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
		_, err := networkmanager.NewVpcAttachment(ctx, "example", &networkmanager.VpcAttachmentArgs{
			SubnetArns: pulumi.StringArray{
				pulumi.Any(aws_subnet.Example.Arn),
			},
			CoreNetworkId: pulumi.Any(awscc_networkmanager_core_network.Example.Id),
			VpcArn:        pulumi.Any(aws_vpc.Example.Arn),
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
import com.pulumi.aws.networkmanager.VpcAttachment;
import com.pulumi.aws.networkmanager.VpcAttachmentArgs;
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
        var example = new VpcAttachment("example", VpcAttachmentArgs.builder()        
            .subnetArns(aws_subnet.example().arn())
            .coreNetworkId(awscc_networkmanager_core_network.example().id())
            .vpcArn(aws_vpc.example().arn())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:networkmanager:VpcAttachment
    properties:
      subnetArns:
        - ${aws_subnet.example.arn}
      coreNetworkId: ${awscc_networkmanager_core_network.example.id}
      vpcArn: ${aws_vpc.example.arn}
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_networkmanager_vpc_attachment` can be imported using the attachment ID, e.g.

```sh
 $ pulumi import aws:networkmanager/vpcAttachment:VpcAttachment example attachment-0f8fa60d2238d1bd8
```

 
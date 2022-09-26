Manages an EC2 Transit Gateway Connect.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.ec2transitgateway.VpcAttachment("example", {
    subnetIds: [aws_subnet.example.id],
    transitGatewayId: aws_ec2_transit_gateway.example.id,
    vpcId: aws_vpc.example.id,
});
const attachment = new aws.ec2transitgateway.Connect("attachment", {
    transportAttachmentId: example.id,
    transitGatewayId: aws_ec2_transit_gateway.example.id,
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.ec2transitgateway.VpcAttachment("example",
    subnet_ids=[aws_subnet["example"]["id"]],
    transit_gateway_id=aws_ec2_transit_gateway["example"]["id"],
    vpc_id=aws_vpc["example"]["id"])
attachment = aws.ec2transitgateway.Connect("attachment",
    transport_attachment_id=example.id,
    transit_gateway_id=aws_ec2_transit_gateway["example"]["id"])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Ec2TransitGateway.VpcAttachment("example", new()
    {
        SubnetIds = new[]
        {
            aws_subnet.Example.Id,
        },
        TransitGatewayId = aws_ec2_transit_gateway.Example.Id,
        VpcId = aws_vpc.Example.Id,
    });

    var attachment = new Aws.Ec2TransitGateway.Connect("attachment", new()
    {
        TransportAttachmentId = example.Id,
        TransitGatewayId = aws_ec2_transit_gateway.Example.Id,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ec2transitgateway"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		example, err := ec2transitgateway.NewVpcAttachment(ctx, "example", &ec2transitgateway.VpcAttachmentArgs{
			SubnetIds: pulumi.StringArray{
				pulumi.Any(aws_subnet.Example.Id),
			},
			TransitGatewayId: pulumi.Any(aws_ec2_transit_gateway.Example.Id),
			VpcId:            pulumi.Any(aws_vpc.Example.Id),
		})
		if err != nil {
			return err
		}
		_, err = ec2transitgateway.NewConnect(ctx, "attachment", &ec2transitgateway.ConnectArgs{
			TransportAttachmentId: example.ID(),
			TransitGatewayId:      pulumi.Any(aws_ec2_transit_gateway.Example.Id),
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
import com.pulumi.aws.ec2transitgateway.VpcAttachment;
import com.pulumi.aws.ec2transitgateway.VpcAttachmentArgs;
import com.pulumi.aws.ec2transitgateway.Connect;
import com.pulumi.aws.ec2transitgateway.ConnectArgs;
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
            .subnetIds(aws_subnet.example().id())
            .transitGatewayId(aws_ec2_transit_gateway.example().id())
            .vpcId(aws_vpc.example().id())
            .build());

        var attachment = new Connect("attachment", ConnectArgs.builder()        
            .transportAttachmentId(example.id())
            .transitGatewayId(aws_ec2_transit_gateway.example().id())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:ec2transitgateway:VpcAttachment
    properties:
      subnetIds:
        - ${aws_subnet.example.id}
      transitGatewayId: ${aws_ec2_transit_gateway.example.id}
      vpcId: ${aws_vpc.example.id}
  attachment:
    type: aws:ec2transitgateway:Connect
    properties:
      transportAttachmentId: ${example.id}
      transitGatewayId: ${aws_ec2_transit_gateway.example.id}
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_ec2_transit_gateway_connect` can be imported by using the EC2 Transit Gateway Connect identifier, e.g.,

```sh
 $ pulumi import aws:ec2transitgateway/connect:Connect example tgw-attach-12345678
```

 
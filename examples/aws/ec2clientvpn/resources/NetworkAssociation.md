{{% examples %}}
## Example Usage
{{% example %}}
### Using default security group

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.ec2clientvpn.NetworkAssociation("example", {
    clientVpnEndpointId: aws_ec2_client_vpn_endpoint.example.id,
    subnetId: aws_subnet.example.id,
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.ec2clientvpn.NetworkAssociation("example",
    client_vpn_endpoint_id=aws_ec2_client_vpn_endpoint["example"]["id"],
    subnet_id=aws_subnet["example"]["id"])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Ec2ClientVpn.NetworkAssociation("example", new()
    {
        ClientVpnEndpointId = aws_ec2_client_vpn_endpoint.Example.Id,
        SubnetId = aws_subnet.Example.Id,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ec2clientvpn"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := ec2clientvpn.NewNetworkAssociation(ctx, "example", &ec2clientvpn.NetworkAssociationArgs{
			ClientVpnEndpointId: pulumi.Any(aws_ec2_client_vpn_endpoint.Example.Id),
			SubnetId:            pulumi.Any(aws_subnet.Example.Id),
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
import com.pulumi.aws.ec2clientvpn.NetworkAssociation;
import com.pulumi.aws.ec2clientvpn.NetworkAssociationArgs;
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
        var example = new NetworkAssociation("example", NetworkAssociationArgs.builder()        
            .clientVpnEndpointId(aws_ec2_client_vpn_endpoint.example().id())
            .subnetId(aws_subnet.example().id())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:ec2clientvpn:NetworkAssociation
    properties:
      clientVpnEndpointId: ${aws_ec2_client_vpn_endpoint.example.id}
      subnetId: ${aws_subnet.example.id}
```
{{% /example %}}
{{% example %}}
### Using custom security groups

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.ec2clientvpn.NetworkAssociation("example", {
    clientVpnEndpointId: aws_ec2_client_vpn_endpoint.example.id,
    subnetId: aws_subnet.example.id,
    securityGroups: [
        aws_security_group.example1.id,
        aws_security_group.example2.id,
    ],
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.ec2clientvpn.NetworkAssociation("example",
    client_vpn_endpoint_id=aws_ec2_client_vpn_endpoint["example"]["id"],
    subnet_id=aws_subnet["example"]["id"],
    security_groups=[
        aws_security_group["example1"]["id"],
        aws_security_group["example2"]["id"],
    ])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Ec2ClientVpn.NetworkAssociation("example", new()
    {
        ClientVpnEndpointId = aws_ec2_client_vpn_endpoint.Example.Id,
        SubnetId = aws_subnet.Example.Id,
        SecurityGroups = new[]
        {
            aws_security_group.Example1.Id,
            aws_security_group.Example2.Id,
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ec2clientvpn"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := ec2clientvpn.NewNetworkAssociation(ctx, "example", &ec2clientvpn.NetworkAssociationArgs{
			ClientVpnEndpointId: pulumi.Any(aws_ec2_client_vpn_endpoint.Example.Id),
			SubnetId:            pulumi.Any(aws_subnet.Example.Id),
			SecurityGroups: pulumi.StringArray{
				pulumi.Any(aws_security_group.Example1.Id),
				pulumi.Any(aws_security_group.Example2.Id),
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
import com.pulumi.aws.ec2clientvpn.NetworkAssociation;
import com.pulumi.aws.ec2clientvpn.NetworkAssociationArgs;
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
        var example = new NetworkAssociation("example", NetworkAssociationArgs.builder()        
            .clientVpnEndpointId(aws_ec2_client_vpn_endpoint.example().id())
            .subnetId(aws_subnet.example().id())
            .securityGroups(            
                aws_security_group.example1().id(),
                aws_security_group.example2().id())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:ec2clientvpn:NetworkAssociation
    properties:
      clientVpnEndpointId: ${aws_ec2_client_vpn_endpoint.example.id}
      subnetId: ${aws_subnet.example.id}
      securityGroups:
        - ${aws_security_group.example1.id}
        - ${aws_security_group.example2.id}
```
{{% /example %}}
{{% /examples %}}

## Import

AWS Client VPN network associations can be imported using the endpoint ID and the association ID. Values are separated by a `,`.

```sh
 $ pulumi import aws:ec2clientvpn/networkAssociation:NetworkAssociation example cvpn-endpoint-0ac3a1abbccddd666,vpn-assoc-0b8db902465d069ad
```

 
Provides a resource to create a VPC routing table.

> **NOTE on Route Tables and Routes:** This provider currently
provides both a standalone Route resource and a Route Table resource with routes
defined in-line. At this time you cannot use a Route Table with in-line routes
in conjunction with any Route resources. Doing so will cause
a conflict of rule settings and will overwrite rules.

> **NOTE on `gateway_id` and `nat_gateway_id`:** The AWS API is very forgiving with these two
attributes and the `aws.ec2.RouteTable` resource can be created with a NAT ID specified as a Gateway ID attribute.
This _will_ lead to a permanent diff between your configuration and statefile, as the API returns the correct
parameters in the returned route table. If you're experiencing constant diffs in your `aws.ec2.RouteTable` resources,
the first thing to check is whether or not you're specifying a NAT ID instead of a Gateway ID, or vice-versa.

> **NOTE on `propagating_vgws` and the `aws.ec2.VpnGatewayRoutePropagation` resource:**
If the `propagating_vgws` argument is present, it's not supported to _also_
define route propagations using `aws.ec2.VpnGatewayRoutePropagation`, since
this resource will delete any propagating gateways not explicitly listed in
`propagating_vgws`. Omit this argument when defining route propagation using
the separate resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.ec2.RouteTable("example", {
    vpcId: aws_vpc.example.id,
    routes: [
        {
            cidrBlock: "10.0.1.0/24",
            gatewayId: aws_internet_gateway.example.id,
        },
        {
            ipv6CidrBlock: "::/0",
            egressOnlyGatewayId: aws_egress_only_internet_gateway.example.id,
        },
    ],
    tags: {
        Name: "example",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.ec2.RouteTable("example",
    vpc_id=aws_vpc["example"]["id"],
    routes=[
        aws.ec2.RouteTableRouteArgs(
            cidr_block="10.0.1.0/24",
            gateway_id=aws_internet_gateway["example"]["id"],
        ),
        aws.ec2.RouteTableRouteArgs(
            ipv6_cidr_block="::/0",
            egress_only_gateway_id=aws_egress_only_internet_gateway["example"]["id"],
        ),
    ],
    tags={
        "Name": "example",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Ec2.RouteTable("example", new()
    {
        VpcId = aws_vpc.Example.Id,
        Routes = new[]
        {
            new Aws.Ec2.Inputs.RouteTableRouteArgs
            {
                CidrBlock = "10.0.1.0/24",
                GatewayId = aws_internet_gateway.Example.Id,
            },
            new Aws.Ec2.Inputs.RouteTableRouteArgs
            {
                Ipv6CidrBlock = "::/0",
                EgressOnlyGatewayId = aws_egress_only_internet_gateway.Example.Id,
            },
        },
        Tags = 
        {
            { "Name", "example" },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ec2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := ec2.NewRouteTable(ctx, "example", &ec2.RouteTableArgs{
			VpcId: pulumi.Any(aws_vpc.Example.Id),
			Routes: ec2.RouteTableRouteArray{
				&ec2.RouteTableRouteArgs{
					CidrBlock: pulumi.String("10.0.1.0/24"),
					GatewayId: pulumi.Any(aws_internet_gateway.Example.Id),
				},
				&ec2.RouteTableRouteArgs{
					Ipv6CidrBlock:       pulumi.String("::/0"),
					EgressOnlyGatewayId: pulumi.Any(aws_egress_only_internet_gateway.Example.Id),
				},
			},
			Tags: pulumi.StringMap{
				"Name": pulumi.String("example"),
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
import com.pulumi.aws.ec2.RouteTable;
import com.pulumi.aws.ec2.RouteTableArgs;
import com.pulumi.aws.ec2.inputs.RouteTableRouteArgs;
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
        var example = new RouteTable("example", RouteTableArgs.builder()        
            .vpcId(aws_vpc.example().id())
            .routes(            
                RouteTableRouteArgs.builder()
                    .cidrBlock("10.0.1.0/24")
                    .gatewayId(aws_internet_gateway.example().id())
                    .build(),
                RouteTableRouteArgs.builder()
                    .ipv6CidrBlock("::/0")
                    .egressOnlyGatewayId(aws_egress_only_internet_gateway.example().id())
                    .build())
            .tags(Map.of("Name", "example"))
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:ec2:RouteTable
    properties:
      vpcId: ${aws_vpc.example.id}
      routes:
        - cidrBlock: 10.0.1.0/24
          gatewayId: ${aws_internet_gateway.example.id}
        - ipv6CidrBlock: ::/0
          egressOnlyGatewayId: ${aws_egress_only_internet_gateway.example.id}
      tags:
        Name: example
```

To subsequently remove all managed routes:

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.ec2.RouteTable("example", {
    vpcId: aws_vpc.example.id,
    routes: [],
    tags: {
        Name: "example",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.ec2.RouteTable("example",
    vpc_id=aws_vpc["example"]["id"],
    routes=[],
    tags={
        "Name": "example",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Ec2.RouteTable("example", new()
    {
        VpcId = aws_vpc.Example.Id,
        Routes = new[] {},
        Tags = 
        {
            { "Name", "example" },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ec2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := ec2.NewRouteTable(ctx, "example", &ec2.RouteTableArgs{
			VpcId:  pulumi.Any(aws_vpc.Example.Id),
			Routes: ec2.RouteTableRouteArray{},
			Tags: pulumi.StringMap{
				"Name": pulumi.String("example"),
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
import com.pulumi.aws.ec2.RouteTable;
import com.pulumi.aws.ec2.RouteTableArgs;
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
        var example = new RouteTable("example", RouteTableArgs.builder()        
            .vpcId(aws_vpc.example().id())
            .routes()
            .tags(Map.of("Name", "example"))
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:ec2:RouteTable
    properties:
      vpcId: ${aws_vpc.example.id}
      routes: []
      tags:
        Name: example
```
{{% /example %}}
{{% /examples %}}

## Import

Route Tables can be imported using the route table `id`. For example, to import route table `rtb-4e616f6d69`, use this command

```sh
 $ pulumi import aws:ec2/routeTable:RouteTable public_rt rtb-4e616f6d69
```

 
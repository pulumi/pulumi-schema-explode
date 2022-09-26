Provides an Elastic IP resource.

> **Note:** EIP may require IGW to exist prior to association. Use `depends_on` to set an explicit dependency on the IGW.

> **Note:** Do not use `network_interface` to associate the EIP to `aws.lb.LoadBalancer` or `aws.ec2.NatGateway` resources. Instead use the `allocation_id` available in those resources to allow AWS to manage the association, otherwise you will see `AuthFailure` errors.

{{% examples %}}
## Example Usage
{{% example %}}
### Single EIP associated with an instance

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const lb = new aws.ec2.Eip("lb", {
    instance: aws_instance.web.id,
    vpc: true,
});
```
```python
import pulumi
import pulumi_aws as aws

lb = aws.ec2.Eip("lb",
    instance=aws_instance["web"]["id"],
    vpc=True)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var lb = new Aws.Ec2.Eip("lb", new()
    {
        Instance = aws_instance.Web.Id,
        Vpc = true,
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
		_, err := ec2.NewEip(ctx, "lb", &ec2.EipArgs{
			Instance: pulumi.Any(aws_instance.Web.Id),
			Vpc:      pulumi.Bool(true),
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
import com.pulumi.aws.ec2.Eip;
import com.pulumi.aws.ec2.EipArgs;
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
        var lb = new Eip("lb", EipArgs.builder()        
            .instance(aws_instance.web().id())
            .vpc(true)
            .build());

    }
}
```
```yaml
resources:
  lb:
    type: aws:ec2:Eip
    properties:
      instance: ${aws_instance.web.id}
      vpc: true
```
{{% /example %}}
{{% example %}}
### Multiple EIPs associated with a single network interface

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const multi_ip = new aws.ec2.NetworkInterface("multi-ip", {
    subnetId: aws_subnet.main.id,
    privateIps: [
        "10.0.0.10",
        "10.0.0.11",
    ],
});
const one = new aws.ec2.Eip("one", {
    vpc: true,
    networkInterface: multi_ip.id,
    associateWithPrivateIp: "10.0.0.10",
});
const two = new aws.ec2.Eip("two", {
    vpc: true,
    networkInterface: multi_ip.id,
    associateWithPrivateIp: "10.0.0.11",
});
```
```python
import pulumi
import pulumi_aws as aws

multi_ip = aws.ec2.NetworkInterface("multi-ip",
    subnet_id=aws_subnet["main"]["id"],
    private_ips=[
        "10.0.0.10",
        "10.0.0.11",
    ])
one = aws.ec2.Eip("one",
    vpc=True,
    network_interface=multi_ip.id,
    associate_with_private_ip="10.0.0.10")
two = aws.ec2.Eip("two",
    vpc=True,
    network_interface=multi_ip.id,
    associate_with_private_ip="10.0.0.11")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var multi_ip = new Aws.Ec2.NetworkInterface("multi-ip", new()
    {
        SubnetId = aws_subnet.Main.Id,
        PrivateIps = new[]
        {
            "10.0.0.10",
            "10.0.0.11",
        },
    });

    var one = new Aws.Ec2.Eip("one", new()
    {
        Vpc = true,
        NetworkInterface = multi_ip.Id,
        AssociateWithPrivateIp = "10.0.0.10",
    });

    var two = new Aws.Ec2.Eip("two", new()
    {
        Vpc = true,
        NetworkInterface = multi_ip.Id,
        AssociateWithPrivateIp = "10.0.0.11",
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
		_, err := ec2.NewNetworkInterface(ctx, "multi-ip", &ec2.NetworkInterfaceArgs{
			SubnetId: pulumi.Any(aws_subnet.Main.Id),
			PrivateIps: pulumi.StringArray{
				pulumi.String("10.0.0.10"),
				pulumi.String("10.0.0.11"),
			},
		})
		if err != nil {
			return err
		}
		_, err = ec2.NewEip(ctx, "one", &ec2.EipArgs{
			Vpc:                    pulumi.Bool(true),
			NetworkInterface:       multi_ip.ID(),
			AssociateWithPrivateIp: pulumi.String("10.0.0.10"),
		})
		if err != nil {
			return err
		}
		_, err = ec2.NewEip(ctx, "two", &ec2.EipArgs{
			Vpc:                    pulumi.Bool(true),
			NetworkInterface:       multi_ip.ID(),
			AssociateWithPrivateIp: pulumi.String("10.0.0.11"),
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
import com.pulumi.aws.ec2.NetworkInterface;
import com.pulumi.aws.ec2.NetworkInterfaceArgs;
import com.pulumi.aws.ec2.Eip;
import com.pulumi.aws.ec2.EipArgs;
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
        var multi_ip = new NetworkInterface("multi-ip", NetworkInterfaceArgs.builder()        
            .subnetId(aws_subnet.main().id())
            .privateIps(            
                "10.0.0.10",
                "10.0.0.11")
            .build());

        var one = new Eip("one", EipArgs.builder()        
            .vpc(true)
            .networkInterface(multi_ip.id())
            .associateWithPrivateIp("10.0.0.10")
            .build());

        var two = new Eip("two", EipArgs.builder()        
            .vpc(true)
            .networkInterface(multi_ip.id())
            .associateWithPrivateIp("10.0.0.11")
            .build());

    }
}
```
```yaml
resources:
  multi-ip:
    type: aws:ec2:NetworkInterface
    properties:
      subnetId: ${aws_subnet.main.id}
      privateIps:
        - 10.0.0.10
        - 10.0.0.11
  one:
    type: aws:ec2:Eip
    properties:
      vpc: true
      networkInterface: ${["multi-ip"].id}
      associateWithPrivateIp: 10.0.0.10
  two:
    type: aws:ec2:Eip
    properties:
      vpc: true
      networkInterface: ${["multi-ip"].id}
      associateWithPrivateIp: 10.0.0.11
```
{{% /example %}}
{{% example %}}
### Attaching an EIP to an Instance with a pre-assigned private ip (VPC Only)

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const _default = new aws.ec2.Vpc("default", {
    cidrBlock: "10.0.0.0/16",
    enableDnsHostnames: true,
});
const gw = new aws.ec2.InternetGateway("gw", {vpcId: _default.id});
const tfTestSubnet = new aws.ec2.Subnet("tfTestSubnet", {
    vpcId: _default.id,
    cidrBlock: "10.0.0.0/24",
    mapPublicIpOnLaunch: true,
}, {
    dependsOn: [gw],
});
const foo = new aws.ec2.Instance("foo", {
    ami: "ami-5189a661",
    instanceType: "t2.micro",
    privateIp: "10.0.0.12",
    subnetId: tfTestSubnet.id,
});
const bar = new aws.ec2.Eip("bar", {
    vpc: true,
    instance: foo.id,
    associateWithPrivateIp: "10.0.0.12",
}, {
    dependsOn: [gw],
});
```
```python
import pulumi
import pulumi_aws as aws

default = aws.ec2.Vpc("default",
    cidr_block="10.0.0.0/16",
    enable_dns_hostnames=True)
gw = aws.ec2.InternetGateway("gw", vpc_id=default.id)
tf_test_subnet = aws.ec2.Subnet("tfTestSubnet",
    vpc_id=default.id,
    cidr_block="10.0.0.0/24",
    map_public_ip_on_launch=True,
    opts=pulumi.ResourceOptions(depends_on=[gw]))
foo = aws.ec2.Instance("foo",
    ami="ami-5189a661",
    instance_type="t2.micro",
    private_ip="10.0.0.12",
    subnet_id=tf_test_subnet.id)
bar = aws.ec2.Eip("bar",
    vpc=True,
    instance=foo.id,
    associate_with_private_ip="10.0.0.12",
    opts=pulumi.ResourceOptions(depends_on=[gw]))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var @default = new Aws.Ec2.Vpc("default", new()
    {
        CidrBlock = "10.0.0.0/16",
        EnableDnsHostnames = true,
    });

    var gw = new Aws.Ec2.InternetGateway("gw", new()
    {
        VpcId = @default.Id,
    });

    var tfTestSubnet = new Aws.Ec2.Subnet("tfTestSubnet", new()
    {
        VpcId = @default.Id,
        CidrBlock = "10.0.0.0/24",
        MapPublicIpOnLaunch = true,
    }, new CustomResourceOptions
    {
        DependsOn = new[]
        {
            gw,
        },
    });

    var foo = new Aws.Ec2.Instance("foo", new()
    {
        Ami = "ami-5189a661",
        InstanceType = "t2.micro",
        PrivateIp = "10.0.0.12",
        SubnetId = tfTestSubnet.Id,
    });

    var bar = new Aws.Ec2.Eip("bar", new()
    {
        Vpc = true,
        Instance = foo.Id,
        AssociateWithPrivateIp = "10.0.0.12",
    }, new CustomResourceOptions
    {
        DependsOn = new[]
        {
            gw,
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
		_, err := ec2.NewVpc(ctx, "default", &ec2.VpcArgs{
			CidrBlock:          pulumi.String("10.0.0.0/16"),
			EnableDnsHostnames: pulumi.Bool(true),
		})
		if err != nil {
			return err
		}
		gw, err := ec2.NewInternetGateway(ctx, "gw", &ec2.InternetGatewayArgs{
			VpcId: _default.ID(),
		})
		if err != nil {
			return err
		}
		tfTestSubnet, err := ec2.NewSubnet(ctx, "tfTestSubnet", &ec2.SubnetArgs{
			VpcId:               _default.ID(),
			CidrBlock:           pulumi.String("10.0.0.0/24"),
			MapPublicIpOnLaunch: pulumi.Bool(true),
		}, pulumi.DependsOn([]pulumi.Resource{
			gw,
		}))
		if err != nil {
			return err
		}
		foo, err := ec2.NewInstance(ctx, "foo", &ec2.InstanceArgs{
			Ami:          pulumi.String("ami-5189a661"),
			InstanceType: pulumi.String("t2.micro"),
			PrivateIp:    pulumi.String("10.0.0.12"),
			SubnetId:     tfTestSubnet.ID(),
		})
		if err != nil {
			return err
		}
		_, err = ec2.NewEip(ctx, "bar", &ec2.EipArgs{
			Vpc:                    pulumi.Bool(true),
			Instance:               foo.ID(),
			AssociateWithPrivateIp: pulumi.String("10.0.0.12"),
		}, pulumi.DependsOn([]pulumi.Resource{
			gw,
		}))
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
import com.pulumi.aws.ec2.Vpc;
import com.pulumi.aws.ec2.VpcArgs;
import com.pulumi.aws.ec2.InternetGateway;
import com.pulumi.aws.ec2.InternetGatewayArgs;
import com.pulumi.aws.ec2.Subnet;
import com.pulumi.aws.ec2.SubnetArgs;
import com.pulumi.aws.ec2.Instance;
import com.pulumi.aws.ec2.InstanceArgs;
import com.pulumi.aws.ec2.Eip;
import com.pulumi.aws.ec2.EipArgs;
import com.pulumi.resources.CustomResourceOptions;
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
        var default_ = new Vpc("default", VpcArgs.builder()        
            .cidrBlock("10.0.0.0/16")
            .enableDnsHostnames(true)
            .build());

        var gw = new InternetGateway("gw", InternetGatewayArgs.builder()        
            .vpcId(default_.id())
            .build());

        var tfTestSubnet = new Subnet("tfTestSubnet", SubnetArgs.builder()        
            .vpcId(default_.id())
            .cidrBlock("10.0.0.0/24")
            .mapPublicIpOnLaunch(true)
            .build(), CustomResourceOptions.builder()
                .dependsOn(gw)
                .build());

        var foo = new Instance("foo", InstanceArgs.builder()        
            .ami("ami-5189a661")
            .instanceType("t2.micro")
            .privateIp("10.0.0.12")
            .subnetId(tfTestSubnet.id())
            .build());

        var bar = new Eip("bar", EipArgs.builder()        
            .vpc(true)
            .instance(foo.id())
            .associateWithPrivateIp("10.0.0.12")
            .build(), CustomResourceOptions.builder()
                .dependsOn(gw)
                .build());

    }
}
```
```yaml
resources:
  default:
    type: aws:ec2:Vpc
    properties:
      cidrBlock: 10.0.0.0/16
      enableDnsHostnames: true
  gw:
    type: aws:ec2:InternetGateway
    properties:
      vpcId: ${default.id}
  tfTestSubnet:
    type: aws:ec2:Subnet
    properties:
      vpcId: ${default.id}
      cidrBlock: 10.0.0.0/24
      mapPublicIpOnLaunch: true
    options:
      dependson:
        - ${gw}
  foo:
    type: aws:ec2:Instance
    properties:
      # us-west-2
      ami: ami-5189a661
      instanceType: t2.micro
      privateIp: 10.0.0.12
      subnetId: ${tfTestSubnet.id}
  bar:
    type: aws:ec2:Eip
    properties:
      vpc: true
      instance: ${foo.id}
      associateWithPrivateIp: 10.0.0.12
    options:
      dependson:
        - ${gw}
```
{{% /example %}}
{{% example %}}
### Allocating EIP from the BYOIP pool

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const byoip_ip = new aws.ec2.Eip("byoip-ip", {
    publicIpv4Pool: "ipv4pool-ec2-012345",
    vpc: true,
});
```
```python
import pulumi
import pulumi_aws as aws

byoip_ip = aws.ec2.Eip("byoip-ip",
    public_ipv4_pool="ipv4pool-ec2-012345",
    vpc=True)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var byoip_ip = new Aws.Ec2.Eip("byoip-ip", new()
    {
        PublicIpv4Pool = "ipv4pool-ec2-012345",
        Vpc = true,
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
		_, err := ec2.NewEip(ctx, "byoip-ip", &ec2.EipArgs{
			PublicIpv4Pool: pulumi.String("ipv4pool-ec2-012345"),
			Vpc:            pulumi.Bool(true),
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
import com.pulumi.aws.ec2.Eip;
import com.pulumi.aws.ec2.EipArgs;
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
        var byoip_ip = new Eip("byoip-ip", EipArgs.builder()        
            .publicIpv4Pool("ipv4pool-ec2-012345")
            .vpc(true)
            .build());

    }
}
```
```yaml
resources:
  byoip-ip:
    type: aws:ec2:Eip
    properties:
      publicIpv4Pool: ipv4pool-ec2-012345
      vpc: true
```
{{% /example %}}
{{% /examples %}}

## Import

EIPs in a VPC can be imported using their Allocation ID, e.g.,

```sh
 $ pulumi import aws:ec2/eip:Eip bar eipalloc-00a10e96
```

 EIPs in EC2-Classic can be imported using their Public IP, e.g.,

```sh
 $ pulumi import aws:ec2/eip:Eip bar 52.0.0.0
```

 [1]https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_AssociateAddress.html 
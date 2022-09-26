Provides an EC2 instance resource. This allows instances to be created, updated, and deleted.

{{% examples %}}
## Example Usage
{{% example %}}
### Basic example using AMI lookup

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const ubuntu = aws.ec2.getAmi({
    mostRecent: true,
    filters: [
        {
            name: "name",
            values: ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"],
        },
        {
            name: "virtualization-type",
            values: ["hvm"],
        },
    ],
    owners: ["099720109477"],
});
const web = new aws.ec2.Instance("web", {
    ami: ubuntu.then(ubuntu => ubuntu.id),
    instanceType: "t3.micro",
    tags: {
        Name: "HelloWorld",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

ubuntu = aws.ec2.get_ami(most_recent=True,
    filters=[
        aws.ec2.GetAmiFilterArgs(
            name="name",
            values=["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"],
        ),
        aws.ec2.GetAmiFilterArgs(
            name="virtualization-type",
            values=["hvm"],
        ),
    ],
    owners=["099720109477"])
web = aws.ec2.Instance("web",
    ami=ubuntu.id,
    instance_type="t3.micro",
    tags={
        "Name": "HelloWorld",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var ubuntu = Aws.Ec2.GetAmi.Invoke(new()
    {
        MostRecent = true,
        Filters = new[]
        {
            new Aws.Ec2.Inputs.GetAmiFilterInputArgs
            {
                Name = "name",
                Values = new[]
                {
                    "ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*",
                },
            },
            new Aws.Ec2.Inputs.GetAmiFilterInputArgs
            {
                Name = "virtualization-type",
                Values = new[]
                {
                    "hvm",
                },
            },
        },
        Owners = new[]
        {
            "099720109477",
        },
    });

    var web = new Aws.Ec2.Instance("web", new()
    {
        Ami = ubuntu.Apply(getAmiResult => getAmiResult.Id),
        InstanceType = "t3.micro",
        Tags = 
        {
            { "Name", "HelloWorld" },
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
		ubuntu, err := ec2.LookupAmi(ctx, &ec2.LookupAmiArgs{
			MostRecent: pulumi.BoolRef(true),
			Filters: []ec2.GetAmiFilter{
				ec2.GetAmiFilter{
					Name: "name",
					Values: []string{
						"ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*",
					},
				},
				ec2.GetAmiFilter{
					Name: "virtualization-type",
					Values: []string{
						"hvm",
					},
				},
			},
			Owners: []string{
				"099720109477",
			},
		}, nil)
		if err != nil {
			return err
		}
		_, err = ec2.NewInstance(ctx, "web", &ec2.InstanceArgs{
			Ami:          pulumi.String(ubuntu.Id),
			InstanceType: pulumi.String("t3.micro"),
			Tags: pulumi.StringMap{
				"Name": pulumi.String("HelloWorld"),
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
import com.pulumi.aws.ec2.Ec2Functions;
import com.pulumi.aws.ec2.inputs.GetAmiArgs;
import com.pulumi.aws.ec2.Instance;
import com.pulumi.aws.ec2.InstanceArgs;
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
        final var ubuntu = Ec2Functions.getAmi(GetAmiArgs.builder()
            .mostRecent(true)
            .filters(            
                GetAmiFilterArgs.builder()
                    .name("name")
                    .values("ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*")
                    .build(),
                GetAmiFilterArgs.builder()
                    .name("virtualization-type")
                    .values("hvm")
                    .build())
            .owners("099720109477")
            .build());

        var web = new Instance("web", InstanceArgs.builder()        
            .ami(ubuntu.applyValue(getAmiResult -> getAmiResult.id()))
            .instanceType("t3.micro")
            .tags(Map.of("Name", "HelloWorld"))
            .build());

    }
}
```
```yaml
resources:
  web:
    type: aws:ec2:Instance
    properties:
      ami: ${ubuntu.id}
      instanceType: t3.micro
      tags:
        Name: HelloWorld
variables:
  ubuntu:
    Fn::Invoke:
      Function: aws:ec2:getAmi
      Arguments:
        mostRecent: true
        filters:
          - name: name
            values:
              - ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*
          - name: virtualization-type
            values:
              - hvm
        owners:
          - 099720109477
```
{{% /example %}}
{{% example %}}
### Network and credit specification example

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const myVpc = new aws.ec2.Vpc("myVpc", {
    cidrBlock: "172.16.0.0/16",
    tags: {
        Name: "tf-example",
    },
});
const mySubnet = new aws.ec2.Subnet("mySubnet", {
    vpcId: myVpc.id,
    cidrBlock: "172.16.10.0/24",
    availabilityZone: "us-west-2a",
    tags: {
        Name: "tf-example",
    },
});
const fooNetworkInterface = new aws.ec2.NetworkInterface("fooNetworkInterface", {
    subnetId: mySubnet.id,
    privateIps: ["172.16.10.100"],
    tags: {
        Name: "primary_network_interface",
    },
});
const fooInstance = new aws.ec2.Instance("fooInstance", {
    ami: "ami-005e54dee72cc1d00",
    instanceType: "t2.micro",
    networkInterfaces: [{
        networkInterfaceId: fooNetworkInterface.id,
        deviceIndex: 0,
    }],
    creditSpecification: {
        cpuCredits: "unlimited",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

my_vpc = aws.ec2.Vpc("myVpc",
    cidr_block="172.16.0.0/16",
    tags={
        "Name": "tf-example",
    })
my_subnet = aws.ec2.Subnet("mySubnet",
    vpc_id=my_vpc.id,
    cidr_block="172.16.10.0/24",
    availability_zone="us-west-2a",
    tags={
        "Name": "tf-example",
    })
foo_network_interface = aws.ec2.NetworkInterface("fooNetworkInterface",
    subnet_id=my_subnet.id,
    private_ips=["172.16.10.100"],
    tags={
        "Name": "primary_network_interface",
    })
foo_instance = aws.ec2.Instance("fooInstance",
    ami="ami-005e54dee72cc1d00",
    instance_type="t2.micro",
    network_interfaces=[aws.ec2.InstanceNetworkInterfaceArgs(
        network_interface_id=foo_network_interface.id,
        device_index=0,
    )],
    credit_specification=aws.ec2.InstanceCreditSpecificationArgs(
        cpu_credits="unlimited",
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var myVpc = new Aws.Ec2.Vpc("myVpc", new()
    {
        CidrBlock = "172.16.0.0/16",
        Tags = 
        {
            { "Name", "tf-example" },
        },
    });

    var mySubnet = new Aws.Ec2.Subnet("mySubnet", new()
    {
        VpcId = myVpc.Id,
        CidrBlock = "172.16.10.0/24",
        AvailabilityZone = "us-west-2a",
        Tags = 
        {
            { "Name", "tf-example" },
        },
    });

    var fooNetworkInterface = new Aws.Ec2.NetworkInterface("fooNetworkInterface", new()
    {
        SubnetId = mySubnet.Id,
        PrivateIps = new[]
        {
            "172.16.10.100",
        },
        Tags = 
        {
            { "Name", "primary_network_interface" },
        },
    });

    var fooInstance = new Aws.Ec2.Instance("fooInstance", new()
    {
        Ami = "ami-005e54dee72cc1d00",
        InstanceType = "t2.micro",
        NetworkInterfaces = new[]
        {
            new Aws.Ec2.Inputs.InstanceNetworkInterfaceArgs
            {
                NetworkInterfaceId = fooNetworkInterface.Id,
                DeviceIndex = 0,
            },
        },
        CreditSpecification = new Aws.Ec2.Inputs.InstanceCreditSpecificationArgs
        {
            CpuCredits = "unlimited",
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
		myVpc, err := ec2.NewVpc(ctx, "myVpc", &ec2.VpcArgs{
			CidrBlock: pulumi.String("172.16.0.0/16"),
			Tags: pulumi.StringMap{
				"Name": pulumi.String("tf-example"),
			},
		})
		if err != nil {
			return err
		}
		mySubnet, err := ec2.NewSubnet(ctx, "mySubnet", &ec2.SubnetArgs{
			VpcId:            myVpc.ID(),
			CidrBlock:        pulumi.String("172.16.10.0/24"),
			AvailabilityZone: pulumi.String("us-west-2a"),
			Tags: pulumi.StringMap{
				"Name": pulumi.String("tf-example"),
			},
		})
		if err != nil {
			return err
		}
		fooNetworkInterface, err := ec2.NewNetworkInterface(ctx, "fooNetworkInterface", &ec2.NetworkInterfaceArgs{
			SubnetId: mySubnet.ID(),
			PrivateIps: pulumi.StringArray{
				pulumi.String("172.16.10.100"),
			},
			Tags: pulumi.StringMap{
				"Name": pulumi.String("primary_network_interface"),
			},
		})
		if err != nil {
			return err
		}
		_, err = ec2.NewInstance(ctx, "fooInstance", &ec2.InstanceArgs{
			Ami:          pulumi.String("ami-005e54dee72cc1d00"),
			InstanceType: pulumi.String("t2.micro"),
			NetworkInterfaces: ec2.InstanceNetworkInterfaceArray{
				&ec2.InstanceNetworkInterfaceArgs{
					NetworkInterfaceId: fooNetworkInterface.ID(),
					DeviceIndex:        pulumi.Int(0),
				},
			},
			CreditSpecification: &ec2.InstanceCreditSpecificationArgs{
				CpuCredits: pulumi.String("unlimited"),
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
import com.pulumi.aws.ec2.Vpc;
import com.pulumi.aws.ec2.VpcArgs;
import com.pulumi.aws.ec2.Subnet;
import com.pulumi.aws.ec2.SubnetArgs;
import com.pulumi.aws.ec2.NetworkInterface;
import com.pulumi.aws.ec2.NetworkInterfaceArgs;
import com.pulumi.aws.ec2.Instance;
import com.pulumi.aws.ec2.InstanceArgs;
import com.pulumi.aws.ec2.inputs.InstanceNetworkInterfaceArgs;
import com.pulumi.aws.ec2.inputs.InstanceCreditSpecificationArgs;
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
        var myVpc = new Vpc("myVpc", VpcArgs.builder()        
            .cidrBlock("172.16.0.0/16")
            .tags(Map.of("Name", "tf-example"))
            .build());

        var mySubnet = new Subnet("mySubnet", SubnetArgs.builder()        
            .vpcId(myVpc.id())
            .cidrBlock("172.16.10.0/24")
            .availabilityZone("us-west-2a")
            .tags(Map.of("Name", "tf-example"))
            .build());

        var fooNetworkInterface = new NetworkInterface("fooNetworkInterface", NetworkInterfaceArgs.builder()        
            .subnetId(mySubnet.id())
            .privateIps("172.16.10.100")
            .tags(Map.of("Name", "primary_network_interface"))
            .build());

        var fooInstance = new Instance("fooInstance", InstanceArgs.builder()        
            .ami("ami-005e54dee72cc1d00")
            .instanceType("t2.micro")
            .networkInterfaces(InstanceNetworkInterfaceArgs.builder()
                .networkInterfaceId(fooNetworkInterface.id())
                .deviceIndex(0)
                .build())
            .creditSpecification(InstanceCreditSpecificationArgs.builder()
                .cpuCredits("unlimited")
                .build())
            .build());

    }
}
```
```yaml
resources:
  myVpc:
    type: aws:ec2:Vpc
    properties:
      cidrBlock: 172.16.0.0/16
      tags:
        Name: tf-example
  mySubnet:
    type: aws:ec2:Subnet
    properties:
      vpcId: ${myVpc.id}
      cidrBlock: 172.16.10.0/24
      availabilityZone: us-west-2a
      tags:
        Name: tf-example
  fooNetworkInterface:
    type: aws:ec2:NetworkInterface
    properties:
      subnetId: ${mySubnet.id}
      privateIps:
        - 172.16.10.100
      tags:
        Name: primary_network_interface
  fooInstance:
    type: aws:ec2:Instance
    properties:
      ami: ami-005e54dee72cc1d00
      # us-west-2
      instanceType: t2.micro
      networkInterfaces:
        - networkInterfaceId: ${fooNetworkInterface.id}
          deviceIndex: 0
      creditSpecification:
        cpuCredits: unlimited
```
{{% /example %}}
{{% example %}}
### Host resource group or Licence Manager registered AMI example

A host resource group is a collection of Dedicated Hosts that you can manage as a single entity. As you launch instances, License Manager allocates the hosts and launches instances on them based on the settings that you configured. You can add existing Dedicated Hosts to a host resource group and take advantage of automated host management through License Manager.

> **NOTE:** A dedicated host is automatically associated with a License Manager host resource group if **Allocate hosts automatically** is enabled. Otherwise, use the `host_resource_group_arn` argument to explicitly associate the instance with the host resource group.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const thisInstance = new aws.ec2.Instance("this", {
    ami: "ami-0dcc1e21636832c5d",
    hostResourceGroupArn: "arn:aws:resource-groups:us-west-2:012345678901:group/win-testhost",
    instanceType: "m5.large",
    tenancy: "host",
});
```
```python
import pulumi
import pulumi_aws as aws

this = aws.ec2.Instance("this",
    ami="ami-0dcc1e21636832c5d",
    host_resource_group_arn="arn:aws:resource-groups:us-west-2:012345678901:group/win-testhost",
    instance_type="m5.large",
    tenancy="host")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var @this = new Aws.Ec2.Instance("this", new()
    {
        Ami = "ami-0dcc1e21636832c5d",
        HostResourceGroupArn = "arn:aws:resource-groups:us-west-2:012345678901:group/win-testhost",
        InstanceType = "m5.large",
        Tenancy = "host",
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
		_, err := ec2.NewInstance(ctx, "this", &ec2.InstanceArgs{
			Ami:                  pulumi.String("ami-0dcc1e21636832c5d"),
			HostResourceGroupArn: pulumi.String("arn:aws:resource-groups:us-west-2:012345678901:group/win-testhost"),
			InstanceType:         pulumi.String("m5.large"),
			Tenancy:              pulumi.String("host"),
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
import com.pulumi.aws.ec2.Instance;
import com.pulumi.aws.ec2.InstanceArgs;
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
        var this_ = new Instance("this", InstanceArgs.builder()        
            .ami("ami-0dcc1e21636832c5d")
            .hostResourceGroupArn("arn:aws:resource-groups:us-west-2:012345678901:group/win-testhost")
            .instanceType("m5.large")
            .tenancy("host")
            .build());

    }
}
```
```yaml
resources:
  this:
    type: aws:ec2:Instance
    properties:
      ami: ami-0dcc1e21636832c5d
      hostResourceGroupArn: arn:aws:resource-groups:us-west-2:012345678901:group/win-testhost
      instanceType: m5.large
      tenancy: host
```
{{% /example %}}
{{% /examples %}}

## Import

Instances can be imported using the `id`, e.g.,

```sh
 $ pulumi import aws:ec2/instance:Instance web i-12345678
```

 
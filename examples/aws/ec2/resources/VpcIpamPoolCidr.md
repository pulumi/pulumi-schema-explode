Provisions a CIDR from an IPAM address pool.

> **NOTE:** Provisioning Public IPv4 or Public IPv6 require [steps outside the scope of this resource](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-byoip.html#prepare-for-byoip). The resource accepts `message` and `signature` as part of the `cidr_authorization_context` attribute but those must be generated ahead of time. Public IPv6 CIDRs that are provisioned into a Pool with `publicly_advertisable = true` and all public IPv4 CIDRs also require creating a Route Origin Authorization (ROA) object in your Regional Internet Registry (RIR).

> **NOTE:** In order to deprovision CIDRs all Allocations must be released. Allocations created by a VPC take up to 30 minutes to be released. However, for IPAM to properly manage the removal of allocation records created by VPCs and other resources, you must [grant it permissions](https://docs.aws.amazon.com/vpc/latest/ipam/choose-single-user-or-orgs-ipam.html) in
either a single account or organizationally. If you are unable to deprovision a cidr after waiting over 30 minutes, you may be missing the Service Linked Role.

{{% examples %}}
## Example Usage
{{% example %}}

Basic usage:

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const current = aws.getRegion({});
const exampleVpcIpam = new aws.ec2.VpcIpam("exampleVpcIpam", {operatingRegions: [{
    regionName: current.then(current => current.name),
}]});
const exampleVpcIpamPool = new aws.ec2.VpcIpamPool("exampleVpcIpamPool", {
    addressFamily: "ipv4",
    ipamScopeId: exampleVpcIpam.privateDefaultScopeId,
    locale: current.then(current => current.name),
});
const exampleVpcIpamPoolCidr = new aws.ec2.VpcIpamPoolCidr("exampleVpcIpamPoolCidr", {
    ipamPoolId: exampleVpcIpamPool.id,
    cidr: "172.2.0.0/16",
});
```
```python
import pulumi
import pulumi_aws as aws

current = aws.get_region()
example_vpc_ipam = aws.ec2.VpcIpam("exampleVpcIpam", operating_regions=[aws.ec2.VpcIpamOperatingRegionArgs(
    region_name=current.name,
)])
example_vpc_ipam_pool = aws.ec2.VpcIpamPool("exampleVpcIpamPool",
    address_family="ipv4",
    ipam_scope_id=example_vpc_ipam.private_default_scope_id,
    locale=current.name)
example_vpc_ipam_pool_cidr = aws.ec2.VpcIpamPoolCidr("exampleVpcIpamPoolCidr",
    ipam_pool_id=example_vpc_ipam_pool.id,
    cidr="172.2.0.0/16")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var current = Aws.GetRegion.Invoke();

    var exampleVpcIpam = new Aws.Ec2.VpcIpam("exampleVpcIpam", new()
    {
        OperatingRegions = new[]
        {
            new Aws.Ec2.Inputs.VpcIpamOperatingRegionArgs
            {
                RegionName = current.Apply(getRegionResult => getRegionResult.Name),
            },
        },
    });

    var exampleVpcIpamPool = new Aws.Ec2.VpcIpamPool("exampleVpcIpamPool", new()
    {
        AddressFamily = "ipv4",
        IpamScopeId = exampleVpcIpam.PrivateDefaultScopeId,
        Locale = current.Apply(getRegionResult => getRegionResult.Name),
    });

    var exampleVpcIpamPoolCidr = new Aws.Ec2.VpcIpamPoolCidr("exampleVpcIpamPoolCidr", new()
    {
        IpamPoolId = exampleVpcIpamPool.Id,
        Cidr = "172.2.0.0/16",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ec2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		current, err := aws.GetRegion(ctx, nil, nil)
		if err != nil {
			return err
		}
		exampleVpcIpam, err := ec2.NewVpcIpam(ctx, "exampleVpcIpam", &ec2.VpcIpamArgs{
			OperatingRegions: ec2.VpcIpamOperatingRegionArray{
				&ec2.VpcIpamOperatingRegionArgs{
					RegionName: pulumi.String(current.Name),
				},
			},
		})
		if err != nil {
			return err
		}
		exampleVpcIpamPool, err := ec2.NewVpcIpamPool(ctx, "exampleVpcIpamPool", &ec2.VpcIpamPoolArgs{
			AddressFamily: pulumi.String("ipv4"),
			IpamScopeId:   exampleVpcIpam.PrivateDefaultScopeId,
			Locale:        pulumi.String(current.Name),
		})
		if err != nil {
			return err
		}
		_, err = ec2.NewVpcIpamPoolCidr(ctx, "exampleVpcIpamPoolCidr", &ec2.VpcIpamPoolCidrArgs{
			IpamPoolId: exampleVpcIpamPool.ID(),
			Cidr:       pulumi.String("172.2.0.0/16"),
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
import com.pulumi.aws.AwsFunctions;
import com.pulumi.aws.inputs.GetRegionArgs;
import com.pulumi.aws.ec2.VpcIpam;
import com.pulumi.aws.ec2.VpcIpamArgs;
import com.pulumi.aws.ec2.inputs.VpcIpamOperatingRegionArgs;
import com.pulumi.aws.ec2.VpcIpamPool;
import com.pulumi.aws.ec2.VpcIpamPoolArgs;
import com.pulumi.aws.ec2.VpcIpamPoolCidr;
import com.pulumi.aws.ec2.VpcIpamPoolCidrArgs;
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
        final var current = AwsFunctions.getRegion();

        var exampleVpcIpam = new VpcIpam("exampleVpcIpam", VpcIpamArgs.builder()        
            .operatingRegions(VpcIpamOperatingRegionArgs.builder()
                .regionName(current.applyValue(getRegionResult -> getRegionResult.name()))
                .build())
            .build());

        var exampleVpcIpamPool = new VpcIpamPool("exampleVpcIpamPool", VpcIpamPoolArgs.builder()        
            .addressFamily("ipv4")
            .ipamScopeId(exampleVpcIpam.privateDefaultScopeId())
            .locale(current.applyValue(getRegionResult -> getRegionResult.name()))
            .build());

        var exampleVpcIpamPoolCidr = new VpcIpamPoolCidr("exampleVpcIpamPoolCidr", VpcIpamPoolCidrArgs.builder()        
            .ipamPoolId(exampleVpcIpamPool.id())
            .cidr("172.2.0.0/16")
            .build());

    }
}
```
```yaml
resources:
  exampleVpcIpam:
    type: aws:ec2:VpcIpam
    properties:
      operatingRegions:
        - regionName: ${current.name}
  exampleVpcIpamPool:
    type: aws:ec2:VpcIpamPool
    properties:
      addressFamily: ipv4
      ipamScopeId: ${exampleVpcIpam.privateDefaultScopeId}
      locale: ${current.name}
  exampleVpcIpamPoolCidr:
    type: aws:ec2:VpcIpamPoolCidr
    properties:
      ipamPoolId: ${exampleVpcIpamPool.id}
      cidr: 172.2.0.0/16
variables:
  current:
    Fn::Invoke:
      Function: aws:getRegion
      Arguments: {}
```

Provision Public IPv6 Pool CIDRs:

```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.AwsFunctions;
import com.pulumi.aws.inputs.GetRegionArgs;
import com.pulumi.aws.ec2.VpcIpam;
import com.pulumi.aws.ec2.VpcIpamArgs;
import com.pulumi.aws.ec2.inputs.VpcIpamOperatingRegionArgs;
import com.pulumi.aws.ec2.VpcIpamPool;
import com.pulumi.aws.ec2.VpcIpamPoolArgs;
import com.pulumi.aws.ec2.VpcIpamPoolCidr;
import com.pulumi.aws.ec2.VpcIpamPoolCidrArgs;
import com.pulumi.aws.ec2.inputs.VpcIpamPoolCidrCidrAuthorizationContextArgs;
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
        final var current = AwsFunctions.getRegion();

        var example = new VpcIpam("example", VpcIpamArgs.builder()        
            .operatingRegions(VpcIpamOperatingRegionArgs.builder()
                .regionName(current.applyValue(getRegionResult -> getRegionResult.name()))
                .build())
            .build());

        var ipv6TestPublicVpcIpamPool = new VpcIpamPool("ipv6TestPublicVpcIpamPool", VpcIpamPoolArgs.builder()        
            .addressFamily("ipv6")
            .ipamScopeId(example.publicDefaultScopeId())
            .locale("us-east-1")
            .description("public ipv6")
            .advertisable(false)
            .awsService("ec2")
            .build());

        var ipv6TestPublicVpcIpamPoolCidr = new VpcIpamPoolCidr("ipv6TestPublicVpcIpamPoolCidr", VpcIpamPoolCidrArgs.builder()        
            .ipamPoolId(ipv6TestPublicVpcIpamPool.id())
            .cidr(var_.ipv6_cidr())
            .cidrAuthorizationContext(VpcIpamPoolCidrCidrAuthorizationContextArgs.builder()
                .message(var_.message())
                .signature(var_.signature())
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:ec2:VpcIpam
    properties:
      operatingRegions:
        - regionName: ${current.name}
  ipv6TestPublicVpcIpamPool:
    type: aws:ec2:VpcIpamPool
    properties:
      addressFamily: ipv6
      ipamScopeId: ${example.publicDefaultScopeId}
      locale: us-east-1
      description: public ipv6
      advertisable: false
      awsService: ec2
  ipv6TestPublicVpcIpamPoolCidr:
    type: aws:ec2:VpcIpamPoolCidr
    properties:
      ipamPoolId: ${ipv6TestPublicVpcIpamPool.id}
      cidr: ${var.ipv6_cidr}
      cidrAuthorizationContext:
        message: ${var.message}
        signature: ${var.signature}
variables:
  current:
    Fn::Invoke:
      Function: aws:getRegion
      Arguments: {}
```
{{% /example %}}
{{% /examples %}}

## Import

IPAMs can be imported using the `<cidr>_<ipam-pool-id>`, e.g.

```sh
 $ pulumi import aws:ec2/vpcIpamPoolCidr:VpcIpamPoolCidr example 172.2.0.0/24_ipam-pool-0e634f5a1517cccdc
```

 
{{% examples %}}
## Example Usage
{{% example %}}

Basic usage:

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const testIpamPreviewNextCidr = aws.ec2.getIpamPreviewNextCidr({
    ipamPoolId: aws_vpc_ipam_pool.test.id,
    netmaskLength: 28,
});
const testVpcIpamPoolCidrAllocation = new aws.ec2.VpcIpamPoolCidrAllocation("testVpcIpamPoolCidrAllocation", {
    ipamPoolId: aws_vpc_ipam_pool.test.id,
    cidr: testIpamPreviewNextCidr.then(testIpamPreviewNextCidr => testIpamPreviewNextCidr.cidr),
});
```
```python
import pulumi
import pulumi_aws as aws

test_ipam_preview_next_cidr = aws.ec2.get_ipam_preview_next_cidr(ipam_pool_id=aws_vpc_ipam_pool["test"]["id"],
    netmask_length=28)
test_vpc_ipam_pool_cidr_allocation = aws.ec2.VpcIpamPoolCidrAllocation("testVpcIpamPoolCidrAllocation",
    ipam_pool_id=aws_vpc_ipam_pool["test"]["id"],
    cidr=test_ipam_preview_next_cidr.cidr)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var testIpamPreviewNextCidr = Aws.Ec2.GetIpamPreviewNextCidr.Invoke(new()
    {
        IpamPoolId = aws_vpc_ipam_pool.Test.Id,
        NetmaskLength = 28,
    });

    var testVpcIpamPoolCidrAllocation = new Aws.Ec2.VpcIpamPoolCidrAllocation("testVpcIpamPoolCidrAllocation", new()
    {
        IpamPoolId = aws_vpc_ipam_pool.Test.Id,
        Cidr = testIpamPreviewNextCidr.Apply(getIpamPreviewNextCidrResult => getIpamPreviewNextCidrResult.Cidr),
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
		testIpamPreviewNextCidr, err := ec2.GetIpamPreviewNextCidr(ctx, &ec2.GetIpamPreviewNextCidrArgs{
			IpamPoolId:    aws_vpc_ipam_pool.Test.Id,
			NetmaskLength: pulumi.IntRef(28),
		}, nil)
		if err != nil {
			return err
		}
		_, err = ec2.NewVpcIpamPoolCidrAllocation(ctx, "testVpcIpamPoolCidrAllocation", &ec2.VpcIpamPoolCidrAllocationArgs{
			IpamPoolId: pulumi.Any(aws_vpc_ipam_pool.Test.Id),
			Cidr:       pulumi.String(testIpamPreviewNextCidr.Cidr),
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
import com.pulumi.aws.ec2.inputs.GetIpamPreviewNextCidrArgs;
import com.pulumi.aws.ec2.VpcIpamPoolCidrAllocation;
import com.pulumi.aws.ec2.VpcIpamPoolCidrAllocationArgs;
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
        final var testIpamPreviewNextCidr = Ec2Functions.getIpamPreviewNextCidr(GetIpamPreviewNextCidrArgs.builder()
            .ipamPoolId(aws_vpc_ipam_pool.test().id())
            .netmaskLength(28)
            .build());

        var testVpcIpamPoolCidrAllocation = new VpcIpamPoolCidrAllocation("testVpcIpamPoolCidrAllocation", VpcIpamPoolCidrAllocationArgs.builder()        
            .ipamPoolId(aws_vpc_ipam_pool.test().id())
            .cidr(testIpamPreviewNextCidr.applyValue(getIpamPreviewNextCidrResult -> getIpamPreviewNextCidrResult.cidr()))
            .build());

    }
}
```
```yaml
resources:
  testVpcIpamPoolCidrAllocation:
    type: aws:ec2:VpcIpamPoolCidrAllocation
    properties:
      ipamPoolId: ${aws_vpc_ipam_pool.test.id}
      cidr: ${testIpamPreviewNextCidr.cidr}
variables:
  testIpamPreviewNextCidr:
    Fn::Invoke:
      Function: aws:ec2:getIpamPreviewNextCidr
      Arguments:
        ipamPoolId: ${aws_vpc_ipam_pool.test.id}
        netmaskLength: 28
```
{{% /example %}}
{{% /examples %}}
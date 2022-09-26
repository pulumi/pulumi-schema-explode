`aws.ec2.VpcIpamPool` provides details about an IPAM pool.

This resource can prove useful when an ipam pool was created in another root
module and you need the pool's id as an input variable. For example, pools
can be shared via RAM and used to create vpcs with CIDRs from that pool.

{{% examples %}}
## Example Usage
{{% example %}}

The following example shows an account that has only 1 pool, perhaps shared
via RAM, and using that pool id to create a VPC with a CIDR derived from
AWS IPAM.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const testVpcIamPool = aws.ec2.getVpcIamPool({
    filters: [
        {
            name: "description",
            values: ["*test*"],
        },
        {
            name: "address-family",
            values: ["ipv4"],
        },
    ],
});
const testVpc = new aws.ec2.Vpc("testVpc", {
    ipv4IpamPoolId: testVpcIamPool.then(testVpcIamPool => testVpcIamPool.id),
    ipv4NetmaskLength: 28,
});
```
```python
import pulumi
import pulumi_aws as aws

test_vpc_iam_pool = aws.ec2.get_vpc_iam_pool(filters=[
    aws.ec2.GetVpcIamPoolFilterArgs(
        name="description",
        values=["*test*"],
    ),
    aws.ec2.GetVpcIamPoolFilterArgs(
        name="address-family",
        values=["ipv4"],
    ),
])
test_vpc = aws.ec2.Vpc("testVpc",
    ipv4_ipam_pool_id=test_vpc_iam_pool.id,
    ipv4_netmask_length=28)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var testVpcIamPool = Aws.Ec2.GetVpcIamPool.Invoke(new()
    {
        Filters = new[]
        {
            new Aws.Ec2.Inputs.GetVpcIamPoolFilterInputArgs
            {
                Name = "description",
                Values = new[]
                {
                    "*test*",
                },
            },
            new Aws.Ec2.Inputs.GetVpcIamPoolFilterInputArgs
            {
                Name = "address-family",
                Values = new[]
                {
                    "ipv4",
                },
            },
        },
    });

    var testVpc = new Aws.Ec2.Vpc("testVpc", new()
    {
        Ipv4IpamPoolId = testVpcIamPool.Apply(getVpcIamPoolResult => getVpcIamPoolResult.Id),
        Ipv4NetmaskLength = 28,
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
		testVpcIamPool, err := ec2.GetVpcIamPool(ctx, &ec2.GetVpcIamPoolArgs{
			Filters: []ec2.GetVpcIamPoolFilter{
				ec2.GetVpcIamPoolFilter{
					Name: "description",
					Values: []string{
						"*test*",
					},
				},
				ec2.GetVpcIamPoolFilter{
					Name: "address-family",
					Values: []string{
						"ipv4",
					},
				},
			},
		}, nil)
		if err != nil {
			return err
		}
		_, err = ec2.NewVpc(ctx, "testVpc", &ec2.VpcArgs{
			Ipv4IpamPoolId:    pulumi.String(testVpcIamPool.Id),
			Ipv4NetmaskLength: pulumi.Int(28),
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
import com.pulumi.aws.ec2.inputs.GetVpcIamPoolArgs;
import com.pulumi.aws.ec2.Vpc;
import com.pulumi.aws.ec2.VpcArgs;
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
        final var testVpcIamPool = Ec2Functions.getVpcIamPool(GetVpcIamPoolArgs.builder()
            .filters(            
                GetVpcIamPoolFilterArgs.builder()
                    .name("description")
                    .values("*test*")
                    .build(),
                GetVpcIamPoolFilterArgs.builder()
                    .name("address-family")
                    .values("ipv4")
                    .build())
            .build());

        var testVpc = new Vpc("testVpc", VpcArgs.builder()        
            .ipv4IpamPoolId(testVpcIamPool.applyValue(getVpcIamPoolResult -> getVpcIamPoolResult.id()))
            .ipv4NetmaskLength(28)
            .build());

    }
}
```
```yaml
resources:
  testVpc:
    type: aws:ec2:Vpc
    properties:
      ipv4IpamPoolId: ${testVpcIamPool.id}
      ipv4NetmaskLength: 28
variables:
  testVpcIamPool:
    Fn::Invoke:
      Function: aws:ec2:getVpcIamPool
      Arguments:
        filters:
          - name: description
            values:
              - '*test*'
          - name: address-family
            values:
              - ipv4
```
{{% /example %}}
{{% /examples %}}
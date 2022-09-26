Provides a Traffic mirror target.  
Read [limits and considerations](https://docs.aws.amazon.com/vpc/latest/mirroring/traffic-mirroring-considerations.html) for traffic mirroring

{{% examples %}}
## Example Usage
{{% example %}}

To create a basic traffic mirror session

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const nlb = new aws.ec2.TrafficMirrorTarget("nlb", {
    description: "NLB target",
    networkLoadBalancerArn: aws_lb.lb.arn,
});
const eni = new aws.ec2.TrafficMirrorTarget("eni", {
    description: "ENI target",
    networkInterfaceId: aws_instance.test.primary_network_interface_id,
});
```
```python
import pulumi
import pulumi_aws as aws

nlb = aws.ec2.TrafficMirrorTarget("nlb",
    description="NLB target",
    network_load_balancer_arn=aws_lb["lb"]["arn"])
eni = aws.ec2.TrafficMirrorTarget("eni",
    description="ENI target",
    network_interface_id=aws_instance["test"]["primary_network_interface_id"])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var nlb = new Aws.Ec2.TrafficMirrorTarget("nlb", new()
    {
        Description = "NLB target",
        NetworkLoadBalancerArn = aws_lb.Lb.Arn,
    });

    var eni = new Aws.Ec2.TrafficMirrorTarget("eni", new()
    {
        Description = "ENI target",
        NetworkInterfaceId = aws_instance.Test.Primary_network_interface_id,
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
		_, err := ec2.NewTrafficMirrorTarget(ctx, "nlb", &ec2.TrafficMirrorTargetArgs{
			Description:            pulumi.String("NLB target"),
			NetworkLoadBalancerArn: pulumi.Any(aws_lb.Lb.Arn),
		})
		if err != nil {
			return err
		}
		_, err = ec2.NewTrafficMirrorTarget(ctx, "eni", &ec2.TrafficMirrorTargetArgs{
			Description:        pulumi.String("ENI target"),
			NetworkInterfaceId: pulumi.Any(aws_instance.Test.Primary_network_interface_id),
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
import com.pulumi.aws.ec2.TrafficMirrorTarget;
import com.pulumi.aws.ec2.TrafficMirrorTargetArgs;
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
        var nlb = new TrafficMirrorTarget("nlb", TrafficMirrorTargetArgs.builder()        
            .description("NLB target")
            .networkLoadBalancerArn(aws_lb.lb().arn())
            .build());

        var eni = new TrafficMirrorTarget("eni", TrafficMirrorTargetArgs.builder()        
            .description("ENI target")
            .networkInterfaceId(aws_instance.test().primary_network_interface_id())
            .build());

    }
}
```
```yaml
resources:
  nlb:
    type: aws:ec2:TrafficMirrorTarget
    properties:
      description: NLB target
      networkLoadBalancerArn: ${aws_lb.lb.arn}
  eni:
    type: aws:ec2:TrafficMirrorTarget
    properties:
      description: ENI target
      networkInterfaceId: ${aws_instance.test.primary_network_interface_id}
```
{{% /example %}}
{{% /examples %}}

## Import

Traffic mirror targets can be imported using the `id`, e.g.,

```sh
 $ pulumi import aws:ec2/trafficMirrorTarget:TrafficMirrorTarget target tmt-0c13a005422b86606
```

 
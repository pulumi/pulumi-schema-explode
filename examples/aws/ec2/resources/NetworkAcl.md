{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const main = new aws.ec2.NetworkAcl("main", {
    vpcId: aws_vpc.main.id,
    egress: [{
        protocol: "tcp",
        ruleNo: 200,
        action: "allow",
        cidrBlock: "10.3.0.0/18",
        fromPort: 443,
        toPort: 443,
    }],
    ingress: [{
        protocol: "tcp",
        ruleNo: 100,
        action: "allow",
        cidrBlock: "10.3.0.0/18",
        fromPort: 80,
        toPort: 80,
    }],
    tags: {
        Name: "main",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

main = aws.ec2.NetworkAcl("main",
    vpc_id=aws_vpc["main"]["id"],
    egress=[aws.ec2.NetworkAclEgressArgs(
        protocol="tcp",
        rule_no=200,
        action="allow",
        cidr_block="10.3.0.0/18",
        from_port=443,
        to_port=443,
    )],
    ingress=[aws.ec2.NetworkAclIngressArgs(
        protocol="tcp",
        rule_no=100,
        action="allow",
        cidr_block="10.3.0.0/18",
        from_port=80,
        to_port=80,
    )],
    tags={
        "Name": "main",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var main = new Aws.Ec2.NetworkAcl("main", new()
    {
        VpcId = aws_vpc.Main.Id,
        Egress = new[]
        {
            new Aws.Ec2.Inputs.NetworkAclEgressArgs
            {
                Protocol = "tcp",
                RuleNo = 200,
                Action = "allow",
                CidrBlock = "10.3.0.0/18",
                FromPort = 443,
                ToPort = 443,
            },
        },
        Ingress = new[]
        {
            new Aws.Ec2.Inputs.NetworkAclIngressArgs
            {
                Protocol = "tcp",
                RuleNo = 100,
                Action = "allow",
                CidrBlock = "10.3.0.0/18",
                FromPort = 80,
                ToPort = 80,
            },
        },
        Tags = 
        {
            { "Name", "main" },
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
		_, err := ec2.NewNetworkAcl(ctx, "main", &ec2.NetworkAclArgs{
			VpcId: pulumi.Any(aws_vpc.Main.Id),
			Egress: ec2.NetworkAclEgressArray{
				&ec2.NetworkAclEgressArgs{
					Protocol:  pulumi.String("tcp"),
					RuleNo:    pulumi.Int(200),
					Action:    pulumi.String("allow"),
					CidrBlock: pulumi.String("10.3.0.0/18"),
					FromPort:  pulumi.Int(443),
					ToPort:    pulumi.Int(443),
				},
			},
			Ingress: ec2.NetworkAclIngressArray{
				&ec2.NetworkAclIngressArgs{
					Protocol:  pulumi.String("tcp"),
					RuleNo:    pulumi.Int(100),
					Action:    pulumi.String("allow"),
					CidrBlock: pulumi.String("10.3.0.0/18"),
					FromPort:  pulumi.Int(80),
					ToPort:    pulumi.Int(80),
				},
			},
			Tags: pulumi.StringMap{
				"Name": pulumi.String("main"),
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
import com.pulumi.aws.ec2.NetworkAcl;
import com.pulumi.aws.ec2.NetworkAclArgs;
import com.pulumi.aws.ec2.inputs.NetworkAclEgressArgs;
import com.pulumi.aws.ec2.inputs.NetworkAclIngressArgs;
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
        var main = new NetworkAcl("main", NetworkAclArgs.builder()        
            .vpcId(aws_vpc.main().id())
            .egress(NetworkAclEgressArgs.builder()
                .protocol("tcp")
                .ruleNo(200)
                .action("allow")
                .cidrBlock("10.3.0.0/18")
                .fromPort(443)
                .toPort(443)
                .build())
            .ingress(NetworkAclIngressArgs.builder()
                .protocol("tcp")
                .ruleNo(100)
                .action("allow")
                .cidrBlock("10.3.0.0/18")
                .fromPort(80)
                .toPort(80)
                .build())
            .tags(Map.of("Name", "main"))
            .build());

    }
}
```
```yaml
resources:
  main:
    type: aws:ec2:NetworkAcl
    properties:
      vpcId: ${aws_vpc.main.id}
      egress:
        - protocol: tcp
          ruleNo: 200
          action: allow
          cidrBlock: 10.3.0.0/18
          fromPort: 443
          toPort: 443
      ingress:
        - protocol: tcp
          ruleNo: 100
          action: allow
          cidrBlock: 10.3.0.0/18
          fromPort: 80
          toPort: 80
      tags:
        Name: main
```
{{% /example %}}
{{% /examples %}}

## Import

Network ACLs can be imported using the `id`, e.g.,

```sh
 $ pulumi import aws:ec2/networkAcl:NetworkAcl main acl-7aaabd18
```

 
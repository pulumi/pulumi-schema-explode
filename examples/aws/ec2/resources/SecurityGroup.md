Provides a security group resource.

> **NOTE on Security Groups and Security Group Rules:** This provider currently
provides both a standalone Security Group Rule resource (a single `ingress` or
`egress` rule), and a Security Group resource with `ingress` and `egress` rules
defined in-line. At this time you cannot use a Security Group with in-line rules
in conjunction with any Security Group Rule resources. Doing so will cause
a conflict of rule settings and will overwrite rules.

> **NOTE:** Referencing Security Groups across VPC peering has certain restrictions. More information is available in the [VPC Peering User Guide](https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-security-groups.html).

> **NOTE:** Due to [AWS Lambda improved VPC networking changes that began deploying in September 2019](https://aws.amazon.com/blogs/compute/announcing-improved-vpc-networking-for-aws-lambda-functions/), security groups associated with Lambda Functions can take up to 45 minutes to successfully delete.

{{% examples %}}
## Example Usage
{{% example %}}
### Basic Usage

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const allowTls = new aws.ec2.SecurityGroup("allowTls", {
    description: "Allow TLS inbound traffic",
    vpcId: aws_vpc.main.id,
    ingress: [{
        description: "TLS from VPC",
        fromPort: 443,
        toPort: 443,
        protocol: "tcp",
        cidrBlocks: [aws_vpc.main.cidr_block],
        ipv6CidrBlocks: [aws_vpc.main.ipv6_cidr_block],
    }],
    egress: [{
        fromPort: 0,
        toPort: 0,
        protocol: "-1",
        cidrBlocks: ["0.0.0.0/0"],
        ipv6CidrBlocks: ["::/0"],
    }],
    tags: {
        Name: "allow_tls",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

allow_tls = aws.ec2.SecurityGroup("allowTls",
    description="Allow TLS inbound traffic",
    vpc_id=aws_vpc["main"]["id"],
    ingress=[aws.ec2.SecurityGroupIngressArgs(
        description="TLS from VPC",
        from_port=443,
        to_port=443,
        protocol="tcp",
        cidr_blocks=[aws_vpc["main"]["cidr_block"]],
        ipv6_cidr_blocks=[aws_vpc["main"]["ipv6_cidr_block"]],
    )],
    egress=[aws.ec2.SecurityGroupEgressArgs(
        from_port=0,
        to_port=0,
        protocol="-1",
        cidr_blocks=["0.0.0.0/0"],
        ipv6_cidr_blocks=["::/0"],
    )],
    tags={
        "Name": "allow_tls",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var allowTls = new Aws.Ec2.SecurityGroup("allowTls", new()
    {
        Description = "Allow TLS inbound traffic",
        VpcId = aws_vpc.Main.Id,
        Ingress = new[]
        {
            new Aws.Ec2.Inputs.SecurityGroupIngressArgs
            {
                Description = "TLS from VPC",
                FromPort = 443,
                ToPort = 443,
                Protocol = "tcp",
                CidrBlocks = new[]
                {
                    aws_vpc.Main.Cidr_block,
                },
                Ipv6CidrBlocks = new[]
                {
                    aws_vpc.Main.Ipv6_cidr_block,
                },
            },
        },
        Egress = new[]
        {
            new Aws.Ec2.Inputs.SecurityGroupEgressArgs
            {
                FromPort = 0,
                ToPort = 0,
                Protocol = "-1",
                CidrBlocks = new[]
                {
                    "0.0.0.0/0",
                },
                Ipv6CidrBlocks = new[]
                {
                    "::/0",
                },
            },
        },
        Tags = 
        {
            { "Name", "allow_tls" },
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
		_, err := ec2.NewSecurityGroup(ctx, "allowTls", &ec2.SecurityGroupArgs{
			Description: pulumi.String("Allow TLS inbound traffic"),
			VpcId:       pulumi.Any(aws_vpc.Main.Id),
			Ingress: ec2.SecurityGroupIngressArray{
				&ec2.SecurityGroupIngressArgs{
					Description: pulumi.String("TLS from VPC"),
					FromPort:    pulumi.Int(443),
					ToPort:      pulumi.Int(443),
					Protocol:    pulumi.String("tcp"),
					CidrBlocks: pulumi.StringArray{
						pulumi.Any(aws_vpc.Main.Cidr_block),
					},
					Ipv6CidrBlocks: pulumi.StringArray{
						pulumi.Any(aws_vpc.Main.Ipv6_cidr_block),
					},
				},
			},
			Egress: ec2.SecurityGroupEgressArray{
				&ec2.SecurityGroupEgressArgs{
					FromPort: pulumi.Int(0),
					ToPort:   pulumi.Int(0),
					Protocol: pulumi.String("-1"),
					CidrBlocks: pulumi.StringArray{
						pulumi.String("0.0.0.0/0"),
					},
					Ipv6CidrBlocks: pulumi.StringArray{
						pulumi.String("::/0"),
					},
				},
			},
			Tags: pulumi.StringMap{
				"Name": pulumi.String("allow_tls"),
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
import com.pulumi.aws.ec2.SecurityGroup;
import com.pulumi.aws.ec2.SecurityGroupArgs;
import com.pulumi.aws.ec2.inputs.SecurityGroupIngressArgs;
import com.pulumi.aws.ec2.inputs.SecurityGroupEgressArgs;
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
        var allowTls = new SecurityGroup("allowTls", SecurityGroupArgs.builder()        
            .description("Allow TLS inbound traffic")
            .vpcId(aws_vpc.main().id())
            .ingress(SecurityGroupIngressArgs.builder()
                .description("TLS from VPC")
                .fromPort(443)
                .toPort(443)
                .protocol("tcp")
                .cidrBlocks(aws_vpc.main().cidr_block())
                .ipv6CidrBlocks(aws_vpc.main().ipv6_cidr_block())
                .build())
            .egress(SecurityGroupEgressArgs.builder()
                .fromPort(0)
                .toPort(0)
                .protocol("-1")
                .cidrBlocks("0.0.0.0/0")
                .ipv6CidrBlocks("::/0")
                .build())
            .tags(Map.of("Name", "allow_tls"))
            .build());

    }
}
```
```yaml
resources:
  allowTls:
    type: aws:ec2:SecurityGroup
    properties:
      description: Allow TLS inbound traffic
      vpcId: ${aws_vpc.main.id}
      ingress:
        - description: TLS from VPC
          fromPort: 443
          toPort: 443
          protocol: tcp
          cidrBlocks:
            - ${aws_vpc.main.cidr_block}
          ipv6CidrBlocks:
            - ${aws_vpc.main.ipv6_cidr_block}
      egress:
        - fromPort: 0
          toPort: 0
          protocol: -1
          cidrBlocks:
            - 0.0.0.0/0
          ipv6CidrBlocks:
            - ::/0
      tags:
        Name: allow_tls
```

> **NOTE on Egress rules:** By default, AWS creates an `ALLOW ALL` egress rule when creating a new Security Group inside of a VPC. When creating a new Security Group inside a VPC, **this provider will remove this default rule**, and require you specifically re-create it if you desire that rule. We feel this leads to fewer surprises in terms of controlling your egress rules. If you desire this rule to be in place, you can use this `egress` block:

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.ec2.SecurityGroup("example", {
    egress: [{
        cidrBlocks: ["0.0.0.0/0"],
        fromPort: 0,
        ipv6CidrBlocks: ["::/0"],
        protocol: "-1",
        toPort: 0,
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.ec2.SecurityGroup("example", egress=[aws.ec2.SecurityGroupEgressArgs(
    cidr_blocks=["0.0.0.0/0"],
    from_port=0,
    ipv6_cidr_blocks=["::/0"],
    protocol="-1",
    to_port=0,
)])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Ec2.SecurityGroup("example", new()
    {
        Egress = new[]
        {
            new Aws.Ec2.Inputs.SecurityGroupEgressArgs
            {
                CidrBlocks = new[]
                {
                    "0.0.0.0/0",
                },
                FromPort = 0,
                Ipv6CidrBlocks = new[]
                {
                    "::/0",
                },
                Protocol = "-1",
                ToPort = 0,
            },
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
		_, err := ec2.NewSecurityGroup(ctx, "example", &ec2.SecurityGroupArgs{
			Egress: ec2.SecurityGroupEgressArray{
				&ec2.SecurityGroupEgressArgs{
					CidrBlocks: pulumi.StringArray{
						pulumi.String("0.0.0.0/0"),
					},
					FromPort: pulumi.Int(0),
					Ipv6CidrBlocks: pulumi.StringArray{
						pulumi.String("::/0"),
					},
					Protocol: pulumi.String("-1"),
					ToPort:   pulumi.Int(0),
				},
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
import com.pulumi.aws.ec2.SecurityGroup;
import com.pulumi.aws.ec2.SecurityGroupArgs;
import com.pulumi.aws.ec2.inputs.SecurityGroupEgressArgs;
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
        var example = new SecurityGroup("example", SecurityGroupArgs.builder()        
            .egress(SecurityGroupEgressArgs.builder()
                .cidrBlocks("0.0.0.0/0")
                .fromPort(0)
                .ipv6CidrBlocks("::/0")
                .protocol("-1")
                .toPort(0)
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:ec2:SecurityGroup
    properties:
      egress:
        - cidrBlocks:
            - 0.0.0.0/0
          fromPort: 0
          ipv6CidrBlocks:
            - ::/0
          protocol: -1
          toPort: 0
```
{{% /example %}}
{{% example %}}
### Usage With Prefix List IDs

Prefix Lists are either managed by AWS internally, or created by the customer using a
Prefix List resource. Prefix Lists provided by
AWS are associated with a prefix list name, or service name, that is linked to a specific region.
Prefix list IDs are exported on VPC Endpoints, so you can use this format:

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const myEndpoint = new aws.ec2.VpcEndpoint("myEndpoint", {});
// ... other configuration ...
// ... other configuration ...
const example = new aws.ec2.SecurityGroup("example", {egress: [{
    fromPort: 0,
    toPort: 0,
    protocol: "-1",
    prefixListIds: [myEndpoint.prefixListId],
}]});
```
```python
import pulumi
import pulumi_aws as aws

my_endpoint = aws.ec2.VpcEndpoint("myEndpoint")
# ... other configuration ...
# ... other configuration ...
example = aws.ec2.SecurityGroup("example", egress=[aws.ec2.SecurityGroupEgressArgs(
    from_port=0,
    to_port=0,
    protocol="-1",
    prefix_list_ids=[my_endpoint.prefix_list_id],
)])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var myEndpoint = new Aws.Ec2.VpcEndpoint("myEndpoint");

    // ... other configuration ...
    // ... other configuration ...
    var example = new Aws.Ec2.SecurityGroup("example", new()
    {
        Egress = new[]
        {
            new Aws.Ec2.Inputs.SecurityGroupEgressArgs
            {
                FromPort = 0,
                ToPort = 0,
                Protocol = "-1",
                PrefixListIds = new[]
                {
                    myEndpoint.PrefixListId,
                },
            },
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
		myEndpoint, err := ec2.NewVpcEndpoint(ctx, "myEndpoint", nil)
		if err != nil {
			return err
		}
		_, err = ec2.NewSecurityGroup(ctx, "example", &ec2.SecurityGroupArgs{
			Egress: ec2.SecurityGroupEgressArray{
				&ec2.SecurityGroupEgressArgs{
					FromPort: pulumi.Int(0),
					ToPort:   pulumi.Int(0),
					Protocol: pulumi.String("-1"),
					PrefixListIds: pulumi.StringArray{
						myEndpoint.PrefixListId,
					},
				},
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
import com.pulumi.aws.ec2.VpcEndpoint;
import com.pulumi.aws.ec2.SecurityGroup;
import com.pulumi.aws.ec2.SecurityGroupArgs;
import com.pulumi.aws.ec2.inputs.SecurityGroupEgressArgs;
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
        var myEndpoint = new VpcEndpoint("myEndpoint");

        var example = new SecurityGroup("example", SecurityGroupArgs.builder()        
            .egress(SecurityGroupEgressArgs.builder()
                .fromPort(0)
                .toPort(0)
                .protocol("-1")
                .prefixListIds(myEndpoint.prefixListId())
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:ec2:SecurityGroup
    properties:
      egress:
        - fromPort: 0
          toPort: 0
          protocol: -1
          prefixListIds:
            - ${myEndpoint.prefixListId}
  myEndpoint:
    type: aws:ec2:VpcEndpoint
```

You can also find a specific Prefix List using the `aws.ec2.getPrefixList` data source.
{{% /example %}}
{{% example %}}
### Change of name or name-prefix value

Security Group's Name [cannot be edited after the resource is created](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/working-with-security-groups.html#creating-security-group). In fact, the `name` and `name-prefix` arguments force the creation of a new Security Group resource when they change value. In that case, this provider first deletes the existing Security Group resource and then it creates a new one. If the existing Security Group is associated to a Network Interface resource, the deletion cannot complete. The reason is that Network Interface resources cannot be left with no Security Group attached and the new one is not yet available at that point.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const sgWithChangeableName = new aws.ec2.SecurityGroup("sg_with_changeable_name", {});
```
```python
import pulumi
import pulumi_aws as aws

sg_with_changeable_name = aws.ec2.SecurityGroup("sgWithChangeableName")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var sgWithChangeableName = new Aws.Ec2.SecurityGroup("sgWithChangeableName");

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
		_, err := ec2.NewSecurityGroup(ctx, "sgWithChangeableName", nil)
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
import com.pulumi.aws.ec2.SecurityGroup;
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
        var sgWithChangeableName = new SecurityGroup("sgWithChangeableName");

    }
}
```
```yaml
resources:
  sgWithChangeableName:
    type: aws:ec2:SecurityGroup
```
{{% /example %}}
{{% /examples %}}

## Import

Security Groups can be imported using the `security group id`, e.g.,

```sh
 $ pulumi import aws:ec2/securityGroup:SecurityGroup elb_sg sg-903004f8
```

 
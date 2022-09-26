Manages a Route53 Hosted Zone. For managing Domain Name System Security Extensions (DNSSEC), see the `aws.route53.KeySigningKey` and `aws.route53.HostedZoneDnsSec` resources.

{{% examples %}}
## Example Usage
{{% example %}}
### Public Zone

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const primary = new aws.route53.Zone("primary", {});
```
```python
import pulumi
import pulumi_aws as aws

primary = aws.route53.Zone("primary")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var primary = new Aws.Route53.Zone("primary");

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/route53"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := route53.NewZone(ctx, "primary", nil)
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
import com.pulumi.aws.route53.Zone;
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
        var primary = new Zone("primary");

    }
}
```
```yaml
resources:
  primary:
    type: aws:route53:Zone
```
{{% /example %}}
{{% example %}}
### Public Subdomain Zone

For use in subdomains, note that you need to create a
`aws.route53.Record` of type `NS` as well as the subdomain
zone.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const main = new aws.route53.Zone("main", {});
const dev = new aws.route53.Zone("dev", {tags: {
    Environment: "dev",
}});
const dev_ns = new aws.route53.Record("dev-ns", {
    zoneId: main.zoneId,
    name: "dev.example.com",
    type: "NS",
    ttl: 30,
    records: dev.nameServers,
});
```
```python
import pulumi
import pulumi_aws as aws

main = aws.route53.Zone("main")
dev = aws.route53.Zone("dev", tags={
    "Environment": "dev",
})
dev_ns = aws.route53.Record("dev-ns",
    zone_id=main.zone_id,
    name="dev.example.com",
    type="NS",
    ttl=30,
    records=dev.name_servers)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var main = new Aws.Route53.Zone("main");

    var dev = new Aws.Route53.Zone("dev", new()
    {
        Tags = 
        {
            { "Environment", "dev" },
        },
    });

    var dev_ns = new Aws.Route53.Record("dev-ns", new()
    {
        ZoneId = main.ZoneId,
        Name = "dev.example.com",
        Type = "NS",
        Ttl = 30,
        Records = dev.NameServers,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/route53"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		main, err := route53.NewZone(ctx, "main", nil)
		if err != nil {
			return err
		}
		dev, err := route53.NewZone(ctx, "dev", &route53.ZoneArgs{
			Tags: pulumi.StringMap{
				"Environment": pulumi.String("dev"),
			},
		})
		if err != nil {
			return err
		}
		_, err = route53.NewRecord(ctx, "dev-ns", &route53.RecordArgs{
			ZoneId:  main.ZoneId,
			Name:    pulumi.String("dev.example.com"),
			Type:    pulumi.String("NS"),
			Ttl:     pulumi.Int(30),
			Records: dev.NameServers,
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
import com.pulumi.aws.route53.Zone;
import com.pulumi.aws.route53.ZoneArgs;
import com.pulumi.aws.route53.Record;
import com.pulumi.aws.route53.RecordArgs;
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
        var main = new Zone("main");

        var dev = new Zone("dev", ZoneArgs.builder()        
            .tags(Map.of("Environment", "dev"))
            .build());

        var dev_ns = new Record("dev-ns", RecordArgs.builder()        
            .zoneId(main.zoneId())
            .name("dev.example.com")
            .type("NS")
            .ttl("30")
            .records(dev.nameServers())
            .build());

    }
}
```
```yaml
resources:
  main:
    type: aws:route53:Zone
  dev:
    type: aws:route53:Zone
    properties:
      tags:
        Environment: dev
  dev-ns:
    type: aws:route53:Record
    properties:
      zoneId: ${main.zoneId}
      name: dev.example.com
      type: NS
      ttl: 30
      records: ${dev.nameServers}
```
{{% /example %}}
{{% example %}}
### Private Zone

> **NOTE:** This provider provides both exclusive VPC associations defined in-line in this resource via `vpc` configuration blocks and a separate `Zone VPC Association resource. At this time, you cannot use in-line VPC associations in conjunction with any `aws.route53.ZoneAssociation` resources with the same zone ID otherwise it will cause a perpetual difference in plan output. You can optionally use [`ignoreChanges`](https://www.pulumi.com/docs/intro/concepts/programming-model/#ignorechanges) to manage additional associations via the `aws.route53.ZoneAssociation` resource.

> **NOTE:** Private zones require at least one VPC association at all times.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const _private = new aws.route53.Zone("private", {vpcs: [{
    vpcId: aws_vpc.example.id,
}]});
```
```python
import pulumi
import pulumi_aws as aws

private = aws.route53.Zone("private", vpcs=[aws.route53.ZoneVpcArgs(
    vpc_id=aws_vpc["example"]["id"],
)])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var @private = new Aws.Route53.Zone("private", new()
    {
        Vpcs = new[]
        {
            new Aws.Route53.Inputs.ZoneVpcArgs
            {
                VpcId = aws_vpc.Example.Id,
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/route53"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := route53.NewZone(ctx, "private", &route53.ZoneArgs{
			Vpcs: route53.ZoneVpcArray{
				&route53.ZoneVpcArgs{
					VpcId: pulumi.Any(aws_vpc.Example.Id),
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
import com.pulumi.aws.route53.Zone;
import com.pulumi.aws.route53.ZoneArgs;
import com.pulumi.aws.route53.inputs.ZoneVpcArgs;
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
        var private_ = new Zone("private", ZoneArgs.builder()        
            .vpcs(ZoneVpcArgs.builder()
                .vpcId(aws_vpc.example().id())
                .build())
            .build());

    }
}
```
```yaml
resources:
  private:
    type: aws:route53:Zone
    properties:
      vpcs:
        - vpcId: ${aws_vpc.example.id}
```
{{% /example %}}
{{% /examples %}}

## Import

Route53 Zones can be imported using the `zone id`, e.g.,

```sh
 $ pulumi import aws:route53/zone:Zone myzone Z1D633PJN98FT9
```

 
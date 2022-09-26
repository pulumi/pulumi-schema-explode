Provides an IPAM resource.

{{% examples %}}
## Example Usage
{{% example %}}

Basic usage:

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const current = aws.getRegion({});
const main = new aws.ec2.VpcIpam("main", {
    description: "My IPAM",
    operatingRegions: [{
        regionName: current.then(current => current.name),
    }],
    tags: {
        Test: "Main",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

current = aws.get_region()
main = aws.ec2.VpcIpam("main",
    description="My IPAM",
    operating_regions=[aws.ec2.VpcIpamOperatingRegionArgs(
        region_name=current.name,
    )],
    tags={
        "Test": "Main",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var current = Aws.GetRegion.Invoke();

    var main = new Aws.Ec2.VpcIpam("main", new()
    {
        Description = "My IPAM",
        OperatingRegions = new[]
        {
            new Aws.Ec2.Inputs.VpcIpamOperatingRegionArgs
            {
                RegionName = current.Apply(getRegionResult => getRegionResult.Name),
            },
        },
        Tags = 
        {
            { "Test", "Main" },
        },
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
		_, err = ec2.NewVpcIpam(ctx, "main", &ec2.VpcIpamArgs{
			Description: pulumi.String("My IPAM"),
			OperatingRegions: ec2.VpcIpamOperatingRegionArray{
				&ec2.VpcIpamOperatingRegionArgs{
					RegionName: pulumi.String(current.Name),
				},
			},
			Tags: pulumi.StringMap{
				"Test": pulumi.String("Main"),
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
import com.pulumi.aws.AwsFunctions;
import com.pulumi.aws.inputs.GetRegionArgs;
import com.pulumi.aws.ec2.VpcIpam;
import com.pulumi.aws.ec2.VpcIpamArgs;
import com.pulumi.aws.ec2.inputs.VpcIpamOperatingRegionArgs;
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

        var main = new VpcIpam("main", VpcIpamArgs.builder()        
            .description("My IPAM")
            .operatingRegions(VpcIpamOperatingRegionArgs.builder()
                .regionName(current.applyValue(getRegionResult -> getRegionResult.name()))
                .build())
            .tags(Map.of("Test", "Main"))
            .build());

    }
}
```
```yaml
resources:
  main:
    type: aws:ec2:VpcIpam
    properties:
      description: My IPAM
      operatingRegions:
        - regionName: ${current.name}
      tags:
        Test: Main
variables:
  current:
    Fn::Invoke:
      Function: aws:getRegion
      Arguments: {}
```

Shared with multiple operating_regions:

```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.ec2.VpcIpam;
import com.pulumi.aws.ec2.VpcIpamArgs;
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
        final var config = ctx.config();
        final var ipamRegions = config.get("ipamRegions").orElse(        
            "us-east-1",
            "us-west-2");
        var example = new VpcIpam("example", VpcIpamArgs.builder()        
            .description("test4")
            .dynamic(%!v(PANIC=Format method: runtime error: invalid memory address or nil pointer dereference))
            .build());

    }
}
```
```yaml
configuration:
  ipamRegions:
    type: dynamic
    default:
      - us-east-1
      - us-west-2
resources:
  example:
    type: aws:ec2:VpcIpam
    properties:
      description: test4
      dynamic:
        - forEach: ${ipamRegions}
          content:
            - regionName: ${operating_regions.value}
```
{{% /example %}}
{{% /examples %}}

## Import

IPAMs can be imported using the `ipam id`, e.g.

```sh
 $ pulumi import aws:ec2/vpcIpam:VpcIpam example ipam-0178368ad2146a492
```

 
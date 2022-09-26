{{% examples %}}
## Example Usage
{{% example %}}

Basic usage with tags:

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const defaultDefaultVpc = new aws.ec2.DefaultVpc("default", {
    tags: {
        Name: "Default VPC",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

default = aws.ec2.DefaultVpc("default", tags={
    "Name": "Default VPC",
})
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var @default = new Aws.Ec2.DefaultVpc("default", new()
    {
        Tags = 
        {
            { "Name", "Default VPC" },
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
		_, err := ec2.NewDefaultVpc(ctx, "default", &ec2.DefaultVpcArgs{
			Tags: pulumi.StringMap{
				"Name": pulumi.String("Default VPC"),
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
import com.pulumi.aws.ec2.DefaultVpc;
import com.pulumi.aws.ec2.DefaultVpcArgs;
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
        var default_ = new DefaultVpc("default", DefaultVpcArgs.builder()        
            .tags(Map.of("Name", "Default VPC"))
            .build());

    }
}
```
```yaml
resources:
  default:
    type: aws:ec2:DefaultVpc
    properties:
      tags:
        Name: Default VPC
```
{{% /example %}}
{{% /examples %}}

## Import

Default VPCs can be imported using the `vpc id`, e.g.,

```sh
 $ pulumi import aws:ec2/defaultVpc:DefaultVpc default vpc-a01106c2
```

 
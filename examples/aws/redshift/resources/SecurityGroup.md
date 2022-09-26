{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const defaultSecurityGroup = new aws.redshift.SecurityGroup("default", {
    ingress: [{
        cidr: "10.0.0.0/24",
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

default = aws.redshift.SecurityGroup("default", ingress=[aws.redshift.SecurityGroupIngressArgs(
    cidr="10.0.0.0/24",
)])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var @default = new Aws.RedShift.SecurityGroup("default", new()
    {
        Ingress = new[]
        {
            new Aws.RedShift.Inputs.SecurityGroupIngressArgs
            {
                Cidr = "10.0.0.0/24",
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/redshift"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := redshift.NewSecurityGroup(ctx, "default", &redshift.SecurityGroupArgs{
			Ingress: redshift.SecurityGroupIngressArray{
				&redshift.SecurityGroupIngressArgs{
					Cidr: pulumi.String("10.0.0.0/24"),
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
import com.pulumi.aws.redshift.SecurityGroup;
import com.pulumi.aws.redshift.SecurityGroupArgs;
import com.pulumi.aws.redshift.inputs.SecurityGroupIngressArgs;
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
        var default_ = new SecurityGroup("default", SecurityGroupArgs.builder()        
            .ingress(SecurityGroupIngressArgs.builder()
                .cidr("10.0.0.0/24")
                .build())
            .build());

    }
}
```
```yaml
resources:
  default:
    type: aws:redshift:SecurityGroup
    properties:
      ingress:
        - cidr: 10.0.0.0/24
```
{{% /example %}}
{{% /examples %}}

## Import

Redshift security groups can be imported using the `name`, e.g.,

```sh
 $ pulumi import aws:redshift/securityGroup:SecurityGroup testgroup1 redshift_test_group
```

 
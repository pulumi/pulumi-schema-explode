{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const barSecurityGroup = new aws.ec2.SecurityGroup("barSecurityGroup", {});
const barElasticache_securityGroupSecurityGroup = new aws.elasticache.SecurityGroup("barElasticache/securityGroupSecurityGroup", {securityGroupNames: [barSecurityGroup.name]});
```
```python
import pulumi
import pulumi_aws as aws

bar_security_group = aws.ec2.SecurityGroup("barSecurityGroup")
bar_elasticache_security_group_security_group = aws.elasticache.SecurityGroup("barElasticache/securityGroupSecurityGroup", security_group_names=[bar_security_group.name])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var barSecurityGroup = new Aws.Ec2.SecurityGroup("barSecurityGroup");

    var barElasticache_securityGroupSecurityGroup = new Aws.ElastiCache.SecurityGroup("barElasticache/securityGroupSecurityGroup", new()
    {
        SecurityGroupNames = new[]
        {
            barSecurityGroup.Name,
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ec2"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/elasticache"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		barSecurityGroup, err := ec2.NewSecurityGroup(ctx, "barSecurityGroup", nil)
		if err != nil {
			return err
		}
		_, err = elasticache.NewSecurityGroup(ctx, "barElasticache/securityGroupSecurityGroup", &elasticache.SecurityGroupArgs{
			SecurityGroupNames: pulumi.StringArray{
				barSecurityGroup.Name,
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
import com.pulumi.aws.elasticache.SecurityGroup;
import com.pulumi.aws.elasticache.SecurityGroupArgs;
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
        var barSecurityGroup = new SecurityGroup("barSecurityGroup");

        var barElasticache_securityGroupSecurityGroup = new SecurityGroup("barElasticache/securityGroupSecurityGroup", SecurityGroupArgs.builder()        
            .securityGroupNames(barSecurityGroup.name())
            .build());

    }
}
```
```yaml
resources:
  barSecurityGroup:
    type: aws:ec2:SecurityGroup
  barElasticache/securityGroupSecurityGroup:
    type: aws:elasticache:SecurityGroup
    properties:
      securityGroupNames:
        - ${barSecurityGroup.name}
```
{{% /example %}}
{{% /examples %}}

## Import

ElastiCache Security Groups can be imported by name, e.g.,

```sh
 $ pulumi import aws:elasticache/securityGroup:SecurityGroup my_ec_security_group ec-security-group-1
```

 
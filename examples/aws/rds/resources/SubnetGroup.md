Provides an RDS DB subnet group resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const _default = new aws.rds.SubnetGroup("default", {
    subnetIds: [
        aws_subnet.frontend.id,
        aws_subnet.backend.id,
    ],
    tags: {
        Name: "My DB subnet group",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

default = aws.rds.SubnetGroup("default",
    subnet_ids=[
        aws_subnet["frontend"]["id"],
        aws_subnet["backend"]["id"],
    ],
    tags={
        "Name": "My DB subnet group",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var @default = new Aws.Rds.SubnetGroup("default", new()
    {
        SubnetIds = new[]
        {
            aws_subnet.Frontend.Id,
            aws_subnet.Backend.Id,
        },
        Tags = 
        {
            { "Name", "My DB subnet group" },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/rds"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := rds.NewSubnetGroup(ctx, "default", &rds.SubnetGroupArgs{
			SubnetIds: pulumi.StringArray{
				pulumi.Any(aws_subnet.Frontend.Id),
				pulumi.Any(aws_subnet.Backend.Id),
			},
			Tags: pulumi.StringMap{
				"Name": pulumi.String("My DB subnet group"),
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
import com.pulumi.aws.rds.SubnetGroup;
import com.pulumi.aws.rds.SubnetGroupArgs;
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
        var default_ = new SubnetGroup("default", SubnetGroupArgs.builder()        
            .subnetIds(            
                aws_subnet.frontend().id(),
                aws_subnet.backend().id())
            .tags(Map.of("Name", "My DB subnet group"))
            .build());

    }
}
```
```yaml
resources:
  default:
    type: aws:rds:SubnetGroup
    properties:
      subnetIds:
        - ${aws_subnet.frontend.id}
        - ${aws_subnet.backend.id}
      tags:
        Name: My DB subnet group
```
{{% /example %}}
{{% /examples %}}

## Import

DB Subnet groups can be imported using the `name`, e.g.,

```sh
 $ pulumi import aws:rds/subnetGroup:SubnetGroup default production-subnet-group
```

 
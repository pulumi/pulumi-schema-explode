{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const defaultParameterGroup = new aws.rds.ParameterGroup("default", {
    family: "mysql5.6",
    parameters: [
        {
            name: "character_set_server",
            value: "utf8",
        },
        {
            name: "character_set_client",
            value: "utf8",
        },
    ],
});
```
```python
import pulumi
import pulumi_aws as aws

default = aws.rds.ParameterGroup("default",
    family="mysql5.6",
    parameters=[
        aws.rds.ParameterGroupParameterArgs(
            name="character_set_server",
            value="utf8",
        ),
        aws.rds.ParameterGroupParameterArgs(
            name="character_set_client",
            value="utf8",
        ),
    ])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var @default = new Aws.Rds.ParameterGroup("default", new()
    {
        Family = "mysql5.6",
        Parameters = new[]
        {
            new Aws.Rds.Inputs.ParameterGroupParameterArgs
            {
                Name = "character_set_server",
                Value = "utf8",
            },
            new Aws.Rds.Inputs.ParameterGroupParameterArgs
            {
                Name = "character_set_client",
                Value = "utf8",
            },
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
		_, err := rds.NewParameterGroup(ctx, "default", &rds.ParameterGroupArgs{
			Family: pulumi.String("mysql5.6"),
			Parameters: rds.ParameterGroupParameterArray{
				&rds.ParameterGroupParameterArgs{
					Name:  pulumi.String("character_set_server"),
					Value: pulumi.String("utf8"),
				},
				&rds.ParameterGroupParameterArgs{
					Name:  pulumi.String("character_set_client"),
					Value: pulumi.String("utf8"),
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
import com.pulumi.aws.rds.ParameterGroup;
import com.pulumi.aws.rds.ParameterGroupArgs;
import com.pulumi.aws.rds.inputs.ParameterGroupParameterArgs;
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
        var default_ = new ParameterGroup("default", ParameterGroupArgs.builder()        
            .family("mysql5.6")
            .parameters(            
                ParameterGroupParameterArgs.builder()
                    .name("character_set_server")
                    .value("utf8")
                    .build(),
                ParameterGroupParameterArgs.builder()
                    .name("character_set_client")
                    .value("utf8")
                    .build())
            .build());

    }
}
```
```yaml
resources:
  default:
    type: aws:rds:ParameterGroup
    properties:
      family: mysql5.6
      parameters:
        - name: character_set_server
          value: utf8
        - name: character_set_client
          value: utf8
```
{{% /example %}}
{{% /examples %}}

## Import

DB Parameter groups can be imported using the `name`, e.g.,

```sh
 $ pulumi import aws:rds/parameterGroup:ParameterGroup rds_pg rds-pg
```

 
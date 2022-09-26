Provides information for multiple EC2 Transit Gateway Route Tables, such as their identifiers.

{{% examples %}}
## Example Usage
{{% example %}}

The following shows outputing all Transit Gateway Route Table Ids.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleTransitGatewayRouteTables = aws.ec2.getTransitGatewayRouteTables({});
export const example = data.aws_ec2_transit_gateway_route_table.example.ids;
```
```python
import pulumi
import pulumi_aws as aws

example_transit_gateway_route_tables = aws.ec2.get_transit_gateway_route_tables()
pulumi.export("example", data["aws_ec2_transit_gateway_route_table"]["example"]["ids"])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleTransitGatewayRouteTables = Aws.Ec2.GetTransitGatewayRouteTables.Invoke();

    return new Dictionary<string, object?>
    {
        ["example"] = data.Aws_ec2_transit_gateway_route_table.Example.Ids,
    };
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
		_, err := ec2.GetTransitGatewayRouteTables(ctx, nil, nil)
		if err != nil {
			return err
		}
		ctx.Export("example", data.Aws_ec2_transit_gateway_route_table.Example.Ids)
		return nil
	})
}
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.ec2.Ec2Functions;
import com.pulumi.aws.ec2.inputs.GetTransitGatewayRouteTablesArgs;
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
        final var exampleTransitGatewayRouteTables = Ec2Functions.getTransitGatewayRouteTables();

        ctx.export("example", data.aws_ec2_transit_gateway_route_table().example().ids());
    }
}
```
```yaml
variables:
  exampleTransitGatewayRouteTables:
    Fn::Invoke:
      Function: aws:ec2:getTransitGatewayRouteTables
      Arguments: {}
outputs:
  example: ${data.aws_ec2_transit_gateway_route_table.example.ids}
```
{{% /example %}}
{{% /examples %}}
Retrieve information about a Direct Connect Gateway.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = pulumi.output(aws.directconnect.getGateway({
    name: "example",
}));
```
```python
import pulumi
import pulumi_aws as aws

example = aws.directconnect.get_gateway(name="example")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = Aws.DirectConnect.GetGateway.Invoke(new()
    {
        Name = "example",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/directconnect"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := directconnect.LookupGateway(ctx, &directconnect.LookupGatewayArgs{
			Name: "example",
		}, nil)
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
import com.pulumi.aws.directconnect.DirectconnectFunctions;
import com.pulumi.aws.directconnect.inputs.GetGatewayArgs;
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
        final var example = DirectconnectFunctions.getGateway(GetGatewayArgs.builder()
            .name("example")
            .build());

    }
}
```
```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:directconnect:getGateway
      Arguments:
        name: example
```
{{% /example %}}
{{% /examples %}}
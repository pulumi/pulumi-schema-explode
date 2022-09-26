Provides a Connection of Direct Connect.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const hoge = new aws.directconnect.Connection("hoge", {
    bandwidth: "1Gbps",
    location: "EqDC2",
});
```
```python
import pulumi
import pulumi_aws as aws

hoge = aws.directconnect.Connection("hoge",
    bandwidth="1Gbps",
    location="EqDC2")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var hoge = new Aws.DirectConnect.Connection("hoge", new()
    {
        Bandwidth = "1Gbps",
        Location = "EqDC2",
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
		_, err := directconnect.NewConnection(ctx, "hoge", &directconnect.ConnectionArgs{
			Bandwidth: pulumi.String("1Gbps"),
			Location:  pulumi.String("EqDC2"),
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
import com.pulumi.aws.directconnect.Connection;
import com.pulumi.aws.directconnect.ConnectionArgs;
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
        var hoge = new Connection("hoge", ConnectionArgs.builder()        
            .bandwidth("1Gbps")
            .location("EqDC2")
            .build());

    }
}
```
```yaml
resources:
  hoge:
    type: aws:directconnect:Connection
    properties:
      bandwidth: 1Gbps
      location: EqDC2
```
{{% /example %}}
{{% /examples %}}

## Import

Direct Connect connections can be imported using the `connection id`, e.g.,

```sh
 $ pulumi import aws:directconnect/connection:Connection test_connection dxcon-ffre0ec3
```

 
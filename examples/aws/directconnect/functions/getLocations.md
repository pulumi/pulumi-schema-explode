Retrieve information about the AWS Direct Connect locations in the current AWS Region.
These are the locations that can be specified when configuring [`aws.directconnect.Connection`](https://www.terraform.io/docs/providers/aws/r/dx_connection.html) or [`aws.directconnect.LinkAggregationGroup`](https://www.terraform.io/docs/providers/aws/r/dx_lag.html) resources.

> **Note:** This data source is different from the [`aws.directconnect.getLocation`](https://www.terraform.io/docs/providers/aws/d/dx_location.html) data source which retrieves information about a specific AWS Direct Connect location in the current AWS Region.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const available = pulumi.output(aws.directconnect.getLocations());
```
```python
import pulumi
import pulumi_aws as aws

available = aws.directconnect.get_locations()
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var available = Aws.DirectConnect.GetLocations.Invoke();

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
		_, err := directconnect.GetLocations(ctx, nil, nil)
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
        final var available = DirectconnectFunctions.getLocations();

    }
}
```
```yaml
variables:
  available:
    Fn::Invoke:
      Function: aws:directconnect:getLocations
      Arguments: {}
```
{{% /example %}}
{{% /examples %}}
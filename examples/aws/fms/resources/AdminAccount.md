Provides a resource to associate/disassociate an AWS Firewall Manager administrator account. This operation must be performed in the `us-east-1` region.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.fms.AdminAccount("example", {});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.fms.AdminAccount("example")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Fms.AdminAccount("example");

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/fms"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := fms.NewAdminAccount(ctx, "example", nil)
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
import com.pulumi.aws.fms.AdminAccount;
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
        var example = new AdminAccount("example");

    }
}
```
```yaml
resources:
  example:
    type: aws:fms:AdminAccount
```
{{% /example %}}
{{% /examples %}}

## Import

Firewall Manager administrator account association can be imported using the account ID, e.g.,

```sh
 $ pulumi import aws:fms/adminAccount:AdminAccount example 123456789012
```

 
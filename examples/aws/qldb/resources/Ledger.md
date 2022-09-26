Provides an AWS Quantum Ledger Database (QLDB) resource

> **NOTE:** Deletion protection is enabled by default. To successfully delete this resource via this provider, `deletion_protection = false` must be applied before attempting deletion.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const sample_ledger = new aws.qldb.Ledger("sample-ledger", {
    permissionsMode: "STANDARD",
});
```
```python
import pulumi
import pulumi_aws as aws

sample_ledger = aws.qldb.Ledger("sample-ledger", permissions_mode="STANDARD")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var sample_ledger = new Aws.Qldb.Ledger("sample-ledger", new()
    {
        PermissionsMode = "STANDARD",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/qldb"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := qldb.NewLedger(ctx, "sample-ledger", &qldb.LedgerArgs{
			PermissionsMode: pulumi.String("STANDARD"),
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
import com.pulumi.aws.qldb.Ledger;
import com.pulumi.aws.qldb.LedgerArgs;
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
        var sample_ledger = new Ledger("sample-ledger", LedgerArgs.builder()        
            .permissionsMode("STANDARD")
            .build());

    }
}
```
```yaml
resources:
  sample-ledger:
    type: aws:qldb:Ledger
    properties:
      permissionsMode: STANDARD
```
{{% /example %}}
{{% /examples %}}

## Import

QLDB Ledgers can be imported using the `name`, e.g.,

```sh
 $ pulumi import aws:qldb/ledger:Ledger sample-ledger sample-ledger
```

 
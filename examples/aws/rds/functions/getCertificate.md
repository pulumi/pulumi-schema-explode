Information about an RDS Certificate.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = pulumi.output(aws.rds.getCertificate({
    latestValidTill: true,
}));
```
```python
import pulumi
import pulumi_aws as aws

example = aws.rds.get_certificate(latest_valid_till=True)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = Aws.Rds.GetCertificate.Invoke(new()
    {
        LatestValidTill = true,
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
		_, err := rds.GetCertificate(ctx, &rds.GetCertificateArgs{
			LatestValidTill: pulumi.BoolRef(true),
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
import com.pulumi.aws.rds.RdsFunctions;
import com.pulumi.aws.acm.inputs.GetCertificateArgs;
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
        final var example = RdsFunctions.getCertificate(GetCertificateArgs.builder()
            .latestValidTill(true)
            .build());

    }
}
```
```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:rds:getCertificate
      Arguments:
        latestValidTill: true
```
{{% /example %}}
{{% /examples %}}
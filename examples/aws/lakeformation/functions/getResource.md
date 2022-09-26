Provides details about a Lake Formation resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = pulumi.output(aws.lakeformation.getResource({
    arn: "arn:aws:s3:::tf-acc-test-9151654063908211878",
}));
```
```python
import pulumi
import pulumi_aws as aws

example = aws.lakeformation.get_resource(arn="arn:aws:s3:::tf-acc-test-9151654063908211878")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = Aws.LakeFormation.GetResource.Invoke(new()
    {
        Arn = "arn:aws:s3:::tf-acc-test-9151654063908211878",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lakeformation"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := lakeformation.LookupResource(ctx, &lakeformation.LookupResourceArgs{
			Arn: "arn:aws:s3:::tf-acc-test-9151654063908211878",
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
import com.pulumi.aws.lakeformation.LakeformationFunctions;
import com.pulumi.aws.apigateway.inputs.GetResourceArgs;
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
        final var example = LakeformationFunctions.getResource(GetResourceArgs.builder()
            .arn("arn:aws:s3:::tf-acc-test-9151654063908211878")
            .build());

    }
}
```
```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:lakeformation:getResource
      Arguments:
        arn: arn:aws:s3:::tf-acc-test-9151654063908211878
```
{{% /example %}}
{{% /examples %}}
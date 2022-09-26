Provides details about an Image Builder Distribution Configuration.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = pulumi.output(aws.imagebuilder.getDistributionConfiguration({
    arn: "arn:aws:imagebuilder:us-west-2:aws:distribution-configuration/example",
}));
```
```python
import pulumi
import pulumi_aws as aws

example = aws.imagebuilder.get_distribution_configuration(arn="arn:aws:imagebuilder:us-west-2:aws:distribution-configuration/example")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = Aws.ImageBuilder.GetDistributionConfiguration.Invoke(new()
    {
        Arn = "arn:aws:imagebuilder:us-west-2:aws:distribution-configuration/example",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/imagebuilder"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := imagebuilder.LookupDistributionConfiguration(ctx, &imagebuilder.LookupDistributionConfigurationArgs{
			Arn: "arn:aws:imagebuilder:us-west-2:aws:distribution-configuration/example",
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
import com.pulumi.aws.imagebuilder.ImagebuilderFunctions;
import com.pulumi.aws.imagebuilder.inputs.GetDistributionConfigurationArgs;
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
        final var example = ImagebuilderFunctions.getDistributionConfiguration(GetDistributionConfigurationArgs.builder()
            .arn("arn:aws:imagebuilder:us-west-2:aws:distribution-configuration/example")
            .build());

    }
}
```
```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:imagebuilder:getDistributionConfiguration
      Arguments:
        arn: arn:aws:imagebuilder:us-west-2:aws:distribution-configuration/example
```
{{% /example %}}
{{% /examples %}}
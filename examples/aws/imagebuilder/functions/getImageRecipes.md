Use this data source to get the ARNs and names of Image Builder Image Recipes matching the specified criteria.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = pulumi.output(aws.imagebuilder.getImageRecipes({
    filters: [{
        name: "platform",
        values: ["Linux"],
    }],
    owner: "Self",
}));
```
```python
import pulumi
import pulumi_aws as aws

example = aws.imagebuilder.get_image_recipes(filters=[aws.imagebuilder.GetImageRecipesFilterArgs(
        name="platform",
        values=["Linux"],
    )],
    owner="Self")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = Aws.ImageBuilder.GetImageRecipes.Invoke(new()
    {
        Filters = new[]
        {
            new Aws.ImageBuilder.Inputs.GetImageRecipesFilterInputArgs
            {
                Name = "platform",
                Values = new[]
                {
                    "Linux",
                },
            },
        },
        Owner = "Self",
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
		_, err := imagebuilder.GetImageRecipes(ctx, &imagebuilder.GetImageRecipesArgs{
			Filters: []imagebuilder.GetImageRecipesFilter{
				imagebuilder.GetImageRecipesFilter{
					Name: "platform",
					Values: []string{
						"Linux",
					},
				},
			},
			Owner: pulumi.StringRef("Self"),
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
import com.pulumi.aws.imagebuilder.inputs.GetImageRecipesArgs;
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
        final var example = ImagebuilderFunctions.getImageRecipes(GetImageRecipesArgs.builder()
            .filters(GetImageRecipesFilterArgs.builder()
                .name("platform")
                .values("Linux")
                .build())
            .owner("Self")
            .build());

    }
}
```
```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:imagebuilder:getImageRecipes
      Arguments:
        filters:
          - name: platform
            values:
              - Linux
        owner: Self
```
{{% /example %}}
{{% /examples %}}
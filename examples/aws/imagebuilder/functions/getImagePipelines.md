Use this data source to get the ARNs and names of Image Builder Image Pipelines matching the specified criteria.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = pulumi.output(aws.imagebuilder.getImagePipelines({
    filters: [{
        name: "name",
        values: ["example"],
    }],
}));
```
```python
import pulumi
import pulumi_aws as aws

example = aws.imagebuilder.get_image_pipelines(filters=[aws.imagebuilder.GetImagePipelinesFilterArgs(
    name="name",
    values=["example"],
)])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = Aws.ImageBuilder.GetImagePipelines.Invoke(new()
    {
        Filters = new[]
        {
            new Aws.ImageBuilder.Inputs.GetImagePipelinesFilterInputArgs
            {
                Name = "name",
                Values = new[]
                {
                    "example",
                },
            },
        },
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
		_, err := imagebuilder.GetImagePipelines(ctx, &imagebuilder.GetImagePipelinesArgs{
			Filters: []imagebuilder.GetImagePipelinesFilter{
				imagebuilder.GetImagePipelinesFilter{
					Name: "name",
					Values: []string{
						"example",
					},
				},
			},
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
import com.pulumi.aws.imagebuilder.inputs.GetImagePipelinesArgs;
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
        final var example = ImagebuilderFunctions.getImagePipelines(GetImagePipelinesArgs.builder()
            .filters(GetImagePipelinesFilterArgs.builder()
                .name("name")
                .values("example")
                .build())
            .build());

    }
}
```
```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:imagebuilder:getImagePipelines
      Arguments:
        filters:
          - name: name
            values:
              - example
```
{{% /example %}}
{{% /examples %}}
Provides a AWS Transfer Workflow resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.transfer.Workflow("example", {
    steps: [{
        deleteStepDetails: {
            name: "example",
            sourceFileLocation: "${original.file}",
        },
        type: "DELETE",
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.transfer.Workflow("example", steps=[aws.transfer.WorkflowStepArgs(
    delete_step_details=aws.transfer.WorkflowStepDeleteStepDetailsArgs(
        name="example",
        source_file_location=original["file"],
    ),
    type="DELETE",
)])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Transfer.Workflow("example", new()
    {
        Steps = new[]
        {
            new Aws.Transfer.Inputs.WorkflowStepArgs
            {
                DeleteStepDetails = new Aws.Transfer.Inputs.WorkflowStepDeleteStepDetailsArgs
                {
                    Name = "example",
                    SourceFileLocation = original.File,
                },
                Type = "DELETE",
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/transfer"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := transfer.NewWorkflow(ctx, "example", &transfer.WorkflowArgs{
			Steps: transfer.WorkflowStepArray{
				&transfer.WorkflowStepArgs{
					DeleteStepDetails: &transfer.WorkflowStepDeleteStepDetailsArgs{
						Name:               pulumi.String("example"),
						SourceFileLocation: pulumi.Any(original.File),
					},
					Type: pulumi.String("DELETE"),
				},
			},
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
import com.pulumi.aws.transfer.Workflow;
import com.pulumi.aws.transfer.WorkflowArgs;
import com.pulumi.aws.transfer.inputs.WorkflowStepArgs;
import com.pulumi.aws.transfer.inputs.WorkflowStepDeleteStepDetailsArgs;
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
        var example = new Workflow("example", WorkflowArgs.builder()        
            .steps(WorkflowStepArgs.builder()
                .deleteStepDetails(WorkflowStepDeleteStepDetailsArgs.builder()
                    .name("example")
                    .sourceFileLocation(original.file())
                    .build())
                .type("DELETE")
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:transfer:Workflow
    properties:
      steps:
        - deleteStepDetails:
            name: example
            sourceFileLocation: ${original.file}
          type: DELETE
```
{{% /example %}}
{{% /examples %}}

## Import

Transfer Workflows can be imported using the `worflow_id`.

```sh
 $ pulumi import aws:transfer/workflow:Workflow example example
```

 
Information about an RDS engine version.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const test = pulumi.output(aws.rds.getEngineVersion({
    engine: "mysql",
    filters: [{
        name: "engine-mode",
        values: ["provisioned"],
    }],
    preferredVersions: [
        "5.7.42",
        "5.7.19",
        "5.7.17",
    ],
}));
```
```python
import pulumi
import pulumi_aws as aws

test = aws.rds.get_engine_version(engine="mysql",
    filters=[aws.rds.GetEngineVersionFilterArgs(
        name="engine-mode",
        values=["provisioned"],
    )],
    preferred_versions=[
        "5.7.42",
        "5.7.19",
        "5.7.17",
    ])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var test = Aws.Rds.GetEngineVersion.Invoke(new()
    {
        Engine = "mysql",
        Filters = new[]
        {
            new Aws.Rds.Inputs.GetEngineVersionFilterInputArgs
            {
                Name = "engine-mode",
                Values = new[]
                {
                    "provisioned",
                },
            },
        },
        PreferredVersions = new[]
        {
            "5.7.42",
            "5.7.19",
            "5.7.17",
        },
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
		_, err := rds.GetEngineVersion(ctx, &rds.GetEngineVersionArgs{
			Engine: "mysql",
			Filters: []rds.GetEngineVersionFilter{
				rds.GetEngineVersionFilter{
					Name: "engine-mode",
					Values: []string{
						"provisioned",
					},
				},
			},
			PreferredVersions: []string{
				"5.7.42",
				"5.7.19",
				"5.7.17",
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
import com.pulumi.aws.rds.RdsFunctions;
import com.pulumi.aws.docdb.inputs.GetEngineVersionArgs;
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
        final var test = RdsFunctions.getEngineVersion(GetEngineVersionArgs.builder()
            .engine("mysql")
            .filters(%!v(PANIC=Format method: runtime error: invalid memory address or nil pointer dereference))
            .preferredVersions(            
                "5.7.42",
                "5.7.19",
                "5.7.17")
            .build());

    }
}
```
```yaml
variables:
  test:
    Fn::Invoke:
      Function: aws:rds:getEngineVersion
      Arguments:
        engine: mysql
        filters:
          - name: engine-mode
            values:
              - provisioned
        preferredVersions:
          - 5.7.42
          - 5.7.19
          - 5.7.17
```
{{% /example %}}
{{% /examples %}}
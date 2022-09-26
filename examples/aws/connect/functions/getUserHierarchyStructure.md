Provides details about a specific Amazon Connect User Hierarchy Structure

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const test = aws.connect.getUserHierarchyStructure({
    instanceId: aws_connect_instance.test.id,
});
```
```python
import pulumi
import pulumi_aws as aws

test = aws.connect.get_user_hierarchy_structure(instance_id=aws_connect_instance["test"]["id"])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var test = Aws.Connect.GetUserHierarchyStructure.Invoke(new()
    {
        InstanceId = aws_connect_instance.Test.Id,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/connect"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := connect.LookupUserHierarchyStructure(ctx, &connect.LookupUserHierarchyStructureArgs{
			InstanceId: aws_connect_instance.Test.Id,
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
import com.pulumi.aws.connect.ConnectFunctions;
import com.pulumi.aws.connect.inputs.GetUserHierarchyStructureArgs;
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
        final var test = ConnectFunctions.getUserHierarchyStructure(GetUserHierarchyStructureArgs.builder()
            .instanceId(aws_connect_instance.test().id())
            .build());

    }
}
```
```yaml
variables:
  test:
    Fn::Invoke:
      Function: aws:connect:getUserHierarchyStructure
      Arguments:
        instanceId: ${aws_connect_instance.test.id}
```
{{% /example %}}
{{% /examples %}}
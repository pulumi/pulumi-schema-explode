Provides information about a MemoryDB Cluster.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = pulumi.output(aws.memorydb.getCluster({
    name: "my-cluster",
}));
```
```python
import pulumi
import pulumi_aws as aws

example = aws.memorydb.get_cluster(name="my-cluster")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = Aws.MemoryDb.GetCluster.Invoke(new()
    {
        Name = "my-cluster",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/memorydb"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := memorydb.LookupCluster(ctx, &memorydb.LookupClusterArgs{
			Name: "my-cluster",
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
import com.pulumi.aws.memorydb.MemorydbFunctions;
import com.pulumi.aws.cloudhsmv2.inputs.GetClusterArgs;
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
        final var example = MemorydbFunctions.getCluster(GetClusterArgs.builder()
            .name("my-cluster")
            .build());

    }
}
```
```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:memorydb:getCluster
      Arguments:
        name: my-cluster
```
{{% /example %}}
{{% /examples %}}
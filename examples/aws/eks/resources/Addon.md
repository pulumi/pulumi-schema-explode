Manages an EKS add-on.

> **Note:** Amazon EKS add-on can only be used with Amazon EKS Clusters
running version 1.18 with platform version eks.3 or later
because add-ons rely on the Server-side Apply Kubernetes feature,
which is only available in Kubernetes 1.18 and later.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.eks.Addon("example", {
    clusterName: aws_eks_cluster.example.name,
    addonName: "vpc-cni",
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.eks.Addon("example",
    cluster_name=aws_eks_cluster["example"]["name"],
    addon_name="vpc-cni")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Eks.Addon("example", new()
    {
        ClusterName = aws_eks_cluster.Example.Name,
        AddonName = "vpc-cni",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/eks"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := eks.NewAddon(ctx, "example", &eks.AddonArgs{
			ClusterName: pulumi.Any(aws_eks_cluster.Example.Name),
			AddonName:   pulumi.String("vpc-cni"),
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
import com.pulumi.aws.eks.Addon;
import com.pulumi.aws.eks.AddonArgs;
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
        var example = new Addon("example", AddonArgs.builder()        
            .clusterName(aws_eks_cluster.example().name())
            .addonName("vpc-cni")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:eks:Addon
    properties:
      clusterName: ${aws_eks_cluster.example.name}
      addonName: vpc-cni
```
{{% /example %}}
{{% /examples %}}

## Import

EKS add-on can be imported using the `cluster_name` and `addon_name` separated by a colon (`:`), e.g.,

```sh
 $ pulumi import aws:eks/addon:Addon my_eks_addon my_cluster_name:my_addon_name
```

 
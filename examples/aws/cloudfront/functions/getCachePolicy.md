Use this data source to retrieve information about a CloudFront cache policy.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = pulumi.output(aws.cloudfront.getCachePolicy({
    name: "example-policy",
}));
```
```python
import pulumi
import pulumi_aws as aws

example = aws.cloudfront.get_cache_policy(name="example-policy")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = Aws.CloudFront.GetCachePolicy.Invoke(new()
    {
        Name = "example-policy",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudfront"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := cloudfront.LookupCachePolicy(ctx, &cloudfront.LookupCachePolicyArgs{
			Name: pulumi.StringRef("example-policy"),
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
import com.pulumi.aws.cloudfront.CloudfrontFunctions;
import com.pulumi.aws.cloudfront.inputs.GetCachePolicyArgs;
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
        final var example = CloudfrontFunctions.getCachePolicy(GetCachePolicyArgs.builder()
            .name("example-policy")
            .build());

    }
}
```
```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:cloudfront:getCachePolicy
      Arguments:
        name: example-policy
```
{{% /example %}}
{{% /examples %}}
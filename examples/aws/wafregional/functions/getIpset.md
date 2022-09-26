`aws.wafregional.IpSet` Retrieves a WAF Regional IP Set Resource Id.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = pulumi.output(aws.wafregional.getIpset({
    name: "tfWAFRegionalIPSet",
}));
```
```python
import pulumi
import pulumi_aws as aws

example = aws.wafregional.get_ipset(name="tfWAFRegionalIPSet")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = Aws.WafRegional.GetIpset.Invoke(new()
    {
        Name = "tfWAFRegionalIPSet",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/wafregional"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := wafregional.GetIpset(ctx, &wafregional.GetIpsetArgs{
			Name: "tfWAFRegionalIPSet",
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
import com.pulumi.aws.wafregional.WafregionalFunctions;
import com.pulumi.aws.waf.inputs.GetIpsetArgs;
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
        final var example = WafregionalFunctions.getIpset(GetIpsetArgs.builder()
            .name("tfWAFRegionalIPSet")
            .build());

    }
}
```
```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:wafregional:getIpset
      Arguments:
        name: tfWAFRegionalIPSet
```
{{% /example %}}
{{% /examples %}}
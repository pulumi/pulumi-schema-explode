`aws.wafregional.WebAcl` Retrieves a WAF Regional Web ACL Resource Id.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = pulumi.output(aws.wafregional.getWebAcl({
    name: "tfWAFRegionalWebACL",
}));
```
```python
import pulumi
import pulumi_aws as aws

example = aws.wafregional.get_web_acl(name="tfWAFRegionalWebACL")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = Aws.WafRegional.GetWebAcl.Invoke(new()
    {
        Name = "tfWAFRegionalWebACL",
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
		_, err := wafregional.LookupWebAcl(ctx, &wafregional.LookupWebAclArgs{
			Name: "tfWAFRegionalWebACL",
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
import com.pulumi.aws.waf.inputs.GetWebAclArgs;
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
        final var example = WafregionalFunctions.getWebAcl(GetWebAclArgs.builder()
            .name("tfWAFRegionalWebACL")
            .build());

    }
}
```
```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:wafregional:getWebAcl
      Arguments:
        name: tfWAFRegionalWebACL
```
{{% /example %}}
{{% /examples %}}
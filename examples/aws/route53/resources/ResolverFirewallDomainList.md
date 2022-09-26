Provides a Route 53 Resolver DNS Firewall domain list resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.route53.ResolverFirewallDomainList("example", {});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.route53.ResolverFirewallDomainList("example")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Route53.ResolverFirewallDomainList("example");

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/route53"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := route53.NewResolverFirewallDomainList(ctx, "example", nil)
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
import com.pulumi.aws.route53.ResolverFirewallDomainList;
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
        var example = new ResolverFirewallDomainList("example");

    }
}
```
```yaml
resources:
  example:
    type: aws:route53:ResolverFirewallDomainList
```
{{% /example %}}
{{% /examples %}}

## Import

 Route 53 Resolver DNS Firewall domain lists can be imported using the Route 53 Resolver DNS Firewall domain list ID, e.g.,

```sh
 $ pulumi import aws:route53/resolverFirewallDomainList:ResolverFirewallDomainList example rslvr-fdl-0123456789abcdef
```

 
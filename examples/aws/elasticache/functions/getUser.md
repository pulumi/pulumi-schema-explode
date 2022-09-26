Use this data source to get information about an Elasticache User.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bar = pulumi.output(aws.elasticache.getUser({
    userId: "example",
}));
```
```python
import pulumi
import pulumi_aws as aws

bar = aws.elasticache.get_user(user_id="example")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var bar = Aws.ElastiCache.GetUser.Invoke(new()
    {
        UserId = "example",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/elasticache"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := elasticache.LookupUser(ctx, &elasticache.LookupUserArgs{
			UserId: "example",
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
import com.pulumi.aws.elasticache.ElasticacheFunctions;
import com.pulumi.aws.elasticache.inputs.GetUserArgs;
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
        final var bar = ElasticacheFunctions.getUser(GetUserArgs.builder()
            .userId("example")
            .build());

    }
}
```
```yaml
variables:
  bar:
    Fn::Invoke:
      Function: aws:elasticache:getUser
      Arguments:
        userId: example
```
{{% /example %}}
{{% /examples %}}
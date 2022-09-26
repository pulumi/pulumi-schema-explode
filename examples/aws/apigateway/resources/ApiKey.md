Provides an API Gateway API Key.

> **NOTE:** Since the API Gateway usage plans feature was launched on August 11, 2016, usage plans are now **required** to associate an API key with an API stage.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const myDemoApiKey = new aws.apigateway.ApiKey("MyDemoApiKey", {});
```
```python
import pulumi
import pulumi_aws as aws

my_demo_api_key = aws.apigateway.ApiKey("myDemoApiKey")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var myDemoApiKey = new Aws.ApiGateway.ApiKey("myDemoApiKey");

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/apigateway"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := apigateway.NewApiKey(ctx, "myDemoApiKey", nil)
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
import com.pulumi.aws.apigateway.ApiKey;
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
        var myDemoApiKey = new ApiKey("myDemoApiKey");

    }
}
```
```yaml
resources:
  myDemoApiKey:
    type: aws:apigateway:ApiKey
```
{{% /example %}}
{{% /examples %}}

## Import

API Gateway Keys can be imported using the `id`, e.g.,

```sh
 $ pulumi import aws:apigateway/apiKey:ApiKey my_demo_key 8bklk8bl1k3sB38D9B3l0enyWT8c09B30lkq0blk
```

 
Use this data source to get the name and value of a pre-existing API Key, for
example to supply credentials for a dependency microservice.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const myApiKey = pulumi.output(aws.apigateway.getKey({
    id: "ru3mpjgse6",
}));
```
```python
import pulumi
import pulumi_aws as aws

my_api_key = aws.apigateway.get_key(id="ru3mpjgse6")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var myApiKey = Aws.ApiGateway.GetKey.Invoke(new()
    {
        Id = "ru3mpjgse6",
    });

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
		_, err := apigateway.GetKey(ctx, &apigateway.GetKeyArgs{
			Id: "ru3mpjgse6",
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
import com.pulumi.aws.apigateway.ApigatewayFunctions;
import com.pulumi.aws.apigateway.inputs.GetKeyArgs;
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
        final var myApiKey = ApigatewayFunctions.getKey(GetKeyArgs.builder()
            .id("ru3mpjgse6")
            .build());

    }
}
```
```yaml
variables:
  myApiKey:
    Fn::Invoke:
      Function: aws:apigateway:getKey
      Arguments:
        id: ru3mpjgse6
```
{{% /example %}}
{{% /examples %}}
Provides details about a specific Amazon API Gateway Version 2 API.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = pulumi.output(aws.apigatewayv2.getApi({
    apiId: "aabbccddee",
}));
```
```python
import pulumi
import pulumi_aws as aws

example = aws.apigatewayv2.get_api(api_id="aabbccddee")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = Aws.ApiGatewayV2.GetApi.Invoke(new()
    {
        ApiId = "aabbccddee",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/apigatewayv2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := apigatewayv2.LookupApi(ctx, &apigatewayv2.LookupApiArgs{
			ApiId: "aabbccddee",
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
import com.pulumi.aws.apigatewayv2.Apigatewayv2Functions;
import com.pulumi.aws.apigatewayv2.inputs.GetApiArgs;
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
        final var example = Apigatewayv2Functions.getApi(GetApiArgs.builder()
            .apiId("aabbccddee")
            .build());

    }
}
```
```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:apigatewayv2:getApi
      Arguments:
        apiId: aabbccddee
```
{{% /example %}}
{{% /examples %}}
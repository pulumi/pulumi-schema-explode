Manages an Amazon API Gateway Version 2 route response.
More information can be found in the [Amazon API Gateway Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api.html).

{{% examples %}}
## Example Usage
{{% example %}}
### Basic

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.apigatewayv2.RouteResponse("example", {
    apiId: aws_apigatewayv2_api.example.id,
    routeId: aws_apigatewayv2_route.example.id,
    routeResponseKey: `$default`,
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.apigatewayv2.RouteResponse("example",
    api_id=aws_apigatewayv2_api["example"]["id"],
    route_id=aws_apigatewayv2_route["example"]["id"],
    route_response_key="$default")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.ApiGatewayV2.RouteResponse("example", new()
    {
        ApiId = aws_apigatewayv2_api.Example.Id,
        RouteId = aws_apigatewayv2_route.Example.Id,
        RouteResponseKey = "$default",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/apigatewayv2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := apigatewayv2.NewRouteResponse(ctx, "example", &apigatewayv2.RouteResponseArgs{
			ApiId:            pulumi.Any(aws_apigatewayv2_api.Example.Id),
			RouteId:          pulumi.Any(aws_apigatewayv2_route.Example.Id),
			RouteResponseKey: pulumi.String(fmt.Sprintf("$default")),
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
import com.pulumi.aws.apigatewayv2.RouteResponse;
import com.pulumi.aws.apigatewayv2.RouteResponseArgs;
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
        var example = new RouteResponse("example", RouteResponseArgs.builder()        
            .apiId(aws_apigatewayv2_api.example().id())
            .routeId(aws_apigatewayv2_route.example().id())
            .routeResponseKey("$default")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:apigatewayv2:RouteResponse
    properties:
      apiId: ${aws_apigatewayv2_api.example.id}
      routeId: ${aws_apigatewayv2_route.example.id}
      routeResponseKey: $default
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_apigatewayv2_route_response` can be imported by using the API identifier, route identifier and route response identifier, e.g.,

```sh
 $ pulumi import aws:apigatewayv2/routeResponse:RouteResponse example aabbccddee/1122334/998877
```

 
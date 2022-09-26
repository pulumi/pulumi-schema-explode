Manages an Amazon API Gateway Version 2 stage.
More information can be found in the [Amazon API Gateway Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api.html).

{{% examples %}}
## Example Usage
{{% example %}}
### Basic

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.apigatewayv2.Stage("example", {apiId: aws_apigatewayv2_api.example.id});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.apigatewayv2.Stage("example", api_id=aws_apigatewayv2_api["example"]["id"])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.ApiGatewayV2.Stage("example", new()
    {
        ApiId = aws_apigatewayv2_api.Example.Id,
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
		_, err := apigatewayv2.NewStage(ctx, "example", &apigatewayv2.StageArgs{
			ApiId: pulumi.Any(aws_apigatewayv2_api.Example.Id),
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
import com.pulumi.aws.apigatewayv2.Stage;
import com.pulumi.aws.apigatewayv2.StageArgs;
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
        var example = new Stage("example", StageArgs.builder()        
            .apiId(aws_apigatewayv2_api.example().id())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:apigatewayv2:Stage
    properties:
      apiId: ${aws_apigatewayv2_api.example.id}
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_apigatewayv2_stage` can be imported by using the API identifier and stage name, e.g.,

```sh
 $ pulumi import aws:apigatewayv2/stage:Stage example aabbccddee/example-stage
```

 
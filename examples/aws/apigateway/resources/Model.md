Provides a Model for a REST API Gateway.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const myDemoAPI = new aws.apigateway.RestApi("myDemoAPI", {description: "This is my API for demonstration purposes"});
const myDemoModel = new aws.apigateway.Model("myDemoModel", {
    restApi: myDemoAPI.id,
    description: "a JSON schema",
    contentType: "application/json",
    schema: `{
  "type": "object"
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

my_demo_api = aws.apigateway.RestApi("myDemoAPI", description="This is my API for demonstration purposes")
my_demo_model = aws.apigateway.Model("myDemoModel",
    rest_api=my_demo_api.id,
    description="a JSON schema",
    content_type="application/json",
    schema="""{
  "type": "object"
}
""")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var myDemoAPI = new Aws.ApiGateway.RestApi("myDemoAPI", new()
    {
        Description = "This is my API for demonstration purposes",
    });

    var myDemoModel = new Aws.ApiGateway.Model("myDemoModel", new()
    {
        RestApi = myDemoAPI.Id,
        Description = "a JSON schema",
        ContentType = "application/json",
        Schema = @"{
  ""type"": ""object""
}
",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/apigateway"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		myDemoAPI, err := apigateway.NewRestApi(ctx, "myDemoAPI", &apigateway.RestApiArgs{
			Description: pulumi.String("This is my API for demonstration purposes"),
		})
		if err != nil {
			return err
		}
		_, err = apigateway.NewModel(ctx, "myDemoModel", &apigateway.ModelArgs{
			RestApi:     myDemoAPI.ID(),
			Description: pulumi.String("a JSON schema"),
			ContentType: pulumi.String("application/json"),
			Schema:      pulumi.String(fmt.Sprintf("{\n  \"type\": \"object\"\n}\n")),
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
import com.pulumi.aws.apigateway.RestApi;
import com.pulumi.aws.apigateway.RestApiArgs;
import com.pulumi.aws.apigateway.Model;
import com.pulumi.aws.apigateway.ModelArgs;
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
        var myDemoAPI = new RestApi("myDemoAPI", RestApiArgs.builder()        
            .description("This is my API for demonstration purposes")
            .build());

        var myDemoModel = new Model("myDemoModel", ModelArgs.builder()        
            .restApi(myDemoAPI.id())
            .description("a JSON schema")
            .contentType("application/json")
            .schema("""
{
  "type": "object"
}
            """)
            .build());

    }
}
```
```yaml
resources:
  myDemoAPI:
    type: aws:apigateway:RestApi
    properties:
      description: This is my API for demonstration purposes
  myDemoModel:
    type: aws:apigateway:Model
    properties:
      restApi: ${myDemoAPI.id}
      description: a JSON schema
      contentType: application/json
      schema: |
        {
          "type": "object"
        }
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_api_gateway_model` can be imported using `REST-API-ID/NAME`, e.g.,

```sh
 $ pulumi import aws:apigateway/model:Model example 12345abcde/example
```

 
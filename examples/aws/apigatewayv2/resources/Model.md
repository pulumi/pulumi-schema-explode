Manages an Amazon API Gateway Version 2 [model](https://docs.aws.amazon.com/apigateway/latest/developerguide/models-mappings.html#models-mappings-models).

{{% examples %}}
## Example Usage
{{% example %}}
### Basic

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.apigatewayv2.Model("example", {
    apiId: aws_apigatewayv2_api.example.id,
    contentType: "application/json",
    schema: `{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "ExampleModel",
  "type": "object",
  "properties": {
    "id": { "type": "string" }
  }
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.apigatewayv2.Model("example",
    api_id=aws_apigatewayv2_api["example"]["id"],
    content_type="application/json",
    schema="""{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "ExampleModel",
  "type": "object",
  "properties": {
    "id": { "type": "string" }
  }
}
""")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.ApiGatewayV2.Model("example", new()
    {
        ApiId = aws_apigatewayv2_api.Example.Id,
        ContentType = "application/json",
        Schema = @"{
  ""$schema"": ""http://json-schema.org/draft-04/schema#"",
  ""title"": ""ExampleModel"",
  ""type"": ""object"",
  ""properties"": {
    ""id"": { ""type"": ""string"" }
  }
}
",
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
		_, err := apigatewayv2.NewModel(ctx, "example", &apigatewayv2.ModelArgs{
			ApiId:       pulumi.Any(aws_apigatewayv2_api.Example.Id),
			ContentType: pulumi.String("application/json"),
			Schema: pulumi.String(fmt.Sprintf(`{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "ExampleModel",
  "type": "object",
  "properties": {
    "id": { "type": "string" }
  }
}
`)),
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
import com.pulumi.aws.apigatewayv2.Model;
import com.pulumi.aws.apigatewayv2.ModelArgs;
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
        var example = new Model("example", ModelArgs.builder()        
            .apiId(aws_apigatewayv2_api.example().id())
            .contentType("application/json")
            .schema("""
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "ExampleModel",
  "type": "object",
  "properties": {
    "id": { "type": "string" }
  }
}
            """)
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:apigatewayv2:Model
    properties:
      apiId: ${aws_apigatewayv2_api.example.id}
      contentType: application/json
      schema: |
        {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "title": "ExampleModel",
          "type": "object",
          "properties": {
            "id": { "type": "string" }
          }
        }
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_apigatewayv2_model` can be imported by using the API identifier and model identifier, e.g.,

```sh
 $ pulumi import aws:apigatewayv2/model:Model example aabbccddee/1122334
```

 
Provides an HTTP Method Integration Response for an API Gateway Resource.

> **Note:** Depends on having `aws.apigateway.Integration` inside your rest api. To ensure this
you might need to add an explicit `depends_on` for clean runs.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const myDemoAPI = new aws.apigateway.RestApi("myDemoAPI", {description: "This is my API for demonstration purposes"});
const myDemoResource = new aws.apigateway.Resource("myDemoResource", {
    restApi: myDemoAPI.id,
    parentId: myDemoAPI.rootResourceId,
    pathPart: "mydemoresource",
});
const myDemoMethod = new aws.apigateway.Method("myDemoMethod", {
    restApi: myDemoAPI.id,
    resourceId: myDemoResource.id,
    httpMethod: "GET",
    authorization: "NONE",
});
const myDemoIntegration = new aws.apigateway.Integration("myDemoIntegration", {
    restApi: myDemoAPI.id,
    resourceId: myDemoResource.id,
    httpMethod: myDemoMethod.httpMethod,
    type: "MOCK",
});
const response200 = new aws.apigateway.MethodResponse("response200", {
    restApi: myDemoAPI.id,
    resourceId: myDemoResource.id,
    httpMethod: myDemoMethod.httpMethod,
    statusCode: "200",
});
const myDemoIntegrationResponse = new aws.apigateway.IntegrationResponse("myDemoIntegrationResponse", {
    restApi: myDemoAPI.id,
    resourceId: myDemoResource.id,
    httpMethod: myDemoMethod.httpMethod,
    statusCode: response200.statusCode,
    responseTemplates: {
        "application/xml": `#set($inputRoot = $input.path('$'))
<?xml version="1.0" encoding="UTF-8"?>
<message>
    $inputRoot.body
</message>
`,
    },
});
```
```python
import pulumi
import pulumi_aws as aws

my_demo_api = aws.apigateway.RestApi("myDemoAPI", description="This is my API for demonstration purposes")
my_demo_resource = aws.apigateway.Resource("myDemoResource",
    rest_api=my_demo_api.id,
    parent_id=my_demo_api.root_resource_id,
    path_part="mydemoresource")
my_demo_method = aws.apigateway.Method("myDemoMethod",
    rest_api=my_demo_api.id,
    resource_id=my_demo_resource.id,
    http_method="GET",
    authorization="NONE")
my_demo_integration = aws.apigateway.Integration("myDemoIntegration",
    rest_api=my_demo_api.id,
    resource_id=my_demo_resource.id,
    http_method=my_demo_method.http_method,
    type="MOCK")
response200 = aws.apigateway.MethodResponse("response200",
    rest_api=my_demo_api.id,
    resource_id=my_demo_resource.id,
    http_method=my_demo_method.http_method,
    status_code="200")
my_demo_integration_response = aws.apigateway.IntegrationResponse("myDemoIntegrationResponse",
    rest_api=my_demo_api.id,
    resource_id=my_demo_resource.id,
    http_method=my_demo_method.http_method,
    status_code=response200.status_code,
    response_templates={
        "application/xml": """#set($inputRoot = $input.path('$'))
<?xml version="1.0" encoding="UTF-8"?>
<message>
    $inputRoot.body
</message>
""",
    })
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

    var myDemoResource = new Aws.ApiGateway.Resource("myDemoResource", new()
    {
        RestApi = myDemoAPI.Id,
        ParentId = myDemoAPI.RootResourceId,
        PathPart = "mydemoresource",
    });

    var myDemoMethod = new Aws.ApiGateway.Method("myDemoMethod", new()
    {
        RestApi = myDemoAPI.Id,
        ResourceId = myDemoResource.Id,
        HttpMethod = "GET",
        Authorization = "NONE",
    });

    var myDemoIntegration = new Aws.ApiGateway.Integration("myDemoIntegration", new()
    {
        RestApi = myDemoAPI.Id,
        ResourceId = myDemoResource.Id,
        HttpMethod = myDemoMethod.HttpMethod,
        Type = "MOCK",
    });

    var response200 = new Aws.ApiGateway.MethodResponse("response200", new()
    {
        RestApi = myDemoAPI.Id,
        ResourceId = myDemoResource.Id,
        HttpMethod = myDemoMethod.HttpMethod,
        StatusCode = "200",
    });

    var myDemoIntegrationResponse = new Aws.ApiGateway.IntegrationResponse("myDemoIntegrationResponse", new()
    {
        RestApi = myDemoAPI.Id,
        ResourceId = myDemoResource.Id,
        HttpMethod = myDemoMethod.HttpMethod,
        StatusCode = response200.StatusCode,
        ResponseTemplates = 
        {
            { "application/xml", @"#set($inputRoot = $input.path('$'))
<?xml version=""1.0"" encoding=""UTF-8""?>
<message>
    $inputRoot.body
</message>
" },
        },
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
		myDemoResource, err := apigateway.NewResource(ctx, "myDemoResource", &apigateway.ResourceArgs{
			RestApi:  myDemoAPI.ID(),
			ParentId: myDemoAPI.RootResourceId,
			PathPart: pulumi.String("mydemoresource"),
		})
		if err != nil {
			return err
		}
		myDemoMethod, err := apigateway.NewMethod(ctx, "myDemoMethod", &apigateway.MethodArgs{
			RestApi:       myDemoAPI.ID(),
			ResourceId:    myDemoResource.ID(),
			HttpMethod:    pulumi.String("GET"),
			Authorization: pulumi.String("NONE"),
		})
		if err != nil {
			return err
		}
		_, err = apigateway.NewIntegration(ctx, "myDemoIntegration", &apigateway.IntegrationArgs{
			RestApi:    myDemoAPI.ID(),
			ResourceId: myDemoResource.ID(),
			HttpMethod: myDemoMethod.HttpMethod,
			Type:       pulumi.String("MOCK"),
		})
		if err != nil {
			return err
		}
		response200, err := apigateway.NewMethodResponse(ctx, "response200", &apigateway.MethodResponseArgs{
			RestApi:    myDemoAPI.ID(),
			ResourceId: myDemoResource.ID(),
			HttpMethod: myDemoMethod.HttpMethod,
			StatusCode: pulumi.String("200"),
		})
		if err != nil {
			return err
		}
		_, err = apigateway.NewIntegrationResponse(ctx, "myDemoIntegrationResponse", &apigateway.IntegrationResponseArgs{
			RestApi:    myDemoAPI.ID(),
			ResourceId: myDemoResource.ID(),
			HttpMethod: myDemoMethod.HttpMethod,
			StatusCode: response200.StatusCode,
			ResponseTemplates: pulumi.StringMap{
				"application/xml": pulumi.String(fmt.Sprintf("#set($inputRoot = $input.path('$'))\n<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<message>\n    $inputRoot.body\n</message>\n")),
			},
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
import com.pulumi.aws.apigateway.Resource;
import com.pulumi.aws.apigateway.ResourceArgs;
import com.pulumi.aws.apigateway.Method;
import com.pulumi.aws.apigateway.MethodArgs;
import com.pulumi.aws.apigateway.Integration;
import com.pulumi.aws.apigateway.IntegrationArgs;
import com.pulumi.aws.apigateway.MethodResponse;
import com.pulumi.aws.apigateway.MethodResponseArgs;
import com.pulumi.aws.apigateway.IntegrationResponse;
import com.pulumi.aws.apigateway.IntegrationResponseArgs;
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

        var myDemoResource = new Resource("myDemoResource", ResourceArgs.builder()        
            .restApi(myDemoAPI.id())
            .parentId(myDemoAPI.rootResourceId())
            .pathPart("mydemoresource")
            .build());

        var myDemoMethod = new Method("myDemoMethod", MethodArgs.builder()        
            .restApi(myDemoAPI.id())
            .resourceId(myDemoResource.id())
            .httpMethod("GET")
            .authorization("NONE")
            .build());

        var myDemoIntegration = new Integration("myDemoIntegration", IntegrationArgs.builder()        
            .restApi(myDemoAPI.id())
            .resourceId(myDemoResource.id())
            .httpMethod(myDemoMethod.httpMethod())
            .type("MOCK")
            .build());

        var response200 = new MethodResponse("response200", MethodResponseArgs.builder()        
            .restApi(myDemoAPI.id())
            .resourceId(myDemoResource.id())
            .httpMethod(myDemoMethod.httpMethod())
            .statusCode("200")
            .build());

        var myDemoIntegrationResponse = new IntegrationResponse("myDemoIntegrationResponse", IntegrationResponseArgs.builder()        
            .restApi(myDemoAPI.id())
            .resourceId(myDemoResource.id())
            .httpMethod(myDemoMethod.httpMethod())
            .statusCode(response200.statusCode())
            .responseTemplates(Map.of("application/xml", """
#set($inputRoot = $input.path('$'))
<?xml version="1.0" encoding="UTF-8"?>
<message>
    $inputRoot.body
</message>
            """))
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
  myDemoResource:
    type: aws:apigateway:Resource
    properties:
      restApi: ${myDemoAPI.id}
      parentId: ${myDemoAPI.rootResourceId}
      pathPart: mydemoresource
  myDemoMethod:
    type: aws:apigateway:Method
    properties:
      restApi: ${myDemoAPI.id}
      resourceId: ${myDemoResource.id}
      httpMethod: GET
      authorization: NONE
  myDemoIntegration:
    type: aws:apigateway:Integration
    properties:
      restApi: ${myDemoAPI.id}
      resourceId: ${myDemoResource.id}
      httpMethod: ${myDemoMethod.httpMethod}
      type: MOCK
  response200:
    type: aws:apigateway:MethodResponse
    properties:
      restApi: ${myDemoAPI.id}
      resourceId: ${myDemoResource.id}
      httpMethod: ${myDemoMethod.httpMethod}
      statusCode: 200
  myDemoIntegrationResponse:
    type: aws:apigateway:IntegrationResponse
    properties:
      restApi: ${myDemoAPI.id}
      resourceId: ${myDemoResource.id}
      httpMethod: ${myDemoMethod.httpMethod}
      statusCode: ${response200.statusCode}
      # Transforms the backend JSON response to XML
      responseTemplates:
        application/xml: |
          #set($inputRoot = $input.path('$'))
          <?xml version="1.0" encoding="UTF-8"?>
          <message>
              $inputRoot.body
          </message>
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_api_gateway_integration_response` can be imported using `REST-API-ID/RESOURCE-ID/HTTP-METHOD/STATUS-CODE`, e.g.,

```sh
 $ pulumi import aws:apigateway/integrationResponse:IntegrationResponse example 12345abcde/67890fghij/GET/200
```

 
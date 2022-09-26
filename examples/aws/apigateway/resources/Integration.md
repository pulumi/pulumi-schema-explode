Provides an HTTP Method Integration for an API Gateway Integration.

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
    cacheKeyParameters: ["method.request.path.param"],
    cacheNamespace: "foobar",
    timeoutMilliseconds: 29000,
    requestParameters: {
        "integration.request.header.X-Authorization": "'static'",
    },
    requestTemplates: {
        "application/xml": `{
   "body" : $input.json('$')
}
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
    type="MOCK",
    cache_key_parameters=["method.request.path.param"],
    cache_namespace="foobar",
    timeout_milliseconds=29000,
    request_parameters={
        "integration.request.header.X-Authorization": "'static'",
    },
    request_templates={
        "application/xml": """{
   "body" : $input.json('$')
}
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
        CacheKeyParameters = new[]
        {
            "method.request.path.param",
        },
        CacheNamespace = "foobar",
        TimeoutMilliseconds = 29000,
        RequestParameters = 
        {
            { "integration.request.header.X-Authorization", "'static'" },
        },
        RequestTemplates = 
        {
            { "application/xml", @"{
   ""body"" : $input.json('$')
}
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
			CacheKeyParameters: pulumi.StringArray{
				pulumi.String("method.request.path.param"),
			},
			CacheNamespace:      pulumi.String("foobar"),
			TimeoutMilliseconds: pulumi.Int(29000),
			RequestParameters: pulumi.StringMap{
				"integration.request.header.X-Authorization": pulumi.String("'static'"),
			},
			RequestTemplates: pulumi.StringMap{
				"application/xml": pulumi.String(fmt.Sprintf("{\n   \"body\" : $input.json('$')\n}\n")),
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
            .cacheKeyParameters("method.request.path.param")
            .cacheNamespace("foobar")
            .timeoutMilliseconds(29000)
            .requestParameters(Map.of("integration.request.header.X-Authorization", "'static'"))
            .requestTemplates(Map.of("application/xml", """
{
   "body" : $input.json('$')
}
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
      cacheKeyParameters:
        - method.request.path.param
      cacheNamespace: foobar
      timeoutMilliseconds: 29000
      requestParameters:
        integration.request.header.X-Authorization: '''static'''
      # Transforms the incoming XML request to JSON
      requestTemplates:
        application/xml: |
          {
             "body" : $input.json('$')
          }
```
{{% /example %}}
{{% /examples %}}
## Lambda integration

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const config = new pulumi.Config();
const myregion = config.requireObject("myregion");
const accountId = config.requireObject("accountId");
// API Gateway
const api = new aws.apigateway.RestApi("api", {});
const resource = new aws.apigateway.Resource("resource", {
    pathPart: "resource",
    parentId: api.rootResourceId,
    restApi: api.id,
});
const method = new aws.apigateway.Method("method", {
    restApi: api.id,
    resourceId: resource.id,
    httpMethod: "GET",
    authorization: "NONE",
});
// IAM
const role = new aws.iam.Role("role", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
`});
const lambda = new aws.lambda.Function("lambda", {
    code: new pulumi.asset.FileArchive("lambda.zip"),
    role: role.arn,
    handler: "lambda.lambda_handler",
    runtime: "python3.7",
});
const integration = new aws.apigateway.Integration("integration", {
    restApi: api.id,
    resourceId: resource.id,
    httpMethod: method.httpMethod,
    integrationHttpMethod: "POST",
    type: "AWS_PROXY",
    uri: lambda.invokeArn,
});
// Lambda
const apigwLambda = new aws.lambda.Permission("apigwLambda", {
    action: "lambda:InvokeFunction",
    "function": lambda.name,
    principal: "apigateway.amazonaws.com",
    sourceArn: pulumi.interpolate`arn:aws:execute-api:${myregion}:${accountId}:${api.id}/*/${method.httpMethod}${resource.path}`,
});
```
```python
import pulumi
import pulumi_aws as aws

config = pulumi.Config()
myregion = config.require_object("myregion")
account_id = config.require_object("accountId")
# API Gateway
api = aws.apigateway.RestApi("api")
resource = aws.apigateway.Resource("resource",
    path_part="resource",
    parent_id=api.root_resource_id,
    rest_api=api.id)
method = aws.apigateway.Method("method",
    rest_api=api.id,
    resource_id=resource.id,
    http_method="GET",
    authorization="NONE")
# IAM
role = aws.iam.Role("role", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
""")
lambda_ = aws.lambda_.Function("lambda",
    code=pulumi.FileArchive("lambda.zip"),
    role=role.arn,
    handler="lambda.lambda_handler",
    runtime="python3.7")
integration = aws.apigateway.Integration("integration",
    rest_api=api.id,
    resource_id=resource.id,
    http_method=method.http_method,
    integration_http_method="POST",
    type="AWS_PROXY",
    uri=lambda_.invoke_arn)
# Lambda
apigw_lambda = aws.lambda_.Permission("apigwLambda",
    action="lambda:InvokeFunction",
    function=lambda_.name,
    principal="apigateway.amazonaws.com",
    source_arn=pulumi.Output.all(api.id, method.http_method, resource.path).apply(lambda id, http_method, path: f"arn:aws:execute-api:{myregion}:{account_id}:{id}/*/{http_method}{path}"))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var config = new Config();
    var myregion = config.RequireObject<dynamic>("myregion");
    var accountId = config.RequireObject<dynamic>("accountId");
    // API Gateway
    var api = new Aws.ApiGateway.RestApi("api");

    var resource = new Aws.ApiGateway.Resource("resource", new()
    {
        PathPart = "resource",
        ParentId = api.RootResourceId,
        RestApi = api.Id,
    });

    var method = new Aws.ApiGateway.Method("method", new()
    {
        RestApi = api.Id,
        ResourceId = resource.Id,
        HttpMethod = "GET",
        Authorization = "NONE",
    });

    // IAM
    var role = new Aws.Iam.Role("role", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Action"": ""sts:AssumeRole"",
      ""Principal"": {
        ""Service"": ""lambda.amazonaws.com""
      },
      ""Effect"": ""Allow"",
      ""Sid"": """"
    }
  ]
}
",
    });

    var lambda = new Aws.Lambda.Function("lambda", new()
    {
        Code = new FileArchive("lambda.zip"),
        Role = role.Arn,
        Handler = "lambda.lambda_handler",
        Runtime = "python3.7",
    });

    var integration = new Aws.ApiGateway.Integration("integration", new()
    {
        RestApi = api.Id,
        ResourceId = resource.Id,
        HttpMethod = method.HttpMethod,
        IntegrationHttpMethod = "POST",
        Type = "AWS_PROXY",
        Uri = lambda.InvokeArn,
    });

    // Lambda
    var apigwLambda = new Aws.Lambda.Permission("apigwLambda", new()
    {
        Action = "lambda:InvokeFunction",
        Function = lambda.Name,
        Principal = "apigateway.amazonaws.com",
        SourceArn = Output.Tuple(api.Id, method.HttpMethod, resource.Path).Apply(values =>
        {
            var id = values.Item1;
            var httpMethod = values.Item2;
            var path = values.Item3;
            return $"arn:aws:execute-api:{myregion}:{accountId}:{id}/*/{httpMethod}{path}";
        }),
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/apigateway"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lambda"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi/config"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		cfg := config.New(ctx, "")
		myregion := cfg.RequireObject("myregion")
		accountId := cfg.RequireObject("accountId")
		api, err := apigateway.NewRestApi(ctx, "api", nil)
		if err != nil {
			return err
		}
		resource, err := apigateway.NewResource(ctx, "resource", &apigateway.ResourceArgs{
			PathPart: pulumi.String("resource"),
			ParentId: api.RootResourceId,
			RestApi:  api.ID(),
		})
		if err != nil {
			return err
		}
		method, err := apigateway.NewMethod(ctx, "method", &apigateway.MethodArgs{
			RestApi:       api.ID(),
			ResourceId:    resource.ID(),
			HttpMethod:    pulumi.String("GET"),
			Authorization: pulumi.String("NONE"),
		})
		if err != nil {
			return err
		}
		role, err := iam.NewRole(ctx, "role", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
`)),
		})
		if err != nil {
			return err
		}
		lambda, err := lambda.NewFunction(ctx, "lambda", &lambda.FunctionArgs{
			Code:    pulumi.NewFileArchive("lambda.zip"),
			Role:    role.Arn,
			Handler: pulumi.String("lambda.lambda_handler"),
			Runtime: pulumi.String("python3.7"),
		})
		if err != nil {
			return err
		}
		_, err = apigateway.NewIntegration(ctx, "integration", &apigateway.IntegrationArgs{
			RestApi:               api.ID(),
			ResourceId:            resource.ID(),
			HttpMethod:            method.HttpMethod,
			IntegrationHttpMethod: pulumi.String("POST"),
			Type:                  pulumi.String("AWS_PROXY"),
			Uri:                   lambda.InvokeArn,
		})
		if err != nil {
			return err
		}
		_, err = lambda.NewPermission(ctx, "apigwLambda", &lambda.PermissionArgs{
			Action:    pulumi.String("lambda:InvokeFunction"),
			Function:  lambda.Name,
			Principal: pulumi.String("apigateway.amazonaws.com"),
			SourceArn: pulumi.All(api.ID(), method.HttpMethod, resource.Path).ApplyT(func(_args []interface{}) (string, error) {
				id := _args[0].(string)
				httpMethod := _args[1].(string)
				path := _args[2].(string)
				return fmt.Sprintf("arn:aws:execute-api:%v:%v:%v/*/%v%v", myregion, accountId, id, httpMethod, path), nil
			}).(pulumi.StringOutput),
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
import com.pulumi.aws.apigateway.Resource;
import com.pulumi.aws.apigateway.ResourceArgs;
import com.pulumi.aws.apigateway.Method;
import com.pulumi.aws.apigateway.MethodArgs;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.lambda.Function;
import com.pulumi.aws.lambda.FunctionArgs;
import com.pulumi.aws.apigateway.Integration;
import com.pulumi.aws.apigateway.IntegrationArgs;
import com.pulumi.aws.lambda.Permission;
import com.pulumi.aws.lambda.PermissionArgs;
import com.pulumi.asset.FileArchive;
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
        final var config = ctx.config();
        final var myregion = config.get("myregion");
        final var accountId = config.get("accountId");
        var api = new RestApi("api");

        var resource = new Resource("resource", ResourceArgs.builder()        
            .pathPart("resource")
            .parentId(api.rootResourceId())
            .restApi(api.id())
            .build());

        var method = new Method("method", MethodArgs.builder()        
            .restApi(api.id())
            .resourceId(resource.id())
            .httpMethod("GET")
            .authorization("NONE")
            .build());

        var role = new Role("role", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
            """)
            .build());

        var lambda = new Function("lambda", FunctionArgs.builder()        
            .code(new FileArchive("lambda.zip"))
            .role(role.arn())
            .handler("lambda.lambda_handler")
            .runtime("python3.7")
            .build());

        var integration = new Integration("integration", IntegrationArgs.builder()        
            .restApi(api.id())
            .resourceId(resource.id())
            .httpMethod(method.httpMethod())
            .integrationHttpMethod("POST")
            .type("AWS_PROXY")
            .uri(lambda.invokeArn())
            .build());

        var apigwLambda = new Permission("apigwLambda", PermissionArgs.builder()        
            .action("lambda:InvokeFunction")
            .function(lambda.name())
            .principal("apigateway.amazonaws.com")
            .sourceArn(Output.tuple(api.id(), method.httpMethod(), resource.path()).applyValue(values -> {
                var id = values.t1;
                var httpMethod = values.t2;
                var path = values.t3;
                return String.format("arn:aws:execute-api:%s:%s:%s/*/%s%s", myregion,accountId,id,httpMethod,path);
            }))
            .build());

    }
}
```
```yaml
configuration:
  # Variables
  myregion:
    type: dynamic
  accountId:
    type: dynamic
resources:
  # API Gateway
  api:
    type: aws:apigateway:RestApi
  resource:
    type: aws:apigateway:Resource
    properties:
      pathPart: resource
      parentId: ${api.rootResourceId}
      restApi: ${api.id}
  method:
    type: aws:apigateway:Method
    properties:
      restApi: ${api.id}
      resourceId: ${resource.id}
      httpMethod: GET
      authorization: NONE
  integration:
    type: aws:apigateway:Integration
    properties:
      restApi: ${api.id}
      resourceId: ${resource.id}
      httpMethod: ${method.httpMethod}
      integrationHttpMethod: POST
      type: AWS_PROXY
      uri: ${lambda.invokeArn}
  # Lambda
  apigwLambda:
    type: aws:lambda:Permission
    properties:
      action: lambda:InvokeFunction
      function: ${lambda.name}
      principal: apigateway.amazonaws.com
      # More: http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html
      sourceArn: arn:aws:execute-api:${myregion}:${accountId}:${api.id}/*/${method.httpMethod}${resource.path}
  lambda:
    type: aws:lambda:Function
    properties:
      code:
        Fn::FileArchive: lambda.zip
      role: ${role.arn}
      handler: lambda.lambda_handler
      runtime: python3.7
  # IAM
  role:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              },
              "Effect": "Allow",
              "Sid": ""
            }
          ]
        }
```

## VPC Link

```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.lb.LoadBalancer;
import com.pulumi.aws.lb.LoadBalancerArgs;
import com.pulumi.aws.apigateway.VpcLink;
import com.pulumi.aws.apigateway.VpcLinkArgs;
import com.pulumi.aws.apigateway.RestApi;
import com.pulumi.aws.apigateway.Resource;
import com.pulumi.aws.apigateway.ResourceArgs;
import com.pulumi.aws.apigateway.Method;
import com.pulumi.aws.apigateway.MethodArgs;
import com.pulumi.aws.apigateway.Integration;
import com.pulumi.aws.apigateway.IntegrationArgs;
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
        final var config = ctx.config();
        final var name = config.get("name");
        final var subnetId = config.get("subnetId");
        var testLoadBalancer = new LoadBalancer("testLoadBalancer", LoadBalancerArgs.builder()        
            .internal(true)
            .loadBalancerType("network")
            .subnets(subnetId)
            .build());

        var testVpcLink = new VpcLink("testVpcLink", VpcLinkArgs.builder()        
            .targetArn(testLoadBalancer.arn())
            .build());

        var testRestApi = new RestApi("testRestApi");

        var testResource = new Resource("testResource", ResourceArgs.builder()        
            .restApi(testRestApi.id())
            .parentId(testRestApi.rootResourceId())
            .pathPart("test")
            .build());

        var testMethod = new Method("testMethod", MethodArgs.builder()        
            .restApi(testRestApi.id())
            .resourceId(testResource.id())
            .httpMethod("GET")
            .authorization("NONE")
            .requestModels(Map.of("application/json", "Error"))
            .build());

        var testIntegration = new Integration("testIntegration", IntegrationArgs.builder()        
            .restApi(testRestApi.id())
            .resourceId(testResource.id())
            .httpMethod(testMethod.httpMethod())
            .requestTemplates(Map.ofEntries(
                Map.entry("application/json", ""),
                Map.entry("application/xml", """
#set($inputRoot = $input.path('$'))
{ }                """)
            ))
            .requestParameters(Map.ofEntries(
                Map.entry("integration.request.header.X-Authorization", "'static'"),
                Map.entry("integration.request.header.X-Foo", "'Bar'")
            ))
            .type("HTTP")
            .uri("https://www.google.de")
            .integrationHttpMethod("GET")
            .passthroughBehavior("WHEN_NO_MATCH")
            .contentHandling("CONVERT_TO_TEXT")
            .connectionType("VPC_LINK")
            .connectionId(testVpcLink.id())
            .build());

    }
}
```
```yaml
configuration:
  name:
    type: dynamic
  subnetId:
    type: dynamic
resources:
  testLoadBalancer:
    type: aws:lb:LoadBalancer
    properties:
      internal: true
      loadBalancerType: network
      subnets:
        - ${subnetId}
  testVpcLink:
    type: aws:apigateway:VpcLink
    properties:
      targetArn:
        - ${testLoadBalancer.arn}
  testRestApi:
    type: aws:apigateway:RestApi
  testResource:
    type: aws:apigateway:Resource
    properties:
      restApi: ${testRestApi.id}
      parentId: ${testRestApi.rootResourceId}
      pathPart: test
  testMethod:
    type: aws:apigateway:Method
    properties:
      restApi: ${testRestApi.id}
      resourceId: ${testResource.id}
      httpMethod: GET
      authorization: NONE
      requestModels:
        application/json: Error
  testIntegration:
    type: aws:apigateway:Integration
    properties:
      restApi: ${testRestApi.id}
      resourceId: ${testResource.id}
      httpMethod: ${testMethod.httpMethod}
      requestTemplates:
        application/json:
        application/xml: |-
          #set($inputRoot = $input.path('$'))
          { }
      requestParameters:
        integration.request.header.X-Authorization: '''static'''
        integration.request.header.X-Foo: '''Bar'''
      type: HTTP
      uri: https://www.google.de
      integrationHttpMethod: GET
      passthroughBehavior: WHEN_NO_MATCH
      contentHandling: CONVERT_TO_TEXT
      connectionType: VPC_LINK
      connectionId: ${testVpcLink.id}
```


## Import

`aws_api_gateway_integration` can be imported using `REST-API-ID/RESOURCE-ID/HTTP-METHOD`, e.g.,

```sh
 $ pulumi import aws:apigateway/integration:Integration example 12345abcde/67890fghij/GET
```

 
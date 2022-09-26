Provides an AppSync Function.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleGraphQLApi = new aws.appsync.GraphQLApi("exampleGraphQLApi", {
    authenticationType: "API_KEY",
    schema: `type Mutation {
  putPost(id: ID!, title: String!): Post
}

type Post {
  id: ID!
  title: String!
}

type Query {
  singlePost(id: ID!): Post
}

schema {
  query: Query
  mutation: Mutation
}
`,
});
const exampleDataSource = new aws.appsync.DataSource("exampleDataSource", {
    apiId: exampleGraphQLApi.id,
    name: "example",
    type: "HTTP",
    httpConfig: {
        endpoint: "http://example.com",
    },
});
const exampleFunction = new aws.appsync.Function("exampleFunction", {
    apiId: exampleGraphQLApi.id,
    dataSource: exampleDataSource.name,
    name: "example",
    requestMappingTemplate: `{
    "version": "2018-05-29",
    "method": "GET",
    "resourcePath": "/",
    "params":{
        "headers": $utils.http.copyheaders($ctx.request.headers)
    }
}
`,
    responseMappingTemplate: `#if($ctx.result.statusCode == 200)
    $ctx.result.body
#else
    $utils.appendError($ctx.result.body, $ctx.result.statusCode)
#end
`,
});
```
```python
import pulumi
import pulumi_aws as aws

example_graph_ql_api = aws.appsync.GraphQLApi("exampleGraphQLApi",
    authentication_type="API_KEY",
    schema="""type Mutation {
  putPost(id: ID!, title: String!): Post
}

type Post {
  id: ID!
  title: String!
}

type Query {
  singlePost(id: ID!): Post
}

schema {
  query: Query
  mutation: Mutation
}
""")
example_data_source = aws.appsync.DataSource("exampleDataSource",
    api_id=example_graph_ql_api.id,
    name="example",
    type="HTTP",
    http_config=aws.appsync.DataSourceHttpConfigArgs(
        endpoint="http://example.com",
    ))
example_function = aws.appsync.Function("exampleFunction",
    api_id=example_graph_ql_api.id,
    data_source=example_data_source.name,
    name="example",
    request_mapping_template="""{
    "version": "2018-05-29",
    "method": "GET",
    "resourcePath": "/",
    "params":{
        "headers": $utils.http.copyheaders($ctx.request.headers)
    }
}
""",
    response_mapping_template="""#if($ctx.result.statusCode == 200)
    $ctx.result.body
#else
    $utils.appendError($ctx.result.body, $ctx.result.statusCode)
#end
""")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleGraphQLApi = new Aws.AppSync.GraphQLApi("exampleGraphQLApi", new()
    {
        AuthenticationType = "API_KEY",
        Schema = @"type Mutation {
  putPost(id: ID!, title: String!): Post
}

type Post {
  id: ID!
  title: String!
}

type Query {
  singlePost(id: ID!): Post
}

schema {
  query: Query
  mutation: Mutation
}
",
    });

    var exampleDataSource = new Aws.AppSync.DataSource("exampleDataSource", new()
    {
        ApiId = exampleGraphQLApi.Id,
        Name = "example",
        Type = "HTTP",
        HttpConfig = new Aws.AppSync.Inputs.DataSourceHttpConfigArgs
        {
            Endpoint = "http://example.com",
        },
    });

    var exampleFunction = new Aws.AppSync.Function("exampleFunction", new()
    {
        ApiId = exampleGraphQLApi.Id,
        DataSource = exampleDataSource.Name,
        Name = "example",
        RequestMappingTemplate = @"{
    ""version"": ""2018-05-29"",
    ""method"": ""GET"",
    ""resourcePath"": ""/"",
    ""params"":{
        ""headers"": $utils.http.copyheaders($ctx.request.headers)
    }
}
",
        ResponseMappingTemplate = @"#if($ctx.result.statusCode == 200)
    $ctx.result.body
#else
    $utils.appendError($ctx.result.body, $ctx.result.statusCode)
#end
",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/appsync"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleGraphQLApi, err := appsync.NewGraphQLApi(ctx, "exampleGraphQLApi", &appsync.GraphQLApiArgs{
			AuthenticationType: pulumi.String("API_KEY"),
			Schema: pulumi.String(fmt.Sprintf(`type Mutation {
  putPost(id: ID!, title: String!): Post
}

type Post {
  id: ID!
  title: String!
}

type Query {
  singlePost(id: ID!): Post
}

schema {
  query: Query
  mutation: Mutation
}
`)),
		})
		if err != nil {
			return err
		}
		exampleDataSource, err := appsync.NewDataSource(ctx, "exampleDataSource", &appsync.DataSourceArgs{
			ApiId: exampleGraphQLApi.ID(),
			Name:  pulumi.String("example"),
			Type:  pulumi.String("HTTP"),
			HttpConfig: &appsync.DataSourceHttpConfigArgs{
				Endpoint: pulumi.String("http://example.com"),
			},
		})
		if err != nil {
			return err
		}
		_, err = appsync.NewFunction(ctx, "exampleFunction", &appsync.FunctionArgs{
			ApiId:      exampleGraphQLApi.ID(),
			DataSource: exampleDataSource.Name,
			Name:       pulumi.String("example"),
			RequestMappingTemplate: pulumi.String(fmt.Sprintf(`{
    "version": "2018-05-29",
    "method": "GET",
    "resourcePath": "/",
    "params":{
        "headers": $utils.http.copyheaders($ctx.request.headers)
    }
}
`)),
			ResponseMappingTemplate: pulumi.String(fmt.Sprintf("#if($ctx.result.statusCode == 200)\n    $ctx.result.body\n#else\n    $utils.appendError($ctx.result.body, $ctx.result.statusCode)\n#end\n")),
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
import com.pulumi.aws.appsync.GraphQLApi;
import com.pulumi.aws.appsync.GraphQLApiArgs;
import com.pulumi.aws.appsync.DataSource;
import com.pulumi.aws.appsync.DataSourceArgs;
import com.pulumi.aws.appsync.inputs.DataSourceHttpConfigArgs;
import com.pulumi.aws.appsync.Function;
import com.pulumi.aws.appsync.FunctionArgs;
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
        var exampleGraphQLApi = new GraphQLApi("exampleGraphQLApi", GraphQLApiArgs.builder()        
            .authenticationType("API_KEY")
            .schema("""
type Mutation {
  putPost(id: ID!, title: String!): Post
}

type Post {
  id: ID!
  title: String!
}

type Query {
  singlePost(id: ID!): Post
}

schema {
  query: Query
  mutation: Mutation
}
            """)
            .build());

        var exampleDataSource = new DataSource("exampleDataSource", DataSourceArgs.builder()        
            .apiId(exampleGraphQLApi.id())
            .name("example")
            .type("HTTP")
            .httpConfig(DataSourceHttpConfigArgs.builder()
                .endpoint("http://example.com")
                .build())
            .build());

        var exampleFunction = new Function("exampleFunction", FunctionArgs.builder()        
            .apiId(exampleGraphQLApi.id())
            .dataSource(exampleDataSource.name())
            .name("example")
            .requestMappingTemplate("""
{
    "version": "2018-05-29",
    "method": "GET",
    "resourcePath": "/",
    "params":{
        "headers": $utils.http.copyheaders($ctx.request.headers)
    }
}
            """)
            .responseMappingTemplate("""
#if($ctx.result.statusCode == 200)
    $ctx.result.body
#else
    $utils.appendError($ctx.result.body, $ctx.result.statusCode)
#end
            """)
            .build());

    }
}
```
```yaml
resources:
  exampleGraphQLApi:
    type: aws:appsync:GraphQLApi
    properties:
      authenticationType: API_KEY
      schema: |
        type Mutation {
          putPost(id: ID!, title: String!): Post
        }

        type Post {
          id: ID!
          title: String!
        }

        type Query {
          singlePost(id: ID!): Post
        }

        schema {
          query: Query
          mutation: Mutation
        }
  exampleDataSource:
    type: aws:appsync:DataSource
    properties:
      apiId: ${exampleGraphQLApi.id}
      name: example
      type: HTTP
      httpConfig:
        endpoint: http://example.com
  exampleFunction:
    type: aws:appsync:Function
    properties:
      apiId: ${exampleGraphQLApi.id}
      dataSource: ${exampleDataSource.name}
      name: example
      requestMappingTemplate: |
        {
            "version": "2018-05-29",
            "method": "GET",
            "resourcePath": "/",
            "params":{
                "headers": $utils.http.copyheaders($ctx.request.headers)
            }
        }
      responseMappingTemplate: |
        #if($ctx.result.statusCode == 200)
            $ctx.result.body
        #else
            $utils.appendError($ctx.result.body, $ctx.result.statusCode)
        #end
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_appsync_function` can be imported using the AppSync API ID and Function ID separated by `-`, e.g.,

```sh
 $ pulumi import aws:appsync/function:Function example xxxxx-yyyyy
```

 
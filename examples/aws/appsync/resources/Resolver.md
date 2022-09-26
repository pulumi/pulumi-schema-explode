Provides an AppSync Resolver.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const testGraphQLApi = new aws.appsync.GraphQLApi("testGraphQLApi", {
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
const testDataSource = new aws.appsync.DataSource("testDataSource", {
    apiId: testGraphQLApi.id,
    name: "tf_example",
    type: "HTTP",
    httpConfig: {
        endpoint: "http://example.com",
    },
});
// UNIT type resolver (default)
const testResolver = new aws.appsync.Resolver("testResolver", {
    apiId: testGraphQLApi.id,
    field: "singlePost",
    type: "Query",
    dataSource: testDataSource.name,
    requestTemplate: `{
    "version": "2018-05-29",
    "method": "GET",
    "resourcePath": "/",
    "params":{
        "headers": $utils.http.copyheaders($ctx.request.headers)
    }
}
`,
    responseTemplate: `#if($ctx.result.statusCode == 200)
    $ctx.result.body
#else
    $utils.appendError($ctx.result.body, $ctx.result.statusCode)
#end
`,
    cachingConfig: {
        cachingKeys: [
            `$context.identity.sub`,
            `$context.arguments.id`,
        ],
        ttl: 60,
    },
});
// PIPELINE type resolver
const mutationPipelineTest = new aws.appsync.Resolver("mutationPipelineTest", {
    type: "Mutation",
    apiId: testGraphQLApi.id,
    field: "pipelineTest",
    requestTemplate: "{}",
    responseTemplate: `$util.toJson($ctx.result)`,
    kind: "PIPELINE",
    pipelineConfig: {
        functions: [
            aws_appsync_function.test1.function_id,
            aws_appsync_function.test2.function_id,
            aws_appsync_function.test3.function_id,
        ],
    },
});
```
```python
import pulumi
import pulumi_aws as aws

test_graph_ql_api = aws.appsync.GraphQLApi("testGraphQLApi",
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
test_data_source = aws.appsync.DataSource("testDataSource",
    api_id=test_graph_ql_api.id,
    name="tf_example",
    type="HTTP",
    http_config=aws.appsync.DataSourceHttpConfigArgs(
        endpoint="http://example.com",
    ))
# UNIT type resolver (default)
test_resolver = aws.appsync.Resolver("testResolver",
    api_id=test_graph_ql_api.id,
    field="singlePost",
    type="Query",
    data_source=test_data_source.name,
    request_template="""{
    "version": "2018-05-29",
    "method": "GET",
    "resourcePath": "/",
    "params":{
        "headers": $utils.http.copyheaders($ctx.request.headers)
    }
}
""",
    response_template="""#if($ctx.result.statusCode == 200)
    $ctx.result.body
#else
    $utils.appendError($ctx.result.body, $ctx.result.statusCode)
#end
""",
    caching_config=aws.appsync.ResolverCachingConfigArgs(
        caching_keys=[
            "$context.identity.sub",
            "$context.arguments.id",
        ],
        ttl=60,
    ))
# PIPELINE type resolver
mutation_pipeline_test = aws.appsync.Resolver("mutationPipelineTest",
    type="Mutation",
    api_id=test_graph_ql_api.id,
    field="pipelineTest",
    request_template="{}",
    response_template="$util.toJson($ctx.result)",
    kind="PIPELINE",
    pipeline_config=aws.appsync.ResolverPipelineConfigArgs(
        functions=[
            aws_appsync_function["test1"]["function_id"],
            aws_appsync_function["test2"]["function_id"],
            aws_appsync_function["test3"]["function_id"],
        ],
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var testGraphQLApi = new Aws.AppSync.GraphQLApi("testGraphQLApi", new()
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

    var testDataSource = new Aws.AppSync.DataSource("testDataSource", new()
    {
        ApiId = testGraphQLApi.Id,
        Name = "tf_example",
        Type = "HTTP",
        HttpConfig = new Aws.AppSync.Inputs.DataSourceHttpConfigArgs
        {
            Endpoint = "http://example.com",
        },
    });

    // UNIT type resolver (default)
    var testResolver = new Aws.AppSync.Resolver("testResolver", new()
    {
        ApiId = testGraphQLApi.Id,
        Field = "singlePost",
        Type = "Query",
        DataSource = testDataSource.Name,
        RequestTemplate = @"{
    ""version"": ""2018-05-29"",
    ""method"": ""GET"",
    ""resourcePath"": ""/"",
    ""params"":{
        ""headers"": $utils.http.copyheaders($ctx.request.headers)
    }
}
",
        ResponseTemplate = @"#if($ctx.result.statusCode == 200)
    $ctx.result.body
#else
    $utils.appendError($ctx.result.body, $ctx.result.statusCode)
#end
",
        CachingConfig = new Aws.AppSync.Inputs.ResolverCachingConfigArgs
        {
            CachingKeys = new[]
            {
                "$context.identity.sub",
                "$context.arguments.id",
            },
            Ttl = 60,
        },
    });

    // PIPELINE type resolver
    var mutationPipelineTest = new Aws.AppSync.Resolver("mutationPipelineTest", new()
    {
        Type = "Mutation",
        ApiId = testGraphQLApi.Id,
        Field = "pipelineTest",
        RequestTemplate = "{}",
        ResponseTemplate = "$util.toJson($ctx.result)",
        Kind = "PIPELINE",
        PipelineConfig = new Aws.AppSync.Inputs.ResolverPipelineConfigArgs
        {
            Functions = new[]
            {
                aws_appsync_function.Test1.Function_id,
                aws_appsync_function.Test2.Function_id,
                aws_appsync_function.Test3.Function_id,
            },
        },
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
		testGraphQLApi, err := appsync.NewGraphQLApi(ctx, "testGraphQLApi", &appsync.GraphQLApiArgs{
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
		testDataSource, err := appsync.NewDataSource(ctx, "testDataSource", &appsync.DataSourceArgs{
			ApiId: testGraphQLApi.ID(),
			Name:  pulumi.String("tf_example"),
			Type:  pulumi.String("HTTP"),
			HttpConfig: &appsync.DataSourceHttpConfigArgs{
				Endpoint: pulumi.String("http://example.com"),
			},
		})
		if err != nil {
			return err
		}
		_, err = appsync.NewResolver(ctx, "testResolver", &appsync.ResolverArgs{
			ApiId:      testGraphQLApi.ID(),
			Field:      pulumi.String("singlePost"),
			Type:       pulumi.String("Query"),
			DataSource: testDataSource.Name,
			RequestTemplate: pulumi.String(fmt.Sprintf(`{
    "version": "2018-05-29",
    "method": "GET",
    "resourcePath": "/",
    "params":{
        "headers": $utils.http.copyheaders($ctx.request.headers)
    }
}
`)),
			ResponseTemplate: pulumi.String(fmt.Sprintf("#if($ctx.result.statusCode == 200)\n    $ctx.result.body\n#else\n    $utils.appendError($ctx.result.body, $ctx.result.statusCode)\n#end\n")),
			CachingConfig: &appsync.ResolverCachingConfigArgs{
				CachingKeys: pulumi.StringArray{
					pulumi.String(fmt.Sprintf("$context.identity.sub")),
					pulumi.String(fmt.Sprintf("$context.arguments.id")),
				},
				Ttl: pulumi.Int(60),
			},
		})
		if err != nil {
			return err
		}
		_, err = appsync.NewResolver(ctx, "mutationPipelineTest", &appsync.ResolverArgs{
			Type:             pulumi.String("Mutation"),
			ApiId:            testGraphQLApi.ID(),
			Field:            pulumi.String("pipelineTest"),
			RequestTemplate:  pulumi.String("{}"),
			ResponseTemplate: pulumi.String(fmt.Sprintf("$util.toJson($ctx.result)")),
			Kind:             pulumi.String("PIPELINE"),
			PipelineConfig: &appsync.ResolverPipelineConfigArgs{
				Functions: pulumi.StringArray{
					pulumi.Any(aws_appsync_function.Test1.Function_id),
					pulumi.Any(aws_appsync_function.Test2.Function_id),
					pulumi.Any(aws_appsync_function.Test3.Function_id),
				},
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
import com.pulumi.aws.appsync.GraphQLApi;
import com.pulumi.aws.appsync.GraphQLApiArgs;
import com.pulumi.aws.appsync.DataSource;
import com.pulumi.aws.appsync.DataSourceArgs;
import com.pulumi.aws.appsync.inputs.DataSourceHttpConfigArgs;
import com.pulumi.aws.appsync.Resolver;
import com.pulumi.aws.appsync.ResolverArgs;
import com.pulumi.aws.appsync.inputs.ResolverCachingConfigArgs;
import com.pulumi.aws.appsync.inputs.ResolverPipelineConfigArgs;
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
        var testGraphQLApi = new GraphQLApi("testGraphQLApi", GraphQLApiArgs.builder()        
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

        var testDataSource = new DataSource("testDataSource", DataSourceArgs.builder()        
            .apiId(testGraphQLApi.id())
            .name("tf_example")
            .type("HTTP")
            .httpConfig(DataSourceHttpConfigArgs.builder()
                .endpoint("http://example.com")
                .build())
            .build());

        var testResolver = new Resolver("testResolver", ResolverArgs.builder()        
            .apiId(testGraphQLApi.id())
            .field("singlePost")
            .type("Query")
            .dataSource(testDataSource.name())
            .requestTemplate("""
{
    "version": "2018-05-29",
    "method": "GET",
    "resourcePath": "/",
    "params":{
        "headers": $utils.http.copyheaders($ctx.request.headers)
    }
}
            """)
            .responseTemplate("""
#if($ctx.result.statusCode == 200)
    $ctx.result.body
#else
    $utils.appendError($ctx.result.body, $ctx.result.statusCode)
#end
            """)
            .cachingConfig(ResolverCachingConfigArgs.builder()
                .cachingKeys(                
                    "$context.identity.sub",
                    "$context.arguments.id")
                .ttl(60)
                .build())
            .build());

        var mutationPipelineTest = new Resolver("mutationPipelineTest", ResolverArgs.builder()        
            .type("Mutation")
            .apiId(testGraphQLApi.id())
            .field("pipelineTest")
            .requestTemplate("{}")
            .responseTemplate("$util.toJson($ctx.result)")
            .kind("PIPELINE")
            .pipelineConfig(ResolverPipelineConfigArgs.builder()
                .functions(                
                    aws_appsync_function.test1().function_id(),
                    aws_appsync_function.test2().function_id(),
                    aws_appsync_function.test3().function_id())
                .build())
            .build());

    }
}
```
```yaml
resources:
  testGraphQLApi:
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
  testDataSource:
    type: aws:appsync:DataSource
    properties:
      apiId: ${testGraphQLApi.id}
      name: tf_example
      type: HTTP
      httpConfig:
        endpoint: http://example.com
  # UNIT type resolver (default)
  testResolver:
    type: aws:appsync:Resolver
    properties:
      apiId: ${testGraphQLApi.id}
      field: singlePost
      type: Query
      dataSource: ${testDataSource.name}
      requestTemplate: |
        {
            "version": "2018-05-29",
            "method": "GET",
            "resourcePath": "/",
            "params":{
                "headers": $utils.http.copyheaders($ctx.request.headers)
            }
        }
      responseTemplate: |
        #if($ctx.result.statusCode == 200)
            $ctx.result.body
        #else
            $utils.appendError($ctx.result.body, $ctx.result.statusCode)
        #end
      cachingConfig:
        cachingKeys:
          - $context.identity.sub
          - $context.arguments.id
        ttl: 60
  # PIPELINE type resolver
  mutationPipelineTest:
    type: aws:appsync:Resolver
    properties:
      type: Mutation
      apiId: ${testGraphQLApi.id}
      field: pipelineTest
      requestTemplate: '{}'
      responseTemplate: $util.toJson($ctx.result)
      kind: PIPELINE
      pipelineConfig:
        functions:
          - ${aws_appsync_function.test1.function_id}
          - ${aws_appsync_function.test2.function_id}
          - ${aws_appsync_function.test3.function_id}
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_appsync_resolver` can be imported with their `api_id`, a hyphen, `type`, a hypen and `field` e.g.,

```sh
 $ pulumi import aws:appsync/resolver:Resolver example abcdef123456-exampleType-exampleField
```

 
Provides an AppSync Data Source.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleTable = new aws.dynamodb.Table("exampleTable", {
    readCapacity: 1,
    writeCapacity: 1,
    hashKey: "UserId",
    attributes: [{
        name: "UserId",
        type: "S",
    }],
});
const exampleRole = new aws.iam.Role("exampleRole", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "appsync.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
`});
const exampleRolePolicy = new aws.iam.RolePolicy("exampleRolePolicy", {
    role: exampleRole.id,
    policy: pulumi.interpolate`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "dynamodb:*"
      ],
      "Effect": "Allow",
      "Resource": [
        "${exampleTable.arn}"
      ]
    }
  ]
}
`,
});
const exampleGraphQLApi = new aws.appsync.GraphQLApi("exampleGraphQLApi", {authenticationType: "API_KEY"});
const exampleDataSource = new aws.appsync.DataSource("exampleDataSource", {
    apiId: exampleGraphQLApi.id,
    name: "tf_appsync_example",
    serviceRoleArn: exampleRole.arn,
    type: "AMAZON_DYNAMODB",
    dynamodbConfig: {
        tableName: exampleTable.name,
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example_table = aws.dynamodb.Table("exampleTable",
    read_capacity=1,
    write_capacity=1,
    hash_key="UserId",
    attributes=[aws.dynamodb.TableAttributeArgs(
        name="UserId",
        type="S",
    )])
example_role = aws.iam.Role("exampleRole", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "appsync.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
""")
example_role_policy = aws.iam.RolePolicy("exampleRolePolicy",
    role=example_role.id,
    policy=example_table.arn.apply(lambda arn: f"""{{
  "Version": "2012-10-17",
  "Statement": [
    {{
      "Action": [
        "dynamodb:*"
      ],
      "Effect": "Allow",
      "Resource": [
        "{arn}"
      ]
    }}
  ]
}}
"""))
example_graph_ql_api = aws.appsync.GraphQLApi("exampleGraphQLApi", authentication_type="API_KEY")
example_data_source = aws.appsync.DataSource("exampleDataSource",
    api_id=example_graph_ql_api.id,
    name="tf_appsync_example",
    service_role_arn=example_role.arn,
    type="AMAZON_DYNAMODB",
    dynamodb_config=aws.appsync.DataSourceDynamodbConfigArgs(
        table_name=example_table.name,
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleTable = new Aws.DynamoDB.Table("exampleTable", new()
    {
        ReadCapacity = 1,
        WriteCapacity = 1,
        HashKey = "UserId",
        Attributes = new[]
        {
            new Aws.DynamoDB.Inputs.TableAttributeArgs
            {
                Name = "UserId",
                Type = "S",
            },
        },
    });

    var exampleRole = new Aws.Iam.Role("exampleRole", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Action"": ""sts:AssumeRole"",
      ""Principal"": {
        ""Service"": ""appsync.amazonaws.com""
      },
      ""Effect"": ""Allow""
    }
  ]
}
",
    });

    var exampleRolePolicy = new Aws.Iam.RolePolicy("exampleRolePolicy", new()
    {
        Role = exampleRole.Id,
        Policy = exampleTable.Arn.Apply(arn => @$"{{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {{
      ""Action"": [
        ""dynamodb:*""
      ],
      ""Effect"": ""Allow"",
      ""Resource"": [
        ""{arn}""
      ]
    }}
  ]
}}
"),
    });

    var exampleGraphQLApi = new Aws.AppSync.GraphQLApi("exampleGraphQLApi", new()
    {
        AuthenticationType = "API_KEY",
    });

    var exampleDataSource = new Aws.AppSync.DataSource("exampleDataSource", new()
    {
        ApiId = exampleGraphQLApi.Id,
        Name = "tf_appsync_example",
        ServiceRoleArn = exampleRole.Arn,
        Type = "AMAZON_DYNAMODB",
        DynamodbConfig = new Aws.AppSync.Inputs.DataSourceDynamodbConfigArgs
        {
            TableName = exampleTable.Name,
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/appsync"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/dynamodb"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleTable, err := dynamodb.NewTable(ctx, "exampleTable", &dynamodb.TableArgs{
			ReadCapacity:  pulumi.Int(1),
			WriteCapacity: pulumi.Int(1),
			HashKey:       pulumi.String("UserId"),
			Attributes: dynamodb.TableAttributeArray{
				&dynamodb.TableAttributeArgs{
					Name: pulumi.String("UserId"),
					Type: pulumi.String("S"),
				},
			},
		})
		if err != nil {
			return err
		}
		exampleRole, err := iam.NewRole(ctx, "exampleRole", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "appsync.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
`)),
		})
		if err != nil {
			return err
		}
		_, err = iam.NewRolePolicy(ctx, "exampleRolePolicy", &iam.RolePolicyArgs{
			Role: exampleRole.ID(),
			Policy: exampleTable.Arn.ApplyT(func(arn string) (string, error) {
				return fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "dynamodb:*"
      ],
      "Effect": "Allow",
      "Resource": [
        "%v"
      ]
    }
  ]
}
`, arn), nil
			}).(pulumi.StringOutput),
		})
		if err != nil {
			return err
		}
		exampleGraphQLApi, err := appsync.NewGraphQLApi(ctx, "exampleGraphQLApi", &appsync.GraphQLApiArgs{
			AuthenticationType: pulumi.String("API_KEY"),
		})
		if err != nil {
			return err
		}
		_, err = appsync.NewDataSource(ctx, "exampleDataSource", &appsync.DataSourceArgs{
			ApiId:          exampleGraphQLApi.ID(),
			Name:           pulumi.String("tf_appsync_example"),
			ServiceRoleArn: exampleRole.Arn,
			Type:           pulumi.String("AMAZON_DYNAMODB"),
			DynamodbConfig: &appsync.DataSourceDynamodbConfigArgs{
				TableName: exampleTable.Name,
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
import com.pulumi.aws.dynamodb.Table;
import com.pulumi.aws.dynamodb.TableArgs;
import com.pulumi.aws.dynamodb.inputs.TableAttributeArgs;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.iam.RolePolicy;
import com.pulumi.aws.iam.RolePolicyArgs;
import com.pulumi.aws.appsync.GraphQLApi;
import com.pulumi.aws.appsync.GraphQLApiArgs;
import com.pulumi.aws.appsync.DataSource;
import com.pulumi.aws.appsync.DataSourceArgs;
import com.pulumi.aws.appsync.inputs.DataSourceDynamodbConfigArgs;
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
        var exampleTable = new Table("exampleTable", TableArgs.builder()        
            .readCapacity(1)
            .writeCapacity(1)
            .hashKey("UserId")
            .attributes(TableAttributeArgs.builder()
                .name("UserId")
                .type("S")
                .build())
            .build());

        var exampleRole = new Role("exampleRole", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "appsync.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
            """)
            .build());

        var exampleRolePolicy = new RolePolicy("exampleRolePolicy", RolePolicyArgs.builder()        
            .role(exampleRole.id())
            .policy(exampleTable.arn().applyValue(arn -> """
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "dynamodb:*"
      ],
      "Effect": "Allow",
      "Resource": [
        "%s"
      ]
    }
  ]
}
", arn)))
            .build());

        var exampleGraphQLApi = new GraphQLApi("exampleGraphQLApi", GraphQLApiArgs.builder()        
            .authenticationType("API_KEY")
            .build());

        var exampleDataSource = new DataSource("exampleDataSource", DataSourceArgs.builder()        
            .apiId(exampleGraphQLApi.id())
            .name("tf_appsync_example")
            .serviceRoleArn(exampleRole.arn())
            .type("AMAZON_DYNAMODB")
            .dynamodbConfig(DataSourceDynamodbConfigArgs.builder()
                .tableName(exampleTable.name())
                .build())
            .build());

    }
}
```
```yaml
resources:
  exampleTable:
    type: aws:dynamodb:Table
    properties:
      readCapacity: 1
      writeCapacity: 1
      hashKey: UserId
      attributes:
        - name: UserId
          type: S
  exampleRole:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Principal": {
                "Service": "appsync.amazonaws.com"
              },
              "Effect": "Allow"
            }
          ]
        }
  exampleRolePolicy:
    type: aws:iam:RolePolicy
    properties:
      role: ${exampleRole.id}
      policy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": [
                "dynamodb:*"
              ],
              "Effect": "Allow",
              "Resource": [
                "${exampleTable.arn}"
              ]
            }
          ]
        }
  exampleGraphQLApi:
    type: aws:appsync:GraphQLApi
    properties:
      authenticationType: API_KEY
  exampleDataSource:
    type: aws:appsync:DataSource
    properties:
      apiId: ${exampleGraphQLApi.id}
      name: tf_appsync_example
      serviceRoleArn: ${exampleRole.arn}
      type: AMAZON_DYNAMODB
      dynamodbConfig:
        tableName: ${exampleTable.name}
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_appsync_datasource` can be imported with their `api_id`, a hyphen, and `name`, e.g.,

```sh
 $ pulumi import aws:appsync/dataSource:DataSource example abcdef123456-example
```

 
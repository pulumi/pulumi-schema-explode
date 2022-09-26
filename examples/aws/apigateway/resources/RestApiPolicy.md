Provides an API Gateway REST API Policy.

> **Note:** Amazon API Gateway Version 1 resources are used for creating and deploying REST APIs. To create and deploy WebSocket and HTTP APIs, use Amazon API Gateway Version 2 resources.

{{% examples %}}
## Example Usage
{{% example %}}
### Basic

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const testRestApi = new aws.apigateway.RestApi("testRestApi", {});
const testRestApiPolicy = new aws.apigateway.RestApiPolicy("testRestApiPolicy", {
    restApiId: testRestApi.id,
    policy: pulumi.interpolate`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "execute-api:Invoke",
      "Resource": "${testRestApi.executionArn}",
      "Condition": {
        "IpAddress": {
          "aws:SourceIp": "123.123.123.123/32"
        }
      }
    }
  ]
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

test_rest_api = aws.apigateway.RestApi("testRestApi")
test_rest_api_policy = aws.apigateway.RestApiPolicy("testRestApiPolicy",
    rest_api_id=test_rest_api.id,
    policy=test_rest_api.execution_arn.apply(lambda execution_arn: f"""{{
  "Version": "2012-10-17",
  "Statement": [
    {{
      "Effect": "Allow",
      "Principal": {{
        "AWS": "*"
      }},
      "Action": "execute-api:Invoke",
      "Resource": "{execution_arn}",
      "Condition": {{
        "IpAddress": {{
          "aws:SourceIp": "123.123.123.123/32"
        }}
      }}
    }}
  ]
}}
"""))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var testRestApi = new Aws.ApiGateway.RestApi("testRestApi");

    var testRestApiPolicy = new Aws.ApiGateway.RestApiPolicy("testRestApiPolicy", new()
    {
        RestApiId = testRestApi.Id,
        Policy = testRestApi.ExecutionArn.Apply(executionArn => @$"{{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {{
      ""Effect"": ""Allow"",
      ""Principal"": {{
        ""AWS"": ""*""
      }},
      ""Action"": ""execute-api:Invoke"",
      ""Resource"": ""{executionArn}"",
      ""Condition"": {{
        ""IpAddress"": {{
          ""aws:SourceIp"": ""123.123.123.123/32""
        }}
      }}
    }}
  ]
}}
"),
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
		testRestApi, err := apigateway.NewRestApi(ctx, "testRestApi", nil)
		if err != nil {
			return err
		}
		_, err = apigateway.NewRestApiPolicy(ctx, "testRestApiPolicy", &apigateway.RestApiPolicyArgs{
			RestApiId: testRestApi.ID(),
			Policy: testRestApi.ExecutionArn.ApplyT(func(executionArn string) (string, error) {
				return fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "execute-api:Invoke",
      "Resource": "%v",
      "Condition": {
        "IpAddress": {
          "aws:SourceIp": "123.123.123.123/32"
        }
      }
    }
  ]
}
`, executionArn), nil
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
import com.pulumi.aws.apigateway.RestApiPolicy;
import com.pulumi.aws.apigateway.RestApiPolicyArgs;
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
        var testRestApi = new RestApi("testRestApi");

        var testRestApiPolicy = new RestApiPolicy("testRestApiPolicy", RestApiPolicyArgs.builder()        
            .restApiId(testRestApi.id())
            .policy(testRestApi.executionArn().applyValue(executionArn -> """
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "execute-api:Invoke",
      "Resource": "%s",
      "Condition": {
        "IpAddress": {
          "aws:SourceIp": "123.123.123.123/32"
        }
      }
    }
  ]
}
", executionArn)))
            .build());

    }
}
```
```yaml
resources:
  testRestApi:
    type: aws:apigateway:RestApi
  testRestApiPolicy:
    type: aws:apigateway:RestApiPolicy
    properties:
      restApiId: ${testRestApi.id}
      policy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "AWS": "*"
              },
              "Action": "execute-api:Invoke",
              "Resource": "${testRestApi.executionArn}",
              "Condition": {
                "IpAddress": {
                  "aws:SourceIp": "123.123.123.123/32"
                }
              }
            }
          ]
        }
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_api_gateway_rest_api_policy` can be imported by using the REST API ID, e.g.,

```sh
 $ pulumi import aws:apigateway/restApiPolicy:RestApiPolicy example 12345abcde
```

 
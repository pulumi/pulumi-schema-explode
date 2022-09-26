Use this resource to invoke a lambda function. The lambda function is invoked with the [RequestResponse](https://docs.aws.amazon.com/lambda/latest/dg/API_Invoke.html#API_Invoke_RequestSyntax) invocation type.

> **NOTE:** This resource _only_ invokes the function when the arguments call for a create or update. In other words, after an initial invocation on _apply_, if the arguments do not change, a subsequent _apply_ does not invoke the function again. To dynamically invoke the function, see the `triggers` example below. To always invoke a function on each _apply_, see the [`aws.lambda.Invocation`](https://www.terraform.io/docs/providers/aws/d/lambda_invocation.html) data source.

{{% examples %}}
## Example Usage
{{% example %}}
### Dynamic Invocation Example Using Triggers

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as crypto from "crypto";

const example = new aws.lambda.Invocation("example", {
    functionName: aws_lambda_function.lambda_function_test.function_name,
    triggers: {
        redeployment: crypto.createHash('sha1').update(JSON.stringify([aws_lambda_function.example.environment])).digest('hex'),
    },
    input: JSON.stringify({
        key1: "value1",
        key2: "value2",
    }),
});
```
```python
import pulumi
import hashlib
import json
import pulumi_aws as aws

example = aws.lambda_.Invocation("example",
    function_name=aws_lambda_function["lambda_function_test"]["function_name"],
    triggers={
        "redeployment": hashlib.sha1(json.dumps([aws_lambda_function["example"]["environment"]]).encode()).hexdigest(),
    },
    input=json.dumps({
        "key1": "value1",
        "key2": "value2",
    }))
```
```csharp
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Pulumi;
using Aws = Pulumi.Aws;

	private static string ComputeSHA1(string input) {
		return BitConverter.ToString(
			SHA1.Create().ComputeHash(Encoding.UTF8.GetBytes(input))
		).Replace("-","").ToLowerInvariant());
	}

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Lambda.Invocation("example", new()
    {
        FunctionName = aws_lambda_function.Lambda_function_test.Function_name,
        Triggers = 
        {
            { "redeployment", ComputeSHA1(JsonSerializer.Serialize(new[]
            {
                aws_lambda_function.Example.Environment,
            })) },
        },
        Input = JsonSerializer.Serialize(new Dictionary<string, object?>
        {
            ["key1"] = "value1",
            ["key2"] = "value2",
        }),
    });

});
```
```go
package main

import (
	"crypto/sha1"
	"encoding/json"
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lambda"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func sha1Hash(input string) string {
	hash := sha1.Sum([]byte(input))
	return hex.EncodeToString(hash[:])
}

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		tmpJSON0, err := json.Marshal([]interface{}{
			aws_lambda_function.Example.Environment,
		})
		if err != nil {
			return err
		}
		json0 := string(tmpJSON0)
		tmpJSON1, err := json.Marshal(map[string]interface{}{
			"key1": "value1",
			"key2": "value2",
		})
		if err != nil {
			return err
		}
		json1 := string(tmpJSON1)
		_, err = lambda.NewInvocation(ctx, "example", &lambda.InvocationArgs{
			FunctionName: pulumi.Any(aws_lambda_function.Lambda_function_test.Function_name),
			Triggers: pulumi.StringMap{
				"redeployment": sha1Hash(json0),
			},
			Input: pulumi.String(json1),
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
import com.pulumi.aws.lambda.Invocation;
import com.pulumi.aws.lambda.InvocationArgs;
import static com.pulumi.codegen.internal.Serialization.*;
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
        var example = new Invocation("example", InvocationArgs.builder()        
            .functionName(aws_lambda_function.lambda_function_test().function_name())
            .triggers(Map.of("redeployment", computeSHA1(serializeJson(
                jsonArray(aws_lambda_function.example().environment())))))
            .input(serializeJson(
                jsonObject(
                    jsonProperty("key1", "value1"),
                    jsonProperty("key2", "value2")
                )))
            .build());

    }
}
```
{{% /example %}}
{{% /examples %}}
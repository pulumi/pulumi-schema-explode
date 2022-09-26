Creates and manages an AWS IoT Authorizer.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as fs from "fs";

const example = new aws.iot.Authorizer("example", {
    authorizerFunctionArn: aws_lambda_function.example.arn,
    signingDisabled: false,
    status: "ACTIVE",
    tokenKeyName: "Token-Header",
    tokenSigningPublicKeys: {
        Key1: fs.readFileSync("test-fixtures/iot-authorizer-signing-key.pem"),
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.iot.Authorizer("example",
    authorizer_function_arn=aws_lambda_function["example"]["arn"],
    signing_disabled=False,
    status="ACTIVE",
    token_key_name="Token-Header",
    token_signing_public_keys={
        "Key1": (lambda path: open(path).read())("test-fixtures/iot-authorizer-signing-key.pem"),
    })
```
```csharp
using System.Collections.Generic;
using System.IO;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Iot.Authorizer("example", new()
    {
        AuthorizerFunctionArn = aws_lambda_function.Example.Arn,
        SigningDisabled = false,
        Status = "ACTIVE",
        TokenKeyName = "Token-Header",
        TokenSigningPublicKeys = 
        {
            { "Key1", File.ReadAllText("test-fixtures/iot-authorizer-signing-key.pem") },
        },
    });

});
```
```go
package main

import (
	"io/ioutil"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iot"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func readFileOrPanic(path string) pulumi.StringPtrInput {
	data, err := ioutil.ReadFile(path)
	if err != nil {
		panic(err.Error())
	}
	return pulumi.String(string(data))
}

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := iot.NewAuthorizer(ctx, "example", &iot.AuthorizerArgs{
			AuthorizerFunctionArn: pulumi.Any(aws_lambda_function.Example.Arn),
			SigningDisabled:       pulumi.Bool(false),
			Status:                pulumi.String("ACTIVE"),
			TokenKeyName:          pulumi.String("Token-Header"),
			TokenSigningPublicKeys: pulumi.StringMap{
				"Key1": readFileOrPanic("test-fixtures/iot-authorizer-signing-key.pem"),
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
import com.pulumi.aws.iot.Authorizer;
import com.pulumi.aws.iot.AuthorizerArgs;
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
        var example = new Authorizer("example", AuthorizerArgs.builder()        
            .authorizerFunctionArn(aws_lambda_function.example().arn())
            .signingDisabled(false)
            .status("ACTIVE")
            .tokenKeyName("Token-Header")
            .tokenSigningPublicKeys(Map.of("Key1", Files.readString(Paths.get("test-fixtures/iot-authorizer-signing-key.pem"))))
            .build());

    }
}
```
{{% /example %}}
{{% /examples %}}

## Import

IOT Authorizers can be imported using the name, e.g.,

```sh
 $ pulumi import aws:iot/authorizer:Authorizer example example
```

 
Manages a Lambda Provisioned Concurrency Configuration.

{{% examples %}}
## Example Usage
{{% example %}}
### Alias Name

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.lambda.ProvisionedConcurrencyConfig("example", {
    functionName: aws_lambda_alias.example.function_name,
    provisionedConcurrentExecutions: 1,
    qualifier: aws_lambda_alias.example.name,
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.lambda_.ProvisionedConcurrencyConfig("example",
    function_name=aws_lambda_alias["example"]["function_name"],
    provisioned_concurrent_executions=1,
    qualifier=aws_lambda_alias["example"]["name"])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Lambda.ProvisionedConcurrencyConfig("example", new()
    {
        FunctionName = aws_lambda_alias.Example.Function_name,
        ProvisionedConcurrentExecutions = 1,
        Qualifier = aws_lambda_alias.Example.Name,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lambda"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := lambda.NewProvisionedConcurrencyConfig(ctx, "example", &lambda.ProvisionedConcurrencyConfigArgs{
			FunctionName:                    pulumi.Any(aws_lambda_alias.Example.Function_name),
			ProvisionedConcurrentExecutions: pulumi.Int(1),
			Qualifier:                       pulumi.Any(aws_lambda_alias.Example.Name),
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
import com.pulumi.aws.lambda.ProvisionedConcurrencyConfig;
import com.pulumi.aws.lambda.ProvisionedConcurrencyConfigArgs;
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
        var example = new ProvisionedConcurrencyConfig("example", ProvisionedConcurrencyConfigArgs.builder()        
            .functionName(aws_lambda_alias.example().function_name())
            .provisionedConcurrentExecutions(1)
            .qualifier(aws_lambda_alias.example().name())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:lambda:ProvisionedConcurrencyConfig
    properties:
      functionName: ${aws_lambda_alias.example.function_name}
      provisionedConcurrentExecutions: 1
      qualifier: ${aws_lambda_alias.example.name}
```
{{% /example %}}
{{% example %}}
### Function Version

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.lambda.ProvisionedConcurrencyConfig("example", {
    functionName: aws_lambda_function.example.function_name,
    provisionedConcurrentExecutions: 1,
    qualifier: aws_lambda_function.example.version,
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.lambda_.ProvisionedConcurrencyConfig("example",
    function_name=aws_lambda_function["example"]["function_name"],
    provisioned_concurrent_executions=1,
    qualifier=aws_lambda_function["example"]["version"])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Lambda.ProvisionedConcurrencyConfig("example", new()
    {
        FunctionName = aws_lambda_function.Example.Function_name,
        ProvisionedConcurrentExecutions = 1,
        Qualifier = aws_lambda_function.Example.Version,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lambda"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := lambda.NewProvisionedConcurrencyConfig(ctx, "example", &lambda.ProvisionedConcurrencyConfigArgs{
			FunctionName:                    pulumi.Any(aws_lambda_function.Example.Function_name),
			ProvisionedConcurrentExecutions: pulumi.Int(1),
			Qualifier:                       pulumi.Any(aws_lambda_function.Example.Version),
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
import com.pulumi.aws.lambda.ProvisionedConcurrencyConfig;
import com.pulumi.aws.lambda.ProvisionedConcurrencyConfigArgs;
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
        var example = new ProvisionedConcurrencyConfig("example", ProvisionedConcurrencyConfigArgs.builder()        
            .functionName(aws_lambda_function.example().function_name())
            .provisionedConcurrentExecutions(1)
            .qualifier(aws_lambda_function.example().version())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:lambda:ProvisionedConcurrencyConfig
    properties:
      functionName: ${aws_lambda_function.example.function_name}
      provisionedConcurrentExecutions: 1
      qualifier: ${aws_lambda_function.example.version}
```
{{% /example %}}
{{% /examples %}}

## Import

Lambda Provisioned Concurrency Configs can be imported using the `function_name` and `qualifier` separated by a colon (`:`), e.g.,

```sh
 $ pulumi import aws:lambda/provisionedConcurrencyConfig:ProvisionedConcurrencyConfig example my_function:production
```

 
Provides a resource to manage AWS Secrets Manager secret metadata. To manage secret rotation, see the `aws.secretsmanager.SecretRotation` resource. To manage a secret value, see the `aws.secretsmanager.SecretVersion` resource.

{{% examples %}}
## Example Usage
{{% example %}}
### Basic

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.secretsmanager.Secret("example", {});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.secretsmanager.Secret("example")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.SecretsManager.Secret("example");

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/secretsmanager"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := secretsmanager.NewSecret(ctx, "example", nil)
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
import com.pulumi.aws.secretsmanager.Secret;
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
        var example = new Secret("example");

    }
}
```
```yaml
resources:
  example:
    type: aws:secretsmanager:Secret
```
{{% /example %}}
{{% example %}}
### Rotation Configuration

To enable automatic secret rotation, the Secrets Manager service requires usage of a Lambda function. The [Rotate Secrets section in the Secrets Manager User Guide](https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets_strategies.html) provides additional information about deploying a prebuilt Lambda functions for supported credential rotation (e.g., RDS) or deploying a custom Lambda function.

> **NOTE:** Configuring rotation causes the secret to rotate once as soon as you store the secret. Before you do this, you must ensure that all of your applications that use the credentials stored in the secret are updated to retrieve the secret from AWS Secrets Manager. The old credentials might no longer be usable after the initial rotation and any applications that you fail to update will break as soon as the old credentials are no longer valid.

> **NOTE:** If you cancel a rotation that is in progress (by removing the `rotation` configuration), it can leave the VersionStage labels in an unexpected state. Depending on what step of the rotation was in progress, you might need to remove the staging label AWSPENDING from the partially created version, specified by the SecretVersionId response value. You should also evaluate the partially rotated new version to see if it should be deleted, which you can do by removing all staging labels from the new version's VersionStage field.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const rotation_example = new aws.secretsmanager.Secret("rotation-example", {
    rotationLambdaArn: aws_lambda_function.example.arn,
    rotationRules: {
        automaticallyAfterDays: 7,
    },
});
```
```python
import pulumi
import pulumi_aws as aws

rotation_example = aws.secretsmanager.Secret("rotation-example",
    rotation_lambda_arn=aws_lambda_function["example"]["arn"],
    rotation_rules=aws.secretsmanager.SecretRotationRulesArgs(
        automatically_after_days=7,
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var rotation_example = new Aws.SecretsManager.Secret("rotation-example", new()
    {
        RotationLambdaArn = aws_lambda_function.Example.Arn,
        RotationRules = new Aws.SecretsManager.Inputs.SecretRotationRulesArgs
        {
            AutomaticallyAfterDays = 7,
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/secretsmanager"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := secretsmanager.NewSecret(ctx, "rotation-example", &secretsmanager.SecretArgs{
			RotationLambdaArn: pulumi.Any(aws_lambda_function.Example.Arn),
			RotationRules: &secretsmanager.SecretRotationRulesArgs{
				AutomaticallyAfterDays: pulumi.Int(7),
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
import com.pulumi.aws.secretsmanager.Secret;
import com.pulumi.aws.secretsmanager.SecretArgs;
import com.pulumi.aws.secretsmanager.inputs.SecretRotationRulesArgs;
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
        var rotation_example = new Secret("rotation-example", SecretArgs.builder()        
            .rotationLambdaArn(aws_lambda_function.example().arn())
            .rotationRules(SecretRotationRulesArgs.builder()
                .automaticallyAfterDays(7)
                .build())
            .build());

    }
}
```
```yaml
resources:
  rotation-example:
    type: aws:secretsmanager:Secret
    properties:
      rotationLambdaArn: ${aws_lambda_function.example.arn}
      rotationRules:
        automaticallyAfterDays: 7
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_secretsmanager_secret` can be imported by using the secret Amazon Resource Name (ARN), e.g.,

```sh
 $ pulumi import aws:secretsmanager/secret:Secret example arn:aws:secretsmanager:us-east-1:123456789012:secret:example-123456
```

 
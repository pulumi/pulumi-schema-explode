Provides a resource to manage AWS Secrets Manager secret version including its secret value. To manage secret metadata, see the `aws.secretsmanager.Secret` resource.

> **NOTE:** If the `AWSCURRENT` staging label is present on this version during resource deletion, that label cannot be removed and will be skipped to prevent errors when fully deleting the secret. That label will leave this secret version active even after the resource is deleted from this provider unless the secret itself is deleted. Move the `AWSCURRENT` staging label before or after deleting this resource from this provider to fully trigger version deprecation if necessary.

{{% examples %}}
## Example Usage
{{% example %}}
### Simple String Value

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.secretsmanager.SecretVersion("example", {
    secretId: aws_secretsmanager_secret.example.id,
    secretString: "example-string-to-protect",
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.secretsmanager.SecretVersion("example",
    secret_id=aws_secretsmanager_secret["example"]["id"],
    secret_string="example-string-to-protect")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.SecretsManager.SecretVersion("example", new()
    {
        SecretId = aws_secretsmanager_secret.Example.Id,
        SecretString = "example-string-to-protect",
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
		_, err := secretsmanager.NewSecretVersion(ctx, "example", &secretsmanager.SecretVersionArgs{
			SecretId:     pulumi.Any(aws_secretsmanager_secret.Example.Id),
			SecretString: pulumi.String("example-string-to-protect"),
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
import com.pulumi.aws.secretsmanager.SecretVersion;
import com.pulumi.aws.secretsmanager.SecretVersionArgs;
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
        var example = new SecretVersion("example", SecretVersionArgs.builder()        
            .secretId(aws_secretsmanager_secret.example().id())
            .secretString("example-string-to-protect")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:secretsmanager:SecretVersion
    properties:
      secretId: ${aws_secretsmanager_secret.example.id}
      secretString: example-string-to-protect
```
{{% /example %}}
{{% example %}}
### Key-Value Pairs

Secrets Manager also accepts key-value pairs in JSON.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const config = new pulumi.Config();
const example = config.getObject("example") || {
    key1: "value1",
    key2: "value2",
};
const exampleSecretVersion = new aws.secretsmanager.SecretVersion("exampleSecretVersion", {
    secretId: aws_secretsmanager_secret.example.id,
    secretString: JSON.stringify(example),
});
```
```python
import pulumi
import json
import pulumi_aws as aws

config = pulumi.Config()
example = config.get_object("example")
if example is None:
    example = {
        "key1": "value1",
        "key2": "value2",
    }
example_secret_version = aws.secretsmanager.SecretVersion("exampleSecretVersion",
    secret_id=aws_secretsmanager_secret["example"]["id"],
    secret_string=json.dumps(example))
```
```csharp
using System.Collections.Generic;
using System.Text.Json;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var config = new Config();
    var example = config.GetObject<dynamic>("example") ?? 
    {
        { "key1", "value1" },
        { "key2", "value2" },
    };
    var exampleSecretVersion = new Aws.SecretsManager.SecretVersion("exampleSecretVersion", new()
    {
        SecretId = aws_secretsmanager_secret.Example.Id,
        SecretString = JsonSerializer.Serialize(example),
    });

});
```
```go
package main

import (
	"encoding/json"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/secretsmanager"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi/config"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		cfg := config.New(ctx, "")
		example := map[string]interface{}{
			"key1": "value1",
			"key2": "value2",
		}
		if param := cfg.GetBool("example"); param != nil {
			example = param
		}
		tmpJSON0, err := json.Marshal(example)
		if err != nil {
			return err
		}
		json0 := string(tmpJSON0)
		_, err = secretsmanager.NewSecretVersion(ctx, "exampleSecretVersion", &secretsmanager.SecretVersionArgs{
			SecretId:     pulumi.Any(aws_secretsmanager_secret.Example.Id),
			SecretString: pulumi.String(json0),
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
import com.pulumi.aws.secretsmanager.SecretVersion;
import com.pulumi.aws.secretsmanager.SecretVersionArgs;
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
        final var config = ctx.config();
        final var example = config.get("example").orElse(%!v(PANIC=Format method: runtime error: invalid memory address or nil pointer dereference));
        var exampleSecretVersion = new SecretVersion("exampleSecretVersion", SecretVersionArgs.builder()        
            .secretId(aws_secretsmanager_secret.example().id())
            .secretString(serializeJson(
                example))
            .build());

    }
}
```
```yaml
configuration:
  # The map here can come from other supported configurations
  # like locals, resource attribute, map() built-in, etc.
  example:
    type: map(string)
    default:
      key1: value1
      key2: value2
resources:
  exampleSecretVersion:
    type: aws:secretsmanager:SecretVersion
    properties:
      secretId: ${aws_secretsmanager_secret.example.id}
      secretString:
        Fn::ToJSON: ${example}
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_secretsmanager_secret_version` can be imported by using the secret ID and version ID, e.g.,

```sh
 $ pulumi import aws:secretsmanager/secretVersion:SecretVersion example 'arn:aws:secretsmanager:us-east-1:123456789012:secret:example-123456|xxxxx-xxxxxxx-xxxxxxx-xxxxx'
```

 
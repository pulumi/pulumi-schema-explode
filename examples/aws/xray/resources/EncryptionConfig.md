Creates and manages an AWS XRay Encryption Config.

> **NOTE:** Removing this resource from the provider has no effect to the encryption configuration within X-Ray.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.xray.EncryptionConfig("example", {
    type: "NONE",
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.xray.EncryptionConfig("example", type="NONE")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Xray.EncryptionConfig("example", new()
    {
        Type = "NONE",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/xray"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := xray.NewEncryptionConfig(ctx, "example", &xray.EncryptionConfigArgs{
			Type: pulumi.String("NONE"),
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
import com.pulumi.aws.xray.EncryptionConfig;
import com.pulumi.aws.xray.EncryptionConfigArgs;
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
        var example = new EncryptionConfig("example", EncryptionConfigArgs.builder()        
            .type("NONE")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:xray:EncryptionConfig
    properties:
      type: NONE
```

{{% /example %}}
{{% example %}}
### With KMS Key

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const current = aws.getCallerIdentity({});
const exampleKey = new aws.kms.Key("exampleKey", {
    description: "Some Key",
    deletionWindowInDays: 7,
    policy: current.then(current => `{
  "Version": "2012-10-17",
  "Id": "kms-tf-1",
  "Statement": [
    {
      "Sid": "Enable IAM User Permissions",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::${current.accountId}:root"
      },
      "Action": "kms:*",
      "Resource": "*"
    }
  ]
}
`),
});
const exampleEncryptionConfig = new aws.xray.EncryptionConfig("exampleEncryptionConfig", {
    type: "KMS",
    keyId: exampleKey.arn,
});
```
```python
import pulumi
import pulumi_aws as aws

current = aws.get_caller_identity()
example_key = aws.kms.Key("exampleKey",
    description="Some Key",
    deletion_window_in_days=7,
    policy=f"""{{
  "Version": "2012-10-17",
  "Id": "kms-tf-1",
  "Statement": [
    {{
      "Sid": "Enable IAM User Permissions",
      "Effect": "Allow",
      "Principal": {{
        "AWS": "arn:aws:iam::{current.account_id}:root"
      }},
      "Action": "kms:*",
      "Resource": "*"
    }}
  ]
}}
""")
example_encryption_config = aws.xray.EncryptionConfig("exampleEncryptionConfig",
    type="KMS",
    key_id=example_key.arn)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var current = Aws.GetCallerIdentity.Invoke();

    var exampleKey = new Aws.Kms.Key("exampleKey", new()
    {
        Description = "Some Key",
        DeletionWindowInDays = 7,
        Policy = @$"{{
  ""Version"": ""2012-10-17"",
  ""Id"": ""kms-tf-1"",
  ""Statement"": [
    {{
      ""Sid"": ""Enable IAM User Permissions"",
      ""Effect"": ""Allow"",
      ""Principal"": {{
        ""AWS"": ""arn:aws:iam::{current.Apply(getCallerIdentityResult => getCallerIdentityResult.AccountId)}:root""
      }},
      ""Action"": ""kms:*"",
      ""Resource"": ""*""
    }}
  ]
}}
",
    });

    var exampleEncryptionConfig = new Aws.Xray.EncryptionConfig("exampleEncryptionConfig", new()
    {
        Type = "KMS",
        KeyId = exampleKey.Arn,
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/kms"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/xray"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		current, err := aws.GetCallerIdentity(ctx, nil, nil)
		if err != nil {
			return err
		}
		exampleKey, err := kms.NewKey(ctx, "exampleKey", &kms.KeyArgs{
			Description:          pulumi.String("Some Key"),
			DeletionWindowInDays: pulumi.Int(7),
			Policy: pulumi.String(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Id": "kms-tf-1",
  "Statement": [
    {
      "Sid": "Enable IAM User Permissions",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::%v:root"
      },
      "Action": "kms:*",
      "Resource": "*"
    }
  ]
}
`, current.AccountId)),
		})
		if err != nil {
			return err
		}
		_, err = xray.NewEncryptionConfig(ctx, "exampleEncryptionConfig", &xray.EncryptionConfigArgs{
			Type:  pulumi.String("KMS"),
			KeyId: exampleKey.Arn,
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
import com.pulumi.aws.AwsFunctions;
import com.pulumi.aws.kms.Key;
import com.pulumi.aws.kms.KeyArgs;
import com.pulumi.aws.xray.EncryptionConfig;
import com.pulumi.aws.xray.EncryptionConfigArgs;
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
        final var current = AwsFunctions.getCallerIdentity();

        var exampleKey = new Key("exampleKey", KeyArgs.builder()        
            .description("Some Key")
            .deletionWindowInDays(7)
            .policy("""
{
  "Version": "2012-10-17",
  "Id": "kms-tf-1",
  "Statement": [
    {
      "Sid": "Enable IAM User Permissions",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::%s:root"
      },
      "Action": "kms:*",
      "Resource": "*"
    }
  ]
}
", current.applyValue(getCallerIdentityResult -> getCallerIdentityResult.accountId())))
            .build());

        var exampleEncryptionConfig = new EncryptionConfig("exampleEncryptionConfig", EncryptionConfigArgs.builder()        
            .type("KMS")
            .keyId(exampleKey.arn())
            .build());

    }
}
```
```yaml
resources:
  exampleKey:
    type: aws:kms:Key
    properties:
      description: Some Key
      deletionWindowInDays: 7
      policy: |
        {
          "Version": "2012-10-17",
          "Id": "kms-tf-1",
          "Statement": [
            {
              "Sid": "Enable IAM User Permissions",
              "Effect": "Allow",
              "Principal": {
                "AWS": "arn:aws:iam::${current.accountId}:root"
              },
              "Action": "kms:*",
              "Resource": "*"
            }
          ]
        }
  exampleEncryptionConfig:
    type: aws:xray:EncryptionConfig
    properties:
      type: KMS
      keyId: ${exampleKey.arn}
variables:
  current:
    Fn::Invoke:
      Function: aws:getCallerIdentity
      Arguments: {}
```
{{% /example %}}
{{% /examples %}}

## Import

XRay Encryption Config can be imported using the region name, e.g.,

```sh
 $ pulumi import aws:xray/encryptionConfig:EncryptionConfig example us-west-2
```

 
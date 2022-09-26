Provides a resource to manage AWS Secrets Manager secret policy.

{{% examples %}}
## Example Usage
{{% example %}}
### Basic

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleSecret = new aws.secretsmanager.Secret("exampleSecret", {});
const exampleSecretPolicy = new aws.secretsmanager.SecretPolicy("exampleSecretPolicy", {
    secretArn: exampleSecret.arn,
    policy: `{
  "Version": "2012-10-17",
  "Statement": [
	{
	  "Sid": "EnableAnotherAWSAccountToReadTheSecret",
	  "Effect": "Allow",
	  "Principal": {
		"AWS": "arn:aws:iam::123456789012:root"
	  },
	  "Action": "secretsmanager:GetSecretValue",
	  "Resource": "*"
	}
  ]
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

example_secret = aws.secretsmanager.Secret("exampleSecret")
example_secret_policy = aws.secretsmanager.SecretPolicy("exampleSecretPolicy",
    secret_arn=example_secret.arn,
    policy="""{
  "Version": "2012-10-17",
  "Statement": [
	{
	  "Sid": "EnableAnotherAWSAccountToReadTheSecret",
	  "Effect": "Allow",
	  "Principal": {
		"AWS": "arn:aws:iam::123456789012:root"
	  },
	  "Action": "secretsmanager:GetSecretValue",
	  "Resource": "*"
	}
  ]
}
""")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleSecret = new Aws.SecretsManager.Secret("exampleSecret");

    var exampleSecretPolicy = new Aws.SecretsManager.SecretPolicy("exampleSecretPolicy", new()
    {
        SecretArn = exampleSecret.Arn,
        Policy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
	{
	  ""Sid"": ""EnableAnotherAWSAccountToReadTheSecret"",
	  ""Effect"": ""Allow"",
	  ""Principal"": {
		""AWS"": ""arn:aws:iam::123456789012:root""
	  },
	  ""Action"": ""secretsmanager:GetSecretValue"",
	  ""Resource"": ""*""
	}
  ]
}
",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/secretsmanager"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleSecret, err := secretsmanager.NewSecret(ctx, "exampleSecret", nil)
		if err != nil {
			return err
		}
		_, err = secretsmanager.NewSecretPolicy(ctx, "exampleSecretPolicy", &secretsmanager.SecretPolicyArgs{
			SecretArn: exampleSecret.Arn,
			Policy: pulumi.String(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
	{
	  "Sid": "EnableAnotherAWSAccountToReadTheSecret",
	  "Effect": "Allow",
	  "Principal": {
		"AWS": "arn:aws:iam::123456789012:root"
	  },
	  "Action": "secretsmanager:GetSecretValue",
	  "Resource": "*"
	}
  ]
}
`)),
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
import com.pulumi.aws.secretsmanager.SecretPolicy;
import com.pulumi.aws.secretsmanager.SecretPolicyArgs;
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
        var exampleSecret = new Secret("exampleSecret");

        var exampleSecretPolicy = new SecretPolicy("exampleSecretPolicy", SecretPolicyArgs.builder()        
            .secretArn(exampleSecret.arn())
            .policy("""
{
  "Version": "2012-10-17",
  "Statement": [
	{
	  "Sid": "EnableAnotherAWSAccountToReadTheSecret",
	  "Effect": "Allow",
	  "Principal": {
		"AWS": "arn:aws:iam::123456789012:root"
	  },
	  "Action": "secretsmanager:GetSecretValue",
	  "Resource": "*"
	}
  ]
}
            """)
            .build());

    }
}
```
```yaml
resources:
  exampleSecret:
    type: aws:secretsmanager:Secret
  exampleSecretPolicy:
    type: aws:secretsmanager:SecretPolicy
    properties:
      secretArn: ${exampleSecret.arn}
      policy: |
        {
          "Version": "2012-10-17",
          "Statement": [
        	{
        	  "Sid": "EnableAnotherAWSAccountToReadTheSecret",
        	  "Effect": "Allow",
        	  "Principal": {
        		"AWS": "arn:aws:iam::123456789012:root"
        	  },
        	  "Action": "secretsmanager:GetSecretValue",
        	  "Resource": "*"
        	}
          ]
        }
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_secretsmanager_secret_policy` can be imported by using the secret Amazon Resource Name (ARN), e.g.,

```sh
 $ pulumi import aws:secretsmanager/secretPolicy:SecretPolicy example arn:aws:secretsmanager:us-east-1:123456789012:secret:example-123456
```

 
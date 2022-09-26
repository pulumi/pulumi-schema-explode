Provides a resource-based access control mechanism for a KMS customer master key.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const key = new aws.kms.Key("key", {});
const role = new aws.iam.Role("role", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
`});
const grant = new aws.kms.Grant("grant", {
    keyId: key.keyId,
    granteePrincipal: role.arn,
    operations: [
        "Encrypt",
        "Decrypt",
        "GenerateDataKey",
    ],
    constraints: [{
        encryptionContextEquals: {
            Department: "Finance",
        },
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

key = aws.kms.Key("key")
role = aws.iam.Role("role", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
""")
grant = aws.kms.Grant("grant",
    key_id=key.key_id,
    grantee_principal=role.arn,
    operations=[
        "Encrypt",
        "Decrypt",
        "GenerateDataKey",
    ],
    constraints=[aws.kms.GrantConstraintArgs(
        encryption_context_equals={
            "Department": "Finance",
        },
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var key = new Aws.Kms.Key("key");

    var role = new Aws.Iam.Role("role", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Action"": ""sts:AssumeRole"",
      ""Principal"": {
        ""Service"": ""lambda.amazonaws.com""
      },
      ""Effect"": ""Allow"",
      ""Sid"": """"
    }
  ]
}
",
    });

    var grant = new Aws.Kms.Grant("grant", new()
    {
        KeyId = key.KeyId,
        GranteePrincipal = role.Arn,
        Operations = new[]
        {
            "Encrypt",
            "Decrypt",
            "GenerateDataKey",
        },
        Constraints = new[]
        {
            new Aws.Kms.Inputs.GrantConstraintArgs
            {
                EncryptionContextEquals = 
                {
                    { "Department", "Finance" },
                },
            },
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/kms"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		key, err := kms.NewKey(ctx, "key", nil)
		if err != nil {
			return err
		}
		role, err := iam.NewRole(ctx, "role", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
`)),
		})
		if err != nil {
			return err
		}
		_, err = kms.NewGrant(ctx, "grant", &kms.GrantArgs{
			KeyId:            key.KeyId,
			GranteePrincipal: role.Arn,
			Operations: pulumi.StringArray{
				pulumi.String("Encrypt"),
				pulumi.String("Decrypt"),
				pulumi.String("GenerateDataKey"),
			},
			Constraints: kms.GrantConstraintArray{
				&kms.GrantConstraintArgs{
					EncryptionContextEquals: pulumi.StringMap{
						"Department": pulumi.String("Finance"),
					},
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
import com.pulumi.aws.kms.Key;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.kms.Grant;
import com.pulumi.aws.kms.GrantArgs;
import com.pulumi.aws.kms.inputs.GrantConstraintArgs;
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
        var key = new Key("key");

        var role = new Role("role", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
            """)
            .build());

        var grant = new Grant("grant", GrantArgs.builder()        
            .keyId(key.keyId())
            .granteePrincipal(role.arn())
            .operations(            
                "Encrypt",
                "Decrypt",
                "GenerateDataKey")
            .constraints(GrantConstraintArgs.builder()
                .encryptionContextEquals(Map.of("Department", "Finance"))
                .build())
            .build());

    }
}
```
```yaml
resources:
  key:
    type: aws:kms:Key
  role:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              },
              "Effect": "Allow",
              "Sid": ""
            }
          ]
        }
  grant:
    type: aws:kms:Grant
    properties:
      keyId: ${key.keyId}
      granteePrincipal: ${role.arn}
      operations:
        - Encrypt
        - Decrypt
        - GenerateDataKey
      constraints:
        - encryptionContextEquals:
            Department: Finance
```
{{% /example %}}
{{% /examples %}}

## Import

KMS Grants can be imported using the Key ID and Grant ID separated by a colon (`:`), e.g.,

```sh
 $ pulumi import aws:kms/grant:Grant test 1234abcd-12ab-34cd-56ef-1234567890ab:abcde1237f76e4ba7987489ac329fbfba6ad343d6f7075dbd1ef191f0120514
```

 
Provides an AWS Backup vault policy resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleVault = new aws.backup.Vault("exampleVault", {});
const exampleVaultPolicy = new aws.backup.VaultPolicy("exampleVaultPolicy", {
    backupVaultName: exampleVault.name,
    policy: pulumi.interpolate`{
  "Version": "2012-10-17",
  "Id": "default",
  "Statement": [
    {
      "Sid": "default",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": [
		"backup:DescribeBackupVault",
		"backup:DeleteBackupVault",
		"backup:PutBackupVaultAccessPolicy",
		"backup:DeleteBackupVaultAccessPolicy",
		"backup:GetBackupVaultAccessPolicy",
		"backup:StartBackupJob",
		"backup:GetBackupVaultNotifications",
		"backup:PutBackupVaultNotifications"
      ],
      "Resource": "${exampleVault.arn}"
    }
  ]
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

example_vault = aws.backup.Vault("exampleVault")
example_vault_policy = aws.backup.VaultPolicy("exampleVaultPolicy",
    backup_vault_name=example_vault.name,
    policy=example_vault.arn.apply(lambda arn: f"""{{
  "Version": "2012-10-17",
  "Id": "default",
  "Statement": [
    {{
      "Sid": "default",
      "Effect": "Allow",
      "Principal": {{
        "AWS": "*"
      }},
      "Action": [
		"backup:DescribeBackupVault",
		"backup:DeleteBackupVault",
		"backup:PutBackupVaultAccessPolicy",
		"backup:DeleteBackupVaultAccessPolicy",
		"backup:GetBackupVaultAccessPolicy",
		"backup:StartBackupJob",
		"backup:GetBackupVaultNotifications",
		"backup:PutBackupVaultNotifications"
      ],
      "Resource": "{arn}"
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
    var exampleVault = new Aws.Backup.Vault("exampleVault");

    var exampleVaultPolicy = new Aws.Backup.VaultPolicy("exampleVaultPolicy", new()
    {
        BackupVaultName = exampleVault.Name,
        Policy = exampleVault.Arn.Apply(arn => @$"{{
  ""Version"": ""2012-10-17"",
  ""Id"": ""default"",
  ""Statement"": [
    {{
      ""Sid"": ""default"",
      ""Effect"": ""Allow"",
      ""Principal"": {{
        ""AWS"": ""*""
      }},
      ""Action"": [
		""backup:DescribeBackupVault"",
		""backup:DeleteBackupVault"",
		""backup:PutBackupVaultAccessPolicy"",
		""backup:DeleteBackupVaultAccessPolicy"",
		""backup:GetBackupVaultAccessPolicy"",
		""backup:StartBackupJob"",
		""backup:GetBackupVaultNotifications"",
		""backup:PutBackupVaultNotifications""
      ],
      ""Resource"": ""{arn}""
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

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/backup"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleVault, err := backup.NewVault(ctx, "exampleVault", nil)
		if err != nil {
			return err
		}
		_, err = backup.NewVaultPolicy(ctx, "exampleVaultPolicy", &backup.VaultPolicyArgs{
			BackupVaultName: exampleVault.Name,
			Policy: exampleVault.Arn.ApplyT(func(arn string) (string, error) {
				return fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Id": "default",
  "Statement": [
    {
      "Sid": "default",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": [
		"backup:DescribeBackupVault",
		"backup:DeleteBackupVault",
		"backup:PutBackupVaultAccessPolicy",
		"backup:DeleteBackupVaultAccessPolicy",
		"backup:GetBackupVaultAccessPolicy",
		"backup:StartBackupJob",
		"backup:GetBackupVaultNotifications",
		"backup:PutBackupVaultNotifications"
      ],
      "Resource": "%v"
    }
  ]
}
`, arn), nil
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
import com.pulumi.aws.backup.Vault;
import com.pulumi.aws.backup.VaultPolicy;
import com.pulumi.aws.backup.VaultPolicyArgs;
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
        var exampleVault = new Vault("exampleVault");

        var exampleVaultPolicy = new VaultPolicy("exampleVaultPolicy", VaultPolicyArgs.builder()        
            .backupVaultName(exampleVault.name())
            .policy(exampleVault.arn().applyValue(arn -> """
{
  "Version": "2012-10-17",
  "Id": "default",
  "Statement": [
    {
      "Sid": "default",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": [
		"backup:DescribeBackupVault",
		"backup:DeleteBackupVault",
		"backup:PutBackupVaultAccessPolicy",
		"backup:DeleteBackupVaultAccessPolicy",
		"backup:GetBackupVaultAccessPolicy",
		"backup:StartBackupJob",
		"backup:GetBackupVaultNotifications",
		"backup:PutBackupVaultNotifications"
      ],
      "Resource": "%s"
    }
  ]
}
", arn)))
            .build());

    }
}
```
```yaml
resources:
  exampleVault:
    type: aws:backup:Vault
  exampleVaultPolicy:
    type: aws:backup:VaultPolicy
    properties:
      backupVaultName: ${exampleVault.name}
      policy: |
        {
          "Version": "2012-10-17",
          "Id": "default",
          "Statement": [
            {
              "Sid": "default",
              "Effect": "Allow",
              "Principal": {
                "AWS": "*"
              },
              "Action": [
        		"backup:DescribeBackupVault",
        		"backup:DeleteBackupVault",
        		"backup:PutBackupVaultAccessPolicy",
        		"backup:DeleteBackupVaultAccessPolicy",
        		"backup:GetBackupVaultAccessPolicy",
        		"backup:StartBackupJob",
        		"backup:GetBackupVaultNotifications",
        		"backup:PutBackupVaultNotifications"
              ],
              "Resource": "${exampleVault.arn}"
            }
          ]
        }
```
{{% /example %}}
{{% /examples %}}

## Import

Backup vault policy can be imported using the `name`, e.g.,

```sh
 $ pulumi import aws:backup/vaultPolicy:VaultPolicy test TestVault
```

 
Provides an Elastic File System (EFS) File System Policy resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const fs = new aws.efs.FileSystem("fs", {});
const policy = new aws.efs.FileSystemPolicy("policy", {
    fileSystemId: fs.id,
    bypassPolicyLockoutSafetyCheck: true,
    policy: `{
    "Version": "2012-10-17",
    "Id": "ExamplePolicy01",
    "Statement": [
        {
            "Sid": "ExampleStatement01",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Resource": "${aws_efs_file_system.test.arn}",
            "Action": [
                "elasticfilesystem:ClientMount",
                "elasticfilesystem:ClientWrite"
            ],
            "Condition": {
                "Bool": {
                    "aws:SecureTransport": "true"
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

fs = aws.efs.FileSystem("fs")
policy = aws.efs.FileSystemPolicy("policy",
    file_system_id=fs.id,
    bypass_policy_lockout_safety_check=True,
    policy=f"""{{
    "Version": "2012-10-17",
    "Id": "ExamplePolicy01",
    "Statement": [
        {{
            "Sid": "ExampleStatement01",
            "Effect": "Allow",
            "Principal": {{
                "AWS": "*"
            }},
            "Resource": "{aws_efs_file_system["test"]["arn"]}",
            "Action": [
                "elasticfilesystem:ClientMount",
                "elasticfilesystem:ClientWrite"
            ],
            "Condition": {{
                "Bool": {{
                    "aws:SecureTransport": "true"
                }}
            }}
        }}
    ]
}}
""")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var fs = new Aws.Efs.FileSystem("fs");

    var policy = new Aws.Efs.FileSystemPolicy("policy", new()
    {
        FileSystemId = fs.Id,
        BypassPolicyLockoutSafetyCheck = true,
        Policy = @$"{{
    ""Version"": ""2012-10-17"",
    ""Id"": ""ExamplePolicy01"",
    ""Statement"": [
        {{
            ""Sid"": ""ExampleStatement01"",
            ""Effect"": ""Allow"",
            ""Principal"": {{
                ""AWS"": ""*""
            }},
            ""Resource"": ""{aws_efs_file_system.Test.Arn}"",
            ""Action"": [
                ""elasticfilesystem:ClientMount"",
                ""elasticfilesystem:ClientWrite""
            ],
            ""Condition"": {{
                ""Bool"": {{
                    ""aws:SecureTransport"": ""true""
                }}
            }}
        }}
    ]
}}
",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/efs"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		fs, err := efs.NewFileSystem(ctx, "fs", nil)
		if err != nil {
			return err
		}
		_, err = efs.NewFileSystemPolicy(ctx, "policy", &efs.FileSystemPolicyArgs{
			FileSystemId:                   fs.ID(),
			BypassPolicyLockoutSafetyCheck: pulumi.Bool(true),
			Policy: pulumi.String(fmt.Sprintf(`{
    "Version": "2012-10-17",
    "Id": "ExamplePolicy01",
    "Statement": [
        {
            "Sid": "ExampleStatement01",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Resource": "%v",
            "Action": [
                "elasticfilesystem:ClientMount",
                "elasticfilesystem:ClientWrite"
            ],
            "Condition": {
                "Bool": {
                    "aws:SecureTransport": "true"
                }
            }
        }
    ]
}
`, aws_efs_file_system.Test.Arn)),
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
import com.pulumi.aws.efs.FileSystem;
import com.pulumi.aws.efs.FileSystemPolicy;
import com.pulumi.aws.efs.FileSystemPolicyArgs;
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
        var fs = new FileSystem("fs");

        var policy = new FileSystemPolicy("policy", FileSystemPolicyArgs.builder()        
            .fileSystemId(fs.id())
            .bypassPolicyLockoutSafetyCheck(true)
            .policy("""
{
    "Version": "2012-10-17",
    "Id": "ExamplePolicy01",
    "Statement": [
        {
            "Sid": "ExampleStatement01",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Resource": "%s",
            "Action": [
                "elasticfilesystem:ClientMount",
                "elasticfilesystem:ClientWrite"
            ],
            "Condition": {
                "Bool": {
                    "aws:SecureTransport": "true"
                }
            }
        }
    ]
}
", aws_efs_file_system.test().arn()))
            .build());

    }
}
```
```yaml
resources:
  fs:
    type: aws:efs:FileSystem
  policy:
    type: aws:efs:FileSystemPolicy
    properties:
      fileSystemId: ${fs.id}
      bypassPolicyLockoutSafetyCheck: true
      policy: |
        {
            "Version": "2012-10-17",
            "Id": "ExamplePolicy01",
            "Statement": [
                {
                    "Sid": "ExampleStatement01",
                    "Effect": "Allow",
                    "Principal": {
                        "AWS": "*"
                    },
                    "Resource": "${aws_efs_file_system.test.arn}",
                    "Action": [
                        "elasticfilesystem:ClientMount",
                        "elasticfilesystem:ClientWrite"
                    ],
                    "Condition": {
                        "Bool": {
                            "aws:SecureTransport": "true"
                        }
                    }
                }
            ]
        }
```
{{% /example %}}
{{% /examples %}}

## Import

The EFS file system policies can be imported using the `id`, e.g.,

```sh
 $ pulumi import aws:efs/fileSystemPolicy:FileSystemPolicy foo fs-6fa144c6
```

 
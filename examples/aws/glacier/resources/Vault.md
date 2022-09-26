Provides a Glacier Vault Resource. You can refer to the [Glacier Developer Guide](https://docs.aws.amazon.com/amazonglacier/latest/dev/working-with-vaults.html) for a full explanation of the Glacier Vault functionality

> **NOTE:** When removing a Glacier Vault, the Vault must be empty.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const awsSnsTopic = new aws.sns.Topic("awsSnsTopic", {});
const myArchive = new aws.glacier.Vault("myArchive", {
    notification: {
        snsTopic: awsSnsTopic.arn,
        events: [
            "ArchiveRetrievalCompleted",
            "InventoryRetrievalCompleted",
        ],
    },
    accessPolicy: `{
    "Version":"2012-10-17",
    "Statement":[
       {
          "Sid": "add-read-only-perm",
          "Principal": "*",
          "Effect": "Allow",
          "Action": [
             "glacier:InitiateJob",
             "glacier:GetJobOutput"
          ],
          "Resource": "arn:aws:glacier:eu-west-1:432981146916:vaults/MyArchive"
       }
    ]
}
`,
    tags: {
        Test: "MyArchive",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

aws_sns_topic = aws.sns.Topic("awsSnsTopic")
my_archive = aws.glacier.Vault("myArchive",
    notification=aws.glacier.VaultNotificationArgs(
        sns_topic=aws_sns_topic.arn,
        events=[
            "ArchiveRetrievalCompleted",
            "InventoryRetrievalCompleted",
        ],
    ),
    access_policy="""{
    "Version":"2012-10-17",
    "Statement":[
       {
          "Sid": "add-read-only-perm",
          "Principal": "*",
          "Effect": "Allow",
          "Action": [
             "glacier:InitiateJob",
             "glacier:GetJobOutput"
          ],
          "Resource": "arn:aws:glacier:eu-west-1:432981146916:vaults/MyArchive"
       }
    ]
}
""",
    tags={
        "Test": "MyArchive",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var awsSnsTopic = new Aws.Sns.Topic("awsSnsTopic");

    var myArchive = new Aws.Glacier.Vault("myArchive", new()
    {
        Notification = new Aws.Glacier.Inputs.VaultNotificationArgs
        {
            SnsTopic = awsSnsTopic.Arn,
            Events = new[]
            {
                "ArchiveRetrievalCompleted",
                "InventoryRetrievalCompleted",
            },
        },
        AccessPolicy = @"{
    ""Version"":""2012-10-17"",
    ""Statement"":[
       {
          ""Sid"": ""add-read-only-perm"",
          ""Principal"": ""*"",
          ""Effect"": ""Allow"",
          ""Action"": [
             ""glacier:InitiateJob"",
             ""glacier:GetJobOutput""
          ],
          ""Resource"": ""arn:aws:glacier:eu-west-1:432981146916:vaults/MyArchive""
       }
    ]
}
",
        Tags = 
        {
            { "Test", "MyArchive" },
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/glacier"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sns"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		awsSnsTopic, err := sns.NewTopic(ctx, "awsSnsTopic", nil)
		if err != nil {
			return err
		}
		_, err = glacier.NewVault(ctx, "myArchive", &glacier.VaultArgs{
			Notification: &glacier.VaultNotificationArgs{
				SnsTopic: awsSnsTopic.Arn,
				Events: pulumi.StringArray{
					pulumi.String("ArchiveRetrievalCompleted"),
					pulumi.String("InventoryRetrievalCompleted"),
				},
			},
			AccessPolicy: pulumi.String(fmt.Sprintf(`{
    "Version":"2012-10-17",
    "Statement":[
       {
          "Sid": "add-read-only-perm",
          "Principal": "*",
          "Effect": "Allow",
          "Action": [
             "glacier:InitiateJob",
             "glacier:GetJobOutput"
          ],
          "Resource": "arn:aws:glacier:eu-west-1:432981146916:vaults/MyArchive"
       }
    ]
}
`)),
			Tags: pulumi.StringMap{
				"Test": pulumi.String("MyArchive"),
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
import com.pulumi.aws.sns.Topic;
import com.pulumi.aws.glacier.Vault;
import com.pulumi.aws.glacier.VaultArgs;
import com.pulumi.aws.glacier.inputs.VaultNotificationArgs;
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
        var awsSnsTopic = new Topic("awsSnsTopic");

        var myArchive = new Vault("myArchive", VaultArgs.builder()        
            .notification(VaultNotificationArgs.builder()
                .snsTopic(awsSnsTopic.arn())
                .events(                
                    "ArchiveRetrievalCompleted",
                    "InventoryRetrievalCompleted")
                .build())
            .accessPolicy("""
{
    "Version":"2012-10-17",
    "Statement":[
       {
          "Sid": "add-read-only-perm",
          "Principal": "*",
          "Effect": "Allow",
          "Action": [
             "glacier:InitiateJob",
             "glacier:GetJobOutput"
          ],
          "Resource": "arn:aws:glacier:eu-west-1:432981146916:vaults/MyArchive"
       }
    ]
}
            """)
            .tags(Map.of("Test", "MyArchive"))
            .build());

    }
}
```
```yaml
resources:
  awsSnsTopic:
    type: aws:sns:Topic
  myArchive:
    type: aws:glacier:Vault
    properties:
      notification:
        snsTopic: ${awsSnsTopic.arn}
        events:
          - ArchiveRetrievalCompleted
          - InventoryRetrievalCompleted
      accessPolicy: |
        {
            "Version":"2012-10-17",
            "Statement":[
               {
                  "Sid": "add-read-only-perm",
                  "Principal": "*",
                  "Effect": "Allow",
                  "Action": [
                     "glacier:InitiateJob",
                     "glacier:GetJobOutput"
                  ],
                  "Resource": "arn:aws:glacier:eu-west-1:432981146916:vaults/MyArchive"
               }
            ]
        }
      tags:
        Test: MyArchive
```
{{% /example %}}
{{% /examples %}}

## Import

Glacier Vaults can be imported using the `name`, e.g.,

```sh
 $ pulumi import aws:glacier/vault:Vault archive my_archive
```

 
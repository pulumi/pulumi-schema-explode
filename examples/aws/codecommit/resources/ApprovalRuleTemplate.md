Provides a CodeCommit Approval Rule Template Resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.codecommit.ApprovalRuleTemplate("example", {
    content: `{
    "Version": "2018-11-08",
    "DestinationReferences": ["refs/heads/master"],
    "Statements": [{
        "Type": "Approvers",
        "NumberOfApprovalsNeeded": 2,
        "ApprovalPoolMembers": ["arn:aws:sts::123456789012:assumed-role/CodeCommitReview/*"]
    }]
}
`,
    description: "This is an example approval rule template",
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.codecommit.ApprovalRuleTemplate("example",
    content="""{
    "Version": "2018-11-08",
    "DestinationReferences": ["refs/heads/master"],
    "Statements": [{
        "Type": "Approvers",
        "NumberOfApprovalsNeeded": 2,
        "ApprovalPoolMembers": ["arn:aws:sts::123456789012:assumed-role/CodeCommitReview/*"]
    }]
}

""",
    description="This is an example approval rule template")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.CodeCommit.ApprovalRuleTemplate("example", new()
    {
        Content = @"{
    ""Version"": ""2018-11-08"",
    ""DestinationReferences"": [""refs/heads/master""],
    ""Statements"": [{
        ""Type"": ""Approvers"",
        ""NumberOfApprovalsNeeded"": 2,
        ""ApprovalPoolMembers"": [""arn:aws:sts::123456789012:assumed-role/CodeCommitReview/*""]
    }]
}

",
        Description = "This is an example approval rule template",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/codecommit"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := codecommit.NewApprovalRuleTemplate(ctx, "example", &codecommit.ApprovalRuleTemplateArgs{
			Content: pulumi.String(fmt.Sprintf(`{
    "Version": "2018-11-08",
    "DestinationReferences": ["refs/heads/master"],
    "Statements": [{
        "Type": "Approvers",
        "NumberOfApprovalsNeeded": 2,
        "ApprovalPoolMembers": ["arn:aws:sts::123456789012:assumed-role/CodeCommitReview/*"]
    }]
}

`)),
			Description: pulumi.String("This is an example approval rule template"),
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
import com.pulumi.aws.codecommit.ApprovalRuleTemplate;
import com.pulumi.aws.codecommit.ApprovalRuleTemplateArgs;
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
        var example = new ApprovalRuleTemplate("example", ApprovalRuleTemplateArgs.builder()        
            .content("""
{
    "Version": "2018-11-08",
    "DestinationReferences": ["refs/heads/master"],
    "Statements": [{
        "Type": "Approvers",
        "NumberOfApprovalsNeeded": 2,
        "ApprovalPoolMembers": ["arn:aws:sts::123456789012:assumed-role/CodeCommitReview/*"]
    }]
}

            """)
            .description("This is an example approval rule template")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:codecommit:ApprovalRuleTemplate
    properties:
      content: |+
        {
            "Version": "2018-11-08",
            "DestinationReferences": ["refs/heads/master"],
            "Statements": [{
                "Type": "Approvers",
                "NumberOfApprovalsNeeded": 2,
                "ApprovalPoolMembers": ["arn:aws:sts::123456789012:assumed-role/CodeCommitReview/*"]
            }]
        }

      description: This is an example approval rule template
```
{{% /example %}}
{{% /examples %}}

## Import

CodeCommit approval rule templates can be imported using the `name`, e.g.

```sh
 $ pulumi import aws:codecommit/approvalRuleTemplate:ApprovalRuleTemplate imported ExistingApprovalRuleTemplateName
```

 
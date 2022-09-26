> **NOTE:** This resource interacts with [Amazon Macie Classic](https://docs.aws.amazon.com/macie/latest/userguide/what-is-macie.html). Macie Classic cannot be activated in new accounts. See the [FAQ](https://aws.amazon.com/macie/classic-faqs/) for more details.

Associates an AWS account with Amazon Macie as a member account.

> **NOTE:** Before using Amazon Macie for the first time it must be enabled manually. Instructions are [here](https://docs.aws.amazon.com/macie/latest/userguide/macie-setting-up.html#macie-setting-up-enable).

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.macie.MemberAccountAssociation("example", {
    memberAccountId: "123456789012",
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.macie.MemberAccountAssociation("example", member_account_id="123456789012")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Macie.MemberAccountAssociation("example", new()
    {
        MemberAccountId = "123456789012",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/macie"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := macie.NewMemberAccountAssociation(ctx, "example", &macie.MemberAccountAssociationArgs{
			MemberAccountId: pulumi.String("123456789012"),
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
import com.pulumi.aws.macie.MemberAccountAssociation;
import com.pulumi.aws.macie.MemberAccountAssociationArgs;
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
        var example = new MemberAccountAssociation("example", MemberAccountAssociationArgs.builder()        
            .memberAccountId("123456789012")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:macie:MemberAccountAssociation
    properties:
      memberAccountId: 123456789012
```
{{% /example %}}
{{% /examples %}}
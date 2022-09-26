Manages the specified alternate contact attached to an AWS Account.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const operations = new aws.account.AlternativeContact("operations", {
    alternateContactType: "OPERATIONS",
    emailAddress: "test@example.com",
    phoneNumber: "+1234567890",
    title: "Example",
});
```
```python
import pulumi
import pulumi_aws as aws

operations = aws.account.AlternativeContact("operations",
    alternate_contact_type="OPERATIONS",
    email_address="test@example.com",
    phone_number="+1234567890",
    title="Example")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var operations = new Aws.Account.AlternativeContact("operations", new()
    {
        AlternateContactType = "OPERATIONS",
        EmailAddress = "test@example.com",
        PhoneNumber = "+1234567890",
        Title = "Example",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/account"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := account.NewAlternativeContact(ctx, "operations", &account.AlternativeContactArgs{
			AlternateContactType: pulumi.String("OPERATIONS"),
			EmailAddress:         pulumi.String("test@example.com"),
			PhoneNumber:          pulumi.String("+1234567890"),
			Title:                pulumi.String("Example"),
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
import com.pulumi.aws.account.AlternativeContact;
import com.pulumi.aws.account.AlternativeContactArgs;
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
        var operations = new AlternativeContact("operations", AlternativeContactArgs.builder()        
            .alternateContactType("OPERATIONS")
            .emailAddress("test@example.com")
            .phoneNumber("+1234567890")
            .title("Example")
            .build());

    }
}
```
```yaml
resources:
  operations:
    type: aws:account:AlternativeContact
    properties:
      alternateContactType: OPERATIONS
      emailAddress: test@example.com
      phoneNumber: +1234567890
      title: Example
```
{{% /example %}}
{{% /examples %}}

## Import

The Alternate Contact for the current account can be imported using the `alternate_contact_type`, e.g.,

```sh
 $ pulumi import aws:account/alternativeContact:AlternativeContact operations OPERATIONS
```

 If you provide an account ID, the Alternate Contact can be imported using the `account_id` and `alternate_contact_type` separated by a forward slash (`/`) e.g.,

```sh
 $ pulumi import aws:account/alternativeContact:AlternativeContact operations 1234567890/OPERATIONS
```

 
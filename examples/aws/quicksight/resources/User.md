Resource for managing QuickSight User

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.quicksight.User("example", {
    email: "author@example.com",
    iamArn: "arn:aws:iam::123456789012:user/Example",
    identityType: "IAM",
    namespace: "foo",
    sessionName: "an-author",
    userRole: "AUTHOR",
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.quicksight.User("example",
    email="author@example.com",
    iam_arn="arn:aws:iam::123456789012:user/Example",
    identity_type="IAM",
    namespace="foo",
    session_name="an-author",
    user_role="AUTHOR")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Quicksight.User("example", new()
    {
        Email = "author@example.com",
        IamArn = "arn:aws:iam::123456789012:user/Example",
        IdentityType = "IAM",
        Namespace = "foo",
        SessionName = "an-author",
        UserRole = "AUTHOR",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/quicksight"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := quicksight.NewUser(ctx, "example", &quicksight.UserArgs{
			Email:        pulumi.String("author@example.com"),
			IamArn:       pulumi.String("arn:aws:iam::123456789012:user/Example"),
			IdentityType: pulumi.String("IAM"),
			Namespace:    pulumi.String("foo"),
			SessionName:  pulumi.String("an-author"),
			UserRole:     pulumi.String("AUTHOR"),
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
import com.pulumi.aws.quicksight.User;
import com.pulumi.aws.quicksight.UserArgs;
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
        var example = new User("example", UserArgs.builder()        
            .email("author@example.com")
            .iamArn("arn:aws:iam::123456789012:user/Example")
            .identityType("IAM")
            .namespace("foo")
            .sessionName("an-author")
            .userRole("AUTHOR")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:quicksight:User
    properties:
      email: author@example.com
      iamArn: arn:aws:iam::123456789012:user/Example
      identityType: IAM
      namespace: foo
      sessionName: an-author
      userRole: AUTHOR
```
{{% /example %}}
{{% /examples %}}

## Import

Importing is currently not supported on this resource. 
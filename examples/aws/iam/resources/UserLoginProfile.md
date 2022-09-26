Manages an IAM User Login Profile with limited support for password creation during this provider resource creation. Uses PGP to encrypt the password for safe transport to the user. PGP keys can be obtained from Keybase.

> To reset an IAM User login password via this provider, you can use delete and recreate this resource or change any of the arguments.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleUser = new aws.iam.User("exampleUser", {
    path: "/",
    forceDestroy: true,
});
const exampleUserLoginProfile = new aws.iam.UserLoginProfile("exampleUserLoginProfile", {
    user: exampleUser.name,
    pgpKey: "keybase:some_person_that_exists",
});
export const password = exampleUserLoginProfile.encryptedPassword;
```
```python
import pulumi
import pulumi_aws as aws

example_user = aws.iam.User("exampleUser",
    path="/",
    force_destroy=True)
example_user_login_profile = aws.iam.UserLoginProfile("exampleUserLoginProfile",
    user=example_user.name,
    pgp_key="keybase:some_person_that_exists")
pulumi.export("password", example_user_login_profile.encrypted_password)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleUser = new Aws.Iam.User("exampleUser", new()
    {
        Path = "/",
        ForceDestroy = true,
    });

    var exampleUserLoginProfile = new Aws.Iam.UserLoginProfile("exampleUserLoginProfile", new()
    {
        User = exampleUser.Name,
        PgpKey = "keybase:some_person_that_exists",
    });

    return new Dictionary<string, object?>
    {
        ["password"] = exampleUserLoginProfile.EncryptedPassword,
    };
});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleUser, err := iam.NewUser(ctx, "exampleUser", &iam.UserArgs{
			Path:         pulumi.String("/"),
			ForceDestroy: pulumi.Bool(true),
		})
		if err != nil {
			return err
		}
		exampleUserLoginProfile, err := iam.NewUserLoginProfile(ctx, "exampleUserLoginProfile", &iam.UserLoginProfileArgs{
			User:   exampleUser.Name,
			PgpKey: pulumi.String("keybase:some_person_that_exists"),
		})
		if err != nil {
			return err
		}
		ctx.Export("password", exampleUserLoginProfile.EncryptedPassword)
		return nil
	})
}
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.iam.User;
import com.pulumi.aws.iam.UserArgs;
import com.pulumi.aws.iam.UserLoginProfile;
import com.pulumi.aws.iam.UserLoginProfileArgs;
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
        var exampleUser = new User("exampleUser", UserArgs.builder()        
            .path("/")
            .forceDestroy(true)
            .build());

        var exampleUserLoginProfile = new UserLoginProfile("exampleUserLoginProfile", UserLoginProfileArgs.builder()        
            .user(exampleUser.name())
            .pgpKey("keybase:some_person_that_exists")
            .build());

        ctx.export("password", exampleUserLoginProfile.encryptedPassword());
    }
}
```
```yaml
resources:
  exampleUser:
    type: aws:iam:User
    properties:
      path: /
      forceDestroy: true
  exampleUserLoginProfile:
    type: aws:iam:UserLoginProfile
    properties:
      user: ${exampleUser.name}
      pgpKey: keybase:some_person_that_exists
outputs:
  password: ${exampleUserLoginProfile.encryptedPassword}
```
{{% /example %}}
{{% /examples %}}

## Import

IAM User Login Profiles can be imported without password information support via the IAM User name, e.g.,

```sh
 $ pulumi import aws:iam/userLoginProfile:UserLoginProfile example myusername
```

 Since this provider has no method to read the PGP or password information during import, use [`ignore_changes` argument](https://www.pulumi.com/docs/intro/concepts/programming-model/#ignorechanges) to ignore them unless password recreation is desired. e.g. terraform resource "aws_iam_user_login_profile" "example" {

 # ... other configuration ...

 lifecycle {



 ignore_changes = [





 password_length,





 password_reset_required,





 pgp_key,



 ]

 } } 
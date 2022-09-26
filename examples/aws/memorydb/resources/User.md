{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as random from "@pulumi/random";

const exampleRandomPassword = new random.RandomPassword("exampleRandomPassword", {length: 16});
const exampleUser = new aws.memorydb.User("exampleUser", {
    userName: "my-user",
    accessString: "on ~* &* +@all",
    authenticationMode: {
        type: "password",
        passwords: [exampleRandomPassword.result],
    },
});
```
```python
import pulumi
import pulumi_aws as aws
import pulumi_random as random

example_random_password = random.RandomPassword("exampleRandomPassword", length=16)
example_user = aws.memorydb.User("exampleUser",
    user_name="my-user",
    access_string="on ~* &* +@all",
    authentication_mode=aws.memorydb.UserAuthenticationModeArgs(
        type="password",
        passwords=[example_random_password.result],
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;
using Random = Pulumi.Random;

return await Deployment.RunAsync(() => 
{
    var exampleRandomPassword = new Random.RandomPassword("exampleRandomPassword", new()
    {
        Length = 16,
    });

    var exampleUser = new Aws.MemoryDb.User("exampleUser", new()
    {
        UserName = "my-user",
        AccessString = "on ~* &* +@all",
        AuthenticationMode = new Aws.MemoryDb.Inputs.UserAuthenticationModeArgs
        {
            Type = "password",
            Passwords = new[]
            {
                exampleRandomPassword.Result,
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/memorydb"
	"github.com/pulumi/pulumi-random/sdk/v4/go/random"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleRandomPassword, err := random.NewRandomPassword(ctx, "exampleRandomPassword", &random.RandomPasswordArgs{
			Length: pulumi.Int(16),
		})
		if err != nil {
			return err
		}
		_, err = memorydb.NewUser(ctx, "exampleUser", &memorydb.UserArgs{
			UserName:     pulumi.String("my-user"),
			AccessString: pulumi.String("on ~* &* +@all"),
			AuthenticationMode: &memorydb.UserAuthenticationModeArgs{
				Type: pulumi.String("password"),
				Passwords: pulumi.StringArray{
					exampleRandomPassword.Result,
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
import com.pulumi.random.RandomPassword;
import com.pulumi.random.RandomPasswordArgs;
import com.pulumi.aws.memorydb.User;
import com.pulumi.aws.memorydb.UserArgs;
import com.pulumi.aws.memorydb.inputs.UserAuthenticationModeArgs;
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
        var exampleRandomPassword = new RandomPassword("exampleRandomPassword", RandomPasswordArgs.builder()        
            .length(16)
            .build());

        var exampleUser = new User("exampleUser", UserArgs.builder()        
            .userName("my-user")
            .accessString("on ~* &* +@all")
            .authenticationMode(UserAuthenticationModeArgs.builder()
                .type("password")
                .passwords(exampleRandomPassword.result())
                .build())
            .build());

    }
}
```
```yaml
resources:
  exampleRandomPassword:
    type: random:RandomPassword
    properties:
      length: 16
  exampleUser:
    type: aws:memorydb:User
    properties:
      userName: my-user
      accessString: on ~* &* +@all
      authenticationMode:
        type: password
        passwords:
          - ${exampleRandomPassword.result}
```
{{% /example %}}
{{% /examples %}}

## Import

Use the `user_name` to import a user. For example

```sh
 $ pulumi import aws:memorydb/user:User example my-user
```

 The `passwords` are not available for imported resources, as this information cannot be read back from the MemoryDB API. 
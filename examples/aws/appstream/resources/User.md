Provides an AppStream user.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.appstream.User("example", {
    authenticationType: "USERPOOL",
    firstName: "FIRST NAME",
    lastName: "LAST NAME",
    userName: "EMAIL",
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.appstream.User("example",
    authentication_type="USERPOOL",
    first_name="FIRST NAME",
    last_name="LAST NAME",
    user_name="EMAIL")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.AppStream.User("example", new()
    {
        AuthenticationType = "USERPOOL",
        FirstName = "FIRST NAME",
        LastName = "LAST NAME",
        UserName = "EMAIL",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/appstream"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := appstream.NewUser(ctx, "example", &appstream.UserArgs{
			AuthenticationType: pulumi.String("USERPOOL"),
			FirstName:          pulumi.String("FIRST NAME"),
			LastName:           pulumi.String("LAST NAME"),
			UserName:           pulumi.String("EMAIL"),
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
import com.pulumi.aws.appstream.User;
import com.pulumi.aws.appstream.UserArgs;
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
            .authenticationType("USERPOOL")
            .firstName("FIRST NAME")
            .lastName("LAST NAME")
            .userName("EMAIL")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:appstream:User
    properties:
      authenticationType: USERPOOL
      firstName: FIRST NAME
      lastName: LAST NAME
      userName: EMAIL
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_appstream_user` can be imported using the `user_name` and `authentication_type` separated by a slash (`/`), e.g.,

```sh
 $ pulumi import aws:appstream/user:User example UserName/AuthenticationType
```

 
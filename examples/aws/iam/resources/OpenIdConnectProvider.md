Provides an IAM OpenID Connect provider.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const defaultOpenIdConnectProvider = new aws.iam.OpenIdConnectProvider("default", {
    clientIdLists: ["266362248691-342342xasdasdasda-apps.googleusercontent.com"],
    thumbprintLists: [],
    url: "https://accounts.google.com",
});
```
```python
import pulumi
import pulumi_aws as aws

default = aws.iam.OpenIdConnectProvider("default",
    client_id_lists=["266362248691-342342xasdasdasda-apps.googleusercontent.com"],
    thumbprint_lists=[],
    url="https://accounts.google.com")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var @default = new Aws.Iam.OpenIdConnectProvider("default", new()
    {
        ClientIdLists = new[]
        {
            "266362248691-342342xasdasdasda-apps.googleusercontent.com",
        },
        ThumbprintLists = new[] {},
        Url = "https://accounts.google.com",
    });

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
		_, err := iam.NewOpenIdConnectProvider(ctx, "default", &iam.OpenIdConnectProviderArgs{
			ClientIdLists: pulumi.StringArray{
				pulumi.String("266362248691-342342xasdasdasda-apps.googleusercontent.com"),
			},
			ThumbprintLists: pulumi.StringArray{},
			Url:             pulumi.String("https://accounts.google.com"),
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
import com.pulumi.aws.iam.OpenIdConnectProvider;
import com.pulumi.aws.iam.OpenIdConnectProviderArgs;
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
        var default_ = new OpenIdConnectProvider("default", OpenIdConnectProviderArgs.builder()        
            .clientIdLists("266362248691-342342xasdasdasda-apps.googleusercontent.com")
            .thumbprintLists()
            .url("https://accounts.google.com")
            .build());

    }
}
```
```yaml
resources:
  default:
    type: aws:iam:OpenIdConnectProvider
    properties:
      clientIdLists:
        - 266362248691-342342xasdasdasda-apps.googleusercontent.com
      thumbprintLists: []
      url: https://accounts.google.com
```
{{% /example %}}
{{% /examples %}}

## Import

IAM OpenID Connect Providers can be imported using the `arn`, e.g.,

```sh
 $ pulumi import aws:iam/openIdConnectProvider:OpenIdConnectProvider default arn:aws:iam::123456789012:oidc-provider/accounts.google.com
```

 
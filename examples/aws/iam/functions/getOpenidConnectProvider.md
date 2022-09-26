This data source can be used to fetch information about a specific
IAM OpenID Connect provider. By using this data source, you can retrieve the
the resource information by either its `arn` or `url`.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = pulumi.output(aws.iam.getOpenidConnectProvider({
    arn: "arn:aws:iam::123456789012:oidc-provider/accounts.google.com",
}));
```
```python
import pulumi
import pulumi_aws as aws

example = aws.iam.get_openid_connect_provider(arn="arn:aws:iam::123456789012:oidc-provider/accounts.google.com")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = Aws.Iam.GetOpenidConnectProvider.Invoke(new()
    {
        Arn = "arn:aws:iam::123456789012:oidc-provider/accounts.google.com",
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
		_, err := iam.GetOpenidConnectProvider(ctx, &iam.GetOpenidConnectProviderArgs{
			Arn: pulumi.StringRef("arn:aws:iam::123456789012:oidc-provider/accounts.google.com"),
		}, nil)
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
import com.pulumi.aws.iam.IamFunctions;
import com.pulumi.aws.iam.inputs.GetOpenidConnectProviderArgs;
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
        final var example = IamFunctions.getOpenidConnectProvider(GetOpenidConnectProviderArgs.builder()
            .arn("arn:aws:iam::123456789012:oidc-provider/accounts.google.com")
            .build());

    }
}
```
```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:iam:getOpenidConnectProvider
      Arguments:
        arn: arn:aws:iam::123456789012:oidc-provider/accounts.google.com
```

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = pulumi.output(aws.iam.getOpenidConnectProvider({
    url: "https://accounts.google.com",
}));
```
```python
import pulumi
import pulumi_aws as aws

example = aws.iam.get_openid_connect_provider(url="https://accounts.google.com")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = Aws.Iam.GetOpenidConnectProvider.Invoke(new()
    {
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
		_, err := iam.GetOpenidConnectProvider(ctx, &iam.GetOpenidConnectProviderArgs{
			Url: pulumi.StringRef("https://accounts.google.com"),
		}, nil)
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
import com.pulumi.aws.iam.IamFunctions;
import com.pulumi.aws.iam.inputs.GetOpenidConnectProviderArgs;
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
        final var example = IamFunctions.getOpenidConnectProvider(GetOpenidConnectProviderArgs.builder()
            .url("https://accounts.google.com")
            .build());

    }
}
```
```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:iam:getOpenidConnectProvider
      Arguments:
        url: https://accounts.google.com
```
{{% /example %}}
{{% /examples %}}
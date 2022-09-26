Provides a SageMaker App resource.

{{% examples %}}
## Example Usage
{{% example %}}
### Basic usage

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.sagemaker.App("example", {
    domainId: aws_sagemaker_domain.example.id,
    userProfileName: aws_sagemaker_user_profile.example.user_profile_name,
    appName: "example",
    appType: "JupyterServer",
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.sagemaker.App("example",
    domain_id=aws_sagemaker_domain["example"]["id"],
    user_profile_name=aws_sagemaker_user_profile["example"]["user_profile_name"],
    app_name="example",
    app_type="JupyterServer")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Sagemaker.App("example", new()
    {
        DomainId = aws_sagemaker_domain.Example.Id,
        UserProfileName = aws_sagemaker_user_profile.Example.User_profile_name,
        AppName = "example",
        AppType = "JupyterServer",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sagemaker"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := sagemaker.NewApp(ctx, "example", &sagemaker.AppArgs{
			DomainId:        pulumi.Any(aws_sagemaker_domain.Example.Id),
			UserProfileName: pulumi.Any(aws_sagemaker_user_profile.Example.User_profile_name),
			AppName:         pulumi.String("example"),
			AppType:         pulumi.String("JupyterServer"),
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
import com.pulumi.aws.sagemaker.App;
import com.pulumi.aws.sagemaker.AppArgs;
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
        var example = new App("example", AppArgs.builder()        
            .domainId(aws_sagemaker_domain.example().id())
            .userProfileName(aws_sagemaker_user_profile.example().user_profile_name())
            .appName("example")
            .appType("JupyterServer")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:sagemaker:App
    properties:
      domainId: ${aws_sagemaker_domain.example.id}
      userProfileName: ${aws_sagemaker_user_profile.example.user_profile_name}
      appName: example
      appType: JupyterServer
```
{{% /example %}}
{{% /examples %}}

## Import

SageMaker Code Apps can be imported using the `id`, e.g.,

```sh
 $ pulumi import aws:sagemaker/app:App example arn:aws:sagemaker:us-west-2:012345678912:app/domain-id/user-profile-name/app-type/app-name
```

 
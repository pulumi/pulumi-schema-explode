Provides a resource to manage AWS Device Farm Instance Profiles.
∂
> **NOTE:** AWS currently has limited regional support for Device Farm (e.g., `us-west-2`). See [AWS Device Farm endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/devicefarm.html) for information on supported regions.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.devicefarm.InstanceProfile("example", {});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.devicefarm.InstanceProfile("example")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.DeviceFarm.InstanceProfile("example");

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/devicefarm"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := devicefarm.NewInstanceProfile(ctx, "example", nil)
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
import com.pulumi.aws.devicefarm.InstanceProfile;
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
        var example = new InstanceProfile("example");

    }
}
```
```yaml
resources:
  example:
    type: aws:devicefarm:InstanceProfile
```
{{% /example %}}
{{% /examples %}}

## Import

DeviceFarm Instance Profiles can be imported by their arn

```sh
 $ pulumi import aws:devicefarm/instanceProfile:InstanceProfile example arn:aws:devicefarm:us-west-2:123456789012:instanceprofile:4fa784c7-ccb4-4dbf-ba4f-02198320daa1
```

 
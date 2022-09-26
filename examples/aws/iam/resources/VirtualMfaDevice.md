{{% examples %}}
## Example Usage
{{% example %}}

**Using certs on file:**

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.iam.VirtualMfaDevice("example", {
    virtualMfaDeviceName: "example",
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.iam.VirtualMfaDevice("example", virtual_mfa_device_name="example")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Iam.VirtualMfaDevice("example", new()
    {
        VirtualMfaDeviceName = "example",
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
		_, err := iam.NewVirtualMfaDevice(ctx, "example", &iam.VirtualMfaDeviceArgs{
			VirtualMfaDeviceName: pulumi.String("example"),
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
import com.pulumi.aws.iam.VirtualMfaDevice;
import com.pulumi.aws.iam.VirtualMfaDeviceArgs;
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
        var example = new VirtualMfaDevice("example", VirtualMfaDeviceArgs.builder()        
            .virtualMfaDeviceName("example")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:iam:VirtualMfaDevice
    properties:
      virtualMfaDeviceName: example
```
{{% /example %}}
{{% /examples %}}

## Import

IAM Virtual MFA Devices can be imported using the `arn`, e.g.,

```sh
 $ pulumi import aws:iam/virtualMfaDevice:VirtualMfaDevice example arn:aws:iam::123456789012:mfa/example
```

 
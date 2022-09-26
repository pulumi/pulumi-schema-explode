Creates a Global Accelerator accelerator.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.globalaccelerator.Accelerator("example", {
    attributes: {
        flowLogsEnabled: true,
        flowLogsS3Bucket: "example-bucket",
        flowLogsS3Prefix: "flow-logs/",
    },
    enabled: true,
    ipAddressType: "IPV4",
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.globalaccelerator.Accelerator("example",
    attributes=aws.globalaccelerator.AcceleratorAttributesArgs(
        flow_logs_enabled=True,
        flow_logs_s3_bucket="example-bucket",
        flow_logs_s3_prefix="flow-logs/",
    ),
    enabled=True,
    ip_address_type="IPV4")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.GlobalAccelerator.Accelerator("example", new()
    {
        Attributes = new Aws.GlobalAccelerator.Inputs.AcceleratorAttributesArgs
        {
            FlowLogsEnabled = true,
            FlowLogsS3Bucket = "example-bucket",
            FlowLogsS3Prefix = "flow-logs/",
        },
        Enabled = true,
        IpAddressType = "IPV4",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/globalaccelerator"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := globalaccelerator.NewAccelerator(ctx, "example", &globalaccelerator.AcceleratorArgs{
			Attributes: &globalaccelerator.AcceleratorAttributesArgs{
				FlowLogsEnabled:  pulumi.Bool(true),
				FlowLogsS3Bucket: pulumi.String("example-bucket"),
				FlowLogsS3Prefix: pulumi.String("flow-logs/"),
			},
			Enabled:       pulumi.Bool(true),
			IpAddressType: pulumi.String("IPV4"),
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
import com.pulumi.aws.globalaccelerator.Accelerator;
import com.pulumi.aws.globalaccelerator.AcceleratorArgs;
import com.pulumi.aws.globalaccelerator.inputs.AcceleratorAttributesArgs;
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
        var example = new Accelerator("example", AcceleratorArgs.builder()        
            .attributes(AcceleratorAttributesArgs.builder()
                .flowLogsEnabled(true)
                .flowLogsS3Bucket("example-bucket")
                .flowLogsS3Prefix("flow-logs/")
                .build())
            .enabled(true)
            .ipAddressType("IPV4")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:globalaccelerator:Accelerator
    properties:
      attributes:
        flowLogsEnabled: true
        flowLogsS3Bucket: example-bucket
        flowLogsS3Prefix: flow-logs/
      enabled: true
      ipAddressType: IPV4
```
{{% /example %}}
{{% /examples %}}

## Import

Global Accelerator accelerators can be imported using the `arn`, e.g.,

```sh
 $ pulumi import aws:globalaccelerator/accelerator:Accelerator example arn:aws:globalaccelerator::111111111111:accelerator/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

 
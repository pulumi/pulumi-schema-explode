The AMI resource allows the creation and management of a completely-custom
*Amazon Machine Image* (AMI).

If you just want to duplicate an existing AMI, possibly copying it to another
region, it's better to use `aws.ec2.AmiCopy` instead.

If you just want to share an existing AMI with another AWS account,
it's better to use `aws.ec2.AmiLaunchPermission` instead.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Create an AMI that will start a machine whose root device is backed by
// an EBS volume populated from a snapshot. We assume that such a snapshot
// already exists with the id "snap-xxxxxxxx".
const example = new aws.ec2.Ami("example", {
    ebsBlockDevices: [{
        deviceName: "/dev/xvda",
        snapshotId: "snap-xxxxxxxx",
        volumeSize: 8,
    }],
    rootDeviceName: "/dev/xvda",
    virtualizationType: "hvm",
});
```
```python
import pulumi
import pulumi_aws as aws

# Create an AMI that will start a machine whose root device is backed by
# an EBS volume populated from a snapshot. We assume that such a snapshot
# already exists with the id "snap-xxxxxxxx".
example = aws.ec2.Ami("example",
    ebs_block_devices=[aws.ec2.AmiEbsBlockDeviceArgs(
        device_name="/dev/xvda",
        snapshot_id="snap-xxxxxxxx",
        volume_size=8,
    )],
    root_device_name="/dev/xvda",
    virtualization_type="hvm")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    // Create an AMI that will start a machine whose root device is backed by
    // an EBS volume populated from a snapshot. We assume that such a snapshot
    // already exists with the id "snap-xxxxxxxx".
    var example = new Aws.Ec2.Ami("example", new()
    {
        EbsBlockDevices = new[]
        {
            new Aws.Ec2.Inputs.AmiEbsBlockDeviceArgs
            {
                DeviceName = "/dev/xvda",
                SnapshotId = "snap-xxxxxxxx",
                VolumeSize = 8,
            },
        },
        RootDeviceName = "/dev/xvda",
        VirtualizationType = "hvm",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ec2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := ec2.NewAmi(ctx, "example", &ec2.AmiArgs{
			EbsBlockDevices: ec2.AmiEbsBlockDeviceArray{
				&ec2.AmiEbsBlockDeviceArgs{
					DeviceName: pulumi.String("/dev/xvda"),
					SnapshotId: pulumi.String("snap-xxxxxxxx"),
					VolumeSize: pulumi.Int(8),
				},
			},
			RootDeviceName:     pulumi.String("/dev/xvda"),
			VirtualizationType: pulumi.String("hvm"),
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
import com.pulumi.aws.ec2.Ami;
import com.pulumi.aws.ec2.AmiArgs;
import com.pulumi.aws.ec2.inputs.AmiEbsBlockDeviceArgs;
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
        var example = new Ami("example", AmiArgs.builder()        
            .ebsBlockDevices(AmiEbsBlockDeviceArgs.builder()
                .deviceName("/dev/xvda")
                .snapshotId("snap-xxxxxxxx")
                .volumeSize(8)
                .build())
            .rootDeviceName("/dev/xvda")
            .virtualizationType("hvm")
            .build());

    }
}
```
```yaml
resources:
  # Create an AMI that will start a machine whose root device is backed by
  # // an EBS volume populated from a snapshot. We assume that such a snapshot
  # // already exists with the id "snap-xxxxxxxx".
  example:
    type: aws:ec2:Ami
    properties:
      ebsBlockDevices:
        - deviceName: /dev/xvda
          snapshotId: snap-xxxxxxxx
          volumeSize: 8
      rootDeviceName: /dev/xvda
      virtualizationType: hvm
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_ami` can be imported using the ID of the AMI, e.g.,

```sh
 $ pulumi import aws:ec2/ami:Ami example ami-12345678
```

 
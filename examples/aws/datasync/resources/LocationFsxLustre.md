Manages an AWS DataSync FSx Lustre Location.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.datasync.LocationFsxLustre("example", {
    fsxFilesystemArn: aws_fsx_lustre_file_system.example.arn,
    securityGroupArns: [aws_security_group.example.arn],
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.datasync.LocationFsxLustre("example",
    fsx_filesystem_arn=aws_fsx_lustre_file_system["example"]["arn"],
    security_group_arns=[aws_security_group["example"]["arn"]])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.DataSync.LocationFsxLustre("example", new()
    {
        FsxFilesystemArn = aws_fsx_lustre_file_system.Example.Arn,
        SecurityGroupArns = new[]
        {
            aws_security_group.Example.Arn,
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/datasync"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := datasync.NewLocationFsxLustre(ctx, "example", &datasync.LocationFsxLustreArgs{
			FsxFilesystemArn: pulumi.Any(aws_fsx_lustre_file_system.Example.Arn),
			SecurityGroupArns: pulumi.StringArray{
				pulumi.Any(aws_security_group.Example.Arn),
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
import com.pulumi.aws.datasync.LocationFsxLustre;
import com.pulumi.aws.datasync.LocationFsxLustreArgs;
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
        var example = new LocationFsxLustre("example", LocationFsxLustreArgs.builder()        
            .fsxFilesystemArn(aws_fsx_lustre_file_system.example().arn())
            .securityGroupArns(aws_security_group.example().arn())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:datasync:LocationFsxLustre
    properties:
      fsxFilesystemArn: ${aws_fsx_lustre_file_system.example.arn}
      securityGroupArns:
        - ${aws_security_group.example.arn}
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_datasync_location_fsx_lustre_file_system` can be imported by using the `DataSync-ARN#FSx-Lustre-ARN`, e.g.,

```sh
 $ pulumi import aws:datasync/locationFsxLustre:LocationFsxLustre example arn:aws:datasync:us-west-2:123456789012:location/loc-12345678901234567#arn:aws:fsx:us-west-2:476956259333:file-system/fs-08e04cd442c1bb94a
```

 
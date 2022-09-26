Manages an Amazon FSx for OpenZFS file system.
See the [FSx OpenZFS User Guide](https://docs.aws.amazon.com/fsx/latest/OpenZFSGuide/what-is-fsx.html) for more information.

{{% examples %}}
## Example Usage
{{% example %}}

```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.fsx.OpenZfsFileSystem;
import com.pulumi.aws.fsx.OpenZfsFileSystemArgs;
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
        var test = new OpenZfsFileSystem("test", OpenZfsFileSystemArgs.builder()        
            .storageCapacity(64)
            .subnetIds(aws_subnet.test1().id())
            .deploymentType("SINGLE_AZ_1")
            .throughputCapacity(64)
            .build());

    }
}
```
```yaml
resources:
  test:
    type: aws:fsx:OpenZfsFileSystem
    properties:
      storageCapacity: 64
      subnetIds:
        - ${aws_subnet.test1.id}
      deploymentType: SINGLE_AZ_1
      throughputCapacity: 64
```
{{% /example %}}
{{% /examples %}}

## Import

FSx File Systems can be imported using the `id`, e.g.,

```sh
 $ pulumi import aws:fsx/openZfsFileSystem:OpenZfsFileSystem example fs-543ab12b1ca672f33
```

 Certain resource arguments, like `security_group_ids`, do not have a FSx API method for reading the information after creation. If the argument is set in the Terraform configuration on an imported resource, Terraform will always show a difference. To workaround this behavior, either omit the argument from the Terraform configuration or use [`ignore_changes`](https://www.terraform.io/docs/configuration/meta-arguments/lifecycle.html#ignore_changes) to hide the difference, e.g., terraform resource "aws_fsx_openzfs_file_system" "example" {

 # ... other configuration ...

 security_group_ids = [aws_security_group.example.id]

 # There is no FSx API for reading security_group_ids

 lifecycle {



 ignore_changes = [security_group_ids]

 } } 
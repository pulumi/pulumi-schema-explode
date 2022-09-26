Manages a FSx Lustre File System. See the [FSx Lustre Guide](https://docs.aws.amazon.com/fsx/latest/LustreGuide/what-is.html) for more information.

> **NOTE:** `auto_import_policy`, `export_path`, `import_path` and `imported_file_chunk_size` are not supported with the `PERSISTENT_2` deployment type. Use `aws.fsx.DataRepositoryAssociation` instead.

{{% examples %}}
## Example Usage
{{% example %}}

```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.fsx.LustreFileSystem;
import com.pulumi.aws.fsx.LustreFileSystemArgs;
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
        var example = new LustreFileSystem("example", LustreFileSystemArgs.builder()        
            .importPath(String.format("s3://%s", aws_s3_bucket.example().bucket()))
            .storageCapacity(1200)
            .subnetIds(aws_subnet.example().id())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:fsx:LustreFileSystem
    properties:
      importPath: s3://${aws_s3_bucket.example.bucket}
      storageCapacity: 1200
      subnetIds:
        - ${aws_subnet.example.id}
```
{{% /example %}}
{{% /examples %}}

## Import

FSx File Systems can be imported using the `id`, e.g.,

```sh
 $ pulumi import aws:fsx/lustreFileSystem:LustreFileSystem example fs-543ab12b1ca672f33
```

 Certain resource arguments, like `security_group_ids`, do not have a FSx API method for reading the information after creation. If the argument is set in the provider configuration on an imported resource, this provider will always show a difference. To workaround this behavior, either omit the argument from the provider configuration or use [`ignoreChanges`](https://www.pulumi.com/docs/intro/concepts/programming-model/#ignorechanges) to hide the difference, e.g. terraform resource "aws_fsx_lustre_file_system" "example" {

 # ... other configuration ...

 security_group_ids = [aws_security_group.example.id]

 # There is no FSx API for reading security_group_ids

 lifecycle {



 ignore_changes = [security_group_ids]

 } } 
Manages an Amazon FSx for OpenZFS volume.
See the [FSx OpenZFS User Guide](https://docs.aws.amazon.com/fsx/latest/OpenZFSGuide/what-is-fsx.html) for more information.


{{% examples %}}
## Example Usage
{{% example %}}
### Root volume Example

```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.fsx.OpenZfsFileSystem;
import com.pulumi.aws.fsx.OpenZfsFileSystemArgs;
import com.pulumi.aws.fsx.OpenZfsSnapshot;
import com.pulumi.aws.fsx.OpenZfsSnapshotArgs;
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
        var exampleOpenZfsFileSystem = new OpenZfsFileSystem("exampleOpenZfsFileSystem", OpenZfsFileSystemArgs.builder()        
            .storageCapacity(64)
            .subnetIds(aws_subnet.example().id())
            .deploymentType("SINGLE_AZ_1")
            .throughputCapacity(64)
            .build());

        var exampleOpenZfsSnapshot = new OpenZfsSnapshot("exampleOpenZfsSnapshot", OpenZfsSnapshotArgs.builder()        
            .volumeId(exampleOpenZfsFileSystem.rootVolumeId())
            .build());

    }
}
```
```yaml
resources:
  exampleOpenZfsSnapshot:
    type: aws:fsx:OpenZfsSnapshot
    properties:
      volumeId: ${exampleOpenZfsFileSystem.rootVolumeId}
  exampleOpenZfsFileSystem:
    type: aws:fsx:OpenZfsFileSystem
    properties:
      storageCapacity: 64
      subnetIds:
        - ${aws_subnet.example.id}
      deploymentType: SINGLE_AZ_1
      throughputCapacity: 64
```
{{% /example %}}
{{% example %}}
### Child volume Example

```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.fsx.OpenZfsFileSystem;
import com.pulumi.aws.fsx.OpenZfsFileSystemArgs;
import com.pulumi.aws.fsx.OpenZfsVolume;
import com.pulumi.aws.fsx.OpenZfsVolumeArgs;
import com.pulumi.aws.fsx.OpenZfsSnapshot;
import com.pulumi.aws.fsx.OpenZfsSnapshotArgs;
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
        var exampleOpenZfsFileSystem = new OpenZfsFileSystem("exampleOpenZfsFileSystem", OpenZfsFileSystemArgs.builder()        
            .storageCapacity(64)
            .subnetIds(aws_subnet.example().id())
            .deploymentType("SINGLE_AZ_1")
            .throughputCapacity(64)
            .build());

        var exampleOpenZfsVolume = new OpenZfsVolume("exampleOpenZfsVolume", OpenZfsVolumeArgs.builder()        
            .parentVolumeId(exampleOpenZfsFileSystem.rootVolumeId())
            .build());

        var exampleOpenZfsSnapshot = new OpenZfsSnapshot("exampleOpenZfsSnapshot", OpenZfsSnapshotArgs.builder()        
            .volumeId(exampleOpenZfsVolume.id())
            .build());

    }
}
```
```yaml
resources:
  exampleOpenZfsSnapshot:
    type: aws:fsx:OpenZfsSnapshot
    properties:
      volumeId: ${exampleOpenZfsVolume.id}
  exampleOpenZfsVolume:
    type: aws:fsx:OpenZfsVolume
    properties:
      parentVolumeId: ${exampleOpenZfsFileSystem.rootVolumeId}
  exampleOpenZfsFileSystem:
    type: aws:fsx:OpenZfsFileSystem
    properties:
      storageCapacity: 64
      subnetIds:
        - ${aws_subnet.example.id}
      deploymentType: SINGLE_AZ_1
      throughputCapacity: 64
```
{{% /example %}}
{{% /examples %}}

## Import

FSx OpenZFS snapshot can be imported using the `id`, e.g.,

```sh
 $ pulumi import aws:fsx/openZfsSnapshot:OpenZfsSnapshot example fs-543ab12b1ca672f33
```

 
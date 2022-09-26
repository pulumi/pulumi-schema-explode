Manages a FSx for Lustre Data Repository Association. See [Linking your file system to an S3 bucket](https://docs.aws.amazon.com/fsx/latest/LustreGuide/create-dra-linked-data-repo.html) for more information.

> **NOTE:** Data Repository Associations are only compatible with AWS FSx for Lustre File Systems and `PERSISTENT_2` deployment type.

{{% examples %}}
## Example Usage
{{% example %}}

```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.s3.BucketAclV2;
import com.pulumi.aws.s3.BucketAclV2Args;
import com.pulumi.aws.fsx.LustreFileSystem;
import com.pulumi.aws.fsx.LustreFileSystemArgs;
import com.pulumi.aws.fsx.DataRepositoryAssociation;
import com.pulumi.aws.fsx.DataRepositoryAssociationArgs;
import com.pulumi.aws.fsx.inputs.DataRepositoryAssociationS3Args;
import com.pulumi.aws.fsx.inputs.DataRepositoryAssociationS3AutoExportPolicyArgs;
import com.pulumi.aws.fsx.inputs.DataRepositoryAssociationS3AutoImportPolicyArgs;
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
        var exampleBucketV2 = new BucketV2("exampleBucketV2");

        var exampleBucketAclV2 = new BucketAclV2("exampleBucketAclV2", BucketAclV2Args.builder()        
            .bucket(exampleBucketV2.id())
            .acl("private")
            .build());

        var exampleLustreFileSystem = new LustreFileSystem("exampleLustreFileSystem", LustreFileSystemArgs.builder()        
            .storageCapacity(1200)
            .subnetIds(aws_subnet.example().id())
            .deploymentType("PERSISTENT_2")
            .perUnitStorageThroughput(125)
            .build());

        var exampleDataRepositoryAssociation = new DataRepositoryAssociation("exampleDataRepositoryAssociation", DataRepositoryAssociationArgs.builder()        
            .fileSystemId(exampleLustreFileSystem.id())
            .dataRepositoryPath(exampleBucketV2.id().applyValue(id -> String.format("s3://%s", id)))
            .fileSystemPath("/my-bucket")
            .s3(DataRepositoryAssociationS3Args.builder()
                .autoExportPolicy(DataRepositoryAssociationS3AutoExportPolicyArgs.builder()
                    .events(                    
                        "NEW",
                        "CHANGED",
                        "DELETED")
                    .build())
                .autoImportPolicy(DataRepositoryAssociationS3AutoImportPolicyArgs.builder()
                    .events(                    
                        "NEW",
                        "CHANGED",
                        "DELETED")
                    .build())
                .build())
            .build());

    }
}
```
```yaml
resources:
  exampleBucketV2:
    type: aws:s3:BucketV2
  exampleBucketAclV2:
    type: aws:s3:BucketAclV2
    properties:
      bucket: ${exampleBucketV2.id}
      acl: private
  exampleLustreFileSystem:
    type: aws:fsx:LustreFileSystem
    properties:
      storageCapacity: 1200
      subnetIds:
        - ${aws_subnet.example.id}
      deploymentType: PERSISTENT_2
      perUnitStorageThroughput: 125
  exampleDataRepositoryAssociation:
    type: aws:fsx:DataRepositoryAssociation
    properties:
      fileSystemId: ${exampleLustreFileSystem.id}
      dataRepositoryPath: s3://${exampleBucketV2.id}
      fileSystemPath: /my-bucket
      s3:
        autoExportPolicy:
          events:
            - NEW
            - CHANGED
            - DELETED
        autoImportPolicy:
          events:
            - NEW
            - CHANGED
            - DELETED
```
{{% /example %}}
{{% /examples %}}

## Import

FSx Data Repository Associations can be imported using the `id`, e.g.,

```sh
 $ pulumi import aws:fsx/dataRepositoryAssociation:DataRepositoryAssociation example dra-0b1cfaeca11088b10
```

 
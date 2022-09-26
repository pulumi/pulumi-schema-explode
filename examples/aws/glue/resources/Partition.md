Provides a Glue Partition Resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.glue.Partition("example", {
    databaseName: "some-database",
    tableName: "some-table",
    values: ["some-value"],
});
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.glue.Partition;
import com.pulumi.aws.glue.PartitionArgs;
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
        var example = new Partition("example", PartitionArgs.builder()        
            .databaseName("some-database")
            .tableName("some-table")
            .values("some-value")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:glue:Partition
    properties:
      databaseName: some-database
      tableName: some-table
      values:
        - some-value
```
{{% /example %}}
{{% /examples %}}

## Import

Glue Partitions can be imported with their catalog ID (usually AWS account ID), database name, table name and partition values e.g.,

```sh
 $ pulumi import aws:glue/partition:Partition part 123456789012:MyDatabase:MyTable:val1#val2
```

 
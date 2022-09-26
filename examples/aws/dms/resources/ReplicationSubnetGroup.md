Provides a DMS (Data Migration Service) replication subnet group resource. DMS replication subnet groups can be created, updated, deleted, and imported.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Create a new replication subnet group
const test = new aws.dms.ReplicationSubnetGroup("test", {
    replicationSubnetGroupDescription: "Test replication subnet group",
    replicationSubnetGroupId: "test-dms-replication-subnet-group-tf",
    subnetIds: ["subnet-12345678"],
    tags: {
        Name: "test",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

# Create a new replication subnet group
test = aws.dms.ReplicationSubnetGroup("test",
    replication_subnet_group_description="Test replication subnet group",
    replication_subnet_group_id="test-dms-replication-subnet-group-tf",
    subnet_ids=["subnet-12345678"],
    tags={
        "Name": "test",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    // Create a new replication subnet group
    var test = new Aws.Dms.ReplicationSubnetGroup("test", new()
    {
        ReplicationSubnetGroupDescription = "Test replication subnet group",
        ReplicationSubnetGroupId = "test-dms-replication-subnet-group-tf",
        SubnetIds = new[]
        {
            "subnet-12345678",
        },
        Tags = 
        {
            { "Name", "test" },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/dms"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := dms.NewReplicationSubnetGroup(ctx, "test", &dms.ReplicationSubnetGroupArgs{
			ReplicationSubnetGroupDescription: pulumi.String("Test replication subnet group"),
			ReplicationSubnetGroupId:          pulumi.String("test-dms-replication-subnet-group-tf"),
			SubnetIds: pulumi.StringArray{
				pulumi.String("subnet-12345678"),
			},
			Tags: pulumi.StringMap{
				"Name": pulumi.String("test"),
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
import com.pulumi.aws.dms.ReplicationSubnetGroup;
import com.pulumi.aws.dms.ReplicationSubnetGroupArgs;
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
        var test = new ReplicationSubnetGroup("test", ReplicationSubnetGroupArgs.builder()        
            .replicationSubnetGroupDescription("Test replication subnet group")
            .replicationSubnetGroupId("test-dms-replication-subnet-group-tf")
            .subnetIds("subnet-12345678")
            .tags(Map.of("Name", "test"))
            .build());

    }
}
```
```yaml
resources:
  # Create a new replication subnet group
  test:
    type: aws:dms:ReplicationSubnetGroup
    properties:
      replicationSubnetGroupDescription: Test replication subnet group
      replicationSubnetGroupId: test-dms-replication-subnet-group-tf
      subnetIds:
        - subnet-12345678
      tags:
        Name: test
```
{{% /example %}}
{{% /examples %}}

## Import

Replication subnet groups can be imported using the `replication_subnet_group_id`, e.g.,

```sh
 $ pulumi import aws:dms/replicationSubnetGroup:ReplicationSubnetGroup test test-dms-replication-subnet-group-tf
```

 
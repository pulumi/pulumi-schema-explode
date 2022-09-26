Manages an DocumentDB Global Cluster. A global cluster consists of one primary region and up to five read-only secondary regions. You issue write operations directly to the primary cluster in the primary region and Amazon DocumentDB automatically replicates the data to the secondary regions using dedicated infrastructure.

More information about DocumentDB Global Clusters can be found in the [DocumentDB Developer Guide](https://docs.aws.amazon.com/documentdb/latest/developerguide/global-clusters.html).

{{% examples %}}
## Example Usage
{{% example %}}
### New DocumentDB Global Cluster

```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.Provider;
import com.pulumi.aws.ProviderArgs;
import com.pulumi.aws.docdb.GlobalCluster;
import com.pulumi.aws.docdb.GlobalClusterArgs;
import com.pulumi.aws.docdb.Cluster;
import com.pulumi.aws.docdb.ClusterArgs;
import com.pulumi.aws.docdb.ClusterInstance;
import com.pulumi.aws.docdb.ClusterInstanceArgs;
import com.pulumi.resources.CustomResourceOptions;
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
        var primary = new Provider("primary", ProviderArgs.builder()        
            .region("us-east-2")
            .build());

        var secondary = new Provider("secondary", ProviderArgs.builder()        
            .region("us-east-1")
            .build());

        var example = new GlobalCluster("example", GlobalClusterArgs.builder()        
            .globalClusterIdentifier("global-test")
            .engine("docdb")
            .engineVersion("4.0.0")
            .build());

        var primaryCluster = new Cluster("primaryCluster", ClusterArgs.builder()        
            .engine(example.engine())
            .engineVersion(example.engineVersion())
            .clusterIdentifier("test-primary-cluster")
            .masterUsername("username")
            .masterPassword("somepass123")
            .globalClusterIdentifier(example.id())
            .dbSubnetGroupName("default")
            .build(), CustomResourceOptions.builder()
                .provider(aws.primary())
                .build());

        var primaryClusterInstance = new ClusterInstance("primaryClusterInstance", ClusterInstanceArgs.builder()        
            .engine(example.engine())
            .engineVersion(example.engineVersion())
            .identifier("test-primary-cluster-instance")
            .clusterIdentifier(primaryCluster.id())
            .instanceClass("db.r5.large")
            .dbSubnetGroupName("default")
            .build(), CustomResourceOptions.builder()
                .provider(aws.primary())
                .build());

        var secondaryCluster = new Cluster("secondaryCluster", ClusterArgs.builder()        
            .engine(example.engine())
            .engineVersion(example.engineVersion())
            .clusterIdentifier("test-secondary-cluster")
            .globalClusterIdentifier(example.id())
            .dbSubnetGroupName("default")
            .build(), CustomResourceOptions.builder()
                .provider(aws.secondary())
                .build());

        var secondaryClusterInstance = new ClusterInstance("secondaryClusterInstance", ClusterInstanceArgs.builder()        
            .engine(example.engine())
            .engineVersion(example.engineVersion())
            .identifier("test-secondary-cluster-instance")
            .clusterIdentifier(secondaryCluster.id())
            .instanceClass("db.r5.large")
            .dbSubnetGroupName("default")
            .build(), CustomResourceOptions.builder()
                .provider(aws.secondary())
                .dependsOn(primaryClusterInstance)
                .build());

    }
}
```
```yaml
resources:
  primary:
    type: pulumi:providers:aws
    properties:
      region: us-east-2
  secondary:
    type: pulumi:providers:aws
    properties:
      region: us-east-1
  example:
    type: aws:docdb:GlobalCluster
    properties:
      globalClusterIdentifier: global-test
      engine: docdb
      engineVersion: 4.0.0
  primaryCluster:
    type: aws:docdb:Cluster
    properties:
      engine: ${example.engine}
      engineVersion: ${example.engineVersion}
      clusterIdentifier: test-primary-cluster
      masterUsername: username
      masterPassword: somepass123
      globalClusterIdentifier: ${example.id}
      dbSubnetGroupName: default
    options:
      provider: ${aws.primary}
  primaryClusterInstance:
    type: aws:docdb:ClusterInstance
    properties:
      engine: ${example.engine}
      engineVersion: ${example.engineVersion}
      identifier: test-primary-cluster-instance
      clusterIdentifier: ${primaryCluster.id}
      instanceClass: db.r5.large
      dbSubnetGroupName: default
    options:
      provider: ${aws.primary}
  secondaryCluster:
    type: aws:docdb:Cluster
    properties:
      engine: ${example.engine}
      engineVersion: ${example.engineVersion}
      clusterIdentifier: test-secondary-cluster
      globalClusterIdentifier: ${example.id}
      dbSubnetGroupName: default
    options:
      provider: ${aws.secondary}
  secondaryClusterInstance:
    type: aws:docdb:ClusterInstance
    properties:
      engine: ${example.engine}
      engineVersion: ${example.engineVersion}
      identifier: test-secondary-cluster-instance
      clusterIdentifier: ${secondaryCluster.id}
      instanceClass: db.r5.large
      dbSubnetGroupName: default
    options:
      provider: ${aws.secondary}
      dependson:
        - ${primaryClusterInstance}
```
{{% /example %}}
{{% example %}}
### New Global Cluster From Existing DB Cluster

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// ... other configuration ...
const exampleCluster = new aws.docdb.Cluster("exampleCluster", {});
const exampleGlobalCluster = new aws.docdb.GlobalCluster("exampleGlobalCluster", {
    globalClusterIdentifier: "example",
    sourceDbClusterIdentifier: exampleCluster.arn,
});
```
```python
import pulumi
import pulumi_aws as aws

# ... other configuration ...
example_cluster = aws.docdb.Cluster("exampleCluster")
example_global_cluster = aws.docdb.GlobalCluster("exampleGlobalCluster",
    global_cluster_identifier="example",
    source_db_cluster_identifier=example_cluster.arn)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    // ... other configuration ...
    var exampleCluster = new Aws.DocDB.Cluster("exampleCluster");

    var exampleGlobalCluster = new Aws.DocDB.GlobalCluster("exampleGlobalCluster", new()
    {
        GlobalClusterIdentifier = "example",
        SourceDbClusterIdentifier = exampleCluster.Arn,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/docdb"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleCluster, err := docdb.NewCluster(ctx, "exampleCluster", nil)
		if err != nil {
			return err
		}
		_, err = docdb.NewGlobalCluster(ctx, "exampleGlobalCluster", &docdb.GlobalClusterArgs{
			GlobalClusterIdentifier:   pulumi.String("example"),
			SourceDbClusterIdentifier: exampleCluster.Arn,
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
import com.pulumi.aws.docdb.Cluster;
import com.pulumi.aws.docdb.GlobalCluster;
import com.pulumi.aws.docdb.GlobalClusterArgs;
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
        var exampleCluster = new Cluster("exampleCluster");

        var exampleGlobalCluster = new GlobalCluster("exampleGlobalCluster", GlobalClusterArgs.builder()        
            .globalClusterIdentifier("example")
            .sourceDbClusterIdentifier(exampleCluster.arn())
            .build());

    }
}
```
```yaml
resources:
  exampleCluster:
    type: aws:docdb:Cluster
  exampleGlobalCluster:
    type: aws:docdb:GlobalCluster
    properties:
      globalClusterIdentifier: example
      sourceDbClusterIdentifier: ${exampleCluster.arn}
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_docdb_global_cluster` can be imported by using the Global Cluster identifier, e.g.

```sh
 $ pulumi import aws:docdb/globalCluster:GlobalCluster example example
```

 Certain resource arguments, like `source_db_cluster_identifier`, do not have an API method for reading the information after creation. If the argument is set in the Terraform configuration on an imported resource, Terraform will always show a difference. To workaround this behavior, either omit the argument from the Terraform configuration or use [`ignore_changes`](https://www.terraform.io/docs/configuration/meta-arguments/lifecycle.html#ignore_changes) to hide the difference, e.g. terraform resource "aws_docdb_global_cluster" "example" {

 # ... other configuration ...

 # There is no API for reading source_db_cluster_identifier

 lifecycle {



 ignore_changes = [source_db_cluster_identifier]

 } } 
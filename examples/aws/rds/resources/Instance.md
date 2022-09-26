Provides an RDS instance resource.  A DB instance is an isolated database
environment in the cloud.  A DB instance can contain multiple user-created
databases.

Changes to a DB instance can occur when you manually change a parameter, such as
`allocated_storage`, and are reflected in the next maintenance window. Because
of this, this provider may report a difference in its planning phase because a
modification has not yet taken place. You can use the `apply_immediately` flag
to instruct the service to apply the change immediately (see documentation
below).

When upgrading the major version of an engine, `allow_major_version_upgrade`
must be set to `true`.

> **Note:** using `apply_immediately` can result in a brief downtime as the
server reboots. See the AWS Docs on [RDS Maintenance][2] for more information.

## RDS Instance Class Types

Amazon RDS supports three types of instance classes: Standard, Memory Optimized,
and Burstable Performance. For more information please read the AWS RDS documentation
about [DB Instance Class Types](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.DBInstanceClass.html)

{{% examples %}}
## Example Usage
{{% example %}}
### Basic Usage

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const defaultInstance = new aws.rds.Instance("default", {
    allocatedStorage: 10,
    engine: "mysql",
    engineVersion: "5.7",
    instanceClass: "db.t3.micro",
    name: "mydb",
    parameterGroupName: "default.mysql5.7",
    password: "foobarbaz",
    skipFinalSnapshot: true,
    username: "foo",
});
```
```python
import pulumi
import pulumi_aws as aws

default = aws.rds.Instance("default",
    allocated_storage=10,
    engine="mysql",
    engine_version="5.7",
    instance_class="db.t3.micro",
    name="mydb",
    parameter_group_name="default.mysql5.7",
    password="foobarbaz",
    skip_final_snapshot=True,
    username="foo")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var @default = new Aws.Rds.Instance("default", new()
    {
        AllocatedStorage = 10,
        Engine = "mysql",
        EngineVersion = "5.7",
        InstanceClass = "db.t3.micro",
        Name = "mydb",
        ParameterGroupName = "default.mysql5.7",
        Password = "foobarbaz",
        SkipFinalSnapshot = true,
        Username = "foo",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/rds"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := rds.NewInstance(ctx, "default", &rds.InstanceArgs{
			AllocatedStorage:   pulumi.Int(10),
			Engine:             pulumi.String("mysql"),
			EngineVersion:      pulumi.String("5.7"),
			InstanceClass:      pulumi.String("db.t3.micro"),
			Name:               pulumi.String("mydb"),
			ParameterGroupName: pulumi.String("default.mysql5.7"),
			Password:           pulumi.String("foobarbaz"),
			SkipFinalSnapshot:  pulumi.Bool(true),
			Username:           pulumi.String("foo"),
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
import com.pulumi.aws.rds.Instance;
import com.pulumi.aws.rds.InstanceArgs;
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
        var default_ = new Instance("default", InstanceArgs.builder()        
            .allocatedStorage(10)
            .engine("mysql")
            .engineVersion("5.7")
            .instanceClass("db.t3.micro")
            .name("mydb")
            .parameterGroupName("default.mysql5.7")
            .password("foobarbaz")
            .skipFinalSnapshot(true)
            .username("foo")
            .build());

    }
}
```
```yaml
resources:
  default:
    type: aws:rds:Instance
    properties:
      allocatedStorage: 10
      engine: mysql
      engineVersion: 5.7
      instanceClass: db.t3.micro
      name: mydb
      parameterGroupName: default.mysql5.7
      password: foobarbaz
      skipFinalSnapshot: true
      username: foo
```
{{% /example %}}
{{% example %}}
### Storage Autoscaling

To enable Storage Autoscaling with instances that support the feature, define the `max_allocated_storage` argument higher than the `allocated_storage` argument. This provider will automatically hide differences with the `allocated_storage` argument value if autoscaling occurs.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.rds.Instance("example", {
    allocatedStorage: 50,
    maxAllocatedStorage: 100,
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.rds.Instance("example",
    allocated_storage=50,
    max_allocated_storage=100)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Rds.Instance("example", new()
    {
        AllocatedStorage = 50,
        MaxAllocatedStorage = 100,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/rds"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := rds.NewInstance(ctx, "example", &rds.InstanceArgs{
			AllocatedStorage:    pulumi.Int(50),
			MaxAllocatedStorage: pulumi.Int(100),
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
import com.pulumi.aws.rds.Instance;
import com.pulumi.aws.rds.InstanceArgs;
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
        var example = new Instance("example", InstanceArgs.builder()        
            .allocatedStorage(50)
            .maxAllocatedStorage(100)
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:rds:Instance
    properties:
      allocatedStorage: 50
      maxAllocatedStorage: 100
```
{{% /example %}}
{{% /examples %}}

## Import

DB Instances can be imported using the `identifier`, e.g.,

```sh
 $ pulumi import aws:rds/instance:Instance default mydb-rds-instance
```

 
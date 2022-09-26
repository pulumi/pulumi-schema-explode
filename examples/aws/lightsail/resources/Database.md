Provides a Lightsail Database. Amazon Lightsail is a service to provide easy virtual private servers
with custom software already setup. See [What is Amazon Lightsail?](https://lightsail.aws.amazon.com/ls/docs/getting-started/article/what-is-amazon-lightsail)
for more information.

> **Note:** Lightsail is currently only supported in a limited number of AWS Regions, please see ["Regions and Availability Zones"](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/) for more details

{{% examples %}}
## Example Usage
{{% example %}}
### Basic mysql blueprint

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const test = new aws.lightsail.Database("test", {
    availabilityZone: "us-east-1a",
    blueprintId: "mysql_8_0",
    bundleId: "micro_1_0",
    masterDatabaseName: "testdatabasename",
    masterPassword: "testdatabasepassword",
    masterUsername: "test",
    name: "test",
});
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.lightsail.Database;
import com.pulumi.aws.lightsail.DatabaseArgs;
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
        var test = new Database("test", DatabaseArgs.builder()        
            .availabilityZone("us-east-1a")
            .blueprintId("mysql_8_0")
            .bundleId("micro_1_0")
            .masterDatabaseName("testdatabasename")
            .masterPassword("testdatabasepassword")
            .masterUsername("test")
            .name("test")
            .build());

    }
}
```
```yaml
resources:
  test:
    type: aws:lightsail:Database
    properties:
      availabilityZone: us-east-1a
      blueprintId: mysql_8_0
      bundleId: micro_1_0
      masterDatabaseName: testdatabasename
      masterPassword: testdatabasepassword
      masterUsername: test
      name: test
```
{{% /example %}}
{{% example %}}
### Basic postrgres blueprint

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const test = new aws.lightsail.Database("test", {
    availabilityZone: "us-east-1a",
    blueprintId: "postgres_12",
    bundleId: "micro_1_0",
    masterDatabaseName: "testdatabasename",
    masterPassword: "testdatabasepassword",
    masterUsername: "test",
    name: "test",
});
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.lightsail.Database;
import com.pulumi.aws.lightsail.DatabaseArgs;
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
        var test = new Database("test", DatabaseArgs.builder()        
            .availabilityZone("us-east-1a")
            .blueprintId("postgres_12")
            .bundleId("micro_1_0")
            .masterDatabaseName("testdatabasename")
            .masterPassword("testdatabasepassword")
            .masterUsername("test")
            .name("test")
            .build());

    }
}
```
```yaml
resources:
  test:
    type: aws:lightsail:Database
    properties:
      availabilityZone: us-east-1a
      blueprintId: postgres_12
      bundleId: micro_1_0
      masterDatabaseName: testdatabasename
      masterPassword: testdatabasepassword
      masterUsername: test
      name: test
```
{{% /example %}}
{{% example %}}
### Custom backup and maintenance windows

Below is an example that sets a custom backup and maintenance window. Times are specified in UTC. This example will allow daily backups to take place between 16:00 and 16:30 each day. This example also requires any maintiance tasks (anything that would cause an outage, including changing some attributes) to take place on Tuesdays between 17:00 and 17:30. An action taken against this database that would cause an outage will wait until this time window to make the requested changes.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const test = new aws.lightsail.Database("test", {
    availabilityZone: "us-east-1a",
    blueprintId: "postgres_12",
    bundleId: "micro_1_0",
    masterDatabaseName: "testdatabasename",
    masterPassword: "testdatabasepassword",
    masterUsername: "test",
    name: "test",
    preferredBackupWindow: "16:00-16:30",
    preferredMaintenanceWindow: "Tue:17:00-Tue:17:30",
});
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.lightsail.Database;
import com.pulumi.aws.lightsail.DatabaseArgs;
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
        var test = new Database("test", DatabaseArgs.builder()        
            .availabilityZone("us-east-1a")
            .blueprintId("postgres_12")
            .bundleId("micro_1_0")
            .masterDatabaseName("testdatabasename")
            .masterPassword("testdatabasepassword")
            .masterUsername("test")
            .name("test")
            .preferredBackupWindow("16:00-16:30")
            .preferredMaintenanceWindow("Tue:17:00-Tue:17:30")
            .build());

    }
}
```
```yaml
resources:
  test:
    type: aws:lightsail:Database
    properties:
      availabilityZone: us-east-1a
      blueprintId: postgres_12
      bundleId: micro_1_0
      masterDatabaseName: testdatabasename
      masterPassword: testdatabasepassword
      masterUsername: test
      name: test
      preferredBackupWindow: 16:00-16:30
      preferredMaintenanceWindow: Tue:17:00-Tue:17:30
```
{{% /example %}}
{{% example %}}
### Final Snapshots

To enable creating a final snapshot of your database on deletion, use the `final_snapshot_name` argument to provide a name to be used for the snapshot.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const test = new aws.lightsail.Database("test", {
    availabilityZone: "us-east-1a",
    blueprintId: "postgres_12",
    bundleId: "micro_1_0",
    finalSnapshotName: "MyFinalSnapshot",
    masterDatabaseName: "testdatabasename",
    masterPassword: "testdatabasepassword",
    masterUsername: "test",
    name: "test",
    preferredBackupWindow: "16:00-16:30",
    preferredMaintenanceWindow: "Tue:17:00-Tue:17:30",
});
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.lightsail.Database;
import com.pulumi.aws.lightsail.DatabaseArgs;
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
        var test = new Database("test", DatabaseArgs.builder()        
            .availabilityZone("us-east-1a")
            .blueprintId("postgres_12")
            .bundleId("micro_1_0")
            .finalSnapshotName("MyFinalSnapshot")
            .masterDatabaseName("testdatabasename")
            .masterPassword("testdatabasepassword")
            .masterUsername("test")
            .name("test")
            .preferredBackupWindow("16:00-16:30")
            .preferredMaintenanceWindow("Tue:17:00-Tue:17:30")
            .build());

    }
}
```
```yaml
resources:
  test:
    type: aws:lightsail:Database
    properties:
      availabilityZone: us-east-1a
      blueprintId: postgres_12
      bundleId: micro_1_0
      finalSnapshotName: MyFinalSnapshot
      masterDatabaseName: testdatabasename
      masterPassword: testdatabasepassword
      masterUsername: test
      name: test
      preferredBackupWindow: 16:00-16:30
      preferredMaintenanceWindow: Tue:17:00-Tue:17:30
```
{{% /example %}}
{{% example %}}
### Apply Immediately

To enable applying changes immediately instead of waiting for a maintiance window, use the `apply_immediately` argument.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const test = new aws.lightsail.Database("test", {
    applyImmediately: true,
    availabilityZone: "us-east-1a",
    blueprintId: "postgres_12",
    bundleId: "micro_1_0",
    masterDatabaseName: "testdatabasename",
    masterPassword: "testdatabasepassword",
    masterUsername: "test",
    name: "test",
});
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.lightsail.Database;
import com.pulumi.aws.lightsail.DatabaseArgs;
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
        var test = new Database("test", DatabaseArgs.builder()        
            .applyImmediately(true)
            .availabilityZone("us-east-1a")
            .blueprintId("postgres_12")
            .bundleId("micro_1_0")
            .masterDatabaseName("testdatabasename")
            .masterPassword("testdatabasepassword")
            .masterUsername("test")
            .name("test")
            .build());

    }
}
```
```yaml
resources:
  test:
    type: aws:lightsail:Database
    properties:
      applyImmediately: true
      availabilityZone: us-east-1a
      blueprintId: postgres_12
      bundleId: micro_1_0
      masterDatabaseName: testdatabasename
      masterPassword: testdatabasepassword
      masterUsername: test
      name: test
```

{{% /example %}}
{{% /examples %}}
## Blueprint Ids

A list of all available Lightsail Blueprints for Relational Databases the [aws lightsail get-relational-database-blueprints](https://docs.aws.amazon.com/cli/latest/reference/lightsail/get-relational-database-blueprints.html) aws cli command.

### Examples

- `mysql_8_0`
- `postgres_12`

### Prefix

A Blueprint ID starts with a prefix of the engine type.

### Suffix

A Blueprint ID has a sufix of the engine version.


## Bundles

A list of all available Lightsail Bundles for Relational Databases the [aws lightsail get-relational-database-bundles](https://docs.aws.amazon.com/cli/latest/reference/lightsail/get-relational-database-bundles.html) aws cli command.

### Examples

- `small_1_0`
- `small_ha_1_0`
- `large_1_0`
- `large_ha_1_0`

### Prefix

A Bundle ID starts with one of the below size prefixes:

- `micro_`
- `small_`
- `medium_`
- `large_`

### Infixes (Optional for HA Database)

A Bundle Id can have the following infix added in order to use the HA option of the selected bundle.

- `ha_`

### Suffix

A Bundle ID ends with one of the following suffix: `1_0`


## Import

Lightsail Databases can be imported using their name, e.g.

```sh
 $ pulumi import aws:lightsail/database:Database foo 'bar'
```

 
Provides a CE Anomaly Monitor.

{{% examples %}}
## Example Usage

There are two main types of a Cost Anomaly Monitor: `DIMENSIONAL` and `CUSTOM`.
{{% example %}}
### Dimensional Example

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const serviceMonitor = new aws.costexplorer.AnomalyMonitor("service_monitor", {
    monitorDimension: "SERVICE",
    monitorType: "DIMENSIONAL",
});
```
```python
import pulumi
import pulumi_aws as aws

service_monitor = aws.costexplorer.AnomalyMonitor("serviceMonitor",
    monitor_dimension="SERVICE",
    monitor_type="DIMENSIONAL")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var serviceMonitor = new Aws.CostExplorer.AnomalyMonitor("serviceMonitor", new()
    {
        MonitorDimension = "SERVICE",
        MonitorType = "DIMENSIONAL",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/costexplorer"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := costexplorer.NewAnomalyMonitor(ctx, "serviceMonitor", &costexplorer.AnomalyMonitorArgs{
			MonitorDimension: pulumi.String("SERVICE"),
			MonitorType:      pulumi.String("DIMENSIONAL"),
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
import com.pulumi.aws.costexplorer.AnomalyMonitor;
import com.pulumi.aws.costexplorer.AnomalyMonitorArgs;
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
        var serviceMonitor = new AnomalyMonitor("serviceMonitor", AnomalyMonitorArgs.builder()        
            .monitorDimension("SERVICE")
            .monitorType("DIMENSIONAL")
            .build());

    }
}
```
```yaml
resources:
  serviceMonitor:
    type: aws:costexplorer:AnomalyMonitor
    properties:
      monitorDimension: SERVICE
      monitorType: DIMENSIONAL
```
{{% /example %}}
{{% example %}}
### Custom Example

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const test = new aws.costexplorer.AnomalyMonitor("test", {
    monitorSpecification: `{
	"And": null,
	"CostCategories": null,
	"Dimensions": null,
	"Not": null,
	"Or": null,
	"Tags": {
		"Key": "CostCenter",
		"MatchOptions": null,
		"Values": [
			"10000"
		]
	}
}
`,
    monitorType: "CUSTOM",
});
```
```python
import pulumi
import pulumi_aws as aws

test = aws.costexplorer.AnomalyMonitor("test",
    monitor_specification="""{
	"And": null,
	"CostCategories": null,
	"Dimensions": null,
	"Not": null,
	"Or": null,
	"Tags": {
		"Key": "CostCenter",
		"MatchOptions": null,
		"Values": [
			"10000"
		]
	}
}

""",
    monitor_type="CUSTOM")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var test = new Aws.CostExplorer.AnomalyMonitor("test", new()
    {
        MonitorSpecification = @"{
	""And"": null,
	""CostCategories"": null,
	""Dimensions"": null,
	""Not"": null,
	""Or"": null,
	""Tags"": {
		""Key"": ""CostCenter"",
		""MatchOptions"": null,
		""Values"": [
			""10000""
		]
	}
}

",
        MonitorType = "CUSTOM",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/costexplorer"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := costexplorer.NewAnomalyMonitor(ctx, "test", &costexplorer.AnomalyMonitorArgs{
			MonitorSpecification: pulumi.String(fmt.Sprintf(`{
	"And": null,
	"CostCategories": null,
	"Dimensions": null,
	"Not": null,
	"Or": null,
	"Tags": {
		"Key": "CostCenter",
		"MatchOptions": null,
		"Values": [
			"10000"
		]
	}
}

`)),
			MonitorType: pulumi.String("CUSTOM"),
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
import com.pulumi.aws.costexplorer.AnomalyMonitor;
import com.pulumi.aws.costexplorer.AnomalyMonitorArgs;
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
        var test = new AnomalyMonitor("test", AnomalyMonitorArgs.builder()        
            .monitorSpecification("""
{
	"And": null,
	"CostCategories": null,
	"Dimensions": null,
	"Not": null,
	"Or": null,
	"Tags": {
		"Key": "CostCenter",
		"MatchOptions": null,
		"Values": [
			"10000"
		]
	}
}

            """)
            .monitorType("CUSTOM")
            .build());

    }
}
```
```yaml
resources:
  test:
    type: aws:costexplorer:AnomalyMonitor
    properties:
      monitorSpecification: |+
        {
        	"And": null,
        	"CostCategories": null,
        	"Dimensions": null,
        	"Not": null,
        	"Or": null,
        	"Tags": {
        		"Key": "CostCenter",
        		"MatchOptions": null,
        		"Values": [
        			"10000"
        		]
        	}
        }

      monitorType: CUSTOM
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_ce_anomaly_monitor` can be imported using the `id`, e.g.

```sh
 $ pulumi import aws:costexplorer/anomalyMonitor:AnomalyMonitor example costAnomalyMonitorARN
```

 
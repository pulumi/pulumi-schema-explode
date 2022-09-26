Provides an EventBridge event archive resource.

> **Note:** EventBridge was formerly known as CloudWatch Events. The functionality is identical.


{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const orderEventBus = new aws.cloudwatch.EventBus("orderEventBus", {});
const orderEventArchive = new aws.cloudwatch.EventArchive("orderEventArchive", {eventSourceArn: orderEventBus.arn});
```
```python
import pulumi
import pulumi_aws as aws

order_event_bus = aws.cloudwatch.EventBus("orderEventBus")
order_event_archive = aws.cloudwatch.EventArchive("orderEventArchive", event_source_arn=order_event_bus.arn)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var orderEventBus = new Aws.CloudWatch.EventBus("orderEventBus");

    var orderEventArchive = new Aws.CloudWatch.EventArchive("orderEventArchive", new()
    {
        EventSourceArn = orderEventBus.Arn,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudwatch"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		orderEventBus, err := cloudwatch.NewEventBus(ctx, "orderEventBus", nil)
		if err != nil {
			return err
		}
		_, err = cloudwatch.NewEventArchive(ctx, "orderEventArchive", &cloudwatch.EventArchiveArgs{
			EventSourceArn: orderEventBus.Arn,
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
import com.pulumi.aws.cloudwatch.EventBus;
import com.pulumi.aws.cloudwatch.EventArchive;
import com.pulumi.aws.cloudwatch.EventArchiveArgs;
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
        var orderEventBus = new EventBus("orderEventBus");

        var orderEventArchive = new EventArchive("orderEventArchive", EventArchiveArgs.builder()        
            .eventSourceArn(orderEventBus.arn())
            .build());

    }
}
```
```yaml
resources:
  orderEventBus:
    type: aws:cloudwatch:EventBus
  orderEventArchive:
    type: aws:cloudwatch:EventArchive
    properties:
      eventSourceArn: ${orderEventBus.arn}
```
{{% /example %}}
{{% /examples %}}
## Example all optional arguments

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const orderEventBus = new aws.cloudwatch.EventBus("orderEventBus", {});
const orderEventArchive = new aws.cloudwatch.EventArchive("orderEventArchive", {
    description: "Archived events from order service",
    eventSourceArn: orderEventBus.arn,
    retentionDays: 7,
    eventPattern: `{
  "source": ["company.team.order"]
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

order_event_bus = aws.cloudwatch.EventBus("orderEventBus")
order_event_archive = aws.cloudwatch.EventArchive("orderEventArchive",
    description="Archived events from order service",
    event_source_arn=order_event_bus.arn,
    retention_days=7,
    event_pattern="""{
  "source": ["company.team.order"]
}
""")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var orderEventBus = new Aws.CloudWatch.EventBus("orderEventBus");

    var orderEventArchive = new Aws.CloudWatch.EventArchive("orderEventArchive", new()
    {
        Description = "Archived events from order service",
        EventSourceArn = orderEventBus.Arn,
        RetentionDays = 7,
        EventPattern = @"{
  ""source"": [""company.team.order""]
}
",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudwatch"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		orderEventBus, err := cloudwatch.NewEventBus(ctx, "orderEventBus", nil)
		if err != nil {
			return err
		}
		_, err = cloudwatch.NewEventArchive(ctx, "orderEventArchive", &cloudwatch.EventArchiveArgs{
			Description:    pulumi.String("Archived events from order service"),
			EventSourceArn: orderEventBus.Arn,
			RetentionDays:  pulumi.Int(7),
			EventPattern:   pulumi.String(fmt.Sprintf("{\n  \"source\": [\"company.team.order\"]\n}\n")),
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
import com.pulumi.aws.cloudwatch.EventBus;
import com.pulumi.aws.cloudwatch.EventArchive;
import com.pulumi.aws.cloudwatch.EventArchiveArgs;
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
        var orderEventBus = new EventBus("orderEventBus");

        var orderEventArchive = new EventArchive("orderEventArchive", EventArchiveArgs.builder()        
            .description("Archived events from order service")
            .eventSourceArn(orderEventBus.arn())
            .retentionDays(7)
            .eventPattern("""
{
  "source": ["company.team.order"]
}
            """)
            .build());

    }
}
```
```yaml
resources:
  orderEventBus:
    type: aws:cloudwatch:EventBus
  orderEventArchive:
    type: aws:cloudwatch:EventArchive
    properties:
      description: Archived events from order service
      eventSourceArn: ${orderEventBus.arn}
      retentionDays: 7
      eventPattern: |
        {
          "source": ["company.team.order"]
        }
```


## Import

Event Archive can be imported using their name, for example console

```sh
 $ pulumi import aws:cloudwatch/eventArchive:EventArchive imported_event_archive order-archive
```

 
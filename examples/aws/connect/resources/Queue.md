Provides an Amazon Connect Queue resource. For more information see
[Amazon Connect: Getting Started](https://docs.aws.amazon.com/connect/latest/adminguide/amazon-connect-get-started.html)

> **NOTE:** Due to The behaviour of Amazon Connect you cannot delete queues.

{{% examples %}}
## Example Usage
{{% example %}}
### Basic

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const test = new aws.connect.Queue("test", {
    description: "Example Description",
    hoursOfOperationId: "12345678-1234-1234-1234-123456789012",
    instanceId: "aaaaaaaa-bbbb-cccc-dddd-111111111111",
    tags: {
        Name: "Example Queue",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

test = aws.connect.Queue("test",
    description="Example Description",
    hours_of_operation_id="12345678-1234-1234-1234-123456789012",
    instance_id="aaaaaaaa-bbbb-cccc-dddd-111111111111",
    tags={
        "Name": "Example Queue",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var test = new Aws.Connect.Queue("test", new()
    {
        Description = "Example Description",
        HoursOfOperationId = "12345678-1234-1234-1234-123456789012",
        InstanceId = "aaaaaaaa-bbbb-cccc-dddd-111111111111",
        Tags = 
        {
            { "Name", "Example Queue" },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/connect"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := connect.NewQueue(ctx, "test", &connect.QueueArgs{
			Description:        pulumi.String("Example Description"),
			HoursOfOperationId: pulumi.String("12345678-1234-1234-1234-123456789012"),
			InstanceId:         pulumi.String("aaaaaaaa-bbbb-cccc-dddd-111111111111"),
			Tags: pulumi.StringMap{
				"Name": pulumi.String("Example Queue"),
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
import com.pulumi.aws.connect.Queue;
import com.pulumi.aws.connect.QueueArgs;
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
        var test = new Queue("test", QueueArgs.builder()        
            .description("Example Description")
            .hoursOfOperationId("12345678-1234-1234-1234-123456789012")
            .instanceId("aaaaaaaa-bbbb-cccc-dddd-111111111111")
            .tags(Map.of("Name", "Example Queue"))
            .build());

    }
}
```
```yaml
resources:
  test:
    type: aws:connect:Queue
    properties:
      description: Example Description
      hoursOfOperationId: 12345678-1234-1234-1234-123456789012
      instanceId: aaaaaaaa-bbbb-cccc-dddd-111111111111
      tags:
        Name: Example Queue
```
{{% /example %}}
{{% example %}}
### With Quick Connect IDs

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const test = new aws.connect.Queue("test", {
    description: "Example Description",
    hoursOfOperationId: "12345678-1234-1234-1234-123456789012",
    instanceId: "aaaaaaaa-bbbb-cccc-dddd-111111111111",
    quickConnectIds: ["12345678-abcd-1234-abcd-123456789012"],
    tags: {
        Name: "Example Queue with Quick Connect IDs",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

test = aws.connect.Queue("test",
    description="Example Description",
    hours_of_operation_id="12345678-1234-1234-1234-123456789012",
    instance_id="aaaaaaaa-bbbb-cccc-dddd-111111111111",
    quick_connect_ids=["12345678-abcd-1234-abcd-123456789012"],
    tags={
        "Name": "Example Queue with Quick Connect IDs",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var test = new Aws.Connect.Queue("test", new()
    {
        Description = "Example Description",
        HoursOfOperationId = "12345678-1234-1234-1234-123456789012",
        InstanceId = "aaaaaaaa-bbbb-cccc-dddd-111111111111",
        QuickConnectIds = new[]
        {
            "12345678-abcd-1234-abcd-123456789012",
        },
        Tags = 
        {
            { "Name", "Example Queue with Quick Connect IDs" },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/connect"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := connect.NewQueue(ctx, "test", &connect.QueueArgs{
			Description:        pulumi.String("Example Description"),
			HoursOfOperationId: pulumi.String("12345678-1234-1234-1234-123456789012"),
			InstanceId:         pulumi.String("aaaaaaaa-bbbb-cccc-dddd-111111111111"),
			QuickConnectIds: pulumi.StringArray{
				pulumi.String("12345678-abcd-1234-abcd-123456789012"),
			},
			Tags: pulumi.StringMap{
				"Name": pulumi.String("Example Queue with Quick Connect IDs"),
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
import com.pulumi.aws.connect.Queue;
import com.pulumi.aws.connect.QueueArgs;
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
        var test = new Queue("test", QueueArgs.builder()        
            .description("Example Description")
            .hoursOfOperationId("12345678-1234-1234-1234-123456789012")
            .instanceId("aaaaaaaa-bbbb-cccc-dddd-111111111111")
            .quickConnectIds("12345678-abcd-1234-abcd-123456789012")
            .tags(Map.of("Name", "Example Queue with Quick Connect IDs"))
            .build());

    }
}
```
```yaml
resources:
  test:
    type: aws:connect:Queue
    properties:
      description: Example Description
      hoursOfOperationId: 12345678-1234-1234-1234-123456789012
      instanceId: aaaaaaaa-bbbb-cccc-dddd-111111111111
      quickConnectIds:
        - 12345678-abcd-1234-abcd-123456789012
      tags:
        Name: Example Queue with Quick Connect IDs
```
{{% /example %}}
{{% example %}}
### With Outbound Caller Config

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const test = new aws.connect.Queue("test", {
    description: "Example Description",
    hoursOfOperationId: "12345678-1234-1234-1234-123456789012",
    instanceId: "aaaaaaaa-bbbb-cccc-dddd-111111111111",
    outboundCallerConfig: {
        outboundCallerIdName: "example",
        outboundCallerIdNumberId: "12345678-abcd-1234-abcd-123456789012",
        outboundFlowId: "87654321-defg-1234-defg-987654321234",
    },
    tags: {
        Name: "Example Queue with Outbound Caller Config",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

test = aws.connect.Queue("test",
    description="Example Description",
    hours_of_operation_id="12345678-1234-1234-1234-123456789012",
    instance_id="aaaaaaaa-bbbb-cccc-dddd-111111111111",
    outbound_caller_config=aws.connect.QueueOutboundCallerConfigArgs(
        outbound_caller_id_name="example",
        outbound_caller_id_number_id="12345678-abcd-1234-abcd-123456789012",
        outbound_flow_id="87654321-defg-1234-defg-987654321234",
    ),
    tags={
        "Name": "Example Queue with Outbound Caller Config",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var test = new Aws.Connect.Queue("test", new()
    {
        Description = "Example Description",
        HoursOfOperationId = "12345678-1234-1234-1234-123456789012",
        InstanceId = "aaaaaaaa-bbbb-cccc-dddd-111111111111",
        OutboundCallerConfig = new Aws.Connect.Inputs.QueueOutboundCallerConfigArgs
        {
            OutboundCallerIdName = "example",
            OutboundCallerIdNumberId = "12345678-abcd-1234-abcd-123456789012",
            OutboundFlowId = "87654321-defg-1234-defg-987654321234",
        },
        Tags = 
        {
            { "Name", "Example Queue with Outbound Caller Config" },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/connect"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := connect.NewQueue(ctx, "test", &connect.QueueArgs{
			Description:        pulumi.String("Example Description"),
			HoursOfOperationId: pulumi.String("12345678-1234-1234-1234-123456789012"),
			InstanceId:         pulumi.String("aaaaaaaa-bbbb-cccc-dddd-111111111111"),
			OutboundCallerConfig: &connect.QueueOutboundCallerConfigArgs{
				OutboundCallerIdName:     pulumi.String("example"),
				OutboundCallerIdNumberId: pulumi.String("12345678-abcd-1234-abcd-123456789012"),
				OutboundFlowId:           pulumi.String("87654321-defg-1234-defg-987654321234"),
			},
			Tags: pulumi.StringMap{
				"Name": pulumi.String("Example Queue with Outbound Caller Config"),
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
import com.pulumi.aws.connect.Queue;
import com.pulumi.aws.connect.QueueArgs;
import com.pulumi.aws.connect.inputs.QueueOutboundCallerConfigArgs;
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
        var test = new Queue("test", QueueArgs.builder()        
            .description("Example Description")
            .hoursOfOperationId("12345678-1234-1234-1234-123456789012")
            .instanceId("aaaaaaaa-bbbb-cccc-dddd-111111111111")
            .outboundCallerConfig(QueueOutboundCallerConfigArgs.builder()
                .outboundCallerIdName("example")
                .outboundCallerIdNumberId("12345678-abcd-1234-abcd-123456789012")
                .outboundFlowId("87654321-defg-1234-defg-987654321234")
                .build())
            .tags(Map.of("Name", "Example Queue with Outbound Caller Config"))
            .build());

    }
}
```
```yaml
resources:
  test:
    type: aws:connect:Queue
    properties:
      description: Example Description
      hoursOfOperationId: 12345678-1234-1234-1234-123456789012
      instanceId: aaaaaaaa-bbbb-cccc-dddd-111111111111
      outboundCallerConfig:
        outboundCallerIdName: example
        outboundCallerIdNumberId: 12345678-abcd-1234-abcd-123456789012
        outboundFlowId: 87654321-defg-1234-defg-987654321234
      tags:
        Name: Example Queue with Outbound Caller Config
```
{{% /example %}}
{{% /examples %}}

## Import

Amazon Connect Queues can be imported using the `instance_id` and `queue_id` separated by a colon (`:`), e.g.,

```sh
 $ pulumi import aws:connect/queue:Queue example f1288a1f-6193-445a-b47e-af739b2:c1d4e5f6-1b3c-1b3c-1b3c-c1d4e5f6c1d4e5
```

 
Provides details about a specific Amazon Connect Queue.

{{% examples %}}
## Example Usage
{{% example %}}

By `name`

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = pulumi.output(aws.connect.getQueue({
    instanceId: "aaaaaaaa-bbbb-cccc-dddd-111111111111",
    name: "Example",
}));
```
```python
import pulumi
import pulumi_aws as aws

example = aws.connect.get_queue(instance_id="aaaaaaaa-bbbb-cccc-dddd-111111111111",
    name="Example")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = Aws.Connect.GetQueue.Invoke(new()
    {
        InstanceId = "aaaaaaaa-bbbb-cccc-dddd-111111111111",
        Name = "Example",
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
		_, err := connect.LookupQueue(ctx, &connect.LookupQueueArgs{
			InstanceId: "aaaaaaaa-bbbb-cccc-dddd-111111111111",
			Name:       pulumi.StringRef("Example"),
		}, nil)
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
import com.pulumi.aws.connect.ConnectFunctions;
import com.pulumi.aws.connect.inputs.GetQueueArgs;
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
        final var example = ConnectFunctions.getQueue(GetQueueArgs.builder()
            .instanceId("aaaaaaaa-bbbb-cccc-dddd-111111111111")
            .name("Example")
            .build());

    }
}
```
```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:connect:getQueue
      Arguments:
        instanceId: aaaaaaaa-bbbb-cccc-dddd-111111111111
        name: Example
```

By `queue_id`

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = pulumi.output(aws.connect.getQueue({
    instanceId: "aaaaaaaa-bbbb-cccc-dddd-111111111111",
    queueId: "cccccccc-bbbb-cccc-dddd-111111111111",
}));
```
```python
import pulumi
import pulumi_aws as aws

example = aws.connect.get_queue(instance_id="aaaaaaaa-bbbb-cccc-dddd-111111111111",
    queue_id="cccccccc-bbbb-cccc-dddd-111111111111")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = Aws.Connect.GetQueue.Invoke(new()
    {
        InstanceId = "aaaaaaaa-bbbb-cccc-dddd-111111111111",
        QueueId = "cccccccc-bbbb-cccc-dddd-111111111111",
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
		_, err := connect.LookupQueue(ctx, &connect.LookupQueueArgs{
			InstanceId: "aaaaaaaa-bbbb-cccc-dddd-111111111111",
			QueueId:    pulumi.StringRef("cccccccc-bbbb-cccc-dddd-111111111111"),
		}, nil)
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
import com.pulumi.aws.connect.ConnectFunctions;
import com.pulumi.aws.connect.inputs.GetQueueArgs;
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
        final var example = ConnectFunctions.getQueue(GetQueueArgs.builder()
            .instanceId("aaaaaaaa-bbbb-cccc-dddd-111111111111")
            .queueId("cccccccc-bbbb-cccc-dddd-111111111111")
            .build());

    }
}
```
```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:connect:getQueue
      Arguments:
        instanceId: aaaaaaaa-bbbb-cccc-dddd-111111111111
        queueId: cccccccc-bbbb-cccc-dddd-111111111111
```
{{% /example %}}
{{% /examples %}}
{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const queue = new aws.sqs.Queue("queue", {
    delaySeconds: 90,
    maxMessageSize: 2048,
    messageRetentionSeconds: 86400,
    receiveWaitTimeSeconds: 10,
    redrivePolicy: JSON.stringify({
        deadLetterTargetArn: aws_sqs_queue.queue_deadletter.arn,
        maxReceiveCount: 4,
    }),
    tags: {
        Environment: "production",
    },
});
```
```python
import pulumi
import json
import pulumi_aws as aws

queue = aws.sqs.Queue("queue",
    delay_seconds=90,
    max_message_size=2048,
    message_retention_seconds=86400,
    receive_wait_time_seconds=10,
    redrive_policy=json.dumps({
        "deadLetterTargetArn": aws_sqs_queue["queue_deadletter"]["arn"],
        "maxReceiveCount": 4,
    }),
    tags={
        "Environment": "production",
    })
```
```csharp
using System.Collections.Generic;
using System.Text.Json;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var queue = new Aws.Sqs.Queue("queue", new()
    {
        DelaySeconds = 90,
        MaxMessageSize = 2048,
        MessageRetentionSeconds = 86400,
        ReceiveWaitTimeSeconds = 10,
        RedrivePolicy = JsonSerializer.Serialize(new Dictionary<string, object?>
        {
            ["deadLetterTargetArn"] = aws_sqs_queue.Queue_deadletter.Arn,
            ["maxReceiveCount"] = 4,
        }),
        Tags = 
        {
            { "Environment", "production" },
        },
    });

});
```
```go
package main

import (
	"encoding/json"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sqs"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		tmpJSON0, err := json.Marshal(map[string]interface{}{
			"deadLetterTargetArn": aws_sqs_queue.Queue_deadletter.Arn,
			"maxReceiveCount":     4,
		})
		if err != nil {
			return err
		}
		json0 := string(tmpJSON0)
		_, err = sqs.NewQueue(ctx, "queue", &sqs.QueueArgs{
			DelaySeconds:            pulumi.Int(90),
			MaxMessageSize:          pulumi.Int(2048),
			MessageRetentionSeconds: pulumi.Int(86400),
			ReceiveWaitTimeSeconds:  pulumi.Int(10),
			RedrivePolicy:           pulumi.String(json0),
			Tags: pulumi.StringMap{
				"Environment": pulumi.String("production"),
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
import com.pulumi.aws.sqs.Queue;
import com.pulumi.aws.sqs.QueueArgs;
import static com.pulumi.codegen.internal.Serialization.*;
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
        var queue = new Queue("queue", QueueArgs.builder()        
            .delaySeconds(90)
            .maxMessageSize(2048)
            .messageRetentionSeconds(86400)
            .receiveWaitTimeSeconds(10)
            .redrivePolicy(serializeJson(
                jsonObject(
                    jsonProperty("deadLetterTargetArn", aws_sqs_queue.queue_deadletter().arn()),
                    jsonProperty("maxReceiveCount", 4)
                )))
            .tags(Map.of("Environment", "production"))
            .build());

    }
}
```
```yaml
resources:
  queue:
    type: aws:sqs:Queue
    properties:
      delaySeconds: 90
      maxMessageSize: 2048
      messageRetentionSeconds: 86400
      receiveWaitTimeSeconds: 10
      redrivePolicy:
        Fn::ToJSON:
          deadLetterTargetArn: ${aws_sqs_queue.queue_deadletter.arn}
          maxReceiveCount: 4
      tags:
        Environment: production
```
{{% /example %}}
{{% /examples %}}
## FIFO queue

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const queue = new aws.sqs.Queue("queue", {
    contentBasedDeduplication: true,
    fifoQueue: true,
});
```
```python
import pulumi
import pulumi_aws as aws

queue = aws.sqs.Queue("queue",
    content_based_deduplication=True,
    fifo_queue=True)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var queue = new Aws.Sqs.Queue("queue", new()
    {
        ContentBasedDeduplication = true,
        FifoQueue = true,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sqs"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := sqs.NewQueue(ctx, "queue", &sqs.QueueArgs{
			ContentBasedDeduplication: pulumi.Bool(true),
			FifoQueue:                 pulumi.Bool(true),
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
import com.pulumi.aws.sqs.Queue;
import com.pulumi.aws.sqs.QueueArgs;
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
        var queue = new Queue("queue", QueueArgs.builder()        
            .contentBasedDeduplication(true)
            .fifoQueue(true)
            .build());

    }
}
```
```yaml
resources:
  queue:
    type: aws:sqs:Queue
    properties:
      contentBasedDeduplication: true
      fifoQueue: true
```

## High-throughput FIFO queue

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const terraformQueue = new aws.sqs.Queue("terraform_queue", {
    deduplicationScope: "messageGroup",
    fifoQueue: true,
    fifoThroughputLimit: "perMessageGroupId",
});
```
```python
import pulumi
import pulumi_aws as aws

terraform_queue = aws.sqs.Queue("terraformQueue",
    deduplication_scope="messageGroup",
    fifo_queue=True,
    fifo_throughput_limit="perMessageGroupId")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var terraformQueue = new Aws.Sqs.Queue("terraformQueue", new()
    {
        DeduplicationScope = "messageGroup",
        FifoQueue = true,
        FifoThroughputLimit = "perMessageGroupId",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sqs"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := sqs.NewQueue(ctx, "terraformQueue", &sqs.QueueArgs{
			DeduplicationScope:  pulumi.String("messageGroup"),
			FifoQueue:           pulumi.Bool(true),
			FifoThroughputLimit: pulumi.String("perMessageGroupId"),
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
import com.pulumi.aws.sqs.Queue;
import com.pulumi.aws.sqs.QueueArgs;
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
        var terraformQueue = new Queue("terraformQueue", QueueArgs.builder()        
            .deduplicationScope("messageGroup")
            .fifoQueue(true)
            .fifoThroughputLimit("perMessageGroupId")
            .build());

    }
}
```
```yaml
resources:
  terraformQueue:
    type: aws:sqs:Queue
    properties:
      deduplicationScope: messageGroup
      fifoQueue: true
      fifoThroughputLimit: perMessageGroupId
```

## Dead-letter queue

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const terraformQueueDeadletter = new aws.sqs.Queue("terraformQueueDeadletter", {redriveAllowPolicy: JSON.stringify({
    redrivePermission: "byQueue",
    sourceQueueArns: [aws_sqs_queue.terraform_queue.arn],
})});
```
```python
import pulumi
import json
import pulumi_aws as aws

terraform_queue_deadletter = aws.sqs.Queue("terraformQueueDeadletter", redrive_allow_policy=json.dumps({
    "redrivePermission": "byQueue",
    "sourceQueueArns": [aws_sqs_queue["terraform_queue"]["arn"]],
}))
```
```csharp
using System.Collections.Generic;
using System.Text.Json;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var terraformQueueDeadletter = new Aws.Sqs.Queue("terraformQueueDeadletter", new()
    {
        RedriveAllowPolicy = JsonSerializer.Serialize(new Dictionary<string, object?>
        {
            ["redrivePermission"] = "byQueue",
            ["sourceQueueArns"] = new[]
            {
                aws_sqs_queue.Terraform_queue.Arn,
            },
        }),
    });

});
```
```go
package main

import (
	"encoding/json"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sqs"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		tmpJSON0, err := json.Marshal(map[string]interface{}{
			"redrivePermission": "byQueue",
			"sourceQueueArns": []interface{}{
				aws_sqs_queue.Terraform_queue.Arn,
			},
		})
		if err != nil {
			return err
		}
		json0 := string(tmpJSON0)
		_, err = sqs.NewQueue(ctx, "terraformQueueDeadletter", &sqs.QueueArgs{
			RedriveAllowPolicy: pulumi.String(json0),
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
import com.pulumi.aws.sqs.Queue;
import com.pulumi.aws.sqs.QueueArgs;
import static com.pulumi.codegen.internal.Serialization.*;
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
        var terraformQueueDeadletter = new Queue("terraformQueueDeadletter", QueueArgs.builder()        
            .redriveAllowPolicy(serializeJson(
                jsonObject(
                    jsonProperty("redrivePermission", "byQueue"),
                    jsonProperty("sourceQueueArns", jsonArray(aws_sqs_queue.terraform_queue().arn()))
                )))
            .build());

    }
}
```
```yaml
resources:
  terraformQueueDeadletter:
    type: aws:sqs:Queue
    properties:
      redriveAllowPolicy:
        Fn::ToJSON:
          redrivePermission: byQueue
          sourceQueueArns:
            - ${aws_sqs_queue.terraform_queue.arn}
```

## Server-side encryption (SSE)

Using [SSE-SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-sqs-sse-queue.html):

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const terraformQueue = new aws.sqs.Queue("terraform_queue", {
    sqsManagedSseEnabled: true,
});
```
```python
import pulumi
import pulumi_aws as aws

terraform_queue = aws.sqs.Queue("terraformQueue", sqs_managed_sse_enabled=True)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var terraformQueue = new Aws.Sqs.Queue("terraformQueue", new()
    {
        SqsManagedSseEnabled = true,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sqs"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := sqs.NewQueue(ctx, "terraformQueue", &sqs.QueueArgs{
			SqsManagedSseEnabled: pulumi.Bool(true),
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
import com.pulumi.aws.sqs.Queue;
import com.pulumi.aws.sqs.QueueArgs;
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
        var terraformQueue = new Queue("terraformQueue", QueueArgs.builder()        
            .sqsManagedSseEnabled(true)
            .build());

    }
}
```
```yaml
resources:
  terraformQueue:
    type: aws:sqs:Queue
    properties:
      sqsManagedSseEnabled: true
```

Using [SSE-KMS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-sse-existing-queue.html):

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const queue = new aws.sqs.Queue("queue", {
    kmsDataKeyReusePeriodSeconds: 300,
    kmsMasterKeyId: "alias/aws/sqs",
});
```
```python
import pulumi
import pulumi_aws as aws

queue = aws.sqs.Queue("queue",
    kms_data_key_reuse_period_seconds=300,
    kms_master_key_id="alias/aws/sqs")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var queue = new Aws.Sqs.Queue("queue", new()
    {
        KmsDataKeyReusePeriodSeconds = 300,
        KmsMasterKeyId = "alias/aws/sqs",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sqs"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := sqs.NewQueue(ctx, "queue", &sqs.QueueArgs{
			KmsDataKeyReusePeriodSeconds: pulumi.Int(300),
			KmsMasterKeyId:               pulumi.String("alias/aws/sqs"),
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
import com.pulumi.aws.sqs.Queue;
import com.pulumi.aws.sqs.QueueArgs;
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
        var queue = new Queue("queue", QueueArgs.builder()        
            .kmsDataKeyReusePeriodSeconds(300)
            .kmsMasterKeyId("alias/aws/sqs")
            .build());

    }
}
```
```yaml
resources:
  queue:
    type: aws:sqs:Queue
    properties:
      kmsDataKeyReusePeriodSeconds: 300
      kmsMasterKeyId: alias/aws/sqs
```


## Import

SQS Queues can be imported using the `queue url`, e.g.,

```sh
 $ pulumi import aws:sqs/queue:Queue public_queue https://queue.amazonaws.com/80398EXAMPLE/MyQueue
```

 
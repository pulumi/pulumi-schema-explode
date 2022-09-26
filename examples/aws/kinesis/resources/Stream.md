Provides a Kinesis Stream resource. Amazon Kinesis is a managed service that
scales elastically for real-time processing of streaming big data.

For more details, see the [Amazon Kinesis Documentation](https://aws.amazon.com/documentation/kinesis/).

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const testStream = new aws.kinesis.Stream("test_stream", {
    retentionPeriod: 48,
    shardCount: 1,
    shardLevelMetrics: [
        "IncomingBytes",
        "OutgoingBytes",
    ],
    streamModeDetails: {
        streamMode: "PROVISIONED",
    },
    tags: {
        Environment: "test",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

test_stream = aws.kinesis.Stream("testStream",
    retention_period=48,
    shard_count=1,
    shard_level_metrics=[
        "IncomingBytes",
        "OutgoingBytes",
    ],
    stream_mode_details=aws.kinesis.StreamStreamModeDetailsArgs(
        stream_mode="PROVISIONED",
    ),
    tags={
        "Environment": "test",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var testStream = new Aws.Kinesis.Stream("testStream", new()
    {
        RetentionPeriod = 48,
        ShardCount = 1,
        ShardLevelMetrics = new[]
        {
            "IncomingBytes",
            "OutgoingBytes",
        },
        StreamModeDetails = new Aws.Kinesis.Inputs.StreamStreamModeDetailsArgs
        {
            StreamMode = "PROVISIONED",
        },
        Tags = 
        {
            { "Environment", "test" },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/kinesis"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := kinesis.NewStream(ctx, "testStream", &kinesis.StreamArgs{
			RetentionPeriod: pulumi.Int(48),
			ShardCount:      pulumi.Int(1),
			ShardLevelMetrics: pulumi.StringArray{
				pulumi.String("IncomingBytes"),
				pulumi.String("OutgoingBytes"),
			},
			StreamModeDetails: &kinesis.StreamStreamModeDetailsArgs{
				StreamMode: pulumi.String("PROVISIONED"),
			},
			Tags: pulumi.StringMap{
				"Environment": pulumi.String("test"),
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
import com.pulumi.aws.kinesis.Stream;
import com.pulumi.aws.kinesis.StreamArgs;
import com.pulumi.aws.kinesis.inputs.StreamStreamModeDetailsArgs;
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
        var testStream = new Stream("testStream", StreamArgs.builder()        
            .retentionPeriod(48)
            .shardCount(1)
            .shardLevelMetrics(            
                "IncomingBytes",
                "OutgoingBytes")
            .streamModeDetails(StreamStreamModeDetailsArgs.builder()
                .streamMode("PROVISIONED")
                .build())
            .tags(Map.of("Environment", "test"))
            .build());

    }
}
```
```yaml
resources:
  testStream:
    type: aws:kinesis:Stream
    properties:
      retentionPeriod: 48
      shardCount: 1
      shardLevelMetrics:
        - IncomingBytes
        - OutgoingBytes
      streamModeDetails:
        streamMode: PROVISIONED
      tags:
        Environment: test
```
{{% /example %}}
{{% /examples %}}

## Import

Kinesis Streams can be imported using the `name`, e.g.,

```sh
 $ pulumi import aws:kinesis/stream:Stream test_stream kinesis-test
```

 [1]https://aws.amazon.com/documentation/kinesis/ [2]https://docs.aws.amazon.com/kinesis/latest/dev/amazon-kinesis-streams.html [3]https://docs.aws.amazon.com/streams/latest/dev/monitoring-with-cloudwatch.html 
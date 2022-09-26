Manages an AWS DataSync Task, which represents a configuration for synchronization. Starting an execution of these DataSync Tasks (actually synchronizing files) is performed outside of this resource.

{{% examples %}}
## Example Usage
{{% example %}}
### With Scheduling

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.datasync.Task("example", {
    destinationLocationArn: aws_datasync_location_s3.destination.arn,
    sourceLocationArn: aws_datasync_location_nfs.source.arn,
    schedule: {
        scheduleExpression: "cron(0 12 ? * SUN,WED *)",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.datasync.Task("example",
    destination_location_arn=aws_datasync_location_s3["destination"]["arn"],
    source_location_arn=aws_datasync_location_nfs["source"]["arn"],
    schedule=aws.datasync.TaskScheduleArgs(
        schedule_expression="cron(0 12 ? * SUN,WED *)",
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.DataSync.Task("example", new()
    {
        DestinationLocationArn = aws_datasync_location_s3.Destination.Arn,
        SourceLocationArn = aws_datasync_location_nfs.Source.Arn,
        Schedule = new Aws.DataSync.Inputs.TaskScheduleArgs
        {
            ScheduleExpression = "cron(0 12 ? * SUN,WED *)",
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/datasync"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := datasync.NewTask(ctx, "example", &datasync.TaskArgs{
			DestinationLocationArn: pulumi.Any(aws_datasync_location_s3.Destination.Arn),
			SourceLocationArn:      pulumi.Any(aws_datasync_location_nfs.Source.Arn),
			Schedule: &datasync.TaskScheduleArgs{
				ScheduleExpression: pulumi.String("cron(0 12 ? * SUN,WED *)"),
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
import com.pulumi.aws.datasync.Task;
import com.pulumi.aws.datasync.TaskArgs;
import com.pulumi.aws.datasync.inputs.TaskScheduleArgs;
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
        var example = new Task("example", TaskArgs.builder()        
            .destinationLocationArn(aws_datasync_location_s3.destination().arn())
            .sourceLocationArn(aws_datasync_location_nfs.source().arn())
            .schedule(TaskScheduleArgs.builder()
                .scheduleExpression("cron(0 12 ? * SUN,WED *)")
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:datasync:Task
    properties:
      destinationLocationArn: ${aws_datasync_location_s3.destination.arn}
      sourceLocationArn: ${aws_datasync_location_nfs.source.arn}
      schedule:
        scheduleExpression: cron(0 12 ? * SUN,WED *)
```

{{% /example %}}
{{% example %}}
### With Filtering

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.datasync.Task("example", {
    destinationLocationArn: aws_datasync_location_s3.destination.arn,
    sourceLocationArn: aws_datasync_location_nfs.source.arn,
    excludes: {
        filterType: "SIMPLE_PATTERN",
        value: "/folder1|/folder2",
    },
    includes: {
        filterType: "SIMPLE_PATTERN",
        value: "/folder1|/folder2",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.datasync.Task("example",
    destination_location_arn=aws_datasync_location_s3["destination"]["arn"],
    source_location_arn=aws_datasync_location_nfs["source"]["arn"],
    excludes=aws.datasync.TaskExcludesArgs(
        filter_type="SIMPLE_PATTERN",
        value="/folder1|/folder2",
    ),
    includes=aws.datasync.TaskIncludesArgs(
        filter_type="SIMPLE_PATTERN",
        value="/folder1|/folder2",
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.DataSync.Task("example", new()
    {
        DestinationLocationArn = aws_datasync_location_s3.Destination.Arn,
        SourceLocationArn = aws_datasync_location_nfs.Source.Arn,
        Excludes = new Aws.DataSync.Inputs.TaskExcludesArgs
        {
            FilterType = "SIMPLE_PATTERN",
            Value = "/folder1|/folder2",
        },
        Includes = new Aws.DataSync.Inputs.TaskIncludesArgs
        {
            FilterType = "SIMPLE_PATTERN",
            Value = "/folder1|/folder2",
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/datasync"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := datasync.NewTask(ctx, "example", &datasync.TaskArgs{
			DestinationLocationArn: pulumi.Any(aws_datasync_location_s3.Destination.Arn),
			SourceLocationArn:      pulumi.Any(aws_datasync_location_nfs.Source.Arn),
			Excludes: &datasync.TaskExcludesArgs{
				FilterType: pulumi.String("SIMPLE_PATTERN"),
				Value:      pulumi.String("/folder1|/folder2"),
			},
			Includes: &datasync.TaskIncludesArgs{
				FilterType: pulumi.String("SIMPLE_PATTERN"),
				Value:      pulumi.String("/folder1|/folder2"),
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
import com.pulumi.aws.datasync.Task;
import com.pulumi.aws.datasync.TaskArgs;
import com.pulumi.aws.datasync.inputs.TaskExcludesArgs;
import com.pulumi.aws.datasync.inputs.TaskIncludesArgs;
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
        var example = new Task("example", TaskArgs.builder()        
            .destinationLocationArn(aws_datasync_location_s3.destination().arn())
            .sourceLocationArn(aws_datasync_location_nfs.source().arn())
            .excludes(TaskExcludesArgs.builder()
                .filterType("SIMPLE_PATTERN")
                .value("/folder1|/folder2")
                .build())
            .includes(TaskIncludesArgs.builder()
                .filterType("SIMPLE_PATTERN")
                .value("/folder1|/folder2")
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:datasync:Task
    properties:
      destinationLocationArn: ${aws_datasync_location_s3.destination.arn}
      sourceLocationArn: ${aws_datasync_location_nfs.source.arn}
      excludes:
        filterType: SIMPLE_PATTERN
        value: /folder1|/folder2
      includes:
        filterType: SIMPLE_PATTERN
        value: /folder1|/folder2
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_datasync_task` can be imported by using the DataSync Task Amazon Resource Name (ARN), e.g.,

```sh
 $ pulumi import aws:datasync/task:Task example arn:aws:datasync:us-east-1:123456789012:task/task-12345678901234567
```

 
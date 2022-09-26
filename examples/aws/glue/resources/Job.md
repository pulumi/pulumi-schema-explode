Provides a Glue Job resource.

> Glue functionality, such as monitoring and logging of jobs, is typically managed with the `default_arguments` argument. See the [Special Parameters Used by AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-glue-arguments.html) topic in the Glue developer guide for additional information.

{{% examples %}}
## Example Usage
{{% example %}}
### Python Job

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.glue.Job("example", {
    roleArn: aws_iam_role.example.arn,
    command: {
        scriptLocation: `s3://${aws_s3_bucket.example.bucket}/example.py`,
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.glue.Job("example",
    role_arn=aws_iam_role["example"]["arn"],
    command=aws.glue.JobCommandArgs(
        script_location=f"s3://{aws_s3_bucket['example']['bucket']}/example.py",
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Glue.Job("example", new()
    {
        RoleArn = aws_iam_role.Example.Arn,
        Command = new Aws.Glue.Inputs.JobCommandArgs
        {
            ScriptLocation = $"s3://{aws_s3_bucket.Example.Bucket}/example.py",
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/glue"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := glue.NewJob(ctx, "example", &glue.JobArgs{
			RoleArn: pulumi.Any(aws_iam_role.Example.Arn),
			Command: &glue.JobCommandArgs{
				ScriptLocation: pulumi.String(fmt.Sprintf("s3://%v/example.py", aws_s3_bucket.Example.Bucket)),
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
import com.pulumi.aws.glue.Job;
import com.pulumi.aws.glue.JobArgs;
import com.pulumi.aws.glue.inputs.JobCommandArgs;
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
        var example = new Job("example", JobArgs.builder()        
            .roleArn(aws_iam_role.example().arn())
            .command(JobCommandArgs.builder()
                .scriptLocation(String.format("s3://%s/example.py", aws_s3_bucket.example().bucket()))
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:glue:Job
    properties:
      roleArn: ${aws_iam_role.example.arn}
      command:
        scriptLocation: s3://${aws_s3_bucket.example.bucket}/example.py
```
{{% /example %}}
{{% example %}}
### Scala Job

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.glue.Job("example", {
    roleArn: aws_iam_role.example.arn,
    command: {
        scriptLocation: `s3://${aws_s3_bucket.example.bucket}/example.scala`,
    },
    defaultArguments: {
        "--job-language": "scala",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.glue.Job("example",
    role_arn=aws_iam_role["example"]["arn"],
    command=aws.glue.JobCommandArgs(
        script_location=f"s3://{aws_s3_bucket['example']['bucket']}/example.scala",
    ),
    default_arguments={
        "--job-language": "scala",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Glue.Job("example", new()
    {
        RoleArn = aws_iam_role.Example.Arn,
        Command = new Aws.Glue.Inputs.JobCommandArgs
        {
            ScriptLocation = $"s3://{aws_s3_bucket.Example.Bucket}/example.scala",
        },
        DefaultArguments = 
        {
            { "--job-language", "scala" },
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/glue"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := glue.NewJob(ctx, "example", &glue.JobArgs{
			RoleArn: pulumi.Any(aws_iam_role.Example.Arn),
			Command: &glue.JobCommandArgs{
				ScriptLocation: pulumi.String(fmt.Sprintf("s3://%v/example.scala", aws_s3_bucket.Example.Bucket)),
			},
			DefaultArguments: pulumi.StringMap{
				"--job-language": pulumi.String("scala"),
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
import com.pulumi.aws.glue.Job;
import com.pulumi.aws.glue.JobArgs;
import com.pulumi.aws.glue.inputs.JobCommandArgs;
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
        var example = new Job("example", JobArgs.builder()        
            .roleArn(aws_iam_role.example().arn())
            .command(JobCommandArgs.builder()
                .scriptLocation(String.format("s3://%s/example.scala", aws_s3_bucket.example().bucket()))
                .build())
            .defaultArguments(Map.of("--job-language", "scala"))
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:glue:Job
    properties:
      roleArn: ${aws_iam_role.example.arn}
      command:
        scriptLocation: s3://${aws_s3_bucket.example.bucket}/example.scala
      defaultArguments:
        --job-language: scala
```
{{% /example %}}
{{% example %}}
### Streaming Job

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.glue.Job("example", {
    roleArn: aws_iam_role.example.arn,
    command: {
        name: "gluestreaming",
        scriptLocation: `s3://${aws_s3_bucket.example.bucket}/example.script`,
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.glue.Job("example",
    role_arn=aws_iam_role["example"]["arn"],
    command=aws.glue.JobCommandArgs(
        name="gluestreaming",
        script_location=f"s3://{aws_s3_bucket['example']['bucket']}/example.script",
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Glue.Job("example", new()
    {
        RoleArn = aws_iam_role.Example.Arn,
        Command = new Aws.Glue.Inputs.JobCommandArgs
        {
            Name = "gluestreaming",
            ScriptLocation = $"s3://{aws_s3_bucket.Example.Bucket}/example.script",
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/glue"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := glue.NewJob(ctx, "example", &glue.JobArgs{
			RoleArn: pulumi.Any(aws_iam_role.Example.Arn),
			Command: &glue.JobCommandArgs{
				Name:           pulumi.String("gluestreaming"),
				ScriptLocation: pulumi.String(fmt.Sprintf("s3://%v/example.script", aws_s3_bucket.Example.Bucket)),
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
import com.pulumi.aws.glue.Job;
import com.pulumi.aws.glue.JobArgs;
import com.pulumi.aws.glue.inputs.JobCommandArgs;
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
        var example = new Job("example", JobArgs.builder()        
            .roleArn(aws_iam_role.example().arn())
            .command(JobCommandArgs.builder()
                .name("gluestreaming")
                .scriptLocation(String.format("s3://%s/example.script", aws_s3_bucket.example().bucket()))
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:glue:Job
    properties:
      roleArn: ${aws_iam_role.example.arn}
      command:
        name: gluestreaming
        scriptLocation: s3://${aws_s3_bucket.example.bucket}/example.script
```
{{% /example %}}
{{% example %}}
### Enabling CloudWatch Logs and Metrics

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleLogGroup = new aws.cloudwatch.LogGroup("exampleLogGroup", {retentionInDays: 14});
// ... other configuration ...
const exampleJob = new aws.glue.Job("exampleJob", {defaultArguments: {
    "--continuous-log-logGroup": exampleLogGroup.name,
    "--enable-continuous-cloudwatch-log": "true",
    "--enable-continuous-log-filter": "true",
    "--enable-metrics": "",
}});
```
```python
import pulumi
import pulumi_aws as aws

example_log_group = aws.cloudwatch.LogGroup("exampleLogGroup", retention_in_days=14)
# ... other configuration ...
example_job = aws.glue.Job("exampleJob", default_arguments={
    "--continuous-log-logGroup": example_log_group.name,
    "--enable-continuous-cloudwatch-log": "true",
    "--enable-continuous-log-filter": "true",
    "--enable-metrics": "",
})
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleLogGroup = new Aws.CloudWatch.LogGroup("exampleLogGroup", new()
    {
        RetentionInDays = 14,
    });

    // ... other configuration ...
    var exampleJob = new Aws.Glue.Job("exampleJob", new()
    {
        DefaultArguments = 
        {
            { "--continuous-log-logGroup", exampleLogGroup.Name },
            { "--enable-continuous-cloudwatch-log", "true" },
            { "--enable-continuous-log-filter", "true" },
            { "--enable-metrics", "" },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudwatch"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/glue"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleLogGroup, err := cloudwatch.NewLogGroup(ctx, "exampleLogGroup", &cloudwatch.LogGroupArgs{
			RetentionInDays: pulumi.Int(14),
		})
		if err != nil {
			return err
		}
		_, err = glue.NewJob(ctx, "exampleJob", &glue.JobArgs{
			DefaultArguments: pulumi.StringMap{
				"--continuous-log-logGroup":          exampleLogGroup.Name,
				"--enable-continuous-cloudwatch-log": pulumi.String("true"),
				"--enable-continuous-log-filter":     pulumi.String("true"),
				"--enable-metrics":                   pulumi.String(""),
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
import com.pulumi.aws.cloudwatch.LogGroup;
import com.pulumi.aws.cloudwatch.LogGroupArgs;
import com.pulumi.aws.glue.Job;
import com.pulumi.aws.glue.JobArgs;
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
        var exampleLogGroup = new LogGroup("exampleLogGroup", LogGroupArgs.builder()        
            .retentionInDays(14)
            .build());

        var exampleJob = new Job("exampleJob", JobArgs.builder()        
            .defaultArguments(Map.ofEntries(
                Map.entry("--continuous-log-logGroup", exampleLogGroup.name()),
                Map.entry("--enable-continuous-cloudwatch-log", "true"),
                Map.entry("--enable-continuous-log-filter", "true"),
                Map.entry("--enable-metrics", "")
            ))
            .build());

    }
}
```
```yaml
resources:
  exampleLogGroup:
    type: aws:cloudwatch:LogGroup
    properties:
      retentionInDays: 14
  exampleJob:
    type: aws:glue:Job
    properties:
      defaultArguments:
        --continuous-log-logGroup: ${exampleLogGroup.name}
        --enable-continuous-cloudwatch-log: true
        --enable-continuous-log-filter: true
        --enable-metrics:
```
{{% /example %}}
{{% /examples %}}

## Import

Glue Jobs can be imported using `name`, e.g.,

```sh
 $ pulumi import aws:glue/job:Job MyJob MyJob
```

 
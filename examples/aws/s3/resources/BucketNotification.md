Manages a S3 Bucket Notification Configuration. For additional information, see the [Configuring S3 Event Notifications section in the Amazon S3 Developer Guide](https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html).

> **NOTE:** S3 Buckets only support a single notification configuration. Declaring multiple `aws.s3.BucketNotification` resources to the same S3 Bucket will cause a perpetual difference in configuration. See the example "Trigger multiple Lambda functions" for an option.

{{% examples %}}
## Example Usage
{{% example %}}
### Add notification configuration to SNS Topic

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bucket = new aws.s3.BucketV2("bucket", {});
const topic = new aws.sns.Topic("topic", {policy: pulumi.interpolate`{
    "Version":"2012-10-17",
    "Statement":[{
        "Effect": "Allow",
        "Principal": { "Service": "s3.amazonaws.com" },
        "Action": "SNS:Publish",
        "Resource": "arn:aws:sns:*:*:s3-event-notification-topic",
        "Condition":{
            "ArnLike":{"aws:SourceArn":"${bucket.arn}"}
        }
    }]
}
`});
const bucketNotification = new aws.s3.BucketNotification("bucketNotification", {
    bucket: bucket.id,
    topics: [{
        topicArn: topic.arn,
        events: ["s3:ObjectCreated:*"],
        filterSuffix: ".log",
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

bucket = aws.s3.BucketV2("bucket")
topic = aws.sns.Topic("topic", policy=bucket.arn.apply(lambda arn: f"""{{
    "Version":"2012-10-17",
    "Statement":[{{
        "Effect": "Allow",
        "Principal": {{ "Service": "s3.amazonaws.com" }},
        "Action": "SNS:Publish",
        "Resource": "arn:aws:sns:*:*:s3-event-notification-topic",
        "Condition":{{
            "ArnLike":{{"aws:SourceArn":"{arn}"}}
        }}
    }}]
}}
"""))
bucket_notification = aws.s3.BucketNotification("bucketNotification",
    bucket=bucket.id,
    topics=[aws.s3.BucketNotificationTopicArgs(
        topic_arn=topic.arn,
        events=["s3:ObjectCreated:*"],
        filter_suffix=".log",
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var bucket = new Aws.S3.BucketV2("bucket");

    var topic = new Aws.Sns.Topic("topic", new()
    {
        Policy = bucket.Arn.Apply(arn => @$"{{
    ""Version"":""2012-10-17"",
    ""Statement"":[{{
        ""Effect"": ""Allow"",
        ""Principal"": {{ ""Service"": ""s3.amazonaws.com"" }},
        ""Action"": ""SNS:Publish"",
        ""Resource"": ""arn:aws:sns:*:*:s3-event-notification-topic"",
        ""Condition"":{{
            ""ArnLike"":{{""aws:SourceArn"":""{arn}""}}
        }}
    }}]
}}
"),
    });

    var bucketNotification = new Aws.S3.BucketNotification("bucketNotification", new()
    {
        Bucket = bucket.Id,
        Topics = new[]
        {
            new Aws.S3.Inputs.BucketNotificationTopicArgs
            {
                TopicArn = topic.Arn,
                Events = new[]
                {
                    "s3:ObjectCreated:*",
                },
                FilterSuffix = ".log",
            },
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sns"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		bucket, err := s3.NewBucketV2(ctx, "bucket", nil)
		if err != nil {
			return err
		}
		topic, err := sns.NewTopic(ctx, "topic", &sns.TopicArgs{
			Policy: bucket.Arn.ApplyT(func(arn string) (string, error) {
				return fmt.Sprintf(`{
    "Version":"2012-10-17",
    "Statement":[{
        "Effect": "Allow",
        "Principal": { "Service": "s3.amazonaws.com" },
        "Action": "SNS:Publish",
        "Resource": "arn:aws:sns:*:*:s3-event-notification-topic",
        "Condition":{
            "ArnLike":{"aws:SourceArn":"%v"}
        }
    }]
}
`, arn), nil
			}).(pulumi.StringOutput),
		})
		if err != nil {
			return err
		}
		_, err = s3.NewBucketNotification(ctx, "bucketNotification", &s3.BucketNotificationArgs{
			Bucket: bucket.ID(),
			Topics: s3.BucketNotificationTopicArray{
				&s3.BucketNotificationTopicArgs{
					TopicArn: topic.Arn,
					Events: pulumi.StringArray{
						pulumi.String("s3:ObjectCreated:*"),
					},
					FilterSuffix: pulumi.String(".log"),
				},
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
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.sns.Topic;
import com.pulumi.aws.sns.TopicArgs;
import com.pulumi.aws.s3.BucketNotification;
import com.pulumi.aws.s3.BucketNotificationArgs;
import com.pulumi.aws.s3.inputs.BucketNotificationTopicArgs;
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
        var bucket = new BucketV2("bucket");

        var topic = new Topic("topic", TopicArgs.builder()        
            .policy(bucket.arn().applyValue(arn -> """
{
    "Version":"2012-10-17",
    "Statement":[{
        "Effect": "Allow",
        "Principal": { "Service": "s3.amazonaws.com" },
        "Action": "SNS:Publish",
        "Resource": "arn:aws:sns:*:*:s3-event-notification-topic",
        "Condition":{
            "ArnLike":{"aws:SourceArn":"%s"}
        }
    }]
}
", arn)))
            .build());

        var bucketNotification = new BucketNotification("bucketNotification", BucketNotificationArgs.builder()        
            .bucket(bucket.id())
            .topics(BucketNotificationTopicArgs.builder()
                .topicArn(topic.arn())
                .events("s3:ObjectCreated:*")
                .filterSuffix(".log")
                .build())
            .build());

    }
}
```
```yaml
resources:
  topic:
    type: aws:sns:Topic
    properties:
      policy: |
        {
            "Version":"2012-10-17",
            "Statement":[{
                "Effect": "Allow",
                "Principal": { "Service": "s3.amazonaws.com" },
                "Action": "SNS:Publish",
                "Resource": "arn:aws:sns:*:*:s3-event-notification-topic",
                "Condition":{
                    "ArnLike":{"aws:SourceArn":"${bucket.arn}"}
                }
            }]
        }
  bucket:
    type: aws:s3:BucketV2
  bucketNotification:
    type: aws:s3:BucketNotification
    properties:
      bucket: ${bucket.id}
      topics:
        - topicArn: ${topic.arn}
          events:
            - s3:ObjectCreated:*
          filterSuffix: .log
```
{{% /example %}}
{{% example %}}
### Add notification configuration to SQS Queue

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bucket = new aws.s3.BucketV2("bucket", {});
const queue = new aws.sqs.Queue("queue", {policy: pulumi.interpolate`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "sqs:SendMessage",
	  "Resource": "arn:aws:sqs:*:*:s3-event-notification-queue",
      "Condition": {
        "ArnEquals": { "aws:SourceArn": "${bucket.arn}" }
      }
    }
  ]
}
`});
const bucketNotification = new aws.s3.BucketNotification("bucketNotification", {
    bucket: bucket.id,
    queues: [{
        queueArn: queue.arn,
        events: ["s3:ObjectCreated:*"],
        filterSuffix: ".log",
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

bucket = aws.s3.BucketV2("bucket")
queue = aws.sqs.Queue("queue", policy=bucket.arn.apply(lambda arn: f"""{{
  "Version": "2012-10-17",
  "Statement": [
    {{
      "Effect": "Allow",
      "Principal": "*",
      "Action": "sqs:SendMessage",
	  "Resource": "arn:aws:sqs:*:*:s3-event-notification-queue",
      "Condition": {{
        "ArnEquals": {{ "aws:SourceArn": "{arn}" }}
      }}
    }}
  ]
}}
"""))
bucket_notification = aws.s3.BucketNotification("bucketNotification",
    bucket=bucket.id,
    queues=[aws.s3.BucketNotificationQueueArgs(
        queue_arn=queue.arn,
        events=["s3:ObjectCreated:*"],
        filter_suffix=".log",
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var bucket = new Aws.S3.BucketV2("bucket");

    var queue = new Aws.Sqs.Queue("queue", new()
    {
        Policy = bucket.Arn.Apply(arn => @$"{{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {{
      ""Effect"": ""Allow"",
      ""Principal"": ""*"",
      ""Action"": ""sqs:SendMessage"",
	  ""Resource"": ""arn:aws:sqs:*:*:s3-event-notification-queue"",
      ""Condition"": {{
        ""ArnEquals"": {{ ""aws:SourceArn"": ""{arn}"" }}
      }}
    }}
  ]
}}
"),
    });

    var bucketNotification = new Aws.S3.BucketNotification("bucketNotification", new()
    {
        Bucket = bucket.Id,
        Queues = new[]
        {
            new Aws.S3.Inputs.BucketNotificationQueueArgs
            {
                QueueArn = queue.Arn,
                Events = new[]
                {
                    "s3:ObjectCreated:*",
                },
                FilterSuffix = ".log",
            },
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sqs"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		bucket, err := s3.NewBucketV2(ctx, "bucket", nil)
		if err != nil {
			return err
		}
		queue, err := sqs.NewQueue(ctx, "queue", &sqs.QueueArgs{
			Policy: bucket.Arn.ApplyT(func(arn string) (string, error) {
				return fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "sqs:SendMessage",
	  "Resource": "arn:aws:sqs:*:*:s3-event-notification-queue",
      "Condition": {
        "ArnEquals": { "aws:SourceArn": "%v" }
      }
    }
  ]
}
`, arn), nil
			}).(pulumi.StringOutput),
		})
		if err != nil {
			return err
		}
		_, err = s3.NewBucketNotification(ctx, "bucketNotification", &s3.BucketNotificationArgs{
			Bucket: bucket.ID(),
			Queues: s3.BucketNotificationQueueArray{
				&s3.BucketNotificationQueueArgs{
					QueueArn: queue.Arn,
					Events: pulumi.StringArray{
						pulumi.String("s3:ObjectCreated:*"),
					},
					FilterSuffix: pulumi.String(".log"),
				},
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
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.sqs.Queue;
import com.pulumi.aws.sqs.QueueArgs;
import com.pulumi.aws.s3.BucketNotification;
import com.pulumi.aws.s3.BucketNotificationArgs;
import com.pulumi.aws.s3.inputs.BucketNotificationQueueArgs;
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
        var bucket = new BucketV2("bucket");

        var queue = new Queue("queue", QueueArgs.builder()        
            .policy(bucket.arn().applyValue(arn -> """
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "sqs:SendMessage",
	  "Resource": "arn:aws:sqs:*:*:s3-event-notification-queue",
      "Condition": {
        "ArnEquals": { "aws:SourceArn": "%s" }
      }
    }
  ]
}
", arn)))
            .build());

        var bucketNotification = new BucketNotification("bucketNotification", BucketNotificationArgs.builder()        
            .bucket(bucket.id())
            .queues(BucketNotificationQueueArgs.builder()
                .queueArn(queue.arn())
                .events("s3:ObjectCreated:*")
                .filterSuffix(".log")
                .build())
            .build());

    }
}
```
```yaml
resources:
  queue:
    type: aws:sqs:Queue
    properties:
      policy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": "*",
              "Action": "sqs:SendMessage",
        	  "Resource": "arn:aws:sqs:*:*:s3-event-notification-queue",
              "Condition": {
                "ArnEquals": { "aws:SourceArn": "${bucket.arn}" }
              }
            }
          ]
        }
  bucket:
    type: aws:s3:BucketV2
  bucketNotification:
    type: aws:s3:BucketNotification
    properties:
      bucket: ${bucket.id}
      queues:
        - queueArn: ${queue.arn}
          events:
            - s3:ObjectCreated:*
          filterSuffix: .log
```
{{% /example %}}
{{% example %}}
### Add notification configuration to Lambda Function

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const iamForLambda = new aws.iam.Role("iamForLambda", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
`});
const func = new aws.lambda.Function("func", {
    code: new pulumi.asset.FileArchive("your-function.zip"),
    role: iamForLambda.arn,
    handler: "exports.example",
    runtime: "go1.x",
});
const bucket = new aws.s3.BucketV2("bucket", {});
const allowBucket = new aws.lambda.Permission("allowBucket", {
    action: "lambda:InvokeFunction",
    "function": func.arn,
    principal: "s3.amazonaws.com",
    sourceArn: bucket.arn,
});
const bucketNotification = new aws.s3.BucketNotification("bucketNotification", {
    bucket: bucket.id,
    lambdaFunctions: [{
        lambdaFunctionArn: func.arn,
        events: ["s3:ObjectCreated:*"],
        filterPrefix: "AWSLogs/",
        filterSuffix: ".log",
    }],
}, {
    dependsOn: [allowBucket],
});
```
```python
import pulumi
import pulumi_aws as aws

iam_for_lambda = aws.iam.Role("iamForLambda", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
""")
func = aws.lambda_.Function("func",
    code=pulumi.FileArchive("your-function.zip"),
    role=iam_for_lambda.arn,
    handler="exports.example",
    runtime="go1.x")
bucket = aws.s3.BucketV2("bucket")
allow_bucket = aws.lambda_.Permission("allowBucket",
    action="lambda:InvokeFunction",
    function=func.arn,
    principal="s3.amazonaws.com",
    source_arn=bucket.arn)
bucket_notification = aws.s3.BucketNotification("bucketNotification",
    bucket=bucket.id,
    lambda_functions=[aws.s3.BucketNotificationLambdaFunctionArgs(
        lambda_function_arn=func.arn,
        events=["s3:ObjectCreated:*"],
        filter_prefix="AWSLogs/",
        filter_suffix=".log",
    )],
    opts=pulumi.ResourceOptions(depends_on=[allow_bucket]))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var iamForLambda = new Aws.Iam.Role("iamForLambda", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Action"": ""sts:AssumeRole"",
      ""Principal"": {
        ""Service"": ""lambda.amazonaws.com""
      },
      ""Effect"": ""Allow""
    }
  ]
}
",
    });

    var func = new Aws.Lambda.Function("func", new()
    {
        Code = new FileArchive("your-function.zip"),
        Role = iamForLambda.Arn,
        Handler = "exports.example",
        Runtime = "go1.x",
    });

    var bucket = new Aws.S3.BucketV2("bucket");

    var allowBucket = new Aws.Lambda.Permission("allowBucket", new()
    {
        Action = "lambda:InvokeFunction",
        Function = func.Arn,
        Principal = "s3.amazonaws.com",
        SourceArn = bucket.Arn,
    });

    var bucketNotification = new Aws.S3.BucketNotification("bucketNotification", new()
    {
        Bucket = bucket.Id,
        LambdaFunctions = new[]
        {
            new Aws.S3.Inputs.BucketNotificationLambdaFunctionArgs
            {
                LambdaFunctionArn = func.Arn,
                Events = new[]
                {
                    "s3:ObjectCreated:*",
                },
                FilterPrefix = "AWSLogs/",
                FilterSuffix = ".log",
            },
        },
    }, new CustomResourceOptions
    {
        DependsOn = new[]
        {
            allowBucket,
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lambda"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		iamForLambda, err := iam.NewRole(ctx, "iamForLambda", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
`)),
		})
		if err != nil {
			return err
		}
		_, err = lambda.NewFunction(ctx, "func", &lambda.FunctionArgs{
			Code:    pulumi.NewFileArchive("your-function.zip"),
			Role:    iamForLambda.Arn,
			Handler: pulumi.String("exports.example"),
			Runtime: pulumi.String("go1.x"),
		})
		if err != nil {
			return err
		}
		bucket, err := s3.NewBucketV2(ctx, "bucket", nil)
		if err != nil {
			return err
		}
		allowBucket, err := lambda.NewPermission(ctx, "allowBucket", &lambda.PermissionArgs{
			Action:    pulumi.String("lambda:InvokeFunction"),
			Function:  _func.Arn,
			Principal: pulumi.String("s3.amazonaws.com"),
			SourceArn: bucket.Arn,
		})
		if err != nil {
			return err
		}
		_, err = s3.NewBucketNotification(ctx, "bucketNotification", &s3.BucketNotificationArgs{
			Bucket: bucket.ID(),
			LambdaFunctions: s3.BucketNotificationLambdaFunctionArray{
				&s3.BucketNotificationLambdaFunctionArgs{
					LambdaFunctionArn: _func.Arn,
					Events: pulumi.StringArray{
						pulumi.String("s3:ObjectCreated:*"),
					},
					FilterPrefix: pulumi.String("AWSLogs/"),
					FilterSuffix: pulumi.String(".log"),
				},
			},
		}, pulumi.DependsOn([]pulumi.Resource{
			allowBucket,
		}))
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
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.lambda.Function;
import com.pulumi.aws.lambda.FunctionArgs;
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.lambda.Permission;
import com.pulumi.aws.lambda.PermissionArgs;
import com.pulumi.aws.s3.BucketNotification;
import com.pulumi.aws.s3.BucketNotificationArgs;
import com.pulumi.aws.s3.inputs.BucketNotificationLambdaFunctionArgs;
import com.pulumi.resources.CustomResourceOptions;
import com.pulumi.asset.FileArchive;
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
        var iamForLambda = new Role("iamForLambda", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
            """)
            .build());

        var func = new Function("func", FunctionArgs.builder()        
            .code(new FileArchive("your-function.zip"))
            .role(iamForLambda.arn())
            .handler("exports.example")
            .runtime("go1.x")
            .build());

        var bucket = new BucketV2("bucket");

        var allowBucket = new Permission("allowBucket", PermissionArgs.builder()        
            .action("lambda:InvokeFunction")
            .function(func.arn())
            .principal("s3.amazonaws.com")
            .sourceArn(bucket.arn())
            .build());

        var bucketNotification = new BucketNotification("bucketNotification", BucketNotificationArgs.builder()        
            .bucket(bucket.id())
            .lambdaFunctions(BucketNotificationLambdaFunctionArgs.builder()
                .lambdaFunctionArn(func.arn())
                .events("s3:ObjectCreated:*")
                .filterPrefix("AWSLogs/")
                .filterSuffix(".log")
                .build())
            .build(), CustomResourceOptions.builder()
                .dependsOn(allowBucket)
                .build());

    }
}
```
```yaml
resources:
  iamForLambda:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              },
              "Effect": "Allow"
            }
          ]
        }
  allowBucket:
    type: aws:lambda:Permission
    properties:
      action: lambda:InvokeFunction
      function: ${func.arn}
      principal: s3.amazonaws.com
      sourceArn: ${bucket.arn}
  func:
    type: aws:lambda:Function
    properties:
      code:
        Fn::FileArchive: your-function.zip
      role: ${iamForLambda.arn}
      handler: exports.example
      runtime: go1.x
  bucket:
    type: aws:s3:BucketV2
  bucketNotification:
    type: aws:s3:BucketNotification
    properties:
      bucket: ${bucket.id}
      lambdaFunctions:
        - lambdaFunctionArn: ${func.arn}
          events:
            - s3:ObjectCreated:*
          filterPrefix: AWSLogs/
          filterSuffix: .log
    options:
      dependson:
        - ${allowBucket}
```
{{% /example %}}
{{% example %}}
### Trigger multiple Lambda functions

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const iamForLambda = new aws.iam.Role("iamForLambda", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
`});
const func1 = new aws.lambda.Function("func1", {
    code: new pulumi.asset.FileArchive("your-function1.zip"),
    role: iamForLambda.arn,
    handler: "exports.example",
    runtime: "go1.x",
});
const bucket = new aws.s3.BucketV2("bucket", {});
const allowBucket1 = new aws.lambda.Permission("allowBucket1", {
    action: "lambda:InvokeFunction",
    "function": func1.arn,
    principal: "s3.amazonaws.com",
    sourceArn: bucket.arn,
});
const func2 = new aws.lambda.Function("func2", {
    code: new pulumi.asset.FileArchive("your-function2.zip"),
    role: iamForLambda.arn,
    handler: "exports.example",
});
const allowBucket2 = new aws.lambda.Permission("allowBucket2", {
    action: "lambda:InvokeFunction",
    "function": func2.arn,
    principal: "s3.amazonaws.com",
    sourceArn: bucket.arn,
});
const bucketNotification = new aws.s3.BucketNotification("bucketNotification", {
    bucket: bucket.id,
    lambdaFunctions: [
        {
            lambdaFunctionArn: func1.arn,
            events: ["s3:ObjectCreated:*"],
            filterPrefix: "AWSLogs/",
            filterSuffix: ".log",
        },
        {
            lambdaFunctionArn: func2.arn,
            events: ["s3:ObjectCreated:*"],
            filterPrefix: "OtherLogs/",
            filterSuffix: ".log",
        },
    ],
}, {
    dependsOn: [
        allowBucket1,
        allowBucket2,
    ],
});
```
```python
import pulumi
import pulumi_aws as aws

iam_for_lambda = aws.iam.Role("iamForLambda", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
""")
func1 = aws.lambda_.Function("func1",
    code=pulumi.FileArchive("your-function1.zip"),
    role=iam_for_lambda.arn,
    handler="exports.example",
    runtime="go1.x")
bucket = aws.s3.BucketV2("bucket")
allow_bucket1 = aws.lambda_.Permission("allowBucket1",
    action="lambda:InvokeFunction",
    function=func1.arn,
    principal="s3.amazonaws.com",
    source_arn=bucket.arn)
func2 = aws.lambda_.Function("func2",
    code=pulumi.FileArchive("your-function2.zip"),
    role=iam_for_lambda.arn,
    handler="exports.example")
allow_bucket2 = aws.lambda_.Permission("allowBucket2",
    action="lambda:InvokeFunction",
    function=func2.arn,
    principal="s3.amazonaws.com",
    source_arn=bucket.arn)
bucket_notification = aws.s3.BucketNotification("bucketNotification",
    bucket=bucket.id,
    lambda_functions=[
        aws.s3.BucketNotificationLambdaFunctionArgs(
            lambda_function_arn=func1.arn,
            events=["s3:ObjectCreated:*"],
            filter_prefix="AWSLogs/",
            filter_suffix=".log",
        ),
        aws.s3.BucketNotificationLambdaFunctionArgs(
            lambda_function_arn=func2.arn,
            events=["s3:ObjectCreated:*"],
            filter_prefix="OtherLogs/",
            filter_suffix=".log",
        ),
    ],
    opts=pulumi.ResourceOptions(depends_on=[
            allow_bucket1,
            allow_bucket2,
        ]))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var iamForLambda = new Aws.Iam.Role("iamForLambda", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Action"": ""sts:AssumeRole"",
      ""Principal"": {
        ""Service"": ""lambda.amazonaws.com""
      },
      ""Effect"": ""Allow""
    }
  ]
}
",
    });

    var func1 = new Aws.Lambda.Function("func1", new()
    {
        Code = new FileArchive("your-function1.zip"),
        Role = iamForLambda.Arn,
        Handler = "exports.example",
        Runtime = "go1.x",
    });

    var bucket = new Aws.S3.BucketV2("bucket");

    var allowBucket1 = new Aws.Lambda.Permission("allowBucket1", new()
    {
        Action = "lambda:InvokeFunction",
        Function = func1.Arn,
        Principal = "s3.amazonaws.com",
        SourceArn = bucket.Arn,
    });

    var func2 = new Aws.Lambda.Function("func2", new()
    {
        Code = new FileArchive("your-function2.zip"),
        Role = iamForLambda.Arn,
        Handler = "exports.example",
    });

    var allowBucket2 = new Aws.Lambda.Permission("allowBucket2", new()
    {
        Action = "lambda:InvokeFunction",
        Function = func2.Arn,
        Principal = "s3.amazonaws.com",
        SourceArn = bucket.Arn,
    });

    var bucketNotification = new Aws.S3.BucketNotification("bucketNotification", new()
    {
        Bucket = bucket.Id,
        LambdaFunctions = new[]
        {
            new Aws.S3.Inputs.BucketNotificationLambdaFunctionArgs
            {
                LambdaFunctionArn = func1.Arn,
                Events = new[]
                {
                    "s3:ObjectCreated:*",
                },
                FilterPrefix = "AWSLogs/",
                FilterSuffix = ".log",
            },
            new Aws.S3.Inputs.BucketNotificationLambdaFunctionArgs
            {
                LambdaFunctionArn = func2.Arn,
                Events = new[]
                {
                    "s3:ObjectCreated:*",
                },
                FilterPrefix = "OtherLogs/",
                FilterSuffix = ".log",
            },
        },
    }, new CustomResourceOptions
    {
        DependsOn = new[]
        {
            allowBucket1,
            allowBucket2,
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lambda"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		iamForLambda, err := iam.NewRole(ctx, "iamForLambda", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
`)),
		})
		if err != nil {
			return err
		}
		func1, err := lambda.NewFunction(ctx, "func1", &lambda.FunctionArgs{
			Code:    pulumi.NewFileArchive("your-function1.zip"),
			Role:    iamForLambda.Arn,
			Handler: pulumi.String("exports.example"),
			Runtime: pulumi.String("go1.x"),
		})
		if err != nil {
			return err
		}
		bucket, err := s3.NewBucketV2(ctx, "bucket", nil)
		if err != nil {
			return err
		}
		allowBucket1, err := lambda.NewPermission(ctx, "allowBucket1", &lambda.PermissionArgs{
			Action:    pulumi.String("lambda:InvokeFunction"),
			Function:  func1.Arn,
			Principal: pulumi.String("s3.amazonaws.com"),
			SourceArn: bucket.Arn,
		})
		if err != nil {
			return err
		}
		func2, err := lambda.NewFunction(ctx, "func2", &lambda.FunctionArgs{
			Code:    pulumi.NewFileArchive("your-function2.zip"),
			Role:    iamForLambda.Arn,
			Handler: pulumi.String("exports.example"),
		})
		if err != nil {
			return err
		}
		allowBucket2, err := lambda.NewPermission(ctx, "allowBucket2", &lambda.PermissionArgs{
			Action:    pulumi.String("lambda:InvokeFunction"),
			Function:  func2.Arn,
			Principal: pulumi.String("s3.amazonaws.com"),
			SourceArn: bucket.Arn,
		})
		if err != nil {
			return err
		}
		_, err = s3.NewBucketNotification(ctx, "bucketNotification", &s3.BucketNotificationArgs{
			Bucket: bucket.ID(),
			LambdaFunctions: s3.BucketNotificationLambdaFunctionArray{
				&s3.BucketNotificationLambdaFunctionArgs{
					LambdaFunctionArn: func1.Arn,
					Events: pulumi.StringArray{
						pulumi.String("s3:ObjectCreated:*"),
					},
					FilterPrefix: pulumi.String("AWSLogs/"),
					FilterSuffix: pulumi.String(".log"),
				},
				&s3.BucketNotificationLambdaFunctionArgs{
					LambdaFunctionArn: func2.Arn,
					Events: pulumi.StringArray{
						pulumi.String("s3:ObjectCreated:*"),
					},
					FilterPrefix: pulumi.String("OtherLogs/"),
					FilterSuffix: pulumi.String(".log"),
				},
			},
		}, pulumi.DependsOn([]pulumi.Resource{
			allowBucket1,
			allowBucket2,
		}))
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
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.lambda.Function;
import com.pulumi.aws.lambda.FunctionArgs;
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.lambda.Permission;
import com.pulumi.aws.lambda.PermissionArgs;
import com.pulumi.aws.s3.BucketNotification;
import com.pulumi.aws.s3.BucketNotificationArgs;
import com.pulumi.aws.s3.inputs.BucketNotificationLambdaFunctionArgs;
import com.pulumi.resources.CustomResourceOptions;
import com.pulumi.asset.FileArchive;
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
        var iamForLambda = new Role("iamForLambda", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
            """)
            .build());

        var func1 = new Function("func1", FunctionArgs.builder()        
            .code(new FileArchive("your-function1.zip"))
            .role(iamForLambda.arn())
            .handler("exports.example")
            .runtime("go1.x")
            .build());

        var bucket = new BucketV2("bucket");

        var allowBucket1 = new Permission("allowBucket1", PermissionArgs.builder()        
            .action("lambda:InvokeFunction")
            .function(func1.arn())
            .principal("s3.amazonaws.com")
            .sourceArn(bucket.arn())
            .build());

        var func2 = new Function("func2", FunctionArgs.builder()        
            .code(new FileArchive("your-function2.zip"))
            .role(iamForLambda.arn())
            .handler("exports.example")
            .build());

        var allowBucket2 = new Permission("allowBucket2", PermissionArgs.builder()        
            .action("lambda:InvokeFunction")
            .function(func2.arn())
            .principal("s3.amazonaws.com")
            .sourceArn(bucket.arn())
            .build());

        var bucketNotification = new BucketNotification("bucketNotification", BucketNotificationArgs.builder()        
            .bucket(bucket.id())
            .lambdaFunctions(            
                BucketNotificationLambdaFunctionArgs.builder()
                    .lambdaFunctionArn(func1.arn())
                    .events("s3:ObjectCreated:*")
                    .filterPrefix("AWSLogs/")
                    .filterSuffix(".log")
                    .build(),
                BucketNotificationLambdaFunctionArgs.builder()
                    .lambdaFunctionArn(func2.arn())
                    .events("s3:ObjectCreated:*")
                    .filterPrefix("OtherLogs/")
                    .filterSuffix(".log")
                    .build())
            .build(), CustomResourceOptions.builder()
                .dependsOn(                
                    allowBucket1,
                    allowBucket2)
                .build());

    }
}
```
```yaml
resources:
  iamForLambda:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              },
              "Effect": "Allow"
            }
          ]
        }
  allowBucket1:
    type: aws:lambda:Permission
    properties:
      action: lambda:InvokeFunction
      function: ${func1.arn}
      principal: s3.amazonaws.com
      sourceArn: ${bucket.arn}
  func1:
    type: aws:lambda:Function
    properties:
      code:
        Fn::FileArchive: your-function1.zip
      role: ${iamForLambda.arn}
      handler: exports.example
      runtime: go1.x
  allowBucket2:
    type: aws:lambda:Permission
    properties:
      action: lambda:InvokeFunction
      function: ${func2.arn}
      principal: s3.amazonaws.com
      sourceArn: ${bucket.arn}
  func2:
    type: aws:lambda:Function
    properties:
      code:
        Fn::FileArchive: your-function2.zip
      role: ${iamForLambda.arn}
      handler: exports.example
  bucket:
    type: aws:s3:BucketV2
  bucketNotification:
    type: aws:s3:BucketNotification
    properties:
      bucket: ${bucket.id}
      lambdaFunctions:
        - lambdaFunctionArn: ${func1.arn}
          events:
            - s3:ObjectCreated:*
          filterPrefix: AWSLogs/
          filterSuffix: .log
        - lambdaFunctionArn: ${func2.arn}
          events:
            - s3:ObjectCreated:*
          filterPrefix: OtherLogs/
          filterSuffix: .log
    options:
      dependson:
        - ${allowBucket1}
        - ${allowBucket2}
```
{{% /example %}}
{{% example %}}
### Add multiple notification configurations to SQS Queue

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bucket = new aws.s3.BucketV2("bucket", {});
const queue = new aws.sqs.Queue("queue", {policy: pulumi.interpolate`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "sqs:SendMessage",
	  "Resource": "arn:aws:sqs:*:*:s3-event-notification-queue",
      "Condition": {
        "ArnEquals": { "aws:SourceArn": "${bucket.arn}" }
      }
    }
  ]
}
`});
const bucketNotification = new aws.s3.BucketNotification("bucketNotification", {
    bucket: bucket.id,
    queues: [
        {
            id: "image-upload-event",
            queueArn: queue.arn,
            events: ["s3:ObjectCreated:*"],
            filterPrefix: "images/",
        },
        {
            id: "video-upload-event",
            queueArn: queue.arn,
            events: ["s3:ObjectCreated:*"],
            filterPrefix: "videos/",
        },
    ],
});
```
```python
import pulumi
import pulumi_aws as aws

bucket = aws.s3.BucketV2("bucket")
queue = aws.sqs.Queue("queue", policy=bucket.arn.apply(lambda arn: f"""{{
  "Version": "2012-10-17",
  "Statement": [
    {{
      "Effect": "Allow",
      "Principal": "*",
      "Action": "sqs:SendMessage",
	  "Resource": "arn:aws:sqs:*:*:s3-event-notification-queue",
      "Condition": {{
        "ArnEquals": {{ "aws:SourceArn": "{arn}" }}
      }}
    }}
  ]
}}
"""))
bucket_notification = aws.s3.BucketNotification("bucketNotification",
    bucket=bucket.id,
    queues=[
        aws.s3.BucketNotificationQueueArgs(
            id="image-upload-event",
            queue_arn=queue.arn,
            events=["s3:ObjectCreated:*"],
            filter_prefix="images/",
        ),
        aws.s3.BucketNotificationQueueArgs(
            id="video-upload-event",
            queue_arn=queue.arn,
            events=["s3:ObjectCreated:*"],
            filter_prefix="videos/",
        ),
    ])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var bucket = new Aws.S3.BucketV2("bucket");

    var queue = new Aws.Sqs.Queue("queue", new()
    {
        Policy = bucket.Arn.Apply(arn => @$"{{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {{
      ""Effect"": ""Allow"",
      ""Principal"": ""*"",
      ""Action"": ""sqs:SendMessage"",
	  ""Resource"": ""arn:aws:sqs:*:*:s3-event-notification-queue"",
      ""Condition"": {{
        ""ArnEquals"": {{ ""aws:SourceArn"": ""{arn}"" }}
      }}
    }}
  ]
}}
"),
    });

    var bucketNotification = new Aws.S3.BucketNotification("bucketNotification", new()
    {
        Bucket = bucket.Id,
        Queues = new[]
        {
            new Aws.S3.Inputs.BucketNotificationQueueArgs
            {
                Id = "image-upload-event",
                QueueArn = queue.Arn,
                Events = new[]
                {
                    "s3:ObjectCreated:*",
                },
                FilterPrefix = "images/",
            },
            new Aws.S3.Inputs.BucketNotificationQueueArgs
            {
                Id = "video-upload-event",
                QueueArn = queue.Arn,
                Events = new[]
                {
                    "s3:ObjectCreated:*",
                },
                FilterPrefix = "videos/",
            },
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sqs"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		bucket, err := s3.NewBucketV2(ctx, "bucket", nil)
		if err != nil {
			return err
		}
		queue, err := sqs.NewQueue(ctx, "queue", &sqs.QueueArgs{
			Policy: bucket.Arn.ApplyT(func(arn string) (string, error) {
				return fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "sqs:SendMessage",
	  "Resource": "arn:aws:sqs:*:*:s3-event-notification-queue",
      "Condition": {
        "ArnEquals": { "aws:SourceArn": "%v" }
      }
    }
  ]
}
`, arn), nil
			}).(pulumi.StringOutput),
		})
		if err != nil {
			return err
		}
		_, err = s3.NewBucketNotification(ctx, "bucketNotification", &s3.BucketNotificationArgs{
			Bucket: bucket.ID(),
			Queues: s3.BucketNotificationQueueArray{
				&s3.BucketNotificationQueueArgs{
					Id:       pulumi.String("image-upload-event"),
					QueueArn: queue.Arn,
					Events: pulumi.StringArray{
						pulumi.String("s3:ObjectCreated:*"),
					},
					FilterPrefix: pulumi.String("images/"),
				},
				&s3.BucketNotificationQueueArgs{
					Id:       pulumi.String("video-upload-event"),
					QueueArn: queue.Arn,
					Events: pulumi.StringArray{
						pulumi.String("s3:ObjectCreated:*"),
					},
					FilterPrefix: pulumi.String("videos/"),
				},
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
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.sqs.Queue;
import com.pulumi.aws.sqs.QueueArgs;
import com.pulumi.aws.s3.BucketNotification;
import com.pulumi.aws.s3.BucketNotificationArgs;
import com.pulumi.aws.s3.inputs.BucketNotificationQueueArgs;
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
        var bucket = new BucketV2("bucket");

        var queue = new Queue("queue", QueueArgs.builder()        
            .policy(bucket.arn().applyValue(arn -> """
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "sqs:SendMessage",
	  "Resource": "arn:aws:sqs:*:*:s3-event-notification-queue",
      "Condition": {
        "ArnEquals": { "aws:SourceArn": "%s" }
      }
    }
  ]
}
", arn)))
            .build());

        var bucketNotification = new BucketNotification("bucketNotification", BucketNotificationArgs.builder()        
            .bucket(bucket.id())
            .queues(            
                BucketNotificationQueueArgs.builder()
                    .id("image-upload-event")
                    .queueArn(queue.arn())
                    .events("s3:ObjectCreated:*")
                    .filterPrefix("images/")
                    .build(),
                BucketNotificationQueueArgs.builder()
                    .id("video-upload-event")
                    .queueArn(queue.arn())
                    .events("s3:ObjectCreated:*")
                    .filterPrefix("videos/")
                    .build())
            .build());

    }
}
```
```yaml
resources:
  queue:
    type: aws:sqs:Queue
    properties:
      policy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": "*",
              "Action": "sqs:SendMessage",
        	  "Resource": "arn:aws:sqs:*:*:s3-event-notification-queue",
              "Condition": {
                "ArnEquals": { "aws:SourceArn": "${bucket.arn}" }
              }
            }
          ]
        }
  bucket:
    type: aws:s3:BucketV2
  bucketNotification:
    type: aws:s3:BucketNotification
    properties:
      bucket: ${bucket.id}
      queues:
        - id: image-upload-event
          queueArn: ${queue.arn}
          events:
            - s3:ObjectCreated:*
          filterPrefix: images/
        - id: video-upload-event
          queueArn: ${queue.arn}
          events:
            - s3:ObjectCreated:*
          filterPrefix: videos/
```
{{% /example %}}
{{% /examples %}}

## Import

S3 bucket notification can be imported using the `bucket`, e.g.,

```sh
 $ pulumi import aws:s3/bucketNotification:BucketNotification bucket_notification bucket-name
```

 
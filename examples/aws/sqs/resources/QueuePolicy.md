Allows you to set a policy of an SQS Queue
while referencing ARN of the queue within the policy.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const queue = new aws.sqs.Queue("queue", {});
const test = new aws.sqs.QueuePolicy("test", {
    queueUrl: queue.id,
    policy: pulumi.interpolate`{
  "Version": "2012-10-17",
  "Id": "sqspolicy",
  "Statement": [
    {
      "Sid": "First",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "sqs:SendMessage",
      "Resource": "${queue.arn}",
      "Condition": {
        "ArnEquals": {
          "aws:SourceArn": "${aws_sns_topic.example.arn}"
        }
      }
    }
  ]
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

queue = aws.sqs.Queue("queue")
test = aws.sqs.QueuePolicy("test",
    queue_url=queue.id,
    policy=queue.arn.apply(lambda arn: f"""{{
  "Version": "2012-10-17",
  "Id": "sqspolicy",
  "Statement": [
    {{
      "Sid": "First",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "sqs:SendMessage",
      "Resource": "{arn}",
      "Condition": {{
        "ArnEquals": {{
          "aws:SourceArn": "{aws_sns_topic["example"]["arn"]}"
        }}
      }}
    }}
  ]
}}
"""))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var queue = new Aws.Sqs.Queue("queue");

    var test = new Aws.Sqs.QueuePolicy("test", new()
    {
        QueueUrl = queue.Id,
        Policy = queue.Arn.Apply(arn => @$"{{
  ""Version"": ""2012-10-17"",
  ""Id"": ""sqspolicy"",
  ""Statement"": [
    {{
      ""Sid"": ""First"",
      ""Effect"": ""Allow"",
      ""Principal"": ""*"",
      ""Action"": ""sqs:SendMessage"",
      ""Resource"": ""{arn}"",
      ""Condition"": {{
        ""ArnEquals"": {{
          ""aws:SourceArn"": ""{aws_sns_topic.Example.Arn}""
        }}
      }}
    }}
  ]
}}
"),
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sqs"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		queue, err := sqs.NewQueue(ctx, "queue", nil)
		if err != nil {
			return err
		}
		_, err = sqs.NewQueuePolicy(ctx, "test", &sqs.QueuePolicyArgs{
			QueueUrl: queue.ID(),
			Policy: queue.Arn.ApplyT(func(arn string) (string, error) {
				return fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Id": "sqspolicy",
  "Statement": [
    {
      "Sid": "First",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "sqs:SendMessage",
      "Resource": "%v",
      "Condition": {
        "ArnEquals": {
          "aws:SourceArn": "%v"
        }
      }
    }
  ]
}
`, arn, aws_sns_topic.Example.Arn), nil
			}).(pulumi.StringOutput),
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
import com.pulumi.aws.sqs.QueuePolicy;
import com.pulumi.aws.sqs.QueuePolicyArgs;
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
        var queue = new Queue("queue");

        var test = new QueuePolicy("test", QueuePolicyArgs.builder()        
            .queueUrl(queue.id())
            .policy(queue.arn().applyValue(arn -> """
{
  "Version": "2012-10-17",
  "Id": "sqspolicy",
  "Statement": [
    {
      "Sid": "First",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "sqs:SendMessage",
      "Resource": "%s",
      "Condition": {
        "ArnEquals": {
          "aws:SourceArn": "%s"
        }
      }
    }
  ]
}
", arn,aws_sns_topic.example().arn())))
            .build());

    }
}
```
```yaml
resources:
  queue:
    type: aws:sqs:Queue
  test:
    type: aws:sqs:QueuePolicy
    properties:
      queueUrl: ${queue.id}
      policy: |
        {
          "Version": "2012-10-17",
          "Id": "sqspolicy",
          "Statement": [
            {
              "Sid": "First",
              "Effect": "Allow",
              "Principal": "*",
              "Action": "sqs:SendMessage",
              "Resource": "${queue.arn}",
              "Condition": {
                "ArnEquals": {
                  "aws:SourceArn": "${aws_sns_topic.example.arn}"
                }
              }
            }
          ]
        }
```
{{% /example %}}
{{% /examples %}}

## Import

SQS Queue Policies can be imported using the queue URL, e.g.,

```sh
 $ pulumi import aws:sqs/queuePolicy:QueuePolicy test https://queue.amazonaws.com/0123456789012/myqueue
```

 
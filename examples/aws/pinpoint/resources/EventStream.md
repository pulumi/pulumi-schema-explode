Provides a Pinpoint Event Stream resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const app = new aws.pinpoint.App("app", {});
const testStream = new aws.kinesis.Stream("testStream", {shardCount: 1});
const testRole = new aws.iam.Role("testRole", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "pinpoint.us-east-1.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
`});
const stream = new aws.pinpoint.EventStream("stream", {
    applicationId: app.applicationId,
    destinationStreamArn: testStream.arn,
    roleArn: testRole.arn,
});
const testRolePolicy = new aws.iam.RolePolicy("testRolePolicy", {
    role: testRole.id,
    policy: `{
  "Version": "2012-10-17",
  "Statement": {
    "Action": [
      "kinesis:PutRecords",
      "kinesis:DescribeStream"
    ],
    "Effect": "Allow",
    "Resource": [
      "arn:aws:kinesis:us-east-1:*:*/*"
    ]
  }
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

app = aws.pinpoint.App("app")
test_stream = aws.kinesis.Stream("testStream", shard_count=1)
test_role = aws.iam.Role("testRole", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "pinpoint.us-east-1.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
""")
stream = aws.pinpoint.EventStream("stream",
    application_id=app.application_id,
    destination_stream_arn=test_stream.arn,
    role_arn=test_role.arn)
test_role_policy = aws.iam.RolePolicy("testRolePolicy",
    role=test_role.id,
    policy="""{
  "Version": "2012-10-17",
  "Statement": {
    "Action": [
      "kinesis:PutRecords",
      "kinesis:DescribeStream"
    ],
    "Effect": "Allow",
    "Resource": [
      "arn:aws:kinesis:us-east-1:*:*/*"
    ]
  }
}
""")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var app = new Aws.Pinpoint.App("app");

    var testStream = new Aws.Kinesis.Stream("testStream", new()
    {
        ShardCount = 1,
    });

    var testRole = new Aws.Iam.Role("testRole", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Action"": ""sts:AssumeRole"",
      ""Principal"": {
        ""Service"": ""pinpoint.us-east-1.amazonaws.com""
      },
      ""Effect"": ""Allow"",
      ""Sid"": """"
    }
  ]
}
",
    });

    var stream = new Aws.Pinpoint.EventStream("stream", new()
    {
        ApplicationId = app.ApplicationId,
        DestinationStreamArn = testStream.Arn,
        RoleArn = testRole.Arn,
    });

    var testRolePolicy = new Aws.Iam.RolePolicy("testRolePolicy", new()
    {
        Role = testRole.Id,
        Policy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": {
    ""Action"": [
      ""kinesis:PutRecords"",
      ""kinesis:DescribeStream""
    ],
    ""Effect"": ""Allow"",
    ""Resource"": [
      ""arn:aws:kinesis:us-east-1:*:*/*""
    ]
  }
}
",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/kinesis"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/pinpoint"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		app, err := pinpoint.NewApp(ctx, "app", nil)
		if err != nil {
			return err
		}
		testStream, err := kinesis.NewStream(ctx, "testStream", &kinesis.StreamArgs{
			ShardCount: pulumi.Int(1),
		})
		if err != nil {
			return err
		}
		testRole, err := iam.NewRole(ctx, "testRole", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "pinpoint.us-east-1.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
`)),
		})
		if err != nil {
			return err
		}
		_, err = pinpoint.NewEventStream(ctx, "stream", &pinpoint.EventStreamArgs{
			ApplicationId:        app.ApplicationId,
			DestinationStreamArn: testStream.Arn,
			RoleArn:              testRole.Arn,
		})
		if err != nil {
			return err
		}
		_, err = iam.NewRolePolicy(ctx, "testRolePolicy", &iam.RolePolicyArgs{
			Role: testRole.ID(),
			Policy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": {
    "Action": [
      "kinesis:PutRecords",
      "kinesis:DescribeStream"
    ],
    "Effect": "Allow",
    "Resource": [
      "arn:aws:kinesis:us-east-1:*:*/*"
    ]
  }
}
`)),
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
import com.pulumi.aws.pinpoint.App;
import com.pulumi.aws.kinesis.Stream;
import com.pulumi.aws.kinesis.StreamArgs;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.pinpoint.EventStream;
import com.pulumi.aws.pinpoint.EventStreamArgs;
import com.pulumi.aws.iam.RolePolicy;
import com.pulumi.aws.iam.RolePolicyArgs;
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
        var app = new App("app");

        var testStream = new Stream("testStream", StreamArgs.builder()        
            .shardCount(1)
            .build());

        var testRole = new Role("testRole", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "pinpoint.us-east-1.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
            """)
            .build());

        var stream = new EventStream("stream", EventStreamArgs.builder()        
            .applicationId(app.applicationId())
            .destinationStreamArn(testStream.arn())
            .roleArn(testRole.arn())
            .build());

        var testRolePolicy = new RolePolicy("testRolePolicy", RolePolicyArgs.builder()        
            .role(testRole.id())
            .policy("""
{
  "Version": "2012-10-17",
  "Statement": {
    "Action": [
      "kinesis:PutRecords",
      "kinesis:DescribeStream"
    ],
    "Effect": "Allow",
    "Resource": [
      "arn:aws:kinesis:us-east-1:*:*/*"
    ]
  }
}
            """)
            .build());

    }
}
```
```yaml
resources:
  stream:
    type: aws:pinpoint:EventStream
    properties:
      applicationId: ${app.applicationId}
      destinationStreamArn: ${testStream.arn}
      roleArn: ${testRole.arn}
  app:
    type: aws:pinpoint:App
  testStream:
    type: aws:kinesis:Stream
    properties:
      shardCount: 1
  testRole:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Principal": {
                "Service": "pinpoint.us-east-1.amazonaws.com"
              },
              "Effect": "Allow",
              "Sid": ""
            }
          ]
        }
  testRolePolicy:
    type: aws:iam:RolePolicy
    properties:
      role: ${testRole.id}
      policy: |
        {
          "Version": "2012-10-17",
          "Statement": {
            "Action": [
              "kinesis:PutRecords",
              "kinesis:DescribeStream"
            ],
            "Effect": "Allow",
            "Resource": [
              "arn:aws:kinesis:us-east-1:*:*/*"
            ]
          }
        }
```
{{% /example %}}
{{% /examples %}}

## Import

Pinpoint Event Stream can be imported using the `application-id`, e.g.,

```sh
 $ pulumi import aws:pinpoint/eventStream:EventStream stream application-id
```

 
Provides a CloudFront real-time log configuration resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleRole = new aws.iam.Role("exampleRole", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
`});
const exampleRolePolicy = new aws.iam.RolePolicy("exampleRolePolicy", {
    role: exampleRole.id,
    policy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
        "Effect": "Allow",
        "Action": [
          "kinesis:DescribeStreamSummary",
          "kinesis:DescribeStream",
          "kinesis:PutRecord",
          "kinesis:PutRecords"
        ],
        "Resource": "${aws_kinesis_stream.example.arn}"
    }
  ]
}
`,
});
const exampleRealtimeLogConfig = new aws.cloudfront.RealtimeLogConfig("exampleRealtimeLogConfig", {
    samplingRate: 75,
    fields: [
        "timestamp",
        "c-ip",
    ],
    endpoint: {
        streamType: "Kinesis",
        kinesisStreamConfig: {
            roleArn: exampleRole.arn,
            streamArn: aws_kinesis_stream.example.arn,
        },
    },
}, {
    dependsOn: [exampleRolePolicy],
});
```
```python
import pulumi
import pulumi_aws as aws

example_role = aws.iam.Role("exampleRole", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
""")
example_role_policy = aws.iam.RolePolicy("exampleRolePolicy",
    role=example_role.id,
    policy=f"""{{
  "Version": "2012-10-17",
  "Statement": [
    {{
        "Effect": "Allow",
        "Action": [
          "kinesis:DescribeStreamSummary",
          "kinesis:DescribeStream",
          "kinesis:PutRecord",
          "kinesis:PutRecords"
        ],
        "Resource": "{aws_kinesis_stream["example"]["arn"]}"
    }}
  ]
}}
""")
example_realtime_log_config = aws.cloudfront.RealtimeLogConfig("exampleRealtimeLogConfig",
    sampling_rate=75,
    fields=[
        "timestamp",
        "c-ip",
    ],
    endpoint=aws.cloudfront.RealtimeLogConfigEndpointArgs(
        stream_type="Kinesis",
        kinesis_stream_config=aws.cloudfront.RealtimeLogConfigEndpointKinesisStreamConfigArgs(
            role_arn=example_role.arn,
            stream_arn=aws_kinesis_stream["example"]["arn"],
        ),
    ),
    opts=pulumi.ResourceOptions(depends_on=[example_role_policy]))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleRole = new Aws.Iam.Role("exampleRole", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Action"": ""sts:AssumeRole"",
      ""Principal"": {
        ""Service"": ""cloudfront.amazonaws.com""
      },
      ""Effect"": ""Allow""
    }
  ]
}
",
    });

    var exampleRolePolicy = new Aws.Iam.RolePolicy("exampleRolePolicy", new()
    {
        Role = exampleRole.Id,
        Policy = @$"{{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {{
        ""Effect"": ""Allow"",
        ""Action"": [
          ""kinesis:DescribeStreamSummary"",
          ""kinesis:DescribeStream"",
          ""kinesis:PutRecord"",
          ""kinesis:PutRecords""
        ],
        ""Resource"": ""{aws_kinesis_stream.Example.Arn}""
    }}
  ]
}}
",
    });

    var exampleRealtimeLogConfig = new Aws.CloudFront.RealtimeLogConfig("exampleRealtimeLogConfig", new()
    {
        SamplingRate = 75,
        Fields = new[]
        {
            "timestamp",
            "c-ip",
        },
        Endpoint = new Aws.CloudFront.Inputs.RealtimeLogConfigEndpointArgs
        {
            StreamType = "Kinesis",
            KinesisStreamConfig = new Aws.CloudFront.Inputs.RealtimeLogConfigEndpointKinesisStreamConfigArgs
            {
                RoleArn = exampleRole.Arn,
                StreamArn = aws_kinesis_stream.Example.Arn,
            },
        },
    }, new CustomResourceOptions
    {
        DependsOn = new[]
        {
            exampleRolePolicy,
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudfront"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleRole, err := iam.NewRole(ctx, "exampleRole", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
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
		exampleRolePolicy, err := iam.NewRolePolicy(ctx, "exampleRolePolicy", &iam.RolePolicyArgs{
			Role: exampleRole.ID(),
			Policy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
        "Effect": "Allow",
        "Action": [
          "kinesis:DescribeStreamSummary",
          "kinesis:DescribeStream",
          "kinesis:PutRecord",
          "kinesis:PutRecords"
        ],
        "Resource": "%v"
    }
  ]
}
`, aws_kinesis_stream.Example.Arn)),
		})
		if err != nil {
			return err
		}
		_, err = cloudfront.NewRealtimeLogConfig(ctx, "exampleRealtimeLogConfig", &cloudfront.RealtimeLogConfigArgs{
			SamplingRate: pulumi.Int(75),
			Fields: pulumi.StringArray{
				pulumi.String("timestamp"),
				pulumi.String("c-ip"),
			},
			Endpoint: &cloudfront.RealtimeLogConfigEndpointArgs{
				StreamType: pulumi.String("Kinesis"),
				KinesisStreamConfig: &cloudfront.RealtimeLogConfigEndpointKinesisStreamConfigArgs{
					RoleArn:   exampleRole.Arn,
					StreamArn: pulumi.Any(aws_kinesis_stream.Example.Arn),
				},
			},
		}, pulumi.DependsOn([]pulumi.Resource{
			exampleRolePolicy,
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
import com.pulumi.aws.iam.RolePolicy;
import com.pulumi.aws.iam.RolePolicyArgs;
import com.pulumi.aws.cloudfront.RealtimeLogConfig;
import com.pulumi.aws.cloudfront.RealtimeLogConfigArgs;
import com.pulumi.aws.cloudfront.inputs.RealtimeLogConfigEndpointArgs;
import com.pulumi.aws.cloudfront.inputs.RealtimeLogConfigEndpointKinesisStreamConfigArgs;
import com.pulumi.resources.CustomResourceOptions;
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
        var exampleRole = new Role("exampleRole", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
            """)
            .build());

        var exampleRolePolicy = new RolePolicy("exampleRolePolicy", RolePolicyArgs.builder()        
            .role(exampleRole.id())
            .policy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
        "Effect": "Allow",
        "Action": [
          "kinesis:DescribeStreamSummary",
          "kinesis:DescribeStream",
          "kinesis:PutRecord",
          "kinesis:PutRecords"
        ],
        "Resource": "%s"
    }
  ]
}
", aws_kinesis_stream.example().arn()))
            .build());

        var exampleRealtimeLogConfig = new RealtimeLogConfig("exampleRealtimeLogConfig", RealtimeLogConfigArgs.builder()        
            .samplingRate(75)
            .fields(            
                "timestamp",
                "c-ip")
            .endpoint(RealtimeLogConfigEndpointArgs.builder()
                .streamType("Kinesis")
                .kinesisStreamConfig(RealtimeLogConfigEndpointKinesisStreamConfigArgs.builder()
                    .roleArn(exampleRole.arn())
                    .streamArn(aws_kinesis_stream.example().arn())
                    .build())
                .build())
            .build(), CustomResourceOptions.builder()
                .dependsOn(exampleRolePolicy)
                .build());

    }
}
```
```yaml
resources:
  exampleRole:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Principal": {
                "Service": "cloudfront.amazonaws.com"
              },
              "Effect": "Allow"
            }
          ]
        }
  exampleRolePolicy:
    type: aws:iam:RolePolicy
    properties:
      role: ${exampleRole.id}
      policy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                  "kinesis:DescribeStreamSummary",
                  "kinesis:DescribeStream",
                  "kinesis:PutRecord",
                  "kinesis:PutRecords"
                ],
                "Resource": "${aws_kinesis_stream.example.arn}"
            }
          ]
        }
  exampleRealtimeLogConfig:
    type: aws:cloudfront:RealtimeLogConfig
    properties:
      samplingRate: 75
      fields:
        - timestamp
        - c-ip
      endpoint:
        streamType: Kinesis
        kinesisStreamConfig:
          roleArn: ${exampleRole.arn}
          streamArn: ${aws_kinesis_stream.example.arn}
    options:
      dependson:
        - ${exampleRolePolicy}
```
{{% /example %}}
{{% /examples %}}

## Import

CloudFront real-time log configurations can be imported using the ARN, e.g.,

```sh
 $ pulumi import aws:cloudfront/realtimeLogConfig:RealtimeLogConfig example arn:aws:cloudfront::111122223333:realtime-log-config/ExampleNameForRealtimeLogConfig
```

 
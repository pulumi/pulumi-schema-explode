Provides a VPC/Subnet/ENI/Transit Gateway/Transit Gateway Attachment Flow Log to capture IP traffic for a specific network
interface, subnet, or VPC. Logs are sent to a CloudWatch Log Group or a S3 Bucket.

{{% examples %}}
## Example Usage
{{% example %}}
### CloudWatch Logging

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleLogGroup = new aws.cloudwatch.LogGroup("exampleLogGroup", {});
const exampleRole = new aws.iam.Role("exampleRole", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "vpc-flow-logs.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
`});
const exampleFlowLog = new aws.ec2.FlowLog("exampleFlowLog", {
    iamRoleArn: exampleRole.arn,
    logDestination: exampleLogGroup.arn,
    trafficType: "ALL",
    vpcId: aws_vpc.example.id,
});
const exampleRolePolicy = new aws.iam.RolePolicy("exampleRolePolicy", {
    role: exampleRole.id,
    policy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

example_log_group = aws.cloudwatch.LogGroup("exampleLogGroup")
example_role = aws.iam.Role("exampleRole", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "vpc-flow-logs.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
""")
example_flow_log = aws.ec2.FlowLog("exampleFlowLog",
    iam_role_arn=example_role.arn,
    log_destination=example_log_group.arn,
    traffic_type="ALL",
    vpc_id=aws_vpc["example"]["id"])
example_role_policy = aws.iam.RolePolicy("exampleRolePolicy",
    role=example_role.id,
    policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
""")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleLogGroup = new Aws.CloudWatch.LogGroup("exampleLogGroup");

    var exampleRole = new Aws.Iam.Role("exampleRole", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Sid"": """",
      ""Effect"": ""Allow"",
      ""Principal"": {
        ""Service"": ""vpc-flow-logs.amazonaws.com""
      },
      ""Action"": ""sts:AssumeRole""
    }
  ]
}
",
    });

    var exampleFlowLog = new Aws.Ec2.FlowLog("exampleFlowLog", new()
    {
        IamRoleArn = exampleRole.Arn,
        LogDestination = exampleLogGroup.Arn,
        TrafficType = "ALL",
        VpcId = aws_vpc.Example.Id,
    });

    var exampleRolePolicy = new Aws.Iam.RolePolicy("exampleRolePolicy", new()
    {
        Role = exampleRole.Id,
        Policy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Action"": [
        ""logs:CreateLogGroup"",
        ""logs:CreateLogStream"",
        ""logs:PutLogEvents"",
        ""logs:DescribeLogGroups"",
        ""logs:DescribeLogStreams""
      ],
      ""Effect"": ""Allow"",
      ""Resource"": ""*""
    }
  ]
}
",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudwatch"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ec2"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleLogGroup, err := cloudwatch.NewLogGroup(ctx, "exampleLogGroup", nil)
		if err != nil {
			return err
		}
		exampleRole, err := iam.NewRole(ctx, "exampleRole", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "vpc-flow-logs.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
`)),
		})
		if err != nil {
			return err
		}
		_, err = ec2.NewFlowLog(ctx, "exampleFlowLog", &ec2.FlowLogArgs{
			IamRoleArn:     exampleRole.Arn,
			LogDestination: exampleLogGroup.Arn,
			TrafficType:    pulumi.String("ALL"),
			VpcId:          pulumi.Any(aws_vpc.Example.Id),
		})
		if err != nil {
			return err
		}
		_, err = iam.NewRolePolicy(ctx, "exampleRolePolicy", &iam.RolePolicyArgs{
			Role: exampleRole.ID(),
			Policy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
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
import com.pulumi.aws.cloudwatch.LogGroup;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.ec2.FlowLog;
import com.pulumi.aws.ec2.FlowLogArgs;
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
        var exampleLogGroup = new LogGroup("exampleLogGroup");

        var exampleRole = new Role("exampleRole", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "vpc-flow-logs.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
            """)
            .build());

        var exampleFlowLog = new FlowLog("exampleFlowLog", FlowLogArgs.builder()        
            .iamRoleArn(exampleRole.arn())
            .logDestination(exampleLogGroup.arn())
            .trafficType("ALL")
            .vpcId(aws_vpc.example().id())
            .build());

        var exampleRolePolicy = new RolePolicy("exampleRolePolicy", RolePolicyArgs.builder()        
            .role(exampleRole.id())
            .policy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
            """)
            .build());

    }
}
```
```yaml
resources:
  exampleFlowLog:
    type: aws:ec2:FlowLog
    properties:
      iamRoleArn: ${exampleRole.arn}
      logDestination: ${exampleLogGroup.arn}
      trafficType: ALL
      vpcId: ${aws_vpc.example.id}
  exampleLogGroup:
    type: aws:cloudwatch:LogGroup
  exampleRole:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Sid": "",
              "Effect": "Allow",
              "Principal": {
                "Service": "vpc-flow-logs.amazonaws.com"
              },
              "Action": "sts:AssumeRole"
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
              "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents",
                "logs:DescribeLogGroups",
                "logs:DescribeLogStreams"
              ],
              "Effect": "Allow",
              "Resource": "*"
            }
          ]
        }
```
{{% /example %}}
{{% example %}}
### S3 Logging

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleBucketV2 = new aws.s3.BucketV2("exampleBucketV2", {});
const exampleFlowLog = new aws.ec2.FlowLog("exampleFlowLog", {
    logDestination: exampleBucketV2.arn,
    logDestinationType: "s3",
    trafficType: "ALL",
    vpcId: aws_vpc.example.id,
});
```
```python
import pulumi
import pulumi_aws as aws

example_bucket_v2 = aws.s3.BucketV2("exampleBucketV2")
example_flow_log = aws.ec2.FlowLog("exampleFlowLog",
    log_destination=example_bucket_v2.arn,
    log_destination_type="s3",
    traffic_type="ALL",
    vpc_id=aws_vpc["example"]["id"])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleBucketV2 = new Aws.S3.BucketV2("exampleBucketV2");

    var exampleFlowLog = new Aws.Ec2.FlowLog("exampleFlowLog", new()
    {
        LogDestination = exampleBucketV2.Arn,
        LogDestinationType = "s3",
        TrafficType = "ALL",
        VpcId = aws_vpc.Example.Id,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ec2"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleBucketV2, err := s3.NewBucketV2(ctx, "exampleBucketV2", nil)
		if err != nil {
			return err
		}
		_, err = ec2.NewFlowLog(ctx, "exampleFlowLog", &ec2.FlowLogArgs{
			LogDestination:     exampleBucketV2.Arn,
			LogDestinationType: pulumi.String("s3"),
			TrafficType:        pulumi.String("ALL"),
			VpcId:              pulumi.Any(aws_vpc.Example.Id),
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
import com.pulumi.aws.ec2.FlowLog;
import com.pulumi.aws.ec2.FlowLogArgs;
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
        var exampleBucketV2 = new BucketV2("exampleBucketV2");

        var exampleFlowLog = new FlowLog("exampleFlowLog", FlowLogArgs.builder()        
            .logDestination(exampleBucketV2.arn())
            .logDestinationType("s3")
            .trafficType("ALL")
            .vpcId(aws_vpc.example().id())
            .build());

    }
}
```
```yaml
resources:
  exampleFlowLog:
    type: aws:ec2:FlowLog
    properties:
      logDestination: ${exampleBucketV2.arn}
      logDestinationType: s3
      trafficType: ALL
      vpcId: ${aws_vpc.example.id}
  exampleBucketV2:
    type: aws:s3:BucketV2
```
{{% /example %}}
{{% example %}}
### S3 Logging in Apache Parquet format with per-hour partitions

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleBucketV2 = new aws.s3.BucketV2("exampleBucketV2", {});
const exampleFlowLog = new aws.ec2.FlowLog("exampleFlowLog", {
    logDestination: exampleBucketV2.arn,
    logDestinationType: "s3",
    trafficType: "ALL",
    vpcId: aws_vpc.example.id,
    destinationOptions: {
        fileFormat: "parquet",
        perHourPartition: true,
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example_bucket_v2 = aws.s3.BucketV2("exampleBucketV2")
example_flow_log = aws.ec2.FlowLog("exampleFlowLog",
    log_destination=example_bucket_v2.arn,
    log_destination_type="s3",
    traffic_type="ALL",
    vpc_id=aws_vpc["example"]["id"],
    destination_options=aws.ec2.FlowLogDestinationOptionsArgs(
        file_format="parquet",
        per_hour_partition=True,
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleBucketV2 = new Aws.S3.BucketV2("exampleBucketV2");

    var exampleFlowLog = new Aws.Ec2.FlowLog("exampleFlowLog", new()
    {
        LogDestination = exampleBucketV2.Arn,
        LogDestinationType = "s3",
        TrafficType = "ALL",
        VpcId = aws_vpc.Example.Id,
        DestinationOptions = new Aws.Ec2.Inputs.FlowLogDestinationOptionsArgs
        {
            FileFormat = "parquet",
            PerHourPartition = true,
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ec2"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleBucketV2, err := s3.NewBucketV2(ctx, "exampleBucketV2", nil)
		if err != nil {
			return err
		}
		_, err = ec2.NewFlowLog(ctx, "exampleFlowLog", &ec2.FlowLogArgs{
			LogDestination:     exampleBucketV2.Arn,
			LogDestinationType: pulumi.String("s3"),
			TrafficType:        pulumi.String("ALL"),
			VpcId:              pulumi.Any(aws_vpc.Example.Id),
			DestinationOptions: &ec2.FlowLogDestinationOptionsArgs{
				FileFormat:       pulumi.String("parquet"),
				PerHourPartition: pulumi.Bool(true),
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
import com.pulumi.aws.ec2.FlowLog;
import com.pulumi.aws.ec2.FlowLogArgs;
import com.pulumi.aws.ec2.inputs.FlowLogDestinationOptionsArgs;
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
        var exampleBucketV2 = new BucketV2("exampleBucketV2");

        var exampleFlowLog = new FlowLog("exampleFlowLog", FlowLogArgs.builder()        
            .logDestination(exampleBucketV2.arn())
            .logDestinationType("s3")
            .trafficType("ALL")
            .vpcId(aws_vpc.example().id())
            .destinationOptions(FlowLogDestinationOptionsArgs.builder()
                .fileFormat("parquet")
                .perHourPartition(true)
                .build())
            .build());

    }
}
```
```yaml
resources:
  exampleFlowLog:
    type: aws:ec2:FlowLog
    properties:
      logDestination: ${exampleBucketV2.arn}
      logDestinationType: s3
      trafficType: ALL
      vpcId: ${aws_vpc.example.id}
      destinationOptions:
        fileFormat: parquet
        perHourPartition: true
  exampleBucketV2:
    type: aws:s3:BucketV2
```
{{% /example %}}
{{% /examples %}}

## Import

Flow Logs can be imported using the `id`, e.g.,

```sh
 $ pulumi import aws:ec2/flowLog:FlowLog test_flow_log fl-1a2b3c4d
```

 
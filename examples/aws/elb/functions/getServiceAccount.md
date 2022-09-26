Use this data source to get the Account ID of the [AWS Elastic Load Balancing Service Account](http://docs.aws.amazon.com/elasticloadbalancing/latest/classic/enable-access-logs.html#attach-bucket-policy)
in a given region for the purpose of permitting in S3 bucket policy.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const main = aws.elb.getServiceAccount({});
const elbLogs = new aws.s3.BucketV2("elbLogs", {});
const elbLogsAcl = new aws.s3.BucketAclV2("elbLogsAcl", {
    bucket: elbLogs.id,
    acl: "private",
});
const allowElbLogging = new aws.s3.BucketPolicy("allowElbLogging", {
    bucket: elbLogs.id,
    policy: main.then(main => `{
  "Id": "Policy",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:PutObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::my-elb-tf-test-bucket/AWSLogs/*",
      "Principal": {
        "AWS": [
          "${main.arn}"
        ]
      }
    }
  ]
}
`),
});
const bar = new aws.elb.LoadBalancer("bar", {
    availabilityZones: ["us-west-2a"],
    accessLogs: {
        bucket: elbLogs.bucket,
        interval: 5,
    },
    listeners: [{
        instancePort: 8000,
        instanceProtocol: "http",
        lbPort: 80,
        lbProtocol: "http",
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

main = aws.elb.get_service_account()
elb_logs = aws.s3.BucketV2("elbLogs")
elb_logs_acl = aws.s3.BucketAclV2("elbLogsAcl",
    bucket=elb_logs.id,
    acl="private")
allow_elb_logging = aws.s3.BucketPolicy("allowElbLogging",
    bucket=elb_logs.id,
    policy=f"""{{
  "Id": "Policy",
  "Version": "2012-10-17",
  "Statement": [
    {{
      "Action": [
        "s3:PutObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::my-elb-tf-test-bucket/AWSLogs/*",
      "Principal": {{
        "AWS": [
          "{main.arn}"
        ]
      }}
    }}
  ]
}}
""")
bar = aws.elb.LoadBalancer("bar",
    availability_zones=["us-west-2a"],
    access_logs=aws.elb.LoadBalancerAccessLogsArgs(
        bucket=elb_logs.bucket,
        interval=5,
    ),
    listeners=[aws.elb.LoadBalancerListenerArgs(
        instance_port=8000,
        instance_protocol="http",
        lb_port=80,
        lb_protocol="http",
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var main = Aws.Elb.GetServiceAccount.Invoke();

    var elbLogs = new Aws.S3.BucketV2("elbLogs");

    var elbLogsAcl = new Aws.S3.BucketAclV2("elbLogsAcl", new()
    {
        Bucket = elbLogs.Id,
        Acl = "private",
    });

    var allowElbLogging = new Aws.S3.BucketPolicy("allowElbLogging", new()
    {
        Bucket = elbLogs.Id,
        Policy = @$"{{
  ""Id"": ""Policy"",
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {{
      ""Action"": [
        ""s3:PutObject""
      ],
      ""Effect"": ""Allow"",
      ""Resource"": ""arn:aws:s3:::my-elb-tf-test-bucket/AWSLogs/*"",
      ""Principal"": {{
        ""AWS"": [
          ""{main.Apply(getServiceAccountResult => getServiceAccountResult.Arn)}""
        ]
      }}
    }}
  ]
}}
",
    });

    var bar = new Aws.Elb.LoadBalancer("bar", new()
    {
        AvailabilityZones = new[]
        {
            "us-west-2a",
        },
        AccessLogs = new Aws.Elb.Inputs.LoadBalancerAccessLogsArgs
        {
            Bucket = elbLogs.Bucket,
            Interval = 5,
        },
        Listeners = new[]
        {
            new Aws.Elb.Inputs.LoadBalancerListenerArgs
            {
                InstancePort = 8000,
                InstanceProtocol = "http",
                LbPort = 80,
                LbProtocol = "http",
            },
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/elb"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		main, err := elb.GetServiceAccount(ctx, nil, nil)
		if err != nil {
			return err
		}
		elbLogs, err := s3.NewBucketV2(ctx, "elbLogs", nil)
		if err != nil {
			return err
		}
		_, err = s3.NewBucketAclV2(ctx, "elbLogsAcl", &s3.BucketAclV2Args{
			Bucket: elbLogs.ID(),
			Acl:    pulumi.String("private"),
		})
		if err != nil {
			return err
		}
		_, err = s3.NewBucketPolicy(ctx, "allowElbLogging", &s3.BucketPolicyArgs{
			Bucket: elbLogs.ID(),
			Policy: pulumi.Any(fmt.Sprintf(`{
  "Id": "Policy",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:PutObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::my-elb-tf-test-bucket/AWSLogs/*",
      "Principal": {
        "AWS": [
          "%v"
        ]
      }
    }
  ]
}
`, main.Arn)),
		})
		if err != nil {
			return err
		}
		_, err = elb.NewLoadBalancer(ctx, "bar", &elb.LoadBalancerArgs{
			AvailabilityZones: pulumi.StringArray{
				pulumi.String("us-west-2a"),
			},
			AccessLogs: &elb.LoadBalancerAccessLogsArgs{
				Bucket:   elbLogs.Bucket,
				Interval: pulumi.Int(5),
			},
			Listeners: elb.LoadBalancerListenerArray{
				&elb.LoadBalancerListenerArgs{
					InstancePort:     pulumi.Int(8000),
					InstanceProtocol: pulumi.String("http"),
					LbPort:           pulumi.Int(80),
					LbProtocol:       pulumi.String("http"),
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
import com.pulumi.aws.elb.ElbFunctions;
import com.pulumi.aws.cloudtrail.inputs.GetServiceAccountArgs;
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.s3.BucketAclV2;
import com.pulumi.aws.s3.BucketAclV2Args;
import com.pulumi.aws.s3.BucketPolicy;
import com.pulumi.aws.s3.BucketPolicyArgs;
import com.pulumi.aws.elb.LoadBalancer;
import com.pulumi.aws.elb.LoadBalancerArgs;
import com.pulumi.aws.elb.inputs.LoadBalancerAccessLogsArgs;
import com.pulumi.aws.elb.inputs.LoadBalancerListenerArgs;
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
        final var main = ElbFunctions.getServiceAccount();

        var elbLogs = new BucketV2("elbLogs");

        var elbLogsAcl = new BucketAclV2("elbLogsAcl", BucketAclV2Args.builder()        
            .bucket(elbLogs.id())
            .acl("private")
            .build());

        var allowElbLogging = new BucketPolicy("allowElbLogging", BucketPolicyArgs.builder()        
            .bucket(elbLogs.id())
            .policy("""
{
  "Id": "Policy",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:PutObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::my-elb-tf-test-bucket/AWSLogs/*",
      "Principal": {
        "AWS": [
          "%s"
        ]
      }
    }
  ]
}
", main.applyValue(getServiceAccountResult -> getServiceAccountResult.arn())))
            .build());

        var bar = new LoadBalancer("bar", LoadBalancerArgs.builder()        
            .availabilityZones("us-west-2a")
            .accessLogs(LoadBalancerAccessLogsArgs.builder()
                .bucket(elbLogs.bucket())
                .interval(5)
                .build())
            .listeners(LoadBalancerListenerArgs.builder()
                .instancePort(8000)
                .instanceProtocol("http")
                .lbPort(80)
                .lbProtocol("http")
                .build())
            .build());

    }
}
```
```yaml
resources:
  elbLogs:
    type: aws:s3:BucketV2
  elbLogsAcl:
    type: aws:s3:BucketAclV2
    properties:
      bucket: ${elbLogs.id}
      acl: private
  allowElbLogging:
    type: aws:s3:BucketPolicy
    properties:
      bucket: ${elbLogs.id}
      policy: |
        {
          "Id": "Policy",
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": [
                "s3:PutObject"
              ],
              "Effect": "Allow",
              "Resource": "arn:aws:s3:::my-elb-tf-test-bucket/AWSLogs/*",
              "Principal": {
                "AWS": [
                  "${main.arn}"
                ]
              }
            }
          ]
        }
  bar:
    type: aws:elb:LoadBalancer
    properties:
      availabilityZones:
        - us-west-2a
      accessLogs:
        bucket: ${elbLogs.bucket}
        interval: 5
      listeners:
        - instancePort: 8000
          instanceProtocol: http
          lbPort: 80
          lbProtocol: http
variables:
  main:
    Fn::Invoke:
      Function: aws:elb:getServiceAccount
      Arguments: {}
```
{{% /example %}}
{{% /examples %}}
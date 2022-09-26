Provides an AWS Config Delivery Channel.

> **Note:** Delivery Channel requires a `Configuration Recorder` to be present. Use of `depends_on` (as shown below) is recommended to avoid race conditions.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bucketV2 = new aws.s3.BucketV2("bucketV2", {forceDestroy: true});
const role = new aws.iam.Role("role", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "config.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
`});
const fooRecorder = new aws.cfg.Recorder("fooRecorder", {roleArn: role.arn});
const fooDeliveryChannel = new aws.cfg.DeliveryChannel("fooDeliveryChannel", {s3BucketName: bucketV2.bucket}, {
    dependsOn: [fooRecorder],
});
const rolePolicy = new aws.iam.RolePolicy("rolePolicy", {
    role: role.id,
    policy: pulumi.interpolate`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:*"
      ],
      "Effect": "Allow",
      "Resource": [
        "${bucketV2.arn}",
        "${bucketV2.arn}/*"
      ]
    }
  ]
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

bucket_v2 = aws.s3.BucketV2("bucketV2", force_destroy=True)
role = aws.iam.Role("role", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "config.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
""")
foo_recorder = aws.cfg.Recorder("fooRecorder", role_arn=role.arn)
foo_delivery_channel = aws.cfg.DeliveryChannel("fooDeliveryChannel", s3_bucket_name=bucket_v2.bucket,
opts=pulumi.ResourceOptions(depends_on=[foo_recorder]))
role_policy = aws.iam.RolePolicy("rolePolicy",
    role=role.id,
    policy=pulumi.Output.all(bucket_v2.arn, bucket_v2.arn).apply(lambda bucketV2Arn, bucketV2Arn1: f"""{{
  "Version": "2012-10-17",
  "Statement": [
    {{
      "Action": [
        "s3:*"
      ],
      "Effect": "Allow",
      "Resource": [
        "{bucket_v2_arn}",
        "{bucket_v2_arn1}/*"
      ]
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
    var bucketV2 = new Aws.S3.BucketV2("bucketV2", new()
    {
        ForceDestroy = true,
    });

    var role = new Aws.Iam.Role("role", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Action"": ""sts:AssumeRole"",
      ""Principal"": {
        ""Service"": ""config.amazonaws.com""
      },
      ""Effect"": ""Allow"",
      ""Sid"": """"
    }
  ]
}
",
    });

    var fooRecorder = new Aws.Cfg.Recorder("fooRecorder", new()
    {
        RoleArn = role.Arn,
    });

    var fooDeliveryChannel = new Aws.Cfg.DeliveryChannel("fooDeliveryChannel", new()
    {
        S3BucketName = bucketV2.Bucket,
    }, new CustomResourceOptions
    {
        DependsOn = new[]
        {
            fooRecorder,
        },
    });

    var rolePolicy = new Aws.Iam.RolePolicy("rolePolicy", new()
    {
        Role = role.Id,
        Policy = Output.Tuple(bucketV2.Arn, bucketV2.Arn).Apply(values =>
        {
            var bucketV2Arn = values.Item1;
            var bucketV2Arn1 = values.Item2;
            return @$"{{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {{
      ""Action"": [
        ""s3:*""
      ],
      ""Effect"": ""Allow"",
      ""Resource"": [
        ""{bucketV2Arn}"",
        ""{bucketV2Arn1}/*""
      ]
    }}
  ]
}}
";
        }),
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cfg"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		bucketV2, err := s3.NewBucketV2(ctx, "bucketV2", &s3.BucketV2Args{
			ForceDestroy: pulumi.Bool(true),
		})
		if err != nil {
			return err
		}
		role, err := iam.NewRole(ctx, "role", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "config.amazonaws.com"
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
		fooRecorder, err := cfg.NewRecorder(ctx, "fooRecorder", &cfg.RecorderArgs{
			RoleArn: role.Arn,
		})
		if err != nil {
			return err
		}
		_, err = cfg.NewDeliveryChannel(ctx, "fooDeliveryChannel", &cfg.DeliveryChannelArgs{
			S3BucketName: bucketV2.Bucket,
		}, pulumi.DependsOn([]pulumi.Resource{
			fooRecorder,
		}))
		if err != nil {
			return err
		}
		_, err = iam.NewRolePolicy(ctx, "rolePolicy", &iam.RolePolicyArgs{
			Role: role.ID(),
			Policy: pulumi.All(bucketV2.Arn, bucketV2.Arn).ApplyT(func(_args []interface{}) (string, error) {
				bucketV2Arn := _args[0].(string)
				bucketV2Arn1 := _args[1].(string)
				return fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:*"
      ],
      "Effect": "Allow",
      "Resource": [
        "%v",
        "%v/*"
      ]
    }
  ]
}
`, bucketV2Arn, bucketV2Arn1), nil
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
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.s3.BucketV2Args;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.cfg.Recorder;
import com.pulumi.aws.cfg.RecorderArgs;
import com.pulumi.aws.cfg.DeliveryChannel;
import com.pulumi.aws.cfg.DeliveryChannelArgs;
import com.pulumi.aws.iam.RolePolicy;
import com.pulumi.aws.iam.RolePolicyArgs;
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
        var bucketV2 = new BucketV2("bucketV2", BucketV2Args.builder()        
            .forceDestroy(true)
            .build());

        var role = new Role("role", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "config.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
            """)
            .build());

        var fooRecorder = new Recorder("fooRecorder", RecorderArgs.builder()        
            .roleArn(role.arn())
            .build());

        var fooDeliveryChannel = new DeliveryChannel("fooDeliveryChannel", DeliveryChannelArgs.builder()        
            .s3BucketName(bucketV2.bucket())
            .build(), CustomResourceOptions.builder()
                .dependsOn(fooRecorder)
                .build());

        var rolePolicy = new RolePolicy("rolePolicy", RolePolicyArgs.builder()        
            .role(role.id())
            .policy(Output.tuple(bucketV2.arn(), bucketV2.arn()).applyValue(values -> {
                var bucketV2Arn = values.t1;
                var bucketV2Arn1 = values.t2;
                return """
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:*"
      ],
      "Effect": "Allow",
      "Resource": [
        "%s",
        "%s/*"
      ]
    }
  ]
}
", bucketV2Arn,bucketV2Arn1);
            }))
            .build());

    }
}
```
```yaml
resources:
  fooDeliveryChannel:
    type: aws:cfg:DeliveryChannel
    properties:
      s3BucketName: ${bucketV2.bucket}
    options:
      dependson:
        - ${fooRecorder}
  bucketV2:
    type: aws:s3:BucketV2
    properties:
      forceDestroy: true
  fooRecorder:
    type: aws:cfg:Recorder
    properties:
      roleArn: ${role.arn}
  role:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Principal": {
                "Service": "config.amazonaws.com"
              },
              "Effect": "Allow",
              "Sid": ""
            }
          ]
        }
  rolePolicy:
    type: aws:iam:RolePolicy
    properties:
      role: ${role.id}
      policy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": [
                "s3:*"
              ],
              "Effect": "Allow",
              "Resource": [
                "${bucketV2.arn}",
                "${bucketV2.arn}/*"
              ]
            }
          ]
        }
```
{{% /example %}}
{{% /examples %}}

## Import

Delivery Channel can be imported using the name, e.g.,

```sh
 $ pulumi import aws:cfg/deliveryChannel:DeliveryChannel foo example
```

 
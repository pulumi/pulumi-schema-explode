Use this data source to get the Account ID of the [AWS Billing and Cost Management Service Account](http://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/billing-getting-started.html#step-2) for the purpose of permitting in S3 bucket policy.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const main = aws.getBillingServiceAccount({});
const billingLogs = new aws.s3.BucketV2("billingLogs", {});
const billingLogsAcl = new aws.s3.BucketAclV2("billingLogsAcl", {
    bucket: billingLogs.id,
    acl: "private",
});
const allowBillingLogging = new aws.s3.BucketPolicy("allowBillingLogging", {
    bucket: billingLogs.id,
    policy: Promise.all([main, main]).then(([main, main1]) => `{
  "Id": "Policy",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:GetBucketAcl", "s3:GetBucketPolicy"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::my-billing-tf-test-bucket",
      "Principal": {
        "AWS": [
          "${main.arn}"
        ]
      }
    },
    {
      "Action": [
        "s3:PutObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::my-billing-tf-test-bucket/*",
      "Principal": {
        "AWS": [
          "${main1.arn}"
        ]
      }
    }
  ]
}
`),
});
```
```python
import pulumi
import pulumi_aws as aws

main = aws.get_billing_service_account()
billing_logs = aws.s3.BucketV2("billingLogs")
billing_logs_acl = aws.s3.BucketAclV2("billingLogsAcl",
    bucket=billing_logs.id,
    acl="private")
allow_billing_logging = aws.s3.BucketPolicy("allowBillingLogging",
    bucket=billing_logs.id,
    policy=f"""{{
  "Id": "Policy",
  "Version": "2012-10-17",
  "Statement": [
    {{
      "Action": [
        "s3:GetBucketAcl", "s3:GetBucketPolicy"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::my-billing-tf-test-bucket",
      "Principal": {{
        "AWS": [
          "{main.arn}"
        ]
      }}
    }},
    {{
      "Action": [
        "s3:PutObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::my-billing-tf-test-bucket/*",
      "Principal": {{
        "AWS": [
          "{main.arn}"
        ]
      }}
    }}
  ]
}}
""")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var main = Aws.GetBillingServiceAccount.Invoke();

    var billingLogs = new Aws.S3.BucketV2("billingLogs");

    var billingLogsAcl = new Aws.S3.BucketAclV2("billingLogsAcl", new()
    {
        Bucket = billingLogs.Id,
        Acl = "private",
    });

    var allowBillingLogging = new Aws.S3.BucketPolicy("allowBillingLogging", new()
    {
        Bucket = billingLogs.Id,
        Policy = Output.Tuple(main.Apply(getBillingServiceAccountResult => getBillingServiceAccountResult), main.Apply(getBillingServiceAccountResult => getBillingServiceAccountResult)).Apply(values =>
        {
            var main = values.Item1;
            var main1 = values.Item2;
            return @$"{{
  ""Id"": ""Policy"",
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {{
      ""Action"": [
        ""s3:GetBucketAcl"", ""s3:GetBucketPolicy""
      ],
      ""Effect"": ""Allow"",
      ""Resource"": ""arn:aws:s3:::my-billing-tf-test-bucket"",
      ""Principal"": {{
        ""AWS"": [
          ""{main.Apply(getBillingServiceAccountResult => getBillingServiceAccountResult.Arn)}""
        ]
      }}
    }},
    {{
      ""Action"": [
        ""s3:PutObject""
      ],
      ""Effect"": ""Allow"",
      ""Resource"": ""arn:aws:s3:::my-billing-tf-test-bucket/*"",
      ""Principal"": {{
        ""AWS"": [
          ""{main1.Arn}""
        ]
      }}
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

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		main, err := aws.GetBillingServiceAccount(ctx, nil, nil)
		if err != nil {
			return err
		}
		billingLogs, err := s3.NewBucketV2(ctx, "billingLogs", nil)
		if err != nil {
			return err
		}
		_, err = s3.NewBucketAclV2(ctx, "billingLogsAcl", &s3.BucketAclV2Args{
			Bucket: billingLogs.ID(),
			Acl:    pulumi.String("private"),
		})
		if err != nil {
			return err
		}
		_, err = s3.NewBucketPolicy(ctx, "allowBillingLogging", &s3.BucketPolicyArgs{
			Bucket: billingLogs.ID(),
			Policy: pulumi.Any(fmt.Sprintf(`{
  "Id": "Policy",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:GetBucketAcl", "s3:GetBucketPolicy"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::my-billing-tf-test-bucket",
      "Principal": {
        "AWS": [
          "%v"
        ]
      }
    },
    {
      "Action": [
        "s3:PutObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::my-billing-tf-test-bucket/*",
      "Principal": {
        "AWS": [
          "%v"
        ]
      }
    }
  ]
}
`, main.Arn, main.Arn)),
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
import com.pulumi.aws.AwsFunctions;
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.s3.BucketAclV2;
import com.pulumi.aws.s3.BucketAclV2Args;
import com.pulumi.aws.s3.BucketPolicy;
import com.pulumi.aws.s3.BucketPolicyArgs;
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
        final var main = AwsFunctions.getBillingServiceAccount();

        var billingLogs = new BucketV2("billingLogs");

        var billingLogsAcl = new BucketAclV2("billingLogsAcl", BucketAclV2Args.builder()        
            .bucket(billingLogs.id())
            .acl("private")
            .build());

        var allowBillingLogging = new BucketPolicy("allowBillingLogging", BucketPolicyArgs.builder()        
            .bucket(billingLogs.id())
            .policy("""
{
  "Id": "Policy",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:GetBucketAcl", "s3:GetBucketPolicy"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::my-billing-tf-test-bucket",
      "Principal": {
        "AWS": [
          "%s"
        ]
      }
    },
    {
      "Action": [
        "s3:PutObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::my-billing-tf-test-bucket/*",
      "Principal": {
        "AWS": [
          "%s"
        ]
      }
    }
  ]
}
", main.applyValue(getBillingServiceAccountResult -> getBillingServiceAccountResult.arn()),main.applyValue(getBillingServiceAccountResult -> getBillingServiceAccountResult.arn())))
            .build());

    }
}
```
```yaml
resources:
  billingLogs:
    type: aws:s3:BucketV2
  billingLogsAcl:
    type: aws:s3:BucketAclV2
    properties:
      bucket: ${billingLogs.id}
      acl: private
  allowBillingLogging:
    type: aws:s3:BucketPolicy
    properties:
      bucket: ${billingLogs.id}
      policy: |
        {
          "Id": "Policy",
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": [
                "s3:GetBucketAcl", "s3:GetBucketPolicy"
              ],
              "Effect": "Allow",
              "Resource": "arn:aws:s3:::my-billing-tf-test-bucket",
              "Principal": {
                "AWS": [
                  "${main.arn}"
                ]
              }
            },
            {
              "Action": [
                "s3:PutObject"
              ],
              "Effect": "Allow",
              "Resource": "arn:aws:s3:::my-billing-tf-test-bucket/*",
              "Principal": {
                "AWS": [
                  "${main.arn}"
                ]
              }
            }
          ]
        }
variables:
  main:
    Fn::Invoke:
      Function: aws:getBillingServiceAccount
      Arguments: {}
```
{{% /example %}}
{{% /examples %}}
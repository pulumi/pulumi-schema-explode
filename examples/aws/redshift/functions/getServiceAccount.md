Use this data source to get the Account ID of the [AWS Redshift Service Account](http://docs.aws.amazon.com/redshift/latest/mgmt/db-auditing.html#db-auditing-enable-logging)
in a given region for the purpose of allowing Redshift to store audit data in S3.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const main = aws.redshift.getServiceAccount({});
const bucket = new aws.s3.BucketV2("bucket", {forceDestroy: true});
const allowAuditLogging = new aws.s3.BucketPolicy("allowAuditLogging", {
    bucket: bucket.id,
    policy: Promise.all([main, main]).then(([main, main1]) => `{
	"Version": "2008-10-17",
	"Statement": [
		{
            "Sid": "Put bucket policy needed for audit logging",
            "Effect": "Allow",
            "Principal": {
		        "AWS": "${main.arn}"
            },
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::tf-redshift-logging-test-bucket/*"
        },
        {
            "Sid": "Get bucket policy needed for audit logging ",
            "Effect": "Allow",
            "Principal": {
		        "AWS": "${main1.arn}"
            },
            "Action": "s3:GetBucketAcl",
            "Resource": "arn:aws:s3:::tf-redshift-logging-test-bucket"
        }
	]
}
`),
});
```
```python
import pulumi
import pulumi_aws as aws

main = aws.redshift.get_service_account()
bucket = aws.s3.BucketV2("bucket", force_destroy=True)
allow_audit_logging = aws.s3.BucketPolicy("allowAuditLogging",
    bucket=bucket.id,
    policy=f"""{{
	"Version": "2008-10-17",
	"Statement": [
		{{
            "Sid": "Put bucket policy needed for audit logging",
            "Effect": "Allow",
            "Principal": {{
		        "AWS": "{main.arn}"
            }},
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::tf-redshift-logging-test-bucket/*"
        }},
        {{
            "Sid": "Get bucket policy needed for audit logging ",
            "Effect": "Allow",
            "Principal": {{
		        "AWS": "{main.arn}"
            }},
            "Action": "s3:GetBucketAcl",
            "Resource": "arn:aws:s3:::tf-redshift-logging-test-bucket"
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
    var main = Aws.RedShift.GetServiceAccount.Invoke();

    var bucket = new Aws.S3.BucketV2("bucket", new()
    {
        ForceDestroy = true,
    });

    var allowAuditLogging = new Aws.S3.BucketPolicy("allowAuditLogging", new()
    {
        Bucket = bucket.Id,
        Policy = Output.Tuple(main.Apply(getServiceAccountResult => getServiceAccountResult), main.Apply(getServiceAccountResult => getServiceAccountResult)).Apply(values =>
        {
            var main = values.Item1;
            var main1 = values.Item2;
            return @$"{{
	""Version"": ""2008-10-17"",
	""Statement"": [
		{{
            ""Sid"": ""Put bucket policy needed for audit logging"",
            ""Effect"": ""Allow"",
            ""Principal"": {{
		        ""AWS"": ""{main.Apply(getServiceAccountResult => getServiceAccountResult.Arn)}""
            }},
            ""Action"": ""s3:PutObject"",
            ""Resource"": ""arn:aws:s3:::tf-redshift-logging-test-bucket/*""
        }},
        {{
            ""Sid"": ""Get bucket policy needed for audit logging "",
            ""Effect"": ""Allow"",
            ""Principal"": {{
		        ""AWS"": ""{main1.Arn}""
            }},
            ""Action"": ""s3:GetBucketAcl"",
            ""Resource"": ""arn:aws:s3:::tf-redshift-logging-test-bucket""
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

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/redshift"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		main, err := redshift.GetServiceAccount(ctx, nil, nil)
		if err != nil {
			return err
		}
		bucket, err := s3.NewBucketV2(ctx, "bucket", &s3.BucketV2Args{
			ForceDestroy: pulumi.Bool(true),
		})
		if err != nil {
			return err
		}
		_, err = s3.NewBucketPolicy(ctx, "allowAuditLogging", &s3.BucketPolicyArgs{
			Bucket: bucket.ID(),
			Policy: pulumi.Any(fmt.Sprintf(`{
	"Version": "2008-10-17",
	"Statement": [
		{
            "Sid": "Put bucket policy needed for audit logging",
            "Effect": "Allow",
            "Principal": {
		        "AWS": "%v"
            },
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::tf-redshift-logging-test-bucket/*"
        },
        {
            "Sid": "Get bucket policy needed for audit logging ",
            "Effect": "Allow",
            "Principal": {
		        "AWS": "%v"
            },
            "Action": "s3:GetBucketAcl",
            "Resource": "arn:aws:s3:::tf-redshift-logging-test-bucket"
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
import com.pulumi.aws.redshift.RedshiftFunctions;
import com.pulumi.aws.cloudtrail.inputs.GetServiceAccountArgs;
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.s3.BucketV2Args;
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
        final var main = RedshiftFunctions.getServiceAccount();

        var bucket = new BucketV2("bucket", BucketV2Args.builder()        
            .forceDestroy(true)
            .build());

        var allowAuditLogging = new BucketPolicy("allowAuditLogging", BucketPolicyArgs.builder()        
            .bucket(bucket.id())
            .policy("""
{
	"Version": "2008-10-17",
	"Statement": [
		{
            "Sid": "Put bucket policy needed for audit logging",
            "Effect": "Allow",
            "Principal": {
		        "AWS": "%s"
            },
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::tf-redshift-logging-test-bucket/*"
        },
        {
            "Sid": "Get bucket policy needed for audit logging ",
            "Effect": "Allow",
            "Principal": {
		        "AWS": "%s"
            },
            "Action": "s3:GetBucketAcl",
            "Resource": "arn:aws:s3:::tf-redshift-logging-test-bucket"
        }
	]
}
", main.applyValue(getServiceAccountResult -> getServiceAccountResult.arn()),main.applyValue(getServiceAccountResult -> getServiceAccountResult.arn())))
            .build());

    }
}
```
```yaml
resources:
  bucket:
    type: aws:s3:BucketV2
    properties:
      forceDestroy: true
  allowAuditLogging:
    type: aws:s3:BucketPolicy
    properties:
      bucket: ${bucket.id}
      policy: |
        {
        	"Version": "2008-10-17",
        	"Statement": [
        		{
                    "Sid": "Put bucket policy needed for audit logging",
                    "Effect": "Allow",
                    "Principal": {
        		        "AWS": "${main.arn}"
                    },
                    "Action": "s3:PutObject",
                    "Resource": "arn:aws:s3:::tf-redshift-logging-test-bucket/*"
                },
                {
                    "Sid": "Get bucket policy needed for audit logging ",
                    "Effect": "Allow",
                    "Principal": {
        		        "AWS": "${main.arn}"
                    },
                    "Action": "s3:GetBucketAcl",
                    "Resource": "arn:aws:s3:::tf-redshift-logging-test-bucket"
                }
        	]
        }
variables:
  main:
    Fn::Invoke:
      Function: aws:redshift:getServiceAccount
      Arguments: {}
```
{{% /example %}}
{{% /examples %}}
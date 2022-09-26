Provides an S3 bucket website configuration resource. For more information, see [Hosting Websites on S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html).

{{% examples %}}
## Example Usage
{{% example %}}
### With `routing_rule` configured

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.s3.BucketWebsiteConfigurationV2("example", {
    bucket: aws_s3_bucket.example.bucket,
    indexDocument: {
        suffix: "index.html",
    },
    errorDocument: {
        key: "error.html",
    },
    routingRules: [{
        condition: {
            keyPrefixEquals: "docs/",
        },
        redirect: {
            replaceKeyPrefixWith: "documents/",
        },
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.s3.BucketWebsiteConfigurationV2("example",
    bucket=aws_s3_bucket["example"]["bucket"],
    index_document=aws.s3.BucketWebsiteConfigurationV2IndexDocumentArgs(
        suffix="index.html",
    ),
    error_document=aws.s3.BucketWebsiteConfigurationV2ErrorDocumentArgs(
        key="error.html",
    ),
    routing_rules=[aws.s3.BucketWebsiteConfigurationV2RoutingRuleArgs(
        condition=aws.s3.BucketWebsiteConfigurationV2RoutingRuleConditionArgs(
            key_prefix_equals="docs/",
        ),
        redirect=aws.s3.BucketWebsiteConfigurationV2RoutingRuleRedirectArgs(
            replace_key_prefix_with="documents/",
        ),
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.S3.BucketWebsiteConfigurationV2("example", new()
    {
        Bucket = aws_s3_bucket.Example.Bucket,
        IndexDocument = new Aws.S3.Inputs.BucketWebsiteConfigurationV2IndexDocumentArgs
        {
            Suffix = "index.html",
        },
        ErrorDocument = new Aws.S3.Inputs.BucketWebsiteConfigurationV2ErrorDocumentArgs
        {
            Key = "error.html",
        },
        RoutingRules = new[]
        {
            new Aws.S3.Inputs.BucketWebsiteConfigurationV2RoutingRuleArgs
            {
                Condition = new Aws.S3.Inputs.BucketWebsiteConfigurationV2RoutingRuleConditionArgs
                {
                    KeyPrefixEquals = "docs/",
                },
                Redirect = new Aws.S3.Inputs.BucketWebsiteConfigurationV2RoutingRuleRedirectArgs
                {
                    ReplaceKeyPrefixWith = "documents/",
                },
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := s3.NewBucketWebsiteConfigurationV2(ctx, "example", &s3.BucketWebsiteConfigurationV2Args{
			Bucket: pulumi.Any(aws_s3_bucket.Example.Bucket),
			IndexDocument: &s3.BucketWebsiteConfigurationV2IndexDocumentArgs{
				Suffix: pulumi.String("index.html"),
			},
			ErrorDocument: &s3.BucketWebsiteConfigurationV2ErrorDocumentArgs{
				Key: pulumi.String("error.html"),
			},
			RoutingRules: s3.BucketWebsiteConfigurationV2RoutingRuleArray{
				&s3.BucketWebsiteConfigurationV2RoutingRuleArgs{
					Condition: &s3.BucketWebsiteConfigurationV2RoutingRuleConditionArgs{
						KeyPrefixEquals: pulumi.String("docs/"),
					},
					Redirect: &s3.BucketWebsiteConfigurationV2RoutingRuleRedirectArgs{
						ReplaceKeyPrefixWith: pulumi.String("documents/"),
					},
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
import com.pulumi.aws.s3.BucketWebsiteConfigurationV2;
import com.pulumi.aws.s3.BucketWebsiteConfigurationV2Args;
import com.pulumi.aws.s3.inputs.BucketWebsiteConfigurationV2IndexDocumentArgs;
import com.pulumi.aws.s3.inputs.BucketWebsiteConfigurationV2ErrorDocumentArgs;
import com.pulumi.aws.s3.inputs.BucketWebsiteConfigurationV2RoutingRuleArgs;
import com.pulumi.aws.s3.inputs.BucketWebsiteConfigurationV2RoutingRuleConditionArgs;
import com.pulumi.aws.s3.inputs.BucketWebsiteConfigurationV2RoutingRuleRedirectArgs;
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
        var example = new BucketWebsiteConfigurationV2("example", BucketWebsiteConfigurationV2Args.builder()        
            .bucket(aws_s3_bucket.example().bucket())
            .indexDocument(BucketWebsiteConfigurationV2IndexDocumentArgs.builder()
                .suffix("index.html")
                .build())
            .errorDocument(BucketWebsiteConfigurationV2ErrorDocumentArgs.builder()
                .key("error.html")
                .build())
            .routingRules(BucketWebsiteConfigurationV2RoutingRuleArgs.builder()
                .condition(BucketWebsiteConfigurationV2RoutingRuleConditionArgs.builder()
                    .keyPrefixEquals("docs/")
                    .build())
                .redirect(BucketWebsiteConfigurationV2RoutingRuleRedirectArgs.builder()
                    .replaceKeyPrefixWith("documents/")
                    .build())
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:s3:BucketWebsiteConfigurationV2
    properties:
      bucket: ${aws_s3_bucket.example.bucket}
      indexDocument:
        suffix: index.html
      errorDocument:
        key: error.html
      routingRules:
        - condition:
            keyPrefixEquals: docs/
          redirect:
            replaceKeyPrefixWith: documents/
```
{{% /example %}}
{{% example %}}
### With `routing_rules` configured

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.s3.BucketWebsiteConfigurationV2("example", {
    bucket: aws_s3_bucket.example.bucket,
    indexDocument: {
        suffix: "index.html",
    },
    errorDocument: {
        key: "error.html",
    },
    routingRuleDetails: `[{
    "Condition": {
        "KeyPrefixEquals": "docs/"
    },
    "Redirect": {
        "ReplaceKeyPrefixWith": ""
    }
}]
`,
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.s3.BucketWebsiteConfigurationV2("example",
    bucket=aws_s3_bucket["example"]["bucket"],
    index_document=aws.s3.BucketWebsiteConfigurationV2IndexDocumentArgs(
        suffix="index.html",
    ),
    error_document=aws.s3.BucketWebsiteConfigurationV2ErrorDocumentArgs(
        key="error.html",
    ),
    routing_rule_details="""[{
    "Condition": {
        "KeyPrefixEquals": "docs/"
    },
    "Redirect": {
        "ReplaceKeyPrefixWith": ""
    }
}]
""")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.S3.BucketWebsiteConfigurationV2("example", new()
    {
        Bucket = aws_s3_bucket.Example.Bucket,
        IndexDocument = new Aws.S3.Inputs.BucketWebsiteConfigurationV2IndexDocumentArgs
        {
            Suffix = "index.html",
        },
        ErrorDocument = new Aws.S3.Inputs.BucketWebsiteConfigurationV2ErrorDocumentArgs
        {
            Key = "error.html",
        },
        RoutingRuleDetails = @"[{
    ""Condition"": {
        ""KeyPrefixEquals"": ""docs/""
    },
    ""Redirect"": {
        ""ReplaceKeyPrefixWith"": """"
    }
}]
",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := s3.NewBucketWebsiteConfigurationV2(ctx, "example", &s3.BucketWebsiteConfigurationV2Args{
			Bucket: pulumi.Any(aws_s3_bucket.Example.Bucket),
			IndexDocument: &s3.BucketWebsiteConfigurationV2IndexDocumentArgs{
				Suffix: pulumi.String("index.html"),
			},
			ErrorDocument: &s3.BucketWebsiteConfigurationV2ErrorDocumentArgs{
				Key: pulumi.String("error.html"),
			},
			RoutingRuleDetails: pulumi.String(fmt.Sprintf(`[{
    "Condition": {
        "KeyPrefixEquals": "docs/"
    },
    "Redirect": {
        "ReplaceKeyPrefixWith": ""
    }
}]
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
import com.pulumi.aws.s3.BucketWebsiteConfigurationV2;
import com.pulumi.aws.s3.BucketWebsiteConfigurationV2Args;
import com.pulumi.aws.s3.inputs.BucketWebsiteConfigurationV2IndexDocumentArgs;
import com.pulumi.aws.s3.inputs.BucketWebsiteConfigurationV2ErrorDocumentArgs;
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
        var example = new BucketWebsiteConfigurationV2("example", BucketWebsiteConfigurationV2Args.builder()        
            .bucket(aws_s3_bucket.example().bucket())
            .indexDocument(BucketWebsiteConfigurationV2IndexDocumentArgs.builder()
                .suffix("index.html")
                .build())
            .errorDocument(BucketWebsiteConfigurationV2ErrorDocumentArgs.builder()
                .key("error.html")
                .build())
            .routingRuleDetails("""
[{
    "Condition": {
        "KeyPrefixEquals": "docs/"
    },
    "Redirect": {
        "ReplaceKeyPrefixWith": ""
    }
}]
            """)
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:s3:BucketWebsiteConfigurationV2
    properties:
      bucket: ${aws_s3_bucket.example.bucket}
      indexDocument:
        suffix: index.html
      errorDocument:
        key: error.html
      routingRuleDetails: |
        [{
            "Condition": {
                "KeyPrefixEquals": "docs/"
            },
            "Redirect": {
                "ReplaceKeyPrefixWith": ""
            }
        }]
```
{{% /example %}}
{{% /examples %}}

## Import

S3 bucket website configuration can be imported in one of two ways. If the owner (account ID) of the source bucket is the same account used to configure the Terraform AWS Provider, the S3 bucket website configuration resource should be imported using the `bucket` e.g.,

```sh
 $ pulumi import aws:s3/bucketWebsiteConfigurationV2:BucketWebsiteConfigurationV2 example bucket-name
```

 If the owner (account ID) of the source bucket differs from the account used to configure the Terraform AWS Provider, the S3 bucket website configuration resource should be imported using the `bucket` and `expected_bucket_owner` separated by a comma (`,`) e.g.,

```sh
 $ pulumi import aws:s3/bucketWebsiteConfigurationV2:BucketWebsiteConfigurationV2 example bucket-name,123456789012
```

 
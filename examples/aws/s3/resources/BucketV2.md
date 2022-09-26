Provides a S3 bucket resource.

> This functionality is for managing S3 in an AWS Partition. To manage [S3 on Outposts](https://docs.aws.amazon.com/AmazonS3/latest/dev/S3onOutposts.html), see the `aws.s3control.Bucket` resource.

> **NOTE on S3 Bucket Accelerate Configuration:** S3 Bucket Accelerate can be configured in either the standalone resource `aws.s3.BucketAccelerateConfigurationV2`
or with the deprecated parameter `acceleration_status` in the resource `aws.s3.BucketV2`.
Configuring with both will cause inconsistencies and may overwrite configuration.

> **NOTE on S3 Bucket canned ACL Configuration:** S3 Bucket canned ACL can be configured in either the standalone resource `aws.s3.BucketAclV2`
or with the deprecated parameter `acl` in the resource `aws.s3.BucketV2`.
Configuring with both will cause inconsistencies and may overwrite configuration.

> **NOTE on S3 Bucket ACL Grants Configuration:** S3 Bucket grants can be configured in either the standalone resource `aws.s3.BucketAclV2`
or with the deprecated parameter `grant` in the resource `aws.s3.BucketV2`.
Configuring with both will cause inconsistencies and may overwrite configuration.

> **NOTE on S3 Bucket CORS Configuration:** S3 Bucket CORS can be configured in either the standalone resource `aws.s3.BucketCorsConfigurationV2`
or with the deprecated parameter `cors_rule` in the resource `aws.s3.BucketV2`.
Configuring with both will cause inconsistencies and may overwrite configuration.

> **NOTE on S3 Bucket Lifecycle Configuration:** S3 Bucket Lifecycle can be configured in either the standalone resource `aws.s3.BucketLifecycleConfigurationV2`
or with the deprecated parameter `lifecycle_rule` in the resource `aws.s3.BucketV2`.
Configuring with both will cause inconsistencies and may overwrite configuration.

> **NOTE on S3 Bucket Logging Configuration:** S3 Bucket logging can be configured in either the standalone resource `aws.s3.BucketLoggingV2`
or with the deprecated parameter `logging` in the resource `aws.s3.BucketV2`.
Configuring with both will cause inconsistencies and may overwrite configuration.

> **NOTE on S3 Bucket Object Lock Configuration:** S3 Bucket Object Lock can be configured in either the standalone resource `aws.s3.BucketObjectLockConfigurationV2`
or with the deprecated parameter `object_lock_configuration` in the resource `aws.s3.BucketV2`.
Configuring with both will cause inconsistencies and may overwrite configuration.

> **NOTE on S3 Bucket Policy Configuration:** S3 Bucket Policy can be configured in either the standalone resource `aws.s3.BucketPolicy`
or with the deprecated parameter `policy` in the resource `aws.s3.BucketV2`.
Configuring with both will cause inconsistencies and may overwrite configuration.

> **NOTE on S3 Bucket Replication Configuration:** S3 Bucket Replication can be configured in either the standalone resource `aws.s3.BucketReplicationConfig`
or with the deprecated parameter `replication_configuration` in the resource `aws.s3.BucketV2`.
Configuring with both will cause inconsistencies and may overwrite configuration.

> **NOTE on S3 Bucket Request Payment Configuration:** S3 Bucket Request Payment can be configured in either the standalone resource `aws.s3.BucketRequestPaymentConfigurationV2`
or with the deprecated parameter `request_payer` in the resource `aws.s3.BucketV2`.
Configuring with both will cause inconsistencies and may overwrite configuration.

> **NOTE on S3 Bucket Server Side Encryption Configuration:** S3 Bucket Server Side Encryption can be configured in either the standalone resource `aws.s3.BucketServerSideEncryptionConfigurationV2`
or with the deprecated parameter `server_side_encryption_configuration` in the resource `aws.s3.BucketV2`.
Configuring with both will cause inconsistencies and may overwrite configuration.

> **NOTE on S3 Bucket Versioning Configuration:** S3 Bucket versioning can be configured in either the standalone resource `aws.s3.BucketVersioningV2`
or with the deprecated parameter `versioning` in the resource `aws.s3.BucketV2`.
Configuring with both will cause inconsistencies and may overwrite configuration.

> **NOTE on S3 Bucket Website Configuration:** S3 Bucket Website can be configured in either the standalone resource `aws.s3.BucketWebsiteConfigurationV2`
or with the deprecated parameter `website` in the resource `aws.s3.BucketV2`.
Configuring with both will cause inconsistencies and may overwrite configuration.

{{% examples %}}
## Example Usage
{{% example %}}
### Private Bucket w/ Tags

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bucketV2 = new aws.s3.BucketV2("bucketV2", {tags: {
    Name: "My bucket",
    Environment: "Dev",
}});
const example = new aws.s3.BucketAclV2("example", {
    bucket: bucketV2.id,
    acl: "private",
});
```
```python
import pulumi
import pulumi_aws as aws

bucket_v2 = aws.s3.BucketV2("bucketV2", tags={
    "Name": "My bucket",
    "Environment": "Dev",
})
example = aws.s3.BucketAclV2("example",
    bucket=bucket_v2.id,
    acl="private")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var bucketV2 = new Aws.S3.BucketV2("bucketV2", new()
    {
        Tags = 
        {
            { "Name", "My bucket" },
            { "Environment", "Dev" },
        },
    });

    var example = new Aws.S3.BucketAclV2("example", new()
    {
        Bucket = bucketV2.Id,
        Acl = "private",
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
		bucketV2, err := s3.NewBucketV2(ctx, "bucketV2", &s3.BucketV2Args{
			Tags: pulumi.StringMap{
				"Name":        pulumi.String("My bucket"),
				"Environment": pulumi.String("Dev"),
			},
		})
		if err != nil {
			return err
		}
		_, err = s3.NewBucketAclV2(ctx, "example", &s3.BucketAclV2Args{
			Bucket: bucketV2.ID(),
			Acl:    pulumi.String("private"),
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
import com.pulumi.aws.s3.BucketAclV2;
import com.pulumi.aws.s3.BucketAclV2Args;
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
            .tags(Map.ofEntries(
                Map.entry("Name", "My bucket"),
                Map.entry("Environment", "Dev")
            ))
            .build());

        var example = new BucketAclV2("example", BucketAclV2Args.builder()        
            .bucket(bucketV2.id())
            .acl("private")
            .build());

    }
}
```
```yaml
resources:
  bucketV2:
    type: aws:s3:BucketV2
    properties:
      tags:
        Name: My bucket
        Environment: Dev
  example:
    type: aws:s3:BucketAclV2
    properties:
      bucket: ${bucketV2.id}
      acl: private
```
{{% /example %}}
{{% example %}}
### Static Website Hosting

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as fs from "fs";

const bucketV2 = new aws.s3.BucketV2("bucketV2", {
    acl: "public-read",
    policy: fs.readFileSync("policy.json"),
    websites: [{
        indexDocument: "index.html",
        errorDocument: "error.html",
        routingRules: `[{
    "Condition": {
        "KeyPrefixEquals": "docs/"
    },
    "Redirect": {
        "ReplaceKeyPrefixWith": "documents/"
    }
}]
`,
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

bucket_v2 = aws.s3.BucketV2("bucketV2",
    acl="public-read",
    policy=(lambda path: open(path).read())("policy.json"),
    websites=[aws.s3.BucketV2WebsiteArgs(
        index_document="index.html",
        error_document="error.html",
        routing_rules="""[{
    "Condition": {
        "KeyPrefixEquals": "docs/"
    },
    "Redirect": {
        "ReplaceKeyPrefixWith": "documents/"
    }
}]
""",
    )])
```
```csharp
using System.Collections.Generic;
using System.IO;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var bucketV2 = new Aws.S3.BucketV2("bucketV2", new()
    {
        Acl = "public-read",
        Policy = File.ReadAllText("policy.json"),
        Websites = new[]
        {
            new Aws.S3.Inputs.BucketV2WebsiteArgs
            {
                IndexDocument = "index.html",
                ErrorDocument = "error.html",
                RoutingRules = @"[{
    ""Condition"": {
        ""KeyPrefixEquals"": ""docs/""
    },
    ""Redirect"": {
        ""ReplaceKeyPrefixWith"": ""documents/""
    }
}]
",
            },
        },
    });

});
```
```go
package main

import (
	"fmt"
	"io/ioutil"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func readFileOrPanic(path string) pulumi.StringPtrInput {
	data, err := ioutil.ReadFile(path)
	if err != nil {
		panic(err.Error())
	}
	return pulumi.String(string(data))
}

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := s3.NewBucketV2(ctx, "bucketV2", &s3.BucketV2Args{
			Acl:    pulumi.String("public-read"),
			Policy: readFileOrPanic("policy.json"),
			Websites: s3.BucketV2WebsiteArray{
				&s3.BucketV2WebsiteArgs{
					IndexDocument: pulumi.String("index.html"),
					ErrorDocument: pulumi.String("error.html"),
					RoutingRules: pulumi.String(fmt.Sprintf(`[{
    "Condition": {
        "KeyPrefixEquals": "docs/"
    },
    "Redirect": {
        "ReplaceKeyPrefixWith": "documents/"
    }
}]
`)),
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
import com.pulumi.aws.s3.BucketV2Args;
import com.pulumi.aws.s3.inputs.BucketV2WebsiteArgs;
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
            .acl("public-read")
            .policy(Files.readString(Paths.get("policy.json")))
            .websites(BucketV2WebsiteArgs.builder()
                .indexDocument("index.html")
                .errorDocument("error.html")
                .routingRules("""
[{
    "Condition": {
        "KeyPrefixEquals": "docs/"
    },
    "Redirect": {
        "ReplaceKeyPrefixWith": "documents/"
    }
}]
                """)
                .build())
            .build());

    }
}
```
{{% /example %}}
{{% example %}}
### Using CORS

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bucketV2 = new aws.s3.BucketV2("b", {
    acl: "public-read",
    corsRules: [{
        allowedHeaders: ["*"],
        allowedMethods: [
            "PUT",
            "POST",
        ],
        allowedOrigins: ["https://s3-website-test.hashicorp.com"],
        exposeHeaders: ["ETag"],
        maxAgeSeconds: 3000,
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

bucket_v2 = aws.s3.BucketV2("bucketV2",
    acl="public-read",
    cors_rules=[aws.s3.BucketV2CorsRuleArgs(
        allowed_headers=["*"],
        allowed_methods=[
            "PUT",
            "POST",
        ],
        allowed_origins=["https://s3-website-test.hashicorp.com"],
        expose_headers=["ETag"],
        max_age_seconds=3000,
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var bucketV2 = new Aws.S3.BucketV2("bucketV2", new()
    {
        Acl = "public-read",
        CorsRules = new[]
        {
            new Aws.S3.Inputs.BucketV2CorsRuleArgs
            {
                AllowedHeaders = new[]
                {
                    "*",
                },
                AllowedMethods = new[]
                {
                    "PUT",
                    "POST",
                },
                AllowedOrigins = new[]
                {
                    "https://s3-website-test.hashicorp.com",
                },
                ExposeHeaders = new[]
                {
                    "ETag",
                },
                MaxAgeSeconds = 3000,
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
		_, err := s3.NewBucketV2(ctx, "bucketV2", &s3.BucketV2Args{
			Acl: pulumi.String("public-read"),
			CorsRules: s3.BucketV2CorsRuleArray{
				&s3.BucketV2CorsRuleArgs{
					AllowedHeaders: pulumi.StringArray{
						pulumi.String("*"),
					},
					AllowedMethods: pulumi.StringArray{
						pulumi.String("PUT"),
						pulumi.String("POST"),
					},
					AllowedOrigins: pulumi.StringArray{
						pulumi.String("https://s3-website-test.hashicorp.com"),
					},
					ExposeHeaders: pulumi.StringArray{
						pulumi.String("ETag"),
					},
					MaxAgeSeconds: pulumi.Int(3000),
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
import com.pulumi.aws.s3.BucketV2Args;
import com.pulumi.aws.s3.inputs.BucketV2CorsRuleArgs;
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
            .acl("public-read")
            .corsRules(BucketV2CorsRuleArgs.builder()
                .allowedHeaders("*")
                .allowedMethods(                
                    "PUT",
                    "POST")
                .allowedOrigins("https://s3-website-test.hashicorp.com")
                .exposeHeaders("ETag")
                .maxAgeSeconds(3000)
                .build())
            .build());

    }
}
```
```yaml
resources:
  bucketV2:
    type: aws:s3:BucketV2
    properties:
      acl: public-read
      corsRules:
        - allowedHeaders:
            - '*'
          allowedMethods:
            - PUT
            - POST
          allowedOrigins:
            - https://s3-website-test.hashicorp.com
          exposeHeaders:
            - ETag
          maxAgeSeconds: 3000
```
{{% /example %}}
{{% example %}}
### Using versioning

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bucketV2 = new aws.s3.BucketV2("b", {
    acl: "private",
    versionings: [{
        enabled: true,
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

bucket_v2 = aws.s3.BucketV2("bucketV2",
    acl="private",
    versionings=[aws.s3.BucketV2VersioningArgs(
        enabled=True,
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var bucketV2 = new Aws.S3.BucketV2("bucketV2", new()
    {
        Acl = "private",
        Versionings = new[]
        {
            new Aws.S3.Inputs.BucketV2VersioningArgs
            {
                Enabled = true,
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
		_, err := s3.NewBucketV2(ctx, "bucketV2", &s3.BucketV2Args{
			Acl: pulumi.String("private"),
			Versionings: s3.BucketV2VersioningArray{
				&s3.BucketV2VersioningArgs{
					Enabled: pulumi.Bool(true),
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
import com.pulumi.aws.s3.BucketV2Args;
import com.pulumi.aws.s3.inputs.BucketV2VersioningArgs;
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
            .acl("private")
            .versionings(BucketV2VersioningArgs.builder()
                .enabled(true)
                .build())
            .build());

    }
}
```
```yaml
resources:
  bucketV2:
    type: aws:s3:BucketV2
    properties:
      acl: private
      versionings:
        - enabled: true
```
{{% /example %}}
{{% example %}}
### Enable Logging

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const logBucket = new aws.s3.BucketV2("logBucket", {acl: "log-delivery-write"});
const bucketV2 = new aws.s3.BucketV2("bucketV2", {
    acl: "private",
    loggings: [{
        targetBucket: logBucket.id,
        targetPrefix: "log/",
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

log_bucket = aws.s3.BucketV2("logBucket", acl="log-delivery-write")
bucket_v2 = aws.s3.BucketV2("bucketV2",
    acl="private",
    loggings=[aws.s3.BucketV2LoggingArgs(
        target_bucket=log_bucket.id,
        target_prefix="log/",
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var logBucket = new Aws.S3.BucketV2("logBucket", new()
    {
        Acl = "log-delivery-write",
    });

    var bucketV2 = new Aws.S3.BucketV2("bucketV2", new()
    {
        Acl = "private",
        Loggings = new[]
        {
            new Aws.S3.Inputs.BucketV2LoggingArgs
            {
                TargetBucket = logBucket.Id,
                TargetPrefix = "log/",
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
		logBucket, err := s3.NewBucketV2(ctx, "logBucket", &s3.BucketV2Args{
			Acl: pulumi.String("log-delivery-write"),
		})
		if err != nil {
			return err
		}
		_, err = s3.NewBucketV2(ctx, "bucketV2", &s3.BucketV2Args{
			Acl: pulumi.String("private"),
			Loggings: s3.BucketV2LoggingArray{
				&s3.BucketV2LoggingArgs{
					TargetBucket: logBucket.ID(),
					TargetPrefix: pulumi.String("log/"),
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
import com.pulumi.aws.s3.BucketV2Args;
import com.pulumi.aws.s3.inputs.BucketV2LoggingArgs;
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
        var logBucket = new BucketV2("logBucket", BucketV2Args.builder()        
            .acl("log-delivery-write")
            .build());

        var bucketV2 = new BucketV2("bucketV2", BucketV2Args.builder()        
            .acl("private")
            .loggings(BucketV2LoggingArgs.builder()
                .targetBucket(logBucket.id())
                .targetPrefix("log/")
                .build())
            .build());

    }
}
```
```yaml
resources:
  logBucket:
    type: aws:s3:BucketV2
    properties:
      acl: log-delivery-write
  bucketV2:
    type: aws:s3:BucketV2
    properties:
      acl: private
      loggings:
        - targetBucket: ${logBucket.id}
          targetPrefix: log/
```
{{% /example %}}
{{% example %}}
### Using object lifecycle

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bucket = new aws.s3.BucketV2("bucket", {
    acl: "private",
    lifecycleRules: [
        {
            enabled: true,
            expirations: [{
                days: 90,
            }],
            id: "log",
            prefix: "log/",
            tags: {
                autoclean: "true",
                rule: "log",
            },
            transitions: [
                {
                    days: 30,
                    storageClass: "STANDARD_IA", // or "ONEZONE_IA"
                },
                {
                    days: 60,
                    storageClass: "GLACIER",
                },
            ],
        },
        {
            enabled: true,
            expirations: [{
                date: "2016-01-12",
            }],
            id: "tmp",
            prefix: "tmp/",
        },
    ],
});
const versioningBucket = new aws.s3.BucketV2("versioning_bucket", {
    acl: "private",
    lifecycleRules: [{
        enabled: true,
        noncurrentVersionExpirations: [{
            days: 90,
        }],
        noncurrentVersionTransitions: [
            {
                days: 30,
                storageClass: "STANDARD_IA",
            },
            {
                days: 60,
                storageClass: "GLACIER",
            },
        ],
        prefix: "config/",
    }],
    versionings: [{
        enabled: true,
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

bucket = aws.s3.BucketV2("bucket",
    acl="private",
    lifecycle_rules=[
        aws.s3.BucketV2LifecycleRuleArgs(
            enabled=True,
            expirations=[aws.s3.BucketV2LifecycleRuleExpirationArgs(
                days=90,
            )],
            id="log",
            prefix="log/",
            tags={
                "autoclean": "true",
                "rule": "log",
            },
            transitions=[
                aws.s3.BucketV2LifecycleRuleTransitionArgs(
                    days=30,
                    storage_class="STANDARD_IA",
                ),
                aws.s3.BucketV2LifecycleRuleTransitionArgs(
                    days=60,
                    storage_class="GLACIER",
                ),
            ],
        ),
        aws.s3.BucketV2LifecycleRuleArgs(
            enabled=True,
            expirations=[aws.s3.BucketV2LifecycleRuleExpirationArgs(
                date="2016-01-12",
            )],
            id="tmp",
            prefix="tmp/",
        ),
    ])
versioning_bucket = aws.s3.BucketV2("versioningBucket",
    acl="private",
    lifecycle_rules=[aws.s3.BucketV2LifecycleRuleArgs(
        enabled=True,
        noncurrent_version_expirations=[aws.s3.BucketV2LifecycleRuleNoncurrentVersionExpirationArgs(
            days=90,
        )],
        noncurrent_version_transitions=[
            aws.s3.BucketV2LifecycleRuleNoncurrentVersionTransitionArgs(
                days=30,
                storage_class="STANDARD_IA",
            ),
            aws.s3.BucketV2LifecycleRuleNoncurrentVersionTransitionArgs(
                days=60,
                storage_class="GLACIER",
            ),
        ],
        prefix="config/",
    )],
    versionings=[aws.s3.BucketV2VersioningArgs(
        enabled=True,
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var bucket = new Aws.S3.BucketV2("bucket", new()
    {
        Acl = "private",
        LifecycleRules = new[]
        {
            new Aws.S3.Inputs.BucketV2LifecycleRuleArgs
            {
                Enabled = true,
                Expirations = new[]
                {
                    new Aws.S3.Inputs.BucketV2LifecycleRuleExpirationArgs
                    {
                        Days = 90,
                    },
                },
                Id = "log",
                Prefix = "log/",
                Tags = 
                {
                    { "autoclean", "true" },
                    { "rule", "log" },
                },
                Transitions = new[]
                {
                    new Aws.S3.Inputs.BucketV2LifecycleRuleTransitionArgs
                    {
                        Days = 30,
                        StorageClass = "STANDARD_IA",
                    },
                    new Aws.S3.Inputs.BucketV2LifecycleRuleTransitionArgs
                    {
                        Days = 60,
                        StorageClass = "GLACIER",
                    },
                },
            },
            new Aws.S3.Inputs.BucketV2LifecycleRuleArgs
            {
                Enabled = true,
                Expirations = new[]
                {
                    new Aws.S3.Inputs.BucketV2LifecycleRuleExpirationArgs
                    {
                        Date = "2016-01-12",
                    },
                },
                Id = "tmp",
                Prefix = "tmp/",
            },
        },
    });

    var versioningBucket = new Aws.S3.BucketV2("versioningBucket", new()
    {
        Acl = "private",
        LifecycleRules = new[]
        {
            new Aws.S3.Inputs.BucketV2LifecycleRuleArgs
            {
                Enabled = true,
                NoncurrentVersionExpirations = new[]
                {
                    new Aws.S3.Inputs.BucketV2LifecycleRuleNoncurrentVersionExpirationArgs
                    {
                        Days = 90,
                    },
                },
                NoncurrentVersionTransitions = new[]
                {
                    new Aws.S3.Inputs.BucketV2LifecycleRuleNoncurrentVersionTransitionArgs
                    {
                        Days = 30,
                        StorageClass = "STANDARD_IA",
                    },
                    new Aws.S3.Inputs.BucketV2LifecycleRuleNoncurrentVersionTransitionArgs
                    {
                        Days = 60,
                        StorageClass = "GLACIER",
                    },
                },
                Prefix = "config/",
            },
        },
        Versionings = new[]
        {
            new Aws.S3.Inputs.BucketV2VersioningArgs
            {
                Enabled = true,
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
		_, err := s3.NewBucketV2(ctx, "bucket", &s3.BucketV2Args{
			Acl: pulumi.String("private"),
			LifecycleRules: s3.BucketV2LifecycleRuleArray{
				&s3.BucketV2LifecycleRuleArgs{
					Enabled: pulumi.Bool(true),
					Expirations: s3.BucketV2LifecycleRuleExpirationArray{
						&s3.BucketV2LifecycleRuleExpirationArgs{
							Days: pulumi.Int(90),
						},
					},
					Id:     pulumi.String("log"),
					Prefix: pulumi.String("log/"),
					Tags: pulumi.StringMap{
						"autoclean": pulumi.String("true"),
						"rule":      pulumi.String("log"),
					},
					Transitions: s3.BucketV2LifecycleRuleTransitionArray{
						&s3.BucketV2LifecycleRuleTransitionArgs{
							Days:         pulumi.Int(30),
							StorageClass: pulumi.String("STANDARD_IA"),
						},
						&s3.BucketV2LifecycleRuleTransitionArgs{
							Days:         pulumi.Int(60),
							StorageClass: pulumi.String("GLACIER"),
						},
					},
				},
				&s3.BucketV2LifecycleRuleArgs{
					Enabled: pulumi.Bool(true),
					Expirations: s3.BucketV2LifecycleRuleExpirationArray{
						&s3.BucketV2LifecycleRuleExpirationArgs{
							Date: pulumi.String("2016-01-12"),
						},
					},
					Id:     pulumi.String("tmp"),
					Prefix: pulumi.String("tmp/"),
				},
			},
		})
		if err != nil {
			return err
		}
		_, err = s3.NewBucketV2(ctx, "versioningBucket", &s3.BucketV2Args{
			Acl: pulumi.String("private"),
			LifecycleRules: s3.BucketV2LifecycleRuleArray{
				&s3.BucketV2LifecycleRuleArgs{
					Enabled: pulumi.Bool(true),
					NoncurrentVersionExpirations: s3.BucketV2LifecycleRuleNoncurrentVersionExpirationArray{
						&s3.BucketV2LifecycleRuleNoncurrentVersionExpirationArgs{
							Days: pulumi.Int(90),
						},
					},
					NoncurrentVersionTransitions: s3.BucketV2LifecycleRuleNoncurrentVersionTransitionArray{
						&s3.BucketV2LifecycleRuleNoncurrentVersionTransitionArgs{
							Days:         pulumi.Int(30),
							StorageClass: pulumi.String("STANDARD_IA"),
						},
						&s3.BucketV2LifecycleRuleNoncurrentVersionTransitionArgs{
							Days:         pulumi.Int(60),
							StorageClass: pulumi.String("GLACIER"),
						},
					},
					Prefix: pulumi.String("config/"),
				},
			},
			Versionings: s3.BucketV2VersioningArray{
				&s3.BucketV2VersioningArgs{
					Enabled: pulumi.Bool(true),
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
import com.pulumi.aws.s3.BucketV2Args;
import com.pulumi.aws.s3.inputs.BucketV2LifecycleRuleArgs;
import com.pulumi.aws.s3.inputs.BucketV2VersioningArgs;
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
        var bucket = new BucketV2("bucket", BucketV2Args.builder()        
            .acl("private")
            .lifecycleRules(            
                BucketV2LifecycleRuleArgs.builder()
                    .enabled(true)
                    .expirations(BucketV2LifecycleRuleExpirationArgs.builder()
                        .days(90)
                        .build())
                    .id("log")
                    .prefix("log/")
                    .tags(Map.ofEntries(
                        Map.entry("autoclean", "true"),
                        Map.entry("rule", "log")
                    ))
                    .transitions(                    
                        BucketV2LifecycleRuleTransitionArgs.builder()
                            .days(30)
                            .storageClass("STANDARD_IA")
                            .build(),
                        BucketV2LifecycleRuleTransitionArgs.builder()
                            .days(60)
                            .storageClass("GLACIER")
                            .build())
                    .build(),
                BucketV2LifecycleRuleArgs.builder()
                    .enabled(true)
                    .expirations(BucketV2LifecycleRuleExpirationArgs.builder()
                        .date("2016-01-12")
                        .build())
                    .id("tmp")
                    .prefix("tmp/")
                    .build())
            .build());

        var versioningBucket = new BucketV2("versioningBucket", BucketV2Args.builder()        
            .acl("private")
            .lifecycleRules(BucketV2LifecycleRuleArgs.builder()
                .enabled(true)
                .noncurrentVersionExpirations(BucketV2LifecycleRuleNoncurrentVersionExpirationArgs.builder()
                    .days(90)
                    .build())
                .noncurrentVersionTransitions(                
                    BucketV2LifecycleRuleNoncurrentVersionTransitionArgs.builder()
                        .days(30)
                        .storageClass("STANDARD_IA")
                        .build(),
                    BucketV2LifecycleRuleNoncurrentVersionTransitionArgs.builder()
                        .days(60)
                        .storageClass("GLACIER")
                        .build())
                .prefix("config/")
                .build())
            .versionings(BucketV2VersioningArgs.builder()
                .enabled(true)
                .build())
            .build());

    }
}
```
```yaml
resources:
  bucket:
    type: aws:s3:BucketV2
    properties:
      acl: private
      lifecycleRules:
        - enabled: true
          expirations:
            - days: 90
          id: log
          prefix: log/
          tags:
            autoclean: true
            rule: log
          transitions:
            - days: 30
              storageClass: STANDARD_IA
            - days: 60
              storageClass: GLACIER
        - enabled: true
          expirations:
            - date: 2016-01-12
          id: tmp
          prefix: tmp/
  versioningBucket:
    type: aws:s3:BucketV2
    properties:
      acl: private
      lifecycleRules:
        - enabled: true
          noncurrentVersionExpirations:
            - days: 90
          noncurrentVersionTransitions:
            - days: 30
              storageClass: STANDARD_IA
            - days: 60
              storageClass: GLACIER
          prefix: config/
      versionings:
        - enabled: true
```
{{% /example %}}
{{% example %}}
### Using object lock configuration

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.s3.BucketV2("example", {
    objectLockConfiguration: {
        objectLockEnabled: "Enabled",
        rules: [{
            defaultRetentions: [{
                days: 5,
                mode: "COMPLIANCE",
            }],
        }],
    },
});
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.s3.BucketV2Args;
import com.pulumi.aws.s3.inputs.BucketV2ObjectLockConfigurationArgs;
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
        var example = new BucketV2("example", BucketV2Args.builder()        
            .objectLockConfiguration(BucketV2ObjectLockConfigurationArgs.builder()
                .objectLockEnabled("Enabled")
                .rule(%!v(PANIC=Format method: runtime error: invalid memory address or nil pointer dereference))
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:s3:BucketV2
    properties:
      objectLockConfiguration:
        objectLockEnabled: Enabled
        rule:
          - defaultRetention:
              - days: 5
                mode: COMPLIANCE
```
{{% /example %}}
{{% example %}}
### Using replication configuration

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const central = new aws.Provider("central", {region: "eu-central-1"});
const replicationRole = new aws.iam.Role("replicationRole", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
`});
const destination = new aws.s3.BucketV2("destination", {versionings: [{
    enabled: true,
}]});
const source = new aws.s3.BucketV2("source", {
    acl: "private",
    versionings: [{
        enabled: true,
    }],
    replicationConfigurations: [{
        role: replicationRole.arn,
        rules: [{
            id: "foobar",
            status: "Enabled",
            filters: [{
                tags: {},
            }],
            destinations: [{
                bucket: destination.arn,
                storageClass: "STANDARD",
                replicationTimes: [{
                    status: "Enabled",
                    minutes: 15,
                }],
                metrics: [{
                    status: "Enabled",
                    minutes: 15,
                }],
            }],
        }],
    }],
}, {
    provider: aws.central,
});
const replicationPolicy = new aws.iam.Policy("replicationPolicy", {policy: pulumi.interpolate`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:GetReplicationConfiguration",
        "s3:ListBucket"
      ],
      "Effect": "Allow",
      "Resource": [
        "${source.arn}"
      ]
    },
    {
      "Action": [
        "s3:GetObjectVersionForReplication",
        "s3:GetObjectVersionAcl",
         "s3:GetObjectVersionTagging"
      ],
      "Effect": "Allow",
      "Resource": [
        "${source.arn}/*"
      ]
    },
    {
      "Action": [
        "s3:ReplicateObject",
        "s3:ReplicateDelete",
        "s3:ReplicateTags"
      ],
      "Effect": "Allow",
      "Resource": "${destination.arn}/*"
    }
  ]
}
`});
const replicationRolePolicyAttachment = new aws.iam.RolePolicyAttachment("replicationRolePolicyAttachment", {
    role: replicationRole.name,
    policyArn: replicationPolicy.arn,
});
```
```python
import pulumi
import pulumi_aws as aws

central = aws.Provider("central", region="eu-central-1")
replication_role = aws.iam.Role("replicationRole", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
""")
destination = aws.s3.BucketV2("destination", versionings=[aws.s3.BucketV2VersioningArgs(
    enabled=True,
)])
source = aws.s3.BucketV2("source",
    acl="private",
    versionings=[aws.s3.BucketV2VersioningArgs(
        enabled=True,
    )],
    replication_configurations=[aws.s3.BucketV2ReplicationConfigurationArgs(
        role=replication_role.arn,
        rules=[aws.s3.BucketV2ReplicationConfigurationRuleArgs(
            id="foobar",
            status="Enabled",
            filters=[aws.s3.BucketV2ReplicationConfigurationRuleFilterArgs(
                tags={},
            )],
            destinations=[aws.s3.BucketV2ReplicationConfigurationRuleDestinationArgs(
                bucket=destination.arn,
                storage_class="STANDARD",
                replication_times=[aws.s3.BucketV2ReplicationConfigurationRuleDestinationReplicationTimeArgs(
                    status="Enabled",
                    minutes=15,
                )],
                metrics=[aws.s3.BucketV2ReplicationConfigurationRuleDestinationMetricArgs(
                    status="Enabled",
                    minutes=15,
                )],
            )],
        )],
    )],
    opts=pulumi.ResourceOptions(provider=aws["central"]))
replication_policy = aws.iam.Policy("replicationPolicy", policy=pulumi.Output.all(source.arn, source.arn, destination.arn).apply(lambda sourceArn, sourceArn1, destinationArn: f"""{{
  "Version": "2012-10-17",
  "Statement": [
    {{
      "Action": [
        "s3:GetReplicationConfiguration",
        "s3:ListBucket"
      ],
      "Effect": "Allow",
      "Resource": [
        "{source_arn}"
      ]
    }},
    {{
      "Action": [
        "s3:GetObjectVersionForReplication",
        "s3:GetObjectVersionAcl",
         "s3:GetObjectVersionTagging"
      ],
      "Effect": "Allow",
      "Resource": [
        "{source_arn1}/*"
      ]
    }},
    {{
      "Action": [
        "s3:ReplicateObject",
        "s3:ReplicateDelete",
        "s3:ReplicateTags"
      ],
      "Effect": "Allow",
      "Resource": "{destination_arn}/*"
    }}
  ]
}}
"""))
replication_role_policy_attachment = aws.iam.RolePolicyAttachment("replicationRolePolicyAttachment",
    role=replication_role.name,
    policy_arn=replication_policy.arn)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var central = new Aws.Provider("central", new()
    {
        Region = "eu-central-1",
    });

    var replicationRole = new Aws.Iam.Role("replicationRole", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Action"": ""sts:AssumeRole"",
      ""Principal"": {
        ""Service"": ""s3.amazonaws.com""
      },
      ""Effect"": ""Allow"",
      ""Sid"": """"
    }
  ]
}
",
    });

    var destination = new Aws.S3.BucketV2("destination", new()
    {
        Versionings = new[]
        {
            new Aws.S3.Inputs.BucketV2VersioningArgs
            {
                Enabled = true,
            },
        },
    });

    var source = new Aws.S3.BucketV2("source", new()
    {
        Acl = "private",
        Versionings = new[]
        {
            new Aws.S3.Inputs.BucketV2VersioningArgs
            {
                Enabled = true,
            },
        },
        ReplicationConfigurations = new[]
        {
            new Aws.S3.Inputs.BucketV2ReplicationConfigurationArgs
            {
                Role = replicationRole.Arn,
                Rules = new[]
                {
                    new Aws.S3.Inputs.BucketV2ReplicationConfigurationRuleArgs
                    {
                        Id = "foobar",
                        Status = "Enabled",
                        Filters = new[]
                        {
                            new Aws.S3.Inputs.BucketV2ReplicationConfigurationRuleFilterArgs
                            {
                                Tags = ,
                            },
                        },
                        Destinations = new[]
                        {
                            new Aws.S3.Inputs.BucketV2ReplicationConfigurationRuleDestinationArgs
                            {
                                Bucket = destination.Arn,
                                StorageClass = "STANDARD",
                                ReplicationTimes = new[]
                                {
                                    new Aws.S3.Inputs.BucketV2ReplicationConfigurationRuleDestinationReplicationTimeArgs
                                    {
                                        Status = "Enabled",
                                        Minutes = 15,
                                    },
                                },
                                Metrics = new[]
                                {
                                    new Aws.S3.Inputs.BucketV2ReplicationConfigurationRuleDestinationMetricArgs
                                    {
                                        Status = "Enabled",
                                        Minutes = 15,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    }, new CustomResourceOptions
    {
        Provider = aws.Central,
    });

    var replicationPolicy = new Aws.Iam.Policy("replicationPolicy", new()
    {
        PolicyDocument = Output.Tuple(source.Arn, source.Arn, destination.Arn).Apply(values =>
        {
            var sourceArn = values.Item1;
            var sourceArn1 = values.Item2;
            var destinationArn = values.Item3;
            return @$"{{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {{
      ""Action"": [
        ""s3:GetReplicationConfiguration"",
        ""s3:ListBucket""
      ],
      ""Effect"": ""Allow"",
      ""Resource"": [
        ""{sourceArn}""
      ]
    }},
    {{
      ""Action"": [
        ""s3:GetObjectVersionForReplication"",
        ""s3:GetObjectVersionAcl"",
         ""s3:GetObjectVersionTagging""
      ],
      ""Effect"": ""Allow"",
      ""Resource"": [
        ""{sourceArn1}/*""
      ]
    }},
    {{
      ""Action"": [
        ""s3:ReplicateObject"",
        ""s3:ReplicateDelete"",
        ""s3:ReplicateTags""
      ],
      ""Effect"": ""Allow"",
      ""Resource"": ""{destinationArn}/*""
    }}
  ]
}}
";
        }),
    });

    var replicationRolePolicyAttachment = new Aws.Iam.RolePolicyAttachment("replicationRolePolicyAttachment", new()
    {
        Role = replicationRole.Name,
        PolicyArn = replicationPolicy.Arn,
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := aws.NewProvider(ctx, "central", &aws.ProviderArgs{
			Region: pulumi.String("eu-central-1"),
		})
		if err != nil {
			return err
		}
		replicationRole, err := iam.NewRole(ctx, "replicationRole", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "s3.amazonaws.com"
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
		destination, err := s3.NewBucketV2(ctx, "destination", &s3.BucketV2Args{
			Versionings: s3.BucketV2VersioningArray{
				&s3.BucketV2VersioningArgs{
					Enabled: pulumi.Bool(true),
				},
			},
		})
		if err != nil {
			return err
		}
		source, err := s3.NewBucketV2(ctx, "source", &s3.BucketV2Args{
			Acl: pulumi.String("private"),
			Versionings: s3.BucketV2VersioningArray{
				&s3.BucketV2VersioningArgs{
					Enabled: pulumi.Bool(true),
				},
			},
			ReplicationConfigurations: s3.BucketV2ReplicationConfigurationArray{
				&s3.BucketV2ReplicationConfigurationArgs{
					Role: replicationRole.Arn,
					Rules: s3.BucketV2ReplicationConfigurationRuleArray{
						&s3.BucketV2ReplicationConfigurationRuleArgs{
							Id:     pulumi.String("foobar"),
							Status: pulumi.String("Enabled"),
							Filters: s3.BucketV2ReplicationConfigurationRuleFilterArray{
								&s3.BucketV2ReplicationConfigurationRuleFilterArgs{
									Tags: nil,
								},
							},
							Destinations: s3.BucketV2ReplicationConfigurationRuleDestinationArray{
								&s3.BucketV2ReplicationConfigurationRuleDestinationArgs{
									Bucket:       destination.Arn,
									StorageClass: pulumi.String("STANDARD"),
									ReplicationTimes: s3.BucketV2ReplicationConfigurationRuleDestinationReplicationTimeArray{
										&s3.BucketV2ReplicationConfigurationRuleDestinationReplicationTimeArgs{
											Status:  pulumi.String("Enabled"),
											Minutes: pulumi.Int(15),
										},
									},
									Metrics: s3.BucketV2ReplicationConfigurationRuleDestinationMetricArray{
										&s3.BucketV2ReplicationConfigurationRuleDestinationMetricArgs{
											Status:  pulumi.String("Enabled"),
											Minutes: pulumi.Int(15),
										},
									},
								},
							},
						},
					},
				},
			},
		}, pulumi.Provider(aws.Central))
		if err != nil {
			return err
		}
		replicationPolicy, err := iam.NewPolicy(ctx, "replicationPolicy", &iam.PolicyArgs{
			Policy: pulumi.All(source.Arn, source.Arn, destination.Arn).ApplyT(func(_args []interface{}) (string, error) {
				sourceArn := _args[0].(string)
				sourceArn1 := _args[1].(string)
				destinationArn := _args[2].(string)
				return fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:GetReplicationConfiguration",
        "s3:ListBucket"
      ],
      "Effect": "Allow",
      "Resource": [
        "%v"
      ]
    },
    {
      "Action": [
        "s3:GetObjectVersionForReplication",
        "s3:GetObjectVersionAcl",
         "s3:GetObjectVersionTagging"
      ],
      "Effect": "Allow",
      "Resource": [
        "%v/*"
      ]
    },
    {
      "Action": [
        "s3:ReplicateObject",
        "s3:ReplicateDelete",
        "s3:ReplicateTags"
      ],
      "Effect": "Allow",
      "Resource": "%v/*"
    }
  ]
}
`, sourceArn, sourceArn1, destinationArn), nil
			}).(pulumi.StringOutput),
		})
		if err != nil {
			return err
		}
		_, err = iam.NewRolePolicyAttachment(ctx, "replicationRolePolicyAttachment", &iam.RolePolicyAttachmentArgs{
			Role:      replicationRole.Name,
			PolicyArn: replicationPolicy.Arn,
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
import com.pulumi.aws.Provider;
import com.pulumi.aws.ProviderArgs;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.s3.BucketV2Args;
import com.pulumi.aws.s3.inputs.BucketV2VersioningArgs;
import com.pulumi.aws.s3.inputs.BucketV2ReplicationConfigurationArgs;
import com.pulumi.aws.iam.Policy;
import com.pulumi.aws.iam.PolicyArgs;
import com.pulumi.aws.iam.RolePolicyAttachment;
import com.pulumi.aws.iam.RolePolicyAttachmentArgs;
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
        var central = new Provider("central", ProviderArgs.builder()        
            .region("eu-central-1")
            .build());

        var replicationRole = new Role("replicationRole", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
            """)
            .build());

        var destination = new BucketV2("destination", BucketV2Args.builder()        
            .versionings(BucketV2VersioningArgs.builder()
                .enabled(true)
                .build())
            .build());

        var source = new BucketV2("source", BucketV2Args.builder()        
            .acl("private")
            .versionings(BucketV2VersioningArgs.builder()
                .enabled(true)
                .build())
            .replicationConfigurations(BucketV2ReplicationConfigurationArgs.builder()
                .role(replicationRole.arn())
                .rules(BucketV2ReplicationConfigurationRuleArgs.builder()
                    .id("foobar")
                    .status("Enabled")
                    .filters(BucketV2ReplicationConfigurationRuleFilterArgs.builder()
                        .tags()
                        .build())
                    .destinations(BucketV2ReplicationConfigurationRuleDestinationArgs.builder()
                        .bucket(destination.arn())
                        .storageClass("STANDARD")
                        .replicationTimes(BucketV2ReplicationConfigurationRuleDestinationReplicationTimeArgs.builder()
                            .status("Enabled")
                            .minutes(15)
                            .build())
                        .metrics(BucketV2ReplicationConfigurationRuleDestinationMetricArgs.builder()
                            .status("Enabled")
                            .minutes(15)
                            .build())
                        .build())
                    .build())
                .build())
            .build(), CustomResourceOptions.builder()
                .provider(aws.central())
                .build());

        var replicationPolicy = new Policy("replicationPolicy", PolicyArgs.builder()        
            .policy(Output.tuple(source.arn(), source.arn(), destination.arn()).applyValue(values -> {
                var sourceArn = values.t1;
                var sourceArn1 = values.t2;
                var destinationArn = values.t3;
                return """
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:GetReplicationConfiguration",
        "s3:ListBucket"
      ],
      "Effect": "Allow",
      "Resource": [
        "%s"
      ]
    },
    {
      "Action": [
        "s3:GetObjectVersionForReplication",
        "s3:GetObjectVersionAcl",
         "s3:GetObjectVersionTagging"
      ],
      "Effect": "Allow",
      "Resource": [
        "%s/*"
      ]
    },
    {
      "Action": [
        "s3:ReplicateObject",
        "s3:ReplicateDelete",
        "s3:ReplicateTags"
      ],
      "Effect": "Allow",
      "Resource": "%s/*"
    }
  ]
}
", sourceArn,sourceArn1,destinationArn);
            }))
            .build());

        var replicationRolePolicyAttachment = new RolePolicyAttachment("replicationRolePolicyAttachment", RolePolicyAttachmentArgs.builder()        
            .role(replicationRole.name())
            .policyArn(replicationPolicy.arn())
            .build());

    }
}
```
```yaml
resources:
  central:
    type: pulumi:providers:aws
    properties:
      region: eu-central-1
  replicationRole:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Principal": {
                "Service": "s3.amazonaws.com"
              },
              "Effect": "Allow",
              "Sid": ""
            }
          ]
        }
  replicationPolicy:
    type: aws:iam:Policy
    properties:
      policy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": [
                "s3:GetReplicationConfiguration",
                "s3:ListBucket"
              ],
              "Effect": "Allow",
              "Resource": [
                "${source.arn}"
              ]
            },
            {
              "Action": [
                "s3:GetObjectVersionForReplication",
                "s3:GetObjectVersionAcl",
                 "s3:GetObjectVersionTagging"
              ],
              "Effect": "Allow",
              "Resource": [
                "${source.arn}/*"
              ]
            },
            {
              "Action": [
                "s3:ReplicateObject",
                "s3:ReplicateDelete",
                "s3:ReplicateTags"
              ],
              "Effect": "Allow",
              "Resource": "${destination.arn}/*"
            }
          ]
        }
  replicationRolePolicyAttachment:
    type: aws:iam:RolePolicyAttachment
    properties:
      role: ${replicationRole.name}
      policyArn: ${replicationPolicy.arn}
  destination:
    type: aws:s3:BucketV2
    properties:
      versionings:
        - enabled: true
  source:
    type: aws:s3:BucketV2
    properties:
      acl: private
      versionings:
        - enabled: true
      replicationConfigurations:
        - role: ${replicationRole.arn}
          rules:
            - id: foobar
              status: Enabled
              filters:
                - tags: {}
              destinations:
                - bucket: ${destination.arn}
                  storageClass: STANDARD
                  replicationTimes:
                    - status: Enabled
                      minutes: 15
                  metrics:
                    - status: Enabled
                      minutes: 15
    options:
      provider: ${aws.central}
```
{{% /example %}}
{{% example %}}
### Enable Default Server Side Encryption

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const mykey = new aws.kms.Key("mykey", {
    description: "This key is used to encrypt bucket objects",
    deletionWindowInDays: 10,
});
const mybucket = new aws.s3.BucketV2("mybucket", {serverSideEncryptionConfigurations: [{
    rules: [{
        applyServerSideEncryptionByDefaults: [{
            kmsMasterKeyId: mykey.arn,
            sseAlgorithm: "aws:kms",
        }],
    }],
}]});
```
```python
import pulumi
import pulumi_aws as aws

mykey = aws.kms.Key("mykey",
    description="This key is used to encrypt bucket objects",
    deletion_window_in_days=10)
mybucket = aws.s3.BucketV2("mybucket", server_side_encryption_configurations=[aws.s3.BucketV2ServerSideEncryptionConfigurationArgs(
    rules=[aws.s3.BucketV2ServerSideEncryptionConfigurationRuleArgs(
        apply_server_side_encryption_by_defaults=[aws.s3.BucketV2ServerSideEncryptionConfigurationRuleApplyServerSideEncryptionByDefaultArgs(
            kms_master_key_id=mykey.arn,
            sse_algorithm="aws:kms",
        )],
    )],
)])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var mykey = new Aws.Kms.Key("mykey", new()
    {
        Description = "This key is used to encrypt bucket objects",
        DeletionWindowInDays = 10,
    });

    var mybucket = new Aws.S3.BucketV2("mybucket", new()
    {
        ServerSideEncryptionConfigurations = new[]
        {
            new Aws.S3.Inputs.BucketV2ServerSideEncryptionConfigurationArgs
            {
                Rules = new[]
                {
                    new Aws.S3.Inputs.BucketV2ServerSideEncryptionConfigurationRuleArgs
                    {
                        ApplyServerSideEncryptionByDefaults = new[]
                        {
                            new Aws.S3.Inputs.BucketV2ServerSideEncryptionConfigurationRuleApplyServerSideEncryptionByDefaultArgs
                            {
                                KmsMasterKeyId = mykey.Arn,
                                SseAlgorithm = "aws:kms",
                            },
                        },
                    },
                },
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/kms"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		mykey, err := kms.NewKey(ctx, "mykey", &kms.KeyArgs{
			Description:          pulumi.String("This key is used to encrypt bucket objects"),
			DeletionWindowInDays: pulumi.Int(10),
		})
		if err != nil {
			return err
		}
		_, err = s3.NewBucketV2(ctx, "mybucket", &s3.BucketV2Args{
			ServerSideEncryptionConfigurations: s3.BucketV2ServerSideEncryptionConfigurationArray{
				&s3.BucketV2ServerSideEncryptionConfigurationArgs{
					Rules: s3.BucketV2ServerSideEncryptionConfigurationRuleArray{
						&s3.BucketV2ServerSideEncryptionConfigurationRuleArgs{
							ApplyServerSideEncryptionByDefaults: s3.BucketV2ServerSideEncryptionConfigurationRuleApplyServerSideEncryptionByDefaultArray{
								&s3.BucketV2ServerSideEncryptionConfigurationRuleApplyServerSideEncryptionByDefaultArgs{
									KmsMasterKeyId: mykey.Arn,
									SseAlgorithm:   pulumi.String("aws:kms"),
								},
							},
						},
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
import com.pulumi.aws.kms.Key;
import com.pulumi.aws.kms.KeyArgs;
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.s3.BucketV2Args;
import com.pulumi.aws.s3.inputs.BucketV2ServerSideEncryptionConfigurationArgs;
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
        var mykey = new Key("mykey", KeyArgs.builder()        
            .description("This key is used to encrypt bucket objects")
            .deletionWindowInDays(10)
            .build());

        var mybucket = new BucketV2("mybucket", BucketV2Args.builder()        
            .serverSideEncryptionConfigurations(BucketV2ServerSideEncryptionConfigurationArgs.builder()
                .rules(BucketV2ServerSideEncryptionConfigurationRuleArgs.builder()
                    .applyServerSideEncryptionByDefaults(BucketV2ServerSideEncryptionConfigurationRuleApplyServerSideEncryptionByDefaultArgs.builder()
                        .kmsMasterKeyId(mykey.arn())
                        .sseAlgorithm("aws:kms")
                        .build())
                    .build())
                .build())
            .build());

    }
}
```
```yaml
resources:
  mykey:
    type: aws:kms:Key
    properties:
      description: This key is used to encrypt bucket objects
      deletionWindowInDays: 10
  mybucket:
    type: aws:s3:BucketV2
    properties:
      serverSideEncryptionConfigurations:
        - rules:
            - applyServerSideEncryptionByDefaults:
                - kmsMasterKeyId: ${mykey.arn}
                  sseAlgorithm: aws:kms
```
{{% /example %}}
{{% example %}}
### Using ACL policy grants

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const currentUser = aws.s3.getCanonicalUserId({});
const bucket = new aws.s3.BucketV2("bucket", {grants: [
    {
        id: currentUser.then(currentUser => currentUser.id),
        type: "CanonicalUser",
        permissions: ["FULL_CONTROL"],
    },
    {
        type: "Group",
        permissions: [
            "READ_ACP",
            "WRITE",
        ],
        uri: "http://acs.amazonaws.com/groups/s3/LogDelivery",
    },
]});
```
```python
import pulumi
import pulumi_aws as aws

current_user = aws.s3.get_canonical_user_id()
bucket = aws.s3.BucketV2("bucket", grants=[
    aws.s3.BucketV2GrantArgs(
        id=current_user.id,
        type="CanonicalUser",
        permissions=["FULL_CONTROL"],
    ),
    aws.s3.BucketV2GrantArgs(
        type="Group",
        permissions=[
            "READ_ACP",
            "WRITE",
        ],
        uri="http://acs.amazonaws.com/groups/s3/LogDelivery",
    ),
])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var currentUser = Aws.S3.GetCanonicalUserId.Invoke();

    var bucket = new Aws.S3.BucketV2("bucket", new()
    {
        Grants = new[]
        {
            new Aws.S3.Inputs.BucketV2GrantArgs
            {
                Id = currentUser.Apply(getCanonicalUserIdResult => getCanonicalUserIdResult.Id),
                Type = "CanonicalUser",
                Permissions = new[]
                {
                    "FULL_CONTROL",
                },
            },
            new Aws.S3.Inputs.BucketV2GrantArgs
            {
                Type = "Group",
                Permissions = new[]
                {
                    "READ_ACP",
                    "WRITE",
                },
                Uri = "http://acs.amazonaws.com/groups/s3/LogDelivery",
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
		currentUser, err := s3.GetCanonicalUserId(ctx, nil, nil)
		if err != nil {
			return err
		}
		_, err = s3.NewBucketV2(ctx, "bucket", &s3.BucketV2Args{
			Grants: s3.BucketV2GrantArray{
				&s3.BucketV2GrantArgs{
					Id:   pulumi.String(currentUser.Id),
					Type: pulumi.String("CanonicalUser"),
					Permissions: pulumi.StringArray{
						pulumi.String("FULL_CONTROL"),
					},
				},
				&s3.BucketV2GrantArgs{
					Type: pulumi.String("Group"),
					Permissions: pulumi.StringArray{
						pulumi.String("READ_ACP"),
						pulumi.String("WRITE"),
					},
					Uri: pulumi.String("http://acs.amazonaws.com/groups/s3/LogDelivery"),
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
import com.pulumi.aws.s3.S3Functions;
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.s3.BucketV2Args;
import com.pulumi.aws.s3.inputs.BucketV2GrantArgs;
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
        final var currentUser = S3Functions.getCanonicalUserId();

        var bucket = new BucketV2("bucket", BucketV2Args.builder()        
            .grants(            
                BucketV2GrantArgs.builder()
                    .id(currentUser.applyValue(getCanonicalUserIdResult -> getCanonicalUserIdResult.id()))
                    .type("CanonicalUser")
                    .permissions("FULL_CONTROL")
                    .build(),
                BucketV2GrantArgs.builder()
                    .type("Group")
                    .permissions(                    
                        "READ_ACP",
                        "WRITE")
                    .uri("http://acs.amazonaws.com/groups/s3/LogDelivery")
                    .build())
            .build());

    }
}
```
```yaml
resources:
  bucket:
    type: aws:s3:BucketV2
    properties:
      grants:
        - id: ${currentUser.id}
          type: CanonicalUser
          permissions:
            - FULL_CONTROL
        - type: Group
          permissions:
            - READ_ACP
            - WRITE
          uri: http://acs.amazonaws.com/groups/s3/LogDelivery
variables:
  currentUser:
    Fn::Invoke:
      Function: aws:s3:getCanonicalUserId
      Arguments: {}
```
{{% /example %}}
{{% /examples %}}

## Import

S3 bucket can be imported using the `bucket`, e.g.,

```sh
 $ pulumi import aws:s3/bucketV2:BucketV2 bucket bucket-name
```

 
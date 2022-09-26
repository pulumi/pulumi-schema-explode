Provides a S3 bucket resource.

> This functionality is for managing S3 in an AWS Partition. To manage [S3 on Outposts](https://docs.aws.amazon.com/AmazonS3/latest/dev/S3onOutposts.html), see the `aws.s3control.Bucket` resource.

{{% examples %}}
## Example Usage
{{% example %}}
### Private Bucket w/ Tags

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bucket = new aws.s3.Bucket("b", {
    acl: "private",
    tags: {
        Environment: "Dev",
        Name: "My bucket",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

bucket = aws.s3.Bucket("bucket",
    acl="private",
    tags={
        "Environment": "Dev",
        "Name": "My bucket",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var bucket = new Aws.S3.Bucket("bucket", new()
    {
        Acl = "private",
        Tags = 
        {
            { "Environment", "Dev" },
            { "Name", "My bucket" },
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
		_, err := s3.NewBucket(ctx, "bucket", &s3.BucketArgs{
			Acl: pulumi.String("private"),
			Tags: pulumi.StringMap{
				"Environment": pulumi.String("Dev"),
				"Name":        pulumi.String("My bucket"),
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
import com.pulumi.aws.s3.Bucket;
import com.pulumi.aws.s3.BucketArgs;
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
        var bucket = new Bucket("bucket", BucketArgs.builder()        
            .acl("private")
            .tags(Map.ofEntries(
                Map.entry("Environment", "Dev"),
                Map.entry("Name", "My bucket")
            ))
            .build());

    }
}
```
```yaml
resources:
  bucket:
    type: aws:s3:Bucket
    properties:
      acl: private
      tags:
        Environment: Dev
        Name: My bucket
```
{{% /example %}}
{{% example %}}
### Static Website Hosting

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as fs from "fs";

const bucket = new aws.s3.Bucket("bucket", {
    acl: "public-read",
    policy: fs.readFileSync("policy.json"),
    website: {
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
    },
});
```
```python
import pulumi
import pulumi_aws as aws

bucket = aws.s3.Bucket("bucket",
    acl="public-read",
    policy=(lambda path: open(path).read())("policy.json"),
    website=aws.s3.BucketWebsiteArgs(
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
    ))
```
```csharp
using System.Collections.Generic;
using System.IO;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var bucket = new Aws.S3.Bucket("bucket", new()
    {
        Acl = "public-read",
        Policy = File.ReadAllText("policy.json"),
        Website = new Aws.S3.Inputs.BucketWebsiteArgs
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
    });

});
```
```go
package main

import (
	"fmt"
	"io/ioutil"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
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
		_, err := s3.NewBucket(ctx, "bucket", &s3.BucketArgs{
			Acl:    pulumi.String("public-read"),
			Policy: readFileOrPanic("policy.json"),
			Website: &s3.BucketWebsiteArgs{
				IndexDocument: pulumi.String("index.html"),
				ErrorDocument: pulumi.String("error.html"),
				RoutingRules: pulumi.Any(fmt.Sprintf(`[{
    "Condition": {
        "KeyPrefixEquals": "docs/"
    },
    "Redirect": {
        "ReplaceKeyPrefixWith": "documents/"
    }
}]
`)),
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
import com.pulumi.aws.s3.Bucket;
import com.pulumi.aws.s3.BucketArgs;
import com.pulumi.aws.s3.inputs.BucketWebsiteArgs;
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
        var bucket = new Bucket("bucket", BucketArgs.builder()        
            .acl("public-read")
            .policy(Files.readString(Paths.get("policy.json")))
            .website(BucketWebsiteArgs.builder()
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

const bucket = new aws.s3.Bucket("b", {
    acl: "public-read",
    corsRules: [{
        allowedHeaders: ["*"],
        allowedMethods: [
            "PUT",
            "POST",
        ],
        allowedOrigins: ["https://s3-website-test.mydomain.com"],
        exposeHeaders: ["ETag"],
        maxAgeSeconds: 3000,
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

bucket = aws.s3.Bucket("bucket",
    acl="public-read",
    cors_rules=[aws.s3.BucketCorsRuleArgs(
        allowed_headers=["*"],
        allowed_methods=[
            "PUT",
            "POST",
        ],
        allowed_origins=["https://s3-website-test.mydomain.com"],
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
    var bucket = new Aws.S3.Bucket("bucket", new()
    {
        Acl = "public-read",
        CorsRules = new[]
        {
            new Aws.S3.Inputs.BucketCorsRuleArgs
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
                    "https://s3-website-test.mydomain.com",
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
		_, err := s3.NewBucket(ctx, "bucket", &s3.BucketArgs{
			Acl: pulumi.String("public-read"),
			CorsRules: s3.BucketCorsRuleArray{
				&s3.BucketCorsRuleArgs{
					AllowedHeaders: pulumi.StringArray{
						pulumi.String("*"),
					},
					AllowedMethods: pulumi.StringArray{
						pulumi.String("PUT"),
						pulumi.String("POST"),
					},
					AllowedOrigins: pulumi.StringArray{
						pulumi.String("https://s3-website-test.mydomain.com"),
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
import com.pulumi.aws.s3.Bucket;
import com.pulumi.aws.s3.BucketArgs;
import com.pulumi.aws.s3.inputs.BucketCorsRuleArgs;
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
        var bucket = new Bucket("bucket", BucketArgs.builder()        
            .acl("public-read")
            .corsRules(BucketCorsRuleArgs.builder()
                .allowedHeaders("*")
                .allowedMethods(                
                    "PUT",
                    "POST")
                .allowedOrigins("https://s3-website-test.mydomain.com")
                .exposeHeaders("ETag")
                .maxAgeSeconds(3000)
                .build())
            .build());

    }
}
```
```yaml
resources:
  bucket:
    type: aws:s3:Bucket
    properties:
      acl: public-read
      corsRules:
        - allowedHeaders:
            - '*'
          allowedMethods:
            - PUT
            - POST
          allowedOrigins:
            - https://s3-website-test.mydomain.com
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

const bucket = new aws.s3.Bucket("b", {
    acl: "private",
    versioning: {
        enabled: true,
    },
});
```
```python
import pulumi
import pulumi_aws as aws

bucket = aws.s3.Bucket("bucket",
    acl="private",
    versioning=aws.s3.BucketVersioningArgs(
        enabled=True,
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var bucket = new Aws.S3.Bucket("bucket", new()
    {
        Acl = "private",
        Versioning = new Aws.S3.Inputs.BucketVersioningArgs
        {
            Enabled = true,
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
		_, err := s3.NewBucket(ctx, "bucket", &s3.BucketArgs{
			Acl: pulumi.String("private"),
			Versioning: &s3.BucketVersioningArgs{
				Enabled: pulumi.Bool(true),
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
import com.pulumi.aws.s3.Bucket;
import com.pulumi.aws.s3.BucketArgs;
import com.pulumi.aws.s3.inputs.BucketVersioningArgs;
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
        var bucket = new Bucket("bucket", BucketArgs.builder()        
            .acl("private")
            .versioning(BucketVersioningArgs.builder()
                .enabled(true)
                .build())
            .build());

    }
}
```
```yaml
resources:
  bucket:
    type: aws:s3:Bucket
    properties:
      acl: private
      versioning:
        enabled: true
```
{{% /example %}}
{{% example %}}
### Enable Logging

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const logBucket = new aws.s3.Bucket("logBucket", {acl: "log-delivery-write"});
const bucket = new aws.s3.Bucket("bucket", {
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

log_bucket = aws.s3.Bucket("logBucket", acl="log-delivery-write")
bucket = aws.s3.Bucket("bucket",
    acl="private",
    loggings=[aws.s3.BucketLoggingArgs(
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
    var logBucket = new Aws.S3.Bucket("logBucket", new()
    {
        Acl = "log-delivery-write",
    });

    var bucket = new Aws.S3.Bucket("bucket", new()
    {
        Acl = "private",
        Loggings = new[]
        {
            new Aws.S3.Inputs.BucketLoggingArgs
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
		logBucket, err := s3.NewBucket(ctx, "logBucket", &s3.BucketArgs{
			Acl: pulumi.String("log-delivery-write"),
		})
		if err != nil {
			return err
		}
		_, err = s3.NewBucket(ctx, "bucket", &s3.BucketArgs{
			Acl: pulumi.String("private"),
			Loggings: s3.BucketLoggingArray{
				&s3.BucketLoggingArgs{
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
import com.pulumi.aws.s3.Bucket;
import com.pulumi.aws.s3.BucketArgs;
import com.pulumi.aws.s3.inputs.BucketLoggingArgs;
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
        var logBucket = new Bucket("logBucket", BucketArgs.builder()        
            .acl("log-delivery-write")
            .build());

        var bucket = new Bucket("bucket", BucketArgs.builder()        
            .acl("private")
            .loggings(BucketLoggingArgs.builder()
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
    type: aws:s3:Bucket
    properties:
      acl: log-delivery-write
  bucket:
    type: aws:s3:Bucket
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

const bucket = new aws.s3.Bucket("bucket", {
    acl: "private",
    lifecycleRules: [
        {
            enabled: true,
            expiration: {
                days: 90,
            },
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
            expiration: {
                date: "2016-01-12",
            },
            id: "tmp",
            prefix: "tmp/",
        },
    ],
});
const versioningBucket = new aws.s3.Bucket("versioning_bucket", {
    acl: "private",
    lifecycleRules: [{
        enabled: true,
        noncurrentVersionExpiration: {
            days: 90,
        },
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
    versioning: {
        enabled: true,
    },
});
```
```python
import pulumi
import pulumi_aws as aws

bucket = aws.s3.Bucket("bucket",
    acl="private",
    lifecycle_rules=[
        aws.s3.BucketLifecycleRuleArgs(
            enabled=True,
            expiration=aws.s3.BucketLifecycleRuleExpirationArgs(
                days=90,
            ),
            id="log",
            prefix="log/",
            tags={
                "autoclean": "true",
                "rule": "log",
            },
            transitions=[
                aws.s3.BucketLifecycleRuleTransitionArgs(
                    days=30,
                    storage_class="STANDARD_IA",
                ),
                aws.s3.BucketLifecycleRuleTransitionArgs(
                    days=60,
                    storage_class="GLACIER",
                ),
            ],
        ),
        aws.s3.BucketLifecycleRuleArgs(
            enabled=True,
            expiration=aws.s3.BucketLifecycleRuleExpirationArgs(
                date="2016-01-12",
            ),
            id="tmp",
            prefix="tmp/",
        ),
    ])
versioning_bucket = aws.s3.Bucket("versioningBucket",
    acl="private",
    lifecycle_rules=[aws.s3.BucketLifecycleRuleArgs(
        enabled=True,
        noncurrent_version_expiration=aws.s3.BucketLifecycleRuleNoncurrentVersionExpirationArgs(
            days=90,
        ),
        noncurrent_version_transitions=[
            aws.s3.BucketLifecycleRuleNoncurrentVersionTransitionArgs(
                days=30,
                storage_class="STANDARD_IA",
            ),
            aws.s3.BucketLifecycleRuleNoncurrentVersionTransitionArgs(
                days=60,
                storage_class="GLACIER",
            ),
        ],
        prefix="config/",
    )],
    versioning=aws.s3.BucketVersioningArgs(
        enabled=True,
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var bucket = new Aws.S3.Bucket("bucket", new()
    {
        Acl = "private",
        LifecycleRules = new[]
        {
            new Aws.S3.Inputs.BucketLifecycleRuleArgs
            {
                Enabled = true,
                Expiration = new Aws.S3.Inputs.BucketLifecycleRuleExpirationArgs
                {
                    Days = 90,
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
                    new Aws.S3.Inputs.BucketLifecycleRuleTransitionArgs
                    {
                        Days = 30,
                        StorageClass = "STANDARD_IA",
                    },
                    new Aws.S3.Inputs.BucketLifecycleRuleTransitionArgs
                    {
                        Days = 60,
                        StorageClass = "GLACIER",
                    },
                },
            },
            new Aws.S3.Inputs.BucketLifecycleRuleArgs
            {
                Enabled = true,
                Expiration = new Aws.S3.Inputs.BucketLifecycleRuleExpirationArgs
                {
                    Date = "2016-01-12",
                },
                Id = "tmp",
                Prefix = "tmp/",
            },
        },
    });

    var versioningBucket = new Aws.S3.Bucket("versioningBucket", new()
    {
        Acl = "private",
        LifecycleRules = new[]
        {
            new Aws.S3.Inputs.BucketLifecycleRuleArgs
            {
                Enabled = true,
                NoncurrentVersionExpiration = new Aws.S3.Inputs.BucketLifecycleRuleNoncurrentVersionExpirationArgs
                {
                    Days = 90,
                },
                NoncurrentVersionTransitions = new[]
                {
                    new Aws.S3.Inputs.BucketLifecycleRuleNoncurrentVersionTransitionArgs
                    {
                        Days = 30,
                        StorageClass = "STANDARD_IA",
                    },
                    new Aws.S3.Inputs.BucketLifecycleRuleNoncurrentVersionTransitionArgs
                    {
                        Days = 60,
                        StorageClass = "GLACIER",
                    },
                },
                Prefix = "config/",
            },
        },
        Versioning = new Aws.S3.Inputs.BucketVersioningArgs
        {
            Enabled = true,
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
		_, err := s3.NewBucket(ctx, "bucket", &s3.BucketArgs{
			Acl: pulumi.String("private"),
			LifecycleRules: s3.BucketLifecycleRuleArray{
				&s3.BucketLifecycleRuleArgs{
					Enabled: pulumi.Bool(true),
					Expiration: &s3.BucketLifecycleRuleExpirationArgs{
						Days: pulumi.Int(90),
					},
					Id:     pulumi.String("log"),
					Prefix: pulumi.String("log/"),
					Tags: pulumi.StringMap{
						"autoclean": pulumi.String("true"),
						"rule":      pulumi.String("log"),
					},
					Transitions: s3.BucketLifecycleRuleTransitionArray{
						&s3.BucketLifecycleRuleTransitionArgs{
							Days:         pulumi.Int(30),
							StorageClass: pulumi.String("STANDARD_IA"),
						},
						&s3.BucketLifecycleRuleTransitionArgs{
							Days:         pulumi.Int(60),
							StorageClass: pulumi.String("GLACIER"),
						},
					},
				},
				&s3.BucketLifecycleRuleArgs{
					Enabled: pulumi.Bool(true),
					Expiration: &s3.BucketLifecycleRuleExpirationArgs{
						Date: pulumi.String("2016-01-12"),
					},
					Id:     pulumi.String("tmp"),
					Prefix: pulumi.String("tmp/"),
				},
			},
		})
		if err != nil {
			return err
		}
		_, err = s3.NewBucket(ctx, "versioningBucket", &s3.BucketArgs{
			Acl: pulumi.String("private"),
			LifecycleRules: s3.BucketLifecycleRuleArray{
				&s3.BucketLifecycleRuleArgs{
					Enabled: pulumi.Bool(true),
					NoncurrentVersionExpiration: &s3.BucketLifecycleRuleNoncurrentVersionExpirationArgs{
						Days: pulumi.Int(90),
					},
					NoncurrentVersionTransitions: s3.BucketLifecycleRuleNoncurrentVersionTransitionArray{
						&s3.BucketLifecycleRuleNoncurrentVersionTransitionArgs{
							Days:         pulumi.Int(30),
							StorageClass: pulumi.String("STANDARD_IA"),
						},
						&s3.BucketLifecycleRuleNoncurrentVersionTransitionArgs{
							Days:         pulumi.Int(60),
							StorageClass: pulumi.String("GLACIER"),
						},
					},
					Prefix: pulumi.String("config/"),
				},
			},
			Versioning: &s3.BucketVersioningArgs{
				Enabled: pulumi.Bool(true),
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
import com.pulumi.aws.s3.Bucket;
import com.pulumi.aws.s3.BucketArgs;
import com.pulumi.aws.s3.inputs.BucketLifecycleRuleArgs;
import com.pulumi.aws.s3.inputs.BucketLifecycleRuleExpirationArgs;
import com.pulumi.aws.s3.inputs.BucketLifecycleRuleNoncurrentVersionExpirationArgs;
import com.pulumi.aws.s3.inputs.BucketVersioningArgs;
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
        var bucket = new Bucket("bucket", BucketArgs.builder()        
            .acl("private")
            .lifecycleRules(            
                BucketLifecycleRuleArgs.builder()
                    .enabled(true)
                    .expiration(BucketLifecycleRuleExpirationArgs.builder()
                        .days(90)
                        .build())
                    .id("log")
                    .prefix("log/")
                    .tags(Map.ofEntries(
                        Map.entry("autoclean", "true"),
                        Map.entry("rule", "log")
                    ))
                    .transitions(                    
                        BucketLifecycleRuleTransitionArgs.builder()
                            .days(30)
                            .storageClass("STANDARD_IA")
                            .build(),
                        BucketLifecycleRuleTransitionArgs.builder()
                            .days(60)
                            .storageClass("GLACIER")
                            .build())
                    .build(),
                BucketLifecycleRuleArgs.builder()
                    .enabled(true)
                    .expiration(BucketLifecycleRuleExpirationArgs.builder()
                        .date("2016-01-12")
                        .build())
                    .id("tmp")
                    .prefix("tmp/")
                    .build())
            .build());

        var versioningBucket = new Bucket("versioningBucket", BucketArgs.builder()        
            .acl("private")
            .lifecycleRules(BucketLifecycleRuleArgs.builder()
                .enabled(true)
                .noncurrentVersionExpiration(BucketLifecycleRuleNoncurrentVersionExpirationArgs.builder()
                    .days(90)
                    .build())
                .noncurrentVersionTransitions(                
                    BucketLifecycleRuleNoncurrentVersionTransitionArgs.builder()
                        .days(30)
                        .storageClass("STANDARD_IA")
                        .build(),
                    BucketLifecycleRuleNoncurrentVersionTransitionArgs.builder()
                        .days(60)
                        .storageClass("GLACIER")
                        .build())
                .prefix("config/")
                .build())
            .versioning(BucketVersioningArgs.builder()
                .enabled(true)
                .build())
            .build());

    }
}
```
```yaml
resources:
  bucket:
    type: aws:s3:Bucket
    properties:
      acl: private
      lifecycleRules:
        - enabled: true
          expiration:
            days: 90
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
          expiration:
            date: 2016-01-12
          id: tmp
          prefix: tmp/
  versioningBucket:
    type: aws:s3:Bucket
    properties:
      acl: private
      lifecycleRules:
        - enabled: true
          noncurrentVersionExpiration:
            days: 90
          noncurrentVersionTransitions:
            - days: 30
              storageClass: STANDARD_IA
            - days: 60
              storageClass: GLACIER
          prefix: config/
      versioning:
        enabled: true
```
{{% /example %}}
{{% example %}}
### Using replication configuration

> **NOTE:** See the `aws.s3.BucketReplicationConfig` resource to support bi-directional replication configuration and additional features.

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
const destination = new aws.s3.Bucket("destination", {versioning: {
    enabled: true,
}});
const source = new aws.s3.Bucket("source", {
    acl: "private",
    versioning: {
        enabled: true,
    },
    replicationConfiguration: {
        role: replicationRole.arn,
        rules: [{
            id: "foobar",
            status: "Enabled",
            filter: {
                tags: {},
            },
            destination: {
                bucket: destination.arn,
                storageClass: "STANDARD",
                replicationTime: {
                    status: "Enabled",
                    minutes: 15,
                },
                metrics: {
                    status: "Enabled",
                    minutes: 15,
                },
            },
        }],
    },
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
destination = aws.s3.Bucket("destination", versioning=aws.s3.BucketVersioningArgs(
    enabled=True,
))
source = aws.s3.Bucket("source",
    acl="private",
    versioning=aws.s3.BucketVersioningArgs(
        enabled=True,
    ),
    replication_configuration=aws.s3.BucketReplicationConfigurationArgs(
        role=replication_role.arn,
        rules=[aws.s3.BucketReplicationConfigurationRuleArgs(
            id="foobar",
            status="Enabled",
            filter=aws.s3.BucketReplicationConfigurationRuleFilterArgs(
                tags={},
            ),
            destination=aws.s3.BucketReplicationConfigurationRuleDestinationArgs(
                bucket=destination.arn,
                storage_class="STANDARD",
                replication_time=aws.s3.BucketReplicationConfigurationRuleDestinationReplicationTimeArgs(
                    status="Enabled",
                    minutes=15,
                ),
                metrics=aws.s3.BucketReplicationConfigurationRuleDestinationMetricsArgs(
                    status="Enabled",
                    minutes=15,
                ),
            ),
        )],
    ),
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

    var destination = new Aws.S3.Bucket("destination", new()
    {
        Versioning = new Aws.S3.Inputs.BucketVersioningArgs
        {
            Enabled = true,
        },
    });

    var source = new Aws.S3.Bucket("source", new()
    {
        Acl = "private",
        Versioning = new Aws.S3.Inputs.BucketVersioningArgs
        {
            Enabled = true,
        },
        ReplicationConfiguration = new Aws.S3.Inputs.BucketReplicationConfigurationArgs
        {
            Role = replicationRole.Arn,
            Rules = new[]
            {
                new Aws.S3.Inputs.BucketReplicationConfigurationRuleArgs
                {
                    Id = "foobar",
                    Status = "Enabled",
                    Filter = new Aws.S3.Inputs.BucketReplicationConfigurationRuleFilterArgs
                    {
                        Tags = ,
                    },
                    Destination = new Aws.S3.Inputs.BucketReplicationConfigurationRuleDestinationArgs
                    {
                        Bucket = destination.Arn,
                        StorageClass = "STANDARD",
                        ReplicationTime = new Aws.S3.Inputs.BucketReplicationConfigurationRuleDestinationReplicationTimeArgs
                        {
                            Status = "Enabled",
                            Minutes = 15,
                        },
                        Metrics = new Aws.S3.Inputs.BucketReplicationConfigurationRuleDestinationMetricsArgs
                        {
                            Status = "Enabled",
                            Minutes = 15,
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
		destination, err := s3.NewBucket(ctx, "destination", &s3.BucketArgs{
			Versioning: &s3.BucketVersioningArgs{
				Enabled: pulumi.Bool(true),
			},
		})
		if err != nil {
			return err
		}
		source, err := s3.NewBucket(ctx, "source", &s3.BucketArgs{
			Acl: pulumi.String("private"),
			Versioning: &s3.BucketVersioningArgs{
				Enabled: pulumi.Bool(true),
			},
			ReplicationConfiguration: &s3.BucketReplicationConfigurationArgs{
				Role: replicationRole.Arn,
				Rules: s3.BucketReplicationConfigurationRuleArray{
					&s3.BucketReplicationConfigurationRuleArgs{
						Id:     pulumi.String("foobar"),
						Status: pulumi.String("Enabled"),
						Filter: &s3.BucketReplicationConfigurationRuleFilterArgs{
							Tags: nil,
						},
						Destination: &s3.BucketReplicationConfigurationRuleDestinationArgs{
							Bucket:       destination.Arn,
							StorageClass: pulumi.String("STANDARD"),
							ReplicationTime: &s3.BucketReplicationConfigurationRuleDestinationReplicationTimeArgs{
								Status:  pulumi.String("Enabled"),
								Minutes: pulumi.Int(15),
							},
							Metrics: &s3.BucketReplicationConfigurationRuleDestinationMetricsArgs{
								Status:  pulumi.String("Enabled"),
								Minutes: pulumi.Int(15),
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
import com.pulumi.aws.s3.Bucket;
import com.pulumi.aws.s3.BucketArgs;
import com.pulumi.aws.s3.inputs.BucketVersioningArgs;
import com.pulumi.aws.s3.inputs.BucketReplicationConfigurationArgs;
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

        var destination = new Bucket("destination", BucketArgs.builder()        
            .versioning(BucketVersioningArgs.builder()
                .enabled(true)
                .build())
            .build());

        var source = new Bucket("source", BucketArgs.builder()        
            .acl("private")
            .versioning(BucketVersioningArgs.builder()
                .enabled(true)
                .build())
            .replicationConfiguration(BucketReplicationConfigurationArgs.builder()
                .role(replicationRole.arn())
                .rules(BucketReplicationConfigurationRuleArgs.builder()
                    .id("foobar")
                    .status("Enabled")
                    .filter(BucketReplicationConfigurationRuleFilterArgs.builder()
                        .tags()
                        .build())
                    .destination(BucketReplicationConfigurationRuleDestinationArgs.builder()
                        .bucket(destination.arn())
                        .storageClass("STANDARD")
                        .replicationTime(BucketReplicationConfigurationRuleDestinationReplicationTimeArgs.builder()
                            .status("Enabled")
                            .minutes(15)
                            .build())
                        .metrics(BucketReplicationConfigurationRuleDestinationMetricsArgs.builder()
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
    type: aws:s3:Bucket
    properties:
      versioning:
        enabled: true
  source:
    type: aws:s3:Bucket
    properties:
      acl: private
      versioning:
        enabled: true
      replicationConfiguration:
        role: ${replicationRole.arn}
        rules:
          - id: foobar
            status: Enabled
            filter:
              tags: {}
            destination:
              bucket: ${destination.arn}
              storageClass: STANDARD
              replicationTime:
                status: Enabled
                minutes: 15
              metrics:
                status: Enabled
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
const mybucket = new aws.s3.Bucket("mybucket", {serverSideEncryptionConfiguration: {
    rule: {
        applyServerSideEncryptionByDefault: {
            kmsMasterKeyId: mykey.arn,
            sseAlgorithm: "aws:kms",
        },
    },
}});
```
```python
import pulumi
import pulumi_aws as aws

mykey = aws.kms.Key("mykey",
    description="This key is used to encrypt bucket objects",
    deletion_window_in_days=10)
mybucket = aws.s3.Bucket("mybucket", server_side_encryption_configuration=aws.s3.BucketServerSideEncryptionConfigurationArgs(
    rule=aws.s3.BucketServerSideEncryptionConfigurationRuleArgs(
        apply_server_side_encryption_by_default=aws.s3.BucketServerSideEncryptionConfigurationRuleApplyServerSideEncryptionByDefaultArgs(
            kms_master_key_id=mykey.arn,
            sse_algorithm="aws:kms",
        ),
    ),
))
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

    var mybucket = new Aws.S3.Bucket("mybucket", new()
    {
        ServerSideEncryptionConfiguration = new Aws.S3.Inputs.BucketServerSideEncryptionConfigurationArgs
        {
            Rule = new Aws.S3.Inputs.BucketServerSideEncryptionConfigurationRuleArgs
            {
                ApplyServerSideEncryptionByDefault = new Aws.S3.Inputs.BucketServerSideEncryptionConfigurationRuleApplyServerSideEncryptionByDefaultArgs
                {
                    KmsMasterKeyId = mykey.Arn,
                    SseAlgorithm = "aws:kms",
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
		_, err = s3.NewBucket(ctx, "mybucket", &s3.BucketArgs{
			ServerSideEncryptionConfiguration: &s3.BucketServerSideEncryptionConfigurationArgs{
				Rule: &s3.BucketServerSideEncryptionConfigurationRuleArgs{
					ApplyServerSideEncryptionByDefault: &s3.BucketServerSideEncryptionConfigurationRuleApplyServerSideEncryptionByDefaultArgs{
						KmsMasterKeyId: mykey.Arn,
						SseAlgorithm:   pulumi.String("aws:kms"),
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
import com.pulumi.aws.s3.Bucket;
import com.pulumi.aws.s3.BucketArgs;
import com.pulumi.aws.s3.inputs.BucketServerSideEncryptionConfigurationArgs;
import com.pulumi.aws.s3.inputs.BucketServerSideEncryptionConfigurationRuleArgs;
import com.pulumi.aws.s3.inputs.BucketServerSideEncryptionConfigurationRuleApplyServerSideEncryptionByDefaultArgs;
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

        var mybucket = new Bucket("mybucket", BucketArgs.builder()        
            .serverSideEncryptionConfiguration(BucketServerSideEncryptionConfigurationArgs.builder()
                .rule(BucketServerSideEncryptionConfigurationRuleArgs.builder()
                    .applyServerSideEncryptionByDefault(BucketServerSideEncryptionConfigurationRuleApplyServerSideEncryptionByDefaultArgs.builder()
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
    type: aws:s3:Bucket
    properties:
      serverSideEncryptionConfiguration:
        rule:
          applyServerSideEncryptionByDefault:
            kmsMasterKeyId: ${mykey.arn}
            sseAlgorithm: aws:kms
```
{{% /example %}}
{{% example %}}
### Using ACL policy grants

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const currentUser = aws.s3.getCanonicalUserId({});
const bucket = new aws.s3.Bucket("bucket", {grants: [
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
bucket = aws.s3.Bucket("bucket", grants=[
    aws.s3.BucketGrantArgs(
        id=current_user.id,
        type="CanonicalUser",
        permissions=["FULL_CONTROL"],
    ),
    aws.s3.BucketGrantArgs(
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

    var bucket = new Aws.S3.Bucket("bucket", new()
    {
        Grants = new[]
        {
            new Aws.S3.Inputs.BucketGrantArgs
            {
                Id = currentUser.Apply(getCanonicalUserIdResult => getCanonicalUserIdResult.Id),
                Type = "CanonicalUser",
                Permissions = new[]
                {
                    "FULL_CONTROL",
                },
            },
            new Aws.S3.Inputs.BucketGrantArgs
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
		_, err = s3.NewBucket(ctx, "bucket", &s3.BucketArgs{
			Grants: s3.BucketGrantArray{
				&s3.BucketGrantArgs{
					Id:   pulumi.String(currentUser.Id),
					Type: pulumi.String("CanonicalUser"),
					Permissions: pulumi.StringArray{
						pulumi.String("FULL_CONTROL"),
					},
				},
				&s3.BucketGrantArgs{
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
import com.pulumi.aws.s3.Bucket;
import com.pulumi.aws.s3.BucketArgs;
import com.pulumi.aws.s3.inputs.BucketGrantArgs;
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

        var bucket = new Bucket("bucket", BucketArgs.builder()        
            .grants(            
                BucketGrantArgs.builder()
                    .id(currentUser.applyValue(getCanonicalUserIdResult -> getCanonicalUserIdResult.id()))
                    .type("CanonicalUser")
                    .permissions("FULL_CONTROL")
                    .build(),
                BucketGrantArgs.builder()
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
    type: aws:s3:Bucket
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
 $ pulumi import aws:s3/bucket:Bucket bucket bucket-name
```

 The `policy` argument is not imported and will be deprecated in a future version of the provider. Use the `aws_s3_bucket_policy` resource to manage the S3 Bucket Policy instead. 
{{% examples %}}
## Example Usage
{{% example %}}
### With ACL

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.s3.BucketV2("example", {});
const exampleBucketAcl = new aws.s3.BucketAclV2("exampleBucketAcl", {
    bucket: example.id,
    acl: "private",
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.s3.BucketV2("example")
example_bucket_acl = aws.s3.BucketAclV2("exampleBucketAcl",
    bucket=example.id,
    acl="private")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.S3.BucketV2("example");

    var exampleBucketAcl = new Aws.S3.BucketAclV2("exampleBucketAcl", new()
    {
        Bucket = example.Id,
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
		example, err := s3.NewBucketV2(ctx, "example", nil)
		if err != nil {
			return err
		}
		_, err = s3.NewBucketAclV2(ctx, "exampleBucketAcl", &s3.BucketAclV2Args{
			Bucket: example.ID(),
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
        var example = new BucketV2("example");

        var exampleBucketAcl = new BucketAclV2("exampleBucketAcl", BucketAclV2Args.builder()        
            .bucket(example.id())
            .acl("private")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:s3:BucketV2
  exampleBucketAcl:
    type: aws:s3:BucketAclV2
    properties:
      bucket: ${example.id}
      acl: private
```
{{% /example %}}
{{% example %}}
### With Grants

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const current = aws.s3.getCanonicalUserId({});
const exampleBucketV2 = new aws.s3.BucketV2("exampleBucketV2", {});
const exampleBucketAclV2 = new aws.s3.BucketAclV2("exampleBucketAclV2", {
    bucket: exampleBucketV2.id,
    accessControlPolicy: {
        grants: [
            {
                grantee: {
                    id: current.then(current => current.id),
                    type: "CanonicalUser",
                },
                permission: "READ",
            },
            {
                grantee: {
                    type: "Group",
                    uri: "http://acs.amazonaws.com/groups/s3/LogDelivery",
                },
                permission: "READ_ACP",
            },
        ],
        owner: {
            id: current.then(current => current.id),
        },
    },
});
```
```python
import pulumi
import pulumi_aws as aws

current = aws.s3.get_canonical_user_id()
example_bucket_v2 = aws.s3.BucketV2("exampleBucketV2")
example_bucket_acl_v2 = aws.s3.BucketAclV2("exampleBucketAclV2",
    bucket=example_bucket_v2.id,
    access_control_policy=aws.s3.BucketAclV2AccessControlPolicyArgs(
        grants=[
            aws.s3.BucketAclV2AccessControlPolicyGrantArgs(
                grantee=aws.s3.BucketAclV2AccessControlPolicyGrantGranteeArgs(
                    id=current.id,
                    type="CanonicalUser",
                ),
                permission="READ",
            ),
            aws.s3.BucketAclV2AccessControlPolicyGrantArgs(
                grantee=aws.s3.BucketAclV2AccessControlPolicyGrantGranteeArgs(
                    type="Group",
                    uri="http://acs.amazonaws.com/groups/s3/LogDelivery",
                ),
                permission="READ_ACP",
            ),
        ],
        owner=aws.s3.BucketAclV2AccessControlPolicyOwnerArgs(
            id=current.id,
        ),
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var current = Aws.S3.GetCanonicalUserId.Invoke();

    var exampleBucketV2 = new Aws.S3.BucketV2("exampleBucketV2");

    var exampleBucketAclV2 = new Aws.S3.BucketAclV2("exampleBucketAclV2", new()
    {
        Bucket = exampleBucketV2.Id,
        AccessControlPolicy = new Aws.S3.Inputs.BucketAclV2AccessControlPolicyArgs
        {
            Grants = new[]
            {
                new Aws.S3.Inputs.BucketAclV2AccessControlPolicyGrantArgs
                {
                    Grantee = new Aws.S3.Inputs.BucketAclV2AccessControlPolicyGrantGranteeArgs
                    {
                        Id = current.Apply(getCanonicalUserIdResult => getCanonicalUserIdResult.Id),
                        Type = "CanonicalUser",
                    },
                    Permission = "READ",
                },
                new Aws.S3.Inputs.BucketAclV2AccessControlPolicyGrantArgs
                {
                    Grantee = new Aws.S3.Inputs.BucketAclV2AccessControlPolicyGrantGranteeArgs
                    {
                        Type = "Group",
                        Uri = "http://acs.amazonaws.com/groups/s3/LogDelivery",
                    },
                    Permission = "READ_ACP",
                },
            },
            Owner = new Aws.S3.Inputs.BucketAclV2AccessControlPolicyOwnerArgs
            {
                Id = current.Apply(getCanonicalUserIdResult => getCanonicalUserIdResult.Id),
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
		current, err := s3.GetCanonicalUserId(ctx, nil, nil)
		if err != nil {
			return err
		}
		exampleBucketV2, err := s3.NewBucketV2(ctx, "exampleBucketV2", nil)
		if err != nil {
			return err
		}
		_, err = s3.NewBucketAclV2(ctx, "exampleBucketAclV2", &s3.BucketAclV2Args{
			Bucket: exampleBucketV2.ID(),
			AccessControlPolicy: &s3.BucketAclV2AccessControlPolicyArgs{
				Grants: s3.BucketAclV2AccessControlPolicyGrantArray{
					&s3.BucketAclV2AccessControlPolicyGrantArgs{
						Grantee: &s3.BucketAclV2AccessControlPolicyGrantGranteeArgs{
							Id:   pulumi.String(current.Id),
							Type: pulumi.String("CanonicalUser"),
						},
						Permission: pulumi.String("READ"),
					},
					&s3.BucketAclV2AccessControlPolicyGrantArgs{
						Grantee: &s3.BucketAclV2AccessControlPolicyGrantGranteeArgs{
							Type: pulumi.String("Group"),
							Uri:  pulumi.String("http://acs.amazonaws.com/groups/s3/LogDelivery"),
						},
						Permission: pulumi.String("READ_ACP"),
					},
				},
				Owner: &s3.BucketAclV2AccessControlPolicyOwnerArgs{
					Id: pulumi.String(current.Id),
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
import com.pulumi.aws.s3.BucketAclV2;
import com.pulumi.aws.s3.BucketAclV2Args;
import com.pulumi.aws.s3.inputs.BucketAclV2AccessControlPolicyArgs;
import com.pulumi.aws.s3.inputs.BucketAclV2AccessControlPolicyOwnerArgs;
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
        final var current = S3Functions.getCanonicalUserId();

        var exampleBucketV2 = new BucketV2("exampleBucketV2");

        var exampleBucketAclV2 = new BucketAclV2("exampleBucketAclV2", BucketAclV2Args.builder()        
            .bucket(exampleBucketV2.id())
            .accessControlPolicy(BucketAclV2AccessControlPolicyArgs.builder()
                .grants(                
                    BucketAclV2AccessControlPolicyGrantArgs.builder()
                        .grantee(BucketAclV2AccessControlPolicyGrantGranteeArgs.builder()
                            .id(current.applyValue(getCanonicalUserIdResult -> getCanonicalUserIdResult.id()))
                            .type("CanonicalUser")
                            .build())
                        .permission("READ")
                        .build(),
                    BucketAclV2AccessControlPolicyGrantArgs.builder()
                        .grantee(BucketAclV2AccessControlPolicyGrantGranteeArgs.builder()
                            .type("Group")
                            .uri("http://acs.amazonaws.com/groups/s3/LogDelivery")
                            .build())
                        .permission("READ_ACP")
                        .build())
                .owner(BucketAclV2AccessControlPolicyOwnerArgs.builder()
                    .id(current.applyValue(getCanonicalUserIdResult -> getCanonicalUserIdResult.id()))
                    .build())
                .build())
            .build());

    }
}
```
```yaml
resources:
  exampleBucketV2:
    type: aws:s3:BucketV2
  exampleBucketAclV2:
    type: aws:s3:BucketAclV2
    properties:
      bucket: ${exampleBucketV2.id}
      accessControlPolicy:
        grants:
          - grantee:
              id: ${current.id}
              type: CanonicalUser
            permission: READ
          - grantee:
              type: Group
              uri: http://acs.amazonaws.com/groups/s3/LogDelivery
            permission: READ_ACP
        owner:
          id: ${current.id}
variables:
  current:
    Fn::Invoke:
      Function: aws:s3:getCanonicalUserId
      Arguments: {}
```
{{% /example %}}
{{% /examples %}}

## Import

S3 bucket ACL can be imported in one of four ways. If the owner (account ID) of the source bucket is the _same_ account used to configure the Terraform AWS Provider, and the source bucket is **not configured** with a [canned ACL][1] (i.e. predefined grant), the S3 bucket ACL resource should be imported using the `bucket` e.g.,

```sh
 $ pulumi import aws:s3/bucketAclV2:BucketAclV2 example bucket-name
```

 If the owner (account ID) of the source bucket is the _same_ account used to configure the Terraform AWS Provider, and the source bucket is **configured** with a [canned ACL][1] (i.e. predefined grant), the S3 bucket ACL resource should be imported using the `bucket` and `acl` separated by a comma (`,`), e.g.

```sh
 $ pulumi import aws:s3/bucketAclV2:BucketAclV2 example bucket-name,private
```

 If the owner (account ID) of the source bucket _differs_ from the account used to configure the Terraform AWS Provider, and the source bucket is **not configured** with a [canned ACL][1] (i.e. predefined grant), the S3 bucket ACL resource should be imported using the `bucket` and `expected_bucket_owner` separated by a comma (`,`) e.g.,

```sh
 $ pulumi import aws:s3/bucketAclV2:BucketAclV2 example bucket-name,123456789012
```

 If the owner (account ID) of the source bucket _differs_ from the account used to configure the Terraform AWS Provider, and the source bucket is **configured** with a [canned ACL][1] (i.e. predefined grant), the S3 bucket ACL resource should be imported using the `bucket`, `expected_bucket_owner`, and `acl` separated by commas (`,`), e.g.,

```sh
 $ pulumi import aws:s3/bucketAclV2:BucketAclV2 example bucket-name,123456789012,private
```

 [1]https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html#canned-acl 
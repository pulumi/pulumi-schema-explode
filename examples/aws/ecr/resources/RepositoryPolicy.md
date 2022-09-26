Provides an Elastic Container Registry Repository Policy.

Note that currently only one policy may be applied to a repository.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const foo = new aws.ecr.Repository("foo", {});
const foopolicy = new aws.ecr.RepositoryPolicy("foopolicy", {
    repository: foo.name,
    policy: `{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "new policy",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "ecr:GetDownloadUrlForLayer",
                "ecr:BatchGetImage",
                "ecr:BatchCheckLayerAvailability",
                "ecr:PutImage",
                "ecr:InitiateLayerUpload",
                "ecr:UploadLayerPart",
                "ecr:CompleteLayerUpload",
                "ecr:DescribeRepositories",
                "ecr:GetRepositoryPolicy",
                "ecr:ListImages",
                "ecr:DeleteRepository",
                "ecr:BatchDeleteImage",
                "ecr:SetRepositoryPolicy",
                "ecr:DeleteRepositoryPolicy"
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

foo = aws.ecr.Repository("foo")
foopolicy = aws.ecr.RepositoryPolicy("foopolicy",
    repository=foo.name,
    policy="""{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "new policy",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "ecr:GetDownloadUrlForLayer",
                "ecr:BatchGetImage",
                "ecr:BatchCheckLayerAvailability",
                "ecr:PutImage",
                "ecr:InitiateLayerUpload",
                "ecr:UploadLayerPart",
                "ecr:CompleteLayerUpload",
                "ecr:DescribeRepositories",
                "ecr:GetRepositoryPolicy",
                "ecr:ListImages",
                "ecr:DeleteRepository",
                "ecr:BatchDeleteImage",
                "ecr:SetRepositoryPolicy",
                "ecr:DeleteRepositoryPolicy"
            ]
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
    var foo = new Aws.Ecr.Repository("foo");

    var foopolicy = new Aws.Ecr.RepositoryPolicy("foopolicy", new()
    {
        Repository = foo.Name,
        Policy = @"{
    ""Version"": ""2008-10-17"",
    ""Statement"": [
        {
            ""Sid"": ""new policy"",
            ""Effect"": ""Allow"",
            ""Principal"": ""*"",
            ""Action"": [
                ""ecr:GetDownloadUrlForLayer"",
                ""ecr:BatchGetImage"",
                ""ecr:BatchCheckLayerAvailability"",
                ""ecr:PutImage"",
                ""ecr:InitiateLayerUpload"",
                ""ecr:UploadLayerPart"",
                ""ecr:CompleteLayerUpload"",
                ""ecr:DescribeRepositories"",
                ""ecr:GetRepositoryPolicy"",
                ""ecr:ListImages"",
                ""ecr:DeleteRepository"",
                ""ecr:BatchDeleteImage"",
                ""ecr:SetRepositoryPolicy"",
                ""ecr:DeleteRepositoryPolicy""
            ]
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

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ecr"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		foo, err := ecr.NewRepository(ctx, "foo", nil)
		if err != nil {
			return err
		}
		_, err = ecr.NewRepositoryPolicy(ctx, "foopolicy", &ecr.RepositoryPolicyArgs{
			Repository: foo.Name,
			Policy: pulumi.Any(fmt.Sprintf(`{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "new policy",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "ecr:GetDownloadUrlForLayer",
                "ecr:BatchGetImage",
                "ecr:BatchCheckLayerAvailability",
                "ecr:PutImage",
                "ecr:InitiateLayerUpload",
                "ecr:UploadLayerPart",
                "ecr:CompleteLayerUpload",
                "ecr:DescribeRepositories",
                "ecr:GetRepositoryPolicy",
                "ecr:ListImages",
                "ecr:DeleteRepository",
                "ecr:BatchDeleteImage",
                "ecr:SetRepositoryPolicy",
                "ecr:DeleteRepositoryPolicy"
            ]
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
import com.pulumi.aws.ecr.Repository;
import com.pulumi.aws.ecr.RepositoryPolicy;
import com.pulumi.aws.ecr.RepositoryPolicyArgs;
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
        var foo = new Repository("foo");

        var foopolicy = new RepositoryPolicy("foopolicy", RepositoryPolicyArgs.builder()        
            .repository(foo.name())
            .policy("""
{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "new policy",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "ecr:GetDownloadUrlForLayer",
                "ecr:BatchGetImage",
                "ecr:BatchCheckLayerAvailability",
                "ecr:PutImage",
                "ecr:InitiateLayerUpload",
                "ecr:UploadLayerPart",
                "ecr:CompleteLayerUpload",
                "ecr:DescribeRepositories",
                "ecr:GetRepositoryPolicy",
                "ecr:ListImages",
                "ecr:DeleteRepository",
                "ecr:BatchDeleteImage",
                "ecr:SetRepositoryPolicy",
                "ecr:DeleteRepositoryPolicy"
            ]
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
  foo:
    type: aws:ecr:Repository
  foopolicy:
    type: aws:ecr:RepositoryPolicy
    properties:
      repository: ${foo.name}
      policy: |
        {
            "Version": "2008-10-17",
            "Statement": [
                {
                    "Sid": "new policy",
                    "Effect": "Allow",
                    "Principal": "*",
                    "Action": [
                        "ecr:GetDownloadUrlForLayer",
                        "ecr:BatchGetImage",
                        "ecr:BatchCheckLayerAvailability",
                        "ecr:PutImage",
                        "ecr:InitiateLayerUpload",
                        "ecr:UploadLayerPart",
                        "ecr:CompleteLayerUpload",
                        "ecr:DescribeRepositories",
                        "ecr:GetRepositoryPolicy",
                        "ecr:ListImages",
                        "ecr:DeleteRepository",
                        "ecr:BatchDeleteImage",
                        "ecr:SetRepositoryPolicy",
                        "ecr:DeleteRepositoryPolicy"
                    ]
                }
            ]
        }
```
{{% /example %}}
{{% /examples %}}

## Import

ECR Repository Policy can be imported using the repository name, e.g.,

```sh
 $ pulumi import aws:ecr/repositoryPolicy:RepositoryPolicy example example
```

 
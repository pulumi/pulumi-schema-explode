Provides an Elastic Container Registry Public Repository Policy.

Note that currently only one policy may be applied to a repository.

> **NOTE:** This resource can only be used with `us-east-1` region.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleRepository = new aws.ecrpublic.Repository("exampleRepository", {repositoryName: "example"});
const exampleRepositoryPolicy = new aws.ecrpublic.RepositoryPolicy("exampleRepositoryPolicy", {
    repositoryName: exampleRepository.repositoryName,
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

example_repository = aws.ecrpublic.Repository("exampleRepository", repository_name="example")
example_repository_policy = aws.ecrpublic.RepositoryPolicy("exampleRepositoryPolicy",
    repository_name=example_repository.repository_name,
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
    var exampleRepository = new Aws.EcrPublic.Repository("exampleRepository", new()
    {
        RepositoryName = "example",
    });

    var exampleRepositoryPolicy = new Aws.EcrPublic.RepositoryPolicy("exampleRepositoryPolicy", new()
    {
        RepositoryName = exampleRepository.RepositoryName,
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

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ecrpublic"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleRepository, err := ecrpublic.NewRepository(ctx, "exampleRepository", &ecrpublic.RepositoryArgs{
			RepositoryName: pulumi.String("example"),
		})
		if err != nil {
			return err
		}
		_, err = ecrpublic.NewRepositoryPolicy(ctx, "exampleRepositoryPolicy", &ecrpublic.RepositoryPolicyArgs{
			RepositoryName: exampleRepository.RepositoryName,
			Policy: pulumi.String(fmt.Sprintf(`{
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
import com.pulumi.aws.ecrpublic.Repository;
import com.pulumi.aws.ecrpublic.RepositoryArgs;
import com.pulumi.aws.ecrpublic.RepositoryPolicy;
import com.pulumi.aws.ecrpublic.RepositoryPolicyArgs;
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
        var exampleRepository = new Repository("exampleRepository", RepositoryArgs.builder()        
            .repositoryName("example")
            .build());

        var exampleRepositoryPolicy = new RepositoryPolicy("exampleRepositoryPolicy", RepositoryPolicyArgs.builder()        
            .repositoryName(exampleRepository.repositoryName())
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
  exampleRepository:
    type: aws:ecrpublic:Repository
    properties:
      repositoryName: example
  exampleRepositoryPolicy:
    type: aws:ecrpublic:RepositoryPolicy
    properties:
      repositoryName: ${exampleRepository.repositoryName}
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

ECR Public Repository Policy can be imported using the repository name, e.g.

```sh
 $ pulumi import aws:ecrpublic/repositoryPolicy:RepositoryPolicy example example
```

 
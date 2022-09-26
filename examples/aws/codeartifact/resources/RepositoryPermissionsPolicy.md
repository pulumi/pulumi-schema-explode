Provides a CodeArtifact Repostory Permissions Policy Resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleKey = new aws.kms.Key("exampleKey", {description: "domain key"});
const exampleDomain = new aws.codeartifact.Domain("exampleDomain", {
    domain: "example",
    encryptionKey: exampleKey.arn,
});
const exampleRepository = new aws.codeartifact.Repository("exampleRepository", {
    repository: "example",
    domain: exampleDomain.domain,
});
const exampleRepositoryPermissionsPolicy = new aws.codeartifact.RepositoryPermissionsPolicy("exampleRepositoryPermissionsPolicy", {
    repository: exampleRepository.repository,
    domain: exampleDomain.domain,
    policyDocument: pulumi.interpolate`{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "codeartifact:CreateRepository",
            "Effect": "Allow",
            "Principal": "*",
            "Resource": "${exampleDomain.arn}"
        }
    ]
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

example_key = aws.kms.Key("exampleKey", description="domain key")
example_domain = aws.codeartifact.Domain("exampleDomain",
    domain="example",
    encryption_key=example_key.arn)
example_repository = aws.codeartifact.Repository("exampleRepository",
    repository="example",
    domain=example_domain.domain)
example_repository_permissions_policy = aws.codeartifact.RepositoryPermissionsPolicy("exampleRepositoryPermissionsPolicy",
    repository=example_repository.repository,
    domain=example_domain.domain,
    policy_document=example_domain.arn.apply(lambda arn: f"""{{
    "Version": "2012-10-17",
    "Statement": [
        {{
            "Action": "codeartifact:CreateRepository",
            "Effect": "Allow",
            "Principal": "*",
            "Resource": "{arn}"
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
    var exampleKey = new Aws.Kms.Key("exampleKey", new()
    {
        Description = "domain key",
    });

    var exampleDomain = new Aws.CodeArtifact.Domain("exampleDomain", new()
    {
        DomainName = "example",
        EncryptionKey = exampleKey.Arn,
    });

    var exampleRepository = new Aws.CodeArtifact.Repository("exampleRepository", new()
    {
        RepositoryName = "example",
        Domain = exampleDomain.DomainName,
    });

    var exampleRepositoryPermissionsPolicy = new Aws.CodeArtifact.RepositoryPermissionsPolicy("exampleRepositoryPermissionsPolicy", new()
    {
        Repository = exampleRepository.RepositoryName,
        Domain = exampleDomain.DomainName,
        PolicyDocument = exampleDomain.Arn.Apply(arn => @$"{{
    ""Version"": ""2012-10-17"",
    ""Statement"": [
        {{
            ""Action"": ""codeartifact:CreateRepository"",
            ""Effect"": ""Allow"",
            ""Principal"": ""*"",
            ""Resource"": ""{arn}""
        }}
    ]
}}
"),
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/codeartifact"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/kms"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleKey, err := kms.NewKey(ctx, "exampleKey", &kms.KeyArgs{
			Description: pulumi.String("domain key"),
		})
		if err != nil {
			return err
		}
		exampleDomain, err := codeartifact.NewDomain(ctx, "exampleDomain", &codeartifact.DomainArgs{
			Domain:        pulumi.String("example"),
			EncryptionKey: exampleKey.Arn,
		})
		if err != nil {
			return err
		}
		exampleRepository, err := codeartifact.NewRepository(ctx, "exampleRepository", &codeartifact.RepositoryArgs{
			Repository: pulumi.String("example"),
			Domain:     exampleDomain.Domain,
		})
		if err != nil {
			return err
		}
		_, err = codeartifact.NewRepositoryPermissionsPolicy(ctx, "exampleRepositoryPermissionsPolicy", &codeartifact.RepositoryPermissionsPolicyArgs{
			Repository: exampleRepository.Repository,
			Domain:     exampleDomain.Domain,
			PolicyDocument: exampleDomain.Arn.ApplyT(func(arn string) (string, error) {
				return fmt.Sprintf(`{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "codeartifact:CreateRepository",
            "Effect": "Allow",
            "Principal": "*",
            "Resource": "%v"
        }
    ]
}
`, arn), nil
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
import com.pulumi.aws.kms.Key;
import com.pulumi.aws.kms.KeyArgs;
import com.pulumi.aws.codeartifact.Domain;
import com.pulumi.aws.codeartifact.DomainArgs;
import com.pulumi.aws.codeartifact.Repository;
import com.pulumi.aws.codeartifact.RepositoryArgs;
import com.pulumi.aws.codeartifact.RepositoryPermissionsPolicy;
import com.pulumi.aws.codeartifact.RepositoryPermissionsPolicyArgs;
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
        var exampleKey = new Key("exampleKey", KeyArgs.builder()        
            .description("domain key")
            .build());

        var exampleDomain = new Domain("exampleDomain", DomainArgs.builder()        
            .domain("example")
            .encryptionKey(exampleKey.arn())
            .build());

        var exampleRepository = new Repository("exampleRepository", RepositoryArgs.builder()        
            .repository("example")
            .domain(exampleDomain.domain())
            .build());

        var exampleRepositoryPermissionsPolicy = new RepositoryPermissionsPolicy("exampleRepositoryPermissionsPolicy", RepositoryPermissionsPolicyArgs.builder()        
            .repository(exampleRepository.repository())
            .domain(exampleDomain.domain())
            .policyDocument(exampleDomain.arn().applyValue(arn -> """
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "codeartifact:CreateRepository",
            "Effect": "Allow",
            "Principal": "*",
            "Resource": "%s"
        }
    ]
}
", arn)))
            .build());

    }
}
```
```yaml
resources:
  exampleKey:
    type: aws:kms:Key
    properties:
      description: domain key
  exampleDomain:
    type: aws:codeartifact:Domain
    properties:
      domain: example
      encryptionKey: ${exampleKey.arn}
  exampleRepository:
    type: aws:codeartifact:Repository
    properties:
      repository: example
      domain: ${exampleDomain.domain}
  exampleRepositoryPermissionsPolicy:
    type: aws:codeartifact:RepositoryPermissionsPolicy
    properties:
      repository: ${exampleRepository.repository}
      domain: ${exampleDomain.domain}
      policyDocument: |
        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Action": "codeartifact:CreateRepository",
                    "Effect": "Allow",
                    "Principal": "*",
                    "Resource": "${exampleDomain.arn}"
                }
            ]
        }
```
{{% /example %}}
{{% /examples %}}

## Import

CodeArtifact Repository Permissions Policies can be imported using the CodeArtifact Repository ARN, e.g.,

```sh
 $ pulumi import aws:codeartifact/repositoryPermissionsPolicy:RepositoryPermissionsPolicy example arn:aws:codeartifact:us-west-2:012345678912:repository/tf-acc-test-6968272603913957763/tf-acc-test-6968272603913957763
```

 
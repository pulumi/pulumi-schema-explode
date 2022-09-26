Allows setting policy to an OpenSearch domain while referencing domain attributes (e.g., ARN).

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.opensearch.Domain("example", {engineVersion: "OpenSearch_1.1"});
const main = new aws.opensearch.DomainPolicy("main", {
    domainName: example.domainName,
    accessPolicies: pulumi.interpolate`{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "es:*",
            "Principal": "*",
            "Effect": "Allow",
            "Condition": {
                "IpAddress": {"aws:SourceIp": "127.0.0.1/32"}
            },
            "Resource": "${example.arn}/*"
        }
    ]
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.opensearch.Domain("example", engine_version="OpenSearch_1.1")
main = aws.opensearch.DomainPolicy("main",
    domain_name=example.domain_name,
    access_policies=example.arn.apply(lambda arn: f"""{{
    "Version": "2012-10-17",
    "Statement": [
        {{
            "Action": "es:*",
            "Principal": "*",
            "Effect": "Allow",
            "Condition": {{
                "IpAddress": {{"aws:SourceIp": "127.0.0.1/32"}}
            }},
            "Resource": "{arn}/*"
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
    var example = new Aws.OpenSearch.Domain("example", new()
    {
        EngineVersion = "OpenSearch_1.1",
    });

    var main = new Aws.OpenSearch.DomainPolicy("main", new()
    {
        DomainName = example.DomainName,
        AccessPolicies = example.Arn.Apply(arn => @$"{{
    ""Version"": ""2012-10-17"",
    ""Statement"": [
        {{
            ""Action"": ""es:*"",
            ""Principal"": ""*"",
            ""Effect"": ""Allow"",
            ""Condition"": {{
                ""IpAddress"": {{""aws:SourceIp"": ""127.0.0.1/32""}}
            }},
            ""Resource"": ""{arn}/*""
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

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/opensearch"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		example, err := opensearch.NewDomain(ctx, "example", &opensearch.DomainArgs{
			EngineVersion: pulumi.String("OpenSearch_1.1"),
		})
		if err != nil {
			return err
		}
		_, err = opensearch.NewDomainPolicy(ctx, "main", &opensearch.DomainPolicyArgs{
			DomainName: example.DomainName,
			AccessPolicies: example.Arn.ApplyT(func(arn string) (string, error) {
				return fmt.Sprintf(`{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "es:*",
            "Principal": "*",
            "Effect": "Allow",
            "Condition": {
                "IpAddress": {"aws:SourceIp": "127.0.0.1/32"}
            },
            "Resource": "%v/*"
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
import com.pulumi.aws.opensearch.Domain;
import com.pulumi.aws.opensearch.DomainArgs;
import com.pulumi.aws.opensearch.DomainPolicy;
import com.pulumi.aws.opensearch.DomainPolicyArgs;
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
        var example = new Domain("example", DomainArgs.builder()        
            .engineVersion("OpenSearch_1.1")
            .build());

        var main = new DomainPolicy("main", DomainPolicyArgs.builder()        
            .domainName(example.domainName())
            .accessPolicies(example.arn().applyValue(arn -> """
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "es:*",
            "Principal": "*",
            "Effect": "Allow",
            "Condition": {
                "IpAddress": {"aws:SourceIp": "127.0.0.1/32"}
            },
            "Resource": "%s/*"
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
  example:
    type: aws:opensearch:Domain
    properties:
      engineVersion: OpenSearch_1.1
  main:
    type: aws:opensearch:DomainPolicy
    properties:
      domainName: ${example.domainName}
      accessPolicies: |
        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Action": "es:*",
                    "Principal": "*",
                    "Effect": "Allow",
                    "Condition": {
                        "IpAddress": {"aws:SourceIp": "127.0.0.1/32"}
                    },
                    "Resource": "${example.arn}/*"
                }
            ]
        }
```
{{% /example %}}
{{% /examples %}}
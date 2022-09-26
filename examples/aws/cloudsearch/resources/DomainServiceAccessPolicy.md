{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleDomain = new aws.cloudsearch.Domain("exampleDomain", {});
const exampleDomainServiceAccessPolicy = new aws.cloudsearch.DomainServiceAccessPolicy("exampleDomainServiceAccessPolicy", {
    domainName: exampleDomain.id,
    accessPolicy: `{
  "Version":"2012-10-17",
  "Statement":[{
    "Sid":"search_only",
    "Effect":"Allow",
    "Principal":"*",
    "Action":[
      "cloudsearch:search",
      "cloudsearch:document"
    ],
    "Condition":{"IpAddress":{"aws:SourceIp":"192.0.2.0/32"}}
  }]
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

example_domain = aws.cloudsearch.Domain("exampleDomain")
example_domain_service_access_policy = aws.cloudsearch.DomainServiceAccessPolicy("exampleDomainServiceAccessPolicy",
    domain_name=example_domain.id,
    access_policy="""{
  "Version":"2012-10-17",
  "Statement":[{
    "Sid":"search_only",
    "Effect":"Allow",
    "Principal":"*",
    "Action":[
      "cloudsearch:search",
      "cloudsearch:document"
    ],
    "Condition":{"IpAddress":{"aws:SourceIp":"192.0.2.0/32"}}
  }]
}
""")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleDomain = new Aws.CloudSearch.Domain("exampleDomain");

    var exampleDomainServiceAccessPolicy = new Aws.CloudSearch.DomainServiceAccessPolicy("exampleDomainServiceAccessPolicy", new()
    {
        DomainName = exampleDomain.Id,
        AccessPolicy = @"{
  ""Version"":""2012-10-17"",
  ""Statement"":[{
    ""Sid"":""search_only"",
    ""Effect"":""Allow"",
    ""Principal"":""*"",
    ""Action"":[
      ""cloudsearch:search"",
      ""cloudsearch:document""
    ],
    ""Condition"":{""IpAddress"":{""aws:SourceIp"":""192.0.2.0/32""}}
  }]
}
",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudsearch"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleDomain, err := cloudsearch.NewDomain(ctx, "exampleDomain", nil)
		if err != nil {
			return err
		}
		_, err = cloudsearch.NewDomainServiceAccessPolicy(ctx, "exampleDomainServiceAccessPolicy", &cloudsearch.DomainServiceAccessPolicyArgs{
			DomainName: exampleDomain.ID(),
			AccessPolicy: pulumi.String(fmt.Sprintf(`{
  "Version":"2012-10-17",
  "Statement":[{
    "Sid":"search_only",
    "Effect":"Allow",
    "Principal":"*",
    "Action":[
      "cloudsearch:search",
      "cloudsearch:document"
    ],
    "Condition":{"IpAddress":{"aws:SourceIp":"192.0.2.0/32"}}
  }]
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
import com.pulumi.aws.cloudsearch.Domain;
import com.pulumi.aws.cloudsearch.DomainServiceAccessPolicy;
import com.pulumi.aws.cloudsearch.DomainServiceAccessPolicyArgs;
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
        var exampleDomain = new Domain("exampleDomain");

        var exampleDomainServiceAccessPolicy = new DomainServiceAccessPolicy("exampleDomainServiceAccessPolicy", DomainServiceAccessPolicyArgs.builder()        
            .domainName(exampleDomain.id())
            .accessPolicy("""
{
  "Version":"2012-10-17",
  "Statement":[{
    "Sid":"search_only",
    "Effect":"Allow",
    "Principal":"*",
    "Action":[
      "cloudsearch:search",
      "cloudsearch:document"
    ],
    "Condition":{"IpAddress":{"aws:SourceIp":"192.0.2.0/32"}}
  }]
}
            """)
            .build());

    }
}
```
```yaml
resources:
  exampleDomain:
    type: aws:cloudsearch:Domain
  exampleDomainServiceAccessPolicy:
    type: aws:cloudsearch:DomainServiceAccessPolicy
    properties:
      domainName: ${exampleDomain.id}
      accessPolicy: |
        {
          "Version":"2012-10-17",
          "Statement":[{
            "Sid":"search_only",
            "Effect":"Allow",
            "Principal":"*",
            "Action":[
              "cloudsearch:search",
              "cloudsearch:document"
            ],
            "Condition":{"IpAddress":{"aws:SourceIp":"192.0.2.0/32"}}
          }]
        }
```
{{% /example %}}
{{% /examples %}}

## Import

CloudSearch domain service access policies can be imported using the domain name, e.g.,

```sh
 $ pulumi import aws:cloudsearch/domainServiceAccessPolicy:DomainServiceAccessPolicy example example-domain
```

 
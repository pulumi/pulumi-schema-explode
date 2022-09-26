Provides a resource to manage an [AWS Organizations policy](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html).

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.organizations.Policy("example", {
    content: `{
  "Version": "2012-10-17",
  "Statement": {
    "Effect": "Allow",
    "Action": "*",
    "Resource": "*"
  }
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.organizations.Policy("example", content="""{
  "Version": "2012-10-17",
  "Statement": {
    "Effect": "Allow",
    "Action": "*",
    "Resource": "*"
  }
}

""")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Organizations.Policy("example", new()
    {
        Content = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": {
    ""Effect"": ""Allow"",
    ""Action"": ""*"",
    ""Resource"": ""*""
  }
}

",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/organizations"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := organizations.NewPolicy(ctx, "example", &organizations.PolicyArgs{
			Content: pulumi.String(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": {
    "Effect": "Allow",
    "Action": "*",
    "Resource": "*"
  }
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
import com.pulumi.aws.organizations.Policy;
import com.pulumi.aws.organizations.PolicyArgs;
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
        var example = new Policy("example", PolicyArgs.builder()        
            .content("""
{
  "Version": "2012-10-17",
  "Statement": {
    "Effect": "Allow",
    "Action": "*",
    "Resource": "*"
  }
}

            """)
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:organizations:Policy
    properties:
      content: |+
        {
          "Version": "2012-10-17",
          "Statement": {
            "Effect": "Allow",
            "Action": "*",
            "Resource": "*"
          }
        }
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_organizations_policy` can be imported by using the policy ID, e.g.,

```sh
 $ pulumi import aws:organizations/policy:Policy example p-12345678
```

 
Get a list the AWS accounts that are designated as delegated administrators in this organization

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = pulumi.output(aws.organizations.getDelegatedAdministrators({
    servicePrincipal: "SERVICE PRINCIPAL",
}));
```
```python
import pulumi
import pulumi_aws as aws

example = aws.organizations.get_delegated_administrators(service_principal="SERVICE PRINCIPAL")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = Aws.Organizations.GetDelegatedAdministrators.Invoke(new()
    {
        ServicePrincipal = "SERVICE PRINCIPAL",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/organizations"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := organizations.GetDelegatedAdministrators(ctx, &organizations.GetDelegatedAdministratorsArgs{
			ServicePrincipal: pulumi.StringRef("SERVICE PRINCIPAL"),
		}, nil)
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
import com.pulumi.aws.organizations.OrganizationsFunctions;
import com.pulumi.aws.organizations.inputs.GetDelegatedAdministratorsArgs;
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
        final var example = OrganizationsFunctions.getDelegatedAdministrators(GetDelegatedAdministratorsArgs.builder()
            .servicePrincipal("SERVICE PRINCIPAL")
            .build());

    }
}
```
```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:organizations:getDelegatedAdministrators
      Arguments:
        servicePrincipal: SERVICE PRINCIPAL
```
{{% /example %}}
{{% /examples %}}
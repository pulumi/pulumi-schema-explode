Retrieve information about a Service Quotas Service.

> **NOTE:** Global quotas apply to all AWS regions, but can only be accessed in `us-east-1` in the Commercial partition or `us-gov-west-1` in the GovCloud partition. In other regions, the AWS API will return the error `The request failed because the specified service does not exist.`

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = pulumi.output(aws.servicequotas.getService({
    serviceName: "Amazon Virtual Private Cloud (Amazon VPC)",
}));
```
```python
import pulumi
import pulumi_aws as aws

example = aws.servicequotas.get_service(service_name="Amazon Virtual Private Cloud (Amazon VPC)")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = Aws.ServiceQuotas.GetService.Invoke(new()
    {
        ServiceName = "Amazon Virtual Private Cloud (Amazon VPC)",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/servicequotas"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := servicequotas.GetService(ctx, &servicequotas.GetServiceArgs{
			ServiceName: "Amazon Virtual Private Cloud (Amazon VPC)",
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
import com.pulumi.aws.servicequotas.ServicequotasFunctions;
import com.pulumi.aws.ecs.inputs.GetServiceArgs;
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
        final var example = ServicequotasFunctions.getService(GetServiceArgs.builder()
            .serviceName("Amazon Virtual Private Cloud (Amazon VPC)")
            .build());

    }
}
```
```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:servicequotas:getService
      Arguments:
        serviceName: Amazon Virtual Private Cloud (Amazon VPC)
```
{{% /example %}}
{{% /examples %}}
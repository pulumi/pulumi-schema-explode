Get information on an EC2 Transit Gateway's attachment to a resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = aws.ec2transitgateway.getAttachment({
    filters: [
        {
            name: "transit-gateway-id",
            values: [aws_ec2_transit_gateway.example.id],
        },
        {
            name: "resource-type",
            values: ["peering"],
        },
    ],
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.ec2transitgateway.get_attachment(filters=[
    aws.ec2transitgateway.GetAttachmentFilterArgs(
        name="transit-gateway-id",
        values=[aws_ec2_transit_gateway["example"]["id"]],
    ),
    aws.ec2transitgateway.GetAttachmentFilterArgs(
        name="resource-type",
        values=["peering"],
    ),
])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = Aws.Ec2TransitGateway.GetAttachment.Invoke(new()
    {
        Filters = new[]
        {
            new Aws.Ec2TransitGateway.Inputs.GetAttachmentFilterInputArgs
            {
                Name = "transit-gateway-id",
                Values = new[]
                {
                    aws_ec2_transit_gateway.Example.Id,
                },
            },
            new Aws.Ec2TransitGateway.Inputs.GetAttachmentFilterInputArgs
            {
                Name = "resource-type",
                Values = new[]
                {
                    "peering",
                },
            },
        },
    });

});
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.ec2transitgateway.Ec2transitgatewayFunctions;
import com.pulumi.aws.ec2transitgateway.inputs.GetAttachmentArgs;
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
        final var example = Ec2transitgatewayFunctions.getAttachment(GetAttachmentArgs.builder()
            .filters(            
                GetAttachmentFilterArgs.builder()
                    .name("transit-gateway-id")
                    .values(aws_ec2_transit_gateway.example().id())
                    .build(),
                GetAttachmentFilterArgs.builder()
                    .name("resource-type")
                    .values("peering")
                    .build())
            .build());

    }
}
```
```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:ec2transitgateway:getAttachment
      Arguments:
        filters:
          - name: transit-gateway-id
            values:
              - ${aws_ec2_transit_gateway.example.id}
          - name: resource-type
            values:
              - peering
```
{{% /example %}}
{{% /examples %}}
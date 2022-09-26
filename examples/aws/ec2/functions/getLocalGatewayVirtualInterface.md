Provides details about an EC2 Local Gateway Virtual Interface. More information can be found in the [Outposts User Guide](https://docs.aws.amazon.com/outposts/latest/userguide/outposts-networking-components.html#routing).

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = .map(([, ]) => aws.ec2.getLocalGatewayVirtualInterface({
    id: __value,
}));
```
```python
import pulumi
import pulumi_aws as aws

example = [aws.ec2.get_local_gateway_virtual_interface(id=__value) for __key, __value in data["aws_ec2_local_gateway_virtual_interface_group"]["example"]["local_gateway_virtual_interface_ids"]]
```
{{% /example %}}
{{% /examples %}}
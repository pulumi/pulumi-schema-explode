Provides an RDS DB proxy endpoint resource. For additional information, see the [RDS User Guide](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-endpoints.html).

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.rds.ProxyEndpoint("example", {
    dbProxyName: aws_db_proxy.test.name,
    dbProxyEndpointName: "example",
    vpcSubnetIds: aws_subnet.test.map(__item => __item.id),
    targetRole: "READ_ONLY",
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.rds.ProxyEndpoint("example",
    db_proxy_name=aws_db_proxy["test"]["name"],
    db_proxy_endpoint_name="example",
    vpc_subnet_ids=[__item["id"] for __item in aws_subnet["test"]],
    target_role="READ_ONLY")
```
```csharp
using System.Collections.Generic;
using System.Linq;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Rds.ProxyEndpoint("example", new()
    {
        DbProxyName = aws_db_proxy.Test.Name,
        DbProxyEndpointName = "example",
        VpcSubnetIds = aws_subnet.Test.Select(__item => __item.Id).ToList(),
        TargetRole = "READ_ONLY",
    });

});
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.rds.ProxyEndpoint;
import com.pulumi.aws.rds.ProxyEndpointArgs;
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
        var example = new ProxyEndpoint("example", ProxyEndpointArgs.builder()        
            .dbProxyName(aws_db_proxy.test().name())
            .dbProxyEndpointName("example")
            .vpcSubnetIds(aws_subnet.test().stream().map(element -> element.id()).collect(toList()))
            .targetRole("READ_ONLY")
            .build());

    }
}
```
{{% /example %}}
{{% /examples %}}

## Import

DB proxy endpoints can be imported using the `DB-PROXY-NAME/DB-PROXY-ENDPOINT-NAME`, e.g.,

```sh
 $ pulumi import aws:rds/proxyEndpoint:ProxyEndpoint example example/example
```

 
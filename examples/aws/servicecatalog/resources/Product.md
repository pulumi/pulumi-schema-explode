Manages a Service Catalog Product.

> **NOTE:** The user or role that uses this resources must have the `cloudformation:GetTemplate` IAM policy permission. This policy permission is required when using the `template_physical_id` argument.

> A "provisioning artifact" is also referred to as a "version." A "distributor" is also referred to as a "vendor."

{{% examples %}}
## Example Usage
{{% example %}}
### Basic Usage

```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.servicecatalog.Product;
import com.pulumi.aws.servicecatalog.ProductArgs;
import com.pulumi.aws.servicecatalog.inputs.ProductProvisioningArtifactParametersArgs;
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
        var example = new Product("example", ProductArgs.builder()        
            .owner(aws_security_group.example().id())
            .type(aws_subnet.main().id())
            .provisioningArtifactParameters(ProductProvisioningArtifactParametersArgs.builder()
                .templateUrl("https://s3.amazonaws.com/cf-templates-ozkq9d3hgiq2-us-east-1/temp1.json")
                .build())
            .tags(Map.of("foo", "bar"))
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:servicecatalog:Product
    properties:
      owner:
        - ${aws_security_group.example.id}
      type: ${aws_subnet.main.id}
      provisioningArtifactParameters:
        templateUrl: https://s3.amazonaws.com/cf-templates-ozkq9d3hgiq2-us-east-1/temp1.json
      tags:
        foo: bar
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_servicecatalog_product` can be imported using the product ID, e.g.,

```sh
 $ pulumi import aws:servicecatalog/product:Product example prod-dnigbtea24ste
```

 
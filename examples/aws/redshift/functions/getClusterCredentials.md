Provides redshift subnet group.

{{% examples %}}
## Example Usage
{{% example %}}

```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.redshift.RedshiftFunctions;
import com.pulumi.aws.redshift.inputs.GetClusterCredentialsArgs;
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
        final var example = RedshiftFunctions.getClusterCredentials(GetClusterCredentialsArgs.builder()
            .name(aws_redshift_cluster_credentials.example().name())
            .build());

    }
}
```
```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:redshift:getClusterCredentials
      Arguments:
        name: ${aws_redshift_cluster_credentials.example.name}
```
{{% /example %}}
{{% /examples %}}
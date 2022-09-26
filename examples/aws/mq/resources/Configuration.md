Provides an MQ Configuration Resource.

For more information on Amazon MQ, see [Amazon MQ documentation](https://docs.aws.amazon.com/amazon-mq/latest/developer-guide/welcome.html).

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.mq.Configuration("example", {
    data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<broker xmlns="http://activemq.apache.org/schema/core">
  <plugins>
    <forcePersistencyModeBrokerPlugin persistenceFlag="true"/>
    <statisticsBrokerPlugin/>
    <timeStampingBrokerPlugin ttlCeiling="86400000" zeroExpirationOverride="86400000"/>
  </plugins>
</broker>
`,
    description: "Example Configuration",
    engineType: "ActiveMQ",
    engineVersion: "5.15.0",
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.mq.Configuration("example",
    data="""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<broker xmlns="http://activemq.apache.org/schema/core">
  <plugins>
    <forcePersistencyModeBrokerPlugin persistenceFlag="true"/>
    <statisticsBrokerPlugin/>
    <timeStampingBrokerPlugin ttlCeiling="86400000" zeroExpirationOverride="86400000"/>
  </plugins>
</broker>

""",
    description="Example Configuration",
    engine_type="ActiveMQ",
    engine_version="5.15.0")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Mq.Configuration("example", new()
    {
        Data = @"<?xml version=""1.0"" encoding=""UTF-8"" standalone=""yes""?>
<broker xmlns=""http://activemq.apache.org/schema/core"">
  <plugins>
    <forcePersistencyModeBrokerPlugin persistenceFlag=""true""/>
    <statisticsBrokerPlugin/>
    <timeStampingBrokerPlugin ttlCeiling=""86400000"" zeroExpirationOverride=""86400000""/>
  </plugins>
</broker>

",
        Description = "Example Configuration",
        EngineType = "ActiveMQ",
        EngineVersion = "5.15.0",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/mq"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := mq.NewConfiguration(ctx, "example", &mq.ConfigurationArgs{
			Data: pulumi.String(fmt.Sprintf(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<broker xmlns="http://activemq.apache.org/schema/core">
  <plugins>
    <forcePersistencyModeBrokerPlugin persistenceFlag="true"/>
    <statisticsBrokerPlugin/>
    <timeStampingBrokerPlugin ttlCeiling="86400000" zeroExpirationOverride="86400000"/>
  </plugins>
</broker>

`)),
			Description:   pulumi.String("Example Configuration"),
			EngineType:    pulumi.String("ActiveMQ"),
			EngineVersion: pulumi.String("5.15.0"),
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
import com.pulumi.aws.mq.Configuration;
import com.pulumi.aws.mq.ConfigurationArgs;
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
        var example = new Configuration("example", ConfigurationArgs.builder()        
            .data("""
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<broker xmlns="http://activemq.apache.org/schema/core">
  <plugins>
    <forcePersistencyModeBrokerPlugin persistenceFlag="true"/>
    <statisticsBrokerPlugin/>
    <timeStampingBrokerPlugin ttlCeiling="86400000" zeroExpirationOverride="86400000"/>
  </plugins>
</broker>

            """)
            .description("Example Configuration")
            .engineType("ActiveMQ")
            .engineVersion("5.15.0")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:mq:Configuration
    properties:
      data: |+
        <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <broker xmlns="http://activemq.apache.org/schema/core">
          <plugins>
            <forcePersistencyModeBrokerPlugin persistenceFlag="true"/>
            <statisticsBrokerPlugin/>
            <timeStampingBrokerPlugin ttlCeiling="86400000" zeroExpirationOverride="86400000"/>
          </plugins>
        </broker>

      description: Example Configuration
      engineType: ActiveMQ
      engineVersion: 5.15.0
```
{{% /example %}}
{{% /examples %}}

## Import

MQ Configurations can be imported using the configuration ID, e.g.,

```sh
 $ pulumi import aws:mq/configuration:Configuration example c-0187d1eb-88c8-475a-9b79-16ef5a10c94f
```

 
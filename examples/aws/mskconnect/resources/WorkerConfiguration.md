Provides an Amazon MSK Connect Worker Configuration Resource.

{{% examples %}}
## Example Usage
{{% example %}}
### Basic configuration

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.mskconnect.WorkerConfiguration("example", {
    propertiesFileContent: `key.converter=org.apache.kafka.connect.storage.StringConverter
value.converter=org.apache.kafka.connect.storage.StringConverter
`,
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.mskconnect.WorkerConfiguration("example", properties_file_content="""key.converter=org.apache.kafka.connect.storage.StringConverter
value.converter=org.apache.kafka.connect.storage.StringConverter

""")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.MskConnect.WorkerConfiguration("example", new()
    {
        PropertiesFileContent = @"key.converter=org.apache.kafka.connect.storage.StringConverter
value.converter=org.apache.kafka.connect.storage.StringConverter

",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/mskconnect"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := mskconnect.NewWorkerConfiguration(ctx, "example", &mskconnect.WorkerConfigurationArgs{
			PropertiesFileContent: pulumi.String(fmt.Sprintf("key.converter=org.apache.kafka.connect.storage.StringConverter\nvalue.converter=org.apache.kafka.connect.storage.StringConverter\n\n")),
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
import com.pulumi.aws.mskconnect.WorkerConfiguration;
import com.pulumi.aws.mskconnect.WorkerConfigurationArgs;
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
        var example = new WorkerConfiguration("example", WorkerConfigurationArgs.builder()        
            .propertiesFileContent("""
key.converter=org.apache.kafka.connect.storage.StringConverter
value.converter=org.apache.kafka.connect.storage.StringConverter

            """)
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:mskconnect:WorkerConfiguration
    properties:
      propertiesFileContent: |+
        key.converter=org.apache.kafka.connect.storage.StringConverter
        value.converter=org.apache.kafka.connect.storage.StringConverter
```
{{% /example %}}
{{% /examples %}}

## Import

MSK Connect Worker Configuration can be imported using the plugin's `arn`, e.g.,

```sh
 $ pulumi import aws:mskconnect/workerConfiguration:WorkerConfiguration example 'arn:aws:kafkaconnect:eu-central-1:123456789012:worker-configuration/example/8848493b-7fcc-478c-a646-4a52634e3378-4'
```

 
Retrieve information about a GuardDuty detector.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = pulumi.output(aws.guardduty.getDetector());
```
```python
import pulumi
import pulumi_aws as aws

example = aws.guardduty.get_detector()
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = Aws.GuardDuty.GetDetector.Invoke();

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/guardduty"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := guardduty.LookupDetector(ctx, nil, nil)
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
import com.pulumi.aws.guardduty.GuarddutyFunctions;
import com.pulumi.aws.guardduty.inputs.GetDetectorArgs;
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
        final var example = GuarddutyFunctions.getDetector();

    }
}
```
```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:guardduty:getDetector
      Arguments: {}
```
{{% /example %}}
{{% /examples %}}
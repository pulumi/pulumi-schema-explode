Provides an SSM Parameter data source.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const foo = pulumi.output(aws.ssm.getParameter({
    name: "foo",
}));
```
```python
import pulumi
import pulumi_aws as aws

foo = aws.ssm.get_parameter(name="foo")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var foo = Aws.Ssm.GetParameter.Invoke(new()
    {
        Name = "foo",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ssm"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := ssm.LookupParameter(ctx, &ssm.LookupParameterArgs{
			Name: "foo",
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
import com.pulumi.aws.ssm.SsmFunctions;
import com.pulumi.aws.ssm.inputs.GetParameterArgs;
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
        final var foo = SsmFunctions.getParameter(GetParameterArgs.builder()
            .name("foo")
            .build());

    }
}
```
```yaml
variables:
  foo:
    Fn::Invoke:
      Function: aws:ssm:getParameter
      Arguments:
        name: foo
```

> **Note:** The data source is currently following the behavior of the [SSM API](https://docs.aws.amazon.com/sdk-for-go/api/service/ssm/#Parameter) to return a string value, regardless of parameter type.
{{% /example %}}
{{% /examples %}}
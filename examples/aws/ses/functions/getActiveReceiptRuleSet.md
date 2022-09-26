Retrieve the active SES receipt rule set

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const main = pulumi.output(aws.ses.getActiveReceiptRuleSet());
```
```python
import pulumi
import pulumi_aws as aws

main = aws.ses.get_active_receipt_rule_set()
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var main = Aws.Ses.GetActiveReceiptRuleSet.Invoke();

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ses"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := ses.LookupActiveReceiptRuleSet(ctx, nil, nil)
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
import com.pulumi.aws.ses.SesFunctions;
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
        final var main = SesFunctions.getActiveReceiptRuleSet();

    }
}
```
```yaml
variables:
  main:
    Fn::Invoke:
      Function: aws:ses:getActiveReceiptRuleSet
      Arguments: {}
```
{{% /example %}}
{{% /examples %}}
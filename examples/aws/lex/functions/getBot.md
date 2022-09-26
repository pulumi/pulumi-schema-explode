Provides details about a specific Amazon Lex Bot.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const orderFlowersBot = pulumi.output(aws.lex.getBot({
    name: "OrderFlowers",
    version: "$LATEST",
}));
```
```python
import pulumi
import pulumi_aws as aws

order_flowers_bot = aws.lex.get_bot(name="OrderFlowers",
    version="$LATEST")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var orderFlowersBot = Aws.Lex.GetBot.Invoke(new()
    {
        Name = "OrderFlowers",
        Version = "$LATEST",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lex"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := lex.LookupBot(ctx, &lex.LookupBotArgs{
			Name:    "OrderFlowers",
			Version: pulumi.StringRef(fmt.Sprintf("$LATEST")),
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
import com.pulumi.aws.lex.LexFunctions;
import com.pulumi.aws.lex.inputs.GetBotArgs;
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
        final var orderFlowersBot = LexFunctions.getBot(GetBotArgs.builder()
            .name("OrderFlowers")
            .version("$LATEST")
            .build());

    }
}
```
```yaml
variables:
  orderFlowersBot:
    Fn::Invoke:
      Function: aws:lex:getBot
      Arguments:
        name: OrderFlowers
        version: $LATEST
```
{{% /example %}}
{{% /examples %}}
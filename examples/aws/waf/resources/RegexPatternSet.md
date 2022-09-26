Provides a WAF Regex Pattern Set Resource

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.waf.RegexPatternSet("example", {
    regexPatternStrings: [
        "one",
        "two",
    ],
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.waf.RegexPatternSet("example", regex_pattern_strings=[
    "one",
    "two",
])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Waf.RegexPatternSet("example", new()
    {
        RegexPatternStrings = new[]
        {
            "one",
            "two",
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/waf"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := waf.NewRegexPatternSet(ctx, "example", &waf.RegexPatternSetArgs{
			RegexPatternStrings: pulumi.StringArray{
				pulumi.String("one"),
				pulumi.String("two"),
			},
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
import com.pulumi.aws.waf.RegexPatternSet;
import com.pulumi.aws.waf.RegexPatternSetArgs;
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
        var example = new RegexPatternSet("example", RegexPatternSetArgs.builder()        
            .regexPatternStrings(            
                "one",
                "two")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:waf:RegexPatternSet
    properties:
      regexPatternStrings:
        - one
        - two
```
{{% /example %}}
{{% /examples %}}

## Import

AWS WAF Regex Pattern Set can be imported using their ID, e.g.,

```sh
 $ pulumi import aws:waf/regexPatternSet:RegexPatternSet example a1b2c3d4-d5f6-7777-8888-9999aaaabbbbcccc
```

 
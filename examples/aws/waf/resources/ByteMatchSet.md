Provides a WAF Byte Match Set Resource

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const byteSet = new aws.waf.ByteMatchSet("byte_set", {
    byteMatchTuples: [{
        fieldToMatch: {
            data: "referer",
            type: "HEADER",
        },
        positionalConstraint: "CONTAINS",
        targetString: "badrefer1",
        textTransformation: "NONE",
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

byte_set = aws.waf.ByteMatchSet("byteSet", byte_match_tuples=[aws.waf.ByteMatchSetByteMatchTupleArgs(
    field_to_match=aws.waf.ByteMatchSetByteMatchTupleFieldToMatchArgs(
        data="referer",
        type="HEADER",
    ),
    positional_constraint="CONTAINS",
    target_string="badrefer1",
    text_transformation="NONE",
)])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var byteSet = new Aws.Waf.ByteMatchSet("byteSet", new()
    {
        ByteMatchTuples = new[]
        {
            new Aws.Waf.Inputs.ByteMatchSetByteMatchTupleArgs
            {
                FieldToMatch = new Aws.Waf.Inputs.ByteMatchSetByteMatchTupleFieldToMatchArgs
                {
                    Data = "referer",
                    Type = "HEADER",
                },
                PositionalConstraint = "CONTAINS",
                TargetString = "badrefer1",
                TextTransformation = "NONE",
            },
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
		_, err := waf.NewByteMatchSet(ctx, "byteSet", &waf.ByteMatchSetArgs{
			ByteMatchTuples: waf.ByteMatchSetByteMatchTupleArray{
				&waf.ByteMatchSetByteMatchTupleArgs{
					FieldToMatch: &waf.ByteMatchSetByteMatchTupleFieldToMatchArgs{
						Data: pulumi.String("referer"),
						Type: pulumi.String("HEADER"),
					},
					PositionalConstraint: pulumi.String("CONTAINS"),
					TargetString:         pulumi.String("badrefer1"),
					TextTransformation:   pulumi.String("NONE"),
				},
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
import com.pulumi.aws.waf.ByteMatchSet;
import com.pulumi.aws.waf.ByteMatchSetArgs;
import com.pulumi.aws.waf.inputs.ByteMatchSetByteMatchTupleArgs;
import com.pulumi.aws.waf.inputs.ByteMatchSetByteMatchTupleFieldToMatchArgs;
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
        var byteSet = new ByteMatchSet("byteSet", ByteMatchSetArgs.builder()        
            .byteMatchTuples(ByteMatchSetByteMatchTupleArgs.builder()
                .fieldToMatch(ByteMatchSetByteMatchTupleFieldToMatchArgs.builder()
                    .data("referer")
                    .type("HEADER")
                    .build())
                .positionalConstraint("CONTAINS")
                .targetString("badrefer1")
                .textTransformation("NONE")
                .build())
            .build());

    }
}
```
```yaml
resources:
  byteSet:
    type: aws:waf:ByteMatchSet
    properties:
      byteMatchTuples:
        - fieldToMatch:
            data: referer
            type: HEADER
          positionalConstraint: CONTAINS
          targetString: badrefer1
          textTransformation: NONE
```
{{% /example %}}
{{% /examples %}}

## Import

WAF Byte Match Set can be imported using the id, e.g.,

```sh
 $ pulumi import aws:waf/byteMatchSet:ByteMatchSet byte_set a1b2c3d4-d5f6-7777-8888-9999aaaabbbbcccc
```

 
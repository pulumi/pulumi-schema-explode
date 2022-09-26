Manages a Route53 Traffic Policy.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.route53.TrafficPolicy("example", {
    comment: "example comment",
    document: `{
  "AWSPolicyFormatVersion": "2015-10-01",
  "RecordType": "A",
  "Endpoints": {
    "endpoint-start-NkPh": {
      "Type": "value",
      "Value": "10.0.0.2"
    }
  },
  "StartEndpoint": "endpoint-start-NkPh"
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.route53.TrafficPolicy("example",
    comment="example comment",
    document="""{
  "AWSPolicyFormatVersion": "2015-10-01",
  "RecordType": "A",
  "Endpoints": {
    "endpoint-start-NkPh": {
      "Type": "value",
      "Value": "10.0.0.2"
    }
  },
  "StartEndpoint": "endpoint-start-NkPh"
}

""")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Route53.TrafficPolicy("example", new()
    {
        Comment = "example comment",
        Document = @"{
  ""AWSPolicyFormatVersion"": ""2015-10-01"",
  ""RecordType"": ""A"",
  ""Endpoints"": {
    ""endpoint-start-NkPh"": {
      ""Type"": ""value"",
      ""Value"": ""10.0.0.2""
    }
  },
  ""StartEndpoint"": ""endpoint-start-NkPh""
}

",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/route53"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := route53.NewTrafficPolicy(ctx, "example", &route53.TrafficPolicyArgs{
			Comment: pulumi.String("example comment"),
			Document: pulumi.String(fmt.Sprintf(`{
  "AWSPolicyFormatVersion": "2015-10-01",
  "RecordType": "A",
  "Endpoints": {
    "endpoint-start-NkPh": {
      "Type": "value",
      "Value": "10.0.0.2"
    }
  },
  "StartEndpoint": "endpoint-start-NkPh"
}

`)),
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
import com.pulumi.aws.route53.TrafficPolicy;
import com.pulumi.aws.route53.TrafficPolicyArgs;
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
        var example = new TrafficPolicy("example", TrafficPolicyArgs.builder()        
            .comment("example comment")
            .document("""
{
  "AWSPolicyFormatVersion": "2015-10-01",
  "RecordType": "A",
  "Endpoints": {
    "endpoint-start-NkPh": {
      "Type": "value",
      "Value": "10.0.0.2"
    }
  },
  "StartEndpoint": "endpoint-start-NkPh"
}

            """)
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:route53:TrafficPolicy
    properties:
      comment: example comment
      document: |+
        {
          "AWSPolicyFormatVersion": "2015-10-01",
          "RecordType": "A",
          "Endpoints": {
            "endpoint-start-NkPh": {
              "Type": "value",
              "Value": "10.0.0.2"
            }
          },
          "StartEndpoint": "endpoint-start-NkPh"
        }
```
{{% /example %}}
{{% /examples %}}

## Import

Route53 Traffic Policy can be imported using the `id` and `version`, e.g.

```sh
 $ pulumi import aws:route53/trafficPolicy:TrafficPolicy example 01a52019-d16f-422a-ae72-c306d2b6df7e/1
```

 
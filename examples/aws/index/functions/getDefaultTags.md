{{% examples %}}
## Example Usage
{{% example %}}
### Basic Usage

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = pulumi.output(aws.getDefaultTags());
```
```python
import pulumi
import pulumi_aws as aws

example = aws.get_default_tags()
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = Aws.GetDefaultTags.Invoke();

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := aws.GetDefaultTags(ctx, nil, nil)
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
import com.pulumi.aws.AwsFunctions;
import com.pulumi.aws.inputs.GetDefaultTagsArgs;
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
        final var example = AwsFunctions.getDefaultTags();

    }
}
```
```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:getDefaultTags
      Arguments: {}
```
{{% /example %}}
{{% example %}}
### Dynamically Apply Default Tags to Auto Scaling Group

```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.AwsFunctions;
import com.pulumi.aws.inputs.GetDefaultTagsArgs;
import com.pulumi.aws.autoscaling.Group;
import com.pulumi.aws.autoscaling.GroupArgs;
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
        final var exampleDefaultTags = AwsFunctions.getDefaultTags();

        var exampleGroup = new Group("exampleGroup", GroupArgs.builder()        
            .dynamic(%!v(PANIC=Format method: runtime error: invalid memory address or nil pointer dereference))
            .build());

    }
}
```
```yaml
resources:
  exampleGroup:
    type: aws:autoscaling:Group
    properties:
      # ...
      dynamic:
        - forEach: ${exampleDefaultTags.tags}
          content:
            - key: ${tag.key}
              value: ${tag.value}
              propagateAtLaunch: true
variables:
  exampleDefaultTags:
    Fn::Invoke:
      Function: aws:getDefaultTags
      Arguments: {}
```
{{% /example %}}
{{% /examples %}}
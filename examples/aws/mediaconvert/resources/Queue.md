Provides an AWS Elemental MediaConvert Queue.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const test = new aws.mediaconvert.Queue("test", {});
```
```python
import pulumi
import pulumi_aws as aws

test = aws.mediaconvert.Queue("test")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var test = new Aws.MediaConvert.Queue("test");

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/mediaconvert"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := mediaconvert.NewQueue(ctx, "test", nil)
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
import com.pulumi.aws.mediaconvert.Queue;
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
        var test = new Queue("test");

    }
}
```
```yaml
resources:
  test:
    type: aws:mediaconvert:Queue
```
{{% /example %}}
{{% /examples %}}

## Import

Media Convert Queue can be imported via the queue name, e.g.,

```sh
 $ pulumi import aws:mediaconvert/queue:Queue test tf-test-queue
```

 
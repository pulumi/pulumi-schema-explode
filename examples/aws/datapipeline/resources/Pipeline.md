Provides a DataPipeline Pipeline resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const defaultPipeline = new aws.datapipeline.Pipeline("default", {});
```
```python
import pulumi
import pulumi_aws as aws

default = aws.datapipeline.Pipeline("default")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var @default = new Aws.DataPipeline.Pipeline("default");

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/datapipeline"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := datapipeline.NewPipeline(ctx, "default", nil)
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
import com.pulumi.aws.datapipeline.Pipeline;
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
        var default_ = new Pipeline("default");

    }
}
```
```yaml
resources:
  default:
    type: aws:datapipeline:Pipeline
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_datapipeline_pipeline` can be imported by using the id (Pipeline ID), e.g.,

```sh
 $ pulumi import aws:datapipeline/pipeline:Pipeline default df-1234567890
```

 
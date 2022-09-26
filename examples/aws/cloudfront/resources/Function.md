Provides a CloudFront Function resource. With CloudFront Functions in Amazon CloudFront, you can write lightweight functions in JavaScript for high-scale, latency-sensitive CDN customizations.

See [CloudFront Functions](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html)

> **NOTE:** You cannot delete a function if it’s associated with a cache behavior. First, update your distributions to remove the function association from all cache behaviors, then delete the function.

{{% examples %}}
## Example Usage
{{% example %}}
### Basic Example

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as fs from "fs";

const test = new aws.cloudfront.Function("test", {
    runtime: "cloudfront-js-1.0",
    comment: "my function",
    publish: true,
    code: fs.readFileSync(`${path.module}/function.js`),
});
```
```python
import pulumi
import pulumi_aws as aws

test = aws.cloudfront.Function("test",
    runtime="cloudfront-js-1.0",
    comment="my function",
    publish=True,
    code=(lambda path: open(path).read())(f"{path['module']}/function.js"))
```
```csharp
using System.Collections.Generic;
using System.IO;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var test = new Aws.CloudFront.Function("test", new()
    {
        Runtime = "cloudfront-js-1.0",
        Comment = "my function",
        Publish = true,
        Code = File.ReadAllText($"{path.Module}/function.js"),
    });

});
```
```go
package main

import (
	"fmt"
	"io/ioutil"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudfront"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func readFileOrPanic(path string) pulumi.StringPtrInput {
	data, err := ioutil.ReadFile(path)
	if err != nil {
		panic(err.Error())
	}
	return pulumi.String(string(data))
}

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := cloudfront.NewFunction(ctx, "test", &cloudfront.FunctionArgs{
			Runtime: pulumi.String("cloudfront-js-1.0"),
			Comment: pulumi.String("my function"),
			Publish: pulumi.Bool(true),
			Code:    readFileOrPanic(fmt.Sprintf("%v/function.js", path.Module)),
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
import com.pulumi.aws.cloudfront.Function;
import com.pulumi.aws.cloudfront.FunctionArgs;
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
        var test = new Function("test", FunctionArgs.builder()        
            .runtime("cloudfront-js-1.0")
            .comment("my function")
            .publish(true)
            .code(Files.readString(Paths.get(String.format("%s/function.js", path.module()))))
            .build());

    }
}
```
{{% /example %}}
{{% /examples %}}

## Import

CloudFront Functions can be imported using the `name`, e.g.,

```sh
 $ pulumi import aws:cloudfront/function:Function test my_test_function
```

 
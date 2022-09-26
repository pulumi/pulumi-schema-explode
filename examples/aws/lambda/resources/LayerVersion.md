{{% examples %}}
## Example Usage
{{% example %}}
### Basic Example

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const lambdaLayer = new aws.lambda.LayerVersion("lambda_layer", {
    compatibleRuntimes: ["nodejs12.x"],
    code: new pulumi.asset.FileArchive("lambda_layer_payload.zip"),
    layerName: "lambda_layer_name",
});
```
```python
import pulumi
import pulumi_aws as aws

lambda_layer = aws.lambda_.LayerVersion("lambdaLayer",
    compatible_runtimes=["nodejs12.x"],
    code=pulumi.FileArchive("lambda_layer_payload.zip"),
    layer_name="lambda_layer_name")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var lambdaLayer = new Aws.Lambda.LayerVersion("lambdaLayer", new()
    {
        CompatibleRuntimes = new[]
        {
            "nodejs12.x",
        },
        Code = new FileArchive("lambda_layer_payload.zip"),
        LayerName = "lambda_layer_name",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lambda"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := lambda.NewLayerVersion(ctx, "lambdaLayer", &lambda.LayerVersionArgs{
			CompatibleRuntimes: pulumi.StringArray{
				pulumi.String("nodejs12.x"),
			},
			Code:      pulumi.NewFileArchive("lambda_layer_payload.zip"),
			LayerName: pulumi.String("lambda_layer_name"),
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
import com.pulumi.aws.lambda.LayerVersion;
import com.pulumi.aws.lambda.LayerVersionArgs;
import com.pulumi.asset.FileArchive;
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
        var lambdaLayer = new LayerVersion("lambdaLayer", LayerVersionArgs.builder()        
            .compatibleRuntimes("nodejs12.x")
            .code(new FileArchive("lambda_layer_payload.zip"))
            .layerName("lambda_layer_name")
            .build());

    }
}
```
```yaml
resources:
  lambdaLayer:
    type: aws:lambda:LayerVersion
    properties:
      compatibleRuntimes:
        - nodejs12.x
      code:
        Fn::FileArchive: lambda_layer_payload.zip
      layerName: lambda_layer_name
```
{{% /example %}}
{{% example %}}
### Lambda Layer with Compatible Architectures

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const lambdaLayer = new aws.lambda.LayerVersion("lambda_layer", {
    compatibleArchitectures: [
        "arm64",
        "x86_64",
    ],
    compatibleRuntimes: ["nodejs12.x"],
    code: new pulumi.asset.FileArchive("lambda_layer_payload.zip"),
    layerName: "lambda_layer_name",
});
```
```python
import pulumi
import pulumi_aws as aws

lambda_layer = aws.lambda_.LayerVersion("lambdaLayer",
    compatible_architectures=[
        "arm64",
        "x86_64",
    ],
    compatible_runtimes=["nodejs12.x"],
    code=pulumi.FileArchive("lambda_layer_payload.zip"),
    layer_name="lambda_layer_name")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var lambdaLayer = new Aws.Lambda.LayerVersion("lambdaLayer", new()
    {
        CompatibleArchitectures = new[]
        {
            "arm64",
            "x86_64",
        },
        CompatibleRuntimes = new[]
        {
            "nodejs12.x",
        },
        Code = new FileArchive("lambda_layer_payload.zip"),
        LayerName = "lambda_layer_name",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lambda"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := lambda.NewLayerVersion(ctx, "lambdaLayer", &lambda.LayerVersionArgs{
			CompatibleArchitectures: pulumi.StringArray{
				pulumi.String("arm64"),
				pulumi.String("x86_64"),
			},
			CompatibleRuntimes: pulumi.StringArray{
				pulumi.String("nodejs12.x"),
			},
			Code:      pulumi.NewFileArchive("lambda_layer_payload.zip"),
			LayerName: pulumi.String("lambda_layer_name"),
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
import com.pulumi.aws.lambda.LayerVersion;
import com.pulumi.aws.lambda.LayerVersionArgs;
import com.pulumi.asset.FileArchive;
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
        var lambdaLayer = new LayerVersion("lambdaLayer", LayerVersionArgs.builder()        
            .compatibleArchitectures(            
                "arm64",
                "x86_64")
            .compatibleRuntimes("nodejs12.x")
            .code(new FileArchive("lambda_layer_payload.zip"))
            .layerName("lambda_layer_name")
            .build());

    }
}
```
```yaml
resources:
  lambdaLayer:
    type: aws:lambda:LayerVersion
    properties:
      compatibleArchitectures:
        - arm64
        - x86_64
      compatibleRuntimes:
        - nodejs12.x
      code:
        Fn::FileArchive: lambda_layer_payload.zip
      layerName: lambda_layer_name
```

{{% /example %}}
{{% /examples %}}
## Specifying the Deployment Package

AWS Lambda Layers expect source code to be provided as a deployment package whose structure varies depending on which `compatible_runtimes` this layer specifies.
See [Runtimes](https://docs.aws.amazon.com/lambda/latest/dg/API_PublishLayerVersion.html#SSS-PublishLayerVersion-request-CompatibleRuntimes) for the valid values of `compatible_runtimes`.

Once you have created your deployment package you can specify it either directly as a local file (using the `filename` argument) or
indirectly via Amazon S3 (using the `s3_bucket`, `s3_key` and `s3_object_version` arguments). When providing the deployment
package via S3 it may be useful to use the `aws.s3.BucketObjectv2` resource to upload it.

For larger deployment packages it is recommended by Amazon to upload via S3, since the S3 API has better support for uploading large files efficiently.


## Import

Lambda Layers can be imported using `arn`.

```sh
 $ pulumi import aws:lambda/layerVersion:LayerVersion \
```





 aws_lambda_layer_version.test_layer \



 arn:aws:lambda:_REGION_:_ACCOUNT_ID_:layer:_LAYER_NAME_:_LAYER_VERSION_ 
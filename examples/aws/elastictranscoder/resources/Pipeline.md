Provides an Elastic Transcoder pipeline resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bar = new aws.elastictranscoder.Pipeline("bar", {
    inputBucket: aws_s3_bucket.input_bucket.bucket,
    role: aws_iam_role.test_role.arn,
    contentConfig: {
        bucket: aws_s3_bucket.content_bucket.bucket,
        storageClass: "Standard",
    },
    thumbnailConfig: {
        bucket: aws_s3_bucket.thumb_bucket.bucket,
        storageClass: "Standard",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

bar = aws.elastictranscoder.Pipeline("bar",
    input_bucket=aws_s3_bucket["input_bucket"]["bucket"],
    role=aws_iam_role["test_role"]["arn"],
    content_config=aws.elastictranscoder.PipelineContentConfigArgs(
        bucket=aws_s3_bucket["content_bucket"]["bucket"],
        storage_class="Standard",
    ),
    thumbnail_config=aws.elastictranscoder.PipelineThumbnailConfigArgs(
        bucket=aws_s3_bucket["thumb_bucket"]["bucket"],
        storage_class="Standard",
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var bar = new Aws.ElasticTranscoder.Pipeline("bar", new()
    {
        InputBucket = aws_s3_bucket.Input_bucket.Bucket,
        Role = aws_iam_role.Test_role.Arn,
        ContentConfig = new Aws.ElasticTranscoder.Inputs.PipelineContentConfigArgs
        {
            Bucket = aws_s3_bucket.Content_bucket.Bucket,
            StorageClass = "Standard",
        },
        ThumbnailConfig = new Aws.ElasticTranscoder.Inputs.PipelineThumbnailConfigArgs
        {
            Bucket = aws_s3_bucket.Thumb_bucket.Bucket,
            StorageClass = "Standard",
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/elastictranscoder"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := elastictranscoder.NewPipeline(ctx, "bar", &elastictranscoder.PipelineArgs{
			InputBucket: pulumi.Any(aws_s3_bucket.Input_bucket.Bucket),
			Role:        pulumi.Any(aws_iam_role.Test_role.Arn),
			ContentConfig: &elastictranscoder.PipelineContentConfigArgs{
				Bucket:       pulumi.Any(aws_s3_bucket.Content_bucket.Bucket),
				StorageClass: pulumi.String("Standard"),
			},
			ThumbnailConfig: &elastictranscoder.PipelineThumbnailConfigArgs{
				Bucket:       pulumi.Any(aws_s3_bucket.Thumb_bucket.Bucket),
				StorageClass: pulumi.String("Standard"),
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
import com.pulumi.aws.elastictranscoder.Pipeline;
import com.pulumi.aws.elastictranscoder.PipelineArgs;
import com.pulumi.aws.elastictranscoder.inputs.PipelineContentConfigArgs;
import com.pulumi.aws.elastictranscoder.inputs.PipelineThumbnailConfigArgs;
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
        var bar = new Pipeline("bar", PipelineArgs.builder()        
            .inputBucket(aws_s3_bucket.input_bucket().bucket())
            .role(aws_iam_role.test_role().arn())
            .contentConfig(PipelineContentConfigArgs.builder()
                .bucket(aws_s3_bucket.content_bucket().bucket())
                .storageClass("Standard")
                .build())
            .thumbnailConfig(PipelineThumbnailConfigArgs.builder()
                .bucket(aws_s3_bucket.thumb_bucket().bucket())
                .storageClass("Standard")
                .build())
            .build());

    }
}
```
```yaml
resources:
  bar:
    type: aws:elastictranscoder:Pipeline
    properties:
      inputBucket: ${aws_s3_bucket.input_bucket.bucket}
      role: ${aws_iam_role.test_role.arn}
      contentConfig:
        bucket: ${aws_s3_bucket.content_bucket.bucket}
        storageClass: Standard
      thumbnailConfig:
        bucket: ${aws_s3_bucket.thumb_bucket.bucket}
        storageClass: Standard
```
{{% /example %}}
{{% /examples %}}

## Import

Elastic Transcoder pipelines can be imported using the `id`, e.g.,

```sh
 $ pulumi import aws:elastictranscoder/pipeline:Pipeline basic_pipeline 1407981661351-cttk8b
```

 
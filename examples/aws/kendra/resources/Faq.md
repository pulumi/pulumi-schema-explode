{{% examples %}}
## Example Usage
{{% example %}}
### Basic

```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.kendra.Faq;
import com.pulumi.aws.kendra.FaqArgs;
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
        var example = new Faq("example", FaqArgs.builder()        
            .indexId(aws_kendra_index.example().id())
            .roleArn(aws_iam_role.example().arn())
            .sourceS3Path(%!v(PANIC=Format method: runtime error: invalid memory address or nil pointer dereference))
            .tags(Map.of("Name", "Example Kendra Faq"))
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:kendra:Faq
    properties:
      indexId: ${aws_kendra_index.example.id}
      roleArn: ${aws_iam_role.example.arn}
      sourceS3Path:
        - bucket: ${aws_s3_bucket.example.id}
          key: ${aws_s3_object.example.key}
      tags:
        Name: Example Kendra Faq
```
{{% /example %}}
{{% example %}}
### With File Format

```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.kendra.Faq;
import com.pulumi.aws.kendra.FaqArgs;
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
        var example = new Faq("example", FaqArgs.builder()        
            .indexId(aws_kendra_index.example().id())
            .fileFormat("CSV")
            .roleArn(aws_iam_role.example().arn())
            .sourceS3Path(%!v(PANIC=Format method: runtime error: invalid memory address or nil pointer dereference))
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:kendra:Faq
    properties:
      indexId: ${aws_kendra_index.example.id}
      fileFormat: CSV
      roleArn: ${aws_iam_role.example.arn}
      sourceS3Path:
        - bucket: ${aws_s3_bucket.example.id}
          key: ${aws_s3_object.example.key}
```
{{% /example %}}
{{% example %}}
### With Language Code

```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.kendra.Faq;
import com.pulumi.aws.kendra.FaqArgs;
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
        var example = new Faq("example", FaqArgs.builder()        
            .indexId(aws_kendra_index.example().id())
            .languageCode("en")
            .roleArn(aws_iam_role.example().arn())
            .sourceS3Path(%!v(PANIC=Format method: runtime error: invalid memory address or nil pointer dereference))
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:kendra:Faq
    properties:
      indexId: ${aws_kendra_index.example.id}
      languageCode: en
      roleArn: ${aws_iam_role.example.arn}
      sourceS3Path:
        - bucket: ${aws_s3_bucket.example.id}
          key: ${aws_s3_object.example.key}
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_kendra_faq` can be imported using the unique identifiers of the FAQ and index separated by a slash (`/`), e.g.,

```sh
 $ pulumi import aws:kendra/faq:Faq example faq-123456780/idx-8012925589
```

 
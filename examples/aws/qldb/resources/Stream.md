Provides an AWS Quantum Ledger Database (QLDB) Stream resource

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.qldb.Stream("example", {
    inclusiveStartTime: "2021-01-01T00:00:00Z",
    kinesisConfiguration: {
        aggegationEnabled: false,
        streamArn: "arn:aws:kinesis:us-east-1:xxxxxxxxxxxx:stream/example-kinesis-stream",
    },
    ledgerName: "existing-ledger-name",
    roleArn: "sample-role-arn",
    streamName: "sample-ledger-stream",
    tags: {
        example: "tag",
    },
});
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.qldb.Stream;
import com.pulumi.aws.qldb.StreamArgs;
import com.pulumi.aws.qldb.inputs.StreamKinesisConfigurationArgs;
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
        var example = new Stream("example", StreamArgs.builder()        
            .inclusiveStartTime("2021-01-01T00:00:00Z")
            .kinesisConfiguration(StreamKinesisConfigurationArgs.builder()
                .aggegationEnabled(false)
                .streamArn("arn:aws:kinesis:us-east-1:xxxxxxxxxxxx:stream/example-kinesis-stream")
                .build())
            .ledgerName("existing-ledger-name")
            .roleArn("sample-role-arn")
            .streamName("sample-ledger-stream")
            .tags(Map.of("example", "tag"))
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:qldb:Stream
    properties:
      inclusiveStartTime: 2021-01-01T00:00:00Z
      kinesisConfiguration:
        aggegationEnabled: false
        streamArn: arn:aws:kinesis:us-east-1:xxxxxxxxxxxx:stream/example-kinesis-stream
      ledgerName: existing-ledger-name
      roleArn: sample-role-arn
      streamName: sample-ledger-stream
      tags:
        example: tag
```
{{% /example %}}
{{% /examples %}}
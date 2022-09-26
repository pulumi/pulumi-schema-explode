Adds a streaming configuration for the specified Amazon Chime Voice Connector. The streaming configuration specifies whether media streaming is enabled for sending to Amazon Kinesis.
It also sets the retention period, in hours, for the Amazon Kinesis data.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const defaultVoiceConnector = new aws.chime.VoiceConnector("defaultVoiceConnector", {requireEncryption: true});
const defaultVoiceConnectorStreaming = new aws.chime.VoiceConnectorStreaming("defaultVoiceConnectorStreaming", {
    disabled: false,
    voiceConnectorId: defaultVoiceConnector.id,
    dataRetention: 7,
    streamingNotificationTargets: ["SQS"],
});
```
```python
import pulumi
import pulumi_aws as aws

default_voice_connector = aws.chime.VoiceConnector("defaultVoiceConnector", require_encryption=True)
default_voice_connector_streaming = aws.chime.VoiceConnectorStreaming("defaultVoiceConnectorStreaming",
    disabled=False,
    voice_connector_id=default_voice_connector.id,
    data_retention=7,
    streaming_notification_targets=["SQS"])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var defaultVoiceConnector = new Aws.Chime.VoiceConnector("defaultVoiceConnector", new()
    {
        RequireEncryption = true,
    });

    var defaultVoiceConnectorStreaming = new Aws.Chime.VoiceConnectorStreaming("defaultVoiceConnectorStreaming", new()
    {
        Disabled = false,
        VoiceConnectorId = defaultVoiceConnector.Id,
        DataRetention = 7,
        StreamingNotificationTargets = new[]
        {
            "SQS",
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/chime"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		defaultVoiceConnector, err := chime.NewVoiceConnector(ctx, "defaultVoiceConnector", &chime.VoiceConnectorArgs{
			RequireEncryption: pulumi.Bool(true),
		})
		if err != nil {
			return err
		}
		_, err = chime.NewVoiceConnectorStreaming(ctx, "defaultVoiceConnectorStreaming", &chime.VoiceConnectorStreamingArgs{
			Disabled:         pulumi.Bool(false),
			VoiceConnectorId: defaultVoiceConnector.ID(),
			DataRetention:    pulumi.Int(7),
			StreamingNotificationTargets: pulumi.StringArray{
				pulumi.String("SQS"),
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
import com.pulumi.aws.chime.VoiceConnector;
import com.pulumi.aws.chime.VoiceConnectorArgs;
import com.pulumi.aws.chime.VoiceConnectorStreaming;
import com.pulumi.aws.chime.VoiceConnectorStreamingArgs;
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
        var defaultVoiceConnector = new VoiceConnector("defaultVoiceConnector", VoiceConnectorArgs.builder()        
            .requireEncryption(true)
            .build());

        var defaultVoiceConnectorStreaming = new VoiceConnectorStreaming("defaultVoiceConnectorStreaming", VoiceConnectorStreamingArgs.builder()        
            .disabled(false)
            .voiceConnectorId(defaultVoiceConnector.id())
            .dataRetention(7)
            .streamingNotificationTargets("SQS")
            .build());

    }
}
```
```yaml
resources:
  defaultVoiceConnector:
    type: aws:chime:VoiceConnector
    properties:
      requireEncryption: true
  defaultVoiceConnectorStreaming:
    type: aws:chime:VoiceConnectorStreaming
    properties:
      disabled: false
      voiceConnectorId: ${defaultVoiceConnector.id}
      dataRetention: 7
      streamingNotificationTargets:
        - SQS
```
{{% /example %}}
{{% /examples %}}

## Import

Chime Voice Connector Streaming can be imported using the `voice_connector_id`, e.g.,

```sh
 $ pulumi import aws:chime/voiceConnectorStreaming:VoiceConnectorStreaming default abcdef1ghij2klmno3pqr4
```

 
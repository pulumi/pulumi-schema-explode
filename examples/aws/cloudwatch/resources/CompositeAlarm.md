Provides a CloudWatch Composite Alarm resource.

> **NOTE:** An alarm (composite or metric) cannot be destroyed when there are other composite alarms depending on it. This can lead to a cyclical dependency on update, as the provider will unsuccessfully attempt to destroy alarms before updating the rule. Consider using `depends_on`, references to alarm names, and two-stage updates.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.cloudwatch.CompositeAlarm("example", {
    alarmDescription: "This is a composite alarm!",
    alarmName: "example-composite-alarm",
    alarmActions: aws_sns_topic.example.arn,
    okActions: aws_sns_topic.example.arn,
    alarmRule: `ALARM(${aws_cloudwatch_metric_alarm.alpha.alarm_name}) OR
ALARM(${aws_cloudwatch_metric_alarm.bravo.alarm_name})
`,
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.cloudwatch.CompositeAlarm("example",
    alarm_description="This is a composite alarm!",
    alarm_name="example-composite-alarm",
    alarm_actions=aws_sns_topic["example"]["arn"],
    ok_actions=aws_sns_topic["example"]["arn"],
    alarm_rule=f"""ALARM({aws_cloudwatch_metric_alarm["alpha"]["alarm_name"]}) OR
ALARM({aws_cloudwatch_metric_alarm["bravo"]["alarm_name"]})
""")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.CloudWatch.CompositeAlarm("example", new()
    {
        AlarmDescription = "This is a composite alarm!",
        AlarmName = "example-composite-alarm",
        AlarmActions = aws_sns_topic.Example.Arn,
        OkActions = aws_sns_topic.Example.Arn,
        AlarmRule = @$"ALARM({aws_cloudwatch_metric_alarm.Alpha.Alarm_name}) OR
ALARM({aws_cloudwatch_metric_alarm.Bravo.Alarm_name})
",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudwatch"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := cloudwatch.NewCompositeAlarm(ctx, "example", &cloudwatch.CompositeAlarmArgs{
			AlarmDescription: pulumi.String("This is a composite alarm!"),
			AlarmName:        pulumi.String("example-composite-alarm"),
			AlarmActions:     pulumi.Any(aws_sns_topic.Example.Arn),
			OkActions:        pulumi.Any(aws_sns_topic.Example.Arn),
			AlarmRule:        pulumi.String(fmt.Sprintf("ALARM(%v) OR\nALARM(%v)\n", aws_cloudwatch_metric_alarm.Alpha.Alarm_name, aws_cloudwatch_metric_alarm.Bravo.Alarm_name)),
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
import com.pulumi.aws.cloudwatch.CompositeAlarm;
import com.pulumi.aws.cloudwatch.CompositeAlarmArgs;
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
        var example = new CompositeAlarm("example", CompositeAlarmArgs.builder()        
            .alarmDescription("This is a composite alarm!")
            .alarmName("example-composite-alarm")
            .alarmActions(aws_sns_topic.example().arn())
            .okActions(aws_sns_topic.example().arn())
            .alarmRule("""
ALARM(%s) OR
ALARM(%s)
", aws_cloudwatch_metric_alarm.alpha().alarm_name(),aws_cloudwatch_metric_alarm.bravo().alarm_name()))
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:cloudwatch:CompositeAlarm
    properties:
      alarmDescription: This is a composite alarm!
      alarmName: example-composite-alarm
      alarmActions: ${aws_sns_topic.example.arn}
      okActions: ${aws_sns_topic.example.arn}
      alarmRule: |
        ALARM(${aws_cloudwatch_metric_alarm.alpha.alarm_name}) OR
        ALARM(${aws_cloudwatch_metric_alarm.bravo.alarm_name})
```
{{% /example %}}
{{% /examples %}}

## Import

Use the `alarm_name` to import a CloudWatch Composite Alarm. For example

```sh
 $ pulumi import aws:cloudwatch/compositeAlarm:CompositeAlarm test my-alarm
```

 
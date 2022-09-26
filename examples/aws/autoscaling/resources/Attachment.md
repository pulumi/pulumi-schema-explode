Provides an Auto Scaling Attachment resource.

> **NOTE on Auto Scaling Groups and ASG Attachments:** This provider currently provides
both a standalone `aws.autoscaling.Attachment` resource
(describing an ASG attached to an ELB or ALB), and an `aws.autoscaling.Group`
with `load_balancers` and `target_group_arns` defined in-line. These two methods are not
mutually-exclusive. If `aws.autoscaling.Attachment` resources are used, either alone or with inline
`load_balancers` or `target_group_arns`, the `aws.autoscaling.Group` resource must be configured
to [ignore changes](https://www.pulumi.com/docs/intro/concepts/programming-model/#ignorechanges) to the `load_balancers` and `target_group_arns` arguments.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Create a new load balancer attachment
const asgAttachmentBar = new aws.autoscaling.Attachment("asgAttachmentBar", {
    autoscalingGroupName: aws_autoscaling_group.asg.id,
    elb: aws_elb.bar.id,
});
```
```python
import pulumi
import pulumi_aws as aws

# Create a new load balancer attachment
asg_attachment_bar = aws.autoscaling.Attachment("asgAttachmentBar",
    autoscaling_group_name=aws_autoscaling_group["asg"]["id"],
    elb=aws_elb["bar"]["id"])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    // Create a new load balancer attachment
    var asgAttachmentBar = new Aws.AutoScaling.Attachment("asgAttachmentBar", new()
    {
        AutoscalingGroupName = aws_autoscaling_group.Asg.Id,
        Elb = aws_elb.Bar.Id,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/autoscaling"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := autoscaling.NewAttachment(ctx, "asgAttachmentBar", &autoscaling.AttachmentArgs{
			AutoscalingGroupName: pulumi.Any(aws_autoscaling_group.Asg.Id),
			Elb:                  pulumi.Any(aws_elb.Bar.Id),
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
import com.pulumi.aws.autoscaling.Attachment;
import com.pulumi.aws.autoscaling.AttachmentArgs;
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
        var asgAttachmentBar = new Attachment("asgAttachmentBar", AttachmentArgs.builder()        
            .autoscalingGroupName(aws_autoscaling_group.asg().id())
            .elb(aws_elb.bar().id())
            .build());

    }
}
```
```yaml
resources:
  # Create a new load balancer attachment
  asgAttachmentBar:
    type: aws:autoscaling:Attachment
    properties:
      autoscalingGroupName: ${aws_autoscaling_group.asg.id}
      elb: ${aws_elb.bar.id}
```

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Create a new ALB Target Group attachment
const asgAttachmentBar = new aws.autoscaling.Attachment("asgAttachmentBar", {
    autoscalingGroupName: aws_autoscaling_group.asg.id,
    lbTargetGroupArn: aws_lb_target_group.test.arn,
});
```
```python
import pulumi
import pulumi_aws as aws

# Create a new ALB Target Group attachment
asg_attachment_bar = aws.autoscaling.Attachment("asgAttachmentBar",
    autoscaling_group_name=aws_autoscaling_group["asg"]["id"],
    lb_target_group_arn=aws_lb_target_group["test"]["arn"])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    // Create a new ALB Target Group attachment
    var asgAttachmentBar = new Aws.AutoScaling.Attachment("asgAttachmentBar", new()
    {
        AutoscalingGroupName = aws_autoscaling_group.Asg.Id,
        LbTargetGroupArn = aws_lb_target_group.Test.Arn,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/autoscaling"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := autoscaling.NewAttachment(ctx, "asgAttachmentBar", &autoscaling.AttachmentArgs{
			AutoscalingGroupName: pulumi.Any(aws_autoscaling_group.Asg.Id),
			LbTargetGroupArn:     pulumi.Any(aws_lb_target_group.Test.Arn),
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
import com.pulumi.aws.autoscaling.Attachment;
import com.pulumi.aws.autoscaling.AttachmentArgs;
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
        var asgAttachmentBar = new Attachment("asgAttachmentBar", AttachmentArgs.builder()        
            .autoscalingGroupName(aws_autoscaling_group.asg().id())
            .lbTargetGroupArn(aws_lb_target_group.test().arn())
            .build());

    }
}
```
```yaml
resources:
  # Create a new ALB Target Group attachment
  asgAttachmentBar:
    type: aws:autoscaling:Attachment
    properties:
      autoscalingGroupName: ${aws_autoscaling_group.asg.id}
      lbTargetGroupArn: ${aws_lb_target_group.test.arn}
```
{{% /example %}}
{{% /examples %}}
## With An AutoScaling Group Resource

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// ... other configuration ...
const asg = new aws.autoscaling.Group("asg", {});
const asgAttachmentBar = new aws.autoscaling.Attachment("asgAttachmentBar", {
    autoscalingGroupName: asg.id,
    elb: aws_elb.test.id,
});
```
```python
import pulumi
import pulumi_aws as aws

# ... other configuration ...
asg = aws.autoscaling.Group("asg")
asg_attachment_bar = aws.autoscaling.Attachment("asgAttachmentBar",
    autoscaling_group_name=asg.id,
    elb=aws_elb["test"]["id"])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    // ... other configuration ...
    var asg = new Aws.AutoScaling.Group("asg");

    var asgAttachmentBar = new Aws.AutoScaling.Attachment("asgAttachmentBar", new()
    {
        AutoscalingGroupName = asg.Id,
        Elb = aws_elb.Test.Id,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/autoscaling"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		asg, err := autoscaling.NewGroup(ctx, "asg", nil)
		if err != nil {
			return err
		}
		_, err = autoscaling.NewAttachment(ctx, "asgAttachmentBar", &autoscaling.AttachmentArgs{
			AutoscalingGroupName: asg.ID(),
			Elb:                  pulumi.Any(aws_elb.Test.Id),
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
import com.pulumi.aws.autoscaling.Group;
import com.pulumi.aws.autoscaling.Attachment;
import com.pulumi.aws.autoscaling.AttachmentArgs;
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
        var asg = new Group("asg");

        var asgAttachmentBar = new Attachment("asgAttachmentBar", AttachmentArgs.builder()        
            .autoscalingGroupName(asg.id())
            .elb(aws_elb.test().id())
            .build());

    }
}
```
```yaml
resources:
  asg:
    type: aws:autoscaling:Group
  asgAttachmentBar:
    type: aws:autoscaling:Attachment
    properties:
      autoscalingGroupName: ${asg.id}
      elb: ${aws_elb.test.id}
```

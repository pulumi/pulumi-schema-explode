Provides the ability to register instances and containers with an Application Load Balancer (ALB) or Network Load Balancer (NLB) target group. For attaching resources with Elastic Load Balancer (ELB), see the `aws.elb.Attachment` resource.

> **Note:** `aws.alb.TargetGroupAttachment` is known as `aws.lb.TargetGroupAttachment`. The functionality is identical.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const testTargetGroup = new aws.lb.TargetGroup("testTargetGroup", {});
// ... other configuration ...
const testInstance = new aws.ec2.Instance("testInstance", {});
// ... other configuration ...
const testTargetGroupAttachment = new aws.lb.TargetGroupAttachment("testTargetGroupAttachment", {
    targetGroupArn: testTargetGroup.arn,
    targetId: testInstance.id,
    port: 80,
});
```
```python
import pulumi
import pulumi_aws as aws

test_target_group = aws.lb.TargetGroup("testTargetGroup")
# ... other configuration ...
test_instance = aws.ec2.Instance("testInstance")
# ... other configuration ...
test_target_group_attachment = aws.lb.TargetGroupAttachment("testTargetGroupAttachment",
    target_group_arn=test_target_group.arn,
    target_id=test_instance.id,
    port=80)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var testTargetGroup = new Aws.LB.TargetGroup("testTargetGroup");

    // ... other configuration ...
    var testInstance = new Aws.Ec2.Instance("testInstance");

    // ... other configuration ...
    var testTargetGroupAttachment = new Aws.LB.TargetGroupAttachment("testTargetGroupAttachment", new()
    {
        TargetGroupArn = testTargetGroup.Arn,
        TargetId = testInstance.Id,
        Port = 80,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ec2"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lb"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		testTargetGroup, err := lb.NewTargetGroup(ctx, "testTargetGroup", nil)
		if err != nil {
			return err
		}
		testInstance, err := ec2.NewInstance(ctx, "testInstance", nil)
		if err != nil {
			return err
		}
		_, err = lb.NewTargetGroupAttachment(ctx, "testTargetGroupAttachment", &lb.TargetGroupAttachmentArgs{
			TargetGroupArn: testTargetGroup.Arn,
			TargetId:       testInstance.ID(),
			Port:           pulumi.Int(80),
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
import com.pulumi.aws.lb.TargetGroup;
import com.pulumi.aws.ec2.Instance;
import com.pulumi.aws.lb.TargetGroupAttachment;
import com.pulumi.aws.lb.TargetGroupAttachmentArgs;
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
        var testTargetGroup = new TargetGroup("testTargetGroup");

        var testInstance = new Instance("testInstance");

        var testTargetGroupAttachment = new TargetGroupAttachment("testTargetGroupAttachment", TargetGroupAttachmentArgs.builder()        
            .targetGroupArn(testTargetGroup.arn())
            .targetId(testInstance.id())
            .port(80)
            .build());

    }
}
```
```yaml
resources:
  testTargetGroupAttachment:
    type: aws:lb:TargetGroupAttachment
    properties:
      targetGroupArn: ${testTargetGroup.arn}
      targetId: ${testInstance.id}
      port: 80
  testTargetGroup:
    type: aws:lb:TargetGroup
  testInstance:
    type: aws:ec2:Instance
```
{{% /example %}}
{{% /examples %}}
## Usage with lambda

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const testTargetGroup = new aws.lb.TargetGroup("testTargetGroup", {targetType: "lambda"});
const testFunction = new aws.lambda.Function("testFunction", {});
// ... other configuration ...
const withLb = new aws.lambda.Permission("withLb", {
    action: "lambda:InvokeFunction",
    "function": testFunction.name,
    principal: "elasticloadbalancing.amazonaws.com",
    sourceArn: testTargetGroup.arn,
});
const testTargetGroupAttachment = new aws.lb.TargetGroupAttachment("testTargetGroupAttachment", {
    targetGroupArn: testTargetGroup.arn,
    targetId: testFunction.arn,
}, {
    dependsOn: [withLb],
});
```
```python
import pulumi
import pulumi_aws as aws

test_target_group = aws.lb.TargetGroup("testTargetGroup", target_type="lambda")
test_function = aws.lambda_.Function("testFunction")
# ... other configuration ...
with_lb = aws.lambda_.Permission("withLb",
    action="lambda:InvokeFunction",
    function=test_function.name,
    principal="elasticloadbalancing.amazonaws.com",
    source_arn=test_target_group.arn)
test_target_group_attachment = aws.lb.TargetGroupAttachment("testTargetGroupAttachment",
    target_group_arn=test_target_group.arn,
    target_id=test_function.arn,
    opts=pulumi.ResourceOptions(depends_on=[with_lb]))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var testTargetGroup = new Aws.LB.TargetGroup("testTargetGroup", new()
    {
        TargetType = "lambda",
    });

    var testFunction = new Aws.Lambda.Function("testFunction");

    // ... other configuration ...
    var withLb = new Aws.Lambda.Permission("withLb", new()
    {
        Action = "lambda:InvokeFunction",
        Function = testFunction.Name,
        Principal = "elasticloadbalancing.amazonaws.com",
        SourceArn = testTargetGroup.Arn,
    });

    var testTargetGroupAttachment = new Aws.LB.TargetGroupAttachment("testTargetGroupAttachment", new()
    {
        TargetGroupArn = testTargetGroup.Arn,
        TargetId = testFunction.Arn,
    }, new CustomResourceOptions
    {
        DependsOn = new[]
        {
            withLb,
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lambda"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lb"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		testTargetGroup, err := lb.NewTargetGroup(ctx, "testTargetGroup", &lb.TargetGroupArgs{
			TargetType: pulumi.String("lambda"),
		})
		if err != nil {
			return err
		}
		testFunction, err := lambda.NewFunction(ctx, "testFunction", nil)
		if err != nil {
			return err
		}
		withLb, err := lambda.NewPermission(ctx, "withLb", &lambda.PermissionArgs{
			Action:    pulumi.String("lambda:InvokeFunction"),
			Function:  testFunction.Name,
			Principal: pulumi.String("elasticloadbalancing.amazonaws.com"),
			SourceArn: testTargetGroup.Arn,
		})
		if err != nil {
			return err
		}
		_, err = lb.NewTargetGroupAttachment(ctx, "testTargetGroupAttachment", &lb.TargetGroupAttachmentArgs{
			TargetGroupArn: testTargetGroup.Arn,
			TargetId:       testFunction.Arn,
		}, pulumi.DependsOn([]pulumi.Resource{
			withLb,
		}))
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
import com.pulumi.aws.lb.TargetGroup;
import com.pulumi.aws.lb.TargetGroupArgs;
import com.pulumi.aws.lambda.Function;
import com.pulumi.aws.lambda.Permission;
import com.pulumi.aws.lambda.PermissionArgs;
import com.pulumi.aws.lb.TargetGroupAttachment;
import com.pulumi.aws.lb.TargetGroupAttachmentArgs;
import com.pulumi.resources.CustomResourceOptions;
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
        var testTargetGroup = new TargetGroup("testTargetGroup", TargetGroupArgs.builder()        
            .targetType("lambda")
            .build());

        var testFunction = new Function("testFunction");

        var withLb = new Permission("withLb", PermissionArgs.builder()        
            .action("lambda:InvokeFunction")
            .function(testFunction.name())
            .principal("elasticloadbalancing.amazonaws.com")
            .sourceArn(testTargetGroup.arn())
            .build());

        var testTargetGroupAttachment = new TargetGroupAttachment("testTargetGroupAttachment", TargetGroupAttachmentArgs.builder()        
            .targetGroupArn(testTargetGroup.arn())
            .targetId(testFunction.arn())
            .build(), CustomResourceOptions.builder()
                .dependsOn(withLb)
                .build());

    }
}
```
```yaml
resources:
  withLb:
    type: aws:lambda:Permission
    properties:
      action: lambda:InvokeFunction
      function: ${testFunction.name}
      principal: elasticloadbalancing.amazonaws.com
      sourceArn: ${testTargetGroup.arn}
  testTargetGroup:
    type: aws:lb:TargetGroup
    properties:
      targetType: lambda
  testFunction:
    type: aws:lambda:Function
  testTargetGroupAttachment:
    type: aws:lb:TargetGroupAttachment
    properties:
      targetGroupArn: ${testTargetGroup.arn}
      targetId: ${testFunction.arn}
    options:
      dependson:
        - ${withLb}
```


## Import

Target Group Attachments cannot be imported. 
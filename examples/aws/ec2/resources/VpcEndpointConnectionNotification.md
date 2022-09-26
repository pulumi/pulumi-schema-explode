Provides a VPC Endpoint connection notification resource.
Connection notifications notify subscribers of VPC Endpoint events.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const topic = new aws.sns.Topic("topic", {policy: `{
    "Version":"2012-10-17",
    "Statement":[{
        "Effect": "Allow",
        "Principal": {
            "Service": "vpce.amazonaws.com"
        },
        "Action": "SNS:Publish",
        "Resource": "arn:aws:sns:*:*:vpce-notification-topic"
    }]
}
`});
const fooVpcEndpointService = new aws.ec2.VpcEndpointService("fooVpcEndpointService", {
    acceptanceRequired: false,
    networkLoadBalancerArns: [aws_lb.test.arn],
});
const fooVpcEndpointConnectionNotification = new aws.ec2.VpcEndpointConnectionNotification("fooVpcEndpointConnectionNotification", {
    vpcEndpointServiceId: fooVpcEndpointService.id,
    connectionNotificationArn: topic.arn,
    connectionEvents: [
        "Accept",
        "Reject",
    ],
});
```
```python
import pulumi
import pulumi_aws as aws

topic = aws.sns.Topic("topic", policy="""{
    "Version":"2012-10-17",
    "Statement":[{
        "Effect": "Allow",
        "Principal": {
            "Service": "vpce.amazonaws.com"
        },
        "Action": "SNS:Publish",
        "Resource": "arn:aws:sns:*:*:vpce-notification-topic"
    }]
}
""")
foo_vpc_endpoint_service = aws.ec2.VpcEndpointService("fooVpcEndpointService",
    acceptance_required=False,
    network_load_balancer_arns=[aws_lb["test"]["arn"]])
foo_vpc_endpoint_connection_notification = aws.ec2.VpcEndpointConnectionNotification("fooVpcEndpointConnectionNotification",
    vpc_endpoint_service_id=foo_vpc_endpoint_service.id,
    connection_notification_arn=topic.arn,
    connection_events=[
        "Accept",
        "Reject",
    ])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var topic = new Aws.Sns.Topic("topic", new()
    {
        Policy = @"{
    ""Version"":""2012-10-17"",
    ""Statement"":[{
        ""Effect"": ""Allow"",
        ""Principal"": {
            ""Service"": ""vpce.amazonaws.com""
        },
        ""Action"": ""SNS:Publish"",
        ""Resource"": ""arn:aws:sns:*:*:vpce-notification-topic""
    }]
}
",
    });

    var fooVpcEndpointService = new Aws.Ec2.VpcEndpointService("fooVpcEndpointService", new()
    {
        AcceptanceRequired = false,
        NetworkLoadBalancerArns = new[]
        {
            aws_lb.Test.Arn,
        },
    });

    var fooVpcEndpointConnectionNotification = new Aws.Ec2.VpcEndpointConnectionNotification("fooVpcEndpointConnectionNotification", new()
    {
        VpcEndpointServiceId = fooVpcEndpointService.Id,
        ConnectionNotificationArn = topic.Arn,
        ConnectionEvents = new[]
        {
            "Accept",
            "Reject",
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ec2"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sns"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		topic, err := sns.NewTopic(ctx, "topic", &sns.TopicArgs{
			Policy: pulumi.String(fmt.Sprintf(`{
    "Version":"2012-10-17",
    "Statement":[{
        "Effect": "Allow",
        "Principal": {
            "Service": "vpce.amazonaws.com"
        },
        "Action": "SNS:Publish",
        "Resource": "arn:aws:sns:*:*:vpce-notification-topic"
    }]
}
`)),
		})
		if err != nil {
			return err
		}
		fooVpcEndpointService, err := ec2.NewVpcEndpointService(ctx, "fooVpcEndpointService", &ec2.VpcEndpointServiceArgs{
			AcceptanceRequired: pulumi.Bool(false),
			NetworkLoadBalancerArns: pulumi.StringArray{
				pulumi.Any(aws_lb.Test.Arn),
			},
		})
		if err != nil {
			return err
		}
		_, err = ec2.NewVpcEndpointConnectionNotification(ctx, "fooVpcEndpointConnectionNotification", &ec2.VpcEndpointConnectionNotificationArgs{
			VpcEndpointServiceId:      fooVpcEndpointService.ID(),
			ConnectionNotificationArn: topic.Arn,
			ConnectionEvents: pulumi.StringArray{
				pulumi.String("Accept"),
				pulumi.String("Reject"),
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
import com.pulumi.aws.sns.Topic;
import com.pulumi.aws.sns.TopicArgs;
import com.pulumi.aws.ec2.VpcEndpointService;
import com.pulumi.aws.ec2.VpcEndpointServiceArgs;
import com.pulumi.aws.ec2.VpcEndpointConnectionNotification;
import com.pulumi.aws.ec2.VpcEndpointConnectionNotificationArgs;
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
        var topic = new Topic("topic", TopicArgs.builder()        
            .policy("""
{
    "Version":"2012-10-17",
    "Statement":[{
        "Effect": "Allow",
        "Principal": {
            "Service": "vpce.amazonaws.com"
        },
        "Action": "SNS:Publish",
        "Resource": "arn:aws:sns:*:*:vpce-notification-topic"
    }]
}
            """)
            .build());

        var fooVpcEndpointService = new VpcEndpointService("fooVpcEndpointService", VpcEndpointServiceArgs.builder()        
            .acceptanceRequired(false)
            .networkLoadBalancerArns(aws_lb.test().arn())
            .build());

        var fooVpcEndpointConnectionNotification = new VpcEndpointConnectionNotification("fooVpcEndpointConnectionNotification", VpcEndpointConnectionNotificationArgs.builder()        
            .vpcEndpointServiceId(fooVpcEndpointService.id())
            .connectionNotificationArn(topic.arn())
            .connectionEvents(            
                "Accept",
                "Reject")
            .build());

    }
}
```
```yaml
resources:
  topic:
    type: aws:sns:Topic
    properties:
      policy: |
        {
            "Version":"2012-10-17",
            "Statement":[{
                "Effect": "Allow",
                "Principal": {
                    "Service": "vpce.amazonaws.com"
                },
                "Action": "SNS:Publish",
                "Resource": "arn:aws:sns:*:*:vpce-notification-topic"
            }]
        }
  fooVpcEndpointService:
    type: aws:ec2:VpcEndpointService
    properties:
      acceptanceRequired: false
      networkLoadBalancerArns:
        - ${aws_lb.test.arn}
  fooVpcEndpointConnectionNotification:
    type: aws:ec2:VpcEndpointConnectionNotification
    properties:
      vpcEndpointServiceId: ${fooVpcEndpointService.id}
      connectionNotificationArn: ${topic.arn}
      connectionEvents:
        - Accept
        - Reject
```
{{% /example %}}
{{% /examples %}}

## Import

VPC Endpoint connection notifications can be imported using the `VPC endpoint connection notification id`, e.g.,

```sh
 $ pulumi import aws:ec2/vpcEndpointConnectionNotification:VpcEndpointConnectionNotification foo vpce-nfn-09e6ed3b4efba2263
```

 
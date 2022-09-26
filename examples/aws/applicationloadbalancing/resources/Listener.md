Provides a Load Balancer Listener resource.

> **Note:** `aws.alb.Listener` is known as `aws.lb.Listener`. The functionality is identical.

{{% examples %}}
## Example Usage
{{% example %}}
### Forward Action

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const frontEndLoadBalancer = new aws.lb.LoadBalancer("frontEndLoadBalancer", {});
// ...
const frontEndTargetGroup = new aws.lb.TargetGroup("frontEndTargetGroup", {});
// ...
const frontEndListener = new aws.lb.Listener("frontEndListener", {
    loadBalancerArn: frontEndLoadBalancer.arn,
    port: 443,
    protocol: "HTTPS",
    sslPolicy: "ELBSecurityPolicy-2016-08",
    certificateArn: "arn:aws:iam::187416307283:server-certificate/test_cert_rab3wuqwgja25ct3n4jdj2tzu4",
    defaultActions: [{
        type: "forward",
        targetGroupArn: frontEndTargetGroup.arn,
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

front_end_load_balancer = aws.lb.LoadBalancer("frontEndLoadBalancer")
# ...
front_end_target_group = aws.lb.TargetGroup("frontEndTargetGroup")
# ...
front_end_listener = aws.lb.Listener("frontEndListener",
    load_balancer_arn=front_end_load_balancer.arn,
    port=443,
    protocol="HTTPS",
    ssl_policy="ELBSecurityPolicy-2016-08",
    certificate_arn="arn:aws:iam::187416307283:server-certificate/test_cert_rab3wuqwgja25ct3n4jdj2tzu4",
    default_actions=[aws.lb.ListenerDefaultActionArgs(
        type="forward",
        target_group_arn=front_end_target_group.arn,
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var frontEndLoadBalancer = new Aws.LB.LoadBalancer("frontEndLoadBalancer");

    // ...
    var frontEndTargetGroup = new Aws.LB.TargetGroup("frontEndTargetGroup");

    // ...
    var frontEndListener = new Aws.LB.Listener("frontEndListener", new()
    {
        LoadBalancerArn = frontEndLoadBalancer.Arn,
        Port = 443,
        Protocol = "HTTPS",
        SslPolicy = "ELBSecurityPolicy-2016-08",
        CertificateArn = "arn:aws:iam::187416307283:server-certificate/test_cert_rab3wuqwgja25ct3n4jdj2tzu4",
        DefaultActions = new[]
        {
            new Aws.LB.Inputs.ListenerDefaultActionArgs
            {
                Type = "forward",
                TargetGroupArn = frontEndTargetGroup.Arn,
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lb"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		frontEndLoadBalancer, err := lb.NewLoadBalancer(ctx, "frontEndLoadBalancer", nil)
		if err != nil {
			return err
		}
		frontEndTargetGroup, err := lb.NewTargetGroup(ctx, "frontEndTargetGroup", nil)
		if err != nil {
			return err
		}
		_, err = lb.NewListener(ctx, "frontEndListener", &lb.ListenerArgs{
			LoadBalancerArn: frontEndLoadBalancer.Arn,
			Port:            pulumi.Int(443),
			Protocol:        pulumi.String("HTTPS"),
			SslPolicy:       pulumi.String("ELBSecurityPolicy-2016-08"),
			CertificateArn:  pulumi.String("arn:aws:iam::187416307283:server-certificate/test_cert_rab3wuqwgja25ct3n4jdj2tzu4"),
			DefaultActions: lb.ListenerDefaultActionArray{
				&lb.ListenerDefaultActionArgs{
					Type:           pulumi.String("forward"),
					TargetGroupArn: frontEndTargetGroup.Arn,
				},
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
import com.pulumi.aws.lb.LoadBalancer;
import com.pulumi.aws.lb.TargetGroup;
import com.pulumi.aws.lb.Listener;
import com.pulumi.aws.lb.ListenerArgs;
import com.pulumi.aws.lb.inputs.ListenerDefaultActionArgs;
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
        var frontEndLoadBalancer = new LoadBalancer("frontEndLoadBalancer");

        var frontEndTargetGroup = new TargetGroup("frontEndTargetGroup");

        var frontEndListener = new Listener("frontEndListener", ListenerArgs.builder()        
            .loadBalancerArn(frontEndLoadBalancer.arn())
            .port("443")
            .protocol("HTTPS")
            .sslPolicy("ELBSecurityPolicy-2016-08")
            .certificateArn("arn:aws:iam::187416307283:server-certificate/test_cert_rab3wuqwgja25ct3n4jdj2tzu4")
            .defaultActions(ListenerDefaultActionArgs.builder()
                .type("forward")
                .targetGroupArn(frontEndTargetGroup.arn())
                .build())
            .build());

    }
}
```
```yaml
resources:
  frontEndLoadBalancer:
    type: aws:lb:LoadBalancer
  frontEndTargetGroup:
    type: aws:lb:TargetGroup
  frontEndListener:
    type: aws:lb:Listener
    properties:
      loadBalancerArn: ${frontEndLoadBalancer.arn}
      port: 443
      protocol: HTTPS
      sslPolicy: ELBSecurityPolicy-2016-08
      certificateArn: arn:aws:iam::187416307283:server-certificate/test_cert_rab3wuqwgja25ct3n4jdj2tzu4
      defaultActions:
        - type: forward
          targetGroupArn: ${frontEndTargetGroup.arn}
```

To a NLB:

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const frontEnd = new aws.lb.Listener("frontEnd", {
    loadBalancerArn: aws_lb.front_end.arn,
    port: 443,
    protocol: "TLS",
    certificateArn: "arn:aws:iam::187416307283:server-certificate/test_cert_rab3wuqwgja25ct3n4jdj2tzu4",
    alpnPolicy: "HTTP2Preferred",
    defaultActions: [{
        type: "forward",
        targetGroupArn: aws_lb_target_group.front_end.arn,
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

front_end = aws.lb.Listener("frontEnd",
    load_balancer_arn=aws_lb["front_end"]["arn"],
    port=443,
    protocol="TLS",
    certificate_arn="arn:aws:iam::187416307283:server-certificate/test_cert_rab3wuqwgja25ct3n4jdj2tzu4",
    alpn_policy="HTTP2Preferred",
    default_actions=[aws.lb.ListenerDefaultActionArgs(
        type="forward",
        target_group_arn=aws_lb_target_group["front_end"]["arn"],
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var frontEnd = new Aws.LB.Listener("frontEnd", new()
    {
        LoadBalancerArn = aws_lb.Front_end.Arn,
        Port = 443,
        Protocol = "TLS",
        CertificateArn = "arn:aws:iam::187416307283:server-certificate/test_cert_rab3wuqwgja25ct3n4jdj2tzu4",
        AlpnPolicy = "HTTP2Preferred",
        DefaultActions = new[]
        {
            new Aws.LB.Inputs.ListenerDefaultActionArgs
            {
                Type = "forward",
                TargetGroupArn = aws_lb_target_group.Front_end.Arn,
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lb"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := lb.NewListener(ctx, "frontEnd", &lb.ListenerArgs{
			LoadBalancerArn: pulumi.Any(aws_lb.Front_end.Arn),
			Port:            pulumi.Int(443),
			Protocol:        pulumi.String("TLS"),
			CertificateArn:  pulumi.String("arn:aws:iam::187416307283:server-certificate/test_cert_rab3wuqwgja25ct3n4jdj2tzu4"),
			AlpnPolicy:      pulumi.String("HTTP2Preferred"),
			DefaultActions: lb.ListenerDefaultActionArray{
				&lb.ListenerDefaultActionArgs{
					Type:           pulumi.String("forward"),
					TargetGroupArn: pulumi.Any(aws_lb_target_group.Front_end.Arn),
				},
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
import com.pulumi.aws.lb.Listener;
import com.pulumi.aws.lb.ListenerArgs;
import com.pulumi.aws.lb.inputs.ListenerDefaultActionArgs;
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
        var frontEnd = new Listener("frontEnd", ListenerArgs.builder()        
            .loadBalancerArn(aws_lb.front_end().arn())
            .port("443")
            .protocol("TLS")
            .certificateArn("arn:aws:iam::187416307283:server-certificate/test_cert_rab3wuqwgja25ct3n4jdj2tzu4")
            .alpnPolicy("HTTP2Preferred")
            .defaultActions(ListenerDefaultActionArgs.builder()
                .type("forward")
                .targetGroupArn(aws_lb_target_group.front_end().arn())
                .build())
            .build());

    }
}
```
```yaml
resources:
  frontEnd:
    type: aws:lb:Listener
    properties:
      loadBalancerArn: ${aws_lb.front_end.arn}
      port: 443
      protocol: TLS
      certificateArn: arn:aws:iam::187416307283:server-certificate/test_cert_rab3wuqwgja25ct3n4jdj2tzu4
      alpnPolicy: HTTP2Preferred
      defaultActions:
        - type: forward
          targetGroupArn: ${aws_lb_target_group.front_end.arn}
```
{{% /example %}}
{{% example %}}
### Redirect Action

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const frontEndLoadBalancer = new aws.lb.LoadBalancer("frontEndLoadBalancer", {});
// ...
const frontEndListener = new aws.lb.Listener("frontEndListener", {
    loadBalancerArn: frontEndLoadBalancer.arn,
    port: 80,
    protocol: "HTTP",
    defaultActions: [{
        type: "redirect",
        redirect: {
            port: "443",
            protocol: "HTTPS",
            statusCode: "HTTP_301",
        },
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

front_end_load_balancer = aws.lb.LoadBalancer("frontEndLoadBalancer")
# ...
front_end_listener = aws.lb.Listener("frontEndListener",
    load_balancer_arn=front_end_load_balancer.arn,
    port=80,
    protocol="HTTP",
    default_actions=[aws.lb.ListenerDefaultActionArgs(
        type="redirect",
        redirect=aws.lb.ListenerDefaultActionRedirectArgs(
            port="443",
            protocol="HTTPS",
            status_code="HTTP_301",
        ),
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var frontEndLoadBalancer = new Aws.LB.LoadBalancer("frontEndLoadBalancer");

    // ...
    var frontEndListener = new Aws.LB.Listener("frontEndListener", new()
    {
        LoadBalancerArn = frontEndLoadBalancer.Arn,
        Port = 80,
        Protocol = "HTTP",
        DefaultActions = new[]
        {
            new Aws.LB.Inputs.ListenerDefaultActionArgs
            {
                Type = "redirect",
                Redirect = new Aws.LB.Inputs.ListenerDefaultActionRedirectArgs
                {
                    Port = "443",
                    Protocol = "HTTPS",
                    StatusCode = "HTTP_301",
                },
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lb"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		frontEndLoadBalancer, err := lb.NewLoadBalancer(ctx, "frontEndLoadBalancer", nil)
		if err != nil {
			return err
		}
		_, err = lb.NewListener(ctx, "frontEndListener", &lb.ListenerArgs{
			LoadBalancerArn: frontEndLoadBalancer.Arn,
			Port:            pulumi.Int(80),
			Protocol:        pulumi.String("HTTP"),
			DefaultActions: lb.ListenerDefaultActionArray{
				&lb.ListenerDefaultActionArgs{
					Type: pulumi.String("redirect"),
					Redirect: &lb.ListenerDefaultActionRedirectArgs{
						Port:       pulumi.String("443"),
						Protocol:   pulumi.String("HTTPS"),
						StatusCode: pulumi.String("HTTP_301"),
					},
				},
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
import com.pulumi.aws.lb.LoadBalancer;
import com.pulumi.aws.lb.Listener;
import com.pulumi.aws.lb.ListenerArgs;
import com.pulumi.aws.lb.inputs.ListenerDefaultActionArgs;
import com.pulumi.aws.lb.inputs.ListenerDefaultActionRedirectArgs;
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
        var frontEndLoadBalancer = new LoadBalancer("frontEndLoadBalancer");

        var frontEndListener = new Listener("frontEndListener", ListenerArgs.builder()        
            .loadBalancerArn(frontEndLoadBalancer.arn())
            .port("80")
            .protocol("HTTP")
            .defaultActions(ListenerDefaultActionArgs.builder()
                .type("redirect")
                .redirect(ListenerDefaultActionRedirectArgs.builder()
                    .port("443")
                    .protocol("HTTPS")
                    .statusCode("HTTP_301")
                    .build())
                .build())
            .build());

    }
}
```
```yaml
resources:
  frontEndLoadBalancer:
    type: aws:lb:LoadBalancer
  frontEndListener:
    type: aws:lb:Listener
    properties:
      loadBalancerArn: ${frontEndLoadBalancer.arn}
      port: 80
      protocol: HTTP
      defaultActions:
        - type: redirect
          redirect:
            port: 443
            protocol: HTTPS
            statusCode: HTTP_301
```
{{% /example %}}
{{% example %}}
### Fixed-response Action

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const frontEndLoadBalancer = new aws.lb.LoadBalancer("frontEndLoadBalancer", {});
// ...
const frontEndListener = new aws.lb.Listener("frontEndListener", {
    loadBalancerArn: frontEndLoadBalancer.arn,
    port: 80,
    protocol: "HTTP",
    defaultActions: [{
        type: "fixed-response",
        fixedResponse: {
            contentType: "text/plain",
            messageBody: "Fixed response content",
            statusCode: "200",
        },
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

front_end_load_balancer = aws.lb.LoadBalancer("frontEndLoadBalancer")
# ...
front_end_listener = aws.lb.Listener("frontEndListener",
    load_balancer_arn=front_end_load_balancer.arn,
    port=80,
    protocol="HTTP",
    default_actions=[aws.lb.ListenerDefaultActionArgs(
        type="fixed-response",
        fixed_response=aws.lb.ListenerDefaultActionFixedResponseArgs(
            content_type="text/plain",
            message_body="Fixed response content",
            status_code="200",
        ),
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var frontEndLoadBalancer = new Aws.LB.LoadBalancer("frontEndLoadBalancer");

    // ...
    var frontEndListener = new Aws.LB.Listener("frontEndListener", new()
    {
        LoadBalancerArn = frontEndLoadBalancer.Arn,
        Port = 80,
        Protocol = "HTTP",
        DefaultActions = new[]
        {
            new Aws.LB.Inputs.ListenerDefaultActionArgs
            {
                Type = "fixed-response",
                FixedResponse = new Aws.LB.Inputs.ListenerDefaultActionFixedResponseArgs
                {
                    ContentType = "text/plain",
                    MessageBody = "Fixed response content",
                    StatusCode = "200",
                },
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lb"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		frontEndLoadBalancer, err := lb.NewLoadBalancer(ctx, "frontEndLoadBalancer", nil)
		if err != nil {
			return err
		}
		_, err = lb.NewListener(ctx, "frontEndListener", &lb.ListenerArgs{
			LoadBalancerArn: frontEndLoadBalancer.Arn,
			Port:            pulumi.Int(80),
			Protocol:        pulumi.String("HTTP"),
			DefaultActions: lb.ListenerDefaultActionArray{
				&lb.ListenerDefaultActionArgs{
					Type: pulumi.String("fixed-response"),
					FixedResponse: &lb.ListenerDefaultActionFixedResponseArgs{
						ContentType: pulumi.String("text/plain"),
						MessageBody: pulumi.String("Fixed response content"),
						StatusCode:  pulumi.String("200"),
					},
				},
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
import com.pulumi.aws.lb.LoadBalancer;
import com.pulumi.aws.lb.Listener;
import com.pulumi.aws.lb.ListenerArgs;
import com.pulumi.aws.lb.inputs.ListenerDefaultActionArgs;
import com.pulumi.aws.lb.inputs.ListenerDefaultActionFixedResponseArgs;
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
        var frontEndLoadBalancer = new LoadBalancer("frontEndLoadBalancer");

        var frontEndListener = new Listener("frontEndListener", ListenerArgs.builder()        
            .loadBalancerArn(frontEndLoadBalancer.arn())
            .port("80")
            .protocol("HTTP")
            .defaultActions(ListenerDefaultActionArgs.builder()
                .type("fixed-response")
                .fixedResponse(ListenerDefaultActionFixedResponseArgs.builder()
                    .contentType("text/plain")
                    .messageBody("Fixed response content")
                    .statusCode("200")
                    .build())
                .build())
            .build());

    }
}
```
```yaml
resources:
  frontEndLoadBalancer:
    type: aws:lb:LoadBalancer
  frontEndListener:
    type: aws:lb:Listener
    properties:
      loadBalancerArn: ${frontEndLoadBalancer.arn}
      port: 80
      protocol: HTTP
      defaultActions:
        - type: fixed-response
          fixedResponse:
            contentType: text/plain
            messageBody: Fixed response content
            statusCode: 200
```
{{% /example %}}
{{% example %}}
### Authenticate-cognito Action

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const frontEndLoadBalancer = new aws.lb.LoadBalancer("frontEndLoadBalancer", {});
// ...
const frontEndTargetGroup = new aws.lb.TargetGroup("frontEndTargetGroup", {});
// ...
const pool = new aws.cognito.UserPool("pool", {});
// ...
const client = new aws.cognito.UserPoolClient("client", {});
// ...
const domain = new aws.cognito.UserPoolDomain("domain", {});
// ...
const frontEndListener = new aws.lb.Listener("frontEndListener", {
    loadBalancerArn: frontEndLoadBalancer.arn,
    port: 80,
    protocol: "HTTP",
    defaultActions: [
        {
            type: "authenticate-cognito",
            authenticateCognito: {
                userPoolArn: pool.arn,
                userPoolClientId: client.id,
                userPoolDomain: domain.domain,
            },
        },
        {
            type: "forward",
            targetGroupArn: frontEndTargetGroup.arn,
        },
    ],
});
```
```python
import pulumi
import pulumi_aws as aws

front_end_load_balancer = aws.lb.LoadBalancer("frontEndLoadBalancer")
# ...
front_end_target_group = aws.lb.TargetGroup("frontEndTargetGroup")
# ...
pool = aws.cognito.UserPool("pool")
# ...
client = aws.cognito.UserPoolClient("client")
# ...
domain = aws.cognito.UserPoolDomain("domain")
# ...
front_end_listener = aws.lb.Listener("frontEndListener",
    load_balancer_arn=front_end_load_balancer.arn,
    port=80,
    protocol="HTTP",
    default_actions=[
        aws.lb.ListenerDefaultActionArgs(
            type="authenticate-cognito",
            authenticate_cognito=aws.lb.ListenerDefaultActionAuthenticateCognitoArgs(
                user_pool_arn=pool.arn,
                user_pool_client_id=client.id,
                user_pool_domain=domain.domain,
            ),
        ),
        aws.lb.ListenerDefaultActionArgs(
            type="forward",
            target_group_arn=front_end_target_group.arn,
        ),
    ])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var frontEndLoadBalancer = new Aws.LB.LoadBalancer("frontEndLoadBalancer");

    // ...
    var frontEndTargetGroup = new Aws.LB.TargetGroup("frontEndTargetGroup");

    // ...
    var pool = new Aws.Cognito.UserPool("pool");

    // ...
    var client = new Aws.Cognito.UserPoolClient("client");

    // ...
    var domain = new Aws.Cognito.UserPoolDomain("domain");

    // ...
    var frontEndListener = new Aws.LB.Listener("frontEndListener", new()
    {
        LoadBalancerArn = frontEndLoadBalancer.Arn,
        Port = 80,
        Protocol = "HTTP",
        DefaultActions = new[]
        {
            new Aws.LB.Inputs.ListenerDefaultActionArgs
            {
                Type = "authenticate-cognito",
                AuthenticateCognito = new Aws.LB.Inputs.ListenerDefaultActionAuthenticateCognitoArgs
                {
                    UserPoolArn = pool.Arn,
                    UserPoolClientId = client.Id,
                    UserPoolDomain = domain.Domain,
                },
            },
            new Aws.LB.Inputs.ListenerDefaultActionArgs
            {
                Type = "forward",
                TargetGroupArn = frontEndTargetGroup.Arn,
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cognito"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lb"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		frontEndLoadBalancer, err := lb.NewLoadBalancer(ctx, "frontEndLoadBalancer", nil)
		if err != nil {
			return err
		}
		frontEndTargetGroup, err := lb.NewTargetGroup(ctx, "frontEndTargetGroup", nil)
		if err != nil {
			return err
		}
		pool, err := cognito.NewUserPool(ctx, "pool", nil)
		if err != nil {
			return err
		}
		client, err := cognito.NewUserPoolClient(ctx, "client", nil)
		if err != nil {
			return err
		}
		domain, err := cognito.NewUserPoolDomain(ctx, "domain", nil)
		if err != nil {
			return err
		}
		_, err = lb.NewListener(ctx, "frontEndListener", &lb.ListenerArgs{
			LoadBalancerArn: frontEndLoadBalancer.Arn,
			Port:            pulumi.Int(80),
			Protocol:        pulumi.String("HTTP"),
			DefaultActions: lb.ListenerDefaultActionArray{
				&lb.ListenerDefaultActionArgs{
					Type: pulumi.String("authenticate-cognito"),
					AuthenticateCognito: &lb.ListenerDefaultActionAuthenticateCognitoArgs{
						UserPoolArn:      pool.Arn,
						UserPoolClientId: client.ID(),
						UserPoolDomain:   domain.Domain,
					},
				},
				&lb.ListenerDefaultActionArgs{
					Type:           pulumi.String("forward"),
					TargetGroupArn: frontEndTargetGroup.Arn,
				},
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
import com.pulumi.aws.lb.LoadBalancer;
import com.pulumi.aws.lb.TargetGroup;
import com.pulumi.aws.cognito.UserPool;
import com.pulumi.aws.cognito.UserPoolClient;
import com.pulumi.aws.cognito.UserPoolDomain;
import com.pulumi.aws.lb.Listener;
import com.pulumi.aws.lb.ListenerArgs;
import com.pulumi.aws.lb.inputs.ListenerDefaultActionArgs;
import com.pulumi.aws.lb.inputs.ListenerDefaultActionAuthenticateCognitoArgs;
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
        var frontEndLoadBalancer = new LoadBalancer("frontEndLoadBalancer");

        var frontEndTargetGroup = new TargetGroup("frontEndTargetGroup");

        var pool = new UserPool("pool");

        var client = new UserPoolClient("client");

        var domain = new UserPoolDomain("domain");

        var frontEndListener = new Listener("frontEndListener", ListenerArgs.builder()        
            .loadBalancerArn(frontEndLoadBalancer.arn())
            .port("80")
            .protocol("HTTP")
            .defaultActions(            
                ListenerDefaultActionArgs.builder()
                    .type("authenticate-cognito")
                    .authenticateCognito(ListenerDefaultActionAuthenticateCognitoArgs.builder()
                        .userPoolArn(pool.arn())
                        .userPoolClientId(client.id())
                        .userPoolDomain(domain.domain())
                        .build())
                    .build(),
                ListenerDefaultActionArgs.builder()
                    .type("forward")
                    .targetGroupArn(frontEndTargetGroup.arn())
                    .build())
            .build());

    }
}
```
```yaml
resources:
  frontEndLoadBalancer:
    type: aws:lb:LoadBalancer
  frontEndTargetGroup:
    type: aws:lb:TargetGroup
  pool:
    type: aws:cognito:UserPool
  client:
    type: aws:cognito:UserPoolClient
  domain:
    type: aws:cognito:UserPoolDomain
  frontEndListener:
    type: aws:lb:Listener
    properties:
      loadBalancerArn: ${frontEndLoadBalancer.arn}
      port: 80
      protocol: HTTP
      defaultActions:
        - type: authenticate-cognito
          authenticateCognito:
            userPoolArn: ${pool.arn}
            userPoolClientId: ${client.id}
            userPoolDomain: ${domain.domain}
        - type: forward
          targetGroupArn: ${frontEndTargetGroup.arn}
```
{{% /example %}}
{{% example %}}
### Authenticate-OIDC Action

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const frontEndLoadBalancer = new aws.lb.LoadBalancer("frontEndLoadBalancer", {});
// ...
const frontEndTargetGroup = new aws.lb.TargetGroup("frontEndTargetGroup", {});
// ...
const frontEndListener = new aws.lb.Listener("frontEndListener", {
    loadBalancerArn: frontEndLoadBalancer.arn,
    port: 80,
    protocol: "HTTP",
    defaultActions: [
        {
            type: "authenticate-oidc",
            authenticateOidc: {
                authorizationEndpoint: "https://example.com/authorization_endpoint",
                clientId: "client_id",
                clientSecret: "client_secret",
                issuer: "https://example.com",
                tokenEndpoint: "https://example.com/token_endpoint",
                userInfoEndpoint: "https://example.com/user_info_endpoint",
            },
        },
        {
            type: "forward",
            targetGroupArn: frontEndTargetGroup.arn,
        },
    ],
});
```
```python
import pulumi
import pulumi_aws as aws

front_end_load_balancer = aws.lb.LoadBalancer("frontEndLoadBalancer")
# ...
front_end_target_group = aws.lb.TargetGroup("frontEndTargetGroup")
# ...
front_end_listener = aws.lb.Listener("frontEndListener",
    load_balancer_arn=front_end_load_balancer.arn,
    port=80,
    protocol="HTTP",
    default_actions=[
        aws.lb.ListenerDefaultActionArgs(
            type="authenticate-oidc",
            authenticate_oidc=aws.lb.ListenerDefaultActionAuthenticateOidcArgs(
                authorization_endpoint="https://example.com/authorization_endpoint",
                client_id="client_id",
                client_secret="client_secret",
                issuer="https://example.com",
                token_endpoint="https://example.com/token_endpoint",
                user_info_endpoint="https://example.com/user_info_endpoint",
            ),
        ),
        aws.lb.ListenerDefaultActionArgs(
            type="forward",
            target_group_arn=front_end_target_group.arn,
        ),
    ])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var frontEndLoadBalancer = new Aws.LB.LoadBalancer("frontEndLoadBalancer");

    // ...
    var frontEndTargetGroup = new Aws.LB.TargetGroup("frontEndTargetGroup");

    // ...
    var frontEndListener = new Aws.LB.Listener("frontEndListener", new()
    {
        LoadBalancerArn = frontEndLoadBalancer.Arn,
        Port = 80,
        Protocol = "HTTP",
        DefaultActions = new[]
        {
            new Aws.LB.Inputs.ListenerDefaultActionArgs
            {
                Type = "authenticate-oidc",
                AuthenticateOidc = new Aws.LB.Inputs.ListenerDefaultActionAuthenticateOidcArgs
                {
                    AuthorizationEndpoint = "https://example.com/authorization_endpoint",
                    ClientId = "client_id",
                    ClientSecret = "client_secret",
                    Issuer = "https://example.com",
                    TokenEndpoint = "https://example.com/token_endpoint",
                    UserInfoEndpoint = "https://example.com/user_info_endpoint",
                },
            },
            new Aws.LB.Inputs.ListenerDefaultActionArgs
            {
                Type = "forward",
                TargetGroupArn = frontEndTargetGroup.Arn,
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lb"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		frontEndLoadBalancer, err := lb.NewLoadBalancer(ctx, "frontEndLoadBalancer", nil)
		if err != nil {
			return err
		}
		frontEndTargetGroup, err := lb.NewTargetGroup(ctx, "frontEndTargetGroup", nil)
		if err != nil {
			return err
		}
		_, err = lb.NewListener(ctx, "frontEndListener", &lb.ListenerArgs{
			LoadBalancerArn: frontEndLoadBalancer.Arn,
			Port:            pulumi.Int(80),
			Protocol:        pulumi.String("HTTP"),
			DefaultActions: lb.ListenerDefaultActionArray{
				&lb.ListenerDefaultActionArgs{
					Type: pulumi.String("authenticate-oidc"),
					AuthenticateOidc: &lb.ListenerDefaultActionAuthenticateOidcArgs{
						AuthorizationEndpoint: pulumi.String("https://example.com/authorization_endpoint"),
						ClientId:              pulumi.String("client_id"),
						ClientSecret:          pulumi.String("client_secret"),
						Issuer:                pulumi.String("https://example.com"),
						TokenEndpoint:         pulumi.String("https://example.com/token_endpoint"),
						UserInfoEndpoint:      pulumi.String("https://example.com/user_info_endpoint"),
					},
				},
				&lb.ListenerDefaultActionArgs{
					Type:           pulumi.String("forward"),
					TargetGroupArn: frontEndTargetGroup.Arn,
				},
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
import com.pulumi.aws.lb.LoadBalancer;
import com.pulumi.aws.lb.TargetGroup;
import com.pulumi.aws.lb.Listener;
import com.pulumi.aws.lb.ListenerArgs;
import com.pulumi.aws.lb.inputs.ListenerDefaultActionArgs;
import com.pulumi.aws.lb.inputs.ListenerDefaultActionAuthenticateOidcArgs;
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
        var frontEndLoadBalancer = new LoadBalancer("frontEndLoadBalancer");

        var frontEndTargetGroup = new TargetGroup("frontEndTargetGroup");

        var frontEndListener = new Listener("frontEndListener", ListenerArgs.builder()        
            .loadBalancerArn(frontEndLoadBalancer.arn())
            .port("80")
            .protocol("HTTP")
            .defaultActions(            
                ListenerDefaultActionArgs.builder()
                    .type("authenticate-oidc")
                    .authenticateOidc(ListenerDefaultActionAuthenticateOidcArgs.builder()
                        .authorizationEndpoint("https://example.com/authorization_endpoint")
                        .clientId("client_id")
                        .clientSecret("client_secret")
                        .issuer("https://example.com")
                        .tokenEndpoint("https://example.com/token_endpoint")
                        .userInfoEndpoint("https://example.com/user_info_endpoint")
                        .build())
                    .build(),
                ListenerDefaultActionArgs.builder()
                    .type("forward")
                    .targetGroupArn(frontEndTargetGroup.arn())
                    .build())
            .build());

    }
}
```
```yaml
resources:
  frontEndLoadBalancer:
    type: aws:lb:LoadBalancer
  frontEndTargetGroup:
    type: aws:lb:TargetGroup
  frontEndListener:
    type: aws:lb:Listener
    properties:
      loadBalancerArn: ${frontEndLoadBalancer.arn}
      port: 80
      protocol: HTTP
      defaultActions:
        - type: authenticate-oidc
          authenticateOidc:
            authorizationEndpoint: https://example.com/authorization_endpoint
            clientId: client_id
            clientSecret: client_secret
            issuer: https://example.com
            tokenEndpoint: https://example.com/token_endpoint
            userInfoEndpoint: https://example.com/user_info_endpoint
        - type: forward
          targetGroupArn: ${frontEndTargetGroup.arn}
```
{{% /example %}}
{{% example %}}
### Gateway Load Balancer Listener

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleLoadBalancer = new aws.lb.LoadBalancer("exampleLoadBalancer", {
    loadBalancerType: "gateway",
    subnetMappings: [{
        subnetId: aws_subnet.example.id,
    }],
});
const exampleTargetGroup = new aws.lb.TargetGroup("exampleTargetGroup", {
    port: 6081,
    protocol: "GENEVE",
    vpcId: aws_vpc.example.id,
    healthCheck: {
        port: "80",
        protocol: "HTTP",
    },
});
const exampleListener = new aws.lb.Listener("exampleListener", {
    loadBalancerArn: exampleLoadBalancer.id,
    defaultActions: [{
        targetGroupArn: exampleTargetGroup.id,
        type: "forward",
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

example_load_balancer = aws.lb.LoadBalancer("exampleLoadBalancer",
    load_balancer_type="gateway",
    subnet_mappings=[aws.lb.LoadBalancerSubnetMappingArgs(
        subnet_id=aws_subnet["example"]["id"],
    )])
example_target_group = aws.lb.TargetGroup("exampleTargetGroup",
    port=6081,
    protocol="GENEVE",
    vpc_id=aws_vpc["example"]["id"],
    health_check=aws.lb.TargetGroupHealthCheckArgs(
        port="80",
        protocol="HTTP",
    ))
example_listener = aws.lb.Listener("exampleListener",
    load_balancer_arn=example_load_balancer.id,
    default_actions=[aws.lb.ListenerDefaultActionArgs(
        target_group_arn=example_target_group.id,
        type="forward",
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleLoadBalancer = new Aws.LB.LoadBalancer("exampleLoadBalancer", new()
    {
        LoadBalancerType = "gateway",
        SubnetMappings = new[]
        {
            new Aws.LB.Inputs.LoadBalancerSubnetMappingArgs
            {
                SubnetId = aws_subnet.Example.Id,
            },
        },
    });

    var exampleTargetGroup = new Aws.LB.TargetGroup("exampleTargetGroup", new()
    {
        Port = 6081,
        Protocol = "GENEVE",
        VpcId = aws_vpc.Example.Id,
        HealthCheck = new Aws.LB.Inputs.TargetGroupHealthCheckArgs
        {
            Port = "80",
            Protocol = "HTTP",
        },
    });

    var exampleListener = new Aws.LB.Listener("exampleListener", new()
    {
        LoadBalancerArn = exampleLoadBalancer.Id,
        DefaultActions = new[]
        {
            new Aws.LB.Inputs.ListenerDefaultActionArgs
            {
                TargetGroupArn = exampleTargetGroup.Id,
                Type = "forward",
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lb"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleLoadBalancer, err := lb.NewLoadBalancer(ctx, "exampleLoadBalancer", &lb.LoadBalancerArgs{
			LoadBalancerType: pulumi.String("gateway"),
			SubnetMappings: lb.LoadBalancerSubnetMappingArray{
				&lb.LoadBalancerSubnetMappingArgs{
					SubnetId: pulumi.Any(aws_subnet.Example.Id),
				},
			},
		})
		if err != nil {
			return err
		}
		exampleTargetGroup, err := lb.NewTargetGroup(ctx, "exampleTargetGroup", &lb.TargetGroupArgs{
			Port:     pulumi.Int(6081),
			Protocol: pulumi.String("GENEVE"),
			VpcId:    pulumi.Any(aws_vpc.Example.Id),
			HealthCheck: &lb.TargetGroupHealthCheckArgs{
				Port:     pulumi.String("80"),
				Protocol: pulumi.String("HTTP"),
			},
		})
		if err != nil {
			return err
		}
		_, err = lb.NewListener(ctx, "exampleListener", &lb.ListenerArgs{
			LoadBalancerArn: exampleLoadBalancer.ID(),
			DefaultActions: lb.ListenerDefaultActionArray{
				&lb.ListenerDefaultActionArgs{
					TargetGroupArn: exampleTargetGroup.ID(),
					Type:           pulumi.String("forward"),
				},
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
import com.pulumi.aws.lb.LoadBalancer;
import com.pulumi.aws.lb.LoadBalancerArgs;
import com.pulumi.aws.lb.inputs.LoadBalancerSubnetMappingArgs;
import com.pulumi.aws.lb.TargetGroup;
import com.pulumi.aws.lb.TargetGroupArgs;
import com.pulumi.aws.lb.inputs.TargetGroupHealthCheckArgs;
import com.pulumi.aws.lb.Listener;
import com.pulumi.aws.lb.ListenerArgs;
import com.pulumi.aws.lb.inputs.ListenerDefaultActionArgs;
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
        var exampleLoadBalancer = new LoadBalancer("exampleLoadBalancer", LoadBalancerArgs.builder()        
            .loadBalancerType("gateway")
            .subnetMappings(LoadBalancerSubnetMappingArgs.builder()
                .subnetId(aws_subnet.example().id())
                .build())
            .build());

        var exampleTargetGroup = new TargetGroup("exampleTargetGroup", TargetGroupArgs.builder()        
            .port(6081)
            .protocol("GENEVE")
            .vpcId(aws_vpc.example().id())
            .healthCheck(TargetGroupHealthCheckArgs.builder()
                .port(80)
                .protocol("HTTP")
                .build())
            .build());

        var exampleListener = new Listener("exampleListener", ListenerArgs.builder()        
            .loadBalancerArn(exampleLoadBalancer.id())
            .defaultActions(ListenerDefaultActionArgs.builder()
                .targetGroupArn(exampleTargetGroup.id())
                .type("forward")
                .build())
            .build());

    }
}
```
```yaml
resources:
  exampleLoadBalancer:
    type: aws:lb:LoadBalancer
    properties:
      loadBalancerType: gateway
      subnetMappings:
        - subnetId: ${aws_subnet.example.id}
  exampleTargetGroup:
    type: aws:lb:TargetGroup
    properties:
      port: 6081
      protocol: GENEVE
      vpcId: ${aws_vpc.example.id}
      healthCheck:
        port: 80
        protocol: HTTP
  exampleListener:
    type: aws:lb:Listener
    properties:
      loadBalancerArn: ${exampleLoadBalancer.id}
      defaultActions:
        - targetGroupArn: ${exampleTargetGroup.id}
          type: forward
```
{{% /example %}}
{{% /examples %}}

## Import

Listeners can be imported using their ARN, e.g.,

```sh
 $ pulumi import aws:applicationloadbalancing/listener:Listener front_end arn:aws:elasticloadbalancing:us-west-2:187416307283:listener/app/front-end-alb/8e4497da625e2d8a/9ab28ade35828f96
```

 
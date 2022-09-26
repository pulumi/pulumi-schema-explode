Provides a load balancer policy, which can be attached to an ELB listener or backend server.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as fs from "fs";

const wu_tang = new aws.elb.LoadBalancer("wu-tang", {
    availabilityZones: ["us-east-1a"],
    listeners: [{
        instancePort: 443,
        instanceProtocol: "http",
        lbPort: 443,
        lbProtocol: "https",
        sslCertificateId: "arn:aws:iam::000000000000:server-certificate/wu-tang.net",
    }],
    tags: {
        Name: "wu-tang",
    },
});
const wu_tang_ca_pubkey_policy = new aws.elb.LoadBalancerPolicy("wu-tang-ca-pubkey-policy", {
    loadBalancerName: wu_tang.name,
    policyName: "wu-tang-ca-pubkey-policy",
    policyTypeName: "PublicKeyPolicyType",
    policyAttributes: [{
        name: "PublicKey",
        value: fs.readFileSync("wu-tang-pubkey"),
    }],
});
const wu_tang_root_ca_backend_auth_policy = new aws.elb.LoadBalancerPolicy("wu-tang-root-ca-backend-auth-policy", {
    loadBalancerName: wu_tang.name,
    policyName: "wu-tang-root-ca-backend-auth-policy",
    policyTypeName: "BackendServerAuthenticationPolicyType",
    policyAttributes: [{
        name: "PublicKeyPolicyName",
        value: aws_load_balancer_policy["wu-tang-root-ca-pubkey-policy"].policy_name,
    }],
});
const wu_tang_ssl = new aws.elb.LoadBalancerPolicy("wu-tang-ssl", {
    loadBalancerName: wu_tang.name,
    policyName: "wu-tang-ssl",
    policyTypeName: "SSLNegotiationPolicyType",
    policyAttributes: [
        {
            name: "ECDHE-ECDSA-AES128-GCM-SHA256",
            value: "true",
        },
        {
            name: "Protocol-TLSv1.2",
            value: "true",
        },
    ],
});
const wu_tang_ssl_tls_1_1 = new aws.elb.LoadBalancerPolicy("wu-tang-ssl-tls-1-1", {
    loadBalancerName: wu_tang.name,
    policyName: "wu-tang-ssl",
    policyTypeName: "SSLNegotiationPolicyType",
    policyAttributes: [{
        name: "Reference-Security-Policy",
        value: "ELBSecurityPolicy-TLS-1-1-2017-01",
    }],
});
const wu_tang_backend_auth_policies_443 = new aws.elb.LoadBalancerBackendServerPolicy("wu-tang-backend-auth-policies-443", {
    loadBalancerName: wu_tang.name,
    instancePort: 443,
    policyNames: [wu_tang_root_ca_backend_auth_policy.policyName],
});
const wu_tang_listener_policies_443 = new aws.elb.ListenerPolicy("wu-tang-listener-policies-443", {
    loadBalancerName: wu_tang.name,
    loadBalancerPort: 443,
    policyNames: [wu_tang_ssl.policyName],
});
```
```python
import pulumi
import pulumi_aws as aws

wu_tang = aws.elb.LoadBalancer("wu-tang",
    availability_zones=["us-east-1a"],
    listeners=[aws.elb.LoadBalancerListenerArgs(
        instance_port=443,
        instance_protocol="http",
        lb_port=443,
        lb_protocol="https",
        ssl_certificate_id="arn:aws:iam::000000000000:server-certificate/wu-tang.net",
    )],
    tags={
        "Name": "wu-tang",
    })
wu_tang_ca_pubkey_policy = aws.elb.LoadBalancerPolicy("wu-tang-ca-pubkey-policy",
    load_balancer_name=wu_tang.name,
    policy_name="wu-tang-ca-pubkey-policy",
    policy_type_name="PublicKeyPolicyType",
    policy_attributes=[aws.elb.LoadBalancerPolicyPolicyAttributeArgs(
        name="PublicKey",
        value=(lambda path: open(path).read())("wu-tang-pubkey"),
    )])
wu_tang_root_ca_backend_auth_policy = aws.elb.LoadBalancerPolicy("wu-tang-root-ca-backend-auth-policy",
    load_balancer_name=wu_tang.name,
    policy_name="wu-tang-root-ca-backend-auth-policy",
    policy_type_name="BackendServerAuthenticationPolicyType",
    policy_attributes=[aws.elb.LoadBalancerPolicyPolicyAttributeArgs(
        name="PublicKeyPolicyName",
        value=aws_load_balancer_policy["wu-tang-root-ca-pubkey-policy"]["policy_name"],
    )])
wu_tang_ssl = aws.elb.LoadBalancerPolicy("wu-tang-ssl",
    load_balancer_name=wu_tang.name,
    policy_name="wu-tang-ssl",
    policy_type_name="SSLNegotiationPolicyType",
    policy_attributes=[
        aws.elb.LoadBalancerPolicyPolicyAttributeArgs(
            name="ECDHE-ECDSA-AES128-GCM-SHA256",
            value="true",
        ),
        aws.elb.LoadBalancerPolicyPolicyAttributeArgs(
            name="Protocol-TLSv1.2",
            value="true",
        ),
    ])
wu_tang_ssl_tls_1_1 = aws.elb.LoadBalancerPolicy("wu-tang-ssl-tls-1-1",
    load_balancer_name=wu_tang.name,
    policy_name="wu-tang-ssl",
    policy_type_name="SSLNegotiationPolicyType",
    policy_attributes=[aws.elb.LoadBalancerPolicyPolicyAttributeArgs(
        name="Reference-Security-Policy",
        value="ELBSecurityPolicy-TLS-1-1-2017-01",
    )])
wu_tang_backend_auth_policies_443 = aws.elb.LoadBalancerBackendServerPolicy("wu-tang-backend-auth-policies-443",
    load_balancer_name=wu_tang.name,
    instance_port=443,
    policy_names=[wu_tang_root_ca_backend_auth_policy.policy_name])
wu_tang_listener_policies_443 = aws.elb.ListenerPolicy("wu-tang-listener-policies-443",
    load_balancer_name=wu_tang.name,
    load_balancer_port=443,
    policy_names=[wu_tang_ssl.policy_name])
```
```csharp
using System.Collections.Generic;
using System.IO;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var wu_tang = new Aws.Elb.LoadBalancer("wu-tang", new()
    {
        AvailabilityZones = new[]
        {
            "us-east-1a",
        },
        Listeners = new[]
        {
            new Aws.Elb.Inputs.LoadBalancerListenerArgs
            {
                InstancePort = 443,
                InstanceProtocol = "http",
                LbPort = 443,
                LbProtocol = "https",
                SslCertificateId = "arn:aws:iam::000000000000:server-certificate/wu-tang.net",
            },
        },
        Tags = 
        {
            { "Name", "wu-tang" },
        },
    });

    var wu_tang_ca_pubkey_policy = new Aws.Elb.LoadBalancerPolicy("wu-tang-ca-pubkey-policy", new()
    {
        LoadBalancerName = wu_tang.Name,
        PolicyName = "wu-tang-ca-pubkey-policy",
        PolicyTypeName = "PublicKeyPolicyType",
        PolicyAttributes = new[]
        {
            new Aws.Elb.Inputs.LoadBalancerPolicyPolicyAttributeArgs
            {
                Name = "PublicKey",
                Value = File.ReadAllText("wu-tang-pubkey"),
            },
        },
    });

    var wu_tang_root_ca_backend_auth_policy = new Aws.Elb.LoadBalancerPolicy("wu-tang-root-ca-backend-auth-policy", new()
    {
        LoadBalancerName = wu_tang.Name,
        PolicyName = "wu-tang-root-ca-backend-auth-policy",
        PolicyTypeName = "BackendServerAuthenticationPolicyType",
        PolicyAttributes = new[]
        {
            new Aws.Elb.Inputs.LoadBalancerPolicyPolicyAttributeArgs
            {
                Name = "PublicKeyPolicyName",
                Value = aws_load_balancer_policy.Wu_tang_root_ca_pubkey_policy.Policy_name,
            },
        },
    });

    var wu_tang_ssl = new Aws.Elb.LoadBalancerPolicy("wu-tang-ssl", new()
    {
        LoadBalancerName = wu_tang.Name,
        PolicyName = "wu-tang-ssl",
        PolicyTypeName = "SSLNegotiationPolicyType",
        PolicyAttributes = new[]
        {
            new Aws.Elb.Inputs.LoadBalancerPolicyPolicyAttributeArgs
            {
                Name = "ECDHE-ECDSA-AES128-GCM-SHA256",
                Value = "true",
            },
            new Aws.Elb.Inputs.LoadBalancerPolicyPolicyAttributeArgs
            {
                Name = "Protocol-TLSv1.2",
                Value = "true",
            },
        },
    });

    var wu_tang_ssl_tls_1_1 = new Aws.Elb.LoadBalancerPolicy("wu-tang-ssl-tls-1-1", new()
    {
        LoadBalancerName = wu_tang.Name,
        PolicyName = "wu-tang-ssl",
        PolicyTypeName = "SSLNegotiationPolicyType",
        PolicyAttributes = new[]
        {
            new Aws.Elb.Inputs.LoadBalancerPolicyPolicyAttributeArgs
            {
                Name = "Reference-Security-Policy",
                Value = "ELBSecurityPolicy-TLS-1-1-2017-01",
            },
        },
    });

    var wu_tang_backend_auth_policies_443 = new Aws.Elb.LoadBalancerBackendServerPolicy("wu-tang-backend-auth-policies-443", new()
    {
        LoadBalancerName = wu_tang.Name,
        InstancePort = 443,
        PolicyNames = new[]
        {
            wu_tang_root_ca_backend_auth_policy.PolicyName,
        },
    });

    var wu_tang_listener_policies_443 = new Aws.Elb.ListenerPolicy("wu-tang-listener-policies-443", new()
    {
        LoadBalancerName = wu_tang.Name,
        LoadBalancerPort = 443,
        PolicyNames = new[]
        {
            wu_tang_ssl.PolicyName,
        },
    });

});
```
```go
package main

import (
	"io/ioutil"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/elb"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func readFileOrPanic(path string) pulumi.StringPtrInput {
	data, err := ioutil.ReadFile(path)
	if err != nil {
		panic(err.Error())
	}
	return pulumi.String(string(data))
}

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := elb.NewLoadBalancer(ctx, "wu-tang", &elb.LoadBalancerArgs{
			AvailabilityZones: pulumi.StringArray{
				pulumi.String("us-east-1a"),
			},
			Listeners: elb.LoadBalancerListenerArray{
				&elb.LoadBalancerListenerArgs{
					InstancePort:     pulumi.Int(443),
					InstanceProtocol: pulumi.String("http"),
					LbPort:           pulumi.Int(443),
					LbProtocol:       pulumi.String("https"),
					SslCertificateId: pulumi.String("arn:aws:iam::000000000000:server-certificate/wu-tang.net"),
				},
			},
			Tags: pulumi.StringMap{
				"Name": pulumi.String("wu-tang"),
			},
		})
		if err != nil {
			return err
		}
		_, err = elb.NewLoadBalancerPolicy(ctx, "wu-tang-ca-pubkey-policy", &elb.LoadBalancerPolicyArgs{
			LoadBalancerName: wu_tang.Name,
			PolicyName:       pulumi.String("wu-tang-ca-pubkey-policy"),
			PolicyTypeName:   pulumi.String("PublicKeyPolicyType"),
			PolicyAttributes: elb.LoadBalancerPolicyPolicyAttributeArray{
				&elb.LoadBalancerPolicyPolicyAttributeArgs{
					Name:  pulumi.String("PublicKey"),
					Value: readFileOrPanic("wu-tang-pubkey"),
				},
			},
		})
		if err != nil {
			return err
		}
		_, err = elb.NewLoadBalancerPolicy(ctx, "wu-tang-root-ca-backend-auth-policy", &elb.LoadBalancerPolicyArgs{
			LoadBalancerName: wu_tang.Name,
			PolicyName:       pulumi.String("wu-tang-root-ca-backend-auth-policy"),
			PolicyTypeName:   pulumi.String("BackendServerAuthenticationPolicyType"),
			PolicyAttributes: elb.LoadBalancerPolicyPolicyAttributeArray{
				&elb.LoadBalancerPolicyPolicyAttributeArgs{
					Name:  pulumi.String("PublicKeyPolicyName"),
					Value: pulumi.Any(aws_load_balancer_policy.Wu - tang - root - ca - pubkey - policy.Policy_name),
				},
			},
		})
		if err != nil {
			return err
		}
		_, err = elb.NewLoadBalancerPolicy(ctx, "wu-tang-ssl", &elb.LoadBalancerPolicyArgs{
			LoadBalancerName: wu_tang.Name,
			PolicyName:       pulumi.String("wu-tang-ssl"),
			PolicyTypeName:   pulumi.String("SSLNegotiationPolicyType"),
			PolicyAttributes: elb.LoadBalancerPolicyPolicyAttributeArray{
				&elb.LoadBalancerPolicyPolicyAttributeArgs{
					Name:  pulumi.String("ECDHE-ECDSA-AES128-GCM-SHA256"),
					Value: pulumi.String("true"),
				},
				&elb.LoadBalancerPolicyPolicyAttributeArgs{
					Name:  pulumi.String("Protocol-TLSv1.2"),
					Value: pulumi.String("true"),
				},
			},
		})
		if err != nil {
			return err
		}
		_, err = elb.NewLoadBalancerPolicy(ctx, "wu-tang-ssl-tls-1-1", &elb.LoadBalancerPolicyArgs{
			LoadBalancerName: wu_tang.Name,
			PolicyName:       pulumi.String("wu-tang-ssl"),
			PolicyTypeName:   pulumi.String("SSLNegotiationPolicyType"),
			PolicyAttributes: elb.LoadBalancerPolicyPolicyAttributeArray{
				&elb.LoadBalancerPolicyPolicyAttributeArgs{
					Name:  pulumi.String("Reference-Security-Policy"),
					Value: pulumi.String("ELBSecurityPolicy-TLS-1-1-2017-01"),
				},
			},
		})
		if err != nil {
			return err
		}
		_, err = elb.NewLoadBalancerBackendServerPolicy(ctx, "wu-tang-backend-auth-policies-443", &elb.LoadBalancerBackendServerPolicyArgs{
			LoadBalancerName: wu_tang.Name,
			InstancePort:     pulumi.Int(443),
			PolicyNames: pulumi.StringArray{
				wu_tang_root_ca_backend_auth_policy.PolicyName,
			},
		})
		if err != nil {
			return err
		}
		_, err = elb.NewListenerPolicy(ctx, "wu-tang-listener-policies-443", &elb.ListenerPolicyArgs{
			LoadBalancerName: wu_tang.Name,
			LoadBalancerPort: pulumi.Int(443),
			PolicyNames: pulumi.StringArray{
				wu_tang_ssl.PolicyName,
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
import com.pulumi.aws.elb.LoadBalancer;
import com.pulumi.aws.elb.LoadBalancerArgs;
import com.pulumi.aws.elb.inputs.LoadBalancerListenerArgs;
import com.pulumi.aws.elb.LoadBalancerPolicy;
import com.pulumi.aws.elb.LoadBalancerPolicyArgs;
import com.pulumi.aws.elb.inputs.LoadBalancerPolicyPolicyAttributeArgs;
import com.pulumi.aws.elb.LoadBalancerBackendServerPolicy;
import com.pulumi.aws.elb.LoadBalancerBackendServerPolicyArgs;
import com.pulumi.aws.elb.ListenerPolicy;
import com.pulumi.aws.elb.ListenerPolicyArgs;
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
        var wu_tang = new LoadBalancer("wu-tang", LoadBalancerArgs.builder()        
            .availabilityZones("us-east-1a")
            .listeners(LoadBalancerListenerArgs.builder()
                .instancePort(443)
                .instanceProtocol("http")
                .lbPort(443)
                .lbProtocol("https")
                .sslCertificateId("arn:aws:iam::000000000000:server-certificate/wu-tang.net")
                .build())
            .tags(Map.of("Name", "wu-tang"))
            .build());

        var wu_tang_ca_pubkey_policy = new LoadBalancerPolicy("wu-tang-ca-pubkey-policy", LoadBalancerPolicyArgs.builder()        
            .loadBalancerName(wu_tang.name())
            .policyName("wu-tang-ca-pubkey-policy")
            .policyTypeName("PublicKeyPolicyType")
            .policyAttributes(LoadBalancerPolicyPolicyAttributeArgs.builder()
                .name("PublicKey")
                .value(Files.readString(Paths.get("wu-tang-pubkey")))
                .build())
            .build());

        var wu_tang_root_ca_backend_auth_policy = new LoadBalancerPolicy("wu-tang-root-ca-backend-auth-policy", LoadBalancerPolicyArgs.builder()        
            .loadBalancerName(wu_tang.name())
            .policyName("wu-tang-root-ca-backend-auth-policy")
            .policyTypeName("BackendServerAuthenticationPolicyType")
            .policyAttributes(LoadBalancerPolicyPolicyAttributeArgs.builder()
                .name("PublicKeyPolicyName")
                .value(aws_load_balancer_policy.wu-tang-root-ca-pubkey-policy().policy_name())
                .build())
            .build());

        var wu_tang_ssl = new LoadBalancerPolicy("wu-tang-ssl", LoadBalancerPolicyArgs.builder()        
            .loadBalancerName(wu_tang.name())
            .policyName("wu-tang-ssl")
            .policyTypeName("SSLNegotiationPolicyType")
            .policyAttributes(            
                LoadBalancerPolicyPolicyAttributeArgs.builder()
                    .name("ECDHE-ECDSA-AES128-GCM-SHA256")
                    .value("true")
                    .build(),
                LoadBalancerPolicyPolicyAttributeArgs.builder()
                    .name("Protocol-TLSv1.2")
                    .value("true")
                    .build())
            .build());

        var wu_tang_ssl_tls_1_1 = new LoadBalancerPolicy("wu-tang-ssl-tls-1-1", LoadBalancerPolicyArgs.builder()        
            .loadBalancerName(wu_tang.name())
            .policyName("wu-tang-ssl")
            .policyTypeName("SSLNegotiationPolicyType")
            .policyAttributes(LoadBalancerPolicyPolicyAttributeArgs.builder()
                .name("Reference-Security-Policy")
                .value("ELBSecurityPolicy-TLS-1-1-2017-01")
                .build())
            .build());

        var wu_tang_backend_auth_policies_443 = new LoadBalancerBackendServerPolicy("wu-tang-backend-auth-policies-443", LoadBalancerBackendServerPolicyArgs.builder()        
            .loadBalancerName(wu_tang.name())
            .instancePort(443)
            .policyNames(wu_tang_root_ca_backend_auth_policy.policyName())
            .build());

        var wu_tang_listener_policies_443 = new ListenerPolicy("wu-tang-listener-policies-443", ListenerPolicyArgs.builder()        
            .loadBalancerName(wu_tang.name())
            .loadBalancerPort(443)
            .policyNames(wu_tang_ssl.policyName())
            .build());

    }
}
```
{{% /example %}}
{{% /examples %}}
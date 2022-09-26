Generates an Route53 traffic policy document in JSON format for use with resources that expect policy documents such as [`aws.route53.TrafficPolicy`](https://www.terraform.io/docs/providers/aws/r/route53_traffic_policy.html).


{{% examples %}}
## Example Usage
{{% example %}}
### Basic Example

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const current = aws.getRegion({});
const exampleTrafficPolicyDocument = Promise.all([current, current]).then(([current, current1]) => aws.route53.getTrafficPolicyDocument({
    recordType: "A",
    startRule: "site_switch",
    endpoints: [
        {
            id: "my_elb",
            type: "elastic-load-balancer",
            value: `elb-111111.${current.name}.elb.amazonaws.com`,
        },
        {
            id: "site_down_banner",
            type: "s3-website",
            region: current1.name,
            value: "www.example.com",
        },
    ],
    rules: [{
        id: "site_switch",
        type: "failover",
        primary: {
            endpointReference: "my_elb",
        },
        secondary: {
            endpointReference: "site_down_banner",
        },
    }],
}));
const exampleTrafficPolicy = new aws.route53.TrafficPolicy("exampleTrafficPolicy", {
    comment: "example comment",
    document: exampleTrafficPolicyDocument.then(exampleTrafficPolicyDocument => exampleTrafficPolicyDocument.json),
});
```
```python
import pulumi
import pulumi_aws as aws

current = aws.get_region()
example_traffic_policy_document = aws.route53.get_traffic_policy_document(record_type="A",
    start_rule="site_switch",
    endpoints=[
        aws.route53.GetTrafficPolicyDocumentEndpointArgs(
            id="my_elb",
            type="elastic-load-balancer",
            value=f"elb-111111.{current.name}.elb.amazonaws.com",
        ),
        aws.route53.GetTrafficPolicyDocumentEndpointArgs(
            id="site_down_banner",
            type="s3-website",
            region=current.name,
            value="www.example.com",
        ),
    ],
    rules=[aws.route53.GetTrafficPolicyDocumentRuleArgs(
        id="site_switch",
        type="failover",
        primary=aws.route53.GetTrafficPolicyDocumentRulePrimaryArgs(
            endpoint_reference="my_elb",
        ),
        secondary=aws.route53.GetTrafficPolicyDocumentRuleSecondaryArgs(
            endpoint_reference="site_down_banner",
        ),
    )])
example_traffic_policy = aws.route53.TrafficPolicy("exampleTrafficPolicy",
    comment="example comment",
    document=example_traffic_policy_document.json)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var current = Aws.GetRegion.Invoke();

    var exampleTrafficPolicyDocument = Aws.Route53.GetTrafficPolicyDocument.Invoke(new()
    {
        RecordType = "A",
        StartRule = "site_switch",
        Endpoints = new[]
        {
            new Aws.Route53.Inputs.GetTrafficPolicyDocumentEndpointInputArgs
            {
                Id = "my_elb",
                Type = "elastic-load-balancer",
                Value = $"elb-111111.{current.Apply(getRegionResult => getRegionResult.Name)}.elb.amazonaws.com",
            },
            new Aws.Route53.Inputs.GetTrafficPolicyDocumentEndpointInputArgs
            {
                Id = "site_down_banner",
                Type = "s3-website",
                Region = current.Apply(getRegionResult => getRegionResult.Name),
                Value = "www.example.com",
            },
        },
        Rules = new[]
        {
            new Aws.Route53.Inputs.GetTrafficPolicyDocumentRuleInputArgs
            {
                Id = "site_switch",
                Type = "failover",
                Primary = new Aws.Route53.Inputs.GetTrafficPolicyDocumentRulePrimaryInputArgs
                {
                    EndpointReference = "my_elb",
                },
                Secondary = new Aws.Route53.Inputs.GetTrafficPolicyDocumentRuleSecondaryInputArgs
                {
                    EndpointReference = "site_down_banner",
                },
            },
        },
    });

    var exampleTrafficPolicy = new Aws.Route53.TrafficPolicy("exampleTrafficPolicy", new()
    {
        Comment = "example comment",
        Document = exampleTrafficPolicyDocument.Apply(getTrafficPolicyDocumentResult => getTrafficPolicyDocumentResult.Json),
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/route53"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		current, err := aws.GetRegion(ctx, nil, nil)
		if err != nil {
			return err
		}
		exampleTrafficPolicyDocument, err := route53.GetTrafficPolicyDocument(ctx, &route53.GetTrafficPolicyDocumentArgs{
			RecordType: pulumi.StringRef("A"),
			StartRule:  pulumi.StringRef("site_switch"),
			Endpoints: []route53.GetTrafficPolicyDocumentEndpoint{
				route53.GetTrafficPolicyDocumentEndpoint{
					Id:    "my_elb",
					Type:  pulumi.StringRef("elastic-load-balancer"),
					Value: pulumi.StringRef(fmt.Sprintf("elb-111111.%v.elb.amazonaws.com", current.Name)),
				},
				route53.GetTrafficPolicyDocumentEndpoint{
					Id:     "site_down_banner",
					Type:   pulumi.StringRef("s3-website"),
					Region: pulumi.StringRef(current.Name),
					Value:  pulumi.StringRef("www.example.com"),
				},
			},
			Rules: []route53.GetTrafficPolicyDocumentRule{
				route53.GetTrafficPolicyDocumentRule{
					Id:   "site_switch",
					Type: pulumi.StringRef("failover"),
					Primary: route53.GetTrafficPolicyDocumentRulePrimary{
						EndpointReference: pulumi.StringRef("my_elb"),
					},
					Secondary: route53.GetTrafficPolicyDocumentRuleSecondary{
						EndpointReference: pulumi.StringRef("site_down_banner"),
					},
				},
			},
		}, nil)
		if err != nil {
			return err
		}
		_, err = route53.NewTrafficPolicy(ctx, "exampleTrafficPolicy", &route53.TrafficPolicyArgs{
			Comment:  pulumi.String("example comment"),
			Document: pulumi.String(exampleTrafficPolicyDocument.Json),
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
import com.pulumi.aws.AwsFunctions;
import com.pulumi.aws.inputs.GetRegionArgs;
import com.pulumi.aws.route53.Route53Functions;
import com.pulumi.aws.route53.inputs.GetTrafficPolicyDocumentArgs;
import com.pulumi.aws.route53.TrafficPolicy;
import com.pulumi.aws.route53.TrafficPolicyArgs;
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
        final var current = AwsFunctions.getRegion();

        final var exampleTrafficPolicyDocument = Route53Functions.getTrafficPolicyDocument(GetTrafficPolicyDocumentArgs.builder()
            .recordType("A")
            .startRule("site_switch")
            .endpoints(            
                GetTrafficPolicyDocumentEndpointArgs.builder()
                    .id("my_elb")
                    .type("elastic-load-balancer")
                    .value(String.format("elb-111111.%s.elb.amazonaws.com", current.applyValue(getRegionResult -> getRegionResult.name())))
                    .build(),
                GetTrafficPolicyDocumentEndpointArgs.builder()
                    .id("site_down_banner")
                    .type("s3-website")
                    .region(current.applyValue(getRegionResult -> getRegionResult.name()))
                    .value("www.example.com")
                    .build())
            .rules(GetTrafficPolicyDocumentRuleArgs.builder()
                .id("site_switch")
                .type("failover")
                .primary(GetTrafficPolicyDocumentRulePrimaryArgs.builder()
                    .endpointReference("my_elb")
                    .build())
                .secondary(GetTrafficPolicyDocumentRuleSecondaryArgs.builder()
                    .endpointReference("site_down_banner")
                    .build())
                .build())
            .build());

        var exampleTrafficPolicy = new TrafficPolicy("exampleTrafficPolicy", TrafficPolicyArgs.builder()        
            .comment("example comment")
            .document(exampleTrafficPolicyDocument.applyValue(getTrafficPolicyDocumentResult -> getTrafficPolicyDocumentResult.json()))
            .build());

    }
}
```
```yaml
resources:
  exampleTrafficPolicy:
    type: aws:route53:TrafficPolicy
    properties:
      comment: example comment
      document: ${exampleTrafficPolicyDocument.json}
variables:
  current:
    Fn::Invoke:
      Function: aws:getRegion
      Arguments: {}
  exampleTrafficPolicyDocument:
    Fn::Invoke:
      Function: aws:route53:getTrafficPolicyDocument
      Arguments:
        recordType: A
        startRule: site_switch
        endpoints:
          - id: my_elb
            type: elastic-load-balancer
            value: elb-111111.${current.name}.elb.amazonaws.com
          - id: site_down_banner
            type: s3-website
            region: ${current.name}
            value: www.example.com
        rules:
          - id: site_switch
            type: failover
            primary:
              endpointReference: my_elb
            secondary:
              endpointReference: site_down_banner
```
{{% /example %}}
{{% /examples %}}
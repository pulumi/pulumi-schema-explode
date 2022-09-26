Provides an Amazon Connect Contact Flow resource. For more information see
[Amazon Connect: Getting Started](https://docs.aws.amazon.com/connect/latest/adminguide/amazon-connect-get-started.html)

This resource embeds or references Contact Flows specified in Amazon Connect Contact Flow Language. For more information see
[Amazon Connect Flow language](https://docs.aws.amazon.com/connect/latest/adminguide/flow-language.html)

!> **WARN:** Contact Flows exported from the Console [Contact Flow import/export](https://docs.aws.amazon.com/connect/latest/adminguide/contact-flow-import-export.html) are not in the Amazon Connect Contact Flow Language and can not be used with this resource. Instead, the recommendation is to use the AWS CLI [`describe-contact-flow`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/connect/describe-contact-flow.html).
See example below which uses `jq` to extract the `Content` attribute and saves it to a local file.


{{% examples %}}
## Example Usage
{{% example %}}
### Basic

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const test = new aws.connect.ContactFlow("test", {
    content: `	{
		"Version": "2019-10-30",
		"StartAction": "12345678-1234-1234-1234-123456789012",
		"Actions": [
			{
				"Identifier": "12345678-1234-1234-1234-123456789012",
				"Type": "MessageParticipant",
				"Transitions": {
					"NextAction": "abcdef-abcd-abcd-abcd-abcdefghijkl",
					"Errors": [],
					"Conditions": []
				},
				"Parameters": {
					"Text": "Thanks for calling the sample flow!"
				}
			},
			{
				"Identifier": "abcdef-abcd-abcd-abcd-abcdefghijkl",
				"Type": "DisconnectParticipant",
				"Transitions": {},
				"Parameters": {}
			}
		]
	}
	`,
    description: "Test Contact Flow Description",
    instanceId: "aaaaaaaa-bbbb-cccc-dddd-111111111111",
    tags: {
        Application: "Terraform",
        Method: "Create",
        Name: "Test Contact Flow",
    },
    type: "CONTACT_FLOW",
});
```
```python
import pulumi
import pulumi_aws as aws

test = aws.connect.ContactFlow("test",
    content="""	{
		"Version": "2019-10-30",
		"StartAction": "12345678-1234-1234-1234-123456789012",
		"Actions": [
			{
				"Identifier": "12345678-1234-1234-1234-123456789012",
				"Type": "MessageParticipant",
				"Transitions": {
					"NextAction": "abcdef-abcd-abcd-abcd-abcdefghijkl",
					"Errors": [],
					"Conditions": []
				},
				"Parameters": {
					"Text": "Thanks for calling the sample flow!"
				}
			},
			{
				"Identifier": "abcdef-abcd-abcd-abcd-abcdefghijkl",
				"Type": "DisconnectParticipant",
				"Transitions": {},
				"Parameters": {}
			}
		]
	}
	
""",
    description="Test Contact Flow Description",
    instance_id="aaaaaaaa-bbbb-cccc-dddd-111111111111",
    tags={
        "Application": "Terraform",
        "Method": "Create",
        "Name": "Test Contact Flow",
    },
    type="CONTACT_FLOW")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var test = new Aws.Connect.ContactFlow("test", new()
    {
        Content = @"	{
		""Version"": ""2019-10-30"",
		""StartAction"": ""12345678-1234-1234-1234-123456789012"",
		""Actions"": [
			{
				""Identifier"": ""12345678-1234-1234-1234-123456789012"",
				""Type"": ""MessageParticipant"",
				""Transitions"": {
					""NextAction"": ""abcdef-abcd-abcd-abcd-abcdefghijkl"",
					""Errors"": [],
					""Conditions"": []
				},
				""Parameters"": {
					""Text"": ""Thanks for calling the sample flow!""
				}
			},
			{
				""Identifier"": ""abcdef-abcd-abcd-abcd-abcdefghijkl"",
				""Type"": ""DisconnectParticipant"",
				""Transitions"": {},
				""Parameters"": {}
			}
		]
	}
	
",
        Description = "Test Contact Flow Description",
        InstanceId = "aaaaaaaa-bbbb-cccc-dddd-111111111111",
        Tags = 
        {
            { "Application", "Terraform" },
            { "Method", "Create" },
            { "Name", "Test Contact Flow" },
        },
        Type = "CONTACT_FLOW",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/connect"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := connect.NewContactFlow(ctx, "test", &connect.ContactFlowArgs{
			Content: pulumi.String(fmt.Sprintf(`	{
		"Version": "2019-10-30",
		"StartAction": "12345678-1234-1234-1234-123456789012",
		"Actions": [
			{
				"Identifier": "12345678-1234-1234-1234-123456789012",
				"Type": "MessageParticipant",
				"Transitions": {
					"NextAction": "abcdef-abcd-abcd-abcd-abcdefghijkl",
					"Errors": [],
					"Conditions": []
				},
				"Parameters": {
					"Text": "Thanks for calling the sample flow!"
				}
			},
			{
				"Identifier": "abcdef-abcd-abcd-abcd-abcdefghijkl",
				"Type": "DisconnectParticipant",
				"Transitions": {},
				"Parameters": {}
			}
		]
	}
	
`)),
			Description: pulumi.String("Test Contact Flow Description"),
			InstanceId:  pulumi.String("aaaaaaaa-bbbb-cccc-dddd-111111111111"),
			Tags: pulumi.StringMap{
				"Application": pulumi.String("Terraform"),
				"Method":      pulumi.String("Create"),
				"Name":        pulumi.String("Test Contact Flow"),
			},
			Type: pulumi.String("CONTACT_FLOW"),
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
import com.pulumi.aws.connect.ContactFlow;
import com.pulumi.aws.connect.ContactFlowArgs;
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
        var test = new ContactFlow("test", ContactFlowArgs.builder()        
            .content("""
	{
		"Version": "2019-10-30",
		"StartAction": "12345678-1234-1234-1234-123456789012",
		"Actions": [
			{
				"Identifier": "12345678-1234-1234-1234-123456789012",
				"Type": "MessageParticipant",
				"Transitions": {
					"NextAction": "abcdef-abcd-abcd-abcd-abcdefghijkl",
					"Errors": [],
					"Conditions": []
				},
				"Parameters": {
					"Text": "Thanks for calling the sample flow!"
				}
			},
			{
				"Identifier": "abcdef-abcd-abcd-abcd-abcdefghijkl",
				"Type": "DisconnectParticipant",
				"Transitions": {},
				"Parameters": {}
			}
		]
	}
	
            """)
            .description("Test Contact Flow Description")
            .instanceId("aaaaaaaa-bbbb-cccc-dddd-111111111111")
            .tags(Map.ofEntries(
                Map.entry("Application", "Terraform"),
                Map.entry("Method", "Create"),
                Map.entry("Name", "Test Contact Flow")
            ))
            .type("CONTACT_FLOW")
            .build());

    }
}
```
```yaml
resources:
  test:
    type: aws:connect:ContactFlow
    properties:
      content: |
        	{
        		"Version": "2019-10-30",
        		"StartAction": "12345678-1234-1234-1234-123456789012",
        		"Actions": [
        			{
        				"Identifier": "12345678-1234-1234-1234-123456789012",
        				"Type": "MessageParticipant",
        				"Transitions": {
        					"NextAction": "abcdef-abcd-abcd-abcd-abcdefghijkl",
        					"Errors": [],
        					"Conditions": []
        				},
        				"Parameters": {
        					"Text": "Thanks for calling the sample flow!"
        				}
        			},
        			{
        				"Identifier": "abcdef-abcd-abcd-abcd-abcdefghijkl",
        				"Type": "DisconnectParticipant",
        				"Transitions": {},
        				"Parameters": {}
        			}
        		]
        	}
        	
      description: Test Contact Flow Description
      instanceId: aaaaaaaa-bbbb-cccc-dddd-111111111111
      tags:
        Application: Terraform
        Method: Create
        Name: Test Contact Flow
      type: CONTACT_FLOW
```
{{% /example %}}
{{% /examples %}}

## Import

Amazon Connect Contact Flows can be imported using the `instance_id` and `contact_flow_id` separated by a colon (`:`), e.g.,

```sh
 $ pulumi import aws:connect/contactFlow:ContactFlow example f1288a1f-6193-445a-b47e-af739b2:c1d4e5f6-1b3c-1b3c-1b3c-c1d4e5f6c1d4e5
```

 
Provides an Amazon Connect Contact Flow Module resource. For more information see
[Amazon Connect: Getting Started](https://docs.aws.amazon.com/connect/latest/adminguide/amazon-connect-get-started.html)

This resource embeds or references Contact Flows Modules specified in Amazon Connect Contact Flow Language. For more information see
[Amazon Connect Flow language](https://docs.aws.amazon.com/connect/latest/adminguide/flow-language.html)

!> **WARN:** Contact Flow Modules exported from the Console [See Contact Flow import/export which is the same for Contact Flow Modules](https://docs.aws.amazon.com/connect/latest/adminguide/contact-flow-import-export.html) are not in the Amazon Connect Contact Flow Language and can not be used with this resource. Instead, the recommendation is to use the AWS CLI [`describe-contact-flow-module`](https://docs.aws.amazon.com/cli/latest/reference/connect/describe-contact-flow-module.html).
See example below which uses `jq` to extract the `Content` attribute and saves it to a local file.

{{% examples %}}
## Example Usage
{{% example %}}
### Basic

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.connect.ContactFlowModule("example", {
    content: `    {
		"Version": "2019-10-30",
		"StartAction": "12345678-1234-1234-1234-123456789012",
		"Actions": [
			{
				"Identifier": "12345678-1234-1234-1234-123456789012",
				"Parameters": {
					"Text": "Hello contact flow module"
				},
				"Transitions": {
					"NextAction": "abcdef-abcd-abcd-abcd-abcdefghijkl",
					"Errors": [],
					"Conditions": []
				},
				"Type": "MessageParticipant"
			},
			{
				"Identifier": "abcdef-abcd-abcd-abcd-abcdefghijkl",
				"Type": "DisconnectParticipant",
				"Parameters": {},
				"Transitions": {}
			}
		],
		"Settings": {
			"InputParameters": [],
			"OutputParameters": [],
			"Transitions": [
				{
					"DisplayName": "Success",
					"ReferenceName": "Success",
					"Description": ""
				},
				{
					"DisplayName": "Error",
					"ReferenceName": "Error",
					"Description": ""
				}
			]
		}
	}
    `,
    description: "Example Contact Flow Module Description",
    instanceId: "aaaaaaaa-bbbb-cccc-dddd-111111111111",
    tags: {
        Application: "Terraform",
        Method: "Create",
        Name: "Example Contact Flow Module",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.connect.ContactFlowModule("example",
    content="""    {
		"Version": "2019-10-30",
		"StartAction": "12345678-1234-1234-1234-123456789012",
		"Actions": [
			{
				"Identifier": "12345678-1234-1234-1234-123456789012",
				"Parameters": {
					"Text": "Hello contact flow module"
				},
				"Transitions": {
					"NextAction": "abcdef-abcd-abcd-abcd-abcdefghijkl",
					"Errors": [],
					"Conditions": []
				},
				"Type": "MessageParticipant"
			},
			{
				"Identifier": "abcdef-abcd-abcd-abcd-abcdefghijkl",
				"Type": "DisconnectParticipant",
				"Parameters": {},
				"Transitions": {}
			}
		],
		"Settings": {
			"InputParameters": [],
			"OutputParameters": [],
			"Transitions": [
				{
					"DisplayName": "Success",
					"ReferenceName": "Success",
					"Description": ""
				},
				{
					"DisplayName": "Error",
					"ReferenceName": "Error",
					"Description": ""
				}
			]
		}
	}
    
""",
    description="Example Contact Flow Module Description",
    instance_id="aaaaaaaa-bbbb-cccc-dddd-111111111111",
    tags={
        "Application": "Terraform",
        "Method": "Create",
        "Name": "Example Contact Flow Module",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Connect.ContactFlowModule("example", new()
    {
        Content = @"    {
		""Version"": ""2019-10-30"",
		""StartAction"": ""12345678-1234-1234-1234-123456789012"",
		""Actions"": [
			{
				""Identifier"": ""12345678-1234-1234-1234-123456789012"",
				""Parameters"": {
					""Text"": ""Hello contact flow module""
				},
				""Transitions"": {
					""NextAction"": ""abcdef-abcd-abcd-abcd-abcdefghijkl"",
					""Errors"": [],
					""Conditions"": []
				},
				""Type"": ""MessageParticipant""
			},
			{
				""Identifier"": ""abcdef-abcd-abcd-abcd-abcdefghijkl"",
				""Type"": ""DisconnectParticipant"",
				""Parameters"": {},
				""Transitions"": {}
			}
		],
		""Settings"": {
			""InputParameters"": [],
			""OutputParameters"": [],
			""Transitions"": [
				{
					""DisplayName"": ""Success"",
					""ReferenceName"": ""Success"",
					""Description"": """"
				},
				{
					""DisplayName"": ""Error"",
					""ReferenceName"": ""Error"",
					""Description"": """"
				}
			]
		}
	}
    
",
        Description = "Example Contact Flow Module Description",
        InstanceId = "aaaaaaaa-bbbb-cccc-dddd-111111111111",
        Tags = 
        {
            { "Application", "Terraform" },
            { "Method", "Create" },
            { "Name", "Example Contact Flow Module" },
        },
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
		_, err := connect.NewContactFlowModule(ctx, "example", &connect.ContactFlowModuleArgs{
			Content: pulumi.String(fmt.Sprintf(`    {
		"Version": "2019-10-30",
		"StartAction": "12345678-1234-1234-1234-123456789012",
		"Actions": [
			{
				"Identifier": "12345678-1234-1234-1234-123456789012",
				"Parameters": {
					"Text": "Hello contact flow module"
				},
				"Transitions": {
					"NextAction": "abcdef-abcd-abcd-abcd-abcdefghijkl",
					"Errors": [],
					"Conditions": []
				},
				"Type": "MessageParticipant"
			},
			{
				"Identifier": "abcdef-abcd-abcd-abcd-abcdefghijkl",
				"Type": "DisconnectParticipant",
				"Parameters": {},
				"Transitions": {}
			}
		],
		"Settings": {
			"InputParameters": [],
			"OutputParameters": [],
			"Transitions": [
				{
					"DisplayName": "Success",
					"ReferenceName": "Success",
					"Description": ""
				},
				{
					"DisplayName": "Error",
					"ReferenceName": "Error",
					"Description": ""
				}
			]
		}
	}
    
`)),
			Description: pulumi.String("Example Contact Flow Module Description"),
			InstanceId:  pulumi.String("aaaaaaaa-bbbb-cccc-dddd-111111111111"),
			Tags: pulumi.StringMap{
				"Application": pulumi.String("Terraform"),
				"Method":      pulumi.String("Create"),
				"Name":        pulumi.String("Example Contact Flow Module"),
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
import com.pulumi.aws.connect.ContactFlowModule;
import com.pulumi.aws.connect.ContactFlowModuleArgs;
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
        var example = new ContactFlowModule("example", ContactFlowModuleArgs.builder()        
            .content("""
    {
		"Version": "2019-10-30",
		"StartAction": "12345678-1234-1234-1234-123456789012",
		"Actions": [
			{
				"Identifier": "12345678-1234-1234-1234-123456789012",
				"Parameters": {
					"Text": "Hello contact flow module"
				},
				"Transitions": {
					"NextAction": "abcdef-abcd-abcd-abcd-abcdefghijkl",
					"Errors": [],
					"Conditions": []
				},
				"Type": "MessageParticipant"
			},
			{
				"Identifier": "abcdef-abcd-abcd-abcd-abcdefghijkl",
				"Type": "DisconnectParticipant",
				"Parameters": {},
				"Transitions": {}
			}
		],
		"Settings": {
			"InputParameters": [],
			"OutputParameters": [],
			"Transitions": [
				{
					"DisplayName": "Success",
					"ReferenceName": "Success",
					"Description": ""
				},
				{
					"DisplayName": "Error",
					"ReferenceName": "Error",
					"Description": ""
				}
			]
		}
	}
    
            """)
            .description("Example Contact Flow Module Description")
            .instanceId("aaaaaaaa-bbbb-cccc-dddd-111111111111")
            .tags(Map.ofEntries(
                Map.entry("Application", "Terraform"),
                Map.entry("Method", "Create"),
                Map.entry("Name", "Example Contact Flow Module")
            ))
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:connect:ContactFlowModule
    properties:
      content: "    {\n\t\t\"Version\": \"2019-10-30\",\n\t\t\"StartAction\": \"12345678-1234-1234-1234-123456789012\",\n\t\t\"Actions\": [\n\t\t\t{\n\t\t\t\t\"Identifier\": \"12345678-1234-1234-1234-123456789012\",\n\t\t\t\t\"Parameters\": {\n\t\t\t\t\t\"Text\": \"Hello contact flow module\"\n\t\t\t\t},\n\t\t\t\t\"Transitions\": {\n\t\t\t\t\t\"NextAction\": \"abcdef-abcd-abcd-abcd-abcdefghijkl\",\n\t\t\t\t\t\"Errors\": [],\n\t\t\t\t\t\"Conditions\": []\n\t\t\t\t},\n\t\t\t\t\"Type\": \"MessageParticipant\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"Identifier\": \"abcdef-abcd-abcd-abcd-abcdefghijkl\",\n\t\t\t\t\"Type\": \"DisconnectParticipant\",\n\t\t\t\t\"Parameters\": {},\n\t\t\t\t\"Transitions\": {}\n\t\t\t}\n\t\t],\n\t\t\"Settings\": {\n\t\t\t\"InputParameters\": [],\n\t\t\t\"OutputParameters\": [],\n\t\t\t\"Transitions\": [\n\t\t\t\t{\n\t\t\t\t\t\"DisplayName\": \"Success\",\n\t\t\t\t\t\"ReferenceName\": \"Success\",\n\t\t\t\t\t\"Description\": \"\"\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"DisplayName\": \"Error\",\n\t\t\t\t\t\"ReferenceName\": \"Error\",\n\t\t\t\t\t\"Description\": \"\"\n\t\t\t\t}\n\t\t\t]\n\t\t}\n\t}\n    \n"
      description: Example Contact Flow Module Description
      instanceId: aaaaaaaa-bbbb-cccc-dddd-111111111111
      tags:
        Application: Terraform
        Method: Create
        Name: Example Contact Flow Module
```
{{% /example %}}
{{% /examples %}}

## Import

Amazon Connect Contact Flow Modules can be imported using the `instance_id` and `contact_flow_module_id` separated by a colon (`:`), e.g.,

```sh
 $ pulumi import aws:connect/contactFlowModule:ContactFlowModule example f1288a1f-6193-445a-b47e-af739b2:c1d4e5f6-1b3c-1b3c-1b3c-c1d4e5f6c1d4e5
```

 
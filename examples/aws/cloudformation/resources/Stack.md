Provides a CloudFormation Stack resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const network = new aws.cloudformation.Stack("network", {
    parameters: {
        VPCCidr: "10.0.0.0/16",
    },
    templateBody: `{
  "Parameters" : {
    "VPCCidr" : {
      "Type" : "String",
      "Default" : "10.0.0.0/16",
      "Description" : "Enter the CIDR block for the VPC. Default is 10.0.0.0/16."
    }
  },
  "Resources" : {
    "myVpc": {
      "Type" : "AWS::EC2::VPC",
      "Properties" : {
        "CidrBlock" : { "Ref" : "VPCCidr" },
        "Tags" : [
          {"Key": "Name", "Value": "Primary_CF_VPC"}
        ]
      }
    }
  }
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

network = aws.cloudformation.Stack("network",
    parameters={
        "VPCCidr": "10.0.0.0/16",
    },
    template_body="""{
  "Parameters" : {
    "VPCCidr" : {
      "Type" : "String",
      "Default" : "10.0.0.0/16",
      "Description" : "Enter the CIDR block for the VPC. Default is 10.0.0.0/16."
    }
  },
  "Resources" : {
    "myVpc": {
      "Type" : "AWS::EC2::VPC",
      "Properties" : {
        "CidrBlock" : { "Ref" : "VPCCidr" },
        "Tags" : [
          {"Key": "Name", "Value": "Primary_CF_VPC"}
        ]
      }
    }
  }
}

""")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var network = new Aws.CloudFormation.Stack("network", new()
    {
        Parameters = 
        {
            { "VPCCidr", "10.0.0.0/16" },
        },
        TemplateBody = @"{
  ""Parameters"" : {
    ""VPCCidr"" : {
      ""Type"" : ""String"",
      ""Default"" : ""10.0.0.0/16"",
      ""Description"" : ""Enter the CIDR block for the VPC. Default is 10.0.0.0/16.""
    }
  },
  ""Resources"" : {
    ""myVpc"": {
      ""Type"" : ""AWS::EC2::VPC"",
      ""Properties"" : {
        ""CidrBlock"" : { ""Ref"" : ""VPCCidr"" },
        ""Tags"" : [
          {""Key"": ""Name"", ""Value"": ""Primary_CF_VPC""}
        ]
      }
    }
  }
}

",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudformation"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := cloudformation.NewStack(ctx, "network", &cloudformation.StackArgs{
			Parameters: pulumi.StringMap{
				"VPCCidr": pulumi.String("10.0.0.0/16"),
			},
			TemplateBody: pulumi.String(fmt.Sprintf(`{
  "Parameters" : {
    "VPCCidr" : {
      "Type" : "String",
      "Default" : "10.0.0.0/16",
      "Description" : "Enter the CIDR block for the VPC. Default is 10.0.0.0/16."
    }
  },
  "Resources" : {
    "myVpc": {
      "Type" : "AWS::EC2::VPC",
      "Properties" : {
        "CidrBlock" : { "Ref" : "VPCCidr" },
        "Tags" : [
          {"Key": "Name", "Value": "Primary_CF_VPC"}
        ]
      }
    }
  }
}

`)),
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
import com.pulumi.aws.cloudformation.Stack;
import com.pulumi.aws.cloudformation.StackArgs;
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
        var network = new Stack("network", StackArgs.builder()        
            .parameters(Map.of("VPCCidr", "10.0.0.0/16"))
            .templateBody("""
{
  "Parameters" : {
    "VPCCidr" : {
      "Type" : "String",
      "Default" : "10.0.0.0/16",
      "Description" : "Enter the CIDR block for the VPC. Default is 10.0.0.0/16."
    }
  },
  "Resources" : {
    "myVpc": {
      "Type" : "AWS::EC2::VPC",
      "Properties" : {
        "CidrBlock" : { "Ref" : "VPCCidr" },
        "Tags" : [
          {"Key": "Name", "Value": "Primary_CF_VPC"}
        ]
      }
    }
  }
}

            """)
            .build());

    }
}
```
```yaml
resources:
  network:
    type: aws:cloudformation:Stack
    properties:
      parameters:
        VPCCidr: 10.0.0.0/16
      templateBody: |+
        {
          "Parameters" : {
            "VPCCidr" : {
              "Type" : "String",
              "Default" : "10.0.0.0/16",
              "Description" : "Enter the CIDR block for the VPC. Default is 10.0.0.0/16."
            }
          },
          "Resources" : {
            "myVpc": {
              "Type" : "AWS::EC2::VPC",
              "Properties" : {
                "CidrBlock" : { "Ref" : "VPCCidr" },
                "Tags" : [
                  {"Key": "Name", "Value": "Primary_CF_VPC"}
                ]
              }
            }
          }
        }
```
{{% /example %}}
{{% /examples %}}

## Import

Cloudformation Stacks can be imported using the `name`, e.g.,

```sh
 $ pulumi import aws:cloudformation/stack:Stack stack networking-stack
```

 
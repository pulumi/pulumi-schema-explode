Provides a ApplicationInsights Application resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleGroup = new aws.resourcegroups.Group("exampleGroup", {resourceQuery: {
    query: `	{
		"ResourceTypeFilters": [
		  "AWS::EC2::Instance"
		],
		"TagFilters": [
		  {
			"Key": "Stage",
			"Values": [
			  "Test"
			]
		  }
		]
	  }
`,
}});
const exampleApplication = new aws.applicationinsights.Application("exampleApplication", {resourceGroupName: exampleGroup.name});
```
```python
import pulumi
import pulumi_aws as aws

example_group = aws.resourcegroups.Group("exampleGroup", resource_query=aws.resourcegroups.GroupResourceQueryArgs(
    query="""	{
		"ResourceTypeFilters": [
		  "AWS::EC2::Instance"
		],
		"TagFilters": [
		  {
			"Key": "Stage",
			"Values": [
			  "Test"
			]
		  }
		]
	  }
""",
))
example_application = aws.applicationinsights.Application("exampleApplication", resource_group_name=example_group.name)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleGroup = new Aws.ResourceGroups.Group("exampleGroup", new()
    {
        ResourceQuery = new Aws.ResourceGroups.Inputs.GroupResourceQueryArgs
        {
            Query = @"	{
		""ResourceTypeFilters"": [
		  ""AWS::EC2::Instance""
		],
		""TagFilters"": [
		  {
			""Key"": ""Stage"",
			""Values"": [
			  ""Test""
			]
		  }
		]
	  }
",
        },
    });

    var exampleApplication = new Aws.ApplicationInsights.Application("exampleApplication", new()
    {
        ResourceGroupName = exampleGroup.Name,
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/applicationinsights"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/resourcegroups"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleGroup, err := resourcegroups.NewGroup(ctx, "exampleGroup", &resourcegroups.GroupArgs{
			ResourceQuery: &resourcegroups.GroupResourceQueryArgs{
				Query: pulumi.String(fmt.Sprintf(`	{
		"ResourceTypeFilters": [
		  "AWS::EC2::Instance"
		],
		"TagFilters": [
		  {
			"Key": "Stage",
			"Values": [
			  "Test"
			]
		  }
		]
	  }
`)),
			},
		})
		if err != nil {
			return err
		}
		_, err = applicationinsights.NewApplication(ctx, "exampleApplication", &applicationinsights.ApplicationArgs{
			ResourceGroupName: exampleGroup.Name,
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
import com.pulumi.aws.resourcegroups.Group;
import com.pulumi.aws.resourcegroups.GroupArgs;
import com.pulumi.aws.resourcegroups.inputs.GroupResourceQueryArgs;
import com.pulumi.aws.applicationinsights.Application;
import com.pulumi.aws.applicationinsights.ApplicationArgs;
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
        var exampleGroup = new Group("exampleGroup", GroupArgs.builder()        
            .resourceQuery(GroupResourceQueryArgs.builder()
                .query("""
	{
		"ResourceTypeFilters": [
		  "AWS::EC2::Instance"
		],
		"TagFilters": [
		  {
			"Key": "Stage",
			"Values": [
			  "Test"
			]
		  }
		]
	  }
                """)
                .build())
            .build());

        var exampleApplication = new Application("exampleApplication", ApplicationArgs.builder()        
            .resourceGroupName(exampleGroup.name())
            .build());

    }
}
```
```yaml
resources:
  exampleApplication:
    type: aws:applicationinsights:Application
    properties:
      resourceGroupName: ${exampleGroup.name}
  exampleGroup:
    type: aws:resourcegroups:Group
    properties:
      resourceQuery:
        query: |
          	{
          		"ResourceTypeFilters": [
          		  "AWS::EC2::Instance"
          		],
          		"TagFilters": [
          		  {
          			"Key": "Stage",
          			"Values": [
          			  "Test"
          			]
          		  }
          		]
          	  }
```
{{% /example %}}
{{% /examples %}}

## Import

ApplicationInsights Applications can be imported using the `resource_group_name`, e.g.,

```sh
 $ pulumi import aws:applicationinsights/application:Application some some-application
```

 
Provides a CloudWatch Dashboard resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const main = new aws.cloudwatch.Dashboard("main", {
    dashboardBody: `{
  "widgets": [
    {
      "type": "metric",
      "x": 0,
      "y": 0,
      "width": 12,
      "height": 6,
      "properties": {
        "metrics": [
          [
            "AWS/EC2",
            "CPUUtilization",
            "InstanceId",
            "i-012345"
          ]
        ],
        "period": 300,
        "stat": "Average",
        "region": "us-east-1",
        "title": "EC2 Instance CPU"
      }
    },
    {
      "type": "text",
      "x": 0,
      "y": 7,
      "width": 3,
      "height": 3,
      "properties": {
        "markdown": "Hello world"
      }
    }
  ]
}
`,
    dashboardName: "my-dashboard",
});
```
```python
import pulumi
import pulumi_aws as aws

main = aws.cloudwatch.Dashboard("main",
    dashboard_body="""{
  "widgets": [
    {
      "type": "metric",
      "x": 0,
      "y": 0,
      "width": 12,
      "height": 6,
      "properties": {
        "metrics": [
          [
            "AWS/EC2",
            "CPUUtilization",
            "InstanceId",
            "i-012345"
          ]
        ],
        "period": 300,
        "stat": "Average",
        "region": "us-east-1",
        "title": "EC2 Instance CPU"
      }
    },
    {
      "type": "text",
      "x": 0,
      "y": 7,
      "width": 3,
      "height": 3,
      "properties": {
        "markdown": "Hello world"
      }
    }
  ]
}

""",
    dashboard_name="my-dashboard")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var main = new Aws.CloudWatch.Dashboard("main", new()
    {
        DashboardBody = @"{
  ""widgets"": [
    {
      ""type"": ""metric"",
      ""x"": 0,
      ""y"": 0,
      ""width"": 12,
      ""height"": 6,
      ""properties"": {
        ""metrics"": [
          [
            ""AWS/EC2"",
            ""CPUUtilization"",
            ""InstanceId"",
            ""i-012345""
          ]
        ],
        ""period"": 300,
        ""stat"": ""Average"",
        ""region"": ""us-east-1"",
        ""title"": ""EC2 Instance CPU""
      }
    },
    {
      ""type"": ""text"",
      ""x"": 0,
      ""y"": 7,
      ""width"": 3,
      ""height"": 3,
      ""properties"": {
        ""markdown"": ""Hello world""
      }
    }
  ]
}

",
        DashboardName = "my-dashboard",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudwatch"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := cloudwatch.NewDashboard(ctx, "main", &cloudwatch.DashboardArgs{
			DashboardBody: pulumi.String(fmt.Sprintf(`{
  "widgets": [
    {
      "type": "metric",
      "x": 0,
      "y": 0,
      "width": 12,
      "height": 6,
      "properties": {
        "metrics": [
          [
            "AWS/EC2",
            "CPUUtilization",
            "InstanceId",
            "i-012345"
          ]
        ],
        "period": 300,
        "stat": "Average",
        "region": "us-east-1",
        "title": "EC2 Instance CPU"
      }
    },
    {
      "type": "text",
      "x": 0,
      "y": 7,
      "width": 3,
      "height": 3,
      "properties": {
        "markdown": "Hello world"
      }
    }
  ]
}

`)),
			DashboardName: pulumi.String("my-dashboard"),
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
import com.pulumi.aws.cloudwatch.Dashboard;
import com.pulumi.aws.cloudwatch.DashboardArgs;
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
        var main = new Dashboard("main", DashboardArgs.builder()        
            .dashboardBody("""
{
  "widgets": [
    {
      "type": "metric",
      "x": 0,
      "y": 0,
      "width": 12,
      "height": 6,
      "properties": {
        "metrics": [
          [
            "AWS/EC2",
            "CPUUtilization",
            "InstanceId",
            "i-012345"
          ]
        ],
        "period": 300,
        "stat": "Average",
        "region": "us-east-1",
        "title": "EC2 Instance CPU"
      }
    },
    {
      "type": "text",
      "x": 0,
      "y": 7,
      "width": 3,
      "height": 3,
      "properties": {
        "markdown": "Hello world"
      }
    }
  ]
}

            """)
            .dashboardName("my-dashboard")
            .build());

    }
}
```
```yaml
resources:
  main:
    type: aws:cloudwatch:Dashboard
    properties:
      dashboardBody: |+
        {
          "widgets": [
            {
              "type": "metric",
              "x": 0,
              "y": 0,
              "width": 12,
              "height": 6,
              "properties": {
                "metrics": [
                  [
                    "AWS/EC2",
                    "CPUUtilization",
                    "InstanceId",
                    "i-012345"
                  ]
                ],
                "period": 300,
                "stat": "Average",
                "region": "us-east-1",
                "title": "EC2 Instance CPU"
              }
            },
            {
              "type": "text",
              "x": 0,
              "y": 7,
              "width": 3,
              "height": 3,
              "properties": {
                "markdown": "Hello world"
              }
            }
          ]
        }

      dashboardName: my-dashboard
```
{{% /example %}}
{{% /examples %}}

## Import

CloudWatch dashboards can be imported using the `dashboard_name`, e.g.,

```sh
 $ pulumi import aws:cloudwatch/dashboard:Dashboard sample dashboard_name
```

 
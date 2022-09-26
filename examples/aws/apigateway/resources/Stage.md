Manages an API Gateway Stage. A stage is a named reference to a deployment, which can be done via the `aws.apigateway.Deployment` resource. Stages can be optionally managed further with the `aws.apigateway.BasePathMapping` resource, `aws.apigateway.DomainName` resource, and `aws_api_method_settings` resource. For more information, see the [API Gateway Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-stages.html).

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as crypto from "crypto";

const exampleRestApi = new aws.apigateway.RestApi("exampleRestApi", {body: JSON.stringify({
    openapi: "3.0.1",
    info: {
        title: "example",
        version: "1.0",
    },
    paths: {
        "/path1": {
            get: {
                "x-amazon-apigateway-integration": {
                    httpMethod: "GET",
                    payloadFormatVersion: "1.0",
                    type: "HTTP_PROXY",
                    uri: "https://ip-ranges.amazonaws.com/ip-ranges.json",
                },
            },
        },
    },
})});
const exampleDeployment = new aws.apigateway.Deployment("exampleDeployment", {
    restApi: exampleRestApi.id,
    triggers: {
        redeployment: exampleRestApi.body.apply(body => JSON.stringify(body)).apply(toJSON => crypto.createHash('sha1').update(toJSON).digest('hex')),
    },
});
const exampleStage = new aws.apigateway.Stage("exampleStage", {
    deployment: exampleDeployment.id,
    restApi: exampleRestApi.id,
    stageName: "example",
});
const exampleMethodSettings = new aws.apigateway.MethodSettings("exampleMethodSettings", {
    restApi: exampleRestApi.id,
    stageName: exampleStage.stageName,
    methodPath: "*/*",
    settings: {
        metricsEnabled: true,
        loggingLevel: "INFO",
    },
});
```
```python
import pulumi
import hashlib
import json
import pulumi_aws as aws

example_rest_api = aws.apigateway.RestApi("exampleRestApi", body=json.dumps({
    "openapi": "3.0.1",
    "info": {
        "title": "example",
        "version": "1.0",
    },
    "paths": {
        "/path1": {
            "get": {
                "x-amazon-apigateway-integration": {
                    "httpMethod": "GET",
                    "payloadFormatVersion": "1.0",
                    "type": "HTTP_PROXY",
                    "uri": "https://ip-ranges.amazonaws.com/ip-ranges.json",
                },
            },
        },
    },
}))
example_deployment = aws.apigateway.Deployment("exampleDeployment",
    rest_api=example_rest_api.id,
    triggers={
        "redeployment": example_rest_api.body.apply(lambda body: json.dumps(body)).apply(lambda to_json: hashlib.sha1(to_json.encode()).hexdigest()),
    })
example_stage = aws.apigateway.Stage("exampleStage",
    deployment=example_deployment.id,
    rest_api=example_rest_api.id,
    stage_name="example")
example_method_settings = aws.apigateway.MethodSettings("exampleMethodSettings",
    rest_api=example_rest_api.id,
    stage_name=example_stage.stage_name,
    method_path="*/*",
    settings=aws.apigateway.MethodSettingsSettingsArgs(
        metrics_enabled=True,
        logging_level="INFO",
    ))
```
```csharp
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Pulumi;
using Aws = Pulumi.Aws;

	private static string ComputeSHA1(string input) {
		return BitConverter.ToString(
			SHA1.Create().ComputeHash(Encoding.UTF8.GetBytes(input))
		).Replace("-","").ToLowerInvariant());
	}

return await Deployment.RunAsync(() => 
{
    var exampleRestApi = new Aws.ApiGateway.RestApi("exampleRestApi", new()
    {
        Body = JsonSerializer.Serialize(new Dictionary<string, object?>
        {
            ["openapi"] = "3.0.1",
            ["info"] = new Dictionary<string, object?>
            {
                ["title"] = "example",
                ["version"] = "1.0",
            },
            ["paths"] = new Dictionary<string, object?>
            {
                ["/path1"] = new Dictionary<string, object?>
                {
                    ["get"] = new Dictionary<string, object?>
                    {
                        ["x-amazon-apigateway-integration"] = new Dictionary<string, object?>
                        {
                            ["httpMethod"] = "GET",
                            ["payloadFormatVersion"] = "1.0",
                            ["type"] = "HTTP_PROXY",
                            ["uri"] = "https://ip-ranges.amazonaws.com/ip-ranges.json",
                        },
                    },
                },
            },
        }),
    });

    var exampleDeployment = new Aws.ApiGateway.Deployment("exampleDeployment", new()
    {
        RestApi = exampleRestApi.Id,
        Triggers = 
        {
            { "redeployment", exampleRestApi.Body.Apply(body => JsonSerializer.Serialize(body)).Apply(toJSON => ComputeSHA1(toJSON)) },
        },
    });

    var exampleStage = new Aws.ApiGateway.Stage("exampleStage", new()
    {
        Deployment = exampleDeployment.Id,
        RestApi = exampleRestApi.Id,
        StageName = "example",
    });

    var exampleMethodSettings = new Aws.ApiGateway.MethodSettings("exampleMethodSettings", new()
    {
        RestApi = exampleRestApi.Id,
        StageName = exampleStage.StageName,
        MethodPath = "*/*",
        Settings = new Aws.ApiGateway.Inputs.MethodSettingsSettingsArgs
        {
            MetricsEnabled = true,
            LoggingLevel = "INFO",
        },
    });

});
```
```go
package main

import (
	"crypto/sha1"
	"encoding/json"
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/apigateway"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func sha1Hash(input string) string {
	hash := sha1.Sum([]byte(input))
	return hex.EncodeToString(hash[:])
}

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		tmpJSON0, err := json.Marshal(map[string]interface{}{
			"openapi": "3.0.1",
			"info": map[string]interface{}{
				"title":   "example",
				"version": "1.0",
			},
			"paths": map[string]interface{}{
				"/path1": map[string]interface{}{
					"get": map[string]interface{}{
						"x-amazon-apigateway-integration": map[string]interface{}{
							"httpMethod":           "GET",
							"payloadFormatVersion": "1.0",
							"type":                 "HTTP_PROXY",
							"uri":                  "https://ip-ranges.amazonaws.com/ip-ranges.json",
						},
					},
				},
			},
		})
		if err != nil {
			return err
		}
		json0 := string(tmpJSON0)
		exampleRestApi, err := apigateway.NewRestApi(ctx, "exampleRestApi", &apigateway.RestApiArgs{
			Body: pulumi.String(json0),
		})
		if err != nil {
			return err
		}
		exampleDeployment, err := apigateway.NewDeployment(ctx, "exampleDeployment", &apigateway.DeploymentArgs{
			RestApi: exampleRestApi.ID(),
			Triggers: pulumi.StringMap{
				"redeployment": exampleRestApi.Body.ApplyT(func(body string) (pulumi.String, error) {
					var _zero pulumi.String
					tmpJSON1, err := json.Marshal(body)
					if err != nil {
						return _zero, err
					}
					json1 := string(tmpJSON1)
					return json1, nil
				}).(pulumi.StringOutput).ApplyT(func(toJSON string) (pulumi.String, error) {
					return sha1Hash(toJSON), nil
				}).(pulumi.StringOutput),
			},
		})
		if err != nil {
			return err
		}
		exampleStage, err := apigateway.NewStage(ctx, "exampleStage", &apigateway.StageArgs{
			Deployment: exampleDeployment.ID(),
			RestApi:    exampleRestApi.ID(),
			StageName:  pulumi.String("example"),
		})
		if err != nil {
			return err
		}
		_, err = apigateway.NewMethodSettings(ctx, "exampleMethodSettings", &apigateway.MethodSettingsArgs{
			RestApi:    exampleRestApi.ID(),
			StageName:  exampleStage.StageName,
			MethodPath: pulumi.String("*/*"),
			Settings: &apigateway.MethodSettingsSettingsArgs{
				MetricsEnabled: pulumi.Bool(true),
				LoggingLevel:   pulumi.String("INFO"),
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
import com.pulumi.aws.apigateway.RestApi;
import com.pulumi.aws.apigateway.RestApiArgs;
import com.pulumi.aws.apigateway.Deployment;
import com.pulumi.aws.apigateway.DeploymentArgs;
import com.pulumi.aws.apigateway.Stage;
import com.pulumi.aws.apigateway.StageArgs;
import com.pulumi.aws.apigateway.MethodSettings;
import com.pulumi.aws.apigateway.MethodSettingsArgs;
import com.pulumi.aws.apigateway.inputs.MethodSettingsSettingsArgs;
import static com.pulumi.codegen.internal.Serialization.*;
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
        var exampleRestApi = new RestApi("exampleRestApi", RestApiArgs.builder()        
            .body(serializeJson(
                jsonObject(
                    jsonProperty("openapi", "3.0.1"),
                    jsonProperty("info", jsonObject(
                        jsonProperty("title", "example"),
                        jsonProperty("version", "1.0")
                    )),
                    jsonProperty("paths", jsonObject(
                        jsonProperty("/path1", jsonObject(
                            jsonProperty("get", jsonObject(
                                jsonProperty("x-amazon-apigateway-integration", jsonObject(
                                    jsonProperty("httpMethod", "GET"),
                                    jsonProperty("payloadFormatVersion", "1.0"),
                                    jsonProperty("type", "HTTP_PROXY"),
                                    jsonProperty("uri", "https://ip-ranges.amazonaws.com/ip-ranges.json")
                                ))
                            ))
                        ))
                    ))
                )))
            .build());

        var exampleDeployment = new Deployment("exampleDeployment", DeploymentArgs.builder()        
            .restApi(exampleRestApi.id())
            .triggers(Map.of("redeployment", exampleRestApi.body().applyValue(body -> serializeJson(
                body)).applyValue(toJSON -> computeSHA1(toJSON))))
            .build());

        var exampleStage = new Stage("exampleStage", StageArgs.builder()        
            .deployment(exampleDeployment.id())
            .restApi(exampleRestApi.id())
            .stageName("example")
            .build());

        var exampleMethodSettings = new MethodSettings("exampleMethodSettings", MethodSettingsArgs.builder()        
            .restApi(exampleRestApi.id())
            .stageName(exampleStage.stageName())
            .methodPath("*/*")
            .settings(MethodSettingsSettingsArgs.builder()
                .metricsEnabled(true)
                .loggingLevel("INFO")
                .build())
            .build());

    }
}
```
{{% /example %}}
{{% example %}}
### Managing the API Logging CloudWatch Log Group

API Gateway provides the ability to [enable CloudWatch API logging](https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-logging.html). To manage the CloudWatch Log Group when this feature is enabled, the `aws.cloudwatch.LogGroup` resource can be used where the name matches the API Gateway naming convention. If the CloudWatch Log Group previously exists, the `aws.cloudwatch.LogGroup` resource can be imported as a one time operation and recreation of the environment can occur without import.

> The below configuration uses [`dependsOn`](https://www.pulumi.com/docs/intro/concepts/programming-model/#dependson) to prevent ordering issues with API Gateway automatically creating the log group first and a variable for naming consistency. Other ordering and naming methodologies may be more appropriate for your environment.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const config = new pulumi.Config();
const stageName = config.get("stageName") || "example";
const exampleRestApi = new aws.apigateway.RestApi("exampleRestApi", {});
// ... other configuration ...
const exampleLogGroup = new aws.cloudwatch.LogGroup("exampleLogGroup", {retentionInDays: 7});
// ... potentially other configuration ...
const exampleStage = new aws.apigateway.Stage("exampleStage", {stageName: stageName}, {
    dependsOn: [exampleLogGroup],
});
// ... other configuration ...
```
```python
import pulumi
import pulumi_aws as aws

config = pulumi.Config()
stage_name = config.get("stageName")
if stage_name is None:
    stage_name = "example"
example_rest_api = aws.apigateway.RestApi("exampleRestApi")
# ... other configuration ...
example_log_group = aws.cloudwatch.LogGroup("exampleLogGroup", retention_in_days=7)
# ... potentially other configuration ...
example_stage = aws.apigateway.Stage("exampleStage", stage_name=stage_name,
opts=pulumi.ResourceOptions(depends_on=[example_log_group]))
# ... other configuration ...
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var config = new Config();
    var stageName = config.Get("stageName") ?? "example";
    var exampleRestApi = new Aws.ApiGateway.RestApi("exampleRestApi");

    // ... other configuration ...
    var exampleLogGroup = new Aws.CloudWatch.LogGroup("exampleLogGroup", new()
    {
        RetentionInDays = 7,
    });

    // ... potentially other configuration ...
    var exampleStage = new Aws.ApiGateway.Stage("exampleStage", new()
    {
        StageName = stageName,
    }, new CustomResourceOptions
    {
        DependsOn = new[]
        {
            exampleLogGroup,
        },
    });

    // ... other configuration ...
});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/apigateway"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cloudwatch"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi/config"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		cfg := config.New(ctx, "")
		stageName := "example"
		if param := cfg.Get("stageName"); param != "" {
			stageName = param
		}
		_, err := apigateway.NewRestApi(ctx, "exampleRestApi", nil)
		if err != nil {
			return err
		}
		exampleLogGroup, err := cloudwatch.NewLogGroup(ctx, "exampleLogGroup", &cloudwatch.LogGroupArgs{
			RetentionInDays: pulumi.Int(7),
		})
		if err != nil {
			return err
		}
		_, err = apigateway.NewStage(ctx, "exampleStage", &apigateway.StageArgs{
			StageName: pulumi.String(stageName),
		}, pulumi.DependsOn([]pulumi.Resource{
			exampleLogGroup,
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
import com.pulumi.aws.apigateway.RestApi;
import com.pulumi.aws.cloudwatch.LogGroup;
import com.pulumi.aws.cloudwatch.LogGroupArgs;
import com.pulumi.aws.apigateway.Stage;
import com.pulumi.aws.apigateway.StageArgs;
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
        final var config = ctx.config();
        final var stageName = config.get("stageName").orElse("example");
        var exampleRestApi = new RestApi("exampleRestApi");

        var exampleLogGroup = new LogGroup("exampleLogGroup", LogGroupArgs.builder()        
            .retentionInDays(7)
            .build());

        var exampleStage = new Stage("exampleStage", StageArgs.builder()        
            .stageName(stageName)
            .build(), CustomResourceOptions.builder()
                .dependsOn(exampleLogGroup)
                .build());

    }
}
```
```yaml
configuration:
  stageName:
    type: string
    default: example
resources:
  exampleRestApi:
    type: aws:apigateway:RestApi
  exampleStage:
    type: aws:apigateway:Stage
    properties:
      stageName: ${stageName}
    options:
      dependson:
        - ${exampleLogGroup}
  exampleLogGroup:
    type: aws:cloudwatch:LogGroup
    properties:
      retentionInDays: 7
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_api_gateway_stage` can be imported using `REST-API-ID/STAGE-NAME`, e.g.,

```sh
 $ pulumi import aws:apigateway/stage:Stage example 12345abcde/example
```

 
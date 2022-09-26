Manages API Gateway Stage Method Settings. For example, CloudWatch logging and metrics.

> **NOTE:** We recommend using this resource in conjunction with the `aws.apigateway.Stage` resource instead of a stage managed by the `aws.apigateway.Deployment` resource optional `stage_name` argument. Stages managed by the `aws.apigateway.Deployment` resource are recreated on redeployment and this resource will require a second apply to recreate the method settings.

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
const all = new aws.apigateway.MethodSettings("all", {
    restApi: exampleRestApi.id,
    stageName: exampleStage.stageName,
    methodPath: "*/*",
    settings: {
        metricsEnabled: true,
        loggingLevel: "ERROR",
    },
});
const pathSpecific = new aws.apigateway.MethodSettings("pathSpecific", {
    restApi: exampleRestApi.id,
    stageName: exampleStage.stageName,
    methodPath: "path1/GET",
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
all = aws.apigateway.MethodSettings("all",
    rest_api=example_rest_api.id,
    stage_name=example_stage.stage_name,
    method_path="*/*",
    settings=aws.apigateway.MethodSettingsSettingsArgs(
        metrics_enabled=True,
        logging_level="ERROR",
    ))
path_specific = aws.apigateway.MethodSettings("pathSpecific",
    rest_api=example_rest_api.id,
    stage_name=example_stage.stage_name,
    method_path="path1/GET",
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

    var all = new Aws.ApiGateway.MethodSettings("all", new()
    {
        RestApi = exampleRestApi.Id,
        StageName = exampleStage.StageName,
        MethodPath = "*/*",
        Settings = new Aws.ApiGateway.Inputs.MethodSettingsSettingsArgs
        {
            MetricsEnabled = true,
            LoggingLevel = "ERROR",
        },
    });

    var pathSpecific = new Aws.ApiGateway.MethodSettings("pathSpecific", new()
    {
        RestApi = exampleRestApi.Id,
        StageName = exampleStage.StageName,
        MethodPath = "path1/GET",
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
		_, err = apigateway.NewMethodSettings(ctx, "all", &apigateway.MethodSettingsArgs{
			RestApi:    exampleRestApi.ID(),
			StageName:  exampleStage.StageName,
			MethodPath: pulumi.String("*/*"),
			Settings: &apigateway.MethodSettingsSettingsArgs{
				MetricsEnabled: pulumi.Bool(true),
				LoggingLevel:   pulumi.String("ERROR"),
			},
		})
		if err != nil {
			return err
		}
		_, err = apigateway.NewMethodSettings(ctx, "pathSpecific", &apigateway.MethodSettingsArgs{
			RestApi:    exampleRestApi.ID(),
			StageName:  exampleStage.StageName,
			MethodPath: pulumi.String("path1/GET"),
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

        var all = new MethodSettings("all", MethodSettingsArgs.builder()        
            .restApi(exampleRestApi.id())
            .stageName(exampleStage.stageName())
            .methodPath("*/*")
            .settings(MethodSettingsSettingsArgs.builder()
                .metricsEnabled(true)
                .loggingLevel("ERROR")
                .build())
            .build());

        var pathSpecific = new MethodSettings("pathSpecific", MethodSettingsArgs.builder()        
            .restApi(exampleRestApi.id())
            .stageName(exampleStage.stageName())
            .methodPath("path1/GET")
            .settings(MethodSettingsSettingsArgs.builder()
                .metricsEnabled(true)
                .loggingLevel("INFO")
                .build())
            .build());

    }
}
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_api_gateway_method_settings` can be imported using `REST-API-ID/STAGE-NAME/METHOD-PATH`, e.g.,

```sh
 $ pulumi import aws:apigateway/methodSettings:MethodSettings example 12345abcde/example/test/GET
```

 
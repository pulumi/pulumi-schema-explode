Provides a SageMaker Domain resource.

{{% examples %}}
## Example Usage
{{% example %}}
### Basic usage

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleDomain = new aws.sagemaker.Domain("exampleDomain", {
    domainName: "example",
    authMode: "IAM",
    vpcId: aws_vpc.test.id,
    subnetIds: [aws_subnet.test.id],
    defaultUserSettings: {
        executionRole: aws_iam_role.test.arn,
    },
});
const examplePolicyDocument = aws.iam.getPolicyDocument({
    statements: [{
        actions: ["sts:AssumeRole"],
        principals: [{
            type: "Service",
            identifiers: ["sagemaker.amazonaws.com"],
        }],
    }],
});
const exampleRole = new aws.iam.Role("exampleRole", {
    path: "/",
    assumeRolePolicy: examplePolicyDocument.then(examplePolicyDocument => examplePolicyDocument.json),
});
```
```python
import pulumi
import pulumi_aws as aws

example_domain = aws.sagemaker.Domain("exampleDomain",
    domain_name="example",
    auth_mode="IAM",
    vpc_id=aws_vpc["test"]["id"],
    subnet_ids=[aws_subnet["test"]["id"]],
    default_user_settings=aws.sagemaker.DomainDefaultUserSettingsArgs(
        execution_role=aws_iam_role["test"]["arn"],
    ))
example_policy_document = aws.iam.get_policy_document(statements=[aws.iam.GetPolicyDocumentStatementArgs(
    actions=["sts:AssumeRole"],
    principals=[aws.iam.GetPolicyDocumentStatementPrincipalArgs(
        type="Service",
        identifiers=["sagemaker.amazonaws.com"],
    )],
)])
example_role = aws.iam.Role("exampleRole",
    path="/",
    assume_role_policy=example_policy_document.json)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleDomain = new Aws.Sagemaker.Domain("exampleDomain", new()
    {
        DomainName = "example",
        AuthMode = "IAM",
        VpcId = aws_vpc.Test.Id,
        SubnetIds = new[]
        {
            aws_subnet.Test.Id,
        },
        DefaultUserSettings = new Aws.Sagemaker.Inputs.DomainDefaultUserSettingsArgs
        {
            ExecutionRole = aws_iam_role.Test.Arn,
        },
    });

    var examplePolicyDocument = Aws.Iam.GetPolicyDocument.Invoke(new()
    {
        Statements = new[]
        {
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Actions = new[]
                {
                    "sts:AssumeRole",
                },
                Principals = new[]
                {
                    new Aws.Iam.Inputs.GetPolicyDocumentStatementPrincipalInputArgs
                    {
                        Type = "Service",
                        Identifiers = new[]
                        {
                            "sagemaker.amazonaws.com",
                        },
                    },
                },
            },
        },
    });

    var exampleRole = new Aws.Iam.Role("exampleRole", new()
    {
        Path = "/",
        AssumeRolePolicy = examplePolicyDocument.Apply(getPolicyDocumentResult => getPolicyDocumentResult.Json),
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sagemaker"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := sagemaker.NewDomain(ctx, "exampleDomain", &sagemaker.DomainArgs{
			DomainName: pulumi.String("example"),
			AuthMode:   pulumi.String("IAM"),
			VpcId:      pulumi.Any(aws_vpc.Test.Id),
			SubnetIds: pulumi.StringArray{
				pulumi.Any(aws_subnet.Test.Id),
			},
			DefaultUserSettings: &sagemaker.DomainDefaultUserSettingsArgs{
				ExecutionRole: pulumi.Any(aws_iam_role.Test.Arn),
			},
		})
		if err != nil {
			return err
		}
		examplePolicyDocument, err := iam.GetPolicyDocument(ctx, &iam.GetPolicyDocumentArgs{
			Statements: []iam.GetPolicyDocumentStatement{
				iam.GetPolicyDocumentStatement{
					Actions: []string{
						"sts:AssumeRole",
					},
					Principals: []iam.GetPolicyDocumentStatementPrincipal{
						iam.GetPolicyDocumentStatementPrincipal{
							Type: "Service",
							Identifiers: []string{
								"sagemaker.amazonaws.com",
							},
						},
					},
				},
			},
		}, nil)
		if err != nil {
			return err
		}
		_, err = iam.NewRole(ctx, "exampleRole", &iam.RoleArgs{
			Path:             pulumi.String("/"),
			AssumeRolePolicy: pulumi.String(examplePolicyDocument.Json),
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
import com.pulumi.aws.sagemaker.Domain;
import com.pulumi.aws.sagemaker.DomainArgs;
import com.pulumi.aws.sagemaker.inputs.DomainDefaultUserSettingsArgs;
import com.pulumi.aws.iam.IamFunctions;
import com.pulumi.aws.iam.inputs.GetPolicyDocumentArgs;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
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
        var exampleDomain = new Domain("exampleDomain", DomainArgs.builder()        
            .domainName("example")
            .authMode("IAM")
            .vpcId(aws_vpc.test().id())
            .subnetIds(aws_subnet.test().id())
            .defaultUserSettings(DomainDefaultUserSettingsArgs.builder()
                .executionRole(aws_iam_role.test().arn())
                .build())
            .build());

        final var examplePolicyDocument = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .statements(GetPolicyDocumentStatementArgs.builder()
                .actions("sts:AssumeRole")
                .principals(GetPolicyDocumentStatementPrincipalArgs.builder()
                    .type("Service")
                    .identifiers("sagemaker.amazonaws.com")
                    .build())
                .build())
            .build());

        var exampleRole = new Role("exampleRole", RoleArgs.builder()        
            .path("/")
            .assumeRolePolicy(examplePolicyDocument.applyValue(getPolicyDocumentResult -> getPolicyDocumentResult.json()))
            .build());

    }
}
```
```yaml
resources:
  exampleDomain:
    type: aws:sagemaker:Domain
    properties:
      domainName: example
      authMode: IAM
      vpcId: ${aws_vpc.test.id}
      subnetIds:
        - ${aws_subnet.test.id}
      defaultUserSettings:
        executionRole: ${aws_iam_role.test.arn}
  exampleRole:
    type: aws:iam:Role
    properties:
      path: /
      assumeRolePolicy: ${examplePolicyDocument.json}
variables:
  examplePolicyDocument:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        statements:
          - actions:
              - sts:AssumeRole
            principals:
              - type: Service
                identifiers:
                  - sagemaker.amazonaws.com
```
{{% /example %}}
{{% example %}}
### Using Custom Images

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const testImage = new aws.sagemaker.Image("testImage", {
    imageName: "example",
    roleArn: aws_iam_role.test.arn,
});
const testAppImageConfig = new aws.sagemaker.AppImageConfig("testAppImageConfig", {
    appImageConfigName: "example",
    kernelGatewayImageConfig: {
        kernelSpec: {
            name: "example",
        },
    },
});
const testImageVersion = new aws.sagemaker.ImageVersion("testImageVersion", {
    imageName: testImage.id,
    baseImage: "base-image",
});
const testDomain = new aws.sagemaker.Domain("testDomain", {
    domainName: "example",
    authMode: "IAM",
    vpcId: aws_vpc.test.id,
    subnetIds: [aws_subnet.test.id],
    defaultUserSettings: {
        executionRole: aws_iam_role.test.arn,
        kernelGatewayAppSettings: {
            customImages: [{
                appImageConfigName: testAppImageConfig.appImageConfigName,
                imageName: testImageVersion.imageName,
            }],
        },
    },
});
```
```python
import pulumi
import pulumi_aws as aws

test_image = aws.sagemaker.Image("testImage",
    image_name="example",
    role_arn=aws_iam_role["test"]["arn"])
test_app_image_config = aws.sagemaker.AppImageConfig("testAppImageConfig",
    app_image_config_name="example",
    kernel_gateway_image_config=aws.sagemaker.AppImageConfigKernelGatewayImageConfigArgs(
        kernel_spec=aws.sagemaker.AppImageConfigKernelGatewayImageConfigKernelSpecArgs(
            name="example",
        ),
    ))
test_image_version = aws.sagemaker.ImageVersion("testImageVersion",
    image_name=test_image.id,
    base_image="base-image")
test_domain = aws.sagemaker.Domain("testDomain",
    domain_name="example",
    auth_mode="IAM",
    vpc_id=aws_vpc["test"]["id"],
    subnet_ids=[aws_subnet["test"]["id"]],
    default_user_settings=aws.sagemaker.DomainDefaultUserSettingsArgs(
        execution_role=aws_iam_role["test"]["arn"],
        kernel_gateway_app_settings=aws.sagemaker.DomainDefaultUserSettingsKernelGatewayAppSettingsArgs(
            custom_images=[aws.sagemaker.DomainDefaultUserSettingsKernelGatewayAppSettingsCustomImageArgs(
                app_image_config_name=test_app_image_config.app_image_config_name,
                image_name=test_image_version.image_name,
            )],
        ),
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var testImage = new Aws.Sagemaker.Image("testImage", new()
    {
        ImageName = "example",
        RoleArn = aws_iam_role.Test.Arn,
    });

    var testAppImageConfig = new Aws.Sagemaker.AppImageConfig("testAppImageConfig", new()
    {
        AppImageConfigName = "example",
        KernelGatewayImageConfig = new Aws.Sagemaker.Inputs.AppImageConfigKernelGatewayImageConfigArgs
        {
            KernelSpec = new Aws.Sagemaker.Inputs.AppImageConfigKernelGatewayImageConfigKernelSpecArgs
            {
                Name = "example",
            },
        },
    });

    var testImageVersion = new Aws.Sagemaker.ImageVersion("testImageVersion", new()
    {
        ImageName = testImage.Id,
        BaseImage = "base-image",
    });

    var testDomain = new Aws.Sagemaker.Domain("testDomain", new()
    {
        DomainName = "example",
        AuthMode = "IAM",
        VpcId = aws_vpc.Test.Id,
        SubnetIds = new[]
        {
            aws_subnet.Test.Id,
        },
        DefaultUserSettings = new Aws.Sagemaker.Inputs.DomainDefaultUserSettingsArgs
        {
            ExecutionRole = aws_iam_role.Test.Arn,
            KernelGatewayAppSettings = new Aws.Sagemaker.Inputs.DomainDefaultUserSettingsKernelGatewayAppSettingsArgs
            {
                CustomImages = new[]
                {
                    new Aws.Sagemaker.Inputs.DomainDefaultUserSettingsKernelGatewayAppSettingsCustomImageArgs
                    {
                        AppImageConfigName = testAppImageConfig.AppImageConfigName,
                        ImageName = testImageVersion.ImageName,
                    },
                },
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sagemaker"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		testImage, err := sagemaker.NewImage(ctx, "testImage", &sagemaker.ImageArgs{
			ImageName: pulumi.String("example"),
			RoleArn:   pulumi.Any(aws_iam_role.Test.Arn),
		})
		if err != nil {
			return err
		}
		testAppImageConfig, err := sagemaker.NewAppImageConfig(ctx, "testAppImageConfig", &sagemaker.AppImageConfigArgs{
			AppImageConfigName: pulumi.String("example"),
			KernelGatewayImageConfig: &sagemaker.AppImageConfigKernelGatewayImageConfigArgs{
				KernelSpec: &sagemaker.AppImageConfigKernelGatewayImageConfigKernelSpecArgs{
					Name: pulumi.String("example"),
				},
			},
		})
		if err != nil {
			return err
		}
		testImageVersion, err := sagemaker.NewImageVersion(ctx, "testImageVersion", &sagemaker.ImageVersionArgs{
			ImageName: testImage.ID(),
			BaseImage: pulumi.String("base-image"),
		})
		if err != nil {
			return err
		}
		_, err = sagemaker.NewDomain(ctx, "testDomain", &sagemaker.DomainArgs{
			DomainName: pulumi.String("example"),
			AuthMode:   pulumi.String("IAM"),
			VpcId:      pulumi.Any(aws_vpc.Test.Id),
			SubnetIds: pulumi.StringArray{
				pulumi.Any(aws_subnet.Test.Id),
			},
			DefaultUserSettings: &sagemaker.DomainDefaultUserSettingsArgs{
				ExecutionRole: pulumi.Any(aws_iam_role.Test.Arn),
				KernelGatewayAppSettings: &sagemaker.DomainDefaultUserSettingsKernelGatewayAppSettingsArgs{
					CustomImages: sagemaker.DomainDefaultUserSettingsKernelGatewayAppSettingsCustomImageArray{
						&sagemaker.DomainDefaultUserSettingsKernelGatewayAppSettingsCustomImageArgs{
							AppImageConfigName: testAppImageConfig.AppImageConfigName,
							ImageName:          testImageVersion.ImageName,
						},
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
import com.pulumi.aws.sagemaker.Image;
import com.pulumi.aws.sagemaker.ImageArgs;
import com.pulumi.aws.sagemaker.AppImageConfig;
import com.pulumi.aws.sagemaker.AppImageConfigArgs;
import com.pulumi.aws.sagemaker.inputs.AppImageConfigKernelGatewayImageConfigArgs;
import com.pulumi.aws.sagemaker.inputs.AppImageConfigKernelGatewayImageConfigKernelSpecArgs;
import com.pulumi.aws.sagemaker.ImageVersion;
import com.pulumi.aws.sagemaker.ImageVersionArgs;
import com.pulumi.aws.sagemaker.Domain;
import com.pulumi.aws.sagemaker.DomainArgs;
import com.pulumi.aws.sagemaker.inputs.DomainDefaultUserSettingsArgs;
import com.pulumi.aws.sagemaker.inputs.DomainDefaultUserSettingsKernelGatewayAppSettingsArgs;
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
        var testImage = new Image("testImage", ImageArgs.builder()        
            .imageName("example")
            .roleArn(aws_iam_role.test().arn())
            .build());

        var testAppImageConfig = new AppImageConfig("testAppImageConfig", AppImageConfigArgs.builder()        
            .appImageConfigName("example")
            .kernelGatewayImageConfig(AppImageConfigKernelGatewayImageConfigArgs.builder()
                .kernelSpec(AppImageConfigKernelGatewayImageConfigKernelSpecArgs.builder()
                    .name("example")
                    .build())
                .build())
            .build());

        var testImageVersion = new ImageVersion("testImageVersion", ImageVersionArgs.builder()        
            .imageName(testImage.id())
            .baseImage("base-image")
            .build());

        var testDomain = new Domain("testDomain", DomainArgs.builder()        
            .domainName("example")
            .authMode("IAM")
            .vpcId(aws_vpc.test().id())
            .subnetIds(aws_subnet.test().id())
            .defaultUserSettings(DomainDefaultUserSettingsArgs.builder()
                .executionRole(aws_iam_role.test().arn())
                .kernelGatewayAppSettings(DomainDefaultUserSettingsKernelGatewayAppSettingsArgs.builder()
                    .customImages(DomainDefaultUserSettingsKernelGatewayAppSettingsCustomImageArgs.builder()
                        .appImageConfigName(testAppImageConfig.appImageConfigName())
                        .imageName(testImageVersion.imageName())
                        .build())
                    .build())
                .build())
            .build());

    }
}
```
```yaml
resources:
  testImage:
    type: aws:sagemaker:Image
    properties:
      imageName: example
      roleArn: ${aws_iam_role.test.arn}
  testAppImageConfig:
    type: aws:sagemaker:AppImageConfig
    properties:
      appImageConfigName: example
      kernelGatewayImageConfig:
        kernelSpec:
          name: example
  testImageVersion:
    type: aws:sagemaker:ImageVersion
    properties:
      imageName: ${testImage.id}
      baseImage: base-image
  testDomain:
    type: aws:sagemaker:Domain
    properties:
      domainName: example
      authMode: IAM
      vpcId: ${aws_vpc.test.id}
      subnetIds:
        - ${aws_subnet.test.id}
      defaultUserSettings:
        executionRole: ${aws_iam_role.test.arn}
        kernelGatewayAppSettings:
          customImages:
            - appImageConfigName: ${testAppImageConfig.appImageConfigName}
              imageName: ${testImageVersion.imageName}
```
{{% /example %}}
{{% /examples %}}

## Import

SageMaker Code Domains can be imported using the `id`, e.g.,

```sh
 $ pulumi import aws:sagemaker/domain:Domain test_domain d-8jgsjtilstu8
```

 
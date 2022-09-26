Provides a Batch Job Definition resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const test = new aws.batch.JobDefinition("test", {
    containerProperties: `{
	"command": ["ls", "-la"],
	"image": "busybox",
	"memory": 1024,
	"vcpus": 1,
	"volumes": [
      {
        "host": {
          "sourcePath": "/tmp"
        },
        "name": "tmp"
      }
    ],
	"environment": [
		{"name": "VARNAME", "value": "VARVAL"}
	],
	"mountPoints": [
		{
          "sourceVolume": "tmp",
          "containerPath": "/tmp",
          "readOnly": false
        }
	],
    "ulimits": [
      {
        "hardLimit": 1024,
        "name": "nofile",
        "softLimit": 1024
      }
    ]
}
`,
    type: "container",
});
```
```python
import pulumi
import pulumi_aws as aws

test = aws.batch.JobDefinition("test",
    container_properties="""{
	"command": ["ls", "-la"],
	"image": "busybox",
	"memory": 1024,
	"vcpus": 1,
	"volumes": [
      {
        "host": {
          "sourcePath": "/tmp"
        },
        "name": "tmp"
      }
    ],
	"environment": [
		{"name": "VARNAME", "value": "VARVAL"}
	],
	"mountPoints": [
		{
          "sourceVolume": "tmp",
          "containerPath": "/tmp",
          "readOnly": false
        }
	],
    "ulimits": [
      {
        "hardLimit": 1024,
        "name": "nofile",
        "softLimit": 1024
      }
    ]
}

""",
    type="container")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var test = new Aws.Batch.JobDefinition("test", new()
    {
        ContainerProperties = @"{
	""command"": [""ls"", ""-la""],
	""image"": ""busybox"",
	""memory"": 1024,
	""vcpus"": 1,
	""volumes"": [
      {
        ""host"": {
          ""sourcePath"": ""/tmp""
        },
        ""name"": ""tmp""
      }
    ],
	""environment"": [
		{""name"": ""VARNAME"", ""value"": ""VARVAL""}
	],
	""mountPoints"": [
		{
          ""sourceVolume"": ""tmp"",
          ""containerPath"": ""/tmp"",
          ""readOnly"": false
        }
	],
    ""ulimits"": [
      {
        ""hardLimit"": 1024,
        ""name"": ""nofile"",
        ""softLimit"": 1024
      }
    ]
}

",
        Type = "container",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/batch"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := batch.NewJobDefinition(ctx, "test", &batch.JobDefinitionArgs{
			ContainerProperties: pulumi.String(fmt.Sprintf(`{
	"command": ["ls", "-la"],
	"image": "busybox",
	"memory": 1024,
	"vcpus": 1,
	"volumes": [
      {
        "host": {
          "sourcePath": "/tmp"
        },
        "name": "tmp"
      }
    ],
	"environment": [
		{"name": "VARNAME", "value": "VARVAL"}
	],
	"mountPoints": [
		{
          "sourceVolume": "tmp",
          "containerPath": "/tmp",
          "readOnly": false
        }
	],
    "ulimits": [
      {
        "hardLimit": 1024,
        "name": "nofile",
        "softLimit": 1024
      }
    ]
}

`)),
			Type: pulumi.String("container"),
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
import com.pulumi.aws.batch.JobDefinition;
import com.pulumi.aws.batch.JobDefinitionArgs;
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
        var test = new JobDefinition("test", JobDefinitionArgs.builder()        
            .containerProperties("""
{
	"command": ["ls", "-la"],
	"image": "busybox",
	"memory": 1024,
	"vcpus": 1,
	"volumes": [
      {
        "host": {
          "sourcePath": "/tmp"
        },
        "name": "tmp"
      }
    ],
	"environment": [
		{"name": "VARNAME", "value": "VARVAL"}
	],
	"mountPoints": [
		{
          "sourceVolume": "tmp",
          "containerPath": "/tmp",
          "readOnly": false
        }
	],
    "ulimits": [
      {
        "hardLimit": 1024,
        "name": "nofile",
        "softLimit": 1024
      }
    ]
}

            """)
            .type("container")
            .build());

    }
}
```
```yaml
resources:
  test:
    type: aws:batch:JobDefinition
    properties:
      containerProperties: |+
        {
        	"command": ["ls", "-la"],
        	"image": "busybox",
        	"memory": 1024,
        	"vcpus": 1,
        	"volumes": [
              {
                "host": {
                  "sourcePath": "/tmp"
                },
                "name": "tmp"
              }
            ],
        	"environment": [
        		{"name": "VARNAME", "value": "VARVAL"}
        	],
        	"mountPoints": [
        		{
                  "sourceVolume": "tmp",
                  "containerPath": "/tmp",
                  "readOnly": false
                }
        	],
            "ulimits": [
              {
                "hardLimit": 1024,
                "name": "nofile",
                "softLimit": 1024
              }
            ]
        }

      type: container
```
{{% /example %}}
{{% example %}}
### Fargate Platform Capability

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const assumeRolePolicy = aws.iam.getPolicyDocument({
    statements: [{
        actions: ["sts:AssumeRole"],
        principals: [{
            type: "Service",
            identifiers: ["ecs-tasks.amazonaws.com"],
        }],
    }],
});
const ecsTaskExecutionRole = new aws.iam.Role("ecsTaskExecutionRole", {assumeRolePolicy: assumeRolePolicy.then(assumeRolePolicy => assumeRolePolicy.json)});
const ecsTaskExecutionRolePolicy = new aws.iam.RolePolicyAttachment("ecsTaskExecutionRolePolicy", {
    role: ecsTaskExecutionRole.name,
    policyArn: "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy",
});
const test = new aws.batch.JobDefinition("test", {
    type: "container",
    platformCapabilities: ["FARGATE"],
    containerProperties: pulumi.interpolate`{
  "command": ["echo", "test"],
  "image": "busybox",
  "fargatePlatformConfiguration": {
    "platformVersion": "LATEST"
  },
  "resourceRequirements": [
    {"type": "VCPU", "value": "0.25"},
    {"type": "MEMORY", "value": "512"}
  ],
  "executionRoleArn": "${ecsTaskExecutionRole.arn}"
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

assume_role_policy = aws.iam.get_policy_document(statements=[aws.iam.GetPolicyDocumentStatementArgs(
    actions=["sts:AssumeRole"],
    principals=[aws.iam.GetPolicyDocumentStatementPrincipalArgs(
        type="Service",
        identifiers=["ecs-tasks.amazonaws.com"],
    )],
)])
ecs_task_execution_role = aws.iam.Role("ecsTaskExecutionRole", assume_role_policy=assume_role_policy.json)
ecs_task_execution_role_policy = aws.iam.RolePolicyAttachment("ecsTaskExecutionRolePolicy",
    role=ecs_task_execution_role.name,
    policy_arn="arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy")
test = aws.batch.JobDefinition("test",
    type="container",
    platform_capabilities=["FARGATE"],
    container_properties=ecs_task_execution_role.arn.apply(lambda arn: f"""{{
  "command": ["echo", "test"],
  "image": "busybox",
  "fargatePlatformConfiguration": {{
    "platformVersion": "LATEST"
  }},
  "resourceRequirements": [
    {{"type": "VCPU", "value": "0.25"}},
    {{"type": "MEMORY", "value": "512"}}
  ],
  "executionRoleArn": "{arn}"
}}
"""))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var assumeRolePolicy = Aws.Iam.GetPolicyDocument.Invoke(new()
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
                            "ecs-tasks.amazonaws.com",
                        },
                    },
                },
            },
        },
    });

    var ecsTaskExecutionRole = new Aws.Iam.Role("ecsTaskExecutionRole", new()
    {
        AssumeRolePolicy = assumeRolePolicy.Apply(getPolicyDocumentResult => getPolicyDocumentResult.Json),
    });

    var ecsTaskExecutionRolePolicy = new Aws.Iam.RolePolicyAttachment("ecsTaskExecutionRolePolicy", new()
    {
        Role = ecsTaskExecutionRole.Name,
        PolicyArn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy",
    });

    var test = new Aws.Batch.JobDefinition("test", new()
    {
        Type = "container",
        PlatformCapabilities = new[]
        {
            "FARGATE",
        },
        ContainerProperties = ecsTaskExecutionRole.Arn.Apply(arn => @$"{{
  ""command"": [""echo"", ""test""],
  ""image"": ""busybox"",
  ""fargatePlatformConfiguration"": {{
    ""platformVersion"": ""LATEST""
  }},
  ""resourceRequirements"": [
    {{""type"": ""VCPU"", ""value"": ""0.25""}},
    {{""type"": ""MEMORY"", ""value"": ""512""}}
  ],
  ""executionRoleArn"": ""{arn}""
}}
"),
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/batch"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		assumeRolePolicy, err := iam.GetPolicyDocument(ctx, &iam.GetPolicyDocumentArgs{
			Statements: []iam.GetPolicyDocumentStatement{
				iam.GetPolicyDocumentStatement{
					Actions: []string{
						"sts:AssumeRole",
					},
					Principals: []iam.GetPolicyDocumentStatementPrincipal{
						iam.GetPolicyDocumentStatementPrincipal{
							Type: "Service",
							Identifiers: []string{
								"ecs-tasks.amazonaws.com",
							},
						},
					},
				},
			},
		}, nil)
		if err != nil {
			return err
		}
		ecsTaskExecutionRole, err := iam.NewRole(ctx, "ecsTaskExecutionRole", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.String(assumeRolePolicy.Json),
		})
		if err != nil {
			return err
		}
		_, err = iam.NewRolePolicyAttachment(ctx, "ecsTaskExecutionRolePolicy", &iam.RolePolicyAttachmentArgs{
			Role:      ecsTaskExecutionRole.Name,
			PolicyArn: pulumi.String("arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"),
		})
		if err != nil {
			return err
		}
		_, err = batch.NewJobDefinition(ctx, "test", &batch.JobDefinitionArgs{
			Type: pulumi.String("container"),
			PlatformCapabilities: pulumi.StringArray{
				pulumi.String("FARGATE"),
			},
			ContainerProperties: ecsTaskExecutionRole.Arn.ApplyT(func(arn string) (string, error) {
				return fmt.Sprintf(`{
  "command": ["echo", "test"],
  "image": "busybox",
  "fargatePlatformConfiguration": {
    "platformVersion": "LATEST"
  },
  "resourceRequirements": [
    {"type": "VCPU", "value": "0.25"},
    {"type": "MEMORY", "value": "512"}
  ],
  "executionRoleArn": "%v"
}
`, arn), nil
			}).(pulumi.StringOutput),
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
import com.pulumi.aws.iam.IamFunctions;
import com.pulumi.aws.iam.inputs.GetPolicyDocumentArgs;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.iam.RolePolicyAttachment;
import com.pulumi.aws.iam.RolePolicyAttachmentArgs;
import com.pulumi.aws.batch.JobDefinition;
import com.pulumi.aws.batch.JobDefinitionArgs;
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
        final var assumeRolePolicy = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .statements(GetPolicyDocumentStatementArgs.builder()
                .actions("sts:AssumeRole")
                .principals(GetPolicyDocumentStatementPrincipalArgs.builder()
                    .type("Service")
                    .identifiers("ecs-tasks.amazonaws.com")
                    .build())
                .build())
            .build());

        var ecsTaskExecutionRole = new Role("ecsTaskExecutionRole", RoleArgs.builder()        
            .assumeRolePolicy(assumeRolePolicy.applyValue(getPolicyDocumentResult -> getPolicyDocumentResult.json()))
            .build());

        var ecsTaskExecutionRolePolicy = new RolePolicyAttachment("ecsTaskExecutionRolePolicy", RolePolicyAttachmentArgs.builder()        
            .role(ecsTaskExecutionRole.name())
            .policyArn("arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy")
            .build());

        var test = new JobDefinition("test", JobDefinitionArgs.builder()        
            .type("container")
            .platformCapabilities("FARGATE")
            .containerProperties(ecsTaskExecutionRole.arn().applyValue(arn -> """
{
  "command": ["echo", "test"],
  "image": "busybox",
  "fargatePlatformConfiguration": {
    "platformVersion": "LATEST"
  },
  "resourceRequirements": [
    {"type": "VCPU", "value": "0.25"},
    {"type": "MEMORY", "value": "512"}
  ],
  "executionRoleArn": "%s"
}
", arn)))
            .build());

    }
}
```
```yaml
resources:
  ecsTaskExecutionRole:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: ${assumeRolePolicy.json}
  ecsTaskExecutionRolePolicy:
    type: aws:iam:RolePolicyAttachment
    properties:
      role: ${ecsTaskExecutionRole.name}
      policyArn: arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
  test:
    type: aws:batch:JobDefinition
    properties:
      type: container
      platformCapabilities:
        - FARGATE
      containerProperties: |
        {
          "command": ["echo", "test"],
          "image": "busybox",
          "fargatePlatformConfiguration": {
            "platformVersion": "LATEST"
          },
          "resourceRequirements": [
            {"type": "VCPU", "value": "0.25"},
            {"type": "MEMORY", "value": "512"}
          ],
          "executionRoleArn": "${ecsTaskExecutionRole.arn}"
        }
variables:
  assumeRolePolicy:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        statements:
          - actions:
              - sts:AssumeRole
            principals:
              - type: Service
                identifiers:
                  - ecs-tasks.amazonaws.com
```
{{% /example %}}
{{% /examples %}}

## Import

Batch Job Definition can be imported using the `arn`, e.g.,

```sh
 $ pulumi import aws:batch/jobDefinition:JobDefinition test arn:aws:batch:us-east-1:123456789012:job-definition/sample
```

 
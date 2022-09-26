{{% examples %}}
## Example Usage
{{% example %}}
### Grant Permissions For A Lake Formation S3 Resource

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.lakeformation.Permissions("example", {
    principal: aws_iam_role.workflow_role.arn,
    permissions: ["ALL"],
    dataLocation: {
        arn: aws_lakeformation_resource.example.arn,
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.lakeformation.Permissions("example",
    principal=aws_iam_role["workflow_role"]["arn"],
    permissions=["ALL"],
    data_location=aws.lakeformation.PermissionsDataLocationArgs(
        arn=aws_lakeformation_resource["example"]["arn"],
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.LakeFormation.Permissions("example", new()
    {
        Principal = aws_iam_role.Workflow_role.Arn,
        PermissionDetails = new[]
        {
            "ALL",
        },
        DataLocation = new Aws.LakeFormation.Inputs.PermissionsDataLocationArgs
        {
            Arn = aws_lakeformation_resource.Example.Arn,
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lakeformation"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := lakeformation.NewPermissions(ctx, "example", &lakeformation.PermissionsArgs{
			Principal: pulumi.Any(aws_iam_role.Workflow_role.Arn),
			Permissions: pulumi.StringArray{
				pulumi.String("ALL"),
			},
			DataLocation: &lakeformation.PermissionsDataLocationArgs{
				Arn: pulumi.Any(aws_lakeformation_resource.Example.Arn),
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
import com.pulumi.aws.lakeformation.Permissions;
import com.pulumi.aws.lakeformation.PermissionsArgs;
import com.pulumi.aws.lakeformation.inputs.PermissionsDataLocationArgs;
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
        var example = new Permissions("example", PermissionsArgs.builder()        
            .principal(aws_iam_role.workflow_role().arn())
            .permissions("ALL")
            .dataLocation(PermissionsDataLocationArgs.builder()
                .arn(aws_lakeformation_resource.example().arn())
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:lakeformation:Permissions
    properties:
      principal: ${aws_iam_role.workflow_role.arn}
      permissions:
        - ALL
      dataLocation:
        arn: ${aws_lakeformation_resource.example.arn}
```
{{% /example %}}
{{% example %}}
### Grant Permissions For A Glue Catalog Database

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.lakeformation.Permissions("example", {
    principal: aws_iam_role.workflow_role.arn,
    permissions: [
        "CREATE_TABLE",
        "ALTER",
        "DROP",
    ],
    database: {
        name: aws_glue_catalog_database.example.name,
        catalogId: "110376042874",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.lakeformation.Permissions("example",
    principal=aws_iam_role["workflow_role"]["arn"],
    permissions=[
        "CREATE_TABLE",
        "ALTER",
        "DROP",
    ],
    database=aws.lakeformation.PermissionsDatabaseArgs(
        name=aws_glue_catalog_database["example"]["name"],
        catalog_id="110376042874",
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.LakeFormation.Permissions("example", new()
    {
        Principal = aws_iam_role.Workflow_role.Arn,
        PermissionDetails = new[]
        {
            "CREATE_TABLE",
            "ALTER",
            "DROP",
        },
        Database = new Aws.LakeFormation.Inputs.PermissionsDatabaseArgs
        {
            Name = aws_glue_catalog_database.Example.Name,
            CatalogId = "110376042874",
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lakeformation"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := lakeformation.NewPermissions(ctx, "example", &lakeformation.PermissionsArgs{
			Principal: pulumi.Any(aws_iam_role.Workflow_role.Arn),
			Permissions: pulumi.StringArray{
				pulumi.String("CREATE_TABLE"),
				pulumi.String("ALTER"),
				pulumi.String("DROP"),
			},
			Database: &lakeformation.PermissionsDatabaseArgs{
				Name:      pulumi.Any(aws_glue_catalog_database.Example.Name),
				CatalogId: pulumi.String("110376042874"),
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
import com.pulumi.aws.lakeformation.Permissions;
import com.pulumi.aws.lakeformation.PermissionsArgs;
import com.pulumi.aws.lakeformation.inputs.PermissionsDatabaseArgs;
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
        var example = new Permissions("example", PermissionsArgs.builder()        
            .principal(aws_iam_role.workflow_role().arn())
            .permissions(            
                "CREATE_TABLE",
                "ALTER",
                "DROP")
            .database(PermissionsDatabaseArgs.builder()
                .name(aws_glue_catalog_database.example().name())
                .catalogId("110376042874")
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:lakeformation:Permissions
    properties:
      principal: ${aws_iam_role.workflow_role.arn}
      permissions:
        - CREATE_TABLE
        - ALTER
        - DROP
      database:
        name: ${aws_glue_catalog_database.example.name}
        catalogId: 110376042874
```
{{% /example %}}
{{% example %}}
### Grant Permissions Using Tag-Based Access Control

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const test = new aws.lakeformation.Permissions("test", {
    principal: aws_iam_role.sales_role.arn,
    permissions: [
        "CREATE_TABLE",
        "ALTER",
        "DROP",
    ],
    lfTagPolicy: {
        resourceType: "DATABASE",
        expressions: [
            {
                key: "Team",
                values: ["Sales"],
            },
            {
                key: "Environment",
                values: [
                    "Dev",
                    "Production",
                ],
            },
        ],
    },
});
```
```python
import pulumi
import pulumi_aws as aws

test = aws.lakeformation.Permissions("test",
    principal=aws_iam_role["sales_role"]["arn"],
    permissions=[
        "CREATE_TABLE",
        "ALTER",
        "DROP",
    ],
    lf_tag_policy=aws.lakeformation.PermissionsLfTagPolicyArgs(
        resource_type="DATABASE",
        expressions=[
            aws.lakeformation.PermissionsLfTagPolicyExpressionArgs(
                key="Team",
                values=["Sales"],
            ),
            aws.lakeformation.PermissionsLfTagPolicyExpressionArgs(
                key="Environment",
                values=[
                    "Dev",
                    "Production",
                ],
            ),
        ],
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var test = new Aws.LakeFormation.Permissions("test", new()
    {
        Principal = aws_iam_role.Sales_role.Arn,
        PermissionDetails = new[]
        {
            "CREATE_TABLE",
            "ALTER",
            "DROP",
        },
        LfTagPolicy = new Aws.LakeFormation.Inputs.PermissionsLfTagPolicyArgs
        {
            ResourceType = "DATABASE",
            Expressions = new[]
            {
                new Aws.LakeFormation.Inputs.PermissionsLfTagPolicyExpressionArgs
                {
                    Key = "Team",
                    Values = new[]
                    {
                        "Sales",
                    },
                },
                new Aws.LakeFormation.Inputs.PermissionsLfTagPolicyExpressionArgs
                {
                    Key = "Environment",
                    Values = new[]
                    {
                        "Dev",
                        "Production",
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
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lakeformation"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := lakeformation.NewPermissions(ctx, "test", &lakeformation.PermissionsArgs{
			Principal: pulumi.Any(aws_iam_role.Sales_role.Arn),
			Permissions: pulumi.StringArray{
				pulumi.String("CREATE_TABLE"),
				pulumi.String("ALTER"),
				pulumi.String("DROP"),
			},
			LfTagPolicy: &lakeformation.PermissionsLfTagPolicyArgs{
				ResourceType: pulumi.String("DATABASE"),
				Expressions: lakeformation.PermissionsLfTagPolicyExpressionArray{
					&lakeformation.PermissionsLfTagPolicyExpressionArgs{
						Key: pulumi.String("Team"),
						Values: pulumi.StringArray{
							pulumi.String("Sales"),
						},
					},
					&lakeformation.PermissionsLfTagPolicyExpressionArgs{
						Key: pulumi.String("Environment"),
						Values: pulumi.StringArray{
							pulumi.String("Dev"),
							pulumi.String("Production"),
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
import com.pulumi.aws.lakeformation.Permissions;
import com.pulumi.aws.lakeformation.PermissionsArgs;
import com.pulumi.aws.lakeformation.inputs.PermissionsLfTagPolicyArgs;
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
        var test = new Permissions("test", PermissionsArgs.builder()        
            .principal(aws_iam_role.sales_role().arn())
            .permissions(            
                "CREATE_TABLE",
                "ALTER",
                "DROP")
            .lfTagPolicy(PermissionsLfTagPolicyArgs.builder()
                .resourceType("DATABASE")
                .expressions(                
                    PermissionsLfTagPolicyExpressionArgs.builder()
                        .key("Team")
                        .values("Sales")
                        .build(),
                    PermissionsLfTagPolicyExpressionArgs.builder()
                        .key("Environment")
                        .values(                        
                            "Dev",
                            "Production")
                        .build())
                .build())
            .build());

    }
}
```
```yaml
resources:
  test:
    type: aws:lakeformation:Permissions
    properties:
      principal: ${aws_iam_role.sales_role.arn}
      permissions:
        - CREATE_TABLE
        - ALTER
        - DROP
      lfTagPolicy:
        resourceType: DATABASE
        expressions:
          - key: Team
            values:
              - Sales
          - key: Environment
            values:
              - Dev
              - Production
```
{{% /example %}}
{{% /examples %}}
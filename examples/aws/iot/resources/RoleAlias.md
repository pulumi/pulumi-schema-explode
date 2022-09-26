Provides an IoT role alias.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const role = new aws.iam.Role("role", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {"Service": "credentials.iot.amazonaws.com",
      "Action": "sts:AssumeRole"
    }
  ]
}
`});
const alias = new aws.iot.RoleAlias("alias", {
    alias: "Thermostat-dynamodb-access-role-alias",
    roleArn: role.arn,
});
```
```python
import pulumi
import pulumi_aws as aws

role = aws.iam.Role("role", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {"Service": "credentials.iot.amazonaws.com",
      "Action": "sts:AssumeRole"
    }
  ]
}
""")
alias = aws.iot.RoleAlias("alias",
    alias="Thermostat-dynamodb-access-role-alias",
    role_arn=role.arn)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var role = new Aws.Iam.Role("role", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Effect"": ""Allow"",
      ""Principal"": {""Service"": ""credentials.iot.amazonaws.com"",
      ""Action"": ""sts:AssumeRole""
    }
  ]
}
",
    });

    var @alias = new Aws.Iot.RoleAlias("alias", new()
    {
        Alias = "Thermostat-dynamodb-access-role-alias",
        RoleArn = role.Arn,
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iot"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		role, err := iam.NewRole(ctx, "role", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {"Service": "credentials.iot.amazonaws.com",
      "Action": "sts:AssumeRole"
    }
  ]
}
`)),
		})
		if err != nil {
			return err
		}
		_, err = iot.NewRoleAlias(ctx, "alias", &iot.RoleAliasArgs{
			Alias:   pulumi.String("Thermostat-dynamodb-access-role-alias"),
			RoleArn: role.Arn,
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
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.iot.RoleAlias;
import com.pulumi.aws.iot.RoleAliasArgs;
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
        var role = new Role("role", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {"Service": "credentials.iot.amazonaws.com",
      "Action": "sts:AssumeRole"
    }
  ]
}
            """)
            .build());

        var alias = new RoleAlias("alias", RoleAliasArgs.builder()        
            .alias("Thermostat-dynamodb-access-role-alias")
            .roleArn(role.arn())
            .build());

    }
}
```
```yaml
resources:
  role:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {"Service": "credentials.iot.amazonaws.com",
              "Action": "sts:AssumeRole"
            }
          ]
        }
  alias:
    type: aws:iot:RoleAlias
    properties:
      alias: Thermostat-dynamodb-access-role-alias
      roleArn: ${role.arn}
```
{{% /example %}}
{{% /examples %}}

## Import

IOT Role Alias can be imported via the alias, e.g.,

```sh
 $ pulumi import aws:iot/roleAlias:RoleAlias example myalias
```

 
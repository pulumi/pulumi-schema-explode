Provides a Cognito User Resource.

{{% examples %}}
## Example Usage
{{% example %}}
### Basic configuration

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleUserPool = new aws.cognito.UserPool("exampleUserPool", {});
const exampleUser = new aws.cognito.User("exampleUser", {
    userPoolId: exampleUserPool.id,
    username: "example",
});
```
```python
import pulumi
import pulumi_aws as aws

example_user_pool = aws.cognito.UserPool("exampleUserPool")
example_user = aws.cognito.User("exampleUser",
    user_pool_id=example_user_pool.id,
    username="example")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleUserPool = new Aws.Cognito.UserPool("exampleUserPool");

    var exampleUser = new Aws.Cognito.User("exampleUser", new()
    {
        UserPoolId = exampleUserPool.Id,
        Username = "example",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cognito"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleUserPool, err := cognito.NewUserPool(ctx, "exampleUserPool", nil)
		if err != nil {
			return err
		}
		_, err = cognito.NewUser(ctx, "exampleUser", &cognito.UserArgs{
			UserPoolId: exampleUserPool.ID(),
			Username:   pulumi.String("example"),
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
import com.pulumi.aws.cognito.UserPool;
import com.pulumi.aws.cognito.User;
import com.pulumi.aws.cognito.UserArgs;
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
        var exampleUserPool = new UserPool("exampleUserPool");

        var exampleUser = new User("exampleUser", UserArgs.builder()        
            .userPoolId(exampleUserPool.id())
            .username("example")
            .build());

    }
}
```
```yaml
resources:
  exampleUserPool:
    type: aws:cognito:UserPool
  exampleUser:
    type: aws:cognito:User
    properties:
      userPoolId: ${exampleUserPool.id}
      username: example
```
{{% /example %}}
{{% example %}}
### Setting user attributes

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleUserPool = new aws.cognito.UserPool("exampleUserPool", {schemas: [
    {
        name: "terraform",
        attributeDataType: "Boolean",
        mutable: false,
        required: false,
        developerOnlyAttribute: false,
    },
    {
        name: "foo",
        attributeDataType: "String",
        mutable: false,
        required: false,
        developerOnlyAttribute: false,
        stringAttributeConstraints: {},
    },
]});
const exampleUser = new aws.cognito.User("exampleUser", {
    userPoolId: exampleUserPool.id,
    username: "example",
    attributes: {
        terraform: "true",
        foo: "bar",
        email: "no-reply@hashicorp.com",
        email_verified: "true",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example_user_pool = aws.cognito.UserPool("exampleUserPool", schemas=[
    aws.cognito.UserPoolSchemaArgs(
        name="terraform",
        attribute_data_type="Boolean",
        mutable=False,
        required=False,
        developer_only_attribute=False,
    ),
    aws.cognito.UserPoolSchemaArgs(
        name="foo",
        attribute_data_type="String",
        mutable=False,
        required=False,
        developer_only_attribute=False,
        string_attribute_constraints=aws.cognito.UserPoolSchemaStringAttributeConstraintsArgs(),
    ),
])
example_user = aws.cognito.User("exampleUser",
    user_pool_id=example_user_pool.id,
    username="example",
    attributes={
        "terraform": "true",
        "foo": "bar",
        "email": "no-reply@hashicorp.com",
        "email_verified": "true",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleUserPool = new Aws.Cognito.UserPool("exampleUserPool", new()
    {
        Schemas = new[]
        {
            new Aws.Cognito.Inputs.UserPoolSchemaArgs
            {
                Name = "terraform",
                AttributeDataType = "Boolean",
                Mutable = false,
                Required = false,
                DeveloperOnlyAttribute = false,
            },
            new Aws.Cognito.Inputs.UserPoolSchemaArgs
            {
                Name = "foo",
                AttributeDataType = "String",
                Mutable = false,
                Required = false,
                DeveloperOnlyAttribute = false,
                StringAttributeConstraints = ,
            },
        },
    });

    var exampleUser = new Aws.Cognito.User("exampleUser", new()
    {
        UserPoolId = exampleUserPool.Id,
        Username = "example",
        Attributes = 
        {
            { "terraform", "true" },
            { "foo", "bar" },
            { "email", "no-reply@hashicorp.com" },
            { "email_verified", "true" },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cognito"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleUserPool, err := cognito.NewUserPool(ctx, "exampleUserPool", &cognito.UserPoolArgs{
			Schemas: cognito.UserPoolSchemaArray{
				&cognito.UserPoolSchemaArgs{
					Name:                   pulumi.String("terraform"),
					AttributeDataType:      pulumi.String("Boolean"),
					Mutable:                pulumi.Bool(false),
					Required:               pulumi.Bool(false),
					DeveloperOnlyAttribute: pulumi.Bool(false),
				},
				&cognito.UserPoolSchemaArgs{
					Name:                       pulumi.String("foo"),
					AttributeDataType:          pulumi.String("String"),
					Mutable:                    pulumi.Bool(false),
					Required:                   pulumi.Bool(false),
					DeveloperOnlyAttribute:     pulumi.Bool(false),
					StringAttributeConstraints: nil,
				},
			},
		})
		if err != nil {
			return err
		}
		_, err = cognito.NewUser(ctx, "exampleUser", &cognito.UserArgs{
			UserPoolId: exampleUserPool.ID(),
			Username:   pulumi.String("example"),
			Attributes: pulumi.StringMap{
				"terraform":      pulumi.String("true"),
				"foo":            pulumi.String("bar"),
				"email":          pulumi.String("no-reply@hashicorp.com"),
				"email_verified": pulumi.String("true"),
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
import com.pulumi.aws.cognito.UserPool;
import com.pulumi.aws.cognito.UserPoolArgs;
import com.pulumi.aws.cognito.inputs.UserPoolSchemaArgs;
import com.pulumi.aws.cognito.inputs.UserPoolSchemaStringAttributeConstraintsArgs;
import com.pulumi.aws.cognito.User;
import com.pulumi.aws.cognito.UserArgs;
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
        var exampleUserPool = new UserPool("exampleUserPool", UserPoolArgs.builder()        
            .schemas(            
                UserPoolSchemaArgs.builder()
                    .name("terraform")
                    .attributeDataType("Boolean")
                    .mutable(false)
                    .required(false)
                    .developerOnlyAttribute(false)
                    .build(),
                UserPoolSchemaArgs.builder()
                    .name("foo")
                    .attributeDataType("String")
                    .mutable(false)
                    .required(false)
                    .developerOnlyAttribute(false)
                    .stringAttributeConstraints()
                    .build())
            .build());

        var exampleUser = new User("exampleUser", UserArgs.builder()        
            .userPoolId(exampleUserPool.id())
            .username("example")
            .attributes(Map.ofEntries(
                Map.entry("terraform", true),
                Map.entry("foo", "bar"),
                Map.entry("email", "no-reply@hashicorp.com"),
                Map.entry("email_verified", true)
            ))
            .build());

    }
}
```
```yaml
resources:
  exampleUserPool:
    type: aws:cognito:UserPool
    properties:
      schemas:
        - name: terraform
          attributeDataType: Boolean
          mutable: false
          required: false
          developerOnlyAttribute: false
        - name: foo
          attributeDataType: String
          mutable: false
          required: false
          developerOnlyAttribute: false
          stringAttributeConstraints: {}
  exampleUser:
    type: aws:cognito:User
    properties:
      userPoolId: ${exampleUserPool.id}
      username: example
      attributes:
        terraform: true
        foo: bar
        email: no-reply@hashicorp.com
        email_verified: true
```
{{% /example %}}
{{% /examples %}}

## Import

Cognito User can be imported using the `user_pool_id`/`name` attributes concatenated, e.g.,

```sh
 $ pulumi import aws:cognito/user:User user us-east-1_vG78M4goG/user
```

 
Provides a Cognito User Pool Client resource.

{{% examples %}}
## Example Usage
{{% example %}}
### Create a basic user pool client

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const pool = new aws.cognito.UserPool("pool", {});
const client = new aws.cognito.UserPoolClient("client", {userPoolId: pool.id});
```
```python
import pulumi
import pulumi_aws as aws

pool = aws.cognito.UserPool("pool")
client = aws.cognito.UserPoolClient("client", user_pool_id=pool.id)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var pool = new Aws.Cognito.UserPool("pool");

    var client = new Aws.Cognito.UserPoolClient("client", new()
    {
        UserPoolId = pool.Id,
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
		pool, err := cognito.NewUserPool(ctx, "pool", nil)
		if err != nil {
			return err
		}
		_, err = cognito.NewUserPoolClient(ctx, "client", &cognito.UserPoolClientArgs{
			UserPoolId: pool.ID(),
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
import com.pulumi.aws.cognito.UserPoolClient;
import com.pulumi.aws.cognito.UserPoolClientArgs;
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
        var pool = new UserPool("pool");

        var client = new UserPoolClient("client", UserPoolClientArgs.builder()        
            .userPoolId(pool.id())
            .build());

    }
}
```
```yaml
resources:
  pool:
    type: aws:cognito:UserPool
  client:
    type: aws:cognito:UserPoolClient
    properties:
      userPoolId: ${pool.id}
```
{{% /example %}}
{{% example %}}
### Create a user pool client with no SRP authentication

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const pool = new aws.cognito.UserPool("pool", {});
const client = new aws.cognito.UserPoolClient("client", {
    userPoolId: pool.id,
    generateSecret: true,
    explicitAuthFlows: ["ADMIN_NO_SRP_AUTH"],
});
```
```python
import pulumi
import pulumi_aws as aws

pool = aws.cognito.UserPool("pool")
client = aws.cognito.UserPoolClient("client",
    user_pool_id=pool.id,
    generate_secret=True,
    explicit_auth_flows=["ADMIN_NO_SRP_AUTH"])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var pool = new Aws.Cognito.UserPool("pool");

    var client = new Aws.Cognito.UserPoolClient("client", new()
    {
        UserPoolId = pool.Id,
        GenerateSecret = true,
        ExplicitAuthFlows = new[]
        {
            "ADMIN_NO_SRP_AUTH",
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
		pool, err := cognito.NewUserPool(ctx, "pool", nil)
		if err != nil {
			return err
		}
		_, err = cognito.NewUserPoolClient(ctx, "client", &cognito.UserPoolClientArgs{
			UserPoolId:     pool.ID(),
			GenerateSecret: pulumi.Bool(true),
			ExplicitAuthFlows: pulumi.StringArray{
				pulumi.String("ADMIN_NO_SRP_AUTH"),
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
import com.pulumi.aws.cognito.UserPoolClient;
import com.pulumi.aws.cognito.UserPoolClientArgs;
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
        var pool = new UserPool("pool");

        var client = new UserPoolClient("client", UserPoolClientArgs.builder()        
            .userPoolId(pool.id())
            .generateSecret(true)
            .explicitAuthFlows("ADMIN_NO_SRP_AUTH")
            .build());

    }
}
```
```yaml
resources:
  pool:
    type: aws:cognito:UserPool
  client:
    type: aws:cognito:UserPoolClient
    properties:
      userPoolId: ${pool.id}
      generateSecret: true
      explicitAuthFlows:
        - ADMIN_NO_SRP_AUTH
```
{{% /example %}}
{{% example %}}
### Create a user pool client with pinpoint analytics

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const current = aws.getCallerIdentity({});
const testUserPool = new aws.cognito.UserPool("testUserPool", {});
const testApp = new aws.pinpoint.App("testApp", {});
const testRole = new aws.iam.Role("testRole", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "cognito-idp.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
`});
const testRolePolicy = new aws.iam.RolePolicy("testRolePolicy", {
    role: testRole.id,
    policy: pulumi.all([current, testApp.applicationId]).apply(([current, applicationId]) => `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "mobiletargeting:UpdateEndpoint",
        "mobiletargeting:PutItems"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:mobiletargeting:*:${current.accountId}:apps/${applicationId}*"
    }
  ]
}
`),
});
const testUserPoolClient = new aws.cognito.UserPoolClient("testUserPoolClient", {
    userPoolId: testUserPool.id,
    analyticsConfiguration: {
        applicationId: testApp.applicationId,
        externalId: "some_id",
        roleArn: testRole.arn,
        userDataShared: true,
    },
});
```
```python
import pulumi
import pulumi_aws as aws

current = aws.get_caller_identity()
test_user_pool = aws.cognito.UserPool("testUserPool")
test_app = aws.pinpoint.App("testApp")
test_role = aws.iam.Role("testRole", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "cognito-idp.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
""")
test_role_policy = aws.iam.RolePolicy("testRolePolicy",
    role=test_role.id,
    policy=test_app.application_id.apply(lambda application_id: f"""{{
  "Version": "2012-10-17",
  "Statement": [
    {{
      "Action": [
        "mobiletargeting:UpdateEndpoint",
        "mobiletargeting:PutItems"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:mobiletargeting:*:{current.account_id}:apps/{application_id}*"
    }}
  ]
}}
"""))
test_user_pool_client = aws.cognito.UserPoolClient("testUserPoolClient",
    user_pool_id=test_user_pool.id,
    analytics_configuration=aws.cognito.UserPoolClientAnalyticsConfigurationArgs(
        application_id=test_app.application_id,
        external_id="some_id",
        role_arn=test_role.arn,
        user_data_shared=True,
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var current = Aws.GetCallerIdentity.Invoke();

    var testUserPool = new Aws.Cognito.UserPool("testUserPool");

    var testApp = new Aws.Pinpoint.App("testApp");

    var testRole = new Aws.Iam.Role("testRole", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Action"": ""sts:AssumeRole"",
      ""Principal"": {
        ""Service"": ""cognito-idp.amazonaws.com""
      },
      ""Effect"": ""Allow"",
      ""Sid"": """"
    }
  ]
}
",
    });

    var testRolePolicy = new Aws.Iam.RolePolicy("testRolePolicy", new()
    {
        Role = testRole.Id,
        Policy = Output.Tuple(current.Apply(getCallerIdentityResult => getCallerIdentityResult), testApp.ApplicationId).Apply(values =>
        {
            var current = values.Item1;
            var applicationId = values.Item2;
            return @$"{{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {{
      ""Action"": [
        ""mobiletargeting:UpdateEndpoint"",
        ""mobiletargeting:PutItems""
      ],
      ""Effect"": ""Allow"",
      ""Resource"": ""arn:aws:mobiletargeting:*:{current.Apply(getCallerIdentityResult => getCallerIdentityResult.AccountId)}:apps/{applicationId}*""
    }}
  ]
}}
";
        }),
    });

    var testUserPoolClient = new Aws.Cognito.UserPoolClient("testUserPoolClient", new()
    {
        UserPoolId = testUserPool.Id,
        AnalyticsConfiguration = new Aws.Cognito.Inputs.UserPoolClientAnalyticsConfigurationArgs
        {
            ApplicationId = testApp.ApplicationId,
            ExternalId = "some_id",
            RoleArn = testRole.Arn,
            UserDataShared = true,
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cognito"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/pinpoint"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		current, err := aws.GetCallerIdentity(ctx, nil, nil)
		if err != nil {
			return err
		}
		testUserPool, err := cognito.NewUserPool(ctx, "testUserPool", nil)
		if err != nil {
			return err
		}
		testApp, err := pinpoint.NewApp(ctx, "testApp", nil)
		if err != nil {
			return err
		}
		testRole, err := iam.NewRole(ctx, "testRole", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "cognito-idp.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
`)),
		})
		if err != nil {
			return err
		}
		_, err = iam.NewRolePolicy(ctx, "testRolePolicy", &iam.RolePolicyArgs{
			Role: testRole.ID(),
			Policy: testApp.ApplicationId.ApplyT(func(applicationId string) (string, error) {
				return fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "mobiletargeting:UpdateEndpoint",
        "mobiletargeting:PutItems"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:mobiletargeting:*:%v:apps/%v*"
    }
  ]
}
`, current.AccountId, applicationId), nil
			}).(pulumi.StringOutput),
		})
		if err != nil {
			return err
		}
		_, err = cognito.NewUserPoolClient(ctx, "testUserPoolClient", &cognito.UserPoolClientArgs{
			UserPoolId: testUserPool.ID(),
			AnalyticsConfiguration: &cognito.UserPoolClientAnalyticsConfigurationArgs{
				ApplicationId:  testApp.ApplicationId,
				ExternalId:     pulumi.String("some_id"),
				RoleArn:        testRole.Arn,
				UserDataShared: pulumi.Bool(true),
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
import com.pulumi.aws.AwsFunctions;
import com.pulumi.aws.cognito.UserPool;
import com.pulumi.aws.pinpoint.App;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.iam.RolePolicy;
import com.pulumi.aws.iam.RolePolicyArgs;
import com.pulumi.aws.cognito.UserPoolClient;
import com.pulumi.aws.cognito.UserPoolClientArgs;
import com.pulumi.aws.cognito.inputs.UserPoolClientAnalyticsConfigurationArgs;
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
        final var current = AwsFunctions.getCallerIdentity();

        var testUserPool = new UserPool("testUserPool");

        var testApp = new App("testApp");

        var testRole = new Role("testRole", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "cognito-idp.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
            """)
            .build());

        var testRolePolicy = new RolePolicy("testRolePolicy", RolePolicyArgs.builder()        
            .role(testRole.id())
            .policy(testApp.applicationId().applyValue(applicationId -> """
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "mobiletargeting:UpdateEndpoint",
        "mobiletargeting:PutItems"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:mobiletargeting:*:%s:apps/%s*"
    }
  ]
}
", current.applyValue(getCallerIdentityResult -> getCallerIdentityResult.accountId()),applicationId)))
            .build());

        var testUserPoolClient = new UserPoolClient("testUserPoolClient", UserPoolClientArgs.builder()        
            .userPoolId(testUserPool.id())
            .analyticsConfiguration(UserPoolClientAnalyticsConfigurationArgs.builder()
                .applicationId(testApp.applicationId())
                .externalId("some_id")
                .roleArn(testRole.arn())
                .userDataShared(true)
                .build())
            .build());

    }
}
```
```yaml
resources:
  testUserPool:
    type: aws:cognito:UserPool
  testApp:
    type: aws:pinpoint:App
  testRole:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Principal": {
                "Service": "cognito-idp.amazonaws.com"
              },
              "Effect": "Allow",
              "Sid": ""
            }
          ]
        }
  testRolePolicy:
    type: aws:iam:RolePolicy
    properties:
      role: ${testRole.id}
      policy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": [
                "mobiletargeting:UpdateEndpoint",
                "mobiletargeting:PutItems"
              ],
              "Effect": "Allow",
              "Resource": "arn:aws:mobiletargeting:*:${current.accountId}:apps/${testApp.applicationId}*"
            }
          ]
        }
  testUserPoolClient:
    type: aws:cognito:UserPoolClient
    properties:
      userPoolId: ${testUserPool.id}
      analyticsConfiguration:
        applicationId: ${testApp.applicationId}
        externalId: some_id
        roleArn: ${testRole.arn}
        userDataShared: true
variables:
  current:
    Fn::Invoke:
      Function: aws:getCallerIdentity
      Arguments: {}
```
{{% /example %}}
{{% example %}}
### Create a user pool client with Cognito as the identity provider

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const pool = new aws.cognito.UserPool("pool", {});
const userpoolClient = new aws.cognito.UserPoolClient("userpoolClient", {
    userPoolId: pool.id,
    callbackUrls: ["https://example.com"],
    allowedOauthFlowsUserPoolClient: true,
    allowedOauthFlows: [
        "code",
        "implicit",
    ],
    allowedOauthScopes: [
        "email",
        "openid",
    ],
    supportedIdentityProviders: ["COGNITO"],
});
```
```python
import pulumi
import pulumi_aws as aws

pool = aws.cognito.UserPool("pool")
userpool_client = aws.cognito.UserPoolClient("userpoolClient",
    user_pool_id=pool.id,
    callback_urls=["https://example.com"],
    allowed_oauth_flows_user_pool_client=True,
    allowed_oauth_flows=[
        "code",
        "implicit",
    ],
    allowed_oauth_scopes=[
        "email",
        "openid",
    ],
    supported_identity_providers=["COGNITO"])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var pool = new Aws.Cognito.UserPool("pool");

    var userpoolClient = new Aws.Cognito.UserPoolClient("userpoolClient", new()
    {
        UserPoolId = pool.Id,
        CallbackUrls = new[]
        {
            "https://example.com",
        },
        AllowedOauthFlowsUserPoolClient = true,
        AllowedOauthFlows = new[]
        {
            "code",
            "implicit",
        },
        AllowedOauthScopes = new[]
        {
            "email",
            "openid",
        },
        SupportedIdentityProviders = new[]
        {
            "COGNITO",
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
		pool, err := cognito.NewUserPool(ctx, "pool", nil)
		if err != nil {
			return err
		}
		_, err = cognito.NewUserPoolClient(ctx, "userpoolClient", &cognito.UserPoolClientArgs{
			UserPoolId: pool.ID(),
			CallbackUrls: pulumi.StringArray{
				pulumi.String("https://example.com"),
			},
			AllowedOauthFlowsUserPoolClient: pulumi.Bool(true),
			AllowedOauthFlows: pulumi.StringArray{
				pulumi.String("code"),
				pulumi.String("implicit"),
			},
			AllowedOauthScopes: pulumi.StringArray{
				pulumi.String("email"),
				pulumi.String("openid"),
			},
			SupportedIdentityProviders: pulumi.StringArray{
				pulumi.String("COGNITO"),
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
import com.pulumi.aws.cognito.UserPoolClient;
import com.pulumi.aws.cognito.UserPoolClientArgs;
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
        var pool = new UserPool("pool");

        var userpoolClient = new UserPoolClient("userpoolClient", UserPoolClientArgs.builder()        
            .userPoolId(pool.id())
            .callbackUrls("https://example.com")
            .allowedOauthFlowsUserPoolClient(true)
            .allowedOauthFlows(            
                "code",
                "implicit")
            .allowedOauthScopes(            
                "email",
                "openid")
            .supportedIdentityProviders("COGNITO")
            .build());

    }
}
```
```yaml
resources:
  pool:
    type: aws:cognito:UserPool
  userpoolClient:
    type: aws:cognito:UserPoolClient
    properties:
      userPoolId: ${pool.id}
      callbackUrls:
        - https://example.com
      allowedOauthFlowsUserPoolClient: true
      allowedOauthFlows:
        - code
        - implicit
      allowedOauthScopes:
        - email
        - openid
      supportedIdentityProviders:
        - COGNITO
```
{{% /example %}}
{{% /examples %}}

## Import

Cognito User Pool Clients can be imported using the `id` of the Cognito User Pool, and the `id` of the Cognito User Pool Client, e.g.,

```sh
 $ pulumi import aws:cognito/userPoolClient:UserPoolClient client us-west-2_abc123/3ho4ek12345678909nh3fmhpko
```

 
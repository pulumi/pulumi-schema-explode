Provides an AppSync GraphQL API.

{{% examples %}}
## Example Usage
{{% example %}}
### API Key Authentication

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.appsync.GraphQLApi("example", {
    authenticationType: "API_KEY",
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.appsync.GraphQLApi("example", authentication_type="API_KEY")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.AppSync.GraphQLApi("example", new()
    {
        AuthenticationType = "API_KEY",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/appsync"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := appsync.NewGraphQLApi(ctx, "example", &appsync.GraphQLApiArgs{
			AuthenticationType: pulumi.String("API_KEY"),
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
import com.pulumi.aws.appsync.GraphQLApi;
import com.pulumi.aws.appsync.GraphQLApiArgs;
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
        var example = new GraphQLApi("example", GraphQLApiArgs.builder()        
            .authenticationType("API_KEY")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:appsync:GraphQLApi
    properties:
      authenticationType: API_KEY
```
{{% /example %}}
{{% example %}}
### AWS IAM Authentication

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.appsync.GraphQLApi("example", {
    authenticationType: "AWS_IAM",
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.appsync.GraphQLApi("example", authentication_type="AWS_IAM")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.AppSync.GraphQLApi("example", new()
    {
        AuthenticationType = "AWS_IAM",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/appsync"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := appsync.NewGraphQLApi(ctx, "example", &appsync.GraphQLApiArgs{
			AuthenticationType: pulumi.String("AWS_IAM"),
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
import com.pulumi.aws.appsync.GraphQLApi;
import com.pulumi.aws.appsync.GraphQLApiArgs;
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
        var example = new GraphQLApi("example", GraphQLApiArgs.builder()        
            .authenticationType("AWS_IAM")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:appsync:GraphQLApi
    properties:
      authenticationType: AWS_IAM
```
{{% /example %}}
{{% example %}}
### AWS Cognito User Pool Authentication

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.appsync.GraphQLApi("example", {
    authenticationType: "AMAZON_COGNITO_USER_POOLS",
    userPoolConfig: {
        awsRegion: data.aws_region.current.name,
        defaultAction: "DENY",
        userPoolId: aws_cognito_user_pool.example.id,
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.appsync.GraphQLApi("example",
    authentication_type="AMAZON_COGNITO_USER_POOLS",
    user_pool_config=aws.appsync.GraphQLApiUserPoolConfigArgs(
        aws_region=data["aws_region"]["current"]["name"],
        default_action="DENY",
        user_pool_id=aws_cognito_user_pool["example"]["id"],
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.AppSync.GraphQLApi("example", new()
    {
        AuthenticationType = "AMAZON_COGNITO_USER_POOLS",
        UserPoolConfig = new Aws.AppSync.Inputs.GraphQLApiUserPoolConfigArgs
        {
            AwsRegion = data.Aws_region.Current.Name,
            DefaultAction = "DENY",
            UserPoolId = aws_cognito_user_pool.Example.Id,
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/appsync"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := appsync.NewGraphQLApi(ctx, "example", &appsync.GraphQLApiArgs{
			AuthenticationType: pulumi.String("AMAZON_COGNITO_USER_POOLS"),
			UserPoolConfig: &appsync.GraphQLApiUserPoolConfigArgs{
				AwsRegion:     pulumi.Any(data.Aws_region.Current.Name),
				DefaultAction: pulumi.String("DENY"),
				UserPoolId:    pulumi.Any(aws_cognito_user_pool.Example.Id),
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
import com.pulumi.aws.appsync.GraphQLApi;
import com.pulumi.aws.appsync.GraphQLApiArgs;
import com.pulumi.aws.appsync.inputs.GraphQLApiUserPoolConfigArgs;
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
        var example = new GraphQLApi("example", GraphQLApiArgs.builder()        
            .authenticationType("AMAZON_COGNITO_USER_POOLS")
            .userPoolConfig(GraphQLApiUserPoolConfigArgs.builder()
                .awsRegion(data.aws_region().current().name())
                .defaultAction("DENY")
                .userPoolId(aws_cognito_user_pool.example().id())
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:appsync:GraphQLApi
    properties:
      authenticationType: AMAZON_COGNITO_USER_POOLS
      userPoolConfig:
        awsRegion: ${data.aws_region.current.name}
        defaultAction: DENY
        userPoolId: ${aws_cognito_user_pool.example.id}
```
{{% /example %}}
{{% example %}}
### OpenID Connect Authentication

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.appsync.GraphQLApi("example", {
    authenticationType: "OPENID_CONNECT",
    openidConnectConfig: {
        issuer: "https://example.com",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.appsync.GraphQLApi("example",
    authentication_type="OPENID_CONNECT",
    openid_connect_config=aws.appsync.GraphQLApiOpenidConnectConfigArgs(
        issuer="https://example.com",
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.AppSync.GraphQLApi("example", new()
    {
        AuthenticationType = "OPENID_CONNECT",
        OpenidConnectConfig = new Aws.AppSync.Inputs.GraphQLApiOpenidConnectConfigArgs
        {
            Issuer = "https://example.com",
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/appsync"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := appsync.NewGraphQLApi(ctx, "example", &appsync.GraphQLApiArgs{
			AuthenticationType: pulumi.String("OPENID_CONNECT"),
			OpenidConnectConfig: &appsync.GraphQLApiOpenidConnectConfigArgs{
				Issuer: pulumi.String("https://example.com"),
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
import com.pulumi.aws.appsync.GraphQLApi;
import com.pulumi.aws.appsync.GraphQLApiArgs;
import com.pulumi.aws.appsync.inputs.GraphQLApiOpenidConnectConfigArgs;
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
        var example = new GraphQLApi("example", GraphQLApiArgs.builder()        
            .authenticationType("OPENID_CONNECT")
            .openidConnectConfig(GraphQLApiOpenidConnectConfigArgs.builder()
                .issuer("https://example.com")
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:appsync:GraphQLApi
    properties:
      authenticationType: OPENID_CONNECT
      openidConnectConfig:
        issuer: https://example.com
```
{{% /example %}}
{{% example %}}
### AWS Lambda Authorizer Authentication

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.appsync.GraphQLApi("example", {
    authenticationType: "AWS_LAMBDA",
    lambdaAuthorizerConfig: {
        authorizerUri: "arn:aws:lambda:us-east-1:123456789012:function:custom_lambda_authorizer",
    },
});
const appsyncLambdaAuthorizer = new aws.lambda.Permission("appsyncLambdaAuthorizer", {
    action: "lambda:InvokeFunction",
    "function": "custom_lambda_authorizer",
    principal: "appsync.amazonaws.com",
    sourceArn: example.arn,
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.appsync.GraphQLApi("example",
    authentication_type="AWS_LAMBDA",
    lambda_authorizer_config=aws.appsync.GraphQLApiLambdaAuthorizerConfigArgs(
        authorizer_uri="arn:aws:lambda:us-east-1:123456789012:function:custom_lambda_authorizer",
    ))
appsync_lambda_authorizer = aws.lambda_.Permission("appsyncLambdaAuthorizer",
    action="lambda:InvokeFunction",
    function="custom_lambda_authorizer",
    principal="appsync.amazonaws.com",
    source_arn=example.arn)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.AppSync.GraphQLApi("example", new()
    {
        AuthenticationType = "AWS_LAMBDA",
        LambdaAuthorizerConfig = new Aws.AppSync.Inputs.GraphQLApiLambdaAuthorizerConfigArgs
        {
            AuthorizerUri = "arn:aws:lambda:us-east-1:123456789012:function:custom_lambda_authorizer",
        },
    });

    var appsyncLambdaAuthorizer = new Aws.Lambda.Permission("appsyncLambdaAuthorizer", new()
    {
        Action = "lambda:InvokeFunction",
        Function = "custom_lambda_authorizer",
        Principal = "appsync.amazonaws.com",
        SourceArn = example.Arn,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/appsync"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lambda"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		example, err := appsync.NewGraphQLApi(ctx, "example", &appsync.GraphQLApiArgs{
			AuthenticationType: pulumi.String("AWS_LAMBDA"),
			LambdaAuthorizerConfig: &appsync.GraphQLApiLambdaAuthorizerConfigArgs{
				AuthorizerUri: pulumi.String("arn:aws:lambda:us-east-1:123456789012:function:custom_lambda_authorizer"),
			},
		})
		if err != nil {
			return err
		}
		_, err = lambda.NewPermission(ctx, "appsyncLambdaAuthorizer", &lambda.PermissionArgs{
			Action:    pulumi.String("lambda:InvokeFunction"),
			Function:  pulumi.Any("custom_lambda_authorizer"),
			Principal: pulumi.String("appsync.amazonaws.com"),
			SourceArn: example.Arn,
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
import com.pulumi.aws.appsync.GraphQLApi;
import com.pulumi.aws.appsync.GraphQLApiArgs;
import com.pulumi.aws.appsync.inputs.GraphQLApiLambdaAuthorizerConfigArgs;
import com.pulumi.aws.lambda.Permission;
import com.pulumi.aws.lambda.PermissionArgs;
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
        var example = new GraphQLApi("example", GraphQLApiArgs.builder()        
            .authenticationType("AWS_LAMBDA")
            .lambdaAuthorizerConfig(GraphQLApiLambdaAuthorizerConfigArgs.builder()
                .authorizerUri("arn:aws:lambda:us-east-1:123456789012:function:custom_lambda_authorizer")
                .build())
            .build());

        var appsyncLambdaAuthorizer = new Permission("appsyncLambdaAuthorizer", PermissionArgs.builder()        
            .action("lambda:InvokeFunction")
            .function("custom_lambda_authorizer")
            .principal("appsync.amazonaws.com")
            .sourceArn(example.arn())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:appsync:GraphQLApi
    properties:
      authenticationType: AWS_LAMBDA
      lambdaAuthorizerConfig:
        authorizerUri: arn:aws:lambda:us-east-1:123456789012:function:custom_lambda_authorizer
  appsyncLambdaAuthorizer:
    type: aws:lambda:Permission
    properties:
      action: lambda:InvokeFunction
      function: custom_lambda_authorizer
      principal: appsync.amazonaws.com
      sourceArn: ${example.arn}
```
{{% /example %}}
{{% example %}}
### With Multiple Authentication Providers

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.appsync.GraphQLApi("example", {
    additionalAuthenticationProviders: [{
        authenticationType: "AWS_IAM",
    }],
    authenticationType: "API_KEY",
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.appsync.GraphQLApi("example",
    additional_authentication_providers=[aws.appsync.GraphQLApiAdditionalAuthenticationProviderArgs(
        authentication_type="AWS_IAM",
    )],
    authentication_type="API_KEY")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.AppSync.GraphQLApi("example", new()
    {
        AdditionalAuthenticationProviders = new[]
        {
            new Aws.AppSync.Inputs.GraphQLApiAdditionalAuthenticationProviderArgs
            {
                AuthenticationType = "AWS_IAM",
            },
        },
        AuthenticationType = "API_KEY",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/appsync"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := appsync.NewGraphQLApi(ctx, "example", &appsync.GraphQLApiArgs{
			AdditionalAuthenticationProviders: appsync.GraphQLApiAdditionalAuthenticationProviderArray{
				&appsync.GraphQLApiAdditionalAuthenticationProviderArgs{
					AuthenticationType: pulumi.String("AWS_IAM"),
				},
			},
			AuthenticationType: pulumi.String("API_KEY"),
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
import com.pulumi.aws.appsync.GraphQLApi;
import com.pulumi.aws.appsync.GraphQLApiArgs;
import com.pulumi.aws.appsync.inputs.GraphQLApiAdditionalAuthenticationProviderArgs;
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
        var example = new GraphQLApi("example", GraphQLApiArgs.builder()        
            .additionalAuthenticationProviders(GraphQLApiAdditionalAuthenticationProviderArgs.builder()
                .authenticationType("AWS_IAM")
                .build())
            .authenticationType("API_KEY")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:appsync:GraphQLApi
    properties:
      additionalAuthenticationProviders:
        - authenticationType: AWS_IAM
      authenticationType: API_KEY
```
{{% /example %}}
{{% example %}}
### With Schema

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.appsync.GraphQLApi("example", {
    authenticationType: "AWS_IAM",
    schema: `schema {
	query: Query
}
type Query {
  test: Int
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.appsync.GraphQLApi("example",
    authentication_type="AWS_IAM",
    schema="""schema {
	query: Query
}
type Query {
  test: Int
}

""")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.AppSync.GraphQLApi("example", new()
    {
        AuthenticationType = "AWS_IAM",
        Schema = @"schema {
	query: Query
}
type Query {
  test: Int
}

",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/appsync"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := appsync.NewGraphQLApi(ctx, "example", &appsync.GraphQLApiArgs{
			AuthenticationType: pulumi.String("AWS_IAM"),
			Schema: pulumi.String(fmt.Sprintf(`schema {
	query: Query
}
type Query {
  test: Int
}

`)),
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
import com.pulumi.aws.appsync.GraphQLApi;
import com.pulumi.aws.appsync.GraphQLApiArgs;
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
        var example = new GraphQLApi("example", GraphQLApiArgs.builder()        
            .authenticationType("AWS_IAM")
            .schema("""
schema {
	query: Query
}
type Query {
  test: Int
}

            """)
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:appsync:GraphQLApi
    properties:
      authenticationType: AWS_IAM
      schema: |+
        schema {
        	query: Query
        }
        type Query {
          test: Int
        }
```
{{% /example %}}
{{% example %}}
### Enabling Logging

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleRole = new aws.iam.Role("exampleRole", {assumeRolePolicy: `{
    "Version": "2012-10-17",
    "Statement": [
        {
        "Effect": "Allow",
        "Principal": {
            "Service": "appsync.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
        }
    ]
}
`});
const exampleRolePolicyAttachment = new aws.iam.RolePolicyAttachment("exampleRolePolicyAttachment", {
    policyArn: "arn:aws:iam::aws:policy/service-role/AWSAppSyncPushToCloudWatchLogs",
    role: exampleRole.name,
});
// ... other configuration ...
const exampleGraphQLApi = new aws.appsync.GraphQLApi("exampleGraphQLApi", {logConfig: {
    cloudwatchLogsRoleArn: exampleRole.arn,
    fieldLogLevel: "ERROR",
}});
```
```python
import pulumi
import pulumi_aws as aws

example_role = aws.iam.Role("exampleRole", assume_role_policy="""{
    "Version": "2012-10-17",
    "Statement": [
        {
        "Effect": "Allow",
        "Principal": {
            "Service": "appsync.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
        }
    ]
}
""")
example_role_policy_attachment = aws.iam.RolePolicyAttachment("exampleRolePolicyAttachment",
    policy_arn="arn:aws:iam::aws:policy/service-role/AWSAppSyncPushToCloudWatchLogs",
    role=example_role.name)
# ... other configuration ...
example_graph_ql_api = aws.appsync.GraphQLApi("exampleGraphQLApi", log_config=aws.appsync.GraphQLApiLogConfigArgs(
    cloudwatch_logs_role_arn=example_role.arn,
    field_log_level="ERROR",
))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleRole = new Aws.Iam.Role("exampleRole", new()
    {
        AssumeRolePolicy = @"{
    ""Version"": ""2012-10-17"",
    ""Statement"": [
        {
        ""Effect"": ""Allow"",
        ""Principal"": {
            ""Service"": ""appsync.amazonaws.com""
        },
        ""Action"": ""sts:AssumeRole""
        }
    ]
}
",
    });

    var exampleRolePolicyAttachment = new Aws.Iam.RolePolicyAttachment("exampleRolePolicyAttachment", new()
    {
        PolicyArn = "arn:aws:iam::aws:policy/service-role/AWSAppSyncPushToCloudWatchLogs",
        Role = exampleRole.Name,
    });

    // ... other configuration ...
    var exampleGraphQLApi = new Aws.AppSync.GraphQLApi("exampleGraphQLApi", new()
    {
        LogConfig = new Aws.AppSync.Inputs.GraphQLApiLogConfigArgs
        {
            CloudwatchLogsRoleArn = exampleRole.Arn,
            FieldLogLevel = "ERROR",
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/appsync"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleRole, err := iam.NewRole(ctx, "exampleRole", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
    "Version": "2012-10-17",
    "Statement": [
        {
        "Effect": "Allow",
        "Principal": {
            "Service": "appsync.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
        }
    ]
}
`)),
		})
		if err != nil {
			return err
		}
		_, err = iam.NewRolePolicyAttachment(ctx, "exampleRolePolicyAttachment", &iam.RolePolicyAttachmentArgs{
			PolicyArn: pulumi.String("arn:aws:iam::aws:policy/service-role/AWSAppSyncPushToCloudWatchLogs"),
			Role:      exampleRole.Name,
		})
		if err != nil {
			return err
		}
		_, err = appsync.NewGraphQLApi(ctx, "exampleGraphQLApi", &appsync.GraphQLApiArgs{
			LogConfig: &appsync.GraphQLApiLogConfigArgs{
				CloudwatchLogsRoleArn: exampleRole.Arn,
				FieldLogLevel:         pulumi.String("ERROR"),
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
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.iam.RolePolicyAttachment;
import com.pulumi.aws.iam.RolePolicyAttachmentArgs;
import com.pulumi.aws.appsync.GraphQLApi;
import com.pulumi.aws.appsync.GraphQLApiArgs;
import com.pulumi.aws.appsync.inputs.GraphQLApiLogConfigArgs;
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
        var exampleRole = new Role("exampleRole", RoleArgs.builder()        
            .assumeRolePolicy("""
{
    "Version": "2012-10-17",
    "Statement": [
        {
        "Effect": "Allow",
        "Principal": {
            "Service": "appsync.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
        }
    ]
}
            """)
            .build());

        var exampleRolePolicyAttachment = new RolePolicyAttachment("exampleRolePolicyAttachment", RolePolicyAttachmentArgs.builder()        
            .policyArn("arn:aws:iam::aws:policy/service-role/AWSAppSyncPushToCloudWatchLogs")
            .role(exampleRole.name())
            .build());

        var exampleGraphQLApi = new GraphQLApi("exampleGraphQLApi", GraphQLApiArgs.builder()        
            .logConfig(GraphQLApiLogConfigArgs.builder()
                .cloudwatchLogsRoleArn(exampleRole.arn())
                .fieldLogLevel("ERROR")
                .build())
            .build());

    }
}
```
```yaml
resources:
  exampleRole:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
            "Version": "2012-10-17",
            "Statement": [
                {
                "Effect": "Allow",
                "Principal": {
                    "Service": "appsync.amazonaws.com"
                },
                "Action": "sts:AssumeRole"
                }
            ]
        }
  exampleRolePolicyAttachment:
    type: aws:iam:RolePolicyAttachment
    properties:
      policyArn: arn:aws:iam::aws:policy/service-role/AWSAppSyncPushToCloudWatchLogs
      role: ${exampleRole.name}
  exampleGraphQLApi:
    type: aws:appsync:GraphQLApi
    properties:
      logConfig:
        cloudwatchLogsRoleArn: ${exampleRole.arn}
        fieldLogLevel: ERROR
```
{{% /example %}}
{{% example %}}
### Associate Web ACL (v2)

```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.appsync.GraphQLApi;
import com.pulumi.aws.appsync.GraphQLApiArgs;
import com.pulumi.aws.wafv2.WebAcl;
import com.pulumi.aws.wafv2.WebAclArgs;
import com.pulumi.aws.wafv2.inputs.WebAclDefaultActionArgs;
import com.pulumi.aws.wafv2.inputs.WebAclDefaultActionAllowArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleOverrideActionArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleStatementArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleStatementManagedRuleGroupStatementArgs;
import com.pulumi.aws.wafv2.inputs.WebAclRuleVisibilityConfigArgs;
import com.pulumi.aws.wafv2.inputs.WebAclVisibilityConfigArgs;
import com.pulumi.aws.wafv2.WebAclAssociation;
import com.pulumi.aws.wafv2.WebAclAssociationArgs;
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
        var exampleGraphQLApi = new GraphQLApi("exampleGraphQLApi", GraphQLApiArgs.builder()        
            .authenticationType("API_KEY")
            .build());

        var exampleWebAcl = new WebAcl("exampleWebAcl", WebAclArgs.builder()        
            .description("Example of a managed rule.")
            .scope("REGIONAL")
            .defaultAction(WebAclDefaultActionArgs.builder()
                .allow()
                .build())
            .rules(WebAclRuleArgs.builder()
                .name("rule-1")
                .priority(1)
                .overrideAction(WebAclRuleOverrideActionArgs.builder()
                    .block()
                    .build())
                .statement(WebAclRuleStatementArgs.builder()
                    .managedRuleGroupStatement(WebAclRuleStatementManagedRuleGroupStatementArgs.builder()
                        .name("AWSManagedRulesCommonRuleSet")
                        .vendorName("AWS")
                        .build())
                    .build())
                .visibilityConfig(WebAclRuleVisibilityConfigArgs.builder()
                    .cloudwatchMetricsEnabled(false)
                    .metricName("friendly-rule-metric-name")
                    .sampledRequestsEnabled(false)
                    .build())
                .build())
            .visibilityConfig(WebAclVisibilityConfigArgs.builder()
                .cloudwatchMetricsEnabled(false)
                .metricName("friendly-metric-name")
                .sampledRequestsEnabled(false)
                .build())
            .build());

        var exampleWebAclAssociation = new WebAclAssociation("exampleWebAclAssociation", WebAclAssociationArgs.builder()        
            .resourceArn(exampleGraphQLApi.arn())
            .webAclArn(exampleWebAcl.arn())
            .build());

    }
}
```
```yaml
resources:
  exampleGraphQLApi:
    type: aws:appsync:GraphQLApi
    properties:
      authenticationType: API_KEY
  exampleWebAclAssociation:
    type: aws:wafv2:WebAclAssociation
    properties:
      resourceArn: ${exampleGraphQLApi.arn}
      webAclArn: ${exampleWebAcl.arn}
  exampleWebAcl:
    type: aws:wafv2:WebAcl
    properties:
      description: Example of a managed rule.
      scope: REGIONAL
      defaultAction:
        allow: {}
      rules:
        - name: rule-1
          priority: 1
          overrideAction:
            block:
              - {}
          statement:
            managedRuleGroupStatement:
              name: AWSManagedRulesCommonRuleSet
              vendorName: AWS
          visibilityConfig:
            cloudwatchMetricsEnabled: false
            metricName: friendly-rule-metric-name
            sampledRequestsEnabled: false
      visibilityConfig:
        cloudwatchMetricsEnabled: false
        metricName: friendly-metric-name
        sampledRequestsEnabled: false
```
{{% /example %}}
{{% /examples %}}

## Import

AppSync GraphQL API can be imported using the GraphQL API ID, e.g.,

```sh
 $ pulumi import aws:appsync/graphQLApi:GraphQLApi example 0123456789
```

 
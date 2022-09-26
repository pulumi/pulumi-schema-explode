Generates an IAM policy document in JSON format for use with resources that expect policy documents such as `aws.iam.Policy`.

Using this data source to generate policy documents is *optional*. It is also valid to use literal JSON strings in your configuration or to use the `file` interpolation function to read a raw JSON policy document from a file.

{{% examples %}}
## Example Usage
{{% example %}}
### Basic Example

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const examplePolicyDocument = aws.iam.getPolicyDocument({
    statements: [
        {
            sid: "1",
            actions: [
                "s3:ListAllMyBuckets",
                "s3:GetBucketLocation",
            ],
            resources: ["arn:aws:s3:::*"],
        },
        {
            actions: ["s3:ListBucket"],
            resources: [`arn:aws:s3:::${_var.s3_bucket_name}`],
            conditions: [{
                test: "StringLike",
                variable: "s3:prefix",
                values: [
                    "",
                    "home/",
                    "home/&{aws:username}/",
                ],
            }],
        },
        {
            actions: ["s3:*"],
            resources: [
                `arn:aws:s3:::${_var.s3_bucket_name}/home/&{aws:username}`,
                `arn:aws:s3:::${_var.s3_bucket_name}/home/&{aws:username}/*`,
            ],
        },
    ],
});
const examplePolicy = new aws.iam.Policy("examplePolicy", {
    path: "/",
    policy: examplePolicyDocument.then(examplePolicyDocument => examplePolicyDocument.json),
});
```
```python
import pulumi
import pulumi_aws as aws

example_policy_document = aws.iam.get_policy_document(statements=[
    aws.iam.GetPolicyDocumentStatementArgs(
        sid="1",
        actions=[
            "s3:ListAllMyBuckets",
            "s3:GetBucketLocation",
        ],
        resources=["arn:aws:s3:::*"],
    ),
    aws.iam.GetPolicyDocumentStatementArgs(
        actions=["s3:ListBucket"],
        resources=[f"arn:aws:s3:::{var['s3_bucket_name']}"],
        conditions=[aws.iam.GetPolicyDocumentStatementConditionArgs(
            test="StringLike",
            variable="s3:prefix",
            values=[
                "",
                "home/",
                "home/&{aws:username}/",
            ],
        )],
    ),
    aws.iam.GetPolicyDocumentStatementArgs(
        actions=["s3:*"],
        resources=[
            f"arn:aws:s3:::{var['s3_bucket_name']}/home/&{{aws:username}}",
            f"arn:aws:s3:::{var['s3_bucket_name']}/home/&{{aws:username}}/*",
        ],
    ),
])
example_policy = aws.iam.Policy("examplePolicy",
    path="/",
    policy=example_policy_document.json)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var examplePolicyDocument = Aws.Iam.GetPolicyDocument.Invoke(new()
    {
        Statements = new[]
        {
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Sid = "1",
                Actions = new[]
                {
                    "s3:ListAllMyBuckets",
                    "s3:GetBucketLocation",
                },
                Resources = new[]
                {
                    "arn:aws:s3:::*",
                },
            },
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Actions = new[]
                {
                    "s3:ListBucket",
                },
                Resources = new[]
                {
                    $"arn:aws:s3:::{@var.S3_bucket_name}",
                },
                Conditions = new[]
                {
                    new Aws.Iam.Inputs.GetPolicyDocumentStatementConditionInputArgs
                    {
                        Test = "StringLike",
                        Variable = "s3:prefix",
                        Values = new[]
                        {
                            "",
                            "home/",
                            "home/&{aws:username}/",
                        },
                    },
                },
            },
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Actions = new[]
                {
                    "s3:*",
                },
                Resources = new[]
                {
                    $"arn:aws:s3:::{@var.S3_bucket_name}/home/&{{aws:username}}",
                    $"arn:aws:s3:::{@var.S3_bucket_name}/home/&{{aws:username}}/*",
                },
            },
        },
    });

    var examplePolicy = new Aws.Iam.Policy("examplePolicy", new()
    {
        Path = "/",
        PolicyDocument = examplePolicyDocument.Apply(getPolicyDocumentResult => getPolicyDocumentResult.Json),
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		examplePolicyDocument, err := iam.GetPolicyDocument(ctx, &iam.GetPolicyDocumentArgs{
			Statements: []iam.GetPolicyDocumentStatement{
				iam.GetPolicyDocumentStatement{
					Sid: pulumi.StringRef("1"),
					Actions: []string{
						"s3:ListAllMyBuckets",
						"s3:GetBucketLocation",
					},
					Resources: []string{
						"arn:aws:s3:::*",
					},
				},
				iam.GetPolicyDocumentStatement{
					Actions: []string{
						"s3:ListBucket",
					},
					Resources: []string{
						fmt.Sprintf("arn:aws:s3:::%v", _var.S3_bucket_name),
					},
					Conditions: []iam.GetPolicyDocumentStatementCondition{
						iam.GetPolicyDocumentStatementCondition{
							Test:     "StringLike",
							Variable: "s3:prefix",
							Values: []string{
								"",
								"home/",
								"home/&{aws:username}/",
							},
						},
					},
				},
				iam.GetPolicyDocumentStatement{
					Actions: []string{
						"s3:*",
					},
					Resources: []string{
						fmt.Sprintf("arn:aws:s3:::%v/home/&{aws:username}", _var.S3_bucket_name),
						fmt.Sprintf("arn:aws:s3:::%v/home/&{aws:username}/*", _var.S3_bucket_name),
					},
				},
			},
		}, nil)
		if err != nil {
			return err
		}
		_, err = iam.NewPolicy(ctx, "examplePolicy", &iam.PolicyArgs{
			Path:   pulumi.String("/"),
			Policy: pulumi.String(examplePolicyDocument.Json),
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
import com.pulumi.aws.iam.Policy;
import com.pulumi.aws.iam.PolicyArgs;
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
        final var examplePolicyDocument = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .statements(            
                GetPolicyDocumentStatementArgs.builder()
                    .sid("1")
                    .actions(                    
                        "s3:ListAllMyBuckets",
                        "s3:GetBucketLocation")
                    .resources("arn:aws:s3:::*")
                    .build(),
                GetPolicyDocumentStatementArgs.builder()
                    .actions("s3:ListBucket")
                    .resources(String.format("arn:aws:s3:::%s", var_.s3_bucket_name()))
                    .conditions(GetPolicyDocumentStatementConditionArgs.builder()
                        .test("StringLike")
                        .variable("s3:prefix")
                        .values(                        
                            "",
                            "home/",
                            "home/&{aws:username}/")
                        .build())
                    .build(),
                GetPolicyDocumentStatementArgs.builder()
                    .actions("s3:*")
                    .resources(                    
                        String.format("arn:aws:s3:::%s/home/&{{aws:username}}", var_.s3_bucket_name()),
                        String.format("arn:aws:s3:::%s/home/&{{aws:username}}/*", var_.s3_bucket_name()))
                    .build())
            .build());

        var examplePolicy = new Policy("examplePolicy", PolicyArgs.builder()        
            .path("/")
            .policy(examplePolicyDocument.applyValue(getPolicyDocumentResult -> getPolicyDocumentResult.json()))
            .build());

    }
}
```
```yaml
resources:
  examplePolicy:
    type: aws:iam:Policy
    properties:
      path: /
      policy: ${examplePolicyDocument.json}
variables:
  examplePolicyDocument:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        statements:
          - sid: 1
            actions:
              - s3:ListAllMyBuckets
              - s3:GetBucketLocation
            resources:
              - arn:aws:s3:::*
          - actions:
              - s3:ListBucket
            resources:
              - arn:aws:s3:::${var.s3_bucket_name}
            conditions:
              - test: StringLike
                variable: s3:prefix
                values:
                  -
                  - home/
                  - home/&{aws:username}/
          - actions:
              - s3:*
            resources:
              - arn:aws:s3:::${var.s3_bucket_name}/home/&{aws:username}
              - arn:aws:s3:::${var.s3_bucket_name}/home/&{aws:username}/*
```
{{% /example %}}
{{% example %}}
### Example Multiple Condition Keys and Values

You can specify a [condition with multiple keys and values](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_multi-value-conditions.html) by supplying multiple `condition` blocks with the same `test` value, but differing `variable` and `values` values.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleMultipleConditionKeysAndValues = pulumi.output(aws.iam.getPolicyDocument({
    statements: [{
        actions: [
            "kms:Decrypt",
            "kms:GenerateDataKey",
        ],
        conditions: [
            {
                test: "ForAnyValue:StringEquals",
                values: ["pi"],
                variable: "kms:EncryptionContext:service",
            },
            {
                test: "ForAnyValue:StringEquals",
                values: ["rds"],
                variable: "kms:EncryptionContext:aws:pi:service",
            },
            {
                test: "ForAnyValue:StringEquals",
                values: [
                    "db-AAAAABBBBBCCCCCDDDDDEEEEE",
                    "db-EEEEEDDDDDCCCCCBBBBBAAAAA",
                ],
                variable: "kms:EncryptionContext:aws:rds:db-id",
            },
        ],
        resources: ["*"],
    }],
}));
```
```python
import pulumi
import pulumi_aws as aws

example_multiple_condition_keys_and_values = aws.iam.get_policy_document(statements=[aws.iam.GetPolicyDocumentStatementArgs(
    actions=[
        "kms:Decrypt",
        "kms:GenerateDataKey",
    ],
    conditions=[
        aws.iam.GetPolicyDocumentStatementConditionArgs(
            test="ForAnyValue:StringEquals",
            values=["pi"],
            variable="kms:EncryptionContext:service",
        ),
        aws.iam.GetPolicyDocumentStatementConditionArgs(
            test="ForAnyValue:StringEquals",
            values=["rds"],
            variable="kms:EncryptionContext:aws:pi:service",
        ),
        aws.iam.GetPolicyDocumentStatementConditionArgs(
            test="ForAnyValue:StringEquals",
            values=[
                "db-AAAAABBBBBCCCCCDDDDDEEEEE",
                "db-EEEEEDDDDDCCCCCBBBBBAAAAA",
            ],
            variable="kms:EncryptionContext:aws:rds:db-id",
        ),
    ],
    resources=["*"],
)])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleMultipleConditionKeysAndValues = Aws.Iam.GetPolicyDocument.Invoke(new()
    {
        Statements = new[]
        {
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Actions = new[]
                {
                    "kms:Decrypt",
                    "kms:GenerateDataKey",
                },
                Conditions = new[]
                {
                    new Aws.Iam.Inputs.GetPolicyDocumentStatementConditionInputArgs
                    {
                        Test = "ForAnyValue:StringEquals",
                        Values = new[]
                        {
                            "pi",
                        },
                        Variable = "kms:EncryptionContext:service",
                    },
                    new Aws.Iam.Inputs.GetPolicyDocumentStatementConditionInputArgs
                    {
                        Test = "ForAnyValue:StringEquals",
                        Values = new[]
                        {
                            "rds",
                        },
                        Variable = "kms:EncryptionContext:aws:pi:service",
                    },
                    new Aws.Iam.Inputs.GetPolicyDocumentStatementConditionInputArgs
                    {
                        Test = "ForAnyValue:StringEquals",
                        Values = new[]
                        {
                            "db-AAAAABBBBBCCCCCDDDDDEEEEE",
                            "db-EEEEEDDDDDCCCCCBBBBBAAAAA",
                        },
                        Variable = "kms:EncryptionContext:aws:rds:db-id",
                    },
                },
                Resources = new[]
                {
                    "*",
                },
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := iam.GetPolicyDocument(ctx, &iam.GetPolicyDocumentArgs{
			Statements: []iam.GetPolicyDocumentStatement{
				iam.GetPolicyDocumentStatement{
					Actions: []string{
						"kms:Decrypt",
						"kms:GenerateDataKey",
					},
					Conditions: []iam.GetPolicyDocumentStatementCondition{
						iam.GetPolicyDocumentStatementCondition{
							Test: "ForAnyValue:StringEquals",
							Values: []string{
								"pi",
							},
							Variable: "kms:EncryptionContext:service",
						},
						iam.GetPolicyDocumentStatementCondition{
							Test: "ForAnyValue:StringEquals",
							Values: []string{
								"rds",
							},
							Variable: "kms:EncryptionContext:aws:pi:service",
						},
						iam.GetPolicyDocumentStatementCondition{
							Test: "ForAnyValue:StringEquals",
							Values: []string{
								"db-AAAAABBBBBCCCCCDDDDDEEEEE",
								"db-EEEEEDDDDDCCCCCBBBBBAAAAA",
							},
							Variable: "kms:EncryptionContext:aws:rds:db-id",
						},
					},
					Resources: []string{
						"*",
					},
				},
			},
		}, nil)
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
        final var exampleMultipleConditionKeysAndValues = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .statements(GetPolicyDocumentStatementArgs.builder()
                .actions(                
                    "kms:Decrypt",
                    "kms:GenerateDataKey")
                .conditions(                
                    GetPolicyDocumentStatementConditionArgs.builder()
                        .test("ForAnyValue:StringEquals")
                        .values("pi")
                        .variable("kms:EncryptionContext:service")
                        .build(),
                    GetPolicyDocumentStatementConditionArgs.builder()
                        .test("ForAnyValue:StringEquals")
                        .values("rds")
                        .variable("kms:EncryptionContext:aws:pi:service")
                        .build(),
                    GetPolicyDocumentStatementConditionArgs.builder()
                        .test("ForAnyValue:StringEquals")
                        .values(                        
                            "db-AAAAABBBBBCCCCCDDDDDEEEEE",
                            "db-EEEEEDDDDDCCCCCBBBBBAAAAA")
                        .variable("kms:EncryptionContext:aws:rds:db-id")
                        .build())
                .resources("*")
                .build())
            .build());

    }
}
```
```yaml
variables:
  exampleMultipleConditionKeysAndValues:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        statements:
          - actions:
              - kms:Decrypt
              - kms:GenerateDataKey
            conditions:
              - test: ForAnyValue:StringEquals
                values:
                  - pi
                variable: kms:EncryptionContext:service
              - test: ForAnyValue:StringEquals
                values:
                  - rds
                variable: kms:EncryptionContext:aws:pi:service
              - test: ForAnyValue:StringEquals
                values:
                  - db-AAAAABBBBBCCCCCDDDDDEEEEE
                  - db-EEEEEDDDDDCCCCCBBBBBAAAAA
                variable: kms:EncryptionContext:aws:rds:db-id
            resources:
              - '*'
```

`data.aws_iam_policy_document.example_multiple_condition_keys_and_values.json` will evaluate to:

```typescript
import * as pulumi from "@pulumi/pulumi";
```
```python
import pulumi
```
```csharp
using System.Collections.Generic;
using Pulumi;

return await Deployment.RunAsync(() => 
{
});
```
```go
package main

import (
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		return nil
	})
}
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
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
    }
}
```
```yaml
{}
```
{{% /example %}}
{{% example %}}
### Example Assume-Role Policy with Multiple Principals

You can specify multiple principal blocks with different types. You can also use this data source to generate an assume-role policy.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const eventStreamBucketRoleAssumeRolePolicy = aws.iam.getPolicyDocument({
    statements: [{
        actions: ["sts:AssumeRole"],
        principals: [
            {
                type: "Service",
                identifiers: ["firehose.amazonaws.com"],
            },
            {
                type: "AWS",
                identifiers: [_var.trusted_role_arn],
            },
            {
                type: "Federated",
                identifiers: [
                    `arn:aws:iam::${_var.account_id}:saml-provider/${_var.provider_name}`,
                    "cognito-identity.amazonaws.com",
                ],
            },
        ],
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

event_stream_bucket_role_assume_role_policy = aws.iam.get_policy_document(statements=[aws.iam.GetPolicyDocumentStatementArgs(
    actions=["sts:AssumeRole"],
    principals=[
        aws.iam.GetPolicyDocumentStatementPrincipalArgs(
            type="Service",
            identifiers=["firehose.amazonaws.com"],
        ),
        aws.iam.GetPolicyDocumentStatementPrincipalArgs(
            type="AWS",
            identifiers=[var["trusted_role_arn"]],
        ),
        aws.iam.GetPolicyDocumentStatementPrincipalArgs(
            type="Federated",
            identifiers=[
                f"arn:aws:iam::{var['account_id']}:saml-provider/{var['provider_name']}",
                "cognito-identity.amazonaws.com",
            ],
        ),
    ],
)])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var eventStreamBucketRoleAssumeRolePolicy = Aws.Iam.GetPolicyDocument.Invoke(new()
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
                            "firehose.amazonaws.com",
                        },
                    },
                    new Aws.Iam.Inputs.GetPolicyDocumentStatementPrincipalInputArgs
                    {
                        Type = "AWS",
                        Identifiers = new[]
                        {
                            @var.Trusted_role_arn,
                        },
                    },
                    new Aws.Iam.Inputs.GetPolicyDocumentStatementPrincipalInputArgs
                    {
                        Type = "Federated",
                        Identifiers = new[]
                        {
                            $"arn:aws:iam::{@var.Account_id}:saml-provider/{@var.Provider_name}",
                            "cognito-identity.amazonaws.com",
                        },
                    },
                },
            },
        },
    });

});
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.iam.IamFunctions;
import com.pulumi.aws.iam.inputs.GetPolicyDocumentArgs;
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
        final var eventStreamBucketRoleAssumeRolePolicy = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .statements(GetPolicyDocumentStatementArgs.builder()
                .actions("sts:AssumeRole")
                .principals(                
                    GetPolicyDocumentStatementPrincipalArgs.builder()
                        .type("Service")
                        .identifiers("firehose.amazonaws.com")
                        .build(),
                    GetPolicyDocumentStatementPrincipalArgs.builder()
                        .type("AWS")
                        .identifiers(var_.trusted_role_arn())
                        .build(),
                    GetPolicyDocumentStatementPrincipalArgs.builder()
                        .type("Federated")
                        .identifiers(                        
                            String.format("arn:aws:iam::%s:saml-provider/%s", var_.account_id(),var_.provider_name()),
                            "cognito-identity.amazonaws.com")
                        .build())
                .build())
            .build());

    }
}
```
```yaml
variables:
  eventStreamBucketRoleAssumeRolePolicy:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        statements:
          - actions:
              - sts:AssumeRole
            principals:
              - type: Service
                identifiers:
                  - firehose.amazonaws.com
              - type: AWS
                identifiers:
                  - ${var.trusted_role_arn}
              - type: Federated
                identifiers:
                  - arn:aws:iam::${var.account_id}:saml-provider/${var.provider_name}
                  - cognito-identity.amazonaws.com
```
{{% /example %}}
{{% example %}}
### Example Using A Source Document

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const source = aws.iam.getPolicyDocument({
    statements: [
        {
            actions: ["ec2:*"],
            resources: ["*"],
        },
        {
            sid: "SidToOverride",
            actions: ["s3:*"],
            resources: ["*"],
        },
    ],
});
const sourceDocumentExample = source.then(source => aws.iam.getPolicyDocument({
    sourcePolicyDocuments: [source.json],
    statements: [{
        sid: "SidToOverride",
        actions: ["s3:*"],
        resources: [
            "arn:aws:s3:::somebucket",
            "arn:aws:s3:::somebucket/*",
        ],
    }],
}));
```
```python
import pulumi
import pulumi_aws as aws

source = aws.iam.get_policy_document(statements=[
    aws.iam.GetPolicyDocumentStatementArgs(
        actions=["ec2:*"],
        resources=["*"],
    ),
    aws.iam.GetPolicyDocumentStatementArgs(
        sid="SidToOverride",
        actions=["s3:*"],
        resources=["*"],
    ),
])
source_document_example = aws.iam.get_policy_document(source_policy_documents=[source.json],
    statements=[aws.iam.GetPolicyDocumentStatementArgs(
        sid="SidToOverride",
        actions=["s3:*"],
        resources=[
            "arn:aws:s3:::somebucket",
            "arn:aws:s3:::somebucket/*",
        ],
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var source = Aws.Iam.GetPolicyDocument.Invoke(new()
    {
        Statements = new[]
        {
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Actions = new[]
                {
                    "ec2:*",
                },
                Resources = new[]
                {
                    "*",
                },
            },
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Sid = "SidToOverride",
                Actions = new[]
                {
                    "s3:*",
                },
                Resources = new[]
                {
                    "*",
                },
            },
        },
    });

    var sourceDocumentExample = Aws.Iam.GetPolicyDocument.Invoke(new()
    {
        SourcePolicyDocuments = new[]
        {
            source.Apply(getPolicyDocumentResult => getPolicyDocumentResult.Json),
        },
        Statements = new[]
        {
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Sid = "SidToOverride",
                Actions = new[]
                {
                    "s3:*",
                },
                Resources = new[]
                {
                    "arn:aws:s3:::somebucket",
                    "arn:aws:s3:::somebucket/*",
                },
            },
        },
    });

});
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.iam.IamFunctions;
import com.pulumi.aws.iam.inputs.GetPolicyDocumentArgs;
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
        final var source = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .statements(            
                GetPolicyDocumentStatementArgs.builder()
                    .actions("ec2:*")
                    .resources("*")
                    .build(),
                GetPolicyDocumentStatementArgs.builder()
                    .sid("SidToOverride")
                    .actions("s3:*")
                    .resources("*")
                    .build())
            .build());

        final var sourceDocumentExample = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .sourcePolicyDocuments(source.applyValue(getPolicyDocumentResult -> getPolicyDocumentResult.json()))
            .statements(GetPolicyDocumentStatementArgs.builder()
                .sid("SidToOverride")
                .actions("s3:*")
                .resources(                
                    "arn:aws:s3:::somebucket",
                    "arn:aws:s3:::somebucket/*")
                .build())
            .build());

    }
}
```
```yaml
variables:
  source:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        statements:
          - actions:
              - ec2:*
            resources:
              - '*'
          - sid: SidToOverride
            actions:
              - s3:*
            resources:
              - '*'
  sourceDocumentExample:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        sourcePolicyDocuments:
          - ${source.json}
        statements:
          - sid: SidToOverride
            actions:
              - s3:*
            resources:
              - arn:aws:s3:::somebucket
              - arn:aws:s3:::somebucket/*
```

`data.aws_iam_policy_document.source_document_example.json` will evaluate to:

```typescript
import * as pulumi from "@pulumi/pulumi";
```
```python
import pulumi
```
```csharp
using System.Collections.Generic;
using Pulumi;

return await Deployment.RunAsync(() => 
{
});
```
```go
package main

import (
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		return nil
	})
}
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
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
    }
}
```
```yaml
{}
```
{{% /example %}}
{{% example %}}
### Example Using An Override Document

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const override = aws.iam.getPolicyDocument({
    statements: [{
        sid: "SidToOverride",
        actions: ["s3:*"],
        resources: ["*"],
    }],
});
const overridePolicyDocumentExample = override.then(override => aws.iam.getPolicyDocument({
    overridePolicyDocuments: [override.json],
    statements: [
        {
            actions: ["ec2:*"],
            resources: ["*"],
        },
        {
            sid: "SidToOverride",
            actions: ["s3:*"],
            resources: [
                "arn:aws:s3:::somebucket",
                "arn:aws:s3:::somebucket/*",
            ],
        },
    ],
}));
```
```python
import pulumi
import pulumi_aws as aws

override = aws.iam.get_policy_document(statements=[aws.iam.GetPolicyDocumentStatementArgs(
    sid="SidToOverride",
    actions=["s3:*"],
    resources=["*"],
)])
override_policy_document_example = aws.iam.get_policy_document(override_policy_documents=[override.json],
    statements=[
        aws.iam.GetPolicyDocumentStatementArgs(
            actions=["ec2:*"],
            resources=["*"],
        ),
        aws.iam.GetPolicyDocumentStatementArgs(
            sid="SidToOverride",
            actions=["s3:*"],
            resources=[
                "arn:aws:s3:::somebucket",
                "arn:aws:s3:::somebucket/*",
            ],
        ),
    ])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var @override = Aws.Iam.GetPolicyDocument.Invoke(new()
    {
        Statements = new[]
        {
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Sid = "SidToOverride",
                Actions = new[]
                {
                    "s3:*",
                },
                Resources = new[]
                {
                    "*",
                },
            },
        },
    });

    var overridePolicyDocumentExample = Aws.Iam.GetPolicyDocument.Invoke(new()
    {
        OverridePolicyDocuments = new[]
        {
            @override.Apply(getPolicyDocumentResult => getPolicyDocumentResult.Json),
        },
        Statements = new[]
        {
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Actions = new[]
                {
                    "ec2:*",
                },
                Resources = new[]
                {
                    "*",
                },
            },
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Sid = "SidToOverride",
                Actions = new[]
                {
                    "s3:*",
                },
                Resources = new[]
                {
                    "arn:aws:s3:::somebucket",
                    "arn:aws:s3:::somebucket/*",
                },
            },
        },
    });

});
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.iam.IamFunctions;
import com.pulumi.aws.iam.inputs.GetPolicyDocumentArgs;
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
        final var override = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .statements(GetPolicyDocumentStatementArgs.builder()
                .sid("SidToOverride")
                .actions("s3:*")
                .resources("*")
                .build())
            .build());

        final var overridePolicyDocumentExample = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .overridePolicyDocuments(override.applyValue(getPolicyDocumentResult -> getPolicyDocumentResult.json()))
            .statements(            
                GetPolicyDocumentStatementArgs.builder()
                    .actions("ec2:*")
                    .resources("*")
                    .build(),
                GetPolicyDocumentStatementArgs.builder()
                    .sid("SidToOverride")
                    .actions("s3:*")
                    .resources(                    
                        "arn:aws:s3:::somebucket",
                        "arn:aws:s3:::somebucket/*")
                    .build())
            .build());

    }
}
```
```yaml
variables:
  override:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        statements:
          - sid: SidToOverride
            actions:
              - s3:*
            resources:
              - '*'
  overridePolicyDocumentExample:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        overridePolicyDocuments:
          - ${override.json}
        statements:
          - actions:
              - ec2:*
            resources:
              - '*'
          - sid: SidToOverride
            actions:
              - s3:*
            resources:
              - arn:aws:s3:::somebucket
              - arn:aws:s3:::somebucket/*
```

`data.aws_iam_policy_document.override_policy_document_example.json` will evaluate to:

```typescript
import * as pulumi from "@pulumi/pulumi";
```
```python
import pulumi
```
```csharp
using System.Collections.Generic;
using Pulumi;

return await Deployment.RunAsync(() => 
{
});
```
```go
package main

import (
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		return nil
	})
}
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
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
    }
}
```
```yaml
{}
```
{{% /example %}}
{{% example %}}
### Example with Both Source and Override Documents

You can also combine `source_policy_documents` and `override_policy_documents` in the same document.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const source = aws.iam.getPolicyDocument({
    statements: [{
        sid: "OverridePlaceholder",
        actions: ["ec2:DescribeAccountAttributes"],
        resources: ["*"],
    }],
});
const override = aws.iam.getPolicyDocument({
    statements: [{
        sid: "OverridePlaceholder",
        actions: ["s3:GetObject"],
        resources: ["*"],
    }],
});
const politik = Promise.all([source, override]).then(([source, override]) => aws.iam.getPolicyDocument({
    sourcePolicyDocuments: [source.json],
    overridePolicyDocuments: [override.json],
}));
```
```python
import pulumi
import pulumi_aws as aws

source = aws.iam.get_policy_document(statements=[aws.iam.GetPolicyDocumentStatementArgs(
    sid="OverridePlaceholder",
    actions=["ec2:DescribeAccountAttributes"],
    resources=["*"],
)])
override = aws.iam.get_policy_document(statements=[aws.iam.GetPolicyDocumentStatementArgs(
    sid="OverridePlaceholder",
    actions=["s3:GetObject"],
    resources=["*"],
)])
politik = aws.iam.get_policy_document(source_policy_documents=[source.json],
    override_policy_documents=[override.json])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var source = Aws.Iam.GetPolicyDocument.Invoke(new()
    {
        Statements = new[]
        {
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Sid = "OverridePlaceholder",
                Actions = new[]
                {
                    "ec2:DescribeAccountAttributes",
                },
                Resources = new[]
                {
                    "*",
                },
            },
        },
    });

    var @override = Aws.Iam.GetPolicyDocument.Invoke(new()
    {
        Statements = new[]
        {
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Sid = "OverridePlaceholder",
                Actions = new[]
                {
                    "s3:GetObject",
                },
                Resources = new[]
                {
                    "*",
                },
            },
        },
    });

    var politik = Aws.Iam.GetPolicyDocument.Invoke(new()
    {
        SourcePolicyDocuments = new[]
        {
            source.Apply(getPolicyDocumentResult => getPolicyDocumentResult.Json),
        },
        OverridePolicyDocuments = new[]
        {
            @override.Apply(getPolicyDocumentResult => getPolicyDocumentResult.Json),
        },
    });

});
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.iam.IamFunctions;
import com.pulumi.aws.iam.inputs.GetPolicyDocumentArgs;
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
        final var source = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .statements(GetPolicyDocumentStatementArgs.builder()
                .sid("OverridePlaceholder")
                .actions("ec2:DescribeAccountAttributes")
                .resources("*")
                .build())
            .build());

        final var override = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .statements(GetPolicyDocumentStatementArgs.builder()
                .sid("OverridePlaceholder")
                .actions("s3:GetObject")
                .resources("*")
                .build())
            .build());

        final var politik = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .sourcePolicyDocuments(source.applyValue(getPolicyDocumentResult -> getPolicyDocumentResult.json()))
            .overridePolicyDocuments(override.applyValue(getPolicyDocumentResult -> getPolicyDocumentResult.json()))
            .build());

    }
}
```
```yaml
variables:
  source:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        statements:
          - sid: OverridePlaceholder
            actions:
              - ec2:DescribeAccountAttributes
            resources:
              - '*'
  override:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        statements:
          - sid: OverridePlaceholder
            actions:
              - s3:GetObject
            resources:
              - '*'
  politik:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        sourcePolicyDocuments:
          - ${source.json}
        overridePolicyDocuments:
          - ${override.json}
```

`data.aws_iam_policy_document.politik.json` will evaluate to:

```typescript
import * as pulumi from "@pulumi/pulumi";
```
```python
import pulumi
```
```csharp
using System.Collections.Generic;
using Pulumi;

return await Deployment.RunAsync(() => 
{
});
```
```go
package main

import (
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		return nil
	})
}
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
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
    }
}
```
```yaml
{}
```
{{% /example %}}
{{% example %}}
### Example of Merging Source Documents

Multiple documents can be combined using the `source_policy_documents` or `override_policy_documents` attributes. `source_policy_documents` requires that all documents have unique Sids, while `override_policy_documents` will iteratively override matching Sids.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const sourceOne = aws.iam.getPolicyDocument({
    statements: [
        {
            actions: ["ec2:*"],
            resources: ["*"],
        },
        {
            sid: "UniqueSidOne",
            actions: ["s3:*"],
            resources: ["*"],
        },
    ],
});
const sourceTwo = aws.iam.getPolicyDocument({
    statements: [
        {
            sid: "UniqueSidTwo",
            actions: ["iam:*"],
            resources: ["*"],
        },
        {
            actions: ["lambda:*"],
            resources: ["*"],
        },
    ],
});
const combined = Promise.all([sourceOne, sourceTwo]).then(([sourceOne, sourceTwo]) => aws.iam.getPolicyDocument({
    sourcePolicyDocuments: [
        sourceOne.json,
        sourceTwo.json,
    ],
}));
```
```python
import pulumi
import pulumi_aws as aws

source_one = aws.iam.get_policy_document(statements=[
    aws.iam.GetPolicyDocumentStatementArgs(
        actions=["ec2:*"],
        resources=["*"],
    ),
    aws.iam.GetPolicyDocumentStatementArgs(
        sid="UniqueSidOne",
        actions=["s3:*"],
        resources=["*"],
    ),
])
source_two = aws.iam.get_policy_document(statements=[
    aws.iam.GetPolicyDocumentStatementArgs(
        sid="UniqueSidTwo",
        actions=["iam:*"],
        resources=["*"],
    ),
    aws.iam.GetPolicyDocumentStatementArgs(
        actions=["lambda:*"],
        resources=["*"],
    ),
])
combined = aws.iam.get_policy_document(source_policy_documents=[
    source_one.json,
    source_two.json,
])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var sourceOne = Aws.Iam.GetPolicyDocument.Invoke(new()
    {
        Statements = new[]
        {
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Actions = new[]
                {
                    "ec2:*",
                },
                Resources = new[]
                {
                    "*",
                },
            },
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Sid = "UniqueSidOne",
                Actions = new[]
                {
                    "s3:*",
                },
                Resources = new[]
                {
                    "*",
                },
            },
        },
    });

    var sourceTwo = Aws.Iam.GetPolicyDocument.Invoke(new()
    {
        Statements = new[]
        {
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Sid = "UniqueSidTwo",
                Actions = new[]
                {
                    "iam:*",
                },
                Resources = new[]
                {
                    "*",
                },
            },
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Actions = new[]
                {
                    "lambda:*",
                },
                Resources = new[]
                {
                    "*",
                },
            },
        },
    });

    var combined = Aws.Iam.GetPolicyDocument.Invoke(new()
    {
        SourcePolicyDocuments = new[]
        {
            sourceOne.Apply(getPolicyDocumentResult => getPolicyDocumentResult.Json),
            sourceTwo.Apply(getPolicyDocumentResult => getPolicyDocumentResult.Json),
        },
    });

});
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.iam.IamFunctions;
import com.pulumi.aws.iam.inputs.GetPolicyDocumentArgs;
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
        final var sourceOne = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .statements(            
                GetPolicyDocumentStatementArgs.builder()
                    .actions("ec2:*")
                    .resources("*")
                    .build(),
                GetPolicyDocumentStatementArgs.builder()
                    .sid("UniqueSidOne")
                    .actions("s3:*")
                    .resources("*")
                    .build())
            .build());

        final var sourceTwo = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .statements(            
                GetPolicyDocumentStatementArgs.builder()
                    .sid("UniqueSidTwo")
                    .actions("iam:*")
                    .resources("*")
                    .build(),
                GetPolicyDocumentStatementArgs.builder()
                    .actions("lambda:*")
                    .resources("*")
                    .build())
            .build());

        final var combined = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .sourcePolicyDocuments(            
                sourceOne.applyValue(getPolicyDocumentResult -> getPolicyDocumentResult.json()),
                sourceTwo.applyValue(getPolicyDocumentResult -> getPolicyDocumentResult.json()))
            .build());

    }
}
```
```yaml
variables:
  sourceOne:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        statements:
          - actions:
              - ec2:*
            resources:
              - '*'
          - sid: UniqueSidOne
            actions:
              - s3:*
            resources:
              - '*'
  sourceTwo:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        statements:
          - sid: UniqueSidTwo
            actions:
              - iam:*
            resources:
              - '*'
          - actions:
              - lambda:*
            resources:
              - '*'
  combined:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        sourcePolicyDocuments:
          - ${sourceOne.json}
          - ${sourceTwo.json}
```

`data.aws_iam_policy_document.combined.json` will evaluate to:

```typescript
import * as pulumi from "@pulumi/pulumi";
```
```python
import pulumi
```
```csharp
using System.Collections.Generic;
using Pulumi;

return await Deployment.RunAsync(() => 
{
});
```
```go
package main

import (
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		return nil
	})
}
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
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
    }
}
```
```yaml
{}
```
{{% /example %}}
{{% example %}}
### Example of Merging Override Documents

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const policyOne = aws.iam.getPolicyDocument({
    statements: [{
        sid: "OverridePlaceHolderOne",
        effect: "Allow",
        actions: ["s3:*"],
        resources: ["*"],
    }],
});
const policyTwo = aws.iam.getPolicyDocument({
    statements: [
        {
            effect: "Allow",
            actions: ["ec2:*"],
            resources: ["*"],
        },
        {
            sid: "OverridePlaceHolderTwo",
            effect: "Allow",
            actions: ["iam:*"],
            resources: ["*"],
        },
    ],
});
const policyThree = aws.iam.getPolicyDocument({
    statements: [{
        sid: "OverridePlaceHolderOne",
        effect: "Deny",
        actions: ["logs:*"],
        resources: ["*"],
    }],
});
const combined = Promise.all([policyOne, policyTwo, policyThree]).then(([policyOne, policyTwo, policyThree]) => aws.iam.getPolicyDocument({
    overridePolicyDocuments: [
        policyOne.json,
        policyTwo.json,
        policyThree.json,
    ],
    statements: [{
        sid: "OverridePlaceHolderTwo",
        effect: "Deny",
        actions: ["*"],
        resources: ["*"],
    }],
}));
```
```python
import pulumi
import pulumi_aws as aws

policy_one = aws.iam.get_policy_document(statements=[aws.iam.GetPolicyDocumentStatementArgs(
    sid="OverridePlaceHolderOne",
    effect="Allow",
    actions=["s3:*"],
    resources=["*"],
)])
policy_two = aws.iam.get_policy_document(statements=[
    aws.iam.GetPolicyDocumentStatementArgs(
        effect="Allow",
        actions=["ec2:*"],
        resources=["*"],
    ),
    aws.iam.GetPolicyDocumentStatementArgs(
        sid="OverridePlaceHolderTwo",
        effect="Allow",
        actions=["iam:*"],
        resources=["*"],
    ),
])
policy_three = aws.iam.get_policy_document(statements=[aws.iam.GetPolicyDocumentStatementArgs(
    sid="OverridePlaceHolderOne",
    effect="Deny",
    actions=["logs:*"],
    resources=["*"],
)])
combined = aws.iam.get_policy_document(override_policy_documents=[
        policy_one.json,
        policy_two.json,
        policy_three.json,
    ],
    statements=[aws.iam.GetPolicyDocumentStatementArgs(
        sid="OverridePlaceHolderTwo",
        effect="Deny",
        actions=["*"],
        resources=["*"],
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var policyOne = Aws.Iam.GetPolicyDocument.Invoke(new()
    {
        Statements = new[]
        {
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Sid = "OverridePlaceHolderOne",
                Effect = "Allow",
                Actions = new[]
                {
                    "s3:*",
                },
                Resources = new[]
                {
                    "*",
                },
            },
        },
    });

    var policyTwo = Aws.Iam.GetPolicyDocument.Invoke(new()
    {
        Statements = new[]
        {
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Effect = "Allow",
                Actions = new[]
                {
                    "ec2:*",
                },
                Resources = new[]
                {
                    "*",
                },
            },
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Sid = "OverridePlaceHolderTwo",
                Effect = "Allow",
                Actions = new[]
                {
                    "iam:*",
                },
                Resources = new[]
                {
                    "*",
                },
            },
        },
    });

    var policyThree = Aws.Iam.GetPolicyDocument.Invoke(new()
    {
        Statements = new[]
        {
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Sid = "OverridePlaceHolderOne",
                Effect = "Deny",
                Actions = new[]
                {
                    "logs:*",
                },
                Resources = new[]
                {
                    "*",
                },
            },
        },
    });

    var combined = Aws.Iam.GetPolicyDocument.Invoke(new()
    {
        OverridePolicyDocuments = new[]
        {
            policyOne.Apply(getPolicyDocumentResult => getPolicyDocumentResult.Json),
            policyTwo.Apply(getPolicyDocumentResult => getPolicyDocumentResult.Json),
            policyThree.Apply(getPolicyDocumentResult => getPolicyDocumentResult.Json),
        },
        Statements = new[]
        {
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Sid = "OverridePlaceHolderTwo",
                Effect = "Deny",
                Actions = new[]
                {
                    "*",
                },
                Resources = new[]
                {
                    "*",
                },
            },
        },
    });

});
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.iam.IamFunctions;
import com.pulumi.aws.iam.inputs.GetPolicyDocumentArgs;
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
        final var policyOne = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .statements(GetPolicyDocumentStatementArgs.builder()
                .sid("OverridePlaceHolderOne")
                .effect("Allow")
                .actions("s3:*")
                .resources("*")
                .build())
            .build());

        final var policyTwo = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .statements(            
                GetPolicyDocumentStatementArgs.builder()
                    .effect("Allow")
                    .actions("ec2:*")
                    .resources("*")
                    .build(),
                GetPolicyDocumentStatementArgs.builder()
                    .sid("OverridePlaceHolderTwo")
                    .effect("Allow")
                    .actions("iam:*")
                    .resources("*")
                    .build())
            .build());

        final var policyThree = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .statements(GetPolicyDocumentStatementArgs.builder()
                .sid("OverridePlaceHolderOne")
                .effect("Deny")
                .actions("logs:*")
                .resources("*")
                .build())
            .build());

        final var combined = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .overridePolicyDocuments(            
                policyOne.applyValue(getPolicyDocumentResult -> getPolicyDocumentResult.json()),
                policyTwo.applyValue(getPolicyDocumentResult -> getPolicyDocumentResult.json()),
                policyThree.applyValue(getPolicyDocumentResult -> getPolicyDocumentResult.json()))
            .statements(GetPolicyDocumentStatementArgs.builder()
                .sid("OverridePlaceHolderTwo")
                .effect("Deny")
                .actions("*")
                .resources("*")
                .build())
            .build());

    }
}
```
```yaml
variables:
  policyOne:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        statements:
          - sid: OverridePlaceHolderOne
            effect: Allow
            actions:
              - s3:*
            resources:
              - '*'
  policyTwo:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        statements:
          - effect: Allow
            actions:
              - ec2:*
            resources:
              - '*'
          - sid: OverridePlaceHolderTwo
            effect: Allow
            actions:
              - iam:*
            resources:
              - '*'
  policyThree:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        statements:
          - sid: OverridePlaceHolderOne
            effect: Deny
            actions:
              - logs:*
            resources:
              - '*'
  combined:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        overridePolicyDocuments:
          - ${policyOne.json}
          - ${policyTwo.json}
          - ${policyThree.json}
        statements:
          - sid: OverridePlaceHolderTwo
            effect: Deny
            actions:
              - '*'
            resources:
              - '*'
```

`data.aws_iam_policy_document.combined.json` will evaluate to:

```typescript
import * as pulumi from "@pulumi/pulumi";
```
```python
import pulumi
```
```csharp
using System.Collections.Generic;
using Pulumi;

return await Deployment.RunAsync(() => 
{
});
```
```go
package main

import (
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		return nil
	})
}
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
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
    }
}
```
```yaml
{}
```
{{% /example %}}
{{% /examples %}}
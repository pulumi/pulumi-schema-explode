Provides an AWS Cognito Identity Pool Roles Attachment.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const mainIdentityPool = new aws.cognito.IdentityPool("mainIdentityPool", {
    identityPoolName: "identity pool",
    allowUnauthenticatedIdentities: false,
    supportedLoginProviders: {
        "graph.facebook.com": "7346241598935555",
    },
});
const authenticatedRole = new aws.iam.Role("authenticatedRole", {assumeRolePolicy: pulumi.interpolate`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "cognito-identity.amazonaws.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": "${mainIdentityPool.id}"
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "authenticated"
        }
      }
    }
  ]
}
`});
const authenticatedRolePolicy = new aws.iam.RolePolicy("authenticatedRolePolicy", {
    role: authenticatedRole.id,
    policy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "mobileanalytics:PutEvents",
        "cognito-sync:*",
        "cognito-identity:*"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
`,
});
const mainIdentityPoolRoleAttachment = new aws.cognito.IdentityPoolRoleAttachment("mainIdentityPoolRoleAttachment", {
    identityPoolId: mainIdentityPool.id,
    roleMappings: [{
        identityProvider: "graph.facebook.com",
        ambiguousRoleResolution: "AuthenticatedRole",
        type: "Rules",
        mappingRules: [{
            claim: "isAdmin",
            matchType: "Equals",
            roleArn: authenticatedRole.arn,
            value: "paid",
        }],
    }],
    roles: {
        authenticated: authenticatedRole.arn,
    },
});
```
```python
import pulumi
import pulumi_aws as aws

main_identity_pool = aws.cognito.IdentityPool("mainIdentityPool",
    identity_pool_name="identity pool",
    allow_unauthenticated_identities=False,
    supported_login_providers={
        "graph.facebook.com": "7346241598935555",
    })
authenticated_role = aws.iam.Role("authenticatedRole", assume_role_policy=main_identity_pool.id.apply(lambda id: f"""{{
  "Version": "2012-10-17",
  "Statement": [
    {{
      "Effect": "Allow",
      "Principal": {{
        "Federated": "cognito-identity.amazonaws.com"
      }},
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {{
        "StringEquals": {{
          "cognito-identity.amazonaws.com:aud": "{id}"
        }},
        "ForAnyValue:StringLike": {{
          "cognito-identity.amazonaws.com:amr": "authenticated"
        }}
      }}
    }}
  ]
}}
"""))
authenticated_role_policy = aws.iam.RolePolicy("authenticatedRolePolicy",
    role=authenticated_role.id,
    policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "mobileanalytics:PutEvents",
        "cognito-sync:*",
        "cognito-identity:*"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
""")
main_identity_pool_role_attachment = aws.cognito.IdentityPoolRoleAttachment("mainIdentityPoolRoleAttachment",
    identity_pool_id=main_identity_pool.id,
    role_mappings=[aws.cognito.IdentityPoolRoleAttachmentRoleMappingArgs(
        identity_provider="graph.facebook.com",
        ambiguous_role_resolution="AuthenticatedRole",
        type="Rules",
        mapping_rules=[aws.cognito.IdentityPoolRoleAttachmentRoleMappingMappingRuleArgs(
            claim="isAdmin",
            match_type="Equals",
            role_arn=authenticated_role.arn,
            value="paid",
        )],
    )],
    roles={
        "authenticated": authenticated_role.arn,
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var mainIdentityPool = new Aws.Cognito.IdentityPool("mainIdentityPool", new()
    {
        IdentityPoolName = "identity pool",
        AllowUnauthenticatedIdentities = false,
        SupportedLoginProviders = 
        {
            { "graph.facebook.com", "7346241598935555" },
        },
    });

    var authenticatedRole = new Aws.Iam.Role("authenticatedRole", new()
    {
        AssumeRolePolicy = mainIdentityPool.Id.Apply(id => @$"{{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {{
      ""Effect"": ""Allow"",
      ""Principal"": {{
        ""Federated"": ""cognito-identity.amazonaws.com""
      }},
      ""Action"": ""sts:AssumeRoleWithWebIdentity"",
      ""Condition"": {{
        ""StringEquals"": {{
          ""cognito-identity.amazonaws.com:aud"": ""{id}""
        }},
        ""ForAnyValue:StringLike"": {{
          ""cognito-identity.amazonaws.com:amr"": ""authenticated""
        }}
      }}
    }}
  ]
}}
"),
    });

    var authenticatedRolePolicy = new Aws.Iam.RolePolicy("authenticatedRolePolicy", new()
    {
        Role = authenticatedRole.Id,
        Policy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Effect"": ""Allow"",
      ""Action"": [
        ""mobileanalytics:PutEvents"",
        ""cognito-sync:*"",
        ""cognito-identity:*""
      ],
      ""Resource"": [
        ""*""
      ]
    }
  ]
}
",
    });

    var mainIdentityPoolRoleAttachment = new Aws.Cognito.IdentityPoolRoleAttachment("mainIdentityPoolRoleAttachment", new()
    {
        IdentityPoolId = mainIdentityPool.Id,
        RoleMappings = new[]
        {
            new Aws.Cognito.Inputs.IdentityPoolRoleAttachmentRoleMappingArgs
            {
                IdentityProvider = "graph.facebook.com",
                AmbiguousRoleResolution = "AuthenticatedRole",
                Type = "Rules",
                MappingRules = new[]
                {
                    new Aws.Cognito.Inputs.IdentityPoolRoleAttachmentRoleMappingMappingRuleArgs
                    {
                        Claim = "isAdmin",
                        MatchType = "Equals",
                        RoleArn = authenticatedRole.Arn,
                        Value = "paid",
                    },
                },
            },
        },
        Roles = 
        {
            { "authenticated", authenticatedRole.Arn },
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/cognito"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		mainIdentityPool, err := cognito.NewIdentityPool(ctx, "mainIdentityPool", &cognito.IdentityPoolArgs{
			IdentityPoolName:               pulumi.String("identity pool"),
			AllowUnauthenticatedIdentities: pulumi.Bool(false),
			SupportedLoginProviders: pulumi.StringMap{
				"graph.facebook.com": pulumi.String("7346241598935555"),
			},
		})
		if err != nil {
			return err
		}
		authenticatedRole, err := iam.NewRole(ctx, "authenticatedRole", &iam.RoleArgs{
			AssumeRolePolicy: mainIdentityPool.ID().ApplyT(func(id string) (string, error) {
				return fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "cognito-identity.amazonaws.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": "%v"
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "authenticated"
        }
      }
    }
  ]
}
`, id), nil
			}).(pulumi.StringOutput),
		})
		if err != nil {
			return err
		}
		_, err = iam.NewRolePolicy(ctx, "authenticatedRolePolicy", &iam.RolePolicyArgs{
			Role: authenticatedRole.ID(),
			Policy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "mobileanalytics:PutEvents",
        "cognito-sync:*",
        "cognito-identity:*"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
`)),
		})
		if err != nil {
			return err
		}
		_, err = cognito.NewIdentityPoolRoleAttachment(ctx, "mainIdentityPoolRoleAttachment", &cognito.IdentityPoolRoleAttachmentArgs{
			IdentityPoolId: mainIdentityPool.ID(),
			RoleMappings: cognito.IdentityPoolRoleAttachmentRoleMappingArray{
				&cognito.IdentityPoolRoleAttachmentRoleMappingArgs{
					IdentityProvider:        pulumi.String("graph.facebook.com"),
					AmbiguousRoleResolution: pulumi.String("AuthenticatedRole"),
					Type:                    pulumi.String("Rules"),
					MappingRules: cognito.IdentityPoolRoleAttachmentRoleMappingMappingRuleArray{
						&cognito.IdentityPoolRoleAttachmentRoleMappingMappingRuleArgs{
							Claim:     pulumi.String("isAdmin"),
							MatchType: pulumi.String("Equals"),
							RoleArn:   authenticatedRole.Arn,
							Value:     pulumi.String("paid"),
						},
					},
				},
			},
			Roles: pulumi.StringMap{
				"authenticated": authenticatedRole.Arn,
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
import com.pulumi.aws.cognito.IdentityPool;
import com.pulumi.aws.cognito.IdentityPoolArgs;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.iam.RolePolicy;
import com.pulumi.aws.iam.RolePolicyArgs;
import com.pulumi.aws.cognito.IdentityPoolRoleAttachment;
import com.pulumi.aws.cognito.IdentityPoolRoleAttachmentArgs;
import com.pulumi.aws.cognito.inputs.IdentityPoolRoleAttachmentRoleMappingArgs;
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
        var mainIdentityPool = new IdentityPool("mainIdentityPool", IdentityPoolArgs.builder()        
            .identityPoolName("identity pool")
            .allowUnauthenticatedIdentities(false)
            .supportedLoginProviders(Map.of("graph.facebook.com", "7346241598935555"))
            .build());

        var authenticatedRole = new Role("authenticatedRole", RoleArgs.builder()        
            .assumeRolePolicy(mainIdentityPool.id().applyValue(id -> """
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "cognito-identity.amazonaws.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": "%s"
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "authenticated"
        }
      }
    }
  ]
}
", id)))
            .build());

        var authenticatedRolePolicy = new RolePolicy("authenticatedRolePolicy", RolePolicyArgs.builder()        
            .role(authenticatedRole.id())
            .policy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "mobileanalytics:PutEvents",
        "cognito-sync:*",
        "cognito-identity:*"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
            """)
            .build());

        var mainIdentityPoolRoleAttachment = new IdentityPoolRoleAttachment("mainIdentityPoolRoleAttachment", IdentityPoolRoleAttachmentArgs.builder()        
            .identityPoolId(mainIdentityPool.id())
            .roleMappings(IdentityPoolRoleAttachmentRoleMappingArgs.builder()
                .identityProvider("graph.facebook.com")
                .ambiguousRoleResolution("AuthenticatedRole")
                .type("Rules")
                .mappingRules(IdentityPoolRoleAttachmentRoleMappingMappingRuleArgs.builder()
                    .claim("isAdmin")
                    .matchType("Equals")
                    .roleArn(authenticatedRole.arn())
                    .value("paid")
                    .build())
                .build())
            .roles(Map.of("authenticated", authenticatedRole.arn()))
            .build());

    }
}
```
```yaml
resources:
  mainIdentityPool:
    type: aws:cognito:IdentityPool
    properties:
      identityPoolName: identity pool
      allowUnauthenticatedIdentities: false
      supportedLoginProviders:
        graph.facebook.com: 7346241598935555
  authenticatedRole:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "Federated": "cognito-identity.amazonaws.com"
              },
              "Action": "sts:AssumeRoleWithWebIdentity",
              "Condition": {
                "StringEquals": {
                  "cognito-identity.amazonaws.com:aud": "${mainIdentityPool.id}"
                },
                "ForAnyValue:StringLike": {
                  "cognito-identity.amazonaws.com:amr": "authenticated"
                }
              }
            }
          ]
        }
  authenticatedRolePolicy:
    type: aws:iam:RolePolicy
    properties:
      role: ${authenticatedRole.id}
      policy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Action": [
                "mobileanalytics:PutEvents",
                "cognito-sync:*",
                "cognito-identity:*"
              ],
              "Resource": [
                "*"
              ]
            }
          ]
        }
  mainIdentityPoolRoleAttachment:
    type: aws:cognito:IdentityPoolRoleAttachment
    properties:
      identityPoolId: ${mainIdentityPool.id}
      roleMappings:
        - identityProvider: graph.facebook.com
          ambiguousRoleResolution: AuthenticatedRole
          type: Rules
          mappingRules:
            - claim: isAdmin
              matchType: Equals
              roleArn: ${authenticatedRole.arn}
              value: paid
      roles:
        authenticated: ${authenticatedRole.arn}
```
{{% /example %}}
{{% /examples %}}

## Import

Cognito Identity Pool Roles Attachment can be imported using the Identity Pool ID, e.g.,

```sh
 $ pulumi import aws:cognito/identityPoolRoleAttachment:IdentityPoolRoleAttachment example us-west-2:b64805ad-cb56-40ba-9ffc-f5d8207e6d42
```

 
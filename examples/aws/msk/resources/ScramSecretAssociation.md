{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleCluster = new aws.msk.Cluster("exampleCluster", {clientAuthentication: {
    sasl: {
        scram: true,
    },
}});
const exampleKey = new aws.kms.Key("exampleKey", {description: "Example Key for MSK Cluster Scram Secret Association"});
const exampleSecret = new aws.secretsmanager.Secret("exampleSecret", {kmsKeyId: exampleKey.keyId});
const exampleSecretVersion = new aws.secretsmanager.SecretVersion("exampleSecretVersion", {
    secretId: exampleSecret.id,
    secretString: JSON.stringify({
        username: "user",
        password: "pass",
    }),
});
const exampleScramSecretAssociation = new aws.msk.ScramSecretAssociation("exampleScramSecretAssociation", {
    clusterArn: exampleCluster.arn,
    secretArnLists: [exampleSecret.arn],
}, {
    dependsOn: [exampleSecretVersion],
});
const exampleSecretPolicy = new aws.secretsmanager.SecretPolicy("exampleSecretPolicy", {
    secretArn: exampleSecret.arn,
    policy: pulumi.interpolate`{
  "Version" : "2012-10-17",
  "Statement" : [ {
    "Sid": "AWSKafkaResourcePolicy",
    "Effect" : "Allow",
    "Principal" : {
      "Service" : "kafka.amazonaws.com"
    },
    "Action" : "secretsmanager:getSecretValue",
    "Resource" : "${exampleSecret.arn}"
  } ]
}
`,
});
```
```python
import pulumi
import json
import pulumi_aws as aws

example_cluster = aws.msk.Cluster("exampleCluster", client_authentication=aws.msk.ClusterClientAuthenticationArgs(
    sasl=aws.msk.ClusterClientAuthenticationSaslArgs(
        scram=True,
    ),
))
example_key = aws.kms.Key("exampleKey", description="Example Key for MSK Cluster Scram Secret Association")
example_secret = aws.secretsmanager.Secret("exampleSecret", kms_key_id=example_key.key_id)
example_secret_version = aws.secretsmanager.SecretVersion("exampleSecretVersion",
    secret_id=example_secret.id,
    secret_string=json.dumps({
        "username": "user",
        "password": "pass",
    }))
example_scram_secret_association = aws.msk.ScramSecretAssociation("exampleScramSecretAssociation",
    cluster_arn=example_cluster.arn,
    secret_arn_lists=[example_secret.arn],
    opts=pulumi.ResourceOptions(depends_on=[example_secret_version]))
example_secret_policy = aws.secretsmanager.SecretPolicy("exampleSecretPolicy",
    secret_arn=example_secret.arn,
    policy=example_secret.arn.apply(lambda arn: f"""{{
  "Version" : "2012-10-17",
  "Statement" : [ {{
    "Sid": "AWSKafkaResourcePolicy",
    "Effect" : "Allow",
    "Principal" : {{
      "Service" : "kafka.amazonaws.com"
    }},
    "Action" : "secretsmanager:getSecretValue",
    "Resource" : "{arn}"
  }} ]
}}
"""))
```
```csharp
using System.Collections.Generic;
using System.Text.Json;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleCluster = new Aws.Msk.Cluster("exampleCluster", new()
    {
        ClientAuthentication = new Aws.Msk.Inputs.ClusterClientAuthenticationArgs
        {
            Sasl = new Aws.Msk.Inputs.ClusterClientAuthenticationSaslArgs
            {
                Scram = true,
            },
        },
    });

    var exampleKey = new Aws.Kms.Key("exampleKey", new()
    {
        Description = "Example Key for MSK Cluster Scram Secret Association",
    });

    var exampleSecret = new Aws.SecretsManager.Secret("exampleSecret", new()
    {
        KmsKeyId = exampleKey.KeyId,
    });

    var exampleSecretVersion = new Aws.SecretsManager.SecretVersion("exampleSecretVersion", new()
    {
        SecretId = exampleSecret.Id,
        SecretString = JsonSerializer.Serialize(new Dictionary<string, object?>
        {
            ["username"] = "user",
            ["password"] = "pass",
        }),
    });

    var exampleScramSecretAssociation = new Aws.Msk.ScramSecretAssociation("exampleScramSecretAssociation", new()
    {
        ClusterArn = exampleCluster.Arn,
        SecretArnLists = new[]
        {
            exampleSecret.Arn,
        },
    }, new CustomResourceOptions
    {
        DependsOn = new[]
        {
            exampleSecretVersion,
        },
    });

    var exampleSecretPolicy = new Aws.SecretsManager.SecretPolicy("exampleSecretPolicy", new()
    {
        SecretArn = exampleSecret.Arn,
        Policy = exampleSecret.Arn.Apply(arn => @$"{{
  ""Version"" : ""2012-10-17"",
  ""Statement"" : [ {{
    ""Sid"": ""AWSKafkaResourcePolicy"",
    ""Effect"" : ""Allow"",
    ""Principal"" : {{
      ""Service"" : ""kafka.amazonaws.com""
    }},
    ""Action"" : ""secretsmanager:getSecretValue"",
    ""Resource"" : ""{arn}""
  }} ]
}}
"),
    });

});
```
```go
package main

import (
	"encoding/json"
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/kms"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/msk"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/secretsmanager"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleCluster, err := msk.NewCluster(ctx, "exampleCluster", &msk.ClusterArgs{
			ClientAuthentication: &msk.ClusterClientAuthenticationArgs{
				Sasl: &msk.ClusterClientAuthenticationSaslArgs{
					Scram: pulumi.Bool(true),
				},
			},
		})
		if err != nil {
			return err
		}
		exampleKey, err := kms.NewKey(ctx, "exampleKey", &kms.KeyArgs{
			Description: pulumi.String("Example Key for MSK Cluster Scram Secret Association"),
		})
		if err != nil {
			return err
		}
		exampleSecret, err := secretsmanager.NewSecret(ctx, "exampleSecret", &secretsmanager.SecretArgs{
			KmsKeyId: exampleKey.KeyId,
		})
		if err != nil {
			return err
		}
		tmpJSON0, err := json.Marshal(map[string]interface{}{
			"username": "user",
			"password": "pass",
		})
		if err != nil {
			return err
		}
		json0 := string(tmpJSON0)
		exampleSecretVersion, err := secretsmanager.NewSecretVersion(ctx, "exampleSecretVersion", &secretsmanager.SecretVersionArgs{
			SecretId:     exampleSecret.ID(),
			SecretString: pulumi.String(json0),
		})
		if err != nil {
			return err
		}
		_, err = msk.NewScramSecretAssociation(ctx, "exampleScramSecretAssociation", &msk.ScramSecretAssociationArgs{
			ClusterArn: exampleCluster.Arn,
			SecretArnLists: pulumi.StringArray{
				exampleSecret.Arn,
			},
		}, pulumi.DependsOn([]pulumi.Resource{
			exampleSecretVersion,
		}))
		if err != nil {
			return err
		}
		_, err = secretsmanager.NewSecretPolicy(ctx, "exampleSecretPolicy", &secretsmanager.SecretPolicyArgs{
			SecretArn: exampleSecret.Arn,
			Policy: exampleSecret.Arn.ApplyT(func(arn string) (string, error) {
				return fmt.Sprintf(`{
  "Version" : "2012-10-17",
  "Statement" : [ {
    "Sid": "AWSKafkaResourcePolicy",
    "Effect" : "Allow",
    "Principal" : {
      "Service" : "kafka.amazonaws.com"
    },
    "Action" : "secretsmanager:getSecretValue",
    "Resource" : "%v"
  } ]
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
import com.pulumi.aws.msk.Cluster;
import com.pulumi.aws.msk.ClusterArgs;
import com.pulumi.aws.msk.inputs.ClusterClientAuthenticationArgs;
import com.pulumi.aws.msk.inputs.ClusterClientAuthenticationSaslArgs;
import com.pulumi.aws.kms.Key;
import com.pulumi.aws.kms.KeyArgs;
import com.pulumi.aws.secretsmanager.Secret;
import com.pulumi.aws.secretsmanager.SecretArgs;
import com.pulumi.aws.secretsmanager.SecretVersion;
import com.pulumi.aws.secretsmanager.SecretVersionArgs;
import com.pulumi.aws.msk.ScramSecretAssociation;
import com.pulumi.aws.msk.ScramSecretAssociationArgs;
import com.pulumi.aws.secretsmanager.SecretPolicy;
import com.pulumi.aws.secretsmanager.SecretPolicyArgs;
import static com.pulumi.codegen.internal.Serialization.*;
import com.pulumi.resources.CustomResourceOptions;
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
        var exampleCluster = new Cluster("exampleCluster", ClusterArgs.builder()        
            .clientAuthentication(ClusterClientAuthenticationArgs.builder()
                .sasl(ClusterClientAuthenticationSaslArgs.builder()
                    .scram(true)
                    .build())
                .build())
            .build());

        var exampleKey = new Key("exampleKey", KeyArgs.builder()        
            .description("Example Key for MSK Cluster Scram Secret Association")
            .build());

        var exampleSecret = new Secret("exampleSecret", SecretArgs.builder()        
            .kmsKeyId(exampleKey.keyId())
            .build());

        var exampleSecretVersion = new SecretVersion("exampleSecretVersion", SecretVersionArgs.builder()        
            .secretId(exampleSecret.id())
            .secretString(serializeJson(
                jsonObject(
                    jsonProperty("username", "user"),
                    jsonProperty("password", "pass")
                )))
            .build());

        var exampleScramSecretAssociation = new ScramSecretAssociation("exampleScramSecretAssociation", ScramSecretAssociationArgs.builder()        
            .clusterArn(exampleCluster.arn())
            .secretArnLists(exampleSecret.arn())
            .build(), CustomResourceOptions.builder()
                .dependsOn(exampleSecretVersion)
                .build());

        var exampleSecretPolicy = new SecretPolicy("exampleSecretPolicy", SecretPolicyArgs.builder()        
            .secretArn(exampleSecret.arn())
            .policy(exampleSecret.arn().applyValue(arn -> """
{
  "Version" : "2012-10-17",
  "Statement" : [ {
    "Sid": "AWSKafkaResourcePolicy",
    "Effect" : "Allow",
    "Principal" : {
      "Service" : "kafka.amazonaws.com"
    },
    "Action" : "secretsmanager:getSecretValue",
    "Resource" : "%s"
  } ]
}
", arn)))
            .build());

    }
}
```
```yaml
resources:
  exampleScramSecretAssociation:
    type: aws:msk:ScramSecretAssociation
    properties:
      clusterArn: ${exampleCluster.arn}
      secretArnLists:
        - ${exampleSecret.arn}
    options:
      dependson:
        - ${exampleSecretVersion}
  exampleCluster:
    type: aws:msk:Cluster
    properties:
      clientAuthentication:
        sasl:
          scram: true
  exampleSecret:
    type: aws:secretsmanager:Secret
    properties:
      kmsKeyId: ${exampleKey.keyId}
  exampleKey:
    type: aws:kms:Key
    properties:
      description: Example Key for MSK Cluster Scram Secret Association
  exampleSecretVersion:
    type: aws:secretsmanager:SecretVersion
    properties:
      secretId: ${exampleSecret.id}
      secretString:
        Fn::ToJSON:
          username: user
          password: pass
  exampleSecretPolicy:
    type: aws:secretsmanager:SecretPolicy
    properties:
      secretArn: ${exampleSecret.arn}
      policy: |
        {
          "Version" : "2012-10-17",
          "Statement" : [ {
            "Sid": "AWSKafkaResourcePolicy",
            "Effect" : "Allow",
            "Principal" : {
              "Service" : "kafka.amazonaws.com"
            },
            "Action" : "secretsmanager:getSecretValue",
            "Resource" : "${exampleSecret.arn}"
          } ]
        }
```
{{% /example %}}
{{% /examples %}}

## Import

MSK SCRAM Secret Associations can be imported using the `id` e.g.,

```sh
 $ pulumi import aws:msk/scramSecretAssociation:ScramSecretAssociation example arn:aws:kafka:us-west-2:123456789012:cluster/example/279c0212-d057-4dba-9aa9-1c4e5a25bfc7-3
```

 
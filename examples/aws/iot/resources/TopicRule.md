{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const mytopic = new aws.sns.Topic("mytopic", {});
const myerrortopic = new aws.sns.Topic("myerrortopic", {});
const role = new aws.iam.Role("role", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "iot.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
`});
const rule = new aws.iot.TopicRule("rule", {
    description: "Example rule",
    enabled: true,
    sql: "SELECT * FROM 'topic/test'",
    sqlVersion: "2016-03-23",
    sns: {
        messageFormat: "RAW",
        roleArn: role.arn,
        targetArn: mytopic.arn,
    },
    errorAction: {
        sns: {
            messageFormat: "RAW",
            roleArn: role.arn,
            targetArn: myerrortopic.arn,
        },
    },
});
const iamPolicyForLambda = new aws.iam.RolePolicy("iamPolicyForLambda", {
    role: role.id,
    policy: pulumi.interpolate`{
  "Version": "2012-10-17",
  "Statement": [
    {
        "Effect": "Allow",
        "Action": [
            "sns:Publish"
        ],
        "Resource": "${mytopic.arn}"
    }
  ]
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

mytopic = aws.sns.Topic("mytopic")
myerrortopic = aws.sns.Topic("myerrortopic")
role = aws.iam.Role("role", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "iot.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
""")
rule = aws.iot.TopicRule("rule",
    description="Example rule",
    enabled=True,
    sql="SELECT * FROM 'topic/test'",
    sql_version="2016-03-23",
    sns=aws.iot.TopicRuleSnsArgs(
        message_format="RAW",
        role_arn=role.arn,
        target_arn=mytopic.arn,
    ),
    error_action=aws.iot.TopicRuleErrorActionArgs(
        sns=aws.iot.TopicRuleErrorActionSnsArgs(
            message_format="RAW",
            role_arn=role.arn,
            target_arn=myerrortopic.arn,
        ),
    ))
iam_policy_for_lambda = aws.iam.RolePolicy("iamPolicyForLambda",
    role=role.id,
    policy=mytopic.arn.apply(lambda arn: f"""{{
  "Version": "2012-10-17",
  "Statement": [
    {{
        "Effect": "Allow",
        "Action": [
            "sns:Publish"
        ],
        "Resource": "{arn}"
    }}
  ]
}}
"""))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var mytopic = new Aws.Sns.Topic("mytopic");

    var myerrortopic = new Aws.Sns.Topic("myerrortopic");

    var role = new Aws.Iam.Role("role", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Effect"": ""Allow"",
      ""Principal"": {
        ""Service"": ""iot.amazonaws.com""
      },
      ""Action"": ""sts:AssumeRole""
    }
  ]
}
",
    });

    var rule = new Aws.Iot.TopicRule("rule", new()
    {
        Description = "Example rule",
        Enabled = true,
        Sql = "SELECT * FROM 'topic/test'",
        SqlVersion = "2016-03-23",
        Sns = new Aws.Iot.Inputs.TopicRuleSnsArgs
        {
            MessageFormat = "RAW",
            RoleArn = role.Arn,
            TargetArn = mytopic.Arn,
        },
        ErrorAction = new Aws.Iot.Inputs.TopicRuleErrorActionArgs
        {
            Sns = new Aws.Iot.Inputs.TopicRuleErrorActionSnsArgs
            {
                MessageFormat = "RAW",
                RoleArn = role.Arn,
                TargetArn = myerrortopic.Arn,
            },
        },
    });

    var iamPolicyForLambda = new Aws.Iam.RolePolicy("iamPolicyForLambda", new()
    {
        Role = role.Id,
        Policy = mytopic.Arn.Apply(arn => @$"{{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {{
        ""Effect"": ""Allow"",
        ""Action"": [
            ""sns:Publish""
        ],
        ""Resource"": ""{arn}""
    }}
  ]
}}
"),
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iot"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/sns"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		mytopic, err := sns.NewTopic(ctx, "mytopic", nil)
		if err != nil {
			return err
		}
		myerrortopic, err := sns.NewTopic(ctx, "myerrortopic", nil)
		if err != nil {
			return err
		}
		role, err := iam.NewRole(ctx, "role", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "iot.amazonaws.com"
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
		_, err = iot.NewTopicRule(ctx, "rule", &iot.TopicRuleArgs{
			Description: pulumi.String("Example rule"),
			Enabled:     pulumi.Bool(true),
			Sql:         pulumi.String("SELECT * FROM 'topic/test'"),
			SqlVersion:  pulumi.String("2016-03-23"),
			Sns: &iot.TopicRuleSnsArgs{
				MessageFormat: pulumi.String("RAW"),
				RoleArn:       role.Arn,
				TargetArn:     mytopic.Arn,
			},
			ErrorAction: &iot.TopicRuleErrorActionArgs{
				Sns: &iot.TopicRuleErrorActionSnsArgs{
					MessageFormat: pulumi.String("RAW"),
					RoleArn:       role.Arn,
					TargetArn:     myerrortopic.Arn,
				},
			},
		})
		if err != nil {
			return err
		}
		_, err = iam.NewRolePolicy(ctx, "iamPolicyForLambda", &iam.RolePolicyArgs{
			Role: role.ID(),
			Policy: mytopic.Arn.ApplyT(func(arn string) (string, error) {
				return fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
        "Effect": "Allow",
        "Action": [
            "sns:Publish"
        ],
        "Resource": "%v"
    }
  ]
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
import com.pulumi.aws.sns.Topic;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.iot.TopicRule;
import com.pulumi.aws.iot.TopicRuleArgs;
import com.pulumi.aws.iot.inputs.TopicRuleSnsArgs;
import com.pulumi.aws.iot.inputs.TopicRuleErrorActionArgs;
import com.pulumi.aws.iot.inputs.TopicRuleErrorActionSnsArgs;
import com.pulumi.aws.iam.RolePolicy;
import com.pulumi.aws.iam.RolePolicyArgs;
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
        var mytopic = new Topic("mytopic");

        var myerrortopic = new Topic("myerrortopic");

        var role = new Role("role", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "iot.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
            """)
            .build());

        var rule = new TopicRule("rule", TopicRuleArgs.builder()        
            .description("Example rule")
            .enabled(true)
            .sql("SELECT * FROM 'topic/test'")
            .sqlVersion("2016-03-23")
            .sns(TopicRuleSnsArgs.builder()
                .messageFormat("RAW")
                .roleArn(role.arn())
                .targetArn(mytopic.arn())
                .build())
            .errorAction(TopicRuleErrorActionArgs.builder()
                .sns(TopicRuleErrorActionSnsArgs.builder()
                    .messageFormat("RAW")
                    .roleArn(role.arn())
                    .targetArn(myerrortopic.arn())
                    .build())
                .build())
            .build());

        var iamPolicyForLambda = new RolePolicy("iamPolicyForLambda", RolePolicyArgs.builder()        
            .role(role.id())
            .policy(mytopic.arn().applyValue(arn -> """
{
  "Version": "2012-10-17",
  "Statement": [
    {
        "Effect": "Allow",
        "Action": [
            "sns:Publish"
        ],
        "Resource": "%s"
    }
  ]
}
", arn)))
            .build());

    }
}
```
```yaml
resources:
  rule:
    type: aws:iot:TopicRule
    properties:
      description: Example rule
      enabled: true
      sql: SELECT * FROM 'topic/test'
      sqlVersion: 2016-03-23
      sns:
        messageFormat: RAW
        roleArn: ${role.arn}
        targetArn: ${mytopic.arn}
      errorAction:
        sns:
          messageFormat: RAW
          roleArn: ${role.arn}
          targetArn: ${myerrortopic.arn}
  mytopic:
    type: aws:sns:Topic
  myerrortopic:
    type: aws:sns:Topic
  role:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "Service": "iot.amazonaws.com"
              },
              "Action": "sts:AssumeRole"
            }
          ]
        }
  iamPolicyForLambda:
    type: aws:iam:RolePolicy
    properties:
      role: ${role.id}
      policy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "sns:Publish"
                ],
                "Resource": "${mytopic.arn}"
            }
          ]
        }
```
{{% /example %}}
{{% /examples %}}

## Import

IoT Topic Rules can be imported using the `name`, e.g.,

```sh
 $ pulumi import aws:iot/topicRule:TopicRule rule <name>
```

 
Provides a budget action resource. Budget actions are cost savings controls that run either automatically on your behalf or by using a workflow approval process.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const examplePolicy = new aws.iam.Policy("examplePolicy", {
    description: "My example policy",
    policy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "ec2:Describe*"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
`,
});
const current = aws.getPartition({});
const exampleRole = new aws.iam.Role("exampleRole", {assumeRolePolicy: current.then(current => `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "budgets.${current.dnsSuffix}"
        ]
      },
      "Action": [
        "sts:AssumeRole"
      ]
    }
  ]
}
`)});
const exampleBudget = new aws.budgets.Budget("exampleBudget", {
    budgetType: "USAGE",
    limitAmount: "10.0",
    limitUnit: "dollars",
    timePeriodStart: "2006-01-02_15:04",
    timeUnit: "MONTHLY",
});
const exampleBudgetAction = new aws.budgets.BudgetAction("exampleBudgetAction", {
    budgetName: exampleBudget.name,
    actionType: "APPLY_IAM_POLICY",
    approvalModel: "AUTOMATIC",
    notificationType: "ACTUAL",
    executionRoleArn: exampleRole.arn,
    actionThreshold: {
        actionThresholdType: "ABSOLUTE_VALUE",
        actionThresholdValue: 100,
    },
    definition: {
        iamActionDefinition: {
            policyArn: examplePolicy.arn,
            roles: [exampleRole.name],
        },
    },
    subscribers: [{
        address: "example@example.example",
        subscriptionType: "EMAIL",
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

example_policy = aws.iam.Policy("examplePolicy",
    description="My example policy",
    policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "ec2:Describe*"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
""")
current = aws.get_partition()
example_role = aws.iam.Role("exampleRole", assume_role_policy=f"""{{
  "Version": "2012-10-17",
  "Statement": [
    {{
      "Effect": "Allow",
      "Principal": {{
        "Service": [
          "budgets.{current.dns_suffix}"
        ]
      }},
      "Action": [
        "sts:AssumeRole"
      ]
    }}
  ]
}}
""")
example_budget = aws.budgets.Budget("exampleBudget",
    budget_type="USAGE",
    limit_amount="10.0",
    limit_unit="dollars",
    time_period_start="2006-01-02_15:04",
    time_unit="MONTHLY")
example_budget_action = aws.budgets.BudgetAction("exampleBudgetAction",
    budget_name=example_budget.name,
    action_type="APPLY_IAM_POLICY",
    approval_model="AUTOMATIC",
    notification_type="ACTUAL",
    execution_role_arn=example_role.arn,
    action_threshold=aws.budgets.BudgetActionActionThresholdArgs(
        action_threshold_type="ABSOLUTE_VALUE",
        action_threshold_value=100,
    ),
    definition=aws.budgets.BudgetActionDefinitionArgs(
        iam_action_definition=aws.budgets.BudgetActionDefinitionIamActionDefinitionArgs(
            policy_arn=example_policy.arn,
            roles=[example_role.name],
        ),
    ),
    subscribers=[aws.budgets.BudgetActionSubscriberArgs(
        address="example@example.example",
        subscription_type="EMAIL",
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var examplePolicy = new Aws.Iam.Policy("examplePolicy", new()
    {
        Description = "My example policy",
        PolicyDocument = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Action"": [
        ""ec2:Describe*""
      ],
      ""Effect"": ""Allow"",
      ""Resource"": ""*""
    }
  ]
}
",
    });

    var current = Aws.GetPartition.Invoke();

    var exampleRole = new Aws.Iam.Role("exampleRole", new()
    {
        AssumeRolePolicy = @$"{{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {{
      ""Effect"": ""Allow"",
      ""Principal"": {{
        ""Service"": [
          ""budgets.{current.Apply(getPartitionResult => getPartitionResult.DnsSuffix)}""
        ]
      }},
      ""Action"": [
        ""sts:AssumeRole""
      ]
    }}
  ]
}}
",
    });

    var exampleBudget = new Aws.Budgets.Budget("exampleBudget", new()
    {
        BudgetType = "USAGE",
        LimitAmount = "10.0",
        LimitUnit = "dollars",
        TimePeriodStart = "2006-01-02_15:04",
        TimeUnit = "MONTHLY",
    });

    var exampleBudgetAction = new Aws.Budgets.BudgetAction("exampleBudgetAction", new()
    {
        BudgetName = exampleBudget.Name,
        ActionType = "APPLY_IAM_POLICY",
        ApprovalModel = "AUTOMATIC",
        NotificationType = "ACTUAL",
        ExecutionRoleArn = exampleRole.Arn,
        ActionThreshold = new Aws.Budgets.Inputs.BudgetActionActionThresholdArgs
        {
            ActionThresholdType = "ABSOLUTE_VALUE",
            ActionThresholdValue = 100,
        },
        Definition = new Aws.Budgets.Inputs.BudgetActionDefinitionArgs
        {
            IamActionDefinition = new Aws.Budgets.Inputs.BudgetActionDefinitionIamActionDefinitionArgs
            {
                PolicyArn = examplePolicy.Arn,
                Roles = new[]
                {
                    exampleRole.Name,
                },
            },
        },
        Subscribers = new[]
        {
            new Aws.Budgets.Inputs.BudgetActionSubscriberArgs
            {
                Address = "example@example.example",
                SubscriptionType = "EMAIL",
            },
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/budgets"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		examplePolicy, err := iam.NewPolicy(ctx, "examplePolicy", &iam.PolicyArgs{
			Description: pulumi.String("My example policy"),
			Policy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "ec2:Describe*"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
`)),
		})
		if err != nil {
			return err
		}
		current, err := aws.GetPartition(ctx, nil, nil)
		if err != nil {
			return err
		}
		exampleRole, err := iam.NewRole(ctx, "exampleRole", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "budgets.%v"
        ]
      },
      "Action": [
        "sts:AssumeRole"
      ]
    }
  ]
}
`, current.DnsSuffix)),
		})
		if err != nil {
			return err
		}
		exampleBudget, err := budgets.NewBudget(ctx, "exampleBudget", &budgets.BudgetArgs{
			BudgetType:      pulumi.String("USAGE"),
			LimitAmount:     pulumi.String("10.0"),
			LimitUnit:       pulumi.String("dollars"),
			TimePeriodStart: pulumi.String("2006-01-02_15:04"),
			TimeUnit:        pulumi.String("MONTHLY"),
		})
		if err != nil {
			return err
		}
		_, err = budgets.NewBudgetAction(ctx, "exampleBudgetAction", &budgets.BudgetActionArgs{
			BudgetName:       exampleBudget.Name,
			ActionType:       pulumi.String("APPLY_IAM_POLICY"),
			ApprovalModel:    pulumi.String("AUTOMATIC"),
			NotificationType: pulumi.String("ACTUAL"),
			ExecutionRoleArn: exampleRole.Arn,
			ActionThreshold: &budgets.BudgetActionActionThresholdArgs{
				ActionThresholdType:  pulumi.String("ABSOLUTE_VALUE"),
				ActionThresholdValue: pulumi.Float64(100),
			},
			Definition: &budgets.BudgetActionDefinitionArgs{
				IamActionDefinition: &budgets.BudgetActionDefinitionIamActionDefinitionArgs{
					PolicyArn: examplePolicy.Arn,
					Roles: pulumi.StringArray{
						exampleRole.Name,
					},
				},
			},
			Subscribers: budgets.BudgetActionSubscriberArray{
				&budgets.BudgetActionSubscriberArgs{
					Address:          pulumi.String("example@example.example"),
					SubscriptionType: pulumi.String("EMAIL"),
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
import com.pulumi.aws.iam.Policy;
import com.pulumi.aws.iam.PolicyArgs;
import com.pulumi.aws.AwsFunctions;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.budgets.Budget;
import com.pulumi.aws.budgets.BudgetArgs;
import com.pulumi.aws.budgets.BudgetAction;
import com.pulumi.aws.budgets.BudgetActionArgs;
import com.pulumi.aws.budgets.inputs.BudgetActionActionThresholdArgs;
import com.pulumi.aws.budgets.inputs.BudgetActionDefinitionArgs;
import com.pulumi.aws.budgets.inputs.BudgetActionDefinitionIamActionDefinitionArgs;
import com.pulumi.aws.budgets.inputs.BudgetActionSubscriberArgs;
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
        var examplePolicy = new Policy("examplePolicy", PolicyArgs.builder()        
            .description("My example policy")
            .policy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "ec2:Describe*"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
            """)
            .build());

        final var current = AwsFunctions.getPartition();

        var exampleRole = new Role("exampleRole", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "budgets.%s"
        ]
      },
      "Action": [
        "sts:AssumeRole"
      ]
    }
  ]
}
", current.applyValue(getPartitionResult -> getPartitionResult.dnsSuffix())))
            .build());

        var exampleBudget = new Budget("exampleBudget", BudgetArgs.builder()        
            .budgetType("USAGE")
            .limitAmount("10.0")
            .limitUnit("dollars")
            .timePeriodStart("2006-01-02_15:04")
            .timeUnit("MONTHLY")
            .build());

        var exampleBudgetAction = new BudgetAction("exampleBudgetAction", BudgetActionArgs.builder()        
            .budgetName(exampleBudget.name())
            .actionType("APPLY_IAM_POLICY")
            .approvalModel("AUTOMATIC")
            .notificationType("ACTUAL")
            .executionRoleArn(exampleRole.arn())
            .actionThreshold(BudgetActionActionThresholdArgs.builder()
                .actionThresholdType("ABSOLUTE_VALUE")
                .actionThresholdValue(100)
                .build())
            .definition(BudgetActionDefinitionArgs.builder()
                .iamActionDefinition(BudgetActionDefinitionIamActionDefinitionArgs.builder()
                    .policyArn(examplePolicy.arn())
                    .roles(exampleRole.name())
                    .build())
                .build())
            .subscribers(BudgetActionSubscriberArgs.builder()
                .address("example@example.example")
                .subscriptionType("EMAIL")
                .build())
            .build());

    }
}
```
```yaml
resources:
  exampleBudgetAction:
    type: aws:budgets:BudgetAction
    properties:
      budgetName: ${exampleBudget.name}
      actionType: APPLY_IAM_POLICY
      approvalModel: AUTOMATIC
      notificationType: ACTUAL
      executionRoleArn: ${exampleRole.arn}
      actionThreshold:
        actionThresholdType: ABSOLUTE_VALUE
        actionThresholdValue: 100
      definition:
        iamActionDefinition:
          policyArn: ${examplePolicy.arn}
          roles:
            - ${exampleRole.name}
      subscribers:
        - address: example@example.example
          subscriptionType: EMAIL
  examplePolicy:
    type: aws:iam:Policy
    properties:
      description: My example policy
      policy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": [
                "ec2:Describe*"
              ],
              "Effect": "Allow",
              "Resource": "*"
            }
          ]
        }
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
                "Service": [
                  "budgets.${current.dnsSuffix}"
                ]
              },
              "Action": [
                "sts:AssumeRole"
              ]
            }
          ]
        }
  exampleBudget:
    type: aws:budgets:Budget
    properties:
      budgetType: USAGE
      limitAmount: 10.0
      limitUnit: dollars
      timePeriodStart: 2006-01-02_15:04
      timeUnit: MONTHLY
variables:
  current:
    Fn::Invoke:
      Function: aws:getPartition
      Arguments: {}
```
{{% /example %}}
{{% /examples %}}

## Import

Budgets can be imported using `AccountID:ActionID:BudgetName`, e.g.,

```sh
 $ pulumi import aws:budgets/budgetAction:BudgetAction myBudget 123456789012:some-id:myBudget`
```

 
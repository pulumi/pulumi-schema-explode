The AWS Inspector Rules Packages data source allows access to the list of AWS
Inspector Rules Packages which can be used by AWS Inspector within the region
configured in the provider.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const rules = aws.inspector.getRulesPackages({});
// e.g., Use in aws_inspector_assessment_template
const group = new aws.inspector.ResourceGroup("group", {tags: {
    test: "test",
}});
const assessmentAssessmentTarget = new aws.inspector.AssessmentTarget("assessmentAssessmentTarget", {resourceGroupArn: group.arn});
const assessmentAssessmentTemplate = new aws.inspector.AssessmentTemplate("assessmentAssessmentTemplate", {
    targetArn: assessmentAssessmentTarget.arn,
    duration: 60,
    rulesPackageArns: rules.then(rules => rules.arns),
});
```
```python
import pulumi
import pulumi_aws as aws

rules = aws.inspector.get_rules_packages()
# e.g., Use in aws_inspector_assessment_template
group = aws.inspector.ResourceGroup("group", tags={
    "test": "test",
})
assessment_assessment_target = aws.inspector.AssessmentTarget("assessmentAssessmentTarget", resource_group_arn=group.arn)
assessment_assessment_template = aws.inspector.AssessmentTemplate("assessmentAssessmentTemplate",
    target_arn=assessment_assessment_target.arn,
    duration=60,
    rules_package_arns=rules.arns)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var rules = Aws.Inspector.GetRulesPackages.Invoke();

    // e.g., Use in aws_inspector_assessment_template
    var @group = new Aws.Inspector.ResourceGroup("group", new()
    {
        Tags = 
        {
            { "test", "test" },
        },
    });

    var assessmentAssessmentTarget = new Aws.Inspector.AssessmentTarget("assessmentAssessmentTarget", new()
    {
        ResourceGroupArn = @group.Arn,
    });

    var assessmentAssessmentTemplate = new Aws.Inspector.AssessmentTemplate("assessmentAssessmentTemplate", new()
    {
        TargetArn = assessmentAssessmentTarget.Arn,
        Duration = 60,
        RulesPackageArns = rules.Apply(getRulesPackagesResult => getRulesPackagesResult.Arns),
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/inspector"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		rules, err := inspector.GetRulesPackages(ctx, nil, nil)
		if err != nil {
			return err
		}
		group, err := inspector.NewResourceGroup(ctx, "group", &inspector.ResourceGroupArgs{
			Tags: pulumi.StringMap{
				"test": pulumi.String("test"),
			},
		})
		if err != nil {
			return err
		}
		assessmentAssessmentTarget, err := inspector.NewAssessmentTarget(ctx, "assessmentAssessmentTarget", &inspector.AssessmentTargetArgs{
			ResourceGroupArn: group.Arn,
		})
		if err != nil {
			return err
		}
		_, err = inspector.NewAssessmentTemplate(ctx, "assessmentAssessmentTemplate", &inspector.AssessmentTemplateArgs{
			TargetArn:        assessmentAssessmentTarget.Arn,
			Duration:         pulumi.Int(60),
			RulesPackageArns: interface{}(rules.Arns),
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
import com.pulumi.aws.inspector.InspectorFunctions;
import com.pulumi.aws.inspector.ResourceGroup;
import com.pulumi.aws.inspector.ResourceGroupArgs;
import com.pulumi.aws.inspector.AssessmentTarget;
import com.pulumi.aws.inspector.AssessmentTargetArgs;
import com.pulumi.aws.inspector.AssessmentTemplate;
import com.pulumi.aws.inspector.AssessmentTemplateArgs;
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
        final var rules = InspectorFunctions.getRulesPackages();

        var group = new ResourceGroup("group", ResourceGroupArgs.builder()        
            .tags(Map.of("test", "test"))
            .build());

        var assessmentAssessmentTarget = new AssessmentTarget("assessmentAssessmentTarget", AssessmentTargetArgs.builder()        
            .resourceGroupArn(group.arn())
            .build());

        var assessmentAssessmentTemplate = new AssessmentTemplate("assessmentAssessmentTemplate", AssessmentTemplateArgs.builder()        
            .targetArn(assessmentAssessmentTarget.arn())
            .duration("60")
            .rulesPackageArns(rules.applyValue(getRulesPackagesResult -> getRulesPackagesResult.arns()))
            .build());

    }
}
```
```yaml
resources:
  # e.g., Use in aws_inspector_assessment_template
  group:
    type: aws:inspector:ResourceGroup
    properties:
      tags:
        test: test
  assessmentAssessmentTarget:
    type: aws:inspector:AssessmentTarget
    properties:
      resourceGroupArn: ${group.arn}
  assessmentAssessmentTemplate:
    type: aws:inspector:AssessmentTemplate
    properties:
      targetArn: ${assessmentAssessmentTarget.arn}
      duration: 60
      rulesPackageArns: ${rules.arns}
variables:
  rules:
    Fn::Invoke:
      Function: aws:inspector:getRulesPackages
      Arguments: {}
```
{{% /example %}}
{{% /examples %}}
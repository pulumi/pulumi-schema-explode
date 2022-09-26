Provides a resource to manage a GuardDuty filter.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const myFilter = new aws.guardduty.Filter("myFilter", {
    action: "ARCHIVE",
    detectorId: aws_guardduty_detector.example.id,
    rank: 1,
    findingCriteria: {
        criterions: [
            {
                field: "region",
                equals: ["eu-west-1"],
            },
            {
                field: "service.additionalInfo.threatListName",
                notEquals: [
                    "some-threat",
                    "another-threat",
                ],
            },
            {
                field: "updatedAt",
                greaterThan: "2020-01-01T00:00:00Z",
                lessThan: "2020-02-01T00:00:00Z",
            },
            {
                field: "severity",
                greaterThanOrEqual: "4",
            },
        ],
    },
});
```
```python
import pulumi
import pulumi_aws as aws

my_filter = aws.guardduty.Filter("myFilter",
    action="ARCHIVE",
    detector_id=aws_guardduty_detector["example"]["id"],
    rank=1,
    finding_criteria=aws.guardduty.FilterFindingCriteriaArgs(
        criterions=[
            aws.guardduty.FilterFindingCriteriaCriterionArgs(
                field="region",
                equals=["eu-west-1"],
            ),
            aws.guardduty.FilterFindingCriteriaCriterionArgs(
                field="service.additionalInfo.threatListName",
                not_equals=[
                    "some-threat",
                    "another-threat",
                ],
            ),
            aws.guardduty.FilterFindingCriteriaCriterionArgs(
                field="updatedAt",
                greater_than="2020-01-01T00:00:00Z",
                less_than="2020-02-01T00:00:00Z",
            ),
            aws.guardduty.FilterFindingCriteriaCriterionArgs(
                field="severity",
                greater_than_or_equal="4",
            ),
        ],
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var myFilter = new Aws.GuardDuty.Filter("myFilter", new()
    {
        Action = "ARCHIVE",
        DetectorId = aws_guardduty_detector.Example.Id,
        Rank = 1,
        FindingCriteria = new Aws.GuardDuty.Inputs.FilterFindingCriteriaArgs
        {
            Criterions = new[]
            {
                new Aws.GuardDuty.Inputs.FilterFindingCriteriaCriterionArgs
                {
                    Field = "region",
                    Equals = new[]
                    {
                        "eu-west-1",
                    },
                },
                new Aws.GuardDuty.Inputs.FilterFindingCriteriaCriterionArgs
                {
                    Field = "service.additionalInfo.threatListName",
                    NotEquals = new[]
                    {
                        "some-threat",
                        "another-threat",
                    },
                },
                new Aws.GuardDuty.Inputs.FilterFindingCriteriaCriterionArgs
                {
                    Field = "updatedAt",
                    GreaterThan = "2020-01-01T00:00:00Z",
                    LessThan = "2020-02-01T00:00:00Z",
                },
                new Aws.GuardDuty.Inputs.FilterFindingCriteriaCriterionArgs
                {
                    Field = "severity",
                    GreaterThanOrEqual = "4",
                },
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/guardduty"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := guardduty.NewFilter(ctx, "myFilter", &guardduty.FilterArgs{
			Action:     pulumi.String("ARCHIVE"),
			DetectorId: pulumi.Any(aws_guardduty_detector.Example.Id),
			Rank:       pulumi.Int(1),
			FindingCriteria: &guardduty.FilterFindingCriteriaArgs{
				Criterions: guardduty.FilterFindingCriteriaCriterionArray{
					&guardduty.FilterFindingCriteriaCriterionArgs{
						Field: pulumi.String("region"),
						Equals: pulumi.StringArray{
							pulumi.String("eu-west-1"),
						},
					},
					&guardduty.FilterFindingCriteriaCriterionArgs{
						Field: pulumi.String("service.additionalInfo.threatListName"),
						NotEquals: pulumi.StringArray{
							pulumi.String("some-threat"),
							pulumi.String("another-threat"),
						},
					},
					&guardduty.FilterFindingCriteriaCriterionArgs{
						Field:       pulumi.String("updatedAt"),
						GreaterThan: pulumi.String("2020-01-01T00:00:00Z"),
						LessThan:    pulumi.String("2020-02-01T00:00:00Z"),
					},
					&guardduty.FilterFindingCriteriaCriterionArgs{
						Field:              pulumi.String("severity"),
						GreaterThanOrEqual: pulumi.String("4"),
					},
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
import com.pulumi.aws.guardduty.Filter;
import com.pulumi.aws.guardduty.FilterArgs;
import com.pulumi.aws.guardduty.inputs.FilterFindingCriteriaArgs;
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
        var myFilter = new Filter("myFilter", FilterArgs.builder()        
            .action("ARCHIVE")
            .detectorId(aws_guardduty_detector.example().id())
            .rank(1)
            .findingCriteria(FilterFindingCriteriaArgs.builder()
                .criterions(                
                    FilterFindingCriteriaCriterionArgs.builder()
                        .field("region")
                        .equals("eu-west-1")
                        .build(),
                    FilterFindingCriteriaCriterionArgs.builder()
                        .field("service.additionalInfo.threatListName")
                        .notEquals(                        
                            "some-threat",
                            "another-threat")
                        .build(),
                    FilterFindingCriteriaCriterionArgs.builder()
                        .field("updatedAt")
                        .greaterThan("2020-01-01T00:00:00Z")
                        .lessThan("2020-02-01T00:00:00Z")
                        .build(),
                    FilterFindingCriteriaCriterionArgs.builder()
                        .field("severity")
                        .greaterThanOrEqual("4")
                        .build())
                .build())
            .build());

    }
}
```
```yaml
resources:
  myFilter:
    type: aws:guardduty:Filter
    properties:
      action: ARCHIVE
      detectorId: ${aws_guardduty_detector.example.id}
      rank: 1
      findingCriteria:
        criterions:
          - field: region
            equals:
              - eu-west-1
          - field: service.additionalInfo.threatListName
            notEquals:
              - some-threat
              - another-threat
          - field: updatedAt
            greaterThan: 2020-01-01T00:00:00Z
            lessThan: 2020-02-01T00:00:00Z
          - field: severity
            greaterThanOrEqual: 4
```
{{% /example %}}
{{% /examples %}}

## Import

GuardDuty filters can be imported using the detector ID and filter's name separated by a colon, e.g.,

```sh
 $ pulumi import aws:guardduty/filter:Filter MyFilter 00b00fd5aecc0ab60a708659477e9617:MyFilter
```

 
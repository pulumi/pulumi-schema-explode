Provides a [Data Lifecycle Manager (DLM) lifecycle policy](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/snapshot-lifecycle.html) for managing snapshots.

{{% examples %}}
## Example Usage
{{% example %}}
### Basic

```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.iam.RolePolicy;
import com.pulumi.aws.iam.RolePolicyArgs;
import com.pulumi.aws.dlm.LifecyclePolicy;
import com.pulumi.aws.dlm.LifecyclePolicyArgs;
import com.pulumi.aws.dlm.inputs.LifecyclePolicyPolicyDetailsArgs;
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
        var dlmLifecycleRole = new Role("dlmLifecycleRole", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "dlm.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
            """)
            .build());

        var dlmLifecycle = new RolePolicy("dlmLifecycle", RolePolicyArgs.builder()        
            .role(dlmLifecycleRole.id())
            .policy("""
{
   "Version": "2012-10-17",
   "Statement": [
      {
         "Effect": "Allow",
         "Action": [
            "ec2:CreateSnapshot",
            "ec2:CreateSnapshots",
            "ec2:DeleteSnapshot",
            "ec2:DescribeInstances",
            "ec2:DescribeVolumes",
            "ec2:DescribeSnapshots"
         ],
         "Resource": "*"
      },
      {
         "Effect": "Allow",
         "Action": [
            "ec2:CreateTags"
         ],
         "Resource": "arn:aws:ec2:*::snapshot/*"
      }
   ]
}
            """)
            .build());

        var example = new LifecyclePolicy("example", LifecyclePolicyArgs.builder()        
            .description("example DLM lifecycle policy")
            .executionRoleArn(dlmLifecycleRole.arn())
            .state("ENABLED")
            .policyDetails(LifecyclePolicyPolicyDetailsArgs.builder()
                .resourceTypes("VOLUME")
                .schedules(LifecyclePolicyPolicyDetailsScheduleArgs.builder()
                    .name("2 weeks of daily snapshots")
                    .createRule(LifecyclePolicyPolicyDetailsScheduleCreateRuleArgs.builder()
                        .interval(24)
                        .intervalUnit("HOURS")
                        .times("23:45")
                        .build())
                    .retainRule(LifecyclePolicyPolicyDetailsScheduleRetainRuleArgs.builder()
                        .count(14)
                        .build())
                    .tagsToAdd(Map.of("SnapshotCreator", "DLM"))
                    .copyTags(false)
                    .build())
                .targetTags(Map.of("Snapshot", "true"))
                .build())
            .build());

    }
}
```
```yaml
resources:
  dlmLifecycleRole:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Principal": {
                "Service": "dlm.amazonaws.com"
              },
              "Effect": "Allow",
              "Sid": ""
            }
          ]
        }
  dlmLifecycle:
    type: aws:iam:RolePolicy
    properties:
      role: ${dlmLifecycleRole.id}
      policy: |
        {
           "Version": "2012-10-17",
           "Statement": [
              {
                 "Effect": "Allow",
                 "Action": [
                    "ec2:CreateSnapshot",
                    "ec2:CreateSnapshots",
                    "ec2:DeleteSnapshot",
                    "ec2:DescribeInstances",
                    "ec2:DescribeVolumes",
                    "ec2:DescribeSnapshots"
                 ],
                 "Resource": "*"
              },
              {
                 "Effect": "Allow",
                 "Action": [
                    "ec2:CreateTags"
                 ],
                 "Resource": "arn:aws:ec2:*::snapshot/*"
              }
           ]
        }
  example:
    type: aws:dlm:LifecyclePolicy
    properties:
      description: example DLM lifecycle policy
      executionRoleArn: ${dlmLifecycleRole.arn}
      state: ENABLED
      policyDetails:
        resourceTypes:
          - VOLUME
        schedules:
          - name: 2 weeks of daily snapshots
            createRule:
              interval: 24
              intervalUnit: HOURS
              times:
                - 23:45
            retainRule:
              count: 14
            tagsToAdd:
              SnapshotCreator: DLM
            copyTags: false
        targetTags:
          Snapshot: true
```
{{% /example %}}
{{% example %}}
### Example Cross-Region Snapshot Copy Usage

```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.AwsFunctions;
import com.pulumi.aws.kms.Key;
import com.pulumi.aws.kms.KeyArgs;
import com.pulumi.aws.dlm.LifecyclePolicy;
import com.pulumi.aws.dlm.LifecyclePolicyArgs;
import com.pulumi.aws.dlm.inputs.LifecyclePolicyPolicyDetailsArgs;
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
        final var current = AwsFunctions.getCallerIdentity();

        var dlmCrossRegionCopyCmk = new Key("dlmCrossRegionCopyCmk", KeyArgs.builder()        
            .description("Example Alternate Region KMS Key")
            .policy("""
{
  "Version": "2012-10-17",
  "Id": "dlm-cross-region-copy-cmk",
  "Statement": [
    {
      "Sid": "Enable IAM User Permissions",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::%s:root"
      },
      "Action": "kms:*",
      "Resource": "*"
    }
  ]
}
", current.applyValue(getCallerIdentityResult -> getCallerIdentityResult.accountId())))
            .build(), CustomResourceOptions.builder()
                .provider(aws.alternate())
                .build());

        var example = new LifecyclePolicy("example", LifecyclePolicyArgs.builder()        
            .description("example DLM lifecycle policy")
            .executionRoleArn(aws_iam_role.dlm_lifecycle_role().arn())
            .state("ENABLED")
            .policyDetails(LifecyclePolicyPolicyDetailsArgs.builder()
                .resourceTypes("VOLUME")
                .schedules(LifecyclePolicyPolicyDetailsScheduleArgs.builder()
                    .name("2 weeks of daily snapshots")
                    .createRule(LifecyclePolicyPolicyDetailsScheduleCreateRuleArgs.builder()
                        .interval(24)
                        .intervalUnit("HOURS")
                        .times("23:45")
                        .build())
                    .retainRule(LifecyclePolicyPolicyDetailsScheduleRetainRuleArgs.builder()
                        .count(14)
                        .build())
                    .tagsToAdd(Map.of("SnapshotCreator", "DLM"))
                    .copyTags(false)
                    .crossRegionCopyRules(LifecyclePolicyPolicyDetailsScheduleCrossRegionCopyRuleArgs.builder()
                        .target("us-west-2")
                        .encrypted(true)
                        .cmkArn(dlmCrossRegionCopyCmk.arn())
                        .copyTags(true)
                        .retainRule(LifecyclePolicyPolicyDetailsScheduleCrossRegionCopyRuleRetainRuleArgs.builder()
                            .interval(30)
                            .intervalUnit("DAYS")
                            .build())
                        .build())
                    .build())
                .targetTags(Map.of("Snapshot", "true"))
                .build())
            .build());

    }
}
```
```yaml
resources:
  dlmCrossRegionCopyCmk:
    type: aws:kms:Key
    properties:
      description: Example Alternate Region KMS Key
      policy: |
        {
          "Version": "2012-10-17",
          "Id": "dlm-cross-region-copy-cmk",
          "Statement": [
            {
              "Sid": "Enable IAM User Permissions",
              "Effect": "Allow",
              "Principal": {
                "AWS": "arn:aws:iam::${current.accountId}:root"
              },
              "Action": "kms:*",
              "Resource": "*"
            }
          ]
        }
    options:
      provider: ${aws.alternate}
  example:
    type: aws:dlm:LifecyclePolicy
    properties:
      description: example DLM lifecycle policy
      executionRoleArn: ${aws_iam_role.dlm_lifecycle_role.arn}
      state: ENABLED
      policyDetails:
        resourceTypes:
          - VOLUME
        schedules:
          - name: 2 weeks of daily snapshots
            createRule:
              interval: 24
              intervalUnit: HOURS
              times:
                - 23:45
            retainRule:
              count: 14
            tagsToAdd:
              SnapshotCreator: DLM
            copyTags: false
            crossRegionCopyRules:
              - target: us-west-2
                encrypted: true
                cmkArn: ${dlmCrossRegionCopyCmk.arn}
                copyTags: true
                retainRule:
                  interval: 30
                  intervalUnit: DAYS
        targetTags:
          Snapshot: true
variables:
  current:
    Fn::Invoke:
      Function: aws:getCallerIdentity
      Arguments: {}
```
{{% /example %}}
{{% /examples %}}

## Import

DLM lifecycle policies can be imported by their policy ID

```sh
 $ pulumi import aws:dlm/lifecyclePolicy:LifecyclePolicy example policy-abcdef12345678901
```

 
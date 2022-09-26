Creates a AWS Batch compute environment. Compute environments contain the Amazon ECS container instances that are used to run containerized batch jobs.

For information about AWS Batch, see [What is AWS Batch?](http://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html) .
For information about compute environment, see [Compute Environments](http://docs.aws.amazon.com/batch/latest/userguide/compute_environments.html) .

> **Note:** To prevent a race condition during environment deletion, make sure to set `depends_on` to the related `aws.iam.RolePolicyAttachment`;
otherwise, the policy may be destroyed too soon and the compute environment will then get stuck in the `DELETING` state, see [Troubleshooting AWS Batch](http://docs.aws.amazon.com/batch/latest/userguide/troubleshooting.html) .

{{% examples %}}
## Example Usage
{{% example %}}
### EC2 Type

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const ecsInstanceRoleRole = new aws.iam.Role("ecsInstanceRoleRole", {assumeRolePolicy: `{
    "Version": "2012-10-17",
    "Statement": [
	{
	    "Action": "sts:AssumeRole",
	    "Effect": "Allow",
	    "Principal": {
	        "Service": "ec2.amazonaws.com"
	    }
	}
    ]
}
`});
const ecsInstanceRoleRolePolicyAttachment = new aws.iam.RolePolicyAttachment("ecsInstanceRoleRolePolicyAttachment", {
    role: ecsInstanceRoleRole.name,
    policyArn: "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role",
});
const ecsInstanceRoleInstanceProfile = new aws.iam.InstanceProfile("ecsInstanceRoleInstanceProfile", {role: ecsInstanceRoleRole.name});
const awsBatchServiceRoleRole = new aws.iam.Role("awsBatchServiceRoleRole", {assumeRolePolicy: `{
    "Version": "2012-10-17",
    "Statement": [
	{
	    "Action": "sts:AssumeRole",
	    "Effect": "Allow",
	    "Principal": {
		"Service": "batch.amazonaws.com"
	    }
	}
    ]
}
`});
const awsBatchServiceRoleRolePolicyAttachment = new aws.iam.RolePolicyAttachment("awsBatchServiceRoleRolePolicyAttachment", {
    role: awsBatchServiceRoleRole.name,
    policyArn: "arn:aws:iam::aws:policy/service-role/AWSBatchServiceRole",
});
const sampleVpc = new aws.ec2.Vpc("sampleVpc", {cidrBlock: "10.1.0.0/16"});
const sampleSecurityGroup = new aws.ec2.SecurityGroup("sampleSecurityGroup", {
    vpcId: sampleVpc.id,
    egress: [{
        fromPort: 0,
        toPort: 0,
        protocol: "-1",
        cidrBlocks: ["0.0.0.0/0"],
    }],
});
const sampleSubnet = new aws.ec2.Subnet("sampleSubnet", {
    vpcId: sampleVpc.id,
    cidrBlock: "10.1.1.0/24",
});
const sampleComputeEnvironment = new aws.batch.ComputeEnvironment("sampleComputeEnvironment", {
    computeEnvironmentName: "sample",
    computeResources: {
        instanceRole: ecsInstanceRoleInstanceProfile.arn,
        instanceTypes: ["c4.large"],
        maxVcpus: 16,
        minVcpus: 0,
        securityGroupIds: [sampleSecurityGroup.id],
        subnets: [sampleSubnet.id],
        type: "EC2",
    },
    serviceRole: awsBatchServiceRoleRole.arn,
    type: "MANAGED",
}, {
    dependsOn: [awsBatchServiceRoleRolePolicyAttachment],
});
```
```python
import pulumi
import pulumi_aws as aws

ecs_instance_role_role = aws.iam.Role("ecsInstanceRoleRole", assume_role_policy="""{
    "Version": "2012-10-17",
    "Statement": [
	{
	    "Action": "sts:AssumeRole",
	    "Effect": "Allow",
	    "Principal": {
	        "Service": "ec2.amazonaws.com"
	    }
	}
    ]
}
""")
ecs_instance_role_role_policy_attachment = aws.iam.RolePolicyAttachment("ecsInstanceRoleRolePolicyAttachment",
    role=ecs_instance_role_role.name,
    policy_arn="arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role")
ecs_instance_role_instance_profile = aws.iam.InstanceProfile("ecsInstanceRoleInstanceProfile", role=ecs_instance_role_role.name)
aws_batch_service_role_role = aws.iam.Role("awsBatchServiceRoleRole", assume_role_policy="""{
    "Version": "2012-10-17",
    "Statement": [
	{
	    "Action": "sts:AssumeRole",
	    "Effect": "Allow",
	    "Principal": {
		"Service": "batch.amazonaws.com"
	    }
	}
    ]
}
""")
aws_batch_service_role_role_policy_attachment = aws.iam.RolePolicyAttachment("awsBatchServiceRoleRolePolicyAttachment",
    role=aws_batch_service_role_role.name,
    policy_arn="arn:aws:iam::aws:policy/service-role/AWSBatchServiceRole")
sample_vpc = aws.ec2.Vpc("sampleVpc", cidr_block="10.1.0.0/16")
sample_security_group = aws.ec2.SecurityGroup("sampleSecurityGroup",
    vpc_id=sample_vpc.id,
    egress=[aws.ec2.SecurityGroupEgressArgs(
        from_port=0,
        to_port=0,
        protocol="-1",
        cidr_blocks=["0.0.0.0/0"],
    )])
sample_subnet = aws.ec2.Subnet("sampleSubnet",
    vpc_id=sample_vpc.id,
    cidr_block="10.1.1.0/24")
sample_compute_environment = aws.batch.ComputeEnvironment("sampleComputeEnvironment",
    compute_environment_name="sample",
    compute_resources=aws.batch.ComputeEnvironmentComputeResourcesArgs(
        instance_role=ecs_instance_role_instance_profile.arn,
        instance_types=["c4.large"],
        max_vcpus=16,
        min_vcpus=0,
        security_group_ids=[sample_security_group.id],
        subnets=[sample_subnet.id],
        type="EC2",
    ),
    service_role=aws_batch_service_role_role.arn,
    type="MANAGED",
    opts=pulumi.ResourceOptions(depends_on=[aws_batch_service_role_role_policy_attachment]))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var ecsInstanceRoleRole = new Aws.Iam.Role("ecsInstanceRoleRole", new()
    {
        AssumeRolePolicy = @"{
    ""Version"": ""2012-10-17"",
    ""Statement"": [
	{
	    ""Action"": ""sts:AssumeRole"",
	    ""Effect"": ""Allow"",
	    ""Principal"": {
	        ""Service"": ""ec2.amazonaws.com""
	    }
	}
    ]
}
",
    });

    var ecsInstanceRoleRolePolicyAttachment = new Aws.Iam.RolePolicyAttachment("ecsInstanceRoleRolePolicyAttachment", new()
    {
        Role = ecsInstanceRoleRole.Name,
        PolicyArn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role",
    });

    var ecsInstanceRoleInstanceProfile = new Aws.Iam.InstanceProfile("ecsInstanceRoleInstanceProfile", new()
    {
        Role = ecsInstanceRoleRole.Name,
    });

    var awsBatchServiceRoleRole = new Aws.Iam.Role("awsBatchServiceRoleRole", new()
    {
        AssumeRolePolicy = @"{
    ""Version"": ""2012-10-17"",
    ""Statement"": [
	{
	    ""Action"": ""sts:AssumeRole"",
	    ""Effect"": ""Allow"",
	    ""Principal"": {
		""Service"": ""batch.amazonaws.com""
	    }
	}
    ]
}
",
    });

    var awsBatchServiceRoleRolePolicyAttachment = new Aws.Iam.RolePolicyAttachment("awsBatchServiceRoleRolePolicyAttachment", new()
    {
        Role = awsBatchServiceRoleRole.Name,
        PolicyArn = "arn:aws:iam::aws:policy/service-role/AWSBatchServiceRole",
    });

    var sampleVpc = new Aws.Ec2.Vpc("sampleVpc", new()
    {
        CidrBlock = "10.1.0.0/16",
    });

    var sampleSecurityGroup = new Aws.Ec2.SecurityGroup("sampleSecurityGroup", new()
    {
        VpcId = sampleVpc.Id,
        Egress = new[]
        {
            new Aws.Ec2.Inputs.SecurityGroupEgressArgs
            {
                FromPort = 0,
                ToPort = 0,
                Protocol = "-1",
                CidrBlocks = new[]
                {
                    "0.0.0.0/0",
                },
            },
        },
    });

    var sampleSubnet = new Aws.Ec2.Subnet("sampleSubnet", new()
    {
        VpcId = sampleVpc.Id,
        CidrBlock = "10.1.1.0/24",
    });

    var sampleComputeEnvironment = new Aws.Batch.ComputeEnvironment("sampleComputeEnvironment", new()
    {
        ComputeEnvironmentName = "sample",
        ComputeResources = new Aws.Batch.Inputs.ComputeEnvironmentComputeResourcesArgs
        {
            InstanceRole = ecsInstanceRoleInstanceProfile.Arn,
            InstanceTypes = new[]
            {
                "c4.large",
            },
            MaxVcpus = 16,
            MinVcpus = 0,
            SecurityGroupIds = new[]
            {
                sampleSecurityGroup.Id,
            },
            Subnets = new[]
            {
                sampleSubnet.Id,
            },
            Type = "EC2",
        },
        ServiceRole = awsBatchServiceRoleRole.Arn,
        Type = "MANAGED",
    }, new CustomResourceOptions
    {
        DependsOn = new[]
        {
            awsBatchServiceRoleRolePolicyAttachment,
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/batch"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ec2"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		ecsInstanceRoleRole, err := iam.NewRole(ctx, "ecsInstanceRoleRole", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
    "Version": "2012-10-17",
    "Statement": [
	{
	    "Action": "sts:AssumeRole",
	    "Effect": "Allow",
	    "Principal": {
	        "Service": "ec2.amazonaws.com"
	    }
	}
    ]
}
`)),
		})
		if err != nil {
			return err
		}
		_, err = iam.NewRolePolicyAttachment(ctx, "ecsInstanceRoleRolePolicyAttachment", &iam.RolePolicyAttachmentArgs{
			Role:      ecsInstanceRoleRole.Name,
			PolicyArn: pulumi.String("arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"),
		})
		if err != nil {
			return err
		}
		ecsInstanceRoleInstanceProfile, err := iam.NewInstanceProfile(ctx, "ecsInstanceRoleInstanceProfile", &iam.InstanceProfileArgs{
			Role: ecsInstanceRoleRole.Name,
		})
		if err != nil {
			return err
		}
		awsBatchServiceRoleRole, err := iam.NewRole(ctx, "awsBatchServiceRoleRole", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
    "Version": "2012-10-17",
    "Statement": [
	{
	    "Action": "sts:AssumeRole",
	    "Effect": "Allow",
	    "Principal": {
		"Service": "batch.amazonaws.com"
	    }
	}
    ]
}
`)),
		})
		if err != nil {
			return err
		}
		awsBatchServiceRoleRolePolicyAttachment, err := iam.NewRolePolicyAttachment(ctx, "awsBatchServiceRoleRolePolicyAttachment", &iam.RolePolicyAttachmentArgs{
			Role:      awsBatchServiceRoleRole.Name,
			PolicyArn: pulumi.String("arn:aws:iam::aws:policy/service-role/AWSBatchServiceRole"),
		})
		if err != nil {
			return err
		}
		sampleVpc, err := ec2.NewVpc(ctx, "sampleVpc", &ec2.VpcArgs{
			CidrBlock: pulumi.String("10.1.0.0/16"),
		})
		if err != nil {
			return err
		}
		sampleSecurityGroup, err := ec2.NewSecurityGroup(ctx, "sampleSecurityGroup", &ec2.SecurityGroupArgs{
			VpcId: sampleVpc.ID(),
			Egress: ec2.SecurityGroupEgressArray{
				&ec2.SecurityGroupEgressArgs{
					FromPort: pulumi.Int(0),
					ToPort:   pulumi.Int(0),
					Protocol: pulumi.String("-1"),
					CidrBlocks: pulumi.StringArray{
						pulumi.String("0.0.0.0/0"),
					},
				},
			},
		})
		if err != nil {
			return err
		}
		sampleSubnet, err := ec2.NewSubnet(ctx, "sampleSubnet", &ec2.SubnetArgs{
			VpcId:     sampleVpc.ID(),
			CidrBlock: pulumi.String("10.1.1.0/24"),
		})
		if err != nil {
			return err
		}
		_, err = batch.NewComputeEnvironment(ctx, "sampleComputeEnvironment", &batch.ComputeEnvironmentArgs{
			ComputeEnvironmentName: pulumi.String("sample"),
			ComputeResources: &batch.ComputeEnvironmentComputeResourcesArgs{
				InstanceRole: ecsInstanceRoleInstanceProfile.Arn,
				InstanceTypes: pulumi.StringArray{
					pulumi.String("c4.large"),
				},
				MaxVcpus: pulumi.Int(16),
				MinVcpus: pulumi.Int(0),
				SecurityGroupIds: pulumi.StringArray{
					sampleSecurityGroup.ID(),
				},
				Subnets: pulumi.StringArray{
					sampleSubnet.ID(),
				},
				Type: pulumi.String("EC2"),
			},
			ServiceRole: awsBatchServiceRoleRole.Arn,
			Type:        pulumi.String("MANAGED"),
		}, pulumi.DependsOn([]pulumi.Resource{
			awsBatchServiceRoleRolePolicyAttachment,
		}))
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
import com.pulumi.aws.iam.InstanceProfile;
import com.pulumi.aws.iam.InstanceProfileArgs;
import com.pulumi.aws.ec2.Vpc;
import com.pulumi.aws.ec2.VpcArgs;
import com.pulumi.aws.ec2.SecurityGroup;
import com.pulumi.aws.ec2.SecurityGroupArgs;
import com.pulumi.aws.ec2.inputs.SecurityGroupEgressArgs;
import com.pulumi.aws.ec2.Subnet;
import com.pulumi.aws.ec2.SubnetArgs;
import com.pulumi.aws.batch.ComputeEnvironment;
import com.pulumi.aws.batch.ComputeEnvironmentArgs;
import com.pulumi.aws.batch.inputs.ComputeEnvironmentComputeResourcesArgs;
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
        var ecsInstanceRoleRole = new Role("ecsInstanceRoleRole", RoleArgs.builder()        
            .assumeRolePolicy("""
{
    "Version": "2012-10-17",
    "Statement": [
	{
	    "Action": "sts:AssumeRole",
	    "Effect": "Allow",
	    "Principal": {
	        "Service": "ec2.amazonaws.com"
	    }
	}
    ]
}
            """)
            .build());

        var ecsInstanceRoleRolePolicyAttachment = new RolePolicyAttachment("ecsInstanceRoleRolePolicyAttachment", RolePolicyAttachmentArgs.builder()        
            .role(ecsInstanceRoleRole.name())
            .policyArn("arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role")
            .build());

        var ecsInstanceRoleInstanceProfile = new InstanceProfile("ecsInstanceRoleInstanceProfile", InstanceProfileArgs.builder()        
            .role(ecsInstanceRoleRole.name())
            .build());

        var awsBatchServiceRoleRole = new Role("awsBatchServiceRoleRole", RoleArgs.builder()        
            .assumeRolePolicy("""
{
    "Version": "2012-10-17",
    "Statement": [
	{
	    "Action": "sts:AssumeRole",
	    "Effect": "Allow",
	    "Principal": {
		"Service": "batch.amazonaws.com"
	    }
	}
    ]
}
            """)
            .build());

        var awsBatchServiceRoleRolePolicyAttachment = new RolePolicyAttachment("awsBatchServiceRoleRolePolicyAttachment", RolePolicyAttachmentArgs.builder()        
            .role(awsBatchServiceRoleRole.name())
            .policyArn("arn:aws:iam::aws:policy/service-role/AWSBatchServiceRole")
            .build());

        var sampleVpc = new Vpc("sampleVpc", VpcArgs.builder()        
            .cidrBlock("10.1.0.0/16")
            .build());

        var sampleSecurityGroup = new SecurityGroup("sampleSecurityGroup", SecurityGroupArgs.builder()        
            .vpcId(sampleVpc.id())
            .egress(SecurityGroupEgressArgs.builder()
                .fromPort(0)
                .toPort(0)
                .protocol("-1")
                .cidrBlocks("0.0.0.0/0")
                .build())
            .build());

        var sampleSubnet = new Subnet("sampleSubnet", SubnetArgs.builder()        
            .vpcId(sampleVpc.id())
            .cidrBlock("10.1.1.0/24")
            .build());

        var sampleComputeEnvironment = new ComputeEnvironment("sampleComputeEnvironment", ComputeEnvironmentArgs.builder()        
            .computeEnvironmentName("sample")
            .computeResources(ComputeEnvironmentComputeResourcesArgs.builder()
                .instanceRole(ecsInstanceRoleInstanceProfile.arn())
                .instanceTypes("c4.large")
                .maxVcpus(16)
                .minVcpus(0)
                .securityGroupIds(sampleSecurityGroup.id())
                .subnets(sampleSubnet.id())
                .type("EC2")
                .build())
            .serviceRole(awsBatchServiceRoleRole.arn())
            .type("MANAGED")
            .build(), CustomResourceOptions.builder()
                .dependsOn(awsBatchServiceRoleRolePolicyAttachment)
                .build());

    }
}
```
```yaml
resources:
  ecsInstanceRoleRole:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
            "Version": "2012-10-17",
            "Statement": [
        	{
        	    "Action": "sts:AssumeRole",
        	    "Effect": "Allow",
        	    "Principal": {
        	        "Service": "ec2.amazonaws.com"
        	    }
        	}
            ]
        }
  ecsInstanceRoleRolePolicyAttachment:
    type: aws:iam:RolePolicyAttachment
    properties:
      role: ${ecsInstanceRoleRole.name}
      policyArn: arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role
  ecsInstanceRoleInstanceProfile:
    type: aws:iam:InstanceProfile
    properties:
      role: ${ecsInstanceRoleRole.name}
  awsBatchServiceRoleRole:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
            "Version": "2012-10-17",
            "Statement": [
        	{
        	    "Action": "sts:AssumeRole",
        	    "Effect": "Allow",
        	    "Principal": {
        		"Service": "batch.amazonaws.com"
        	    }
        	}
            ]
        }
  awsBatchServiceRoleRolePolicyAttachment:
    type: aws:iam:RolePolicyAttachment
    properties:
      role: ${awsBatchServiceRoleRole.name}
      policyArn: arn:aws:iam::aws:policy/service-role/AWSBatchServiceRole
  sampleVpc:
    type: aws:ec2:Vpc
    properties:
      cidrBlock: 10.1.0.0/16
  sampleSecurityGroup:
    type: aws:ec2:SecurityGroup
    properties:
      vpcId: ${sampleVpc.id}
      egress:
        - fromPort: 0
          toPort: 0
          protocol: -1
          cidrBlocks:
            - 0.0.0.0/0
  sampleSubnet:
    type: aws:ec2:Subnet
    properties:
      vpcId: ${sampleVpc.id}
      cidrBlock: 10.1.1.0/24
  sampleComputeEnvironment:
    type: aws:batch:ComputeEnvironment
    properties:
      computeEnvironmentName: sample
      computeResources:
        instanceRole: ${ecsInstanceRoleInstanceProfile.arn}
        instanceTypes:
          - c4.large
        maxVcpus: 16
        minVcpus: 0
        securityGroupIds:
          - ${sampleSecurityGroup.id}
        subnets:
          - ${sampleSubnet.id}
        type: EC2
      serviceRole: ${awsBatchServiceRoleRole.arn}
      type: MANAGED
    options:
      dependson:
        - ${awsBatchServiceRoleRolePolicyAttachment}
```
{{% /example %}}
{{% example %}}
### Fargate Type

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const sample = new aws.batch.ComputeEnvironment("sample", {
    computeEnvironmentName: "sample",
    computeResources: {
        maxVcpus: 16,
        securityGroupIds: [aws_security_group.sample.id],
        subnets: [aws_subnet.sample.id],
        type: "FARGATE",
    },
    serviceRole: aws_iam_role.aws_batch_service_role.arn,
    type: "MANAGED",
}, {
    dependsOn: [aws_iam_role_policy_attachment.aws_batch_service_role],
});
```
```python
import pulumi
import pulumi_aws as aws

sample = aws.batch.ComputeEnvironment("sample",
    compute_environment_name="sample",
    compute_resources=aws.batch.ComputeEnvironmentComputeResourcesArgs(
        max_vcpus=16,
        security_group_ids=[aws_security_group["sample"]["id"]],
        subnets=[aws_subnet["sample"]["id"]],
        type="FARGATE",
    ),
    service_role=aws_iam_role["aws_batch_service_role"]["arn"],
    type="MANAGED",
    opts=pulumi.ResourceOptions(depends_on=[aws_iam_role_policy_attachment["aws_batch_service_role"]]))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var sample = new Aws.Batch.ComputeEnvironment("sample", new()
    {
        ComputeEnvironmentName = "sample",
        ComputeResources = new Aws.Batch.Inputs.ComputeEnvironmentComputeResourcesArgs
        {
            MaxVcpus = 16,
            SecurityGroupIds = new[]
            {
                aws_security_group.Sample.Id,
            },
            Subnets = new[]
            {
                aws_subnet.Sample.Id,
            },
            Type = "FARGATE",
        },
        ServiceRole = aws_iam_role.Aws_batch_service_role.Arn,
        Type = "MANAGED",
    }, new CustomResourceOptions
    {
        DependsOn = new[]
        {
            aws_iam_role_policy_attachment.Aws_batch_service_role,
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/batch"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := batch.NewComputeEnvironment(ctx, "sample", &batch.ComputeEnvironmentArgs{
			ComputeEnvironmentName: pulumi.String("sample"),
			ComputeResources: &batch.ComputeEnvironmentComputeResourcesArgs{
				MaxVcpus: pulumi.Int(16),
				SecurityGroupIds: pulumi.StringArray{
					pulumi.Any(aws_security_group.Sample.Id),
				},
				Subnets: pulumi.StringArray{
					pulumi.Any(aws_subnet.Sample.Id),
				},
				Type: pulumi.String("FARGATE"),
			},
			ServiceRole: pulumi.Any(aws_iam_role.Aws_batch_service_role.Arn),
			Type:        pulumi.String("MANAGED"),
		}, pulumi.DependsOn([]pulumi.Resource{
			aws_iam_role_policy_attachment.Aws_batch_service_role,
		}))
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
import com.pulumi.aws.batch.ComputeEnvironment;
import com.pulumi.aws.batch.ComputeEnvironmentArgs;
import com.pulumi.aws.batch.inputs.ComputeEnvironmentComputeResourcesArgs;
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
        var sample = new ComputeEnvironment("sample", ComputeEnvironmentArgs.builder()        
            .computeEnvironmentName("sample")
            .computeResources(ComputeEnvironmentComputeResourcesArgs.builder()
                .maxVcpus(16)
                .securityGroupIds(aws_security_group.sample().id())
                .subnets(aws_subnet.sample().id())
                .type("FARGATE")
                .build())
            .serviceRole(aws_iam_role.aws_batch_service_role().arn())
            .type("MANAGED")
            .build(), CustomResourceOptions.builder()
                .dependsOn(aws_iam_role_policy_attachment.aws_batch_service_role())
                .build());

    }
}
```
```yaml
resources:
  sample:
    type: aws:batch:ComputeEnvironment
    properties:
      computeEnvironmentName: sample
      computeResources:
        maxVcpus: 16
        securityGroupIds:
          - ${aws_security_group.sample.id}
        subnets:
          - ${aws_subnet.sample.id}
        type: FARGATE
      serviceRole: ${aws_iam_role.aws_batch_service_role.arn}
      type: MANAGED
    options:
      dependson:
        - ${aws_iam_role_policy_attachment.aws_batch_service_role}
```
{{% /example %}}
{{% /examples %}}

## Import

AWS Batch compute can be imported using the `compute_environment_name`, e.g.,

```sh
 $ pulumi import aws:batch/computeEnvironment:ComputeEnvironment sample sample
```

 [1]http://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html [2]http://docs.aws.amazon.com/batch/latest/userguide/compute_environments.html [3]http://docs.aws.amazon.com/batch/latest/userguide/troubleshooting.html [4]https://docs.aws.amazon.com/batch/latest/userguide/allocation-strategies.html 
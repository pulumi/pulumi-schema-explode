Provides a CodeBuild Project resource. See also the `aws.codebuild.Webhook` resource, which manages the webhook to the source (e.g., the "rebuild every time a code change is pushed" option in the CodeBuild web console).

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleBucketV2 = new aws.s3.BucketV2("exampleBucketV2", {});
const exampleBucketAclV2 = new aws.s3.BucketAclV2("exampleBucketAclV2", {
    bucket: exampleBucketV2.id,
    acl: "private",
});
const exampleRole = new aws.iam.Role("exampleRole", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
`});
const exampleRolePolicy = new aws.iam.RolePolicy("exampleRolePolicy", {
    role: exampleRole.name,
    policy: pulumi.interpolate`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Resource": [
        "*"
      ],
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "ec2:CreateNetworkInterface",
        "ec2:DescribeDhcpOptions",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DeleteNetworkInterface",
        "ec2:DescribeSubnets",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeVpcs"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ec2:CreateNetworkInterfacePermission"
      ],
      "Resource": [
        "arn:aws:ec2:us-east-1:123456789012:network-interface/*"
      ],
      "Condition": {
        "StringEquals": {
          "ec2:Subnet": [
            "${aws_subnet.example1.arn}",
            "${aws_subnet.example2.arn}"
          ],
          "ec2:AuthorizedService": "codebuild.amazonaws.com"
        }
      }
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:*"
      ],
      "Resource": [
        "${exampleBucketV2.arn}",
        "${exampleBucketV2.arn}/*"
      ]
    }
  ]
}
`,
});
const exampleProject = new aws.codebuild.Project("exampleProject", {
    description: "test_codebuild_project",
    buildTimeout: 5,
    serviceRole: exampleRole.arn,
    artifacts: {
        type: "NO_ARTIFACTS",
    },
    cache: {
        type: "S3",
        location: exampleBucketV2.bucket,
    },
    environment: {
        computeType: "BUILD_GENERAL1_SMALL",
        image: "aws/codebuild/standard:1.0",
        type: "LINUX_CONTAINER",
        imagePullCredentialsType: "CODEBUILD",
        environmentVariables: [
            {
                name: "SOME_KEY1",
                value: "SOME_VALUE1",
            },
            {
                name: "SOME_KEY2",
                value: "SOME_VALUE2",
                type: "PARAMETER_STORE",
            },
        ],
    },
    logsConfig: {
        cloudwatchLogs: {
            groupName: "log-group",
            streamName: "log-stream",
        },
        s3Logs: {
            status: "ENABLED",
            location: pulumi.interpolate`${exampleBucketV2.id}/build-log`,
        },
    },
    source: {
        type: "GITHUB",
        location: "https://github.com/mitchellh/packer.git",
        gitCloneDepth: 1,
        gitSubmodulesConfig: {
            fetchSubmodules: true,
        },
    },
    sourceVersion: "master",
    vpcConfig: {
        vpcId: aws_vpc.example.id,
        subnets: [
            aws_subnet.example1.id,
            aws_subnet.example2.id,
        ],
        securityGroupIds: [
            aws_security_group.example1.id,
            aws_security_group.example2.id,
        ],
    },
    tags: {
        Environment: "Test",
    },
});
const project_with_cache = new aws.codebuild.Project("project-with-cache", {
    description: "test_codebuild_project_cache",
    buildTimeout: 5,
    queuedTimeout: 5,
    serviceRole: exampleRole.arn,
    artifacts: {
        type: "NO_ARTIFACTS",
    },
    cache: {
        type: "LOCAL",
        modes: [
            "LOCAL_DOCKER_LAYER_CACHE",
            "LOCAL_SOURCE_CACHE",
        ],
    },
    environment: {
        computeType: "BUILD_GENERAL1_SMALL",
        image: "aws/codebuild/standard:1.0",
        type: "LINUX_CONTAINER",
        imagePullCredentialsType: "CODEBUILD",
        environmentVariables: [{
            name: "SOME_KEY1",
            value: "SOME_VALUE1",
        }],
    },
    source: {
        type: "GITHUB",
        location: "https://github.com/mitchellh/packer.git",
        gitCloneDepth: 1,
    },
    tags: {
        Environment: "Test",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example_bucket_v2 = aws.s3.BucketV2("exampleBucketV2")
example_bucket_acl_v2 = aws.s3.BucketAclV2("exampleBucketAclV2",
    bucket=example_bucket_v2.id,
    acl="private")
example_role = aws.iam.Role("exampleRole", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
""")
example_role_policy = aws.iam.RolePolicy("exampleRolePolicy",
    role=example_role.name,
    policy=pulumi.Output.all(example_bucket_v2.arn, example_bucket_v2.arn).apply(lambda exampleBucketV2Arn, exampleBucketV2Arn1: f"""{{
  "Version": "2012-10-17",
  "Statement": [
    {{
      "Effect": "Allow",
      "Resource": [
        "*"
      ],
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ]
    }},
    {{
      "Effect": "Allow",
      "Action": [
        "ec2:CreateNetworkInterface",
        "ec2:DescribeDhcpOptions",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DeleteNetworkInterface",
        "ec2:DescribeSubnets",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeVpcs"
      ],
      "Resource": "*"
    }},
    {{
      "Effect": "Allow",
      "Action": [
        "ec2:CreateNetworkInterfacePermission"
      ],
      "Resource": [
        "arn:aws:ec2:us-east-1:123456789012:network-interface/*"
      ],
      "Condition": {{
        "StringEquals": {{
          "ec2:Subnet": [
            "{aws_subnet["example1"]["arn"]}",
            "{aws_subnet["example2"]["arn"]}"
          ],
          "ec2:AuthorizedService": "codebuild.amazonaws.com"
        }}
      }}
    }},
    {{
      "Effect": "Allow",
      "Action": [
        "s3:*"
      ],
      "Resource": [
        "{example_bucket_v2_arn}",
        "{example_bucket_v2_arn1}/*"
      ]
    }}
  ]
}}
"""))
example_project = aws.codebuild.Project("exampleProject",
    description="test_codebuild_project",
    build_timeout=5,
    service_role=example_role.arn,
    artifacts=aws.codebuild.ProjectArtifactsArgs(
        type="NO_ARTIFACTS",
    ),
    cache=aws.codebuild.ProjectCacheArgs(
        type="S3",
        location=example_bucket_v2.bucket,
    ),
    environment=aws.codebuild.ProjectEnvironmentArgs(
        compute_type="BUILD_GENERAL1_SMALL",
        image="aws/codebuild/standard:1.0",
        type="LINUX_CONTAINER",
        image_pull_credentials_type="CODEBUILD",
        environment_variables=[
            aws.codebuild.ProjectEnvironmentEnvironmentVariableArgs(
                name="SOME_KEY1",
                value="SOME_VALUE1",
            ),
            aws.codebuild.ProjectEnvironmentEnvironmentVariableArgs(
                name="SOME_KEY2",
                value="SOME_VALUE2",
                type="PARAMETER_STORE",
            ),
        ],
    ),
    logs_config=aws.codebuild.ProjectLogsConfigArgs(
        cloudwatch_logs=aws.codebuild.ProjectLogsConfigCloudwatchLogsArgs(
            group_name="log-group",
            stream_name="log-stream",
        ),
        s3_logs=aws.codebuild.ProjectLogsConfigS3LogsArgs(
            status="ENABLED",
            location=example_bucket_v2.id.apply(lambda id: f"{id}/build-log"),
        ),
    ),
    source=aws.codebuild.ProjectSourceArgs(
        type="GITHUB",
        location="https://github.com/mitchellh/packer.git",
        git_clone_depth=1,
        git_submodules_config=aws.codebuild.ProjectSourceGitSubmodulesConfigArgs(
            fetch_submodules=True,
        ),
    ),
    source_version="master",
    vpc_config=aws.codebuild.ProjectVpcConfigArgs(
        vpc_id=aws_vpc["example"]["id"],
        subnets=[
            aws_subnet["example1"]["id"],
            aws_subnet["example2"]["id"],
        ],
        security_group_ids=[
            aws_security_group["example1"]["id"],
            aws_security_group["example2"]["id"],
        ],
    ),
    tags={
        "Environment": "Test",
    })
project_with_cache = aws.codebuild.Project("project-with-cache",
    description="test_codebuild_project_cache",
    build_timeout=5,
    queued_timeout=5,
    service_role=example_role.arn,
    artifacts=aws.codebuild.ProjectArtifactsArgs(
        type="NO_ARTIFACTS",
    ),
    cache=aws.codebuild.ProjectCacheArgs(
        type="LOCAL",
        modes=[
            "LOCAL_DOCKER_LAYER_CACHE",
            "LOCAL_SOURCE_CACHE",
        ],
    ),
    environment=aws.codebuild.ProjectEnvironmentArgs(
        compute_type="BUILD_GENERAL1_SMALL",
        image="aws/codebuild/standard:1.0",
        type="LINUX_CONTAINER",
        image_pull_credentials_type="CODEBUILD",
        environment_variables=[aws.codebuild.ProjectEnvironmentEnvironmentVariableArgs(
            name="SOME_KEY1",
            value="SOME_VALUE1",
        )],
    ),
    source=aws.codebuild.ProjectSourceArgs(
        type="GITHUB",
        location="https://github.com/mitchellh/packer.git",
        git_clone_depth=1,
    ),
    tags={
        "Environment": "Test",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleBucketV2 = new Aws.S3.BucketV2("exampleBucketV2");

    var exampleBucketAclV2 = new Aws.S3.BucketAclV2("exampleBucketAclV2", new()
    {
        Bucket = exampleBucketV2.Id,
        Acl = "private",
    });

    var exampleRole = new Aws.Iam.Role("exampleRole", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Effect"": ""Allow"",
      ""Principal"": {
        ""Service"": ""codebuild.amazonaws.com""
      },
      ""Action"": ""sts:AssumeRole""
    }
  ]
}
",
    });

    var exampleRolePolicy = new Aws.Iam.RolePolicy("exampleRolePolicy", new()
    {
        Role = exampleRole.Name,
        Policy = Output.Tuple(exampleBucketV2.Arn, exampleBucketV2.Arn).Apply(values =>
        {
            var exampleBucketV2Arn = values.Item1;
            var exampleBucketV2Arn1 = values.Item2;
            return @$"{{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {{
      ""Effect"": ""Allow"",
      ""Resource"": [
        ""*""
      ],
      ""Action"": [
        ""logs:CreateLogGroup"",
        ""logs:CreateLogStream"",
        ""logs:PutLogEvents""
      ]
    }},
    {{
      ""Effect"": ""Allow"",
      ""Action"": [
        ""ec2:CreateNetworkInterface"",
        ""ec2:DescribeDhcpOptions"",
        ""ec2:DescribeNetworkInterfaces"",
        ""ec2:DeleteNetworkInterface"",
        ""ec2:DescribeSubnets"",
        ""ec2:DescribeSecurityGroups"",
        ""ec2:DescribeVpcs""
      ],
      ""Resource"": ""*""
    }},
    {{
      ""Effect"": ""Allow"",
      ""Action"": [
        ""ec2:CreateNetworkInterfacePermission""
      ],
      ""Resource"": [
        ""arn:aws:ec2:us-east-1:123456789012:network-interface/*""
      ],
      ""Condition"": {{
        ""StringEquals"": {{
          ""ec2:Subnet"": [
            ""{aws_subnet.Example1.Arn}"",
            ""{aws_subnet.Example2.Arn}""
          ],
          ""ec2:AuthorizedService"": ""codebuild.amazonaws.com""
        }}
      }}
    }},
    {{
      ""Effect"": ""Allow"",
      ""Action"": [
        ""s3:*""
      ],
      ""Resource"": [
        ""{exampleBucketV2Arn}"",
        ""{exampleBucketV2Arn1}/*""
      ]
    }}
  ]
}}
";
        }),
    });

    var exampleProject = new Aws.CodeBuild.Project("exampleProject", new()
    {
        Description = "test_codebuild_project",
        BuildTimeout = 5,
        ServiceRole = exampleRole.Arn,
        Artifacts = new Aws.CodeBuild.Inputs.ProjectArtifactsArgs
        {
            Type = "NO_ARTIFACTS",
        },
        Cache = new Aws.CodeBuild.Inputs.ProjectCacheArgs
        {
            Type = "S3",
            Location = exampleBucketV2.Bucket,
        },
        Environment = new Aws.CodeBuild.Inputs.ProjectEnvironmentArgs
        {
            ComputeType = "BUILD_GENERAL1_SMALL",
            Image = "aws/codebuild/standard:1.0",
            Type = "LINUX_CONTAINER",
            ImagePullCredentialsType = "CODEBUILD",
            EnvironmentVariables = new[]
            {
                new Aws.CodeBuild.Inputs.ProjectEnvironmentEnvironmentVariableArgs
                {
                    Name = "SOME_KEY1",
                    Value = "SOME_VALUE1",
                },
                new Aws.CodeBuild.Inputs.ProjectEnvironmentEnvironmentVariableArgs
                {
                    Name = "SOME_KEY2",
                    Value = "SOME_VALUE2",
                    Type = "PARAMETER_STORE",
                },
            },
        },
        LogsConfig = new Aws.CodeBuild.Inputs.ProjectLogsConfigArgs
        {
            CloudwatchLogs = new Aws.CodeBuild.Inputs.ProjectLogsConfigCloudwatchLogsArgs
            {
                GroupName = "log-group",
                StreamName = "log-stream",
            },
            S3Logs = new Aws.CodeBuild.Inputs.ProjectLogsConfigS3LogsArgs
            {
                Status = "ENABLED",
                Location = exampleBucketV2.Id.Apply(id => $"{id}/build-log"),
            },
        },
        Source = new Aws.CodeBuild.Inputs.ProjectSourceArgs
        {
            Type = "GITHUB",
            Location = "https://github.com/mitchellh/packer.git",
            GitCloneDepth = 1,
            GitSubmodulesConfig = new Aws.CodeBuild.Inputs.ProjectSourceGitSubmodulesConfigArgs
            {
                FetchSubmodules = true,
            },
        },
        SourceVersion = "master",
        VpcConfig = new Aws.CodeBuild.Inputs.ProjectVpcConfigArgs
        {
            VpcId = aws_vpc.Example.Id,
            Subnets = new[]
            {
                aws_subnet.Example1.Id,
                aws_subnet.Example2.Id,
            },
            SecurityGroupIds = new[]
            {
                aws_security_group.Example1.Id,
                aws_security_group.Example2.Id,
            },
        },
        Tags = 
        {
            { "Environment", "Test" },
        },
    });

    var project_with_cache = new Aws.CodeBuild.Project("project-with-cache", new()
    {
        Description = "test_codebuild_project_cache",
        BuildTimeout = 5,
        QueuedTimeout = 5,
        ServiceRole = exampleRole.Arn,
        Artifacts = new Aws.CodeBuild.Inputs.ProjectArtifactsArgs
        {
            Type = "NO_ARTIFACTS",
        },
        Cache = new Aws.CodeBuild.Inputs.ProjectCacheArgs
        {
            Type = "LOCAL",
            Modes = new[]
            {
                "LOCAL_DOCKER_LAYER_CACHE",
                "LOCAL_SOURCE_CACHE",
            },
        },
        Environment = new Aws.CodeBuild.Inputs.ProjectEnvironmentArgs
        {
            ComputeType = "BUILD_GENERAL1_SMALL",
            Image = "aws/codebuild/standard:1.0",
            Type = "LINUX_CONTAINER",
            ImagePullCredentialsType = "CODEBUILD",
            EnvironmentVariables = new[]
            {
                new Aws.CodeBuild.Inputs.ProjectEnvironmentEnvironmentVariableArgs
                {
                    Name = "SOME_KEY1",
                    Value = "SOME_VALUE1",
                },
            },
        },
        Source = new Aws.CodeBuild.Inputs.ProjectSourceArgs
        {
            Type = "GITHUB",
            Location = "https://github.com/mitchellh/packer.git",
            GitCloneDepth = 1,
        },
        Tags = 
        {
            { "Environment", "Test" },
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/codebuild"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		exampleBucketV2, err := s3.NewBucketV2(ctx, "exampleBucketV2", nil)
		if err != nil {
			return err
		}
		_, err = s3.NewBucketAclV2(ctx, "exampleBucketAclV2", &s3.BucketAclV2Args{
			Bucket: exampleBucketV2.ID(),
			Acl:    pulumi.String("private"),
		})
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
        "Service": "codebuild.amazonaws.com"
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
		_, err = iam.NewRolePolicy(ctx, "exampleRolePolicy", &iam.RolePolicyArgs{
			Role: exampleRole.Name,
			Policy: pulumi.All(exampleBucketV2.Arn, exampleBucketV2.Arn).ApplyT(func(_args []interface{}) (string, error) {
				exampleBucketV2Arn := _args[0].(string)
				exampleBucketV2Arn1 := _args[1].(string)
				return fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Resource": [
        "*"
      ],
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "ec2:CreateNetworkInterface",
        "ec2:DescribeDhcpOptions",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DeleteNetworkInterface",
        "ec2:DescribeSubnets",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeVpcs"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ec2:CreateNetworkInterfacePermission"
      ],
      "Resource": [
        "arn:aws:ec2:us-east-1:123456789012:network-interface/*"
      ],
      "Condition": {
        "StringEquals": {
          "ec2:Subnet": [
            "%v",
            "%v"
          ],
          "ec2:AuthorizedService": "codebuild.amazonaws.com"
        }
      }
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:*"
      ],
      "Resource": [
        "%v",
        "%v/*"
      ]
    }
  ]
}
`, aws_subnet.Example1.Arn, aws_subnet.Example2.Arn, exampleBucketV2Arn, exampleBucketV2Arn1), nil
			}).(pulumi.StringOutput),
		})
		if err != nil {
			return err
		}
		_, err = codebuild.NewProject(ctx, "exampleProject", &codebuild.ProjectArgs{
			Description:  pulumi.String("test_codebuild_project"),
			BuildTimeout: pulumi.Int(5),
			ServiceRole:  exampleRole.Arn,
			Artifacts: &codebuild.ProjectArtifactsArgs{
				Type: pulumi.String("NO_ARTIFACTS"),
			},
			Cache: &codebuild.ProjectCacheArgs{
				Type:     pulumi.String("S3"),
				Location: exampleBucketV2.Bucket,
			},
			Environment: &codebuild.ProjectEnvironmentArgs{
				ComputeType:              pulumi.String("BUILD_GENERAL1_SMALL"),
				Image:                    pulumi.String("aws/codebuild/standard:1.0"),
				Type:                     pulumi.String("LINUX_CONTAINER"),
				ImagePullCredentialsType: pulumi.String("CODEBUILD"),
				EnvironmentVariables: codebuild.ProjectEnvironmentEnvironmentVariableArray{
					&codebuild.ProjectEnvironmentEnvironmentVariableArgs{
						Name:  pulumi.String("SOME_KEY1"),
						Value: pulumi.String("SOME_VALUE1"),
					},
					&codebuild.ProjectEnvironmentEnvironmentVariableArgs{
						Name:  pulumi.String("SOME_KEY2"),
						Value: pulumi.String("SOME_VALUE2"),
						Type:  pulumi.String("PARAMETER_STORE"),
					},
				},
			},
			LogsConfig: &codebuild.ProjectLogsConfigArgs{
				CloudwatchLogs: &codebuild.ProjectLogsConfigCloudwatchLogsArgs{
					GroupName:  pulumi.String("log-group"),
					StreamName: pulumi.String("log-stream"),
				},
				S3Logs: &codebuild.ProjectLogsConfigS3LogsArgs{
					Status: pulumi.String("ENABLED"),
					Location: exampleBucketV2.ID().ApplyT(func(id string) (string, error) {
						return fmt.Sprintf("%v/build-log", id), nil
					}).(pulumi.StringOutput),
				},
			},
			Source: &codebuild.ProjectSourceArgs{
				Type:          pulumi.String("GITHUB"),
				Location:      pulumi.String("https://github.com/mitchellh/packer.git"),
				GitCloneDepth: pulumi.Int(1),
				GitSubmodulesConfig: &codebuild.ProjectSourceGitSubmodulesConfigArgs{
					FetchSubmodules: pulumi.Bool(true),
				},
			},
			SourceVersion: pulumi.String("master"),
			VpcConfig: &codebuild.ProjectVpcConfigArgs{
				VpcId: pulumi.Any(aws_vpc.Example.Id),
				Subnets: pulumi.StringArray{
					pulumi.Any(aws_subnet.Example1.Id),
					pulumi.Any(aws_subnet.Example2.Id),
				},
				SecurityGroupIds: pulumi.StringArray{
					pulumi.Any(aws_security_group.Example1.Id),
					pulumi.Any(aws_security_group.Example2.Id),
				},
			},
			Tags: pulumi.StringMap{
				"Environment": pulumi.String("Test"),
			},
		})
		if err != nil {
			return err
		}
		_, err = codebuild.NewProject(ctx, "project-with-cache", &codebuild.ProjectArgs{
			Description:   pulumi.String("test_codebuild_project_cache"),
			BuildTimeout:  pulumi.Int(5),
			QueuedTimeout: pulumi.Int(5),
			ServiceRole:   exampleRole.Arn,
			Artifacts: &codebuild.ProjectArtifactsArgs{
				Type: pulumi.String("NO_ARTIFACTS"),
			},
			Cache: &codebuild.ProjectCacheArgs{
				Type: pulumi.String("LOCAL"),
				Modes: pulumi.StringArray{
					pulumi.String("LOCAL_DOCKER_LAYER_CACHE"),
					pulumi.String("LOCAL_SOURCE_CACHE"),
				},
			},
			Environment: &codebuild.ProjectEnvironmentArgs{
				ComputeType:              pulumi.String("BUILD_GENERAL1_SMALL"),
				Image:                    pulumi.String("aws/codebuild/standard:1.0"),
				Type:                     pulumi.String("LINUX_CONTAINER"),
				ImagePullCredentialsType: pulumi.String("CODEBUILD"),
				EnvironmentVariables: codebuild.ProjectEnvironmentEnvironmentVariableArray{
					&codebuild.ProjectEnvironmentEnvironmentVariableArgs{
						Name:  pulumi.String("SOME_KEY1"),
						Value: pulumi.String("SOME_VALUE1"),
					},
				},
			},
			Source: &codebuild.ProjectSourceArgs{
				Type:          pulumi.String("GITHUB"),
				Location:      pulumi.String("https://github.com/mitchellh/packer.git"),
				GitCloneDepth: pulumi.Int(1),
			},
			Tags: pulumi.StringMap{
				"Environment": pulumi.String("Test"),
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
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.s3.BucketAclV2;
import com.pulumi.aws.s3.BucketAclV2Args;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.iam.RolePolicy;
import com.pulumi.aws.iam.RolePolicyArgs;
import com.pulumi.aws.codebuild.Project;
import com.pulumi.aws.codebuild.ProjectArgs;
import com.pulumi.aws.codebuild.inputs.ProjectArtifactsArgs;
import com.pulumi.aws.codebuild.inputs.ProjectCacheArgs;
import com.pulumi.aws.codebuild.inputs.ProjectEnvironmentArgs;
import com.pulumi.aws.codebuild.inputs.ProjectLogsConfigArgs;
import com.pulumi.aws.codebuild.inputs.ProjectLogsConfigCloudwatchLogsArgs;
import com.pulumi.aws.codebuild.inputs.ProjectLogsConfigS3LogsArgs;
import com.pulumi.aws.codebuild.inputs.ProjectSourceArgs;
import com.pulumi.aws.codebuild.inputs.ProjectSourceGitSubmodulesConfigArgs;
import com.pulumi.aws.codebuild.inputs.ProjectVpcConfigArgs;
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
        var exampleBucketV2 = new BucketV2("exampleBucketV2");

        var exampleBucketAclV2 = new BucketAclV2("exampleBucketAclV2", BucketAclV2Args.builder()        
            .bucket(exampleBucketV2.id())
            .acl("private")
            .build());

        var exampleRole = new Role("exampleRole", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
            """)
            .build());

        var exampleRolePolicy = new RolePolicy("exampleRolePolicy", RolePolicyArgs.builder()        
            .role(exampleRole.name())
            .policy(Output.tuple(exampleBucketV2.arn(), exampleBucketV2.arn()).applyValue(values -> {
                var exampleBucketV2Arn = values.t1;
                var exampleBucketV2Arn1 = values.t2;
                return """
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Resource": [
        "*"
      ],
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "ec2:CreateNetworkInterface",
        "ec2:DescribeDhcpOptions",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DeleteNetworkInterface",
        "ec2:DescribeSubnets",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeVpcs"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ec2:CreateNetworkInterfacePermission"
      ],
      "Resource": [
        "arn:aws:ec2:us-east-1:123456789012:network-interface/*"
      ],
      "Condition": {
        "StringEquals": {
          "ec2:Subnet": [
            "%s",
            "%s"
          ],
          "ec2:AuthorizedService": "codebuild.amazonaws.com"
        }
      }
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:*"
      ],
      "Resource": [
        "%s",
        "%s/*"
      ]
    }
  ]
}
", aws_subnet.example1().arn(),aws_subnet.example2().arn(),exampleBucketV2Arn,exampleBucketV2Arn1);
            }))
            .build());

        var exampleProject = new Project("exampleProject", ProjectArgs.builder()        
            .description("test_codebuild_project")
            .buildTimeout("5")
            .serviceRole(exampleRole.arn())
            .artifacts(ProjectArtifactsArgs.builder()
                .type("NO_ARTIFACTS")
                .build())
            .cache(ProjectCacheArgs.builder()
                .type("S3")
                .location(exampleBucketV2.bucket())
                .build())
            .environment(ProjectEnvironmentArgs.builder()
                .computeType("BUILD_GENERAL1_SMALL")
                .image("aws/codebuild/standard:1.0")
                .type("LINUX_CONTAINER")
                .imagePullCredentialsType("CODEBUILD")
                .environmentVariables(                
                    ProjectEnvironmentEnvironmentVariableArgs.builder()
                        .name("SOME_KEY1")
                        .value("SOME_VALUE1")
                        .build(),
                    ProjectEnvironmentEnvironmentVariableArgs.builder()
                        .name("SOME_KEY2")
                        .value("SOME_VALUE2")
                        .type("PARAMETER_STORE")
                        .build())
                .build())
            .logsConfig(ProjectLogsConfigArgs.builder()
                .cloudwatchLogs(ProjectLogsConfigCloudwatchLogsArgs.builder()
                    .groupName("log-group")
                    .streamName("log-stream")
                    .build())
                .s3Logs(ProjectLogsConfigS3LogsArgs.builder()
                    .status("ENABLED")
                    .location(exampleBucketV2.id().applyValue(id -> String.format("%s/build-log", id)))
                    .build())
                .build())
            .source(ProjectSourceArgs.builder()
                .type("GITHUB")
                .location("https://github.com/mitchellh/packer.git")
                .gitCloneDepth(1)
                .gitSubmodulesConfig(ProjectSourceGitSubmodulesConfigArgs.builder()
                    .fetchSubmodules(true)
                    .build())
                .build())
            .sourceVersion("master")
            .vpcConfig(ProjectVpcConfigArgs.builder()
                .vpcId(aws_vpc.example().id())
                .subnets(                
                    aws_subnet.example1().id(),
                    aws_subnet.example2().id())
                .securityGroupIds(                
                    aws_security_group.example1().id(),
                    aws_security_group.example2().id())
                .build())
            .tags(Map.of("Environment", "Test"))
            .build());

        var project_with_cache = new Project("project-with-cache", ProjectArgs.builder()        
            .description("test_codebuild_project_cache")
            .buildTimeout("5")
            .queuedTimeout("5")
            .serviceRole(exampleRole.arn())
            .artifacts(ProjectArtifactsArgs.builder()
                .type("NO_ARTIFACTS")
                .build())
            .cache(ProjectCacheArgs.builder()
                .type("LOCAL")
                .modes(                
                    "LOCAL_DOCKER_LAYER_CACHE",
                    "LOCAL_SOURCE_CACHE")
                .build())
            .environment(ProjectEnvironmentArgs.builder()
                .computeType("BUILD_GENERAL1_SMALL")
                .image("aws/codebuild/standard:1.0")
                .type("LINUX_CONTAINER")
                .imagePullCredentialsType("CODEBUILD")
                .environmentVariables(ProjectEnvironmentEnvironmentVariableArgs.builder()
                    .name("SOME_KEY1")
                    .value("SOME_VALUE1")
                    .build())
                .build())
            .source(ProjectSourceArgs.builder()
                .type("GITHUB")
                .location("https://github.com/mitchellh/packer.git")
                .gitCloneDepth(1)
                .build())
            .tags(Map.of("Environment", "Test"))
            .build());

    }
}
```
```yaml
resources:
  exampleBucketV2:
    type: aws:s3:BucketV2
  exampleBucketAclV2:
    type: aws:s3:BucketAclV2
    properties:
      bucket: ${exampleBucketV2.id}
      acl: private
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
                "Service": "codebuild.amazonaws.com"
              },
              "Action": "sts:AssumeRole"
            }
          ]
        }
  exampleRolePolicy:
    type: aws:iam:RolePolicy
    properties:
      role: ${exampleRole.name}
      policy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Resource": [
                "*"
              ],
              "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
              ]
            },
            {
              "Effect": "Allow",
              "Action": [
                "ec2:CreateNetworkInterface",
                "ec2:DescribeDhcpOptions",
                "ec2:DescribeNetworkInterfaces",
                "ec2:DeleteNetworkInterface",
                "ec2:DescribeSubnets",
                "ec2:DescribeSecurityGroups",
                "ec2:DescribeVpcs"
              ],
              "Resource": "*"
            },
            {
              "Effect": "Allow",
              "Action": [
                "ec2:CreateNetworkInterfacePermission"
              ],
              "Resource": [
                "arn:aws:ec2:us-east-1:123456789012:network-interface/*"
              ],
              "Condition": {
                "StringEquals": {
                  "ec2:Subnet": [
                    "${aws_subnet.example1.arn}",
                    "${aws_subnet.example2.arn}"
                  ],
                  "ec2:AuthorizedService": "codebuild.amazonaws.com"
                }
              }
            },
            {
              "Effect": "Allow",
              "Action": [
                "s3:*"
              ],
              "Resource": [
                "${exampleBucketV2.arn}",
                "${exampleBucketV2.arn}/*"
              ]
            }
          ]
        }
  exampleProject:
    type: aws:codebuild:Project
    properties:
      description: test_codebuild_project
      buildTimeout: 5
      serviceRole: ${exampleRole.arn}
      artifacts:
        type: NO_ARTIFACTS
      cache:
        type: S3
        location: ${exampleBucketV2.bucket}
      environment:
        computeType: BUILD_GENERAL1_SMALL
        image: aws/codebuild/standard:1.0
        type: LINUX_CONTAINER
        imagePullCredentialsType: CODEBUILD
        environmentVariables:
          - name: SOME_KEY1
            value: SOME_VALUE1
          - name: SOME_KEY2
            value: SOME_VALUE2
            type: PARAMETER_STORE
      logsConfig:
        cloudwatchLogs:
          groupName: log-group
          streamName: log-stream
        s3Logs:
          status: ENABLED
          location: ${exampleBucketV2.id}/build-log
      source:
        type: GITHUB
        location: https://github.com/mitchellh/packer.git
        gitCloneDepth: 1
        gitSubmodulesConfig:
          fetchSubmodules: true
      sourceVersion: master
      vpcConfig:
        vpcId: ${aws_vpc.example.id}
        subnets:
          - ${aws_subnet.example1.id}
          - ${aws_subnet.example2.id}
        securityGroupIds:
          - ${aws_security_group.example1.id}
          - ${aws_security_group.example2.id}
      tags:
        Environment: Test
  project-with-cache:
    type: aws:codebuild:Project
    properties:
      description: test_codebuild_project_cache
      buildTimeout: 5
      queuedTimeout: 5
      serviceRole: ${exampleRole.arn}
      artifacts:
        type: NO_ARTIFACTS
      cache:
        type: LOCAL
        modes:
          - LOCAL_DOCKER_LAYER_CACHE
          - LOCAL_SOURCE_CACHE
      environment:
        computeType: BUILD_GENERAL1_SMALL
        image: aws/codebuild/standard:1.0
        type: LINUX_CONTAINER
        imagePullCredentialsType: CODEBUILD
        environmentVariables:
          - name: SOME_KEY1
            value: SOME_VALUE1
      source:
        type: GITHUB
        location: https://github.com/mitchellh/packer.git
        gitCloneDepth: 1
      tags:
        Environment: Test
```
{{% /example %}}
{{% /examples %}}

## Import

CodeBuild Project can be imported using the `name`, e.g.,

```sh
 $ pulumi import aws:codebuild/project:Project name project-name
```

 
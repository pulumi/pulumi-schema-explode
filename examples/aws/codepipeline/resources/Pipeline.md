Provides a CodePipeline.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.codestarconnections.Connection("example", {providerType: "GitHub"});
const codepipelineBucket = new aws.s3.BucketV2("codepipelineBucket", {});
const codepipelineRole = new aws.iam.Role("codepipelineRole", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codepipeline.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
`});
const s3kmskey = aws.kms.getAlias({
    name: "alias/myKmsKey",
});
const codepipeline = new aws.codepipeline.Pipeline("codepipeline", {
    roleArn: codepipelineRole.arn,
    artifactStores: [{
        location: codepipelineBucket.bucket,
        type: "S3",
        encryptionKey: {
            id: s3kmskey.then(s3kmskey => s3kmskey.arn),
            type: "KMS",
        },
    }],
    stages: [
        {
            name: "Source",
            actions: [{
                name: "Source",
                category: "Source",
                owner: "AWS",
                provider: "CodeStarSourceConnection",
                version: "1",
                outputArtifacts: ["source_output"],
                configuration: {
                    ConnectionArn: example.arn,
                    FullRepositoryId: "my-organization/example",
                    BranchName: "main",
                },
            }],
        },
        {
            name: "Build",
            actions: [{
                name: "Build",
                category: "Build",
                owner: "AWS",
                provider: "CodeBuild",
                inputArtifacts: ["source_output"],
                outputArtifacts: ["build_output"],
                version: "1",
                configuration: {
                    ProjectName: "test",
                },
            }],
        },
        {
            name: "Deploy",
            actions: [{
                name: "Deploy",
                category: "Deploy",
                owner: "AWS",
                provider: "CloudFormation",
                inputArtifacts: ["build_output"],
                version: "1",
                configuration: {
                    ActionMode: "REPLACE_ON_FAILURE",
                    Capabilities: "CAPABILITY_AUTO_EXPAND,CAPABILITY_IAM",
                    OutputFileName: "CreateStackOutput.json",
                    StackName: "MyStack",
                    TemplatePath: "build_output::sam-templated.yaml",
                },
            }],
        },
    ],
});
const codepipelineBucketAcl = new aws.s3.BucketAclV2("codepipelineBucketAcl", {
    bucket: codepipelineBucket.id,
    acl: "private",
});
const codepipelinePolicy = new aws.iam.RolePolicy("codepipelinePolicy", {
    role: codepipelineRole.id,
    policy: pulumi.interpolate`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect":"Allow",
      "Action": [
        "s3:GetObject",
        "s3:GetObjectVersion",
        "s3:GetBucketVersioning",
        "s3:PutObjectAcl",
        "s3:PutObject"
      ],
      "Resource": [
        "${codepipelineBucket.arn}",
        "${codepipelineBucket.arn}/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "codestar-connections:UseConnection"
      ],
      "Resource": "${example.arn}"
    },
    {
      "Effect": "Allow",
      "Action": [
        "codebuild:BatchGetBuilds",
        "codebuild:StartBuild"
      ],
      "Resource": "*"
    }
  ]
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.codestarconnections.Connection("example", provider_type="GitHub")
codepipeline_bucket = aws.s3.BucketV2("codepipelineBucket")
codepipeline_role = aws.iam.Role("codepipelineRole", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codepipeline.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
""")
s3kmskey = aws.kms.get_alias(name="alias/myKmsKey")
codepipeline = aws.codepipeline.Pipeline("codepipeline",
    role_arn=codepipeline_role.arn,
    artifact_stores=[aws.codepipeline.PipelineArtifactStoreArgs(
        location=codepipeline_bucket.bucket,
        type="S3",
        encryption_key=aws.codepipeline.PipelineArtifactStoreEncryptionKeyArgs(
            id=s3kmskey.arn,
            type="KMS",
        ),
    )],
    stages=[
        aws.codepipeline.PipelineStageArgs(
            name="Source",
            actions=[aws.codepipeline.PipelineStageActionArgs(
                name="Source",
                category="Source",
                owner="AWS",
                provider="CodeStarSourceConnection",
                version="1",
                output_artifacts=["source_output"],
                configuration={
                    "ConnectionArn": example.arn,
                    "FullRepositoryId": "my-organization/example",
                    "BranchName": "main",
                },
            )],
        ),
        aws.codepipeline.PipelineStageArgs(
            name="Build",
            actions=[aws.codepipeline.PipelineStageActionArgs(
                name="Build",
                category="Build",
                owner="AWS",
                provider="CodeBuild",
                input_artifacts=["source_output"],
                output_artifacts=["build_output"],
                version="1",
                configuration={
                    "ProjectName": "test",
                },
            )],
        ),
        aws.codepipeline.PipelineStageArgs(
            name="Deploy",
            actions=[aws.codepipeline.PipelineStageActionArgs(
                name="Deploy",
                category="Deploy",
                owner="AWS",
                provider="CloudFormation",
                input_artifacts=["build_output"],
                version="1",
                configuration={
                    "ActionMode": "REPLACE_ON_FAILURE",
                    "Capabilities": "CAPABILITY_AUTO_EXPAND,CAPABILITY_IAM",
                    "OutputFileName": "CreateStackOutput.json",
                    "StackName": "MyStack",
                    "TemplatePath": "build_output::sam-templated.yaml",
                },
            )],
        ),
    ])
codepipeline_bucket_acl = aws.s3.BucketAclV2("codepipelineBucketAcl",
    bucket=codepipeline_bucket.id,
    acl="private")
codepipeline_policy = aws.iam.RolePolicy("codepipelinePolicy",
    role=codepipeline_role.id,
    policy=pulumi.Output.all(codepipeline_bucket.arn, codepipeline_bucket.arn, example.arn).apply(lambda codepipelineBucketArn, codepipelineBucketArn1, exampleArn: f"""{{
  "Version": "2012-10-17",
  "Statement": [
    {{
      "Effect":"Allow",
      "Action": [
        "s3:GetObject",
        "s3:GetObjectVersion",
        "s3:GetBucketVersioning",
        "s3:PutObjectAcl",
        "s3:PutObject"
      ],
      "Resource": [
        "{codepipeline_bucket_arn}",
        "{codepipeline_bucket_arn1}/*"
      ]
    }},
    {{
      "Effect": "Allow",
      "Action": [
        "codestar-connections:UseConnection"
      ],
      "Resource": "{example_arn}"
    }},
    {{
      "Effect": "Allow",
      "Action": [
        "codebuild:BatchGetBuilds",
        "codebuild:StartBuild"
      ],
      "Resource": "*"
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
    var example = new Aws.CodeStarConnections.Connection("example", new()
    {
        ProviderType = "GitHub",
    });

    var codepipelineBucket = new Aws.S3.BucketV2("codepipelineBucket");

    var codepipelineRole = new Aws.Iam.Role("codepipelineRole", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Effect"": ""Allow"",
      ""Principal"": {
        ""Service"": ""codepipeline.amazonaws.com""
      },
      ""Action"": ""sts:AssumeRole""
    }
  ]
}
",
    });

    var s3kmskey = Aws.Kms.GetAlias.Invoke(new()
    {
        Name = "alias/myKmsKey",
    });

    var codepipeline = new Aws.CodePipeline.Pipeline("codepipeline", new()
    {
        RoleArn = codepipelineRole.Arn,
        ArtifactStores = new[]
        {
            new Aws.CodePipeline.Inputs.PipelineArtifactStoreArgs
            {
                Location = codepipelineBucket.Bucket,
                Type = "S3",
                EncryptionKey = new Aws.CodePipeline.Inputs.PipelineArtifactStoreEncryptionKeyArgs
                {
                    Id = s3kmskey.Apply(getAliasResult => getAliasResult.Arn),
                    Type = "KMS",
                },
            },
        },
        Stages = new[]
        {
            new Aws.CodePipeline.Inputs.PipelineStageArgs
            {
                Name = "Source",
                Actions = new[]
                {
                    new Aws.CodePipeline.Inputs.PipelineStageActionArgs
                    {
                        Name = "Source",
                        Category = "Source",
                        Owner = "AWS",
                        Provider = "CodeStarSourceConnection",
                        Version = "1",
                        OutputArtifacts = new[]
                        {
                            "source_output",
                        },
                        Configuration = 
                        {
                            { "ConnectionArn", example.Arn },
                            { "FullRepositoryId", "my-organization/example" },
                            { "BranchName", "main" },
                        },
                    },
                },
            },
            new Aws.CodePipeline.Inputs.PipelineStageArgs
            {
                Name = "Build",
                Actions = new[]
                {
                    new Aws.CodePipeline.Inputs.PipelineStageActionArgs
                    {
                        Name = "Build",
                        Category = "Build",
                        Owner = "AWS",
                        Provider = "CodeBuild",
                        InputArtifacts = new[]
                        {
                            "source_output",
                        },
                        OutputArtifacts = new[]
                        {
                            "build_output",
                        },
                        Version = "1",
                        Configuration = 
                        {
                            { "ProjectName", "test" },
                        },
                    },
                },
            },
            new Aws.CodePipeline.Inputs.PipelineStageArgs
            {
                Name = "Deploy",
                Actions = new[]
                {
                    new Aws.CodePipeline.Inputs.PipelineStageActionArgs
                    {
                        Name = "Deploy",
                        Category = "Deploy",
                        Owner = "AWS",
                        Provider = "CloudFormation",
                        InputArtifacts = new[]
                        {
                            "build_output",
                        },
                        Version = "1",
                        Configuration = 
                        {
                            { "ActionMode", "REPLACE_ON_FAILURE" },
                            { "Capabilities", "CAPABILITY_AUTO_EXPAND,CAPABILITY_IAM" },
                            { "OutputFileName", "CreateStackOutput.json" },
                            { "StackName", "MyStack" },
                            { "TemplatePath", "build_output::sam-templated.yaml" },
                        },
                    },
                },
            },
        },
    });

    var codepipelineBucketAcl = new Aws.S3.BucketAclV2("codepipelineBucketAcl", new()
    {
        Bucket = codepipelineBucket.Id,
        Acl = "private",
    });

    var codepipelinePolicy = new Aws.Iam.RolePolicy("codepipelinePolicy", new()
    {
        Role = codepipelineRole.Id,
        Policy = Output.Tuple(codepipelineBucket.Arn, codepipelineBucket.Arn, example.Arn).Apply(values =>
        {
            var codepipelineBucketArn = values.Item1;
            var codepipelineBucketArn1 = values.Item2;
            var exampleArn = values.Item3;
            return @$"{{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {{
      ""Effect"":""Allow"",
      ""Action"": [
        ""s3:GetObject"",
        ""s3:GetObjectVersion"",
        ""s3:GetBucketVersioning"",
        ""s3:PutObjectAcl"",
        ""s3:PutObject""
      ],
      ""Resource"": [
        ""{codepipelineBucketArn}"",
        ""{codepipelineBucketArn1}/*""
      ]
    }},
    {{
      ""Effect"": ""Allow"",
      ""Action"": [
        ""codestar-connections:UseConnection""
      ],
      ""Resource"": ""{exampleArn}""
    }},
    {{
      ""Effect"": ""Allow"",
      ""Action"": [
        ""codebuild:BatchGetBuilds"",
        ""codebuild:StartBuild""
      ],
      ""Resource"": ""*""
    }}
  ]
}}
";
        }),
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/codepipeline"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/codestarconnections"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/kms"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		example, err := codestarconnections.NewConnection(ctx, "example", &codestarconnections.ConnectionArgs{
			ProviderType: pulumi.String("GitHub"),
		})
		if err != nil {
			return err
		}
		codepipelineBucket, err := s3.NewBucketV2(ctx, "codepipelineBucket", nil)
		if err != nil {
			return err
		}
		codepipelineRole, err := iam.NewRole(ctx, "codepipelineRole", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codepipeline.amazonaws.com"
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
		s3kmskey, err := kms.LookupAlias(ctx, &kms.LookupAliasArgs{
			Name: "alias/myKmsKey",
		}, nil)
		if err != nil {
			return err
		}
		_, err = codepipeline.NewPipeline(ctx, "codepipeline", &codepipeline.PipelineArgs{
			RoleArn: codepipelineRole.Arn,
			ArtifactStores: codepipeline.PipelineArtifactStoreArray{
				&codepipeline.PipelineArtifactStoreArgs{
					Location: codepipelineBucket.Bucket,
					Type:     pulumi.String("S3"),
					EncryptionKey: &codepipeline.PipelineArtifactStoreEncryptionKeyArgs{
						Id:   pulumi.String(s3kmskey.Arn),
						Type: pulumi.String("KMS"),
					},
				},
			},
			Stages: codepipeline.PipelineStageArray{
				&codepipeline.PipelineStageArgs{
					Name: pulumi.String("Source"),
					Actions: codepipeline.PipelineStageActionArray{
						&codepipeline.PipelineStageActionArgs{
							Name:     pulumi.String("Source"),
							Category: pulumi.String("Source"),
							Owner:    pulumi.String("AWS"),
							Provider: pulumi.String("CodeStarSourceConnection"),
							Version:  pulumi.String("1"),
							OutputArtifacts: pulumi.StringArray{
								pulumi.String("source_output"),
							},
							Configuration: pulumi.StringMap{
								"ConnectionArn":    example.Arn,
								"FullRepositoryId": pulumi.String("my-organization/example"),
								"BranchName":       pulumi.String("main"),
							},
						},
					},
				},
				&codepipeline.PipelineStageArgs{
					Name: pulumi.String("Build"),
					Actions: codepipeline.PipelineStageActionArray{
						&codepipeline.PipelineStageActionArgs{
							Name:     pulumi.String("Build"),
							Category: pulumi.String("Build"),
							Owner:    pulumi.String("AWS"),
							Provider: pulumi.String("CodeBuild"),
							InputArtifacts: pulumi.StringArray{
								pulumi.String("source_output"),
							},
							OutputArtifacts: pulumi.StringArray{
								pulumi.String("build_output"),
							},
							Version: pulumi.String("1"),
							Configuration: pulumi.StringMap{
								"ProjectName": pulumi.String("test"),
							},
						},
					},
				},
				&codepipeline.PipelineStageArgs{
					Name: pulumi.String("Deploy"),
					Actions: codepipeline.PipelineStageActionArray{
						&codepipeline.PipelineStageActionArgs{
							Name:     pulumi.String("Deploy"),
							Category: pulumi.String("Deploy"),
							Owner:    pulumi.String("AWS"),
							Provider: pulumi.String("CloudFormation"),
							InputArtifacts: pulumi.StringArray{
								pulumi.String("build_output"),
							},
							Version: pulumi.String("1"),
							Configuration: pulumi.StringMap{
								"ActionMode":     pulumi.String("REPLACE_ON_FAILURE"),
								"Capabilities":   pulumi.String("CAPABILITY_AUTO_EXPAND,CAPABILITY_IAM"),
								"OutputFileName": pulumi.String("CreateStackOutput.json"),
								"StackName":      pulumi.String("MyStack"),
								"TemplatePath":   pulumi.String("build_output::sam-templated.yaml"),
							},
						},
					},
				},
			},
		})
		if err != nil {
			return err
		}
		_, err = s3.NewBucketAclV2(ctx, "codepipelineBucketAcl", &s3.BucketAclV2Args{
			Bucket: codepipelineBucket.ID(),
			Acl:    pulumi.String("private"),
		})
		if err != nil {
			return err
		}
		_, err = iam.NewRolePolicy(ctx, "codepipelinePolicy", &iam.RolePolicyArgs{
			Role: codepipelineRole.ID(),
			Policy: pulumi.All(codepipelineBucket.Arn, codepipelineBucket.Arn, example.Arn).ApplyT(func(_args []interface{}) (string, error) {
				codepipelineBucketArn := _args[0].(string)
				codepipelineBucketArn1 := _args[1].(string)
				exampleArn := _args[2].(string)
				return fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect":"Allow",
      "Action": [
        "s3:GetObject",
        "s3:GetObjectVersion",
        "s3:GetBucketVersioning",
        "s3:PutObjectAcl",
        "s3:PutObject"
      ],
      "Resource": [
        "%v",
        "%v/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "codestar-connections:UseConnection"
      ],
      "Resource": "%v"
    },
    {
      "Effect": "Allow",
      "Action": [
        "codebuild:BatchGetBuilds",
        "codebuild:StartBuild"
      ],
      "Resource": "*"
    }
  ]
}
`, codepipelineBucketArn, codepipelineBucketArn1, exampleArn), nil
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
import com.pulumi.aws.codestarconnections.Connection;
import com.pulumi.aws.codestarconnections.ConnectionArgs;
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.kms.KmsFunctions;
import com.pulumi.aws.kms.inputs.GetAliasArgs;
import com.pulumi.aws.codepipeline.Pipeline;
import com.pulumi.aws.codepipeline.PipelineArgs;
import com.pulumi.aws.codepipeline.inputs.PipelineArtifactStoreArgs;
import com.pulumi.aws.codepipeline.inputs.PipelineArtifactStoreEncryptionKeyArgs;
import com.pulumi.aws.codepipeline.inputs.PipelineStageArgs;
import com.pulumi.aws.s3.BucketAclV2;
import com.pulumi.aws.s3.BucketAclV2Args;
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
        var example = new Connection("example", ConnectionArgs.builder()        
            .providerType("GitHub")
            .build());

        var codepipelineBucket = new BucketV2("codepipelineBucket");

        var codepipelineRole = new Role("codepipelineRole", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codepipeline.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
            """)
            .build());

        final var s3kmskey = KmsFunctions.getAlias(GetAliasArgs.builder()
            .name("alias/myKmsKey")
            .build());

        var codepipeline = new Pipeline("codepipeline", PipelineArgs.builder()        
            .roleArn(codepipelineRole.arn())
            .artifactStores(PipelineArtifactStoreArgs.builder()
                .location(codepipelineBucket.bucket())
                .type("S3")
                .encryptionKey(PipelineArtifactStoreEncryptionKeyArgs.builder()
                    .id(s3kmskey.applyValue(getAliasResult -> getAliasResult.arn()))
                    .type("KMS")
                    .build())
                .build())
            .stages(            
                PipelineStageArgs.builder()
                    .name("Source")
                    .actions(PipelineStageActionArgs.builder()
                        .name("Source")
                        .category("Source")
                        .owner("AWS")
                        .provider("CodeStarSourceConnection")
                        .version("1")
                        .outputArtifacts("source_output")
                        .configuration(Map.ofEntries(
                            Map.entry("ConnectionArn", example.arn()),
                            Map.entry("FullRepositoryId", "my-organization/example"),
                            Map.entry("BranchName", "main")
                        ))
                        .build())
                    .build(),
                PipelineStageArgs.builder()
                    .name("Build")
                    .actions(PipelineStageActionArgs.builder()
                        .name("Build")
                        .category("Build")
                        .owner("AWS")
                        .provider("CodeBuild")
                        .inputArtifacts("source_output")
                        .outputArtifacts("build_output")
                        .version("1")
                        .configuration(Map.of("ProjectName", "test"))
                        .build())
                    .build(),
                PipelineStageArgs.builder()
                    .name("Deploy")
                    .actions(PipelineStageActionArgs.builder()
                        .name("Deploy")
                        .category("Deploy")
                        .owner("AWS")
                        .provider("CloudFormation")
                        .inputArtifacts("build_output")
                        .version("1")
                        .configuration(Map.ofEntries(
                            Map.entry("ActionMode", "REPLACE_ON_FAILURE"),
                            Map.entry("Capabilities", "CAPABILITY_AUTO_EXPAND,CAPABILITY_IAM"),
                            Map.entry("OutputFileName", "CreateStackOutput.json"),
                            Map.entry("StackName", "MyStack"),
                            Map.entry("TemplatePath", "build_output::sam-templated.yaml")
                        ))
                        .build())
                    .build())
            .build());

        var codepipelineBucketAcl = new BucketAclV2("codepipelineBucketAcl", BucketAclV2Args.builder()        
            .bucket(codepipelineBucket.id())
            .acl("private")
            .build());

        var codepipelinePolicy = new RolePolicy("codepipelinePolicy", RolePolicyArgs.builder()        
            .role(codepipelineRole.id())
            .policy(Output.tuple(codepipelineBucket.arn(), codepipelineBucket.arn(), example.arn()).applyValue(values -> {
                var codepipelineBucketArn = values.t1;
                var codepipelineBucketArn1 = values.t2;
                var exampleArn = values.t3;
                return """
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect":"Allow",
      "Action": [
        "s3:GetObject",
        "s3:GetObjectVersion",
        "s3:GetBucketVersioning",
        "s3:PutObjectAcl",
        "s3:PutObject"
      ],
      "Resource": [
        "%s",
        "%s/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "codestar-connections:UseConnection"
      ],
      "Resource": "%s"
    },
    {
      "Effect": "Allow",
      "Action": [
        "codebuild:BatchGetBuilds",
        "codebuild:StartBuild"
      ],
      "Resource": "*"
    }
  ]
}
", codepipelineBucketArn,codepipelineBucketArn1,exampleArn);
            }))
            .build());

    }
}
```
```yaml
resources:
  codepipeline:
    type: aws:codepipeline:Pipeline
    properties:
      roleArn: ${codepipelineRole.arn}
      artifactStores:
        - location: ${codepipelineBucket.bucket}
          type: S3
          encryptionKey:
            id: ${s3kmskey.arn}
            type: KMS
      stages:
        - name: Source
          actions:
            - name: Source
              category: Source
              owner: AWS
              provider: CodeStarSourceConnection
              version: 1
              outputArtifacts:
                - source_output
              configuration:
                ConnectionArn: ${example.arn}
                FullRepositoryId: my-organization/example
                BranchName: main
        - name: Build
          actions:
            - name: Build
              category: Build
              owner: AWS
              provider: CodeBuild
              inputArtifacts:
                - source_output
              outputArtifacts:
                - build_output
              version: 1
              configuration:
                ProjectName: test
        - name: Deploy
          actions:
            - name: Deploy
              category: Deploy
              owner: AWS
              provider: CloudFormation
              inputArtifacts:
                - build_output
              version: 1
              configuration:
                ActionMode: REPLACE_ON_FAILURE
                Capabilities: CAPABILITY_AUTO_EXPAND,CAPABILITY_IAM
                OutputFileName: CreateStackOutput.json
                StackName: MyStack
                TemplatePath: build_output::sam-templated.yaml
  example:
    type: aws:codestarconnections:Connection
    properties:
      providerType: GitHub
  codepipelineBucket:
    type: aws:s3:BucketV2
  codepipelineBucketAcl:
    type: aws:s3:BucketAclV2
    properties:
      bucket: ${codepipelineBucket.id}
      acl: private
  codepipelineRole:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "Service": "codepipeline.amazonaws.com"
              },
              "Action": "sts:AssumeRole"
            }
          ]
        }
  codepipelinePolicy:
    type: aws:iam:RolePolicy
    properties:
      role: ${codepipelineRole.id}
      policy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect":"Allow",
              "Action": [
                "s3:GetObject",
                "s3:GetObjectVersion",
                "s3:GetBucketVersioning",
                "s3:PutObjectAcl",
                "s3:PutObject"
              ],
              "Resource": [
                "${codepipelineBucket.arn}",
                "${codepipelineBucket.arn}/*"
              ]
            },
            {
              "Effect": "Allow",
              "Action": [
                "codestar-connections:UseConnection"
              ],
              "Resource": "${example.arn}"
            },
            {
              "Effect": "Allow",
              "Action": [
                "codebuild:BatchGetBuilds",
                "codebuild:StartBuild"
              ],
              "Resource": "*"
            }
          ]
        }
variables:
  s3kmskey:
    Fn::Invoke:
      Function: aws:kms:getAlias
      Arguments:
        name: alias/myKmsKey
```
{{% /example %}}
{{% /examples %}}

## Import

CodePipelines can be imported using the name, e.g.,

```sh
 $ pulumi import aws:codepipeline/pipeline:Pipeline foo example
```

 
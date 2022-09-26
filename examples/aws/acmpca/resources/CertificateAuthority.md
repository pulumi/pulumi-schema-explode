Provides a resource to manage AWS Certificate Manager Private Certificate Authorities (ACM PCA Certificate Authorities).

> **NOTE:** Creating this resource will leave the certificate authority in a `PENDING_CERTIFICATE` status, which means it cannot yet issue certificates. To complete this setup, you must fully sign the certificate authority CSR available in the `certificate_signing_request` attribute and import the signed certificate using the AWS SDK, CLI or Console. This provider can support another resource to manage that workflow automatically in the future.

{{% examples %}}
## Example Usage
{{% example %}}
### Basic

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.acmpca.CertificateAuthority("example", {
    certificateAuthorityConfiguration: {
        keyAlgorithm: "RSA_4096",
        signingAlgorithm: "SHA512WITHRSA",
        subject: {
            commonName: "example.com",
        },
    },
    permanentDeletionTimeInDays: 7,
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.acmpca.CertificateAuthority("example",
    certificate_authority_configuration=aws.acmpca.CertificateAuthorityCertificateAuthorityConfigurationArgs(
        key_algorithm="RSA_4096",
        signing_algorithm="SHA512WITHRSA",
        subject=aws.acmpca.CertificateAuthorityCertificateAuthorityConfigurationSubjectArgs(
            common_name="example.com",
        ),
    ),
    permanent_deletion_time_in_days=7)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Acmpca.CertificateAuthority("example", new()
    {
        CertificateAuthorityConfiguration = new Aws.Acmpca.Inputs.CertificateAuthorityCertificateAuthorityConfigurationArgs
        {
            KeyAlgorithm = "RSA_4096",
            SigningAlgorithm = "SHA512WITHRSA",
            Subject = new Aws.Acmpca.Inputs.CertificateAuthorityCertificateAuthorityConfigurationSubjectArgs
            {
                CommonName = "example.com",
            },
        },
        PermanentDeletionTimeInDays = 7,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/acmpca"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := acmpca.NewCertificateAuthority(ctx, "example", &acmpca.CertificateAuthorityArgs{
			CertificateAuthorityConfiguration: &acmpca.CertificateAuthorityCertificateAuthorityConfigurationArgs{
				KeyAlgorithm:     pulumi.String("RSA_4096"),
				SigningAlgorithm: pulumi.String("SHA512WITHRSA"),
				Subject: &acmpca.CertificateAuthorityCertificateAuthorityConfigurationSubjectArgs{
					CommonName: pulumi.String("example.com"),
				},
			},
			PermanentDeletionTimeInDays: pulumi.Int(7),
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
import com.pulumi.aws.acmpca.CertificateAuthority;
import com.pulumi.aws.acmpca.CertificateAuthorityArgs;
import com.pulumi.aws.acmpca.inputs.CertificateAuthorityCertificateAuthorityConfigurationArgs;
import com.pulumi.aws.acmpca.inputs.CertificateAuthorityCertificateAuthorityConfigurationSubjectArgs;
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
        var example = new CertificateAuthority("example", CertificateAuthorityArgs.builder()        
            .certificateAuthorityConfiguration(CertificateAuthorityCertificateAuthorityConfigurationArgs.builder()
                .keyAlgorithm("RSA_4096")
                .signingAlgorithm("SHA512WITHRSA")
                .subject(CertificateAuthorityCertificateAuthorityConfigurationSubjectArgs.builder()
                    .commonName("example.com")
                    .build())
                .build())
            .permanentDeletionTimeInDays(7)
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:acmpca:CertificateAuthority
    properties:
      certificateAuthorityConfiguration:
        keyAlgorithm: RSA_4096
        signingAlgorithm: SHA512WITHRSA
        subject:
          commonName: example.com
      permanentDeletionTimeInDays: 7
```
{{% /example %}}
{{% example %}}
### Enable Certificate Revocation List

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleBucketV2 = new aws.s3.BucketV2("exampleBucketV2", {});
const acmpcaBucketAccess = aws.iam.getPolicyDocumentOutput({
    statements: [{
        actions: [
            "s3:GetBucketAcl",
            "s3:GetBucketLocation",
            "s3:PutObject",
            "s3:PutObjectAcl",
        ],
        resources: [
            exampleBucketV2.arn,
            pulumi.interpolate`${exampleBucketV2.arn}/*`,
        ],
        principals: [{
            identifiers: ["acm-pca.amazonaws.com"],
            type: "Service",
        }],
    }],
});
const exampleBucketPolicy = new aws.s3.BucketPolicy("exampleBucketPolicy", {
    bucket: exampleBucketV2.id,
    policy: acmpcaBucketAccess.apply(acmpcaBucketAccess => acmpcaBucketAccess.json),
});
const exampleCertificateAuthority = new aws.acmpca.CertificateAuthority("exampleCertificateAuthority", {
    certificateAuthorityConfiguration: {
        keyAlgorithm: "RSA_4096",
        signingAlgorithm: "SHA512WITHRSA",
        subject: {
            commonName: "example.com",
        },
    },
    revocationConfiguration: {
        crlConfiguration: {
            customCname: "crl.example.com",
            enabled: true,
            expirationInDays: 7,
            s3BucketName: exampleBucketV2.id,
        },
    },
}, {
    dependsOn: [exampleBucketPolicy],
});
```
```python
import pulumi
import pulumi_aws as aws

example_bucket_v2 = aws.s3.BucketV2("exampleBucketV2")
acmpca_bucket_access = aws.iam.get_policy_document_output(statements=[aws.iam.GetPolicyDocumentStatementArgs(
    actions=[
        "s3:GetBucketAcl",
        "s3:GetBucketLocation",
        "s3:PutObject",
        "s3:PutObjectAcl",
    ],
    resources=[
        example_bucket_v2.arn,
        example_bucket_v2.arn.apply(lambda arn: f"{arn}/*"),
    ],
    principals=[aws.iam.GetPolicyDocumentStatementPrincipalArgs(
        identifiers=["acm-pca.amazonaws.com"],
        type="Service",
    )],
)])
example_bucket_policy = aws.s3.BucketPolicy("exampleBucketPolicy",
    bucket=example_bucket_v2.id,
    policy=acmpca_bucket_access.json)
example_certificate_authority = aws.acmpca.CertificateAuthority("exampleCertificateAuthority",
    certificate_authority_configuration=aws.acmpca.CertificateAuthorityCertificateAuthorityConfigurationArgs(
        key_algorithm="RSA_4096",
        signing_algorithm="SHA512WITHRSA",
        subject=aws.acmpca.CertificateAuthorityCertificateAuthorityConfigurationSubjectArgs(
            common_name="example.com",
        ),
    ),
    revocation_configuration=aws.acmpca.CertificateAuthorityRevocationConfigurationArgs(
        crl_configuration=aws.acmpca.CertificateAuthorityRevocationConfigurationCrlConfigurationArgs(
            custom_cname="crl.example.com",
            enabled=True,
            expiration_in_days=7,
            s3_bucket_name=example_bucket_v2.id,
        ),
    ),
    opts=pulumi.ResourceOptions(depends_on=[example_bucket_policy]))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleBucketV2 = new Aws.S3.BucketV2("exampleBucketV2");

    var acmpcaBucketAccess = Aws.Iam.GetPolicyDocument.Invoke(new()
    {
        Statements = new[]
        {
            new Aws.Iam.Inputs.GetPolicyDocumentStatementInputArgs
            {
                Actions = new[]
                {
                    "s3:GetBucketAcl",
                    "s3:GetBucketLocation",
                    "s3:PutObject",
                    "s3:PutObjectAcl",
                },
                Resources = new[]
                {
                    exampleBucketV2.Arn,
                    $"{exampleBucketV2.Arn}/*",
                },
                Principals = new[]
                {
                    new Aws.Iam.Inputs.GetPolicyDocumentStatementPrincipalInputArgs
                    {
                        Identifiers = new[]
                        {
                            "acm-pca.amazonaws.com",
                        },
                        Type = "Service",
                    },
                },
            },
        },
    });

    var exampleBucketPolicy = new Aws.S3.BucketPolicy("exampleBucketPolicy", new()
    {
        Bucket = exampleBucketV2.Id,
        Policy = acmpcaBucketAccess.Apply(getPolicyDocumentResult => getPolicyDocumentResult.Json),
    });

    var exampleCertificateAuthority = new Aws.Acmpca.CertificateAuthority("exampleCertificateAuthority", new()
    {
        CertificateAuthorityConfiguration = new Aws.Acmpca.Inputs.CertificateAuthorityCertificateAuthorityConfigurationArgs
        {
            KeyAlgorithm = "RSA_4096",
            SigningAlgorithm = "SHA512WITHRSA",
            Subject = new Aws.Acmpca.Inputs.CertificateAuthorityCertificateAuthorityConfigurationSubjectArgs
            {
                CommonName = "example.com",
            },
        },
        RevocationConfiguration = new Aws.Acmpca.Inputs.CertificateAuthorityRevocationConfigurationArgs
        {
            CrlConfiguration = new Aws.Acmpca.Inputs.CertificateAuthorityRevocationConfigurationCrlConfigurationArgs
            {
                CustomCname = "crl.example.com",
                Enabled = true,
                ExpirationInDays = 7,
                S3BucketName = exampleBucketV2.Id,
            },
        },
    }, new CustomResourceOptions
    {
        DependsOn = new[]
        {
            exampleBucketPolicy,
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/acmpca"
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
		acmpcaBucketAccess := iam.GetPolicyDocumentOutput(ctx, iam.GetPolicyDocumentOutputArgs{
			Statements: iam.GetPolicyDocumentStatementArray{
				&iam.GetPolicyDocumentStatementArgs{
					Actions: pulumi.StringArray{
						pulumi.String("s3:GetBucketAcl"),
						pulumi.String("s3:GetBucketLocation"),
						pulumi.String("s3:PutObject"),
						pulumi.String("s3:PutObjectAcl"),
					},
					Resources: pulumi.StringArray{
						exampleBucketV2.Arn,
						exampleBucketV2.Arn.ApplyT(func(arn string) (string, error) {
							return fmt.Sprintf("%v/*", arn), nil
						}).(pulumi.StringOutput),
					},
					Principals: iam.GetPolicyDocumentStatementPrincipalArray{
						&iam.GetPolicyDocumentStatementPrincipalArgs{
							Identifiers: pulumi.StringArray{
								pulumi.String("acm-pca.amazonaws.com"),
							},
							Type: pulumi.String("Service"),
						},
					},
				},
			},
		}, nil)
		exampleBucketPolicy, err := s3.NewBucketPolicy(ctx, "exampleBucketPolicy", &s3.BucketPolicyArgs{
			Bucket: exampleBucketV2.ID(),
			Policy: acmpcaBucketAccess.ApplyT(func(acmpcaBucketAccess iam.GetPolicyDocumentResult) (string, error) {
				return acmpcaBucketAccess.Json, nil
			}).(pulumi.StringOutput),
		})
		if err != nil {
			return err
		}
		_, err = acmpca.NewCertificateAuthority(ctx, "exampleCertificateAuthority", &acmpca.CertificateAuthorityArgs{
			CertificateAuthorityConfiguration: &acmpca.CertificateAuthorityCertificateAuthorityConfigurationArgs{
				KeyAlgorithm:     pulumi.String("RSA_4096"),
				SigningAlgorithm: pulumi.String("SHA512WITHRSA"),
				Subject: &acmpca.CertificateAuthorityCertificateAuthorityConfigurationSubjectArgs{
					CommonName: pulumi.String("example.com"),
				},
			},
			RevocationConfiguration: &acmpca.CertificateAuthorityRevocationConfigurationArgs{
				CrlConfiguration: &acmpca.CertificateAuthorityRevocationConfigurationCrlConfigurationArgs{
					CustomCname:      pulumi.String("crl.example.com"),
					Enabled:          pulumi.Bool(true),
					ExpirationInDays: pulumi.Int(7),
					S3BucketName:     exampleBucketV2.ID(),
				},
			},
		}, pulumi.DependsOn([]pulumi.Resource{
			exampleBucketPolicy,
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
import com.pulumi.aws.s3.BucketV2;
import com.pulumi.aws.iam.IamFunctions;
import com.pulumi.aws.iam.inputs.GetPolicyDocumentArgs;
import com.pulumi.aws.s3.BucketPolicy;
import com.pulumi.aws.s3.BucketPolicyArgs;
import com.pulumi.aws.acmpca.CertificateAuthority;
import com.pulumi.aws.acmpca.CertificateAuthorityArgs;
import com.pulumi.aws.acmpca.inputs.CertificateAuthorityCertificateAuthorityConfigurationArgs;
import com.pulumi.aws.acmpca.inputs.CertificateAuthorityCertificateAuthorityConfigurationSubjectArgs;
import com.pulumi.aws.acmpca.inputs.CertificateAuthorityRevocationConfigurationArgs;
import com.pulumi.aws.acmpca.inputs.CertificateAuthorityRevocationConfigurationCrlConfigurationArgs;
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
        var exampleBucketV2 = new BucketV2("exampleBucketV2");

        final var acmpcaBucketAccess = IamFunctions.getPolicyDocument(GetPolicyDocumentArgs.builder()
            .statements(GetPolicyDocumentStatementArgs.builder()
                .actions(                
                    "s3:GetBucketAcl",
                    "s3:GetBucketLocation",
                    "s3:PutObject",
                    "s3:PutObjectAcl")
                .resources(                
                    exampleBucketV2.arn(),
                    exampleBucketV2.arn().applyValue(arn -> String.format("%s/*", arn)))
                .principals(GetPolicyDocumentStatementPrincipalArgs.builder()
                    .identifiers("acm-pca.amazonaws.com")
                    .type("Service")
                    .build())
                .build())
            .build());

        var exampleBucketPolicy = new BucketPolicy("exampleBucketPolicy", BucketPolicyArgs.builder()        
            .bucket(exampleBucketV2.id())
            .policy(acmpcaBucketAccess.applyValue(getPolicyDocumentResult -> getPolicyDocumentResult).applyValue(acmpcaBucketAccess -> acmpcaBucketAccess.applyValue(getPolicyDocumentResult -> getPolicyDocumentResult.json())))
            .build());

        var exampleCertificateAuthority = new CertificateAuthority("exampleCertificateAuthority", CertificateAuthorityArgs.builder()        
            .certificateAuthorityConfiguration(CertificateAuthorityCertificateAuthorityConfigurationArgs.builder()
                .keyAlgorithm("RSA_4096")
                .signingAlgorithm("SHA512WITHRSA")
                .subject(CertificateAuthorityCertificateAuthorityConfigurationSubjectArgs.builder()
                    .commonName("example.com")
                    .build())
                .build())
            .revocationConfiguration(CertificateAuthorityRevocationConfigurationArgs.builder()
                .crlConfiguration(CertificateAuthorityRevocationConfigurationCrlConfigurationArgs.builder()
                    .customCname("crl.example.com")
                    .enabled(true)
                    .expirationInDays(7)
                    .s3BucketName(exampleBucketV2.id())
                    .build())
                .build())
            .build(), CustomResourceOptions.builder()
                .dependsOn(exampleBucketPolicy)
                .build());

    }
}
```
```yaml
resources:
  exampleBucketV2:
    type: aws:s3:BucketV2
  exampleBucketPolicy:
    type: aws:s3:BucketPolicy
    properties:
      bucket: ${exampleBucketV2.id}
      policy: ${acmpcaBucketAccess.json}
  exampleCertificateAuthority:
    type: aws:acmpca:CertificateAuthority
    properties:
      certificateAuthorityConfiguration:
        keyAlgorithm: RSA_4096
        signingAlgorithm: SHA512WITHRSA
        subject:
          commonName: example.com
      revocationConfiguration:
        crlConfiguration:
          customCname: crl.example.com
          enabled: true
          expirationInDays: 7
          s3BucketName: ${exampleBucketV2.id}
    options:
      dependson:
        - ${exampleBucketPolicy}
variables:
  acmpcaBucketAccess:
    Fn::Invoke:
      Function: aws:iam:getPolicyDocument
      Arguments:
        statements:
          - actions:
              - s3:GetBucketAcl
              - s3:GetBucketLocation
              - s3:PutObject
              - s3:PutObjectAcl
            resources:
              - ${exampleBucketV2.arn}
              - ${exampleBucketV2.arn}/*
            principals:
              - identifiers:
                  - acm-pca.amazonaws.com
                type: Service
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_acmpca_certificate_authority` can be imported by using the certificate authority ARN, e.g.,

```sh
 $ pulumi import aws:acmpca/certificateAuthority:CertificateAuthority example arn:aws:acm-pca:us-east-1:123456789012:certificate-authority/12345678-1234-1234-1234-123456789012
```

 
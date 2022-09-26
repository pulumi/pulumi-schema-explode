The ACM certificate resource allows requesting and management of certificates
from the Amazon Certificate Manager.

It deals with requesting certificates and managing their attributes and life-cycle.
This resource does not deal with validation of a certificate but can provide inputs
for other resources implementing the validation. It does not wait for a certificate to be issued.
Use a `aws.acm.CertificateValidation` resource for this.

Most commonly, this resource is used together with `aws.route53.Record` and
`aws.acm.CertificateValidation` to request a DNS validated certificate,
deploy the required validation records and wait for validation to complete.

Domain validation through E-Mail is also supported but should be avoided as it requires a manual step outside
of this provider.

{{% examples %}}
## Example Usage
{{% example %}}
### Create Certificate

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const cert = new aws.acm.Certificate("cert", {
    domainName: "example.com",
    tags: {
        Environment: "test",
    },
    validationMethod: "DNS",
});
```
```python
import pulumi
import pulumi_aws as aws

cert = aws.acm.Certificate("cert",
    domain_name="example.com",
    tags={
        "Environment": "test",
    },
    validation_method="DNS")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var cert = new Aws.Acm.Certificate("cert", new()
    {
        DomainName = "example.com",
        Tags = 
        {
            { "Environment", "test" },
        },
        ValidationMethod = "DNS",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/acm"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := acm.NewCertificate(ctx, "cert", &acm.CertificateArgs{
			DomainName: pulumi.String("example.com"),
			Tags: pulumi.StringMap{
				"Environment": pulumi.String("test"),
			},
			ValidationMethod: pulumi.String("DNS"),
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
import com.pulumi.aws.acm.Certificate;
import com.pulumi.aws.acm.CertificateArgs;
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
        var cert = new Certificate("cert", CertificateArgs.builder()        
            .domainName("example.com")
            .tags(Map.of("Environment", "test"))
            .validationMethod("DNS")
            .build());

    }
}
```
```yaml
resources:
  cert:
    type: aws:acm:Certificate
    properties:
      domainName: example.com
      tags:
        Environment: test
      validationMethod: DNS
```
{{% /example %}}
{{% example %}}
### Custom Domain Validation Options

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const cert = new aws.acm.Certificate("cert", {
    domainName: "testing.example.com",
    validationMethod: "EMAIL",
    validationOptions: [{
        domainName: "testing.example.com",
        validationDomain: "example.com",
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

cert = aws.acm.Certificate("cert",
    domain_name="testing.example.com",
    validation_method="EMAIL",
    validation_options=[aws.acm.CertificateValidationOptionArgs(
        domain_name="testing.example.com",
        validation_domain="example.com",
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var cert = new Aws.Acm.Certificate("cert", new()
    {
        DomainName = "testing.example.com",
        ValidationMethod = "EMAIL",
        ValidationOptions = new[]
        {
            new Aws.Acm.Inputs.CertificateValidationOptionArgs
            {
                DomainName = "testing.example.com",
                ValidationDomain = "example.com",
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/acm"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := acm.NewCertificate(ctx, "cert", &acm.CertificateArgs{
			DomainName:       pulumi.String("testing.example.com"),
			ValidationMethod: pulumi.String("EMAIL"),
			ValidationOptions: acm.CertificateValidationOptionArray{
				&acm.CertificateValidationOptionArgs{
					DomainName:       pulumi.String("testing.example.com"),
					ValidationDomain: pulumi.String("example.com"),
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
import com.pulumi.aws.acm.Certificate;
import com.pulumi.aws.acm.CertificateArgs;
import com.pulumi.aws.acm.inputs.CertificateValidationOptionArgs;
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
        var cert = new Certificate("cert", CertificateArgs.builder()        
            .domainName("testing.example.com")
            .validationMethod("EMAIL")
            .validationOptions(CertificateValidationOptionArgs.builder()
                .domainName("testing.example.com")
                .validationDomain("example.com")
                .build())
            .build());

    }
}
```
```yaml
resources:
  cert:
    type: aws:acm:Certificate
    properties:
      domainName: testing.example.com
      validationMethod: EMAIL
      validationOptions:
        - domainName: testing.example.com
          validationDomain: example.com
```
{{% /example %}}
{{% example %}}
### Existing Certificate Body Import

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as tls from "@pulumi/tls";

const examplePrivateKey = new tls.PrivateKey("examplePrivateKey", {algorithm: "RSA"});
const exampleSelfSignedCert = new tls.SelfSignedCert("exampleSelfSignedCert", {
    keyAlgorithm: "RSA",
    privateKeyPem: examplePrivateKey.privateKeyPem,
    subjects: [{
        commonName: "example.com",
        organization: "ACME Examples, Inc",
    }],
    validityPeriodHours: 12,
    allowedUses: [
        "key_encipherment",
        "digital_signature",
        "server_auth",
    ],
});
const cert = new aws.acm.Certificate("cert", {
    privateKey: examplePrivateKey.privateKeyPem,
    certificateBody: exampleSelfSignedCert.certPem,
});
```
```python
import pulumi
import pulumi_aws as aws
import pulumi_tls as tls

example_private_key = tls.PrivateKey("examplePrivateKey", algorithm="RSA")
example_self_signed_cert = tls.SelfSignedCert("exampleSelfSignedCert",
    key_algorithm="RSA",
    private_key_pem=example_private_key.private_key_pem,
    subjects=[tls.SelfSignedCertSubjectArgs(
        common_name="example.com",
        organization="ACME Examples, Inc",
    )],
    validity_period_hours=12,
    allowed_uses=[
        "key_encipherment",
        "digital_signature",
        "server_auth",
    ])
cert = aws.acm.Certificate("cert",
    private_key=example_private_key.private_key_pem,
    certificate_body=example_self_signed_cert.cert_pem)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;
using Tls = Pulumi.Tls;

return await Deployment.RunAsync(() => 
{
    var examplePrivateKey = new Tls.PrivateKey("examplePrivateKey", new()
    {
        Algorithm = "RSA",
    });

    var exampleSelfSignedCert = new Tls.SelfSignedCert("exampleSelfSignedCert", new()
    {
        KeyAlgorithm = "RSA",
        PrivateKeyPem = examplePrivateKey.PrivateKeyPem,
        Subjects = new[]
        {
            new Tls.Inputs.SelfSignedCertSubjectArgs
            {
                CommonName = "example.com",
                Organization = "ACME Examples, Inc",
            },
        },
        ValidityPeriodHours = 12,
        AllowedUses = new[]
        {
            "key_encipherment",
            "digital_signature",
            "server_auth",
        },
    });

    var cert = new Aws.Acm.Certificate("cert", new()
    {
        PrivateKey = examplePrivateKey.PrivateKeyPem,
        CertificateBody = exampleSelfSignedCert.CertPem,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/acm"
	"github.com/pulumi/pulumi-tls/sdk/v4/go/tls"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		examplePrivateKey, err := tls.NewPrivateKey(ctx, "examplePrivateKey", &tls.PrivateKeyArgs{
			Algorithm: pulumi.String("RSA"),
		})
		if err != nil {
			return err
		}
		exampleSelfSignedCert, err := tls.NewSelfSignedCert(ctx, "exampleSelfSignedCert", &tls.SelfSignedCertArgs{
			KeyAlgorithm:  pulumi.String("RSA"),
			PrivateKeyPem: examplePrivateKey.PrivateKeyPem,
			Subjects: SelfSignedCertSubjectArray{
				&SelfSignedCertSubjectArgs{
					CommonName:   pulumi.String("example.com"),
					Organization: pulumi.String("ACME Examples, Inc"),
				},
			},
			ValidityPeriodHours: pulumi.Int(12),
			AllowedUses: pulumi.StringArray{
				pulumi.String("key_encipherment"),
				pulumi.String("digital_signature"),
				pulumi.String("server_auth"),
			},
		})
		if err != nil {
			return err
		}
		_, err = acm.NewCertificate(ctx, "cert", &acm.CertificateArgs{
			PrivateKey:      examplePrivateKey.PrivateKeyPem,
			CertificateBody: exampleSelfSignedCert.CertPem,
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
import com.pulumi.tls.PrivateKey;
import com.pulumi.tls.PrivateKeyArgs;
import com.pulumi.tls.SelfSignedCert;
import com.pulumi.tls.SelfSignedCertArgs;
import com.pulumi.tls.inputs.SelfSignedCertSubjectArgs;
import com.pulumi.aws.acm.Certificate;
import com.pulumi.aws.acm.CertificateArgs;
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
        var examplePrivateKey = new PrivateKey("examplePrivateKey", PrivateKeyArgs.builder()        
            .algorithm("RSA")
            .build());

        var exampleSelfSignedCert = new SelfSignedCert("exampleSelfSignedCert", SelfSignedCertArgs.builder()        
            .keyAlgorithm("RSA")
            .privateKeyPem(examplePrivateKey.privateKeyPem())
            .subjects(SelfSignedCertSubjectArgs.builder()
                .commonName("example.com")
                .organization("ACME Examples, Inc")
                .build())
            .validityPeriodHours(12)
            .allowedUses(            
                "key_encipherment",
                "digital_signature",
                "server_auth")
            .build());

        var cert = new Certificate("cert", CertificateArgs.builder()        
            .privateKey(examplePrivateKey.privateKeyPem())
            .certificateBody(exampleSelfSignedCert.certPem())
            .build());

    }
}
```
```yaml
resources:
  examplePrivateKey:
    type: tls:PrivateKey
    properties:
      algorithm: RSA
  exampleSelfSignedCert:
    type: tls:SelfSignedCert
    properties:
      keyAlgorithm: RSA
      privateKeyPem: ${examplePrivateKey.privateKeyPem}
      subjects:
        - commonName: example.com
          organization: ACME Examples, Inc
      validityPeriodHours: 12
      allowedUses:
        - key_encipherment
        - digital_signature
        - server_auth
  cert:
    type: aws:acm:Certificate
    properties:
      privateKey: ${examplePrivateKey.privateKeyPem}
      certificateBody: ${exampleSelfSignedCert.certPem}
```
{{% /example %}}
{{% example %}}
### Referencing domain_validation_options With for_each Based Resources

See the `aws.acm.CertificateValidation` resource for a full example of performing DNS validation.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example: aws.route53.Record[];
for (const range of Object.entries(.reduce((__obj, dvo) => { ...__obj, [dvo.domainName]: {
    name: dvo.resourceRecordName,
    record: dvo.resourceRecordValue,
    type: dvo.resourceRecordType,
} })).map(([k, v]) => {key: k, value: v})) {
    example.push(new aws.route53.Record(`example-${range.key}`, {
        allowOverwrite: true,
        name: range.value.name,
        records: [range.value.record],
        ttl: 60,
        type: aws.route53.recordtype.RecordType[range.value.type],
        zoneId: aws_route53_zone.example.zone_id,
    }));
}
```
```python
import pulumi
import pulumi_aws as aws

example = []
for range in [{"key": k, "value": v} for [k, v] in enumerate({dvo.domainName: {
    name: dvo.resourceRecordName,
    record: dvo.resourceRecordValue,
    type: dvo.resourceRecordType,
} for dvo in aws_acm_certificate.example.domain_validation_options})]:
    example.append(aws.route53.Record(f"example-{range['key']}",
        allow_overwrite=True,
        name=range["value"]["name"],
        records=[range["value"]["record"]],
        ttl=60,
        type=aws.route53/recordtype.RecordType(range["value"]["type"]),
        zone_id=aws_route53_zone["example"]["zone_id"]))
```
```yaml
resources:
  example:
    type: aws:route53:Record
    properties:
      allowOverwrite: true
      name: ${range.value.name}
      records:
        - ${range.value.record}
      ttl: 60
      type: ${range.value.type}
      zoneId: ${aws_route53_zone.example.zone_id}
    options: {}
```
{{% /example %}}
{{% /examples %}}

## Import

Certificates can be imported using their ARN, e.g.,

```sh
 $ pulumi import aws:acm/certificate:Certificate cert arn:aws:acm:eu-central-1:123456789012:certificate/7e7a28d2-163f-4b8f-b9cd-822f96c08d6a
```

 
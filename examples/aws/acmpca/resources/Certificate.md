Provides a resource to issue a certificate using AWS Certificate Manager Private Certificate Authority (ACM PCA).

{{% examples %}}
## Example Usage
{{% example %}}
### Basic

```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.acmpca.CertificateAuthority;
import com.pulumi.aws.acmpca.CertificateAuthorityArgs;
import com.pulumi.tls.PrivateKey;
import com.pulumi.tls.PrivateKeyArgs;
import com.pulumi.tls.CertRequest;
import com.pulumi.tls.CertRequestArgs;
import com.pulumi.tls.inputs.CertRequestSubjectArgs;
import com.pulumi.aws.acmpca.Certificate;
import com.pulumi.aws.acmpca.CertificateArgs;
import com.pulumi.aws.acmpca.inputs.CertificateValidityArgs;
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
        var exampleCertificateAuthority = new CertificateAuthority("exampleCertificateAuthority", CertificateAuthorityArgs.builder()        
            .privateCertificateConfiguration(%!v(PANIC=Format method: runtime error: invalid memory address or nil pointer dereference))
            .permanentDeletionTimeInDays(7)
            .build());

        var key = new PrivateKey("key", PrivateKeyArgs.builder()        
            .algorithm("RSA")
            .build());

        var csr = new CertRequest("csr", CertRequestArgs.builder()        
            .keyAlgorithm("RSA")
            .privateKeyPem(key.privateKeyPem())
            .subjects(CertRequestSubjectArgs.builder()
                .commonName("example")
                .build())
            .build());

        var exampleCertificate = new Certificate("exampleCertificate", CertificateArgs.builder()        
            .certificateAuthorityArn(exampleCertificateAuthority.arn())
            .certificateSigningRequest(csr.certRequestPem())
            .signingAlgorithm("SHA256WITHRSA")
            .validity(CertificateValidityArgs.builder()
                .type("YEARS")
                .value(1)
                .build())
            .build());

    }
}
```
```yaml
resources:
  exampleCertificate:
    type: aws:acmpca:Certificate
    properties:
      certificateAuthorityArn: ${exampleCertificateAuthority.arn}
      certificateSigningRequest: ${csr.certRequestPem}
      signingAlgorithm: SHA256WITHRSA
      validity:
        type: YEARS
        value: 1
  exampleCertificateAuthority:
    type: aws:acmpca:CertificateAuthority
    properties:
      privateCertificateConfiguration:
        - keyAlgorithm: RSA_4096
          signingAlgorithm: SHA512WITHRSA
          subject:
            - commonName: example.com
      permanentDeletionTimeInDays: 7
  key:
    type: tls:PrivateKey
    properties:
      algorithm: RSA
  csr:
    type: tls:CertRequest
    properties:
      keyAlgorithm: RSA
      privateKeyPem: ${key.privateKeyPem}
      subjects:
        - commonName: example
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_acmpca_certificate` can not be imported at this time. 
{{% examples %}}
## Example Usage
{{% example %}}

**Using certs on file:**

```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.iam.SigningCertificate;
import com.pulumi.aws.iam.SigningCertificateArgs;
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
        var testCert = new SigningCertificate("testCert", SigningCertificateArgs.builder()        
            .username("some_test_cert")
            .certificateBody(Files.readString(Paths.get("self-ca-cert.pem")))
            .build());

    }
}
```

**Example with cert in-line:**

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const testCertAlt = new aws.iam.SigningCertificate("test_cert_alt", {
    certificateBody: `-----BEGIN CERTIFICATE-----
[......] # cert contents
-----END CERTIFICATE-----
`,
    username: "some_test_cert",
});
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.iam.SigningCertificate;
import com.pulumi.aws.iam.SigningCertificateArgs;
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
        var testCertAlt = new SigningCertificate("testCertAlt", SigningCertificateArgs.builder()        
            .certificateBody("""
-----BEGIN CERTIFICATE-----
[......] # cert contents
-----END CERTIFICATE-----

            """)
            .username("some_test_cert")
            .build());

    }
}
```
```yaml
resources:
  testCertAlt:
    type: aws:iam:SigningCertificate
    properties:
      certificateBody: |+
        -----BEGIN CERTIFICATE-----
        [......] # cert contents
        -----END CERTIFICATE-----

      username: some_test_cert
```
{{% /example %}}
{{% /examples %}}

## Import

IAM Signing Certificates can be imported using the `id`, e.g.,

```sh
 $ pulumi import aws:iam/signingCertificate:SigningCertificate certificate IDIDIDIDID:user-name
```

 
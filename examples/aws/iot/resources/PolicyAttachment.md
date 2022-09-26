Provides an IoT policy attachment.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as fs from "fs";

const pubsub = new aws.iot.Policy("pubsub", {policy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "iot:*"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
`});
const cert = new aws.iot.Certificate("cert", {
    csr: fs.readFileSync("csr.pem"),
    active: true,
});
const att = new aws.iot.PolicyAttachment("att", {
    policy: pubsub.name,
    target: cert.arn,
});
```
```python
import pulumi
import pulumi_aws as aws

pubsub = aws.iot.Policy("pubsub", policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "iot:*"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
""")
cert = aws.iot.Certificate("cert",
    csr=(lambda path: open(path).read())("csr.pem"),
    active=True)
att = aws.iot.PolicyAttachment("att",
    policy=pubsub.name,
    target=cert.arn)
```
```csharp
using System.Collections.Generic;
using System.IO;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var pubsub = new Aws.Iot.Policy("pubsub", new()
    {
        PolicyDocument = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Action"": [
        ""iot:*""
      ],
      ""Effect"": ""Allow"",
      ""Resource"": ""*""
    }
  ]
}
",
    });

    var cert = new Aws.Iot.Certificate("cert", new()
    {
        Csr = File.ReadAllText("csr.pem"),
        Active = true,
    });

    var att = new Aws.Iot.PolicyAttachment("att", new()
    {
        Policy = pubsub.Name,
        Target = cert.Arn,
    });

});
```
```go
package main

import (
	"fmt"
	"io/ioutil"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iot"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func readFileOrPanic(path string) pulumi.StringPtrInput {
	data, err := ioutil.ReadFile(path)
	if err != nil {
		panic(err.Error())
	}
	return pulumi.String(string(data))
}

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		pubsub, err := iot.NewPolicy(ctx, "pubsub", &iot.PolicyArgs{
			Policy: pulumi.String(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "iot:*"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
`)),
		})
		if err != nil {
			return err
		}
		cert, err := iot.NewCertificate(ctx, "cert", &iot.CertificateArgs{
			Csr:    readFileOrPanic("csr.pem"),
			Active: pulumi.Bool(true),
		})
		if err != nil {
			return err
		}
		_, err = iot.NewPolicyAttachment(ctx, "att", &iot.PolicyAttachmentArgs{
			Policy: pubsub.Name,
			Target: cert.Arn,
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
import com.pulumi.aws.iot.Policy;
import com.pulumi.aws.iot.PolicyArgs;
import com.pulumi.aws.iot.Certificate;
import com.pulumi.aws.iot.CertificateArgs;
import com.pulumi.aws.iot.PolicyAttachment;
import com.pulumi.aws.iot.PolicyAttachmentArgs;
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
        var pubsub = new Policy("pubsub", PolicyArgs.builder()        
            .policy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "iot:*"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
            """)
            .build());

        var cert = new Certificate("cert", CertificateArgs.builder()        
            .csr(Files.readString(Paths.get("csr.pem")))
            .active(true)
            .build());

        var att = new PolicyAttachment("att", PolicyAttachmentArgs.builder()        
            .policy(pubsub.name())
            .target(cert.arn())
            .build());

    }
}
```
{{% /example %}}
{{% /examples %}}
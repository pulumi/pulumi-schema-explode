Attaches a resource based policy to a private CA.

{{% examples %}}
## Example Usage
{{% example %}}
### Basic

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.acmpca.Policy("example", {
    resourceArn: aws_acmpca_certificate_authority.example.arn,
    policy: `{                        
   "Version":"2012-10-17",
   "Statement":[
      {    
         "Sid":"1",
         "Effect":"Allow",         
         "Principal":{                                                                                                                                               
            "AWS":"${data.aws_caller_identity.current.account_id}"                                                                                
         },
         "Action":[
            "acm-pca:DescribeCertificateAuthority",
            "acm-pca:GetCertificate",
            "acm-pca:GetCertificateAuthorityCertificate",
            "acm-pca:ListPermissions",
            "acm-pca:ListTags"                                                                                   
         ],                                                                                              
         "Resource":"${aws_acmpca_certificate_authority.example.arn}"
      },
      {
         "Sid":"1",  
         "Effect":"Allow",
         "Principal":{
            "AWS":"${data.aws_caller_identity.current.account_id}"
         },
         "Action":[
            "acm-pca:IssueCertificate"
         ],
         "Resource":"${aws_acmpca_certificate_authority.example.arn}",
         "Condition":{
            "StringEquals":{
               "acm-pca:TemplateArn":"arn:aws:acm-pca:::template/EndEntityCertificate/V1"
            }
         }
      }
   ]
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.acmpca.Policy("example",
    resource_arn=aws_acmpca_certificate_authority["example"]["arn"],
    policy=f"""{{                        
   "Version":"2012-10-17",
   "Statement":[
      {{    
         "Sid":"1",
         "Effect":"Allow",         
         "Principal":{{                                                                                                                                               
            "AWS":"{data["aws_caller_identity"]["current"]["account_id"]}"                                                                                
         }},
         "Action":[
            "acm-pca:DescribeCertificateAuthority",
            "acm-pca:GetCertificate",
            "acm-pca:GetCertificateAuthorityCertificate",
            "acm-pca:ListPermissions",
            "acm-pca:ListTags"                                                                                   
         ],                                                                                              
         "Resource":"{aws_acmpca_certificate_authority["example"]["arn"]}"
      }},
      {{
         "Sid":"1",  
         "Effect":"Allow",
         "Principal":{{
            "AWS":"{data["aws_caller_identity"]["current"]["account_id"]}"
         }},
         "Action":[
            "acm-pca:IssueCertificate"
         ],
         "Resource":"{aws_acmpca_certificate_authority["example"]["arn"]}",
         "Condition":{{
            "StringEquals":{{
               "acm-pca:TemplateArn":"arn:aws:acm-pca:::template/EndEntityCertificate/V1"
            }}
         }}
      }}
   ]
}}
""")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Acmpca.Policy("example", new()
    {
        ResourceArn = aws_acmpca_certificate_authority.Example.Arn,
        PolicyDetails = @$"{{                        
   ""Version"":""2012-10-17"",
   ""Statement"":[
      {{    
         ""Sid"":""1"",
         ""Effect"":""Allow"",         
         ""Principal"":{{                                                                                                                                               
            ""AWS"":""{data.Aws_caller_identity.Current.Account_id}""                                                                                
         }},
         ""Action"":[
            ""acm-pca:DescribeCertificateAuthority"",
            ""acm-pca:GetCertificate"",
            ""acm-pca:GetCertificateAuthorityCertificate"",
            ""acm-pca:ListPermissions"",
            ""acm-pca:ListTags""                                                                                   
         ],                                                                                              
         ""Resource"":""{aws_acmpca_certificate_authority.Example.Arn}""
      }},
      {{
         ""Sid"":""1"",  
         ""Effect"":""Allow"",
         ""Principal"":{{
            ""AWS"":""{data.Aws_caller_identity.Current.Account_id}""
         }},
         ""Action"":[
            ""acm-pca:IssueCertificate""
         ],
         ""Resource"":""{aws_acmpca_certificate_authority.Example.Arn}"",
         ""Condition"":{{
            ""StringEquals"":{{
               ""acm-pca:TemplateArn"":""arn:aws:acm-pca:::template/EndEntityCertificate/V1""
            }}
         }}
      }}
   ]
}}
",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/acmpca"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := acmpca.NewPolicy(ctx, "example", &acmpca.PolicyArgs{
			ResourceArn: pulumi.Any(aws_acmpca_certificate_authority.Example.Arn),
			Policy: pulumi.String(fmt.Sprintf(`{                        
   "Version":"2012-10-17",
   "Statement":[
      {    
         "Sid":"1",
         "Effect":"Allow",         
         "Principal":{                                                                                                                                               
            "AWS":"%v"                                                                                
         },
         "Action":[
            "acm-pca:DescribeCertificateAuthority",
            "acm-pca:GetCertificate",
            "acm-pca:GetCertificateAuthorityCertificate",
            "acm-pca:ListPermissions",
            "acm-pca:ListTags"                                                                                   
         ],                                                                                              
         "Resource":"%v"
      },
      {
         "Sid":"1",  
         "Effect":"Allow",
         "Principal":{
            "AWS":"%v"
         },
         "Action":[
            "acm-pca:IssueCertificate"
         ],
         "Resource":"%v",
         "Condition":{
            "StringEquals":{
               "acm-pca:TemplateArn":"arn:aws:acm-pca:::template/EndEntityCertificate/V1"
            }
         }
      }
   ]
}
`, data.Aws_caller_identity.Current.Account_id, aws_acmpca_certificate_authority.Example.Arn, data.Aws_caller_identity.Current.Account_id, aws_acmpca_certificate_authority.Example.Arn)),
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
import com.pulumi.aws.acmpca.Policy;
import com.pulumi.aws.acmpca.PolicyArgs;
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
        var example = new Policy("example", PolicyArgs.builder()        
            .resourceArn(aws_acmpca_certificate_authority.example().arn())
            .policy("""
{                        
   "Version":"2012-10-17",
   "Statement":[
      {    
         "Sid":"1",
         "Effect":"Allow",         
         "Principal":{                                                                                                                                               
            "AWS":"%s"                                                                                
         },
         "Action":[
            "acm-pca:DescribeCertificateAuthority",
            "acm-pca:GetCertificate",
            "acm-pca:GetCertificateAuthorityCertificate",
            "acm-pca:ListPermissions",
            "acm-pca:ListTags"                                                                                   
         ],                                                                                              
         "Resource":"%s"
      },
      {
         "Sid":"1",  
         "Effect":"Allow",
         "Principal":{
            "AWS":"%s"
         },
         "Action":[
            "acm-pca:IssueCertificate"
         ],
         "Resource":"%s",
         "Condition":{
            "StringEquals":{
               "acm-pca:TemplateArn":"arn:aws:acm-pca:::template/EndEntityCertificate/V1"
            }
         }
      }
   ]
}
", data.aws_caller_identity().current().account_id(),aws_acmpca_certificate_authority.example().arn(),data.aws_caller_identity().current().account_id(),aws_acmpca_certificate_authority.example().arn()))
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:acmpca:Policy
    properties:
      resourceArn: ${aws_acmpca_certificate_authority.example.arn}
      policy: "{                        \n   \"Version\":\"2012-10-17\",\n   \"Statement\":[\n      {    \n         \"Sid\":\"1\",\n         \"Effect\":\"Allow\",         \n         \"Principal\":{                                                                                                                                               \n            \"AWS\":\"${data.aws_caller_identity.current.account_id}\"                                                                                \n         },\n         \"Action\":[\n            \"acm-pca:DescribeCertificateAuthority\",\n            \"acm-pca:GetCertificate\",\n            \"acm-pca:GetCertificateAuthorityCertificate\",\n            \"acm-pca:ListPermissions\",\n            \"acm-pca:ListTags\"                                                                                   \n         ],                                                                                              \n         \"Resource\":\"${aws_acmpca_certificate_authority.example.arn}\"\n      },\n      {\n         \"Sid\":\"1\",  \n         \"Effect\":\"Allow\",\n         \"Principal\":{\n            \"AWS\":\"${data.aws_caller_identity.current.account_id}\"\n         },\n         \"Action\":[\n            \"acm-pca:IssueCertificate\"\n         ],\n         \"Resource\":\"${aws_acmpca_certificate_authority.example.arn}\",\n         \"Condition\":{\n            \"StringEquals\":{\n               \"acm-pca:TemplateArn\":\"arn:aws:acm-pca:::template/EndEntityCertificate/V1\"\n            }\n         }\n      }\n   ]\n}\n"
```
{{% /example %}}
{{% /examples %}}

## Import

`aws_acmpca_policy` can be imported using the `resource_arn` value.

```sh
 $ pulumi import aws:acmpca/policy:Policy example arn:aws:acm-pca:us-east-1:123456789012:certificate-authority/12345678-1234-1234-1234-123456789012
```

 
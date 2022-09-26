Provides an SES domain DKIM generation resource.

Domain ownership needs to be confirmed first using `aws.ses.DomainIdentity` resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleDomainIdentity = new aws.ses.DomainIdentity("exampleDomainIdentity", {domain: "example.com"});
const exampleDomainDkim = new aws.ses.DomainDkim("exampleDomainDkim", {domain: exampleDomainIdentity.domain});
const exampleAmazonsesDkimRecord: aws.route53.Record[];
for (const range = {value: 0}; range.value < 3; range.value++) {
    exampleAmazonsesDkimRecord.push(new aws.route53.Record(`exampleAmazonsesDkimRecord-${range.value}`, {
        zoneId: "ABCDEFGHIJ123",
        name: exampleDomainDkim.dkimTokens[range.value].apply(dkimTokens => `${dkimTokens}._domainkey`),
        type: "CNAME",
        ttl: 600,
        records: [exampleDomainDkim.dkimTokens[range.value].apply(dkimTokens => `${dkimTokens}.dkim.amazonses.com`)],
    }));
}
```
```python
import pulumi
import pulumi_aws as aws

example_domain_identity = aws.ses.DomainIdentity("exampleDomainIdentity", domain="example.com")
example_domain_dkim = aws.ses.DomainDkim("exampleDomainDkim", domain=example_domain_identity.domain)
example_amazonses_dkim_record = []
for range in [{"value": i} for i in range(0, 3)]:
    example_amazonses_dkim_record.append(aws.route53.Record(f"exampleAmazonsesDkimRecord-{range['value']}",
        zone_id="ABCDEFGHIJ123",
        name=example_domain_dkim.dkim_tokens[range["value"]].apply(lambda dkim_tokens: f"{dkim_tokens}._domainkey"),
        type="CNAME",
        ttl=600,
        records=[example_domain_dkim.dkim_tokens[range["value"]].apply(lambda dkim_tokens: f"{dkim_tokens}.dkim.amazonses.com")]))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleDomainIdentity = new Aws.Ses.DomainIdentity("exampleDomainIdentity", new()
    {
        Domain = "example.com",
    });

    var exampleDomainDkim = new Aws.Ses.DomainDkim("exampleDomainDkim", new()
    {
        Domain = exampleDomainIdentity.Domain,
    });

    var exampleAmazonsesDkimRecord = new List<Aws.Route53.Record>();
    for (var rangeIndex = 0; rangeIndex < 3; rangeIndex++)
    {
        var range = new { Value = rangeIndex };
        exampleAmazonsesDkimRecord.Add(new Aws.Route53.Record($"exampleAmazonsesDkimRecord-{range.Value}", new()
        {
            ZoneId = "ABCDEFGHIJ123",
            Name = exampleDomainDkim.DkimTokens[range.Value].Apply(dkimTokens => $"{dkimTokens}._domainkey"),
            Type = "CNAME",
            Ttl = 600,
            Records = new[]
            {
                exampleDomainDkim.DkimTokens[range.Value].Apply(dkimTokens => $"{dkimTokens}.dkim.amazonses.com"),
            },
        }));
    }
});
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.ses.DomainIdentity;
import com.pulumi.aws.ses.DomainIdentityArgs;
import com.pulumi.aws.ses.DomainDkim;
import com.pulumi.aws.ses.DomainDkimArgs;
import com.pulumi.aws.route53.Record;
import com.pulumi.aws.route53.RecordArgs;
import com.pulumi.codegen.internal.KeyedValue;
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
        var exampleDomainIdentity = new DomainIdentity("exampleDomainIdentity", DomainIdentityArgs.builder()        
            .domain("example.com")
            .build());

        var exampleDomainDkim = new DomainDkim("exampleDomainDkim", DomainDkimArgs.builder()        
            .domain(exampleDomainIdentity.domain())
            .build());

        for (var i = 0; i < 3; i++) {
            new Record("exampleAmazonsesDkimRecord-" + i, RecordArgs.builder()            
                .zoneId("ABCDEFGHIJ123")
                .name(exampleDomainDkim.dkimTokens()[range.value()].applyValue(dkimTokens -> String.format("%s._domainkey", dkimTokens)))
                .type("CNAME")
                .ttl("600")
                .records(exampleDomainDkim.dkimTokens()[range.value()].applyValue(dkimTokens -> String.format("%s.dkim.amazonses.com", dkimTokens)))
                .build());

        
}
    }
}
```
```yaml
resources:
  exampleDomainIdentity:
    type: aws:ses:DomainIdentity
    properties:
      domain: example.com
  exampleDomainDkim:
    type: aws:ses:DomainDkim
    properties:
      domain: ${exampleDomainIdentity.domain}
  exampleAmazonsesDkimRecord:
    type: aws:route53:Record
    properties:
      zoneId: ABCDEFGHIJ123
      name:
        Fn::Join:
          -
          - - Fn::Select:
                - ${range.value}
                - ${exampleDomainDkim.dkimTokens}
            - ._domainkey
      type: CNAME
      ttl: 600
      records:
        - Fn::Join:
            -
            - - Fn::Select:
                  - ${range.value}
                  - ${exampleDomainDkim.dkimTokens}
              - .dkim.amazonses.com
    options: {}
```
{{% /example %}}
{{% /examples %}}

## Import

DKIM tokens can be imported using the `domain` attribute, e.g.,

```sh
 $ pulumi import aws:ses/domainDkim:DomainDkim example example.com
```

 
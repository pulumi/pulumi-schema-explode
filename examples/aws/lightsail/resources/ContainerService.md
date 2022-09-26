An Amazon Lightsail container service is a highly scalable compute and networking resource on which you can deploy, run,
and manage containers. For more information, see
[Container services in Amazon Lightsail](https://lightsail.aws.amazon.com/ls/docs/en_us/articles/amazon-lightsail-container-services).

> **Note:** For more information about the AWS Regions in which you can create Amazon Lightsail container services,
see ["Regions and Availability Zones in Amazon Lightsail"](https://lightsail.aws.amazon.com/ls/docs/overview/article/understanding-regions-and-availability-zones-in-amazon-lightsail).

{{% examples %}}
## Example Usage
{{% example %}}
### Basic Usage

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const myContainerService = new aws.lightsail.ContainerService("my_container_service", {
    isDisabled: false,
    power: "nano",
    scale: 1,
    tags: {
        foo1: "bar1",
        foo2: "",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

my_container_service = aws.lightsail.ContainerService("myContainerService",
    is_disabled=False,
    power="nano",
    scale=1,
    tags={
        "foo1": "bar1",
        "foo2": "",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var myContainerService = new Aws.LightSail.ContainerService("myContainerService", new()
    {
        IsDisabled = false,
        Power = "nano",
        Scale = 1,
        Tags = 
        {
            { "foo1", "bar1" },
            { "foo2", "" },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lightsail"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := lightsail.NewContainerService(ctx, "myContainerService", &lightsail.ContainerServiceArgs{
			IsDisabled: pulumi.Bool(false),
			Power:      pulumi.String("nano"),
			Scale:      pulumi.Int(1),
			Tags: pulumi.StringMap{
				"foo1": pulumi.String("bar1"),
				"foo2": pulumi.String(""),
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
import com.pulumi.aws.lightsail.ContainerService;
import com.pulumi.aws.lightsail.ContainerServiceArgs;
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
        var myContainerService = new ContainerService("myContainerService", ContainerServiceArgs.builder()        
            .isDisabled(false)
            .power("nano")
            .scale(1)
            .tags(Map.ofEntries(
                Map.entry("foo1", "bar1"),
                Map.entry("foo2", "")
            ))
            .build());

    }
}
```
```yaml
resources:
  myContainerService:
    type: aws:lightsail:ContainerService
    properties:
      isDisabled: false
      power: nano
      scale: 1
      tags:
        foo1: bar1
        foo2:
```
{{% /example %}}
{{% example %}}
### Public Domain Names

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const myContainerService = new aws.lightsail.ContainerService("my_container_service", {
    publicDomainNames: {
        certificates: [{
            certificateName: "example-certificate",
            domainNames: ["www.example.com"],
        }],
    },
});
```
```python
import pulumi
import pulumi_aws as aws

my_container_service = aws.lightsail.ContainerService("myContainerService", public_domain_names=aws.lightsail.ContainerServicePublicDomainNamesArgs(
    certificates=[aws.lightsail.ContainerServicePublicDomainNamesCertificateArgs(
        certificate_name="example-certificate",
        domain_names=["www.example.com"],
    )],
))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var myContainerService = new Aws.LightSail.ContainerService("myContainerService", new()
    {
        PublicDomainNames = new Aws.LightSail.Inputs.ContainerServicePublicDomainNamesArgs
        {
            Certificates = new[]
            {
                new Aws.LightSail.Inputs.ContainerServicePublicDomainNamesCertificateArgs
                {
                    CertificateName = "example-certificate",
                    DomainNames = new[]
                    {
                        "www.example.com",
                    },
                },
            },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lightsail"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := lightsail.NewContainerService(ctx, "myContainerService", &lightsail.ContainerServiceArgs{
			PublicDomainNames: &lightsail.ContainerServicePublicDomainNamesArgs{
				Certificates: lightsail.ContainerServicePublicDomainNamesCertificateArray{
					&lightsail.ContainerServicePublicDomainNamesCertificateArgs{
						CertificateName: pulumi.String("example-certificate"),
						DomainNames: pulumi.StringArray{
							pulumi.String("www.example.com"),
						},
					},
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
import com.pulumi.aws.lightsail.ContainerService;
import com.pulumi.aws.lightsail.ContainerServiceArgs;
import com.pulumi.aws.lightsail.inputs.ContainerServicePublicDomainNamesArgs;
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
        var myContainerService = new ContainerService("myContainerService", ContainerServiceArgs.builder()        
            .publicDomainNames(ContainerServicePublicDomainNamesArgs.builder()
                .certificates(ContainerServicePublicDomainNamesCertificateArgs.builder()
                    .certificateName("example-certificate")
                    .domainNames("www.example.com")
                    .build())
                .build())
            .build());

    }
}
```
```yaml
resources:
  myContainerService:
    type: aws:lightsail:ContainerService
    properties:
      publicDomainNames:
        certificates:
          - certificateName: example-certificate
            domainNames:
              - www.example.com
```
{{% /example %}}
{{% /examples %}}

## Import

Lightsail Container Service can be imported using the `name`, e.g.,

```sh
 $ pulumi import aws:lightsail/containerService:ContainerService my_container_service container-service-1
```

 
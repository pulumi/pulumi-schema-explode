Provides an AWS App Mesh virtual gateway resource.

{{% examples %}}
## Example Usage
{{% example %}}
### Basic

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.appmesh.VirtualGateway("example", {
    meshName: "example-service-mesh",
    spec: {
        listener: {
            portMapping: {
                port: 8080,
                protocol: "http",
            },
        },
    },
    tags: {
        Environment: "test",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.appmesh.VirtualGateway("example",
    mesh_name="example-service-mesh",
    spec=aws.appmesh.VirtualGatewaySpecArgs(
        listener=aws.appmesh.VirtualGatewaySpecListenerArgs(
            port_mapping=aws.appmesh.VirtualGatewaySpecListenerPortMappingArgs(
                port=8080,
                protocol="http",
            ),
        ),
    ),
    tags={
        "Environment": "test",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.AppMesh.VirtualGateway("example", new()
    {
        MeshName = "example-service-mesh",
        Spec = new Aws.AppMesh.Inputs.VirtualGatewaySpecArgs
        {
            Listener = new Aws.AppMesh.Inputs.VirtualGatewaySpecListenerArgs
            {
                PortMapping = new Aws.AppMesh.Inputs.VirtualGatewaySpecListenerPortMappingArgs
                {
                    Port = 8080,
                    Protocol = "http",
                },
            },
        },
        Tags = 
        {
            { "Environment", "test" },
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/appmesh"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := appmesh.NewVirtualGateway(ctx, "example", &appmesh.VirtualGatewayArgs{
			MeshName: pulumi.String("example-service-mesh"),
			Spec: &appmesh.VirtualGatewaySpecArgs{
				Listener: &appmesh.VirtualGatewaySpecListenerArgs{
					PortMapping: &appmesh.VirtualGatewaySpecListenerPortMappingArgs{
						Port:     pulumi.Int(8080),
						Protocol: pulumi.String("http"),
					},
				},
			},
			Tags: pulumi.StringMap{
				"Environment": pulumi.String("test"),
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
import com.pulumi.aws.appmesh.VirtualGateway;
import com.pulumi.aws.appmesh.VirtualGatewayArgs;
import com.pulumi.aws.appmesh.inputs.VirtualGatewaySpecArgs;
import com.pulumi.aws.appmesh.inputs.VirtualGatewaySpecListenerArgs;
import com.pulumi.aws.appmesh.inputs.VirtualGatewaySpecListenerPortMappingArgs;
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
        var example = new VirtualGateway("example", VirtualGatewayArgs.builder()        
            .meshName("example-service-mesh")
            .spec(VirtualGatewaySpecArgs.builder()
                .listener(VirtualGatewaySpecListenerArgs.builder()
                    .portMapping(VirtualGatewaySpecListenerPortMappingArgs.builder()
                        .port(8080)
                        .protocol("http")
                        .build())
                    .build())
                .build())
            .tags(Map.of("Environment", "test"))
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:appmesh:VirtualGateway
    properties:
      meshName: example-service-mesh
      spec:
        listener:
          portMapping:
            port: 8080
            protocol: http
      tags:
        Environment: test
```
{{% /example %}}
{{% example %}}
### Access Logs and TLS

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.appmesh.VirtualGateway("example", {
    meshName: "example-service-mesh",
    spec: {
        listener: {
            portMapping: {
                port: 8080,
                protocol: "http",
            },
            tls: {
                certificate: {
                    acm: {
                        certificateArn: aws_acm_certificate.example.arn,
                    },
                },
                mode: "STRICT",
            },
        },
        logging: {
            accessLog: {
                file: {
                    path: "/var/log/access.log",
                },
            },
        },
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.appmesh.VirtualGateway("example",
    mesh_name="example-service-mesh",
    spec=aws.appmesh.VirtualGatewaySpecArgs(
        listener=aws.appmesh.VirtualGatewaySpecListenerArgs(
            port_mapping=aws.appmesh.VirtualGatewaySpecListenerPortMappingArgs(
                port=8080,
                protocol="http",
            ),
            tls=aws.appmesh.VirtualGatewaySpecListenerTlsArgs(
                certificate=aws.appmesh.VirtualGatewaySpecListenerTlsCertificateArgs(
                    acm=aws.appmesh.VirtualGatewaySpecListenerTlsCertificateAcmArgs(
                        certificate_arn=aws_acm_certificate["example"]["arn"],
                    ),
                ),
                mode="STRICT",
            ),
        ),
        logging=aws.appmesh.VirtualGatewaySpecLoggingArgs(
            access_log=aws.appmesh.VirtualGatewaySpecLoggingAccessLogArgs(
                file=aws.appmesh.VirtualGatewaySpecLoggingAccessLogFileArgs(
                    path="/var/log/access.log",
                ),
            ),
        ),
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.AppMesh.VirtualGateway("example", new()
    {
        MeshName = "example-service-mesh",
        Spec = new Aws.AppMesh.Inputs.VirtualGatewaySpecArgs
        {
            Listener = new Aws.AppMesh.Inputs.VirtualGatewaySpecListenerArgs
            {
                PortMapping = new Aws.AppMesh.Inputs.VirtualGatewaySpecListenerPortMappingArgs
                {
                    Port = 8080,
                    Protocol = "http",
                },
                Tls = new Aws.AppMesh.Inputs.VirtualGatewaySpecListenerTlsArgs
                {
                    Certificate = new Aws.AppMesh.Inputs.VirtualGatewaySpecListenerTlsCertificateArgs
                    {
                        Acm = new Aws.AppMesh.Inputs.VirtualGatewaySpecListenerTlsCertificateAcmArgs
                        {
                            CertificateArn = aws_acm_certificate.Example.Arn,
                        },
                    },
                    Mode = "STRICT",
                },
            },
            Logging = new Aws.AppMesh.Inputs.VirtualGatewaySpecLoggingArgs
            {
                AccessLog = new Aws.AppMesh.Inputs.VirtualGatewaySpecLoggingAccessLogArgs
                {
                    File = new Aws.AppMesh.Inputs.VirtualGatewaySpecLoggingAccessLogFileArgs
                    {
                        Path = "/var/log/access.log",
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
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/appmesh"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := appmesh.NewVirtualGateway(ctx, "example", &appmesh.VirtualGatewayArgs{
			MeshName: pulumi.String("example-service-mesh"),
			Spec: &appmesh.VirtualGatewaySpecArgs{
				Listener: &appmesh.VirtualGatewaySpecListenerArgs{
					PortMapping: &appmesh.VirtualGatewaySpecListenerPortMappingArgs{
						Port:     pulumi.Int(8080),
						Protocol: pulumi.String("http"),
					},
					Tls: &appmesh.VirtualGatewaySpecListenerTlsArgs{
						Certificate: &appmesh.VirtualGatewaySpecListenerTlsCertificateArgs{
							Acm: &appmesh.VirtualGatewaySpecListenerTlsCertificateAcmArgs{
								CertificateArn: pulumi.Any(aws_acm_certificate.Example.Arn),
							},
						},
						Mode: pulumi.String("STRICT"),
					},
				},
				Logging: &appmesh.VirtualGatewaySpecLoggingArgs{
					AccessLog: &appmesh.VirtualGatewaySpecLoggingAccessLogArgs{
						File: &appmesh.VirtualGatewaySpecLoggingAccessLogFileArgs{
							Path: pulumi.String("/var/log/access.log"),
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
import com.pulumi.aws.appmesh.VirtualGateway;
import com.pulumi.aws.appmesh.VirtualGatewayArgs;
import com.pulumi.aws.appmesh.inputs.VirtualGatewaySpecArgs;
import com.pulumi.aws.appmesh.inputs.VirtualGatewaySpecListenerArgs;
import com.pulumi.aws.appmesh.inputs.VirtualGatewaySpecListenerPortMappingArgs;
import com.pulumi.aws.appmesh.inputs.VirtualGatewaySpecListenerTlsArgs;
import com.pulumi.aws.appmesh.inputs.VirtualGatewaySpecListenerTlsCertificateArgs;
import com.pulumi.aws.appmesh.inputs.VirtualGatewaySpecListenerTlsCertificateAcmArgs;
import com.pulumi.aws.appmesh.inputs.VirtualGatewaySpecLoggingArgs;
import com.pulumi.aws.appmesh.inputs.VirtualGatewaySpecLoggingAccessLogArgs;
import com.pulumi.aws.appmesh.inputs.VirtualGatewaySpecLoggingAccessLogFileArgs;
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
        var example = new VirtualGateway("example", VirtualGatewayArgs.builder()        
            .meshName("example-service-mesh")
            .spec(VirtualGatewaySpecArgs.builder()
                .listener(VirtualGatewaySpecListenerArgs.builder()
                    .portMapping(VirtualGatewaySpecListenerPortMappingArgs.builder()
                        .port(8080)
                        .protocol("http")
                        .build())
                    .tls(VirtualGatewaySpecListenerTlsArgs.builder()
                        .certificate(VirtualGatewaySpecListenerTlsCertificateArgs.builder()
                            .acm(VirtualGatewaySpecListenerTlsCertificateAcmArgs.builder()
                                .certificateArn(aws_acm_certificate.example().arn())
                                .build())
                            .build())
                        .mode("STRICT")
                        .build())
                    .build())
                .logging(VirtualGatewaySpecLoggingArgs.builder()
                    .accessLog(VirtualGatewaySpecLoggingAccessLogArgs.builder()
                        .file(VirtualGatewaySpecLoggingAccessLogFileArgs.builder()
                            .path("/var/log/access.log")
                            .build())
                        .build())
                    .build())
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:appmesh:VirtualGateway
    properties:
      meshName: example-service-mesh
      spec:
        listener:
          portMapping:
            port: 8080
            protocol: http
          tls:
            certificate:
              acm:
                certificateArn: ${aws_acm_certificate.example.arn}
            mode: STRICT
        logging:
          accessLog:
            file:
              path: /var/log/access.log
```
{{% /example %}}
{{% /examples %}}

## Import

App Mesh virtual gateway can be imported using `mesh_name` together with the virtual gateway's `name`, e.g.,

```sh
 $ pulumi import aws:appmesh/virtualGateway:VirtualGateway example mesh/gw1
```

 [1]/docs/providers/aws/index.html 
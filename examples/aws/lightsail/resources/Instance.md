Provides a Lightsail Instance. Amazon Lightsail is a service to provide easy virtual private servers
with custom software already setup. See [What is Amazon Lightsail?](https://lightsail.aws.amazon.com/ls/docs/getting-started/article/what-is-amazon-lightsail)
for more information.

> **Note:** Lightsail is currently only supported in a limited number of AWS Regions, please see ["Regions and Availability Zones in Amazon Lightsail"](https://lightsail.aws.amazon.com/ls/docs/overview/article/understanding-regions-and-availability-zones-in-amazon-lightsail) for more details

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Create a new GitLab Lightsail Instance
const gitlabTest = new aws.lightsail.Instance("gitlab_test", {
    availabilityZone: "us-east-1b",
    blueprintId: "string",
    bundleId: "string",
    keyPairName: "some_key_name",
    tags: {
        foo: "bar",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

# Create a new GitLab Lightsail Instance
gitlab_test = aws.lightsail.Instance("gitlabTest",
    availability_zone="us-east-1b",
    blueprint_id="string",
    bundle_id="string",
    key_pair_name="some_key_name",
    tags={
        "foo": "bar",
    })
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    // Create a new GitLab Lightsail Instance
    var gitlabTest = new Aws.LightSail.Instance("gitlabTest", new()
    {
        AvailabilityZone = "us-east-1b",
        BlueprintId = "string",
        BundleId = "string",
        KeyPairName = "some_key_name",
        Tags = 
        {
            { "foo", "bar" },
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
		_, err := lightsail.NewInstance(ctx, "gitlabTest", &lightsail.InstanceArgs{
			AvailabilityZone: pulumi.String("us-east-1b"),
			BlueprintId:      pulumi.String("string"),
			BundleId:         pulumi.String("string"),
			KeyPairName:      pulumi.String("some_key_name"),
			Tags: pulumi.StringMap{
				"foo": pulumi.String("bar"),
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
import com.pulumi.aws.lightsail.Instance;
import com.pulumi.aws.lightsail.InstanceArgs;
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
        var gitlabTest = new Instance("gitlabTest", InstanceArgs.builder()        
            .availabilityZone("us-east-1b")
            .blueprintId("string")
            .bundleId("string")
            .keyPairName("some_key_name")
            .tags(Map.of("foo", "bar"))
            .build());

    }
}
```
```yaml
resources:
  # Create a new GitLab Lightsail Instance
  gitlabTest:
    type: aws:lightsail:Instance
    properties:
      availabilityZone: us-east-1b
      blueprintId: string
      bundleId: string
      keyPairName: some_key_name
      tags:
        foo: bar
```
{{% /example %}}
{{% /examples %}}
## Availability Zones

Lightsail currently supports the following Availability Zones (e.g., `us-east-1a`):

- `ap-northeast-1{a,c,d}`
- `ap-northeast-2{a,c}`
- `ap-south-1{a,b}`
- `ap-southeast-1{a,b,c}`
- `ap-southeast-2{a,b,c}`
- `ca-central-1{a,b}`
- `eu-central-1{a,b,c}`
- `eu-west-1{a,b,c}`
- `eu-west-2{a,b,c}`
- `eu-west-3{a,b,c}`
- `us-east-1{a,b,c,d,e,f}`
- `us-east-2{a,b,c}`
- `us-west-2{a,b,c}`

## Bundles

Lightsail currently supports the following Bundle IDs (e.g., an instance in `ap-northeast-1` would use `small_2_0`):

### Prefix

A Bundle ID starts with one of the below size prefixes:

- `nano_`
- `micro_`
- `small_`
- `medium_`
- `large_`
- `xlarge_`
- `2xlarge_`

### Suffix

A Bundle ID ends with one of the following suffixes depending on Availability Zone:

- ap-northeast-1: `2_0`
- ap-northeast-2: `2_0`
- ap-south-1: `2_1`
- ap-southeast-1: `2_0`
- ap-southeast-2: `2_2`
- ca-central-1: `2_0`
- eu-central-1: `2_0`
- eu-west-1: `2_0`
- eu-west-2: `2_0`
- eu-west-3: `2_0`
- us-east-1: `2_0`
- us-east-2: `2_0`
- us-west-2: `2_0`


## Import

Lightsail Instances can be imported using their name, e.g.,

```sh
 $ pulumi import aws:lightsail/instance:Instance gitlab_test 'custom gitlab'
```

 
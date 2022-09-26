Provides a MediaStore Container Policy.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const currentRegion = aws.getRegion({});
const currentCallerIdentity = aws.getCallerIdentity({});
const exampleContainer = new aws.mediastore.Container("exampleContainer", {});
const exampleContainerPolicy = new aws.mediastore.ContainerPolicy("exampleContainerPolicy", {
    containerName: exampleContainer.name,
    policy: pulumi.all([currentCallerIdentity, currentRegion, currentCallerIdentity, exampleContainer.name]).apply(([currentCallerIdentity, currentRegion, currentCallerIdentity1, name]) => `{
	"Version": "2012-10-17",
	"Statement": [{
		"Sid": "MediaStoreFullAccess",
		"Action": [ "mediastore:*" ],
		"Principal": {"AWS" : "arn:aws:iam::${currentCallerIdentity.accountId}:root"},
		"Effect": "Allow",
		"Resource": "arn:aws:mediastore:${currentRegion.name}:${currentCallerIdentity1.accountId}:container/${name}/*",
		"Condition": {
			"Bool": { "aws:SecureTransport": "true" }
		}
	}]
}
`),
});
```
```python
import pulumi
import pulumi_aws as aws

current_region = aws.get_region()
current_caller_identity = aws.get_caller_identity()
example_container = aws.mediastore.Container("exampleContainer")
example_container_policy = aws.mediastore.ContainerPolicy("exampleContainerPolicy",
    container_name=example_container.name,
    policy=example_container.name.apply(lambda name: f"""{{
	"Version": "2012-10-17",
	"Statement": [{{
		"Sid": "MediaStoreFullAccess",
		"Action": [ "mediastore:*" ],
		"Principal": {{"AWS" : "arn:aws:iam::{current_caller_identity.account_id}:root"}},
		"Effect": "Allow",
		"Resource": "arn:aws:mediastore:{current_region.name}:{current_caller_identity.account_id}:container/{name}/*",
		"Condition": {{
			"Bool": {{ "aws:SecureTransport": "true" }}
		}}
	}}]
}}
"""))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var currentRegion = Aws.GetRegion.Invoke();

    var currentCallerIdentity = Aws.GetCallerIdentity.Invoke();

    var exampleContainer = new Aws.MediaStore.Container("exampleContainer");

    var exampleContainerPolicy = new Aws.MediaStore.ContainerPolicy("exampleContainerPolicy", new()
    {
        ContainerName = exampleContainer.Name,
        Policy = Output.Tuple(currentCallerIdentity.Apply(getCallerIdentityResult => getCallerIdentityResult), currentRegion.Apply(getRegionResult => getRegionResult), currentCallerIdentity.Apply(getCallerIdentityResult => getCallerIdentityResult), exampleContainer.Name).Apply(values =>
        {
            var currentCallerIdentity = values.Item1;
            var currentRegion = values.Item2;
            var currentCallerIdentity1 = values.Item3;
            var name = values.Item4;
            return @$"{{
	""Version"": ""2012-10-17"",
	""Statement"": [{{
		""Sid"": ""MediaStoreFullAccess"",
		""Action"": [ ""mediastore:*"" ],
		""Principal"": {{""AWS"" : ""arn:aws:iam::{currentCallerIdentity.Apply(getCallerIdentityResult => getCallerIdentityResult.AccountId)}:root""}},
		""Effect"": ""Allow"",
		""Resource"": ""arn:aws:mediastore:{currentRegion.Apply(getRegionResult => getRegionResult.Name)}:{currentCallerIdentity1.AccountId}:container/{name}/*"",
		""Condition"": {{
			""Bool"": {{ ""aws:SecureTransport"": ""true"" }}
		}}
	}}]
}}
";
        }),
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/mediastore"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		currentRegion, err := aws.GetRegion(ctx, nil, nil)
		if err != nil {
			return err
		}
		currentCallerIdentity, err := aws.GetCallerIdentity(ctx, nil, nil)
		if err != nil {
			return err
		}
		exampleContainer, err := mediastore.NewContainer(ctx, "exampleContainer", nil)
		if err != nil {
			return err
		}
		_, err = mediastore.NewContainerPolicy(ctx, "exampleContainerPolicy", &mediastore.ContainerPolicyArgs{
			ContainerName: exampleContainer.Name,
			Policy: exampleContainer.Name.ApplyT(func(name string) (string, error) {
				return fmt.Sprintf(`{
	"Version": "2012-10-17",
	"Statement": [{
		"Sid": "MediaStoreFullAccess",
		"Action": [ "mediastore:*" ],
		"Principal": {"AWS" : "arn:aws:iam::%v:root"},
		"Effect": "Allow",
		"Resource": "arn:aws:mediastore:%v:%v:container/%v/*",
		"Condition": {
			"Bool": { "aws:SecureTransport": "true" }
		}
	}]
}
`, currentCallerIdentity.AccountId, currentRegion.Name, currentCallerIdentity.AccountId, name), nil
			}).(pulumi.StringOutput),
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
import com.pulumi.aws.AwsFunctions;
import com.pulumi.aws.inputs.GetRegionArgs;
import com.pulumi.aws.mediastore.Container;
import com.pulumi.aws.mediastore.ContainerPolicy;
import com.pulumi.aws.mediastore.ContainerPolicyArgs;
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
        final var currentRegion = AwsFunctions.getRegion();

        final var currentCallerIdentity = AwsFunctions.getCallerIdentity();

        var exampleContainer = new Container("exampleContainer");

        var exampleContainerPolicy = new ContainerPolicy("exampleContainerPolicy", ContainerPolicyArgs.builder()        
            .containerName(exampleContainer.name())
            .policy(exampleContainer.name().applyValue(name -> """
{
	"Version": "2012-10-17",
	"Statement": [{
		"Sid": "MediaStoreFullAccess",
		"Action": [ "mediastore:*" ],
		"Principal": {"AWS" : "arn:aws:iam::%s:root"},
		"Effect": "Allow",
		"Resource": "arn:aws:mediastore:%s:%s:container/%s/*",
		"Condition": {
			"Bool": { "aws:SecureTransport": "true" }
		}
	}]
}
", currentCallerIdentity.applyValue(getCallerIdentityResult -> getCallerIdentityResult.accountId()),currentRegion.applyValue(getRegionResult -> getRegionResult.name()),currentCallerIdentity.applyValue(getCallerIdentityResult -> getCallerIdentityResult.accountId()),name)))
            .build());

    }
}
```
```yaml
resources:
  exampleContainer:
    type: aws:mediastore:Container
  exampleContainerPolicy:
    type: aws:mediastore:ContainerPolicy
    properties:
      containerName: ${exampleContainer.name}
      policy: |
        {
        	"Version": "2012-10-17",
        	"Statement": [{
        		"Sid": "MediaStoreFullAccess",
        		"Action": [ "mediastore:*" ],
        		"Principal": {"AWS" : "arn:aws:iam::${currentCallerIdentity.accountId}:root"},
        		"Effect": "Allow",
        		"Resource": "arn:aws:mediastore:${currentRegion.name}:${currentCallerIdentity.accountId}:container/${exampleContainer.name}/*",
        		"Condition": {
        			"Bool": { "aws:SecureTransport": "true" }
        		}
        	}]
        }
variables:
  currentRegion:
    Fn::Invoke:
      Function: aws:getRegion
      Arguments: {}
  currentCallerIdentity:
    Fn::Invoke:
      Function: aws:getCallerIdentity
      Arguments: {}
```
{{% /example %}}
{{% /examples %}}

## Import

MediaStore Container Policy can be imported using the MediaStore Container Name, e.g.,

```sh
 $ pulumi import aws:mediastore/containerPolicy:ContainerPolicy example example
```

 
Manages a directory in your account (directory owner) shared with another account (directory consumer).

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const exampleDirectory = new aws.directoryservice.Directory("exampleDirectory", {
    name: "tf-example",
    password: "SuperSecretPassw0rd",
    type: "MicrosoftAD",
    edition: "Standard",
    vpcSettings: {
        vpcId: aws_vpc.example.id,
        subnetIds: aws_subnet.example.map(__item => __item.id),
    },
});
const exampleSharedDirectory = new aws.directoryservice.SharedDirectory("exampleSharedDirectory", {
    directoryId: exampleDirectory.id,
    notes: "You wanna have a catch?",
    target: {
        id: data.aws_caller_identity.receiver.account_id,
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example_directory = aws.directoryservice.Directory("exampleDirectory",
    name="tf-example",
    password="SuperSecretPassw0rd",
    type="MicrosoftAD",
    edition="Standard",
    vpc_settings=aws.directoryservice.DirectoryVpcSettingsArgs(
        vpc_id=aws_vpc["example"]["id"],
        subnet_ids=[__item["id"] for __item in aws_subnet["example"]],
    ))
example_shared_directory = aws.directoryservice.SharedDirectory("exampleSharedDirectory",
    directory_id=example_directory.id,
    notes="You wanna have a catch?",
    target=aws.directoryservice.SharedDirectoryTargetArgs(
        id=data["aws_caller_identity"]["receiver"]["account_id"],
    ))
```
```csharp
using System.Collections.Generic;
using System.Linq;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var exampleDirectory = new Aws.DirectoryService.Directory("exampleDirectory", new()
    {
        Name = "tf-example",
        Password = "SuperSecretPassw0rd",
        Type = "MicrosoftAD",
        Edition = "Standard",
        VpcSettings = new Aws.DirectoryService.Inputs.DirectoryVpcSettingsArgs
        {
            VpcId = aws_vpc.Example.Id,
            SubnetIds = aws_subnet.Example.Select(__item => __item.Id).ToList(),
        },
    });

    var exampleSharedDirectory = new Aws.DirectoryService.SharedDirectory("exampleSharedDirectory", new()
    {
        DirectoryId = exampleDirectory.Id,
        Notes = "You wanna have a catch?",
        Target = new Aws.DirectoryService.Inputs.SharedDirectoryTargetArgs
        {
            Id = data.Aws_caller_identity.Receiver.Account_id,
        },
    });

});
```
```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.directoryservice.Directory;
import com.pulumi.aws.directoryservice.DirectoryArgs;
import com.pulumi.aws.directoryservice.inputs.DirectoryVpcSettingsArgs;
import com.pulumi.aws.directoryservice.SharedDirectory;
import com.pulumi.aws.directoryservice.SharedDirectoryArgs;
import com.pulumi.aws.directoryservice.inputs.SharedDirectoryTargetArgs;
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
        var exampleDirectory = new Directory("exampleDirectory", DirectoryArgs.builder()        
            .name("tf-example")
            .password("SuperSecretPassw0rd")
            .type("MicrosoftAD")
            .edition("Standard")
            .vpcSettings(DirectoryVpcSettingsArgs.builder()
                .vpcId(aws_vpc.example().id())
                .subnetIds(aws_subnet.example().stream().map(element -> element.id()).collect(toList()))
                .build())
            .build());

        var exampleSharedDirectory = new SharedDirectory("exampleSharedDirectory", SharedDirectoryArgs.builder()        
            .directoryId(exampleDirectory.id())
            .notes("You wanna have a catch?")
            .target(SharedDirectoryTargetArgs.builder()
                .id(data.aws_caller_identity().receiver().account_id())
                .build())
            .build());

    }
}
```
{{% /example %}}
{{% /examples %}}

## Import

Directory Service Shared Directories can be imported using the owner directory ID/shared directory ID, e.g.,

```sh
 $ pulumi import aws:directoryservice/sharedDirectory:SharedDirectory example d-1234567890/d-9267633ece
```

 
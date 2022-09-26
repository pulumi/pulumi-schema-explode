Provides a Pinpoint APNs Channel resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as fs from "fs";

const app = new aws.pinpoint.App("app", {});
const apns = new aws.pinpoint.ApnsChannel("apns", {
    applicationId: app.applicationId,
    certificate: fs.readFileSync("./certificate.pem"),
    privateKey: fs.readFileSync("./private_key.key"),
});
```
```python
import pulumi
import pulumi_aws as aws

app = aws.pinpoint.App("app")
apns = aws.pinpoint.ApnsChannel("apns",
    application_id=app.application_id,
    certificate=(lambda path: open(path).read())("./certificate.pem"),
    private_key=(lambda path: open(path).read())("./private_key.key"))
```
```csharp
using System.Collections.Generic;
using System.IO;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var app = new Aws.Pinpoint.App("app");

    var apns = new Aws.Pinpoint.ApnsChannel("apns", new()
    {
        ApplicationId = app.ApplicationId,
        Certificate = File.ReadAllText("./certificate.pem"),
        PrivateKey = File.ReadAllText("./private_key.key"),
    });

});
```
```go
package main

import (
	"io/ioutil"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/pinpoint"
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
		app, err := pinpoint.NewApp(ctx, "app", nil)
		if err != nil {
			return err
		}
		_, err = pinpoint.NewApnsChannel(ctx, "apns", &pinpoint.ApnsChannelArgs{
			ApplicationId: app.ApplicationId,
			Certificate:   readFileOrPanic("./certificate.pem"),
			PrivateKey:    readFileOrPanic("./private_key.key"),
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
import com.pulumi.aws.pinpoint.App;
import com.pulumi.aws.pinpoint.ApnsChannel;
import com.pulumi.aws.pinpoint.ApnsChannelArgs;
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
        var app = new App("app");

        var apns = new ApnsChannel("apns", ApnsChannelArgs.builder()        
            .applicationId(app.applicationId())
            .certificate(Files.readString(Paths.get("./certificate.pem")))
            .privateKey(Files.readString(Paths.get("./private_key.key")))
            .build());

    }
}
```
{{% /example %}}
{{% /examples %}}

## Import

Pinpoint APNs Channel can be imported using the `application-id`, e.g.,

```sh
 $ pulumi import aws:pinpoint/apnsChannel:ApnsChannel apns application-id
```

 
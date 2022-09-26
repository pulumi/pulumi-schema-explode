Use this data source to get detailed information about
the specified KMS Key with flexible key id input.
This can be useful to reference key alias
without having to hard code the ARN as input.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const byAlias = pulumi.output(aws.kms.getKey({
    keyId: "alias/my-key",
}));
const byId = pulumi.output(aws.kms.getKey({
    keyId: "1234abcd-12ab-34cd-56ef-1234567890ab",
}));
const byAliasArn = pulumi.output(aws.kms.getKey({
    keyId: "arn:aws:kms:us-east-1:111122223333:alias/my-key",
}));
const byKeyArn = pulumi.output(aws.kms.getKey({
    keyId: "arn:aws:kms:us-east-1:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab",
}));
```
```python
import pulumi
import pulumi_aws as aws

by_alias = aws.kms.get_key(key_id="alias/my-key")
by_id = aws.kms.get_key(key_id="1234abcd-12ab-34cd-56ef-1234567890ab")
by_alias_arn = aws.kms.get_key(key_id="arn:aws:kms:us-east-1:111122223333:alias/my-key")
by_key_arn = aws.kms.get_key(key_id="arn:aws:kms:us-east-1:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var byAlias = Aws.Kms.GetKey.Invoke(new()
    {
        KeyId = "alias/my-key",
    });

    var byId = Aws.Kms.GetKey.Invoke(new()
    {
        KeyId = "1234abcd-12ab-34cd-56ef-1234567890ab",
    });

    var byAliasArn = Aws.Kms.GetKey.Invoke(new()
    {
        KeyId = "arn:aws:kms:us-east-1:111122223333:alias/my-key",
    });

    var byKeyArn = Aws.Kms.GetKey.Invoke(new()
    {
        KeyId = "arn:aws:kms:us-east-1:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/kms"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := kms.LookupKey(ctx, &kms.LookupKeyArgs{
			KeyId: "alias/my-key",
		}, nil)
		if err != nil {
			return err
		}
		_, err = kms.LookupKey(ctx, &kms.LookupKeyArgs{
			KeyId: "1234abcd-12ab-34cd-56ef-1234567890ab",
		}, nil)
		if err != nil {
			return err
		}
		_, err = kms.LookupKey(ctx, &kms.LookupKeyArgs{
			KeyId: "arn:aws:kms:us-east-1:111122223333:alias/my-key",
		}, nil)
		if err != nil {
			return err
		}
		_, err = kms.LookupKey(ctx, &kms.LookupKeyArgs{
			KeyId: "arn:aws:kms:us-east-1:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab",
		}, nil)
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
import com.pulumi.aws.kms.KmsFunctions;
import com.pulumi.aws.apigateway.inputs.GetKeyArgs;
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
        final var byAlias = KmsFunctions.getKey(GetKeyArgs.builder()
            .keyId("alias/my-key")
            .build());

        final var byId = KmsFunctions.getKey(GetKeyArgs.builder()
            .keyId("1234abcd-12ab-34cd-56ef-1234567890ab")
            .build());

        final var byAliasArn = KmsFunctions.getKey(GetKeyArgs.builder()
            .keyId("arn:aws:kms:us-east-1:111122223333:alias/my-key")
            .build());

        final var byKeyArn = KmsFunctions.getKey(GetKeyArgs.builder()
            .keyId("arn:aws:kms:us-east-1:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab")
            .build());

    }
}
```
```yaml
variables:
  byAlias:
    Fn::Invoke:
      Function: aws:kms:getKey
      Arguments:
        keyId: alias/my-key
  byId:
    Fn::Invoke:
      Function: aws:kms:getKey
      Arguments:
        keyId: 1234abcd-12ab-34cd-56ef-1234567890ab
  byAliasArn:
    Fn::Invoke:
      Function: aws:kms:getKey
      Arguments:
        keyId: arn:aws:kms:us-east-1:111122223333:alias/my-key
  byKeyArn:
    Fn::Invoke:
      Function: aws:kms:getKey
      Arguments:
        keyId: arn:aws:kms:us-east-1:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab
```
{{% /example %}}
{{% /examples %}}
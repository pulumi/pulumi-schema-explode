{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const test = new aws.elasticache.User("test", {
    accessString: "on ~app::* -@all +@read +@hash +@bitmap +@geo -setbit -bitfield -hset -hsetnx -hmset -hincrby -hincrbyfloat -hdel -bitop -geoadd -georadius -georadiusbymember",
    engine: "REDIS",
    passwords: ["password123456789"],
    userId: "testUserId",
    userName: "testUserName",
});
```
```python
import pulumi
import pulumi_aws as aws

test = aws.elasticache.User("test",
    access_string="on ~app::* -@all +@read +@hash +@bitmap +@geo -setbit -bitfield -hset -hsetnx -hmset -hincrby -hincrbyfloat -hdel -bitop -geoadd -georadius -georadiusbymember",
    engine="REDIS",
    passwords=["password123456789"],
    user_id="testUserId",
    user_name="testUserName")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var test = new Aws.ElastiCache.User("test", new()
    {
        AccessString = "on ~app::* -@all +@read +@hash +@bitmap +@geo -setbit -bitfield -hset -hsetnx -hmset -hincrby -hincrbyfloat -hdel -bitop -geoadd -georadius -georadiusbymember",
        Engine = "REDIS",
        Passwords = new[]
        {
            "password123456789",
        },
        UserId = "testUserId",
        UserName = "testUserName",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/elasticache"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := elasticache.NewUser(ctx, "test", &elasticache.UserArgs{
			AccessString: pulumi.String("on ~app::* -@all +@read +@hash +@bitmap +@geo -setbit -bitfield -hset -hsetnx -hmset -hincrby -hincrbyfloat -hdel -bitop -geoadd -georadius -georadiusbymember"),
			Engine:       pulumi.String("REDIS"),
			Passwords: pulumi.StringArray{
				pulumi.String("password123456789"),
			},
			UserId:   pulumi.String("testUserId"),
			UserName: pulumi.String("testUserName"),
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
import com.pulumi.aws.elasticache.User;
import com.pulumi.aws.elasticache.UserArgs;
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
        var test = new User("test", UserArgs.builder()        
            .accessString("on ~app::* -@all +@read +@hash +@bitmap +@geo -setbit -bitfield -hset -hsetnx -hmset -hincrby -hincrbyfloat -hdel -bitop -geoadd -georadius -georadiusbymember")
            .engine("REDIS")
            .passwords("password123456789")
            .userId("testUserId")
            .userName("testUserName")
            .build());

    }
}
```
```yaml
resources:
  test:
    type: aws:elasticache:User
    properties:
      accessString: on ~app::* -@all +@read +@hash +@bitmap +@geo -setbit -bitfield -hset -hsetnx -hmset -hincrby -hincrbyfloat -hdel -bitop -geoadd -georadius -georadiusbymember
      engine: REDIS
      passwords:
        - password123456789
      userId: testUserId
      userName: testUserName
```
{{% /example %}}
{{% /examples %}}

## Import

ElastiCache users can be imported using the `user_id`, e.g.,

```sh
 $ pulumi import aws:elasticache/user:User my_user userId1
```

 
Provides an Amazon Connect User resource. For more information see
[Amazon Connect: Getting Started](https://docs.aws.amazon.com/connect/latest/adminguide/amazon-connect-get-started.html)

{{% examples %}}
## Example Usage
{{% example %}}
### Basic

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.connect.User("example", {
    instanceId: aws_connect_instance.example.id,
    password: "Password123",
    routingProfileId: aws_connect_routing_profile.example.routing_profile_id,
    securityProfileIds: [aws_connect_security_profile.example.security_profile_id],
    identityInfo: {
        firstName: "example",
        lastName: "example2",
    },
    phoneConfig: {
        afterContactWorkTimeLimit: 0,
        phoneType: "SOFT_PHONE",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.connect.User("example",
    instance_id=aws_connect_instance["example"]["id"],
    password="Password123",
    routing_profile_id=aws_connect_routing_profile["example"]["routing_profile_id"],
    security_profile_ids=[aws_connect_security_profile["example"]["security_profile_id"]],
    identity_info=aws.connect.UserIdentityInfoArgs(
        first_name="example",
        last_name="example2",
    ),
    phone_config=aws.connect.UserPhoneConfigArgs(
        after_contact_work_time_limit=0,
        phone_type="SOFT_PHONE",
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Connect.User("example", new()
    {
        InstanceId = aws_connect_instance.Example.Id,
        Password = "Password123",
        RoutingProfileId = aws_connect_routing_profile.Example.Routing_profile_id,
        SecurityProfileIds = new[]
        {
            aws_connect_security_profile.Example.Security_profile_id,
        },
        IdentityInfo = new Aws.Connect.Inputs.UserIdentityInfoArgs
        {
            FirstName = "example",
            LastName = "example2",
        },
        PhoneConfig = new Aws.Connect.Inputs.UserPhoneConfigArgs
        {
            AfterContactWorkTimeLimit = 0,
            PhoneType = "SOFT_PHONE",
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/connect"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := connect.NewUser(ctx, "example", &connect.UserArgs{
			InstanceId:       pulumi.Any(aws_connect_instance.Example.Id),
			Password:         pulumi.String("Password123"),
			RoutingProfileId: pulumi.Any(aws_connect_routing_profile.Example.Routing_profile_id),
			SecurityProfileIds: pulumi.StringArray{
				pulumi.Any(aws_connect_security_profile.Example.Security_profile_id),
			},
			IdentityInfo: &connect.UserIdentityInfoArgs{
				FirstName: pulumi.String("example"),
				LastName:  pulumi.String("example2"),
			},
			PhoneConfig: &connect.UserPhoneConfigArgs{
				AfterContactWorkTimeLimit: pulumi.Int(0),
				PhoneType:                 pulumi.String("SOFT_PHONE"),
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
import com.pulumi.aws.connect.User;
import com.pulumi.aws.connect.UserArgs;
import com.pulumi.aws.connect.inputs.UserIdentityInfoArgs;
import com.pulumi.aws.connect.inputs.UserPhoneConfigArgs;
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
        var example = new User("example", UserArgs.builder()        
            .instanceId(aws_connect_instance.example().id())
            .password("Password123")
            .routingProfileId(aws_connect_routing_profile.example().routing_profile_id())
            .securityProfileIds(aws_connect_security_profile.example().security_profile_id())
            .identityInfo(UserIdentityInfoArgs.builder()
                .firstName("example")
                .lastName("example2")
                .build())
            .phoneConfig(UserPhoneConfigArgs.builder()
                .afterContactWorkTimeLimit(0)
                .phoneType("SOFT_PHONE")
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:connect:User
    properties:
      instanceId: ${aws_connect_instance.example.id}
      password: Password123
      routingProfileId: ${aws_connect_routing_profile.example.routing_profile_id}
      securityProfileIds:
        - ${aws_connect_security_profile.example.security_profile_id}
      identityInfo:
        firstName: example
        lastName: example2
      phoneConfig:
        afterContactWorkTimeLimit: 0
        phoneType: SOFT_PHONE
```
{{% /example %}}
{{% example %}}
### With hierarchy_group_id

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.connect.User("example", {
    instanceId: aws_connect_instance.example.id,
    password: "Password123",
    routingProfileId: aws_connect_routing_profile.example.routing_profile_id,
    hierarchyGroupId: aws_connect_user_hierarchy_group.example.hierarchy_group_id,
    securityProfileIds: [aws_connect_security_profile.example.security_profile_id],
    identityInfo: {
        firstName: "example",
        lastName: "example2",
    },
    phoneConfig: {
        afterContactWorkTimeLimit: 0,
        phoneType: "SOFT_PHONE",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.connect.User("example",
    instance_id=aws_connect_instance["example"]["id"],
    password="Password123",
    routing_profile_id=aws_connect_routing_profile["example"]["routing_profile_id"],
    hierarchy_group_id=aws_connect_user_hierarchy_group["example"]["hierarchy_group_id"],
    security_profile_ids=[aws_connect_security_profile["example"]["security_profile_id"]],
    identity_info=aws.connect.UserIdentityInfoArgs(
        first_name="example",
        last_name="example2",
    ),
    phone_config=aws.connect.UserPhoneConfigArgs(
        after_contact_work_time_limit=0,
        phone_type="SOFT_PHONE",
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Connect.User("example", new()
    {
        InstanceId = aws_connect_instance.Example.Id,
        Password = "Password123",
        RoutingProfileId = aws_connect_routing_profile.Example.Routing_profile_id,
        HierarchyGroupId = aws_connect_user_hierarchy_group.Example.Hierarchy_group_id,
        SecurityProfileIds = new[]
        {
            aws_connect_security_profile.Example.Security_profile_id,
        },
        IdentityInfo = new Aws.Connect.Inputs.UserIdentityInfoArgs
        {
            FirstName = "example",
            LastName = "example2",
        },
        PhoneConfig = new Aws.Connect.Inputs.UserPhoneConfigArgs
        {
            AfterContactWorkTimeLimit = 0,
            PhoneType = "SOFT_PHONE",
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/connect"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := connect.NewUser(ctx, "example", &connect.UserArgs{
			InstanceId:       pulumi.Any(aws_connect_instance.Example.Id),
			Password:         pulumi.String("Password123"),
			RoutingProfileId: pulumi.Any(aws_connect_routing_profile.Example.Routing_profile_id),
			HierarchyGroupId: pulumi.Any(aws_connect_user_hierarchy_group.Example.Hierarchy_group_id),
			SecurityProfileIds: pulumi.StringArray{
				pulumi.Any(aws_connect_security_profile.Example.Security_profile_id),
			},
			IdentityInfo: &connect.UserIdentityInfoArgs{
				FirstName: pulumi.String("example"),
				LastName:  pulumi.String("example2"),
			},
			PhoneConfig: &connect.UserPhoneConfigArgs{
				AfterContactWorkTimeLimit: pulumi.Int(0),
				PhoneType:                 pulumi.String("SOFT_PHONE"),
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
import com.pulumi.aws.connect.User;
import com.pulumi.aws.connect.UserArgs;
import com.pulumi.aws.connect.inputs.UserIdentityInfoArgs;
import com.pulumi.aws.connect.inputs.UserPhoneConfigArgs;
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
        var example = new User("example", UserArgs.builder()        
            .instanceId(aws_connect_instance.example().id())
            .password("Password123")
            .routingProfileId(aws_connect_routing_profile.example().routing_profile_id())
            .hierarchyGroupId(aws_connect_user_hierarchy_group.example().hierarchy_group_id())
            .securityProfileIds(aws_connect_security_profile.example().security_profile_id())
            .identityInfo(UserIdentityInfoArgs.builder()
                .firstName("example")
                .lastName("example2")
                .build())
            .phoneConfig(UserPhoneConfigArgs.builder()
                .afterContactWorkTimeLimit(0)
                .phoneType("SOFT_PHONE")
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:connect:User
    properties:
      instanceId: ${aws_connect_instance.example.id}
      password: Password123
      routingProfileId: ${aws_connect_routing_profile.example.routing_profile_id}
      hierarchyGroupId: ${aws_connect_user_hierarchy_group.example.hierarchy_group_id}
      securityProfileIds:
        - ${aws_connect_security_profile.example.security_profile_id}
      identityInfo:
        firstName: example
        lastName: example2
      phoneConfig:
        afterContactWorkTimeLimit: 0
        phoneType: SOFT_PHONE
```
{{% /example %}}
{{% example %}}
### With identity_info filled

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.connect.User("example", {
    instanceId: aws_connect_instance.example.id,
    password: "Password123",
    routingProfileId: aws_connect_routing_profile.example.routing_profile_id,
    securityProfileIds: [aws_connect_security_profile.example.security_profile_id],
    identityInfo: {
        email: "example@example.com",
        firstName: "example",
        lastName: "example2",
    },
    phoneConfig: {
        afterContactWorkTimeLimit: 0,
        phoneType: "SOFT_PHONE",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.connect.User("example",
    instance_id=aws_connect_instance["example"]["id"],
    password="Password123",
    routing_profile_id=aws_connect_routing_profile["example"]["routing_profile_id"],
    security_profile_ids=[aws_connect_security_profile["example"]["security_profile_id"]],
    identity_info=aws.connect.UserIdentityInfoArgs(
        email="example@example.com",
        first_name="example",
        last_name="example2",
    ),
    phone_config=aws.connect.UserPhoneConfigArgs(
        after_contact_work_time_limit=0,
        phone_type="SOFT_PHONE",
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Connect.User("example", new()
    {
        InstanceId = aws_connect_instance.Example.Id,
        Password = "Password123",
        RoutingProfileId = aws_connect_routing_profile.Example.Routing_profile_id,
        SecurityProfileIds = new[]
        {
            aws_connect_security_profile.Example.Security_profile_id,
        },
        IdentityInfo = new Aws.Connect.Inputs.UserIdentityInfoArgs
        {
            Email = "example@example.com",
            FirstName = "example",
            LastName = "example2",
        },
        PhoneConfig = new Aws.Connect.Inputs.UserPhoneConfigArgs
        {
            AfterContactWorkTimeLimit = 0,
            PhoneType = "SOFT_PHONE",
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/connect"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := connect.NewUser(ctx, "example", &connect.UserArgs{
			InstanceId:       pulumi.Any(aws_connect_instance.Example.Id),
			Password:         pulumi.String("Password123"),
			RoutingProfileId: pulumi.Any(aws_connect_routing_profile.Example.Routing_profile_id),
			SecurityProfileIds: pulumi.StringArray{
				pulumi.Any(aws_connect_security_profile.Example.Security_profile_id),
			},
			IdentityInfo: &connect.UserIdentityInfoArgs{
				Email:     pulumi.String("example@example.com"),
				FirstName: pulumi.String("example"),
				LastName:  pulumi.String("example2"),
			},
			PhoneConfig: &connect.UserPhoneConfigArgs{
				AfterContactWorkTimeLimit: pulumi.Int(0),
				PhoneType:                 pulumi.String("SOFT_PHONE"),
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
import com.pulumi.aws.connect.User;
import com.pulumi.aws.connect.UserArgs;
import com.pulumi.aws.connect.inputs.UserIdentityInfoArgs;
import com.pulumi.aws.connect.inputs.UserPhoneConfigArgs;
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
        var example = new User("example", UserArgs.builder()        
            .instanceId(aws_connect_instance.example().id())
            .password("Password123")
            .routingProfileId(aws_connect_routing_profile.example().routing_profile_id())
            .securityProfileIds(aws_connect_security_profile.example().security_profile_id())
            .identityInfo(UserIdentityInfoArgs.builder()
                .email("example@example.com")
                .firstName("example")
                .lastName("example2")
                .build())
            .phoneConfig(UserPhoneConfigArgs.builder()
                .afterContactWorkTimeLimit(0)
                .phoneType("SOFT_PHONE")
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:connect:User
    properties:
      instanceId: ${aws_connect_instance.example.id}
      password: Password123
      routingProfileId: ${aws_connect_routing_profile.example.routing_profile_id}
      securityProfileIds:
        - ${aws_connect_security_profile.example.security_profile_id}
      identityInfo:
        email: example@example.com
        firstName: example
        lastName: example2
      phoneConfig:
        afterContactWorkTimeLimit: 0
        phoneType: SOFT_PHONE
```
{{% /example %}}
{{% example %}}
### With phone_config phone type as desk phone

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.connect.User("example", {
    instanceId: aws_connect_instance.example.id,
    password: "Password123",
    routingProfileId: aws_connect_routing_profile.example.routing_profile_id,
    securityProfileIds: [aws_connect_security_profile.example.security_profile_id],
    phoneConfig: {
        afterContactWorkTimeLimit: 0,
        phoneType: "SOFT_PHONE",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.connect.User("example",
    instance_id=aws_connect_instance["example"]["id"],
    password="Password123",
    routing_profile_id=aws_connect_routing_profile["example"]["routing_profile_id"],
    security_profile_ids=[aws_connect_security_profile["example"]["security_profile_id"]],
    phone_config=aws.connect.UserPhoneConfigArgs(
        after_contact_work_time_limit=0,
        phone_type="SOFT_PHONE",
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Connect.User("example", new()
    {
        InstanceId = aws_connect_instance.Example.Id,
        Password = "Password123",
        RoutingProfileId = aws_connect_routing_profile.Example.Routing_profile_id,
        SecurityProfileIds = new[]
        {
            aws_connect_security_profile.Example.Security_profile_id,
        },
        PhoneConfig = new Aws.Connect.Inputs.UserPhoneConfigArgs
        {
            AfterContactWorkTimeLimit = 0,
            PhoneType = "SOFT_PHONE",
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/connect"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := connect.NewUser(ctx, "example", &connect.UserArgs{
			InstanceId:       pulumi.Any(aws_connect_instance.Example.Id),
			Password:         pulumi.String("Password123"),
			RoutingProfileId: pulumi.Any(aws_connect_routing_profile.Example.Routing_profile_id),
			SecurityProfileIds: pulumi.StringArray{
				pulumi.Any(aws_connect_security_profile.Example.Security_profile_id),
			},
			PhoneConfig: &connect.UserPhoneConfigArgs{
				AfterContactWorkTimeLimit: pulumi.Int(0),
				PhoneType:                 pulumi.String("SOFT_PHONE"),
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
import com.pulumi.aws.connect.User;
import com.pulumi.aws.connect.UserArgs;
import com.pulumi.aws.connect.inputs.UserPhoneConfigArgs;
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
        var example = new User("example", UserArgs.builder()        
            .instanceId(aws_connect_instance.example().id())
            .password("Password123")
            .routingProfileId(aws_connect_routing_profile.example().routing_profile_id())
            .securityProfileIds(aws_connect_security_profile.example().security_profile_id())
            .phoneConfig(UserPhoneConfigArgs.builder()
                .afterContactWorkTimeLimit(0)
                .phoneType("SOFT_PHONE")
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:connect:User
    properties:
      instanceId: ${aws_connect_instance.example.id}
      password: Password123
      routingProfileId: ${aws_connect_routing_profile.example.routing_profile_id}
      securityProfileIds:
        - ${aws_connect_security_profile.example.security_profile_id}
      phoneConfig:
        afterContactWorkTimeLimit: 0
        phoneType: SOFT_PHONE
```
{{% /example %}}
{{% example %}}
### With multiple Security profile ids specified in security_profile_ids

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.connect.User("example", {
    instanceId: aws_connect_instance.example.id,
    password: "Password123",
    routingProfileId: aws_connect_routing_profile.example.routing_profile_id,
    securityProfileIds: [
        aws_connect_security_profile.example.security_profile_id,
        aws_connect_security_profile.example2.security_profile_id,
    ],
    phoneConfig: {
        afterContactWorkTimeLimit: 0,
        autoAccept: false,
        deskPhoneNumber: "+112345678912",
        phoneType: "DESK_PHONE",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.connect.User("example",
    instance_id=aws_connect_instance["example"]["id"],
    password="Password123",
    routing_profile_id=aws_connect_routing_profile["example"]["routing_profile_id"],
    security_profile_ids=[
        aws_connect_security_profile["example"]["security_profile_id"],
        aws_connect_security_profile["example2"]["security_profile_id"],
    ],
    phone_config=aws.connect.UserPhoneConfigArgs(
        after_contact_work_time_limit=0,
        auto_accept=False,
        desk_phone_number="+112345678912",
        phone_type="DESK_PHONE",
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Connect.User("example", new()
    {
        InstanceId = aws_connect_instance.Example.Id,
        Password = "Password123",
        RoutingProfileId = aws_connect_routing_profile.Example.Routing_profile_id,
        SecurityProfileIds = new[]
        {
            aws_connect_security_profile.Example.Security_profile_id,
            aws_connect_security_profile.Example2.Security_profile_id,
        },
        PhoneConfig = new Aws.Connect.Inputs.UserPhoneConfigArgs
        {
            AfterContactWorkTimeLimit = 0,
            AutoAccept = false,
            DeskPhoneNumber = "+112345678912",
            PhoneType = "DESK_PHONE",
        },
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/connect"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := connect.NewUser(ctx, "example", &connect.UserArgs{
			InstanceId:       pulumi.Any(aws_connect_instance.Example.Id),
			Password:         pulumi.String("Password123"),
			RoutingProfileId: pulumi.Any(aws_connect_routing_profile.Example.Routing_profile_id),
			SecurityProfileIds: pulumi.StringArray{
				pulumi.Any(aws_connect_security_profile.Example.Security_profile_id),
				pulumi.Any(aws_connect_security_profile.Example2.Security_profile_id),
			},
			PhoneConfig: &connect.UserPhoneConfigArgs{
				AfterContactWorkTimeLimit: pulumi.Int(0),
				AutoAccept:                pulumi.Bool(false),
				DeskPhoneNumber:           pulumi.String("+112345678912"),
				PhoneType:                 pulumi.String("DESK_PHONE"),
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
import com.pulumi.aws.connect.User;
import com.pulumi.aws.connect.UserArgs;
import com.pulumi.aws.connect.inputs.UserPhoneConfigArgs;
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
        var example = new User("example", UserArgs.builder()        
            .instanceId(aws_connect_instance.example().id())
            .password("Password123")
            .routingProfileId(aws_connect_routing_profile.example().routing_profile_id())
            .securityProfileIds(            
                aws_connect_security_profile.example().security_profile_id(),
                aws_connect_security_profile.example2().security_profile_id())
            .phoneConfig(UserPhoneConfigArgs.builder()
                .afterContactWorkTimeLimit(0)
                .autoAccept(false)
                .deskPhoneNumber("+112345678912")
                .phoneType("DESK_PHONE")
                .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:connect:User
    properties:
      instanceId: ${aws_connect_instance.example.id}
      password: Password123
      routingProfileId: ${aws_connect_routing_profile.example.routing_profile_id}
      securityProfileIds:
        - ${aws_connect_security_profile.example.security_profile_id}
        - ${aws_connect_security_profile.example2.security_profile_id}
      phoneConfig:
        afterContactWorkTimeLimit: 0
        autoAccept: false
        deskPhoneNumber: +112345678912
        phoneType: DESK_PHONE
```
{{% /example %}}
{{% /examples %}}

## Import

Amazon Connect Users can be imported using the `instance_id` and `user_id` separated by a colon (`:`), e.g.,

```sh
 $ pulumi import aws:connect/user:User example f1288a1f-6193-445a-b47e-af739b2:c1d4e5f6-1b3c-1b3c-1b3c-c1d4e5f6c1d4e5
```

 
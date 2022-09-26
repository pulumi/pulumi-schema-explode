Provides a Pinpoint Email Channel resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const app = new aws.pinpoint.App("app", {});
const role = new aws.iam.Role("role", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "pinpoint.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
`});
const email = new aws.pinpoint.EmailChannel("email", {
    applicationId: app.applicationId,
    fromAddress: "user@example.com",
    roleArn: role.arn,
});
const identity = new aws.ses.DomainIdentity("identity", {domain: "example.com"});
const rolePolicy = new aws.iam.RolePolicy("rolePolicy", {
    role: role.id,
    policy: `{
  "Version": "2012-10-17",
  "Statement": {
    "Action": [
      "mobileanalytics:PutEvents",
      "mobileanalytics:PutItems"
    ],
    "Effect": "Allow",
    "Resource": [
      "*"
    ]
  }
}
`,
});
```
```python
import pulumi
import pulumi_aws as aws

app = aws.pinpoint.App("app")
role = aws.iam.Role("role", assume_role_policy="""{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "pinpoint.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
""")
email = aws.pinpoint.EmailChannel("email",
    application_id=app.application_id,
    from_address="user@example.com",
    role_arn=role.arn)
identity = aws.ses.DomainIdentity("identity", domain="example.com")
role_policy = aws.iam.RolePolicy("rolePolicy",
    role=role.id,
    policy="""{
  "Version": "2012-10-17",
  "Statement": {
    "Action": [
      "mobileanalytics:PutEvents",
      "mobileanalytics:PutItems"
    ],
    "Effect": "Allow",
    "Resource": [
      "*"
    ]
  }
}
""")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var app = new Aws.Pinpoint.App("app");

    var role = new Aws.Iam.Role("role", new()
    {
        AssumeRolePolicy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": [
    {
      ""Action"": ""sts:AssumeRole"",
      ""Principal"": {
        ""Service"": ""pinpoint.amazonaws.com""
      },
      ""Effect"": ""Allow"",
      ""Sid"": """"
    }
  ]
}
",
    });

    var email = new Aws.Pinpoint.EmailChannel("email", new()
    {
        ApplicationId = app.ApplicationId,
        FromAddress = "user@example.com",
        RoleArn = role.Arn,
    });

    var identity = new Aws.Ses.DomainIdentity("identity", new()
    {
        Domain = "example.com",
    });

    var rolePolicy = new Aws.Iam.RolePolicy("rolePolicy", new()
    {
        Role = role.Id,
        Policy = @"{
  ""Version"": ""2012-10-17"",
  ""Statement"": {
    ""Action"": [
      ""mobileanalytics:PutEvents"",
      ""mobileanalytics:PutItems""
    ],
    ""Effect"": ""Allow"",
    ""Resource"": [
      ""*""
    ]
  }
}
",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/pinpoint"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ses"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		app, err := pinpoint.NewApp(ctx, "app", nil)
		if err != nil {
			return err
		}
		role, err := iam.NewRole(ctx, "role", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "pinpoint.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
`)),
		})
		if err != nil {
			return err
		}
		_, err = pinpoint.NewEmailChannel(ctx, "email", &pinpoint.EmailChannelArgs{
			ApplicationId: app.ApplicationId,
			FromAddress:   pulumi.String("user@example.com"),
			RoleArn:       role.Arn,
		})
		if err != nil {
			return err
		}
		_, err = ses.NewDomainIdentity(ctx, "identity", &ses.DomainIdentityArgs{
			Domain: pulumi.String("example.com"),
		})
		if err != nil {
			return err
		}
		_, err = iam.NewRolePolicy(ctx, "rolePolicy", &iam.RolePolicyArgs{
			Role: role.ID(),
			Policy: pulumi.Any(fmt.Sprintf(`{
  "Version": "2012-10-17",
  "Statement": {
    "Action": [
      "mobileanalytics:PutEvents",
      "mobileanalytics:PutItems"
    ],
    "Effect": "Allow",
    "Resource": [
      "*"
    ]
  }
}
`)),
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
import com.pulumi.aws.iam.Role;
import com.pulumi.aws.iam.RoleArgs;
import com.pulumi.aws.pinpoint.EmailChannel;
import com.pulumi.aws.pinpoint.EmailChannelArgs;
import com.pulumi.aws.ses.DomainIdentity;
import com.pulumi.aws.ses.DomainIdentityArgs;
import com.pulumi.aws.iam.RolePolicy;
import com.pulumi.aws.iam.RolePolicyArgs;
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

        var role = new Role("role", RoleArgs.builder()        
            .assumeRolePolicy("""
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "pinpoint.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
            """)
            .build());

        var email = new EmailChannel("email", EmailChannelArgs.builder()        
            .applicationId(app.applicationId())
            .fromAddress("user@example.com")
            .roleArn(role.arn())
            .build());

        var identity = new DomainIdentity("identity", DomainIdentityArgs.builder()        
            .domain("example.com")
            .build());

        var rolePolicy = new RolePolicy("rolePolicy", RolePolicyArgs.builder()        
            .role(role.id())
            .policy("""
{
  "Version": "2012-10-17",
  "Statement": {
    "Action": [
      "mobileanalytics:PutEvents",
      "mobileanalytics:PutItems"
    ],
    "Effect": "Allow",
    "Resource": [
      "*"
    ]
  }
}
            """)
            .build());

    }
}
```
```yaml
resources:
  email:
    type: aws:pinpoint:EmailChannel
    properties:
      applicationId: ${app.applicationId}
      fromAddress: user@example.com
      roleArn: ${role.arn}
  app:
    type: aws:pinpoint:App
  identity:
    type: aws:ses:DomainIdentity
    properties:
      domain: example.com
  role:
    type: aws:iam:Role
    properties:
      assumeRolePolicy: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Principal": {
                "Service": "pinpoint.amazonaws.com"
              },
              "Effect": "Allow",
              "Sid": ""
            }
          ]
        }
  rolePolicy:
    type: aws:iam:RolePolicy
    properties:
      role: ${role.id}
      policy: |
        {
          "Version": "2012-10-17",
          "Statement": {
            "Action": [
              "mobileanalytics:PutEvents",
              "mobileanalytics:PutItems"
            ],
            "Effect": "Allow",
            "Resource": [
              "*"
            ]
          }
        }
```
{{% /example %}}
{{% /examples %}}

## Import

Pinpoint Email Channel can be imported using the `application-id`, e.g.,

```sh
 $ pulumi import aws:pinpoint/emailChannel:EmailChannel email application-id
```

 
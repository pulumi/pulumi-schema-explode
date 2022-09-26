{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.amplify.App("example", {
    // The default build_spec added by the Amplify Console for React.
    buildSpec: `  version: 0.1
  frontend:
    phases:
      preBuild:
        commands:
          - yarn install
      build:
        commands:
          - yarn run build
    artifacts:
      baseDirectory: build
      files:
        - '**/*'
    cache:
      paths:
        - node_modules/**/*
`,
    // The default rewrites and redirects added by the Amplify Console.
    customRules: [{
        source: "/<*>",
        status: "404",
        target: "/index.html",
    }],
    environmentVariables: {
        ENV: "test",
    },
    repository: "https://github.com/example/app",
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.amplify.App("example",
    build_spec="""  version: 0.1
  frontend:
    phases:
      preBuild:
        commands:
          - yarn install
      build:
        commands:
          - yarn run build
    artifacts:
      baseDirectory: build
      files:
        - '**/*'
    cache:
      paths:
        - node_modules/**/*

""",
    custom_rules=[aws.amplify.AppCustomRuleArgs(
        source="/<*>",
        status="404",
        target="/index.html",
    )],
    environment_variables={
        "ENV": "test",
    },
    repository="https://github.com/example/app")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Amplify.App("example", new()
    {
        BuildSpec = @"  version: 0.1
  frontend:
    phases:
      preBuild:
        commands:
          - yarn install
      build:
        commands:
          - yarn run build
    artifacts:
      baseDirectory: build
      files:
        - '**/*'
    cache:
      paths:
        - node_modules/**/*

",
        CustomRules = new[]
        {
            new Aws.Amplify.Inputs.AppCustomRuleArgs
            {
                Source = "/<*>",
                Status = "404",
                Target = "/index.html",
            },
        },
        EnvironmentVariables = 
        {
            { "ENV", "test" },
        },
        Repository = "https://github.com/example/app",
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/amplify"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := amplify.NewApp(ctx, "example", &amplify.AppArgs{
			BuildSpec: pulumi.String(fmt.Sprintf(`  version: 0.1
  frontend:
    phases:
      preBuild:
        commands:
          - yarn install
      build:
        commands:
          - yarn run build
    artifacts:
      baseDirectory: build
      files:
        - '**/*'
    cache:
      paths:
        - node_modules/**/*

`)),
			CustomRules: amplify.AppCustomRuleArray{
				&amplify.AppCustomRuleArgs{
					Source: pulumi.String("/<*>"),
					Status: pulumi.String("404"),
					Target: pulumi.String("/index.html"),
				},
			},
			EnvironmentVariables: pulumi.StringMap{
				"ENV": pulumi.String("test"),
			},
			Repository: pulumi.String("https://github.com/example/app"),
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
import com.pulumi.aws.amplify.App;
import com.pulumi.aws.amplify.AppArgs;
import com.pulumi.aws.amplify.inputs.AppCustomRuleArgs;
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
        var example = new App("example", AppArgs.builder()        
            .buildSpec("""
  version: 0.1
  frontend:
    phases:
      preBuild:
        commands:
          - yarn install
      build:
        commands:
          - yarn run build
    artifacts:
      baseDirectory: build
      files:
        - '**/*'
    cache:
      paths:
        - node_modules/**/*

            """)
            .customRules(AppCustomRuleArgs.builder()
                .source("/<*>")
                .status("404")
                .target("/index.html")
                .build())
            .environmentVariables(Map.of("ENV", "test"))
            .repository("https://github.com/example/app")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:amplify:App
    properties:
      # The default build_spec added by the Amplify Console for React.
      buildSpec: |2+
          version: 0.1
          frontend:
            phases:
              preBuild:
                commands:
                  - yarn install
              build:
                commands:
                  - yarn run build
            artifacts:
              baseDirectory: build
              files:
                - '**/*'
            cache:
              paths:
                - node_modules/**/*

      # The default rewrites and redirects added by the Amplify Console.
      customRules:
        - source: /<*>
          status: 404
          target: /index.html
      environmentVariables:
        ENV: test
      repository: https://github.com/example/app
```
{{% /example %}}
{{% example %}}
### Repository with Tokens

If you create a new Amplify App with the `repository` argument, you also need to set `oauth_token` or `access_token` for authentication. For GitHub, get a [personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) and set `access_token` as follows:

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.amplify.App("example", {
    // GitHub personal access token
    accessToken: "...",
    repository: "https://github.com/example/app",
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.amplify.App("example",
    access_token="...",
    repository="https://github.com/example/app")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Amplify.App("example", new()
    {
        AccessToken = "...",
        Repository = "https://github.com/example/app",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/amplify"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := amplify.NewApp(ctx, "example", &amplify.AppArgs{
			AccessToken: pulumi.String("..."),
			Repository:  pulumi.String("https://github.com/example/app"),
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
import com.pulumi.aws.amplify.App;
import com.pulumi.aws.amplify.AppArgs;
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
        var example = new App("example", AppArgs.builder()        
            .accessToken("...")
            .repository("https://github.com/example/app")
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:amplify:App
    properties:
      # GitHub personal access token
      accessToken: '...'
      repository: https://github.com/example/app
```

You can omit `access_token` if you import an existing Amplify App created by the Amplify Console (using OAuth for authentication).
{{% /example %}}
{{% example %}}
### Auto Branch Creation

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.amplify.App("example", {
    autoBranchCreationConfig: {
        // Enable auto build for the created branch.
        enableAutoBuild: true,
    },
    // The default patterns added by the Amplify Console.
    autoBranchCreationPatterns: [
        "*",
        "*/**",
    ],
    enableAutoBranchCreation: true,
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.amplify.App("example",
    auto_branch_creation_config=aws.amplify.AppAutoBranchCreationConfigArgs(
        enable_auto_build=True,
    ),
    auto_branch_creation_patterns=[
        "*",
        "*/**",
    ],
    enable_auto_branch_creation=True)
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Amplify.App("example", new()
    {
        AutoBranchCreationConfig = new Aws.Amplify.Inputs.AppAutoBranchCreationConfigArgs
        {
            EnableAutoBuild = true,
        },
        AutoBranchCreationPatterns = new[]
        {
            "*",
            "*/**",
        },
        EnableAutoBranchCreation = true,
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/amplify"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := amplify.NewApp(ctx, "example", &amplify.AppArgs{
			AutoBranchCreationConfig: &amplify.AppAutoBranchCreationConfigArgs{
				EnableAutoBuild: pulumi.Bool(true),
			},
			AutoBranchCreationPatterns: pulumi.StringArray{
				pulumi.String("*"),
				pulumi.String("*/**"),
			},
			EnableAutoBranchCreation: pulumi.Bool(true),
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
import com.pulumi.aws.amplify.App;
import com.pulumi.aws.amplify.AppArgs;
import com.pulumi.aws.amplify.inputs.AppAutoBranchCreationConfigArgs;
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
        var example = new App("example", AppArgs.builder()        
            .autoBranchCreationConfig(AppAutoBranchCreationConfigArgs.builder()
                .enableAutoBuild(true)
                .build())
            .autoBranchCreationPatterns(            
                "*",
                "*/**")
            .enableAutoBranchCreation(true)
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:amplify:App
    properties:
      autoBranchCreationConfig:
        enableAutoBuild: true
      # The default patterns added by the Amplify Console.
      autoBranchCreationPatterns:
        - '*'
        - '*/**'
      enableAutoBranchCreation: true
```
{{% /example %}}
{{% example %}}
### Rewrites and Redirects

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = new aws.amplify.App("example", {
    customRules: [
        // Reverse Proxy Rewrite for API requests
        // https://docs.aws.amazon.com/amplify/latest/userguide/redirects.html#reverse-proxy-rewrite
        {
            source: "/api/<*>",
            status: "200",
            target: "https://api.example.com/api/<*>",
        },
        // Redirects for Single Page Web Apps (SPA)
        // https://docs.aws.amazon.com/amplify/latest/userguide/redirects.html#redirects-for-single-page-web-apps-spa
        {
            source: "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>",
            status: "200",
            target: "/index.html",
        },
    ],
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.amplify.App("example", custom_rules=[
    aws.amplify.AppCustomRuleArgs(
        source="/api/<*>",
        status="200",
        target="https://api.example.com/api/<*>",
    ),
    aws.amplify.AppCustomRuleArgs(
        source="</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>",
        status="200",
        target="/index.html",
    ),
])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = new Aws.Amplify.App("example", new()
    {
        CustomRules = new[]
        {
            new Aws.Amplify.Inputs.AppCustomRuleArgs
            {
                Source = "/api/<*>",
                Status = "200",
                Target = "https://api.example.com/api/<*>",
            },
            new Aws.Amplify.Inputs.AppCustomRuleArgs
            {
                Source = "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>",
                Status = "200",
                Target = "/index.html",
            },
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/amplify"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := amplify.NewApp(ctx, "example", &amplify.AppArgs{
			CustomRules: amplify.AppCustomRuleArray{
				&amplify.AppCustomRuleArgs{
					Source: pulumi.String("/api/<*>"),
					Status: pulumi.String("200"),
					Target: pulumi.String("https://api.example.com/api/<*>"),
				},
				&amplify.AppCustomRuleArgs{
					Source: pulumi.String(fmt.Sprintf("</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>")),
					Status: pulumi.String("200"),
					Target: pulumi.String("/index.html"),
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
import com.pulumi.aws.amplify.App;
import com.pulumi.aws.amplify.AppArgs;
import com.pulumi.aws.amplify.inputs.AppCustomRuleArgs;
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
        var example = new App("example", AppArgs.builder()        
            .customRules(            
                AppCustomRuleArgs.builder()
                    .source("/api/<*>")
                    .status("200")
                    .target("https://api.example.com/api/<*>")
                    .build(),
                AppCustomRuleArgs.builder()
                    .source("</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>")
                    .status("200")
                    .target("/index.html")
                    .build())
            .build());

    }
}
```
```yaml
resources:
  example:
    type: aws:amplify:App
    properties:
      customRules:
        - source: /api/<*>
          status: 200
          target: https://api.example.com/api/<*>
        - source: </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>
          status: 200
          target: /index.html
```
{{% /example %}}
{{% /examples %}}

## Import

Amplify App can be imported using Amplify App ID (appId), e.g.,

```sh
 $ pulumi import aws:amplify/app:App example d2ypk4k47z8u6
```

 App ID can be obtained from App ARN (e.g., `arn:aws:amplify:us-east-1:12345678:apps/d2ypk4k47z8u6`). 
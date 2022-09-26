Provides an Amazon Lex Bot resource. For more information see
[Amazon Lex: How It Works](https://docs.aws.amazon.com/lex/latest/dg/how-it-works.html)

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const orderFlowersBot = new aws.lex.Bot("order_flowers_bot", {
    abortStatement: {
        messages: [{
            content: "Sorry, I am not able to assist at this time",
            contentType: "PlainText",
        }],
    },
    childDirected: false,
    clarificationPrompt: {
        maxAttempts: 2,
        messages: [{
            content: "I didn't understand you, what would you like to do?",
            contentType: "PlainText",
        }],
    },
    createVersion: false,
    description: "Bot to order flowers on the behalf of a user",
    idleSessionTtlInSeconds: 600,
    intents: [{
        intentName: "OrderFlowers",
        intentVersion: "1",
    }],
    locale: "en-US",
    name: "OrderFlowers",
    processBehavior: "BUILD",
    voiceId: "Salli",
});
```
```python
import pulumi
import pulumi_aws as aws

order_flowers_bot = aws.lex.Bot("orderFlowersBot",
    abort_statement=aws.lex.BotAbortStatementArgs(
        messages=[aws.lex.BotAbortStatementMessageArgs(
            content="Sorry, I am not able to assist at this time",
            content_type="PlainText",
        )],
    ),
    child_directed=False,
    clarification_prompt=aws.lex.BotClarificationPromptArgs(
        max_attempts=2,
        messages=[aws.lex.BotClarificationPromptMessageArgs(
            content="I didn't understand you, what would you like to do?",
            content_type="PlainText",
        )],
    ),
    create_version=False,
    description="Bot to order flowers on the behalf of a user",
    idle_session_ttl_in_seconds=600,
    intents=[aws.lex.BotIntentArgs(
        intent_name="OrderFlowers",
        intent_version="1",
    )],
    locale="en-US",
    name="OrderFlowers",
    process_behavior="BUILD",
    voice_id="Salli")
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var orderFlowersBot = new Aws.Lex.Bot("orderFlowersBot", new()
    {
        AbortStatement = new Aws.Lex.Inputs.BotAbortStatementArgs
        {
            Messages = new[]
            {
                new Aws.Lex.Inputs.BotAbortStatementMessageArgs
                {
                    Content = "Sorry, I am not able to assist at this time",
                    ContentType = "PlainText",
                },
            },
        },
        ChildDirected = false,
        ClarificationPrompt = new Aws.Lex.Inputs.BotClarificationPromptArgs
        {
            MaxAttempts = 2,
            Messages = new[]
            {
                new Aws.Lex.Inputs.BotClarificationPromptMessageArgs
                {
                    Content = "I didn't understand you, what would you like to do?",
                    ContentType = "PlainText",
                },
            },
        },
        CreateVersion = false,
        Description = "Bot to order flowers on the behalf of a user",
        IdleSessionTtlInSeconds = 600,
        Intents = new[]
        {
            new Aws.Lex.Inputs.BotIntentArgs
            {
                IntentName = "OrderFlowers",
                IntentVersion = "1",
            },
        },
        Locale = "en-US",
        Name = "OrderFlowers",
        ProcessBehavior = "BUILD",
        VoiceId = "Salli",
    });

});
```
```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lex"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := lex.NewBot(ctx, "orderFlowersBot", &lex.BotArgs{
			AbortStatement: &lex.BotAbortStatementArgs{
				Messages: lex.BotAbortStatementMessageArray{
					&lex.BotAbortStatementMessageArgs{
						Content:     pulumi.String("Sorry, I am not able to assist at this time"),
						ContentType: pulumi.String("PlainText"),
					},
				},
			},
			ChildDirected: pulumi.Bool(false),
			ClarificationPrompt: &lex.BotClarificationPromptArgs{
				MaxAttempts: pulumi.Int(2),
				Messages: lex.BotClarificationPromptMessageArray{
					&lex.BotClarificationPromptMessageArgs{
						Content:     pulumi.String("I didn't understand you, what would you like to do?"),
						ContentType: pulumi.String("PlainText"),
					},
				},
			},
			CreateVersion:           pulumi.Bool(false),
			Description:             pulumi.String("Bot to order flowers on the behalf of a user"),
			IdleSessionTtlInSeconds: pulumi.Int(600),
			Intents: lex.BotIntentArray{
				&lex.BotIntentArgs{
					IntentName:    pulumi.String("OrderFlowers"),
					IntentVersion: pulumi.String("1"),
				},
			},
			Locale:          pulumi.String("en-US"),
			Name:            pulumi.String("OrderFlowers"),
			ProcessBehavior: pulumi.String("BUILD"),
			VoiceId:         pulumi.String("Salli"),
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
import com.pulumi.aws.lex.Bot;
import com.pulumi.aws.lex.BotArgs;
import com.pulumi.aws.lex.inputs.BotAbortStatementArgs;
import com.pulumi.aws.lex.inputs.BotClarificationPromptArgs;
import com.pulumi.aws.lex.inputs.BotIntentArgs;
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
        var orderFlowersBot = new Bot("orderFlowersBot", BotArgs.builder()        
            .abortStatement(BotAbortStatementArgs.builder()
                .messages(BotAbortStatementMessageArgs.builder()
                    .content("Sorry, I am not able to assist at this time")
                    .contentType("PlainText")
                    .build())
                .build())
            .childDirected(false)
            .clarificationPrompt(BotClarificationPromptArgs.builder()
                .maxAttempts(2)
                .messages(BotClarificationPromptMessageArgs.builder()
                    .content("I didn't understand you, what would you like to do?")
                    .contentType("PlainText")
                    .build())
                .build())
            .createVersion(false)
            .description("Bot to order flowers on the behalf of a user")
            .idleSessionTtlInSeconds(600)
            .intents(BotIntentArgs.builder()
                .intentName("OrderFlowers")
                .intentVersion("1")
                .build())
            .locale("en-US")
            .name("OrderFlowers")
            .processBehavior("BUILD")
            .voiceId("Salli")
            .build());

    }
}
```
```yaml
resources:
  orderFlowersBot:
    type: aws:lex:Bot
    properties:
      abortStatement:
        messages:
          - content: Sorry, I am not able to assist at this time
            contentType: PlainText
      childDirected: false
      clarificationPrompt:
        maxAttempts: 2
        messages:
          - content: I didn't understand you, what would you like to do?
            contentType: PlainText
      createVersion: false
      description: Bot to order flowers on the behalf of a user
      idleSessionTtlInSeconds: 600
      intents:
        - intentName: OrderFlowers
          intentVersion: 1
      locale: en-US
      name: OrderFlowers
      processBehavior: BUILD
      voiceId: Salli
```
{{% /example %}}
{{% /examples %}}

## Import

Bots can be imported using their name.

```sh
 $ pulumi import aws:lex/bot:Bot order_flowers_bot OrderFlowers
```

 
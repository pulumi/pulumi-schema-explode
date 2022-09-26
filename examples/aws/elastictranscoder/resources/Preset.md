Provides an Elastic Transcoder preset resource.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bar = new aws.elastictranscoder.Preset("bar", {
    audio: {
        audioPackingMode: "SingleTrack",
        bitRate: "96",
        channels: "2",
        codec: "AAC",
        sampleRate: "44100",
    },
    audioCodecOptions: {
        profile: "AAC-LC",
    },
    container: "mp4",
    description: "Sample Preset",
    thumbnails: {
        format: "png",
        interval: "120",
        maxHeight: "auto",
        maxWidth: "auto",
        paddingPolicy: "Pad",
        sizingPolicy: "Fit",
    },
    video: {
        bitRate: "1600",
        codec: "H.264",
        displayAspectRatio: "16:9",
        fixedGop: "false",
        frameRate: "auto",
        keyframesMaxDist: "240",
        maxFrameRate: "60",
        maxHeight: "auto",
        maxWidth: "auto",
        paddingPolicy: "Pad",
        sizingPolicy: "Fit",
    },
    videoCodecOptions: {
        ColorSpaceConversionMode: "None",
        InterlacedMode: "Progressive",
        Level: "2.2",
        MaxReferenceFrames: 3,
        Profile: "main",
    },
    videoWatermarks: [{
        horizontalAlign: "Right",
        horizontalOffset: "10px",
        id: "Test",
        maxHeight: "20%",
        maxWidth: "20%",
        opacity: "55.5",
        sizingPolicy: "ShrinkToFit",
        target: "Content",
        verticalAlign: "Bottom",
        verticalOffset: "10px",
    }],
});
```
```python
import pulumi
import pulumi_aws as aws

bar = aws.elastictranscoder.Preset("bar",
    audio=aws.elastictranscoder.PresetAudioArgs(
        audio_packing_mode="SingleTrack",
        bit_rate="96",
        channels="2",
        codec="AAC",
        sample_rate="44100",
    ),
    audio_codec_options=aws.elastictranscoder.PresetAudioCodecOptionsArgs(
        profile="AAC-LC",
    ),
    container="mp4",
    description="Sample Preset",
    thumbnails=aws.elastictranscoder.PresetThumbnailsArgs(
        format="png",
        interval="120",
        max_height="auto",
        max_width="auto",
        padding_policy="Pad",
        sizing_policy="Fit",
    ),
    video=aws.elastictranscoder.PresetVideoArgs(
        bit_rate="1600",
        codec="H.264",
        display_aspect_ratio="16:9",
        fixed_gop="false",
        frame_rate="auto",
        keyframes_max_dist="240",
        max_frame_rate="60",
        max_height="auto",
        max_width="auto",
        padding_policy="Pad",
        sizing_policy="Fit",
    ),
    video_codec_options={
        "ColorSpaceConversionMode": "None",
        "InterlacedMode": "Progressive",
        "Level": "2.2",
        "MaxReferenceFrames": "3",
        "Profile": "main",
    },
    video_watermarks=[aws.elastictranscoder.PresetVideoWatermarkArgs(
        horizontal_align="Right",
        horizontal_offset="10px",
        id="Test",
        max_height="20%",
        max_width="20%",
        opacity="55.5",
        sizing_policy="ShrinkToFit",
        target="Content",
        vertical_align="Bottom",
        vertical_offset="10px",
    )])
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var bar = new Aws.ElasticTranscoder.Preset("bar", new()
    {
        Audio = new Aws.ElasticTranscoder.Inputs.PresetAudioArgs
        {
            AudioPackingMode = "SingleTrack",
            BitRate = "96",
            Channels = "2",
            Codec = "AAC",
            SampleRate = "44100",
        },
        AudioCodecOptions = new Aws.ElasticTranscoder.Inputs.PresetAudioCodecOptionsArgs
        {
            Profile = "AAC-LC",
        },
        Container = "mp4",
        Description = "Sample Preset",
        Thumbnails = new Aws.ElasticTranscoder.Inputs.PresetThumbnailsArgs
        {
            Format = "png",
            Interval = "120",
            MaxHeight = "auto",
            MaxWidth = "auto",
            PaddingPolicy = "Pad",
            SizingPolicy = "Fit",
        },
        Video = new Aws.ElasticTranscoder.Inputs.PresetVideoArgs
        {
            BitRate = "1600",
            Codec = "H.264",
            DisplayAspectRatio = "16:9",
            FixedGop = "false",
            FrameRate = "auto",
            KeyframesMaxDist = "240",
            MaxFrameRate = "60",
            MaxHeight = "auto",
            MaxWidth = "auto",
            PaddingPolicy = "Pad",
            SizingPolicy = "Fit",
        },
        VideoCodecOptions = 
        {
            { "ColorSpaceConversionMode", "None" },
            { "InterlacedMode", "Progressive" },
            { "Level", "2.2" },
            { "MaxReferenceFrames", "3" },
            { "Profile", "main" },
        },
        VideoWatermarks = new[]
        {
            new Aws.ElasticTranscoder.Inputs.PresetVideoWatermarkArgs
            {
                HorizontalAlign = "Right",
                HorizontalOffset = "10px",
                Id = "Test",
                MaxHeight = "20%",
                MaxWidth = "20%",
                Opacity = "55.5",
                SizingPolicy = "ShrinkToFit",
                Target = "Content",
                VerticalAlign = "Bottom",
                VerticalOffset = "10px",
            },
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/elastictranscoder"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := elastictranscoder.NewPreset(ctx, "bar", &elastictranscoder.PresetArgs{
			Audio: &elastictranscoder.PresetAudioArgs{
				AudioPackingMode: pulumi.String("SingleTrack"),
				BitRate:          pulumi.String("96"),
				Channels:         pulumi.String("2"),
				Codec:            pulumi.String("AAC"),
				SampleRate:       pulumi.String("44100"),
			},
			AudioCodecOptions: &elastictranscoder.PresetAudioCodecOptionsArgs{
				Profile: pulumi.String("AAC-LC"),
			},
			Container:   pulumi.String("mp4"),
			Description: pulumi.String("Sample Preset"),
			Thumbnails: &elastictranscoder.PresetThumbnailsArgs{
				Format:        pulumi.String("png"),
				Interval:      pulumi.String("120"),
				MaxHeight:     pulumi.String("auto"),
				MaxWidth:      pulumi.String("auto"),
				PaddingPolicy: pulumi.String("Pad"),
				SizingPolicy:  pulumi.String("Fit"),
			},
			Video: &elastictranscoder.PresetVideoArgs{
				BitRate:            pulumi.String("1600"),
				Codec:              pulumi.String("H.264"),
				DisplayAspectRatio: pulumi.String("16:9"),
				FixedGop:           pulumi.String("false"),
				FrameRate:          pulumi.String("auto"),
				KeyframesMaxDist:   pulumi.String("240"),
				MaxFrameRate:       pulumi.String("60"),
				MaxHeight:          pulumi.String("auto"),
				MaxWidth:           pulumi.String("auto"),
				PaddingPolicy:      pulumi.String("Pad"),
				SizingPolicy:       pulumi.String("Fit"),
			},
			VideoCodecOptions: pulumi.StringMap{
				"ColorSpaceConversionMode": pulumi.String("None"),
				"InterlacedMode":           pulumi.String("Progressive"),
				"Level":                    pulumi.String("2.2"),
				"MaxReferenceFrames":       pulumi.String("3"),
				"Profile":                  pulumi.String("main"),
			},
			VideoWatermarks: elastictranscoder.PresetVideoWatermarkArray{
				&elastictranscoder.PresetVideoWatermarkArgs{
					HorizontalAlign:  pulumi.String("Right"),
					HorizontalOffset: pulumi.String("10px"),
					Id:               pulumi.String("Test"),
					MaxHeight:        pulumi.String(fmt.Sprintf("20%v", "%")),
					MaxWidth:         pulumi.String(fmt.Sprintf("20%v", "%")),
					Opacity:          pulumi.String("55.5"),
					SizingPolicy:     pulumi.String("ShrinkToFit"),
					Target:           pulumi.String("Content"),
					VerticalAlign:    pulumi.String("Bottom"),
					VerticalOffset:   pulumi.String("10px"),
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
import com.pulumi.aws.elastictranscoder.Preset;
import com.pulumi.aws.elastictranscoder.PresetArgs;
import com.pulumi.aws.elastictranscoder.inputs.PresetAudioArgs;
import com.pulumi.aws.elastictranscoder.inputs.PresetAudioCodecOptionsArgs;
import com.pulumi.aws.elastictranscoder.inputs.PresetThumbnailsArgs;
import com.pulumi.aws.elastictranscoder.inputs.PresetVideoArgs;
import com.pulumi.aws.elastictranscoder.inputs.PresetVideoWatermarkArgs;
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
        var bar = new Preset("bar", PresetArgs.builder()        
            .audio(PresetAudioArgs.builder()
                .audioPackingMode("SingleTrack")
                .bitRate(96)
                .channels(2)
                .codec("AAC")
                .sampleRate(44100)
                .build())
            .audioCodecOptions(PresetAudioCodecOptionsArgs.builder()
                .profile("AAC-LC")
                .build())
            .container("mp4")
            .description("Sample Preset")
            .thumbnails(PresetThumbnailsArgs.builder()
                .format("png")
                .interval(120)
                .maxHeight("auto")
                .maxWidth("auto")
                .paddingPolicy("Pad")
                .sizingPolicy("Fit")
                .build())
            .video(PresetVideoArgs.builder()
                .bitRate("1600")
                .codec("H.264")
                .displayAspectRatio("16:9")
                .fixedGop("false")
                .frameRate("auto")
                .keyframesMaxDist(240)
                .maxFrameRate("60")
                .maxHeight("auto")
                .maxWidth("auto")
                .paddingPolicy("Pad")
                .sizingPolicy("Fit")
                .build())
            .videoCodecOptions(Map.ofEntries(
                Map.entry("ColorSpaceConversionMode", "None"),
                Map.entry("InterlacedMode", "Progressive"),
                Map.entry("Level", "2.2"),
                Map.entry("MaxReferenceFrames", 3),
                Map.entry("Profile", "main")
            ))
            .videoWatermarks(PresetVideoWatermarkArgs.builder()
                .horizontalAlign("Right")
                .horizontalOffset("10px")
                .id("Test")
                .maxHeight("20%")
                .maxWidth("20%")
                .opacity("55.5")
                .sizingPolicy("ShrinkToFit")
                .target("Content")
                .verticalAlign("Bottom")
                .verticalOffset("10px")
                .build())
            .build());

    }
}
```
```yaml
resources:
  bar:
    type: aws:elastictranscoder:Preset
    properties:
      audio:
        audioPackingMode: SingleTrack
        bitRate: 96
        channels: 2
        codec: AAC
        sampleRate: 44100
      audioCodecOptions:
        profile: AAC-LC
      container: mp4
      description: Sample Preset
      thumbnails:
        format: png
        interval: 120
        maxHeight: auto
        maxWidth: auto
        paddingPolicy: Pad
        sizingPolicy: Fit
      video:
        bitRate: 1600
        codec: H.264
        displayAspectRatio: 16:9
        fixedGop: false
        frameRate: auto
        keyframesMaxDist: 240
        maxFrameRate: 60
        maxHeight: auto
        maxWidth: auto
        paddingPolicy: Pad
        sizingPolicy: Fit
      videoCodecOptions:
        ColorSpaceConversionMode: None
        InterlacedMode: Progressive
        Level: 2.2
        MaxReferenceFrames: 3
        Profile: main
      videoWatermarks:
        - horizontalAlign: Right
          horizontalOffset: 10px
          id: Test
          maxHeight: 20%
          maxWidth: 20%
          opacity: 55.5
          sizingPolicy: ShrinkToFit
          target: Content
          verticalAlign: Bottom
          verticalOffset: 10px
```
{{% /example %}}
{{% /examples %}}

## Import

Elastic Transcoder presets can be imported using the `id`, e.g.,

```sh
 $ pulumi import aws:elastictranscoder/preset:Preset basic_preset 1407981661351-cttk8b
```

 
Provides details about a specific redshift cluster.

{{% examples %}}
## Example Usage
{{% example %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = aws.redshift.getCluster({
    clusterIdentifier: "example-cluster",
});
const exampleStream = new aws.kinesis.FirehoseDeliveryStream("exampleStream", {
    destination: "redshift",
    s3Configuration: {
        roleArn: aws_iam_role.firehose_role.arn,
        bucketArn: aws_s3_bucket.bucket.arn,
        bufferSize: 10,
        bufferInterval: 400,
        compressionFormat: "GZIP",
    },
    redshiftConfiguration: {
        roleArn: aws_iam_role.firehose_role.arn,
        clusterJdbcurl: Promise.all([example, example]).then(([example, example1]) => `jdbc:redshift://${example.endpoint}/${example1.databaseName}`),
        username: "exampleuser",
        password: "Exampl3Pass",
        dataTableName: "example-table",
        copyOptions: "delimiter '|'",
        dataTableColumns: "example-col",
    },
});
```
```python
import pulumi
import pulumi_aws as aws

example = aws.redshift.get_cluster(cluster_identifier="example-cluster")
example_stream = aws.kinesis.FirehoseDeliveryStream("exampleStream",
    destination="redshift",
    s3_configuration=aws.kinesis.FirehoseDeliveryStreamS3ConfigurationArgs(
        role_arn=aws_iam_role["firehose_role"]["arn"],
        bucket_arn=aws_s3_bucket["bucket"]["arn"],
        buffer_size=10,
        buffer_interval=400,
        compression_format="GZIP",
    ),
    redshift_configuration=aws.kinesis.FirehoseDeliveryStreamRedshiftConfigurationArgs(
        role_arn=aws_iam_role["firehose_role"]["arn"],
        cluster_jdbcurl=f"jdbc:redshift://{example.endpoint}/{example.database_name}",
        username="exampleuser",
        password="Exampl3Pass",
        data_table_name="example-table",
        copy_options="delimiter '|'",
        data_table_columns="example-col",
    ))
```
```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;

return await Deployment.RunAsync(() => 
{
    var example = Aws.RedShift.GetCluster.Invoke(new()
    {
        ClusterIdentifier = "example-cluster",
    });

    var exampleStream = new Aws.Kinesis.FirehoseDeliveryStream("exampleStream", new()
    {
        Destination = "redshift",
        S3Configuration = new Aws.Kinesis.Inputs.FirehoseDeliveryStreamS3ConfigurationArgs
        {
            RoleArn = aws_iam_role.Firehose_role.Arn,
            BucketArn = aws_s3_bucket.Bucket.Arn,
            BufferSize = 10,
            BufferInterval = 400,
            CompressionFormat = "GZIP",
        },
        RedshiftConfiguration = new Aws.Kinesis.Inputs.FirehoseDeliveryStreamRedshiftConfigurationArgs
        {
            RoleArn = aws_iam_role.Firehose_role.Arn,
            ClusterJdbcurl = Output.Tuple(example.Apply(getClusterResult => getClusterResult), example.Apply(getClusterResult => getClusterResult)).Apply(values =>
            {
                var example = values.Item1;
                var example1 = values.Item2;
                return $"jdbc:redshift://{example.Apply(getClusterResult => getClusterResult.Endpoint)}/{example1.DatabaseName}";
            }),
            Username = "exampleuser",
            Password = "Exampl3Pass",
            DataTableName = "example-table",
            CopyOptions = "delimiter '|'",
            DataTableColumns = "example-col",
        },
    });

});
```
```go
package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/kinesis"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/redshift"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		example, err := redshift.LookupCluster(ctx, &redshift.LookupClusterArgs{
			ClusterIdentifier: "example-cluster",
		}, nil)
		if err != nil {
			return err
		}
		_, err = kinesis.NewFirehoseDeliveryStream(ctx, "exampleStream", &kinesis.FirehoseDeliveryStreamArgs{
			Destination: pulumi.String("redshift"),
			S3Configuration: &kinesis.FirehoseDeliveryStreamS3ConfigurationArgs{
				RoleArn:           pulumi.Any(aws_iam_role.Firehose_role.Arn),
				BucketArn:         pulumi.Any(aws_s3_bucket.Bucket.Arn),
				BufferSize:        pulumi.Int(10),
				BufferInterval:    pulumi.Int(400),
				CompressionFormat: pulumi.String("GZIP"),
			},
			RedshiftConfiguration: &kinesis.FirehoseDeliveryStreamRedshiftConfigurationArgs{
				RoleArn:          pulumi.Any(aws_iam_role.Firehose_role.Arn),
				ClusterJdbcurl:   pulumi.String(fmt.Sprintf("jdbc:redshift://%v/%v", example.Endpoint, example.DatabaseName)),
				Username:         pulumi.String("exampleuser"),
				Password:         pulumi.String("Exampl3Pass"),
				DataTableName:    pulumi.String("example-table"),
				CopyOptions:      pulumi.String("delimiter '|'"),
				DataTableColumns: pulumi.String("example-col"),
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
import com.pulumi.aws.redshift.RedshiftFunctions;
import com.pulumi.aws.cloudhsmv2.inputs.GetClusterArgs;
import com.pulumi.aws.kinesis.FirehoseDeliveryStream;
import com.pulumi.aws.kinesis.FirehoseDeliveryStreamArgs;
import com.pulumi.aws.kinesis.inputs.FirehoseDeliveryStreamS3ConfigurationArgs;
import com.pulumi.aws.kinesis.inputs.FirehoseDeliveryStreamRedshiftConfigurationArgs;
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
        final var example = RedshiftFunctions.getCluster(GetClusterArgs.builder()
            .clusterIdentifier("example-cluster")
            .build());

        var exampleStream = new FirehoseDeliveryStream("exampleStream", FirehoseDeliveryStreamArgs.builder()        
            .destination("redshift")
            .s3Configuration(FirehoseDeliveryStreamS3ConfigurationArgs.builder()
                .roleArn(aws_iam_role.firehose_role().arn())
                .bucketArn(aws_s3_bucket.bucket().arn())
                .bufferSize(10)
                .bufferInterval(400)
                .compressionFormat("GZIP")
                .build())
            .redshiftConfiguration(FirehoseDeliveryStreamRedshiftConfigurationArgs.builder()
                .roleArn(aws_iam_role.firehose_role().arn())
                .clusterJdbcurl(String.format("jdbc:redshift://%s/%s", example.applyValue(getClusterResult -> getClusterResult.endpoint()),example.applyValue(getClusterResult -> getClusterResult.databaseName())))
                .username("exampleuser")
                .password("Exampl3Pass")
                .dataTableName("example-table")
                .copyOptions("delimiter '|'")
                .dataTableColumns("example-col")
                .build())
            .build());

    }
}
```
```yaml
resources:
  exampleStream:
    type: aws:kinesis:FirehoseDeliveryStream
    properties:
      destination: redshift
      s3Configuration:
        roleArn: ${aws_iam_role.firehose_role.arn}
        bucketArn: ${aws_s3_bucket.bucket.arn}
        bufferSize: 10
        bufferInterval: 400
        compressionFormat: GZIP
      redshiftConfiguration:
        roleArn: ${aws_iam_role.firehose_role.arn}
        clusterJdbcurl: jdbc:redshift://${example.endpoint}/${example.databaseName}
        username: exampleuser
        password: Exampl3Pass
        dataTableName: example-table
        copyOptions: delimiter '|'
        dataTableColumns: example-col
variables:
  example:
    Fn::Invoke:
      Function: aws:redshift:getCluster
      Arguments:
        clusterIdentifier: example-cluster
```
{{% /example %}}
{{% /examples %}}
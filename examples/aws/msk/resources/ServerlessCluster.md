Manages an Amazon MSK Serverless cluster.

> **Note:** To manage a _provisioned_ Amazon MSK cluster, use the [`aws.msk.Cluster`](https://www.terraform.io/docs/providers/aws/r/msk_cluster.html) resource.


## Import

MSK serverless clusters can be imported using the cluster `arn`, e.g.,

```sh
 $ pulumi import aws:msk/serverlessCluster:ServerlessCluster example arn:aws:kafka:us-west-2:123456789012:cluster/example/279c0212-d057-4dba-9aa9-1c4e5a25bfc7-3
```

 
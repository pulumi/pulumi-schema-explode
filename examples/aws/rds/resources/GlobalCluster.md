


## Import

`aws_rds_global_cluster` can be imported by using the RDS Global Cluster identifier, e.g.,

```sh
 $ pulumi import aws:rds/globalCluster:GlobalCluster example example
```

 Certain resource arguments, like `force_destroy`, only exist within this provider. If the argument is set in the the provider configuration on an imported resource, This provider will show a difference on the first plan after import to update the state value. This change is safe to apply immediately so the state matches the desired configuration. Certain resource arguments, like `source_db_cluster_identifier`, do not have an API method for reading the information after creation. If the argument is set in the provider configuration on an imported resource, the provider will always show a difference. To workaround this behavior, either omit the argument from the the provider configuration or use `ignore_changes` to hide the difference, e.g. terraform resource "aws_rds_global_cluster" "example" {

 # ... other configuration ...

 # There is no API for reading source_db_cluster_identifier

 lifecycle {



 ignore_changes = [source_db_cluster_identifier]

 } } 
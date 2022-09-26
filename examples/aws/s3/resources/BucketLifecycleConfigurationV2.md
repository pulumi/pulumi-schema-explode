


## Import

S3 bucket lifecycle configuration can be imported in one of two ways. If the owner (account ID) of the source bucket is the same account used to configure the Terraform AWS Provider, the S3 bucket lifecycle configuration resource should be imported using the `bucket` e.g.,

```sh
 $ pulumi import aws:s3/bucketLifecycleConfigurationV2:BucketLifecycleConfigurationV2 example bucket-name
```

 If the owner (account ID) of the source bucket differs from the account used to configure the Terraform AWS Provider, the S3 bucket lifecycle configuration resource should be imported using the `bucket` and `expected_bucket_owner` separated by a comma (`,`) e.g.,

```sh
 $ pulumi import aws:s3/bucketLifecycleConfigurationV2:BucketLifecycleConfigurationV2 example bucket-name,123456789012
```

 
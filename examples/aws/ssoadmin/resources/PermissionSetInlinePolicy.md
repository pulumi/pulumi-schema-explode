Provides an IAM inline policy for a Single Sign-On (SSO) Permission Set resource

> **NOTE:** AWS Single Sign-On (SSO) only supports one IAM inline policy per `aws.ssoadmin.PermissionSet` resource.
Creating or updating this resource will automatically [Provision the Permission Set](https://docs.aws.amazon.com/singlesignon/latest/APIReference/API_ProvisionPermissionSet.html) to apply the corresponding updates to all assigned accounts.


## Import

SSO Permission Set Inline Policies can be imported using the `permission_set_arn` and `instance_arn` separated by a comma (`,`) e.g.,

```sh
 $ pulumi import aws:ssoadmin/permissionSetInlinePolicy:PermissionSetInlinePolicy example arn:aws:sso:::permissionSet/ssoins-2938j0x8920sbj72/ps-80383020jr9302rk,arn:aws:sso:::instance/ssoins-2938j0x8920sbj72
```

 
Provides a customer managed policy attachment for a Single Sign-On (SSO) Permission Set resource

> **NOTE:** Creating this resource will automatically [Provision the Permission Set](https://docs.aws.amazon.com/singlesignon/latest/APIReference/API_ProvisionPermissionSet.html) to apply the corresponding updates to all assigned accounts.


## Import

SSO Managed Policy Attachments can be imported using the `name`, `path`, `permission_set_arn`, and `instance_arn` separated by a comma (`,`) e.g.,

```sh
 $ pulumi import aws:ssoadmin/customerManagedPolicyAttachment:CustomerManagedPolicyAttachment example TestPolicy,/,arn:aws:sso:::permissionSet/ssoins-2938j0x8920sbj72/ps-80383020jr9302rk,arn:aws:sso:::instance/ssoins-2938j0x8920sbj72
```

 
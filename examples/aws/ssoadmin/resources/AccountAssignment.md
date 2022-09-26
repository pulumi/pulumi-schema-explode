Provides a Single Sign-On (SSO) Account Assignment resource


## Import

SSO Account Assignments can be imported using the `principal_id`, `principal_type`, `target_id`, `target_type`, `permission_set_arn`, `instance_arn` separated by commas (`,`) e.g.,

```sh
 $ pulumi import aws:ssoadmin/accountAssignment:AccountAssignment example f81d4fae-7dec-11d0-a765-00a0c91e6bf6,GROUP,1234567890,AWS_ACCOUNT,arn:aws:sso:::permissionSet/ssoins-0123456789abcdef/ps-0123456789abcdef,arn:aws:sso:::instance/ssoins-0123456789abcdef
```

 
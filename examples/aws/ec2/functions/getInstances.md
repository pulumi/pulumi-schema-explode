Use this data source to get IDs or IPs of Amazon EC2 instances to be referenced elsewhere,
e.g., to allow easier migration from another management solution
or to make it easier for an operator to connect through bastion host(s).

> **Note:** It's strongly discouraged to use this data source for querying ephemeral
instances (e.g., managed via autoscaling group), as the output may change at any time
and you'd need to re-run `apply` every time an instance comes up or dies.

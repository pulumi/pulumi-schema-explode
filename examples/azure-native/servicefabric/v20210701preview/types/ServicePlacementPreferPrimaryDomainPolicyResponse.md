Describes the policy to be used for placement of a Service Fabric service where the service's 
Primary replicas should optimally be placed in a particular domain.

This placement policy is usually used with fault domains in scenarios where the Service Fabric
cluster is geographically distributed in order to indicate that a service's primary replica should
be located in a particular fault domain, which in geo-distributed scenarios usually aligns with regional
or datacenter boundaries. Note that since this is an optimization it is possible that the Primary replica
may not end up located in this domain due to failures, capacity limits, or other constraints.

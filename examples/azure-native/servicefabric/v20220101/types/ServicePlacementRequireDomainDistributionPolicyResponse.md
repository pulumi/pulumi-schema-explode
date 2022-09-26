Describes the policy to be used for placement of a Service Fabric service where two replicas
from the same partition should never be placed in the same fault or upgrade domain.

While this is not common it can expose the service to an increased risk of concurrent failures
due to unplanned outages or other cases of subsequent/concurrent failures. As an example, consider
a case where replicas are deployed across different data center, with one replica per location.
In the event that one of the datacenters goes offline, normally the replica that was placed in that
datacenter will be packed into one of the remaining datacenters. If this is not desirable then this
policy should be set.

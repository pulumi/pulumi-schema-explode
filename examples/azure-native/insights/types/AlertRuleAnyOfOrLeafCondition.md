An Activity Log Alert rule condition that is met when all its member conditions are met.
Each condition can be of one of the following types:
__Important__: Each type has its unique subset of properties. Properties from different types CANNOT exist in one condition.
   * __Leaf Condition -__ must contain 'field' and either 'equals' or 'containsAny'.
  _Please note, 'anyOf' should __not__ be set in a Leaf Condition._
  * __AnyOf Condition -__ must contain __only__ 'anyOf' (which is an array of Leaf Conditions).
  _Please note, 'field', 'equals' and 'containsAny' should __not__ be set in an AnyOf Condition._

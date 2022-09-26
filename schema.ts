/**
 * Enum Type Definition
 */
export interface ComplexTypeSpecEnum {
  /**
   * The description of the type, if any. Interpreted as Markdown.
   */
  description?: string;
  /**
   * The list of possible values for the enum
   */
  enum: EnumValueDefinition[];
  /**
   * Indicates that the implementation of the type should not be generated from the schema, and is instead provided out-of-band by the package author
   */
  isOverlay?: boolean;
  /**
   * Additional language-specific data about the type.
   */
  language?: any;
  /**
   * The underlying primitive type of the enum
   */
  type: PrimitiveTypeEnum;
}

/**
 * Enum Type Definition
 */
export interface ComplexTypeSpecEnumArgs {
  /**
   * The description of the type, if any. Interpreted as Markdown.
   */
  description?: string;
  /**
   * The list of possible values for the enum
   */
  enum: EnumValueDefinitionArgs[];
  /**
   * Indicates that the implementation of the type should not be generated from the schema, and is instead provided out-of-band by the package author
   */
  isOverlay?: boolean;
  /**
   * Additional language-specific data about the type.
   */
  language?: any;
  /**
   * The underlying primitive type of the enum
   */
  type: PrimitiveTypeEnum;
}

/**
 * Complex object Type Details
 */
export interface ComplexTypeSpecObject {
  /**
   * The description of the type, if any. Interpreted as Markdown.
   */
  description?: string;
  /**
   * Indicates that the implementation of the type should not be generated from the schema, and is instead provided out-of-band by the package author
   */
  isOverlay?: boolean;
  /**
   * Additional language-specific data about the type.
   */
  language?: any;
  /**
   * A map from property name to propertySpec that describes the object's properties.
   */
  properties?: {
    [key: string]:
      | PropertySpecPrimitive
      | PropertySpecArray
      | PropertySpecMap
      | PropertySpecNamed
      | PropertySpecUnion;
  };
  /**
   * A list of the names of an object type's required properties. These properties must be set for inputs and will always be set for outputs.
   */
  required?: string[];
}

/**
 * Complex object Type Details
 */
export interface ComplexTypeSpecObjectArgs {
  /**
   * The description of the type, if any. Interpreted as Markdown.
   */
  description?: string;
  /**
   * Indicates that the implementation of the type should not be generated from the schema, and is instead provided out-of-band by the package author
   */
  isOverlay?: boolean;
  /**
   * Additional language-specific data about the type.
   */
  language?: any;
  /**
   * A map from property name to propertySpec that describes the object's properties.
   */
  properties?: {
    [key: string]:
      | PropertySpecPrimitiveArgs
      | PropertySpecArrayArgs
      | PropertySpecMapArgs
      | PropertySpecNamedArgs
      | PropertySpecUnionArgs;
  };
  /**
   * A list of the names of an object type's required properties. These properties must be set for inputs and will always be set for outputs.
   */
  required?: string[];
}

/**
 * The package's configuration variables.
 */
export interface Config {
  /**
   * A list of the names of the package's required configuration variables.
   */
  required?: string[];
  /**
   * A map from variable name to propertySpec that describes a package's configuration variables.
   */
  variables?: {
    [key: string]:
      | PropertySpecPrimitive
      | PropertySpecArray
      | PropertySpecMap
      | PropertySpecNamed
      | PropertySpecUnion;
  };
}

/**
 * The package's configuration variables.
 */
export interface ConfigArgs {
  /**
   * A list of the names of the package's required configuration variables.
   */
  required?: string[];
  /**
   * A map from variable name to propertySpec that describes a package's configuration variables.
   */
  variables?: {
    [key: string]:
      | PropertySpecPrimitiveArgs
      | PropertySpecArrayArgs
      | PropertySpecMapArgs
      | PropertySpecNamedArgs
      | PropertySpecUnionArgs;
  };
}

/**
 * Enum Value Definition
 */
export interface EnumValueDefinition {
  /**
   * Indicates whether the value is deprecated.
   */
  deprecationMessage?: string;
  /**
   * The description of the enum value, if any. Interpreted as Markdown.
   */
  description?: string;
  /**
   * If present, overrides the name of the enum value that would usually be derived from the value.
   */
  name?: string;
  /**
   * The enum value itself
   */
  value: PrimitiveTypeEnum;
}

/**
 * Enum Value Definition
 */
export interface EnumValueDefinitionArgs {
  /**
   * Indicates whether the value is deprecated.
   */
  deprecationMessage?: string;
  /**
   * The description of the enum value, if any. Interpreted as Markdown.
   */
  description?: string;
  /**
   * If present, overrides the name of the enum value that would usually be derived from the value.
   */
  name?: string;
  /**
   * The enum value itself
   */
  value: PrimitiveTypeEnum;
}

/**
 * Function Definition describes a function.
 */
export interface FunctionSpec {
  /**
   * Indicates whether the function is deprecated
   */
  deprecationMessage?: string;
  /**
   * The description of the function, if any. Interpreted as Markdown.
   */
  description?: string;
  /**
   * The bag of input values for the function, if any.
   */
  inputs?: ObjectTypeSpec;
  /**
   * Indicates that the implementation of the function should not be generated from the schema, and is instead provided out-of-band by the package author
   */
  isOverlay?: boolean;
  /**
   * Additional language-specific data about the function.
   */
  language?: any;
  /**
   * The bag of output values for the function, if any.
   */
  outputs?: ObjectTypeSpec;
}

/**
 * Function Definition describes a function.
 */
export interface FunctionSpecArgs {
  /**
   * Indicates whether the function is deprecated
   */
  deprecationMessage?: string;
  /**
   * The description of the function, if any. Interpreted as Markdown.
   */
  description?: string;
  /**
   * The bag of input values for the function, if any.
   */
  inputs?: ObjectTypeSpecArgs;
  /**
   * Indicates that the implementation of the function should not be generated from the schema, and is instead provided out-of-band by the package author
   */
  isOverlay?: boolean;
  /**
   * Additional language-specific data about the function.
   */
  language?: any;
  /**
   * The bag of output values for the function, if any.
   */
  outputs?: ObjectTypeSpecArgs;
}

/**
 * Format metadata about this package.
 */
export interface Meta {
  /**
   * A regex that is used by the importer to extract a module name from the module portion of a type token. Packages that use the module format "namespace1/namespace2/.../namespaceN" do not need to specify a format. The regex must define one capturing group that contains the module name, which must be formatted as "namespace1/namespace2/...namespaceN".
   */
  moduleFormat: string;
}

/**
 * Format metadata about this package.
 */
export interface MetaArgs {
  /**
   * A regex that is used by the importer to extract a module name from the module portion of a type token. Packages that use the module format "namespace1/namespace2/.../namespaceN" do not need to specify a format. The regex must define one capturing group that contains the module name, which must be formatted as "namespace1/namespace2/...namespaceN".
   */
  moduleFormat: string;
}

/**
 * Object Type Details
 */
export interface ObjectTypeSpec {
  /**
   * A map from property name to propertySpec that describes the object's properties.
   */
  properties?: {
    [key: string]:
      | PropertySpecPrimitive
      | PropertySpecArray
      | PropertySpecMap
      | PropertySpecNamed
      | PropertySpecUnion;
  };
  /**
   * A list of the names of an object type's required properties. These properties must be set for inputs and will always be set for outputs.
   */
  required?: string[];
}

/**
 * Object Type Details
 */
export interface ObjectTypeSpecArgs {
  /**
   * A map from property name to propertySpec that describes the object's properties.
   */
  properties?: {
    [key: string]:
      | PropertySpecPrimitiveArgs
      | PropertySpecArrayArgs
      | PropertySpecMapArgs
      | PropertySpecNamedArgs
      | PropertySpecUnionArgs;
  };
  /**
   * A list of the names of an object type's required properties. These properties must be set for inputs and will always be set for outputs.
   */
  required?: string[];
}

/**
 * Array Property Definition describes an object or resource property
 */
export interface PropertySpecArrayArgs {
  /**
   * The constant value for the property, if any. The type of the value must be assignable to the type of the property.
   */
  const?: boolean | number | string;
  /**
   * The default value for the property, if any. The type of the value must be assignable to the type of the property.
   */
  default?: boolean | number | string;
  /**
   * Additional information about the property's default value, if any.
   */
  defaultInfo?: PropertySpecDefaultInfoArgs;
  /**
   * Indicates whether the property is deprecated
   */
  deprecationMessage?: string;
  /**
   * The description of the property, if any. Interpreted as Markdown.
   */
  description?: string;
  /**
   * The element type of the array
   */
  items:
    | PropertySpecPrimitiveArgs
    | PropertySpecArrayArgs
    | PropertySpecMapArgs
    | PropertySpecNamedArgs
    | PropertySpecUnionArgs;
  /**
   * Additional language-specific data about the property.
   */
  language?: any;
  /**
   * Indicates that when used as an input, this type does not accept eventual values.
   */
  plain?: boolean;
  /**
   * Specifies whether a change to the property causes its containing resource to be replaced instead of updated (default false).
   */
  replaceOnChanges?: boolean;
  /**
   * Specifies whether the property is secret (default false).
   */
  secret?: boolean;
  type: "array";
}

/**
 * Array Property Definition describes an object or resource property
 */
export interface PropertySpecArray {
  /**
   * The constant value for the property, if any. The type of the value must be assignable to the type of the property.
   */
  const?: boolean | number | string;
  /**
   * The default value for the property, if any. The type of the value must be assignable to the type of the property.
   */
  default?: boolean | number | string;
  /**
   * Additional information about the property's default value, if any.
   */
  defaultInfo?: PropertySpecDefaultInfo;
  /**
   * Indicates whether the property is deprecated
   */
  deprecationMessage?: string;
  /**
   * The description of the property, if any. Interpreted as Markdown.
   */
  description?: string;
  /**
   * The element type of the array
   */
  items:
    | PropertySpecPrimitive
    | PropertySpecArray
    | PropertySpecMap
    | PropertySpecNamed
    | PropertySpecUnion;
  /**
   * Additional language-specific data about the property.
   */
  language?: any;
  /**
   * Indicates that when used as an input, this type does not accept eventual values.
   */
  plain?: boolean;
  /**
   * Specifies whether a change to the property causes its containing resource to be replaced instead of updated (default false).
   */
  replaceOnChanges?: boolean;
  /**
   * Specifies whether the property is secret (default false).
   */
  secret?: boolean;
  type: "array";
}

/**
 * Additional information about the property's default value, if any.
 */
export interface PropertySpecDefaultInfoArgs {
  /**
   * A set of environment variables to probe for a default value.
   */
  environment: string[];
  /**
   * Additional language-specific data about the default value.
   */
  language?: any;
}

/**
 * Additional information about the property's default value, if any.
 */
export interface PropertySpecDefaultInfo {
  /**
   * A set of environment variables to probe for a default value.
   */
  environment: string[];
  /**
   * Additional language-specific data about the default value.
   */
  language?: any;
}

/**
 * Map Property Definition describes an object or resource property
 */
export interface PropertySpecMap {
  /**
   * The element type of the map. Defaults to "string" when omitted.
   */
  additionalProperties?:
    | PropertySpecPrimitive
    | PropertySpecArray
    | PropertySpecMap
    | PropertySpecNamed
    | PropertySpecUnion;
  /**
   * The constant value for the property, if any. The type of the value must be assignable to the type of the property.
   */
  const?: boolean | number | string;
  /**
   * The default value for the property, if any. The type of the value must be assignable to the type of the property.
   */
  default?: boolean | number | string;
  /**
   * Additional information about the property's default value, if any.
   */
  defaultInfo?: PropertySpecDefaultInfo;
  /**
   * Indicates whether the property is deprecated
   */
  deprecationMessage?: string;
  /**
   * The description of the property, if any. Interpreted as Markdown.
   */
  description?: string;
  /**
   * Additional language-specific data about the property.
   */
  language?: any;
  /**
   * Indicates that when used as an input, this type does not accept eventual values.
   */
  plain?: boolean;
  /**
   * Specifies whether a change to the property causes its containing resource to be replaced instead of updated (default false).
   */
  replaceOnChanges?: boolean;
  /**
   * Specifies whether the property is secret (default false).
   */
  secret?: boolean;
  type: "object";
}

/**
 * Map Property Definition describes an object or resource property
 */
export interface PropertySpecMapArgs {
  /**
   * The element type of the map. Defaults to "string" when omitted.
   */
  additionalProperties?:
    | PropertySpecPrimitiveArgs
    | PropertySpecArrayArgs
    | PropertySpecMapArgs
    | PropertySpecNamedArgs
    | PropertySpecUnionArgs;
  /**
   * The constant value for the property, if any. The type of the value must be assignable to the type of the property.
   */
  const?: boolean | number | string;
  /**
   * The default value for the property, if any. The type of the value must be assignable to the type of the property.
   */
  default?: boolean | number | string;
  /**
   * Additional information about the property's default value, if any.
   */
  defaultInfo?: PropertySpecDefaultInfoArgs;
  /**
   * Indicates whether the property is deprecated
   */
  deprecationMessage?: string;
  /**
   * The description of the property, if any. Interpreted as Markdown.
   */
  description?: string;
  /**
   * Additional language-specific data about the property.
   */
  language?: any;
  /**
   * Indicates that when used as an input, this type does not accept eventual values.
   */
  plain?: boolean;
  /**
   * Specifies whether a change to the property causes its containing resource to be replaced instead of updated (default false).
   */
  replaceOnChanges?: boolean;
  /**
   * Specifies whether the property is secret (default false).
   */
  secret?: boolean;
  type: "object";
}

/**
 * Named Property Definition describes an object or resource property
 */
export interface PropertySpecNamed {
  /**
   * The URI of the referenced type. For example, the built-in Archive, Asset, and Any
   * types are referenced as "pulumi.json#/Archive", "pulumi.json#/Asset", and "pulumi.json#/Any", respectively.
   * A type from this document is referenced as "#/types/pulumi:type:token".
   * A type from another document is referenced as "path#/types/pulumi:type:token", where path is of the form:
   *   "/provider/vX.Y.Z/json" or "pulumi.json" or "http[s]://example.com/provider/vX.Y.Z/json"
   * A resource from this document is referenced as "#/resources/pulumi:type:token".
   * A resource from another document is referenced as "path#/resources/pulumi:type:token", where path is of the form:
   *   "/provider/vX.Y.Z/json" or "pulumi.json" or "http[s]://example.com/provider/vX.Y.Z/json"
   */
  $ref: string;
  /**
   * The constant value for the property, if any. The type of the value must be assignable to the type of the property.
   */
  const?: boolean | number | string;
  /**
   * The default value for the property, if any. The type of the value must be assignable to the type of the property.
   */
  default?: boolean | number | string;
  /**
   * Additional information about the property's default value, if any.
   */
  defaultInfo?: PropertySpecDefaultInfo;
  /**
   * Indicates whether the property is deprecated
   */
  deprecationMessage?: string;
  /**
   * The description of the property, if any. Interpreted as Markdown.
   */
  description?: string;
  /**
   * Additional language-specific data about the property.
   */
  language?: any;
  /**
   * Indicates that when used as an input, this type does not accept eventual values.
   */
  plain?: boolean;
  /**
   * Specifies whether a change to the property causes its containing resource to be replaced instead of updated (default false).
   */
  replaceOnChanges?: boolean;
  /**
   * Specifies whether the property is secret (default false).
   */
  secret?: boolean;
  /**
   * ignored; present for compatibility with existing schemas
   */
  type?: string;
}

/**
 * Named Property Definition describes an object or resource property
 */
export interface PropertySpecNamedArgs {
  /**
   * The URI of the referenced type. For example, the built-in Archive, Asset, and Any
   * types are referenced as "pulumi.json#/Archive", "pulumi.json#/Asset", and "pulumi.json#/Any", respectively.
   * A type from this document is referenced as "#/types/pulumi:type:token".
   * A type from another document is referenced as "path#/types/pulumi:type:token", where path is of the form:
   *   "/provider/vX.Y.Z/json" or "pulumi.json" or "http[s]://example.com/provider/vX.Y.Z/json"
   * A resource from this document is referenced as "#/resources/pulumi:type:token".
   * A resource from another document is referenced as "path#/resources/pulumi:type:token", where path is of the form:
   *   "/provider/vX.Y.Z/json" or "pulumi.json" or "http[s]://example.com/provider/vX.Y.Z/json"
   */
  $ref: string;
  /**
   * The constant value for the property, if any. The type of the value must be assignable to the type of the property.
   */
  const?: boolean | number | string;
  /**
   * The default value for the property, if any. The type of the value must be assignable to the type of the property.
   */
  default?: boolean | number | string;
  /**
   * Additional information about the property's default value, if any.
   */
  defaultInfo?: PropertySpecDefaultInfoArgs;
  /**
   * Indicates whether the property is deprecated
   */
  deprecationMessage?: string;
  /**
   * The description of the property, if any. Interpreted as Markdown.
   */
  description?: string;
  /**
   * Additional language-specific data about the property.
   */
  language?: any;
  /**
   * Indicates that when used as an input, this type does not accept eventual values.
   */
  plain?: boolean;
  /**
   * Specifies whether a change to the property causes its containing resource to be replaced instead of updated (default false).
   */
  replaceOnChanges?: boolean;
  /**
   * Specifies whether the property is secret (default false).
   */
  secret?: boolean;
  /**
   * ignored; present for compatibility with existing schemas
   */
  type?: string;
}

/**
 * Primitive Property Definition describes an object or resource property
 */
export interface PropertySpecPrimitiveArgs {
  /**
   * The constant value for the property, if any. The type of the value must be assignable to the type of the property.
   */
  const?: boolean | number | string;
  /**
   * The default value for the property, if any. The type of the value must be assignable to the type of the property.
   */
  default?: boolean | number | string;
  /**
   * Additional information about the property's default value, if any.
   */
  defaultInfo?: PropertySpecDefaultInfoArgs;
  /**
   * Indicates whether the property is deprecated
   */
  deprecationMessage?: string;
  /**
   * The description of the property, if any. Interpreted as Markdown.
   */
  description?: string;
  /**
   * Additional language-specific data about the property.
   */
  language?: any;
  /**
   * Indicates that when used as an input, this type does not accept eventual values.
   */
  plain?: boolean;
  /**
   * Specifies whether a change to the property causes its containing resource to be replaced instead of updated (default false).
   */
  replaceOnChanges?: boolean;
  /**
   * Specifies whether the property is secret (default false).
   */
  secret?: boolean;
  /**
   * The primitive type, if any
   */
  type: PrimitiveTypeEnum;
}

/**
 * Primitive Property Definition describes an object or resource property
 */
export interface PropertySpecPrimitive {
  /**
   * The constant value for the property, if any. The type of the value must be assignable to the type of the property.
   */
  const?: boolean | number | string;
  /**
   * The default value for the property, if any. The type of the value must be assignable to the type of the property.
   */
  default?: boolean | number | string;
  /**
   * Additional information about the property's default value, if any.
   */
  defaultInfo?: PropertySpecDefaultInfo;
  /**
   * Indicates whether the property is deprecated
   */
  deprecationMessage?: string;
  /**
   * The description of the property, if any. Interpreted as Markdown.
   */
  description?: string;
  /**
   * Additional language-specific data about the property.
   */
  language?: any;
  /**
   * Indicates that when used as an input, this type does not accept eventual values.
   */
  plain?: boolean;
  /**
   * Specifies whether a change to the property causes its containing resource to be replaced instead of updated (default false).
   */
  replaceOnChanges?: boolean;
  /**
   * Specifies whether the property is secret (default false).
   */
  secret?: boolean;
  /**
   * The primitive type, if any
   */
  type: PrimitiveTypeEnum;
}

/**
 * Union Property Definition describes an object or resource property
 */
export interface PropertySpecUnion {
  /**
   * The constant value for the property, if any. The type of the value must be assignable to the type of the property.
   */
  const?: boolean | number | string;
  /**
   * The default value for the property, if any. The type of the value must be assignable to the type of the property.
   */
  default?: boolean | number | string;
  /**
   * Additional information about the property's default value, if any.
   */
  defaultInfo?: PropertySpecUnionDefaultInfo;
  /**
   * Indicates whether the property is deprecated
   */
  deprecationMessage?: string;
  /**
   * The description of the property, if any. Interpreted as Markdown.
   */
  description?: string;
  /**
   * Informs the consumer of an alternative schema based on the value associated with it
   */
  discriminator?: PropertySpecUnionDiscriminator;
  /**
   * Additional language-specific data about the property.
   */
  language?: any;
  /**
   * If present, indicates that values of the type may be one of any of the listed types
   */
  oneOf: (
    | PropertySpecPrimitive
    | PropertySpecArray
    | PropertySpecMap
    | PropertySpecNamed
    | PropertySpecUnion
  )[];
  /**
   * Indicates that when used as an input, this type does not accept eventual values.
   */
  plain?: boolean;
  /**
   * Specifies whether a change to the property causes its containing resource to be replaced instead of updated (default false).
   */
  replaceOnChanges?: boolean;
  /**
   * Specifies whether the property is secret (default false).
   */
  secret?: boolean;
  /**
   * The underlying primitive type of the union, if any
   */
  type?: PrimitiveTypeEnum;
}

/**
 * Union Property Definition describes an object or resource property
 */
export interface PropertySpecUnionArgs {
  /**
   * The constant value for the property, if any. The type of the value must be assignable to the type of the property.
   */
  const?: boolean | number | string;
  /**
   * The default value for the property, if any. The type of the value must be assignable to the type of the property.
   */
  default?: boolean | number | string;
  /**
   * Additional information about the property's default value, if any.
   */
  defaultInfo?: PropertySpecUnionDefaultInfoArgs;
  /**
   * Indicates whether the property is deprecated
   */
  deprecationMessage?: string;
  /**
   * The description of the property, if any. Interpreted as Markdown.
   */
  description?: string;
  /**
   * Informs the consumer of an alternative schema based on the value associated with it
   */
  discriminator?: PropertySpecUnionDiscriminatorArgs;
  /**
   * Additional language-specific data about the property.
   */
  language?: any;
  /**
   * If present, indicates that values of the type may be one of any of the listed types
   */
  oneOf: (
    | PropertySpecPrimitiveArgs
    | PropertySpecArrayArgs
    | PropertySpecMapArgs
    | PropertySpecNamedArgs
    | PropertySpecUnionArgs
  )[];
  /**
   * Indicates that when used as an input, this type does not accept eventual values.
   */
  plain?: boolean;
  /**
   * Specifies whether a change to the property causes its containing resource to be replaced instead of updated (default false).
   */
  replaceOnChanges?: boolean;
  /**
   * Specifies whether the property is secret (default false).
   */
  secret?: boolean;
  /**
   * The underlying primitive type of the union, if any
   */
  type?: PrimitiveTypeEnum;
}

/**
 * Additional information about the property's default value, if any.
 */
export interface PropertySpecUnionDefaultInfo {
  /**
   * A set of environment variables to probe for a default value.
   */
  environment: string[];
  /**
   * Additional language-specific data about the default value.
   */
  language?: any;
}

/**
 * Additional information about the property's default value, if any.
 */
export interface PropertySpecUnionDefaultInfoArgs {
  /**
   * A set of environment variables to probe for a default value.
   */
  environment: string[];
  /**
   * Additional language-specific data about the default value.
   */
  language?: any;
}

/**
 * Informs the consumer of an alternative schema based on the value associated with it
 */
export interface PropertySpecUnionDiscriminator {
  /**
   * an optional object to hold mappings between payload values and schema names or references
   */
  mapping?: { [key: string]: string };
  /**
   * PropertyName is the name of the property in the payload that will hold the discriminator value
   */
  propertyName: string;
}

/**
 * Informs the consumer of an alternative schema based on the value associated with it
 */
export interface PropertySpecUnionDiscriminatorArgs {
  /**
   * an optional object to hold mappings between payload values and schema names or references
   */
  mapping?: { [key: string]: string };
  /**
   * PropertyName is the name of the property in the payload that will hold the discriminator value
   */
  propertyName: string;
}

/**
 * An alias for a resource
 */
export interface ResourceAliasArgs {
  /**
   * The name portion of the alias, if any
   */
  name?: string;
  /**
   * The project portion of the alias, if any
   */
  project?: string;
  /**
   * The type portion of the alias, if any
   */
  type?: string;
}

/**
 * An alias for a resource
 */
export interface ResourceAlias {
  /**
   * The name portion of the alias, if any
   */
  name?: string;
  /**
   * The project portion of the alias, if any
   */
  project?: string;
  /**
   * The type portion of the alias, if any
   */
  type?: string;
}

/**
 * Resource Definition describes a resource or component.
 */
export interface ResourceSpec {
  /**
   * The list of aliases for the resource.
   */
  aliases?: ResourceAlias[];
  /**
   * Indicates whether the resource is deprecated
   */
  deprecationMessage?: string;
  /**
   * The description of the resource, if any. Interpreted as Markdown.
   */
  description?: string;
  /**
   * A map from property name to propertySpec that describes the resource's input properties.
   */
  inputProperties?: {
    [key: string]:
      | PropertySpecPrimitive
      | PropertySpecArray
      | PropertySpecMap
      | PropertySpecNamed
      | PropertySpecUnion;
  };
  /**
   * Indicates whether the resource is a component.
   */
  isComponent?: boolean;
  /**
   * Indicates that the implementation of the resource should not be generated from the schema, and is instead provided out-of-band by the package author
   */
  isOverlay?: boolean;
  /**
   * A map from method name to function token that describes the resource's method set.
   */
  methods?: { [key: string]: string };
  /**
   * A map from property name to propertySpec that describes the object's properties.
   */
  properties?: {
    [key: string]:
      | PropertySpecPrimitive
      | PropertySpecArray
      | PropertySpecMap
      | PropertySpecNamed
      | PropertySpecUnion;
  };
  /**
   * A list of the names of an object type's required properties. These properties must be set for inputs and will always be set for outputs.
   */
  required?: string[];
  /**
   * A list of the names of the resource's required input properties.
   */
  requiredInputs?: string[];
  /**
   * An optional objectTypeSpec that describes additional inputs that mau be necessary to get an existing resource. If this is unset, only an ID is necessary.
   */
  stateInputs?: ObjectTypeSpec;
}

/**
 * Resource Definition describes a resource or component.
 */
export interface ResourceSpecArgs {
  /**
   * The list of aliases for the resource.
   */
  aliases?: ResourceAliasArgs[];
  /**
   * Indicates whether the resource is deprecated
   */
  deprecationMessage?: string;
  /**
   * The description of the resource, if any. Interpreted as Markdown.
   */
  description?: string;
  /**
   * A map from property name to propertySpec that describes the resource's input properties.
   */
  inputProperties?: {
    [key: string]:
      | PropertySpecPrimitiveArgs
      | PropertySpecArrayArgs
      | PropertySpecMapArgs
      | PropertySpecNamedArgs
      | PropertySpecUnionArgs;
  };
  /**
   * Indicates whether the resource is a component.
   */
  isComponent?: boolean;
  /**
   * Indicates that the implementation of the resource should not be generated from the schema, and is instead provided out-of-band by the package author
   */
  isOverlay?: boolean;
  /**
   * A map from method name to function token that describes the resource's method set.
   */
  methods?: { [key: string]: string };
  /**
   * A map from property name to propertySpec that describes the object's properties.
   */
  properties?: {
    [key: string]:
      | PropertySpecPrimitiveArgs
      | PropertySpecArrayArgs
      | PropertySpecMapArgs
      | PropertySpecNamedArgs
      | PropertySpecUnionArgs;
  };
  /**
   * A list of the names of an object type's required properties. These properties must be set for inputs and will always be set for outputs.
   */
  required?: string[];
  /**
   * A list of the names of the resource's required input properties.
   */
  requiredInputs?: string[];
  /**
   * An optional objectTypeSpec that describes additional inputs that mau be necessary to get an existing resource. If this is unset, only an ID is necessary.
   */
  stateInputs?: ObjectTypeSpecArgs;
}

/**
 * A description of the schema for a Pulumi Package
 */
export interface SchemaArgs {
  /**
   * Freeform text attribution of derived work, if required.
   */
  attribution?: string;
  /**
   * The package's configuration variables.
   */
  config?: ConfigArgs;
  /**
   * The description of the package. Descriptions are interpreted as Markdown.
   */
  description?: string;
  /**
   * The human-friendly name of the package.
   */
  displayName?: string;
  /**
   * A map from token to functionSpec that describes the set of functions defined by this package.
   */
  functions?: {
    [key: string]: FunctionSpecArgs;
  };
  /**
   * The package's homepage.
   */
  homepage?: string;
  /**
   * The list of keywords that are associated with the package, if any.
   */
  keywords?: string[];
  /**
   * Additional language-specific data about the package.
   */
  language?: any;
  /**
   * The name of the license used for the package's contents.
   */
  license?: string;
  /**
   * The URL of the package's logo, if any.
   */
  logoUrl?: string;
  /**
   * Format metadata about this package.
   */
  meta?: MetaArgs;
  /**
   * The unqualified name of the package (e.g. "aws", "azure", "gcp", "kubernetes", "random")
   */
  name: string;
  /**
   * The URL to use when downloading the provider plugin binary.
   */
  pluginDownloadUrl?: string;
  /**
   * The provider type for this package.
   */
  provider?: ResourceSpecArgs;
  /**
   * The name of the person or organization that authored and published the package.
   */
  publisher?: string;
  /**
   * The URL at which the package's sources can be found.
   */
  repository?: string;
  /**
   * A map from type token to resourceSpec that describes the set of resources and components defined by this package.
   */
  resources?: {
    [key: string]: ResourceSpecArgs;
  };
  /**
   * A map from type token to complexTypeSpec that describes the set of complex types (i.e. object, enum) defined by this package.
   */
  types?: {
    [key: string]: ComplexTypeSpecObjectArgs | ComplexTypeSpecEnumArgs;
  };
  /**
   * The version of the package. The version must be valid semver.
   */
  version?: string;
}

/**
 * A description of the schema for a Pulumi Package
 */
export interface Schema {
  /**
   * Freeform text attribution of derived work, if required.
   */
  attribution?: string;
  /**
   * The package's configuration variables.
   */
  config?: Config;
  /**
   * The description of the package. Descriptions are interpreted as Markdown.
   */
  description?: string;
  /**
   * The human-friendly name of the package.
   */
  displayName?: string;
  /**
   * A map from token to functionSpec that describes the set of functions defined by this package.
   */
  functions?: { [key: string]: FunctionSpec };
  /**
   * The package's homepage.
   */
  homepage?: string;
  /**
   * The list of keywords that are associated with the package, if any.
   */
  keywords?: string[];
  /**
   * Additional language-specific data about the package.
   */
  language?: any;
  /**
   * The name of the license used for the package's contents.
   */
  license?: string;
  /**
   * The URL of the package's logo, if any.
   */
  logoUrl?: string;
  /**
   * Format metadata about this package.
   */
  meta?: Meta;
  /**
   * The unqualified name of the package (e.g. "aws", "azure", "gcp", "kubernetes", "random")
   */
  name: string;
  /**
   * The URL to use when downloading the provider plugin binary.
   */
  pluginDownloadUrl?: string;
  /**
   * The provider type for this package.
   */
  provider?: ResourceSpec;
  /**
   * The name of the person or organization that authored and published the package.
   */
  publisher?: string;
  /**
   * The URL at which the package's sources can be found.
   */
  repository?: string;
  /**
   * A map from type token to resourceSpec that describes the set of resources and components defined by this package.
   */
  resources?: { [key: string]: ResourceSpec };
  /**
   * A map from type token to complexTypeSpec that describes the set of complex types (i.e. object, enum) defined by this package.
   */
  types?: {
    [key: string]: ComplexTypeSpecObject | ComplexTypeSpecEnum;
  };
  /**
   * The version of the package. The version must be valid semver.
   */
  version?: string;
}

export const PrimitiveTypeEnum = {
  Boolean: "boolean",
  Integer: "integer",
  Number: "number",
  String: "string",
} as const;

/**
 * Enum containing possible primitive types
 */
export type PrimitiveTypeEnum =
  typeof PrimitiveTypeEnum[keyof typeof PrimitiveTypeEnum];

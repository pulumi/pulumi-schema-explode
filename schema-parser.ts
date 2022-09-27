import z from "zod";

export const PrimitiveTypeEnum = z.union([
  z.literal("boolean"),
  z.literal("integer"),
  z.literal("number"),
  z.literal("string"),
]);

/**
 * Enum containing possible primitive types
 */
export type PrimitiveTypeEnum =
  typeof PrimitiveTypeEnum[keyof typeof PrimitiveTypeEnum];

export const EnumValueDefinition = z.object({
  deprecationMessage: z.string().optional(),
  description: z.string().optional(),
  name: z.string().optional(),
  value: PrimitiveTypeEnum,
});

/**
 * Enum Value Definition
 */
export type EnumValueDefinition = z.TypeOf<typeof EnumValueDefinition>;

export const ComplexTypeSpecEnum = z.object({
  description: z.optional(
    z.string({
      description:
        "The description of the type, if any. Interpreted as Markdown.",
    })
  ),
  enum: z.array(EnumValueDefinition),
  isOverlay: z.optional(z.boolean()),
  language: z.optional(z.boolean()),
  type: z.optional(PrimitiveTypeEnum),
});

/**
 * Enum Type Definition
 */
export type ComplexTypeSpecEnum = z.TypeOf<typeof ComplexTypeSpecEnum>;

export const EnumValueDefinitionArgs = z.object({
  deprecationMessage: z.string().optional(),
  description: z.string().optional(),
  name: z.string().optional(),
  value: PrimitiveTypeEnum,
});

/**
 * Enum Value Definition
 */
export type EnumValueDefinitionArgs = z.TypeOf<typeof EnumValueDefinitionArgs>;

export const PropertySpecDefaultInfo = z.object({
  environment: z.string().array(),
  language: z.any().optional(),
});

/**
 * Additional information about the property's default value, if any.
 */
export type PropertySpecDefaultInfo = z.TypeOf<typeof PropertySpecDefaultInfo>;

export const PropertySpecArray: z.ZodType<PropertySpecArray> = z.lazy(() =>
  z.object({
    const: z.union([z.boolean(), z.number(), z.string()]).optional(),
    default: z.union([z.boolean(), z.number(), z.string()]).optional(),
    defaultInfo: z.optional(PropertySpecDefaultInfo),
    deprecationMessage: z.string().optional(),
    description: z.string().optional(),
    items: z.union([
      PropertySpecPrimitive,
      PropertySpecArray,
      PropertySpecMap,
      PropertySpecNamed,
      PropertySpecUnion,
    ]),
    language: z.any().optional(),
    plain: z.boolean().optional(),
    replaceOnChanges: z.boolean().optional(),
    secret: z.boolean().optional(),
    type: z.literal("array"),
  })
);

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

export const PropertySpecMap: z.ZodType<PropertySpecMap> = z.lazy(() =>
  z.object({
    additionalProperties: z
      .union([
        PropertySpecPrimitive,
        PropertySpecArray,
        PropertySpecMap,
        PropertySpecNamed,
        PropertySpecUnion,
      ])
      .optional(),
    const: z.union([z.boolean(), z.number(), z.string()]).optional(),
    default: z.union([z.boolean(), z.number(), z.string()]).optional(),
    defaultInfo: PropertySpecDefaultInfo.optional(),
    deprecationMessage: z.string().optional(),
    description: z.string().optional(),
    language: z.any().optional(),
    plain: z.boolean().optional(),
    replaceOnChanges: z.boolean().optional(),
    secret: z.boolean().optional(),
    type: z.literal("object"),
  })
);

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

export const PropertySpecUnionDiscriminator = z.object({
  mapping: z.record(z.string(), z.string()).optional(),
  propertyName: z.string(),
});

/**
 * Informs the consumer of an alternative schema based on the value associated with it
 */
export type PropertySpecUnionDiscriminator = z.TypeOf<
  typeof PropertySpecUnionDiscriminator
>;

export const PropertySpecNamed = z.object({
  $ref: z.string(),
  const: z.union([z.boolean(), z.number(), z.string()]).optional(),
  default: z.union([z.boolean(), z.number(), z.string()]).optional(),
  defaultInfo: PropertySpecDefaultInfo.optional(),
  deprecationMessage: z.string().optional(),
  description: z.string().optional(),
  language: z.any().optional(),
  plain: z.boolean().optional(),
  replaceOnChanges: z.boolean().optional(),
  secret: z.boolean().optional(),
  type: z.string().optional(),
});

/**
 * Named Property Definition describes an object or resource property
 */
export type PropertySpecNamed = z.TypeOf<typeof PropertySpecNamed>;

export const PropertySpecPrimitive = z.object({
  const: z.union([z.boolean(), z.number(), z.string()]).optional(),
  default: z.union([z.boolean(), z.number(), z.string()]).optional(),
  defaultInfo: z.optional(PropertySpecDefaultInfo),
  deprecationMessage: z.string().optional(),
  description: z.string().optional(),
  language: z.any().optional(),
  plain: z.boolean().optional(),
  replaceOnChanges: z.boolean().optional(),
  secret: z.boolean().optional(),
  type: PrimitiveTypeEnum,
});

/**
 * Primitive Property Definition describes an object or resource property
 */
export type PropertySpecPrimitive = z.TypeOf<typeof PropertySpecPrimitive>;

export const PropertySpecUnionDefaultInfo = z.object({
  environment: z.string().array(),
  language: z.any().optional(),
});

/**
 * Additional information about the property's default value, if any.
 */
export type PropertySpecUnionDefaultInfo = z.TypeOf<
  typeof PropertySpecUnionDefaultInfo
>;

export const PropertySpecUnion: z.ZodType<PropertySpecUnion> = z.lazy(() =>
  z.object({
    const: z.union([z.boolean(), z.number(), z.string()]).optional(),
    default: z.union([z.boolean(), z.number(), z.string()]).optional(),
    defaultInfo: z.optional(PropertySpecUnionDefaultInfo),
    deprecationMessage: z.string().optional(),
    description: z.string().optional(),
    discriminator: PropertySpecUnionDiscriminator.optional(),
    language: z.any().optional(),
    oneOf: z
      .union([
        PropertySpecPrimitive,
        PropertySpecArray,
        PropertySpecMap,
        PropertySpecNamed,
        PropertySpecUnion,
      ])
      .array(),
    plain: z.boolean().optional(),
    replaceOnChanges: z.boolean().optional(),
    secret: z.boolean().optional(),
    type: PrimitiveTypeEnum,
  })
);

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

export const ObjectTypeSpec = z.object({
  properties: z
    .record(
      z.string(),
      z.union([
        PropertySpecPrimitive,
        PropertySpecArray,
        PropertySpecMap,
        PropertySpecNamed,
        PropertySpecUnion,
      ]),
      {
        description:
          "A map from property name to propertySpec that describes the object's properties.",
      }
    )
    .optional(),
  required: z
    .array(z.string(), {
      description:
        "A list of the names of an object type's required properties. These properties must be set for inputs and will always be set for outputs.",
    })
    .optional(),
});

/**
 * Object Type Details
 */
export type ObjectTypeSpec = z.TypeOf<typeof ObjectTypeSpec>;

export const ComplexTypeSpecObject = z.object({
  description: z
    .string({
      description:
        "The description of the type, if any. Interpreted as Markdown.",
    })
    .optional(),
  isOverlay: z
    .boolean({
      description:
        "Indicates that the implementation of the type should not be generated from the schema, and is instead provided out-of-band by the package author",
    })
    .optional(),
  language: z
    .any({ description: "Additional language-specific data about the type." })
    .optional(),
  properties: z
    .record(
      z.string(),
      z.union([
        PropertySpecPrimitive,
        PropertySpecArray,
        PropertySpecMap,
        PropertySpecNamed,
        PropertySpecUnion,
      ]),
      {
        description:
          "A map from property name to propertySpec that describes the object's properties.",
      }
    )
    .optional(),
  required: z
    .array(z.string(), {
      description:
        "A list of the names of an object type's required properties. These properties must be set for inputs and will always be set for outputs.",
    })
    .optional(),
});

/**
 * Complex object Type Details
 */
export type ComplexTypeSpecObject = z.TypeOf<typeof ComplexTypeSpecObject>;

export const ResourceAlias = z.object({
  name: z.string().optional(),
  project: z.string().optional(),
  type: z.string().optional(),
});

/**
 * An alias for a resource
 */
export type ResourceAlias = z.TypeOf<typeof ResourceAlias>;

export const ResourceSpec = z.object({
  aliases: z
    .array(ResourceAlias, {
      description: "The list of aliases for the resource.",
    })
    .optional(),
  deprecationMessage: z
    .string({ description: "Indicates whether the resource is deprecated" })
    .optional(),
  description: z
    .string({
      description:
        "The description of the resource, if any. Interpreted as Markdown.",
    })
    .optional(),
  inputProperties: z
    .record(
      z.string(),
      z.union([
        PropertySpecPrimitive,
        PropertySpecArray,
        PropertySpecMap,
        PropertySpecNamed,
        PropertySpecUnion,
      ]),
      {
        description:
          "A map from property name to propertySpec that describes the resource's input properties.",
      }
    )
    .optional(),
  isComponent: z
    .boolean({ description: "Indicates whether the resource is a component." })
    .optional(),
  isOverlay: z
    .boolean({
      description:
        "Indicates that the implementation of the resource should not be generated from the schema, and is instead provided out-of-band by the package author",
    })
    .optional(),
  methods: z
    .record(z.string(), z.string(), {
      description:
        "A map from method name to function token that describes the resource's method set.",
    })
    .optional(),
  properties: z
    .record(
      z.string(),
      z.union([
        PropertySpecPrimitive,
        PropertySpecArray,
        PropertySpecMap,
        PropertySpecNamed,
        PropertySpecUnion,
      ]),
      {
        description:
          "A map from property name to propertySpec that describes the object's properties.",
      }
    )
    .optional(),
  required: z
    .array(z.string(), {
      description:
        "A list of the names of an object type's required properties. These properties must be set for inputs and will always be set for outputs.",
    })
    .optional(),
  requiredInputs: z
    .array(z.string(), {
      description:
        "A list of the names of the resource's required input properties.",
    })
    .optional(),
  stateInputs: ObjectTypeSpec.describe(
    "An optional objectTypeSpec that describes additional inputs that mau be necessary to get an existing resource. If this is unset, only an ID is necessary."
  ).optional(),
});

/**
 * Resource Definition describes a resource or component.
 */
export type ResourceSpec = z.TypeOf<typeof ResourceSpec>;

export const FunctionSpec = z.object({
  deprecationMessage: z
    .string({ description: "Indicates whether the function is deprecated" })
    .optional(),
  description: z
    .string({
      description:
        "The description of the function, if any. Interpreted as Markdown.",
    })
    .optional(),
  inputs: ObjectTypeSpec.describe(
    "The bag of input values for the function, if any."
  ).optional(),
  isOverlay: z
    .boolean({
      description:
        "Indicates that the implementation of the function should not be generated from the schema, and is instead provided out-of-band by the package author",
    })
    .optional(),
  language: z
    .any({
      description: "Additional language-specific data about the function.",
    })
    .optional(),
  outputs: ObjectTypeSpec.describe(
    "The bag of output values for the function, if any."
  ).optional(),
});

/**
 * Function Definition describes a function.
 */
export type FunctionSpec = z.TypeOf<typeof FunctionSpec>;

export const Config = z.object({
  required: z
    .array(z.string(), {
      description:
        "A list of the names of the package's required configuration variables.",
    })
    .optional(),
  variables: z
    .record(
      z.string(),
      z.union([
        PropertySpecPrimitive,
        PropertySpecArray,
        PropertySpecMap,
        PropertySpecNamed,
        PropertySpecUnion,
      ]),
      {
        description:
          "A map from variable name to propertySpec that describes a package's configuration variables.",
      }
    )
    .optional(),
});
/**
 * The package's configuration variables.
 */
export type Config = z.TypeOf<typeof Config>;

export const Meta = z.object({
  moduleFormat: z.string({
    description: `A regex that is used by the importer to extract a module name from the module portion of a type token. Packages that use the module format "namespace1/namespace2/.../namespaceN" do not need to specify a format. The regex must define one capturing group that contains the module name, which must be formatted as "namespace1/namespace2/...namespaceN".`,
  }),
});

/**
 * Format metadata about this package.
 */
export type Meta = z.TypeOf<typeof Meta>;

export const Schema = z.object({
  attribution: z
    .string({
      description: "Freeform text attribution of derived work, if required.",
    })
    .optional(),
  config: Config.describe("The package's configuration variables.").optional(),
  description: z
    .string({
      description:
        "The description of the package. Descriptions are interpreted as Markdown.",
    })
    .optional(),
  displayName: z
    .string({ description: "The human-friendly name of the package." })
    .optional(),
  functions: z
    .record(z.string(), FunctionSpec, {
      description:
        "A map from token to functionSpec that describes the set of functions defined by this package.",
    })
    .optional(),
  homepage: z.string({ description: "The package's homepage." }).optional(),
  keywords: z
    .array(z.string(), {
      description:
        "The list of keywords that are associated with the package, if any.",
    })
    .optional(),
  language: z
    .any({
      description: "Additional language-specific data about the package.",
    })
    .optional(),
  license: z
    .string({
      description: "The name of the license used for the package's contents.",
    })
    .optional(),
  logoUrl: z
    .string({
      description: "The URL of the package's logo, if any.",
    })
    .optional(),
  meta: Meta.describe("Format metadata about this package.").optional(),
  name: z.string({
    description: `The unqualified name of the package (e.g. "aws", "azure", "gcp", "kubernetes", "random")`,
  }),
  pluginDownloadUrl: z
    .string({
      description:
        "The URL to use when downloading the provider plugin binary.",
    })
    .optional(),
  provider: ResourceSpec.describe(
    "The provider type for this package."
  ).optional(),
  publisher: z
    .string({
      description:
        "The name of the person or organization that authored and published the package.",
    })
    .optional(),
  repository: z
    .string({
      description: "The URL at which the package's sources can be found.",
    })
    .optional(),
  resources: z
    .record(z.string(), ResourceSpec, {
      description:
        "A map from type token to resourceSpec that describes the set of resources and components defined by this package.",
    })
    .optional(),
  types: z
    .record(z.string(), z.union([ComplexTypeSpecObject, ComplexTypeSpecEnum]), {
      description:
        "A map from type token to complexTypeSpec that describes the set of complex types (i.e. object, enum) defined by this package.",
    })
    .optional(),
  version: z
    .string({
      description:
        "The version of the package. The version must be valid semver.",
    })
    .optional(),
});

/**
 * A description of the schema for a Pulumi Package
 */
export type Schema = z.TypeOf<typeof Schema>;

import * as types from "./schema-types";

const PropertySpecPrimitiveA = (
  a: types.PropertySpecPrimitive
): PropertySpecPrimitive => a;
const PropertySpecPrimitiveB = (
  a: PropertySpecPrimitive
): types.PropertySpecPrimitive => a;

const PropertySpecDefaultInfoA = (
  a: types.PropertySpecDefaultInfo
): PropertySpecDefaultInfo => a;
const PropertySpecDefaultInfoB = (
  a: PropertySpecDefaultInfo
): types.PropertySpecDefaultInfo => a;

const PropertySpecNamedA = (a: types.PropertySpecNamed): PropertySpecNamed => a;
const PropertySpecNamedB = (a: PropertySpecNamed): types.PropertySpecNamed => a;

// **Seems like comparison of equivalent recursive types might always fail**

// const schemaA = (a: types.Schema): Schema => a;
// const schemaB = (a: Schema): types.Schema => a;

// const configA = (a: types.Config): Config => a;
// const configB = (a: Config): types.Config => a;

// const resourceSpecA = (a: types.ResourceSpec): ResourceSpec => a;
// const resourceSpecB = (a: ResourceSpec): types.ResourceSpec => a;

// const PropertySpecArrayA = (a: types.PropertySpecArray): PropertySpecArray => a;
// const PropertySpecArrayB = (a: PropertySpecArray): types.PropertySpecArray => a;

// const PropertySpecMapA = (a: types.PropertySpecMap): PropertySpecMap => a;
// const PropertySpecMapB = (a: PropertySpecMap): types.PropertySpecMap => a;

// const PropertySpecUnionA = (a: types.PropertySpecUnion): PropertySpecUnion => a;
// const PropertySpecUnionB = (a: PropertySpecUnion): types.PropertySpecUnion => a;

// const ObjectTypeSpecA = (a: types.ObjectTypeSpec): ObjectTypeSpec => a;
// const ObjectTypeSpecB = (a: ObjectTypeSpec): types.ObjectTypeSpec => a;

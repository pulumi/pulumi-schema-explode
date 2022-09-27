import z from "zod";
import * as types from "./schema-types";

export const PrimitiveTypeEnum = z.enum([
  "boolean",
  "integer",
  "number",
  "string",
]);

/**
 * Enum containing possible primitive types
 */
export type PrimitiveTypeEnum = z.infer<typeof PrimitiveTypeEnum>;

export const EnumValueDefinition = z.object({
  deprecationMessage: z.string().optional(),
  description: z.string().optional(),
  name: z.string().optional(),
  value: PrimitiveTypeEnum,
});

/**
 * Enum Value Definition
 */
export type EnumValueDefinition = z.infer<typeof EnumValueDefinition>;

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
  type: PrimitiveTypeEnum,
});

/**
 * Enum Type Definition
 */
export type ComplexTypeSpecEnum = z.infer<typeof ComplexTypeSpecEnum>;

export const EnumValueDefinitionArgs = z.object({
  deprecationMessage: z.string().optional(),
  description: z.string().optional(),
  name: z.string().optional(),
  value: PrimitiveTypeEnum,
});

/**
 * Enum Value Definition
 */
export type EnumValueDefinitionArgs = z.infer<typeof EnumValueDefinitionArgs>;

export const PropertySpecDefaultInfo = z.object({
  environment: z.string().array(),
  language: z.any().optional(),
});

/**
 * Additional information about the property's default value, if any.
 */
export type PropertySpecDefaultInfo = z.infer<typeof PropertySpecDefaultInfo>;

export const PropertySpecArray: z.ZodType<types.PropertySpecArray> = z.lazy(
  () =>
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
export type PropertySpecArray = z.infer<typeof PropertySpecArray>;

export const PropertySpecMap: z.ZodType<types.PropertySpecMap> = z.lazy(() =>
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
export type PropertySpecMap = z.infer<typeof PropertySpecMap>;

export const PropertySpecUnionDiscriminator = z.object({
  mapping: z.record(z.string(), z.string()).optional(),
  propertyName: z.string(),
});

/**
 * Informs the consumer of an alternative schema based on the value associated with it
 */
export type PropertySpecUnionDiscriminator = z.infer<
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
export type PropertySpecNamed = z.infer<typeof PropertySpecNamed>;

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
export type PropertySpecPrimitive = z.infer<typeof PropertySpecPrimitive>;

export const PropertySpecUnionDefaultInfo = z.object({
  environment: z.string().array(),
  language: z.any().optional(),
});

/**
 * Additional information about the property's default value, if any.
 */
export type PropertySpecUnionDefaultInfo = z.infer<
  typeof PropertySpecUnionDefaultInfo
>;

export const PropertySpecUnion: z.ZodType<types.PropertySpecUnion> = z.lazy(
  () =>
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
      type: PrimitiveTypeEnum.optional(),
    })
);

/**
 * Union Property Definition describes an object or resource property
 */
export type PropertySpecUnion = z.infer<typeof PropertySpecUnion>;

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
export type ObjectTypeSpec = z.infer<typeof ObjectTypeSpec>;

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
export type ComplexTypeSpecObject = z.infer<typeof ComplexTypeSpecObject>;

export const ResourceAlias = z.object({
  name: z.string().optional(),
  project: z.string().optional(),
  type: z.string().optional(),
});

/**
 * An alias for a resource
 */
export type ResourceAlias = z.infer<typeof ResourceAlias>;

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
export type ResourceSpec = z.infer<typeof ResourceSpec>;

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
export type FunctionSpec = z.infer<typeof FunctionSpec>;

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
export type Config = z.infer<typeof Config>;

export const Meta = z.object({
  moduleFormat: z.string({
    description: `A regex that is used by the importer to extract a module name from the module portion of a type token. Packages that use the module format "namespace1/namespace2/.../namespaceN" do not need to specify a format. The regex must define one capturing group that contains the module name, which must be formatted as "namespace1/namespace2/...namespaceN".`,
  }),
});

/**
 * Format metadata about this package.
 */
export type Meta = z.infer<typeof Meta>;

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
export type Schema = z.infer<typeof Schema>;

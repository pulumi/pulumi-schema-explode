import z from "zod";
import * as types from "./schema-types";

export const PrimitiveTypeEnum = z.enum(
  ["boolean", "integer", "number", "string"],
  { description: "Enum containing possible primitive types" }
);

/**
 * Enum containing possible primitive types
 */
export type PrimitiveTypeEnum = z.infer<typeof PrimitiveTypeEnum>;

export const EnumValueDefinition = z.object(
  {
    deprecationMessage: z
      .string({ description: "Indicates whether the value is deprecated." })
      .optional(),
    description: z
      .string({
        description:
          "The description of the enum value, if any. Interpreted as Markdown.",
      })
      .optional(),
    name: z
      .string({
        description:
          "If present, overrides the name of the enum value that would usually be derived from the value.",
      })
      .optional(),
    value: PrimitiveTypeEnum.describe("The enum value itself"),
  },
  { description: "Enum Value Definition" }
);

/**
 * Enum Value Definition
 */
export type EnumValueDefinition = z.infer<typeof EnumValueDefinition>;

export const ComplexTypeSpecEnum = z.object(
  {
    description: z
      .string({
        description:
          "The description of the type, if any. Interpreted as Markdown.",
      })
      .optional(),
    enum: z.array(EnumValueDefinition, {
      description: "The list of possible values for the enum",
    }),
    isOverlay: z
      .boolean({
        description:
          "Indicates that the implementation of the type should not be generated from the schema, and is instead provided out-of-band by the package author",
      })
      .optional(),
    language: z
      .boolean({
        description: "Additional language-specific data about the type.",
      })
      .optional(),
    type: PrimitiveTypeEnum.describe(
      "The underlying primitive type of the enum"
    ),
  },
  { description: "Enum Type Definition" }
);

/**
 * Enum Type Definition
 */
export type ComplexTypeSpecEnum = z.infer<typeof ComplexTypeSpecEnum>;

export const PropertySpecDefaultInfo = z.object(
  {
    environment: z
      .string({
        description:
          "A set of environment variables to probe for a default value.",
      })
      .array(),
    language: z
      .any({
        description:
          "Additional language-specific data about the default value.",
      })
      .optional(),
  },
  {
    description:
      "Additional information about the property's default value, if any.",
  }
);

/**
 * Additional information about the property's default value, if any.
 */
export type PropertySpecDefaultInfo = z.infer<typeof PropertySpecDefaultInfo>;

export const PropertySpecArray: z.ZodType<types.PropertySpecArray> = z.lazy(
  () =>
    z.object({
      const: z
        .union([z.boolean(), z.number(), z.string()], {
          description:
            "The constant value for the property, if any. The type of the value must be assignable to the type of the property.",
        })
        .optional(),
      default: z
        .union([z.boolean(), z.number(), z.string()], {
          description:
            "The default value for the property, if any. The type of the value must be assignable to the type of the property.",
        })
        .optional(),
      defaultInfo: z.optional(
        PropertySpecDefaultInfo.describe(
          "Additional information about the property's default value, if any."
        )
      ),
      deprecationMessage: z
        .string({ description: "Indicates whether the property is deprecated" })
        .optional(),
      description: z
        .string({
          description:
            "The description of the property, if any. Interpreted as Markdown.",
        })
        .optional(),
      items: z.union(
        [
          PropertySpecPrimitive,
          PropertySpecArray,
          PropertySpecMap,
          PropertySpecNamed,
          PropertySpecUnion,
        ],
        { description: "The element type of the array" }
      ),
      language: z
        .any({
          description: "Additional language-specific data about the property.",
        })
        .optional(),
      plain: z
        .boolean({
          description:
            "Indicates that when used as an input, this type does not accept eventual values.",
        })
        .optional(),
      replaceOnChanges: z
        .boolean({
          description:
            "Specifies whether a change to the property causes its containing resource to be replaced instead of updated (default false).",
        })
        .optional(),
      secret: z
        .boolean({
          description:
            "Specifies whether the property is secret (default false).",
        })
        .optional(),
      type: z.literal("array"),
    }),
  {
    description:
      "Array Property Definition describes an object or resource property",
  }
);

/**
 * Array Property Definition describes an object or resource property
 */
export type PropertySpecArray = z.infer<typeof PropertySpecArray>;

export const PropertySpecMap: z.ZodType<types.PropertySpecMap> = z.lazy(
  () =>
    z.object({
      additionalProperties: z
        .union(
          [
            PropertySpecPrimitive,
            PropertySpecArray,
            PropertySpecMap,
            PropertySpecNamed,
            PropertySpecUnion,
          ],
          {
            description: `The element type of the map. Defaults to "string" when omitted.`,
          }
        )
        .optional(),
      const: z
        .union([z.boolean(), z.number(), z.string()], {
          description:
            "The constant value for the property, if any. The type of the value must be assignable to the type of the property.",
        })
        .optional(),
      default: z
        .union([z.boolean(), z.number(), z.string()], {
          description:
            "The default value for the property, if any. The type of the value must be assignable to the type of the property.",
        })
        .optional(),
      defaultInfo: PropertySpecDefaultInfo.describe(
        "Additional information about the property's default value, if any."
      ).optional(),
      deprecationMessage: z
        .string({ description: "Indicates whether the property is deprecated" })
        .optional(),
      description: z
        .string({
          description:
            "The description of the property, if any. Interpreted as Markdown.",
        })
        .optional(),
      language: z
        .any({
          description: "Additional language-specific data about the property.",
        })
        .optional(),
      plain: z
        .boolean({
          description:
            "Indicates that when used as an input, this type does not accept eventual values.",
        })
        .optional(),
      replaceOnChanges: z
        .boolean({
          description:
            "Specifies whether a change to the property causes its containing resource to be replaced instead of updated (default false).",
        })
        .optional(),
      secret: z
        .boolean({
          description:
            "Specifies whether the property is secret (default false).",
        })
        .optional(),
      type: z.literal("object"),
    }),
  {
    description:
      "Map Property Definition describes an object or resource property",
  }
);

/**
 * Map Property Definition describes an object or resource property
 */
export type PropertySpecMap = z.infer<typeof PropertySpecMap>;

export const PropertySpecUnionDiscriminator = z.object(
  {
    mapping: z
      .record(z.string(), z.string(), {
        description:
          "an optional object to hold mappings between payload values and schema names or references",
      })
      .optional(),
    propertyName: z.string({
      description:
        "PropertyName is the name of the property in the payload that will hold the discriminator value",
    }),
  },
  {
    description:
      "Informs the consumer of an alternative schema based on the value associated with it",
  }
);

/**
 * Informs the consumer of an alternative schema based on the value associated with it
 */
export type PropertySpecUnionDiscriminator = z.infer<
  typeof PropertySpecUnionDiscriminator
>;

export const PropertySpecNamed = z.object(
  {
    $ref: z.string({
      description: `The URI of the referenced type. For example, the built-in Archive, Asset, and Any\ntypes are referenced as "pulumi.json#/Archive", "pulumi.json#/Asset", and "pulumi.json#/Any", respectively.\nA type from this document is referenced as "#/types/pulumi:type:token".\nA type from another document is referenced as "path#/types/pulumi:type:token", where path is of the form:\n  "/provider/vX.Y.Z/json" or "pulumi.json" or "http[s]://example.com/provider/vX.Y.Z/json"\nA resource from this document is referenced as "#/resources/pulumi:type:token".\nA resource from another document is referenced as "path#/resources/pulumi:type:token", where path is of the form:\n  "/provider/vX.Y.Z/json" or "pulumi.json" or "http[s]://example.com/provider/vX.Y.Z/json"`,
    }),
    const: z
      .union([z.boolean(), z.number(), z.string()], {
        description:
          "The constant value for the property, if any. The type of the value must be assignable to the type of the property.",
      })
      .optional(),
    default: z
      .union([z.boolean(), z.number(), z.string()], {
        description:
          "The default value for the property, if any. The type of the value must be assignable to the type of the property.",
      })
      .optional(),
    defaultInfo: PropertySpecDefaultInfo.describe(
      "Additional information about the property's default value, if any."
    ).optional(),
    deprecationMessage: z
      .string({ description: "Indicates whether the property is deprecated" })
      .optional(),
    description: z
      .string({
        description:
          "The description of the property, if any. Interpreted as Markdown.",
      })
      .optional(),
    language: z
      .any({
        description: "Additional language-specific data about the property.",
      })
      .optional(),
    plain: z
      .boolean({
        description:
          "Indicates that when used as an input, this type does not accept eventual values.",
      })
      .optional(),
    replaceOnChanges: z
      .boolean({
        description:
          "Specifies whether a change to the property causes its containing resource to be replaced instead of updated (default false).",
      })
      .optional(),
    secret: z
      .boolean({
        description: "pecifies whether the property is secret (default false).",
      })
      .optional(),
    type: z
      .string({
        description: "gnored; present for compatibility with existing schemas",
      })
      .optional(),
  },
  {
    description:
      "Named Property Definition describes an object or resource property",
  }
);

/**
 * Named Property Definition describes an object or resource property
 */
export type PropertySpecNamed = z.infer<typeof PropertySpecNamed>;

export const PropertySpecPrimitive = z.object(
  {
    const: z
      .union([z.boolean(), z.number(), z.string()], {
        description:
          "The constant value for the property, if any. The type of the value must be assignable to the type of the property.",
      })
      .optional(),
    default: z
      .union([z.boolean(), z.number(), z.string()], {
        description:
          "The default value for the property, if any. The type of the value must be assignable to the type of the property.",
      })
      .optional(),
    defaultInfo: z.optional(
      PropertySpecDefaultInfo.describe(
        "Additional information about the property's default value, if any."
      )
    ),
    deprecationMessage: z
      .string({ description: "Indicates whether the property is deprecated" })
      .optional(),
    description: z
      .string({
        description:
          "The description of the property, if any. Interpreted as Markdown.",
      })
      .optional(),
    language: z
      .any({
        description: "Additional language-specific data about the property.",
      })
      .optional(),
    plain: z
      .boolean({
        description:
          "Indicates that when used as an input, this type does not accept eventual values.",
      })
      .optional(),
    replaceOnChanges: z
      .boolean({
        description:
          "Specifies whether a change to the property causes its containing resource to be replaced instead of updated (default false).",
      })
      .optional(),
    secret: z
      .boolean({
        description:
          "Specifies whether the property is secret (default false).",
      })
      .optional(),
    type: PrimitiveTypeEnum.describe("The primitive type, if any"),
  },
  {
    description:
      "Primitive Property Definition describes an object or resource property",
  }
);

/**
 * Primitive Property Definition describes an object or resource property
 */
export type PropertySpecPrimitive = z.infer<typeof PropertySpecPrimitive>;

export const PropertySpecUnionDefaultInfo = z.object(
  {
    environment: z
      .string({
        description:
          "A set of environment variables to probe for a default value.",
      })
      .array(),
    language: z
      .any({
        description:
          "Additional language-specific data about the default value.",
      })
      .optional(),
  },
  {
    description:
      "Additional information about the property's default value, if any.",
  }
);

/**
 * Additional information about the property's default value, if any.
 */
export type PropertySpecUnionDefaultInfo = z.infer<
  typeof PropertySpecUnionDefaultInfo
>;

export const PropertySpecUnion: z.ZodType<types.PropertySpecUnion> = z.lazy(
  () =>
    z.object(
      {
        const: z
          .union([z.boolean(), z.number(), z.string()], {
            description:
              "The constant value for the property, if any. The type of the value must be assignable to the type of the property.",
          })
          .optional(),
        default: z
          .union([z.boolean(), z.number(), z.string()], {
            description:
              "The default value for the property, if any. The type of the value must be assignable to the type of the property.",
          })
          .optional(),
        defaultInfo: z.optional(
          PropertySpecUnionDefaultInfo.describe(
            "Additional information about the property's default value, if any."
          )
        ),
        deprecationMessage: z
          .string({
            description: "Indicates whether the property is deprecated",
          })
          .optional(),
        description: z
          .string({
            description:
              "The description of the property, if any. Interpreted as Markdown.",
          })
          .optional(),
        discriminator: PropertySpecUnionDiscriminator.describe(
          "Informs the consumer of an alternative schema based on the value associated with it"
        ).optional(),
        language: z
          .any({
            description:
              "Additional language-specific data about the property.",
          })
          .optional(),
        oneOf: z.array(
          z.union(
            [
              PropertySpecPrimitive,
              PropertySpecArray,
              PropertySpecMap,
              PropertySpecNamed,
              PropertySpecUnion,
            ],
            {
              description:
                "If present, indicates that values of the type may be one of any of the listed types",
            }
          )
        ),
        plain: z
          .boolean({
            description:
              "Indicates that when used as an input, this type does not accept eventual values.",
          })
          .optional(),
        replaceOnChanges: z
          .boolean({
            description:
              "Specifies whether a change to the property causes its containing resource to be replaced instead of updated (default false).",
          })
          .optional(),
        secret: z
          .boolean({
            description:
              "Specifies whether the property is secret (default false).",
          })
          .optional(),
        type: PrimitiveTypeEnum.describe(
          "The underlying primitive type of the union, if any"
        ).optional(),
      },
      {
        description:
          "Union Property Definition describes an object or resource property",
      }
    )
);

/**
 * Union Property Definition describes an object or resource property
 */
export type PropertySpecUnion = z.infer<typeof PropertySpecUnion>;

export const ObjectTypeSpec = z.object(
  {
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
  },
  { description: "Object Type Details" }
);

/**
 * Object Type Details
 */
export type ObjectTypeSpec = z.infer<typeof ObjectTypeSpec>;

export const ComplexTypeSpecObject = z.object(
  {
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
  },
  { description: "Complex object Type Details" }
);

/**
 * Complex object Type Details
 */
export type ComplexTypeSpecObject = z.infer<typeof ComplexTypeSpecObject>;

export const ResourceAlias = z.object(
  {
    name: z
      .string({ description: "The name portion of the alias, if any" })
      .optional(),
    project: z
      .string({ description: "The project portion of the alias, if any" })
      .optional(),
    type: z
      .string({ description: "The type portion of the alias, if any" })
      .optional(),
  },
  { description: "An alias for a resource" }
);

/**
 * An alias for a resource
 */
export type ResourceAlias = z.infer<typeof ResourceAlias>;

export const ResourceSpec = z.object(
  {
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
      .boolean({
        description: "Indicates whether the resource is a component.",
      })
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
  },
  { description: "Resource Definition describes a resource or component." }
);

/**
 * Resource Definition describes a resource or component.
 */
export type ResourceSpec = z.infer<typeof ResourceSpec>;

export const FunctionSpec = z.object(
  {
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
  },
  { description: "Function Definition describes a function." }
);

/**
 * Function Definition describes a function.
 */
export type FunctionSpec = z.infer<typeof FunctionSpec>;

export const Config = z.object(
  {
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
  },
  { description: "The package's configuration variables." }
);
/**
 * The package's configuration variables.
 */
export type Config = z.infer<typeof Config>;

export const Meta = z.object(
  {
    moduleFormat: z.string({
      description: `A regex that is used by the importer to extract a module name from the module portion of a type token. Packages that use the module format "namespace1/namespace2/.../namespaceN" do not need to specify a format. The regex must define one capturing group that contains the module name, which must be formatted as "namespace1/namespace2/...namespaceN".`,
    }),
  },
  { description: "Format metadata about this package." }
);

/**
 * Format metadata about this package.
 */
export type Meta = z.infer<typeof Meta>;

export const Schema = z.object(
  {
    attribution: z
      .string({
        description: "Freeform text attribution of derived work, if required.",
      })
      .optional(),
    config: Config.describe(
      "The package's configuration variables."
    ).optional(),
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
      .record(
        z.string(),
        z.union([ComplexTypeSpecObject, ComplexTypeSpecEnum]),
        {
          description:
            "A map from type token to complexTypeSpec that describes the set of complex types (i.e. object, enum) defined by this package.",
        }
      )
      .optional(),
    version: z
      .string({
        description:
          "The version of the package. The version must be valid semver.",
      })
      .optional(),
  },
  { description: "A description of the schema for a Pulumi Package" }
);

/**
 * A description of the schema for a Pulumi Package
 */
export type Schema = z.infer<typeof Schema>;

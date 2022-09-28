import * as fc from "fast-check";
import glob from "glob";
import memfs from "memfs";
import { join } from "path";
import * as z from "zod";
import { ZodFastCheck } from "zod-fast-check";
import { explode } from "./explode";
import { parseSchemaDir } from "./implode";
import { Meta } from "./schema-parser";

// Using adjusted schema because zod-fast-check doesn't support lazy zod parsers (required for recursion).
const TestSchema = z.object(
  {
    attribution: z
      .string({
        description: "Freeform text attribution of derived work, if required.",
      })
      .optional(),
    //   config: Config.describe(
    //     "The package's configuration variables."
    //   ).optional(),
    description: z
      .string({
        description:
          "The description of the package. Descriptions are interpreted as Markdown.",
      })
      .optional(),
    displayName: z
      .string({ description: "The human-friendly name of the package." })
      .optional(),
    //   functions: z
    //     .record(z.string(), FunctionSpec, {
    //       description:
    //         "A map from token to functionSpec that describes the set of functions defined by this package.",
    //     })
    //     .optional(),
    homepage: z.string({ description: "The package's homepage." }).optional(),
    keywords: z
      .array(z.string(), {
        description:
          "The list of keywords that are associated with the package, if any.",
      })
      .optional(),
    language: z
      .record(z.string().min(1), z.record(z.string().min(1), z.any()), {
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
    //   provider: ResourceSpec.describe(
    //     "The provider type for this package."
    //   ).optional(),
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
    //   resources: z
    //     .record(z.string(), ResourceSpec, {
    //       description:
    //         "A map from type token to resourceSpec that describes the set of resources and components defined by this package.",
    //     })
    //     .optional(),
    //   types: z
    //     .record(
    //       z.string(),
    //       z.union([ComplexTypeSpecObject, ComplexTypeSpecEnum]),
    //       {
    //         description:
    //           "A map from type token to complexTypeSpec that describes the set of complex types (i.e. object, enum) defined by this package.",
    //       }
    //     )
    //     .optional(),
    version: z
      .string({
        description:
          "The version of the package. The version must be valid semver.",
      })
      .optional(),
  },
  { description: "A description of the schema for a Pulumi Package" }
);

test("round-trip arbitrary schema", () => {
  const schemaArbitrary = ZodFastCheck()
    .inputOf(TestSchema)
    .filter((t) => {
      const hasBadLanguage = Object.keys(t.language ?? {}).some(
        (k) => k.match(/^\w+$/) === null
      );
      return !hasBadLanguage;
    });

  fc.assert(
    fc.property(schemaArbitrary, (schema) => {
      const volume = new memfs.Volume();
      const fs = memfs.createFsFromVolume(volume);
      explode(schema, {
        writeFile(path, content) {
          fs.writeFileSync(join("/", path), content, { encoding: "utf-8" });
        },
      });
      const viaExplode = parseSchemaDir({
        find(pattern) {
          return glob.sync(pattern, { cwd: "/", fs: fs as any });
        },
        readFile(path) {
          return fs.readFileSync(join("/", path), {
            encoding: "utf-8",
          }) as string;
        },
      });
      const viaJSONParse = JSON.parse(JSON.stringify(schema));
      expect(viaExplode).toEqual(viaJSONParse);
    })
  );
});

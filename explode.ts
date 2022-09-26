import {
  ComplexTypeSpecEnum,
  ComplexTypeSpecObject,
  FunctionSpec,
  ObjectTypeSpec,
  ResourceSpec,
  Schema,
} from "./schema";
import { writeFileSync, existsSync, mkdirSync, open } from "fs";
import yaml from "yaml";
import path, { dirname } from "path";
import {} from "@pulumi/pulumi";

export interface ExplodeOptions {
  writeFile: (path: string, content: string) => void;
}

const yamlOptions: yaml.ToStringOptions = { lineWidth: 0, blockQuote: true };

export function explode(schema: Schema, options: ExplodeOptions): void {
  const { writeFile } = options;
  const {
    functions,
    types,
    resources,
    language,
    config,
    provider,
    ...remainingSchema
  } = schema;

  writeFile("base.yaml", yaml.stringify(remainingSchema, yamlOptions));
  if (config !== undefined) {
    writeFile("config.yaml", yaml.stringify(config, yamlOptions));
  }
  if (provider !== undefined) {
    writeFile("provider.yaml", yaml.stringify(provider, yamlOptions));
  }
  if (typeof language === "object" && language !== null) {
    writeLanguages(language, options);
  }
  for (const [token, fn] of Object.entries(functions ?? {})) {
    writeTokenSpec("functions", token, fn, options);
  }
  for (const [token, resource] of Object.entries(resources ?? {})) {
    writeTokenSpec("resources", token, resource, options);
  }
  for (const [token, type] of Object.entries(types ?? {})) {
    writeTokenSpec("types", token, type, options);
  }
}

export function writeToFolder(dir: string): ExplodeOptions {
  return {
    writeFile: (filePath, content) => {
      const combinedPath = path.join(dir, filePath);
      const combinedDir = dirname(combinedPath);
      if (!existsSync(combinedDir)) {
        mkdirSync(combinedDir, { recursive: true });
      }
      return writeFileSync(combinedPath, content, {
        encoding: "utf-8",
      });
    },
  };
}

function writeLanguages(language: unknown, options: ExplodeOptions) {
  if (typeof language !== "object" || language == null) {
    return;
  }
  for (const [name, lang] of Object.entries(language)) {
    options.writeFile(
      `language.${name}.yaml`,
      yaml.stringify(lang, yamlOptions)
    );
  }
}

function writeTokenSpec(
  type: "functions" | "types" | "resources",
  token: string,
  fn: FunctionSpec | ResourceSpec | ComplexTypeSpecObject | ComplexTypeSpecEnum,
  options: ExplodeOptions
): void {
  const [provider, modulePath, name] = token.split(":");
  const [module] = modulePath.split("/");
  const { description, spec } = formatForOutput(token, fn);
  const dir = path.join(module, type);
  options.writeFile(
    path.join(dir, `${name}.yaml`),
    yaml.stringify(spec, yamlOptions)
  );
  if (description !== undefined) {
    options.writeFile(path.join(dir, `${name}.md`), description);
  }
}

function formatForOutput<T extends { description?: string }>(
  token: string,
  spec: T
): { spec: T & { $token: string }; description?: string } {
  const withToken = { $token: token, ...spec };
  if (spec.description !== undefined && spec.description.length > 400) {
    withToken.description = undefined;
    return { description: spec.description, spec: withToken };
  }
  return { spec: withToken };
}

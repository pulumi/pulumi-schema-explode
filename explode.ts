import { existsSync, mkdirSync, writeFileSync } from "fs";
import path, { dirname } from "path";
import yaml from "yaml";
import {
  ComplexTypeSpecEnum,
  ComplexTypeSpecObject,
  FunctionSpec,
  ResourceSpec,
  Schema,
} from "./schema-types";

type FileWriter = (path: string, content: string) => void;

export interface ExplodeOptions {
  writeFile: FileWriter;
  /** @default yaml */
  format?: "yaml" | "json";
}

export function explode(schema: Schema, options: ExplodeOptions): void {
  const context = new Context(options);
  const {
    functions,
    types,
    resources,
    language,
    config,
    provider,
    ...remainingSchema
  } = schema;

  let base: any = remainingSchema;

  if (config !== undefined) {
    context.writeData("config", config);
  }
  if (provider !== undefined) {
    context.writeData("provider", provider);
  }
  base.language = writeLanguages(language, context);
  base.functions = writeTokens(context, "functions", functions);
  base.resources = writeTokens(context, "resources", resources);
  base.types = writeTokens(context, "types", types);
  context.writeData("base", base);
}

export function fsFileWriter(dir: string): FileWriter {
  return (filePath, content) => {
    const combinedPath = path.join(dir, filePath);
    const combinedDir = dirname(combinedPath);
    if (!existsSync(combinedDir)) {
      mkdirSync(combinedDir, { recursive: true });
    }
    return writeFileSync(combinedPath, content, {
      encoding: "utf-8",
    });
  };
}

type DataWriter = (pathWithoutExtension: string, data: any) => void;

type Formatter = (data: any) => string;

class Context {
  constructor(options: ExplodeOptions) {
    this.write = options.writeFile;
    const format = options.format ?? "yaml";
    this.ext = format;
    this.format = format === "yaml" ? formatYaml : formatJson;
    this.writeData = (pathWithoutExtension, data) => {
      this.write(`${pathWithoutExtension}.${this.ext}`, this.format(data));
    };
  }

  public write: FileWriter;
  public format: Formatter;
  public ext: string;
  public writeData: DataWriter;
}

function formatJson(data: any) {
  return JSON.stringify(data, null, 2);
}

function formatYaml(data: any) {
  return yaml.stringify(data, { lineWidth: 0, blockQuote: true });
}

function writeLanguages(language: unknown, context: Context) {
  if (typeof language !== "object" || language == null) {
    return language;
  }
  const entries = Object.entries(language);
  if (entries.length === 0) {
    return language;
  }
  for (const [name, lang] of entries) {
    context.writeData(`language.${name}`, lang);
  }
}

function writeTokens(
  context: Context,
  type: "functions" | "types" | "resources",
  tokenEntries?: Record<
    string,
    FunctionSpec | ResourceSpec | ComplexTypeSpecObject | ComplexTypeSpecEnum
  >
) {
  if (tokenEntries === undefined) {
    return;
  }
  const entries = Object.entries(tokenEntries);
  if (entries.length === 0) {
    return tokenEntries;
  }
  for (const [token, fn] of entries) {
    writeTokenSpec(type, token, fn, context);
  }
}

function writeTokenSpec(
  type: "functions" | "types" | "resources",
  token: string,
  fn: FunctionSpec | ResourceSpec | ComplexTypeSpecObject | ComplexTypeSpecEnum,
  context: Context
): void {
  const [provider, modulePath, name] = token.split(":");
  const [module, submodule] = modulePath.split("/");
  const ignoreSubmodule =
    submodule === undefined ||
    submodule.localeCompare(name, undefined, { sensitivity: "base" }) === 0;
  const dir = ignoreSubmodule
    ? path.join(module, type)
    : path.join(module, submodule, type);
  const { description, spec } = formatForOutput(token, fn);
  context.writeData(path.join(dir, name), spec);
  if (description !== undefined) {
    context.write(path.join(dir, `${name}.md`), description);
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

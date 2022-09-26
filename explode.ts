import {
  ComplexTypeSpecEnum,
  ComplexTypeSpecObject,
  FunctionSpec,
  ResourceSpec,
  Schema,
} from "./schema";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import yaml from "yaml";
import path, { dirname } from "path";

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

  context.writeData("base", remainingSchema);
  if (config !== undefined) {
    context.writeData("config", config);
  }
  if (provider !== undefined) {
    context.writeData("provider", provider);
  }
  writeLanguages(language, context);
  for (const [token, fn] of Object.entries(functions ?? {})) {
    writeTokenSpec("functions", token, fn, context);
  }
  for (const [token, resource] of Object.entries(resources ?? {})) {
    writeTokenSpec("resources", token, resource, context);
  }
  for (const [token, type] of Object.entries(types ?? {})) {
    writeTokenSpec("types", token, type, context);
  }
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
    return;
  }
  for (const [name, lang] of Object.entries(language)) {
    context.writeData(`language.${name}`, lang);
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

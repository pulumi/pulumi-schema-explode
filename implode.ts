import { readFileSync } from "fs";
import { glob } from "glob";
import { extname, join } from "path";
import yaml from "yaml";
import { Schema } from "./schema-types";

export function implode(dir: string): Schema {
  return parseSchemaDir({
    find(pattern) {
      return glob.sync(pattern, { cwd: dir });
    },
    readFile(p) {
      return readFileSync(join(dir, p), "utf-8");
    },
  });
}

interface Context {
  find: (pattern: string) => string[];
  readFile: (path: string) => string;
}

export function parseSchemaDir(context: Context): Schema {
  const base: any = parsePath(context, "base");
  if (base === undefined) {
    throw new Error("base.yaml or base.json not found");
  }
  const config = parsePath(context, "config");
  if (config !== undefined) {
    base.config = config;
  }
  const provider = parsePath(context, "provider");
  if (provider !== undefined) {
    base.provider = provider;
  }

  const language = parseLanguage(context);
  if (language !== undefined) {
    base.language = language;
  }

  const functions = parseTokenSpecs(context, "functions");
  if (functions !== undefined) {
    base.functions = functions;
  }

  const resources = parseTokenSpecs(context, "resources");
  if (resources !== undefined) {
    base.resources = resources;
  }

  const types = parseTokenSpecs(context, "types");
  if (types !== undefined) {
    base.types = types;
  }

  return base as Schema;
}

function parseLanguage(context: Context) {
  let count = 0;
  let language: Record<string, any> = {};
  const paths = context.find("language.*.*");
  for (const p of paths) {
    const [_, lang, ext] = p.split(".");
    language[lang] = parseContent(context.readFile(p), ext);
    count++;
  }
  if (count === 0) {
    return undefined;
  }
  return language;
}

function parseTokenSpecs(
  context: Context,
  type: "functions" | "types" | "resources"
) {
  let count = 0;
  const tokens: Record<string, any> = {};
  const paths = context.find(`**/${type}/*.@(json|yaml)`);
  for (const path of paths) {
    const ext = extname(path);
    let content: any = parseContent(context.readFile(path), ext);
    const token = content.$token;
    delete content.$token;
    if (!("description" in content)) {
      const mdPath = path.replace(ext, ".md");
      if (context.find(mdPath).length > 0) {
        const description = context.readFile(mdPath);
        // Keep description first
        content = { description, ...content };
      }
    }
    tokens[token] = content;
    count++;
  }
  if (count === 0) {
    return undefined;
  }
  return tokens;
}

function parsePath(
  context: Context,
  pathWithoutExtension: string
): object | undefined {
  const paths = context.find(pathWithoutExtension + ".*");
  if (paths.length === 0) {
    return undefined;
  }
  const path = paths[0];
  return parseContent(context.readFile(path), extname(path));
}

function parseContent(content: string, extension: string): object {
  switch (extension) {
    case ".json":
    case "json":
      return JSON.parse(content);
    case ".yaml":
    case "yaml":
      return yaml.parse(content);
  }
  throw new Error(`unknown extension: ${extension}`);
}

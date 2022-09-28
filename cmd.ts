#!/usr/bin/env node
import { fstatSync, readFileSync, statSync, writeFileSync } from "fs";
import jsonDiff from "json-diff";
import memfs from "memfs";
import glob from "glob";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { boolean } from "zod";
import { explode } from "./explode";
import { implode, parseSchemaDir } from "./implode";
import { Schema } from "./schema-parser";
import { dirname, join } from "path";

yargs(hideBin(process.argv))
  .command(
    "explode [schema]",
    "Convert a schema file into files & folders",
    {
      schema: {
        description: "Path to the schema JSON file",
        demandOption: true,
        type: "string",
      },
      validate: {
        description: "Validate schema while reading",
        default: false,
        type: "boolean",
      },
      outDir: {
        description: "Exploded schema output directory",
        defaultDescription: "current working directory",
        type: "string",
      },
      format: {
        description: "Format of exploded files",
        default: "yaml",
        choices: ["yaml", "json"],
      },
    },
    (argv) => {
      const schemaPath = argv.schema;
      const dir = argv.outDir ?? process.cwd();
      const format = argv.format;
      if (format !== "yaml" && format !== "json") {
        throw new Error(`invalid format: ${format}`);
      }
      const schemaContent = readFileSync(schemaPath, "utf-8");
      const schema: Schema = JSON.parse(schemaContent);
      if (argv.validate) {
        Schema.parse(schema);
      }
      explode(schema, { dir, format });
    }
  )
  .command(
    "implode [options...]",
    "Pack files and folders into schema file",
    {
      cwd: {
        description: "Directory containing the exploded schema",
        defaultDescription: "current working directory",
        type: "string",
      },
      outFile: {
        description: "Path to output combined schema file to",
        defaultDescription: "schema.json",
        type: "string",
      },
      stdOut: {
        description: "Output to StdOut instead of file. Overrides outFile",
        type: "boolean",
      },
      indent: {
        description: "Pretty print JSON output with specified number of spaces",
        type: "number",
        demandOption: false,
      },
      validate: {
        description: "Validate schema while reading",
        default: false,
        type: "boolean",
      },
    },
    (argv) => {
      const cwd = argv.cwd ?? process.cwd();
      const outFile = argv.outFile ?? "schema.json";
      console.log("imploding", { cwd });
      const schema = implode(cwd);
      if (argv.validate) {
        Schema.parse(schema);
      }
      const schemaContent = JSON.stringify(schema, null, argv.indent);
      if (argv.stdOut) {
        process.stdout.write(schemaContent, "utf-8");
      } else {
        writeFileSync(outFile, schemaContent, "utf-8");
      }
    }
  )
  .command(
    "test [schema]",
    "Test impact of explode/implode",
    {
      schema: {
        description: "path to the schema JSON file",
        demandOption: true,
        type: "string",
      },
      quiet: {
        description: "Don't print any output if no difference",
        type: "boolean",
      },
    },
    (argv) => {
      const volume = new memfs.Volume();
      const fs = memfs.createFsFromVolume(volume);
      const schemaContent = readFileSync(argv.schema, "utf-8");
      const schema: Schema = JSON.parse(schemaContent);
      explode(schema, {
        writeFile(path, content) {
          // Force paths to lowercase to emulate git's default case-insensitivity (for macos and windows compatibility)
          const absPath = join("/", path.toLowerCase());
          fs.mkdirSync(dirname(absPath), { recursive: true });
          fs.writeFileSync(absPath, content, { encoding: "utf-8" });
        },
      });
      const viaExplode = parseSchemaDir({
        find(pattern) {
          return glob.sync(pattern, { cwd: "/", fs: fs as any });
        },
        readFile(path) {
          return fs.readFileSync(join("/", path.toLowerCase()), {
            encoding: "utf-8",
          }) as string;
        },
      });
      const viaJSONParse = JSON.parse(JSON.stringify(schema));
      const diff = jsonDiff.diffString(viaJSONParse, viaExplode);
      if (diff !== "") {
        console.log(diff);
      } else if (!argv.quiet) {
        console.log("No changes");
      }
    }
  )
  .command(
    "validate [schema]",
    "Validate schema for errors",
    {
      schema: {
        description: "path to the schema JSON file or directory",
        demandOption: true,
        type: "string",
      },
      quiet: {
        description: "Don't print any output if valid",
        type: "boolean",
      },
    },
    (argv) => {
      const schemaPath = argv.schema;
      const stat = statSync(schemaPath);
      const schema: Schema = stat.isFile()
        ? JSON.parse(readFileSync(schemaPath, "utf-8"))
        : implode(schemaPath);
      Schema.parse(schema);
      if (!argv.quiet) {
        console.log(`Schema at ${schemaPath} is valid`);
      }
    }
  )
  .demandCommand()
  .strict()
  .help().argv;

import { readFileSync } from "fs";
import path from "path";
import { Schema } from "../schema-types";
import { explode, fsFileWriter } from "../explode";

async function makeExample(example: string) {
  const dir = path.resolve("examples", example);
  const schemaPath = path.resolve(dir, "schema.json");
  const schema: Schema = JSON.parse(readFileSync(schemaPath, "utf-8"));
  explode(schema, { format: "yaml", writeFile: fsFileWriter(dir) });
}

if (process.argv.length > 2) {
  makeExample(process.argv[2]);
} else {
  makeExample("aws");
  makeExample("azure-native");
}

import { readFileSync } from "fs";
import path from "path";
import { Schema } from "../schema-parser";

async function testExample(example: string) {
  const dir = path.resolve("examples", example);
  const schemaPath = path.resolve(dir, "schema.json");
  Schema.parse(JSON.parse(readFileSync(schemaPath, "utf-8")));
}

if (process.argv.length > 2) {
  testExample(process.argv[2]);
} else {
  testExample("aws");
  testExample("azure-native");
}

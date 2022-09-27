import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { Schema } from "../schema-parser";
import zodToJsonSchema from "zod-to-json-schema";

async function testExample(example: string) {
  const schema = zodToJsonSchema(Schema);
  writeFileSync("json-schema.json", JSON.stringify(schema, null, 2), "utf-8");
}

if (process.argv.length > 2) {
  testExample(process.argv[2]);
} else {
  testExample("aws");
  testExample("azure-native");
}

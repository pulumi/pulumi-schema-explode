import { writeFileSync } from "fs";
import path from "path";
import { implode } from "../implode";

async function testExample(example: string) {
  const dir = path.resolve("examples", example);
  writeFileSync(
    path.join(dir, "schema-out.json"),
    JSON.stringify(implode(dir), null, 2)
  );
}

if (process.argv.length > 2) {
  testExample(process.argv[2]);
} else {
  testExample("aws");
  testExample("azure-native");
}

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const srcDir = path.join(root, "prototypes");
const destDir = path.join(root, "public", "prototypes");

if (!fs.existsSync(srcDir)) {
  process.exit(0);
}

fs.mkdirSync(destDir, { recursive: true });

for (const name of fs.readdirSync(srcDir)) {
  if (!name.endsWith(".html")) continue;
  fs.copyFileSync(path.join(srcDir, name), path.join(destDir, name));
}

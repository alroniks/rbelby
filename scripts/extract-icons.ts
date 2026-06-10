import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const iconsDir = path.join(rootDir, 'node_modules/griddy-icons/dist/icons');
const output: Record<string, any> = {};

if (fs.existsSync(iconsDir)) {
  const icons = fs
    .readdirSync(iconsDir)
    .filter((dir) => fs.statSync(path.join(iconsDir, dir)).isDirectory());

  for (const icon of icons) {
    const regularPath = path.join(iconsDir, icon, 'regular.js');
    if (fs.existsSync(regularPath)) {
      const content = fs.readFileSync(regularPath, 'utf-8');

      // Match all path objects
      const pathsMatch = [
        ...content.matchAll(/jsx\("path",\s*({[^}]+})\s*\)/g),
      ];

      if (pathsMatch.length > 0) {
        output[icon] = pathsMatch
          .map((m) => {
            try {
              // Convert object string to valid JS object evaluating it
              const props = new Function(`return ${m[1]}`)();
              delete props.fill; // Let CSS control the color via currentColor on the svg
              return props;
            } catch (e) {
              console.error(`Failed to parse path in ${icon}`);
              return null;
            }
          })
          .filter(Boolean);
      }
    }
  }

  fs.writeFileSync(
    path.join(rootDir, 'src/components/icons.json'),
    JSON.stringify(output, null, 2)
  );
  console.log(`Extracted ${Object.keys(output).length} icons.`);
} else {
  console.error('griddy-icons directory not found in node_modules.');
}

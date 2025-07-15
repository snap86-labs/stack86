#!/usr/bin/env node

import * as fs from "node:fs";
import * as path from "node:path";
import chalk from "chalk";

interface PackageType {
  srcDir: fs.PathLike;
  destDir: fs.PathLike;
  excludeDir?: fs.PathLike[];
}

class Package {
  srcDir: fs.PathLike;
  destDir: fs.PathLike;
  excludeDir: fs.PathLike[];

  constructor({ srcDir, destDir, excludeDir = [] }: PackageType) {
    this.srcDir = srcDir;
    this.destDir = destDir;
    this.excludeDir = excludeDir;
  }

  generateTemplate() {
    console.log(chalk.blue(`🔄 Generating template to ${chalk.cyan(this.destDir.toString())}...`));

    if (fs.existsSync(this.destDir)) {
      fs.rmSync(this.destDir, { recursive: true, force: true });
    }

    this.copyDir(this.srcDir, this.destDir);

    console.log(chalk.green(`✅ Template generated at ${chalk.cyan(this.destDir.toString())}`));
  }

  private isExcluded(filePath: string): boolean {
    return this.excludeDir.some(excludePath =>
      filePath.startsWith(path.resolve(this.srcDir.toString(), excludePath.toString()))
    );
  }

  private isEnvFile(filename: string): boolean {
    const envPatterns = [
      /^\.env/,
      /^\.dev\.vars/,
      /\.env$/,
      /\.vars$/
    ];
    return envPatterns.some(pattern => pattern.test(filename));
  }

  private copyDir(src: fs.PathLike, dest: fs.PathLike) {
    fs.mkdirSync(dest, { recursive: true });

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src.toString(), entry.name);
      const destPath = path.join(dest.toString(), entry.name);

      if (this.isExcluded(srcPath)) continue;

      if (entry.isDirectory()) {
        this.copyDir(srcPath, destPath);
      } else {
        // Check if this is an env file and handle accordingly
        if (this.isEnvFile(entry.name)) {
          const exampleDestPath = path.join(dest.toString(), entry.name + '.example');
          this.copyAndBlankEnvFile(srcPath, exampleDestPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    }
  }

  private copyAndBlankEnvFile(srcPath: string, destPath: string) {
    if (!fs.existsSync(srcPath)) {
      console.warn(chalk.yellow(`⚠️  File not found: ${chalk.dim(srcPath)}`));
      return;
    }

    const lines = fs.readFileSync(srcPath, "utf-8").split("\n");

    const updatedLines = lines.map(line => {
      const trimmed = line.trim();

      // Keep comments and empty lines as-is
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
        return line;
      }

      // Extract key and blank the value
      const [key] = trimmed.split("=");
      return `${key}=`;
    });

    fs.writeFileSync(destPath, updatedLines.join("\n") + "\n");
    console.log(chalk.magenta(`🧹 Created blanked env example: ${chalk.dim(path.basename(destPath))}`));
  }
}

function blankEnvValues(filePath: string, keysToBlank?: string[]) {
  if (!fs.existsSync(filePath)) {
    console.warn(chalk.yellow(`⚠️  File not found: ${chalk.dim(filePath)}`));
    return;
  }

  const lines = fs.readFileSync(filePath, "utf-8").split("\n");

  const updatedLines = lines.map(line => {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      return line;
    }

    const [key, ...rest] = trimmed.split("=");
    if (key && keysToBlank && !keysToBlank.includes(key)) {
      return line;
    }

    return `${key}=`;
  });

  fs.writeFileSync(filePath, updatedLines.join("\n") + "\n");
  console.log(chalk.magenta(`🧹 Blank values in: ${chalk.dim(filePath)}`));
}

const baseSrc = path.resolve(__dirname, "../../../");
const baseDest = path.resolve(__dirname, "../../../templates/monorepo");

const packages: Package[] = [
  new Package({
    srcDir: path.join(baseSrc, "apps/webapp"),
    destDir: path.join(baseDest, "apps/webapp"),
    excludeDir: ["node_modules", "dist", ".tanstack"]
  }),
  new Package({
    srcDir: path.join(baseSrc, "apps/webapi"),
    destDir: path.join(baseDest, "apps/webapi"),
    excludeDir: ["node_modules", "build", "dist", "drizzle", ".wrangler", "worker-configuration.d.ts"]
  }),
  new Package({
    srcDir: path.join(baseSrc, "apps/storybook"),
    destDir: path.join(baseDest, "apps/storybook"),
    excludeDir: ["node_modules", "dist"]
  }),
  new Package({
    srcDir: path.join(baseSrc, "apps/docs"),
    destDir: path.join(baseDest, "apps/docs"),
    excludeDir: ["node_modules", "dist", ".astro", ".vscode", ".wrangler", "worker-configuration.d.ts"]
  }),
  new Package({
    srcDir: path.join(baseSrc, "packages/ui"),
    destDir: path.join(baseDest, "packages/ui"),
    excludeDir: ["node_modules", "android", "ios", "build"]
  }),
];

console.log(chalk.bold.blue("\n🚀 Starting template generation...\n"));

for (const pkg of packages) {
  pkg.generateTemplate();
}

console.log(chalk.bold.cyan("\n📄 Copying root-level files..."));
// 📄 Copy root-level files
const filesToCopy = [".gitignore", "package.json", "pnpm-workspace.yaml"];
for (const filename of filesToCopy) {
  const srcPath = path.join(baseSrc, filename);
  const destPath = path.join(baseDest, filename);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(chalk.green(`📄 Copied ${chalk.bold(filename)} to monorepo template.`));
  } else {
    console.warn(chalk.yellow(`⚠️  Skipped missing file: ${chalk.dim(filename)}`));
  }
}

// Note: The env files are now handled automatically during the copy process
// They will be renamed to .example and have their values blanked
console.log(chalk.bold.green("\n🎉 Template generation complete with env files safely converted to .example files!"));
console.log(chalk.dim("   Environment files have been automatically detected and converted to .example files with blanked values."));
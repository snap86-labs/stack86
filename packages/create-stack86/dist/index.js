#!/usr/bin/env node
import * as fs from "node:fs";
import * as path from "node:path";
import { execSync } from "node:child_process";
import { intro, outro, text, spinner, note, cancel, isCancel } from "@clack/prompts";
import chalk from "chalk";
function getErrorMessage(error) {
    if (error instanceof Error)
        return error.message;
    return String(error);
}
class CreateStack86 {
    templateRepo = "https://github.com/snap86-labs/stack86.git";
    templatePath = "templates/monorepo";
    constructor() { }
    async run() {
        console.clear();
        intro(chalk.bold.blue("🚀 Create Stack86"));
        const projectName = await text({
            message: "What is your project name?",
            placeholder: "my-awesome-project",
            validate: (value) => {
                if (!value)
                    return "Project name is required";
                if (!/^[a-zA-Z0-9-_]+$/.test(value)) {
                    return "Project name can only contain letters, numbers, hyphens, and underscores";
                }
                return;
            }
        });
        if (isCancel(projectName)) {
            cancel("Operation cancelled");
            return process.exit(0);
        }
        const targetDir = path.resolve(process.cwd(), projectName);
        if (fs.existsSync(targetDir)) {
            cancel(`Directory ${chalk.cyan(projectName)} already exists`);
            return process.exit(1);
        }
        const options = {
            projectName,
            targetDir
        };
        try {
            await this.scaffold(options);
            outro(chalk.green(`✅ Project ${chalk.bold(projectName)} created successfully!`));
            note(`${chalk.cyan("Next steps:")}\n` +
                `  cd ${projectName}\n` +
                `  pnpm install\n` +
                `  pnpm dev`, "Get started");
        }
        catch (error) {
            cancel(`Failed to create project: ${getErrorMessage(error)}`);
            process.exit(1);
        }
    }
    async scaffold(options) {
        const { projectName, targetDir } = options;
        const s1 = spinner();
        s1.start("Cloning template repository...");
        const tempDir = path.join(process.cwd(), `.temp-${Date.now()}`);
        try {
            execSync(`git clone --depth 1 "${this.templateRepo}" "${tempDir}"`, {
                stdio: "pipe"
            });
            s1.stop("Template repository cloned");
        }
        catch (error) {
            s1.stop("Failed to clone repository");
            throw new Error(`Failed to clone template: ${getErrorMessage(error)}`);
        }
        const s2 = spinner();
        s2.start("Copying template files...");
        try {
            const templateSource = path.join(tempDir, this.templatePath);
            if (!fs.existsSync(templateSource)) {
                throw new Error(`Template path not found: ${this.templatePath}`);
            }
            await this.copyDirectory(templateSource, targetDir);
            s2.stop("Template files copied");
        }
        catch (error) {
            s2.stop("Failed to copy template files");
            throw error;
        }
        const s3 = spinner();
        s3.start("Customizing project files...");
        try {
            await this.replaceInFiles(targetDir, "stack86", projectName);
            await this.replaceInFiles(targetDir, "Stack86", this.toPascalCase(projectName));
            await this.replaceInFiles(targetDir, "STACK86", projectName.toUpperCase());
            s3.stop("Project files customized");
        }
        catch (error) {
            s3.stop("Failed to customize project files");
            throw error;
        }
        const s4 = spinner();
        s4.start("Cleaning up...");
        try {
            fs.rmSync(tempDir, { recursive: true, force: true });
            s4.stop("Cleanup completed");
        }
        catch (error) {
            s4.stop("Cleanup failed");
            console.warn(chalk.yellow(`⚠️  Failed to clean up temporary directory: ${tempDir}`));
        }
    }
    async copyDirectory(src, dest) {
        fs.mkdirSync(dest, { recursive: true });
        const entries = fs.readdirSync(src, { withFileTypes: true });
        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);
            if (entry.isDirectory()) {
                await this.copyDirectory(srcPath, destPath);
            }
            else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }
    async replaceInFiles(dir, searchValue, replaceValue) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                await this.replaceInFiles(fullPath, searchValue, replaceValue);
            }
            else {
                await this.replaceInFile(fullPath, searchValue, replaceValue);
            }
        }
    }
    async replaceInFile(filePath, searchValue, replaceValue) {
        const ext = path.extname(filePath).toLowerCase();
        const binaryExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.ico', '.woff', '.woff2', '.ttf', '.eot'];
        if (binaryExtensions.includes(ext))
            return;
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const newContent = content.replace(new RegExp(searchValue, 'g'), replaceValue);
            if (content !== newContent) {
                fs.writeFileSync(filePath, newContent, 'utf8');
            }
        }
        catch (error) {
            if (typeof error === "object" &&
                error !== null &&
                "code" in error &&
                error.code !== "EISDIR") {
                console.warn(chalk.yellow(`⚠️  Skipping file ${filePath}: ${getErrorMessage(error)}`));
            }
        }
    }
    toPascalCase(str) {
        return str
            .split(/[-_\s]+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('');
    }
}
const createStack86 = new CreateStack86();
createStack86.run().catch(console.error);
//# sourceMappingURL=index.js.map
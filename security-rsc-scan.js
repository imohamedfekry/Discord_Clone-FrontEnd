const fs = require("fs");
const path = require("path");

function readLines(file) {
    return fs.readFileSync(file, "utf8").split(/\r?\n/);
}

function walkDir(dir, acc = []) {
    if (!fs.existsSync(dir)) return acc;
    for (const entry of fs.readdirSync(dir)) {
        const full = path.join(dir, entry);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) walkDir(full, acc);
        else if (/\.(ts|tsx|js|jsx)$/.test(entry)) acc.push(full);
    }
    return acc;
}

function add(findings, file, line, snippet, type, note) {
    findings.push({ type, file, line, snippet: snippet.trim(), note });
}

function scanFile(file, findings) {
    const lines = readLines(file);

    for (let i = 0; i < lines.length; i++) {
        const L = lines[i];

        if (/\buse server\b/.test(L)) {
            add(findings, file, i + 1, L, "SERVER_ACTION", "‘use server’ = Server Action. تحقق من المدخلات.");
        }

        if (
            /(from ['"]fs['"]|require\(['"]fs['"]\))/.test(L) ||
            /\b(readFileSync|writeFileSync|rmSync|readdirSync)\b/.test(L)
        ) {
            add(findings, file, i + 1, L, "FS_ACCESS", "استخدام fs داخل app خطر لو فيه مدخلات.");
        }

        if (
            /(from ['"]child_process['"]|require\(['"]child_process['"]\))/.test(L) ||
            /\b(exec|execSync|spawn|spawnSync)\b/.test(L)
        ) {
            add(findings, file, i + 1, L, "PROCESS_EXEC", "تنفيذ أوامر داخل RSC = RCE محتمل.");
        }

        if (/\beval\s*\(|new Function\s*\(/.test(L)) {
            add(findings, file, i + 1, L, "DANGEROUS_EVAL", "eval/new Function خطر جدًا.");
        }

        if (/\bfetch\s*\(\s*([^)]+)\)/.test(L)) {
            const m = L.match(/\bfetch\s*\(\s*([^)]+)\)/);
            const arg = m?.[1] || "";
            const suspicious =
                /(params|searchParams|query|request|formData|input)/.test(arg) ||
                /[`$]/.test(arg);

            if (suspicious) {
                add(findings, file, i + 1, L, "UNSAFE_FETCH", "fetch بمدخلات متغيرة = SSRF محتمل.");
            }
        }
    }
}

function formatReport(findings) {
    const ROOT = process.cwd();
    const lines = [];

    lines.push("=== NEXT.JS RSC SECURITY REPORT ===");

    const sections = ["SERVER_ACTION", "FS_ACCESS", "PROCESS_EXEC", "DANGEROUS_EVAL", "UNSAFE_FETCH"];

    for (const s of sections) {
        const items = findings.filter((f) => f.type === s);
        if (!items.length) continue;
        lines.push(`\n--- ${s} (${items.length}) ---`);
        for (const f of items) {
            lines.push(`${path.relative(ROOT, f.file)}:${f.line}  |  ${f.snippet}`);
            lines.push(`   -> ${f.note}`);
        }
    }

    if (!findings.length) {
        lines.push("\n✔ لا توجد Patterns خطيرة.");
    }

    return lines.join("\n");
}

function main() {
    const APP = path.join(process.cwd(), "src", "app");
    const APP2 = path.join(process.cwd(), "app");

    let target = APP;
    if (!fs.existsSync(target)) target = APP2;

    if (!fs.existsSync(target)) {
        console.log("❌ لم يتم العثور على مجلد /app أو src/app");
        process.exit(1);
    }

    const files = walkDir(target);
    const findings = [];

    files.forEach((f) => scanFile(f, findings));

    console.log(formatReport(findings));
}

main();

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import { spawnSync } from 'node:child_process';

function files(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

const sources = ['src', 'scripts'].flatMap(files).filter((path) => extname(path) === '.js' || extname(path) === '.mjs');
for (const path of sources) {
  const code = readFileSync(path, 'utf8');
  const syntax = spawnSync(process.execPath, ['--check', path], { encoding: 'utf8' });
  if (syntax.status !== 0) throw new Error(syntax.stderr.trim());
  if (/\t/.test(code)) throw new Error(`${path}: use espaços, não tabulações`);
  if (/[ \t]+$/m.test(code)) throw new Error(`${path}: há espaço no fim de uma linha`);
}
console.log(`Lint aprovado: ${sources.length} arquivos JavaScript verificados.`);

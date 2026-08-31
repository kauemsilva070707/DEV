import { cpSync, mkdirSync, rmSync } from 'node:fs';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
cpSync('index.html', 'dist/index.html');
cpSync('src', 'dist/src', { recursive: true });
console.log('Build aprovado: artefato gerado em dist/.');

# TodoLab — Equipe ___

> Repositório da disciplina **Gestão e Qualidade de Software (0006960)** — USJT 2026/2
> Prof. Alexandre Barbosa

| | |
|---|---|
| **Fábrica de software** | |
| **Integrantes** | |
| **Produto publicado** | https://\<usuario>.github.io/\<repositorio>/ |
| **Project (board)** | |
| **Par de QA cruzado** | *(definido a partir da aula 12)* |

---

## Objetivo

Nesta disciplina vocês **não são os programadores**.

Vocês são a **squad de qualidade** de um produto. Quem escreve o código é uma **fábrica de software terceirizada** — o GitHub Copilot, no Visual Studio Code. Ela é rápida, ela é barata, e ela **não é confiável**: faz exatamente o que está escrito na especificação, e decide sozinha tudo o que a equipe esquecer de escrever.

O trabalho da squad é o que sobra quando escrever código deixa de ser o gargalo: especificar sem ambiguidade, testar antes, revisar de verdade, medir, decidir se libera ou não, e responder pelo produto entregue.

> A IA escreve o código em trinta segundos.
> Quem garante que ele presta é a equipe — e isso leva o semestre inteiro.

Cada Issue, Pull Request, revisão e decisão de merge deste repositório é também **evidência da A3**: o dossiê da disciplina não se escreve na última semana, é o rastro que a squad deixa aula a aula.

## O produto

Um gerenciador de tarefas no estilo TodoMVC, em JavaScript puro, sem dependências externas. Ele chega até vocês **incompleto e sem teste automatizado nenhum** — porque é assim que software chega na vida real.

**Funciona hoje:** adicionar, listar, concluir, remover e persistir tarefas no navegador (`localStorage`).

**Ainda não existe:** contador de tarefas restantes, filtros, edição, seleção e limpeza em massa, acessibilidade aprofundada, tratamento de erro e testes automatizados — cada um desses vira uma rodada da disciplina.

## Como a equipe começa

1. Confirmem que este repositório foi criado com **Use this template** e renomeado combinando com o professor.
2. Adicionem todos os integrantes como colaboradores (Settings → Collaborators).
3. Clonem o repositório ou abram a pasta no VS Code.
4. Preencham o cabeçalho deste README com o nome da fábrica e os integrantes.
5. Preencham `docs/rodizio.md` com os papéis da rodada.
6. Rodem os comandos abaixo e confirmem que o workflow **Quality Gate 0** aparece verde na aba **Actions** do repositório.
7. Criem o GitHub Project da fábrica (ver a atividade da aula em andamento).

## Começo rápido

Requisito: Node.js 20 ou superior. Não há dependências externas nem etapa de instalação.

```bash
npm run dev
```

Abra `http://localhost:4173`. Para executar o quality gate local:

```bash
npm run check
```

O mesmo gate (`lint` + `build`) roda no GitHub Actions em cada `push` e pull request — é o workflow **Quality Gate 0**, em `.github/workflows/quality-gate.yml`.

## Papéis da fábrica

Os quatro papéis centrais não se acumulam entre si. Com menos de seis integrantes, os dois papéis de apoio podem ser acumulados conforme a regra de composição apresentada em aula.

| Papel | Decisão pela qual responde | Restrição |
|---|---|---|
| Tech Lead / Analista de Requisitos | O pedido está claro o suficiente para iniciar? | Não aprova o próprio PR |
| QA Engineer | Há evidência de que cada critério foi atendido? | Não aceita sem evidência independente |
| Code Reviewer | A alteração pode ser tecnicamente aprovada? | Não aprova sem ler Issue e diff e comentar |
| Release/DevOps Manager | Existem condições para integrar à `main`? | Não faz merge com portão aberto |
| Documentation & Metrics Analyst | A rodada está rastreável? | — |
| Test Analyst / Product Validator | O comportamento esperado foi realmente observado? | Não aprova sem evidência reproduzível |

Autor do PR, Code Reviewer e Release/DevOps Manager precisam ser pessoas diferentes em toda rodada. Registrem quem ocupa cada papel em `docs/rodizio.md`.

## Fluxo obrigatório de cada rodada

1. Abram uma Issue (`.github/ISSUE_TEMPLATE/feature.md`) e escrevam critérios verificáveis, no formato Dado / Quando / Então.
2. Criem uma branch pequena e relacionada à Issue.
3. Usem o GitHub Copilot no VS Code para gerar a implementação, com o contexto e os critérios já aprovados pela equipe.
4. Registrem o diálogo com a fábrica em `docs/prompts/ISSUE-NN.md`.
5. Executem `npm run check` e confiram o `git diff` antes de comitar.
6. Abram um Pull Request com `Closes #NN` (o template já vem em `.github/pull_request_template.md`).
7. Aguardem o GitHub Actions e obtenham revisão substantiva de uma pessoa diferente do autor.
8. Façam merge somente com evidência suficiente, e preencham `docs/diario.md` com o aprendizado da rodada.

## Regras que não se negociam

1. **A equipe especifica antes de acionar a fábrica.** Sem Issue com critério, não existe prompt.
2. **Ninguém aprova o próprio Pull Request.**
3. **Todo diálogo com o Copilot é registrado** em `docs/prompts/`. Código sem registro não conta como evidência.
4. **A equipe responde pelo que faz merge.** "Foi a IA que escreveu" não é justificativa técnica.
5. **A esteira só endurece.** Um portão de qualidade, uma vez ligado, não volta a ser desligado.

## Estrutura

```
├── src/
│   ├── app.js            # apresentação / DOM
│   ├── store.js          # regra de negócio — candidata natural a teste unitário
│   └── styles.css
├── scripts/               # dev, lint e build — sem dependências externas
├── docs/
│   ├── prompts/           # diálogo com a fábrica, rodada a rodada (ISSUE-NN.md)
│   ├── rodizio.md          # quem ocupou qual papel em cada aula
│   └── diario.md           # uma entrada de aprendizado por aula
├── .github/
│   ├── workflows/quality-gate.yml
│   ├── ISSUE_TEMPLATE/feature.md
│   └── pull_request_template.md
├── index.html
└── package.json
```

`tests/` e `e2e/` ainda não existem — chegam a partir da aula 08, quando a esteira liga o próximo portão.

## A esteira de qualidade

Cada nível é um portão novo no CI, ligado na aula indicada. Marquem ✅ conforme forem ligados — nunca desliguem um já marcado.

| Nível | Aula | Portão | Estado |
|---:|---:|---|:---:|
| 0 | 03 | `lint` + `build` (Quality Gate 0) | ✅ |
| 1 | 04 | template de PR + 1 aprovação de terceiro | ⬜ |
| 2 | 08 | testes de aceitação no CI (`test:acceptance`) | ⬜ |
| 3 | 14 | cobertura mínima de 60% | ⬜ |
| 4 | 14 | `guard-tests` (separação de poderes) | ⬜ |
| 5 | 15 | testes E2E com Playwright | ⬜ |
| 6 | 15 | branch protection na `main` | ⬜ |
| 7 | 16 | commits convencionais + release | ⬜ |
| 8 | 16 | resumo de métricas no Pull Request | ⬜ |

> A equipe assina o que faz merge. "A IA escreveu" não é justificativa técnica.

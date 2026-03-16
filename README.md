# 🚀 Template: Setup Front-End (JS/TS)

Este é um template de configuração de ambiente focado em produtividade, padronização e qualidade de código para projetos Front-End.

Ele já vem pré-configurado com melhores práticas para garantir que o código seja formatado automaticamente, analisado contra más práticas e bloqueado de subir para o repositório se contiver erros.

## 🛠️ Ferramentas Inclusas

- **[TypeScript](https://www.typescriptlang.org/):** Tipagem estática rigorosa para evitar erros em tempo de execução.
- **[ESLint](https://eslint.org/):** Linter configurado para identificar problemas de sintaxe e más práticas.
- **[Prettier](https://prettier.io/):** Formatador de código opinativo para garantir um estilo visual único.
- **[EditorConfig](https://editorconfig.org/):** Mantém a consistência de estilos de codificação entre diferentes editores.
- **[Husky](https://typicode.github.io/husky/):** Gerenciador de Git Hooks para interceptar commits.
- **[lint-staged](https://github.com/okonet/lint-staged):** Executa o linter apenas nos arquivos modificados no "stage".

---

## ⚙️ Pré-requisitos

Certifique-se de ter o Node.js instalado em sua máquina (recomenda-se a versão LTS).

---

## 🚀 Como Começar

1. **Clone este repositório** (ou use-o como template no GitHub):

   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio

2. **Instale as dependências:**

   npm install

3. **Inicialize os hooks do Git (Husky):**

   npm run prepare

4. **Abra no Visual Studio Code:**

   code .

---

## 📂 Estrutura de Diretórios

    ├── .husky/                 # Configurações e scripts dos Git Hooks
    ├── .vscode/                # Configurações específicas para o Visual Studio Code
    ├── .editorconfig           # Regras globais de formatação para a IDE
    ├── .eslintignore           # Arquivos/pastas ignorados pelo ESLint
    ├── .eslintrc.json          # Regras do ESLint e integração com TS/Prettier
    ├── .gitignore              # Arquivos ignorados pelo Git
    ├── .prettierignore         # Arquivos ignorados pelo Prettier
    ├── .prettierrc             # Regras de formatação estéticas
    ├── package.json            # Dependências e scripts do projeto
    └── tsconfig.json           # Configurações do compilador TypeScript

---

## 📜 Scripts Disponíveis

- **npm run lint**: Varre todo o projeto em busca de erros lógicos ou de sintaxe.
- **npm run format**: Força a formatação de todos os arquivos suportados pelo Prettier.
- **npm run prepare**: Registra os hooks do Husky localmente.

---

## 🛡️ Como o fluxo de Commit funciona?

Para manter o repositório limpo, este projeto utiliza o padrão de **Pre-commit Hook**.

Toda vez que você rodar um `git commit`, o Husky vai interceptar a ação e acionar o `lint-staged`. Ele fará o seguinte automaticamente:

1. Rodar o **ESLint** tentando corrigir problemas simples automaticamente.
2. Rodar o **Prettier** para formatar o código que está sendo commitado.
3. Se o ESLint encontrar um erro grave que não possa ser corrigido de forma automática, o commit será bloqueado até que você corrija o código manualmente.

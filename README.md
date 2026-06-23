Markdown# 🎻 Controle da Setorizada de Cordas

Sistema sob medida para a gestão e acompanhamento pedagógico da setorizada de cordas (Violino, Viola, Violoncelo e Contrabaixo). O objetivo principal deste sistema é substituir as fichas de papel tradicionais por um fluxo digital ágil, focado no controle de presenças, histórico automático de passagens de lições/hinos e geração de relatórios estatísticos simplificados.

## 🚀 Funcionalidades da Versão 1 (MVP)
- **Cadastro de Usuários:** Gestão unificada de alunos e instrutores com mapeamento de instrumentos.
- **Chamada de Presença:** Registro rápido de quem compareceu a cada encontro em menos de 2 minutos.
- **Evolução Pedagógica:** Lançamento automático de passagens de métodos (lições) e hinos por tonalidades (`ENUM`).
- **Resumo Automatizado:** Geração de relatórios de fechamento formatados para partilha direta no WhatsApp.

## 🛠️ Tecnologias Utilizadas
- **Runtime:** Node.js
- **Framework Web:** Express
- **ORM:** Sequelize
- **Banco de Dados:** MySQL (Driver `mysql2`)
- **Variáveis de Ambiente:** Dotenv
- **Ferramenta de Desenvolvimento:** Nodemon

---

## 📦 Como Configurar e Executar o Projeto

### 1. Pré-requisitos
Antes de começar, certifique-se de que tem instalado na sua máquina:
- [Node.js](https://nodejs.org/) (Versão LTS recomendada)
- [MySQL](https://www.mysql.com/) rodando localmente (configurado na porta `3307` conforme o ambiente atual)

### 2. Clonar o Repositório e Instalar as Dependências
```bash
# Clone o repositório (substitua pelo link do seu repositório caso necessário)
git clone <url-do-seu-repositorio>

# Entre na pasta do projeto
cd setorizada-cordas-backend

# Instale todas as dependências necessárias
npm install
3. Configurar as Variáveis de Ambiente (.env)Crie um arquivo .env na raiz do projeto seguindo a estrutura abaixo (adicione as suas credenciais locais do MySQL):Snippet de códigoPORT=3000

DB_HOST=localhost
DB_PORT=3307
DB_USER=seu_usuario_mysql
DB_PASS=sua_senha_mysql
DB_NAME=setorizada_db
DB_DIALECT=mysql
⚠️ Nota: Certifique-se de criar a base de dados (Schema) vazia com o nome setorizada_db no seu MySQL antes de rodar a aplicação pela primeira vez.4. Executar em Ambiente de DesenvolvimentoA aplicação utiliza o nodemon para reiniciar o servidor automaticamente a cada alteração de código.Bashnpm run dev
O servidor iniciará por padrão em: http://localhost:3000/api🗄️ Estrutura do Banco de Dados (Modelos)O banco de dados é gerado e sincronizado automaticamente via Sequelize (sequelize.sync({ alter: true })), mapeando os seguintes relacionamentos:Usuario: Armazena alunos e instrutores distinguidos pela coluna tipo.Setorizada: Regista cada sessão/encontro realizado por data.Presenca: Tabela intermediária ($N:M$) que liga utilizadores e as setorizadas que frequentaram.Passagem: Regista a lição ou o hino validado, o tom (ENUM), a data e o instrutor que avaliou.📄 LicençaEste projeto é de uso interno e pedagógico.
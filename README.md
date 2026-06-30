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
- **Banco de Dados:** PostgreSQL (Driver `pg` e `pg-hstore`)
- **Variáveis de Ambiente:** Dotenv
- **Ferramenta de Desenvolvimento:** Nodemon

---

## 📦 Como Configurar e Executar o Projeto

### 1. Pré-requisitos
Antes de começar, certifique-se de que tem instalado na sua máquina:
- [Node.js](https://nodejs.org/) (Versão LTS recomendada)
- [PostgreSQL](https://www.postgresql.org/) rodando localmente (configurado na porta padrão `5432` ou na de sua preferência)

### 2. Clonar o Repositório e Instalar as Dependências
```bash
# Clone o repositório (substitua pelo link do seu repositório caso necessário)
git clone <url-do-seu-repositorio>

# Entre na pasta do projeto
cd setorizada-cordas-backend

# Instale todas as dependências necessárias
npm install
3. Configurar as Variáveis de Ambiente (.env)As credenciais de acesso ao banco de dados e as configurações do servidor não são enviadas ao repositório por motivos de segurança. Portanto, você precisa criar obrigatoriamente um arquivo chamado .env na raiz do projeto.Você pode copiar a estrutura de exemplo abaixo e colar dentro do seu novo arquivo .env, alterando com os dados do seu ambiente local:Snippet de códigoPORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario_postgres
DB_PASS=sua_senha_postgres
DB_NAME=setorizada_db
DB_DIALECT=postgres
⚠️ Nota: Certifique-se de criar a base de dados (Database) vazia com o nome setorizada_db no seu PostgreSQL antes de rodar a aplicação pela primeira vez.4. Executar em Ambiente de DesenvolvimentoA aplicação utiliza o nodemon para reiniciar o servidor automaticamente a cada alteração de código.Bashnpm run dev
O servidor iniciará por padrão em: http://localhost:3000/api🗄️ Estrutura do Banco de Dados (Modelos)O banco de dados é gerado e sincronizado automaticamente via Sequelize (sequelize.sync({ alter: true })), mapeando os seguintes relacionamentos:Usuario: Armazena alunos e instrutores distinguidos pela coluna tipo.Setorizada: Registra cada sessão/encontro realizado por data.Presenca: Tabela intermediária ($N:M$) que liga os usuários e as setorizadas que frequentaram.Passagem: Registra a lição ou o hino validado, o tom (ENUM), a data e o instrutor que avaliou.📄 LicençaEste projeto é de uso interno e pedagógico.
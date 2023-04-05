<div align="center">
  <img width="450px" src="https://raw.githubusercontent.com/jhonatanffelipe/quizup-backend/main/src/assets/logoWhite.png" />
  <br/>
  <br/>
</div>

<p align="center">
   <img alt="Tecnologias" src="https://img.shields.io/github/languages/count/jhonatanffelipe/quizup-backend?color=04a1c1">
   <img alt="Tamanho do repositório" src="https://img.shields.io/github/repo-size/jhonatanffelipe/quizup-backend?color=04a1c1">
   <img alt="Ultimo commit no Github" src="https://img.shields.io/github/last-commit/jhonatanffelipe/quizup-backend?color=04a1c1">
   <img alt="Criado por" src="https://img.shields.io/badge/made%20by-jhonatanffelipe-%20?color=04a1c1">
   <img alt="Linguagens mais usadas no programa" src="https://img.shields.io/github/languages/top/jhonatanffelipe/quizup-backend?color=04a1c1">
</p>

# :rocket: Sobre o projeto

O QuizUp é uma plataforma de criação e aplicação de questões para professores, projetada para otimizar a administração de trabalhos escolares e desafios para alunos. Com esta ferramenta, os professores podem criar questões personalizadas para seus alunos, incluindo perguntas de múltipla escolha, verdadeiro ou falso, correspondência, preenchimento de lacunas, entre outros formatos.

A plataforma é intuitiva e fácil de usar, permitindo que os professores criem e personalizem as questões em poucos minutos. Eles também podem programar a data e o horário de início e término das atividades para seus alunos, bem como selecionar a turma ou grupos específicos de alunos para receber as questões.

Os alunos, por sua vez, podem acessar as questões por meio de um aplicativo móvel ou de uma interface web. Eles podem responder as questões no próprio dispositivo, e a plataforma fará a correção automaticamente, o que ajuda a economizar tempo para os professores.

Além disso, a plataforma oferece recursos adicionais para tornar o processo de aprendizado mais divertido e desafiador, incluindo pontos e classificações para alunos, badges por conquistas e leaderboard para incentivar a competição saudável entre os estudantes. Esses recursos também ajudam a aumentar o engajamento dos alunos na atividade.

Em resumo, este aplicativo é uma ferramenta completa e eficiente para professores que desejam otimizar a administração de trabalhos escolares e desafios para alunos, tornando o processo mais divertido, desafiador e fácil de gerenciar.
      
# Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Javacript](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/First_steps/What_is_JavaScript)
- [Docker](https://www.docker.com/)
- [Postgres](https://www.postgresql.org/)
- [Knex](https://knexjs.org/)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [Celebrate](https://www.npmjs.com/package/celebrate)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Moment.js](https://momentjs.com/)
- [Cors](https://www.npmjs.com/package/cors)
- [express-async-errors](https://www.npmjs.com/package/express-async-errors)
- [Handlebars](https://handlebarsjs.com/)
- [Multer](https://www.npmjs.com/package/multer)
- [@aws-sdk/client-s3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/index.html)
- [aws-sdk](https://www.npmjs.com/package/aws-sdk)
- [nodemailer](https://www.npmjs.com/package/nodemailer)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)

# Executando a aplicação

Para executar esta aplicação, siga os seguintes passos:

- Clone o repositório:

  ```bash
  git clone https://github.com/jhonatanffelipe/quizup-backend.git

  ```

- Com o repositório clonado, acesse o diretório raiz do projeto e digite code . para abrir o projeto no VS Code.

- Crie um arquivo .env utilizando como base o modelo fornecido no arquivo modelo.env.

- Crie o banco de dados, de acordo com as configurações fornecidas no arquivo knexfile.js.

- Instale as dependências do projeto:

  ```bash
  # Baixar dependências
  yarn
  ```

- Após a conclusão da instalação das dependências, execute a aplicação com o seguinte comando:

  ```bash
  # Executar a aplicação
  yarn dev
  ```

- Com os bancos de dados e a aplicação rodando, criei as tabelas no banco e dados com o comando:

  ```bash
  # Criar tabelas
  knex migrate:latest
  ```

- Em seguida, abra o banco de dados e no schema public, adicione a extenção uuid-ossp;

  ```bash
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  ```

- Após a conclusão, insira os dados iniciais do sista, executando:
  ```bash
  # Criar tabelas
  knex seed:latest
  ```


Com estes passos concluídos, a aplicação estará em execução e pronta para ser utilizada.

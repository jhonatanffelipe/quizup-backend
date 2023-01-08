// Exemplo de seed, essão fará nada na aplicação

exports.seed = async knex => {
  await knex('categories');
  //   await knex('categories').del()
  //     .then(async () => {
  //       await knex('categories').insert([
  //         { description: 'Artes' },
  //         { description: 'Biografia' },
  //         { description: 'Biologia' },
  //         { description: 'Espanhol' },
  //         { description: 'Filosofia' },
  //         { description: 'Física' },
  //         { description: 'Geografia' },
  //         { description: 'Gramática' },
  //         { description: 'História' },
  //         { description: 'Inglês' },
  //         { description: 'Literatura' },
  //         { description: 'Matemática' },
  //         { description: 'Português' },
  //         { description: 'Química' },
  //         { description: 'Redação' },
  //       ]);
  //     });
};

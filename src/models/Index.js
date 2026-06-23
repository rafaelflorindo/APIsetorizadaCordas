const Usuario = require('./Usuario');
const Setorizada = require('./Setorizada');
const Presenca = require('./Presenca');
const Passagem = require('./Passagem');

// --- Relacionamentos de Presença (Muitos para Muitos entre Usuário e Setorizada) ---
// Uma Setorizada tem muitas presenças de Usuários
Setorizada.hasMany(Presenca, { foreignKey: 'setorizada_id', as: 'presencas' });
Presenca.belongsTo(Setorizada, { foreignKey: 'setorizada_id', as: 'setorizada' });

// Um Usuário (Aluno/Instrutor) tem muitas presenças acumuladas
Usuario.hasMany(Presenca, { foreignKey: 'usuario_id', as: 'presencas' });
Presenca.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });


// --- Relacionamentos de Passagem (Evolução Pedagógica) ---
// Uma Passagem obrigatoriamente pertence a um Aluno (vinculado à tabela Usuario)
Usuario.hasMany(Passagem, { foreignKey: 'aluno_id', as: 'passagensAluno' });
Passagem.belongsTo(Usuario, { foreignKey: 'aluno_id', as: 'aluno' });

// Uma Passagem foi avaliada por um Instrutor (também vinculado à tabela Usuario)
Usuario.hasMany(Passagem, { foreignKey: 'instrutor_id', as: 'passagensAvaliadas' });
Passagem.belongsTo(Usuario, { foreignKey: 'instrutor_id', as: 'instrutor' });


module.exports = {
  Usuario,
  Setorizada,
  Presenca,
  Passagem
};
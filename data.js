const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
  salvaDados(curso, tempoEstudado) {
    let arquivoDoCurso = __dirname + '/data/' + curso + '.json';
    if (fs.existsSync(arquivoDoCurso)) {
      
    }
    else {
      this.criarArquivoDeCurso(arquivoDoCurso, {})
        .then(() => {
          
        });
    }
  },
  criarArquivoDeCurso(nomeArquivo, conteudoArquivo) {
    return jsonfile.writeFile(nomeArquivo, conteudoArquivo)
      .then(() => {
        console.log('Arquivo criado');
      }).catch((err) => {
        console.log(err);
      });
  }
}
const MaoDeObraEngine = {

  custoHora(funcionario) {
    const encargos = funcionario.salario * (funcionario.encargos / 100);
    const total = funcionario.salario + encargos;
    return total / funcionario.horasMensais;
  },

  custoProduto(funcionariosProduto) {
    return funcionariosProduto.reduce((total, f) => {
      return total + (this.custoHora(f) * f.tempoProduto);
    }, 0);
  }

};
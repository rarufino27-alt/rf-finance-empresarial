const ResultadoEngine = {

  calcular() {
    const vendas = DataManager.get("vendas") || [];
    const funcionarios = DataManager.get("funcionarios") || [];

    const receita = vendas.reduce((t, v) => t + v.precoVenda, 0);
    const custoProdutos = vendas.reduce((t, v) => t + v.custoProduto, 0);
    const impostos = vendas.reduce((t, v) => t + v.imposto, 0);

    const custoFuncionarios = funcionarios.reduce((t, f) => {
      const encargos = f.salario * (f.encargos / 100);
      return t + f.salario + encargos;
    }, 0);

    const resultado = receita - custoProdutos - impostos - custoFuncionarios;

    return {
      receita,
      custoProdutos,
      impostos,
      custoFuncionarios,
      resultado,
      status:
        resultado > 0 ? "lucro" :
        resultado < 0 ? "prejuizo" :
        "empate"
    };
  }

};
const RelatoriosEngine = {

  mensal(ano, mes) {
    const vendas = DataManager.get("vendas") || [];

    const inicio = new Date(ano, mes, 1);
    const fim = new Date(ano, mes + 1, 0, 23, 59, 59);

    const filtradas = vendas.filter(v => {
      const d = new Date(v.data);
      return d >= inicio && d <= fim;
    });

    const receita = filtradas.reduce((t, v) => t + v.precoVenda, 0);
    const custoProdutos = filtradas.reduce((t, v) => t + v.custoProduto, 0);
    const impostos = filtradas.reduce((t, v) => t + v.imposto, 0);
    const lucro = filtradas.reduce((t, v) => t + v.lucro, 0);

    return {
      totalVendas: filtradas.length,
      receita,
      custoProdutos,
      impostos,
      lucro,
      status:
        lucro > 0 ? "lucro" :
        lucro < 0 ? "prejuizo" :
        "empate"
    };
  }

};
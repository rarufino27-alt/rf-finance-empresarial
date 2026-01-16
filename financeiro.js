const Financeiro = {

  custoFixoMensal() {
    const fixos = DataManager.get("custos.fixos") || [];
    return fixos.reduce((t, c) => t + Number(c.valor), 0);
  },

  custoVariavelProduto(produto) {
    return (
      Number(produto.custoCompra || 0) +
      Number(produto.frete || 0) +
      Number(produto.impostosCompra || 0) +
      Number(produto.perdas || 0)
    );
  },

  custoTotalProduto(produto) {
    return this.custoVariavelProduto(produto);
  },

  precoVenda(produto, margemPercentual) {
    const custo = this.custoTotalProduto(produto);
    const margem = margemPercentual / 100;
    return custo / (1 - margem);
  },

  lucroPorProduto(produto, precoVenda) {
    return precoVenda - this.custoTotalProduto(produto);
  },

  pontoEquilibrio() {
    const fixo = this.custoFixoMensal();
    const vendas = DataManager.get("vendas") || [];

    const margemTotal = vendas.reduce((t, v) => t + v.lucro, 0);
    return margemTotal > 0 ? fixo / margemTotal : 0;
  }

precoMinimo(produto) {
  return this.custoTotalProduto(produto);
},

precoIdeal(produto, margemPercentual) {
  const custo = this.custoTotalProduto(produto);
  return custo / (1 - margemPercentual / 100);
},

lucroUnitario(produto, precoVenda) {
  return precoVenda - this.custoTotalProduto(produto);
}

resultadoGeral() {
  const vendas = DataManager.get("vendas") || [];
  const custoFixo = this.custoFixoMensal();

  const faturamento = vendas.reduce((t, v) => t + v.precoVenda, 0);
  const lucroProdutos = vendas.reduce((t, v) => t + v.lucro, 0);

  const resultado = lucroProdutos - custoFixo;

  return {
    faturamento,
    custoFixo,
    lucroProdutos,
    resultado,
    status:
      resultado > 0 ? "lucro" :
      resultado < 0 ? "prejuizo" :
      "empate"
  };
}
};
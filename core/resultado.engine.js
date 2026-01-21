const ResultadoEngine = {

  sugerirPreco(produto, margem) {
    const custo = CustosEngine.custoReal(produto);
    const imposto = ImpostosEngine.impostoVenda(custo);
    return (custo + imposto) / (1 - margem / 100);
  }

};
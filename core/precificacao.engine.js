const PrecificacaoEngine = {

  calcular(produto, margemPercentual) {
    const custo = CustosEngine.custoReal(produto);
    const regime = DataManager.get("empresa.regime");

    let impostoPercentual = 0;

    if (regime === "simples") {
      impostoPercentual =
        (DataManager.get("empresa.aliquotaSimples") || 0) / 100;
    }

    const margem = margemPercentual / 100;

    const precoMinimo = custo / (1 - impostoPercentual);
    const precoIdeal = custo / (1 - margem - impostoPercentual);

    const impostoValor = precoIdeal * impostoPercentual;
    const lucroUnitario = precoIdeal - custo - impostoValor;

    return {
      custo: custo,
      impostoPercentual: impostoPercentual * 100,
      impostoValor,
      precoMinimo,
      precoIdeal,
      lucroUnitario
    };
  }

};
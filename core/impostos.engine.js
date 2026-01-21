const ImpostosEngine = {

  impostoVenda(precoVenda) {
    const regime = DataManager.get("empresa.regime");

    if (regime === "mei") {
      return 0; // MEI não paga imposto por venda, só DAS mensal
    }

    if (regime === "simples") {
      const aliquota = DataManager.get("empresa.aliquotaSimples") || 6;
      return precoVenda * (aliquota / 100);
    }

    return 0;
  }

};
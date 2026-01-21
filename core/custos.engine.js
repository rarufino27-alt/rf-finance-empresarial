const CustosEngine = {

  custoReal(produto) {
    return (
      produto.custoBase +
      produto.frete +
      produto.perdas +
      produto.embalagem +
      produto.maoDeObra
    );
  }

};
const MercadoEngine = {

  precoReferencia(categoria) {
    // base interna por enquanto
    const base = {
      padrao: { min: 50, max: 120 }
    };

    return base[categoria] || base.padrao;
  }

};
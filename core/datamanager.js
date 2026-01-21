const DataManager = {
  data: {
    empresa: {
      regime: null, // mei | simples
      tipo: null    // comercio | industria
    },
    funcionarios: [],
    produtos: [],
    vendas: []
  },

  init() {
    const saved = localStorage.getItem("rf_finance");
    if (saved) this.data = JSON.parse(saved);
  },

  save() {
    localStorage.setItem("rf_finance", JSON.stringify(this.data));
  },

  get(path) {
    return path.split(".").reduce((o, k) => o?.[k], this.data);
  },

  set(path, value) {
    const keys = path.split(".");
    let obj = this.data;
    keys.slice(0, -1).forEach(k => {
      if (!obj[k]) obj[k] = {};
      obj = obj[k];
    });
    obj[keys[keys.length - 1]] = value;
    this.save();
  },

  push(path, value) {
    const arr = this.get(path) || [];
    arr.push(value);
    this.set(path, arr);
  }
};

DataManager.init();
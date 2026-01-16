const DataManager = {
  data: {
    empresa: {},
    custos: {
      fixos: [],
      variaveis: []
    },
    produtos: [],
    vendas: []
  },

  init() {
    const saved = Storage.get("rf_finance_data");
    if (saved) this.data = saved;
  },

  save() {
    Storage.set("rf_finance_data", this.data);
  },

  get(path) {
    return path.split(".").reduce((obj, key) => obj?.[key], this.data);
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
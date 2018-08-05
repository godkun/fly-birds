//变量缓存器，方便我们在不同的类中访问和修改变量
export class DataStore {
  static getInstace() {
    if (!DataStore.instacne) {
      DataStore.instacne = new DataStore()
    }
    return DataStore.instacne
  }

  constructor() {
    // 使用 map进行缓存
    this.map = new Map()
  }

  put(key, value) {
    // 如果value是类，返回值\
    if (typeof value === 'function') {
      value = new value()
    }
    this.map.set(key, value)
    return this
  }

  get(key) {
    return this.map.get(key)
  }

  destroy() {
    for(let value of this.map.values()) {
        value = null
    }
  }
}
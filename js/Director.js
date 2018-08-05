import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {DataStore} from "./base/DataStore.js";
export class Director {
  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director()
    }
    return Director.instance
  }
  constructor() {
    // 获取缓存器中的数据
    this.dataStore = DataStore.getInstace()
  }
  // 开始执行动画


}
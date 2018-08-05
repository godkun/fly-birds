import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {DataStore} from "./js/base/DataStore";

export class Main {
  constructor() {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.dataStore = DataStore.getInstace()
    const loader = ResourceLoader().create()
    loader.onLoaded(map => this.onResourceFirstLoaded(map))
  }

  // 将各种变量存到缓存器类里面
  onResourceFirstLoaded(map) {
    // 需要长期保存的放在类的变量中
    // 需要实时销毁的放在map中
    this.dataStore.canvas = this.canvas
    this.dataStore.ctx = this.ctx
    this.dataStore.res = map
    this.init()
  }

  init() {

  }

}
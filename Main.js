// 游戏开始的入口
import {ResourceLoader} from './js/base/ResourceLoader.js';
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Director} from "./js/Director.js";
import {Land} from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";

export class Main {
  constructor() {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.dataStore = DataStore.getInstace()
    this.director = Director.getInstance()
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
    this.director.isGameOver = false
    this.dataStore
      .put('pencils', [])
      .put('background', Background)
      .put('land', Land)
      .put('birds', Birds)
      .put('score', Score)
      .put('startButton', StartButton);
    this.registerEvent()
    this.director.createPencil()
    this.director.run()
  }

  registerEvent() {
    this.canvas.addEventListener('touchstart', event => {
      event.preventDefault()
      if (!this.director.isGameOver) {
        console.log('游戏开始')
        this.init()
      } else {
        this.director.birdsEvent()
      }
    })
  }
}
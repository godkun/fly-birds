//初始化整个游戏的精灵，作为游戏开始的入口
import {ResourceLoader} from "./js/base/ResourceLoader.js";
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
    // this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    this.dataStore = DataStore.getInstance();
    this.director = Director.getInstance();
    const loader = ResourceLoader.create();
    loader.onLoaded(map => this.onResourceFirstLoaded(map));
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
    //首先重置游戏是没有结束的
    this.director.isGameOver = false;
    this.dataStore
      .put('pencils', [])
      .put('background', BackGround)
      .put('land', Land)
      .put('birds', Birds)
      .put('score', Score)
      .put('startButton', StartButton);
    this.registerEvent();
    //创建铅笔要在游戏逻辑运行之前
    this.director.createPencil();
    this.director.run();
  }


  registerEvent() {
    this.canvas.addEventListener('touchstart', e => {
      //屏蔽掉JS的事件冒泡
      e.preventDefault();
      if (this.director.isGameOver) {
        console.log('游戏开始');
        this.init();
      } else {
        this.director.birdsEvent();
      }
    });

    // wx.onTouchStart(() => {
    //     if (this.director.isGameOver) {
    //         console.log('游戏开始');
    //         this.init();
    //     } else {
    //         this.director.birdsEvent();
    //     }
    // });
  }
}
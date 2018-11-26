/**
 * @author yangkun
 * @date 2018/8/6
 * @Descripton: 初始化整个游戏的精灵，作为游戏开始的入口
 */
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {StartButton} from "./js/player/StartButton.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Birds} from "./js/player/Birds.js";
import {Score} from "./js/player/Score.js";
import {Land} from "./js/runtime/Land.js";
import {Director} from "./js/Director.js";

export class Main {
  constructor() {
    // 初始化canvas
    // this.canvas = document.getElementById('canvas')
    this.canvas = wx.createCanvas()
    // 取到canvas 2d 上下文
    this.ctx = this.canvas.getContext('2d');
    // 单例
    this.dataStore = DataStore.getInstance();
    // 单例
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
    // 初始化游戏
    this.init()
  }

  init() {
    //首先重置游戏是没有结束的
    this.director.isGameOver = false;
    // 初始化各种游戏元素
    this.dataStore
      .put('pencils', [])
      .put('background', BackGround)
      .put('land', Land)
      .put('birds', Birds)
      .put('score', Score)
      .put('startButton', StartButton);
    // 注册touch事件
    this.registerEvent();
    //创建铅笔要在游戏逻辑运行之前
    this.director.createPencil();
    // 开始绘画
    this.director.run();
  }


  registerEvent() {
    wx.onTouchStart(() => {
      if (this.director.isGameOver) {
        console.log('游戏开始');
        this.init();
      } else {
        this.director.birdsEvent();
      }
    });
  }

}
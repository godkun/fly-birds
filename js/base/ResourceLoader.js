import {Resources} from "./Resources.js"

export class ResourceLoader {
  /**
   * @author yangkun
   * @date 2018/8/5
   * @Descripton: 构造函数，将键值对数组转换成map形式，并重写map格式中的value
   * @param
   */
  constructor() {
    this.map = new Map(Resources);
    for (let [key, value] of this.map) {
      console.log(key)
      // wx.createImage()
      const image = new Image()
      image.src = value
      this.map.set(key, value)
    }
  }
  
  onLoaded() {
    let loaderCount = 0;
    for(let value of this.map.values()) {
        value.onload = () => {
          loaderCount ++;
          if (loaderCount >= this.map.size) {
            callback(this.map)
          }
        }
    }
  }
  
  static create() {
    return new ResourceLoader()
  }
}
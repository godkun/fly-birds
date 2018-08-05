import {Resources} from "./Resources.js";

export class ResourceLoad {
  /**
   * @author yangkun
   * @date 2018/8/5
   * @Descripton: 构造函数，将键值对数组转换成map形式，并重写map格式中的value
   * @param
  */
  constructor() {
   this.map = new Map(Resources);
   for(let [key, value] of this.map) {
     // wx.createImage()
     const image = new Image();
     image.src = value;
     this.map.set(key, value)
   }
  }
}

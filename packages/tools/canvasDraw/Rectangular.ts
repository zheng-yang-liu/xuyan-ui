import graph from "./Graph"
/**
 * 表示矩形的类。
 */
export default class Rectangular extends graph{
  /**
   * 绘制矩形。
   */
  draw():void {
    this._ctx.beginPath();
    this._ctx.moveTo(this.minX * this._dpi, this.minY * this._dpi);
    this._ctx.lineTo(this.maxX * this._dpi, this.minY * this._dpi);
    this._ctx.lineTo(this.maxX * this._dpi, this.maxY * this._dpi);
    this._ctx.lineTo(this.minX * this._dpi, this.maxY * this._dpi);
    this._ctx.lineTo(this.minX * this._dpi, this.minY * this._dpi);
    this._ctx.fillStyle = this._color;
    this._ctx.fill();

    // 绘制边框
    this._ctx.strokeStyle = "rgba(255,255,255,1)";
    this._ctx.lineWidth = 3;
    this._ctx.lineCap = "square";
    this._ctx.stroke();
  }

  /**
   * 检查一个点是否在矩形内部。
   * @param x - 点的 X 坐标。
   * @param y - 点的 Y 坐标。
   * @return 如果点在矩形内部，返回 true，否则返回 false。
   */
  isInside(x:number, y:number):boolean {
    return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
  }
}

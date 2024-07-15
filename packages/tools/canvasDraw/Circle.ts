import graph from"./graph"

export default class circle extends graph{
  /**
   * 绘制圆形。
   */
  draw():void {
    const width: number = this.maxX-this.minX;
    const height: number = this.maxY-this.minY;

    const minEdge: number = Math.min(width,height);

    this._ctx.beginPath();
    this._ctx.arc(
      (this.minX+width/2)*this._dpi,
      (this.minY+height/2)*this._dpi,
      (minEdge/2)*this._dpi,
      0,
      2*Math.PI
    );
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
   * @param {number} x - 点的 X 坐标。
   * @param {number} y - 点的 Y 坐标。
   * @return {boolean} 如果点在矩形内部，返回 true，否则返回 false。
   */
  isInside(x:number, y:number):boolean {
    const width: number = this.maxX-this.minX;
    const height: number = this.maxY-this.minY;

    const minEdge: number = Math.min(width,height);

    const centerX: number = this.minX+width/2;
    const centerY: number = this.minY+height/2;

    return Math.pow(x-centerX,2)+Math.pow(y-centerY,2)<=Math.pow(minEdge/2,2);
  }
}
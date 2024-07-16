import Graph from "./Graph"

// 三角形
export default class Triangle extends Graph{
  //用于绘制图形
  draw(){
    const vertexX = (this.maxX - this.minX) / 2;
    this._ctx.beginPath();
    this._ctx.moveTo(this.maxX*this._dpi,this.maxY*this._dpi);
    this._ctx.lineTo((this.minX+vertexX)*this._dpi,this.minY*this._dpi);
    this._ctx.lineTo(this.minX*this._dpi,this.maxY*this._dpi);
    this._ctx.lineTo(this.maxX*this._dpi,this.maxY*this._dpi);
    this._ctx.fillStyle = this._color;
    this._ctx.fill();

    // 绘制边框
    this._ctx.strokeStyle = "rgba(255,255,255,1)";
    this._ctx.lineWidth = 3;
    this._ctx.lineCap = "square";
    this._ctx.stroke();
  }
  //用于判断是否在图形内
  isInside(x: number, y: number): boolean {
    const vertexX = (this.maxX - this.minX) / 2;
    const A = [this.maxX, this.maxY];
    const B = [this.minX + vertexX, this.minY];
    const C = [this.minX, this.maxY];

    // 向量叉积函数
    const crossProduct = (v1: number[], v2: number[]): number => {
      return v1[0] * v2[1] - v1[1] * v2[0];
    };

    // 点到顶点的向量
    const vectorPA = [A[0] - x, A[1] - y];
    const vectorPB = [B[0] - x, B[1] - y];
    const vectorPC = [C[0] - x, C[1] - y];

    // 向量叉积
    const cross1 = crossProduct(vectorPA, vectorPB);
    const cross2 = crossProduct(vectorPB, vectorPC);
    const cross3 = crossProduct(vectorPC, vectorPA);

    // 判断叉积符号是否一致
    const isSameSign = (a: number, b: number, c: number): boolean => {
      return (a >= 0 && b >= 0 && c >= 0) || (a <= 0 && b <= 0 && c <= 0);
    };

    return isSameSign(cross1, cross2, cross3);
  }

}
/**
 * 表示图形的总类。
 */
export default class Graph {
  protected _color: string;
  private _startX: number;
  private _startY: number;
  private _endX: number;
  private _endY: number;
  protected _ctx: CanvasRenderingContext2D;
  private readonly _vasWidth: number;
  private readonly _vasHeight: number;
  protected _dpi: number;
  /**
   * 构造函数 - 创建一个图形。
   * @param color - 图形的颜色。
   * @param startX - 起始的 X 坐标。
   * @param startY - 起始的 Y 坐标。
   * @param ctx - 绘图上下文。
   * @param width - 画布的宽度。
   * @param height - 画布的高度。
   * @param dpi - DPI 缩放系数。
   */
  constructor(
    color:string,
    startX:number,
    startY:number,
    ctx:CanvasRenderingContext2D,
    width:number,
    height:number,
    dpi:number
  ) {
    this._color = color;
    this._startX = startX;
    this._startY = startY;
    this._endX = startX;
    this._endY = startY;
    this._ctx = ctx;
    this._vasWidth = width;
    this._vasHeight = height;
    this._dpi = dpi;
  }

  get minX(): number {
    return Math.min(this._startX, this._endX);
  }

  get maxX(): number {
    return Math.max(this._startX, this._endX);
  }

  get minY(): number {
    return Math.min(this._startY, this._endY);
  }

  get maxY(): number {
    return Math.max(this._startY, this._endY);
  }

  /**
   * 设置终止的 X 坐标。
   * @param value - 新的终止 X 坐标。
   */
  set endX(value:number) {
    this._endX = Math.min(Math.max(0, value), this._vasWidth);
  }

  /**
   * 设置终止的 Y 坐标。
   * @param value - 新的终止 Y 坐标。
   */
  set endY(value:number) {
    this._endY = Math.min(Math.max(0, value), this._vasHeight);
  }

  /**
   * 移动图形。
   * @param moveX - 在 X 方向上的移动量。
   * @param moveY - 在 Y 方向上的移动量。
   */
  moveGraph(moveX:number, moveY:number):void {
    if (
      this.minX + moveX >= 0 &&
      this.maxX + moveX <= this._vasWidth &&
      this.minY + moveY >= 0 &&
      this.maxY + moveY <= this._vasHeight
    ) {
      this._startX += moveX;
      this._startY += moveY;
      this._endX += moveX;
      this._endY += moveY;
    }
  }

  /**
   * 绘制图形。
   */
  // draw():void {}

  /**
   * 检查一个点是否在图形内部。
   * @param x - 点的 X 坐标。
   * @param y - 点的 Y 坐标。
   * @return 如果点在图形内部，返回 true，否则返回 false。
   */
  // isInside(x:number, y:number):boolean {}
}

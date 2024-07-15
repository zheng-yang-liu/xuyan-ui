import Rectangular from "./Rectangular"
import Circle from "./Circle"
export default class DrawGraph {
  private _canvas: HTMLCanvasElement;
  private readonly _ctx: CanvasRenderingContext2D;
  private _width: number;
  private _height: number;
  private _canvasBG: string;
  private readonly _dpi: number;
  private _ifDraw: boolean;
  private _shape: any[];
  private _graphColor: string;
  private _customShape: Object;
  private _currentGraph: string;
  /**
   * 构造函数 - 创建一个绘图对象。
   * @param canvas - 画布元素。
   * @param ctx - 画布上下文。
   */
  constructor(
    canvas:HTMLCanvasElement,
    ctx:CanvasRenderingContext2D
  ) {
    this._canvas = canvas;
    this._ctx = ctx;
    this._width = 800;
    this._height = 600;
    this._canvasBG = "#191919";
    this._dpi = window.devicePixelRatio || 1;
    this._ifDraw = false;
    this._shape = [];
    this._graphColor = "#b5b5b5";
    this._customShape = {Rectangular:Rectangular,Circle:Circle};
    this._currentGraph = "Rectangular";
  }
  /**
   * 根据坐标获取图形。
   * @param x - X 坐标。
   * @param y - Y 坐标。
   * @return 如果找到图形，返回图形对象，否则返回 null。
   */
  getGraph(x:number, y:number):any {
    for (let i = this._shape.length - 1; i >= 0; i--) {
      const s = this._shape[i];
      if (s.isInside(x, y)) {
        return s;
      }
    }
    return null;
  }

  /**
   * 绘制图形。
   */
  drawShape():void {
    requestAnimationFrame(()=>this.drawShape());

    if (this._ifDraw) {
      this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
      this._ctx.fillStyle = this._canvasBG;
      this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
      for (const item of this._shape) {
        item.draw();
      }
    }
  }
  /**
   * canvas是否被点击
   * @param e - 鼠标事件
   */
  isCanvasDown = (e:MouseEvent):void => {
    const rect = this._canvas.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
      return;
    }
    const startx:number = e.clientX - rect.left;
    const starty:number = e.clientY - rect.top;
    const ifMove = this.getGraph(startx, starty);
    if (ifMove) {
      //将ifMove移动到_shape的最后 --问题ctrl+z会删除当前点击的最后一个元素
      // const index = this._shape.indexOf(ifMove);
      // this._shape.splice(index, 1);
      // this._shape.push(ifMove);

      let tempX = startx;
      let tempY = starty;
      this._ifDraw = true;
      window.onmousemove = (e) => {
        const disX = e.clientX - rect.left;
        const disY = e.clientY - rect.top;
        ifMove.moveGraph(disX - tempX, disY - tempY);
        tempX = disX;
        tempY = disY;
      }
    } else {
      // @ts-ignore
      const graph = new this._customShape[this._currentGraph](
        this._graphColor,
        startx,
        starty,
        this._ctx,
        this._width,
        this._height,
        this._dpi
      )
      this._shape.push(graph);
      this._ifDraw = true;
      window.onmousemove = (e:MouseEvent):void => {
        graph.endX = e.clientX - rect.left;
        graph.endY = e.clientY - rect.top;
      }
    }
    window.onmouseup = ():void => {
      window.onmousemove = null;
      window.onmouseup = null;
      this._ifDraw = false;
    }

  }
  /**
   * 初始化绘图
   * @param width - 画布宽度
   * @param height - 画布高度
   * @param canvasBG - 画布背景颜色
   * @param graphColor - 图形颜色
   */
  init(width:number, height:number, canvasBG:string,graphColor:string):void {
    this._width = width || this._width;
    this._height = height || this._height;
    this._canvasBG = canvasBG || this._canvasBG;
    this._graphColor = graphColor || this._graphColor;

    this._canvas.width = this._width * this._dpi;
    this._canvas.height = this._height * this._dpi;
    this._canvas.style.width = `${this._width}px`;
    this._canvas.style.height = `${this._height}px`;
    this._ctx.fillStyle = this._canvasBG;
    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    this._canvas.onmousedown = (e:MouseEvent):void => {
      this.isCanvasDown(e);
    }
    window.onkeydown = (e:KeyboardEvent):void => {
      if (e.ctrlKey && (e.key === "z" || e.key === 'Z')) {
        this._shape.pop();
        this._ifDraw = true;
      }
    }
    window.onkeyup = ():void => {
      this._ifDraw = false;
    }
  }
  /**
   * 销毁绘图
   */
  destruction():void{
    this._canvas.onmousedown = null;
    window.onkeydown = null;
    window.onkeyup = null;
    this._shape = [];
  }
  /**
   * 设置自定义图形
   * @param customShape - 自定义图形
   * */
  setShape(customShape:Object):void{
   this._customShape = {
     ...customShape,
     ...this._customShape
   }
  }
  /**
   * 设置当前图形
   * @param currentGraph - 当前图形
   * */
  setCurrentGraph(currentGraph:string):void{
    this._currentGraph = currentGraph;
  }
  /**
   * 改变填充颜色
   *@param graphColor - 填充颜色
   */
  changeGraphColor(graphColor:string):void{
    this._graphColor = graphColor;
  }
}
import { Entity, Thing, Composable } from '../../state.js';

type DrawFn = (x: number, y: number, comp: Composable) => void;
interface DrawItem {
   [key: string]: DrawFn;
   fallback: DrawFn;
}
type MakeDrawItem = (ctx: CanvasRenderingContext2D) => DrawItem;

const drawItem: MakeDrawItem = (ctx: CanvasRenderingContext2D) => ({
   [Entity.Meat]: (x, y, comp) => {
      ctx.fillStyle = `rgb(${10 * (comp.baked * 5)}, ${10 * (comp.cutted * 5)}, ${100})`;
      ctx.fillRect(x * 26, y * 26, 10, 10);
   },
   [Entity.Bun]: (x, y, comp) => {
      ctx.fillStyle = `rgb(${10 * (comp.baked * 5)}, ${10 * (comp.cutted * 5)}, ${100})`;
      ctx.fillRect(x * 26 + 10, y * 26, 10, 10);
   },
   fallback: (x, y, comp) => {
      ctx.fillStyle = `rgb(${10 * (comp.baked * 5)}, ${10 * (comp.cutted * 5)}, ${100})`;
      ctx.fillRect(x * 26, y * 26 + 10, 10, 10);
   }
});

const drawItems = (items: Thing[]) => (ctx: CanvasRenderingContext2D) => {
   const draw = drawItem(ctx);
   items.forEach(item => {
      item.is.forEach((comp: Composable) => {
         (draw[comp.entity] || draw.fallback)(item.x, item.y, comp)
      });
   });
   return ctx;
}

export default drawItems;

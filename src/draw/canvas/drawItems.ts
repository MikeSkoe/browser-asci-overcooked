import { Entity, Thing, Composable } from '../../state.js';

type DrawFn = (x: number, y: number, comp: Composable) => void;
interface DrawItem {
   [key: string]: DrawFn;
   fallback: DrawFn;
}
type MakeDrawItem = (ctx: CanvasRenderingContext2D) => DrawItem;

const drawItem: MakeDrawItem = (ctx: CanvasRenderingContext2D) => ({
   [Entity.Meet]: (x, y, comp) => {
      ctx.fillStyle =
         comp.cutted === 5
            ? `rgb(250, 250, 250)`
            : `rgb(220, 220, 220)`;
      ctx.fillRect(x * 20, y * 20, 10, 10);
   },
   [Entity.Bun]: (x, y, comp) => {
      ctx.fillStyle =
         comp.cutted === 5
            ? `rgb(250, 50, 250)`
            : `rgb(220, 20, 220)`;
      ctx.fillRect(x * 20 + 10, y * 20, 10, 10);
   },
   fallback: (x, y, comp) => {
      ctx.fillStyle =
         comp.cutted === 5
            ? `rgb(250, 250, 250)`
            : `rgb(220, 220, 220)`;
      ctx.fillRect(x * 20, y * 20 + 10, 10, 10);
   }
});

const drawItems = (ctx: CanvasRenderingContext2D) => (items: Thing[]) => {
   const draw = drawItem(ctx);
   items.forEach(item => {
      item.is.forEach((comp: Composable) => {
         (draw[comp.entity] || draw.fallback)(item.x, item.y, comp)
      });
   });
}

export default drawItems;

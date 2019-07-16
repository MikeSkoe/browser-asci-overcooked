import { Entity, Thing, Composable } from '../../state.js';

type DrawFn = (x: number, y: number, comp: Composable) => void;
interface DrawItem {
   [key: string]: DrawFn;
   fallback: DrawFn;
}
type MakeDrawItem = (ctx: CanvasRenderingContext2D) => DrawItem;

const drawItems = (drawTile, items: Thing[]) => {
   const meat = drawTile(1, 0);
   const bun = drawTile(0, 0);
   const green = drawTile(1, 1);

   return (ctx: CanvasRenderingContext2D) => {
      const drawMeat = meat(ctx);
      const drawBun = bun(ctx);
      const drawGreen = green(ctx);

      items.forEach(item => {
         item.is.forEach((comp: Composable, index: number) => {
            const offset = item.is.length;
            switch(comp.entity) {
               case Entity.Meat: 
                  drawMeat(item.x * 26, item.y * 26 + (offset / 2) - (index * offset) - 5, 26, 26); 
                  break;
               case Entity.Bun: 
                  drawBun(item.x * 26, item.y * 26 + (offset / 2) - (index * offset) - 5, 26, 26); 
                  break;
               case Entity.Green: 
                  drawGreen(item.x * 26, item.y * 26 + (offset / 2) - (index * offset) - 5, 26, 26); 
                  break;
            }
         });
      });
      return ctx;
   }
}

export default drawItems;

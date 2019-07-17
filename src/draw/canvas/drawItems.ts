import { Entity, Thing, Composable } from '../../state.js';

type DrawFn = (x: number, y: number, comp: Composable) => void;
interface DrawItem {
   [key: string]: DrawFn;
   fallback: DrawFn;
}
type MakeDrawItem = (ctx: CanvasRenderingContext2D) => DrawItem;

const drawItems = (drawTile, items: Thing[], cellSize: number) => {
   const drawMeat = drawTile(1, 0);
   const drawBun = drawTile(0, 0);
   const drawGreen = drawTile(1, 1);
   const drawPlate = drawTile(3, 1);

   return (ctx: CanvasRenderingContext2D) => {

      items.forEach(item => {
         item.is.forEach((comp: Composable, index: number) => {
            let itemCount = item.is.length;
            const offsetHeight = cellSize / 2;
            const offset = itemCount === 1
               ? 0
               : - (index * (offsetHeight / itemCount))
            switch(comp.entity) {
               case Entity.Meat: 
                  drawMeat(
                     ctx, 
                     item.x * cellSize, 
                     item.y * cellSize + offset
                  ); 
                  break;
               case Entity.Bun: 
                  drawBun(
                     ctx, 
                     item.x * cellSize, 
                     item.y * cellSize + offset
                  ); 
                  break;
               case Entity.Green: 
                  drawGreen(
                     ctx, 
                     item.x * cellSize, 
                     item.y * cellSize + offset
                  ); 
                  break;
               case Entity.Plate: 
                  drawPlate(
                     ctx, 
                     item.x * cellSize, 
                     item.y * cellSize + offset
                  ); 
                  break;
            }
         });
      });
      return ctx;
   }
}

export default drawItems;

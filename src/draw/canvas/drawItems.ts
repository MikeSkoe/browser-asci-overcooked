import { Entity, Thing, Composable } from '../../state.js';
import { Color } from '../../state.js';

type DrawFn = (x: number, y: number, comp: Composable) => void;
interface DrawItem {
   [key: string]: DrawFn;
   fallback: DrawFn;
}
type MakeDrawItem = (ctx: CanvasRenderingContext2D) => DrawItem;

export const drawMeat = (
   ctx: CanvasRenderingContext2D, 
   x: number, 
   y: number, 
   cellSize: number, 
   cutted: number,
   baked: number,
) => {
   ctx.save();
      ctx.lineWidth = 2;
      ctx.beginPath();
         ctx.strokeStyle = baked === 5
            ? Color.BakedMeat
            : Color.Meat;
         if (cutted === 5) {
            ctx.moveTo(x - cellSize/3, y);
            ctx.lineTo(x - 2, y);
            ctx.moveTo(x + 2, y);
            ctx.lineTo(x + cellSize/3, y)
         } else {
            ctx.moveTo(x - cellSize/4, y);
            ctx.lineTo(x + cellSize/4, y);
         }
         ctx.stroke();
      ctx.closePath();
   ctx.restore();
}

export const drawCheez = (
   ctx: CanvasRenderingContext2D, 
   x: number, 
   y: number, 
   cellSize: number, 
   cutted: number,
   baked: number,
) => {
   ctx.save();
      ctx.lineWidth = 2;
      ctx.beginPath();
         ctx.strokeStyle = baked === 5
            ? Color.BakedCheez
            : Color.Cheez;
         if (cutted === 5) {
            ctx.moveTo(x - cellSize/4, y);
            ctx.lineTo(x - (cellSize/4)/2, y + 3);
            ctx.lineTo(x, y);
            ctx.lineTo(x + (cellSize/4)/2, y + 3);
            ctx.lineTo(x + cellSize/4, y);
         } else {
            ctx.moveTo(x - cellSize/4, y);
            ctx.lineTo(x, y + 3);
            ctx.lineTo(x + cellSize/4, y);
         }
         ctx.stroke();
      ctx.closePath();
   ctx.restore();
}

export const drawBun = (
   ctx: CanvasRenderingContext2D, 
   x: number, 
   y: number, 
   cellSize: number, 
   cutted: number,
   count: number,
   baked: number,
) => {
   ctx.save();
      ctx.beginPath();
         ctx.strokeStyle = baked === 5
            ? Color.BakedBun
            : Color.Bun;
         ctx.lineWidth = 2;
         if (cutted === 5) {
            ctx.arc(x, y, 10, 0, Math.PI, true);
            ctx.closePath();
            ctx.stroke();
            ctx.beginPath();
            ctx.rect(x - 10, y + count * 5, 20, 5);
         } else {
            ctx.arc(x, y, 10, 0, Math.PI * 2, true);
         }
      ctx.closePath();
      ctx.stroke();
   ctx.restore();
}

export const drawPlate = (
   ctx: CanvasRenderingContext2D, 
   x: number, 
   y: number, 
   cellSize: number, 
   cutted: number,
   baked: number,
) => {
   ctx.save();
      ctx.beginPath();
         ctx.fillStyle = baked === 5
            ? Color.BakedPlate
            : Color.Plate;
         if (cutted === 5) {
            ctx.arc(x - 5, y, 20, Math.PI*.5, Math.PI*1.5);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(x + 5, y, 20, Math.PI*1.5, Math.PI*.5);
         } else {
            ctx.arc(x, y, 20, 0, Math.PI*2);
         }
         ctx.fill();
      ctx.closePath();
   ctx.restore();
}

export const drawGreen = (
   ctx: CanvasRenderingContext2D, 
   x: number,
   y: number,
   cellSize: number,
   cutted: number,
   baked: number,
   color?: Color,
) => {
   ctx.save();
      ctx.lineWidth = 2;
      ctx.beginPath();
            ctx.strokeStyle = 
               color
                  ? color
               : baked === 5
                  ? Color.BakedGreen
                  : Color.Green;
         if (cutted === 5) {
            const start = x - cellSize/4;
            const width = cellSize/4;
            ctx.moveTo(start, y);
            ctx.quadraticCurveTo(start + width*.25, y - 5, start + width*.5, y);
            ctx.quadraticCurveTo(start + width*.75, y + 5, start + width, y);
            ctx.quadraticCurveTo(start + width + width*.25, y - 5, start + width + width*.5, y);
            ctx.quadraticCurveTo(start + width + width*.75, y + 5, start + width + width, y);
         } else {
            const start = x - cellSize/4;
            const width = cellSize/2;
            ctx.moveTo(x - cellSize/4, y);
            ctx.quadraticCurveTo(start + width*.25, y - 5, start + width*.5, y);
            ctx.quadraticCurveTo(start + width*.75, y + 5, start + width, y);
         }
         ctx.stroke();
      ctx.closePath();
   ctx.restore();
}

export const escapePlate = (comp: Composable) => comp.entity !== Entity.Plate;

const drawItems = (drawTile, items: Thing[], cellSize: number) => {
   const cellify = (xy: number) => xy * cellSize + cellSize/2;
   return (ctx: CanvasRenderingContext2D) => {

      items.forEach(item => {
         item.is
            .filter(comp => comp.entity === Entity.Plate)
            .forEach((comp: Composable, index: number) => {
               drawPlate(
                  ctx,
                  cellify(item.x),
                  cellify(item.y),
                  cellSize,
                  comp.cutted,
                  comp.baked,
               ); 
            });

         item.is
            .filter(comp => comp.entity !== Entity.Plate)
            .forEach((comp: Composable, index: number) => {
            const offset = + index * 5 - 3;
            switch(comp.entity) {
               case Entity.Cheez: 
                  drawCheez(
                     ctx, 
                     cellify(item.x), 
                     cellify(item.y) + offset,
                     cellSize,
                     comp.cutted,
                     comp.baked,
                  ); 
                  break;
               case Entity.Meat: 
                  drawMeat(
                     ctx, 
                     cellify(item.x), 
                     cellify(item.y) + offset,
                     cellSize,
                     comp.cutted,
                     comp.baked,
                  ); 
                  break;
               case Entity.Bun: 
                  drawBun(
                     ctx, 
                     cellify(item.x), 
                     cellify(item.y) + offset,
                     cellSize,
                     comp.cutted,
                     item.is.filter(escapePlate).length,
                     comp.baked,
                  ); 
                  break;
               case Entity.Green: 
                  drawGreen(
                     ctx, 
                     cellify(item.x), 
                     cellify(item.y) + offset,
                     cellSize,
                     comp.cutted,
                     comp.baked,
                  ); 
                  break;
            }
         });
      });
      return ctx;
   }
}

export default drawItems;

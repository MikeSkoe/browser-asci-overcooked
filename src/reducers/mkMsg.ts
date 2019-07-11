import { Msg } from '../state.js';

const mkMsg = (msg: Msg, ...options): string => {
   switch (msg) {
      case Msg.FoodOnFloor: {
         const [name] = options;
         return  `You putted ${name} on wall. It fell on the floor`;
      }
      case Msg.CuttedWith: {
         const [name, proc] = options;
         return `You cutted ${name} with ${proc}%`
      }
   }
}

export default mkMsg;

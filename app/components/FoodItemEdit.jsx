import { formatTime, formatISODate } from "../utils";
import { useFetcher } from "react-router";
import { useState, useEffect, useRef } from "react";

export default function FoodItemEdit({ food, setIsEdit }) {
  const fetcher = useFetcher();
  const [inputFood, setInputFood] = useState(food.food);
  const [inputG, setInputG] = useState(food.g);
  const [inputDate, setInputDate] = useState(formatISODate(food.date));
  const [inputTime, setInputTime] = useState(formatTime(food.date));

  const prevState = useRef(fetcher.state);

  useEffect(() => {
    if (prevState.current === "loading" && fetcher.state === "idle") {
      setIsEdit(null);
    }
    prevState.current = fetcher.state;
  }, [fetcher.state]);

  return (
    <fetcher.Form
      method="post"
      action="/edit-food"
      className="my-1 flex max-w-full flex-wrap items-start justify-between gap-3 overflow-hidden rounded-sm bg-orange-100 px-2 py-2 text-[9px] shadow-md sm:flex-nowrap"
    >
      {/* Hidden ID */}
      <input type="hidden" name="id" id="id" value={food.id} />

      {/* Food Input */}
      <div className="flex min-w-[6rem] flex-shrink-0 flex-col items-start">
        <label htmlFor="food" className="font-medium">
          Food:
        </label>
        <input
          className="w-24 max-w-full truncate rounded-sm border border-gray-400 bg-orange-50 px-1 py-0.5 text-[9px]"
          type="text"
          name="food"
          id="food"
          value={inputFood}
          onChange={(e) => setInputFood(e.target.value)}
        />
        {fetcher?.data?.food?.[0] && (
          <p className="mt-0.5 text-[8px] leading-none text-red-500">
            {fetcher.data.food[0]}
          </p>
        )}
      </div>

      {/* Grams Input */}
      <div className="flex flex-shrink-0 flex-col items-start">
        <label htmlFor="g" className="font-medium">
          G:
        </label>
        <input
          className="w-10 max-w-full rounded-sm border border-gray-400 bg-orange-50 px-1 py-0.5 text-[9px]"
          type="number"
          name="g"
          id="g"
          value={inputG}
          onChange={(e) => setInputG(e.target.value)}
        />
        {fetcher?.data?.g?.[0] && (
          <p className="mt-0.5 text-[8px] leading-none text-red-500">
            {fetcher.data.g[0]}
          </p>
        )}
      </div>

      {/* Date Input */}
      <div className="flex flex-shrink-0 flex-col items-start">
        <label htmlFor="date" className="font-medium">
          Date:
        </label>
        <input
          className="w-24 max-w-full rounded-sm border border-gray-400 bg-orange-50 px-1 py-0.5 text-[9px]"
          type="date"
          name="date"
          id="date"
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
        />
        {fetcher?.data?.date?.[0] && (
          <p className="mt-0.5 text-[8px] leading-none text-red-500">
            {fetcher.data.date[0]}
          </p>
        )}
      </div>

      {/* Time Input */}
      <div className="flex flex-shrink-0 flex-col items-start">
        <label htmlFor="time" className="font-medium">
          Time:
        </label>
        <input
          className="w-20 max-w-full rounded-sm border border-gray-400 bg-orange-50 px-1 py-0.5 text-[9px]"
          type="time"
          name="time"
          id="time"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
        />
        {fetcher?.data?.time?.[0] && (
          <p className="mt-0.5 text-[8px] leading-none text-red-500">
            {fetcher.data.time[0]}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="ml-auto flex flex-shrink-0 items-center gap-1 self-center">
        <button
          type="submit"
          className="cursor-pointer transition-all hover:opacity-60"
        >
          ✅
        </button>
        <button
          type="button"
          className="cursor-pointer transition-all hover:opacity-60"
          onClick={() => setIsEdit(null)}
        >
          🚫
        </button>
      </div>
    </fetcher.Form>
  );
}

// import { formatTime, formatISODate } from "../utils";
// import { useFetcher } from "react-router";
// import { useState, useEffect, useRef } from "react";

// export default function FoodItemEdit({ food, setIsEdit }) {
//   const fetcher = useFetcher();
//   const [inputFood, setInputFood] = useState(food.food);
//   const [inputG, setInputG] = useState(food.g);
//   const [inputDate, setInputDate] = useState(formatISODate(food.date));
//   const [inputTime, setInputTime] = useState(formatTime(food.date));

//   const prevState = useRef(fetcher.state);

//   useEffect(() => {
//     if (prevState.current === "loading" && fetcher.state === "idle") {
//       setIsEdit(null);
//     }
//     prevState.current = fetcher.state;
//   }, [fetcher.state]);

//   return (
//     <fetcher.Form
//       method="post"
//       action="/edit-food"
//       className="my-1 flex items-start justify-between gap-3 rounded-sm bg-orange-100 px-1 py-1.5 text-[9px] shadow-md"
//     >
//       <input type="hidden" name="id" id="id" value={food.id} />
//       <div className="flex flex-col items-start">
//         <div className="flex flex-col items-start">
//           <label htmlFor="food">Food:</label>
//           <input
//             className="w-24 rounded-sm border border-gray-400 bg-orange-50 px-1 py-0.5"
//             type="text"
//             name="food"
//             id="food"
//             value={inputFood}
//             onChange={(e) => setInputFood(e.target.value)}
//           />
//         </div>
//         {fetcher?.data?.food?.[0] && (
//           <p className="mt-0.5 text-[9px] leading-none text-red-500">
//             {fetcher.data.food[0]}
//           </p>
//         )}
//       </div>

//       <div className="flex flex-col items-start">
//         <div className="flex flex-col items-start">
//           <label htmlFor="g">G:</label>
//           <input
//             className="w-10 rounded-sm border border-gray-400 bg-orange-50 px-1 py-0.5"
//             type="number"
//             name="g"
//             id="g"
//             value={inputG}
//             onChange={(e) => setInputG(e.target.value)}
//           />
//         </div>
//         {fetcher?.data?.g?.[0] && (
//           <p className="mt-0.5 text-[8px] leading-none text-red-500">
//             {fetcher.data.g[0]}
//           </p>
//         )}
//       </div>

//       <div className="flex flex-col items-start">
//         <div className="flex flex-col items-start">
//           <label htmlFor="date">Date:</label>
//           <input
//             className="w-20 rounded-sm border border-gray-400 bg-orange-50 px-1 py-0.5"
//             type="date"
//             name="date"
//             id="date"
//             value={inputDate}
//             onChange={(e) => setInputDate(e.target.value)}
//           />
//         </div>
//         {fetcher?.data?.date?.[0] && (
//           <p className="mt-0.5 text-[8px] leading-none text-red-500">
//             {fetcher.data.date[0]}
//           </p>
//         )}
//       </div>

//       <div className="flex flex-col items-start">
//         <div className="flex flex-col items-start">
//           <label htmlFor="time">Time:</label>
//           <input
//             className="w-16 rounded-sm border border-gray-400 bg-orange-50 px-1"
//             type="time"
//             name="time"
//             id="time"
//             value={inputTime}
//             onChange={(e) => setInputTime(e.target.value)}
//           />
//         </div>
//         {fetcher?.data?.time?.[0] && (
//           <p className="mt-0.5 text-[8px] leading-none text-red-500">
//             {fetcher.data.time[0]}
//           </p>
//         )}
//       </div>

//       <div className="ml-auto flex items-center gap-1 self-center">
//         <button
//           type="submit"
//           className="cursor-pointer transition-all hover:opacity-60"
//         >
//           ✅
//         </button>
//         <button
//           type="button"
//           className="cursor-pointer transition-all hover:opacity-60"
//           onClick={() => setIsEdit(null)}
//         >
//           🚫
//         </button>
//       </div>
//     </fetcher.Form>
//   );
// }

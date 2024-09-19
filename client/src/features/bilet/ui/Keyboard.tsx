export const Keyboard = () => {
   return (
     <div className="flex gap-6 justify-center items-center pt-1">
       <div className="relative flex items-center">
         <div className="relative w-[50px] h-[40px] bg-white rounded shadow-lg flex justify-center items-center">
           <span className="text-xl font-bold text-gray-800">X</span>
           <div className="absolute inset-0 rounded border-2 border-gray-300"></div>
         </div>
         <p className="text-lg font-medium ml-2">-</p>
       </div>
 
       <span className="text-lg font-semibold text-gray-600">Пояснение к задаче</span>
 
       <div className="flex items-center mx-2">
         <div className="w-[2px] h-[35px] bg-gray-800"></div>
       </div>
 
       <div className="relative w-[70px] h-[40px] bg-white rounded shadow-lg flex justify-center items-center">
         <span className="text-lg font-bold text-gray-800">← →</span>
         <div className="absolute inset-0 rounded border-2 border-gray-300"></div>
       </div>
 
       <p className="text-lg font-semibold text-gray-600">
         Переключить вопросы, иначе отвечайте...
       </p>
     </div>
   );
 };
 
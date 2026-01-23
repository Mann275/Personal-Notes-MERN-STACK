import React from "react";

// function Card({ firstName, lastName, gender, email, imageUrl }) {
//   return (
//     <>
//       <div className="max-w-lg mx-auto mt-6 rounded-2xl bg-white shadow-xl border border-gray-100 p-6 space-y-4 hover:shadow-2xl transition-all duration-300">
//         <h2 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-3">
//           👤 User Profile
//           <button type="button" class="text-white bg-danger box-border border border-transparent hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Danger</button>

//         </h2>

//         <div className="flex gap-6 text-sm text-gray-700">
//           {/* LEFT: Image */}
//           <div className="shrink-0">
//             <img
//               className="w-24 h-24 object-cover shadow-lg rounded-xl border-2 border-gray-100"
//               alt="User profile"
//               src={`${imageUrl}`}
//             />
//           </div>

//           {/* RIGHT: Text */}
//           <div className="flex-1 space-y-3">
//             <div className="flex justify-between items-center py-1">
//               <span className="font-semibold text-gray-500">First Name:</span>
//               <span className="font-medium text-gray-800">{firstName}</span>
//             </div>

//             <div className="flex justify-between items-center py-1">
//               <span className="font-semibold text-gray-500">Last Name:</span>
//               <span className="font-medium text-gray-800">{lastName}</span>
//             </div>

//             <div className="flex justify-between items-center py-1">
//               <span className="font-semibold text-gray-500">Gender:</span>
//               <span className="font-medium text-gray-800">{gender}</span>
//             </div>

//             <div className="flex justify-between items-center py-1">
//               <span className="font-semibold text-gray-500">Email:</span>
//               <span className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
//                 {email}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

function Card({ firstName, lastName, gender, email, imageUrl, onDelete }) {
  return (
    <div className="relative max-w-lg mx-auto mt-6 rounded-2xl bg-white shadow-xl border border-gray-100 p-6 space-y-4 hover:shadow-2xl transition-all duration-300">
      {/* TOP RIGHT DELETE BUTTON */}
      <button
        type="button"
        onClick={onDelete}
        className="absolute top-4 right-4 text-sm px-2.5 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
        title="Delete card"
      >
        🗑
      </button>

      {/* Header */}
      <h2 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-3">
        👤 User Profile
      </h2>

      <div className="flex gap-6 text-sm text-gray-700">
        {/* LEFT: Image */}
        <div className="shrink-0">
          <img
            className="w-24 h-24 object-cover shadow-lg rounded-xl border-2 border-gray-100"
            alt="User profile"
            src={imageUrl || "https://via.placeholder.com/150"}
          />
        </div>

        {/* RIGHT: Text */}
        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-center py-1">
            <span className="font-semibold text-gray-500">First Name:</span>
            <span className="font-medium text-gray-800">{firstName}</span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="font-semibold text-gray-500">Last Name:</span>
            <span className="font-medium text-gray-800">{lastName}</span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="font-semibold text-gray-500">Gender:</span>
            <span className="font-medium text-gray-800">{gender}</span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="font-semibold text-gray-500">Email:</span>
            <span className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
              {email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

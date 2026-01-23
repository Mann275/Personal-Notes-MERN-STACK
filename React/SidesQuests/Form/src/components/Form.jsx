import React from "react";
import { useState } from "react";

function Form({ setUserdata }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserdata({ firstName, lastName, gender, email, imageUrl });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-md mx-auto p-6 space-y-5"
      >
        {/* First Name */}
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter your first name"
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-gray-700 transition-colors focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Last Name */}
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter your last name"
            onChange={(e) => setLastName(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-gray-700 transition-colors focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Gender
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                className="w-4 h-4 text-blue-600 border-2 border-gray-300 focus:ring-blue-500"
                onChange={(e) => setGender("Male")}
              />
              <span className="text-gray-700">Male</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                className="w-4 h-4 text-blue-600 border-2 border-gray-300 focus:ring-blue-500"
                onChange={(e) => setGender("Female")}
              />
              <span className="text-gray-700">Female</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                className="w-4 h-4 text-blue-600 border-2 border-gray-300 focus:ring-blue-500"
                onChange={(e) => setGender("Other")}
              />
              <span className="text-gray-700">Other</span>
            </label>
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-gray-700 transition-colors focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>
        {/* Image URL */}
        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Profile Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            placeholder="Enter image URL (optional)"
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-gray-700 transition-colors focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>
        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 py-3 px-4 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200"
        >
          Add User
        </button>
      </form>
    </>
  );
}

export default Form;

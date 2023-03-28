import React from 'react'

type Props = {}

const Testing = (props: Props) => {
     const passwordInput = document.getElementById(
       "password"
    ) as HTMLInputElement;
    
    function togglePasswordVisibility() {
     

      if (passwordInput.type === "password") {
        passwordInput.type = "text";
      } else {
        passwordInput.type = "password";
      }
    }
    return (
      <>
        <div className="relative">
          <input
            type="password"
            name="password"
            id="password"
            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <label htmlFor="password" className="absolute top-2 right-2">
            <input
              type="checkbox"
              onClick={togglePasswordVisibility}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Show password</span>
          </label>
        </div>
      </>
    );
}

export default Testing
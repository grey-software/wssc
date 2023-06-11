import React from 'react'

type Props = {}

const SubMenu = (props: Props) => {
    return (
      <>
        <div className="w-[80px] flex justify-center items-center right-2  border border-red-500 bg-white">
          <ul className="w-full list-none no-underline flex justify-center items-center flex-col gap-2 ">
            <li> profile</li>
            <li>History</li>
            <li>Logout</li>
          </ul>
        </div>
      </>
    );
}

export default SubMenu;
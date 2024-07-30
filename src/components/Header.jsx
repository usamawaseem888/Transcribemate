import React from 'react'

const Header = () => {
  return (
    <header className="flex items-center justify-between gap-4 p-4">
    <a href="/">
      <h1 className="font-bold text-[3rem]">Transcribe<span className="text-blue-400">Mate</span></h1>
      {/* {console.log('header pressed')} */}
    </a>
    <a href="/">
      <button className="flex items-center specialBtn gap-2 px-4 py-2 rounded-xl">
        <i className="fa-solid fa-plus"> </i>
        <p>New</p>
      </button>
    </a>
  </header>
  )
}

export default Header
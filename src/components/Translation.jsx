import React from 'react'
import { LANGUAGES } from '../utils/presets'

const Translation = (props) => {
  const {  toLanguage, setToLanguage,  translating, setTranslating, translation, setTranslation, generateTranslation}=props
  return (
    <div className='flex flex-col ] w-ful mx-auto '>
     {!translating && <div className='flex items-center gap-2 mt-5'>
        <select value={toLanguage} onChange={(e)=>setToLanguage(e.target.value)} className='specialBtn gap-2 text-xl border-solid py-3 px-1 rounded-2xl'>

         <option value={'Select Language'}>Select Languages</option>
         {Object.entries(LANGUAGES).map((key,value)=>{
          return(
            <option key={key} value={value}>
               {key}
            </option>
          )
         })}

        </select>
        <button onClick={generateTranslation}  className='specialBtn py-3 px-2 text-xl rounded-xl'>Translate</button>

      </div>}
      {(translation && !translating) && ( 
        <p>{translation}</p> 
      )}
      {translating && (
        <div className='grid place-items-center'> 
        <i className='fa-solid fa-spinner animate-spin'></i></div>
      )}

    </div>
  )
}

export default Translation
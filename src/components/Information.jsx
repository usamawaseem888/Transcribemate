import React, { useState } from 'react'
import Transcription from './Transcription'
import Translation from './Translation'

const Information = (props) => {

    const {output}=props
    const [tab,setTab]=useState('transcription')
    const [translation,setTranslation]=useState(null)
    const [translating,setTranslating]=useState(null)
    const [toLanguage,setToLanguage]=useState('Set Language')

    const handlecopy=()=>{
        navigator.clipboard.writeText()

    }
    function generateTranslation(){
        if(translating || toLanguage==='Select Language'){return}
        setTranslating(true)
        Worker.current.postMessage({
            text: output.map(val => val.text),
            src_langguage:'eng_Latin',
            tgtLang: toLanguage
        })

    }
   

    const handleDownload=()=>{
       const element =document.createElement('a')

       const file=new Blob([],{type:'text/plain'})
       element.href=URL.createObjectURL(file)
       element.download(`TranscribeMate_${(new Date()).toDateString()}.txt`)
       document.body.appendChild(element)
       element.click()

    }

    return (
        <main className="flex-1 p-4 flex flex-col items-center justify-center sm:gap-4 md:gap-5 pb-20">
            <h1 className=' font-bold sm:text-6xl md:text-7xl lg:text-8xl'>
                Your<span className='text-blue-400'> Transcription</span>
            </h1>

            <div className='grid grid-cols-2 sm:mx-auto bg-white text-3xl  rounded overflow-hidden items-center p-1 blueShadow border-[2px] border-solid border-blue-900'>
                <button onClick={() => setTab('transcription')} className={'px-4 rounded duration-200 py-1 ' + (tab === 'transcription' ? ' bg-blue-400 text-white' : ' text-blue-400 hover:text-blue-600')}>Transcription</button>
                <button onClick={() => setTab('translation')} className={'px-4 rounded duration-200 py-1  ' + (tab === 'translation' ? ' bg-blue-300 text-white' : ' text-blue-400 hover:text-blue-600')}>Translation</button>
            </div>
            {tab==='transcription' ? 
            (<Transcription {...props} />) : 
            (<Translation {...props} 
             toLanguage={toLanguage}  setToLanguage={setToLanguage}
             translating={translating} setTranslating={setTranslating}
             translation={translation} setTranslation={setTranslation}
             generateTranslation={generateTranslation} />)
             }

            <div className='flex items-center text-4xl gap-5 mt-10 '>
                <button className='specialBtn px-4 py-2 rounded-xl'>
                    <i className='fa-solid fa-copy'></i>
                </button>

                <button className='specialBtn px-4 py-2 rounded-xl'>
                    <i className='fa-solid fa-download '></i>
                </button>

            </div>
        </main>
    )
}

export default Information
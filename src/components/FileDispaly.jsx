import React from 'react'

const FileDispaly = (props) => {
    const { resetAudio, file, audioStream,handleFormSubmission } = props
    return (
        <main className="flex-1 p-4 flex flex-col items-center justify-center sm:gap-4 md:gap-5 pb-20">
            <h1 className=' font-bold sm:text-6xl md:text-7xl lg:text-8xl'>
                Your<span className='text-blue-400'> File</span>
            </h1>
            <div className='felx items-center  gap-2 my-2'>
                <h2><span className='font-bold'>File: </span>{file ? file?.name : "Recorded audio"}</h2>

            </div>
            <div className='flex items-center gap-2 font-semibold'>
                <button className='text-slate-400 bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-400 hover:text-slate-800 duration-200'
                    onClick={resetAudio}>Reset</button>
                <button 
                className='specialBtn border-2 border-blue-200 bg-slate-500 px-4 py-2 rounded-xl '
                onClick={handleFormSubmission}
                > Transcribe <i className="fa-duotone fa-solid fa-pen pl-2"></i></button>
            </div>

        </main>
    )
}

export default FileDispaly
import React from 'react'

const Transcribe = (props) => {
    const { downloading } = props
    return (
        <div className='flex flex-1 p-4 items-center flex-col justify-center gap-10 md:gap-14 py-24 '>
            <div className='flex flex-col gap-2 my-10 sm:gap-4'>
                <h1 className="font-bold text-[5rem]"><span className="text-blue-400">Transcribing</span></h1>
                <p className='font-semibold mt-10 text-3xl ml-3 capitalize'>{!downloading ? 'Warming up cylinders' : 'Core cylinders engaged'}</p>
            </div>
            <div className='flex flex-col gap-2 sm:gap-4 max-w-[500px] mx-auto w-full' >
                {[0, 1, 2].map(val => {
                    return (
                        <div key={val} className={'rounded-full h-2 sm:h-3 bg-slate-400 loading ' + (`loading${val}`)}     >

                        </div>
                    )
                })}

            </div>

            Transcribe</div>
    )
}

export default Transcribe
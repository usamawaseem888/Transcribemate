import React, { useEffect, useRef, useState } from 'react'

const Homepage = (props) => {
    const { setFile, setAudio } = props
    
    const [recordingStatus, setRecording] = useState('inactive')
    const [audioChunks, setAudiochunks] = useState([])
    const [duration, setDuration] = useState(0)
    const mediaRecorder = useRef(null)
    const mimeType = 'audio/webm'

    async function startRecording() {
        let tempStream
        console.log('Start recording')

        try {
            const streamData = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            })
            tempStream = streamData
        } catch (error) {
            console.log(error.message)
            return

        }
        setRecording('recording')

        const media = new MediaRecorder(tempStream, { mimeType });
        mediaRecorder.current = media
        mediaRecorder.current.start()

        let localAudioChunks = []
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === 'undefined') { return }
            if (event.data.size === 0) { return }
            localAudioChunks.push(event.data)
        }
        setAudiochunks(localAudioChunks)

    }

    async function stopRecording() {
        setRecording('inactive')
        console.log('stop recording')

        mediaRecorder.current.stop()
        mediaRecorder.current.onstop = () => {

            const audioBlob = new Blob(audioChunks, { type: mimeType })
            setAudio(audioBlob)
            setAudiochunks([])
            setDuration(0)
        }
    }

    useEffect(() => {

        if (recordingStatus === 'inactive') { return }

        const interval = setInterval(() => {
            setDuration(curr => curr + 1)
        }, 1000)

        return () => clearInterval(interval)
    })

    return (
        <main className="flex-1 p-4 flex flex-col items-center justify-center sm:gap-4 md:gap-5 pb-20">
            <h1 className=' font-bold sm:text-6xl md:text-7xl lg:text-8xl'>
                Transcribe<span className='text-blue-400'>Mate</span>
            </h1>

            <h3 className=' font-medium md:text-3xl'>Record
                <span className='text-blue-400'> &rarr;</span> Transcribe
                <span className='text-blue-400'> &rarr; </span> Translate
            </h3>

            <button
                onClick={recordingStatus === 'recording' ? stopRecording : startRecording}
                className='flex items-center text-base justify-between gap-4 mx-auto w-80  font-medium md:text-3xl specialBtn rounded-xl py-2 px-4 '>

                <p>{recordingStatus === 'inactive' ? 'Record' : ' Stop Recording'}</p>
                {duration !== 0 && (
                    <p>{duration}s</p>
                )}
                <i className={"fa-solid duration-200 fa-microphone-lines " + (recordingStatus === 'recording' ? 'text-blue-500' : '')}></i>
            </button>

            <p className='text-2xl'>Or <label className='text-blue-500 cursor-pointer hover:text-blue-800'>Uplaod
                <input onChange={(e) => {
                    const tempFile = e.target.files[0]
                    setFile(tempFile)

                }
                }
                    className='hidden'
                    type='file'
                    accept='.mp3,.wave' /> </label>a mp3 file.</p>
            <p className='font-medium italic text-lg text-slate-500'>No Cost Today, No Cost Tomorrow</p>
        </main>

    )
}

export default Homepage
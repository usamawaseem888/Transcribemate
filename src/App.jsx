import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import FileDisplay from "./components/FileDispaly";
import Information from "./components/Information";
import Transcribe from "./components/Transcribe";
import { MessageTypes } from './utils/presets';

function App() {
  const [file, setFile] = useState(null);
  const [audio, setAudio] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const worker = useRef(null);

  const isAudioAvailable = file || audio;

  function resetAudio() {
    setFile(null);
    setAudio(null);
  }

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./utils/whisper.worker.js', import.meta.url), { type: 'module' });
    }
    const onMessageReceived = async (e) => {
      switch (e.data.type) {
        case 'DOWNLOADING':
          setDownloading(true);
          console.log('Downloading');
          break;

        case 'LOADING':
          setLoading(true);
          console.log('Loading');
          break;

        case 'RESULT':
          setOutput(e.data.results);
          console.log(e.data.results);
          break;

        case 'INFERENCE_DONE':
          setFinished(true);
          console.log('Inference done');
          break;

       
      }
    };
    worker.current.addEventListener('message', onMessageReceived);
    return () => worker.current.removeEventListener('message', onMessageReceived);
  }, []);

  async function readAudioFrom(file) {
    const samplingRate = 16000;
    const audioContext = new AudioContext({ sampleRate: samplingRate });
    const response = await file.arrayBuffer();
    const decodedAudioData = await audioContext.decodeAudioData(response);
    const audioBuffer = decodedAudioData.getChannelData(0);
    return audioBuffer;
  }

  async function handleFormSubmission() {
    if (!file && !audio) {
      return;
    }

    const audioBuffer = await readAudioFrom(file ? file : audio);
    const modelName = 'openai/whisper-tiny.en';

    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio: audioBuffer,
      model_name: modelName
    });
  }

  return (
    <div className='flex flex-col max-w-[1000px] mx-auto w-full'>
      <section className="min-h-screen flex flex-col">
        <Header />
        {output ? (
          <Information output={output} />
        ) : loading ? (
          <Transcribe />
        ) : isAudioAvailable ? (
          <FileDisplay handleFormSubmission={handleFormSubmission} resetAudio={resetAudio} file={file} audioStream={setAudio} />
        ) : (
          <Homepage setFile={setFile} setAudio={setAudio} />
        )}
      </section>
     
    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import { Unity, useUnityContext } from "react-unity-webgl";
import { processAudio } from "./utils/audio";
function App() {
  const [count, setCount] = useState(0);
  const { unityProvider, sendMessage } = useUnityContext({
    loaderUrl: "Build/public.loader.js",
    dataUrl: "Build/public.data.unityweb",
    frameworkUrl: "Build/public.framework.js.unityweb",
    codeUrl: "Build/public.wasm.unityweb",
  });
  const replay = () => {
    sendMessage("Lipsync", "Replay");
  };

  async function sendAudioToUnity() {
    const fileInput = document.getElementById("audioInput");
    const audioInfoJson = await processAudio(fileInput);
    sendMessage("Lipsync", "ReceiveAudio", JSON.stringify(audioInfoJson));
  }
  return (
    <div>
      {/* Add a button or any other UI element to trigger the message */}
      <button onClick={replay}>Replay</button>
      <input type="file" id="audioInput" accept="audio/*" />
      <button onClick={sendAudioToUnity}>Send Audio to Unity</button>

      <Unity unityProvider={unityProvider} style={{ width: 1000 }} />
    </div>
  );
}

export default App;

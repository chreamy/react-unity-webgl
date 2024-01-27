export function processAudio(fileInput) {
  return new Promise((resolve, reject) => {
    if (fileInput.files.length > 0) {
      const audioFile = fileInput.files[0];
      const reader = new FileReader();
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();

      reader.onload = function (event) {
        const base64String = event.target.result.split(",")[1];
        const audioDataArrayBuffer = base64ToArrayBuffer(base64String);

        audioContext.decodeAudioData(
          audioDataArrayBuffer,
          (decodedData) => {
            // Audio is decoded, now you can get the sample rate and other info
            const sampleRate = decodedData.sampleRate;
            const channels = decodedData.numberOfChannels;
            // Prepare the audio info object
            const audioInfo = {
              audioBase64: base64String,
              sampleRate: sampleRate,
              channels: channels,
            };
            resolve(audioInfo); // Resolve the promise with the audio info
          },
          (error) => {
            console.error("Error decoding audio file", error);
            reject(error); // Reject the promise on error
          }
        );
      };

      reader.readAsDataURL(audioFile);
    } else {
      alert("Please select an audio file first.");
      reject(new Error("No file selected")); // Reject the promise if no file is selected
    }
  });
}

function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

const textToSpeechBtn = document.getElementById('text-to-speech-btn');

if (textToSpeechBtn) {
  if ('speechSynthesis' in window) {
    const synth = window.speechSynthesis;
    let isSpeaking = false;

    const speak = () => {
      if (synth.speaking) {
        synth.cancel();
        return;
      }
      
      const mainContent = document.querySelector('main');
      if (mainContent) {
        const text = mainContent.innerText;
        const utterance = new SpeechSynthesisUtterance(text);
        
        utterance.onstart = () => {
          isSpeaking = true;
          textToSpeechBtn.textContent = 'Stop Speech';
        };
        
        utterance.onend = () => {
          isSpeaking = false;
          textToSpeechBtn.textContent = 'Text to Speech';
        };

        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event.error);
            isSpeaking = false;
            textToSpeechBtn.textContent = 'Text to Speech';
        };

        synth.speak(utterance);
      } else {
        console.error('Main content not found.');
      }
    };

    const stop = () => {
      synth.cancel();
    };

    textToSpeechBtn.addEventListener('click', () => {
      if (isSpeaking) {
        stop();
      } else {
        speak();
      }
    });

  } else {
    console.error('Speech Synthesis API is not supported in this browser.');
    textToSpeechBtn.style.display = 'none';
  }
} else {
    console.error('Text to speech button not found.');
}
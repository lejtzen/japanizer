let voice = null

const getVoice = () => {
    voice = window.speechSynthesis
        .getVoices()
        .find((v) => v.lang.indexOf('ja') === 0)
}

window.speechSynthesis.onvoiceschanged = getVoice

function speak(text, onstart, onend) {
    const utterance = new SpeechSynthesisUtterance(text)

    utterance.onresume = onstart
    utterance.onstart = onstart
    utterance.onend = onend
    utterance.onerror = onend
    utterance.onpause = onend
    utterance.pitch = 1
    utterance.rate = 1
    utterance.voice = voice ? voice : utterance.voice

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
}

function cancel() {
    window.speechSynthesis.cancel()
}

export default {
    speak,
    cancel,
}

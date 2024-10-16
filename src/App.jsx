import { useEffect, useState } from 'react'

const languages = [
  {code: 'ar', name: 'Árabe'},
  {code: 'de', name: 'Alemão'},
  {code: 'bn', name: 'Bengali'},
  {code: 'bg', name: 'Búlgaro'},
  {code: 'cs', name: 'Tcheco'},
  {code: 'da', name: 'Dinamarquês'},
  {code: 'el', name: 'Grego'},
  {code: 'es', name: 'Espanhol'},
  {code: 'fa', name: 'Persa'},
  {code: 'fi', name: 'Finlandês'},
  {code: 'fr', name: 'Francês'},
  {code: 'he', name: 'Hebraico'},
  {code: 'hi', name: 'Hindi'},
  {code: 'hu', name: 'Húngaro'},
  {code: 'id', name: 'Indonésio'},
  {code: 'en', name: 'Inglês'},
  {code: 'it', name: 'Italiano'},
  {code: 'ja', name: 'Japonês'},
  {code: 'ko', name: 'Coreano'},
  {code: 'ml', name: 'Malayalam'},
  {code: 'ms', name: 'Malaio'},
  {code: 'mr', name: 'Marathi'},
  {code: 'nl', name: 'Holandês'},
  {code: 'no', name: 'Norueguês'},
  {code: 'pl', name: 'Polonês'},
  {code: 'pt-br', name: 'Português'},
  {code: 'ro', name: 'Romeno'},
  {code: 'ru', name: 'Russo'},
  {code: 'sk', name: 'Eslovaco'},
  {code: 'sv', name: 'Sueco'},
  {code: 'sw', name: 'Swahili'},
  {code: 'ta', name: 'Tâmil'},
  {code: 'te', name: 'Telugu'},
  {code: 'th', name: 'Tailandês'},
  {code: 'tr', name: 'Turco'},
  {code: 'uk', name: 'Ucraniano'},
  {code: 'ur', name: 'Urdu'},
  {code: 'vi', name: 'Vietnamita'},
  {code: 'zh', name: 'Chinês'},
];

function App() {
  const [sourceLang, setSourceLang] = useState('pt-br');
  const [targetLang, setTargetLang] = useState('en');
  const [sourceText, setSourceText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState('')

  useEffect(() => {
    if(sourceText) {
      const delay = setTimeout(() => {
        handleTranlate()
      }, 500);

      return () => clearTimeout(delay)
    }

  }, [sourceText])

  const handleTranlate = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${sourceText}&langpair=${sourceLang}|${targetLang}`)

      if(!response.ok) {
        throw new Error(`HTTP ERROR: ${response.status}`)
      }

      const data = await response.json();

      setTranslatedText(data.responseData.translatedText)
      setIsLoading(false)

    } catch (err) {
      setError(`Erro ao tentar traduzir: ${err.message}. Tente novamente!`)

    } finally {
      setIsLoading(false)
    }
  }

  const swapTranslate = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setSourceText(translatedText)
    setTranslatedText(sourceText)
  }

  return (
    <div className='min-h-screen bg-background flex flex-col'>
      <header className='bg-background shadow-sm'>
        <div className='max-w-5xl mx-auto px-4 py-3 flex items-center'>
          <h1 className='text-headerColor text-2xl font-bold'>Tradutor</h1>
        </div>
      </header>

    <main className='flex-grow flex items-start justify-center px-4 py-8'>
      <div className='w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='flex items-center justify-between p-4 border-b border-gray-200'>
          <select
          value={sourceLang}
          onChange={ev => setSourceLang(ev.target.value)}
          className='text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer'>
            { languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            )) }
          </select>
          <button
          onClick={swapTranslate} 
          className='p-2 rounded-full hover:bg-gray-100 outline-none'>
          <svg className="w-5 h-5 text-headerColor" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
          </svg>
          </button>
          <select
          value={targetLang}
          onChange={ev => setTargetLang(ev.target.value)}
          className='text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer'>
            { languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            )) }
          </select>
        </div>

          <div className='grid grid-cols-1 md:grid-cols-2'>
            <div className='p-4'>
              <textarea 
              value={sourceText}
              onChange={ev => setSourceText(ev.target.value)}
              placeholder='Digite seu texto...' 
              className='w-full h-40 text-lg text-textColor bg-transparent resize-none border-none outline-none'>
              </textarea>
            </div>
            <div className='p-4 relative bg-secondaryBackground border-l border-gray-200'>
              {isLoading ? (
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500'></div>
              </div>
              ) : (
                <p className='text-lg text-textColor'>{translatedText}</p>
              )}
            </div>
          </div>
          {error && (
            <div className='p-4 bg-red-100 border-t border-red-400 text-red-700'>
              {error}
            </div>
          )}
      </div>
    </main>
      <footer className='bg-white border-t border-gray-200 mt-auto'>
            <div className='max-w-5xl mx-auto px-4 py-3 text-sm text-headerColor'>
             &copy; {new Date().getFullYear()} Tradutor
            </div>
      </footer>
    </div>
  )
}

export default App
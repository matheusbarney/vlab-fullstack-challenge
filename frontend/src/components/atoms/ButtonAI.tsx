import { RiseLoader } from 'react-spinners';

type ButtonAIProps = {
    handleAIHelp: () => Promise<void>;    
    canUseAI: boolean;
    isGenerating: boolean;
    sparkleAI: () => React.ReactNode;
}

export function ButtonAI({
  handleAIHelp,
  canUseAI,
  isGenerating,
  sparkleAI
}: ButtonAIProps) {
  return <div className="flex flex-col items-center gap-1">
              <button onClick={handleAIHelp} disabled={!canUseAI || isGenerating} className={`w-60 px-4 py-2 flex justify-center rounded ${canUseAI ? !isGenerating ? 'bg-gradient-to-tl from-purple-600 to-blue-400 text-white hover:bg-blue-600' : 'bg-violet-800 cursor-not-allowed' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                {!canUseAI ? <><span className="inline-block size-6 mr-1">{sparkleAI()}</span></> : isGenerating ? <span className="">
                      <RiseLoader color="#ffffff" size={10} />
                    </span> : <><span className="inline-block size-6 mr-1">{sparkleAI()}</span> Gerar Descrição com IA</>}
              </button>
              <span className="text-[10.5px] text-gray-500">Preencha título e tipo, que a IA faz o resto!</span>
            </div>;
}
  
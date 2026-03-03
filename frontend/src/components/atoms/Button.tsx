
import { RotateLoader } from 'react-spinners';

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    showText?: boolean;
    icon?: React.ReactNode;
    mainText: string;
    isSubmitting?: boolean;
    onClick?: () => void; 
}

function Button({ type, icon, mainText, showText, isSubmitting, onClick }: ButtonProps) {
  return (<button disabled={isSubmitting} onClick={onClick} type={type} className="rounded-2xl 
            bg-cyan-600 px-10 py-4 text-2xl text-neutral-100 shadow-xl hover:bg-cyan-700 hover:text-neutral-200 
            disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto ">
      {showText && isSubmitting ? (
        <span className="text-neutral-100">
          <RotateLoader color="#363636" />
        </span>
      ) : (
        <div className="flex justify-center items-center gap-2 text-neutral-100">
          {icon}
          {mainText}
        </div>
      )}
    </button>
  );
}

export default Button;
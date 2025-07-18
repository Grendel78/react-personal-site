import { ArrowBigUp, ArrowBigDown, ArrowBigLeft, ArrowBigRight } from "lucide-react";

interface ImanokProgressProps {
  progress: number;
  showSuccess: boolean;
}

// Retro Nintendo-style D-pad component with arrow icons
const DPadUp = () => (
  <div className="w-6 h-6 bg-gradient-to-b from-gray-300 to-gray-500 border-2 border-gray-600 rounded-sm flex items-center justify-center shadow-md">
    <ArrowBigUp className="w-5 h-5 fill-gray-800 text-gray-800" />
  </div>
);

const DPadDown = () => (
  <div className="w-6 h-6 bg-gradient-to-b from-gray-300 to-gray-500 border-2 border-gray-600 rounded-sm flex items-center justify-center shadow-md">
    <ArrowBigDown className="w-5 h-5 fill-gray-800 text-gray-800" />
  </div>
);

const DPadLeft = () => (
  <div className="w-6 h-6 bg-gradient-to-b from-gray-300 to-gray-500 border-2 border-gray-600 rounded-sm flex items-center justify-center shadow-md">
    <ArrowBigLeft className="w-5 h-5 fill-gray-800 text-gray-800" />
  </div>
);

const DPadRight = () => (
  <div className="w-6 h-6 bg-gradient-to-b from-gray-300 to-gray-500 border-2 border-gray-600 rounded-sm flex items-center justify-center shadow-md">
    <ArrowBigRight className="w-5 h-5 fill-gray-800 text-gray-800" />
  </div>
);

const ActionButton = ({ letter }: { letter: string }) => (
  <div className="w-6 h-6 bg-gradient-to-b from-red-400 to-red-600 border-2 border-red-700 rounded-full flex items-center justify-center shadow-md">
    <span className="text-white font-black text-xs tracking-wider">{letter}</span>
  </div>
);

const StartButton = () => (
  <div className="w-8 h-4 bg-gradient-to-b from-gray-300 to-gray-500 border-2 border-gray-600 rounded-sm flex items-center justify-center shadow-md">
    <span className="text-gray-800 font-black text-xs">START</span>
  </div>
);

const KONAMI_ICONS = [
  { key: 'ArrowUp', component: DPadUp },
  { key: 'ArrowUp', component: DPadUp },
  { key: 'ArrowDown', component: DPadDown },
  { key: 'ArrowDown', component: DPadDown },
  { key: 'ArrowLeft', component: DPadLeft },
  { key: 'ArrowRight', component: DPadRight },
  { key: 'ArrowLeft', component: DPadLeft },
  { key: 'ArrowRight', component: DPadRight },
  { key: 'KeyB', component: () => <ActionButton letter="B" /> },
  { key: 'KeyA', component: () => <ActionButton letter="A" /> },
  { key: 'Enter', component: StartButton }
];

export const ImanokProgress = ({ progress, showSuccess }: ImanokProgressProps) => {
  if (progress === 0 && !showSuccess) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 p-3 rounded-lg frosted-glass">
      {showSuccess ? (
        <div className="text-primary font-semibold text-sm animate-pulse">
          Secret unlocked! 🎮
        </div>
      ) : (
        <div className="flex items-center gap-1.5">
          {KONAMI_ICONS.slice(0, progress).map((item, index) => {
            const Component = item.component;
            return (
              <div key={index} className="animate-fade-in">
                <Component />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
import { ReactNode } from "react";

interface ProcessStepProps {
  icon: ReactNode;
  title: string;
  description: string;
  stepNumber?: number;
}

const ProcessStep = ({ icon, title, description, stepNumber }: ProcessStepProps) => {
  return (
    <div className="flex p-[15px] items-center rounded-[4px] bg-[#EFF9FD] space-x-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-[16px] text-[#252525] ">{title}</h3>
        <p className="text-[#252525] text-sm leading-relaxed">{description}</p>
      </div>

      <p className="text-[#04385017] text-[40px] font-bold">0{stepNumber}</p>
    </div>
  );
};

export default ProcessStep;
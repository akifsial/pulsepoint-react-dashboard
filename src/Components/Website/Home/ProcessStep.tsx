import { ReactNode } from "react";

interface ProcessStepProps {
  icon: ReactNode;
  title: string;
  description: string;
  stepNumber?: number;
}

const ProcessStep = ({ icon, title, description, stepNumber }: ProcessStepProps) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="flex-1">
        {stepNumber && (
          <span className="text-sm text-blue-500 font-medium">Step {stepNumber}</span>
        )}
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default ProcessStep;
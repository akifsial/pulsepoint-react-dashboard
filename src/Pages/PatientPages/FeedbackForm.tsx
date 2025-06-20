import React, { useState } from "react";
import { FaFaceGrinStars } from "react-icons/fa6";
import TextField from "@components/CareProvider/CommunityForum/TextField";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import { useNavigate } from "react-router-dom";
import Model from "@components/Model/Model";

const FeedbackForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const navigate = useNavigate();

  const surveySections = [
    {
      section: "1. Quality of Care",
      questions: [
        {
          label: "a. Responsiveness of Staff",
          description:
            "How promptly and effectively did staff respond to your or your loved one's needs?",
          options: [
            "1 - Very Poor",
            "2 - Poor",
            "3 - Fair",
            "4 - Good",
            "5 - Excellent",
          ],
          type: "radio",
          name: "responsiveness",
        },
        {
          label: "b. Competence and Professionalism of Staff",
          description:
            "How would you rate the skill, knowledge, and courtesy of the staff?",
          options: [
            "1 - Very Poor",
            "2 - Poor",
            "3 - Fair",
            "4 - Good",
            "5 - Excellent",
          ],
          type: "radio",
          name: "competence",
        },
        {
          label: "c. Quality and Effectiveness of Treatment/Care",
          description:
            "How satisfied are you with the overall quality and effectiveness of the care provided?",
          options: [
            "1 - Very Poor",
            "2 - Poor",
            "3 - Fair",
            "4 - Good",
            "5 - Excellent",
          ],
          type: "radio",
          name: "effectiveness",
        },
      ],
    },
    {
      section: "2. Communication",
      questions: [
        {
          label: "a. Clarity of Information",
          description:
            "Did staff clearly explain procedures, treatment plans, and next steps?",
          options: [
            "1 - Very Poor",
            "2 - Poor",
            "3 - Fair",
            "4 - Good",
            "5 - Excellent",
          ],
          type: "radio",
          name: "clarity",
        },
        {
          label: "b. Respect and Dignity",
          description: "Were you treated with kindness, respect, and dignity?",
          options: [
            "1 - Very Poor",
            "2 - Poor",
            "3 - Fair",
            "4 - Good",
            "5 - Excellent",
          ],
          type: "radio",
          name: "respect",
        },
        {
          label: "c. Involvement in Care Decisions",
          description:
            "Were you involved and kept informed about your care or treatment?",
          options: ["Yes", "No"],
          type: "radio",
          name: "involvement",
        },
      ],
    },
    {
      section: "3. Environment and Safety",
      questions: [
        {
          label: "a. Cleanliness and Hygiene",
          description:
            "How would you rate the cleanliness of the facility or environment?",
          options: [
            "1 - Very Poor",
            "2 - Poor",
            "3 - Fair",
            "4 - Good",
            "5 - Excellent",
          ],
          type: "radio",
          name: "cleanliness",
        },
        {
          label: "b. Safety and Comfort",
          description:
            "Did you feel safe and comfortable during your stay or visit?",
          options: [
            "1 - Very Poor",
            "2 - Poor",
            "3 - Fair",
            "4 - Good",
            "5 - Excellent",
          ],
          type: "radio",
          name: "safety",
        },
      ],
    },
    {
      section: "4. Personal Experience",
      questions: [
        {
          label: "a. Staff Attitude and Compassion",
          description: "Did staff show kindness, empathy, and understanding?",
          options: [
            "1 - Very Poor",
            "2 - Poor",
            "3 - Fair",
            "4 - Good",
            "5 - Excellent",
          ],
          type: "radio",
          name: "compassion",
        },
        {
          label: "b. Environment and Privacy",
          description:
            "Was your privacy respected? Was the environment comfortable?",
          options: [
            "1 - Very Poor",
            "2 - Poor",
            "3 - Fair",
            "4 - Good",
            "5 - Excellent",
          ],
          type: "radio",
          name: "privacy",
        },
      ],
    },
    {
      section: "5. Overall Satisfaction",
      questions: [
        {
          label: "a. Would you recommend this provider to others?",
          description: "",
          options: ["Yes", "No"],
          type: "radio",
          name: "recommend",
        },
        {
          label: "b. Likelihood of Returning or Using Again",
          description: "",
          options: [
            "Very Unlikely",
            "Unlikely",
            "Neutral",
            "Likely",
            "Very Likely",
          ],
          type: "radio",
          name: "return",
        },
      ],
    },
    {
      section: "6. Additional Comments",
      isCommentSection: true,
    },
  ];

  const totalSteps = surveySections.length;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const ReviewHandle = (e) => {
    e.preventDefault();
    setShowThankYou(true);
    setTimeout(() => {
      navigate("/patient/patient-reviews");
    }, 2000); // 2 seconds delay
  };

  const currentSection = surveySections[currentStep];

  return (
    <>
      <div className="mb-8 text-sm">
        <strong className="text-xl font-bold mb-2">
          Healthcare Provider Feedback Form
        </strong>
        <p>
          Thank you for sharing your experience. Your feedback helps others make
          informed decisions and supports ongoing improvements.
          <br /> Please answer honestly. All responses are confidential.
        </p>
      </div>
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
        <div>
          <div className="flex items-center mb-3">
            {surveySections.map((_, idx) => (
              <div
                key={idx}
                className={`flex-1 h-1 mx-1 rounded-full ${
                  idx <= currentStep ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
          <div className="text-gray-600 text-right text-xs mb-3">
            <p>
              Step {currentStep + 1} of {totalSteps}
            </p>
          </div>
        </div>
        <form onSubmit={ReviewHandle}>
          <div className="space-y-8">
            <div>
              <strong className="text-lg font-semibold mb-2">
                {currentSection.section}
              </strong>
              {currentSection.isCommentSection ? (
                <div className="text-sm mb-2">
                  <strong className="text-[16px] text-gray-600 mb-3">
                    Please share any specific experiences, suggestions, or
                    feedback:
                  </strong>
                  <div className="mb-4 w-full max-w-sm">
                    <TextField
                      label="Add A Comment"
                      id="comment"
                      placeholder="Enter your comment here..."
                      row={5}
                    />
                  </div>
                </div>
              ) : (
                currentSection.questions.map((q, qIdx) => (
                  <div key={qIdx} className="text-sm  mb-6">
                    <div className="mb-3">
                      <strong className="text-[16px] font-medium mb-1">{q.label}</strong>
                      {q.description && (
                        <p className="text-gray-600">{q.description}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {q.options.map((option, optIdx) => (
                        <label key={optIdx} className="flex items-center gap-2">
                          <input
                            type={q.type}
                            name={q.name}
                            value={option}
                            className="form-radio"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-between mt-4 mb-2">
            {currentStep > 0 ? (
              <button
                type="button"
                className="bg-gray-200 cursor-pointer  w-[100px] h-[46px] !rounded-[10px] px-4 py-[10px] font-semibold leading-[33px] gap-[10px] flex items-center justify-center text-black hover:bg-[#f2f2f2] transition-colors"
                onClick={handlePrev}
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < totalSteps - 1 ? (
              <button
                type="button"
                className="cursor-pointer border-1 w-[100px] h-[46px] !rounded-[10px] px-4 py-[10px] text-white font-semibold leading-[33px] gap-[10px] flex items-center justify-center bg-[#28A2FF] hover:bg-[#2196F3] transition-colors"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              // <PrimaryButton
              //   btnText="Next"
              //   btnClass="border-1 w-[100px] h-[46px] !rounded-[10px] px-4 py-[10px] text-white font-semibold leading-[33px] gap-[10px] flex items-center justify-center bg-[#28A2FF] hover:bg-[#2196F3] transition-colors"
              //   onClick={handleNext}

              // />
              <PrimaryButton
                btnText="Post A Review"
                showImg={false}
                btnClass="border-1 w-[200px] h-[46px] !rounded-[10px] px-4 py-[10px] text-white font-semibold leading-[33px] gap-[10px] flex items-center justify-center bg-[#28A2FF] hover:bg-[#2196F3] transition-colors"
                onClick={ReviewHandle}
              />
            )}
          </div>
          {showThankYou && (
            <div className="text-sm">
              <p>Thank you for your valuable feedback!</p>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default FeedbackForm;

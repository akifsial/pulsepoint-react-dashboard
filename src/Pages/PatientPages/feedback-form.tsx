import React, { useState } from "react";
import { FaFaceGrinStars } from "react-icons/fa6";
import TextField from "@components/careprovider/communityforum/text-field";
import { PrimaryButton } from "@components/shared-components/buttons/common-button/common-button";
import { useNavigate, useParams } from "react-router-dom";
import Model from "@components/model/model";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { ApiCreateFeedback } from "@src/api/api-dashboard";
import toast from "react-hot-toast";
import Spinner from "@components/loaders/spinner";

const FeedbackForm = ({ setFeedbackOpen }) => {
  const { id } = useParams();

  const [currentStep, setCurrentStep] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const [responses, setResponses] = useState({ care_provider_id: id });

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
          name: "responsiveness_of_staff",
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
          name: "competence_and_professionalism_of_staff",
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
          name: "quality_and_effectiveness_of_treatment_care",
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
          name: "clarity_of_information",
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
          name: "respect_and_dignity",
        },
        {
          label: "c. Involvement in Care Decisions",
          description:
            "Were you involved and kept informed about your care or treatment?",
          options: ["Yes", "No"],
          type: "radio",
          name: "involvement_in_care_decisions",
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
          name: "cleanliness_and_hygiene",
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
          name: "safety_and_comfort",
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
          name: "staff_attitude_and_compassion",
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
          name: "environment_and_privacy",
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
          name: "overall_satisfaction",
        },
        {
          label: "b. Likelihood of Returning or Using Again",
          description: "",
          options: [
            "1 - Very Unlikely",
            "2 - Unlikely",
            "3 - Neutral",
            "4 - Likely",
            "5 - Very Likely",
          ],
          type: "radio",
          name: "likelihood_of_returning_or_using_again",
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
    }, 2000); 
  };

  const currentSection = surveySections[currentStep];
  const queryClient=useQueryClient()
  const { mutateAsync: feedbackMutation, isPending: isFeedbackPending } =
    useMutation({
      mutationFn: () => ApiCreateFeedback(responses),

      onSuccess: async () => {
        toast.success("Review Added Successfully");
      queryClient.invalidateQueries(["useCareProviderSingle"]); 

        
        setFeedbackOpen(false);
      
      },
      onError: (error) => {
        toast.error("Error While Adding Review");
      },
    });

  const handleReview = async () => {
    await feedbackMutation();
  };

  const isCurrentStepValid = currentSection.isCommentSection
    ? responses.content?.trim().length > 0 
    : currentSection.questions.every((q) => responses.hasOwnProperty(q.name));

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
          <div className="space-y-8 ">
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
                      onChange={(e) =>
                        setResponses((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              ) : (
                currentSection?.questions.map((q, qIdx) => (
                  <div key={qIdx} className="text-sm  mb-6">
                    <div className="mb-3">
                      <strong className="text-[16px] font-medium mb-1">
                        {q.label}
                      </strong>
                      {q.description && (
                        <p className="text-gray-600">{q.description}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {q.options.map((option, optIdx) => {
                        const value =
                          option.toLowerCase() === "yes"
                            ? true
                            : option.toLowerCase() === "no"
                            ? false
                            : option.includes("-")
                            ? Number(option.split(" ")[0])
                            : option;

                        return (
                          <label
                            key={optIdx}
                            className="flex items-center gap-2"
                          >
                            <input
                              type={q.type}
                              name={q.name}
                              value={value}
                              className="form-radio"
                              checked={responses[q.name] === value}
                              onChange={(e) =>
                                setResponses((prev) => ({
                                  ...prev,
                                  [q.name]: value,
                                }))
                              }
                            />
                            {option}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex flex-wrap md:gap-0 gap-3 justify-between mt-4 mb-2">
            {currentStep > 0 ? (
              <button
                type="button"
                className="bg-gray-200 cursor-pointer  md:w-[100px] w-full  h-[46px] !rounded-[10px] px-4 py-[10px] font-semibold leading-[33px] gap-[10px] flex items-center justify-center text-black hover:bg-[#f2f2f2] transition-colors"
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
                onClick={handleNext}
                disabled={!isCurrentStepValid}
                className={` md:w-[100px] w-full h-[46px] px-4 py-[10px] !rounded-[10px] font-semibold leading-[33px] flex items-center justify-center transition-colors gap-[10px] 
      ${
        !isCurrentStepValid
          ? "bg-gray-300 cursor-not-allowed text-white"
          : "bg-[#28A2FF] hover:bg-[#2196F3] text-white"
      }`}
              >
                Next
              </button>
            ) : (
              <PrimaryButton
                btnText={`${
                  isFeedbackPending ? "Posting..." : "Post A Review"
                }`}
                showImg={false}
                disabled={!isCurrentStepValid || isFeedbackPending}
                btnClass={`border-1 md:w-[200px] w-full  h-[46px] !rounded-[10px] px-4 py-[10px] font-semibold leading-[33px] gap-[10px] flex items-center justify-center transition-colors ${
                  !isCurrentStepValid || isFeedbackPending
                    ? "bg-gray-300 text-white cursor-not-allowed"
                    : "bg-[#28A2FF] hover:bg-[#2196F3] text-white"
                }`}
                onClick={handleReview}
              />
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default FeedbackForm;

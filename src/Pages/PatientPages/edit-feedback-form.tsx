import React, { useEffect, useState } from "react";
import { FaFaceGrinStars } from "react-icons/fa6";
import TextField from "@components/careprovider/communityforum/text-field";
import { PrimaryButton } from "@components/shared-components/buttons/common-button/common-button";
import { useNavigate, useParams } from "react-router-dom";
import Model from "@components/model/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiCreateFeedback } from "@src/api/api-dashboard";
import toast from "react-hot-toast";
import Spinner from "@components/loaders/spinner";
import { useApiMySingleReviews } from "@src/hooks/use-my-reviews";
import { ApiUpdateReview } from "@src/api/api-my-reviews";

const EditFeedbackForm = ({ setFeedbackOpen }) => {
  const { id } = useParams();
  const { data } = useApiMySingleReviews(id);

  const [currentStep, setCurrentStep] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const [responses, setResponses] = useState({
    care_provider_id: data?.care_provider_id,
  });
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
  // Api

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
      // navigate("/patient/patient-reviews");
    }, 2000); // 2 seconds delay
  };

  const currentSection = surveySections[currentStep];
  const queryClient=useQueryClient()

  const { mutateAsync: feedbackMutation, isPending: isFeedbackPending } =
    useMutation({
      mutationFn: () => ApiUpdateReview(responses, id),

      onSuccess: async () => {
        toast.success("Review Updated Successfully");
        queryClient.invalidateQueries(["useApiMySingleReviews"]); // refetch list
        navigate(`/patient/patient-reviews`);

        setFeedbackOpen(false);
        // navigate(`/patient/hospital-profile/${id}`);
      },
      onError: (error) => {
        // toast.error("Error While Updating Review");
      },
    });

  const handleReview = async () => {
    await feedbackMutation();
  };

  // useEffect(() => {
  //   if (data?.feedback) {
  //     setResponses(data.feedback);
  //   }
  // }, [data?.feedback]);

  //   useEffect(() => {
  //   setResponses((prev) => ({
  //     ...prev,
  //     data?.feedback,
  //     care_id: 4,
  //   }));
  // }, [data?.feedback]);

  useEffect(() => {
    setResponses((prev) => ({
      ...(data?.feedback || {}), // safely spread feedback if it exists
      care_provider_id: data?.care_provider_id,
      content: data?.content,
    }));
  }, [data?.feedback]);

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
                    {/* <TextField
                      label="Add A Comment"
                      id="comment"
                      placeholder="Enter your comment here..."
                      value={data?.content}
                      row={5}
                      onChange={(e) =>
                        setResponses((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                    /> */}
                    <TextField
                      label="Add A Comment"
                      value={responses.content || ""}
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
                currentSection?.questions.map((q, qIdx) => {
                  // const feedbackExists = data?.feedback?.hasOwnProperty(q.name);
                  // const feedbackValue = data?.feedback?.[q.name];
                  // const keyExists = q.name in data?.feedback;
                  // const feedbackKey = Object.keys(data?.feedback || {}).find(
                  //   (key) => key === q.name
                  // );

                  return (
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
                                // value={option}
                                value={value}
                                className="form-radio"
                                checked={responses[q.name] == value}
                                onChange={(e) =>
                                  setResponses((prev) => ({
                                    ...prev,
                                    [q.name]: value,
                                    // care_id: 4, // ✅ add this line
                                  }))
                                }
                              />
                              {option}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
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
                btnText={`${
                  isFeedbackPending ? "Posting..." : "Post A Review"
                }`}
                showImg={false}
                btnClass="border-1 w-[200px] h-[46px] !rounded-[10px] px-4 py-[10px] text-white font-semibold leading-[33px] gap-[10px] flex items-center justify-center bg-[#28A2FF] hover:bg-[#2196F3] transition-colors"
                onClick={handleReview}
              />
            )}
          </div>
          {/* {showThankYou && (
            <div className="text-sm">
              <p>Thank you for your valuable feedback!</p>
            </div>
          )} */}
        </form>
      </div>
    </>
  );
};

export default EditFeedbackForm;

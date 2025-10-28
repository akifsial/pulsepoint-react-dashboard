import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import type { ReactElement } from "react";

interface RatingStarsProps {
  value: number | string | undefined;
  onChange?: (value: number) => void;
  maxWidth?: number;
  maxHeight?: number;
  isDisabled?: boolean;
  activeFillColor?: string;
  inactiveFillColor?: string;
  activeStrokeColor?: string;
  inactiveStrokeColor?: string;
  itemShapes?: ReactElement;
}

const RatingStars = ({
  value,
  onChange = () => {},
  maxWidth = 90,
  maxHeight = 90,
  isDisabled = false,
  activeFillColor = "#FFD700",
  inactiveFillColor = "white",
  activeStrokeColor = "#FFD700",
  inactiveStrokeColor = "#214836",
  itemShapes = (
    <path d="M8.88623 0.166382L10.9069 6.38523H17.4457L12.1557 10.2287L14.1763 16.4475L8.88623 12.6041L3.59616 16.4475L5.61679 10.2287L0.326722 6.38523H6.8656L8.88623 0.166382Z" />
  ),
}: RatingStarsProps) => {
  const myStyles: any = {
    itemShapes,
    itemStrokeWidth: 1,
    activeFillColor,
    activeStrokeColor,
    inactiveFillColor,
    inactiveStrokeColor,
  };

  return (
    <Rating
      style={{
        maxWidth,
        maxHeight,
        opacity: 1,
        cursor: isDisabled ? "auto" : "pointer",
      }}
      value={Number(value)}      
      onChange={onChange}
      itemStyles={myStyles}
      isDisabled={isDisabled}
      
    />
  );
};

export default RatingStars;

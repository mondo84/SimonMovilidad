import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactElement } from "react";

type GenericTooltipProps = {
  text: string;
  children: ReactElement;
  side?: "top" | "bottom" | "left" | "right";
};

const GenericTooltip = ({ text, children, side }: GenericTooltipProps) => {
  return (
    <Tooltip key={text}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>
        <span>{text}</span>
      </TooltipContent>
    </Tooltip>
  );
};

export default GenericTooltip;

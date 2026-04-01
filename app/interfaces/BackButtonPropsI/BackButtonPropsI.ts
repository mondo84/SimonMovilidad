import { CSSProperties, MouseEventHandler } from "react";

export interface BackButtonPropsI {
  onClickEvn: MouseEventHandler<HTMLButtonElement>;
  styleConfig?: CSSProperties;
  Title: string;
  IconName?: string;
}

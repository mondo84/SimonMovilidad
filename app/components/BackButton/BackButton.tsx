"use client";
import { BackButtonPropsI } from "@/app/interfaces/BackButtonPropsI/BackButtonPropsI";
import {
  UserGroupIcon,
  ArrowLeftIcon,
  HomeIcon,
  Cog8ToothIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowLeftStartOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  QuestionMarkCircleIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";

const BackButton = ({
  onClickEvn,
  styleConfig,
  Title,
  IconName,
}: BackButtonPropsI) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "HomeIcon":
        return <HomeIcon className="size-6" title={Title} />;
      case "UserGroupIcon":
        return <UserGroupIcon className="size-6" title={Title} />;
      case "ArrawLeftIcon":
        return <ArrowLeftIcon className="size-6" title={Title} />;
      case "Cog8ToothIcon":
        return <Cog8ToothIcon className="size-6" title={Title} />;
      case "ArrowTrendingUpIcon":
        return <ArrowTrendingUpIcon className="size-6" title={Title} />;
      case "ArrowTrendingDownIcon":
        return <ArrowTrendingDownIcon className="size-6" title={Title} />;
      case "ArrowLeftStartOnRectangleIcon":
        return (
          <ArrowLeftStartOnRectangleIcon className="size-6" title={Title} />
        );

      case "ArrowRightStartOnRectangleIcon":
        return (
          <ArrowRightStartOnRectangleIcon className="size-6" title={Title} />
        );

      case "ChartPieIcon":
        return <ChartPieIcon className="size-6" title={Title} />;

      default:
        return <QuestionMarkCircleIcon className="size-6" title="Not Found" />;
    }
  };

  return (
    <button
      style={styleConfig}
      className="p-4 hover:bg-gray-800 rounded"
      onClick={onClickEvn}
    >
      {getIcon(IconName ?? "")}
    </button>
  );
};

export default BackButton;

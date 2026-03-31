import { TiitleI } from "@/app/interfaces/TitleI/titleI";

const TitlePage = ({ title, styleConfig }: TiitleI) => {
  return <div style={styleConfig}>{title}</div>;
};

export default TitlePage;

import { TiitleI } from "../interfaces/titleI";

const TitlePage = ({ title, styleConfig }: TiitleI) => {
  return <div style={styleConfig}>{title}</div>;
};

export default TitlePage;

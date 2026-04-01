import {
  Grid,
  IApi,
  IColumn,
  IColumnConfig,
  WillowDark,
} from "@svar-ui/react-grid";

const ListComponent = ({
  data,
  columns,
  init,
  styleWrapperTable = "",
  cellStyle = () => "",
  rowStyle = () => "",
  columnStyle = () => "",
}: {
  data: any[] | undefined;
  columns: IColumnConfig[];
  init?: (api: IApi) => void;
  styleWrapperTable?: string;
  cellStyle?: (row: any, column: IColumn) => string;
  rowStyle?: (row: any) => string;
  columnStyle?: (row: IColumn) => string;
}) => {
  return (
    <WillowDark fonts={false}>
      <div className={styleWrapperTable}>
        <Grid
          autoRowHeight={false}
          data={data}
          columns={columns}
          multiselect={true}
          cellStyle={(row, cell) => cellStyle(row, cell)}
          rowStyle={(row) => rowStyle(row)}
          columnStyle={(col) => columnStyle(col)}
          init={init}
          filterValues={() => null}
        />
      </div>
    </WillowDark>
  );
};

export default ListComponent;

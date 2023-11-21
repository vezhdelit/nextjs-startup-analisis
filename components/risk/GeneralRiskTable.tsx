import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Criteria } from "@/types";

interface GeneralRiskTableProps {
  xOR: number;
  xIR: number;
  xFR: number;
  xIAR: number;
  zOR: number;
  zIR: number;
  zFR: number;
  zIAR: number;
  title: string;
}

const GeneralRiskTable = ({
  xOR,
  xIR,
  xFR,
  xIAR,
  zOR,
  zIR,
  zFR,
  zIAR,
  title,
}: GeneralRiskTableProps) => {
  return (
    <div className=" flex flex-col md:flex-row gap-8">
      <div className="flex flex-col">
        <h2 className="p-4 font-medium">{title}</h2>
        <div className="border rounded-lg ">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className=" bg-blue-50 font-medium">uOR</TableCell>
                <TableCell>{xOR}</TableCell>
                <TableCell>{zOR}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className=" bg-blue-50 font-medium">uIR</TableCell>
                <TableCell>{xIR}</TableCell>
                <TableCell>{zIR}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className=" bg-blue-50 font-medium">uFR</TableCell>
                <TableCell>{xFR}</TableCell>
                <TableCell>{zFR}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className=" bg-blue-50 font-medium">uIAR</TableCell>
                <TableCell>{xIAR}</TableCell>
                <TableCell>{zIAR}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default GeneralRiskTable;

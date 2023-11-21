import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Criteria } from "@/types";

interface RiskInputTablesProps {
  uOR: any;
  uIR: any;
  uFR: any;
  uIAR: any;
  title: string;
}

const RiskUTable = ({ uOR, uIR, uFR, uIAR, title }: RiskInputTablesProps) => {
  return (
    <div className=" flex flex-col md:flex-row gap-8">
      <div className="flex flex-col">
        <h2 className="p-4 font-medium">{title}</h2>
        <div className="border rounded-lg ">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className=" bg-blue-50 font-medium">uOR</TableCell>
                <TableCell>{uOR.lingusticValue}</TableCell>
                <TableCell>{uOR.aggregatedValue}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className=" bg-blue-50 font-medium">uIR</TableCell>
                <TableCell>{uIR.lingusticValue}</TableCell>
                <TableCell>{uIR.aggregatedValue}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className=" bg-blue-50 font-medium">uFR</TableCell>
                <TableCell>{uFR.lingusticValue}</TableCell>
                <TableCell>{uFR.aggregatedValue}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className=" bg-blue-50 font-medium">uIAR</TableCell>
                <TableCell>{uIAR.lingusticValue}</TableCell>
                <TableCell>{uIAR.aggregatedValue}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RiskUTable;

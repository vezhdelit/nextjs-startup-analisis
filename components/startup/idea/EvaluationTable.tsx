import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Label } from "@radix-ui/react-label";

interface EvaluationTableTableProps {
  uO: number[];
}

const EvaluationTable = ({ uO }: EvaluationTableTableProps) => {
  return (
    <div className="flex flex-col">
      <h2 className="p-4 font-medium">Оцінки по кожній групі категорій</h2>
      <div className="border rounded-lg ">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className=" bg-blue-50 font-medium">uO</TableCell>
              {uO.map((number, index) => (
                <TableCell key={index}>
                  <Input disabled value={number} />
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EvaluationTable;

import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";

interface MultiCriteriaTableProps {
  D: any;
  setD: any;
  title: string;
  disabled?: boolean;
}

const DominationTable = ({
  D,
  setD,
  title,
  disabled = false,
}: MultiCriteriaTableProps) => {
  return (
    <div className=" flex flex-col md:flex-row gap-8">
      <div className="flex flex-col">
        <h2 className="p-4 font-medium">{title}</h2>
        <div className="border rounded-lg ">
          <Table>
            <TableBody>
              {D.map((obj: any, rowIndex: number) => (
                <TableRow key={rowIndex}>
                  <TableCell className=" bg-blue-50 font-medium">
                    X{rowIndex + 1}
                  </TableCell>
                  {Object.entries(obj).map(([key, value], index) => (
                    <TableCell key={index}>
                      <Input
                        disabled={disabled}
                        className="w-[100px]"
                        type="text"
                        value={`${value} / 9`}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DominationTable;

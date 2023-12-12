import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface OTableProps {
  K: any;
  title: string;
}

const OTable = ({ K, title }: OTableProps) => {
  return (
    <div className=" flex flex-col md:flex-row gap-8">
      <div className="flex flex-col">
        <h2 className="p-4 font-medium">{title}</h2>
        <div className="border rounded-lg ">
          <Table>
            <TableBody>
              {K.map((number: number, index: number) => (
                <TableRow key={index}>
                  <TableCell className=" bg-blue-50 font-medium">
                    U{index}
                  </TableCell>
                  <TableCell>
                    <Input
                      className="w-[80px]"
                      type="number"
                      value={number.toFixed(2)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default OTable;

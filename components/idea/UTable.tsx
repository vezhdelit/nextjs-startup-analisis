import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Label } from "@radix-ui/react-label";

interface UTableProps {
  Uj: number[][];
  uUj: number[][];
  UjStar: number[];
}

const UTable = ({ Uj, uUj, UjStar }: UTableProps) => {
  return (
    <div className="flex flex-col">
      <h2 className="p-4 font-medium">Таблиця термів U</h2>
      <div className="border rounded-lg ">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className=" bg-blue-50 font-medium">Uj</TableCell>
              {Uj.map((arr, index) => (
                <TableCell key={index}>
                  <Input
                    disabled
                    value={arr.map((number, index) =>
                      index === 1 ? ` або U${number}` : `U${number}`
                    )}
                  />
                </TableCell>
              ))}
            </TableRow>

            <TableRow>
              <TableCell className=" bg-blue-50 font-medium">uUj</TableCell>
              {uUj.map((arr, index) => (
                <TableCell key={index}>
                  <Input
                    disabled
                    value={arr.map((number, index) =>
                      index === 1 ? ` або U = ${number}` : `U = ${number}`
                    )}
                  />
                </TableCell>
              ))}
            </TableRow>

            <TableRow>
              <TableCell className=" bg-blue-50 font-medium">Uj*</TableCell>
              {UjStar.map((number, index) => (
                <TableCell key={index}>
                  <Input disabled value={`U${number}`} />
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UTable;

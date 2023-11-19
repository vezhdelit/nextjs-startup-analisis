import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface ModelOneTableProps {
  G: number[];
  fG: number[];

  T: number[];
  fT: number[];
}

const ModelOneTable = ({ G, fG, T, fT }: ModelOneTableProps) => {
  return (
    <div className="flex flex-col">
      <h2 className="p-4 font-medium">Model One Table</h2>
      <div className="border rounded-lg ">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className=" bg-blue-50 font-medium">G</TableCell>
              {G.map((number, index) => (
                <TableCell key={index}>
                  <Input value={number} disabled />
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className=" bg-blue-50 font-medium">fG</TableCell>
              {fG.map((number, index) => (
                <TableCell key={index}>
                  <Input value={number} disabled />
                </TableCell>
              ))}
            </TableRow>

            <TableRow>
              <TableCell className=" bg-blue-50 font-medium">T</TableCell>
              {T.map((number, index) => (
                <TableCell key={index}>
                  <Input value={number} disabled />
                </TableCell>
              ))}
            </TableRow>

            <TableRow>
              <TableCell className=" bg-blue-50 font-medium">fT</TableCell>
              {fT.map((number, index) => (
                <TableCell key={index}>
                  <Input value={number} disabled />
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ModelOneTable;

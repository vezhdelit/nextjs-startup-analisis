import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface InputTablesProps {
  K: number[];
  setK: any;
}

const InputTables = ({ K, setK }: InputTablesProps) => {
  const handleInputChange = (
    value: number,
    index: number,
    array: any,
    arraySetter: any
  ) => {
    const newArray = [...array];
    newArray[index] = value;
    arraySetter(newArray);
  };

  return (
    <div className=" flex flex-col md:flex-row gap-8">
      <div className="flex flex-col">
        <h2 className="p-4 font-medium">Survey Data</h2>
        <div className="border rounded-lg ">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className=" bg-blue-50 font-medium">G</TableCell>
                {K.map((number, index) => (
                  <TableCell key={index}>
                    <Input
                      type="number"
                      value={number}
                      onChange={(e) =>
                        handleInputChange(
                          parseInt(e.target.value),
                          index,
                          K,
                          setK
                        )
                      }
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default InputTables;

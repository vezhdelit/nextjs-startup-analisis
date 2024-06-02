import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface MultiCriteriaTableProps {
  K: any;
  setK: any;
  title: string;
  disabled?: boolean;
}

const MultiCriteriaTable = ({
  K,
  setK,
  title,
  disabled = false,
}: MultiCriteriaTableProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    property: string
  ) => {
    const updatedK = [...K];
    updatedK[index][property] = e.target.value;
    setK(updatedK);
  };
  const properties = ["valuability", "x1", "x2", "x3", "x4"];

  return (
    <div className=" flex flex-col md:flex-row gap-8">
      <div className="flex flex-col">
        <h2 className="p-4 font-medium">{title}</h2>
        <div className="border rounded-lg ">
          <Table>
            <TableBody>
              {K.map((obj: any, rowIndex: number) => (
                <TableRow key={rowIndex}>
                  <TableCell className=" bg-blue-50 font-medium">
                    K{rowIndex}
                  </TableCell>
                  {properties.map((property: string, cellIndex: number) => (
                    <TableCell key={cellIndex}>
                      <Input
                        disabled={disabled}
                        className="w-[100px]"
                        min="0"
                        max={property === "valuability" ? "10" : "1"}
                        step={property === "valuability" ? "1" : "0.01"}
                        type="number"
                        value={obj[property]}
                        onChange={(e) => handleChange(e, rowIndex, property)}
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

export default MultiCriteriaTable;

import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";

interface MultiCriteriaTableProps {
  K: any;
  setK: any;
  title: string;
  disabled?: boolean;
}

const MultiCriteriaTableAdvanced = ({
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
  const properties = Object.keys(K[0] || {});

  return (
    <div className=" flex flex-col md:flex-row gap-8">
      <div className="flex flex-col">
        <h2 className="p-4 font-medium">{title}</h2>
        <div className="border rounded-lg ">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className=" bg-blue-100 font-medium"></TableCell>
                {properties.map((property: string, cellIndex: number) => (
                  <TableCell className="bg-blue-100" key={cellIndex}>
                    <Label>{property}</Label>
                  </TableCell>
                ))}
              </TableRow>
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
                        step={"1"}
                        type="number"
                        value={obj[property].toFixed(2)}
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

export default MultiCriteriaTableAdvanced;

import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Criteria } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RiskInputTablesProps {
  K: any;
  setK: any;
  title: string;
}

const RiskInputTables = ({ K, setK, title }: RiskInputTablesProps) => {
  const handleInputChange = (
    value: number,
    index: number,
    array: any,
    arraySetter: any
  ) => {
    const newArray = [...array];
    newArray[index].credibility = value;
    arraySetter(newArray);
  };

  const handleSelectChange = (
    value: string,
    index: number,
    array: any,
    arraySetter: any
  ) => {
    const newArray = [...array];
    newArray[index].lingusticValue = value;
    arraySetter(newArray);
  };

  return (
    <div className=" flex flex-col md:flex-row gap-8">
      <div className="flex flex-col">
        <h2 className="p-4 font-medium">{title}</h2>
        <div className="border rounded-lg ">
          <Table>
            <TableBody>
              {K.map((obj: Criteria, index: number) => (
                <TableRow key={index}>
                  <TableCell className=" bg-blue-50 font-medium">
                    K{index}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={obj.lingusticValue}
                      onValueChange={(value) =>
                        handleSelectChange(value, index, K, setK)
                      }
                    >
                      <SelectTrigger className="w-[70px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="H">H</SelectItem>
                          <SelectItem value="HC">HC</SelectItem>
                          <SelectItem value="C">C</SelectItem>
                          <SelectItem value="BC">BC</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      className="w-[80px]"
                      min="0"
                      max="1"
                      step="0.1"
                      type="number"
                      value={obj.credibility}
                      onChange={(e) =>
                        handleInputChange(
                          parseFloat(e.target.value),
                          index,
                          K,
                          setK
                        )
                      }
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

export default RiskInputTables;

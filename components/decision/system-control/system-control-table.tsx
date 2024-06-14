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
import { SystemControlCriteria } from "@/lib/system-control-analisis";

interface RiskInputTablesProps {
  K: any;
  setK: any;
  title: string;
}

const SystemControlTable = ({ K, setK, title }: RiskInputTablesProps) => {
  const handleInputChange = (
    value: number,
    index: number,
    param: any,
    array: any,
    arraySetter: any
  ) => {
    const newArray = [...array];
    newArray[index][param] = value;
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
              <TableRow className=" -my-1 h-8">
                <TableCell className=" -my-1 h-8 bg-blue-50 font-medium text-center">
                  Активи <br/> системи
                </TableCell>
                <TableCell className=" -my-1 h-8 bg-blue-50 font-medium">
                  Ступінь ризику
                </TableCell>
                <TableCell className=" -my-1 h-8 bg-blue-50 font-medium">
                  Рівень захищеності
                </TableCell>
                <TableCell className=" -my-1 h-8 bg-blue-50 font-medium">
                  Вага
                </TableCell>
              </TableRow>
              {K.map((obj: SystemControlCriteria, index: number) => (
                <TableRow className=" -my-1 h-8" key={index}>
                  <TableCell className=" -my-1 h-8 bg-blue-50 font-medium">
                    K{index + 1}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={obj.lingusticValue}
                      onValueChange={(value) =>
                        handleSelectChange(value, index, K, setK)
                      }
                    >
                      <SelectTrigger className=" -my-1 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="T5">T5</SelectItem>
                          <SelectItem value="T4">T4</SelectItem>
                          <SelectItem value="T3">T3</SelectItem>
                          <SelectItem value="T2">T2</SelectItem>
                          <SelectItem value="T1">T1</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      className=" -my-1 h-8"
                      min="0"
                      max="1"
                      step="0.1"
                      type="number"
                      value={obj.safety}
                      onChange={(e) =>
                        handleInputChange(
                          parseFloat(e.target.value),
                          index,
                          "safety",
                          K,
                          setK
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      className=" -my-1 h-8"
                      min="0"
                      max="10"
                      step="1"
                      type="number"
                      value={obj.weight}
                      onChange={(e) =>
                        handleInputChange(
                          parseFloat(e.target.value),
                          index,
                          "weight",
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

export default SystemControlTable;

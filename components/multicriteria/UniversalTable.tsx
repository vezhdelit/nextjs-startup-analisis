import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Label } from "../ui/label";
import { Check } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface UniversalTableProps {
  K: any;
  setK: any;
  title: string;
  disabled?: boolean;
}

const UniversalTable = ({
  K,
  setK,
  title,
  disabled = false,
}: UniversalTableProps) => {
  const handleSelectChange = (
    value: string,
    index: number,
    property: string
  ) => {
    const updatedK = [...K];
    updatedK[index][property] = value;
    setK(updatedK);
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    property: string
  ) => {
    const updatedK = [...K];
    updatedK[index][property] = +e.target.value;
    setK(updatedK);
  };
  const handleCheckbox = (value: boolean, index: number, property: string) => {
    const updatedK = [...K];
    updatedK[index][property] = value;
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
                {properties.map((property: string, cellIndex: number) => {
                  if (property == "name" || property == "variations") {
                  }
                  else {
                    return (
                      <TableCell className="bg-blue-100" key={cellIndex}>
                        <Label>{property}</Label>
                      </TableCell>
                    )
                  }
                })}
              </TableRow>
              {K.map((obj: any, rowIndex: number) => (
                <TableRow key={rowIndex}>
                  {properties.map((property: string, cellIndex: number) => {
                    if (cellIndex == 0 && property == "name") {
                      return (
                        <TableCell className=" bg-blue-50 font-medium" key={cellIndex}>
                          <Label>{obj[property]}</Label>
                        </TableCell>
                      );
                    }
                    else if (cellIndex == 0) {
                      return (
                        <TableCell className=" bg-blue-50 font-medium" key={cellIndex}>
                          <Label>K{rowIndex}</Label>
                        </TableCell>
                      );
                    }
                    else if (property == 'x1' || property == 'x2' || property == 'x3' || property == 'x4') {
                      return (
                        <TableCell key={cellIndex}>
                          <Select
                            value={obj[property]}
                            onValueChange={(value) => handleSelectChange(value, rowIndex, property)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {
                                  obj['variations'].map((item: any, index: number) => {
                                    return (
                                      <SelectItem key={index} value={item.value}>{item.name}</SelectItem>
                                    )
                                  })
                                }
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      );
                    }
                    else if (property == 'variations') {

                    }

                    else if (property === "greater") {
                      return (
                        <TableCell key={cellIndex}>
                          <Checkbox
                            checked={obj[property]}
                            onCheckedChange={(checked) =>
                              handleCheckbox(!!checked, rowIndex, property)
                            }
                            className="data-[state=checked]:bg-blue-500 border-blue-500"
                            id="random"
                          />
                          <Label>{obj[property]}</Label>
                        </TableCell>
                      );
                    }
                    else {
                      return (
                        <TableCell key={cellIndex}>
                          <Input
                            disabled={disabled}
                            className="w-[60px]"
                            step={"1"}
                            type="number"
                            value={obj[property]}
                            onChange={(e) => handleInputChange(e, rowIndex, property)}
                          />
                        </TableCell>
                      )
                    };
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default UniversalTable;

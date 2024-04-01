import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Label } from "../ui/label";
import { Check } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

interface UniversalTableProps {
  K: any;
  setK: any;
  title: string;
  disabled?: boolean;
}

const UniversalTableDominance = ({
  K,
  setK,
  title,
  disabled = false,
}: UniversalTableProps) => {

  const variations = {
    price: [
      { "name": "5000 грн", "value": 5000 },
      { "name": "4000 грн", "value": 4000 },
      { "name": "3000 грн", "value": 3000 },
      { "name": "2000 грн", "value": 2000 },
      { "name": "1000 грн", "value": 1000 },
    ],
    count: [
      { "name": "5", "value": 5 },
      { "name": "4", "value": 4 },
      { "name": "3", "value": 3 },
      { "name": "2", "value": 2 },
      { "name": "1", "value": 1 }
    ],
    quality: [
      { "name": "Найкращі", "value": 5 },
      { "name": "Високі", "value": 4 },
      { "name": "Середні", "value": 3 },
      { "name": "Малі", "value": 2 },
      { "name": "Найгірші", "value": 1 }
    ],
    // existance: [
    //   { "name": "Наявний", "value": 1 },
    //   { "name": "Відсутній", "value": 0 },
    // ],
    boolean: [
      { "name": "Так", "value": 1 },
      { "name": "Ні", "value": 0 },
    ],
    simplicity: [
      { "name": "Дуже простий", "value": 5 },
      { "name": "Простий", "value": 4 },
      { "name": "Середній", "value": 3 },
      { "name": "Складний", "value": 2 },
      { "name": "Дуже складний", "value": 1 }
    ]
  }

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
    updatedK[index][property] = e.target.value;
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
                      // return (
                      //   <TableCell key={cellIndex}>
                      //     <Textarea
                      //       disabled={disabled}
                      //       value={obj[property]}
                      //       onChange={(e) => handleInputChange(e, rowIndex, property)}
                      //     />
                      //   </TableCell>
                      // )
                      return (
                        <TableCell className=" bg-blue-50 font-medium" key={cellIndex}>
                          <Label>{obj[property]}</Label>
                        </TableCell>
                      );
                      // return (
                      //   <TableCell className=" bg-blue-50 font-medium" key={cellIndex}>
                      //     <Input value={obj[property]} ></Input>
                      //   </TableCell>
                      // );
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
                            <SelectTrigger  className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {
                                  variations[obj.type].map((item: any, index: number) => {
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
                          <Select
                            value={obj[property]}
                            onValueChange={(value) => handleSelectChange(value, rowIndex, property)}
                          >
                            <SelectTrigger  className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {
                                  //select variations keys

                                  Object.keys(variations).map(key => {
                                    return (
                                      <SelectItem key={key} value={key}>{key}</SelectItem>
                                    )
                                  })

                                  // variations[obj.type].map((item: any, index: number) => {
                                  //   return (
                                  //     <SelectItem key={index} value={item.value}>{item.name}</SelectItem>
                                  //   )
                                  // })
                                }
                              </SelectGroup>
                            </SelectContent>
                          </Select>
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

export default UniversalTableDominance;

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface InputTablesProps {
  G: number[];
  setG: any;

  A: number[];
  setA: any;

  B: number[];
  setB: any;

  T: number[];
  setT: any;

  U: number[];
  setU: any;

  P: number[];
  setP: any;
}

const InputTables = ({
  G,
  setG,
  A,
  setA,
  B,
  setB,
  T,
  setT,
  U,
  setU,
  P,
  setP,
}: InputTablesProps) => {
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
        <h2 className="p-4 font-medium">Дані опитування</h2>
        <div className="border rounded-lg ">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className=" bg-blue-50 font-medium">G</TableCell>
                {G.map((number, index) => (
                  <TableCell key={index}>
                    <Input
                      type="number"
                      value={number}
                      onChange={(e) =>
                        handleInputChange(
                          parseInt(e.target.value),
                          index,
                          G,
                          setG
                        )
                      }
                    />
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell className=" bg-blue-50 font-medium">A</TableCell>
                {A.map((number, index) => (
                  <TableCell key={index}>
                    <Input
                      type="number"
                      value={number}
                      onChange={(e) =>
                        handleInputChange(
                          parseInt(e.target.value),
                          index,
                          A,
                          setA
                        )
                      }
                    />
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell className=" bg-blue-50  font-medium">B</TableCell>
                {B.map((number, index) => (
                  <TableCell key={index}>
                    <Input
                      type="number"
                      value={number}
                      onChange={(e) =>
                        handleInputChange(
                          parseInt(e.target.value),
                          index,
                          B,
                          setB
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

      <div>
        <h2 className="p-4 font-medium">Дані експерта</h2>
        <div className="border rounded-lg">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className=" bg-blue-50 font-medium">T</TableCell>{" "}
                {T.map((number, index) => (
                  <TableCell key={index}>
                    <Input
                      type="number"
                      value={number}
                      onChange={(e) =>
                        handleInputChange(
                          parseInt(e.target.value),
                          index,
                          T,
                          setT
                        )
                      }
                    />
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell className=" bg-blue-50 font-medium">U</TableCell>{" "}
                {U.map((number, index) => (
                  <TableCell key={index}>
                    <Input
                      type="number"
                      value={number}
                      onChange={(e) =>
                        handleInputChange(
                          parseInt(e.target.value),
                          index,
                          U,
                          setU
                        )
                      }
                    />
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell className=" bg-blue-50 font-medium">P</TableCell>
                {P.map((number, index) => (
                  <TableCell key={index}>
                    <Input
                      type="number"
                      value={number}
                      onChange={(e) =>
                        handleInputChange(
                          parseInt(e.target.value),
                          index,
                          P,
                          setP
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

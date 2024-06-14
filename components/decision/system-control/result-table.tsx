import React from "react";
import { Label } from "@/components/ui/label";
import {
  FaFaceGrin,
  FaFaceSmile,
  FaFaceMeh,
  FaFaceFrown,
  FaFaceDizzy,
} from "react-icons/fa6";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface RiskEvaluationViewProps {
  finalRes: any;
  threshold: number;
}

const ResultTable = ({ finalRes, threshold }: RiskEvaluationViewProps) => {
  if (!finalRes) return null;
  return (
    <div className="flex flex-col items-center justify-center gap-6 max-w-md">
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="bg-blue-50">Штатний режим</TableCell>
              <TableCell
                className={cn(
                  "overflow-hidden text-white font-medium",
                  finalRes.Uc1 >= threshold ? "bg-green-500" : "bg-red-500"
                )}
              >
                {finalRes.Uc1}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="bg-blue-50">Позаштатні ситуації</TableCell>
              <TableCell
                className={cn(
                  "overflow-hidden text-white font-medium",
                  finalRes.Uc2 >= threshold ? "bg-green-500" : "bg-red-500"
                )}
              >
                {finalRes.Uc2}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="bg-blue-50">Критичні ситуації</TableCell>
              <TableCell
                className={cn(
                  "overflow-hidden text-white font-medium",
                  finalRes.Uc3 >= threshold ? "bg-green-500" : "bg-red-500"
                )}
              >
                {finalRes.Uc3}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="bg-blue-50">Надзвичайні ситуації</TableCell>
              <TableCell
                className={cn(
                  "overflow-hidden text-white font-medium",
                  finalRes.Uc4 >= threshold ? "bg-green-500" : "bg-red-500"
                )}
              >
                {finalRes.Uc4}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="bg-blue-50">Аварійні ситуації</TableCell>
              <TableCell
                className={cn(
                  "overflow-hidden text-white font-medium",
                  finalRes.Uc5 >= threshold ? "bg-green-500" : "bg-red-500"
                )}
              >
                {finalRes.Uc5}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="bg-blue-50">Аварії</TableCell>
              <TableCell
                className={cn(
                  "overflow-hidden text-white font-medium",
                  finalRes.Uc6 >= threshold ? "bg-green-500" : "bg-red-500"
                )}
              >
                {finalRes.Uc6}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="bg-blue-50">
                Катастрофічні ситуації
              </TableCell>
              <TableCell
                className={cn(
                  "overflow-hidden text-white font-medium",
                  finalRes.Uc7 >= threshold ? "bg-green-500" : "bg-red-500"
                )}
              >
                {finalRes.Uc7}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="bg-blue-50">Катастрофи</TableCell>
              <TableCell
                className={cn(
                  "overflow-hidden text-white font-medium",
                  finalRes.Uc8 >= threshold ? "bg-green-500" : "bg-red-500"
                )}
              >
                {finalRes.Uc8}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ResultTable;

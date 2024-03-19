import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";

function MyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <HiOutlineQuestionMarkCircle className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="p-4 text-lg">
            Задача апроксимації функції на основі генетичний алгоритму. Пошук
            мінімуму і максимуму функції.
          </DialogTitle>
          <DialogDescription className="flex flex-col p-4 gap-4">
            <p className="text-base">
              Даний застосунок апроксимазує функцію двох змінних (кожна моя
              особина має хромосому з двома генами). Можна взяти і функцію з
              великою кількістю змінних, необхідно лише змінити константу
              кількості генів у хромосомі і відповідно змінити саму
              фітнес-функцію.
            </p>
            <p className="text-base">
              У константах програми такі значення: <br />
              POPULATION_SIZE = 100 # кількість індивідуумів у популяції <br />
              MAX_GENERATIONS = 200 # максимальна кількість поколінь <br />
              P_CROSSOVER = 0.9 # ймовірність схрещування <br />
              P_MUTATION = 0.1 # ймовірність мутації індивідуума <br />
              N_VECTOR = 2 # кількість генів у хромосомі <br />
              LIMIT_VALUE_TOP = 100 # верхня межа <br />
              LIMIT_VALUE_DOWN = -100 # нижня межа
            </p>
            <p className="text-base">
              Вводиться цільова функція виду: <br /> f[0]**2 + 1.5 * f[1]**2 - 2
              * f[0] * f[1] + 4 * f[0] - 8 * f[1] <br />
            </p>
            <p className="text-base font-medium text-red-500">
              Змінні обовязкові бути в вигляді масива з відповідними інтедксами
              для кожної змінної(x - f[0], y - f[1])*
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4"></div>
      </DialogContent>
    </Dialog>
  );
}

export default MyDialog;

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";

function MyDialogV2() {
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
              Даний застосунок апроксимазує функцію з двома або трьома змінними.
            </p>
            <p className="text-base">
              У константах програми такі значення: <br />
              POPULATION_SIZE = 100 # кількість індивідуумів у популяції <br />
              MAX_GENERATIONS = 200 # максимальна кількість поколінь <br />
              P_CROSSOVER = 0.9 # ймовірність схрещування <br />
              P_MUTATION = 0.1 # ймовірність мутації індивідуума <br />
              LIMIT_VALUE_TOP = 100 # верхня межа <br />
              LIMIT_VALUE_DOWN = -100 # нижня межа
            </p>
            <p className="text-base">
              Вводиться цільова функція виду: <br /> x^2 + 1.5y^2 - 2xy + 4x -
              8y <br />
            </p>
            <p className="text-base">
              Змінні використовуються з діапазону значень [x, y, z, w]
              {/* <br /> Значення обирати не довільно!. <br /> */}
            </p>
            <p className="text-base font-medium text-red-500">
              Заборонено функцію вигляду:
              <br /> y^2 + 1.5z^2 - 2yz + 4y - 8z
              <br />
              <br />
              <span>
                При функції з двома змінними використовуються змінні x та y, а
                не y та z
              </span>
            </p>

            {/* <p className="text-base">
              Наприклад:
              <br />1 змінна - використовуються значення х
              <br />2 змінні - використовуються значення х та у
              <br />3 змінні - використовуються значення х, у та z
              <br />3 змінні - використовуються значення х, у та z
            </p> */}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4"></div>
      </DialogContent>
    </Dialog>
  );
}

export default MyDialogV2;

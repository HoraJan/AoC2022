import { Test } from '.';

const parseMonkies = (inputString: string) => {
  const monkies = inputString.split('\n\n').map(monkey => {
    const items = /Starting items: (?<items>[\d, ]*)/.exec(monkey)
    const formula = /Operation: new = (?<formula>old .*)/.exec(monkey)
    const formulaObject = /(?<first>[^\s]+) (?<operator>[+*]) (?<second>[^\s]+)/.exec(formula.groups.formula)
    const test = /Test: divisible by (?<test>\d*)/.exec(monkey)
    const nextMonkyTrue = /If true: throw to monkey (?<nextMonkyTrue>\d*)/.exec(monkey)
    const nextMonkyFalse = /If false: throw to monkey (?<nextMonkyFalse>\d*)/.exec(monkey)
    return {
      items: items.groups.items.split(', ').map(Number),
      formula: formulaObject.groups,
      test: Number(test.groups.test),
      nextMonkyTrue: nextMonkyTrue.groups.nextMonkyTrue,
      nextMonkyFalse: nextMonkyFalse.groups.nextMonkyFalse,
      itemsInspected: 0,
    }
  })

  return monkies
};

const getNewItem = (item: number, formula: {
  [key: string]: string;
}) => {
  const first = formula.first === 'old' ? item : Number(formula.first)
  const second = formula.second === 'old' ? item : Number(formula.second)

  return formula.operator === '+' ? first + second : first * second
}

const solve = (inputString: string, rounds: number, dividedBy: number) => {
  const monkies = parseMonkies(inputString)
  const tests = monkies.map(({ test }) => test).reduce((acc, curr) => acc * curr, 1)

  for (let round = 0; round < rounds; round++) {
    for (const monkey of monkies) {
      while (monkey.items.length) {
        monkey.itemsInspected++;
        const item = monkey.items.shift()
        const newItem = Math.floor(getNewItem(item, monkey.formula) / dividedBy) % tests
        if (newItem % monkey.test === 0) {
          monkies[monkey.nextMonkyTrue].items.push(newItem)
          continue;
        }

        monkies[monkey.nextMonkyFalse].items.push(newItem)
      }
    }
  }

  const [most, second] = monkies.map(({ itemsInspected }) => itemsInspected).sort((a, b) => b - a)

  return most * second
}

export const first = (inputString: string) => {
  return solve(inputString, 20, 3)
};

export const second = (inputString: string) => {
  return solve(inputString, 10000, 1)
};

export const tests: Test[] = [{
  input: `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`,
  results: {
    first: 10605,
    second: 2713310158,
  },
}];

export const input = `Monkey 0:
Starting items: 56, 52, 58, 96, 70, 75, 72
Operation: new = old * 17
Test: divisible by 11
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 75, 58, 86, 80, 55, 81
Operation: new = old + 7
Test: divisible by 3
  If true: throw to monkey 6
  If false: throw to monkey 5

Monkey 2:
Starting items: 73, 68, 73, 90
Operation: new = old * old
Test: divisible by 5
  If true: throw to monkey 1
  If false: throw to monkey 7

Monkey 3:
Starting items: 72, 89, 55, 51, 59
Operation: new = old + 1
Test: divisible by 7
  If true: throw to monkey 2
  If false: throw to monkey 7

Monkey 4:
Starting items: 76, 76, 91
Operation: new = old * 3
Test: divisible by 19
  If true: throw to monkey 0
  If false: throw to monkey 3

Monkey 5:
Starting items: 88
Operation: new = old + 4
Test: divisible by 2
  If true: throw to monkey 6
  If false: throw to monkey 4

Monkey 6:
Starting items: 64, 63, 56, 50, 77, 55, 55, 86
Operation: new = old + 8
Test: divisible by 13
  If true: throw to monkey 4
  If false: throw to monkey 0

Monkey 7:
Starting items: 79, 58
Operation: new = old + 6
Test: divisible by 17
  If true: throw to monkey 1
  If false: throw to monkey 5`;

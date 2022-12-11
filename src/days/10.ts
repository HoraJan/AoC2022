import { Test } from '.';

const getChar = (cycle: number, value: number) => {
  if (Math.abs(cycle % 40 - value) < 2) return '█'

  return ' '
}

const solve = (inputString: string) => {
  const instructions = inputString.split('\n')
  let cycle = 0
  let value = 1
  let sum = 0
  const image: string[] = []

  while (instructions.length) {
    const instruction = instructions.shift()

    image.push(getChar(cycle, value))
    cycle++;
    sum += cycle % 40 === 20 ? cycle * value : 0

    if (instruction === 'noop') continue;

    image.push(getChar(cycle, value))
    cycle++;
    sum += cycle % 40 === 20 ? cycle * value : 0
    value += Number(instruction.split(' ')[1])
  }

  return { image, sum }
};

export const first = (inputString: string) => {
  return solve(inputString).sum
};

export const second = (inputString: string) => {
  const { image } = solve(inputString)

  for (let i = 0; i < image.length; i += 40) {
    console.log(image.slice(i, i + 40).join(''))
  }

  return -1
};

export const tests: Test[] = [{
  input: `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`,
  results: {
    first: 13140,
    // second: -1,
  },
}];

export const input = `addx 1
addx 5
noop
addx -1
noop
noop
addx 6
addx 15
addx -9
noop
addx -1
addx 4
addx 2
addx -22
addx 27
addx -1
addx 4
noop
addx 1
addx 2
noop
noop
noop
noop
addx 1
addx -33
addx 2
addx 5
addx 2
addx 3
addx -2
addx 7
noop
addx -2
addx -8
addx 15
addx 5
noop
noop
addx -2
addx 2
noop
noop
addx 7
addx -14
noop
addx -2
addx -17
addx 5
addx -4
noop
addx 23
addx -18
noop
noop
noop
addx 28
addx -18
addx 4
noop
noop
addx -5
addx 1
addx 10
addx 2
noop
noop
addx -30
addx 33
addx -32
noop
noop
addx -2
addx 6
addx -2
addx 4
addx 3
addx 19
addx 10
addx -5
addx -16
addx 3
addx -2
addx 17
addx -19
addx 11
addx 2
addx 9
noop
addx -4
addx -6
addx -7
addx -24
noop
addx 7
addx -2
addx 5
addx 2
addx 3
addx -2
addx 2
addx 5
addx 2
addx 7
addx -2
noop
addx 3
addx -2
addx 2
addx 7
noop
addx -2
addx -34
addx 1
addx 1
noop
noop
noop
addx 5
noop
noop
addx 5
addx -1
noop
addx 6
addx -1
noop
addx 4
addx 3
addx 4
addx -1
addx 5
noop
addx 5
noop
noop
noop
noop
noop
addx 1
noop
noop`;

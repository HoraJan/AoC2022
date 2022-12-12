import { Test } from '.';

const solve = (inputString: string) => {
  const sizeX = inputString.split('\n')[0].length
  const flatArr = inputString.split('\n').flatMap(line => line.split(''))
  const start = flatArr.indexOf('S')
  const end = flatArr.indexOf('E')
  const startX = Math.floor(start / sizeX)
  const startY = start % sizeX
  const endX = Math.floor(end / sizeX)
  const endY = end % sizeX

  inputString = inputString.replace('S', 'a')
  inputString = inputString.replace('E', 'z')
  const arr = inputString.split('\n').map(line => line.split(''))

  const ready = [`${startX}-${startY}`]
  const score = { [`${startX}-${startY}`]: 0 }

  while (ready.length) {
    const [x, y] = ready.shift().split('-').map(Number);
    const current = arr[x][y].charCodeAt(0)
    const posibilities = [[x, y - 1], [x, y + 1], [x - 1, y], [x + 1, y]]

    for (let i = 0; i < posibilities.length; i++) {
      const [newX, newY] = posibilities[i]
      const newPosition = arr[newX]?.[newY]
      if (!newPosition) continue

      if (newPosition.charCodeAt(0) - current > 1) continue

      const newScore = score[`${newX}-${newY}`]
      const currentScore = score[`${x}-${y}`]

      if (newScore && newScore - currentScore < 2) continue

      score[`${newX}-${newY}`] = score[`${x}-${y}`] + 1
      if (newX === endX && newY === endY) return score[`${newX}-${newY}`]
      ready.push(`${newX}-${newY}`)
    }
  }
}

export const first = (inputString: string) => {
  return solve(inputString)
};

export const second = (inputString: string) => {
  const indexes = []
  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] === 'a' || inputString[i] === 'S') indexes.push(i)
  }
  const score = []

  indexes.forEach(index => {
    let newInput = inputString
    newInput = newInput.replace('S', 'a')
    newInput = newInput.slice(0, index) + 'S' + newInput.slice(index + 1)

    score.push(solve(newInput))
  })

  return Math.min(...score.filter(a => !!a))
};

export const tests: Test[] = [{
  input: `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`,
  results: {
    first: 31,
    second: 29,
  },
}];

export const input = `abaaaaacaaaacccccccccaaaaaaccccccccccccccccccccccccccccccccccaaaaaa
abaaaaacaaaaccccaaaaaaaaaacccccccccccccccccccccccccccccccccccaaaaaa
abaaacccaaaaccccaaaaaaaaaaacccaacccccccccccaacccccccccccccccccaaaaa
abaaaacccaacccccaaaaaaaaaaaaaaaaacccccccccccacccccccccccccccccccaaa
abacaacccccccccccaaaaaaaaaaaaaaaaccccccccccaacccccccccccccccccccaaa
abcccacccccccccccaaaaaaaccaaaaaaaccccccccccclllcccccacccccccccccaac
abccccccccccccccccaaaaaccccccccccccccccccclllllllcccccccccccccccccc
abaaacccccccccccccaaaaaccccccccccccccccaakklllllllcccccccccaacccccc
abaaacccccccccccacccaaaccccccccccccccccakkklpppllllccddaaacaacccccc
abaaacccaaacccccaacaaaccccccccccccccccckkkkpppppllllcddddaaaacccccc
abaacccaaaacccccaaaaaccccccccccccccccckkkkpppppppllmmddddddaaaacccc
abaaaccaaaaccccccaaaaaacaaacccccccccckkkkpppuuuppplmmmmdddddaaacccc
abaaacccaaaccccaaaaaaaacaaaaccccccckkkkkoppuuuuuppqmmmmmmdddddacccc
abcccccccccccccaaaaaaaacaaaacccccjkkkkkooppuuuuuuqqqmmmmmmmddddcccc
abccccccccccccccccaaccccaaaccccjjjjkoooooouuuxuuuqqqqqqmmmmmddecccc
abacaaccccccccccccaacccccccccccjjjjoooooouuuxxxuvvqqqqqqqmmmeeecccc
abaaaacccccccacccaccccccccccccjjjjoootuuuuuuxxxyvvvvvqqqqmmmeeecccc
abaaaaacccccaaacaaacccccccccccjjjoooottuuuuuxxyyvvvvvvvqqmnneeecccc
abaaaaaccaaaaaaaaaaccccccccaccjjjooottttxxxxxxyyyyyyvvvqqnnneeecccc
abaaaccccaaaaaaaaaacccccccaaccjjjoootttxxxxxxxyyyyyyvvqqqnnneeecccc
SbcaaccccaaaaaaaaaaccccaaaaacajjjnnntttxxxxEzzzyyyyvvvrrqnnneeccccc
abcccccccaaaaaaaaaaacccaaaaaaaajjjnnntttxxxxyyyyyvvvvrrrnnneeeccccc
abcccccccaaaaaaaaaaacccccaaaaccjjjnnnnttttxxyyyyywvvrrrnnneeecccccc
abcccccccccaaaaaaccaccccaaaaaccciiinnnnttxxyyyyyyywwrrnnnneeecccccc
abccccccccccccaaacccccccaacaaaccciiinnnttxxyywwyyywwrrnnnffeccccccc
abccccccccccccaaacccccccaccaaaccciiinnnttwwwwwwwwwwwrrrnnfffccccccc
abccccccccccccccccccccccccccccccciiinnnttwwwwsswwwwwrrrnnfffccccccc
abaaaccaaccccccccccccccccccccccccciinnnttswwwssswwwwrrroofffacccccc
abaaccaaaaaacccccccccccccccccaaacciinnntssssssssssrrrrooofffacccccc
abaccccaaaaacccccccaaacccccccaaaaciinnnssssssmmssssrrrooofffacccccc
abaacaaaaaaacccccccaaaaccccccaaaaciiinmmmssmmmmmoosroooooffaaaacccc
abaaaaaaaaaaaccccccaaaaccccccaaacciiimmmmmmmmmmmoooooooofffaaaacccc
abcaaaaaaaaaaccccccaaaaccccccccccccihhmmmmmmmhggoooooooffffaaaccccc
abcccccaaacaccccccccaaccccccccccccchhhhhhhhhhhggggggggggffaaacccccc
abaccccaacccccccccccaaaccccccccccccchhhhhhhhhhgggggggggggcaaacccccc
abaaaccccaccccccccccaaaacccaacccccccchhhhhhhaaaaaggggggcccccccccccc
abaaaccccaaacaaaccccaaaacaaaacccccccccccccccaaaacccccccccccccccaaac
abaacccccaaaaaaaccccaaaaaaaaacccccccccccccccaaacccccccccccccccccaaa
abaaaccccaaaaaaccccaaaaaaaaccccccccccccccccccaacccccccccccccccccaaa
abccccccaaaaaaaaaaaaaaaaaaacccccccccccccccccaaccccccccccccccccaaaaa
abcccccaaaaaaaaaaaaaaaaaaaaacccccccccccccccccccccccccccccccccaaaaaa`;

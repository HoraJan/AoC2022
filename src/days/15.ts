import { Test } from '.';

const parseInput = (inputString: string) => {
  const [yInput, ...respInput] = inputString.split('\n')
  const yToCheck = Number(yInput.replace('y=',''))
  const beacons = respInput.map(reading => {
    const {x, y, xBeacon, yBeacon} = /x=(?<x>-?\d+).*y=(?<y>-?\d+).*x=(?<xBeacon>-?\d+).*y=(?<yBeacon>-?\d+)/.exec(reading).groups

    return {
      x: Number(x), 
      y: Number(y), 
      xBeacon: Number(xBeacon), 
      yBeacon: Number(yBeacon), 
    }
  })

  return {
    yToCheck, beacons
  }
}
const solveForY = (beacons: {x:number, y:number, xBeacon:number, yBeacon:number}[], yToCheck: number) => {
  const beaconsOnY = new Set<number>()
  const definitelyNot: number[][] = []
  beacons.forEach(({x, y, xBeacon, yBeacon}) => {
    const safeDistance = Math.abs(x-xBeacon)+Math.abs(y-yBeacon)
    const distanceToY = Math.abs(y-yToCheck)
    const diff = safeDistance - distanceToY

    if (yBeacon === yToCheck) beaconsOnY.add(xBeacon)
    if (diff < 1) return
    // console.log(x,diff, x-diff, x+diff)
    definitelyNot.push([x-diff,x+diff]);
  })
  definitelyNot.sort((a,b) => a[0]-b[0])
  // console.log(definitelyNot)
  const empty = []
  const [start,end] = definitelyNot.reduce(([accStart, accEnd],[start,end]) => {
    if (start - accEnd > 1) empty.push([accEnd, start])
    return [Math.min(accStart, start), Math.max(accEnd, end)]
  }, [0,0]);

  return {
    start, end, beaconsOnY, empty
  }
}

const solveFirst = (inputString: string) => {
  const {yToCheck, beacons} = parseInput(inputString)
  const { start, end, beaconsOnY} = solveForY(beacons, yToCheck)

  return end-start+1-beaconsOnY.size
};

const solveSecond = (inputString: string) => {
  const {yToCheck, beacons} = parseInput(inputString)
  // beacons.forEach(({x, y, xBeacon, yBeacon}) => {
  //   const safeDistance = Math.abs(x-xBeacon)+Math.abs(y-yBeacon)
  //   console.log(x, safeDistance)
  // })

  let TotalEmpty = []
  let row = 0;
  for (let i =0; i< 2*yToCheck; i++) {
    const { empty} = solveForY(beacons, i)

    // console.log(i, start,end, beaconsOnY,empty)
    if (!empty.length) continue
    TotalEmpty = empty[0]
    row = i
  
    break;
  }
  console.log(TotalEmpty, row)
  return (TotalEmpty[0]+1)*4000000+row
}

export const first = (inputString: string) => solveFirst(inputString);

export const second = (inputString: string) => solveSecond(inputString);

export const tests: Test[] = [{
  input: `y=10
Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`,
  results: {
    first: 26,
    second: 56000011,
  },
}];

export const input = `y=2000000
Sensor at x=2302110, y=2237242: closest beacon is at x=2348729, y=1239977
Sensor at x=47903, y=2473047: closest beacon is at x=-432198, y=2000000
Sensor at x=2363579, y=1547888: closest beacon is at x=2348729, y=1239977
Sensor at x=3619841, y=520506: closest beacon is at x=2348729, y=1239977
Sensor at x=3941908, y=3526118: closest beacon is at x=3772294, y=3485243
Sensor at x=3206, y=1564595: closest beacon is at x=-432198, y=2000000
Sensor at x=3123411, y=3392077: closest beacon is at x=2977835, y=3592946
Sensor at x=3279053, y=3984688: closest beacon is at x=2977835, y=3592946
Sensor at x=2968162, y=3938490: closest beacon is at x=2977835, y=3592946
Sensor at x=1772120, y=2862246: closest beacon is at x=2017966, y=3158243
Sensor at x=3283241, y=2619168: closest beacon is at x=3172577, y=2521434
Sensor at x=2471642, y=3890150: closest beacon is at x=2977835, y=3592946
Sensor at x=3163348, y=3743489: closest beacon is at x=2977835, y=3592946
Sensor at x=2933313, y=2919047: closest beacon is at x=3172577, y=2521434
Sensor at x=2780640, y=3629927: closest beacon is at x=2977835, y=3592946
Sensor at x=3986978, y=2079918: closest beacon is at x=3998497, y=2812428
Sensor at x=315464, y=370694: closest beacon is at x=-550536, y=260566
Sensor at x=3957316, y=3968366: closest beacon is at x=3772294, y=3485243
Sensor at x=2118533, y=1074658: closest beacon is at x=2348729, y=1239977
Sensor at x=3494855, y=3378533: closest beacon is at x=3772294, y=3485243
Sensor at x=2575727, y=210553: closest beacon is at x=2348729, y=1239977
Sensor at x=3999990, y=2813525: closest beacon is at x=3998497, y=2812428
Sensor at x=3658837, y=3026912: closest beacon is at x=3998497, y=2812428
Sensor at x=1551619, y=1701155: closest beacon is at x=2348729, y=1239977
Sensor at x=2625855, y=3330422: closest beacon is at x=2977835, y=3592946
Sensor at x=3476946, y=2445098: closest beacon is at x=3172577, y=2521434
Sensor at x=2915568, y=1714113: closest beacon is at x=2348729, y=1239977
Sensor at x=729668, y=3723377: closest beacon is at x=-997494, y=3617758
Sensor at x=3631681, y=3801747: closest beacon is at x=3772294, y=3485243
Sensor at x=2270816, y=3197807: closest beacon is at x=2017966, y=3158243
Sensor at x=3999999, y=2810929: closest beacon is at x=3998497, y=2812428
Sensor at x=3978805, y=3296024: closest beacon is at x=3772294, y=3485243
Sensor at x=1054910, y=811769: closest beacon is at x=2348729, y=1239977`;

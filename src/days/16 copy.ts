import { Test } from '.';

const getScore = (state: { [key: string]: { opened: boolean } }, valves: { [key: string]: { rate: number } }) => {
  return Object.entries(state).reduce((acc, [name, opened]) => opened ? acc + valves[name].rate : acc, 0)
}

const stringify = (current) => {
  const currentPositions = current.current.map(a => a).sort()
  // console.log(currentPositions)
return currentPositions.join('-') + '-'+ JSON.stringify(current.state)
}

const solve = (inputString: string, length: number, twoPeople=false) => {
  const state = {}
  const valves = {}
  inputString
    .split('\n')
    .map(line => /Valve (?<name>[A-Z]+) has flow rate=(?<rate>\d+); tunnels? leads? to valves? (?<edges>[A-Z, ]+)/.exec(line).groups)
    .map(({ name, rate, edges }) => ({
      name,
      rate: Number(rate),
      edges: edges.split(', ')
    })).forEach(valve => {
      valves[valve.name] = valve
      if (valve.rate)
        state[valve.name] = false
    })

    const withValves: any = Object.values(valves).filter((valve: any) => valve.rate)
    const withValvesLength = withValves.length

    // const combinations = [[withValves[0].name]]

    // for ( let i = 0; i< withValvesLength-4; i++) {
    //   const newOne= withValves.slice(withValvesLength-i-1, withValvesLength-i)[0].name
    //   console.log(newOne)
    //   const newCombinations = []
    //   combinations.forEach(combination => {
    //     for (let j = 0; j <= combination.length; j++) {
    //       const test = [...combination]
    //       test.splice(j, 0, newOne)
    //       // console.log(test)
    //       newCombinations.push(test)
    //     }
    //   })
    //   combinations = newCombinations
    //   // break
    // }
  
    const distanceMatrix = new Map()

    Object.values<{name: string, edges: string[]}>(valves).forEach(valve => {
      const map = new Map()
      // const visited = {}
      const queue = valve.edges.map(edge => ({edge, price: 1}))
      while (queue.length) {
        const edge = queue.shift()
        // console.log(edge)
        if (map.has(edge.edge)) continue;

        map.set(edge.edge, edge.price)
        // console.log(edge.edge, valves)
        valves[edge.edge].edges.forEach(newEdge => {
          if (map.has(newEdge)) return

          queue.push({edge: newEdge, price: edge.price+1})
        })
      }
      distanceMatrix.set(valve.name, map)
    })

// console.log(distanceMatrix)
  const memo = new Map()

  const queue = [{
    current: new Array(+twoPeople+1).fill('AA'),
    steps: 0,
    state: JSON.parse(JSON.stringify(state)),
    score: 0,
    stepScore: 0,
  }]

  let maxScore = 0;
  let best = null
  let count = 0;

  const stringified = stringify(queue[0])
  memo.set(stringified,{steps: queue[0].steps, score: queue[0].score})
  
  while (queue.length) {
    count++;
    const current = queue.shift()

    if (current.score > maxScore) {
      maxScore = current.score
      best = JSON.parse(JSON.stringify(current))
    }
    if (current.steps === length) continue;

    if (Object.values(current.state).every(state => state)) {
      const newState = JSON.parse(JSON.stringify(current))
      newState.score += newState.stepScore
      newState.steps += 1
      queue.push(newState)
    }


    if (current.state[current.current[0]] === false && current.state[current.current[1]] === false && current.current[0] !==current.current[1]) {
      const newState = JSON.parse(JSON.stringify(current))
      newState.score += newState.stepScore
      newState.state[current.current[0]] = true;
      newState.state[current.current[1]] = true;
      newState.stepScore = getScore(newState.state, valves)
      newState.steps += 1
      
      const stringified = stringify(newState)
      
      if (!memo.has(stringified)) {
        memo.set(stringified,{steps: Infinity, score: 0})
      }

      const {score, steps} = memo.get(stringified)
      const balancedScore = (steps-newState.steps) * newState.stepScore + newState.score

      if (balancedScore > score || (balancedScore === score && score > newState.score)) {
        memo.set(stringified,{steps: newState.steps, score: newState.score})
        queue.push(newState)
      }  
    }
    
    else if (current.state[current.current[0]] === false) {
      // console.log()
      (valves[current.current[1]]?.edges ?? [false]).forEach(edge => {
        const newState = JSON.parse(JSON.stringify(current))
        newState.score += newState.stepScore
        newState.state[current.current[0]] = true;
        newState.stepScore = getScore(newState.state, valves)
        newState.steps += 1
        if (edge) newState.current[1] = edge
        
        const stringified = stringify(newState)
        // if (stringified === 'EE-JJ-{"BB":false,"CC":false,"DD":true,"EE":false,"HH":false,"JJ":true}') console.log(newState)
        
        if (!memo.has(stringified)) {
          memo.set(stringified,{steps: Infinity, score: 0})
        }
  
        const {score, steps} = memo.get(stringified)
        const balancedScore = (steps-newState.steps) * newState.stepScore + newState.score
  
        if (balancedScore > score || (balancedScore === score && score > newState.score)) {
          memo.set(stringified,{steps: newState.steps, score: newState.score})
          queue.push(newState)
        }        // console.log(newState)
      })
    }

    else if (current.state[current.current[1]] === false) {
      // console.log()
      (valves[current.current[0]]?.edges ?? [false]).forEach(edge => {
        const newState = JSON.parse(JSON.stringify(current))
        newState.score += newState.stepScore
        newState.state[current.current[1]] = true;
        newState.stepScore = getScore(newState.state, valves)
        newState.steps += 1
        if (edge) newState.current[0] = edge
        
        const stringified = stringify(newState)
        // if (stringified === 'EE-JJ-{"BB":false,"CC":false,"DD":true,"EE":false,"HH":false,"JJ":true}') console.log(newState)
        
        if (!memo.has(stringified)) {
          memo.set(stringified,{steps: Infinity, score: 0})
        }
  
        const {score, steps} = memo.get(stringified)
        const balancedScore = (steps-newState.steps) * newState.stepScore + newState.score
  
        if (balancedScore > score || (balancedScore === score && score > newState.score)) {
          memo.set(stringified,{steps: newState.steps, score: newState.score})
          queue.push(newState)
        }        // console.log(newState)
      })
    }


    for (let i = 0; i < valves[current.current[0]].edges.length; i++) {
      for (let j = 0; j < (valves[current.current[1]]?.edges.length ?? 1); j++) {
        // console.log(i,j)
        const newState = JSON.parse(JSON.stringify(current))
        newState.score += newState.stepScore
        newState.current[0] = valves[current.current[0]].edges[i]
        if (twoPeople) newState.current[1] = valves[current.current[1]].edges[j]
        newState.steps += 1
        const stringified = stringify(newState)
        // if (stringified === 'EE-JJ-{"BB":false,"CC":false,"DD":true,"EE":false,"HH":false,"JJ":true}') console.log(newState)
        if (memo[stringified] == null) {
          memo[stringified] = {steps: newState.steps, score: newState.score}
          queue.push(newState)
          continue
        }
        
        const {score, steps} = memo[stringified]
        const balancedScore = (steps-newState.steps) * newState.stepScore + newState.score
  
        if (balancedScore > score || (balancedScore === score && score > newState.score)) {
          memo[stringified] = {steps: newState.steps, score: newState.score}
          queue.push(newState)
        }
      }
    }
    // if (count % 10000 === 0) console.log(count, queue.length, Object.keys(memo).length, maxScore)
  }
  


  // if (twoPeople) console.log(memo)
  console.log(best)
  return maxScore + 1;
};

export const first = (inputString: string) => solve(inputString, 30);
// export const first = (inputString: string) => 5;

export const second = (inputString: string) => solve(inputString, 26, true);

export const tests: Test[] = [{
  input: `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`,
  results: {
    first: 1651,
    second: 1707,
  },
}];

export const input = `Valve GV has flow rate=23; tunnel leads to valve WO
Valve TS has flow rate=0; tunnels lead to valves IG, TX
Valve UC has flow rate=0; tunnels lead to valves XJ, VZ
Valve TJ has flow rate=0; tunnels lead to valves GJ, YV
Valve KF has flow rate=0; tunnels lead to valves QY, VP
Valve PO has flow rate=0; tunnels lead to valves YF, VP
Valve CV has flow rate=0; tunnels lead to valves VB, QK
Valve NK has flow rate=6; tunnels lead to valves MI, QY, DO, QJ, YH
Valve IG has flow rate=4; tunnels lead to valves MI, FP, OP, UV, TS
Valve KN has flow rate=0; tunnels lead to valves RF, CY
Valve KR has flow rate=0; tunnels lead to valves VP, DI
Valve VZ has flow rate=19; tunnel leads to valve UC
Valve MW has flow rate=0; tunnels lead to valves UZ, VB
Valve LJ has flow rate=25; tunnels lead to valves XJ, LI
Valve DI has flow rate=0; tunnels lead to valves KR, AA
Valve TO has flow rate=12; tunnels lead to valves TG, PB, BZ
Valve CG has flow rate=0; tunnels lead to valves VP, TX
Valve GJ has flow rate=0; tunnels lead to valves QL, TJ
Valve UZ has flow rate=0; tunnels lead to valves MW, VP
Valve RF has flow rate=16; tunnels lead to valves RD, KN, AU
Valve CY has flow rate=0; tunnels lead to valves KN, YV
Valve AA has flow rate=0; tunnels lead to valves UV, VS, NB, XO, DI
Valve YV has flow rate=11; tunnels lead to valves CY, PW, TJ
Valve VS has flow rate=0; tunnels lead to valves QK, AA
Valve TX has flow rate=14; tunnels lead to valves RM, CG, TS, DM, YH
Valve SB has flow rate=0; tunnels lead to valves YF, BZ
Valve QY has flow rate=0; tunnels lead to valves NK, KF
Valve PB has flow rate=0; tunnels lead to valves HP, TO
Valve YF has flow rate=20; tunnels lead to valves DM, SB, PO
Valve TG has flow rate=0; tunnels lead to valves RM, TO
Valve UV has flow rate=0; tunnels lead to valves IG, AA
Valve XJ has flow rate=0; tunnels lead to valves LJ, UC
Valve DM has flow rate=0; tunnels lead to valves YF, TX
Valve PW has flow rate=0; tunnels lead to valves YV, LI
Valve RD has flow rate=0; tunnels lead to valves QL, RF
Valve OM has flow rate=0; tunnels lead to valves QK, OP
Valve RM has flow rate=0; tunnels lead to valves TX, TG
Valve SH has flow rate=0; tunnels lead to valves AU, HP
Valve LI has flow rate=0; tunnels lead to valves PW, LJ
Valve FP has flow rate=0; tunnels lead to valves IG, VB
Valve BZ has flow rate=0; tunnels lead to valves SB, TO
Valve DO has flow rate=0; tunnels lead to valves NK, VB
Valve WO has flow rate=0; tunnels lead to valves QK, GV
Valve MI has flow rate=0; tunnels lead to valves IG, NK
Valve QK has flow rate=10; tunnels lead to valves VS, OM, WO, CV
Valve OP has flow rate=0; tunnels lead to valves IG, OM
Valve AU has flow rate=0; tunnels lead to valves SH, RF
Valve QJ has flow rate=0; tunnels lead to valves NK, XO
Valve VP has flow rate=8; tunnels lead to valves PO, CG, KF, KR, UZ
Valve HP has flow rate=17; tunnels lead to valves SH, PB
Valve XO has flow rate=0; tunnels lead to valves QJ, AA
Valve QL has flow rate=15; tunnels lead to valves RD, GJ
Valve NB has flow rate=0; tunnels lead to valves VB, AA
Valve VB has flow rate=7; tunnels lead to valves DO, CV, MW, NB, FP
Valve YH has flow rate=0; tunnels lead to valves NK, TX`;

import { Test } from '.';

const parseValves = (inputString: string) => {
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

    return {valves, state}
}

const getDistanceMatrix = (valves: any) => {
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

  return distanceMatrix
}

const solve = (valves: any, state: any, distanceMatrix: any, length: number) => {

  const nextOptimalValve = (currValve: string, timeLeft: number, contesters: string[]) => {
    let optimalValve: string = null;
    let value = 0;
    const allSolutions = []
  
    for (const contester of contesters) {
      const newContesters = [...contesters].filter((v) => v !== contester);
      const newTime = timeLeft - distanceMatrix.get(currValve).get(contester) - 1;
      if (newTime <= 0) continue;
      // console.log(contester)
      let score = newTime * valves[contester].rate;
      const optimal = nextOptimalValve(contester, newTime, newContesters);
      score += optimal.value;
  
      if (score > value) {
        optimalValve = contester;
        value = score;
      }
    }
  
    return { optimalValve, value };
  };
  const result = nextOptimalValve('AA', length, state)

  console.log(result)
  return result.value;
};

export const first = (inputString: string) => {
  const {valves, state} = parseValves(inputString)
  const distanceMatrix = getDistanceMatrix(valves)

  return solve(valves, Object.keys(state),distanceMatrix, 30);
}
// export const first = (inputString: string) => 1651;

export const second = (inputString: string) => {
  const {valves, state} = parseValves(inputString)
  const distanceMatrix = getDistanceMatrix(valves)

  return solve(valves, Object.keys(state), distanceMatrix,26)
};

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

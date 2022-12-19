import { Test } from '.';

const readBlueprints = (inputString: string) => {
  return inputString.split('\n').map(blueprint => {
    const id = /Blueprint (?<id>\d+)/.exec(blueprint).groups.id
    const resources = blueprint.replace(/Blueprint \d+: /, '').split('.').filter(line => !!line)
    .map(resource => {
      // console.log(resource)
      const {name, neededString} = /\s?Each (?<name>[a-z]+) robot costs (?<neededString>.+)/.exec(resource).groups
      const needed = neededString.split('and').map(sub => {
        const {count,resourceName} = /(?<count>\d+) (?<resourceName>[a-z]+)/.exec(sub).groups
        return {
          count: Number(count),
          resourceName} 
      })
      // console.log({name, needed})
      return {name, needed}
    })
    return {
      id: Number(id),
      resources
    }
  })
}

const solve = (inputString: string) => {
  const blueprints = readBlueprints(inputString)
  const possibleTime = 20;
  // console.log(blueprints)

  const calculated = blueprints.map(blueprint => {
    blueprint.resources.reverse()
    const queue = [{
      time: 0,
      resources: {
        ore: 0,
        clay: 0,
        obsidian: 0,
        geode: 0,
      },
      robots: {
        geode: 0,
        obsidian: 0,
        clay: 0,
        ore: 1,
      }
    }]

    const memo = new Set()
  
    let maxScore = 0;
    let solutions = 0;
    let count = 0;
  
    while (queue.length) {
      count++;
      if (count % 100000 === 0) {
        console.log(count, memo.size, queue.length)
      }
      const situation = queue.pop();


      if (situation.time === possibleTime && situation.resources.geode > maxScore) {
        solutions++;
        maxScore = situation.resources.geode
        console.log(situation)
        continue;
      }

      if (situation.time === possibleTime) {
        solutions++;
        // console.log(solutions)
        continue;
      }

      for (const possibleNewRobot of blueprint.resources) {
        // console.log(resource)
        if (possibleNewRobot.needed.every(resource => 
          situation.resources[resource.resourceName] >= resource.count
        )) {
          // console.log(possibleNewRobot.name)
          const newSituation = JSON.parse(JSON.stringify(situation))
          newSituation.time +=1;
          Object.entries(newSituation.robots).forEach(([name, count]) => {
            newSituation.resources[name] += count
          })
          possibleNewRobot.needed.forEach(({resourceName, count}) => {
            newSituation.resources[resourceName] -= count;
          })
          newSituation.robots[possibleNewRobot.name] += 1;
          // console.log(newSituation)
          // break
          if (!memo.has(JSON.stringify(newSituation))) {
            memo.add(JSON.stringify(newSituation))
            queue.push(newSituation)
          }
        }
      }
  
      const newSituation = JSON.parse(JSON.stringify(situation))
      newSituation.time +=1;
      Object.entries(newSituation.robots).forEach(([name, count]) => {
        newSituation.resources[name] += count
      })

      if (!memo.has(JSON.stringify(newSituation))) {
        memo.add(JSON.stringify(newSituation))
        queue.push(newSituation)
      }
    }

    return {id: blueprint.id, maxScore} 
  })
  console.log(calculated)
  
  return 0;
};

export const first = (inputString: string) => solve(inputString);

export const second = (inputString: string) => solve(inputString);

export const tests: Test[] = [{
  input: `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`,
  results: {
    first: 33,
    second: 0,
  },
}];

export const input = `Blueprint 1: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 19 clay. Each geode robot costs 2 ore and 12 obsidian.
Blueprint 2: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 19 clay. Each geode robot costs 2 ore and 9 obsidian.
Blueprint 3: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 17 clay. Each geode robot costs 3 ore and 10 obsidian.
Blueprint 4: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 14 clay. Each geode robot costs 4 ore and 15 obsidian.
Blueprint 5: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 12 clay. Each geode robot costs 3 ore and 15 obsidian.
Blueprint 6: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 8 clay. Each geode robot costs 3 ore and 19 obsidian.
Blueprint 7: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 7 clay. Each geode robot costs 4 ore and 17 obsidian.
Blueprint 8: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 14 clay. Each geode robot costs 3 ore and 16 obsidian.
Blueprint 9: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 16 clay. Each geode robot costs 2 ore and 9 obsidian.
Blueprint 10: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 5 clay. Each geode robot costs 3 ore and 7 obsidian.
Blueprint 11: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 4 ore and 9 obsidian.
Blueprint 12: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 3 ore and 14 obsidian.
Blueprint 13: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 18 clay. Each geode robot costs 2 ore and 19 obsidian.
Blueprint 14: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 13 clay. Each geode robot costs 3 ore and 12 obsidian.
Blueprint 15: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 3 ore and 9 obsidian.
Blueprint 16: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 17 clay. Each geode robot costs 4 ore and 8 obsidian.
Blueprint 17: Each ore robot costs 2 ore. Each clay robot costs 2 ore. Each obsidian robot costs 2 ore and 17 clay. Each geode robot costs 2 ore and 10 obsidian.
Blueprint 18: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 2 ore and 11 obsidian.
Blueprint 19: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 12 clay. Each geode robot costs 3 ore and 8 obsidian.
Blueprint 20: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 12 clay. Each geode robot costs 3 ore and 17 obsidian.
Blueprint 21: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 7 clay. Each geode robot costs 2 ore and 9 obsidian.
Blueprint 22: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 17 clay. Each geode robot costs 4 ore and 20 obsidian.
Blueprint 23: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 19 clay. Each geode robot costs 3 ore and 10 obsidian.
Blueprint 24: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 9 clay. Each geode robot costs 3 ore and 7 obsidian.
Blueprint 25: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 3 ore and 19 obsidian.
Blueprint 26: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 3 ore and 20 obsidian.
Blueprint 27: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 19 clay. Each geode robot costs 4 ore and 11 obsidian.
Blueprint 28: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 11 clay. Each geode robot costs 4 ore and 7 obsidian.
Blueprint 29: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 2 ore and 12 obsidian.
Blueprint 30: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 8 clay. Each geode robot costs 2 ore and 15 obsidian.`;

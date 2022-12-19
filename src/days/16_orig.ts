const bfs = (grid, starting, ending) => {
    const queue = [];
    const visited = [starting];

    if (starting == ending) return [starting];
    queue.push([starting]);

    while (queue.length > 0) {
        const path = queue.shift();
        const node = path[path.length - 1];

        for (const neighbor of grid[node]) {
            if (visited.includes(neighbor)) continue;

            if (neighbor == ending) return path.concat([neighbor]);
            visited.push(neighbor);
            queue.push(path.concat([neighbor]));
        }
    }

    return [];
}

const findRates = (distances, valve, minutes, left, opened = {}) => {
    const allRates = [opened];

    left.forEach((other, index) => {
        const newMinutes = minutes - distances[valve][other] - 1;
        if (newMinutes < 1) return;

        const newOpened = JSON.parse(JSON.stringify(opened));
        newOpened[other] = newMinutes;

        const newLeft = [...left];
        newLeft.splice(index, 1);

        allRates.push(...findRates(distances, other, newMinutes, newLeft, newOpened));
    });

    return allRates;
}

const part2 = async input => {
    const graph = {}, rates = {};

    input.split('\n').forEach(line => {
        const tokens = line.replace(/,/g, '').split(' ');

        graph[tokens[1]] = tokens.slice(9);
        rates[tokens[1]] = parseInt(tokens[4].replace(';', '').split('=')[1]);
    });

    const distances = {};
    Object.keys(graph).forEach(start => {
        Object.keys(graph).forEach(end => {
            if (distances[start] == null) distances[start] = {};
            distances[start][end] = bfs(graph, start, end).length - 1;
        });
    });

    const nonzeroValves = Object.keys(graph).filter(valve => rates[valve] != 0);
    const allRates = findRates(distances, 'AA', 26, nonzeroValves);

    const maxScores = {};
    allRates.forEach(rate => {
        const key = Object.keys(rate).sort().join(',');
        const score = Object.entries(rate).reduce((acc, [key, value]) => acc + rates[key] * value, 0);

        if (maxScores[key] == null) maxScores[key] = -Infinity;
        maxScores[key] = Math.max(score, maxScores[key]);
    });

    let highest = -Infinity;
    Object.keys(maxScores).forEach(player => {
        Object.keys(maxScores).forEach(elephant => {
            const allValves = new Set();
            const playerList = player.split(',');
            playerList.forEach(valve => allValves.add(valve));
            const elephantList = elephant.split(',');
            elephantList.forEach(valve => allValves.add(valve));

            if (allValves.size == (playerList.length + elephantList.length)) highest = Math.max(maxScores[player] + maxScores[elephant], highest);
        });
    });

    return highest;
}

console.log(part2(`Valve GV has flow rate=23; tunnel leads to valve WO
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
Valve YH has flow rate=0; tunnels lead to valves NK, TX`))

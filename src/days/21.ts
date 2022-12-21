import { Test } from '.';

const getResult = (tree: any, key: string) => {
  if (tree[key].value) return tree[key].value
  const {first, operand, second} = tree[key].operation

  const firstValue = getResult(tree, first)
  const secondValue = getResult(tree, second)

  if (operand === '+') return firstValue + secondValue
  if (operand === '-') return firstValue - secondValue
  if (operand === '*') return firstValue * secondValue
  if (operand === '/') return firstValue / secondValue
}

const getNewValue = (value: number, operand: string, valueToGet: number, isSecond: boolean) => {
  console.log(value, operand, isSecond, valueToGet)
  if (operand === '=') return value
  if (operand === '/' && isSecond) return value / valueToGet
  if (operand === '/') return valueToGet * value
  if (operand === '+') return valueToGet - value
  if (operand === '*') return valueToGet / value
  if (operand === '-' && isSecond) return  value -  valueToGet
  if (operand === '-') return valueToGet + value

  return value
}

const findHumn = (tree: any, key: string) => {
  if (key === 'humn') return true
  if (tree[key].value) return false

  return findHumn(tree, tree[key].operation.first) || findHumn(tree, tree[key].operation.second)
}

const findHumnValue = (tree: any, key: string, value?: number) => {
  console.log(key, tree[key], value)

  if (key === 'humn') return value

  const first = {
    isHumn: findHumn(tree, tree[key].operation.first),
    value: getResult(tree, tree[key].operation.first)
  }

  const second = {
    isHumn: findHumn(tree, tree[key].operation.second),
    value: getResult(tree, tree[key].operation.second)
  }

  if (first.isHumn) return findHumnValue(tree, tree[key].operation.first, getNewValue(second.value, key === 'root' ? '=' : tree[key].operation.operand, value, false))
  if (second.isHumn) return findHumnValue(tree, tree[key].operation.second, getNewValue(first.value, key === 'root' ? '=' : tree[key].operation.operand, value, true))
}

const solve = (inputString: string) => {
  const tree = {}
  inputString.split('\n').forEach(line => {
    const [key, operation] = line.split(': ')
    if (Number.isInteger(Number(operation))) {
      tree[key] = {value: Number(operation)}
      return
    }
    // console.log(/(?<first>[a-z]+) (?<operand>[\+\*\/\-]) (?<second>[a-z]+)/.exec(operation).groups)
    const {first, operand, second} = /(?<first>[a-z]+) (?<operand>[\+\*\/\-]) (?<second>[a-z]+)/.exec(operation).groups
    tree[key] = {operation: {first, operand, second}}
  })

  // console.log(getResult(tree, tree['root'].operation.first), getResult(tree, tree['root'].operation.second))
  // console.log(findHumn(tree, tree['root'].operation.first), findHumn(tree, tree['root'].operation.second))

  // const first = {
  //   isHumn: findHumn(tree, tree['root'].operation.first),
  //   value: getResult(tree, tree['root'].operation.first)
  // }

  // const second = {
  //   isHumn: findHumn(tree, tree['root'].operation.second),
  //   value: getResult(tree, tree['root'].operation.second)
  // }

  // if (first.isHumn) 
  return findHumnValue(tree, 'root')
  // if (second.isHumn) return findHumnValue(tree, tree['root'].operation.second, first.value)

  // return getResult(tree, 'root');
};

// export const first = (inputString: string) => solve(inputString);
export const first = (inputString: string) => 152;

export const second = (inputString: string) => solve(inputString);

export const tests: Test[] = [{
  input: `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`,
  results: {
    first: 152,
    second: 301,
  },
}];

export const input = `ngwp: dbhf + lhwf
rcdg: npwg * pdqh
cqwl: bwgm + bplm
nprq: vwfn * gpss
mnqb: 5
hnnt: cqwl * pbht
tdjm: 3
bpvm: ljpj * shjf
bgdj: hrqc * tcnw
tvfq: vnts + qnzq
sffd: 2
czmj: 8
wggj: jnzd + gjcw
dzmw: tpbz / ddwg
blzh: rgnn + jpsn
czsz: fnhp / mvgg
hszf: lpsz + lrpl
bqgw: 11
mfsv: dttp * tvmh
tshp: 7
pbrm: 5
dndl: 12
lmhg: cvjd * qwfl
dgsm: 3
hhds: rnqw + lszf
rbbj: 2
ttvg: 5
mprs: gvhg / nzlz
rqnt: 13
dttp: vdlr + zspd
vhtm: 9
qzsc: 2
szhv: cmgs + ttnh
wmls: 9
gfws: 9
vtcj: 3
rpwp: 3
drfs: 3
vhhr: mvjr * qzml
fdsq: 3
nlnr: pfsf / wchj
zzmn: wgmf - spcp
rbbr: nzjt + ndzb
tgsj: hpvt + dqvq
qhqj: vlgr + rqnt
gmpt: hscb - lmjw
cshg: jgrj * tplj
qmwn: dgrs * mccm
tntn: 18
zfhv: pfdf + gvtc
qbtz: 1
rqqf: 2
pvdd: 8
jljb: dmjl * gdmq
hmdj: 2
dgvm: rhfj * zlnt
jmtc: 5
zlnf: hvgn + nvwg
rwtd: 5
sjsc: vrlw - sngh
dqwn: 3
scsc: 2
rsbl: 5
lhfc: 2
cmct: flmq + fbpf
ndrd: 4
nrjz: 3
vtvq: rbbr + dgms
bthq: zpgv + nblh
pzln: 2
zfff: whmz - frrm
wrmr: lfrq + ctsb
fsss: 2
wbdm: bjhb * cjmv
zpdc: 5
hrqc: 7
jtss: 3
nctt: gdqd + blrb
gzzt: 2
pgzr: 1
wdbr: 3
gjtf: 7
fzsj: jgjj + pqdh
wzjh: 8
wpwz: 5
rdpp: 5
mrhg: 11
jcnb: 20
qlzb: rtrt * zbsg
wbrj: 2
wpfs: 2
hbqg: 3
fnsr: tmsq / qrfg
jfcq: gpgw + sqrl
zbmq: 2
cgtj: qnzw / qrlp
tnzf: 3
bhbz: jwjf + bbcz
mntg: 7
hzmf: pbrm * hwbl
cjmv: ztpv + mvbm
wctd: pvzz * wpjr
zhvn: lvpc - wblw
cwlp: 2
cnpc: bjmt * fzbh
tpbz: vdmh / ftdt
cmps: 13
prdj: 5
pzmc: 3
jgpl: nsqh + trhr
hrvj: vhhr / zjzt
qzhv: 1
hfgl: 5
svzt: 2
lcnv: gnnb + sdbv
nbrl: zznq * pcnz
mqnc: 2
glvf: 11
vtsm: hrcn + rljv
ncdn: rbgc + bftf
znrs: 11
zvdc: 2
mbsr: 2
jhhb: bngc + tqlt
dbvt: 2
svmc: rntv + lwlr
hbtt: gddc * zngw
vcgg: 11
pdqg: 2
cmgs: 6
bfsl: 2
stgv: pbmf + wznm
rmfw: 7
mphw: 2
blrb: jtdz * djft
mphf: 1
cqnp: grzz * mgft
flcm: thrp * fnhn
lwlr: 6
mczd: smgm * tffn
pbll: 3
msrj: 5
fszt: 5
vlnw: bscl + bfjw
wtvv: jfpt * jvzp
shjf: vnhq + lngs
jfnj: twpc / pzln
mmgq: 8
pmsn: 3
rctg: 3
mrnq: qcfb + qngj
zlbw: 6
zpsl: jnsh / rgbw
ttmw: rdms + jljb
plzs: 4
dzss: 3
ftdw: ctjd * fdsq
vjvl: 3
jrrm: 4
mhdr: 3
clgf: jnwf + shzm
czzd: 2
mnjc: zddt * mhdv
hhrg: qjsm * dznt
msvm: 2
gnmd: 2
wlql: 6
zfcf: 2
qnpr: zpdc * fzvp
trhr: brqf * vtwf
zhgs: 3
dntj: pwwg * bvjj
bsbs: srnq / jfwh
bhzg: gntm + gczr
jwpf: 3
vvfm: jvfm * vwqm
pgwr: mbgv * vhpn
nvjh: rqbz * lpcj
tftq: vsps + pghb
vhrt: jsjj / lzwl
sgnf: rctg * njsn
mrdg: 20
crjw: vmhf + tpcm
wdtb: zdrn + jfhp
trtj: cscn - lpnp
ftmm: sgcs * qtmp
zcfd: 3
jpjv: 2
gnjw: vpdq / lpzw
fthz: 20
wvhd: dcqf + wcrt
llfv: 2
jpfd: 8
tqlc: zgfq + stss
jsgm: qsmb + qdqj
sdph: rflc - bhzg
tpbv: 2
zdmt: 2
hmjc: mvzc + nhrw
cvpc: bnnt * bpzr
zhpp: dzbl * zngb
vpvh: 3
sscd: mfdd + prnn
sbvb: mrrb + zmgd
twjg: 2
drzl: 11
cfvb: bltn + vtsm
gqss: qffm + wwhm
mgqq: dcbw + rlzq
sgnd: 2
bqvv: 6
rtqw: mpqd * spgg
jmcr: mrns * dhln
sqfc: mbjv * rjtp
rpgd: 2
lttg: jhps * zjwz
zrqs: ndms + dslc
rzgm: 7
gvrj: 15
zldr: tjqd * wppp
dgms: 1
rwws: zjhq * cbvf
mnld: frdh / pcrq
cgjw: tfpd * njwh
tbgc: wqhz * wbvr
mbln: 3
pcbr: 2
gmmw: mmql * wsql
fwcs: rwlt + fmcp
rfgp: 7
svvz: 3
hlhj: zvbs + jbqj
pmcg: pvms + gpzf
fpbb: nblt * rtrm
ljpj: 2
gddt: 10
gbrl: 2
dllf: 4
dzjs: 3
mfdd: 6
qvst: rgqg * ndpz
hbcd: 7
msqs: 3
rlbq: 1
vbrz: jjqm + stgv
hnzb: zftn + jhzs
snhs: 6
crsv: 16
ctgb: 10
srpm: dghd + rlhg
wblm: 20
czjq: 5
jlvb: tfjn + qtdm
nzfg: 2
qvmv: 1
ljmz: 2
wswp: 2
zgbc: hfdg + vmhs
mszm: 4
rdph: 2
vhqj: wcpv * ztfh
jhsf: 4
vwtf: jlcn + pdgl
gbwj: 12
fngn: whcp * lbvn
rtrt: 5
sjhh: 2
mrvp: wjdf + mhwj
rhtm: wgmq + spgf
vrqs: qtlz - gsrw
pvzz: 8
pwgh: qdhb + vbrz
bmvv: 4
gjbv: vtjc + wcsg
swwq: wjbj * hfgl
vrmn: pqvc + zmdn
jpgl: fvzt * mbvw
pwhs: bhbz * drwv
fzwq: ggqn + rlsf
fwzl: bdhr + trrb
fdnn: 3
pqlj: vnpl * fpgs
jgbg: 3
vmhf: 5
stss: 9
ntcm: fbqq * snhj
dssj: 6
sclc: 2
wppp: thhv * sdlc
sbzv: vtbm + pgss
lvmv: ccch + snjj
ddwc: scgw + mcwn
wqmm: 8
wrqb: rscq * vfdv
rlfr: 5
llhz: ssmv / nzbp
zfcl: clhs + mcgr
mjzr: tldr + qppc
fwhb: jstf * rlqj
sgzc: hvmn + qpsl
lgpf: zdjp * bcrh
scgw: 11
vpzl: 3
bcqm: 17
cbqz: 6
mlwr: mwwh * jvbp
sngh: hcbs * bvqd
dbhf: 2
jdzb: 13
rwjl: fjgt + pgzr
qqnc: 2
ssqz: zmmg * zpbt
zbgr: hsnb - lpcp
vmzb: 5
dnrs: swfn * fzrd
tvpj: 3
qmjl: 11
njzd: qmht * wsqt
mzsr: 4
hfzj: 2
rwgf: wbgb + fpbb
jplw: 2
snlp: snhs * gmwp
vrzv: pvcz + zzql
vjst: pnmp + wrns
msbs: 1
hpvg: vfqn + zlrl
ztfd: ffls * pqcs
bldp: 10
vtrz: svvl * nmqc
fhpw: 5
dffp: mnld * tfhf
gnnb: wdtb * ftzl
rlqr: qqcd - rvwn
mhrh: qzcj * wptm
tjnh: hrsv * hhqs
pmbh: vtgj * jltn
zgct: rbjt + vjdn
hsbt: 2
mrfd: 5
rglt: hrvj * mlzs
slmh: 4
pwdd: bswg * jpjv
wlvv: rjln * mctl
ntzq: lmhg + qshb
jjqm: 4
pfds: fhpw * fztw
nmnr: 3
wsql: tfqj - qzhv
fbcg: qmjd + ngpw
tsrp: 1
rhwd: 11
mrjc: vdgm / nmhv
glmt: lcrt * cjpv
hbbw: cgjw + wsnz
cnhl: qfnr / lmrt
hpvt: 4
dswf: 2
lhwg: 1
tpcv: 7
bnrb: 2
frlj: cfpd * gbrl
mjbs: zlcq * fjbs
tffn: 12
dwmn: szjl + htgj
gjlq: 4
cscn: hssb + vflp
vprz: dggh * gwmn
fzhh: rnwg * wmnt
fpmq: 2
njwh: jvfz * rqmc
cwlv: ddtz + lffw
vdlr: btmf / wqmm
dwcs: 2
tvms: 4
rrtc: 3
mmpg: 2
fqgd: rbjh * jglv
jlpl: fmfs / zpdt
rqmm: brhj * vsqz
gnbz: 2
mpqq: jrbd * ftmm
mgfn: pwdd * tntn
htmn: bjzj * vhtm
bltl: chdb - vsnh
qpgd: 3
dbqv: 2
mvzc: tvzt + fzdn
tthg: 5
pcnz: 2
dwjm: mjzr * bvjn
jfdp: 4
qqwq: jqlb + whvm
bwvv: hhrg * zscg
pdmh: nnvv + ppms
bvcg: 11
lhbv: 4
lpft: 13
qhqc: vnsf + zmzd
cjvd: 2
fhtd: lrsm * lghr
mrrb: 19
fqbs: 14
lpgv: 10
pgdm: nrnq - fgfv
vrqf: dwms / szzp
jvrr: mnqb * bwmb
fzcb: tsdl * lpfz
rgnn: 3
zsdb: 5
jthp: 3
lcbg: lrwf + whch
frtz: 5
fvbh: 3
vlhn: gfvb + rnsc
cwcg: 5
lpcp: 4
dvjw: 3
lgvv: fpnb + bffq
qwgr: 2
dsfj: bjbj + rlbq
bwgq: 3
wptm: 2
rwcm: qhfh * jtgb
fhtv: zrsl + psgj
gvhd: tjwz + dsvv
gjjm: dgsm * lblg
mtvl: 3
ztfv: ncpn * cgnr
wdvw: czcv * rmfw
cbcq: 5
czts: vlms * gnhg
pdqh: btzd * htcn
gpml: ccwq + tdwc
gdzm: ghmp + tscj
fqff: 4
tflv: 1
trnr: 2
gnmc: svmc * pftd
vlzz: hcvj + mngp
vhcd: vbln * tdfr
rhlv: gmpt * tbgc
mmmm: 3
pssq: nzlb + wpts
nblh: 4
gtlz: 12
zgmz: 2
dsql: 4
smmh: mwmj / cchp
vjjj: 8
qdqj: hbqg * zplf
bffq: fqpd + wfrm
cscc: 5
tvpc: 9
cchp: 4
cnhc: bvnt * vtcj
vhlb: 7
vnlv: mbln + gmdz
vshf: 6
nvfs: pdhf * thsq
pghb: 2
fbft: 2
bhlz: 2
vdtv: 3
lndp: 13
ctfm: jzpm * tcvs
nfgf: fwpb - mzsr
glcz: bmdr + vntl
ftbz: 13
jnsh: vlnw + qqhr
sjfl: 2
cftd: fqlj * fdqg
gtff: hqfj + mnmv
mnfn: gfjq * wbwh
fflh: zdmt * dwtr
sjpp: 1
pwbs: tcmz + gctb
pmpb: jfcq + hzrr
zjwz: 3
lwdq: 3
nzbp: 2
btzd: sqmn + wdrq
fhhg: scsc * rnqc
nwvj: frth * zrdd
snbl: 4
drjz: 1
nvqn: vccc + hgvz
pdbb: qhhm * qmhc
jqzz: 2
qfcb: 2
mcnq: pbbd + dgvm
cczs: bsbt + dfcv
tldr: mchw * ncch
zcbt: 1
wbwr: ghlg * vmgm
vwbh: llhc + sndl
hbtl: 8
smcc: ltsj / jzsf
qcqh: nvmj * jnlb
qddw: 2
wshd: 7
gdzt: bwhd + hnzz
rbcm: wbcp + wzjh
dcqf: ncvr * fclv
fdpb: drzl + gnzj
sccd: glvv + zdlb
lsph: 13
ggtj: vftj * wlst
wdlq: flhq + ccfn
czbt: 2
mwwh: bbwd + zsdb
rwpb: 2
tjsv: pdfn + shlz
gsjf: 8
vthn: dqbc * vldv
gqqj: rttb + czts
jwzf: 3
mpcq: 11
ljwv: gvhd - cdpv
srgh: stds * zbgr
bltn: rnnm + vrnt
trrb: 5
jpwq: 5
tttd: bmnh + mcnq
swrj: 7
frrm: 14
qsdf: 2
jgsd: 9
gsnn: 4
zgrf: dhns + wbdm
rbjh: tvjg + qpjg
zdwh: rzgm + ndrd
bpcz: 4
llwb: dvjz * gtss
hhqs: 2
jlvd: pmtv + qqsh
rjtr: 5
qcrj: 20
bbbr: jzsb - cnpc
hsnb: btqc + jgsd
fjnp: tpfl * mbds
zmmg: 4
shzm: 2
pdhz: 2
bcdz: vzhn * dzmw
jtth: 4
nrnq: mjgq * fvtd
jqwn: fmvm * cfwf
bzhl: hvfn + tsjl
bwhd: tlvq * fjlj
dspc: 3
hvzv: 2
mcdq: tzsq * fczq
qfnr: gvmw - vthn
zznq: 9
crvp: pgpp + jwhz
lnqc: mmrq * fsgb
snjj: 1
grws: dtjl * tfbw
dzwp: 2
fvjg: hwfw * jwtf
lccn: 2
sftl: stgd + lnwd
mvbm: gpsl * bpms
jjsd: 9
gdgp: 3
bnqg: rcdg - tmqm
mhfc: qtfm * zntj
qbrw: srdz * fdpb
bmsj: fcpw + jhhb
gqjt: nghw * shrv
bvbp: 10
gwmn: vfhc - msbs
hpnh: qnsd + bdzz
sljs: hfjh + vbsr
rhjl: 8
vszw: dwcc + jtnp
lfrq: qszg + dzqz
sfjc: 3
pdbd: dlrq + rrft
dmlq: dslb * msvm
sdmq: cpsb + nszq
vrpt: zqns + wrnn
mlrt: qvst - pssq
hmtj: qljm / jnmh
fhqn: 1
gmdz: 19
pbht: jrnp + scsp
gcqm: 10
tcmn: wfwb * whlg
bvqd: 5
nbmq: gfrp + zgnh
cfwq: gwcl + mqhb
jmfg: 5
jhps: 17
jqlb: mqzz * qnzd
grjb: 2
ptht: tfvj * qhdp
zlrl: 3
lqzb: 6
ndzb: 5
snpj: fdlt * fqsj
pbmz: qfsm / zjvf
lnzb: 3
vtpt: qjdp / mqbr
wsdb: gstr * nvbj
ssrb: 2
gvht: fcgl * dqvh
cbvf: 3
mlbw: frlj + rtwl
hcjh: 18
rwqr: mcwz / mntg
bjzj: 3
fqpd: gdzr * hfrh
jnwf: rrsr * pdrl
mvnl: 3
qppc: nttz * vnhp
swfn: 2
vlth: 4
bcwq: bblj * cwff
qtlz: jzzs * mzfj
mbpn: 6
lvwn: rlbm * fbft
ghlb: 4
ppms: 2
tjgg: 3
plbl: 5
lpzh: 3
wscv: trtj + dvlf
frbf: 4
vwfn: 3
vssp: gfwf + fhqn
zqnf: 12
lddr: pmbh / thfr
lnrv: 2
llgp: 5
mjgp: fgrw + hwfs
rwgw: 3
npvt: pdtc + gqqj
fzvp: 5
wdgr: 8
gfjq: 4
hscb: dwdz + pncq
sfzr: lcqq * mnmr
zlwh: 5
sdbp: mgqq + lcvr
wjjn: mrdg + spbp
sjdv: gssz + hpml
dnvb: hszf + nwvj
dffz: 1
rnjn: hngs + gdzm
gfsn: 4
bclj: 3
jfsl: 1
mphc: dtfm + qtnh
jrcm: 5
gfht: 6
jbqj: bwcj * qbfz
btmn: 8
vppv: 3
zvlv: qhpn * bzpv
drwv: 15
dplg: jjbj + qqmb
cfsz: cgtj * fzqs
pbpn: 13
ncvr: 3
svtg: lhrw - fbzw
qrgf: 2
jzzs: hgqg + jmdw
jrnp: qzrn * lfzc
htwq: rswn * gqss
zllz: 14
zszs: 11
qlfw: 13
tptw: frms + cphl
rtrm: 13
vdqq: 5
gzmz: 2
qlhm: 3
bwmb: sgnf + bwgh
rcqw: 2
hlzf: 3
dtjl: ctdv + pdsz
mlbn: 3
rhjv: wbzh + vjst
mfcr: 7
msdc: tqsj * ftvr
bngr: fmsf + hzlf
mjnm: 2
ffzt: 2
rnnc: tjgg * rqht
hmpr: qgjn + cnhl
qffw: 9
tfjn: dmfd * nhdf
lhtw: qffw + pbzz
vlms: 5
qqhr: swfm - tzhz
ljbn: 7
lvwb: vlzz * zwcf
lrfp: 3
bjfv: 3
msbw: dtcz + dqrf
djzb: rzdl / drvd
lghr: psbr / vshf
crjg: lpbw + ggtj
pzls: jfsl + qjmt
zlcq: 2
lrbs: nmnr * zfhv
gsdv: 1
fjrb: 4
wjsv: 2
bdbl: dslt + hchb
prgn: 2
bjhb: lgpm + cqqr
lzhh: 2
sjvn: 2
fcgl: 2
cpsb: 5
fjwp: 3
stwl: 14
dzqs: pqlj * ztfv
sncr: pdhz * gsmz
lpcj: 5
rbjt: 8
fmvm: 3
qwrb: fjmv / mrvp
zscg: 2
cdjp: jsvs * srcm
dwtr: wthv * bgvh
scsp: dnvb - ncdr
phwh: hgmr + hgvb
rtwl: 1
pgpp: pwhs + chrd
fsjh: 16
gnfc: jhgz * dzjs
srcj: qhqc + mhqf
spgg: rcnl * lzhg
ljjm: 5
fvtb: mjnm * sfzr
rqmd: 2
jmqw: 4
hvmn: mcdq - qmlb
pqcs: 2
pgbt: wlvv + vptz
cjdg: 2
jmmj: lhfq * zhrq
mbgv: 3
zsvd: qqzp - zlbw
bwcj: 3
fzqs: 19
ssmv: 20
lcvr: jnzs * stjp
prnn: 2
ftcc: hhgq + ntvw
zpbt: wrsc - cvbb
wsnz: rvzd * rqqv
gddc: mprs + sljs
zvlp: gvrj * cdrs
drgt: 5
gssz: gstb * dzdz
grwz: 4
cwff: swjq * llnm
tlfp: zzzq * hgsq
wvgg: zflq * nbgq
jgwl: 4
grzz: 2
fqlj: hpnh * vdqq
ztsz: 13
ztfh: 2
jvfm: 3
lbvf: mrhg * hvwz
dtfm: 5
vhmc: 16
brwz: ftgn + qjrv
gdqd: 16
nqhb: zdtw * lmss
pbfn: lplq + bcqm
rntv: qtmg * lpft
glbg: qqqc * gcdw
ghnz: jsfw + ssdl
nftf: gqbg * mfcr
gfjb: 10
fmhf: 2
lfrj: wfdf * jmnq
cqfp: 3
btmf: lzcr * rrfg
fgzv: 19
wpcp: qgwj + mnfn
rfqr: fnzf + zrqs
mhwj: 3
qjcv: gpml * gqdq
vtwf: htgt * sjhh
njjh: msmm + rjvd
pzsw: hqvl + mmdv
wrbt: 1
bcdf: 7
pwdp: 3
gpmb: 4
cbjm: 3
wgmf: frrt * fsmq
tqcw: 17
mbvw: 6
srjf: prqr * fmdv
pggh: 15
qdwp: 8
cppb: 3
zjct: wptr * whqn
tlvq: jsml + hhfh
fmsf: bhpt * zgrf
wfhj: bhwd * smcf
hgbc: rdzq + hgbm
zdrn: 3
wmsr: ldgg * tvfq
rjvd: vdbm * thjq
fdlt: 4
npnc: 2
czsj: 3
zlth: znrs * mbsr
phfj: sppg + rgjr
qnsd: pqml * fvrf
jglv: 5
fzjr: crvp + vqpg
njfr: 2
ndvz: srgh - lpgv
qgzh: 2
qffm: bcdz / ntvp
jnmh: 7
jzjm: cmtj * nzwf
psvq: 3
szlm: wcth * mwhr
mbvc: 2
spcp: gqjt - cppb
nsrb: mnvt * rrnj
prsz: 4
rlsf: nrnc * fvfv
pqml: 5
tqzb: 2
pmgb: 3
sjsf: 5
wvvd: 3
srpc: 2
djft: 3
vstv: qvrn * rrbs
njsn: 3
wblw: fgld * jnhf
vjdn: 15
srcb: srpm + ntmq
sqrl: 2
fdbj: 5
ffls: 17
zmwd: 5
hfpm: tcgz * ljhp
vwqm: tccw + cjdw
gfrp: 1
rtdb: dbbn + fnmj
fsrv: 2
vnsf: frgj + tdjh
zwzz: 3
rtcr: twhl + nhhp
ssfw: 2
lqtf: 2
cvnz: 2
zngb: 2
pclv: 2
svdj: 5
rnsc: jjrp + mvzv
zrsl: bbdp * jdnl
ghsv: 5
thss: cbjm * zwdd
tpfl: 2
swft: hvwn * dspb
qfsm: mmpg * pmcg
lllp: 3
ssdl: tsjh + htwv
zgfq: gffm * pvlf
hdjm: mnhw + snbl
lnrr: qdwz * vmlt
vvfh: nwsv + zglp
psmz: 5
hgzd: 7
bqbl: 11
wfgq: llgp * tfrz
jlwv: drgt + tqwj
ljhp: 2
mdtr: 3
dbdf: pnft + swtz
gfvb: bmsj + tvpc
jsvs: tftq + mzdw
qnzq: zlwh + smmh
bfcs: 3
rrfg: wvgg + sbrh
fdqg: 14
sgrr: mrzl * rtvw
gvbp: pfds + lqzb
llwp: cbcp + mssw
ngnd: cnpz * ftfr
mwhr: jtqc * fgvl
tvmh: 2
qvdw: thss + crsv
wjsw: 14
jtnp: wgtg * lztw
cjpv: 2
zqfz: qsmr * qhsr
qcfb: nljz * jhsf
thbr: ppfb * lgpf
ncdr: wrpd * tqzb
jjrp: 10
hgmf: 2
fqgp: fzjr + vfgn
flhq: mlmw / bjpf
tdlf: tfcv + fvtb
sfwc: pzps * gpvg
htlz: 5
flmq: 2
pftd: 2
hntg: 3
fbhc: 5
rfmq: 5
wznm: 4
qzfc: 6
gscs: 4
cmdh: qvnm * swhv
dtnn: 3
shnl: rnmz - vjvl
mmdv: nrbl * njmt
zngw: 3
mrgq: 10
fwtv: 4
tpjb: jnnh + lvwb
hjvl: nmcz * wjzt
qnzw: cgcr * lhvn
scbr: fmml + rrhd
gwhg: jgpl / vppv
zlvb: 2
lmll: rhjl + zgmz
mwrq: 14
cztz: gzsb + gchb
rrsr: 5
gpsl: grws + pjnj
rlqj: 3
phmc: qrzs - hgbc
vntl: dzmt + zwdt
bqjd: 4
bdhr: 2
ppjv: bdlb * bzzp
gmfl: dsfj * zfdg
pldw: tvpj * nrfq
fpgs: 3
cnpz: 3
fblp: smwp * zfdm
nscr: 3
jbgz: svmf * cztz
lzqg: srwt * lwjr
qwcf: 2
jtfr: sfwc + gctg
pbbd: wvnm * gdgp
rnqc: tqlv * dbvt
mplm: zvdb + lzqg
bvwz: 3
lfct: 2
zcbr: 2
vmvd: rfmq * tvnc
psdt: ptmq + jzzt
jnzs: 5
lwcv: 3
rlrj: 3
mgtb: 3
vhsv: wtwh + gvbp
mlzs: 3
bjbj: 6
hplw: cbzs + hhrm
vlqw: flcm - swft
mvgg: 2
zfwb: 14
qbwz: vjvp + cjqf
dhqh: pclv * ptlc
bjzg: 9
hfbj: msdc * lrhg
nttz: 3
wfdf: 6
lnvl: 3
crcm: 10
tnqs: 2
wjpw: twvr / rqqf
bppv: 7
swjq: 3
pdgl: 4
mwsq: drjs / bfsl
hqfj: 1
smvb: 4
hfqm: npvt / tgsj
szjl: 4
nhqw: dqrc * bddl
hvng: 5
zdgg: 10
llhc: 4
tcqz: 3
tccw: 7
fbqb: cpbh / jjpz
fztw: 3
rrsp: 4
wqpn: 5
fmcp: 4
gqdq: 2
zvhz: 1
zghm: qtrf + nhqw
gsrw: 10
tvzz: vgtv * ccrg
dwms: qnnj * qrdp
wlms: lqtf * lhtw
fnhp: cwml + pnwq
lcsg: mcmt * rpgd
chnc: 3
fvtd: 5
vjvm: 4
fgld: 3
hgvz: sncs * fttn
rrlf: 3
gznp: 3
mjbv: gcnn * pfzr
dtzp: vlqw / vnjt
vzrw: jfpc + zldr
wrns: 2
ntnd: dmwc * lwdq
jwzp: zvql + vrpt
cnlq: 3
nnpf: vmvd + vsbc
lzlb: 19
btqv: 4
smwp: lnvl * gbdb
zsdr: ttsz * mhdr
blqg: vwvw * sgdz
zwms: tcmn + dbvf
znhd: 3
slqh: pzrv - qrjj
cqqr: bmrv - vdsp
mpmb: tbzf * dthz
cncf: 10
bhzh: 5
hqth: tlfp - ghsl
vnhq: 7
tjhj: jplw * dfwl
pfsf: vrmn - cnhc
lpzw: 2
nscj: 2
ptmq: hbtt * hmjc
nrts: cwmh * hvcm
mnmn: 2
vmgm: 7
spbp: tnlt * dwzf
lcrt: czzm + dbdf
hhfh: 4
stds: 3
hgvb: 17
wztp: fbqb - czsz
jnlb: bcvw + jlpl
wltf: pdjq * cgfp
qljm: sbcq + swrn
rqtc: 4
psmg: tzbj - rshs
sbcq: sjzp - fzhh
vtdz: 3
rnqw: vdgc - bfzf
lgpm: wnzb * mjbr
jvct: jwbq * mvgf
nnvv: 4
wptb: 3
qmlr: 8
bfzf: mpqv + blzh
mnmr: 2
znhn: 4
bdlj: 3
bmdr: 1
bmhv: rvfq * rlqr
zqms: 3
pslz: vndc + qgjt
gqhp: gjjm * fbcg
stjp: 6
tfgv: mhrh + cwlp
tfqj: bfzr * rcgg
vgzv: lddr - rwwp
mcmt: 3
rqbt: jzdw * wpfs
twpc: stfl * mdjv
vnpl: msnr * rmfl
vjgm: hccc * ccbw
nzss: 2
pdfn: whpl * mphw
hzrr: 6
slch: 2
lpbw: nsmc * hlzf
vgwt: vjjm + nfgf
vnml: sddl * grdd
vsnh: 2
vqgh: 1
lvmh: lcbg + qbrw
mdjv: nvpt * cdtw
gvmw: hhpv * qzsc
gdvr: vwtf * vrfr
rhnn: vhlb * rhqq
bmcl: 3
zbsg: nnpf - nqbm
ttsz: 5
fgrw: dhhr * srnd
tdjf: twdw / psvq
gbnz: brwz * rqtc
bblj: 2
pllt: 5
nhrw: 3
tcnw: 3
dphn: 8
pnbt: lndp * jfnj
prwp: 5
sthl: fhrw * lbzw
tsjh: zwpw + hrqf
dqvq: 3
wzmw: vgbg / hgmf
ttsg: 2
cmtw: 3
zwpw: 18
gdmq: gcqm * jqwf
nvmj: 3
jzvj: 2
wstn: glbg + dplg
jltn: 5
rjtp: 5
dspb: fqph / lddz
rvfq: mqcv + mgvw
gcfh: lhcc + lhlt
jhrr: 2
rcjj: bbbr / lftw
vcdc: fvbh * pdbd
nwsv: 16
jhfb: 2
wdjp: 4
jgjj: phrb * vfwv
rcdp: 6
qgrq: tjsv + stwl
lbzn: 2
rgqw: smbv * vdjf
dslb: fvss + fzqd
mpzz: ctwr + gnrm
jvqh: 18
cjdw: 16
qlrc: 1
hcvj: zmrp * sgzc
qbwm: gsfw * lfct
zntj: fpdb + fngn
mjgq: 18
hrsv: zrwj * vmzb
vnmj: wptb * qddw
mftf: 3
crnq: 8
wpjr: 4
mrsr: zlth + rppw
qjsm: 5
mqcv: jchf * mpmb
svvl: 5
hnhv: 19
jpgf: 4
nnnd: gssl + cprg
mvzv: ddpg / wshd
lvpc: jmmj / djgl
nvbj: 13
zrwj: 5
gljm: 11
crcs: zwch + jwpq
bgsq: wrts + sgrr
wjvr: 5
snhj: 19
pffp: ldrc * mnmn
qsmr: 4
hngs: 4
lqrd: 11
npwg: 2
hvfn: lvng * csms
frdh: fwtv * hczv
bmrv: hczq * tdgw
zgbp: 4
pdwf: lgvv + crcs
fdhf: 5
mlmw: vzrw - ndmt
gssl: prdj * czzd
pfzr: lmpr + mwrq
wrvb: clgf * ttsg
glmz: mgfn + wlql
wsbf: jvsf * fwzl
wqmw: 4
llfn: 3
fzdn: 9
jmvf: 2
hdhq: 5
dgrp: zgts * tcgc
smmg: sclc * zwms
zgts: hqcw - pzsw
cwbp: rqmm + gwnp
wlst: 7
qtwp: 3
cbcp: gjlq * crzd
cdpv: dnsc + tptw
mbjv: 5
cdpw: mtvl * llfv
jqwp: 15
djgl: 3
qshb: thqn * cptw
zftn: vrzv * drcm
dwsf: 2
cmrf: 3
tdwc: fzjs + zdgg
gfds: lwbg * nvfs
thsq: 2
lpsz: 14
zhtg: 4
hpml: bgps * vqpd
zzws: 3
gnrm: 3
tfcv: wpwz + wqmw
pgss: 2
drbw: pggh * wqpn
wvbq: 7
nqft: 2
vnhg: 2
tbpp: 10
tzhz: mphf + lbfr
cfpd: 5
czzm: 5
jzsb: wztp * bqtv
vlfs: 2
gjfb: 4
pmms: 3
jqbd: hnzb / scmf
sbft: 11
pbpm: 2
szzp: 2
zpgv: rtdb + mncr
lbfr: drfl * dvgl
rvwn: 1
nmtj: cghq + brtm
mppd: vhmc - znhd
smcf: 20
tvjg: 4
nzlb: fdzj + vhsv
vnqf: bwfb / vwcg
tzsm: 10
fjbs: 7
qbrd: 2
mchw: bpvm * twjg
rbgc: 1
wzsm: 20
dmjb: qrgf * lnzb
mcgr: rcln * fvsr
gccl: gvph * lpzh
njnh: 3
tvcv: fcfh + tdjm
bqjr: 5
nvrc: znhn * cblf
djwz: sdvq / fmhf
nldh: 2
tpcm: 1
nqjt: 2
stph: 13
fzjs: 1
zpdt: 2
bgps: 2
qgqc: hctf * gmfl
phrb: scvs - sdqt
bwgh: zbfn * gvht
qfpc: dbjp + wtqv
sdqt: 16
lddz: 2
mwmj: ssbz * jwzp
gcnn: 8
sqsh: vvmw + pwdp
dgrs: 11
lvng: hplg + scbr
fbzw: vlqc / gzzt
vfgn: cwqd * nvjh
qjrv: cfmq + mwsq
pvtr: 3
szrj: 4
qqdg: cddb * ppjv
bbdp: 3
shlz: 13
fcvj: rwqr + fvcs
fsgb: 3
stgd: vfjf + pfsj
mqzz: 11
vfqn: glsj * mrfb
cjtd: 3
bmrn: tpjb * jpgj
hpqm: grqr + bfhd
npdp: 7
wbvr: thbz + pzbs
cfwf: vjvm + qsdf
fmml: ntlc * prbd
ngrc: 2
qfsh: fcmb / vssp
hczv: bjjn + gbnz
gpss: 6
dqrc: 5
mgnh: 2
ftqq: 4
cpvd: nrjz * pmgb
lcqq: 5
ljvp: 14
csrw: gmmv * hplw
bdcr: wzmw + nhgs
vwqj: bmhv + prlb
bhgs: 7
rtpj: 1
humn: 3951
nhgs: fzsj + glfc
cghq: jpgl + pjmm
whmz: qhhl * sflv
dwdz: qcqh * rcqw
hgvp: 7
hvgn: ftcc / jdvt
lgcs: 6
pfrc: tflv + cczs
fmdv: rqmd + sgzm
smbv: 2
nghw: qjcv + rwgf
dcbw: 11
bnnt: lmqh * pzls
qtdm: 1
ftvr: 2
wsqt: 2
qvtc: 2
root: lntp + bjft
rswn: pbpn - wswp
bzhf: zqhq - hpqm
qhdp: lntt - cbjl
gtpz: 6
pzvs: wsbf / nldh
qqsh: gjtf * lwvr
mvdl: zfcl * sjfl
twrj: 5
clhs: dztm * htcp
fjmv: vlhn + srjh
gdjw: wrzn * wbrj
dzbl: qcrj + tmwh
wjwv: 3
tflg: hmpr / vnhg
wrfr: wsnt * rwgw
lzrf: gdzt + pvqg
dbjp: 1
gntm: wqsf * gdjz
glvv: 2
mqbr: 5
tvzt: 1
wbgb: nqzc / hfrg
ntvw: mrsr + vnlv
pvqg: vstv + fhtd
fccw: 10
sscw: 2
jvbp: zpps + cmwv
spgf: 8
pqvc: jwzf * jlvd
nlvd: 6
qhbw: fbrs + fzfl
gsmz: lvwn + cmps
jgqb: 5
phhh: 5
pcth: szdt * ffzw
ftfr: hzmf + fhgn
rjln: 5
vfdv: 4
qtmp: 7
wrrg: 5
bprt: 14
svsb: cqsm * zqgm
pmrt: 4
jfvl: sddq / gtpz
wptr: 2
nqbm: dlhh * qqnc
ddtz: 13
qtnh: qcqd * rvgs
hhgq: gffp * tmcn
lnsc: 10
hczq: qfsh + vcdc
lclz: 16
fmhb: 2
bdps: zjqs * fwhb
vngd: 6
jzsf: 4
fnmj: 18
cdtw: rdph + bhmq
grhj: dqwn * zpmb
dzhv: 2
pggv: 4
vmjp: 5
mmvc: grdz * rcdp
glwr: jpwq * zrbt
vlqj: 3
msdt: 2
vhpn: rlrj * qpgd
rtth: sqmd * dzhv
trfm: 2
brqf: 2
brpp: wpfl * btqv
bmnh: hjcz + jgtr
swrn: pldc * wpjq
rlcj: jjsd * ndjh
prbd: rgfr + zppc
ctsb: lncj * pptp
fbqq: 5
jtqc: 3
tnvv: tvms * jpfd
nrnc: pbpm * pbll
jdvt: 2
cprg: gsdv + gjbv
hwfv: 3
pzbs: czsj * tdfs
bwgm: cgqp + dtnh
chrd: rtth + fwhn
rdzq: ntnd + twvm
brtm: bmcl * njjh
htgj: 3
jchf: 2
hdqf: 3
whcp: dfsj + pldw
mgcj: 5
nbhf: 3
bwjj: 3
qmgl: 8
wmzc: 2
lhrw: rhlv * dcgw
tltr: 2
zwch: mrjc * pbnl
bttd: 6
gchb: 13
bpms: wfhj + zhvn
hjch: gfds - rhnn
qqcd: 8
dznt: ssqz - mlpt
rtct: 3
cgfp: 4
pbtm: mfjj * pptm
zddt: 4
vflp: 4
gdlr: tjvw + vsch
jzgc: 4
pbnl: 5
jsvl: grwz * llfn
vsqz: 2
mfjj: 3
hvcm: 3
dhhz: grcg - ctfm
cddb: 2
qzrn: 4
lmfp: 14
tltv: wltf * wzsm
rgfr: hfzj * sgcj
zqhq: mqqv * vpzl
tzsq: 3
bfwv: wcph + crcm
jmdw: 1
qgpm: lltd * vlqj
zrff: sdbp + wrmr
htzl: 2
tscj: 11
bwfb: ldfr * vvfm
gffp: vnmj + vcbq
rnnm: 17
jzbc: sbql * glvf
whvm: mlrt * fscv
wcqv: 5
qpjg: pnhs + bbfv
zhhh: zhgs * mpvl
twvr: nbrl + lmfp
qvnm: 4
rqqv: 10
wvnm: msbw + btmn
qjmt: 18
ggzf: 2
nsmc: 3
ggsw: 2
ccwq: nmlg * vrzn
bvjn: 8
nvpt: 3
mcwz: tvzz * sbzv
bhtb: 5
pnhs: bclj + srjd
bhsp: 7
hrcn: tvcv * jzvj
mlwq: 5
rcgg: 7
drfl: 12
vzzc: 2
shqb: 3
bswg: 3
gfzv: sjsv + npsg
szrq: sbft + nqhb
vtbv: djpp * rhtm
czph: lzlb * tcqz
nszq: wzvf * jtss
vdgm: gnjw / lvcp
tjhg: 2
tqlv: 7
hfdg: 4
mssw: hwfv * nbht
prlb: mmqt + wpcp
hbwt: 5
fhwj: shpf * bjfv
srnq: qvhb * rtcr
lrzt: 3
tvnc: 5
wcrt: 2
zjzt: 3
grcg: rwcm * qwrb
frth: 13
bhgp: tjhg * crpg
gdzr: bhgp * prcd
bgvh: 2
rzgj: pzbj + lrbs
vrzn: flpq - qfcb
nqzb: wvhd * cscc
nzjt: 12
bcvw: glmz / vzzc
zcgm: ttmw / wdgr
svjl: nscj * bfcs
pzps: mczd - lcnv
lscv: 4
mqhb: 19
dwlp: 2
zzbc: 3
czcv: 3
rhbg: dmjb + jvcw
tmfm: wscv + mfsv
tvvw: 3
rmfl: 5
hmpc: 2
tjqd: njfr * cpss
sqmn: mpmp + dffz
wbwh: pgdm - crjw
hrqv: jvrr + hqth
nvwg: 19
lmss: 4
jsml: frtl * sjsf
zpps: 2
gzws: 5
wrpd: dwsf + lqrd
tqlt: 1
lwsl: ffvr + jwvb
qzcj: rwws + tbzz
ldrc: ppdl - qmwn
wrts: 1
dvjz: 13
frdw: 11
wnzb: wjsw * prwp
rrbs: qtwp * gznp
bhpt: gjpj + tpcv
vdmh: rjmj + zrff
jcwg: 2
gpcz: 11
rvmp: qgzh * dbrp
vpdq: rrzv * sdvd
cpds: gdlr * zgnd
zqgm: mdlt * qght
rphl: rwjl * cffn
zwrp: pwgh - pfmr
wpjq: fllv - pdbb
dcps: 2
shrv: 2
rthh: 4
vzlj: 3
bfjw: zhhh * rjtr
tcmz: 6
jhzs: gzmz * jtfr
qnzd: hcjh + jmzp
lhvn: nctt + svhp
qjdp: qgpm - bbzg
ntqz: hmdj * zqms
cfmq: 14
dtcz: rhbg + jcwg
glfc: lrzt * bgsq
rlhg: 19
jzdw: fbnh + gtlz
gqbc: 5
sdbv: 8
tfrz: 2
bcrh: 2
lhwf: 5
dmwc: 12
tpch: 2
rqmc: 2
vvmw: hvhf + bdps
czlv: frbf * wrfr
lwpl: 12
bjpf: 2
zfrc: 1
qhhl: cbcq * fjgb
ndpz: pgjn + ffzt
bfzr: 2
tbzf: 2
wppw: 18
rgjr: jmtc * hhds
dgng: pndq + cpds
hwbl: 5
wbzh: cjnf / jzpn
nbsw: 18
snpr: 3
dwzf: 4
cfjs: 3
dmbb: 2
vsbc: rrsp * pbfn
fpnb: pfps + dzqs
vfjf: qlfw * sfjc
zbfn: 4
llnq: 11
tmfg: jgqb * bhlz
jfhm: plzs + bjzg
bpzj: 7
lrsm: 5
cqsm: lwsn + cfqb
tdgw: 2
zgnh: gpgv / pqsm
gbzb: 2
sddl: mjgp + mgtb
dztm: 5
mmtv: pqss * slqh
ftth: 4
whqn: szrq + glcz
rrnj: jlvb * pfrc
vpdz: 3
lhlt: 9
dvgl: 6
pptm: 3
hfjh: 1
qngj: vhrt * djqs
tsjl: dhhz * mmtv
bbzg: ljvp * jlqf
chfb: hvng + smcz
jtdz: 2
szdt: rgqw * gnbz
stfl: 4
rsrp: czph - tbpp
pdsz: 3
spgn: 3
cpbh: humn + vccs
lszf: vpmj * gfht
msnr: 3
ccbw: 5
jjpz: 2
qrjj: zpmt + lccn
sqnv: jwmn * czhf
fbpf: 5
rwwp: tttp + sqbv
ldfr: 2
lzwl: 8
nzlz: 2
gvhg: nbsw * prsz
jpnz: 2
zwdd: 14
wdrq: 12
djjw: 1
ccfn: ghsv * wvvd
vzhn: 2
ndhs: jsvl * lnrv
tqzz: bpcz * vdtv
svqq: qfpc * zvdc
rjmj: dvhs * phtq
bhmq: 5
dfcv: 1
cvbb: 4
jsfw: zdwh + dnrs
ghlg: 3
gfwf: 7
zshv: 20
fgbj: 3
ndmt: zlvb * bldp
jtgb: 5
vphg: 1
vjvq: jqwn + djjw
rgqg: mmvc + vtpt
qnnj: 3
csms: 3
lmjw: tdjf * wccw
tdfs: dvvg * vnjm
jbmw: rlfr * ljmz
njmp: dzss * rrlf
lhcc: czbt + psmg
tcgz: czlv + lhwg
pwjw: 7
jvcw: 11
jzvb: 7
qzml: 13
dqrf: 4
jvzj: qhbw - vprz
nsqh: dgrp + mlwr
sbql: zgwp + pjng
ppdl: cfvb * rnjn
hqcw: sjdv / cqfp
qcwg: 18
dslc: 1
svmf: 2
pfsj: qmjl + fjzg
rcln: 2
dmjl: lnnn * wjvr
dbbn: 6
lwsn: 17
gpgv: 12
qtdj: nlnr * mpln
hjbn: 2
cmtj: qtpd + mrnq
tcvs: 2
jswr: 4
qrdp: 16
gsgq: 12
ngpw: phmc + wblm
frtl: 5
qdwz: 2
lnwd: hfpm + tjnh
msmm: jbmw * fflh
rrzv: nmtj * szrj
gstb: dllf * jhfb
zlnt: 7
vdbm: zcfd * pbtd
fnhf: tthg + tpch
qcbw: 2
hqvl: bwvv / wspb
mncr: ljjm * ztsz
gfjg: lbhs * bvwz
rzdl: zfcf * ppnj
zltc: cmtg * rbcm
gtvr: qcbw * wfgq
bscl: hbbw - lgcs
hgqg: bttd * trnr
gjpj: 4
mhdv: mszm + gmmw
ctwr: 4
dtnh: dzwp * ftbz
pdhf: crtg * lbzn
zjth: rrnb - hpcs
nbht: 9
wcth: 4
nrhf: fqff + qtdj
jvfz: 3
qhsr: 6
zmdn: fccw + wjpw
jjsb: mcwg + zzmn
ppvh: zprm * nnll
nljz: 4
whch: 2
sbrh: 10
gqbg: 3
lztw: 2
qgjn: djzb + jzjm
mmmv: jwbt * stps
vwvw: 2
wpts: hpvg + cbmt
tjvw: dlrd * zwrp
fjgt: nlgj * lwpl
nlgj: 3
wqnz: fsjh + swtj
mpmp: zhtg * lnsc
dqvh: msjr + bgdj
svhp: jbtg + gdjw
whpl: 13
qpsl: 3
gvtc: 2
tsmw: srcb * gnmd
fcfh: sdsh * lwlw
lfzc: 17
jpsn: jdzb * pcbr
vcbq: 1
qgff: qmgl + zzbc
lmpr: 3
hplg: vbqc + nsrb
ltsj: zltc * rfss
dmfd: 2
jfwh: 2
qsqj: 2
sddq: bfwv * tqlc
dslt: grhj + nnnd
lcvv: zsvd - sjpp
pfps: tlsn * jzhc
rfss: 2
ntvp: 2
zfdg: twrj * rwtd
bqtv: pmpb * rpwp
vccc: pgbt * vrqs
hwfs: hpcj + pqzg
hfhh: 4
cpss: 3
zpmb: 2
mgft: 9
flpq: bpzj * dtnn
hvsl: nsld - hrcm
fvrf: jpnz * slmh
jhnn: 5
sqbv: pngs + dndl
vndc: pggv * rvmp
vsps: 5
dlpz: 10
bzsj: 12
scvs: jmcr * rtct
frgj: 4
dljs: 3
hvhf: bthq - csrw
jwmn: 2
nsdj: 4
mrhm: 2
vrfr: 2
wtqv: 6
sgcj: pcth + nqzb
bsbt: 5
ddpg: bltl * nnbw
cmqj: 13
cfdc: zpsl + lzjb
mmrq: 3
mzzm: lhfc * crjg
cdrs: drfs * zbmq
fzrd: pvtr * twqf
qwfl: lhbv * bmvv
vjcp: 2
bjbq: 14
jwvb: 7
hhpv: gqhp + nrhf
bvfh: shqb * tpbv
smcz: 2
fgvl: 3
mqnr: zmwd * snnj
tbjd: 4
sjpv: mzbt * llwp
nljm: vgzv + tmqf
srbq: 3
bjft: dgng * bqbd
btqc: 8
ccrg: lvvq + cmct
gmwp: dgzb / jlwv
mrns: 7
rhqt: 14
bpzr: 2
fvzt: zcbt + tjhj
wndp: 3
hnzz: 2
jngd: bvdp + wppw
jdnj: 7
hvqw: fmhp * jmqw
qght: 2
sdlc: 2
nczg: fnsr - lzrf
znqt: cvnz * jfhm
dlrd: nvqn * dvjw
vpfm: qmlr * tbjd
mwnz: gjfb + cslz
mpqd: zzsp + bmjr
ndjh: 3
znqr: rqbt + sjpv
shpf: 12
pnlt: nscr * vnbh
vldv: 2
dhln: 3
tlsn: ggvq * tdlf
mhww: 2
cwqd: pdqg * qbwz
gsfw: mpqq + hnnt
fmfs: rtqw + lpdr
pnmp: lnrr - ljbn
lntp: svtg * nnvm
qqmb: jzvb * ltqm
hzlf: qgqc * mtwd
tvqz: vjgm + phwh
cjnf: 18
vgtv: 2
lhfq: lttg + jbgz
pzbj: hpwh * gvqg
wwhm: 10
mnhw: vvpv + mftf
pdrl: 3
dgmt: 2
fzqd: qlhm * nbmq
vdsp: vnml / blqb
mpqv: cmdh + lscv
jrbd: 2
chsf: 2
thrp: tflg - pnbt
djqs: 3
jjbj: wcqv + glwr
mqqv: ddwc + zfff
mslt: dswf * jjch
lngc: bzdv * bmrn
swtz: czlg * lwcv
sdvd: tnmt + phhh
nlqz: 2
gstr: 3
qgjt: vbcn + cwlv
qtrf: pwjw * cvpc
lqwj: stlg * gnhf
pgjn: 5
vsch: svqq * smmg
qgwj: shnl * htmn
wspb: 2
fhlm: fzwq + mrrw
gfwp: ftdw + gnmc
dlrq: 6
dzqz: 4
zmgd: mmmv - gbzb
bfbj: glmp * bzhl
jfrl: 1
vmzt: sscw + fqgd
dzmt: hqnn * zdzc
pdtc: 17
vnts: gpmb + bhsp
lftw: 4
zdjp: stvh + fjwp
mpjc: vlsv / rqvr
qqpg: sqjn * fgbj
zvbs: dhqh + svsb
gqth: gmsl * vlth
pzrv: wqts + zshv
vjmb: qwrl * mnjc
pncq: vwqj + thbr
tmqf: zszs * cbqz
trmn: 19
vptz: 19
zjhq: 7
ffvr: 6
tvqf: 3
ttnh: 1
msjr: 2
vvwv: wcrw - tfzv
fwhn: vzlj * wqnz
twdm: 13
hcbs: mgcj * ltrz
cpqm: dwjm / dphn
wthv: 4
lghz: ggzf * rsbl
gnzj: 6
ftzl: 3
vnbh: 2
ldgg: 2
dvhs: wdvw + wgnp
zgnd: fqgp * cfsz
vsbj: 2
swgf: zfrc + ndhs
ssbz: zwzz * svvz
zplf: bvfh + jtth
gctg: smvb * qvdw
mdlt: 3
cslz: 2
vnjm: 11
nrmf: 5
pvlf: 3
jmjw: 5
hlvn: 17
mgrj: sqfc - wssw
rqht: llsm * lwsl
qbfz: qhqj + gsnn
lffw: 3
twdw: ttcw + fblp
gpzf: trmn + jzgc
mgvw: tnvv + hfqm
htwv: 2
fcmb: jfdp * fwzv
njld: 2
jhbp: 5
lstd: jfvl + pzmm
zvdb: 20
zvql: 1
jwjf: bzsj + jfrl
fwzv: mphc * wmzc
zrbt: 5
chvn: 12
wzvf: 8
gvqg: 2
wwbs: 5
fqwv: cfdc * vmbf
rhqq: 5
lfsw: wlcf * gqth
prcd: 2
wcsg: 5
jlcn: 7
ncpn: vtdz * jgbg
pjmm: mpjc * tmfg
gwbc: 8
qhpn: 3
blpc: 2
thpr: 13
qqqc: 4
ddwg: 2
vdgc: rfqr * lvfl
rrft: zqfz + fhhg
pjng: zcgm + zhpp
fvcs: 13
cgcr: 7
bhzd: msdt + ldnm
wccw: gzws * ppvh
fvss: 20
nmqc: sgtg * qsqj
mmql: 3
cphl: 4
ggqn: 1
lvvq: mqnc * lcsg
mvgf: btcg * cmrf
zggn: 2
lmqh: 2
crpg: qcmn + fhlm
vrlw: thfg + pffp
wggs: fwcs * cmtw
pjnj: ftjr * hzfg
cgnr: 2
brcn: 2
crtg: 19
lrpl: mvnl * vnqf
bfvv: dmlq / vlfs
zgwp: cbsq * jgwl
lwlw: 2
tcgc: 5
jsjj: tnqs * vszw
lpwh: 2
vrnt: pzvs * dwlp
zspd: 7
tfhf: rzfv + pslz
wrzn: pvdd + bqjr
ptnr: llhz * spgn
fgsg: jrrm * svdj
fvsr: jdnj * nbhf
vmhs: 13
thzg: msjw * gtvr
wfwb: vvqb * vgwt
phvh: bqjd + dssj
dhfw: 4
qvhb: 16
wgmq: 3
fdzj: llbh * llnq
tzbj: 12
fjgb: 5
wptl: 5
sqjn: 5
jwtf: 3
fwtt: cshg - dpfp
zzql: 3
lwvr: 10
ghrb: 4
zgvs: qgff + tfgv
bhwd: 4
fbnh: 17
ttcw: 3
dtwn: 5
zhrq: 3
lncj: 2
vfch: 3
jmrg: 2
vsmc: mfnp + zllz
tjwz: jhnn * rhjv
gnhf: 8
pbzz: 1
vqpg: snlp + ljwv
jgtr: fcvj * fwjz
gwcl: ssrb * rlcj
jzmd: fdbj * prgn
sjsv: bqbl * mlbw
chdb: dljs * wjwv
cjqf: lbvf - mbvc
tmcn: 5
qmjd: nczg / srbq
wjdf: 4
fbrs: llwb * smcc
qvfd: 3
pnwq: vsmc * cqnp
qjhc: 11
wjfv: ngrc * ftqq
ptlc: 16
jvzp: hsbt * psqs
jdnl: wwvz - jvct
thfg: nljm * njzd
swtj: 15
rmqh: 3
djwm: wtqq * rmqh
stvh: 20
lrwf: gcfh - jrcm
rrnb: wjjn + nftf
llsm: 13
twqf: jswr + jwpf
zpmt: 4
nnbw: pgwr + ftth
wlcf: 10
cmjq: hjbn * gccl
jwbt: snpj + zvhz
mctl: 2
lpfz: 5
bngc: 8
pvms: 18
rljt: 4
hpcj: 19
qszg: rwth * cjtd
nqzc: gfjb * crnq
bddl: wgvg + hjvl
hssb: 3
qwrl: 2
htcp: 5
jnnh: thzg + ptht
pqzg: 4
wcph: 1
vbln: 3
glln: tqcw - rljt
mfnp: fpmq * ffpf
ddqh: svzt * szhv
fdrl: cpvd * gsjf
pjnz: hvsl - hbcd
wjvv: 15
tfvj: mgrj + vphg
tbzz: 2
zqns: 3
stps: 2
tqwj: 2
qmlb: 1
npsg: rhqt * stph
ggrg: 1
fgfv: 11
fzfl: lqwj + mpzz
srwt: pjnz + jcnb
crps: 9
bvpn: fbjg + qgrq
lplq: lzhh * cmqj
ctdv: jpgf * hvzv
cmwv: 5
lbhs: 7
dfwl: hbwt + szlm
fjzg: vhqj - svjl
hfrh: 7
jnzd: 18
lpdr: npnc * rrvr
wpfl: gwhg - lfsw
ztwf: 2
rvgs: 8
fqph: fvjg * fsss
qhhm: nprq + vblt
jqwf: 2
gvph: 7
dthz: 13
pgsb: 5
dwcc: qbrd + fthz
cfqb: jthp * qwcf
fnhn: swrj + vmjp
bbcz: 9
hghr: jvth * mlwq
ztvv: 2
lvcp: 2
rttb: ndvz * hfhh
nnvm: 7
zflq: 7
gpgw: gtff + wrbt
wjzt: 5
pngs: 10
mjbr: 11
zgnn: 3
fqsj: 3
tdfr: 19
mpfp: pzmc * hlhj
vtgj: snpr * mjcz
jmnq: qbtz + psmz
wcjm: 9
cbjl: ttqs * brcn
ffpf: rldg + lmll
jvsf: 2
thjq: nlqz + gqbc
nzwf: 3
gczr: dgcq + lvmv
wgvg: vwbh * djwz
jlqf: 8
zjqs: 19
gmmv: 4
vpmj: bhgs * zggn
pfdf: 5
qrzs: hvlr + bvpn
hrcm: 2
mrrw: 2
sgcs: vtrz + cpqm
srdz: 2
trbc: qvtc * znqr
jzhc: lnqc * wmls
tmqm: npdp * wrrg
qbts: 5
jstf: 2
hvwn: wdbr * zgbc
mlpt: jhbp + dwcs
tnlt: vjjj - dmbb
ftdt: 2
msjw: 8
vmlt: bqgw + hbtl
wwvz: ptrm / wvbq
ndms: 5
fttn: wggs + mvdl
pnft: 5
lpnp: 1
wsnt: 3
dqbc: nzss * bzhf
wbcp: 3
zppc: wstn * njmp
rgbw: 4
dvlf: qzgr / czmj
jbbv: fdrl / vsbj
sflv: 2
frrt: jfcn * fwtt
gzsb: 18
tdmc: 2
mzbt: jmvf + mrfd
thqn: pbmz * sjvn
hqnn: vpvh * tshp
jfhp: cnlq + lgnr
nrbl: 2
lbvn: 2
vwcg: blpc + dsql
qmhc: 17
mccm: zvlp - frdw
sndl: 3
vjjm: cmjq / htzl
qmht: gfws - mgnh
ftgq: pmsn * fszt
lbzw: 3
lwjr: grjb * tvqf
lblg: 2
vlgr: 12
lvfl: 6
stlg: 8
bvdp: drbw + ztfd
nbrg: 2
rtvw: 17
cbsq: 15
pfmr: 2
mcwg: njpj * bcwq
hwfw: 2
wqsf: 2
zdtw: 3
dnmm: qbvs * qmws
tttp: lmvc - wjvv
vvpv: rbbj * mslt
bvnt: vngd + hlvn
bvjj: 2
ddzl: zlnf / dbqv
pntf: dvzm + jzbc
sppg: 9
qcqd: 4
whlg: 13
cpjm: 18
jfcn: 3
dnsc: 3
lngs: 6
srnd: hghr - sthl
hlbl: tmfm * mwnz
thhh: 7
mjcz: sdmq + jsgm
sgzm: bprt - wndp
sppt: twqt + msjl
ccch: qvfd + ztsf
tbrz: 2
bbwd: wdlq + wrvb
bjjn: phfj + fzcb
brhj: mjbv / lpwh
zwdt: 5
mcwn: fsrv + vvfh
sncs: qjmb + qzfc
fllv: hrqv / lllp
qjmb: ghrb * mwlm
sgdz: 5
mvjr: 3
rscq: 13
zmzd: sgfw * dsrc
fsmq: 2
ncch: 2
rqbz: cdpw + drjz
dgzb: tpbb * sdph
fscv: 2
pmtv: vqgh + mmgq
vqrf: wggj * wrqb
hzfg: 3
qtmg: ldzg / rrtc
drjs: wbwr + swgf
jzpn: 3
zzcr: 6
dghd: rtpj + pnlt
sdvq: rfgp * ggsw
prqr: znqt / srpc
vbcn: 3
flnv: jmrg * blqg
jpgj: 3
dlhh: pmms + chsg
rrvr: wjsv * hjch
cwmh: 13
tmsq: fhtv + cwbp
rcnl: 4
wchj: 2
lzjz: 11
cpwh: 3
tqsj: 4
ppfb: cpjm + ghnz
lntt: crps * ftgq
gtss: 4
rljv: hnhv * slch
qcmn: nqft * vmzt
rzfm: rsrp - wdjp
gwnp: sftl + gfwp
thhv: 4
hpcs: wcjm * mhww
ldnm: 5
psgj: ncdn * jzmd
zprm: 3
ntmq: dtwn * bhzd
bfhd: 8
nmhv: 4
bftf: vrqf * ghlb
rlll: 1
tmwh: ddzl + qdwp
hgmr: zqnf * jvqh
pqss: trfm + vcgg
cvjd: sccd * vngz
mwlm: 2
dsvv: 4
lgnr: 5
bzpv: qlrc + bvbp
nrfq: mlbn * fdnn
ltrz: mdql / tbrz
mbds: crdp * bngr
vmbf: 5
llfl: qwgr * gljm
wrsc: 13
glsj: 4
jzpm: lstd * lrfp
zzsp: cdjp + vtvq
lzjb: vfch * gfzv
scmf: 2
vdjf: mqnr / bhtb
grqr: 14
fczq: 5
qhfh: 16
dqvg: pmrt * sffd
rvzd: zsdr + cgzh
fbjg: bjbq * phvh
qvrn: wctd + lghz
zjgv: sqsh + wtvv
dcgw: bfbj / cjvd
cmtg: 2
twvm: lsph * ztvv
msjl: 19
zfdm: 2
psbr: dspc * lclz
gbdb: 9
fmhp: fgsg + pptj
ntlc: zjct / njld
tnmt: 3
qfcd: pntf - zghm
ldzg: vpdz * pwbs
mrfb: sgnd * whlc
rwlt: tvqz / tltr
lmvc: wmsr - dntj
rldg: 1
wgtg: 3
rshs: 1
cgzh: 4
sdsh: 14
bbfv: 2
fwjz: 2
lzcr: 10
rqvr: 2
ppnj: qcwg + flnv
btcg: 7
ghsl: ngwp * lvmh
gjcw: 5
bjmt: 5
czlg: 3
ptrm: qqdg + qqwq
dfsj: cwcg * hdhq
whlc: 13
hjcz: ddqh * gfjg
wmnt: 4
pzmm: chvn * jqwp
mrzl: 2
hmpw: 13
bzzp: 4
dbrp: 3
wcpv: 16
qbvs: 2
rlzq: 2
njpj: 14
gffm: pbtm + hmpc
jbtg: fnhf * bppv
fhrw: 2
tsdl: zzws * zjth
hgbm: 5
dggh: 5
jfpt: 3
fclv: 3
mngp: sscd + vqrf
cbzs: mrhm * mmmm
srjh: tsmw * tnzf
qsmb: wtzd * tvvw
dsrc: 5
wfrm: qfcd + cftd
tpbb: ctgb - njnh
jmzp: qjhc * qbts
jnhf: bnrb * ttvg
tplj: 2
vftj: 2
wgnp: pllt * ssfw
bqbd: 7
frms: pdmh * rthh
hhrm: 1
dngs: zgnn * jjsb
cwml: sbvb * gnfc
blqb: 2
lzhg: 4
fqtj: 5
cptw: 2
gdjz: chsf + plbl
sldt: ntcm * bwgq
glmp: 2
njmt: lfrj + frtz
mzfj: 3
rppw: qvmv + fqbs
tdjh: 2
vfhc: wlms + fjrb
fpnh: 7
zrdd: 2
vccs: qnpr * pgsb
zwcf: 2
bdlb: rglt + dqvg
zglp: 2
vlsv: qqpg + rhwd
llbh: nlvd + hgvp
bplm: srcj * nbrg
twhl: 1
ttqs: 19
rrhd: rnnc * bnqg
mnvt: mpfp + psdt
jgrj: rdpp * sppt
fvfv: mdtr * msqs
wrnn: 4
hpwh: 5
pqdh: hmpw * bqvv
tpwz: 2
ftgn: 4
pptp: 3
qmws: wptl + mjbs
twqt: hvqw / mbpn
dhhr: 3
mmqt: rzfm * zzcr
fjlj: sncr / nqjt
pqwg: zvlv * tqzz
lmrt: 10
snnj: gpcz + wjfv
wcrw: mrgq + ggrg
hfrg: 2
htgt: fqtj * jhrr
vtjc: hdqf + gfsn
tfzv: 2
qqzp: zfwb + djwm
rdms: dlpz + llfl
cgqp: ptnr + lzjz
thbz: 2
ltqm: 13
dgcq: 5
lwbg: 4
qzgr: zprj + srjf
ghmp: 20
qdhb: 2
vngz: 3
qtpd: 10
rnmz: 20
wssw: 3
wtzd: 4
sqmd: 17
jzzt: nvrc + mhfc
rflc: hlbl / tdmc
nhhp: 12
wqts: 3
hvlr: 13
htcn: 3
hccc: zttv * bvcg
fwpb: htlz * lcvv
dzdz: mpcq * cpwh
zmrp: rphl + pbrc
rwth: 3
pcrq: 4
qrfg: 3
gnhg: fmhb * dwmn
dvvg: 5
nhdf: 3
sjzp: bfvv * wwbs
crzd: 4
pldc: 2
cffn: 2
vnjt: 6
vbsr: 10
tfpd: nzfg * fgzv
dhns: qbwm * sjsc
zprj: bwjj * czjq
vtbm: 5
jwpq: jbbv * jqbd
rzfv: 3
rhfj: 10
ztsf: 12
fhgn: chfb * fpnh
rnwg: 4
nmlg: 2
fzbh: jngd + mzzm
srcm: 3
mdql: zcbr * cfwq
qrlp: 7
vgbg: hmtj - htwq
jhgz: 2
grdd: 2
pvcz: cjdg + bhzh
bmjr: wsdb * dhfw
mpvl: fdhf * jmfg
swfm: bdcr * fbhc
ftjr: swwq + gbwj
mhqf: dgmt * glmt
hvwz: 2
pdjq: 2
lrbz: bdbl + fhwj
mnmv: cncf + cfjs
phtq: 2
ctjd: 13
ztpv: hdjm * dngs
dpfp: vpfm + vhcd
hctf: qlzb + mplm
tfbw: rlll + hfbj
vblt: msrj * jmjw
zjvf: 2
pptj: 7
drcm: nsdj * ntqz
vnhp: 3
zttv: 3
psqs: bdlj * vvwv
pndq: sqnv * fjnp
pbmf: 3
srjd: 4
nsld: nrts - mppd
dvzm: gsgq * rzgj
grdz: tzsm + tsrp
czhf: gdvr / crtp
hchb: thhh * gnjd
qtfm: 3
wjbj: bcdf + vtbv
zdzc: 2
jfpc: gscs * vjvq
sgfw: 5
drvd: 2
rlbm: 3
lrhg: 6
fpdb: pqwg + sldt
wtwh: 8
swhv: 2
hgsq: brpp + trbc
crtp: 2
nblt: 7
mzdw: 2
lnnn: 2
vbqc: lngc + dffp
cbmt: ngnd / dcps
gctb: 1
thfr: 5
fnzf: 17
gcdw: chnc * hntg
crdp: 2
chsg: twdm * vjcp
gmsl: 2
nnll: 7
mtwd: pdwf * rwpb
gnjd: 2
llnm: 3
jwbq: tpwz * zgct
zdlb: 5
nbgq: 2
bdzz: 1
vfwv: 2
vqpd: ntzq + dtzp
mpln: 7
fcpw: 2
smgm: hgzd * ztwf
bzdv: 10
pbtd: thpr + gddt
jvth: 5
ggvq: 5
pqsm: 2
jwhz: dnmm * nrmf
dbvf: tltv + tttd
pwwg: 11
cblf: vjmb / zgbp
gpvg: 3
zzzq: 2
vlqc: fqwv + jvzj
wtqq: 2
hrqf: zgvs - gwbc
jjch: 4
pbrc: bsbs + lrbz
vjvp: 5
lltd: zjgv + rcjj
nmcz: 2
djpp: 2
wqhz: 2
ffzw: 4
vvqb: 2
sgtg: glln * jqzz`;

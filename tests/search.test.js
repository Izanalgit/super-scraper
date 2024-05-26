const {fetchCap} = require('../controllers/supers/cap');
const {fetchCon} = require('../controllers/supers/cod');
const {fetchDia} = require('../controllers/supers/dia');
const {fetchElc} = require('../controllers/supers/elc');
const {fetchEro} = require('../controllers/supers/ero');
const {fetchLid} = require('../controllers/supers/lid');
const {fetchLsi} = require('../controllers/supers/lsi');
const {fetchAld} = require('../controllers/supers/ald');
const {fetchCar} = require('../controllers/supers/car');

afterEach(() => {    
    jest.clearAllMocks(); //Clear spyOn
  });

describe('TEST SCRAP PING : ',()=>{
    it('Conexion of CAP',async()=>{
        const logSpy = jest.spyOn(console,'log');
        await fetchCap('fanta');

        expect(JSON.stringify(logSpy.mock.calls[0][0]))
        .toEqual(JSON.stringify("Fetch done : \u001b[32mCAP\u001b[0m"))
    })
    it('Conexion of COD',async()=>{
        const logSpy = jest.spyOn(console,'log');
        await fetchCon('fanta');

        expect(JSON.stringify(logSpy.mock.calls[0][0]))
        .toEqual(JSON.stringify("Fetch done : \u001b[32mCOD\u001b[0m"))
    })
    it('Conexion of DIA',async()=>{
        const logSpy = jest.spyOn(console,'log');
        await fetchDia('salmon');

        expect(JSON.stringify(logSpy.mock.calls[0][0]))
        .toEqual(JSON.stringify("Fetch done : \u001b[32mDIA\u001b[0m"))
    })
    it('Conexion of ELC',async()=>{
        const logSpy = jest.spyOn(console,'log');
        await fetchElc('fanta');

        expect(JSON.stringify(logSpy.mock.calls[0][0]))
        .toEqual(JSON.stringify("Fetch done : \u001b[32mELC\u001b[0m"))
    })
    it('Conexion of ERO',async()=>{
        const logSpy = jest.spyOn(console,'log');
        await fetchEro('fanta');

        expect(JSON.stringify(logSpy.mock.calls[0][0]))
        .toEqual(JSON.stringify("Fetch done : \u001b[32mERO\u001b[0m"))
    })
    it('Conexion of LID',async()=>{
        const logSpy = jest.spyOn(console,'log');
        await fetchLid('salmon');

        expect(JSON.stringify(logSpy.mock.calls[0][0]))
        .toEqual(JSON.stringify("Fetch done : \u001b[32mLID\u001b[0m"))
    })
    it('Conexion of LSI',async()=>{
        const logSpy = jest.spyOn(console,'log');
        await fetchLsi('salmon');

        expect(JSON.stringify(logSpy.mock.calls[0][0]))
        .toEqual(JSON.stringify("Fetch done : \u001b[32mLSI\u001b[0m"))
    })
    it('Conexion of ALD',async()=>{
        const logSpy = jest.spyOn(console,'log');
        await fetchAld('fanta');

        expect(JSON.stringify(logSpy.mock.calls[0][0]))
        .toEqual(JSON.stringify("Fetch done : ALD : \u001b[32mBROWSER OPEN\u001b[0m"))
        expect(JSON.stringify(logSpy.mock.calls[1][0]))
        .toEqual(JSON.stringify("Fetch done : ALD : \u001b[32mBROWSER REDIRECT\u001b[0m"))
        expect(JSON.stringify(logSpy.mock.calls[2][0]))
        .toEqual(JSON.stringify("Fetch done : ALD : \u001b[32mSCRAP\u001b[0m"))
        expect(JSON.stringify(logSpy.mock.calls[3][0]))
        .toEqual(JSON.stringify("Fetch done : ALD : \u001b[32mBROWSER CLOSE\u001b[0m"))
    },20000)
    it('Conexion of CAR',async()=>{
        const logSpy = jest.spyOn(console,'log');
        await fetchCar('fanta');

        expect(JSON.stringify(logSpy.mock.calls[0][0]))
        .toEqual(JSON.stringify("Fetch done : CAR : \u001b[32mBROWSER OPEN\u001b[0m"))
        expect(JSON.stringify(logSpy.mock.calls[1][0]))
        .toEqual(JSON.stringify("Fetch done : CAR : \u001b[32mBROWSER REDIRECT\u001b[0m"))
        expect(JSON.stringify(logSpy.mock.calls[2][0]))
        .toEqual(JSON.stringify("Fetch done : CAR : \u001b[32mSCRAP\u001b[0m"))
        expect(JSON.stringify(logSpy.mock.calls[3][0]))
        .toEqual(JSON.stringify("Fetch done : CAR : \u001b[32mBROWSER CLOSE\u001b[0m"))
    },20000)
})
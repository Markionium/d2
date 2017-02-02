import {
    formatAsISODate,
    filterFuturePeriods,
    getLastDateOfMonth,
    getFirstDateOfQuarter,
    getLastDateOfQuarter,
} from '../../../src/period/helpers';

describe('Period helpers', () => {
    describe('formatAsISODate()', () => {
        it('should format a date as YYYY-MM-DD', () => {
            expect(formatAsISODate(new Date(2017, 1, 1))).to.equal('2017-02-01');
        });

        it('should throw when the passed date is not a Date', () => {
            expect(() => formatAsISODate('2017-02-01')).to.throw();
            expect(() => formatAsISODate()).to.throw();
            expect(() => formatAsISODate(null)).to.throw();
            expect(() => formatAsISODate(1)).to.throw();
        });
    });

    describe('filterFuturePeriods()', () => {
        const firstOfJanuary2017 = 1483228800000;
        let clock;
        const periods = [
            {
                endDate: '2015-12-31',
                startDate: '2015-01-01',
                name: '2015',
                id: '2015',
            }, {
                endDate: '2016-12-31',
                startDate: '2016-01-01',
                name: '2016',
                id: '2016',
            }, {
                endDate: '2017-12-31',
                startDate: '2017-01-01',
                name: '2017',
                id: '2017',
            }, {
                endDate: '2018-12-31',
                startDate: '2018-01-01',
                name: '2018',
                id: '2018',
            }, {
                endDate: '2018-12-31',
                startDate: '2018-01-01',
                name: '2018',
                id: '2018',
            },
        ];

        beforeEach(() => {
            clock = sinon.useFakeTimers(firstOfJanuary2017);
        });

        afterEach(() => {
            clock.restore();
        });

        it('should filter out the future periods', () => {
            expect(filterFuturePeriods(periods)).to.have.length(3);
        });

        it('should filter out the future periods', () => {
            expect(filterFuturePeriods(periods)).to.deep.equal([
                {
                    endDate: '2015-12-31',
                    startDate: '2015-01-01',
                    name: '2015',
                    id: '2015',
                }, {
                    endDate: '2016-12-31',
                    startDate: '2016-01-01',
                    name: '2016',
                    id: '2016',
                }, {
                    endDate: '2017-12-31',
                    startDate: '2017-01-01',
                    name: '2017',
                    id: '2017',
                }
            ]);
        });
    });

    describe('getLastDateOfMonth()', () => {
        it('returns the correct date for normal and leap years', () => {
            expect(getLastDateOfMonth(1980, 1).getDate()).to.equal(29);
            expect(getLastDateOfMonth(1981, 1).getDate()).to.equal(28);
            expect(getLastDateOfMonth(2000, 0).getDate()).to.equal(31);
        })
    });

    describe('getFirstDateOfQuarter()', () => {
        it('returns the correct start date for each quarter', () => {
            expect(getFirstDateOfQuarter(2017, 1).toDateString()).to.equal(new Date(2017, 0, 1).toDateString());
            expect(getFirstDateOfQuarter(2017, 2).toDateString()).to.equal(new Date(2017, 3, 1).toDateString());
            expect(getFirstDateOfQuarter(2017, 3).toDateString()).to.equal(new Date(2017, 6, 1).toDateString());
            expect(getFirstDateOfQuarter(2017, 4).toDateString()).to.equal(new Date(2017, 9, 1).toDateString());
        })
    });
    describe('getLastDateOfQuarter()', () => {
        it('returns the correct end date for each quarter', () => {
            const lastOfMarch = new Date(2017, 2, 31);
            const lastOfJune = new Date(2017, 5, 30);
            const lastOfSept = new Date(2017, 8, 30);
            const lastOfDec = new Date(2017, 11, 31);
            expect(getLastDateOfQuarter(2017, 1).toDateString()).to.equal(lastOfMarch.toDateString());
            expect(getLastDateOfQuarter(2017, 2).toDateString()).to.equal(lastOfJune.toDateString());
            expect(getLastDateOfQuarter(2017, 3).toDateString()).to.equal(lastOfSept.toDateString());
            expect(getLastDateOfQuarter(2017, 4).toDateString()).to.equal(lastOfDec.toDateString());
        });
    });
});

import { describe, it } from 'mocha';
import { expect } from 'chai';
import DateRangeGen from '../../src/utils/dateRangeGen';

describe('Date range generator test', () => {
  it('Should return an array of dates', () => {
    const dateArray = DateRangeGen('2019-10-10', '2019-10-11');
    expect(dateArray).to.be.an('array').that.includes('10-10-2019');
    expect(dateArray).to.be.an('array').that.includes('11-10-2019');
  });

  it('Should return empty array if starting date is higher than ending date', () => {
    const dateArray = DateRangeGen('2019-10-11', '2019-10-10');
    expect(dateArray).to.be.an('array').that.is.empty;
  });

  it('Should return empty array if starting date is earlier than today\'s', () => {
    const dateArray = DateRangeGen('2019-09-11', '2019-10-10');
    expect(dateArray).to.be.an('array').that.is.empty;
  });
});

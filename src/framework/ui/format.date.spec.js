import { formatDate } from './format.date';

describe('formatDate', () => {
    it('should format the given date', () => {
        let dateToFormat = new Date();
        dateToFormat.setYear(2016);
        dateToFormat.setMonth(0);
        dateToFormat.setDate(1);
        dateToFormat.setHours(1);
        dateToFormat.setMinutes(10);

        let formattedDate = formatDate(dateToFormat.toString());

        expect(formattedDate).toEqual('2016-1-1 1:10');
    });
});
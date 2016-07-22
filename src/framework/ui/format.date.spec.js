import {formatDate} from './format.date';

describe('formatDate', ()=>{
   it('should format the given date', ()=>{
       "use strict";
        let dateToFormat = 'Mon Jul 18 2016 09:49:31 GMT+0200 (CEST)';
        let formattedDate = formatDate(dateToFormat);

       expect(formattedDate).toEqual('2016-7-18 9:49');
   });
});
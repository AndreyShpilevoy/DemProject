/*eslint no-undef: 'off'*/
/*eslint import/imports-first: 'off'*/

import TransformDateTime from 'services/dateTime/TransformDateTime';

jest.mock('../../translations/TermTranslation');

describe('TransformDateTime', () => {

  it('GetRelative() should return "less than a minute ago" if Date object has current date and "locale" param is valid',() => {
    let result = TransformDateTime.GetRelative(new Date(), 'en');
    expect(result).toBe('less than a minute ago');
  });

  it('GetRelative() should return "about a minute ago" if Date object has current date minus one minute and "locale" param is valid',() => {
    let date = new Date();
    date.setMinutes(date.getMinutes() - 1);
    let result = TransformDateTime.GetRelative(date, 'en');
    expect(result).toBe('about a minute ago');
  });

  it('GetRelative() should return "about an hour ago" if Date object has current date minus one hour and "locale" param is valid',() => {
    let date = new Date();
    date.setHours(date.getHours() - 1);
    let result = TransformDateTime.GetRelative(date, 'en');
    expect(result).toBe('about an hour ago');
  });

  it('GetRelative() should return "a day ago" if Date object has current date minus one day and "locale" param is valid',() => {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    let result = TransformDateTime.GetRelative(date, 'en');
    expect(result).toBe('a day ago');
  });

  it('GetRelative() should return "about a month ago" if Date object has current date minus one month and "locale" param is valid',() => {
    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    let result = TransformDateTime.GetRelative(date, 'en');
    expect(result).toBe('about a month ago');
  });

  it('GetRelative() should return "about a year" if Date object has current date minus one year and "locale" param is valid',() => {
    let date = new Date();
    date.setYear(date.getYear() - 1);
    let result = TransformDateTime.GetRelative(date, 'en');
    expect(result).toBe('about a year ago');
  });

  it('GetRelative() should return "undefined" if params is not present',() => {
    let result = TransformDateTime.GetRelative();
    expect(result).toBeUndefined();
  });

  it('GetRelative() should return string in right format - "Month/Date/Year Hours:Minutes" if data is valid and "locale" param is not valid',() => {
    let date = new Date();
    let expected = `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`;
    let result = TransformDateTime.GetRelative(date, 'wrong locale');
    expect(result).toBe(expected);
  });


  it('GetLocaleDateTime() should return string in right format - "Month Day, Year, Hour:Minutes PartOfDay" if data is valid and "locale" param is valid',() => {
    let date = new Date(1478696986000);
    let options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    let expected = 'Nov 9, 2016, 3:09 PM';
    let result = TransformDateTime.GetLocaleDateTime(date, 'en', options);
    expect(result).toBe(expected);
  });
  it('GetLocaleDateTime() should return "undefined" if params is not present',() => {
    let result = TransformDateTime.GetLocaleDateTime();
    expect(result).toBeUndefined();
  });

});

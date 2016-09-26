/*eslint no-undef: "off"*/
/*eslint import/imports-first: "off"*/

jest.mock("../TermTranslation");

import TransformDateTime from "../TransformDateTime";

describe('TransformDateTime', () => {

  it('should return "less than a minute ago"',() => {
    let result = TransformDateTime.GetRelative(new Date(), null);
    expect(result).toBe("less than a minute ago");
  });

  it('should return "about a minute ago"',() => {
    let date = new Date();
    date.setMinutes(date.getMinutes() - 1);
    let result = TransformDateTime.GetRelative(date, null);
    expect(result).toBe("about a minute ago");
  });

  it('should return "about an hour ago"',() => {
    let date = new Date();
    date.setHours(date.getHours() - 1);
    let result = TransformDateTime.GetRelative(date, null);
    expect(result).toBe("about an hour ago");
  });

  it('should return "a day ago"',() => {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    let result = TransformDateTime.GetRelative(date, null);
    expect(result).toBe("a day ago");
  });

  it('should return "about a month ago"',() => {
    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    let result = TransformDateTime.GetRelative(date, null);
    expect(result).toBe("about a month ago");
  });

  it('should return "about a year"',() => {
    let date = new Date();
    date.setYear(date.getYear() - 1);
    let result = TransformDateTime.GetRelative(date, null);
    expect(result).toBe("about a year ago");
  });

  it('should return "about a year"',() => {
    let date = new Date();
    let expected = `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`;
    let result = TransformDateTime.GetRelative(date, undefined);
    expect(result).toBe(expected);
  });

});

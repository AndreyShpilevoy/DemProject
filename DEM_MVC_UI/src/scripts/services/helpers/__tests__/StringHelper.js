/*eslint no-undef: "off"*/

import StringHelper from "services/helpers/StringHelper";

describe('StringHelper', () => {

  it('stringFormat should return "string with first and second elements" if all params is valid',() => {
    let result = StringHelper.stringFormat("string with {0} and {1} elements", "first", "second");
    expect(result).toBe("string with first and second elements");
  });
  it('stringFormat should return "string with {0} and {1} elements" if params except strng is not present',() => {
    let result = StringHelper.stringFormat("string with {0} and {1} elements");
    expect(result).toBe("string with {0} and {1} elements");
  });
  it('stringFormat should return "undefined" if all params is not present',() => {
    let result = StringHelper.stringFormat();
    expect(result).toBeUndefined();
  });

  it('stringIsLink should return "true" if param is valid link with "http" - "http://google.com"',() => {
    let result = StringHelper.stringIsLink("http://google.com");
    expect(result).toBeTruthy();
  });
  it('stringIsLink should return "true" if param is valid link with "https" - "https://google.com"',() => {
    let result = StringHelper.stringIsLink("https://google.com");
    expect(result).toBeTruthy();
  });
  it('stringIsLink should return "true" if param is valid link with "ftp" - "ftp://google.com"',() => {
    let result = StringHelper.stringIsLink("ftp://google.com");
    expect(result).toBeTruthy();
  });
  it('stringIsLink should return "false" if param is not valid link with - "google.com"',() => {
    let result = StringHelper.stringIsLink("google.com");
    expect(result).toBeFalsy();
  });
  it('stringIsLink should return "undefined" if param is not present',() => {
    let result = StringHelper.stringIsLink();
    expect(result).toBeUndefined();
  });

  it('stringIsEmail should return "true" if params is valig email - "4252744@ukr.net"',() => {
    let result = StringHelper.stringIsEmail("4252744@ukr.net");
    expect(result).toBeTruthy();
  });
  it('stringIsEmail should return "false" if  if params is not valig email - "4252744-ukr.net"',() => {
    let result = StringHelper.stringIsEmail("4252744-ukr.net");
    expect(result).toBeFalsy();
  });
  it('stringIsEmail should return "undefined" if  if params is not present',() => {
    let result = StringHelper.stringIsEmail();
    expect(result).toBeUndefined();
  });

});

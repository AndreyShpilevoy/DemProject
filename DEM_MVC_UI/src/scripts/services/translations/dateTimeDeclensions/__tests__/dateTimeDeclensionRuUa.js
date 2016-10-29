/*eslint no-undef: "off"*/

import dateTimeDeclensionRuUa from "services/translations/dateTimeDeclensions/dateTimeDeclensionRuUa";

describe('dateTimeDeclensionRuUa', () => {

  it('should return "singleForm"',() => {
    let result = dateTimeDeclensionRuUa(1,"firstForm","secondForm","trirdForm","singleForm");
    expect(result).toBe("singleForm");
  });

  it('should return "21 firstForm"',() => {
    let result = dateTimeDeclensionRuUa(21,"firstForm","secondForm","trirdForm","singleForm");
    expect(result).toBe("21 firstForm");
  });

  it('should return "2 secondForm"',() => {
    let result = dateTimeDeclensionRuUa(2,"firstForm","secondForm","trirdForm","singleForm");
    expect(result).toBe("2 secondForm");
  });

  it('should return "5 trirdForm"',() => {
    let result = dateTimeDeclensionRuUa(5,"firstForm","secondForm","trirdForm","singleForm");
    expect(result).toBe("5 trirdForm");
  });

});

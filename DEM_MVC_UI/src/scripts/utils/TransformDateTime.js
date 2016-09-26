import TermTranslation from "./TermTranslation";

class TransformDateTime {
  constructor(){
    this.msPerMinute = 60 * 1000;
    this.msPerHour = this.msPerMinute * 60;
    this.msPerDay = this.msPerHour * 24;
    this.msPerMonth = this.msPerDay * 30;
    this.msPerYear = this.msPerDay * 365;
  }
  GetRelative(date, locale) {
    let dateTimeDeclension = TermTranslation.getDateTimeDeclension(locale);
    if(!dateTimeDeclension)
    {
      return `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`;
    }
    let suffixAgo = TermTranslation.getTermTranslation({id: 4, value: "ago"}, locale);

    let msDeltaTime = new Date() - date;
    let dateTime;

    if (msDeltaTime < this.msPerMinute) {
      dateTime = TermTranslation.getTermTranslation({id: 5, value: "less than a minute"}, locale);
    }

    else if (msDeltaTime < this.msPerHour) {
      let number = Math.round(msDeltaTime/this.msPerMinute);
      let oneMinute = TermTranslation.getTermTranslation({id: 6, value: "about a minute"}, locale);
      let firstForm = TermTranslation.getTermTranslation({id: 7, value: "minutes"}, locale);
      let secondForm = TermTranslation.getTermTranslation({id: 8, value: "minutes"}, locale);
      let thirdForm = TermTranslation.getTermTranslation({id: 9, value: "minutes"}, locale);
      dateTime = dateTimeDeclension(number, firstForm, secondForm, thirdForm, oneMinute);
    }

    else if (msDeltaTime < this.msPerDay ) {
      let number = Math.round(msDeltaTime/this.msPerHour);
      let firstForm = TermTranslation.getTermTranslation({id: 10, value: "about an hour"}, locale);
      let secondForm = TermTranslation.getTermTranslation({id: 11, value: "hours"}, locale);
      let thirdForm = TermTranslation.getTermTranslation({id: 12, value: "hours"}, locale);
      dateTime = dateTimeDeclension(number, firstForm, secondForm, thirdForm, firstForm);
    }

    else if (msDeltaTime < this.msPerMonth) {
      let number = Math.round(msDeltaTime/this.msPerDay);
      let firstForm = TermTranslation.getTermTranslation({id: 13, value: "a day"}, locale);
      let secondForm = TermTranslation.getTermTranslation({id: 14, value: "days"}, locale);
      let thirdForm = TermTranslation.getTermTranslation({id: 15, value: "days"}, locale);
      dateTime = dateTimeDeclension(number, firstForm, secondForm, thirdForm, firstForm);
    }

    else if (msDeltaTime < this.msPerYear) {
      let number = Math.round(msDeltaTime/this.msPerMonth);
      let firstForm = TermTranslation.getTermTranslation({id: 16, value: "about a month"}, locale);
      let secondForm = TermTranslation.getTermTranslation({id: 17, value: "months"}, locale);
      let thirdForm = TermTranslation.getTermTranslation({id: 18, value: "months"}, locale);
      dateTime = dateTimeDeclension(number, firstForm, secondForm, thirdForm, firstForm);
    }

    else {
      let number = Math.round(msDeltaTime/this.msPerYear );
      let firstForm = TermTranslation.getTermTranslation({id: 19, value: "about a year"}, locale);
      let secondForm = TermTranslation.getTermTranslation({id:20, value: "years"}, locale);
      let thirdForm = TermTranslation.getTermTranslation({id: 21, value: "years"}, locale);
      dateTime = dateTimeDeclension(number, firstForm, secondForm, thirdForm, firstForm);
    }

    return `${dateTime} ${suffixAgo}`;
  }
}

export default new TransformDateTime();

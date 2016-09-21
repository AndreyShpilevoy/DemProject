const TransformDateTime = {
  GetRelative(date, locale) {
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = new Date() - date;
    let result;

    if (elapsed < msPerMinute) {
         result = Math.round(elapsed/1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
         result = Math.round(elapsed/msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay ) {
        result = Math.round(elapsed/msPerHour ) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        result = 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        result = 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
    }

    else {
        result = 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';
    }

    return result || "";
  }
};

export default TransformDateTime;

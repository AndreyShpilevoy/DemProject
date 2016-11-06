class StringHelper {
  stringFormat = (format, ...args) => {
    return format.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined'
      ? args[number]
      : match;
    });
  }

  stringIsLink = (string) => {
    let regex = /^(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]$/i;
    return regex.test(string.trim());
  }

  stringIsEmail = (string) => {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(string.trim());
  }
}

export default new StringHelper();

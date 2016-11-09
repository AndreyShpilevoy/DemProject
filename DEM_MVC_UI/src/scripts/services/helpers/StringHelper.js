class StringHelper {
  stringFormat = (format, ...args) => {
    if (!format) return undefined;

    return format.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined'
      ? args[number]
      : match;
    });
  }

  stringIsLink = (string) => {
    if (!string) return undefined;

    let regex = /^(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]$/i;
    return regex.test(string.trim());
  }

  stringIsEmail = (string) => {
    if (!string) return undefined;
    
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(string.trim());
  }
}

export default new StringHelper();

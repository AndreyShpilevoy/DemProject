class StringHelper {
  stringFormat = (format, ...args) => {
    return format.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined'
      ? args[number]
      : match;
    });
  }

  stringIsLink = (string) => {
    this.stringFormat('adgdfg{0}xghfgh','1233');
    let regex = /^(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]$/i;
    return regex.exec(string.trim()) ? true : false;
  }
}

export default new StringHelper();

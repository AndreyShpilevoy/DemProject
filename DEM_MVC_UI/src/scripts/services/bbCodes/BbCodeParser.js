import * as bbCodeTypes from "enums/bbCodeTypes";

class BbCodeParser{
  getParsedTree = (text) => {
    let allTags = this.getAllTags(text);
    debugger;
    //this.buildTree(allTags);
  }

  getAllTags = (text) => {
    let result = [];
    let regex = /([\r\n])|(?:\[([a-z0-9\*]{1,16})(?:=(?:"|'|)([^\x00-\x1F"'\(\)<>\[\]]{1,256}))?(?:"|'|)\])|(?:\[\/([a-z0-9\*]{1,16})\])/gi;
    let textParsed = false;
    while (!textParsed) {
      let match = regex.exec(text);
      if(!match){
        textParsed = true;
        break;
      }

      let matchResult = {
        type: match[1] ? bbCodeTypes.NEW_LINE : match[2] ? bbCodeTypes.OPEN_TAG : bbCodeTypes.CLOSE_TAG,
        match: match[0],
        tag: match[2],
        options: match[3],
        firstIndex: match.index,
        lastIndex: regex.lastIndex,
      };

      result.push(matchResult);
    }
    return result;
  }

  // buildTree = (tagsArray) => {
  //   for(let tag of tagsArray){
  //
  //   }
  // }

  //getNode =
}

export default new BbCodeParser();

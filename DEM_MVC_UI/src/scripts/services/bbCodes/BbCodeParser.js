import * as bbCodeTypes from "enums/bbCodeTypes";

class BbCodeParser{
  getParsedTree = (text) => {
    let allTags = this.getAllTags(text);
    this.buildTree(allTags);
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
        tag: match[2] ? match[2] : match[4],
        options: match[3],
        firstIndex: match.index,
        lastIndex: regex.lastIndex,
      };

      result.push(matchResult);
    }
    return result;
  }

  buildTree = (tagsArray) => {
    let nodeTree = [];
    for(let index = 0; index < tagsArray.length;){
      let resultObject = this.getNode(tagsArray[index], index+1, tagsArray);
      index = resultObject.index;
      if(resultObject.node) {
        nodeTree.push(resultObject.node);
      }
    }
  }

  getNode = (tag, index, tagsArray) => {
    let node = {
      openTag: tag,
      closeTag: null,
      children: []
    };

    let i = index;
    for(; i < tagsArray.length;){
      if(tagsArray[i].type === bbCodeTypes.CLOSE_TAG &&
        tagsArray[i].tag === tag.tag){
        node.closeTag = tagsArray[i];
        i++;
        break;
      }
      else if(tagsArray[i].type === bbCodeTypes.OPEN_TAG){
        let childNodeResultObject = this.getNode(tagsArray[i], i+1,tagsArray);
        if(childNodeResultObject){
          node.children.push(childNodeResultObject.node);
          i = childNodeResultObject.index;
        }
      }
      else{
        i++;
      }
    }
    if(node.closeTag) {
      return {node, index:i};
    } else {
      return {node:null, index: index+1};
    }
  }
}

export default new BbCodeParser();

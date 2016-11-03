import * as bbCodeTypes from "enums/bbCodeTypes";
import BbCodesMap from 'services/bbCodes/BbCodesMap';

class BbCodeParser{
  getParsedTree = (text) => {
    text = this.wrappToRootNodeIfNecessary(text);
    let allTags = this.getAllTags(text);
    return this.buildTree(allTags);
  }

  wrappToRootNodeIfNecessary = (text) => {
    let result = text;
    if(result.substring(0, 6)!=="[root]"){
      result = `[root]${text}[/root]`;
    }
    return result;
  }

  getAllTags = (text) => {
    let result = [];
    let regex = /([\r\n])|(?:\[([a-z0-9\*]{1,16})(?:=(?:"|'|)([^\x00-\x1F"'\(\)<>\[\]]{1,256}))?(?:"|'|)\])|(?:\[\/([a-z0-9\*]{1,16})\])/gi;
    let textParsed = false;
    let codeIndex = 0;
    while (!textParsed) {
      let match = regex.exec(text);
      if(!match){
        textParsed = true;
        break;
      }

      let matchedResult = {
        type: match[1] ? bbCodeTypes.NEW_LINE : match[2] ? bbCodeTypes.OPEN_TAG : bbCodeTypes.CLOSE_TAG,
        match: match[0],
        tag: match[2] ? match[2] : match[4],
        options: match[3],
        firstIndex: match.index,
        lastIndex: regex.lastIndex
      };

      //if tag is not exist in avaliable maps - skip step
      if((matchedResult.type !== bbCodeTypes.NEW_LINE && !BbCodesMap.getMaps[matchedResult.tag.toLowerCase()])){
        continue;
      }

      //if open tag 'code' - codeIndex++
      if(matchedResult.type === bbCodeTypes.OPEN_TAG && matchedResult.tag.toLowerCase() == 'code'){
        codeIndex++;
      //if close tag 'code' - codeIndex--
      } else if (matchedResult.type === bbCodeTypes.CLOSE_TAG && matchedResult.tag.toLowerCase() == 'code'){
        codeIndex--;
      }

      //if codeIndex != null or tag != 'code' - dont add any items to array
      if(codeIndex == 0 || matchedResult.tag &&  matchedResult.tag.toLowerCase() == 'code'){
        //get text beetwin two tags
        if(result.length > 0 && result[result.length-1].lastIndex !== matchedResult.firstIndex ){
          let calculatedTextPart = {
            type: bbCodeTypes.TEXT,
            match: text.substring(result[result.length-1].lastIndex, matchedResult.firstIndex),
            firstIndex: result[result.length-1].lastIndex,
            lastIndex: matchedResult.firstIndex
          };
          result.push(calculatedTextPart);
        }
        result.push(matchedResult);
      }
    }
    return result;
  }

  buildTree = (tagsArray) => {
    let rootNode = {};
    for(let index = 0; index < tagsArray.length;){
      let resultObject = this.getNode(tagsArray[index], index+1, tagsArray);
      index = resultObject.index;
      if(resultObject.node) {
        rootNode = resultObject.node;
      }
    }
    return rootNode;
  }

  getNode = (tagItem, index, tagsArray) => {
    let node = {
      type: tagItem.tag,
      options: tagItem.options,
      firstIndex: tagItem.firstIndex,
      lastIndex: null,
      content: null,
      children: []
    };

    let i = index;
    for(; i < tagsArray.length;){
      //if we found closed tag for current tagItem
      if(tagsArray[i].type === bbCodeTypes.CLOSE_TAG && tagsArray[i].tag === tagItem.tag){
        node.lastIndex = tagsArray[i].lastIndex;
        i++;
        break;
      }
      //if we found another opened tag
      else if(tagsArray[i].type === bbCodeTypes.OPEN_TAG){
        let childNodeResultObject = this.getNode(tagsArray[i], i+1,tagsArray);
        if(childNodeResultObject){
          node.children.push(childNodeResultObject.node);
          i = childNodeResultObject.index;
        }
      }
      //if we found text that should be contained in current tag
      else if(tagsArray[i].type === bbCodeTypes.TEXT){
        let textNode = {
          options: null,
          firstIndex: tagsArray[i].firstIndex,
          lastIndex: tagsArray[i].lastIndex,
          content: tagsArray[i].match,
          children: []
        };
        if(tagsArray[i+1].type === bbCodeTypes.NEW_LINE){
          textNode.type = "textlinewithbreak";
        }
        else {
          textNode.type = "textline";
        }
        node.children.push(textNode);
        i++;
      }
      else{
        i++;
      }
    }
    if(node.lastIndex) {
      return {node, index:i};
    }
    else {
      return {node:null, index: index+1};
    }
  }
}

export default new BbCodeParser();

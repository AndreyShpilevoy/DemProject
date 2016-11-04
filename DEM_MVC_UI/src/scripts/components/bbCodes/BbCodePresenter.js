import React, {PropTypes} from 'react';
import BbCodeParser from 'services/bbCodes/BbCodeParser';
import BbCodesMap from 'bbCodes/BbCodesMap';


class BbCodePresenter extends React.Component {
  static propTypes = {
    text: PropTypes.object.isRequired
  };

  state = {
    parsedTree: BbCodeParser.getParsedTree(this.props.text),
    mappedComponents: BbCodesMap.getMaps
  }

  mapTreeToComponent = () => {
    let parsedTree = this.state.parsedTree;
    let mappedTree;
    if(parsedTree.type === 'root' && parsedTree.children.length > 0){
      mappedTree = this.mapNodeToComponent(parsedTree);
    }
    return mappedTree;
  }

  mapNodeToComponent = (node) => {
    let Component = this.getComponentByTagName(node.type);
    let result;
    if(Component){
      if(node.children.length > 0) {
        let children = [];
        for(let child of node.children){
          children.push(this.mapNodeToComponent(child));
        }
        result = Component(children, node.options);
      }
      else {
        result = Component(node.content, node.options);
      }
    }
    return result;
  }

  getComponentByTagName = (tagName) => {
    return this.state.mappedComponents[tagName.toLowerCase()];
  }

  render(){
    return this.mapTreeToComponent();
  }
}

export default BbCodePresenter;

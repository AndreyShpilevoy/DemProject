import React, {PropTypes} from 'react';
import TermItem from 'containers/TermItem';
import SelectTextFromContainerById from 'services/domScripts/SelectTextFromContainerById';

class Code extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    children: PropTypes.node,
    options: PropTypes.string
  }

  state = {
    buttonId: `button-${this.props.id}`,
    containetId: `container-${this.props.id}`
  }

  componentDidMount(){
    let {buttonId, containetId} = this.state;
    SelectTextFromContainerById.init(buttonId, containetId);
  }

  render() {
    let {buttonId, containetId} = this.state;
    const { children, options } = this.props;
    return (
      <div className = 'bbCode-code'>
        <div className = 'bbCode-code-header'>
          <div className = 'bbCode-code-header-left'>
            <TermItem spaceAfter term={{id: 34, value: 'Code:'}} />
            <span id={buttonId} className = 'bbCode-code-select-button'>
              <TermItem spaceAfter term={{id: 35, value: 'Ctrl+A, Ctrl+C'}} />
            </span>
          </div>
          <div className = 'bbCode-code-header-right'>
            {options ? options : null}
          </div>
        </div>
        <span
          id={containetId}
          className = 'bbCode-code-content'>
          {children}
        </span>
      </div>
    );
  }
}

export default Code;

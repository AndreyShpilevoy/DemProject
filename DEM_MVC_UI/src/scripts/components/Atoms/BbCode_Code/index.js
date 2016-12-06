import React, {PropTypes} from 'react';
import TermItem from 'containers/TermItem';
import SelectTextFromContainerById from 'services/domScripts/SelectTextFromContainerById';
import styles from './index.scss';

class BbCode_Code extends React.Component {
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
      <div className = {styles.code}>
        <div className = {styles.codeHeader}>
          <div className = {styles.codeHeaderLeft}>
            <TermItem spaceAfter term={{id: 34, value: 'Code:'}} />
            <span id={buttonId} className = {styles.codeSelectButton}>
              <TermItem spaceAfter term={{id: 35, value: 'Ctrl+A, Ctrl+C'}} />
            </span>
          </div>
          <div className = {styles.codeHeaderRight}>
            {options ? options : null}
          </div>
        </div>
        <span
          id={containetId}
          className = {styles.codeContent}>
          {children}
        </span>
      </div>
    );
  }
}

export default BbCode_Code;

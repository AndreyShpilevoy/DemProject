// <table border="0" cellpadding="0" cellspacing="0">
//   <tbody>
//     <tr>
//       <td style="margin: 0;padding: 0;border: 0;">
//         <div style=" background-color: #FFEBD5;color: #000000; -moz-border-radius: 16px; -webkit-border-radius: 16px; border: 1px solid #FFFFFF; padding: 4px;font-size: 1em;">
//           &nbsp; Тест смайла &nbsp;
//         </div>
//         <img src="../wwwroot/images/Smiles/forBbCode/think.gif">
//       </td>
//     </tr>
//   </tbody>
// </table>
import React, {PropTypes} from 'react';

class Think extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }
  render() {
    const { children } = this.props;
    return (
      <div className = "bbCode-think">
        <span className = "bbCode-think-content">
          {children}
        </span>
        <div className = "bbCode-think-image"/>
      </div>
    );
  }
}

export default Think;

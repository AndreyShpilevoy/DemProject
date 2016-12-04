import React, {PropTypes} from 'react';
import {Container, Row, Column} from 'DemUi';
import Header from 'Organisms/Header';
import Footer from 'Organisms/Footer';
import NotificationCreator from 'containers/NotificationCreator';
import Title from 'containers/Title';
import styles from './index.scss';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render(){
    return (
      <div className={styles.pageContentWrapper}>
        <Title/>
        <Header/>
          <Container className={styles.pageContent}>
            <Row>
              <Column xs={12}>
                {this.props.children}
              </Column>
            </Row>
          </Container>
        <Footer/>
        <NotificationCreator/>
      </div>
    );
  }
}

export default Layout;

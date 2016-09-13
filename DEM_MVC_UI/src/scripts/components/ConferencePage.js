import React, {PropTypes} from 'react';

class ConferencePage extends React.Component {
	static propTypes = {
		chapters: PropTypes.array.isRequired
	};

  render() {
    return (
      <div className="pageContent">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <span>Chapters count = {this.props.chapters.length}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConferencePage;

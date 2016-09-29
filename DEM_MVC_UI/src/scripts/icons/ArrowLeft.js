import React, {PropTypes} from 'react';

class ArrowLeft extends React.Component {
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    viewBox:PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string,
    color: PropTypes.string
  };

  static defaultProps = {
    height: 32,
    width: 32,
    viewBox: `0 0 ${32} ${32}`,
    className: "icon-arrow-left",
    title: "Arrow Left",
    color: "#ffffff"
  };

  render(){
    let {color, height, width, viewBox, id, className, title} = this.props;
    return (
      <svg id={id} className={className} xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox} aria-labelledby="title">
        <title>{title}</title>
        <path className={className+"-path"} fill={color} d="M 22,2 8,16 22,30 z" />
      </svg>
    );
  }
}

export default ArrowLeft;

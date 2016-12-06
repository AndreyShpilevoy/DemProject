import React, {PropTypes} from 'react';

class Icon_RightAngle extends React.Component {
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
    className: 'icon-right-angle',
    title: 'Right Angle',
    color: '#ffffff'
  };
  render(){
    let {color, height, width, viewBox, id, className, title} = this.props;
    return (
      <svg id={id} className={className} xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox={viewBox} aria-labelledby='title'>
        <title>{title}</title>
        <path className={className.split(' ')[0]+'-path'} fill={color} d='M 0,30 30,30 30,28 2,28 2,0 0,0 z' />
      </svg>
    );
  }
}

export default Icon_RightAngle;

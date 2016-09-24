import React, {PropTypes} from 'react';

const RightAngle = ({color, height, width, viewBox, id, className, title}) => {
  return (
    <svg id={id} className={className} xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox} aria-labelledby="title">
      <title>{title}</title>
      <path className={className+"-path"} fill={color} d="M 0,30 30,30 30,28 2,28 2,0 0,0 z" />
    </svg>
  );
};

let defaultHeight = 32;
let defaultWidth = 32;

RightAngle.defaultProps = {
  height: defaultHeight,
  width: defaultWidth,
  viewBox: `0 0 ${defaultHeight} ${defaultWidth}`,
  className: "icon-right-angle",
  title: "Right Angle",
  color: "#ffffff"
};

RightAngle.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  viewBox:PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string
};

export default RightAngle;

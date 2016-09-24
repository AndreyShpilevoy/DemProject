import React, {PropTypes} from 'react';

const ArrowLeft = ({color, height, width, viewBox, id, className, title}) => {
  return (
    <svg id={id} className={className} xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox} aria-labelledby="title">
      <title>{title}</title>
      <path className={className+"-path"} fill={color} d="M 22,2 8,16 22,30 z" />
    </svg>
  );
};

let defaultHeight = 32;
let defaultWidth = 32;

ArrowLeft.defaultProps = {
  height: defaultHeight,
  width: defaultWidth,
  viewBox: `0 0 ${defaultHeight} ${defaultWidth}`,
  className: "icon-arrow-left",
  title: "Arrow Left",
  color: "#ffffff"
};

ArrowLeft.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  viewBox:PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string
};

export default ArrowLeft;

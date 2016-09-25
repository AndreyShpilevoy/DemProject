import React, {PropTypes} from 'react';

const Vk = ({color, colorBg, height, width, viewBox, id, className, title}) => {
  return (
    <svg id={id} className={className} xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox} aria-labelledby="title">
      <title>{title}</title>
        <g  transform="translate(-1, -1) scale(0.03333, 0.03333)">
            <path className={className+"-path-bacground"} fill={colorBg} d="M 179.92864,32.000013 L 844.07135,32.000013 C 925.76732,32.000013 991.99999,98.230361 991.99999,179.92865 L 991.99999,844.07135 C 991.99999,925.76732 925.76732,991.99998 844.07135,991.99998 L 179.92864,991.99998 C 98.230355,991.99998 32.000006,925.76732 32.000006,844.07135 L 32.000006,179.92865 C 32.000006,98.230361 98.230355,32.000013 179.92864,32.000013"/>
            <path className={className+"-path-image"} fill={color} d="M 503.94561,704.02937 L 543.21464,704.02937 C 543.21464,704.02937 555.07355,702.72226 561.13718,696.19824 C 566.71036,690.20169 566.53222,678.94892 566.53222,678.94892 C 566.53222,678.94892 565.76414,626.25707 590.21533,618.49765 C 614.32875,610.84928 645.28544,669.422 678.09524,691.94606 C 702.90734,708.98485 721.76221,705.25552 721.76221,705.25552 L 809.501,704.02937 C 809.501,704.02937 855.39584,701.19767 833.63292,665.11199 C 831.85154,662.16461 820.95504,638.41904 768.39506,589.63234 C 713.37584,538.56917 720.75122,546.83061 787.0209,458.5042 C 827.37958,404.71345 843.51149,371.87589 838.47041,357.81224 C 833.66762,344.41255 803.98103,347.95218 803.98103,347.95218 L 705.19537,348.56294 C 705.19537,348.56294 697.86626,347.56583 692.43883,350.81395 C 687.12938,353.99036 683.72163,361.41201 683.72163,361.41201 C 683.72163,361.41201 668.08018,403.03386 647.23571,438.43707 C 603.24717,513.13013 585.65546,517.08387 578.46516,512.4384 C 561.73637,501.6275 565.91683,469.01666 565.91683,445.84252 C 565.91683,373.45368 576.89662,343.272 544.53564,335.45938 C 533.79877,332.86828 525.88898,331.15399 498.42564,330.87406 C 463.17512,330.51547 433.3474,330.98279 416.45436,339.25811 C 405.21547,344.76189 396.54454,357.02334 401.82853,357.72895 C 408.35949,358.59882 423.14264,361.71971 430.98071,372.38486 C 441.10682,386.16164 440.75286,417.08826 440.75286,417.08826 C 440.75286,417.08826 446.57126,502.30072 427.16809,512.88259 C 413.85401,520.14229 395.58676,505.32213 356.36862,437.55563 C 336.27835,402.84415 321.10422,364.47044 321.10422,364.47044 C 321.10422,364.47044 318.18229,357.30096 312.96308,353.46289 C 306.6334,348.81279 297.78896,347.33911 297.78896,347.33911 L 203.91254,347.95218 C 203.91254,347.95218 189.8234,348.34547 184.64583,354.47388 C 180.03969,359.92907 184.27802,371.19804 184.27802,371.19804 C 184.27802,371.19804 257.76808,543.14061 340.9886,629.78975 C 417.30341,709.24396 503.94561,704.02937 503.94561,704.02937"/>
        </g>
    </svg>
  );
};

let defaultHeight = 32;
let defaultWidth = 32;

Vk.defaultProps = {
  height: defaultHeight,
  width: defaultWidth,
  viewBox: `0 0 ${defaultHeight} ${defaultWidth}`,
  className: "icon-vk",
  title: "VK",
  color: "#ffffff",
  colorBg: "#000000"
};

Vk.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  viewBox:PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
  colorBg: PropTypes.string
};

export default Vk;

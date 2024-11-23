import React, { useState, useEffect, useRef } from 'react';
import ReactCurvedText from 'react-curved-text';

const CircularText = ({ text }) => {
  const [dimensions, setDimensions] = useState({ width: 150, height: 40 });
  const textRef = useRef(null);
  useEffect(() => {
    if (textRef.current) {
      const { offsetWidth } = textRef.current;
      const radius = offsetWidth / (2 * Math.PI);
      const height = radius + 30; // Add some padding for height
      setDimensions({ width: offsetWidth + 40, height: height + 30 });
    }
  }, [text]);


  const getCurvedTextProps = (text) => {
    if (text.length < 8) {
      return {
        cx: dimensions.width / 6 + 50,
        cy: dimensions.height / 2 + 38,
        rx: (dimensions.width / 2) * 2 - 115,
        ry: (dimensions.height / 2) * 3 - 30,
      };
    } else if(text.length>10){
      return {
        cx: dimensions.width / 6 + 50,
        cy: dimensions.height / 2 + 60,
        rx: dimensions.width / 2+2,
        ry: (dimensions.height / 2) * 3 +5,
      };
    }
     else if (text.length >=8 ||text.length=== 9) {
      return {
        cx: dimensions.width / 6 + 50,
        cy: dimensions.height / 2 + 50,
        rx: dimensions.width / 2 - 20,
        ry: (dimensions.height / 2) * 3 - 15,
      };
    }
  };

  const curvedTextProps = getCurvedTextProps(text);

  // const truncatedText = text.substring(0, 10);
  return (

    // cx={dimensions.width / 6+45}
    //       cy={dimensions.height / 2+56}
    //       rx={dimensions.width/2}
    //       ry={dimensions.height / 2*3-5}


    // cx={dimensions.width / 6+50}
    //   cy={dimensions.height / 2+50}
    //       rx={dimensions.width/2-20}
    //       ry={dimensions.height / 2*3-15}


    <ReactCurvedText
      width={dimensions.width}
      height={dimensions.height}
      cx={curvedTextProps.cx}
      cy={curvedTextProps.cy}
      rx={curvedTextProps.rx}
      ry={curvedTextProps.ry}
      startOffset={20}
      reversed={true}
      text={text}
      textProps={{ style: { fill: '#7C217F' } }}
      textPathProps={null}
      tspanProps={null}
      ellipseProps={null}
      svgProps={{ className: 'span' }} // Ensure SVG content is visible
    />
  );
};

export default CircularText;

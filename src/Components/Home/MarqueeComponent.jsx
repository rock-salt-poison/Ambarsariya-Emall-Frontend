import React from "react";
import Marquee from "react-fast-marquee";

export default function MarqueeComponent({ text = [], speed = 50 }) {
  return (
    <Marquee speed={speed} direction="left" className="marquee">
      {Array.isArray(text) ? (
        text.map((item, index) => {
          // Handle both string and object cases
          const message = typeof item === "object" && item.message ? item.message : item;
          return (
            <span key={index} className="marquee__message">
              {message}
            </span>
          );
        })
      ) : (
        <span className="marquee__message">{text}</span>
      )}
    </Marquee>
  );
}

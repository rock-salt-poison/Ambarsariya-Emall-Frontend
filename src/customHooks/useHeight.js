import { useState, useEffect, useRef } from 'react';

const useHeight = () => {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, []);

  return [ref, height];
};

export default useHeight;

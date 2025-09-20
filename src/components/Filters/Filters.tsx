import { useEffect, useState } from "react";

type Props = {
  minLimit: number;                 
  maxLimit: number;                
  onApply: (min: number, max: number) => void;
};

export default function PriceFilter({ minLimit, maxLimit, onApply }: Props) {
  const [minVal, setMinVal] = useState(minLimit);
  const [maxVal, setMaxVal] = useState(maxLimit);

  useEffect(() => {
    setMinVal(minLimit);
    setMaxVal(maxLimit);
  }, [minLimit, maxLimit]);

  return (
    <div className="card">
      <strong>Price filter</strong>
      <div>
        <input
          type="number"
          value={minVal}
          min={minLimit}
          max={maxVal}
          onChange={(e) => setMinVal(Number(e.target.value))}
          placeholder={`Min ${minLimit}`}
        />
        <input
          type="number"
          value={maxVal}
          min={minVal}
          max={maxLimit}
          onChange={(e) => setMaxVal(Number(e.target.value))}
          placeholder={`Max ${maxLimit}`}
        />
        <button onClick={() => onApply(minVal, maxVal)}>
          Apply
        </button>
      </div>
    </div>
  );
}

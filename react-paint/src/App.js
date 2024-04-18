import React, { useState, useRef, useEffect } from 'react';

const ColorPicker = ({ value, onChange }) => {
  return (
    <input
      type="color"
      value={value}
      onChange={onChange}
    />
  );
};

const Slider = ({ value, onChange }) => {
  return (
    <input
      type="range"
      min="1"
      max="15"
      value={value}
      onChange={onChange}
    />
  );
};

const Clear = ({ onClick }) => {
  return (
    <button className='p-2 border-2 border-black rounded-md' onClick={onClick}>
      Clear
    </button>
  );
};

const Erase = ( { onClick, isErase } ) => {
  return (
    <div>
      {isErase ? (
      <button className='p-2 bg-red-400 rounded-md' onClick={onClick}>
        Erase
      </button>) : (
      <button className='p-2 bg-green-400 rounded-md' onClick={onClick}>
        Draw
      </button>
      )}
      
    </div>
  );
};

const Canvas = ({ drawing, color, lineWidth, onMouseDown, onMouseUp }) => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    setCtx(context);
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
  }, [color, lineWidth]);

  const handleMouseDown = (event) => {
    onMouseDown(event);
    const { offsetX, offsetY } = event.nativeEvent;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  };

  const handleMouseMove = (event) => {
    if (!drawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const handleMouseUp = (event) => {
    onMouseUp(event);
    ctx.closePath();
  };

  return (
    <canvas
      className='w-1/2 h-3/5 rounded-xl border-4'
      ref={canvasRef}
      width="800"
      height="600"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ border: '1px solid black' }}
    />
  );
};

export const App = () => {
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(3);
  const [isErase, setErase] = useState(false);

  const handleMouseDown = () => {
    setDrawing(true);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const handleClear = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleLineWidthChange = (e) => {
    setLineWidth(e.target.value);
  };

  const handleErase = () => {
    if (isErase) {
      setColor('#FFFFFF');
    } else {
      setColor('#000000');
    }
    setErase(!isErase);
  };

  return (
    <div className='flex flex-col items-center mt-4'>
      <p className='text-lg font-semibold p-2'>Welcome to your canvas!</p>
      <div className='flex flex-row p-4 w-1/4 justify-between align-center'>
        <ColorPicker value={color} onChange={handleColorChange} />
        <Slider value={lineWidth} onChange={handleLineWidthChange} />
        <Clear onClick={handleClear} />
        <Erase onClick={handleErase} isErase={isErase} />
      </div>
      <Canvas
        drawing={drawing}
        color={color}
        lineWidth={lineWidth}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
}
export default App;
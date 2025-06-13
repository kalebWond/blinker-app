import React from 'react'

function Filter() {
  return (
    <div className="filter">
            <h5 className="filter__header">
              Price range: <p className="filter__value">
                <span id="min-value" className="filter__value--min">$0</span>
                <span> to </span>
                <span id="max-value" className="filter__value--max">$100,000</span></p>
            </h5>
            <div className="slider-container">
              <div id="slider-track" className="slider-track"></div>
              <div className="slider-range" id="slider-range"></div>
          
              <input onChange={() => null} type="range" id="min-range" min="0" max="100000" step="1000" value="0" />
              <input onChange={() => null} type="range" id="max-range" min="0" max="100000" step="1000" value="100000" />
              
              <div className="slider__marks-text slider__marks-text--min">$0</div>
              <div className="slider__marks-text slider__marks-text--max">$100,000</div>
            </div>
          </div> 
  )
}

export default Filter
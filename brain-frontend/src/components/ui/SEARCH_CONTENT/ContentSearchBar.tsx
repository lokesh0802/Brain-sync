import React from 'react';
import styled from 'styled-components';

interface ContentSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const ContentSearchBar: React.FC<ContentSearchBarProps> = ({ value, onChange }) => {
  return (
    <StyledWrapper>
      <div className="group">
        <input
          required
          type="text"
          className="input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="highlight" />
        <span className="bar" />
        <label>Enter Data to Search </label>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .group {
   position: relative;
  }

  .input {
   font-size: 16px;
   padding: 10px 10px 10px 5px;
   display: block;
   width: 200px;
   border: none;
   border-bottom: 1px solid #515151;
   background: transparent;
  }

  .input:focus {
   outline: none;
  }

  label {
   color: #999;
   font-size: 18px;
   font-weight: normal;
   position: absolute;
   pointer-events: none;
   left: 5px;
   top: 10px;
   transition: 0.2s ease all;
   -moz-transition: 0.2s ease all;
   -webkit-transition: 0.2s ease all;
  }

  .input:focus ~ label, .input:valid ~ label {
   top: -20px;
   font-size: 14px;
   color: purple;
  }

  .bar {
   position: relative;
   display: block;
   width: 200px;
  }

  .bar:before, .bar:after {
   content: '';
   height: 2px;
   width: 0;
   bottom: 1px;
   position: absolute;
   background: #5264AE;
   transition: 0.2s ease all;
   -moz-transition: 0.2s ease all;
   -webkit-transition: 0.2s ease all;
  }

  .bar:before {
   left: 50%;
   
  }

  .bar:after {
   right: 50%;
  }

  .input:focus ~ .bar:before, .input:focus ~ .bar:after {
   width: 50%;
  }

  .highlight {
   position: absolute;
   height: 60%;
   width: 100px;
   top: 25%;
   left: 0;
   pointer-events: none;
   opacity: 0.5;
  }

  .input:focus ~ .highlight {
   animation: inputHighlighter 0.3s ease;
  }

  @keyframes inputHighlighter {
   from {
    background: #5264AE;
   }

   to {
    width: 0;
    background: transparent;
   }
  }`;




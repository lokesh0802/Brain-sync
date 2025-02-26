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
    padding: 12px 12px 12px 5px;
    display: block;
    width: 100%;
    min-width: 200px;
    border: none;
    border-bottom: 2px solid #e5e7eb;
    background: transparent;
    transition: all 0.3s ease;
    color: #374151;
  }

  .input:focus {
    outline: none;
    border-image: linear-gradient(to right, #6366f1, #a855f7);
    border-image-slice: 1;
  }

  label {
    color: #9ca3af;
    font-size: 16px;
    font-weight: 500;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 12px;
    transition: 0.2s ease all;
  }

  .input:focus ~ label, .input:valid ~ label {
    top: -20px;
    font-size: 14px;
    background: linear-gradient(to right, #6366f1, #a855f7);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: 600;
  }

  .bar {
    position: relative;
    display: block;
    width: 100%;
  }

  .bar:before, .bar:after {
    content: '';
    height: 2px;
    width: 0;
    bottom: 0;
    position: absolute;
    background: linear-gradient(to right, #6366f1, #a855f7);
    transition: 0.2s ease all;
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
    width: 50%;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0;
  }

  .input:focus ~ .highlight {
    animation: inputHighlighter 0.3s ease;
  }

  @media (max-width: 640px) {
    .input {
      font-size: 14px;
    }
    
    label {
      font-size: 14px;
    }
    
    .input:focus ~ label, .input:valid ~ label {
      font-size: 12px;
    }
  }

  @keyframes inputHighlighter {
    from {
      background: linear-gradient(to right, #6366f1, #a855f7);
    }
    to {
      width: 0;
      background: transparent;
    }
  }
`;

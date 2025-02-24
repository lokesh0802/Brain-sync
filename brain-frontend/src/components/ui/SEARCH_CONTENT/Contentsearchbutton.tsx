import React from 'react';
import styled from 'styled-components';

export const ContentSearchButton = () => {
  return (
    <StyledWrapper>
      <button className="cta">
        <span>Search</span>
        <svg width="20px" height="10px" viewBox="0 0 13 10">
          <path d="M1,5 L11,5" />
          <polyline points="8 1 12 5 8 9" />
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .cta {
    position: relative;
    margin: auto;
    padding: 12px 18px;
    transition: all 0.2s ease;
    border: none;
    background: none;
    cursor: pointer;
    display: flex; /* Ensure text and icon are aligned horizontally */
    align-items: center; /* Center vertically */
    gap: 8px; /* Add spacing between text and arrow */
  }

  .cta:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    border-radius: 50px;
    background: #DDA0DD;
    width: 45px;
    height: 45px;
    transition: all 0.3s ease;
  }

  .cta span {
    position: relative;
    font-family: "Ubuntu", sans-serif;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: #234567;
  }

  .cta svg {
    margin-left: 5px;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: #234567;
    stroke-width: 2;
    transition: all 0.3s ease;
  }

  .cta:hover:before {
    width: 100%;
    background: #DDA0DD;
  }

  .cta:hover svg {
    transform: translateX(3px); /* Slight movement effect */
  }

  .cta:active {
    transform: scale(0.95);
  }
`;


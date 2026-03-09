import React from "react";
import styled from "styled-components";

function NumberSelector({ selectedNum, setSelectedNum }) {
  const arrnum = [1, 2, 3, 4, 5, 6];

  const numberSelectorHandler = (value) => {
    setSelectedNum((prev) => (prev === value ? null : value));
  };
  return (
    <NumberSelectorContainer>
      <p className="section-label">Pick a Number</p>
      <div className="grid">
        {arrnum.map((value, i) => (
          <Box
            $isselected={value === selectedNum}
            key={i}
            onClick={() => numberSelectorHandler(value)}
          >
            {value}
          </Box>
        ))}
      </div>
    </NumberSelectorContainer>
  );
}

export default NumberSelector;

const NumberSelectorContainer = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 14px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex: 1;

  .section-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .grid {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .error {
    color: var(--danger);
    font-size: 13px;
    font-weight: 500;
    background: #fee2e2;
    padding: 6px 14px;
    border-radius: 999px;
    border: 1px solid #fca5a5;
  }
`;

const Box = styled.div`
  height: 64px;
  width: 64px;
  border-radius: var(--radius-sm);
  display: grid;
  place-items: center;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid
    ${(p) => (p.$isselected ? "var(--primary)" : "var(--border)")};
  background: ${(p) =>
    p.$isselected
      ? "linear-gradient(135deg, var(--primary), var(--primary-dark))"
      : "var(--surface-3)"};
  color: ${(p) => (p.$isselected ? "#fff" : "var(--text-primary)")};
  box-shadow: ${(p) =>
    p.$isselected ? "0 4px 14px rgba(79,70,229,0.35)" : "none"};
  transform: ${(p) => (p.$isselected ? "scale(1.1)" : "scale(1)")};

  &:hover {
    border-color: var(--primary-light);
    background: ${(p) =>
      p.$isselected
        ? "linear-gradient(135deg, var(--primary), var(--primary-dark))"
        : "#eef2ff"};
    transform: ${(p) => (p.$isselected ? "scale(1.1)" : "scale(1.05)")};
  }
`;

import React from "react";
import styled from "styled-components";

function RoleDice({ diceValue, roleDice }) {
  return (
    <DiceCard>
      <p className="instruction">Click the dice to roll</p>
      <DiceButton onClick={roleDice} title="Roll dice">
        <img
          src={`/images/${diceValue}.png`}
          alt={`Dice showing ${diceValue}`}
        />
      </DiceButton>
      <p className="value-label">
        Current: <strong>{diceValue}</strong>
      </p>
    </DiceCard>
  );
}

export default RoleDice;

const DiceCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 18px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  .instruction {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .value-label {
    font-size: 15px;
    color: var(--text-secondary);

    strong {
      color: var(--primary);
      font-weight: 700;
    }
  }
`;

const DiceButton = styled.button`
  background: var(--surface-3);
  border: 2px dashed var(--border);
  border-radius: var(--radius-lg);
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 180px;
    height: 180px;
    object-fit: contain;
    transition: transform 0.2s ease;
    filter: drop-shadow(0 4px 12px rgba(79, 70, 229, 0.15));
  }

  &:hover {
    border-color: var(--primary-light);
    background: #eef2ff;
    transform: scale(1.04);
  }

  &:active {
    transform: scale(0.96);
  }
`;

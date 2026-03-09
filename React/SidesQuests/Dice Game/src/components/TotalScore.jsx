import styled from "styled-components";
import React from "react";

function TotalScore({ score }) {
  const isNegative = score < 0;
  return (
    <ScoreCard>
      <p className="label">Total Score</p>
      <h1 className={isNegative ? "negative" : score > 0 ? "positive" : ""}>
        {score > 0 ? "+" : ""}
        {score}
      </h1>
      <p className="hint">Keep guessing!</p>
    </ScoreCard>
  );
}

export default TotalScore;

const ScoreCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 16px 32px;
  text-align: center;
  min-width: 180px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .label {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 4px;
  }

  h1 {
    font-size: 56px;
    font-weight: 800;
    line-height: 1;
    color: var(--text-primary);
    transition: color 0.3s ease;

    &.positive {
      color: var(--success);
    }
    &.negative {
      color: var(--danger);
    }
  }

  .hint {
    font-size: 12px;
    color: var(--text-secondary);
    margin-top: 4px;
  }
`;

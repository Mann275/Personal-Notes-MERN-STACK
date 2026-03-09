import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TotalScore from "./TotalScore";
import NumberSelector from "./NumberSelector";
import RoleDice from "./RoleDice";
import { OutlineButton } from "../style/Button";
import Rules from "./Rules";

function GamePlay() {
  const [totalScore, setTotalScore] = useState(0);
  const [selectedNum, setSelectedNum] = useState(null);
  const [diceValue, setDiceValue] = useState(1);
  const [showRules, setShowRules] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const [toastKey, setToastKey] = useState(0);
  const [errorToast, setErrorToast] = useState(false);
  const [errorKey, setErrorKey] = useState(0);

  useEffect(() => {
    if (!lastResult) return;
    const timer = setTimeout(() => setLastResult(null), 2500);
    return () => clearTimeout(timer);
  }, [toastKey]);

  useEffect(() => {
    if (!errorToast) return;
    const timer = setTimeout(() => setErrorToast(false), 2500);
    return () => clearTimeout(timer);
  }, [errorKey]);

  const randaomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const roleDice = () => {
    if (!selectedNum) {
      setErrorToast(true);
      setErrorKey((k) => k + 1);
      return;
    }
    const number = randaomNumber(1, 7);
    setDiceValue(number);

    if (selectedNum === number) {
      setTotalScore((prev) => prev + number);
      setLastResult("win");
    } else {
      setTotalScore((prev) => prev - 2);
      setLastResult("lose");
    }
    setToastKey((k) => k + 1);

    setSelectedNum(null);
  };

  const resetScore = () => {
    setTotalScore(0);
    setLastResult(null);
    setDiceValue(1);
    setSelectedNum(null);
  };

  return (
    <PageWrapper>
      <Header>
        <span className="logo">🎲 Dice Game</span>
        <NavActions>
          <OutlineButton onClick={() => setShowRules(true)}>
            📖 Rules
          </OutlineButton>
          <OutlineButton onClick={resetScore}>Reset</OutlineButton>
        </NavActions>
      </Header>

      <MainContainer>
        <TopGrid>
          <TotalScore score={totalScore} />
          <NumberSelector
            selectedNum={selectedNum}
            setSelectedNum={setSelectedNum}
          />
        </TopGrid>

        <RoleDice diceValue={diceValue} roleDice={roleDice} />

        {showRules && <Rules onClose={() => setShowRules(false)} />}
      </MainContainer>

      {lastResult && (
        <Toast key={toastKey} $result={lastResult}>
          <span className="icon">{lastResult === "win" ? "🎉" : "😬"}</span>
          <span>
            {lastResult === "win"
              ? `Correct! +${diceValue} points`
              : `Wrong guess! −2 points`}
          </span>
        </Toast>
      )}
      {errorToast && (
        <Toast key={`e-${errorKey}`} $result="error">
          <span className="icon">⚠️</span>
          <span>Please select a number first</span>
        </Toast>
      )}
    </PageWrapper>
  );
}

export default GamePlay;

const PageWrapper = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 32px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 10;

  .logo {
    font-size: 17px;
    font-weight: 700;
    color: var(--primary);
    letter-spacing: -0.3px;
  }

  button {
    min-width: 90px;
    padding: 7px 16px;
    font-size: 13px;
  }
`;

const MainContainer = styled.main`
  flex: 1;
  max-width: 860px;
  width: 100%;
  margin: 0 auto;
  padding: 20px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
`;

const TopGrid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 20px;
  flex-wrap: wrap;
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BottomActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
`;

const Toast = styled.div`
  position: fixed;
  bottom: 28px;
  right: 28px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  border-radius: var(--radius);
  font-size: 15px;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 200;
  background: ${(p) =>
    p.$result === "win"
      ? "#ecfdf5"
      : p.$result === "lose"
        ? "#fff1f2"
        : "#fffbeb"};
  color: ${(p) =>
    p.$result === "win"
      ? "#065f46"
      : p.$result === "lose"
        ? "#9f1239"
        : "#92400e"};
  border-left: 4px solid
    ${(p) =>
      p.$result === "win"
        ? "#10b981"
        : p.$result === "lose"
          ? "#f43f5e"
          : "#f59e0b"};
  animation:
    toastIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
    toastOut 0.3s ease 2.2s forwards;

  .icon {
    font-size: 20px;
  }

  @keyframes toastIn {
    from {
      opacity: 0;
      transform: translateX(60px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }

  @keyframes toastOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(60px);
    }
  }
`;

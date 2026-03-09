import React from "react";
import styled from "styled-components";
import { Button } from "../style/Button";

function StartGame({ toggle }) {
  return (
    <Wrapper>
      <Card>
        <ImageSide>
          <ImgGlow>
            <img src="/images/dices.png" alt="Dice" />
          </ImgGlow>
          <Dots />
        </ImageSide>
        <ContentSide>
          <Badge>🎲 Dice Game</Badge>
          <h1>
            Guess the <span>Dice</span>
          </h1>
          <p className="subtitle">
            Pick a number, roll the dice, and test your luck! Score points when
            you guess right.
          </p>
          <div className="stats">
            <div className="stat">
              <span className="val">+6</span>
              <span className="lbl">Max Points</span>
            </div>
            <div className="divider" />
            <div className="stat">
              <span className="val">−2</span>
              <span className="lbl">Wrong Guess</span>
            </div>
            <div className="divider" />
            <div className="stat">
              <span className="val">6</span>
              <span className="lbl">Dice Faces</span>
            </div>
          </div>
          <Button onClick={toggle}>Play Now →</Button>
        </ContentSide>
      </Card>
    </Wrapper>
  );
}

export default StartGame;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const Card = styled.div`
  background: var(--surface);
  border-radius: 28px;
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  gap: 0;
  max-width: 960px;
  width: 100%;
  overflow: hidden;
  border: 1px solid var(--border);

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const ImageSide = styled.div`
  flex: 1;
  background: linear-gradient(145deg, #eef2ff 0%, #e0e7ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 56px 32px;
  position: relative;
  overflow: hidden;
  min-height: 440px;

  img {
    width: 260px;
    max-width: 100%;
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 16px 32px rgba(79, 70, 229, 0.2));
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-12px);
    }
  }
`;

const ImgGlow = styled.div`
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 160px;
    height: 24px;
    background: radial-gradient(
      ellipse,
      rgba(79, 70, 229, 0.2) 0%,
      transparent 70%
    );
    border-radius: 50%;
    animation: shadow 3s ease-in-out infinite;
  }

  @keyframes shadow {
    0%,
    100% {
      transform: translateX(-50%) scaleX(1);
      opacity: 0.8;
    }
    50% {
      transform: translateX(-50%) scaleX(0.7);
      opacity: 0.4;
    }
  }
`;

const Dots = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, #c7d2fe 1px, transparent 1px);
  background-size: 28px 28px;
  opacity: 0.5;
`;

const ContentSide = styled.div`
  flex: 1;
  padding: 56px 48px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h1 {
    font-size: 52px;
    font-weight: 800;
    line-height: 1.1;
    color: var(--text-primary);

    span {
      background: linear-gradient(135deg, var(--primary), var(--primary-light));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  .subtitle {
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.7;
    max-width: 340px;
  }

  .stats {
    display: flex;
    align-items: center;
    gap: 20px;
    background: var(--surface-3);
    border-radius: var(--radius);
    padding: 16px 20px;
    border: 1px solid var(--border);

    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;

      .val {
        font-size: 22px;
        font-weight: 700;
        color: var(--primary);
      }
      .lbl {
        font-size: 11px;
        color: var(--text-secondary);
        font-weight: 500;
        white-space: nowrap;
      }
    }

    .divider {
      width: 1px;
      height: 36px;
      background: var(--border);
    }
  }

  @media (max-width: 700px) {
    padding: 32px 24px;
    h1 {
      font-size: 36px;
    }
  }
`;

const Badge = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, #eef2ff, #e0e7ff);
  color: var(--primary);
  font-size: 13px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid #c7d2fe;
  width: fit-content;
  letter-spacing: 0.3px;
`;

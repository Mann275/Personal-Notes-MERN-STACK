import styled from "styled-components";

const rules = [
  {
    icon: "1️⃣",
    title: "Pick a number",
    desc: "Select any number from 1 to 6 before rolling.",
  },
  {
    icon: "🎲",
    title: "Roll the dice",
    desc: "Click the dice image to get a random result.",
  },
  {
    icon: "✅",
    title: "Correct guess",
    desc: "If your number matches the dice, you earn that many points!",
  },
  {
    icon: "❌",
    title: "Wrong guess",
    desc: "A wrong guess deducts 2 points from your total score.",
  },
];

const Rules = ({ onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>📖 How to Play</h2>
          <CloseBtn onClick={onClose} aria-label="Close">
            ✕
          </CloseBtn>
        </ModalHeader>
        <RulesList>
          {rules.map((rule, i) => (
            <RuleItem key={i}>
              <span className="icon">{rule.icon}</span>
              <div>
                <p className="title">{rule.title}</p>
                <p className="desc">{rule.desc}</p>
              </div>
            </RuleItem>
          ))}
        </RulesList>
      </Modal>
    </Overlay>
  );
};

export default Rules;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 24px;
  animation: fadeOverlay 0.2s ease;

  @keyframes fadeOverlay {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Modal = styled.div`
  background: var(--surface);
  border-radius: var(--radius-lg);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.15);
  padding: 32px 36px;
  width: 100%;
  max-width: 480px;
  animation: popIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);

  @keyframes popIn {
    from {
      opacity: 0;
      transform: scale(0.88) translateY(16px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  h2 {
    font-size: 20px;
    font-weight: 700;
    color: var(--text-primary);
  }
`;

const CloseBtn = styled.button`
  background: var(--surface-3);
  border: 1px solid var(--border);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  font-size: 14px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.15s ease;

  &:hover {
    background: var(--danger);
    color: #fff;
    border-color: var(--danger);
  }
`;

const RulesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RuleItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 14px 18px;
  background: var(--surface-3);
  border-radius: var(--radius);
  border: 1px solid var(--border);

  .icon {
    font-size: 22px;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .title {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 2px;
  }

  .desc {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.5;
  }
`;

import styled from "styled-components";

export const Button = styled.button`
  border-radius: var(--radius);
  padding: 13px 32px;
  color: #ffffff;
  border: none;
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-dark) 100%
  );
  min-width: 200px;
  font-size: 16px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  letter-spacing: 0.3px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(79, 70, 229, 0.45);
    background: linear-gradient(135deg, #6366f1 0%, var(--primary) 100%);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(79, 70, 229, 0.3);
  }
`;

export const OutlineButton = styled(Button)`
  background: var(--surface);
  color: var(--primary);
  border: 2px solid var(--primary);
  box-shadow: var(--shadow-sm);

  &:hover {
    background: var(--surface-3);
    color: var(--primary-dark);
    border-color: var(--primary-dark);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

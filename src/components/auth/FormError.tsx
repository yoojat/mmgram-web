import styled from 'styled-components';

const SFormError = styled.span`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0px 10px 0px;
`;

interface IProps {
  message?: string;
}

function FormError({ message }: IProps) {
  return message === '' || !message ? null : <SFormError>{message}</SFormError>;
}

export default FormError;

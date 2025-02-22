
import styled from 'styled-components';

const Pattern = () => {
  return <StyledWrapper />;
};

const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh; /* Fullscreen height */
  --color: #E1E1E1;
  background-color: #F3F3F3;
  background-image: 
    linear-gradient(0deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%, transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%, transparent),
    linear-gradient(90deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%, transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%, transparent);
  background-size: 50px 50px;
`;

export default Pattern;

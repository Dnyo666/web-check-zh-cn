import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { StyledCard } from 'web-check-live/components/Form/Card';
import Heading, { type HeadingProps } from 'web-check-live/components/Form/Heading';
import colors from 'web-check-live/styles/colors';

const Header = styled(StyledCard)`
  margin: 1rem auto;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  align-items: center;
  width: 95vw;
`;

export const HeaderLinkContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

interface NavProps {
  children?: ReactNode;
}

const Nav = ({ children }: NavProps): JSX.Element => {
  return (
    <Header as="header">
      <Heading color={colors.primary} size="large">
        <>
          <img width="64" src="/web-check.png" alt="Web Check 图标" />
          <a href="/" target="_self">Web Check</a>
        </>
      </Heading>
      {children}
    </Header>
  );
};

export default Nav;

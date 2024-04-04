import { Flex, List } from 'antd';
import PropTypes from 'prop-types';
import { COLOR } from '@autonolas/frontend-library';
import styled from 'styled-components';

const StyledLink = styled.a`
  text-decoration: underline;
  color: ${COLOR.GREY_2};
`;

const PathContent = ({
  path: {
    bond, network, exchange, bridge,
  },
  isEthereumPath,
}) => {
  const steps = [
    <>
      Check if there are
      {' '}
      <StyledLink
        href="https://tokenomics.olas.network/bonding-products"
        target="_blank"
        rel="noopener noreferrer"
      >
        profitable
        {' '}
        {bond.lpTokenName}
        {' '}
        products
      </StyledLink>
      {' '}
      available.
    </>,
    <>
      Get OLAS on
      {' '}
      {network}
      . You can acquire it on
      {' '}
      <StyledLink href={exchange.url} target="_blank" rel="noopener noreferrer">
        {exchange.name}
      </StyledLink>
      {' '}
      directly on
      {' '}
      {network}
      , or
      {' '}
      <StyledLink
        href="https://app.uniswap.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        buy it on Ethereum Uniswap
      </StyledLink>
      {' '}
      and
      {' '}
      <StyledLink href={bridge?.url} target="_blank" rel="noopener noreferrer">
        bridge it with
        {' '}
        {bridge?.name}
      </StyledLink>
      .
    </>,
    <>
      Get
      {' '}
      {bond.lpPairTokenTickerLink ? (
        <StyledLink
          href={bond.lpPairTokenTickerLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {bond.lpPairTokenTicker}
        </StyledLink>
      ) : (
        bond.lpPairTokenTicker
      )}
      {' '}
      on
      {' '}
      {network}
      . You can acquire it on
      {' '}
      {exchange.name}
      {' '}
      directly on
      {' '}
      {network}
      .
    </>,
    <>
      Pool OLAS and
      {' '}
      {bond.lpPairTokenTicker}
      {' '}
      tokens into the
      {' '}
      <StyledLink href={exchange.url} target="_blank" rel="noopener noreferrer">
        {bond.lpTokenName}
        {' '}
        pool on
        {network}
        {' '}
        {exchange.name}
      </StyledLink>
      .
    </>,
    <>
      Await receipt of LP tokens representing your stake in the
      {' '}
      {bond.lpTokenName}
      {' '}
      pool.
    </>,
    <>
      Bridge
      {' '}
      {bond.lpTokenName}
      {' '}
      tokens from
      {' '}
      {network}
      {' '}
      to Ethereum using
      {' '}
      <StyledLink
        href={bond.lpTokenBridge?.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {bond.lpTokenBridge?.name}
      </StyledLink>
      .
    </>,
    <>
      Bond LP tokens using
      {' '}
      <StyledLink
        href="https://tokenomics.olas.network/bonding-products"
        target="_blank"
        rel="noopener noreferrer"
      >
        Olas Tokenomics
      </StyledLink>
      .
    </>,
  ];

  const ethereumSteps = [
    <>
      Check if there are
      {' '}
      <StyledLink
        href="https://tokenomics.olas.network/bonding-products"
        target="_blank"
        rel="noopener noreferrer"
      >
        profitable
        {' '}
        {bond.lpTokenName}
        {' '}
        products
      </StyledLink>
      {' '}
      available.
    </>,
    <>
      Get OLAS on
      {' '}
      {network}
      . You can acquire it on
      {' '}
      <StyledLink href={exchange.url} target="_blank" rel="noopener noreferrer">
        {exchange.name}
      </StyledLink>
      {' '}
      directly on
      {' '}
      {network}
      .
    </>,
    <>
      Get
      {' '}
      {bond.lpPairTokenTicker}
      {' '}
      on
      {' '}
      {network}
      .
    </>,
    <>
      Pool OLAS and
      {' '}
      {bond.lpPairTokenTicker}
      {' '}
      tokens into the
      {' '}
      <StyledLink href={exchange.url} target="_blank" rel="noopener noreferrer">
        {`${bond.lpTokenName} pool on ${network} ${exchange.name}`}
      </StyledLink>
      .
    </>,
    <>
      Await receipt of LP tokens representing your stake in the
      {' '}
      {bond.lpTokenName}
      {' '}
      pool.
    </>,
    <>
      Bond LP tokens using
      {' '}
      <StyledLink
        href="https://tokenomics.olas.network/bonding-products"
        target="_blank"
        rel="noopener noreferrer"
      >
        Olas Tokenomics
      </StyledLink>
      .
    </>,
  ];

  return (
    <List
      size="large"
      bordered
      dataSource={isEthereumPath ? ethereumSteps : steps}
      renderItem={(item, i) => (
        <List.Item>
          <Flex gap={16} align="top">
            <span>
              {i + 1}
              .
            </span>
            <span>{item}</span>
          </Flex>
        </List.Item>
      )}
    />
  );
};

PathContent.propTypes = {
  path: PropTypes.shape({
    bond: PropTypes.shape({
      lpTokenName: PropTypes.string.isRequired,
      lpPairTokenTicker: PropTypes.string.isRequired,
      lpPairTokenTickerLink: PropTypes.string,
      lpTokenBridge: PropTypes.shape({
        url: PropTypes.string,
        name: PropTypes.string,
      }),
    }).isRequired,
    network: PropTypes.string.isRequired,
    exchange: PropTypes.shape({
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    bridge: PropTypes.shape({
      url: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
  isEthereumPath: PropTypes.bool.isRequired,
};

export default PathContent;

import { Typography } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getExplorerBaseUrl, truncateAddress } from 'util/helpers';
import { Copy } from './Copy';

const AddressText = styled(Typography.Text)`
  title: ${(props) => props.title};
`;

const AddressLink = styled.a`
  href: ${(props) => props.href};
  target: _blank;
  rel: noreferrer noopener;
`;

const Address = ({ address, networkId }) => {
  const explorerBaseUrl = getExplorerBaseUrl(networkId);

  const explorerUrl = `${explorerBaseUrl}${address}`;

  return (
    <>
      <AddressText title={address}>
        <AddressLink href={explorerUrl}>
          {truncateAddress(address)}
          {' '}
          ↗
        </AddressLink>
      </AddressText>
    &nbsp;
      <Copy copyText={address} />
    </>
  );
};

Address.propTypes = {
  address: PropTypes.string.isRequired,
  networkId: PropTypes.string,
};

Address.defaultProps = {
  networkId: 'ethereum',
};
export default Address;

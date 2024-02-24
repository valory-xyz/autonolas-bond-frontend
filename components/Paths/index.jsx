import styled from 'styled-components';
import {
  Row, Card, Col, Button, Typography,
} from 'antd';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { COLOR } from '@autonolas/frontend-library';

import pathData from './data.json';

const StyledCard = styled(Card)`
  border-color: ${COLOR.BORDER_GREY};
  width: 100%;
  .ant-card-body {
    padding: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const PathCard = ({ path: { id, name, imagePath } }) => (
  <StyledCard>
    <Image src={imagePath} alt={name} width={200} height={100} />
    <Typography.Title level={4} style={{ marginTop: 10 }}>
      {name}
    </Typography.Title>
    <Button type="primary" href={`/paths/${id}`}>
      View Path
    </Button>
  </StyledCard>
);

PathCard.propTypes = {
  path: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
  }).isRequired,
};

export const Paths = () => (
  <>
    <Typography.Title style={{ marginTop: 16 }} level={2}>Paths</Typography.Title>
    <Row gutter={[24, 24]} className="mb-128">
      {pathData.map((path) => (
        <Col key={path.id} xs={12} md={6}>
          <PathCard key={path.id} path={path} />
        </Col>
      ))}
    </Row>
  </>
);

import {
  Card, Row, Col, Typography, Flex, Button,
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Image from 'next/image';
import { COLOR } from '@autonolas/frontend-library';
import { useState } from 'react';

const StyledCard = styled(Card)`
  border-color: ${COLOR.BORDER_GREY};
  width: 100%;
  margin-bottom: 24 px;
  .ant-card-body {
    padding: 64px;
    flex-direction: column;
    align-items: center;
  }
`;

const ImageContainer = styled.div`
    position: relative!;
    width: 100%;
`;

export const Hero = () => {
  const [heroOpen, setHeroOpen] = useState(true);
  return (
    heroOpen && (
    <StyledCard>
      <div // did not use styled component for this, css failed to apply
        style={{
          position: 'absolute', right: 10, top: 10, cursor: 'pointer',
        }}
      >
        <CloseOutlined
          onClick={() => setHeroOpen(false)}
          style={{ padding: 4 }}
        />
      </div>

      <Row gutter={24}>
        <Col md={12} xs={24}>
          <ImageContainer>
            <Image src="/images/bond.svg" fill />
          </ImageContainer>
        </Col>
        <Col md={12} xs={24}>
          <Flex vertical gap={8} style={{ height: '100%' }}>
            <Typography.Title level={3} style={{ marginTop: 0 }}>Bond now</Typography.Title>
            <Typography.Text>
              Bonders provide tokens to the protocol, and receive discounted OLAS in exchange.
            </Typography.Text>
            <Typography.Text>
              The bonding path is slightly different, depending on the token you deposit.
            </Typography.Text>
            <Flex style={{ justifySelf: 'end' }}>
              <Button type="primary" onClick={() => setHeroOpen(false)}>Got it</Button>
            </Flex>
          </Flex>
        </Col>
      </Row>
    </StyledCard>
    )
  );
};

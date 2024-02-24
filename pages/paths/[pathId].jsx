import {
  Typography, Row, Col, Flex, Button, message,
} from 'antd';
import styled from 'styled-components';
import Markdown from 'markdown-to-jsx';
import { PropTypes } from 'prop-types';
import { promises as fs } from 'fs';
import nodePath from 'path';
import Image from 'next/image';

import pathData from 'components/Paths/data.json';
import StyledMain from 'components/GlobalStyles/StyledMain';
import { CopyOutlined } from '@ant-design/icons';
import Link from 'next/link';

const Upcase = styled(Typography.Text)`
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 0.07em;
`;

export const getServerSideProps = async (context) => {
  const { pathId } = context.params;
  const path = pathData.find((p) => p.id === `${pathId}`);
  const markdownPath = nodePath.join(process.cwd(), 'markdown', `${path.id}.md`);
  const markdown = await fs.readFile(markdownPath, 'utf-8').catch(() => null);

  if (!path || !markdown) return { notFound: true };
  return {
    props: {
      path,
      markdown,
    },
  };
};

const PathDetailPage = ({
  path: {
    name, imagePath, detail, links,
  }, markdown,
}) => (
  <StyledMain>
    <Typography.Title className="mt-0 mb-16" level={1}>
      {name}
    </Typography.Title>
    <Row gutter={[48, 48]}>
      <Col xs={24} lg={12}>
        <Typography.Title className="mt-0 mb-8" level={2}>
          Path
        </Typography.Title>

        <Markdown style={{ lineHeight: '1.4' }}>{markdown}</Markdown>

      </Col>
      <Col xs={24} md={12}>
        <Typography.Title className="mt-0 mb-8" level={2}>
          Links and Details
        </Typography.Title>
        <Flex gap={24} style={{ marginBottom: 24 }} align="center">
          <div style={{ height: 100, width: 300, position: 'relative' }}>
            <Image src={imagePath} alt={name} fill />
          </div>
          <Typography.Text>{detail}</Typography.Text>
        </Flex>
        <Flex gap={16} vertical>
          {links.map((link) => (
            <PathDetailLink key={link.linkHref} link={link} />
          ))}
        </Flex>
        <Button type="primary" href="https://tokenomics.olas.network/bonding-products" style={{ marginTop: 24 }}>View available products</Button>
      </Col>
    </Row>
  </StyledMain>
);

const PathDetailLink = ({
  link: {
    headerText, linkText, linkHref, copyText, linkPrefix,
  },
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(copyText).then(() => message.success(`Copied ${copyText} to clipboard`)).catch(() => message.error('Failed to copy to clipboard'));
  };

  return (
    <Flex gap={4} vertical>
      <Upcase>{headerText}</Upcase>
      <Flex gap={8} align="center">
        {linkPrefix && <Typography.Text>{linkPrefix}</Typography.Text>}
        <Link href={linkHref}>{linkText}</Link>
        {copyText && <Button onClick={handleCopy} size="small"><CopyOutlined /></Button>}
      </Flex>
    </Flex>
  );
};

PathDetailLink.propTypes = {
  link: PropTypes.shape({
    headerText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    linkHref: PropTypes.string.isRequired,
    linkPrefix: PropTypes.string,
    copyText: PropTypes.string,
  }).isRequired,
};

PathDetailPage.propTypes = {
  path: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape(PathDetailLink.propTypes)),
  }).isRequired,
  markdown: PropTypes.string.isRequired,
};

export default PathDetailPage;

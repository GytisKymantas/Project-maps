import { Card, Col } from 'antd';
import styled from 'styled-components';

export const Main = styled(Card)`
  flex: 1;
  margin: 25px;
  .ant-card-body {
    padding: 0;
    overflow: hidden;
  }
`;

export const StyledCol = styled(Col)`
  height: calc(100vh - 107px);
  overflow: hidden;
  overflow-y: auto;
`;

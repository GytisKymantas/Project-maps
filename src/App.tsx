import { Layout } from 'antd';
import { FC } from 'react';
import MainCard from './components/MainCard/MainCard';

const { Content } = Layout;

const App: FC = () => {
  return (
    <Layout>
      <Content>
        <MainCard />
      </Content>
    </Layout>
  );
};

export default App;

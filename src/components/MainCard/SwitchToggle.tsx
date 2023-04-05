import { Space, Switch } from 'antd';
import React from 'react';

interface SwitchProps {
  setIsFavorites: (value: boolean) => void;
}
const SwitchToggle: React.FC<SwitchProps> = ({ setIsFavorites }) => {
  return (
    <>
      <Space align='center'>
        <Switch
          defaultChecked={false}
          onClick={(value: boolean) => setIsFavorites(value)}
        />
        <span>Show only favorites</span>
      </Space>
    </>
  );
};

export default React.memo(SwitchToggle);

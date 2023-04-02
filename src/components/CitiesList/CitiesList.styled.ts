import { Avatar } from "antd";
import styled from "styled-components";

export const CityAvatar = styled(Avatar)<{
  color?:string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};

`;

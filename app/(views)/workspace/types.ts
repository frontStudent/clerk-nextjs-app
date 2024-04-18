export type BoxBaseInfo = {
  top: number;
  left: number;
  width?: number;
  height?: number;
};

export type TextBox = {
  id: string;
  content: string;
  initInfo: BoxBaseInfo;
  lastInfo: BoxBaseInfo;
};

export type ImageBox = {
  id: string;
  src: string;
  initInfo: BoxBaseInfo;
  lastInfo: BoxBaseInfo;
};

export type Box = TextBox | ImageBox;

// 简历模块
export type Section = {
  id: string;
  title: string;
  titleStyle: string;
  childList: Box[];
  width: number;
  height: number;
};

export type SelectedField = Section | Box | {};

export type SectionUpdateProps = {
    id: string;
    newItem: Box;
    op: 'add' | 'update' | 'delete';
}

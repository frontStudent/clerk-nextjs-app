export type DragBox = {
  id: string;
  title: string;
  width?: number;
  height?: number;
};

export type BoxBaseInfo = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type Box = {
  id: string;
  content?: string;
  src?: string;
  initInfo: BoxBaseInfo;
  lastInfo?: BoxBaseInfo;
};

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

export type SectionUpdateHelper = (
  id: string,
  newItem: Box,
  op: "add" | "update" | "delete"
) => void;

export type ResizeHelper = (
  id: string,
  size: { width: number; height: number }
) => void;

export type SectionProps = {
  item: Section;
  updateCard: SectionUpdateHelper;
  onResize: ResizeHelper;
};

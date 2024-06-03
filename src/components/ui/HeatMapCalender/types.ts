export type THeatMapCalender = {
  startDate: Date;
  endDate: Date;
  dateValues: TDateValues | any;
  userId: string;
};

export type TDateValues = {
  date: Date;
  count: number;
};

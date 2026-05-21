export type ApplicationRow = {
  loanId: string;
  customerName: string;
  status: string;
  market: string;
  monthlyRate: number;
  updatedAt: string;
  permissions: {
    canEdit: boolean;
  };
};

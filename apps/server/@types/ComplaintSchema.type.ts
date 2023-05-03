export interface IComplaint {
  userId: string;
  userName: string;
  phone: string;
  complaintAddress: string;
  complaintType: string;
  complaintDes?: string;
  ImageUrl?: string;
  VideoUrl?: string;
  status: Object[];
}

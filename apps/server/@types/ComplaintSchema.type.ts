export interface IComplaint {
  userId: string;
  supervisorId: string,
  userName: string;
  phone: string;
  WSSC_CODE?: string;
  complaintAddress: string;
  complaintType: string;
  complaintDes?: string;
  ImageUrl?: string;
  VideoUrl?: string;
  status: Object[];
  feedback: any;
  response: any;
}

export interface complaintTypes {
  _id: string;
  phone: string;
  complaintType: string;
  complaintAddress: string;
  complaintDes: string;
  garbage: string;
  ImageUrl: string;
  feedback?: any;
  video: string;
  status: any;
  createdAt: string;
}

export {};

declare global {
  interface Window {
    recaptchaVerifier: any; // 👈️ turn off type checking
    confirmationResult: any;
  }
}

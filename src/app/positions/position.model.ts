export interface Position {
  applicants: string[];
  deadline: firebase.default.firestore.Timestamp;
  closed: boolean;
  created: firebase.default.firestore.Timestamp;
  createdBy: string;
  description: string;
  hasDeadline: boolean;
  hasStartDate: boolean;
  id: string;
  interviewMode: string;
  recruiters: string[];
  jobTitle: string;
  jobType: string;
  location: string;
  salaryMax: number;
  salaryMin: number;
  questions: string[];
  requirements: string;
  salaryCurrency: string;
  startDate: firebase.default.firestore.Timestamp;
  team: string;
  published: firebase.default.firestore.Timestamp;
  discloseSalary: boolean;
  recruitingMode: string;
}

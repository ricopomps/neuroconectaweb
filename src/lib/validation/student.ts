export interface Student {
  id: string;
  name: string;
  birthDate: Date;
  institutionId: string;
  createdAt: string;
}

export interface StudentFile {
  id: string;
  studentId: string;
  name: string;
  url: string;
  createdAt: Date;
}

export interface StudentFilesPaginated {
  files: StudentFile[];
  count: number;
}

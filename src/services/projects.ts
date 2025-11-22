import api from "./api";

export interface IProject {
  id: number;
  title: string;
  proposer_name: string;
  email: string;
  field: string;
  expected_start?: string;
  expected_end?: string;
  status: string;
  members?: IProjectMember[];
  attachments?: IProjectAttachment[];
}
export interface IProjectMember {
  id?: number;
  project_id: number;
  name: string;
  role?: string;
  email?: string;
}

export interface IProjectAttachment {
  id?: number;
  project_id: number;
  file_name: string;
  file_url: string;
}

export const submitProject = (formData: FormData) => {
  return api.post("/projects/submit", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

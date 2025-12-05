import { useEffect, useState } from "react";
import { adminGetProjects } from "../services/projects";
import type { IProject } from "../services/projects"

export default function ProjectsList() {
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await adminGetProjects();
      setProjects(res.data.projects);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-10xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Danh sách đề tài</h1>
        <table className="table table-zebra">
            {/* head */}
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Proposer Name</th>
                    <th>Email</th>
                    <th>Field</th>
                    <th>Expected End</th>
                    <th>File</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
            {/* row */}
                {projects.map((p) => (
                    <tr key={p.id}>
                        <td className="font-semibold">{p.id}</td>
                        <td className="font-semibold">{p.title}</td>
                        <td>{p.proposer_name}</td>
                        <td>{p.email}</td>
                        <td>{p.field}</td>
                        <td>{p.expected_end ? new Date(p.expected_end).toLocaleDateString() : "N/A"}</td>
                        <td>
                            {p.attachments?.map((f) => (
                            <a
                                key={f.id}
                                href={f.file_url}
                                className="link link-primary block"
                                target="_blank"
                            >
                                {f.file_name}
                            </a>
                            ))}
                        </td>
                        <td>
                            <span className="badge badge-info">{p.status}</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

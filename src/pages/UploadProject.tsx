import { useState } from "react";
import { uploadProject, type IProjectMember } from "../services/projects";

export default function UploadProject() {
  const [title, setTitle] = useState("");
  const [proposer, setProposer] = useState("");
  const [email, setEmail] = useState("");
  const [field, setField] = useState("");
  const [expectedStart, setExpectedStart] = useState("");
  const [expectedEnd, setExpectedEnd] = useState("");
  const [members, setMembers] = useState([{ name: "", role: "" }]);
  const [files, setFiles] = useState<FileList | null>(null);

  const addMember = () => {
    setMembers([...members, { name: "", role: "Vai trò" }]);
  };

  const updateMember = (
    index: number,
    field: keyof IProjectMember,
    value: string
  ) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
  };

  const removeMember = (index: number) => {
    if (members.length <= 1) return; // giữ ít nhất 1 tv
    setMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("proposer_name", proposer);
    formData.append("email", email);
    formData.append("field", field);
    formData.append("expected_start", expectedStart);
    formData.append("expected_end", expectedEnd);

    members.forEach((m) => {
      formData.append("members[]", m.name);
      formData.append("roles[]", m.role);
    });

    if (files) {
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });
    }

    await uploadProject(formData);
    alert("Gửi đề tài thành công!");
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Nộp đề tài</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" placeholder="Tên đề tài" className="input input-bordered" value={title} onChange={(e) => setTitle(e.target.value)} required />

          <input type="text" placeholder="Người đề xuất" className="input input-bordered" value={proposer} onChange={(e) => setProposer(e.target.value)} required />

          <input type="email" placeholder="Email" className="input input-bordered" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <input type="text" placeholder="Lĩnh vực" className="input input-bordered" value={field} onChange={(e) => setField(e.target.value)} required />

          <div>
              <h2 className="font-semibold mb-2">Thời gian dự kiến</h2>
              <div className="grid grid-cols-2 gap-4">
                  <input type="date" className="input input-bordered" value={expectedStart} onChange={(e) => setExpectedStart(e.target.value)} required />
                  <input type="date" className="input input-bordered" value={expectedEnd} onChange={(e) => setExpectedEnd(e.target.value)} required />
              </div>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Thành viên</h2>
            {members.map((m, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input type="text" className="input input-bordered w-1/2" placeholder="Tên" value={m.name} onChange={(e) => updateMember(i, "name", e.target.value)} required />
                <select value={m.role} onChange={(e) => { updateMember(i, "role", e.target.value)}} className="select select-bordered w-40" required>
                  <option value="Nhóm trưởng">Nhóm trưởng</option>
                  <option value="Thành viên">Thành viên</option>
                </select>
                <button type="button" className="btn btn-sm btn-ghost text-red-600" onClick={() => removeMember(i)} aria-label="Xóa thành viên">✕</button>
              </div>
            ))}

            <button type="button" className="btn btn-outline" onClick={addMember}>+ Thêm thành viên</button>
          </div>

          <input type="file" multiple className="file-input file-input-bordered" onChange={(e) => setFiles(e.target.files)} />

          <button className="btn btn-primary" type="submit">Gửi đề tài</button>
        </form>
      </div>
    </div>
  );
}

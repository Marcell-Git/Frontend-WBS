import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FaLock } from "react-icons/fa";

const UpdatePasswordModal = ({ isOpen, onClose, username, onSave }) => {
  const [passForm, setPassForm] = useState({ password: "", confirmPassword: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPassForm({ password: "", confirmPassword: "" });
      setErrorMsg("");
      setIsSaving(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    
    if (passForm.password.length < 6) {
      setErrorMsg("Password minimal 6 karakter.");
      return;
    }
    if (passForm.password !== passForm.confirmPassword) {
      setErrorMsg("Konfirmasi password tidak cocok.");
      return;
    }

    setIsSaving(true);
    try {
      await onSave(passForm.password);
      toast.success("Password berhasil diperbarui.");
      
      onClose();
    } catch (error) {
      console.error(error);
      setErrorMsg("Gagal memperbarui password. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-900/75 bg-opacity-75 transition-opacity backdrop-blur-sm"
          aria-hidden="true"
          onClick={!isSaving ? onClose : undefined}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                <FaLock className="h-5 w-5 text-indigo-600" aria-hidden="true" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-semibold text-gray-900" id="modal-title">
                  Update Password
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Buat password baru untuk akun <b>{username}</b>. Pastikan password kuat dan aman.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
                    <input
                      type="password"
                      className="w-full rounded-lg border-gray-300 border px-3 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      placeholder="Masukkan password baru"
                      value={passForm.password}
                      onChange={(e) => setPassForm({ ...passForm, password: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
                    <input
                      type="password"
                      className={`w-full rounded-lg border px-3 py-2 text-gray-900 focus:ring-2 outline-none transition-all ${
                        passForm.confirmPassword && passForm.password !== passForm.confirmPassword
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                      }`}
                      placeholder="Konfirmasi password baru"
                      value={passForm.confirmPassword}
                      onChange={(e) => setPassForm({ ...passForm, confirmPassword: e.target.value })}
                      required
                    />
                    {passForm.confirmPassword && passForm.password !== passForm.confirmPassword && (
                      <p className="mt-1 text-xs text-red-600">Password tidak cocok</p>
                    )}
                  </div>

                  {errorMsg && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                      {errorMsg}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
            <button
              type="button"
              className={`w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm ${
                isSaving ? "opacity-70 cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              disabled={isSaving}
            >
              {isSaving ? "Menyimpan..." : "Simpan Password"}
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
              disabled={isSaving}
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordModal;
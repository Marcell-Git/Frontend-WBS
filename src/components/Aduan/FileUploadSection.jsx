import { UploadCloud, X, FileText } from 'lucide-react';

const FileUploadSection = ({
  files,
  onChange,
  onRemove,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
        <UploadCloud className="text-blue-600 w-5 h-5" />
        <h3 className="text-lg font-bold text-gray-800">
          Bukti Dukung
        </h3>
      </div>

      <label
        htmlFor="file"
        className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-blue-400 transition-all"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadCloud className="w-8 h-8 text-gray-400 mb-3" />
          <p className="mb-1 text-sm text-gray-700 font-semibold">
            Klik untuk upload file
          </p>
          <p className="text-xs text-gray-500">
            PDF, JPG, PNG (Max 5MB)
          </p>
        </div>
        <input
          id="file"
          type="file"
          className="hidden"
          accept=".jpg,.jpeg,.png,.pdf"
          multiple
          onChange={(e) =>
            onChange(Array.from(e.target.files))
          }
        />
      </label>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-700 truncate">
                  {file.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onRemove(idx)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadSection;

import { FileText } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const KronologiSection = ({
  value,
  onChange,
  modules,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
        <FileText className="text-blue-600 w-5 h-5" />
        <h3 className="text-lg font-bold text-gray-800">
          Kronologi Kejadian
        </h3>
      </div>

      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder="Ceritakan detail kejadian (Apa, Siapa, Kapan, Dimana, Mengapa, Bagaimana)..."
        className="h-64 mb-12"
      />
    </div>
  );
};

export default KronologiSection;

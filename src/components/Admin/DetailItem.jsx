const DetailItem = ({ icon, label, value, isFullWidth = false }) => (
  <div className={`flex flex-col gap-1 ${isFullWidth ? 'md:col-span-2' : ''}`}>
    <div className="flex items-center gap-2 text-gray-500 mb-1">
      {icon && <span className="text-gray-400">{icon}</span>}
      <span className="text-xs font-semibold uppercase tracking-wider">
        {label}
      </span>
    </div>
    <div className="text-gray-900 font-medium text-base bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
      {value}
    </div>
  </div>
);

export default DetailItem;
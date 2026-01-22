const STATUS_STYLES = {
  'Sedang diverifikasi': {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    ring: 'ring-blue-600/20',
    dot: 'bg-blue-500',
  },
  'Sedang diproses': {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    ring: 'ring-yellow-600/20',
    dot: 'bg-yellow-500',
  },
  'Proses penyidikan': {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    ring: 'ring-purple-600/20',
    dot: 'bg-purple-500',
  },
  'Aduan selesai': {
    bg: 'bg-green-100',
    text: 'text-green-800',
    ring: 'ring-green-600/20',
    dot: 'bg-green-500',
  },
  'Aduan ditolak': {
    bg: 'bg-red-100',
    text: 'text-red-800',
    ring: 'ring-red-600/20',
    dot: 'bg-red-500',
  },
};

const DEFAULT_STYLE = {
  bg: 'bg-gray-100',
  text: 'text-gray-800',
  ring: 'ring-gray-400/20',
  dot: 'bg-gray-400',
};

const StatusBadge = ({ status, className = "" }) => {
  const style = STATUS_STYLES[status] || DEFAULT_STYLE;

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset
      ${style.bg} ${style.text} ${style.ring} ${className}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
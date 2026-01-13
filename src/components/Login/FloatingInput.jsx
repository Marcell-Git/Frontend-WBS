import React, { forwardRef } from 'react';

const FloatingInput = forwardRef(({
  id,
  label,
  type = 'text',
  icon: Icon, // Kita alias-kan 'icon' menjadi 'Icon' agar bisa dirender sebagai komponen
  error,
  className = '',
  containerClassName = '',
  disabled = false,
  ...props
}, ref) => {
  
  const borderColor = error 
    ? 'border-red-500 focus:border-red-500 text-red-900' 
    : 'border-gray-300 focus:border-blue-600 text-gray-900';

  const labelColor = error
    ? 'text-red-500 peer-focus:text-red-500'
    : 'text-gray-500 peer-focus:text-blue-600';

  return (
    <div className={`relative mb-5 ${containerClassName}`}>
      <input
        ref={ref}
        type={type}
        id={id}
        disabled={disabled}
        className={`
          peer block w-full appearance-none rounded-lg border
          bg-transparent px-2.5 pb-2.5 pt-4
          text-sm
          focus:outline-none focus:ring-0
          disabled:cursor-not-allowed disabled:bg-gray-50
          transition-colors duration-200
          ${borderColor}
          ${className}
        `}
        placeholder=" " 
        {...props}
      />

      <label
        htmlFor={id}
        className={`
          absolute start-1 top-2 z-10 origin-[0] 
          -translate-y-4 scale-75 transform 
          bg-white px-2 text-sm duration-300 
          
          /* Flexbox agar Icon dan Teks sejajar rapi */
          inline-flex items-center gap-2 pointer-events-none

          peer-placeholder-shown:top-1/2 
          peer-placeholder-shown:-translate-y-1/2 
          peer-placeholder-shown:scale-100 
          
          peer-focus:top-2 
          peer-focus:-translate-y-4 
          peer-focus:scale-75
          
          peer-disabled:text-gray-400 peer-disabled:bg-transparent

          rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
          
          ${labelColor}
        `}
      >
        {Icon && (
          <Icon className="text-base" /> 
        )}
        <span>{label}</span>
      </label>

      {error && typeof error === 'string' && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
});

FloatingInput.displayName = 'FloatingInput';

export default FloatingInput;
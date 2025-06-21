import { useId } from 'react';
import { forwardRef } from 'react';

const Input = (
  {
    label,
    type = 'text',
    bgColor = 'bg-white',
    borderColor = 'border-gray-300',
    className = '',
    variant = 'outlined',
    ...props
  },
  ref
) => {
  const id = useId();

  
  const variantStyles = {
    outlined: `border ${borderColor} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`,
    filled: `bg-gray-100 border-none focus:ring-2 focus:ring-blue-500`,
    minimal: `border-b-2 ${borderColor} bg-transparent focus:border-blue-500`,
  };
  return (
    <div className="flex flex-col w-full max-w-md">
      {label && (
        <label
          htmlFor={id}
          className="mb-1 text-sm font-medium text-amber-100"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref}
        
        className={`
          w-full p-3 rounded-md text-base
          ${bgColor}
          ${variantStyles[variant]}
          ${className}
        `}
        {...props}
      />
      
    </div>
  );
};

export default forwardRef(Input);
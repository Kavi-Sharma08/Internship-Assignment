const Button = ({
    children,
    type = 'button',
    textColor = 'text-black',
    bgColor = 'bg-purple-400',
    className = '',
    ...props
}) => {
    
  return (
    <button className={`px-4 py-2 my-4 rounded-lg ${textColor} ${bgColor} ${className} {${props}}`}>{children}</button>
  )
}

export default Button
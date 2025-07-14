const SelectInputBox = (props) => {
    const { onKeyDown, divstyle, inputstyle, id, label = '', value, onChange, children, disabled = false, required } = props
    return (
        <>
            <div
                className="mb-1"
                style={divstyle}
            >
                {label === '' ? '' :
                    <label
                        htmlFor={id}
                        className="mb-1 block text-sm font-medium text-gray-900"
                    >{label}
                        {required && <span className='text-red-500'>*</span>}
                    </label>
                }
                <select
                    id={id}
                    className="block h-[34px] w-full rounded-lg border border-gray-300 disabled:bg-[#F5F5F5] px-2.5 py-1.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 focus:outline-none 2xl:h-[42px] 2xl:py-2.5 2xl:px-2.5"
                    style={inputstyle}
                    onKeyDown={onKeyDown}
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                    title={required ? 'Please select an item in the list.' : ''}
                    autoComplete="off"
                    {...props}
                >
                    {children}
                </select>
            </div>
        </>
    )
}


export default SelectInputBox
const InputBox = (props) => {

    let { label = '', required = false, id, type = 'text', placeholder, onChange, onKeyDown, value, disabled = false, format = false,showAmt="" } = props;

    return (
        <>
            <div className="mb-2 position-relative">
                {
                    label !== '' &&

                    <label
                        className="mb-1 block text-sm font-medium text-gray-900">
                        {label} {required && <span className='text-red-500'>*</span>}
                    </label>
                }
                {showAmt && <span className='text-red-500 position-absolute right-0 top-0' >Amt : {showAmt||0}</span>}
                <input
                    id={id}
                    type={type}
                    disabled={disabled}
                    placeholder={placeholder}
                    className="block w-full rounded-lg border border-[E2E2E2] p-2.5 text-sm text-gray-900 focus:ring-green-500 focus:border-green-500 focus:outline-none disabled:bg-[#F5F5F5]"
                    onKeyDown={onKeyDown}
                    value={value}
                    onChange={onChange}
                />
                {
                    format &&
                    <>
                        <span className='text-red-500'>format</span> (12:00)
                    </>
                }
            </div>
        </>

    )
}

export default InputBox

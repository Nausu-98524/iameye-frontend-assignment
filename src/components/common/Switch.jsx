const Switch = (props) => {

    const { id, checked = false, onKeyDown, label, onClick, onChange, disabled } = props;

    return (
        <>
            <div className="mb-2 flex items-end pb-3">
                <label className="me-5 inline-flex cursor-pointer items-center">
                    <input
                        type="checkbox"
                        id={id}
                        checked={checked}
                        disabled={disabled}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        onClick={onClick}
                        value=""
                        class="sr-only peer"
                    />
                    <div className="relative w-10 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4.5px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4  after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    <span className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label ? label : ''}</span>
                </label>
            </div>

        </>
    )
}

export default Switch
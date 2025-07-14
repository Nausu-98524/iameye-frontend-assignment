import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DateBox = (props) => {
    const { divclassname = "",
        label = '',
        disabled = false,
        onKeyDown,
        selected, placeholder, id, onFocus, onChange, required, inputclassname, divstyle, InfoDetails, preventOpenOnFocus = true } = props;
    return (
        <div className={`mb-1 ${divclassname}`} style={divstyle}>
            <div>
                {label === '' ? '' :
                    <label
                        className="mb-1 block text-sm font-medium text-gray-900"
                        title={label}>{label}
                        {required && <span className='text-red-500'>*</span>}
                    </label>
                }
                <DatePicker
                    id={id}
                    className="block w-full rounded-lg border border-[E2E2E2] disabled:bg-[#F5F5F5] p-2.5 text-sm text-gray-900 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                    dateFormat="dd-MMM-yyyy"
                    placeholderText={placeholder}
                    selected={selected}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown}
                    disabled={disabled}
                    // inputrefs={inputrefs.current[id]}
                    //isClearable={true}
                    //selectsRange={true}
                    //monthsShown={3 }
                    // onMonthChange={() => { }}
                    showYearDropdown={true}
                    showMonthDropdown={true}
                    //  selectsStart={true }
                    //inline={true }
                    //showIcon={true }
                    //autoFocus={true }
                    //closeOnScroll={true}
                    // showFullMonthYearPicker={true }
                    //  showTwoColumnMonthYearPicker={true }
                    // onDayMouseEnter
                    // focusSelectedMonth={true }
                    //todayButton={true }
                    yearDropdownItemNumber={50}
                    scrollableYearDropdown={true}
                    preventOpenOnFocus={true}
                    onChange={onChange}
                    autoComplete="off"
                    title={required ? 'Please fill this field.' : ''}
                    {...props}
                />
            </div>
        </div>
    )
}


export default DateBox;
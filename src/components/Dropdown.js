import React,{ useState, useEffect, useRef } from 'react';

const Dropdown = ({ options, selected, onSelectedChange }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();
    const renderedOptions = options.map((option) => {
        if(option.value === selected.value) {
            return null;
        }

        return (
            <div 
                className="item" key={option.value}
                onClick={() => onSelectedChange(option)}
            >
                {option.label}
            </div>
        );
    });

    useEffect(() => {
        const onBodyClick = (event) => {
            if(ref.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        }
        document.body.addEventListener('click', onBodyClick, { capture: true });
        return () => { //whenever our components are about to be removed from the DOM, we remove that callback entirely
            document.body.removeEventListener('click', onBodyClick, { capture: true });
        };
    }, []); //ran only once to set event listener

    // console.log(ref.current); //returns ui form

    return (
        <div className="ui form" ref={ref}>
            <div className="field">
                <label className="label">Select a Color</label>
                <div 
                    onClick={() => setOpen(!open)}
                    className={`ui selection dropdown ${open ? 'visible active' : ''} `}
                >
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Dropdown;

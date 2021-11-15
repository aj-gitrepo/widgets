import React, {useState} from 'react';
import Dropdown from './Dropdown';
import Convert from './Convert';

const options = [
    {
        label: 'Afrikaans',
        value: 'af'
    },
    {
        label: 'Arabic',
        value: 'ar'
    },
    {
        label: 'Tamil',
        value: 'ta'
    },
    {
        label: 'Dutch',
        value: 'nl'
    },
    {
        label: 'French',
        value: 'fr'
    },
    {
        label: 'Hindi',
        value: 'hi'
    },
];

const Translate = () => {
    const [language, setLanguage] = useState(options[0]);
    const [text, setText] = useState('');
    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Text</label>
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
            </div>

            <Dropdown 
                label="Select a Language"
                options={options}
                selected={language}
                onSelectedChange={setLanguage}
            />
            <hr />
            <h3 className="ui header">Output</h3>
            <Convert 
                language={language}
                text={text}
            />
        </div>
    )
}

export default Translate;

// https://cloud.google.com/translate/docs/reference/rest/v2/translate
// https://translation.googleapis.com/language/translate/v2

// AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM

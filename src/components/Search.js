import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Search = () => {
    const [term, setTerm] = useState('programming');
    const [results, setResults] = useState([]);
    const [debouncedTerm, setDebouncedTerm] = useState(term);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(term);
        }, 500);

        return () => {
            clearTimeout(timerId); //reseting the timeout
        }
    }, [term]);
    
    useEffect(() => {
        const search = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debouncedTerm,
                },
            });
            setResults(data.query.search);
        };

        if(debouncedTerm) {
            search();
        } 
    }, [debouncedTerm]);
    
    // useEffect(() => {
    //     const search = async () => {
    //         const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
    //             params: {
    //                 action: 'query',
    //                 list: 'search',
    //                 origin: '*',
    //                 format: 'json',
    //                 srsearch: term,
    //             },
    //         });
    //         setResults(data.query.search);
    //     };

    //     if(term && !results.length) {
    //         search(); //when searching for the first time to get instant results
    //     } else {
    //         const timeoutId = setTimeout(() => {
    //             if(term) {
    //                 search();
    //             }
    //         }, 1000);
    
    //         return () => {
    //             clearTimeout(timeoutId);
    //         };
    //     }
    // }, [term, results.length]);

    const renderedResults = results.map((result) => {
        return (
            <div className="item" key={result.pageid}>
                <div className="right floated content">
                    <a 
                        className="ui button"
                        href={`https://en.wikipedia.org?curid=${result.pageid}`}
                        rel="noreferrer"
                        target="_blank"
                    >
                        Go
                    </a>
                </div>
                <div className="content">
                    <div className="header">{result.title}</div>
                </div>
                    <span dangerouslySetInnerHTML={{__html: result.snippet}}></span>
            </div>
        );
    })

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input
                        className="input"
                        type="text"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="ui celled list">
                {renderedResults}
            </div>
        </div>
    );
}

export default Search;
// https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=apple
// query string comes after ?
// dangerouslySetInnerHTML - use only when the info provider is trustable

// warning
// Using target="_blank" without rel="noreferrer" is a security risk
// fixed by adding rel="noreferrer" in a tag

// adding a second useEffect to handle debouncing. 
// In order to resolve the case where a user will clear out 
// the input-form, we need to add a conditional 

// warning
// React Hook useEffect has a missing dependency: 'results.length'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
// fixed by including results.length in [term, results.length]
// but this creates two requests

// introducing debounced term
// refer 1.png

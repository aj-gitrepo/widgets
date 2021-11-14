import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Search = () => {
    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]);

    // console.log(results);

    useEffect(() => {
        const search = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term,
                },
            });
            setResults(data.query.search);
        };

        if(term && !results.length) {
            search(); //when searching for the first time to get instant results
        } else {
            const timeoutId = setTimeout(() => {
                if(term) {
                    search();
                }
            }, 1000);
    
            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [term]);

    // useEffect(() => {
    //     console.log("Initial render or term changed");
    //     return () => {
    //         console.log("CLEAN UP");
    //     }
    // }, [term]);

    const renderedResults = results.map((result) => {
        return (
            <div className="item" key={result.pageid}>
                <div className="right floated content">
                    <a 
                        className="ui button"
                        href={`https://en.wikipedia.org?curid=${result.pageid}`}
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

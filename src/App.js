import React, { useState }  from "react";
import Accordion from "./components/Accordion";
import Dropdown from "./components/Dropdown";
import Search from "./components/Search";
import Translate from "./components/Translate";
import Route from "./components/Route";

const items = [
    {
        title: 'What is React',
        content: 'React is a front end javascript framework'
    },
    {
        title: 'Why use React?',
        content: 'React is a favorite JS library among engineers'
    },
    {
        title: 'How do you use React?',
        content: 'You use React by creating components'
    },
];

const options = [
    {
        label: 'The Color Red',
        value: 'red'
    },
    {
        label: 'The Color Green',
        value: 'green'
    },
    {
        label: 'A Shade of Blue',
        value: 'blue'
    },
];

function App() {

    const showAccordion = () => {
        if (window.location.pathname === '/') {
            return <Accordion items={items} />
        }
    };

    const showSearch = () => {
        if (window.location.pathname === '/search') {
            return <Search />
        }
    };

    const showDropdown = () => {
        if (window.location.pathname === '/dropdown') {
            return (
                <Dropdown 
                    options={options} 
                    label="Select a color" 
                />
            );
        }
    };

    const showTranslate = () => {
        if (window.location.pathname === '/translate') {
            return <Translate />
        }
    };

    return (
        <div>
            {showAccordion()}
            {showDropdown()}
            {showSearch()}
            {showTranslate()}
        </div>
    );
}

export default App;
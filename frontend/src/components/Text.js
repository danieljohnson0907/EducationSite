import React from 'react';

const Text = (props) => {
    return (
        <span
            className={`t-normal ${props.className || ''}`}
            onClick={props.onClick}
            style={{
                color: props.color,
                fontSize: props.size,
                fontWeight: props.fontWeight,
                textAlign: props.align,
                display: 'block',
                margin: 0,
                padding: 0,
                ...props.style
            }}
        >
            {props.text}
        </span>
    );
};

export default Text;
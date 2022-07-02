import React from 'react';

class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={() => { this.handleClick() }}>
                {this.props.value}
            </button>
        );
    }

    // ========================================

    handleClick() {
        console.log("Kliknięto w przycisk ", this);
        this.props.onClick();
    }
}

export { Square };
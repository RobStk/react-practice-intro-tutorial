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
        this.props.onClick();
    }
}

export { Square };
import React, { Component } from 'react'

export default class SinglePost extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>Wo shi {this.props.id}</h1>
            </div>
        )
    }
}

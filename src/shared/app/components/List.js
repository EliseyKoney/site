import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchUsers } from '../modules/users'

class List extends Component {
    static fetchData(store) {
        return store.dispatch(fetchUsers())
    }

    componentDidMount() {
        this.props.fetchUsers()
    }

    render() {
        return (
            <Fragment>
                {
                    this.props.items.map(item => {
                        return (
                            <div key={item.id}>
                                <span>{item.name}</span>
                            </div>
                        )
                    })
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({items: state.users.items})
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUsers}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(List)
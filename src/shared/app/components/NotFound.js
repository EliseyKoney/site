import React from 'react'
import { Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux' // ES6

const NotFound = () => {
    return (
        <Route render={({staticContext}) => {
            if (staticContext) staticContext.status = 404
            return (
                <div>
                    <h1>404 : Not Found</h1>
                </div>
            )
        }} />
    )
}


const mapStateToProps = (state) => ({themeMenu: state.menu.color})
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NotFound)


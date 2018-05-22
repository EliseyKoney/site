import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import homeMenu from './styles/home-menu.scss'


const activeClass = 'active'
const lightTheme = 'light'
const darkTheme = 'dark'


export class MenuButton extends Component {

    constructor(props) {
        super(props)
        this.containerRef = React.createRef()
    }

    onAnimate = (e) => {
        const node = this.containerRef.current
        if (node.classList.contains(activeClass)) {
            return node.classList.remove(activeClass)
        }
        node.classList.add(activeClass)
    }

    render() {
        const active = this.props.active ? activeClass : ''

        let theme
        switch (this.props.theme) {
            case 'light':
                theme = lightTheme
                break
            default:
                theme = darkTheme
        }
        if (this.props.active) theme = darkTheme

        return (
            <div ref={this.containerRef}
                 className={`el-home-menu-btn ${active} ${theme}`}
                 onClick={this.toggleActive}>
                <div className={'top'} />
                <div className={'middle'} />
                <div className={'bottom'} />
            </div>
        )
    }
}

class Menu extends Component {
    state = {
        activeMenu: false,
        themeMenu: undefined
    }

    onActiveMenu = (e) => {
        e.preventDefault()
        this.setState({ activeMenu: !this.state.activeMenu })
    }

    onLink = (themeMenu) => (e) => {
        this.setState({ activeMenu: false, themeMenu })
    }

    render() {
        const activeMenuClass = this.state.activeMenu ? 'hoverall-active' : 'hoverall-close'
        const menuHoverallElement = this.state.activeMenu ? 'show' : 'hidden'

        return (
            <Fragment>


                <div className={'top-menu-tag'} onClick={this.onActiveMenu}
                     style={{ display: this.props.hidden === true ? 'none' : 'block' }}>
                    <MenuButton active={this.state.activeMenu} theme={this.state.themeMenu || this.props.themeMenu} />
                </div>

                {/*  <div className={`el-home-menu-btn ${activeMenuClass} ${lightTheme}`} />  */}
                <div className={`menu-hoverall ${activeMenuClass} ${lightTheme}`} />
                <div className={`menu-hoverall-element ${menuHoverallElement}`}>

                    <div />

                    <div className={`menu-hoverall-item ${activeClass}`}>
                        <Link to="/" onClick={this.onLink('dark')} className='g1'>Accueil</Link>
                        <div className='border-bottom' />
                    </div>
                    <div className='menu-hoverall-item'>
                        <Link to="/biographie" onClick={this.onLink('dark')}
                              className='g2'>Biographie</Link>
                        <div className='border-bottom' />
                    </div>
                    <div className='menu-hoverall-item'>
                        <Link to="/cv" onClick={this.onLink('dark')} className='g3'>
                            Curriculum vitæ
                        </Link>
                        <div className='border-bottom' />
                    </div>
                    <div className='menu-hoverall-item'>
                        <Link to="/multimedia" onClick={this.onLink('light')}
                              className='g4'>Multimedia</Link>
                        <div className='border-bottom' />
                    </div>

                    <div />

                </div>

            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    themeMenu: state.menu.color,
    hidden: state.menu.hidden
})

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

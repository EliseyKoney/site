import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import anime from 'animejs'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setMenuColor } from '../modules/menu'

import animeBG from './styles/anime-bg.scss'
import HomePageStyle from './styles/home-page.scss'
import pages from './styles/pages.scss'


function a1() {
    anime({
        targets: [
            '#anime-bg #img-1',
        ],

        translateX: [
            { value: 20, duration: 2000, delay: 500, elasticity: 100, easing: 'linear' },
            { value: 0, duration: 2000, delay: 500 / 2, elasticity: 100, easing: 'linear' }
        ],
        translateY: [
            { value: 20, duration: 2000, delay: 1000, elasticity: 100, easing: 'linear' },
            { value: 0, duration: 2000, delay: 1000 / 2, elasticity: 100, easing: 'linear' }
        ],
        rotate: {
            value: -360,
            duration: 600000,
            easing: 'linear'
        },
        loop: true
    })


    anime({
        targets: [
            '#anime-bg #img-2',
        ],

        translateX: [
            { value: -20, duration: 4000, delay: 1000, elasticity: 100, easing: 'linear' },
            { value: 0, duration: 4000, delay: 1000 / 2, elasticity: 100, easing: 'linear' }
        ],
        translateY: [
            { value: -20, duration: 4000, delay: 500, elasticity: 100, easing: 'linear' },
            { value: 0, duration: 4000, delay: 500 / 2, elasticity: 100, easing: 'linear' }
        ],
        rotate: {
            value: 360,
            duration: 600000,
            easing: 'linear'
        },
        loop: true
    })


}

class AnimeBG extends Component {

    componentDidMount() {
        a1()
    }

    render() {
        return (
            <Fragment>
                <div id='anime-bg' className='anime-bg'>

                    <img id='img-1' className={'blended ' + 'img'}
                         src={require('../assets/new-album-slider-vector-color.png')} />

                    <img id='img-2' className={'blended ' + 'img'}
                         src={require('../assets/new-album-slider-vector-graphic.png')} />
                </div>
            </Fragment>
        )

    }
}

const HomeContent = () => (
    <div className='home-title'>
        <article className='article'>
            <h1 className='h1'>
                Elisey Koney
            </h1>
            <h2 className='h2'>Developpeur</h2>
            <div className='description'>
                <div>
                    Node js, Web programming
                    <br />
                    Consulting, Development &amp; Technical support
                </div>
                <div>
                    <span> Ruby on Rails web programming</span>
                    <span>Consulting, Development &amp; Technical support</span>
                </div>
            </div>
        </article>
    </div>
)


export class Homepage extends Component {

    componentWillMount() {
        this.props.setMenuColor('dark')
    }

    render() {
        return (
            <div className={`page home`}>
                <Helmet title="Elisey Koney" />
                <AnimeBG />
                <HomeContent />
            </div>
        )
    }
}


const mapStateToProps = (state) => ({ themeMenu: state.menu.color })
const mapDispatchToProps = (dispatch) => bindActionCreators({ setMenuColor }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)



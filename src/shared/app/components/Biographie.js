import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import anime from 'animejs'

import pages from './styles/pages.scss'


function a1() {

    anime({
        targets: [
            '#bio',
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
            '#bio-zone',
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

export class Biographie extends Component {
    componentDidMount() {
        a1()
    }

    render() {
        return (
            <div className={`page biographie`}>
                <Helmet title=" Biographie | Elisey Koney " />
                <img id="bio" src={require('../assets/new-album-slider-vector-graphic.png')} alt="" />
                <div id="bio-zone" className='bio-zone-anim' />
                <div className='bio'>
                    <div className='bio-text'>
                        <h1>
                            Ma biographie
                        </h1>
                        <p>
                            Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut
                            metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.
                            Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus
                            eget condimentum rhoncus.

                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ themeMenu: state.menu.color })
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Biographie)

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import anime from 'animejs'
import { setMenuColor, setVisibility } from '../modules/menu'
import { withRouter } from 'react-router-dom'

import pages from './styles/pages.scss'


function a1() {

    anime({
        targets: [
            '#cv-turn',
        ],

        translateX: [
            { value: 20, duration: 2000, delay: 500, elasticity: 100, easing: 'linear' },
            { value: 0, duration: 2000, delay: 500 / 2, elasticity: 100, easing: 'linear' }
        ],
        translateY: [
            { value: 20, duration: 2000, delay: 1000, elasticity: 100, easing: 'linear' },
            { value: 0, duration: 2000, delay: 1000 / 2, elasticity: 100, easing: 'linear' }
        ],
        rotate:
            [
                { value: -3, duration: 3000, delay: 1000, elasticity: 100, easing: 'linear' },
                { value: 0, duration: 2000, delay: 1000 / 2, elasticity: 100, easing: 'linear' }
            ],

        loop: true
    })


    anime({
        targets: [
            '#cv-bg',
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

export class CV extends Component {

    componentWillMount() {
        // this.props.setMenuColor('light')
    }

    componentDidMount() {
        a1()
    }


    render() {
        return (
            <div className={`page cv`}>
                <Helmet title=" CV | Elisey Koney " />
                <img id="cv-bg" src={require('../assets/new-album-slider-vector-graphic.png')}
                     style={{ float: 'right' }}
                     alt="" />
                <div id="cv-turn" className='cv-turn' />
                <div id="cv-zone" className='cv-zone'>
                    <div className='cv-text'>
                        <h1>
                            Mon CV
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


const mapStateToProps = (state) => ({ menuColor: state.menu.color })
const mapDispatchToProps = (dispatch) => bindActionCreators({ setMenuColor, setVisibility }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CV))



import React, { Component, Fragment, createRef } from 'react'
import ReactDOM from 'react-dom'
import Helmet from 'react-helmet'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route, withRouter, Link } from 'react-router-dom'
import { AnimatedRoute } from 'react-router-transition'
import { List } from 'immutable'
import qs from 'qs'
import AndroidClose from 'react-icons/lib/io/android-close'
import Mason from 'react-mason'
import { setMenuColor, setVisibility } from '../modules/menu'
import pages from './styles/pages.scss'
import textareaResize from './styles/TextareaResize.scss'


class Image extends Component {
    constructor(props) {
        super(props)
        this.state = { imageStatus: 'loading' }
    }

    handleImageLoaded = () => {
        this.setState({ imageStatus: 'loaded' })
    }

    handleImageErrored = () => {
        this.setState({ imageStatus: 'failed to load' })
    }

    render() {
        return (
            <img
                src={this.props.src}
                onLoad={this.props.onLoad || this.handleImageLoaded}
                onError={this.props.onError || this.handleImageErrored}
            />

        )
    }
}


const fakeImages = List([
    { id: 1, image: require('../assets/mason/emile-perron-190221.jpg') },
    { id: 2, image: require('../assets/mason/sabri-tuzcu-182689.jpg') },
    { id: 3, image: require('../assets/mason/steinar-engeland-128831.jpg') },
    { id: 4, image: require('../assets/mason/jacob-miller-329801.jpg') },
    { id: 5, image: require('../assets/mason/igor-ovsyannykov-267679.jpg') },
    { id: 6, image: require('../assets/mason/patryk-sobczak-63404.jpg') },
    { id: 7, image: require('../assets/mason/reza-shayestehpour-152957.jpg') },
    { id: 8, image: require('../assets/mason/volkan-olmez-1352.jpg') },
    { id: 9, image: require('../assets/mason/thomas-kvistholt-191153.jpg') },
    { id: 10, image: require('../assets/mason/alex-knight-192782.jpg') },
    { id: 11, image: require('../assets/mason/luca-bravo-217276.jpg') },
    { id: 12, image: require('../assets/mason/jeff-sheldon-3228.jpg') },
    { id: 13, image: require('../assets/mason/markus-spiske-148030.jpg') },
    { id: 14, image: require('../assets/mason/rawpixel-com-196509.jpg') },
    { id: 15, image: require('../assets/mason/rawpixel-com-267075.jpg') },
    { id: 16, image: require('../assets/mason/sabri-tuzcu-330622.jpg') },
])


class TextareaResize extends Component {

    constructor(props) {
        super(props)
        this.textContainer = createRef()
        this.textareaSize = createRef()
        this.input = createRef()
    }

    state = {
        textarea: {}
    }

    componentDidMount() {
        const { onHeigth } = this.props

        let textContainer = ReactDOM.findDOMNode(this.textContainer.current)
        let textareaSize = ReactDOM.findDOMNode(this.textareaSize.current)
        let input = ReactDOM.findDOMNode(this.input.current)

        const autoSize = () => {
            textareaSize.innerHTML = input.value + '\n'
            console.log(textareaSize.offsetHeight)
            if (textareaSize.offsetHeight < 82) {
                this.setState({ textarea: { height: textareaSize.offsetHeight } })
            }
            onHeigth()
        }
        input.addEventListener('input', autoSize)
    }

    render() {
        const { onHeigth, rStyle, ...props } = this.props
        return (
            <div className='textarea-container' ref={this.textContainer}>
                <textarea {...props} ref={this.input} style={this.state.textarea} />
                <div className='textarea-size' ref={this.textareaSize} />
            </div>
        )
    }

}

class MediaViewer extends Component {

    state = {
        commentZoneNodeStyle: { width: 0, height: 0 },
        closeBtnStyle: {},
        mediaComment: { height: 0 },
    }

    constructor(props) {
        super(props)
        this.imageZone = createRef()
        this.mediaViewer = createRef()
        this.mediaViewerTitle = createRef()
        this.mediaViewerComment = createRef()
        this.closeBtn = createRef()
    }

    initialize = () => {
        const mediaViewerNode = ReactDOM.findDOMNode(this.mediaViewer.current)
        const imageZoneNode = ReactDOM.findDOMNode(this.imageZone.current)

        if (mediaViewerNode) {

            const position = mediaViewerNode.getBoundingClientRect()
            const commentZoneNodeStyle = {
                width: mediaViewerNode.offsetWidth - imageZoneNode.offsetWidth,
                height: mediaViewerNode.offsetHeight,
            }

            this.setState({
                commentZoneNodeStyle: { ...this.state.commentZoneNodeStyle, ...commentZoneNodeStyle },
                closeBtn: { top: position.y, right: position.x - 30 }
            })
        }
    }

    componentDidMount() {
        this.props.hidden(true)
        this.initialize()
        this.onHeigth()
        window.addEventListener('resize', () => {
            this.initialize()
            this.onHeigth()
        })
    }

    componentWillUnmount() {
        this.props.hidden(false)
        window.onresize = undefined
    }

    onHeigth = () => {
        const mediaViewerNode = ReactDOM.findDOMNode(this.mediaViewer.current)
        const mediaViewerTitleNode = ReactDOM.findDOMNode(this.mediaViewerTitle.current)
        const mediaViewerCommentNode = ReactDOM.findDOMNode(this.mediaViewerComment.current)
        if (mediaViewerNode) {
            const result = mediaViewerNode.offsetHeight - (mediaViewerCommentNode.offsetHeight + mediaViewerTitleNode.offsetHeight + 10)
            // console.log(result)
            if (result > 184) {
                this.setState({ mediaComment: { height: result } })
            }
        }
    }

    render() {
        const { onHeigth } = this
        const { location: { pathname, search } } = this.props
        const prefixed = qs.parse(search, { ignoreQueryPrefix: true })
        const img = fakeImages.findLast(i => i.id === parseInt(prefixed.m))
        // console.log(img)

        if (img) {
            return (
                <div className='viewer'>
                    <div className='media'>

                        <div className='viewer-close'
                             style={this.state.closeBtn}
                             ref={this.closeBtn}>
                            <Link to={`/multimedia`}>
                                <AndroidClose color={'#FFF'} size={20} />
                            </Link>
                        </div>

                        <div className='m-cm' ref={this.mediaViewer}>
                            <Image src={img.image} ref={this.imageZone} />
                            <div className='cm'
                                 style={this.state.commentZoneNodeStyle}>

                                <div className='media-title' ref={this.mediaViewerTitle} />
                                <div className='media-comment' style={this.state.mediaComment} />
                                <div className='media-input'>
                                    <TextareaResize ref={this.mediaViewerComment}
                                                    onHeigth={onHeigth}
                                                    placeholder={'Ecriver un commentaire ... '} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return <div />


    }
}


const Galerie = ({ renderScene }) => (
    <div className='help'>

        <Mason>
            {
                fakeImages
                    .map(img => {
                        return (
                            <Link key={img.id} to={`/multimedia/viewer?m=${img.id}`}>
                                <Image onLoad={renderScene} src={img.image} />
                            </Link>
                        )
                    })
                    .toArray()
            }
        </Mason>
    </div>
)


export class Multimedia extends Component {

    state = { e: 1 }

    componentWillMount() {
        this.props.setMenuColor('light')
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ e: this.state.e + 1 })
        }, 100)
    }

    renderScene = () => {
        this.setState({ e: this.state.e + 1 })
    }

    render() {
        const { renderScene } = this
        const { setVisibility } = this.props

        return (

            <div className={'page multimedia'}>

                <Helmet title="Multimedia | Elisey Koney " />

                <h1 className='galerie-title'>Galeries</h1>

                <Galerie renderScene={renderScene} />

                <AnimatedRoute
                    path="/multimedia/viewer"
                    component={(props) => <MediaViewer {...props} hidden={setVisibility} />}
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className="switch-wrapper" />
            </div>
        )
    }
}


const mapStateToProps = (state) => ({ menuColor: state.menu.color })
const mapDispatchToProps = (dispatch) => bindActionCreators({ setMenuColor, setVisibility }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Multimedia))
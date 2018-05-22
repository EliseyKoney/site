import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import { hot } from 'react-hot-loader'
import AnimatedSwitch from './AnimatedSwitch'
import Notfound from './notfound'
import Multimedia from './Multimedia'
import CV from './CV'
import Biographie from './Biographie'
import Homepage from './Home'
import Menu from './Menu'

import AppStyle from './styles/App.scss'


export class App extends Component {

    componentDidMount() {
        setTimeout(() => {
            const root = document.getElementById('root')
            root.style.visibility = 'visible'
        }, 1)
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={'app'}>
                <Helmet
                    htmlAttributes={{ lang: 'fr', amp: undefined }} // amp takes no value
                    titleTemplate="%s | React App"
                    titleAttributes={{ itemprop: 'name', lang: 'en' }}
                    meta={[
                        { name: 'description', content: 'Server side rendering example' },
                        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                    ]}
                />
                <Menu />
                <AnimatedSwitch>
                    <Route exact path='/' component={Homepage} />
                    <Route path="/biographie" component={Biographie} />
                    <Route path="/cv" component={CV} />
                    <Route path="/multimedia" component={Multimedia} />
                    <Route path="/*" component={Notfound} />
                </AnimatedSwitch>
            </div>
        )
    }
}

export default hot(module)(App)
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from '../shared/app/components/App'
import { Provider } from 'react-redux'
import store, { history } from '../shared/app/stores/browserStore'

const root = document.getElementById('root')

function render(component) {
    ReactDOM.hydrate((
        <Provider store={store}>
            <BrowserRouter>
                {component}
            </BrowserRouter>
        </Provider>), root)
}

try {
    render(<App />)
} catch (e) {
    const RedBox = require('redbox-react').default
    render(<RedBox error={e} />)
}

if (module.hot) module.hot.accept()

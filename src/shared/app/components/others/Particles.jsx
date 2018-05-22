import Particles from 'react-particles-js'

const BGAnim = () => {
    const particlesParams = {
        particles: {
            color: {value: '#222'},
            line_linked: {color: '#222'},
        }
    }
    return (
        <div style={{position: 'absolute', width: '100%', height: '100%', overflow: 'hidden'}}>
            <Particles params={particlesParams} />
        </div>
    )
}


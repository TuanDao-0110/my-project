import React from 'react'
import { useSpring, animated } from 'react-spring'

export default function SlideDown(Component) {


    const styles = useSpring({
        loop: true,
        to: [
            { opacity: 1, color: '#ffaaee' },
            { opacity: 0, color: 'rgb(14,26,19)' },
        ],
        from: { opacity: 0, color: 'red' },
    })
    return (
        <div>
            <animated.div style={styles}>


               <Component></Component>
            </animated.div>
        </div>
    )
}

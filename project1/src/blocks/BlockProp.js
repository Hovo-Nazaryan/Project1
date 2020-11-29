import React from 'react'
import './blocks.css'

function BlockProp(props){
    return(
        <div className = 'block'>
            {props.data}
        </div>
    )
}

export default BlockProp
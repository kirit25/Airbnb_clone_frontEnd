import {urlFor} from '../sanity'
const Image = ({ identifier, image}) => {
    return (
        <div className={identifier === "main-image" ?/*otherWise */ "main-image": "image"}>
            <img src= {urlFor(image).auto('format')}/>
        </div>

    )
}

export default Image
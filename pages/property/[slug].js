import { sanityClient } from '../../sanity'
import { isMultiple } from '../../utils'
import Image from '../../component/Image'
import Review from '../../component/Review'
import Map from '../../component/Map'
import Link from 'next/link' 

const Property = ({
    title,
    location,
    propertyType,
    mainImage,
    image,
    pricePerNight,
    beds,
    bedrooms,
    description,
    host,
    reviews
    }) => {

    const reviewAmount = reviews.length

    return(
        <div className = "container">
            <h1><b>{title}</b></h1>
            <p>{reviewAmount} review{isMultiple(reviewamount)}</p>
            <div className = "images-section">
                <image identifier="main-image" image={mainImage}/>
                <div className = "sub-image-section">
                    {image.map(({_key, asset}, image ) => <Image key={_key} identifier="image" image={asset}/>)}
                </div>
            </div>

            <div className = "section">
                <div className = "information">
                    <h2><b>{ propertyType } hosted by {host?.name}</b></h2>
                    <h4>{bedrooms} bedroom{isMultiple(bedrooms)} * {beds} bed</h4>
                    <hr />
                    <h4><b>Enhance Clean</b></h4>
                    <p>This host is commited to Airbnb's 5-step enhance cleaning proces</p>
                    <h4><b>Amenities for everyday living</b></h4>
                    <p>This host has equipped this place for long stay - Kitchen, shampoo, conditioner, hairdryer included.</p>
                    <h4><b>House rules</b></h4>
                    <p>This place is not suitable for pets and does not allowed parties.</p>
                </div>
                <div className = "Price-box">
                    <h2>₹{pricePerNight}</h2>
                    <h4>{reviewAmount} review{isMultiple(reviewAmount)}</h4>
                    <Link href="/"><div className = "button">Change Dates</div></Link>
                </div>
        </div>

        <hr /> 

        <hr>{description}</hr>
        
        <hr/>

        <h2>{reviewAmount} review{isMultiple(reviewAmount)}</h2>
        {reviewAmount > 0 && reviews.map((review) => <Review key = {review.key} review= {review}/>)}
       
        <hr/>

        <h2>location</h2>
        <Map location = {location}></Map>
      
    </div>

  )
}

export const getServerSideProps = async (pageContext) =>{
    const pageSlug = pageContext.query.Slug

    const query = `*[ _type == "property" && slug.current == $pageSlug][0]{
        title,
        location,
        propertyType,
        mainImage,
        image,
        pricePerNight,
        beds,
        bedrooms,
        description,
        host->{
            _id,
            name,
            slug,
            image
        },
        reviews[]{
            ...,
            traveller->{
                _id,
                name,
                slug,
                image
            }
        }
    }`

    const property = await sanityClient.fetch(query, { pageSlug })

    if (!property) {
        return {
            props: null,
            notFound: true,
        }
    } else {
        return {
            props: {
                title: property.title,
                location: property.location,
                propertyType: property.propertyType,
                mainImage: property.mainImage,
                images: property.images,
                pricePerNight: property.pricePerNight,
                beds: property.beds,
                bedrooms: property.bedrooms,
                description: property.description,
                host: property.host,
                reviews: property.reviews
            }
        }
    }
}

export default Property
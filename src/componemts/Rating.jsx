import './Rating.css';

const Rating = () => {
    let styles = {
        ratingContianer: {
            width: 40,
            height: 40,
            background: 'coral',
            borderRadius: '50%',
            padding: 3
        },
        rating: {
            width: '100%',
            height: '100%',
            border: 4,
            borderColor: 'gerren',
            borderStyle: 'solid',
            borderRadius: '50%',
            position: 'relative'
        },
        ratingIndecator: {
            width: 4,
            height: 4,
            background: 'green',
            position: 'absolute',
            top: 0,
            left: '50%',
        }
    }
    return (
        <div className='first-ring'>
            <div className='secound-ring'>    
            </div>
            <div className="third-ring"></div>
        </div>
    )
}

export default Rating;
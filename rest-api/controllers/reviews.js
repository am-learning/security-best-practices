let reviews = [
    {id: 1, content: 'This is a review', postedBy: 'Afshan'},
    {id: 2, content: 'This product is awesome!', postedBy: 'Ash'},
    {id: 3, content: 'This product is terrible!', postedBy: 'Ashley'}
]

exports.getAllReviews = (req, res) => {
    res.json(reviews)
}

exports.getReview = (req,res) =>{
    let id = req.params.id
    let result = reviews.filter(review => id == review.id)

    if (result.length ==1)
        res.json(result[0])
    else
        res.json({message: `No review with id ${id} found`})
}

exports.addReview = (req,res) =>{
    let newReview = {
        id: req.body.id,
        content: req.body.content,
        postedBy: req.body.postedBy
    }
    
    reviews.push(newReview)
    res.json({message: `New review added`, reviews})
}
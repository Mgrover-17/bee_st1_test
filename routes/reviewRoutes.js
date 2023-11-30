
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');


router.post('/:productId', reviewController.addReview);


router.get('/:productId', reviewController.getAllReviews);


router.put('/:productId/:reviewId', reviewController.updateReview);


router.delete('/:productId/:reviewId', reviewController.deleteReview);

module.exports = router;

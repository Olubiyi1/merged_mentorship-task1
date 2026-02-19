const errorHandler = (err, req, res, next) => {
    console.error('Unexpected error:', err.message);

    res.status(500).json({
        success: false,
        error: 'An unexpected error occurred. Please try again later.',
        error: err.message,
    });
}

module.exports = errorHandler;
    
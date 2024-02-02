// prettier-ignore
const asyncHandler = (fn) =>
    function (req, res, next) {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };

module.exports = asyncHandler;
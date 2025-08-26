const generateOTPNumber = () => Math.floor(100000 + Math.random() * 900000);

const getTimeAfter3Minutes = () => new Date(Date.now() + 3 * 60 * 1000);

module.exports = {generateOTPNumber , getTimeAfter3Minutes}
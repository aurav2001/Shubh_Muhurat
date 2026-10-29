module.exports = (req, res) => {
    res.status(200).json({ status: 'Test endpoint working!', nodeVer: process.version });
};

const adminLogin = (req, res) => {
    const { username, password } = req.body;
    const adminUser = process.env.ADMIN_USER;
    const adminPass = process.env.ADMIN_PASS;

    if (username === adminUser && password === adminPass) {
        res.json({ success: true, token: 'mock-token-' + Date.now() });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
};

module.exports = {
    adminLogin
};

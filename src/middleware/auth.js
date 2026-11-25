const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        req.flash('error', 'Please log in to access that page.');
        return res.redirect('/login');
    }
    next();
};

const requireRole = (role) => (req, res, next) => {
    if (!req.session.user) {
        req.flash('error', 'Please log in to access that page.');
        return res.redirect('/login');
    }
    if (req.session.user.role !== role) {
        req.flash('error', 'You do not have permission to access that page.');
        return res.redirect('/dashboard');
    }
    next();
};

export { requireLogin, requireRole };

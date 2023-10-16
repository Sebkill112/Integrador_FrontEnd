import PropTypes from 'prop-types';
import useAuth from 'contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import menuItems from 'menu-items';
import Menus from 'classes/Menu';
import Loader from 'ui-component/Loader';

const AuthRoute = ({ children }) => {
    const { user, loading, logout } = useAuth();

    if (user === null && !loading) return <Loader />;

    try {
        const urlsPermitidas = Menus.compare(menuItems, user.menu).urls;
        const hasAccess = urlsPermitidas.includes(document.location.pathname);

        if (!hasAccess) return <Navigate to={urlsPermitidas[0]} />;

        return children;
    } catch (error) {
        return logout();
    }
};

AuthRoute.propTypes = {
    children: PropTypes.element
};

export default AuthRoute;

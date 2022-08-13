import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";

import { types, NotificationContext } from '../../contexts/NotificationContext';

const Logout = () => {
    const navigate = useNavigate();
  const { showNotification } = useContext(NotificationContext);


    const { user, userLogout } = useContext(AuthContext);
    console.log(user);

    useEffect(() => {
        authService.logout(user.accessToken)
            .then(() => {
                userLogout();
      showNotification('Successfully logged out!', types.success);

                navigate('/');
            })
            .catch(() => {
                navigate('/');
            });
    }, [userLogout, navigate, showNotification]);

    return null;
}

export default Logout;
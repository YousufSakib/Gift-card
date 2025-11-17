import React from 'react';
import { useNavigate } from 'react-router';
import { store } from '~/store/store';

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
    return (props: P) => {
        const navigate = useNavigate();
        const user = store((state: RootState) => state.user);

        React.useEffect(() => {
            if (!user || Object.keys(user).length === 0) navigate('/admin', { replace: true })
          }, [user, navigate])
      
          if (!user || Object.keys(user).length === 0) return null
      
        return <Component {...props} />;
    };
};

export default withAuth;

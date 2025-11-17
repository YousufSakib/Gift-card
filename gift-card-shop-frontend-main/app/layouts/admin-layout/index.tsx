import { Outlet } from 'react-router';
import withAuth from '~/components/hoc/withAuth';
import AdminNavbar from './components/AdminNavbar';

const AdminLayout = () => {
    return (
        <>
            <AdminNavbar />

            <main className="p-6 mx-auto">
                <Outlet />
            </main>
        </>
    );
};

// export default AdminLayout;
export default withAuth(AdminLayout);

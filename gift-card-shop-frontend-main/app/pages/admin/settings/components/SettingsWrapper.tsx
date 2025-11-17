import React from 'react';
import { Link } from 'react-router';
import Divider from '~/components/shared/Divider';
import { EditIcon } from '~/constants/icons';

type Props = { title: string; isEdit?: boolean; children: React.ReactNode };

export default function SettingsWrapper(props: Props) {
    return (
        <div className="bg-surface-300 rounded-xl p-6 flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h4 className="font-semibold capitalize">{props.title}</h4>
                {!props.isEdit && (
                    <Link to="/admin/settings/edit">
                        {' '}
                        <EditIcon className="text-primary-500" />
                    </Link>
                )}
            </div>

            <Divider className="bg-surface-600" />

            <>{props.children}</>
        </div>
    );
}

import React from 'react';

const withIconWrapper = (IconComponent: React.ComponentType<IconProps>) => {
    return (props: IconProps) => <IconComponent {...props} />;
};

export default withIconWrapper;

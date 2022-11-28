// import { NavigationMenu } from '../common/NavigationMenu';

export type PageProps = {
    children?: React.ReactNode
}

export const Page = ({ children }: PageProps) => {
    return (
        <div>
            {children}
        </div>
    );
};

// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { History, LocationState } from 'history';



import './layout.scss';
import { AlertBox } from '../components/alertBox';

type Props = {
    navigation: React.ReactNode
    children: React.ReactNode
};


export const LayoutWithSidebar: React.FunctionComponent<Props> = (props) => {
    const navigationPanel = props!.navigation;
    const children = props!.children;

    return (
        <>
            <div className="with-sidebar">
                <div>
                    <div className="sidebar">
                        <svg onClick={() => window.location.pathname = '/selfservice/'} className="logo" width="86" height="20" viewBox="0 0 86 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0)">
                                <path d="M7.16087 6.83557H4.2274C4.13857 6.83754 4.05171 6.86196 3.97497 6.90652C3.89823 6.95108 3.83414 7.01433 3.78871 7.09032L2.32198 9.6205C2.2761 9.69957 2.25195 9.78925 2.25195 9.88055C2.25195 9.97185 2.2761 10.0615 2.32198 10.1406L3.78871 12.6695C3.83365 12.7459 3.89763 12.8095 3.97448 12.8541C4.05133 12.8987 4.13844 12.9229 4.2274 12.9242H7.16087C7.24978 12.9226 7.33679 12.8983 7.4136 12.8537C7.4904 12.8092 7.55443 12.7457 7.59956 12.6695L9.0663 10.1406C9.11217 10.0615 9.13632 9.97185 9.13632 9.88055C9.13632 9.78925 9.11217 9.69957 9.0663 9.6205L7.59956 7.09032C7.55404 7.01441 7.48993 6.95123 7.41321 6.90668C7.33649 6.86213 7.24967 6.83767 7.16087 6.83557Z" fill="#F2F2F2" />
                                <path d="M11.7799 0.122927C11.7462 0.066019 11.6913 0.024624 11.6272 0.007732C11.563 -0.00916004 11.4947 -0.000184434 11.4372 0.0327065C11.4 0.0549949 11.3689 0.0859629 11.3465 0.122927L8.97173 4.2174C8.93565 4.28167 8.91671 4.35407 8.91671 4.42769C8.91671 4.50132 8.93565 4.57371 8.97173 4.63799L11.9212 9.71826C11.9494 9.76543 11.9642 9.81928 11.9642 9.87416C11.9642 9.92903 11.9494 9.98288 11.9212 10.0301L8.93707 15.1634C8.9112 15.2115 8.87279 15.2518 8.82586 15.2801C8.77894 15.3083 8.72523 15.3235 8.67039 15.3239H2.77411C2.69933 15.3221 2.62544 15.3403 2.5602 15.3768C2.49497 15.4132 2.44081 15.4664 2.40343 15.5309L0.0326541 19.6254C0.0161657 19.6538 0.00546511 19.6851 0.00116566 19.7176C-0.0031338 19.7502 -0.00094742 19.7832 0.00759804 19.8149C0.0161435 19.8465 0.030881 19.8762 0.0509676 19.9022C0.0710541 19.9282 0.0960956 19.95 0.124659 19.9664C0.164875 19.9902 0.211245 20.0017 0.257998 19.9995H10.9185C11.1169 19.9988 11.3116 19.9461 11.4829 19.8466C11.6543 19.7472 11.7963 19.6045 11.8945 19.433L17.1108 10.4361C17.211 10.2658 17.2638 10.0721 17.2638 9.87482C17.2638 9.67754 17.211 9.48382 17.1108 9.31359L11.7799 0.122927Z" fill="#F2F2F2" />
                                <path d="M34.2412 11.1172C34.2815 9.95142 34.7752 8.84674 35.6183 8.03619C36.4613 7.22564 37.5878 6.77258 38.7601 6.77258C39.9324 6.77258 41.0589 7.22564 41.9019 8.03619C42.745 8.84674 43.2387 9.95142 43.279 11.1172C43.279 12.3091 42.8031 13.4521 41.9562 14.2948C41.1092 15.1376 39.9605 15.6111 38.7628 15.6111C37.565 15.6111 36.4163 15.1376 35.5693 14.2948C34.7224 13.4521 34.2465 12.3091 34.2465 11.1172H34.2412ZM41.3202 11.1172C41.3399 10.429 41.0841 9.76106 40.609 9.26045C40.1339 8.75984 39.4784 8.4675 38.7868 8.44772H38.7601C38.4267 8.44422 38.0959 8.50623 37.7867 8.63019C37.4775 8.75415 37.1958 8.93762 36.958 9.17009C36.7202 9.40255 36.5308 9.67945 36.4007 9.98489C36.2706 10.2903 36.2024 10.6183 36.2 10.95C36.2 10.9899 36.2 11.031 36.2 11.0708C36.1806 11.759 36.4365 12.4266 36.9116 12.9272C37.3866 13.4277 38.0418 13.7202 38.7334 13.7403H38.7668C39.4423 13.7417 40.0908 13.4761 40.5696 13.0019C41.0485 12.5277 41.3184 11.8836 41.3202 11.2114C41.3202 11.1889 41.3202 11.165 41.3202 11.1424V11.1172Z" fill="#F2F2F2" />
                                <path d="M34.2412 11.1172C34.2815 9.95142 34.7752 8.84674 35.6183 8.03619C36.4613 7.22564 37.5878 6.77258 38.7601 6.77258C39.9324 6.77258 41.0589 7.22564 41.9019 8.03619C42.745 8.84674 43.2387 9.95142 43.279 11.1172C43.279 12.3091 42.8031 13.4521 41.9562 14.2948C41.1092 15.1376 39.9605 15.6111 38.7628 15.6111C37.565 15.6111 36.4163 15.1376 35.5693 14.2948C34.7224 13.4521 34.2465 12.3091 34.2465 11.1172H34.2412ZM41.3202 11.1172C41.3399 10.429 41.0841 9.76106 40.609 9.26045C40.1339 8.75984 39.4784 8.4675 38.7868 8.44772H38.7601C38.4267 8.44422 38.0959 8.50623 37.7867 8.63019C37.4775 8.75415 37.1958 8.93762 36.958 9.17009C36.7202 9.40255 36.5308 9.67945 36.4007 9.98489C36.2706 10.2903 36.2024 10.6183 36.2 10.95C36.2 10.9899 36.2 11.031 36.2 11.0708C36.1806 11.759 36.4365 12.4266 36.9116 12.9272C37.3866 13.4277 38.0418 13.7202 38.7334 13.7403H38.7668C39.4423 13.7417 40.0908 13.4761 40.5696 13.0019C41.0485 12.5277 41.3184 11.8836 41.3202 11.2114C41.3202 11.1889 41.3202 11.165 41.3202 11.1424V11.1172Z" fill="#F2F2F2" />
                                <path d="M25.2504 7.40742C25.2504 7.25575 25.3109 7.11031 25.4187 7.00306C25.5265 6.89582 25.6727 6.83557 25.8251 6.83557H28.5665C31.2333 6.83557 33.0774 8.67981 33.0668 11.0601C33.0668 13.4483 31.208 15.2832 28.5332 15.2726H25.7931C25.6403 15.2712 25.4943 15.2097 25.3869 15.1016C25.2795 14.9935 25.2194 14.8475 25.2197 14.6955L25.2504 7.40742ZM28.5399 13.6433C29.1815 13.6833 29.8128 13.4682 30.2951 13.0452C30.7774 12.6223 31.0712 12.0262 31.112 11.3878C31.1168 11.2994 31.1168 11.2108 31.112 11.1224V11.08C31.1296 10.7619 31.0841 10.4435 30.9781 10.1429C30.872 9.84231 30.7075 9.56547 30.4939 9.32817C30.2803 9.09087 30.0219 8.89776 29.7332 8.75988C29.4446 8.622 29.1316 8.54204 28.8119 8.52457C28.7283 8.52457 28.6443 8.52457 28.5599 8.52457H27.0932V13.6208L28.5399 13.6433Z" fill="#F2F2F2" />
                                <path d="M44.7251 7.72456C44.725 7.48006 44.8219 7.24542 44.9947 7.07155C45.1674 6.89768 45.4021 6.7986 45.6478 6.7958C45.6883 6.79471 45.7289 6.79693 45.7691 6.80244C46.0007 6.83505 46.2123 6.95065 46.3643 7.12751C46.5162 7.30438 46.5981 7.53036 46.5945 7.76303V13.6288H50.02C50.2267 13.6267 50.4276 13.6975 50.5869 13.8287C50.7463 13.9598 50.8539 14.1428 50.8907 14.3452C50.9088 14.4543 50.905 14.5659 50.8797 14.6736C50.8543 14.7812 50.8079 14.8828 50.7429 14.9726C50.678 15.0623 50.5959 15.1384 50.5014 15.1965C50.4068 15.2546 50.3017 15.2936 50.192 15.3111C50.1436 15.3193 50.0944 15.3229 50.0453 15.3217H45.2944C45.219 15.3219 45.1443 15.3073 45.0746 15.2787C45.0049 15.2501 44.9415 15.2081 44.8881 15.1551C44.8347 15.1021 44.7924 15.0392 44.7635 14.9699C44.7346 14.9006 44.7197 14.8263 44.7197 14.7512L44.7251 7.72456Z" fill="#F2F2F2" />
                                <path d="M52.3265 7.71928C52.3265 7.47296 52.4248 7.23673 52.5999 7.06255C52.7749 6.88838 53.0123 6.79053 53.2598 6.79053C53.5074 6.79053 53.7448 6.88838 53.9198 7.06255C54.0949 7.23673 54.1932 7.47296 54.1932 7.71928L54.1666 14.4726C54.1666 14.7189 54.0682 14.9552 53.8932 15.1294C53.7181 15.3035 53.4807 15.4014 53.2332 15.4014C52.9856 15.4014 52.7482 15.3035 52.5732 15.1294C52.3981 14.9552 52.2998 14.7189 52.2998 14.4726L52.3265 7.71928Z" fill="#F2F2F2" />
                                <path d="M58.1839 8.58162H56.3838C56.1554 8.58162 55.9363 8.49132 55.7748 8.33058C55.6132 8.16985 55.5225 7.95184 55.5225 7.72452C55.5225 7.4972 55.6132 7.27919 55.7748 7.11846C55.9363 6.95772 56.1554 6.86742 56.3838 6.86742H61.8441C61.9579 6.8587 62.0723 6.87238 62.1808 6.90768C62.2893 6.94297 62.3898 6.99918 62.4765 7.0731C62.5631 7.14702 62.6343 7.23721 62.686 7.33851C62.7376 7.4398 62.7687 7.55024 62.7775 7.66349C62.7862 7.77674 62.7725 7.8906 62.737 7.99857C62.7015 8.10653 62.645 8.20649 62.5707 8.29273C62.4964 8.37898 62.4058 8.44982 62.304 8.50121C62.2022 8.55259 62.0912 8.58353 61.9774 8.59224C61.933 8.59484 61.8885 8.59484 61.8441 8.59224H60.048V14.4699C60.048 14.7162 59.9497 14.9525 59.7746 15.1266C59.5996 15.3008 59.3622 15.3987 59.1146 15.3987C58.8671 15.3987 58.6297 15.3008 58.4546 15.1266C58.2796 14.9525 58.1812 14.7162 58.1812 14.4699L58.1839 8.58162Z" fill="#F2F2F2" />
                                <path d="M66.0578 8.58162H64.2618C64.0333 8.58162 63.8142 8.49132 63.6527 8.33058C63.4911 8.16985 63.4004 7.95184 63.4004 7.72452C63.4004 7.4972 63.4911 7.27919 63.6527 7.11846C63.8142 6.95772 64.0333 6.86742 64.2618 6.86742H69.7287C69.8425 6.8587 69.9569 6.87238 70.0654 6.90768C70.1739 6.94297 70.2744 6.99918 70.361 7.0731C70.4477 7.14702 70.5189 7.23721 70.5706 7.33851C70.6222 7.4398 70.6533 7.55024 70.662 7.66349C70.6708 7.77674 70.6571 7.8906 70.6216 7.99857C70.5861 8.10653 70.5296 8.20649 70.4553 8.29273C70.381 8.37898 70.2904 8.44982 70.1886 8.50121C70.0868 8.55259 69.9758 8.58353 69.862 8.59224C69.8176 8.59489 69.7731 8.59489 69.7287 8.59224H67.9273V14.4699C67.9273 14.7162 67.8289 14.9525 67.6539 15.1266C67.4788 15.3008 67.2414 15.3987 66.9939 15.3987C66.7463 15.3987 66.5089 15.3008 66.3339 15.1266C66.1588 14.9525 66.0605 14.7162 66.0605 14.4699L66.0578 8.58162Z" fill="#F2F2F2" />
                                <path d="M71.9526 7.71394C71.9526 7.46876 72.05 7.23353 72.2236 7.05955C72.3972 6.88556 72.6329 6.78694 72.8793 6.78518C72.9184 6.78254 72.9576 6.78254 72.9966 6.78518C73.2294 6.8171 73.4421 6.93327 73.5941 7.11148C73.7462 7.28969 73.8268 7.51741 73.8207 7.75109V13.6221H77.2462C77.4524 13.6196 77.6529 13.6895 77.8125 13.8196C77.972 13.9496 78.0803 14.1316 78.1182 14.3333C78.1361 14.4431 78.1321 14.5553 78.1064 14.6635C78.0807 14.7717 78.0338 14.8738 77.9685 14.964C77.9031 15.0542 77.8205 15.1307 77.7254 15.1891C77.6303 15.2476 77.5245 15.2868 77.4142 15.3045C77.3701 15.3118 77.3255 15.3154 77.2809 15.3151H72.526C72.372 15.3137 72.2248 15.2519 72.1164 15.143C72.0081 15.0342 71.9473 14.8872 71.9473 14.734L71.9526 7.71394Z" fill="#F2F2F2" />
                                <path d="M79.4443 14.7353L79.471 7.42071C79.471 7.27045 79.531 7.12635 79.6378 7.0201C79.7445 6.91386 79.8894 6.85417 80.0404 6.85417H85.0753C85.29 6.85 85.4987 6.92533 85.6608 7.06555C85.8229 7.20577 85.9269 7.4009 85.9526 7.61309C85.9719 7.82981 85.9039 8.04528 85.7637 8.21219C85.6234 8.3791 85.4224 8.48382 85.2046 8.50336C85.1753 8.50336 85.1459 8.50336 85.1179 8.50336H81.3244V10.2242H84.5246C84.7389 10.2215 84.9468 10.2974 85.1086 10.4373C85.2704 10.5773 85.3748 10.7715 85.4019 10.9831C85.4227 11.1999 85.3562 11.416 85.2169 11.5839C85.0776 11.7519 84.8771 11.8579 84.6592 11.8787C84.6286 11.8807 84.5979 11.8807 84.5672 11.8787H81.3191V13.6553H85.1206C85.3348 13.6526 85.5425 13.7285 85.7041 13.8685C85.8657 14.0085 85.9698 14.2027 85.9966 14.4142C86.0071 14.5216 85.9962 14.6299 85.9645 14.7331C85.9329 14.8362 85.881 14.9321 85.812 15.0153C85.743 15.0985 85.6582 15.1674 85.5625 15.2179C85.4667 15.2684 85.3619 15.2996 85.2539 15.3098C85.2233 15.3118 85.1926 15.3118 85.1619 15.3098H80.0297C79.9536 15.3107 79.8781 15.2966 79.8074 15.2684C79.7368 15.2402 79.6724 15.1984 79.6181 15.1454C79.5637 15.0924 79.5204 15.0292 79.4905 14.9595C79.4607 14.8898 79.445 14.815 79.4443 14.7393V14.7353Z" fill="#F2F2F2" />
                                <path d="M79.4443 14.7353L79.471 7.42071C79.471 7.27045 79.531 7.12635 79.6378 7.0201C79.7445 6.91386 79.8894 6.85417 80.0404 6.85417H85.0753C85.29 6.85 85.4987 6.92533 85.6608 7.06555C85.8229 7.20577 85.9269 7.4009 85.9526 7.61309C85.9719 7.82981 85.9039 8.04528 85.7637 8.21219C85.6234 8.3791 85.4224 8.48382 85.2046 8.50336C85.1753 8.50336 85.1459 8.50336 85.1179 8.50336H81.3244V10.2242H84.5246C84.7389 10.2215 84.9468 10.2974 85.1086 10.4373C85.2704 10.5773 85.3748 10.7715 85.4019 10.9831C85.4227 11.1999 85.3562 11.416 85.2169 11.5839C85.0776 11.7519 84.8771 11.8579 84.6592 11.8787C84.6286 11.8807 84.5979 11.8807 84.5672 11.8787H81.3191V13.6553H85.1206C85.3348 13.6526 85.5425 13.7285 85.7041 13.8685C85.8657 14.0085 85.9698 14.2027 85.9966 14.4142C86.0071 14.5216 85.9962 14.6299 85.9645 14.7331C85.9329 14.8362 85.881 14.9321 85.812 15.0153C85.743 15.0985 85.6582 15.1674 85.5625 15.2179C85.4667 15.2684 85.3619 15.2996 85.2539 15.3098C85.2233 15.3118 85.1926 15.3118 85.1619 15.3098H80.0297C79.9536 15.3107 79.8781 15.2966 79.8074 15.2684C79.7368 15.2402 79.6724 15.1984 79.6181 15.1454C79.5637 15.0924 79.5204 15.0292 79.4905 14.9595C79.4607 14.8898 79.445 14.815 79.4443 14.7393V14.7353Z" fill="#F2F2F2" />
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="86" height="20" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        {navigationPanel}
                    </div>
                    <div className="not-sidebar">
                        <AlertBox />
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export const getDefaultMenu = (history: History<LocationState>, applicationId: string, environment: string): React.ReactNode => {
    const items = [
        {
            href: `/backups/application/${applicationId}/overview`,
            name: 'Backups'
        },
        {
            href: `/business-moments/application/${applicationId}/${environment}/overview`,
            name: 'Business Moments'
        },
        {
            href: `/microservices/application/${applicationId}/${environment}/overview`,
            name: 'Microservices'
        },
        {
            href: `/insights/application/${applicationId}/${environment}/overview`,
            name: 'Insights'
        },
        {
            href: `/containerregistry/application/${applicationId}/${environment}/overview`,
            name: 'Container Registry'
        },
        {
            href: `/documentation/application/${applicationId}/${environment}/overview`,
            name: 'Documentation'
        },
    ];

    return (
        <>
            <ul>
                {items.map(link => {
                    return (
                        <li key={link.name}>
                            <a href="#" onClick={(event) => {
                                event.preventDefault();
                                const href = link.href;
                                history.push(href);
                            }}>
                                {link.name}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

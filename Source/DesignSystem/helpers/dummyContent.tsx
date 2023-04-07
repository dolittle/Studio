// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Route, Routes } from 'react-router-dom';

import { Menu, Typography } from '@mui/material';

import { Button, IconButton, Icon } from '@dolittle/design-system';

import { Content, RouterLinkListItem } from './ReactRouter';

export const MainLinks = () =>
    <>
        <RouterLinkListItem to='/main1' text='main1' variantButton />
        <RouterLinkListItem to='/main2' text='main2' variantButton />
        <RouterLinkListItem to='/main3' text='main3' selected variantButton />
    </>;

export const MobileSecondaryLinks = () =>
    <>
        <RouterLinkListItem to='secondary-link-1' text='Secondary link 1' icon={<Icon icon='DescriptionRounded' />} />
        <RouterLinkListItem to='secondary-link-2' text='Secondary link 2' icon={<Icon icon='SupervisedUserCircleRounded' />} />
        <RouterLinkListItem to='secondary-link-3' text='Secondary link 3' icon={<Icon icon='LogoutRounded' />} />
    </>;

export const MoreOptionsMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    return (
        <>
            <IconButton
                tooltipText='More options'
                icon='MoreVertRounded'
                edge='end'
                onClick={e => setAnchorEl(e.currentTarget)}
                aria-controls={open ? 'more-options' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
            />

            <Menu
                id='more-options'
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                onClick={() => setAnchorEl(null)}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MobileSecondaryLinks />
            </Menu>
        </>
    );
};

export const SelectionMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    return (
        <>
            <Button
                label='Selection menu'
                color='subtle'
                endWithIcon={open ? 'ArrowDropUpRounded' : 'ArrowDropDownRounded'}
                onClick={e => setAnchorEl(e.currentTarget)}
                aria-haspopup='true'
                aria-controls={open ? 'select-selected' : undefined}
                aria-expanded={open ? 'true' : undefined}
            />

            <Menu
                id='select-selected'
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                onClick={() => setAnchorEl(null)}
                MenuListProps={{ 'aria-labelledby': 'select-selected' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <RouterLinkListItem to='/selection-menu' text='Selection menu' icon={<Icon icon='CheckRounded' />} />
                <RouterLinkListItem to='/select-option' text='Select option' inset />
                <RouterLinkListItem to='/create-new' text='Create new' icon={<Icon icon='AddBoxRounded' />} />
            </Menu>
        </>
    );
};

export const SecondaryLinks = () =>
    <>
        <SelectionMenu />
        <MoreOptionsMenu />
    </>;

export const SideBarPrimaryLinks = () =>
    <>
        <RouterLinkListItem to='sidebar-primary-link-1' text='Primary link 1' icon={<Icon icon='PolylineRounded' />} />
        <RouterLinkListItem to='sidebar-primary-link-2' text='Primary link 2' icon={<Icon icon='Bridge' />} />
    </>;

export const SideBarSecondaryLinks = () =>
    <>
        <RouterLinkListItem to='sidebar-secondary-link-1' text='Secondary link 1' icon={<Icon icon='HexagonRounded' />} />
        <RouterLinkListItem to='sidebar-secondary-link-2' text='Secondary link 2' icon={<Icon icon='BackupRounded' />} />
        <RouterLinkListItem to='sidebar-secondary-link-3' text='Secondary link 3' icon={<Icon icon='ContainerRegistry' />} />
        <RouterLinkListItem to='sidebar-secondary-link-4' text='Secondary link 4' icon={<Icon icon='TextSnippetRounded' />} />
    </>;

export const DummyMainContent = () =>
    <>
        <Routes>
            <Route path='*' element={<Content />} />
        </Routes>

        <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
            fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
            aliquam dolore excepturi quae. Distinctio enim at eligendi perferendis in
            cum quibusdam sed quae, accusantium et aperiam? Quod itaque exercitationem,
            at ab sequi qui modi delectus quia corrupti alias distinctio nostrum.
            Minima ex dolor modi inventore sapiente necessitatibus aliquam fuga et. Sed
            numquam quibusdam at officia sapiente porro maxime corrupti perspiciatis
            asperiores, exercitationem eius nostrum consequuntur iure aliquam itaque,
            assumenda et! Quibusdam temporibus beatae doloremque voluptatum doloribus
            soluta accusamus porro reprehenderit eos inventore facere, fugit, molestiae
            ab officiis illo voluptates recusandae. Vel dolor nobis eius, ratione atque
            soluta, aliquam fugit qui iste architecto perspiciatis. Nobis, voluptatem!
            Cumque, eligendi unde aliquid minus quis sit debitis obcaecati error,
            delectus quo eius exercitationem tempore. Delectus sapiente, provident
            corporis dolorum quibusdam aut beatae repellendus est labore quisquam
            praesentium repudiandae non vel laboriosam quo ab perferendis velit ipsa
            deleniti modi! Ipsam, illo quod. Nesciunt commodi nihil corrupti cum non
            fugiat praesentium doloremque architecto laborum aliquid. Quae, maxime
            recusandae? Eveniet dolore molestiae dicta blanditiis est expedita eius
            debitis cupiditate porro sed aspernatur quidem, repellat nihil quasi
            praesentium quia eos, quibusdam provident. Incidunt tempore vel placeat
            voluptate iure labore, repellendus beatae quia unde est aliquid dolor
            molestias libero. Reiciendis similique exercitationem consequatur, nobis
            placeat illo laudantium! Enim perferendis nulla soluta magni error,
            provident repellat similique cupiditate ipsam, et tempore cumque quod! Qui,
            iure suscipit tempora unde rerum autem saepe nisi vel cupiditate iusto.
            Illum, corrupti? Fugiat quidem accusantium nulla. Aliquid inventore commodi
            reprehenderit rerum reiciendis! Quidem alias repudiandae eaque eveniet
            cumque nihil aliquam in expedita, impedit quas ipsum nesciunt ipsa ullam
            consequuntur dignissimos numquam at nisi porro a, quaerat rem repellendus.
            Voluptates perspiciatis, in pariatur impedit, nam facilis libero dolorem
            dolores sunt inventore perferendis, aut sapiente modi nesciunt.
        </Typography>
    </>;

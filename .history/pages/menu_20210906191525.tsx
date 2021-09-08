import React from 'react'
import MenuLayout from '../layouts/MenuLayout'
import TabulatedMenu from '../components/SubMenus'

import { UtmParameters } from '../components/SubMenus/SeoParameters/utmParameters'

const Menu = () => {

    return (
        <TabulatedMenu />
    );
}   

Menu.getLayout = function getLayout(page: any) {
    return (
        <MenuLayout>
            {page} 
        </MenuLayout>
    );
}

export default Menu;
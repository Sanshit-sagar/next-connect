import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import TabulatedMenu from '../components/SubMenus'

const currentPageIndexAtom = atom(0)


const Menu = () => {
    return  <TabulatedMenu />;
}   


Menu.getLayout = function getLayout(page: any) {
    return <DashboardLayout> {page} </DashboardLayout>;
}

export default Menu;